/**
 * @fileoverview Form Submission Edge Function
 * @module supabase/functions/submit-form
 * @description Handles all form submissions (contact, data_rights_request).
 * Stores submissions in Supabase and syncs contacts to GHL with appropriate tags.
 * 
 * Supports tier/product selection and add-on pack tagging for checkout flows.
 */

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { upsertContact, addTags, addNote, GHL_TAGS, TIER_TAG_MAP, ADDON_TAG_MAP, buildAffiliateTag } from '../_shared/ghlClient.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

/**
 * Valid form types accepted by this endpoint.
 */
const VALID_FORM_TYPES = ['contact', 'data_rights_request'] as const;
type FormType = typeof VALID_FORM_TYPES[number];




/**
 * Maps form types to their canonical GHL form tag.
 * @see docs/GHL-TAG-REGISTRY.md
 */
function getTagForFormType(formType: FormType): string {
  switch (formType) {
    case 'contact':
      return GHL_TAGS.FORM_CONTACT;
    case 'data_rights_request':
      return GHL_TAGS.FORM_DATA_RIGHTS;
    default:
      return GHL_TAGS.FORM_CONTACT;
  }
}

/**
 * Formats the note body for GHL based on form type.
 */
function formatNoteBody(
  formType: FormType,
  data: {
    name: string;
    email: string;
    phone?: string;
    company?: string;
    message?: string;
    product_interest?: string;
    selected_addons?: string[];
    source_page?: string;
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
    tcpa_consent?: boolean;
  }
): string {
  const addonsText = data.selected_addons?.length 
    ? data.selected_addons.join(', ') 
    : 'None';
    
  const baseNote = `Form Submission (${formType})
---
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone || 'N/A'}
Company: ${data.company || 'N/A'}
Product Interest: ${data.product_interest || 'N/A'}
Add-Ons Selected: ${addonsText}
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
      product_interest,
      selected_addons,
      tcpa_consent,
      utm_source,
      utm_medium,
      utm_campaign,
      source_page,
      ip_address,
      user_agent,
      affiliate_id,
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

    // Build message with product interest info
    const enhancedMessage = product_interest 
      ? `[Product: ${product_interest}${selected_addons?.length ? ` + Add-Ons: ${selected_addons.join(', ')}` : ''}] ${message || ''}`
      : message;

    // Insert into form_submissions
    const { data: submission, error: insertError } = await supabase
      .from('form_submissions')
      .insert({
        form_type,
        name,
        email,
        phone,
        company,
        message: enhancedMessage,
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

      // Build tags array
      const tagsToAdd: string[] = [];

      // Form type tag
      tagsToAdd.push(getTagForFormType(form_type as FormType));

      // Product interest tag (tier selection on contact form)
      if (product_interest && TIER_TAG_MAP[product_interest]) {
        tagsToAdd.push(TIER_TAG_MAP[product_interest]);
      }

      // Add-on tags
      if (selected_addons && Array.isArray(selected_addons)) {
        for (const addonId of selected_addons) {
          if (ADDON_TAG_MAP[addonId]) {
            tagsToAdd.push(ADDON_TAG_MAP[addonId]);
          }
        }
      }

      // Affiliate tag
      if (affiliate_id) {
        tagsToAdd.push(GHL_TAGS.AFFILIATE_REFERRED);
        tagsToAdd.push(buildAffiliateTag(affiliate_id));
      }

      await addTags(contactId, tagsToAdd);

      // Add note with submission details
      const noteBody = formatNoteBody(form_type as FormType, {
        name,
        email,
        phone,
        company,
        message,
        product_interest,
        selected_addons,
        source_page,
        utm_source,
        utm_medium,
        utm_campaign,
        tcpa_consent,
      });

      await addNote(contactId, noteBody);

      ghlSyncStatus = 'synced';
      console.log('[submit-form] GHL sync successful:', contactId, 'Tags:', tagsToAdd);
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
