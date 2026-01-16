import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email } = await req.json();

    if (!email) {
      console.error('No email provided');
      return new Response(
        JSON.stringify({ error: 'Email is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Sending password reset for: ${email}`);

    // Create Supabase client with service role key
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Check if email is in allowed_admin_emails
    const { data: allowedEmail, error: checkError } = await supabaseAdmin
      .from('allowed_admin_emails')
      .select('email')
      .eq('email', email.toLowerCase())
      .maybeSingle();

    if (checkError) {
      console.error('Error checking allowed emails:', checkError);
      return new Response(
        JSON.stringify({ error: 'Error verifying email' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!allowedEmail) {
      console.log(`Email not in allowed list: ${email}`);
      return new Response(
        JSON.stringify({ error: 'Email not authorized for admin access' }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Email authorized, sending password reset to: ${email}`);

    // ALWAYS use production URL - this must match Supabase Redirect URLs exactly
    const redirectUrl = 'https://everintent.com/admin/reset-password';
    console.log(`Redirect URL: ${redirectUrl}`);

    // Send password reset email - this triggers PASSWORD_RECOVERY event
    const { error: resetError } = await supabaseAdmin.auth.resetPasswordForEmail(
      email.toLowerCase(),
      {
        redirectTo: redirectUrl,
      }
    );

    if (resetError) {
      console.error('Error sending password reset:', resetError);
      return new Response(
        JSON.stringify({ error: 'Failed to send password reset link' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Password reset sent successfully to: ${email}`);

    return new Response(
      JSON.stringify({ success: true, message: 'Password reset link sent to your email' }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Unexpected error:', error);
    return new Response(
      JSON.stringify({ error: 'An unexpected error occurred' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
