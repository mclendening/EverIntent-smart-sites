/**
 * @fileoverview AdminThemes — Thin orchestrator shell for the theme administration system.
 *
 * Implements a mobile-first drill-down navigation pattern:
 * 1. **ThemeListView**: Full-viewport list of themes with dense cards.
 * 2. **ThemeDetailView**: Full-viewport read-only dashboard with actions.
 * 3. **ThemeEditorView**: Full-viewport editor with pill-bar navigation.
 *
 * All state management, CRUD operations, and business logic are encapsulated
 * in the useThemeAdmin hook. This file is purely a routing shell + dialogs.
 *
 * ## Architecture
 * - No split panels — each view occupies 100% of the viewport.
 * - Mobile-first (390px+ optimized), scales gracefully to desktop.
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
 * - Copy this file + useThemeAdmin.ts + ThemeListView + ThemeDetailView +
 *   ThemeEditorView + ThemeSummaryDashboard + ThemeEditorNav + ThemeEditorPanels.
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
// ThemeDetailView eliminated — Hub → Editor directly (Shopify pattern)
import { ThemeEditorView } from '@/components/admin/ThemeEditorView';
import type { StyleModule } from '@/components/admin/StyleModulesEditor';
import type { Json } from '@/integrations/supabase/types';

export default function AdminThemes() {
  const { user } = useAdminAuth();
  const admin = useThemeAdmin();

  // ── Generate production config (kept here because it uses template literals for code generation) ──
  const generateProductionConfig = async () => {
    const activeTheme = admin.themes.find(t => t.is_active);
    if (!activeTheme) {
      return;
    }

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

    const themeName = activeTheme.name;
    const themeId = themeName.toLowerCase().replace(/\s+/g, '-');

    // Build logo config section
    let logoConfigSection = '';
    let logoTypeSection = '';
    if (logoVersion) {
      logoTypeSection = `\n  logoConfig?: {\n    taglineText: string;\n    everConfig: LogoElementConfig;\n    intentConfig: LogoElementConfig;\n    streakConfig: StreakElementConfig;\n    taglineConfig: TaglineElementConfig;\n  };`;
      logoConfigSection = `\n  logoConfig: {\n    taglineText: '${(logoVersion.tagline_text || 'Web Design & Automation').replace(/'/g, "\\'")}',\n    everConfig: ${JSON.stringify(logoVersion.ever_config, null, 4).replace(/\n/g, '\n    ')},\n    intentConfig: ${JSON.stringify(logoVersion.intent_config, null, 4).replace(/\n/g, '\n    ')},\n    streakConfig: ${JSON.stringify(logoVersion.streak_config, null, 4).replace(/\n/g, '\n    ')},\n    taglineConfig: ${JSON.stringify(logoVersion.tagline_config, null, 4).replace(/\n/g, '\n    ')},\n  },`;
    }

    // Generate the full production config (themes.ts content)
    const config = generateThemesTs(activeTheme, accentCfg, staticCols, gradientCfg, darkCols, ecomCols, ctaCfg, typoCfg, motCfg, ghlCfg, modules, assignments, logoVersion, logoTypeSection, logoConfigSection, themeName, themeId);

    admin.setGeneratedConfig(config);

    // Generate CSS
    const cssContent = generateProductionCss(activeTheme, accentCfg, staticCols, darkCols, gradientCfg, ecomCols, ctaCfg, typoCfg, motCfg, ghlCfg, modules);
    admin.setGeneratedCss(cssContent);
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
            onSave={admin.handleSave}
            onCancel={admin.goToDetail}
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

// ─── PRODUCTION CONFIG GENERATORS ────────────────────────────
// These remain in the page file because they produce code-as-strings
// (TypeScript template literals) that are specific to the publish workflow.

function generateThemesTs(
  activeTheme: any, accentCfg: any, staticCols: any, gradientCfg: any,
  darkCols: any, ecomCols: any, ctaCfg: any, typoCfg: any, motCfg: any,
  ghlCfg: any, modules: any[], assignments: any, logoVersion: any,
  logoTypeSection: string, logoConfigSection: string, themeName: string, themeId: string,
): string {
  // This is the same template from the original Themes.tsx generateProductionConfig
  return `/**
 * Static Theme Configuration
 * Generated: ${new Date().toISOString().split('T')[0]}
 * DO NOT edit manually - use admin theme editor.
 */

export interface LogoElementConfig {
  text?: string; enabled?: boolean; size: number; weight: number;
  solidColor: string; useGradient: boolean; gradientFrom: string;
  gradientTo: string; gradientAngle: number; marginLeft: number;
  marginRight: number; verticalOffset?: number;
}

export interface StreakElementConfig {
  length: number; leftThick: number; rightThick: number;
  solidColor: string; useGradient: boolean; gradientFrom: string;
  gradientTo: string; gradientAngle: number; marginLeft: number; marginRight: number;
}

export interface TaglineElementConfig {
  size: number; weight: number; solidColor: string; useGradient: boolean;
  gradientFrom: string; gradientTo: string; gradientAngle: number;
  marginLeft: number; marginRight: number; marginTop: number;
}

export interface ThemeConfig {
  id: string; name: string; baseHue: number;
  accentConfig: { accent: string; accentHover: string; accentGlow: string; accentForeground: string; h: number; s: number; l: number; };
  staticColors: { background: string; foreground: string; card: string; cardForeground: string; popover: string; popoverForeground: string; primary: string; primaryLight: string; primaryForeground: string; secondary: string; secondaryForeground: string; muted: string; mutedForeground: string; border: string; input: string; ring: string; };
  gradientConfigs: { hero: string; cta: string; text: string; };
  ecommerceColors?: { gold: string; goldHover: string; goldGlow: string; goldForeground: string; pricingHighlight: string; };
  ctaVariants?: { primary: string; primaryHover: string; secondary: string; secondaryHover: string; };
  typographyConfig?: { fontHeading: string; fontBody: string; fontDisplay: string; };
  motionConfig?: { transitionSmooth: string; transitionBounce: string; transitionSpring: string; };
  styleModules?: Array<{ name: string; tokens: Array<{ name: string; value: string }>; }>;
  defaultMode?: string;
  darkModeOverrides?: { background: string; foreground: string; card: string; cardForeground: string; popover: string; popoverForeground: string; primary: string; primaryLight: string; primaryForeground: string; secondary: string; secondaryForeground: string; muted: string; mutedForeground: string; border: string; input: string; ring: string; };
  logoVersionId?: string;${logoTypeSection}
}

export interface RouteThemeMapping { route: string; themeId: string; }

export const activeTheme: ThemeConfig = {
  id: '${themeId}',
  name: '${themeName}',
  baseHue: ${activeTheme.base_hue},
  accentConfig: {
    accent: '${accentCfg.accent || '38 92% 50%'}',
    accentHover: '${accentCfg.accentHover || '32 95% 44%'}',
    accentGlow: '${accentCfg.accentGlow || accentCfg.accent || '38 92% 50%'}',
    accentForeground: '${accentCfg.accentForeground || '222 47% 11%'}',
    h: ${accentCfg.h || 38}, s: ${accentCfg.s || 92}, l: ${accentCfg.l || 50},
  },
  staticColors: {
    background: '${staticCols.background || '222 47% 7%'}', foreground: '${staticCols.foreground || '60 9% 98%'}',
    card: '${staticCols.card || '222 47% 10%'}', cardForeground: '${staticCols.cardForeground || '60 9% 98%'}',
    popover: '${staticCols.popover || '222 47% 10%'}', popoverForeground: '${staticCols.popoverForeground || '60 9% 98%'}',
    primary: '${staticCols.primary || '215 25% 27%'}', primaryLight: '${staticCols.primaryLight || '215 20% 40%'}',
    primaryForeground: '${staticCols.primaryForeground || '0 0% 100%'}',
    secondary: '${staticCols.secondary || '222 47% 12%'}', secondaryForeground: '${staticCols.secondaryForeground || '60 9% 98%'}',
    muted: '${staticCols.muted || '222 47% 15%'}', mutedForeground: '${staticCols.mutedForeground || '215 16% 65%'}',
    border: '${staticCols.border || '215 25% 20%'}', input: '${staticCols.input || '215 25% 20%'}',
    ring: '${staticCols.ring || '38 92% 50%'}',
  },
  gradientConfigs: {
    hero: '${gradientCfg.hero || "linear-gradient(135deg, hsl(222 47% 7%) 0%, hsl(222 47% 12%) 50%, hsl(222 47% 7%) 100%)"}',
    cta: '${gradientCfg.cta || "linear-gradient(135deg, hsl(38 92% 50%) 0%, hsl(32 95% 44%) 100%)"}',
    text: '${gradientCfg.text || "linear-gradient(135deg, hsl(38 92% 50%) 0%, hsl(45 93% 58%) 50%, hsl(38 92% 50%) 100%)"}',
  },${activeTheme.logo_version_id ? `\n  logoVersionId: '${activeTheme.logo_version_id}',` : ''}${logoConfigSection}
  ecommerceColors: ${JSON.stringify(activeTheme.ecommerce_colors || {}, null, 4).replace(/\n/g, '\n  ')},
  ctaVariants: ${JSON.stringify(activeTheme.cta_variants || {}, null, 4).replace(/\n/g, '\n  ')},
  typographyConfig: ${JSON.stringify(activeTheme.typography_config || {}, null, 4).replace(/\n/g, '\n  ')},
  motionConfig: ${JSON.stringify(activeTheme.motion_config || {}, null, 4).replace(/\n/g, '\n  ')},
  styleModules: ${JSON.stringify(activeTheme.style_modules || [], null, 4).replace(/\n/g, '\n  ')},
  defaultMode: '${activeTheme.default_mode || 'dark'}',
  darkModeOverrides: ${JSON.stringify(activeTheme.dark_mode_overrides && Object.keys(activeTheme.dark_mode_overrides as object).length > 0 ? activeTheme.dark_mode_overrides : null, null, 4)?.replace(/\n/g, '\n  ') || 'null'},
};

export const routeThemeMappings: RouteThemeMapping[] = [
${(assignments || []).map((a: any) => `  { route: '${a.page_route}', themeId: '${a.theme_id}' },`).join('\n') || '  // No route-specific themes configured'}
];

export const publishedThemes: Record<string, ThemeConfig> = { '${themeId}': activeTheme };

export function getThemeForRoute(pathname: string): ThemeConfig {
  const topLevel = '/' + (pathname.split('/')[1] || '');
  const mapping = routeThemeMappings.find(m => m.route === topLevel);
  if (mapping && publishedThemes[mapping.themeId]) return publishedThemes[mapping.themeId];
  return activeTheme;
}

export function applyThemeToRoot(theme: ThemeConfig): void {
  const root = document.documentElement;
  const isDark = root.classList.contains('dark');
  const colors = (isDark && theme.darkModeOverrides) ? theme.darkModeOverrides : theme.staticColors;
  Object.entries(colors).forEach(([key, value]) => {
    const cssVar = key.replace(/([A-Z])/g, '-\$1').toLowerCase();
    root.style.setProperty(\`--\${cssVar}\`, value);
  });
  root.style.setProperty('--accent', theme.accentConfig.accent);
  root.style.setProperty('--accent-hover', theme.accentConfig.accentHover);
  root.style.setProperty('--accent-glow', theme.accentConfig.accentGlow);
  root.style.setProperty('--accent-foreground', theme.accentConfig.accentForeground);
  root.style.setProperty('--gradient-hero', theme.gradientConfigs.hero);
  root.style.setProperty('--gradient-cta', theme.gradientConfigs.cta);
  root.style.setProperty('--gradient-text', theme.gradientConfigs.text);
  if (theme.ecommerceColors) Object.entries(theme.ecommerceColors).forEach(([key, value]) => { root.style.setProperty(\`--\${key.replace(/([A-Z])/g, '-\$1').toLowerCase()}\`, value); });
  if (theme.ctaVariants) Object.entries(theme.ctaVariants).forEach(([key, value]) => { root.style.setProperty(\`--cta-\${key.replace(/([A-Z])/g, '-\$1').toLowerCase()}\`, value); });
  if (theme.typographyConfig) Object.entries(theme.typographyConfig).forEach(([key, value]) => { root.style.setProperty(\`--\${key.replace(/([A-Z])/g, '-\$1').toLowerCase()}\`, value); });
  if (theme.motionConfig) Object.entries(theme.motionConfig).forEach(([key, value]) => { root.style.setProperty(\`--\${key.replace(/([A-Z])/g, '-\$1').toLowerCase()}\`, value); });
  if (theme.styleModules) theme.styleModules.forEach(mod => { mod.tokens.forEach(tok => { root.style.setProperty(\`--module-\${mod.name}-\${tok.name}\`, tok.value); }); });
}
`;
}

function generateProductionCss(
  theme: any, accentCfg: any, staticCols: any, darkCols: any,
  gradientCfg: any, ecomCols: any, ctaCfg: any, typoCfg: any,
  motCfg: any, ghlCfg: any, modules: any[],
): string {
  const accentParts = (accentCfg.accent || '240 70% 60%').split(' ');
  const h = parseFloat(accentParts[0]) || 240;
  const s = parseFloat(accentParts[1]) || 70;
  const l = parseFloat(accentParts[2]) || 60;
  const lLight = Math.max(l - 10, 30);
  const lLightHover = Math.max(l - 18, 22);
  const lLightGlow = l;

  const styleModulesCss = (Array.isArray(modules) ? modules : [])
    .map((mod: any) => mod.tokens.map((tok: any) => `    --module-${mod.name}-${tok.name}: ${tok.value};`).join('\n'))
    .filter(Boolean).join('\n');

  return `@tailwind base;
@tailwind components;
@tailwind utilities;

/* SmartSites Design System v2.0 — AUTO-GENERATED from: ${theme.name} */

@layer base {
  :root {
    --background: ${h} 20% 98%;
    --foreground: ${h} 47% 11%;
    --card: 0 0% 100%;
    --card-foreground: ${h} 47% 11%;
    --popover: 0 0% 100%;
    --popover-foreground: ${h} 47% 11%;
    --primary: ${h} 47% 11%;
    --primary-light: ${h} 25% 27%;
    --primary-foreground: 0 0% 100%;
    --secondary: ${h} 20% 94%;
    --secondary-foreground: ${h} 47% 11%;
    --muted: ${h} 20% 96%;
    --muted-foreground: ${h} 16% 47%;
    --accent: ${h} ${s}% ${lLight}%;
    --accent-hover: ${h} ${s}% ${lLightHover}%;
    --accent-glow: ${h} ${s}% ${lLightGlow}%;
    --accent-foreground: 0 0% 100%;
    --intent-blue: 200 100% 50%;
    --highlight: 82 84% 50%;
    --highlight-foreground: ${h} 47% 11%;
    --secondary-accent: 200 100% 50%;
    --destructive: 0 62% 50%;
    --destructive-foreground: 0 0% 100%;
    --border: ${h} 20% 88%;
    --input: ${h} 20% 88%;
    --ring: ${h} 92% 50%;
    --radius: 0.75rem;
    --gradient-hero: linear-gradient(135deg, hsl(${h} 20% 96%) 0%, hsl(${h} 20% 92%) 50%, hsl(${h} 20% 96%) 100%);
    --gradient-text: linear-gradient(135deg, hsl(${h} ${s}% ${lLight}%) 0%, hsl(${h + 10} ${s}% ${lLightGlow}%) 50%, hsl(${h} ${s}% ${lLight}%) 100%);
    --gradient-cta: linear-gradient(135deg, hsl(${h} ${s}% ${lLight}%) 0%, hsl(${h + 10} ${s}% ${lLightHover}%) 100%);
    --gradient-glow: radial-gradient(ellipse at center, hsl(${h} ${s}% ${lLight}% / 0.1) 0%, transparent 70%);
    --gradient-mesh: radial-gradient(at 40% 20%, hsl(${h} ${s}% ${lLight}% / 0.06) 0px, transparent 50%), radial-gradient(at 80% 0%, hsl(${h} 25% 27% / 0.08) 0px, transparent 50%), radial-gradient(at 0% 50%, hsl(${h} ${s}% ${lLight}% / 0.04) 0px, transparent 50%);
    --shadow-sm: 0 1px 2px 0 hsl(0 0% 0% / 0.05);
    --shadow-md: 0 4px 6px -1px hsl(0 0% 0% / 0.08), 0 2px 4px -2px hsl(0 0% 0% / 0.05);
    --shadow-lg: 0 10px 15px -3px hsl(0 0% 0% / 0.08), 0 4px 6px -4px hsl(0 0% 0% / 0.05);
    --shadow-xl: 0 20px 25px -5px hsl(0 0% 0% / 0.08), 0 8px 10px -6px hsl(0 0% 0% / 0.05);
    --shadow-glow: 0 0 40px hsl(${h} ${s}% ${lLight}% / 0.15);
    --shadow-glow-lg: 0 0 60px hsl(${h} ${s}% ${lLight}% / 0.2);
    --shadow-button: 0 4px 14px 0 hsl(${h} ${s}% ${lLight}% / 0.2);
    --shadow-gold-glow: 0 0 30px hsl(39 95% 50% / 0.2);
    --sidebar-background: ${h} 20% 96%;
    --sidebar-foreground: ${h} 47% 11%;
    --sidebar-primary: ${h} ${s}% ${lLight}%;
    --sidebar-primary-foreground: 0 0% 100%;
    --sidebar-accent: ${h} 20% 92%;
    --sidebar-accent-foreground: ${h} 47% 11%;
    --sidebar-border: ${h} 20% 88%;
    --sidebar-ring: ${h} ${s}% ${lLight}%;
    --ghl-textarea-bg: ${ghlCfg.textareaBg || `${h} 20% 96%`};
    --ghl-textarea-text: ${ghlCfg.textareaText || `${h} 47% 11%`};
    --ghl-textarea-border: ${ghlCfg.textareaBorder || `${h} 20% 88%`};
    --ghl-textarea-focus-border: ${ghlCfg.textareaFocusBorder || `${h} ${s}% ${lLight}%`};
    --ghl-textarea-focus-glow: ${ghlCfg.textareaFocusGlow || `${h} ${s}% ${lLight}%`};
    --ghl-send-button-bg: ${ghlCfg.sendButtonBg || `${h} ${s}% ${lLight}%`};
    --ghl-send-button-border: ${ghlCfg.sendButtonBorder || '0 0% 100%'};
    --ghl-send-button-icon: ${ghlCfg.sendButtonIcon || '0 0% 100%'};
    --ghl-selection-bg: ${ghlCfg.selectionBg || `${h} ${s}% ${lLight}%`};
    --gold: ${ecomCols.gold || '39 95% 50%'};
    --gold-hover: ${ecomCols.goldHover || '35 95% 44%'};
    --gold-glow: ${ecomCols.goldGlow || '39 95% 60%'};
    --gold-foreground: ${ecomCols.goldForeground || '0 0% 100%'};
    --pricing-highlight: ${ecomCols.pricingHighlight || '39 95% 50%'};
    --cta-primary: ${ctaCfg.primary || `${h} ${s}% ${lLight}%`};
    --cta-primary-hover: ${ctaCfg.primaryHover || `${h} ${s}% ${lLightHover}%`};
    --cta-secondary: ${ctaCfg.secondary || '39 95% 50%'};
    --cta-secondary-hover: ${ctaCfg.secondaryHover || '35 95% 44%'};
    --font-heading: ${typoCfg.fontHeading || "'Space Grotesk', -apple-system, BlinkMacSystemFont, sans-serif"};
    --font-body: ${typoCfg.fontBody || "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"};
    --font-display: ${typoCfg.fontDisplay || "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"};
    --transition-smooth: ${motCfg.transitionSmooth || 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'};
    --transition-bounce: ${motCfg.transitionBounce || 'all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)'};
    --transition-spring: ${motCfg.transitionSpring || 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)'};
${styleModulesCss}  }

  .dark {
    --background: ${darkCols.background || '222 47% 7%'};
    --foreground: ${darkCols.foreground || '60 9% 98%'};
    --card: ${darkCols.card || '222 47% 10%'};
    --card-foreground: ${darkCols.cardForeground || '60 9% 98%'};
    --popover: ${darkCols.popover || '222 47% 10%'};
    --popover-foreground: ${darkCols.popoverForeground || '60 9% 98%'};
    --primary: ${darkCols.primary || '215 25% 27%'};
    --primary-light: ${darkCols.primaryLight || '215 20% 40%'};
    --primary-foreground: ${darkCols.primaryForeground || '0 0% 100%'};
    --secondary: ${darkCols.secondary || '222 47% 12%'};
    --secondary-foreground: ${darkCols.secondaryForeground || '60 9% 98%'};
    --muted: ${darkCols.muted || '222 47% 15%'};
    --muted-foreground: ${darkCols.mutedForeground || '215 16% 65%'};
    --accent: ${accentCfg.accent || '240 70% 60%'};
    --accent-hover: ${accentCfg.accentHover || `${h} ${s}% ${Math.max(l - 10, 20)}%`};
    --accent-glow: ${accentCfg.accentGlow || `${h} ${s}% ${Math.min(l + 10, 80)}%`};
    --accent-foreground: ${accentCfg.accentForeground || '0 0% 100%'};
    --highlight: 82 84% 67%;
    --highlight-foreground: 222 47% 11%;
    --secondary-accent: 200 100% 50%;
    --destructive: 0 62% 30%;
    --destructive-foreground: 60 9% 98%;
    --border: ${darkCols.border || '215 25% 20%'};
    --input: ${darkCols.input || '215 25% 20%'};
    --ring: ${darkCols.ring || accentCfg.accent || '240 70% 60%'};
    --gradient-hero: ${gradientCfg.hero || `linear-gradient(135deg, hsl(222 47% 11%) 0%, hsl(${h} 30% 18%) 50%, hsl(222 47% 11%) 100%)`};
    --gradient-text: ${gradientCfg.text || `linear-gradient(135deg, hsl(${h} ${s}% ${l}%) 0%, hsl(${h + 10} ${s}% ${Math.min(l + 10, 80)}%) 50%, hsl(${h} ${s}% ${l}%) 100%)`};
    --gradient-cta: ${gradientCfg.cta || `linear-gradient(135deg, hsl(${h} ${s}% ${l}%) 0%, hsl(${h + 10} ${s}% ${Math.max(l - 10, 30)}%) 100%)`};
    --gradient-glow: radial-gradient(ellipse at center, hsl(${h} ${s}% ${l}% / 0.2) 0%, transparent 70%);
    --gradient-mesh: radial-gradient(at 40% 20%, hsl(${h} ${s}% ${l}% / 0.12) 0px, transparent 50%), radial-gradient(at 80% 0%, hsl(215 25% 27% / 0.15) 0px, transparent 50%), radial-gradient(at 0% 50%, hsl(${h} ${s}% ${l}% / 0.08) 0px, transparent 50%);
    --shadow-sm: 0 1px 2px 0 hsl(0 0% 0% / 0.3);
    --shadow-md: 0 4px 6px -1px hsl(0 0% 0% / 0.4), 0 2px 4px -2px hsl(0 0% 0% / 0.3);
    --shadow-lg: 0 10px 15px -3px hsl(0 0% 0% / 0.4), 0 4px 6px -4px hsl(0 0% 0% / 0.3);
    --shadow-xl: 0 20px 25px -5px hsl(0 0% 0% / 0.4), 0 8px 10px -6px hsl(0 0% 0% / 0.3);
    --shadow-glow: 0 0 40px hsl(${h} ${s}% ${l}% / 0.25);
    --shadow-glow-lg: 0 0 60px hsl(${h} ${s}% ${l}% / 0.35);
    --shadow-button: 0 4px 14px 0 hsl(${h} ${s}% ${l}% / 0.3);
    --shadow-gold-glow: 0 0 30px hsl(39 95% 50% / 0.3);
    --sidebar-background: 222 47% 9%;
    --sidebar-foreground: 60 9% 98%;
    --sidebar-primary: ${accentCfg.accent || '240 70% 60%'};
    --sidebar-primary-foreground: ${accentCfg.accentForeground || '0 0% 100%'};
    --sidebar-accent: 222 47% 15%;
    --sidebar-accent-foreground: 60 9% 98%;
    --sidebar-border: 215 25% 20%;
    --sidebar-ring: ${accentCfg.accent || '240 70% 60%'};
    --ghl-textarea-bg: ${ghlCfg.textareaBg || darkCols.background || '222 47% 7%'};
    --ghl-textarea-text: ${ghlCfg.textareaText || darkCols.foreground || '60 9% 98%'};
    --ghl-textarea-border: ${ghlCfg.textareaBorder || darkCols.border || '215 25% 20%'};
    --ghl-textarea-focus-border: ${ghlCfg.textareaFocusBorder || accentCfg.accent || '240 70% 60%'};
    --ghl-textarea-focus-glow: ${ghlCfg.textareaFocusGlow || accentCfg.accent || '240 70% 60%'};
    --ghl-send-button-bg: ${ghlCfg.sendButtonBg || accentCfg.accent || '240 70% 60%'};
    --ghl-send-button-border: ${ghlCfg.sendButtonBorder || '0 0% 100%'};
    --ghl-send-button-icon: ${ghlCfg.sendButtonIcon || '0 0% 100%'};
    --ghl-selection-bg: ${ghlCfg.selectionBg || accentCfg.accent || '240 70% 60%'};
    --gold: ${ecomCols.gold || '39 95% 50%'};
    --gold-hover: ${ecomCols.goldHover || '35 95% 44%'};
    --gold-glow: ${ecomCols.goldGlow || '39 95% 60%'};
    --gold-foreground: ${ecomCols.goldForeground || '0 0% 100%'};
    --pricing-highlight: ${ecomCols.pricingHighlight || '39 95% 50%'};
    --cta-primary: ${ctaCfg.primary || '240 70% 60%'};
    --cta-primary-hover: ${ctaCfg.primaryHover || '240 70% 50%'};
    --cta-secondary: ${ctaCfg.secondary || '39 95% 50%'};
    --cta-secondary-hover: ${ctaCfg.secondaryHover || '35 95% 44%'};
  }
}

@layer base {
  * { @apply border-border; }
  html { scroll-behavior: smooth; }
  body { @apply bg-background text-foreground antialiased; font-family: var(--font-body); }
  h1, h2, h3, h4, h5, h6 { font-family: var(--font-heading); @apply font-bold tracking-tight; }
  h1 { @apply text-4xl sm:text-5xl md:text-6xl lg:text-7xl; }
  h2 { @apply text-3xl sm:text-4xl md:text-5xl; }
  h3 { @apply text-2xl sm:text-3xl; }
}

@layer utilities {
  .text-gradient { background: var(--gradient-text); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
  .text-gradient-light { background: linear-gradient(135deg, hsl(var(--foreground)) 0%, hsl(var(--accent)) 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
  .icon-gradient-ocean { background: linear-gradient(135deg, hsl(210 100% 45%) 0%, hsl(195 100% 50%) 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
  .bg-mesh { background: var(--gradient-mesh); }
  .bg-glow { background: var(--gradient-glow); }
  .bg-cta-gradient { background: var(--gradient-cta); }
  .shadow-glow { box-shadow: var(--shadow-glow); }
  .shadow-glow-lg { box-shadow: var(--shadow-glow-lg); }
  .nav-link { @apply relative; }
  .nav-link::after { content: ''; @apply absolute bottom-0 left-0 w-full h-[2px] origin-left scale-x-0 transition-transform duration-300; background: linear-gradient(90deg, hsl(var(--accent)) 0%, hsl(var(--accent) / 0.5) 100%); }
  .nav-link:hover::after { @apply scale-x-100; }
  .nav-link.active::after { @apply scale-x-100; }
  .story-link { @apply relative inline-block; }
  .story-link::after { content: ''; @apply absolute w-full h-0.5 bottom-0 left-0 origin-bottom-right transition-transform duration-300 scale-x-0; background: hsl(var(--accent)); }
  .story-link:hover::after { @apply origin-bottom-left scale-x-100; }
  .glass { @apply bg-background/80 backdrop-blur-lg border border-border/50; }
  .glass-dark { @apply bg-primary/80 backdrop-blur-lg border border-border/20; }
  .shadow-layered { box-shadow: 0 1px 2px hsl(0 0% 0% / 0.05), 0 4px 8px hsl(0 0% 0% / 0.05), 0 16px 32px hsl(0 0% 0% / 0.05); }
  .shadow-layered-lg { box-shadow: 0 2px 4px hsl(0 0% 0% / 0.03), 0 8px 16px hsl(0 0% 0% / 0.05), 0 24px 48px hsl(0 0% 0% / 0.08); }
  .border-glow { position: relative; }
  .border-glow::before { content: ''; position: absolute; inset: -2px; border-radius: inherit; background: var(--gradient-cta); z-index: -1; opacity: 0; transition: opacity 0.3s ease; }
  .border-glow:hover::before { opacity: 1; }
  .border-gradient-top { position: relative; }
  .border-gradient-top::before { content: ''; @apply absolute top-0 left-0 right-0 h-px; background: linear-gradient(90deg, transparent 0%, hsl(var(--accent) / 0.5) 50%, transparent 100%); }
  .fade-edges-x { mask-image: linear-gradient(90deg, transparent 0%, black 10%, black 90%, transparent 100%); -webkit-mask-image: linear-gradient(90deg, transparent 0%, black 10%, black 90%, transparent 100%); }
  .pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
  .bg-radial-vignette { background: radial-gradient(ellipse 50% 50% at 50% 50%, hsl(var(--background) / 0.95) 0%, hsl(var(--background) / 0.8) 30%, hsl(var(--background) / 0.3) 60%, transparent 100%); }
  .footer-link { @apply relative text-muted-foreground transition-all duration-300; }
  .footer-link:hover { @apply text-foreground pl-1; }
  .footer-link::before { content: ''; @apply absolute left-0 top-1/2 -translate-y-1/2 w-0 h-0.5 bg-accent transition-all duration-300; }
  .footer-link:hover::before { @apply w-2; }
}

@layer components {
  .btn-glow { @apply relative overflow-hidden; box-shadow: var(--shadow-button); }
  .btn-glow::before { content: ''; position: absolute; inset: 0; background: linear-gradient(90deg, transparent, hsl(0 0% 100% / 0.2), transparent); transform: translateX(-100%); transition: transform 0.5s ease; }
  .btn-glow:hover::before { transform: translateX(100%); }
  .btn-glow:hover { box-shadow: var(--shadow-glow); }
  .card-hover { @apply transition-all duration-300 border border-border/50; }
  .card-hover:hover { @apply border-accent/50; box-shadow: var(--shadow-glow); transform: translateY(-2px); }
  .section { @apply py-16 sm:py-20 md:py-24 lg:py-32; }
  .hero { @apply relative min-h-[80vh] flex items-center justify-center overflow-hidden; background: var(--gradient-hero); }
  .hero::before { content: ''; @apply absolute inset-0 bg-mesh pointer-events-none; }
}

#chat-widget, .chat-widget, [class*="chat-widget"], .leadconnector-chat { z-index: 40 !important; }
::selection { background: hsl(var(--accent) / 0.3); color: hsl(var(--foreground)); }
::-webkit-scrollbar { width: 8px; height: 8px; }
::-webkit-scrollbar-track { background: hsl(var(--muted)); }
::-webkit-scrollbar-thumb { background: hsl(var(--muted-foreground) / 0.5); border-radius: 4px; }
::-webkit-scrollbar-thumb:hover { background: hsl(var(--muted-foreground) / 0.7); }`;
}
