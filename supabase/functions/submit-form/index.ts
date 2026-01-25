/**
 * @fileoverview Form Submission Edge Function
 * @module supabase/functions/submit-form
 * @description Handles all form submissions (contact, data_rights_request).
 * Stores submissions in Supabase and syncs contacts to GHL with appropriate tags.
 */

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { upsertContact, addTags, addNote, GHL_TAGS } from '../_shared/ghlClient.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

/**
 * Valid form types accepted by this endpoint.
 * Each form type maps to a specific GHL tag.
 */
const VALID_FORM_TYPES = ['contact', 'data_rights_request'] as const;
type FormType = typeof VALID_FORM_TYPES[number];

/**
 * Maps form types to their corresponding GHL tags.
 * @param formType - The type of form submitted
 * @returns The GHL tag to apply to the contact
 */
function getTagForFormType(formType: FormType): string {
  switch (formType) {
    case 'contact':
      return GHL_TAGS.CONTACT_FORM;
    case 'data_rights_request':
      return GHL_TAGS.DATA_RIGHTS_REQUEST;
    default:
      return GHL_TAGS.CONTACT_FORM;
  }
}

/**
 * Formats the note body for GHL based on form type.
 * Data rights requests include the request type in the note.
 */
function formatNoteBody(
  formType: FormType,
  data: {
    name: string;
    email: string;
    phone?: string;
    company?: string;
    message?: string;
    source_page?: string;
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
    tcpa_consent?: boolean;
  }
): string {
  const baseNote = `Form Submission (${formType})
---
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone || 'N/A'}
Company: ${data.company || 'N/A'}
Message: ${data.message || 'N/A'}
Source: ${data.source_page || 'N/A'}
UTM: ${data.utm_source || '-'}/${data.utm_medium || '-'}/${data.utm_campaign || '-'}
TCPA Consent: ${data.tcpa_consent ? 'Yes' : 'No'}`;

  if (formType === 'data_rights_request') {
    return `⚠️ DSAR REQUEST - 45-DAY RESPONSE REQUIRED
${baseNote}

ACTION REQUIRED: Respond within 45 days per CCPA requirements.
Complex requests may take up to 90 days with notification.`;
  }

  return baseNote;
}

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
    if (!VALID_FORM_TYPES.includes(form_type)) {
      console.error('[submit-form] Invalid form_type:', form_type);
      return new Response(
        JSON.stringify({ error: `Invalid form_type. Valid types: ${VALID_FORM_TYPES.join(', ')}` }),
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
      const tag = getTagForFormType(form_type as FormType);
      await addTags(contactId, [tag]);

      // Add note with submission details
      const noteBody = formatNoteBody(form_type as FormType, {
        name,
        email,
        phone,
        company,
        message,
        source_page,
        utm_source,
        utm_medium,
        utm_campaign,
        tcpa_consent,
      });

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
