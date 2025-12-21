import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface FileUpdate {
  path: string;
  content: string;
  sha?: string;
}

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

    console.log(`Publishing theme v${publishedConfig.version} to GitHub...`);

    // Define files to update
    const filesToUpdate: FileUpdate[] = [
      {
        path: "src/config/themes.ts",
        content: publishedConfig.config_typescript,
      },
    ];

    // Add CSS file if it exists
    if (publishedConfig.config_css) {
      filesToUpdate.push({
        path: "src/index.css",
        content: publishedConfig.config_css,
      });
    }

    // Get current SHAs for all files
    for (const file of filesToUpdate) {
      const getFileResponse = await fetch(
        `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${file.path}`,
        {
          headers: {
            Authorization: `Bearer ${githubPat}`,
            Accept: "application/vnd.github.v3+json",
          },
        }
      );

      if (getFileResponse.ok) {
        const fileData = await getFileResponse.json();
        file.sha = fileData.sha;
        console.log(`Found existing ${file.path} with SHA: ${file.sha}`);
      } else if (getFileResponse.status !== 404) {
        const errorText = await getFileResponse.text();
        console.error(`Error checking ${file.path}:`, errorText);
      }
    }

    // Create a tree with all file changes
    const treeItems = filesToUpdate.map((file) => ({
      path: file.path,
      mode: "100644" as const,
      type: "blob" as const,
      content: file.content,
    }));

    // Get the current commit SHA for the main branch
    const refResponse = await fetch(
      `https://api.github.com/repos/${repoOwner}/${repoName}/git/refs/heads/main`,
      {
        headers: {
          Authorization: `Bearer ${githubPat}`,
          Accept: "application/vnd.github.v3+json",
        },
      }
    );

    if (!refResponse.ok) {
      const errorText = await refResponse.text();
      console.error("Error getting branch ref:", errorText);
      return new Response(
        JSON.stringify({ error: `Failed to get branch ref: ${errorText}` }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const refData = await refResponse.json();
    const baseCommitSha = refData.object.sha;
    console.log(`Base commit SHA: ${baseCommitSha}`);

    // Get the base tree
    const baseCommitResponse = await fetch(
      `https://api.github.com/repos/${repoOwner}/${repoName}/git/commits/${baseCommitSha}`,
      {
        headers: {
          Authorization: `Bearer ${githubPat}`,
          Accept: "application/vnd.github.v3+json",
        },
      }
    );

    if (!baseCommitResponse.ok) {
      const errorText = await baseCommitResponse.text();
      console.error("Error getting base commit:", errorText);
      return new Response(
        JSON.stringify({ error: `Failed to get base commit: ${errorText}` }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const baseCommitData = await baseCommitResponse.json();
    const baseTreeSha = baseCommitData.tree.sha;

    // Create a new tree
    const createTreeResponse = await fetch(
      `https://api.github.com/repos/${repoOwner}/${repoName}/git/trees`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${githubPat}`,
          Accept: "application/vnd.github.v3+json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          base_tree: baseTreeSha,
          tree: treeItems,
        }),
      }
    );

    if (!createTreeResponse.ok) {
      const errorText = await createTreeResponse.text();
      console.error("Error creating tree:", errorText);
      return new Response(
        JSON.stringify({ error: `Failed to create tree: ${errorText}` }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const newTree = await createTreeResponse.json();
    console.log(`Created new tree: ${newTree.sha}`);

    // Create a commit
    const filesUpdated = filesToUpdate.map(f => f.path.split('/').pop()).join(' and ');
    const commitMessage = `chore: update theme config to v${publishedConfig.version} (${publishedConfig.source_theme_name})\n\nUpdated files: ${filesUpdated}`;

    const createCommitResponse = await fetch(
      `https://api.github.com/repos/${repoOwner}/${repoName}/git/commits`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${githubPat}`,
          Accept: "application/vnd.github.v3+json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: commitMessage,
          tree: newTree.sha,
          parents: [baseCommitSha],
        }),
      }
    );

    if (!createCommitResponse.ok) {
      const errorText = await createCommitResponse.text();
      console.error("Error creating commit:", errorText);
      return new Response(
        JSON.stringify({ error: `Failed to create commit: ${errorText}` }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const newCommit = await createCommitResponse.json();
    console.log(`Created commit: ${newCommit.sha}`);

    // Update the branch reference
    const updateRefResponse = await fetch(
      `https://api.github.com/repos/${repoOwner}/${repoName}/git/refs/heads/main`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${githubPat}`,
          Accept: "application/vnd.github.v3+json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sha: newCommit.sha,
        }),
      }
    );

    if (!updateRefResponse.ok) {
      const errorText = await updateRefResponse.text();
      console.error("Error updating ref:", errorText);
      return new Response(
        JSON.stringify({ error: `Failed to update branch: ${errorText}` }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const commitUrl = `https://github.com/${repoOwner}/${repoName}/commit/${newCommit.sha}`;
    console.log(`Successfully committed: ${newCommit.sha}`);
    console.log(`Files updated: ${filesToUpdate.map(f => f.path).join(', ')}`);

    return new Response(
      JSON.stringify({
        success: true,
        message: `Theme v${publishedConfig.version} published to GitHub`,
        commitSha: newCommit.sha,
        commitUrl,
        version: publishedConfig.version,
        themeName: publishedConfig.source_theme_name,
        filesUpdated: filesToUpdate.map(f => f.path),
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