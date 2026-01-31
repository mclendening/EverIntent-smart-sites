import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { upsertContact, addTags, addNote, TIER_TAG_MAP } from '../_shared/ghlClient.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    console.log('[start-checkout] Received checkout:', JSON.stringify(body, null, 2));

    const {
      name,
      email,
      phone,
      company,
      message,
      service_interest, // e.g., "T1", "T2", "T3", "T4"
      tcpa_consent,
      utm_source,
      utm_medium,
      utm_campaign,
      source_page,
      ip_address,
      user_agent,
    } = body;

    // Validate required fields
    if (!name || !email) {
      console.error('[start-checkout] Missing required fields');
      return new Response(
        JSON.stringify({ error: 'Missing required fields: name, email' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Insert into checkout_submissions
    const { data: submission, error: insertError } = await supabase
      .from('checkout_submissions')
      .insert({
        name,
        email,
        phone,
        company,
        message,
        service_interest,
        tcpa_consent: tcpa_consent || false,
        consent_timestamp: tcpa_consent ? new Date().toISOString() : null,
        utm_source,
        utm_medium,
        utm_campaign,
        source_page,
        ip_address,
        user_agent,
        status: 'new',
        ghl_sync_status: 'pending',
      })
      .select()
      .single();

    if (insertError) {
      console.error('[start-checkout] Database insert error:', insertError);
      return new Response(
        JSON.stringify({ error: 'Failed to save checkout submission' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('[start-checkout] Checkout saved:', submission.id);

    // Sync to GHL
    let ghlContactId: string | null = null;
    let ghlSyncStatus = 'pending';
    let ghlError: string | null = null;

    try {
      // Parse name into first/last
      const nameParts = name.trim().split(' ');
      const firstName = nameParts[0];
      const lastName = nameParts.slice(1).join(' ') || undefined;

      // Upsert contact in GHL
      const { id: contactId } = await upsertContact({
        email,
        firstName,
        lastName,
        phone,
        companyName: company,
      });

      ghlContactId = contactId;

      // Add tier tag if service_interest matches (supports smart-site, m1-m5, etc.)
      const tierKey = service_interest?.toLowerCase();
      const tierTag = tierKey ? TIER_TAG_MAP[tierKey] : null;
      if (tierTag) {
        await addTags(contactId, [tierTag]);
      }

      // Add note with checkout details
      const noteBody = `Checkout Started
---
Name: ${name}
Email: ${email}
Phone: ${phone || 'N/A'}
Company: ${company || 'N/A'}
Service Interest: ${service_interest || 'N/A'}
Message: ${message || 'N/A'}
Source: ${source_page || 'N/A'}
UTM: ${utm_source || '-'}/${utm_medium || '-'}/${utm_campaign || '-'}
TCPA Consent: ${tcpa_consent ? 'Yes' : 'No'}`;

      await addNote(contactId, noteBody);

      ghlSyncStatus = 'synced';
      console.log('[start-checkout] GHL sync successful:', contactId);
    } catch (ghlErr) {
      console.error('[start-checkout] GHL sync error:', ghlErr);
      ghlSyncStatus = 'failed';
      ghlError = ghlErr instanceof Error ? ghlErr.message : 'Unknown GHL error';
    }

    // Update submission with GHL sync status
    await supabase
      .from('checkout_submissions')
      .update({
        ghl_contact_id: ghlContactId,
        ghl_sync_status: ghlSyncStatus,
        ghl_synced_at: ghlSyncStatus === 'synced' ? new Date().toISOString() : null,
        ghl_error: ghlError,
      })
      .eq('id', submission.id);

    console.log('[start-checkout] Completed successfully');

    return new Response(
      JSON.stringify({ 
        success: true, 
        id: submission.id,
        ghl_sync_status: ghlSyncStatus,
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
