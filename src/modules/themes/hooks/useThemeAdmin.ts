/**
 * @fileoverview useThemeAdmin — Portable state management hook for the theme administration system.
 *
 * Encapsulates all CRUD operations, config parsing, publish/revert/export workflows,
 * and local state for the theme admin UI. Decoupled from any specific layout or view
 * so the same hook powers the Hub (list) and Editor (split-screen) views.
 *
 * ## Data Contract
 * - Reads/writes `site_themes` table (JSONB columns: accent_config, static_colors,
 *   dark_mode_overrides, gradient_configs, ghl_chat_config, ecommerce_colors,
 *   cta_variants, typography_config, motion_config, style_modules, ada_widget_config).
 * - Reads `logo_versions` table for logo configuration.
 * - Reads/writes `published_theme_configs` for revert snapshots and GitHub publish.
 * - Calls `sync-theme-to-github` edge function for production deployment.
 * - Calls `get_next_theme_config_version` RPC for version sequencing.
 *
 * ## Null Safety
 * All JSONB-sourced values are parsed with defensive fallbacks. Partially-populated
 * themes will not crash the UI — every field has a sensible default.
 *
 * ## Security
 * - Must be used within an AdminGuard-protected route.
 * - All DB operations use the authenticated Supabase client.
 *
 * ## SSG Compatibility
 * - Admin-only hook, never called during SSG/pre-render.
 *
 * ## Portability
 * - Copy this file + types.ts to any Lovable project with the same Supabase schema.
 * - Requires: @supabase/supabase-js, site_themes table, published_theme_configs table,
 *   logo_versions table, sync-theme-to-github edge function.
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useLogoExport } from '@/components/logo';
import type { Tables, Json } from '@/integrations/supabase/types';
import type { EcommerceColors, CtaVariants } from '../components/EcommerceColorEditor';
import type { TypographyConfig } from '../components/TypographyEditor';
import type { MotionConfig } from '../components/MotionEditor';
import type { StyleModule } from '../components/StyleModulesEditor';
import type { AdaWidgetConfig } from '../components/AdaWidgetConfigEditor';
import { DARK_MODE_DEFAULTS, type DarkModeOverrides } from '../components/DarkModeOverridesEditor';
import type { EditorSection } from '../components/ThemeEditorNav';

// ─── TYPES ───────────────────────────────────────────────────

export type Theme = Tables<'site_themes'>;
export type LogoVersion = Tables<'logo_versions'>;

/** Navigation views — 2-level: Hub → Editor (Shopify pattern, no detail view) */
export type ThemeAdminView = 'list' | 'editor';

export interface AccentConfig {
  accent: string;
  h: number;
  s: number;
  l: number;
  useGradient?: boolean;
  gradientFrom?: string;
  gradientTo?: string;
  gradientAngle?: number;
  hoverBrightness?: number;
  iconGlowOpacity?: number;
}

export interface StaticColors {
  primary: string;
  primaryLight: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  background: string;
  foreground: string;
  card: string;
  cardForeground: string;
  muted: string;
  mutedForeground: string;
  border: string;
  input: string;
  ring: string;
  popover: string;
  popoverForeground: string;
}

export interface GradientConfig {
  hero?: string;
  cta?: string;
  text?: string;
}

export interface GHLChatConfig {
  textareaBg: string;
  textareaText: string;
  textareaBorder: string;
  textareaFocusBorder: string;
  textareaFocusGlow: string;
  sendButtonBg: string;
  sendButtonBorder: string;
  sendButtonIcon: string;
  selectionBg: string;
}

// ─── DEFAULTS ────────────────────────────────────────────────

const DEFAULT_ACCENT: AccentConfig = {
  accent: '38 92% 50%', h: 38, s: 92, l: 50,
};

const DEFAULT_STATIC_COLORS: StaticColors = {
  primary: '222 47% 11%', primaryLight: '215 25% 27%', primaryForeground: '0 0% 100%',
  secondary: '60 9% 98%', secondaryForeground: '222 47% 11%',
  background: '0 0% 100%', foreground: '222 47% 11%',
  card: '0 0% 100%', cardForeground: '222 47% 11%',
  muted: '60 5% 96%', mutedForeground: '215 16% 47%',
  border: '220 13% 91%', input: '220 13% 91%', ring: '38 92% 50%',
  popover: '0 0% 100%', popoverForeground: '222 47% 11%',
};

const DEFAULT_GHL: GHLChatConfig = {
  textareaBg: '222 47% 7%', textareaText: '60 9% 98%', textareaBorder: '215 25% 20%',
  textareaFocusBorder: '240 70% 60%', textareaFocusGlow: '240 70% 60%',
  sendButtonBg: '240 70% 60%', sendButtonBorder: '0 0% 100%',
  sendButtonIcon: '0 0% 100%', selectionBg: '240 70% 60%',
};

const DEFAULT_ECOMMERCE: EcommerceColors = {
  gold: '39 95% 50%', goldHover: '35 95% 44%', goldGlow: '39 95% 60%',
  goldForeground: '0 0% 100%', pricingHighlight: '39 95% 50%',
};

const DEFAULT_CTA: CtaVariants = {
  primary: '240 70% 60%', primaryHover: '240 70% 50%',
  secondary: '39 95% 50%', secondaryHover: '35 95% 44%',
};

const DEFAULT_TYPOGRAPHY: TypographyConfig = {
  fontHeading: 'Space Grotesk, -apple-system, BlinkMacSystemFont, sans-serif',
  fontBody: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
  fontDisplay: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
};

const DEFAULT_MOTION: MotionConfig = {
  transitionSmooth: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  transitionBounce: 'all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  transitionSpring: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
};

const DEFAULT_ADA: AdaWidgetConfig = {
  enabled: true, position: 'bottom-right', hideOnMobile: false, hideOnDesktop: false,
  pauseUntil: null, hiddenIndefinitely: false, iconType: 'universal',
  iconColor: '0 0% 100%', iconBgColor: '240 70% 60%', iconSize: 48,
  iconShape: 'circle', readingHandleSize: 28,
};

// ─── HELPER FUNCTIONS ────────────────────────────────────────

/** Extract accent HSL string from theme's accent_config JSONB */
export function getAccentColor(theme: Theme): string {
  const config = theme.accent_config as Record<string, string>;
  return config?.accent || '38 92% 50%';
}

/** Parse HSL string "H S% L%" into object */
export function parseHsl(hslStr: string): { h: number; s: number; l: number } {
  const parts = hslStr.split(' ').map((p) => parseFloat(p.replace('%', '')));
  return { h: parts[0] || 0, s: parts[1] || 0, l: parts[2] || 0 };
}

/** Format HSL object back to "H S% L%" string */
export function formatHsl(h: number, s: number, l: number): string {
  return `${Math.round(h)} ${Math.round(s)}% ${Math.round(l)}%`;
}

/** Convert HSL values to hex color string */
export function hslToHex(h: number, s: number, l: number): string {
  const sNorm = s / 100;
  const lNorm = l / 100;
  const c = (1 - Math.abs(2 * lNorm - 1)) * sNorm;
  const x = c * (1 - Math.abs((h / 60) % 2 - 1));
  const m = lNorm - c / 2;
  let r = 0, g = 0, b = 0;
  if (h < 60) { r = c; g = x; }
  else if (h < 120) { r = x; g = c; }
  else if (h < 180) { g = c; b = x; }
  else if (h < 240) { g = x; b = c; }
  else if (h < 300) { r = x; b = c; }
  else { r = c; b = x; }
  const toHex = (n: number) => Math.round((n + m) * 255).toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

// ─── PARSE THEME CONFIG ──────────────────────────────────────

/** Parse all JSONB columns from a theme row into typed config objects */
function parseThemeConfig(theme: Theme) {
  const accent = theme.accent_config as Record<string, any> || {};
  const accentStr = accent.accent || '38 92% 50%';
  const parts = accentStr.split(' ').map((p: string) => parseFloat(p));

  const accentConfig: AccentConfig = {
    accent: accentStr, h: parts[0] || 38, s: parts[1] || 92, l: parts[2] || 50,
    useGradient: accent.useGradient || false,
    gradientFrom: accent.gradientFrom || '#F97316',
    gradientTo: accent.gradientTo || '#EF4444',
    gradientAngle: accent.gradientAngle || 90,
    hoverBrightness: accent.hoverBrightness ?? 1.1,
    iconGlowOpacity: accent.iconGlowOpacity ?? 0.3,
  };

  const colors = theme.static_colors as Record<string, string> || {};
  const staticColors: StaticColors = {
    primary: colors.primary || DEFAULT_STATIC_COLORS.primary,
    primaryLight: colors.primaryLight || DEFAULT_STATIC_COLORS.primaryLight,
    primaryForeground: colors.primaryForeground || DEFAULT_STATIC_COLORS.primaryForeground,
    secondary: colors.secondary || DEFAULT_STATIC_COLORS.secondary,
    secondaryForeground: colors.secondaryForeground || DEFAULT_STATIC_COLORS.secondaryForeground,
    background: colors.background || DEFAULT_STATIC_COLORS.background,
    foreground: colors.foreground || DEFAULT_STATIC_COLORS.foreground,
    card: colors.card || DEFAULT_STATIC_COLORS.card,
    cardForeground: colors.cardForeground || DEFAULT_STATIC_COLORS.cardForeground,
    muted: colors.muted || DEFAULT_STATIC_COLORS.muted,
    mutedForeground: colors.mutedForeground || DEFAULT_STATIC_COLORS.mutedForeground,
    border: colors.border || DEFAULT_STATIC_COLORS.border,
    input: colors.input || DEFAULT_STATIC_COLORS.input,
    ring: colors.ring || DEFAULT_STATIC_COLORS.ring,
    popover: colors.popover || DEFAULT_STATIC_COLORS.popover,
    popoverForeground: colors.popoverForeground || DEFAULT_STATIC_COLORS.popoverForeground,
  };

  const gradientConfigs = theme.gradient_configs as GradientConfig || {};

  const ghlCfg = theme.ghl_chat_config as Record<string, string> || {};
  const ghlChatConfig: GHLChatConfig = {
    textareaBg: ghlCfg.textareaBg || DEFAULT_GHL.textareaBg,
    textareaText: ghlCfg.textareaText || DEFAULT_GHL.textareaText,
    textareaBorder: ghlCfg.textareaBorder || DEFAULT_GHL.textareaBorder,
    textareaFocusBorder: ghlCfg.textareaFocusBorder || DEFAULT_GHL.textareaFocusBorder,
    textareaFocusGlow: ghlCfg.textareaFocusGlow || DEFAULT_GHL.textareaFocusGlow,
    sendButtonBg: ghlCfg.sendButtonBg || DEFAULT_GHL.sendButtonBg,
    sendButtonBorder: ghlCfg.sendButtonBorder || DEFAULT_GHL.sendButtonBorder,
    sendButtonIcon: ghlCfg.sendButtonIcon || DEFAULT_GHL.sendButtonIcon,
    selectionBg: ghlCfg.selectionBg || DEFAULT_GHL.selectionBg,
  };

  const ecomCfg = theme.ecommerce_colors as Record<string, string> || {};
  const ecommerceColors: EcommerceColors = {
    gold: ecomCfg.gold || DEFAULT_ECOMMERCE.gold,
    goldHover: ecomCfg.goldHover || DEFAULT_ECOMMERCE.goldHover,
    goldGlow: ecomCfg.goldGlow || DEFAULT_ECOMMERCE.goldGlow,
    goldForeground: ecomCfg.goldForeground || DEFAULT_ECOMMERCE.goldForeground,
    pricingHighlight: ecomCfg.pricingHighlight || DEFAULT_ECOMMERCE.pricingHighlight,
  };

  const ctaCfg = theme.cta_variants as Record<string, string> || {};
  const ctaVariants: CtaVariants = {
    primary: ctaCfg.primary || DEFAULT_CTA.primary,
    primaryHover: ctaCfg.primaryHover || DEFAULT_CTA.primaryHover,
    secondary: ctaCfg.secondary || DEFAULT_CTA.secondary,
    secondaryHover: ctaCfg.secondaryHover || DEFAULT_CTA.secondaryHover,
  };

  const typoCfg = theme.typography_config as Record<string, string> || {};
  const typographyConfig: TypographyConfig = {
    fontHeading: typoCfg.fontHeading || DEFAULT_TYPOGRAPHY.fontHeading,
    fontBody: typoCfg.fontBody || DEFAULT_TYPOGRAPHY.fontBody,
    fontDisplay: typoCfg.fontDisplay || DEFAULT_TYPOGRAPHY.fontDisplay,
  };

  const motCfg = theme.motion_config as Record<string, string> || {};
  const motionConfig: MotionConfig = {
    transitionSmooth: motCfg.transitionSmooth || DEFAULT_MOTION.transitionSmooth,
    transitionBounce: motCfg.transitionBounce || DEFAULT_MOTION.transitionBounce,
    transitionSpring: motCfg.transitionSpring || DEFAULT_MOTION.transitionSpring,
  };

  const modules = theme.style_modules as unknown as StyleModule[] || [];
  const styleModules = Array.isArray(modules) ? modules : [];

  const defaultMode = theme.default_mode || 'dark';

  const darkOverrides = theme.dark_mode_overrides as Record<string, string> || {};
  const hasDarkOverrides = Object.keys(darkOverrides).length > 0;
  const darkModeOverrides: DarkModeOverrides = hasDarkOverrides ? {
    background: darkOverrides.background || DARK_MODE_DEFAULTS.background,
    foreground: darkOverrides.foreground || DARK_MODE_DEFAULTS.foreground,
    card: darkOverrides.card || DARK_MODE_DEFAULTS.card,
    cardForeground: darkOverrides.cardForeground || DARK_MODE_DEFAULTS.cardForeground,
    popover: darkOverrides.popover || DARK_MODE_DEFAULTS.popover,
    popoverForeground: darkOverrides.popoverForeground || DARK_MODE_DEFAULTS.popoverForeground,
    primary: darkOverrides.primary || DARK_MODE_DEFAULTS.primary,
    primaryLight: darkOverrides.primaryLight || DARK_MODE_DEFAULTS.primaryLight,
    primaryForeground: darkOverrides.primaryForeground || DARK_MODE_DEFAULTS.primaryForeground,
    secondary: darkOverrides.secondary || DARK_MODE_DEFAULTS.secondary,
    secondaryForeground: darkOverrides.secondaryForeground || DARK_MODE_DEFAULTS.secondaryForeground,
    muted: darkOverrides.muted || DARK_MODE_DEFAULTS.muted,
    mutedForeground: darkOverrides.mutedForeground || DARK_MODE_DEFAULTS.mutedForeground,
    border: darkOverrides.border || DARK_MODE_DEFAULTS.border,
    input: darkOverrides.input || DARK_MODE_DEFAULTS.input,
    ring: darkOverrides.ring || DARK_MODE_DEFAULTS.ring,
  } : { ...DARK_MODE_DEFAULTS };

  const adaCfg = theme.ada_widget_config as Record<string, any> || {};
  const adaWidgetConfig: AdaWidgetConfig = {
    enabled: adaCfg.enabled ?? DEFAULT_ADA.enabled,
    position: adaCfg.position ?? DEFAULT_ADA.position,
    hideOnMobile: adaCfg.hideOnMobile ?? DEFAULT_ADA.hideOnMobile,
    hideOnDesktop: adaCfg.hideOnDesktop ?? DEFAULT_ADA.hideOnDesktop,
    pauseUntil: adaCfg.pauseUntil ?? DEFAULT_ADA.pauseUntil,
    hiddenIndefinitely: adaCfg.hiddenIndefinitely ?? DEFAULT_ADA.hiddenIndefinitely,
    iconType: adaCfg.iconType ?? DEFAULT_ADA.iconType,
    iconColor: adaCfg.iconColor ?? DEFAULT_ADA.iconColor,
    iconBgColor: adaCfg.iconBgColor ?? DEFAULT_ADA.iconBgColor,
    iconSize: adaCfg.iconSize ?? DEFAULT_ADA.iconSize,
    iconShape: adaCfg.iconShape ?? DEFAULT_ADA.iconShape,
    readingHandleSize: adaCfg.readingHandleSize ?? DEFAULT_ADA.readingHandleSize,
  };

  return {
    accentConfig, staticColors, gradientConfigs, ghlChatConfig,
    ecommerceColors, ctaVariants, typographyConfig, motionConfig,
    styleModules, defaultMode, darkModeOverrides, adaWidgetConfig,
  };
}

// ─── HOOK ────────────────────────────────────────────────────

export function useThemeAdmin() {
  const { toast } = useToast();
  const logoPreviewRef = useRef<HTMLDivElement>(null);
  const { exportAsSvg, exportAsPngNative } = useLogoExport(logoPreviewRef);

  // ── Navigation state ──
  const [view, setView] = useState<ThemeAdminView>('list');

  // ── Data state ──
  const [themes, setThemes] = useState<Theme[]>([]);
  const [logoVersions, setLogoVersions] = useState<LogoVersion[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTheme, setSelectedTheme] = useState<Theme | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // ── Publish state ──
  const [showPublishDialog, setShowPublishDialog] = useState(false);
  const [generatedConfig, setGeneratedConfig] = useState('');
  const [generatedCss, setGeneratedCss] = useState('');
  const [copied, setCopied] = useState(false);
  const [isPublishingToGithub, setIsPublishingToGithub] = useState(false);
  const [publishedVersion, setPublishedVersion] = useState<number | null>(null);
  const [commitUrl, setCommitUrl] = useState<string | null>(null);

  // ── Revert/Save-default state ──
  const [showRevertWarning1, setShowRevertWarning1] = useState(false);
  const [showRevertWarning2, setShowRevertWarning2] = useState(false);
  const [showSaveDefaultWarning1, setShowSaveDefaultWarning1] = useState(false);
  const [showSaveDefaultWarning2, setShowSaveDefaultWarning2] = useState(false);
  const [isReverting, setIsReverting] = useState(false);
  const [isSavingDefault, setIsSavingDefault] = useState(false);

  // ── Parsed config states ──
  const [accentConfig, setAccentConfig] = useState<AccentConfig>(DEFAULT_ACCENT);
  const [staticColors, setStaticColors] = useState<StaticColors>(DEFAULT_STATIC_COLORS);
  const [gradientConfigs, setGradientConfigs] = useState<GradientConfig>({});
  const [ghlChatConfig, setGhlChatConfig] = useState<GHLChatConfig>(DEFAULT_GHL);
  const [ecommerceColors, setEcommerceColors] = useState<EcommerceColors>(DEFAULT_ECOMMERCE);
  const [ctaVariants, setCtaVariants] = useState<CtaVariants>(DEFAULT_CTA);
  const [typographyConfig, setTypographyConfig] = useState<TypographyConfig>(DEFAULT_TYPOGRAPHY);
  const [motionConfig, setMotionConfig] = useState<MotionConfig>(DEFAULT_MOTION);
  const [styleModules, setStyleModules] = useState<StyleModule[]>([]);
  const [defaultMode, setDefaultMode] = useState('dark');
  const [darkModeOverrides, setDarkModeOverrides] = useState<DarkModeOverrides>({ ...DARK_MODE_DEFAULTS });
  const [editorSection, setEditorSection] = useState<EditorSection>('accent');
  const [adaWidgetConfig, setAdaWidgetConfig] = useState<AdaWidgetConfig>(DEFAULT_ADA);
  const [exportScale, setExportScale] = useState(2);

  /**
   * Dirty-state tracking — snapshot of config state at last save/load.
   * Compared against current state to determine if unsaved changes exist.
   */
  const savedSnapshotRef = useRef<string>('');

  /** Serialise current config state into a comparable string */
  const getCurrentSnapshot = useCallback(() => {
    return JSON.stringify({
      accentConfig, staticColors, gradientConfigs, ghlChatConfig,
      ecommerceColors, ctaVariants, typographyConfig, motionConfig,
      styleModules, defaultMode, darkModeOverrides, adaWidgetConfig,
    });
  }, [accentConfig, staticColors, gradientConfigs, ghlChatConfig,
    ecommerceColors, ctaVariants, typographyConfig, motionConfig,
    styleModules, defaultMode, darkModeOverrides, adaWidgetConfig]);

  /** True when any config value differs from the last-saved state */
  const isDirty = savedSnapshotRef.current !== '' && savedSnapshotRef.current !== getCurrentSnapshot();

  // ── Fetch data ──
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [themesResult, logosResult] = await Promise.all([
        supabase.from('site_themes').select('*').order('name'),
        supabase.from('logo_versions').select('*').order('version', { ascending: false }),
      ]);
      if (themesResult.error) throw themesResult.error;
      if (logosResult.error) throw logosResult.error;
      setThemes(themesResult.data || []);
      setLogoVersions(logosResult.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast({ variant: 'destructive', title: 'Error', description: 'Failed to load themes' });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => { fetchData(); }, [fetchData]);

  // ── Parse config when theme selected ──
  useEffect(() => {
    if (selectedTheme) {
      const parsed = parseThemeConfig(selectedTheme);
      setAccentConfig(parsed.accentConfig);
      setStaticColors(parsed.staticColors);
      setGradientConfigs(parsed.gradientConfigs);
      setGhlChatConfig(parsed.ghlChatConfig);
      setEcommerceColors(parsed.ecommerceColors);
      setCtaVariants(parsed.ctaVariants);
      setTypographyConfig(parsed.typographyConfig);
      setMotionConfig(parsed.motionConfig);
      setStyleModules(parsed.styleModules);
      setDefaultMode(parsed.defaultMode);
      setDarkModeOverrides(parsed.darkModeOverrides);
      setAdaWidgetConfig(parsed.adaWidgetConfig);
      // Capture snapshot for dirty-state comparison after state settles
      setTimeout(() => {
        savedSnapshotRef.current = JSON.stringify({
          accentConfig: parsed.accentConfig, staticColors: parsed.staticColors,
          gradientConfigs: parsed.gradientConfigs, ghlChatConfig: parsed.ghlChatConfig,
          ecommerceColors: parsed.ecommerceColors, ctaVariants: parsed.ctaVariants,
          typographyConfig: parsed.typographyConfig, motionConfig: parsed.motionConfig,
          styleModules: parsed.styleModules, defaultMode: parsed.defaultMode,
          darkModeOverrides: parsed.darkModeOverrides, adaWidgetConfig: parsed.adaWidgetConfig,
        });
      }, 0);
    }
  }, [selectedTheme]);

  // ── Select theme (go directly to editor — Shopify pattern) ──
  const selectTheme = useCallback((theme: Theme) => {
    setSelectedTheme(theme);
    setIsEditing(true);
    setView('editor');
  }, []);

  // ── Enter editor mode ──
  const enterEditor = useCallback(() => {
    setIsEditing(true);
    setView('editor');
  }, []);

  // ── Back navigation ──
  const goToList = useCallback(() => {
    setView('list');
    setSelectedTheme(null);
    setIsEditing(false);
  }, []);


  // ── Set active ──
  const handleSetActive = useCallback(async (theme: Theme) => {
    try {
      const { error: deactivateError } = await supabase
        .from('site_themes').update({ is_active: false }).neq('id', theme.id);
      if (deactivateError) throw deactivateError;
      const { error } = await supabase
        .from('site_themes').update({ is_active: true }).eq('id', theme.id);
      if (error) throw error;
      toast({ title: 'Theme activated', description: `"${theme.name}" is now the active theme.` });
      fetchData();
    } catch (error) {
      console.error('Error setting active theme:', error);
      toast({ variant: 'destructive', title: 'Error', description: 'Failed to activate theme' });
    }
  }, [toast, fetchData]);

  // ── Save ──
  const handleSave = useCallback(async () => {
    if (!selectedTheme) return;
    setIsSaving(true);
    try {
      const { error } = await supabase.from('site_themes').update({
        name: selectedTheme.name,
        base_hue: selectedTheme.base_hue,
        accent_config: {
          accent: `${accentConfig.h} ${accentConfig.s}% ${accentConfig.l}%`,
          h: accentConfig.h, s: accentConfig.s, l: accentConfig.l,
          useGradient: accentConfig.useGradient, gradientFrom: accentConfig.gradientFrom,
          gradientTo: accentConfig.gradientTo, gradientAngle: accentConfig.gradientAngle,
          hoverBrightness: accentConfig.hoverBrightness, iconGlowOpacity: accentConfig.iconGlowOpacity,
        } as unknown as Json,
        static_colors: staticColors as unknown as Json,
        gradient_configs: gradientConfigs as unknown as Json,
        ghl_chat_config: ghlChatConfig as unknown as Json,
        ecommerce_colors: ecommerceColors as unknown as Json,
        cta_variants: ctaVariants as unknown as Json,
        typography_config: typographyConfig as unknown as Json,
        motion_config: motionConfig as unknown as Json,
        style_modules: styleModules as unknown as Json,
        default_mode: defaultMode,
        dark_mode_overrides: darkModeOverrides as unknown as Json,
        ada_widget_config: adaWidgetConfig as unknown as Json,
        changelog_notes: selectedTheme.changelog_notes,
      }).eq('id', selectedTheme.id);
      if (error) throw error;
      // Update snapshot so isDirty resets
      savedSnapshotRef.current = getCurrentSnapshot();
      toast({ title: 'Theme saved', description: `"${selectedTheme.name}" has been updated.` });
      fetchData();
    } catch (error) {
      console.error('Error saving theme:', error);
      toast({ variant: 'destructive', title: 'Error', description: 'Failed to save theme' });
    } finally {
      setIsSaving(false);
    }
  }, [selectedTheme, accentConfig, staticColors, gradientConfigs, ghlChatConfig, ecommerceColors,
    ctaVariants, typographyConfig, motionConfig, styleModules, defaultMode, darkModeOverrides,
    adaWidgetConfig, toast, fetchData, getCurrentSnapshot]);

  // ── Delete ──
  const handleDelete = useCallback(async (theme: Theme) => {
    if (!confirm(`Are you sure you want to delete "${theme.name}"?`)) return;
    try {
      const { error } = await supabase.from('site_themes').delete().eq('id', theme.id);
      if (error) throw error;
      toast({ title: 'Theme deleted', description: `"${theme.name}" has been removed.` });
      if (selectedTheme?.id === theme.id) { setSelectedTheme(null); setIsEditing(false); setView('list'); }
      fetchData();
    } catch (error) {
      console.error('Error deleting theme:', error);
      toast({ variant: 'destructive', title: 'Error', description: 'Failed to delete theme' });
    }
  }, [selectedTheme, toast, fetchData]);

  // ── Export JSON ──
  const exportCurrentThemeJson = useCallback(() => {
    if (!selectedTheme) return;
    const exportData = {
      $schema: 'https://everintent.com/schemas/theme-export-v2.0.json',
      version: '2.0', exportedAt: new Date().toISOString(),
      theme: {
        name: selectedTheme.name, baseHue: selectedTheme.base_hue, defaultMode: selectedTheme.default_mode,
        accentConfig: selectedTheme.accent_config, staticColors: selectedTheme.static_colors,
        gradientConfigs: selectedTheme.gradient_configs, ghlChatConfig: selectedTheme.ghl_chat_config,
        ecommerceColors: selectedTheme.ecommerce_colors, ctaVariants: selectedTheme.cta_variants,
        typographyConfig: selectedTheme.typography_config, motionConfig: selectedTheme.motion_config,
        styleModules: selectedTheme.style_modules, adaWidgetConfig: selectedTheme.ada_widget_config,
      },
    };
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedTheme.name.toLowerCase().replace(/\s+/g, '-')}-theme-backup-v2.0.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast({ title: 'Backup exported', description: `Downloaded ${a.download}` });
  }, [selectedTheme, toast]);

  // ── Revert to default ──
  const handleRevertToDefault = useCallback(async () => {
    if (!selectedTheme) return;
    setIsReverting(true);
    try {
      const { data: defaultSnapshot, error: fetchErr } = await supabase
        .from('published_theme_configs').select('config_json')
        .eq('source_theme_id', selectedTheme.id).eq('is_default', true).single();
      if (fetchErr || !defaultSnapshot) {
        toast({ variant: 'destructive', title: 'No default snapshot found', description: 'Use "Save as Default" first.' });
        return;
      }
      const seedConfig = defaultSnapshot.config_json as Record<string, any>;
      const { error: updateErr } = await supabase.from('site_themes').update({
        accent_config: seedConfig.accentConfig as unknown as Json,
        static_colors: seedConfig.staticColors as unknown as Json,
        dark_mode_overrides: seedConfig.darkModeOverrides as unknown as Json || {},
        gradient_configs: seedConfig.gradientConfigs as unknown as Json,
        ghl_chat_config: seedConfig.ghlChatConfig as unknown as Json,
        ecommerce_colors: seedConfig.ecommerceColors as unknown as Json,
        cta_variants: seedConfig.ctaVariants as unknown as Json,
        typography_config: seedConfig.typographyConfig as unknown as Json,
        motion_config: seedConfig.motionConfig as unknown as Json,
        style_modules: seedConfig.styleModules as unknown as Json,
        default_mode: seedConfig.defaultMode || 'dark',
        ada_widget_config: seedConfig.adaWidgetConfig as unknown as Json,
        base_hue: seedConfig.baseHue ?? selectedTheme.base_hue,
      }).eq('id', selectedTheme.id);
      if (updateErr) throw updateErr;
      toast({ title: 'Theme reverted', description: `"${selectedTheme.name}" restored to default.` });
      setIsEditing(false);
      setView('list');
      fetchData();
    } catch (error) {
      console.error('Error reverting theme:', error);
      toast({ variant: 'destructive', title: 'Error', description: 'Failed to revert theme' });
    } finally {
      setIsReverting(false);
      setShowRevertWarning2(false);
    }
  }, [selectedTheme, toast, fetchData]);

  // ── Save as default ──
  const handleSaveAsDefault = useCallback(async () => {
    if (!selectedTheme) return;
    setIsSavingDefault(true);
    try {
      const snapshotJson = {
        name: selectedTheme.name, baseHue: selectedTheme.base_hue, defaultMode: selectedTheme.default_mode,
        accentConfig: selectedTheme.accent_config, staticColors: selectedTheme.static_colors,
        darkModeOverrides: selectedTheme.dark_mode_overrides, gradientConfigs: selectedTheme.gradient_configs,
        ghlChatConfig: selectedTheme.ghl_chat_config, ecommerceColors: selectedTheme.ecommerce_colors,
        ctaVariants: selectedTheme.cta_variants, typographyConfig: selectedTheme.typography_config,
        motionConfig: selectedTheme.motion_config, styleModules: selectedTheme.style_modules,
        adaWidgetConfig: selectedTheme.ada_widget_config,
      };
      await supabase.from('published_theme_configs').delete()
        .eq('source_theme_id', selectedTheme.id).eq('is_default', true);
      const { error } = await supabase.from('published_theme_configs').insert({
        source_theme_id: selectedTheme.id, source_theme_name: selectedTheme.name,
        config_json: snapshotJson as unknown as Json, config_typescript: '',
        is_default: true, is_active: false,
        notes: `Default seed snapshot saved at ${new Date().toISOString()}`, version: 0,
      });
      if (error) throw error;
      toast({ title: 'Default saved', description: `"${selectedTheme.name}" current config is now the default.` });
    } catch (error) {
      console.error('Error saving default:', error);
      toast({ variant: 'destructive', title: 'Error', description: 'Failed to save default' });
    } finally {
      setIsSavingDefault(false);
      setShowSaveDefaultWarning2(false);
    }
  }, [selectedTheme, toast]);

  // ── Get logo for theme ──
  const getLogoForTheme = useCallback((theme: Theme): LogoVersion | undefined => {
    return logoVersions.find(l => l.id === theme.logo_version_id) || logoVersions[0];
  }, [logoVersions]);

  return {
    // Navigation
    view, setView, selectTheme, enterEditor, goToList,
    // Data
    themes, logoVersions, loading, selectedTheme, setSelectedTheme,
    isEditing, setIsEditing, isSaving, isDirty,
    // Config states
    accentConfig, setAccentConfig, staticColors, setStaticColors,
    gradientConfigs, setGradientConfigs, ghlChatConfig, setGhlChatConfig,
    ecommerceColors, setEcommerceColors, ctaVariants, setCtaVariants,
    typographyConfig, setTypographyConfig, motionConfig, setMotionConfig,
    styleModules, setStyleModules, defaultMode, setDefaultMode,
    darkModeOverrides, setDarkModeOverrides, editorSection, setEditorSection,
    adaWidgetConfig, setAdaWidgetConfig, exportScale, setExportScale,
    // Actions
    fetchData, handleSetActive, handleSave, handleDelete,
    exportCurrentThemeJson, handleRevertToDefault, handleSaveAsDefault,
    getLogoForTheme,
    // Publish
    showPublishDialog, setShowPublishDialog, generatedConfig, setGeneratedConfig,
    generatedCss, setGeneratedCss, copied, setCopied,
    isPublishingToGithub, setIsPublishingToGithub,
    publishedVersion, setPublishedVersion, commitUrl, setCommitUrl,
    // Revert/Default dialogs
    showRevertWarning1, setShowRevertWarning1, showRevertWarning2, setShowRevertWarning2,
    showSaveDefaultWarning1, setShowSaveDefaultWarning1, showSaveDefaultWarning2, setShowSaveDefaultWarning2,
    isReverting, isSavingDefault,
    // Logo
    logoPreviewRef, exportAsSvg, exportAsPngNative,
    // Helpers
    getAccentColor,
  };
}
