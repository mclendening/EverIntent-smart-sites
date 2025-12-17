import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { upsertContact, addTags, addNote, GHL_TAGS } from '../_shared/ghlClient.ts';

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
    console.log('[submit-form] Received submission:', JSON.stringify(body, null, 2));

    const {
      form_type,
      name,
      email,
      phone,
      company,
      message,
      tcpa_consent,
      utm_source,
      utm_medium,
      utm_campaign,
      source_page,
      ip_address,
      user_agent,
    } = body;

    // Validate required fields
    if (!form_type || !name || !email) {
      console.error('[submit-form] Missing required fields');
      return new Response(
        JSON.stringify({ error: 'Missing required fields: form_type, name, email' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate form_type
    if (!['contact', 'localpros_apply'].includes(form_type)) {
      console.error('[submit-form] Invalid form_type:', form_type);
      return new Response(
        JSON.stringify({ error: 'Invalid form_type' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Insert into form_submissions
    const { data: submission, error: insertError } = await supabase
      .from('form_submissions')
      .insert({
        form_type,
        name,
        email,
        phone,
        company,
        message,
        tcpa_consent: tcpa_consent || false,
        consent_timestamp: tcpa_consent ? new Date().toISOString() : null,
        utm_source,
        utm_medium,
        utm_campaign,
        source_page,
        ip_address,
        user_agent,
        ghl_sync_status: 'pending',
      })
      .select()
      .single();

    if (insertError) {
      console.error('[submit-form] Database insert error:', insertError);
      return new Response(
        JSON.stringify({ error: 'Failed to save submission' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('[submit-form] Submission saved:', submission.id);

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

      // Add appropriate tag based on form_type
      const tag = form_type === 'contact' ? GHL_TAGS.CONTACT_FORM : GHL_TAGS.LOCALPROS_APPLY;
      await addTags(contactId, [tag]);

      // Add note with submission details
      const noteBody = `Form Submission (${form_type})
---
Name: ${name}
Email: ${email}
Phone: ${phone || 'N/A'}
Company: ${company || 'N/A'}
Message: ${message || 'N/A'}
Source: ${source_page || 'N/A'}
UTM: ${utm_source || '-'}/${utm_medium || '-'}/${utm_campaign || '-'}
TCPA Consent: ${tcpa_consent ? 'Yes' : 'No'}`;

      await addNote(contactId, noteBody);

      ghlSyncStatus = 'synced';
      console.log('[submit-form] GHL sync successful:', contactId);
    } catch (ghlErr) {
      console.error('[submit-form] GHL sync error:', ghlErr);
      ghlSyncStatus = 'failed';
      ghlError = ghlErr instanceof Error ? ghlErr.message : 'Unknown GHL error';
    }

    // Update submission with GHL sync status
    await supabase
      .from('form_submissions')
      .update({
        ghl_contact_id: ghlContactId,
        ghl_sync_status: ghlSyncStatus,
        ghl_synced_at: ghlSyncStatus === 'synced' ? new Date().toISOString() : null,
        ghl_error: ghlError,
      })
      .eq('id', submission.id);

    console.log('[submit-form] Completed successfully');

    return new Response(
      JSON.stringify({ 
        success: true, 
        id: submission.id,
        ghl_sync_status: ghlSyncStatus,
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    console.error('[submit-form] Unexpected error:', err);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
