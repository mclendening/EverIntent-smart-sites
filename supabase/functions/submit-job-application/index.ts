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
    console.log('[submit-job-application] Received application:', JSON.stringify(body, null, 2));

    const {
      job_id,
      name,
      email,
      phone,
      resume_url,
      cover_letter,
      linkedin_url,
      portfolio_url,
      video_intro_url,
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
      console.error('[submit-job-application] Missing required fields');
      return new Response(
        JSON.stringify({ error: 'Missing required fields: name, email' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get job title if job_id provided
    let jobTitle = 'Unknown Position';
    if (job_id) {
      const { data: job } = await supabase
        .from('jobs')
        .select('title')
        .eq('id', job_id)
        .single();
      if (job) {
        jobTitle = job.title;
      }
    }

    // Insert into job_applications
    const { data: application, error: insertError } = await supabase
      .from('job_applications')
      .insert({
        job_id,
        name,
        email,
        phone,
        resume_url,
        cover_letter,
        linkedin_url,
        portfolio_url,
        video_intro_url,
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
      console.error('[submit-job-application] Database insert error:', insertError);
      return new Response(
        JSON.stringify({ error: 'Failed to save application' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('[submit-job-application] Application saved:', application.id);

    // Sync to GHL
    let ghlContactId: string | null = null;
    let ghlSyncStatus = 'pending';
    let ghlError: string | null = null;

    try {
      // Parse name into first/last
      const nameParts = name.trim().split(' ');
      const firstName = nameParts[0];
      const lastName = nameParts.slice(1).join(' ') || undefined;

      // Build custom fields array for GHL v2
      // CRITICAL: Must be array format [{id, value}] NOT object format
      const customFields: Array<{ id: string; value: string }> = [];
      
      const resumeFieldId = Deno.env.get('GHL_RESUME_CUSTOM_FIELD_ID');
      const videoFieldId = Deno.env.get('GHL_VIDEO_LINK_CUSTOM_FIELD_ID');
      
      if (resume_url && resumeFieldId) {
        customFields.push({ id: resumeFieldId, value: resume_url });
      }
      if (video_intro_url && videoFieldId) {
        customFields.push({ id: videoFieldId, value: video_intro_url });
      }

      // Upsert contact in GHL
      const { id: contactId } = await upsertContact({
        email,
        firstName,
        lastName,
        phone,
        customFields: customFields.length > 0 ? customFields : undefined,
      });

      ghlContactId = contactId;

      // Add careers tag
      await addTags(contactId, [GHL_TAGS.FORM_JOB_APPLICATION]);

      // Add note with application details
      const noteBody = `Job Application: ${jobTitle}
---
Name: ${name}
Email: ${email}
Phone: ${phone || 'N/A'}
LinkedIn: ${linkedin_url || 'N/A'}
Portfolio: ${portfolio_url || 'N/A'}
Video: ${video_intro_url || 'N/A'}
Resume: ${resume_url || 'N/A'}
Cover Letter: ${cover_letter ? 'Provided' : 'N/A'}
Source: ${source_page || 'N/A'}
UTM: ${utm_source || '-'}/${utm_medium || '-'}/${utm_campaign || '-'}
TCPA Consent: ${tcpa_consent ? 'Yes' : 'No'}`;

      await addNote(contactId, noteBody);

      ghlSyncStatus = 'synced';
      console.log('[submit-job-application] GHL sync successful:', contactId);
    } catch (ghlErr) {
      console.error('[submit-job-application] GHL sync error:', ghlErr);
      ghlSyncStatus = 'failed';
      ghlError = ghlErr instanceof Error ? ghlErr.message : 'Unknown GHL error';
    }

    // Update application with GHL sync status
    await supabase
      .from('job_applications')
      .update({
        ghl_contact_id: ghlContactId,
        ghl_sync_status: ghlSyncStatus,
        ghl_synced_at: ghlSyncStatus === 'synced' ? new Date().toISOString() : null,
        ghl_error: ghlError,
      })
      .eq('id', application.id);

    console.log('[submit-job-application] Completed successfully');

    return new Response(
      JSON.stringify({ 
        success: true, 
        id: application.id,
        ghl_sync_status: ghlSyncStatus,
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    console.error('[submit-job-application] Unexpected error:', err);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
