import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { upsertContact, addTags, addNote, GHL_TAGS, TIER_TAG_MAP, CHECKOUT_TAG_MAP, ADDON_TAG_MAP, buildAffiliateTag } from '../_shared/ghlClient.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};


serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    console.log('[start-checkout] Received:', JSON.stringify(body, null, 2));

    const {
      first_name,
      last_name,
      email,
      phone,
      business_name,
      has_domain,
      domain_name,
      message,
      selected_tier,
      addons,          // Array<{ slug, name, monthlyPrice, ghlTag }>
      monthly_total,
      setup_total,
      tcpa_consent,
      utm_source,
      utm_medium,
      utm_campaign,
      source_page,
      user_agent,
    } = body;

    // Validate required fields
    if (!first_name || !email || !selected_tier) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: first_name, email, selected_tier' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const fullName = `${first_name} ${last_name || ''}`.trim();

    // Initialize Supabase
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    // Insert into checkout_submissions
    const { data: submission, error: insertError } = await supabase
      .from('checkout_submissions')
      .insert({
        name: fullName,
        first_name,
        last_name: last_name || null,
        email,
        phone: phone || null,
        company: business_name || null,
        business_name: business_name || null,
        has_domain: has_domain ?? false,
        domain_name: domain_name || null,
        message: message || null,
        selected_tier,
        service_interest: TIER_TAG_MAP[selected_tier] || selected_tier,
        addons: addons || [],
        monthly_total: monthly_total ?? 0,
        setup_total: setup_total ?? 0,
        tcpa_consent: tcpa_consent || false,
        consent_timestamp: tcpa_consent ? new Date().toISOString() : null,
        utm_source: utm_source || null,
        utm_medium: utm_medium || null,
        utm_campaign: utm_campaign || null,
        source_page: source_page || null,
        user_agent: user_agent || null,
        status: 'new',
        ghl_sync_status: 'pending',
      })
      .select()
      .single();

    if (insertError) {
      console.error('[start-checkout] DB insert error:', insertError);
      return new Response(
        JSON.stringify({ error: 'Failed to save checkout submission' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('[start-checkout] Saved submission:', submission.id);

    // ── GHL Sync ──
    let ghlContactId: string | null = null;
    let ghlSyncStatus = 'pending';
    let ghlError: string | null = null;

    try {
      const { id: contactId } = await upsertContact({
        email,
        firstName: first_name,
        lastName: last_name || undefined,
        phone: phone || undefined,
        companyName: business_name || undefined,
      });
      ghlContactId = contactId;

      // Collect all tags: tier + add-ons
    const tags: string[] = [];
      
      // Always apply Checkout – Pending for abandoned cart recovery (Task 6.24.4)
      tags.push('EI: Checkout – Pending');
      
      const tierTag = TIER_TAG_MAP[selected_tier];
      if (tierTag) tags.push(tierTag);

      if (Array.isArray(addons)) {
        for (const addon of addons) {
          if (addon.ghlTag) tags.push(addon.ghlTag);
        }
      }

      if (tags.length) await addTags(contactId, tags);

      // Build detailed sales note
      const addonLines = Array.isArray(addons) && addons.length
        ? addons.map((a: { name: string; monthlyPrice: number }) => `  • ${a.name} ($${a.monthlyPrice}/mo)`).join('\n')
        : '  None';

      const noteBody = `🛒 Checkout Started
───────────────────
Plan: ${TIER_TAG_MAP[selected_tier] || selected_tier}
Monthly: $${monthly_total ?? 0}/mo
Setup: $${setup_total ?? 0}

Add-Ons:
${addonLines}

Contact:
  Name: ${fullName}
  Email: ${email}
  Phone: ${phone || 'N/A'}
  Business: ${business_name || 'N/A'}
  Domain: ${has_domain ? (domain_name || 'Has domain') : 'Needs domain'}

Message: ${message || 'N/A'}
Source: ${source_page || 'N/A'}
UTM: ${utm_source || '-'}/${utm_medium || '-'}/${utm_campaign || '-'}
TCPA: ${tcpa_consent ? 'Yes' : 'No'}`;

      await addNote(contactId, noteBody);

      ghlSyncStatus = 'synced';
      console.log('[start-checkout] GHL sync OK:', contactId);
    } catch (err) {
      console.error('[start-checkout] GHL sync error:', err);
      ghlSyncStatus = 'failed';
      ghlError = err instanceof Error ? err.message : 'Unknown GHL error';
    }

    // Update submission with GHL status
    await supabase
      .from('checkout_submissions')
      .update({
        ghl_contact_id: ghlContactId,
        ghl_sync_status: ghlSyncStatus,
        ghl_synced_at: ghlSyncStatus === 'synced' ? new Date().toISOString() : null,
        ghl_error: ghlError,
      })
      .eq('id', submission.id);

    // ── Build GHL redirect URL ──
    // Base URL maps tier slug to GHL checkout path
    const GHL_CHECKOUT_BASE = 'https://go.everintent.com';
    const tierPaths: Record<string, string> = {
      'launch': '/launch',
      'capture': '/capture',
      'convert': '/convert',
      'scale': '/scale',
      'after-hours': '/after-hours',
      'front-office': '/front-office',
      'full-ai': '/full-ai',
      'web-chat': '/web-chat',
    };

    const tierPath = tierPaths[selected_tier] || `/${selected_tier}`;
    const redirectParams = new URLSearchParams();
    redirectParams.set('first_name', first_name);
    if (last_name) redirectParams.set('last_name', last_name);
    redirectParams.set('email', email);
    if (phone) redirectParams.set('phone', phone);
    if (business_name) redirectParams.set('company_name', business_name);

    const redirectUrl = `${GHL_CHECKOUT_BASE}${tierPath}?${redirectParams.toString()}`;

    console.log('[start-checkout] Redirect URL:', redirectUrl);

    return new Response(
      JSON.stringify({
        success: true,
        id: submission.id,
        ghl_sync_status: ghlSyncStatus,
        redirect_url: redirectUrl,
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    console.error('[start-checkout] Unexpected error:', err);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
