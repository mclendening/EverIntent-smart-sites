/**
 * @fileoverview AdminThemes — Thin orchestrator shell for the theme administration system.
 *
 * Implements a Shopify + Shadcn hybrid 2-level navigation pattern:
 * 1. **ThemeListView (Hub)**: Visual card grid with ThemeMockup previews using actual theme tokens.
 * 2. **ThemeEditorView (Editor)**: Split-screen — compact control sidebar (left) + live component
 *    canvas (right) showing actual themed UI that updates in real-time.
 *
 * The Detail view was eliminated (2026-02-13) to match Shopify/Shadcn patterns where clicking
 * a theme card goes directly to the editor. All actions (save, revert, publish, export) live
 * in the editor toolbar.
 *
 * All state management, CRUD operations, and business logic are encapsulated
 * in the useThemeAdmin hook. This file is purely a routing shell + dialogs.
 *
 * ## Architecture
 * - Hub: Visual preview cards → click → Editor (2-level, no intermediate detail view).
 * - Editor: Left sidebar (~360px) with ThemeEditorNav + ThemeEditorPanels.
 *   Right panel: ThemeLiveCanvas rendering nav, hero, trust bar, cards, testimonial, CTA form.
 * - Mobile: Controls/Preview toggle replaces split-screen on <lg viewports.
 * - Dialogs (Publish, Revert, Save Default) live here since they're
 *   cross-cutting concerns shared across views.
 *
 * ## Data Contract
 * - All data flows through useThemeAdmin hook.
 * - Publish workflow generates production TypeScript + CSS configs and
 *   optionally commits to GitHub via sync-theme-to-github edge function.
 *
 * ## Security
 * - Protected by AdminGuard (useAdminAuth).
 * - All database operations use authenticated Supabase client.
 *
 * ## SSG Compatibility
 * - Admin-only route, not SSG-rendered.
 *
 * ## Portability
 * - Copy this file + useThemeAdmin.ts + ThemeListView + ThemeLiveCanvas +
 *   ThemeEditorView + ThemeEditorNav + ThemeEditorPanels.
 *   Requires site_themes, published_theme_configs, logo_versions tables.
 */

import { Link } from 'react-router-dom';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { useThemeAdmin } from '@/hooks/useThemeAdmin';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { ArrowLeft, Rocket, Eye, Download, Loader2, Copy, CheckCircle, Github, AlertTriangle, Save } from 'lucide-react';
import { ThemeListView } from '@/components/admin/ThemeListView';

import { ThemeEditorView } from '@/components/admin/ThemeEditorView';
import type { StyleModule } from '@/components/admin/StyleModulesEditor';
import type { Json } from '@/integrations/supabase/types';
import { generateThemesTs, generateProductionCss, type ThemeGeneratorParams } from '@/lib/themePublisher';

export default function AdminThemes() {
  const { user } = useAdminAuth();
  const admin = useThemeAdmin();

  // ── Generate production config using extracted themePublisher module ──
  const generateProductionConfig = async () => {
    const activeTheme = admin.themes.find(t => t.is_active);
    if (!activeTheme) return;

    // Fetch page assignments and logo config in parallel
    const [assignmentsResult, logoResult] = await Promise.all([
      supabase.from('page_theme_assignments').select('page_route, theme_id'),
      activeTheme.logo_version_id
        ? supabase.from('logo_versions').select('*').eq('id', activeTheme.logo_version_id).single()
        : Promise.resolve({ data: null }),
    ]);

    const assignments = assignmentsResult.data;
    const logoVersion = logoResult.data;

    const accentCfg = activeTheme.accent_config as Record<string, any>;
    const staticCols = activeTheme.static_colors as Record<string, string>;
    const gradientCfg = activeTheme.gradient_configs as Record<string, string>;
    const darkOverrides = activeTheme.dark_mode_overrides as Record<string, string> || {};
    const hasDarkOverrides = Object.keys(darkOverrides).length > 0;
    const darkCols = hasDarkOverrides ? darkOverrides : staticCols;
    const ecomCols = activeTheme.ecommerce_colors as Record<string, string> || {};
    const ctaCfg = activeTheme.cta_variants as Record<string, string> || {};
    const typoCfg = activeTheme.typography_config as Record<string, string> || {};
    const motCfg = activeTheme.motion_config as Record<string, string> || {};
    const ghlCfg = activeTheme.ghl_chat_config as Record<string, string> || {};
    const modules = activeTheme.style_modules as unknown as StyleModule[] || [];

    // Build logo config sections
    let logoConfigSection = '';
    let logoTypeSection = '';
    if (logoVersion) {
      logoTypeSection = `\n  logoConfig?: {\n    taglineText: string;\n    everConfig: LogoElementConfig;\n    intentConfig: LogoElementConfig;\n    streakConfig: StreakElementConfig;\n    taglineConfig: TaglineElementConfig;\n  };`;
      logoConfigSection = `\n  logoConfig: {\n    taglineText: '${(logoVersion.tagline_text || 'Web Design & Automation').replace(/'/g, "\\'")}',\n    everConfig: ${JSON.stringify(logoVersion.ever_config, null, 4).replace(/\n/g, '\n    ')},\n    intentConfig: ${JSON.stringify(logoVersion.intent_config, null, 4).replace(/\n/g, '\n    ')},\n    streakConfig: ${JSON.stringify(logoVersion.streak_config, null, 4).replace(/\n/g, '\n    ')},\n    taglineConfig: ${JSON.stringify(logoVersion.tagline_config, null, 4).replace(/\n/g, '\n    ')},\n  },`;
    }

    const params: ThemeGeneratorParams = {
      activeTheme, accentCfg, staticCols, gradientCfg, darkCols, ecomCols,
      ctaCfg, typoCfg, motCfg, ghlCfg, modules, assignments, logoVersion,
      logoTypeSection, logoConfigSection,
    };

    admin.setGeneratedConfig(generateThemesTs(params));
    admin.setGeneratedCss(generateProductionCss(params));
    admin.setShowPublishDialog(true);
  };

  // Copy to clipboard
  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(admin.generatedConfig);
    admin.setCopied(true);
    setTimeout(() => admin.setCopied(false), 2000);
  };

  // Save to database
  const saveToDatabase = async (): Promise<number | null> => {
    const activeTheme = admin.themes.find(t => t.is_active);
    if (!activeTheme || !admin.generatedConfig) return null;
    try {
      const { data: versionData } = await supabase.rpc('get_next_theme_config_version');
      const nextVersion = versionData || 1;
      const { error } = await supabase.from('published_theme_configs').insert({
        source_theme_id: activeTheme.id, source_theme_name: activeTheme.name,
        version: nextVersion, config_typescript: admin.generatedConfig, config_css: admin.generatedCss,
        config_json: { accentConfig: activeTheme.accent_config, staticColors: activeTheme.static_colors, darkModeOverrides: activeTheme.dark_mode_overrides, gradientConfigs: activeTheme.gradient_configs } as unknown as Json,
        is_active: true, notes: 'Published from admin UI',
      });
      if (error) throw error;
      await supabase.from('published_theme_configs').update({ is_active: false }).neq('version', nextVersion);
      admin.setPublishedVersion(nextVersion);
      return nextVersion;
    } catch (error) {
      console.error('Error saving to database:', error);
      return null;
    }
  };

  // Publish to GitHub
  const publishToGithub = async () => {
    admin.setIsPublishingToGithub(true);
    admin.setCommitUrl(null);
    try {
      const version = await saveToDatabase();
      if (!version) { admin.setIsPublishingToGithub(false); return; }
      const { data, error } = await supabase.functions.invoke('sync-theme-to-github');
      if (error) throw error;
      if (data?.success) {
        admin.setCommitUrl(data.commitUrl);
      } else {
        throw new Error(data?.error || 'Unknown error');
      }
    } catch (error) {
      console.error('GitHub publish error:', error);
    } finally {
      admin.setIsPublishingToGithub(false);
    }
  };

  if (admin.loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* ── Global Header ── */}
      <header className="border-b border-border bg-card shrink-0">
        <div className="flex h-12 items-center justify-between px-3">
          <div className="flex items-center gap-2">
            <Link to="/admin">
              <Button variant="ghost" size="sm" className="px-2">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <h1 className="text-sm font-bold">Themes</h1>
          </div>
          <div className="flex items-center gap-1.5">
            <Button
              onClick={generateProductionConfig}
              size="sm"
              className="text-[10px] h-7 px-2 bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              <Rocket className="h-3 w-3 mr-1" />
              <span className="hidden sm:inline">Publish</span>
            </Button>
            <span className="hidden md:inline text-[10px] text-muted-foreground">{user?.email}</span>
          </div>
        </div>
      </header>

      {/* ── Drill-down views ── */}
      <main className="flex-1 min-h-0">
        {admin.view === 'list' && (
          <ThemeListView
            themes={admin.themes}
            onSelect={admin.selectTheme}
            onSetActive={admin.handleSetActive}
            onDelete={admin.handleDelete}
          />
        )}

        {/* Detail view eliminated — Hub goes directly to Editor (Shopify pattern) */}

        {admin.view === 'editor' && admin.selectedTheme && (
          <ThemeEditorView
            selectedTheme={admin.selectedTheme}
            setSelectedTheme={admin.setSelectedTheme}
            themes={admin.themes}
            fetchData={admin.fetchData}
            editorSection={admin.editorSection}
            setEditorSection={admin.setEditorSection}
            accentConfig={admin.accentConfig}
            setAccentConfig={admin.setAccentConfig}
            staticColors={admin.staticColors}
            setStaticColors={admin.setStaticColors}
            gradientConfigs={admin.gradientConfigs}
            setGradientConfigs={admin.setGradientConfigs}
            ghlChatConfig={admin.ghlChatConfig}
            setGhlChatConfig={admin.setGhlChatConfig}
            darkModeOverrides={admin.darkModeOverrides}
            setDarkModeOverrides={admin.setDarkModeOverrides}
            ecommerceColors={admin.ecommerceColors}
            setEcommerceColors={admin.setEcommerceColors}
            ctaVariants={admin.ctaVariants}
            setCtaVariants={admin.setCtaVariants}
            typographyConfig={admin.typographyConfig}
            setTypographyConfig={admin.setTypographyConfig}
            motionConfig={admin.motionConfig}
            setMotionConfig={admin.setMotionConfig}
            styleModules={admin.styleModules}
            setStyleModules={admin.setStyleModules}
            defaultMode={admin.defaultMode}
            setDefaultMode={admin.setDefaultMode}
            adaWidgetConfig={admin.adaWidgetConfig}
            setAdaWidgetConfig={admin.setAdaWidgetConfig}
            isSaving={admin.isSaving}
            isDirty={admin.isDirty}
            onSave={admin.handleSave}
            onCancel={admin.goToList}
            onRevert={() => admin.setShowRevertWarning1(true)}
            onSaveDefault={() => admin.setShowSaveDefaultWarning1(true)}
          />
        )}
      </main>

      {/* ── Publish Dialog ── */}
      <Dialog open={admin.showPublishDialog} onOpenChange={(open) => {
        admin.setShowPublishDialog(open);
        if (!open) { admin.setCommitUrl(null); admin.setPublishedVersion(null); }
      }}>
        <DialogContent className="max-w-4xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Rocket className="h-5 w-5 text-accent" />
              Publish Theme to Production
            </DialogTitle>
            <DialogDescription>
              Publish to GitHub or copy to clipboard.
            </DialogDescription>
          </DialogHeader>
          {admin.commitUrl && (
            <div className="flex items-center gap-2 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span className="text-sm">
                Published v{admin.publishedVersion}!{' '}
                <a href={admin.commitUrl} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">View commit →</a>
              </span>
            </div>
          )}
          <ScrollArea className="h-[45vh] border rounded-lg">
            <pre className="p-4 text-xs font-mono bg-muted/50">{admin.generatedConfig}</pre>
          </ScrollArea>
          <div className="flex justify-between gap-2">
            <Button variant="outline" onClick={() => admin.setShowPublishDialog(false)}>Cancel</Button>
            <div className="flex gap-2">
              <Button variant="outline" onClick={copyToClipboard}>
                {admin.copied ? <><CheckCircle className="h-4 w-4 mr-2" />Copied!</> : <><Copy className="h-4 w-4 mr-2" />Copy</>}
              </Button>
              <Button onClick={publishToGithub} disabled={admin.isPublishingToGithub} className="bg-accent hover:bg-accent/90 text-accent-foreground">
                {admin.isPublishingToGithub ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Publishing...</> : <><Github className="h-4 w-4 mr-2" />Publish</>}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* ── Revert Warning 1 ── */}
      <AlertDialog open={admin.showRevertWarning1} onOpenChange={admin.setShowRevertWarning1}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />Revert to Default?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This discards all edits and restores "{admin.selectedTheme?.name}" to its saved default. Export first as backup.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-col sm:flex-row gap-2">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button variant="outline" onClick={admin.exportCurrentThemeJson}><Download className="h-4 w-4 mr-2" />Export First</Button>
            <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => { admin.setShowRevertWarning1(false); admin.setShowRevertWarning2(true); }}>
              Continue to Revert
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* ── Revert Warning 2 ── */}
      <AlertDialog open={admin.showRevertWarning2} onOpenChange={admin.setShowRevertWarning2}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="h-5 w-5" />Final Confirmation
            </AlertDialogTitle>
            <AlertDialogDescription>
              <strong>This cannot be undone.</strong> All unsaved changes to "{admin.selectedTheme?.name}" will be permanently lost.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={admin.handleRevertToDefault} disabled={admin.isReverting}>
              {admin.isReverting ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Reverting...</> : 'Yes, Revert'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* ── Save Default Warning 1 ── */}
      <AlertDialog open={admin.showSaveDefaultWarning1} onOpenChange={admin.setShowSaveDefaultWarning1}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <Save className="h-5 w-5 text-accent" />Save Current as Default?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This overwrites the default snapshot for "{admin.selectedTheme?.name}". The previous default will be lost.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-col sm:flex-row gap-2">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button variant="outline" onClick={admin.exportCurrentThemeJson}><Download className="h-4 w-4 mr-2" />Export First</Button>
            <AlertDialogAction onClick={() => { admin.setShowSaveDefaultWarning1(false); admin.setShowSaveDefaultWarning2(true); }}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* ── Save Default Warning 2 ── */}
      <AlertDialog open={admin.showSaveDefaultWarning2} onOpenChange={admin.setShowSaveDefaultWarning2}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-accent" />Confirm Overwrite
            </AlertDialogTitle>
            <AlertDialogDescription>
              <strong>The current default will be permanently replaced.</strong>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={admin.handleSaveAsDefault} disabled={admin.isSavingDefault}>
              {admin.isSavingDefault ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Saving...</> : 'Yes, Save as Default'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

// Production config generators extracted to src/lib/themePublisher.ts (Batch 4)
