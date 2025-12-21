import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get GitHub credentials from environment
    const githubPat = Deno.env.get("GITHUB_PAT");
    const repoOwner = Deno.env.get("GITHUB_REPO_OWNER");
    const repoName = Deno.env.get("GITHUB_REPO_NAME");

    if (!githubPat || !repoOwner || !repoName) {
      console.error("Missing GitHub environment variables");
      return new Response(
        JSON.stringify({ error: "GitHub credentials not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Get Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Fetch the latest active published theme config
    const { data: publishedConfig, error: fetchError } = await supabase
      .from("published_theme_configs")
      .select("*")
      .eq("is_active", true)
      .order("version", { ascending: false })
      .limit(1)
      .single();

    if (fetchError || !publishedConfig) {
      console.error("Error fetching published config:", fetchError);
      return new Response(
        JSON.stringify({ error: "No active published theme config found. Please publish a theme first." }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const filePath = "src/config/themes.ts";
    const fileContent = publishedConfig.config_typescript;
    const commitMessage = `chore: update theme config to v${publishedConfig.version} (${publishedConfig.source_theme_name})`;

    console.log(`Publishing theme v${publishedConfig.version} to GitHub...`);

    // Step 1: Get current file SHA (if it exists)
    let currentSha: string | null = null;
    const getFileResponse = await fetch(
      `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`,
      {
        headers: {
          Authorization: `Bearer ${githubPat}`,
          Accept: "application/vnd.github.v3+json",
        },
      }
    );

    if (getFileResponse.ok) {
      const fileData = await getFileResponse.json();
      currentSha = fileData.sha;
      console.log(`Found existing file with SHA: ${currentSha}`);
    } else if (getFileResponse.status !== 404) {
      const errorText = await getFileResponse.text();
      console.error("Error checking existing file:", errorText);
      return new Response(
        JSON.stringify({ error: `Failed to check existing file: ${errorText}` }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Step 2: Create or update the file
    const contentBase64 = btoa(unescape(encodeURIComponent(fileContent)));
    
    const updatePayload: Record<string, string> = {
      message: commitMessage,
      content: contentBase64,
      branch: "main",
    };

    if (currentSha) {
      updatePayload.sha = currentSha;
    }

    const updateResponse = await fetch(
      `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${githubPat}`,
          Accept: "application/vnd.github.v3+json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatePayload),
      }
    );

    if (!updateResponse.ok) {
      const errorText = await updateResponse.text();
      console.error("GitHub API error:", errorText);
      return new Response(
        JSON.stringify({ error: `GitHub API error: ${errorText}` }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const result = await updateResponse.json();
    const commitSha = result.commit?.sha;
    const commitUrl = result.commit?.html_url;

    console.log(`Successfully committed: ${commitSha}`);

    return new Response(
      JSON.stringify({
        success: true,
        message: `Theme v${publishedConfig.version} published to GitHub`,
        commitSha,
        commitUrl,
        version: publishedConfig.version,
        themeName: publishedConfig.source_theme_name,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: unknown) {
    console.error("Unexpected error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unexpected error occurred";
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
