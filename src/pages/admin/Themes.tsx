import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { LogoRenderer, useLogoExport } from '@/components/logo';
import { LogoConfigEditor } from '@/components/admin/LogoConfigEditor';
import { ArrowLeft, Palette, Edit, Trash2, Check, Loader2, Eye, Rocket, Copy, CheckCircle, Github, Image, Download, FileCode, FileImage, ChevronUp, ChevronDown, RotateCcw, Save, AlertTriangle } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import type { Tables, Json } from '@/integrations/supabase/types';
import { EcommerceColorEditor, type EcommerceColors, type CtaVariants } from '@/components/admin/EcommerceColorEditor';
import { TypographyEditor, type TypographyConfig } from '@/components/admin/TypographyEditor';
import { MotionEditor, type MotionConfig } from '@/components/admin/MotionEditor';
import { StyleModulesEditor, type StyleModule } from '@/components/admin/StyleModulesEditor';
import { DefaultModeSelector } from '@/components/admin/DefaultModeSelector';
import { AdaWidgetConfigEditor, type AdaWidgetConfig } from '@/components/admin/AdaWidgetConfigEditor';
import { ContrastChecker } from '@/components/admin/ContrastChecker';
import { ThemeImporter } from '@/components/admin/ThemeImporter';
import { DarkModeOverridesEditor, type DarkModeOverrides, DARK_MODE_DEFAULTS } from '@/components/admin/DarkModeOverridesEditor';
import { ThemeEditorNav, type EditorSection } from '@/components/admin/ThemeEditorNav';
import { ThemeEditorPanels } from '@/components/admin/ThemeEditorPanels';
import { ThemeSummaryDashboard } from '@/components/admin/ThemeSummaryDashboard';

type Theme = Tables<'site_themes'>;
type LogoVersion = Tables<'logo_versions'>;

// Preset solid colors
const presetColors = [
  '#ffffff', '#F97316', '#3B82F6', '#22C55E', '#A855F7', 
  '#EF4444', '#06B6D4', '#EAB308', '#000000', '#6B7280'
];

interface AccentConfig {
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

interface StaticColors {
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

interface GradientConfig {
  hero?: string;
  cta?: string;
  text?: string;
}

/**
 * Configuration for GHL chat widget theming.
 * Controls the appearance of the GoHighLevel embedded chat widget
 * including textarea, send button, and focus states.
 * 
 * All values are HSL color strings in format "H S% L%".
 * Applied via CSS custom properties injected into the widget's shadow DOM.
 */
interface GHLChatConfig {
  /** Background color of the message textarea */
  textareaBg: string;
  /** Text color within the message textarea */
  textareaText: string;
  /** Border color of the message textarea (unfocused) */
  textareaBorder: string;
  /** Border color when textarea is focused */
  textareaFocusBorder: string;
  /** Glow/shadow color when textarea is focused */
  textareaFocusGlow: string;
  /** Background color of the send button */
  sendButtonBg: string;
  /** Border color of the send button */
  sendButtonBorder: string;
  /** Icon/SVG stroke color on send button */
  sendButtonIcon: string;
  /** Text selection highlight color in textarea */
  selectionBg: string;
}

export default function AdminThemes() {
  const { user, signOut } = useAdminAuth();
  const { toast } = useToast();
  
  // Logo export
  const logoPreviewRef = useRef<HTMLDivElement>(null);
  const { exportAsSvg, exportAsPngNative } = useLogoExport(logoPreviewRef);
  const [exportScale, setExportScale] = useState(2);
  
  const [themes, setThemes] = useState<Theme[]>([]);
  const [logoVersions, setLogoVersions] = useState<LogoVersion[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTheme, setSelectedTheme] = useState<Theme | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showPublishDialog, setShowPublishDialog] = useState(false);
  const [generatedConfig, setGeneratedConfig] = useState<string>('');
  const [generatedCss, setGeneratedCss] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const [isPublishingToGithub, setIsPublishingToGithub] = useState(false);
  const [publishedVersion, setPublishedVersion] = useState<number | null>(null);
  const [commitUrl, setCommitUrl] = useState<string | null>(null);

  // 7.17 / 7.17a: Revert & Save-as-Default state
  const [showRevertWarning1, setShowRevertWarning1] = useState(false);
  const [showRevertWarning2, setShowRevertWarning2] = useState(false);
  const [showSaveDefaultWarning1, setShowSaveDefaultWarning1] = useState(false);
  const [showSaveDefaultWarning2, setShowSaveDefaultWarning2] = useState(false);
  const [isReverting, setIsReverting] = useState(false);
  const [isSavingDefault, setIsSavingDefault] = useState(false);

  // Parsed config states for editing
  const [accentConfig, setAccentConfig] = useState<AccentConfig>({
    accent: '38 92% 50%',
    h: 38,
    s: 92,
    l: 50,
  });
  const [staticColors, setStaticColors] = useState<StaticColors>({
    primary: '222 47% 11%',
    primaryLight: '215 25% 27%',
    primaryForeground: '0 0% 100%',
    secondary: '60 9% 98%',
    secondaryForeground: '222 47% 11%',
    background: '0 0% 100%',
    foreground: '222 47% 11%',
    card: '0 0% 100%',
    cardForeground: '222 47% 11%',
    muted: '60 5% 96%',
    mutedForeground: '215 16% 47%',
    border: '220 13% 91%',
    input: '220 13% 91%',
    ring: '38 92% 50%',
    popover: '0 0% 100%',
    popoverForeground: '222 47% 11%',
  });
  const [gradientConfigs, setGradientConfigs] = useState<GradientConfig>({
    hero: 'linear-gradient(135deg, hsl(222 47% 11%) 0%, hsl(215 25% 27%) 50%, hsl(222 47% 11%) 100%)',
    cta: 'linear-gradient(135deg, hsl(38 92% 50%) 0%, hsl(32 95% 44%) 100%)',
    text: 'linear-gradient(135deg, hsl(38 92% 50%) 0%, hsl(45 93% 58%) 50%, hsl(38 92% 50%) 100%)',
  });
  const [ghlChatConfig, setGhlChatConfig] = useState<GHLChatConfig>({
    textareaBg: '222 47% 7%',
    textareaText: '60 9% 98%',
    textareaBorder: '215 25% 20%',
    textareaFocusBorder: '240 70% 60%',
    textareaFocusGlow: '240 70% 60%',
    sendButtonBg: '240 70% 60%',
    sendButtonBorder: '0 0% 100%',
    sendButtonIcon: '0 0% 100%',
    selectionBg: '240 70% 60%',
  });

  // New Batch 3 states
  const [ecommerceColors, setEcommerceColors] = useState<EcommerceColors>({
    gold: '39 95% 50%',
    goldHover: '35 95% 44%',
    goldGlow: '39 95% 60%',
    goldForeground: '0 0% 100%',
    pricingHighlight: '39 95% 50%',
  });
  const [ctaVariants, setCtaVariants] = useState<CtaVariants>({
    primary: '240 70% 60%',
    primaryHover: '240 70% 50%',
    secondary: '39 95% 50%',
    secondaryHover: '35 95% 44%',
  });
  const [typographyConfig, setTypographyConfig] = useState<TypographyConfig>({
    fontHeading: 'Space Grotesk, -apple-system, BlinkMacSystemFont, sans-serif',
    fontBody: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
    fontDisplay: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
  });
  const [motionConfig, setMotionConfig] = useState<MotionConfig>({
    transitionSmooth: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    transitionBounce: 'all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    transitionSpring: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
  });
  const [styleModules, setStyleModules] = useState<StyleModule[]>([]);
  const [defaultMode, setDefaultMode] = useState<string>('dark');
  const [darkModeOverrides, setDarkModeOverrides] = useState<DarkModeOverrides>({ ...DARK_MODE_DEFAULTS });
  const [editorSection, setEditorSection] = useState<EditorSection>('accent');
  const [adaWidgetConfig, setAdaWidgetConfig] = useState<AdaWidgetConfig>({
    enabled: true,
    position: 'bottom-right',
    hideOnMobile: false,
    hideOnDesktop: false,
    pauseUntil: null,
    hiddenIndefinitely: false,
    iconType: 'universal',
    iconColor: '0 0% 100%',
    iconBgColor: '240 70% 60%',
    iconSize: 48,
    iconShape: 'circle',
    readingHandleSize: 28,
  });

  // Fetch themes and logo versions
  useEffect(() => {
    fetchData();
  }, []);

  // Parse configs when theme is selected
  useEffect(() => {
    if (selectedTheme) {
      const accent = selectedTheme.accent_config as Record<string, any> || {};
      const accentStr = accent.accent || '38 92% 50%';
      const parts = accentStr.split(' ').map((p: string) => parseFloat(p));
      
      setAccentConfig({
        accent: accentStr,
        h: parts[0] || 38,
        s: parts[1] || 92,
        l: parts[2] || 50,
        useGradient: accent.useGradient || false,
        gradientFrom: accent.gradientFrom || '#F97316',
        gradientTo: accent.gradientTo || '#EF4444',
        gradientAngle: accent.gradientAngle || 90,
        hoverBrightness: accent.hoverBrightness ?? 1.1,
        iconGlowOpacity: accent.iconGlowOpacity ?? 0.3,
      });

      const colors = selectedTheme.static_colors as Record<string, string> || {};
      setStaticColors({
        primary: colors.primary || '222 47% 11%',
        primaryLight: colors.primaryLight || '215 25% 27%',
        primaryForeground: colors.primaryForeground || '0 0% 100%',
        secondary: colors.secondary || '60 9% 98%',
        secondaryForeground: colors.secondaryForeground || '222 47% 11%',
        background: colors.background || '0 0% 100%',
        foreground: colors.foreground || '222 47% 11%',
        card: colors.card || '0 0% 100%',
        cardForeground: colors.cardForeground || '222 47% 11%',
        muted: colors.muted || '60 5% 96%',
        mutedForeground: colors.mutedForeground || '215 16% 47%',
        border: colors.border || '220 13% 91%',
        input: colors.input || '220 13% 91%',
        ring: colors.ring || '38 92% 50%',
        popover: colors.popover || '0 0% 100%',
        popoverForeground: colors.popoverForeground || '222 47% 11%',
      });

      setGradientConfigs(selectedTheme.gradient_configs as GradientConfig || {});
      
      // Parse GHL chat config
      const ghlConfig = selectedTheme.ghl_chat_config as Record<string, string> || {};
      setGhlChatConfig({
        textareaBg: ghlConfig.textareaBg || '222 47% 7%',
        textareaText: ghlConfig.textareaText || '60 9% 98%',
        textareaBorder: ghlConfig.textareaBorder || '215 25% 20%',
        textareaFocusBorder: ghlConfig.textareaFocusBorder || '240 70% 60%',
        textareaFocusGlow: ghlConfig.textareaFocusGlow || '240 70% 60%',
        sendButtonBg: ghlConfig.sendButtonBg || '240 70% 60%',
        sendButtonBorder: ghlConfig.sendButtonBorder || '0 0% 100%',
        sendButtonIcon: ghlConfig.sendButtonIcon || '0 0% 100%',
        selectionBg: ghlConfig.selectionBg || '240 70% 60%',
      });

      // Parse e-commerce colors
      const ecomCfg = selectedTheme.ecommerce_colors as Record<string, string> || {};
      setEcommerceColors({
        gold: ecomCfg.gold || '39 95% 50%',
        goldHover: ecomCfg.goldHover || '35 95% 44%',
        goldGlow: ecomCfg.goldGlow || '39 95% 60%',
        goldForeground: ecomCfg.goldForeground || '0 0% 100%',
        pricingHighlight: ecomCfg.pricingHighlight || '39 95% 50%',
      });

      // Parse CTA variants
      const ctaCfg = selectedTheme.cta_variants as Record<string, string> || {};
      setCtaVariants({
        primary: ctaCfg.primary || '240 70% 60%',
        primaryHover: ctaCfg.primaryHover || '240 70% 50%',
        secondary: ctaCfg.secondary || '39 95% 50%',
        secondaryHover: ctaCfg.secondaryHover || '35 95% 44%',
      });

      // Parse typography config
      const typoCfg = selectedTheme.typography_config as Record<string, string> || {};
      setTypographyConfig({
        fontHeading: typoCfg.fontHeading || 'Space Grotesk, -apple-system, BlinkMacSystemFont, sans-serif',
        fontBody: typoCfg.fontBody || 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
        fontDisplay: typoCfg.fontDisplay || 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
      });

      // Parse motion config
      const motCfg = selectedTheme.motion_config as Record<string, string> || {};
      setMotionConfig({
        transitionSmooth: motCfg.transitionSmooth || 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        transitionBounce: motCfg.transitionBounce || 'all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        transitionSpring: motCfg.transitionSpring || 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
      });

      // Parse style modules
      const modules = selectedTheme.style_modules as unknown as StyleModule[] || [];
      setStyleModules(Array.isArray(modules) ? modules : []);

      // Parse default mode
      setDefaultMode(selectedTheme.default_mode || 'dark');

      // Parse dark mode overrides
      const darkOverrides = selectedTheme.dark_mode_overrides as Record<string, string> || {};
      const hasDarkOverrides = Object.keys(darkOverrides).length > 0;
      setDarkModeOverrides(hasDarkOverrides ? {
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
      } : { ...DARK_MODE_DEFAULTS });

      // Parse ADA widget config
      const adaCfg = selectedTheme.ada_widget_config as Record<string, any> || {};
      setAdaWidgetConfig({
        enabled: adaCfg.enabled ?? true,
        position: adaCfg.position ?? 'bottom-right',
        hideOnMobile: adaCfg.hideOnMobile ?? false,
        hideOnDesktop: adaCfg.hideOnDesktop ?? false,
        pauseUntil: adaCfg.pauseUntil ?? null,
        hiddenIndefinitely: adaCfg.hiddenIndefinitely ?? false,
        iconType: adaCfg.iconType ?? 'universal',
        iconColor: adaCfg.iconColor ?? '0 0% 100%',
        iconBgColor: adaCfg.iconBgColor ?? '240 70% 60%',
        iconSize: adaCfg.iconSize ?? 48,
        iconShape: adaCfg.iconShape ?? 'circle',
        readingHandleSize: adaCfg.readingHandleSize ?? 28,
      });
    }
  }, [selectedTheme]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [themesResult, logosResult] = await Promise.all([
        supabase.from('site_themes').select('*').order('name'),
        supabase.from('logo_versions').select('*').order('version', { ascending: false })
      ]);

      if (themesResult.error) throw themesResult.error;
      if (logosResult.error) throw logosResult.error;

      setThemes(themesResult.data || []);
      setLogoVersions(logosResult.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to load themes',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSetActive = async (theme: Theme) => {
    try {
      // First deactivate ALL themes
      const { error: deactivateError } = await supabase
        .from('site_themes')
        .update({ is_active: false })
        .neq('id', theme.id);

      if (deactivateError) throw deactivateError;

      // Then activate the selected theme
      const { error } = await supabase
        .from('site_themes')
        .update({ is_active: true })
        .eq('id', theme.id);

      if (error) throw error;

      toast({
        title: 'Theme activated',
        description: `"${theme.name}" is now the active theme.`,
      });

      fetchData();
    } catch (error) {
      console.error('Error setting active theme:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to activate theme',
      });
    }
  };

  const handleSave = async () => {
    if (!selectedTheme) return;
    
    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('site_themes')
        .update({
          name: selectedTheme.name,
          base_hue: selectedTheme.base_hue,
          accent_config: {
            accent: `${accentConfig.h} ${accentConfig.s}% ${accentConfig.l}%`,
            h: accentConfig.h,
            s: accentConfig.s,
            l: accentConfig.l,
            useGradient: accentConfig.useGradient,
            gradientFrom: accentConfig.gradientFrom,
            gradientTo: accentConfig.gradientTo,
            gradientAngle: accentConfig.gradientAngle,
            hoverBrightness: accentConfig.hoverBrightness,
            iconGlowOpacity: accentConfig.iconGlowOpacity,
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
        })
        .eq('id', selectedTheme.id);

      if (error) throw error;

      toast({
        title: 'Theme saved',
        description: `"${selectedTheme.name}" has been updated.`,
      });

      setIsEditing(false);
      fetchData();
    } catch (error) {
      console.error('Error saving theme:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to save theme',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (theme: Theme) => {
    if (!confirm(`Are you sure you want to delete "${theme.name}"?`)) return;

    try {
      const { error } = await supabase
        .from('site_themes')
        .delete()
        .eq('id', theme.id);

      if (error) throw error;

      toast({
        title: 'Theme deleted',
        description: `"${theme.name}" has been removed.`,
      });

      if (selectedTheme?.id === theme.id) {
        setSelectedTheme(null);
        setIsEditing(false);
      }
      fetchData();
    } catch (error) {
      console.error('Error deleting theme:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to delete theme',
      });
    }
  };

  // 7.17: Export current theme as JSON (reusable helper)
  const exportCurrentThemeJson = () => {
    if (!selectedTheme) return;
    const exportData = {
      $schema: 'https://everintent.com/schemas/theme-export-v2.0.json',
      version: '2.0',
      exportedAt: new Date().toISOString(),
      theme: {
        name: selectedTheme.name,
        baseHue: selectedTheme.base_hue,
        defaultMode: selectedTheme.default_mode,
        accentConfig: selectedTheme.accent_config,
        staticColors: selectedTheme.static_colors,
        darkModeOverrides: selectedTheme.dark_mode_overrides,
        gradientConfigs: selectedTheme.gradient_configs,
        ghlChatConfig: selectedTheme.ghl_chat_config,
        ecommerceColors: selectedTheme.ecommerce_colors,
        ctaVariants: selectedTheme.cta_variants,
        typographyConfig: selectedTheme.typography_config,
        motionConfig: selectedTheme.motion_config,
        styleModules: selectedTheme.style_modules,
        adaWidgetConfig: selectedTheme.ada_widget_config,
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
  };

  // 7.17: Revert theme to its default/seed snapshot
  const handleRevertToDefault = async () => {
    if (!selectedTheme) return;
    setIsReverting(true);
    try {
      const { data: defaultSnapshot, error: fetchErr } = await supabase
        .from('published_theme_configs')
        .select('config_json')
        .eq('source_theme_id', selectedTheme.id)
        .eq('is_default', true)
        .single();

      if (fetchErr || !defaultSnapshot) {
        toast({
          variant: 'destructive',
          title: 'No default snapshot found',
          description: 'This theme has no saved default. Use "Save as Default" first to create one.',
        });
        return;
      }

      const seedConfig = defaultSnapshot.config_json as Record<string, any>;
      
      const { error: updateErr } = await supabase
        .from('site_themes')
        .update({
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
        })
        .eq('id', selectedTheme.id);

      if (updateErr) throw updateErr;

      toast({ title: 'Theme reverted', description: `"${selectedTheme.name}" restored to its default snapshot.` });
      setIsEditing(false);
      fetchData();
    } catch (error) {
      console.error('Error reverting theme:', error);
      toast({ variant: 'destructive', title: 'Error', description: 'Failed to revert theme' });
    } finally {
      setIsReverting(false);
      setShowRevertWarning2(false);
    }
  };

  // 7.17a: Save current theme config as the new default snapshot
  const handleSaveAsDefault = async () => {
    if (!selectedTheme) return;
    setIsSavingDefault(true);
    try {
      const snapshotJson = {
        name: selectedTheme.name,
        baseHue: selectedTheme.base_hue,
        defaultMode: selectedTheme.default_mode,
        accentConfig: selectedTheme.accent_config,
        staticColors: selectedTheme.static_colors,
        darkModeOverrides: selectedTheme.dark_mode_overrides,
        gradientConfigs: selectedTheme.gradient_configs,
        ghlChatConfig: selectedTheme.ghl_chat_config,
        ecommerceColors: selectedTheme.ecommerce_colors,
        ctaVariants: selectedTheme.cta_variants,
        typographyConfig: selectedTheme.typography_config,
        motionConfig: selectedTheme.motion_config,
        styleModules: selectedTheme.style_modules,
        adaWidgetConfig: selectedTheme.ada_widget_config,
      };

      await supabase
        .from('published_theme_configs')
        .delete()
        .eq('source_theme_id', selectedTheme.id)
        .eq('is_default', true);

      const { error } = await supabase
        .from('published_theme_configs')
        .insert({
          source_theme_id: selectedTheme.id,
          source_theme_name: selectedTheme.name,
          config_json: snapshotJson as unknown as Json,
          config_typescript: '',
          is_default: true,
          is_active: false,
          notes: `Default seed snapshot saved at ${new Date().toISOString()}`,
          version: 0,
        });

      if (error) throw error;

      toast({ title: 'Default saved', description: `"${selectedTheme.name}" current config is now the default snapshot.` });
    } catch (error) {
      console.error('Error saving default:', error);
      toast({ variant: 'destructive', title: 'Error', description: 'Failed to save default snapshot' });
    } finally {
      setIsSavingDefault(false);
      setShowSaveDefaultWarning2(false);
    }
  };

  // Generate static config for production
  const generateProductionConfig = async () => {
    const activeTheme = themes.find(t => t.is_active);
    if (!activeTheme) {
      toast({
        variant: 'destructive',
        title: 'No active theme',
        description: 'Please set a theme as active before publishing.',
      });
      return;
    }

    // Fetch page assignments and logo config in parallel
    const [assignmentsResult, logoResult] = await Promise.all([
      supabase.from('page_theme_assignments').select('page_route, theme_id'),
      activeTheme.logo_version_id 
        ? supabase.from('logo_versions').select('*').eq('id', activeTheme.logo_version_id).single()
        : Promise.resolve({ data: null })
    ]);

    const assignments = assignmentsResult.data;
    const logoVersion = logoResult.data;

    const accentCfg = activeTheme.accent_config as Record<string, any>;
    const staticCols = activeTheme.static_colors as Record<string, string>;
    const gradientCfg = activeTheme.gradient_configs as Record<string, string>;

    const themeName = activeTheme.name;
    const themeId = themeName.toLowerCase().replace(/\s+/g, '-');

    // Build logo config section if we have a logo
    let logoConfigSection = '';
    let logoTypeSection = '';
    if (logoVersion) {
      logoTypeSection = `
  logoConfig?: {
    taglineText: string;
    everConfig: LogoElementConfig;
    intentConfig: LogoElementConfig;
    streakConfig: StreakElementConfig;
    taglineConfig: TaglineElementConfig;
  };`;
      
      logoConfigSection = `
  logoConfig: {
    taglineText: '${(logoVersion.tagline_text || 'Web Design & Automation').replace(/'/g, "\\'")}',
    everConfig: ${JSON.stringify(logoVersion.ever_config, null, 4).replace(/\n/g, '\n    ')},
    intentConfig: ${JSON.stringify(logoVersion.intent_config, null, 4).replace(/\n/g, '\n    ')},
    streakConfig: ${JSON.stringify(logoVersion.streak_config, null, 4).replace(/\n/g, '\n    ')},
    taglineConfig: ${JSON.stringify(logoVersion.tagline_config, null, 4).replace(/\n/g, '\n    ')},
  },`;
    }

    const config = `/**
 * Static Theme Configuration
 * 
 * This file is the PRODUCTION source of truth for themes.
 * Generated by admin "Publish to Production" workflow.
 * 
 * DO NOT edit manually - use admin theme editor and "Publish to Production".
 * 
 * SSG Compatible: Imported statically, zero runtime DB calls.
 * 
 * @generated ${new Date().toISOString().split('T')[0]}
 */

// Logo element types for embedded config
export interface LogoElementConfig {
  text?: string;
  enabled?: boolean;
  size: number;
  weight: number;
  solidColor: string;
  useGradient: boolean;
  gradientFrom: string;
  gradientTo: string;
  gradientAngle: number;
  marginLeft: number;
  marginRight: number;
  verticalOffset?: number;
}

export interface StreakElementConfig {
  length: number;
  leftThick: number;
  rightThick: number;
  solidColor: string;
  useGradient: boolean;
  gradientFrom: string;
  gradientTo: string;
  gradientAngle: number;
  marginLeft: number;
  marginRight: number;
}

export interface TaglineElementConfig {
  size: number;
  weight: number;
  solidColor: string;
  useGradient: boolean;
  gradientFrom: string;
  gradientTo: string;
  gradientAngle: number;
  marginLeft: number;
  marginRight: number;
  marginTop: number;
}

export interface ThemeConfig {
  id: string;
  name: string;
  baseHue: number;
  accentConfig: {
    accent: string;
    accentHover: string;
    accentGlow: string;
    accentForeground: string;
    h: number;
    s: number;
    l: number;
  };
  staticColors: {
    background: string;
    foreground: string;
    card: string;
    cardForeground: string;
    popover: string;
    popoverForeground: string;
    primary: string;
    primaryLight: string;
    primaryForeground: string;
    secondary: string;
    secondaryForeground: string;
    muted: string;
    mutedForeground: string;
    border: string;
    input: string;
    ring: string;
  };
  gradientConfigs: {
    hero: string;
    cta: string;
    text: string;
  };
  ecommerceColors?: {
    gold: string;
    goldHover: string;
    goldGlow: string;
    goldForeground: string;
    pricingHighlight: string;
  };
  ctaVariants?: {
    primary: string;
    primaryHover: string;
    secondary: string;
    secondaryHover: string;
  };
  typographyConfig?: {
    fontHeading: string;
    fontBody: string;
    fontDisplay: string;
  };
  motionConfig?: {
    transitionSmooth: string;
    transitionBounce: string;
    transitionSpring: string;
  };
  styleModules?: Array<{
    name: string;
    tokens: Array<{ name: string; value: string }>;
  }>;
  defaultMode?: string;
  darkModeOverrides?: {
    background: string;
    foreground: string;
    card: string;
    cardForeground: string;
    popover: string;
    popoverForeground: string;
    primary: string;
    primaryLight: string;
    primaryForeground: string;
    secondary: string;
    secondaryForeground: string;
    muted: string;
    mutedForeground: string;
    border: string;
    input: string;
    ring: string;
  };
  logoVersionId?: string;${logoTypeSection}
}

export interface RouteThemeMapping {
  route: string;
  themeId: string;
}

// ============================================
// ACTIVE PRODUCTION THEME (${themeName})
// ============================================
export const activeTheme: ThemeConfig = {
  id: '${themeId}',
  name: '${themeName}',
  baseHue: ${activeTheme.base_hue},
  accentConfig: {
    accent: '${accentCfg.accent || '38 92% 50%'}',
    accentHover: '${accentCfg.accentHover || '32 95% 44%'}',
    accentGlow: '${accentCfg.accentGlow || accentCfg.accent || '38 92% 50%'}',
    accentForeground: '${accentCfg.accentForeground || '222 47% 11%'}',
    h: ${accentCfg.h || 38},
    s: ${accentCfg.s || 92},
    l: ${accentCfg.l || 50},
  },
  staticColors: {
    background: '${staticCols.background || '222 47% 7%'}',
    foreground: '${staticCols.foreground || '60 9% 98%'}',
    card: '${staticCols.card || '222 47% 10%'}',
    cardForeground: '${staticCols.cardForeground || '60 9% 98%'}',
    popover: '${staticCols.popover || '222 47% 10%'}',
    popoverForeground: '${staticCols.popoverForeground || '60 9% 98%'}',
    primary: '${staticCols.primary || '215 25% 27%'}',
    primaryLight: '${staticCols.primaryLight || '215 20% 40%'}',
    primaryForeground: '${staticCols.primaryForeground || '0 0% 100%'}',
    secondary: '${staticCols.secondary || '222 47% 12%'}',
    secondaryForeground: '${staticCols.secondaryForeground || '60 9% 98%'}',
    muted: '${staticCols.muted || '222 47% 15%'}',
    mutedForeground: '${staticCols.mutedForeground || '215 16% 65%'}',
    border: '${staticCols.border || '215 25% 20%'}',
    input: '${staticCols.input || '215 25% 20%'}',
    ring: '${staticCols.ring || '38 92% 50%'}',
  },
  gradientConfigs: {
    hero: '${gradientCfg.hero || "linear-gradient(135deg, hsl(222 47% 7%) 0%, hsl(222 47% 12%) 50%, hsl(222 47% 7%) 100%)"}',
    cta: '${gradientCfg.cta || "linear-gradient(135deg, hsl(38 92% 50%) 0%, hsl(32 95% 44%) 100%)"}',
    text: '${gradientCfg.text || "linear-gradient(135deg, hsl(38 92% 50%) 0%, hsl(45 93% 58%) 50%, hsl(38 92% 50%) 100%)"}',
  },${activeTheme.logo_version_id ? `
  logoVersionId: '${activeTheme.logo_version_id}',` : ''}${logoConfigSection}
  ecommerceColors: ${JSON.stringify(activeTheme.ecommerce_colors || {}, null, 4).replace(/\n/g, '\n  ')},
  ctaVariants: ${JSON.stringify(activeTheme.cta_variants || {}, null, 4).replace(/\n/g, '\n  ')},
  typographyConfig: ${JSON.stringify(activeTheme.typography_config || {}, null, 4).replace(/\n/g, '\n  ')},
  motionConfig: ${JSON.stringify(activeTheme.motion_config || {}, null, 4).replace(/\n/g, '\n  ')},
  styleModules: ${JSON.stringify(activeTheme.style_modules || [], null, 4).replace(/\n/g, '\n  ')},
  defaultMode: '${activeTheme.default_mode || 'dark'}',
  darkModeOverrides: ${JSON.stringify(activeTheme.dark_mode_overrides && Object.keys(activeTheme.dark_mode_overrides as object).length > 0 ? activeTheme.dark_mode_overrides : null, null, 4)?.replace(/\n/g, '\n  ') || 'null'},
};

// ============================================
// ROUTE-TO-THEME MAPPINGS
// ============================================
export const routeThemeMappings: RouteThemeMapping[] = [
${(assignments || []).map(a => `  { route: '${a.page_route}', themeId: '${a.theme_id}' },`).join('\n') || '  // No route-specific themes configured'}
];

// ============================================
// ALL PUBLISHED THEMES
// ============================================
export const publishedThemes: Record<string, ThemeConfig> = {
  '${themeId}': activeTheme,
};

// ============================================
// HELPER FUNCTIONS
// ============================================

export function getThemeForRoute(pathname: string): ThemeConfig {
  const topLevel = '/' + (pathname.split('/')[1] || '');
  const mapping = routeThemeMappings.find(m => m.route === topLevel);
  if (mapping && publishedThemes[mapping.themeId]) {
    return publishedThemes[mapping.themeId];
  }
  return activeTheme;
}

export function applyThemeToRoot(theme: ThemeConfig): void {
  const root = document.documentElement;
  const isDark = root.classList.contains('dark');
  
  // Mode-aware: use darkModeOverrides for dark, staticColors for light
  const colors = (isDark && theme.darkModeOverrides) ? theme.darkModeOverrides : theme.staticColors;
  Object.entries(colors).forEach(([key, value]) => {
    const cssVar = key.replace(/([A-Z])/g, '-$1').toLowerCase();
    root.style.setProperty(\`--\${cssVar}\`, value);
  });
  root.style.setProperty('--accent', theme.accentConfig.accent);
  root.style.setProperty('--accent-hover', theme.accentConfig.accentHover);
  root.style.setProperty('--accent-glow', theme.accentConfig.accentGlow);
  root.style.setProperty('--accent-foreground', theme.accentConfig.accentForeground);
  root.style.setProperty('--gradient-hero', theme.gradientConfigs.hero);
  root.style.setProperty('--gradient-cta', theme.gradientConfigs.cta);
  root.style.setProperty('--gradient-text', theme.gradientConfigs.text);

  // E-Commerce tokens
  if (theme.ecommerceColors) {
    Object.entries(theme.ecommerceColors).forEach(([key, value]) => {
      const cssVar = key.replace(/([A-Z])/g, '-$1').toLowerCase();
      root.style.setProperty(\`--\${cssVar}\`, value);
    });
  }

  // CTA variant tokens
  if (theme.ctaVariants) {
    Object.entries(theme.ctaVariants).forEach(([key, value]) => {
      const cssVar = 'cta-' + key.replace(/([A-Z])/g, '-$1').toLowerCase();
      root.style.setProperty(\`--\${cssVar}\`, value);
    });
  }

  // Typography tokens
  if (theme.typographyConfig) {
    Object.entries(theme.typographyConfig).forEach(([key, value]) => {
      const cssVar = key.replace(/([A-Z])/g, '-$1').toLowerCase();
      root.style.setProperty(\`--\${cssVar}\`, value);
    });
  }

  // Motion tokens
  if (theme.motionConfig) {
    Object.entries(theme.motionConfig).forEach(([key, value]) => {
      const cssVar = key.replace(/([A-Z])/g, '-$1').toLowerCase();
      root.style.setProperty(\`--\${cssVar}\`, value);
    });
  }

  // Style module tokens
  if (theme.styleModules) {
    theme.styleModules.forEach(mod => {
      mod.tokens.forEach(tok => {
        root.style.setProperty(\`--module-\${mod.name}-\${tok.name}\`, tok.value);
      });
    });
  }
}
`;

    setGeneratedConfig(config);
    
    // Generate matching CSS for index.css
    const cssContent = generateProductionCss(activeTheme);
    setGeneratedCss(cssContent);
    
    setShowPublishDialog(true);
  };

  // Generate CSS content for index.css that matches the theme
  // BRD §7.1: :root = light mode base, .dark = dark mode overrides
  const generateProductionCss = (theme: Theme): string => {
    const accentCfg = theme.accent_config as Record<string, any>;
    const staticCols = theme.static_colors as Record<string, string>;
    const darkOverrides = theme.dark_mode_overrides as Record<string, string> || {};
    const hasDarkOverrides = Object.keys(darkOverrides).length > 0;
    // Use dark_mode_overrides for .dark block if populated, else fall back to static_colors
    const darkCols = hasDarkOverrides ? darkOverrides : staticCols;
    const gradientCfg = theme.gradient_configs as Record<string, string>;
    const ecomCols = theme.ecommerce_colors as Record<string, string> || {};
    const ctaCfg = theme.cta_variants as Record<string, string> || {};
    const typoCfg = theme.typography_config as Record<string, string> || {};
    const motCfg = theme.motion_config as Record<string, string> || {};
    const ghlCfg = theme.ghl_chat_config as Record<string, string> || {};
    const modules = theme.style_modules as unknown as StyleModule[] || [];
    
    // Generate style module CSS variables
    const styleModulesCss = (Array.isArray(modules) ? modules : [])
      .map(mod => mod.tokens.map(tok => `    --module-${mod.name}-${tok.name}: ${tok.value};`).join('\n'))
      .filter(Boolean)
      .join('\n');
    
    // Parse accent HSL for gradient generation
    const accentParts = (accentCfg.accent || '240 70% 60%').split(' ');
    const h = parseFloat(accentParts[0]) || 240;
    const s = parseFloat(accentParts[1]) || 70;
    const l = parseFloat(accentParts[2]) || 60;

    // Light-mode accent is slightly darker for readability on white
    const lLight = Math.max(l - 10, 30);
    const lLightHover = Math.max(l - 18, 22);
    const lLightGlow = l;
    
    return `@tailwind base;
@tailwind components;
@tailwind utilities;

/* SmartSites Design System v2.0
   All colors MUST be HSL.
   
   AUTO-GENERATED from theme: ${theme.name}
   Generated: ${new Date().toISOString().split('T')[0]}
   DO NOT edit manually - use admin theme editor and "Publish to Production".

   Architecture (BRD §7.1):
   - :root = Light mode semantic tokens (base)
   - .dark = Dark mode semantic token overrides
   - Shared tokens (typography, motion, radius) live in :root only
*/

@layer base {
  :root {
    /* ========== LIGHT MODE — Semantic Tokens ========== */
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

    /* Gradients - Light Mode */
    --gradient-hero: linear-gradient(135deg, hsl(${h} 20% 96%) 0%, hsl(${h} 20% 92%) 50%, hsl(${h} 20% 96%) 100%);
    --gradient-text: linear-gradient(135deg, hsl(${h} ${s}% ${lLight}%) 0%, hsl(${h + 10} ${s}% ${lLightGlow}%) 50%, hsl(${h} ${s}% ${lLight}%) 100%);
    --gradient-cta: linear-gradient(135deg, hsl(${h} ${s}% ${lLight}%) 0%, hsl(${h + 10} ${s}% ${lLightHover}%) 100%);
    --gradient-glow: radial-gradient(ellipse at center, hsl(${h} ${s}% ${lLight}% / 0.1) 0%, transparent 70%);
    --gradient-mesh: radial-gradient(at 40% 20%, hsl(${h} ${s}% ${lLight}% / 0.06) 0px, transparent 50%), radial-gradient(at 80% 0%, hsl(${h} 25% 27% / 0.08) 0px, transparent 50%), radial-gradient(at 0% 50%, hsl(${h} ${s}% ${lLight}% / 0.04) 0px, transparent 50%);

    /* Shadows - Light Mode (softer) */
    --shadow-sm: 0 1px 2px 0 hsl(0 0% 0% / 0.05);
    --shadow-md: 0 4px 6px -1px hsl(0 0% 0% / 0.08), 0 2px 4px -2px hsl(0 0% 0% / 0.05);
    --shadow-lg: 0 10px 15px -3px hsl(0 0% 0% / 0.08), 0 4px 6px -4px hsl(0 0% 0% / 0.05);
    --shadow-xl: 0 20px 25px -5px hsl(0 0% 0% / 0.08), 0 8px 10px -6px hsl(0 0% 0% / 0.05);
    --shadow-glow: 0 0 40px hsl(${h} ${s}% ${lLight}% / 0.15);
    --shadow-glow-lg: 0 0 60px hsl(${h} ${s}% ${lLight}% / 0.2);
    --shadow-button: 0 4px 14px 0 hsl(${h} ${s}% ${lLight}% / 0.2);
    --shadow-gold-glow: 0 0 30px hsl(39 95% 50% / 0.2);

    /* Sidebar - Light */
    --sidebar-background: ${h} 20% 96%;
    --sidebar-foreground: ${h} 47% 11%;
    --sidebar-primary: ${h} ${s}% ${lLight}%;
    --sidebar-primary-foreground: 0 0% 100%;
    --sidebar-accent: ${h} 20% 92%;
    --sidebar-accent-foreground: ${h} 47% 11%;
    --sidebar-border: ${h} 20% 88%;
    --sidebar-ring: ${h} ${s}% ${lLight}%;

    /* GHL Chat Widget */
    --ghl-textarea-bg: ${ghlCfg.textareaBg || `${h} 20% 96%`};
    --ghl-textarea-text: ${ghlCfg.textareaText || `${h} 47% 11%`};
    --ghl-textarea-border: ${ghlCfg.textareaBorder || `${h} 20% 88%`};
    --ghl-textarea-focus-border: ${ghlCfg.textareaFocusBorder || `${h} ${s}% ${lLight}%`};
    --ghl-textarea-focus-glow: ${ghlCfg.textareaFocusGlow || `${h} ${s}% ${lLight}%`};
    --ghl-send-button-bg: ${ghlCfg.sendButtonBg || `${h} ${s}% ${lLight}%`};
    --ghl-send-button-border: ${ghlCfg.sendButtonBorder || '0 0% 100%'};
    --ghl-send-button-icon: ${ghlCfg.sendButtonIcon || '0 0% 100%'};
    --ghl-selection-bg: ${ghlCfg.selectionBg || `${h} ${s}% ${lLight}%`};

    /* E-Commerce / Gold Tokens */
    --gold: ${ecomCols.gold || '39 95% 50%'};
    --gold-hover: ${ecomCols.goldHover || '35 95% 44%'};
    --gold-glow: ${ecomCols.goldGlow || '39 95% 60%'};
    --gold-foreground: ${ecomCols.goldForeground || '0 0% 100%'};
    --pricing-highlight: ${ecomCols.pricingHighlight || '39 95% 50%'};

    /* CTA Variants */
    --cta-primary: ${ctaCfg.primary || `${h} ${s}% ${lLight}%`};
    --cta-primary-hover: ${ctaCfg.primaryHover || `${h} ${s}% ${lLightHover}%`};
    --cta-secondary: ${ctaCfg.secondary || '39 95% 50%'};
    --cta-secondary-hover: ${ctaCfg.secondaryHover || '35 95% 44%'};

    /* ========== SHARED TOKENS (mode-independent) ========== */

    /* Typography */
    --font-heading: ${typoCfg.fontHeading || "'Space Grotesk', -apple-system, BlinkMacSystemFont, sans-serif"};
    --font-body: ${typoCfg.fontBody || "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"};
    --font-display: ${typoCfg.fontDisplay || "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"};

    /* Motion */
    --transition-smooth: ${motCfg.transitionSmooth || 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'};
    --transition-bounce: ${motCfg.transitionBounce || 'all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)'};
    --transition-spring: ${motCfg.transitionSpring || 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)'};
${styleModulesCss}  }

  /* ========== DARK MODE — Overrides ========== */
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

    /* Gradients - Dark Mode */
    --gradient-hero: ${gradientCfg.hero || `linear-gradient(135deg, hsl(222 47% 11%) 0%, hsl(${h} 30% 18%) 50%, hsl(222 47% 11%) 100%)`};
    --gradient-text: ${gradientCfg.text || `linear-gradient(135deg, hsl(${h} ${s}% ${l}%) 0%, hsl(${h + 10} ${s}% ${Math.min(l + 10, 80)}%) 50%, hsl(${h} ${s}% ${l}%) 100%)`};
    --gradient-cta: ${gradientCfg.cta || `linear-gradient(135deg, hsl(${h} ${s}% ${l}%) 0%, hsl(${h + 10} ${s}% ${Math.max(l - 10, 30)}%) 100%)`};
    --gradient-glow: radial-gradient(ellipse at center, hsl(${h} ${s}% ${l}% / 0.2) 0%, transparent 70%);
    --gradient-mesh: radial-gradient(at 40% 20%, hsl(${h} ${s}% ${l}% / 0.12) 0px, transparent 50%), radial-gradient(at 80% 0%, hsl(215 25% 27% / 0.15) 0px, transparent 50%), radial-gradient(at 0% 50%, hsl(${h} ${s}% ${l}% / 0.08) 0px, transparent 50%);

    /* Shadows - Dark Mode (deeper) */
    --shadow-sm: 0 1px 2px 0 hsl(0 0% 0% / 0.3);
    --shadow-md: 0 4px 6px -1px hsl(0 0% 0% / 0.4), 0 2px 4px -2px hsl(0 0% 0% / 0.3);
    --shadow-lg: 0 10px 15px -3px hsl(0 0% 0% / 0.4), 0 4px 6px -4px hsl(0 0% 0% / 0.3);
    --shadow-xl: 0 20px 25px -5px hsl(0 0% 0% / 0.4), 0 8px 10px -6px hsl(0 0% 0% / 0.3);
    --shadow-glow: 0 0 40px hsl(${h} ${s}% ${l}% / 0.25);
    --shadow-glow-lg: 0 0 60px hsl(${h} ${s}% ${l}% / 0.35);
    --shadow-button: 0 4px 14px 0 hsl(${h} ${s}% ${l}% / 0.3);
    --shadow-gold-glow: 0 0 30px hsl(39 95% 50% / 0.3);

    /* Sidebar - Dark */
    --sidebar-background: 222 47% 9%;
    --sidebar-foreground: 60 9% 98%;
    --sidebar-primary: ${accentCfg.accent || '240 70% 60%'};
    --sidebar-primary-foreground: ${accentCfg.accentForeground || '0 0% 100%'};
    --sidebar-accent: 222 47% 15%;
    --sidebar-accent-foreground: 60 9% 98%;
    --sidebar-border: 215 25% 20%;
    --sidebar-ring: ${accentCfg.accent || '240 70% 60%'};

    /* GHL Chat Widget - Dark */
    --ghl-textarea-bg: ${ghlCfg.textareaBg || darkCols.background || '222 47% 7%'};
    --ghl-textarea-text: ${ghlCfg.textareaText || darkCols.foreground || '60 9% 98%'};
    --ghl-textarea-border: ${ghlCfg.textareaBorder || darkCols.border || '215 25% 20%'};
    --ghl-textarea-focus-border: ${ghlCfg.textareaFocusBorder || accentCfg.accent || '240 70% 60%'};
    --ghl-textarea-focus-glow: ${ghlCfg.textareaFocusGlow || accentCfg.accent || '240 70% 60%'};
    --ghl-send-button-bg: ${ghlCfg.sendButtonBg || accentCfg.accent || '240 70% 60%'};
    --ghl-send-button-border: ${ghlCfg.sendButtonBorder || '0 0% 100%'};
    --ghl-send-button-icon: ${ghlCfg.sendButtonIcon || '0 0% 100%'};
    --ghl-selection-bg: ${ghlCfg.selectionBg || accentCfg.accent || '240 70% 60%'};

    /* Gold stays same in dark */
    --gold: ${ecomCols.gold || '39 95% 50%'};
    --gold-hover: ${ecomCols.goldHover || '35 95% 44%'};
    --gold-glow: ${ecomCols.goldGlow || '39 95% 60%'};
    --gold-foreground: ${ecomCols.goldForeground || '0 0% 100%'};
    --pricing-highlight: ${ecomCols.pricingHighlight || '39 95% 50%'};

    /* CTA Variants - Dark */
    --cta-primary: ${ctaCfg.primary || '240 70% 60%'};
    --cta-primary-hover: ${ctaCfg.primaryHover || '240 70% 50%'};
    --cta-secondary: ${ctaCfg.secondary || '39 95% 50%'};
    --cta-secondary-hover: ${ctaCfg.secondaryHover || '35 95% 44%'};
  }
}

@layer base {
  * {
    @apply border-border;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    @apply bg-background text-foreground antialiased;
    font-family: var(--font-body);
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-heading);
    @apply font-bold tracking-tight;
  }

  h1 {
    @apply text-4xl sm:text-5xl md:text-6xl lg:text-7xl;
  }

  h2 {
    @apply text-3xl sm:text-4xl md:text-5xl;
  }

  h3 {
    @apply text-2xl sm:text-3xl;
  }
}

@layer utilities {
  .text-gradient {
    background: var(--gradient-text);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .text-gradient-light {
    background: linear-gradient(135deg, hsl(var(--foreground)) 0%, hsl(var(--accent)) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .icon-gradient-ocean {
    background: linear-gradient(135deg, hsl(210 100% 45%) 0%, hsl(195 100% 50%) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .icon-gradient-royal {
    background: linear-gradient(135deg, hsl(230 80% 55%) 0%, hsl(200 100% 60%) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .icon-gradient-sky {
    background: linear-gradient(135deg, hsl(200 85% 50%) 0%, hsl(180 70% 55%) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .icon-gradient-electric {
    background: linear-gradient(135deg, hsl(220 90% 55%) 0%, hsl(190 95% 45%) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .glow {
    box-shadow: var(--shadow-glow);
  }

  .glow-lg {
    box-shadow: var(--shadow-glow-lg);
  }

  .glow-text {
    text-shadow: 0 0 40px hsl(var(--accent-glow) / 0.5);
  }

  .bg-mesh {
    background-image: var(--gradient-mesh);
  }

  .bg-hero {
    background: var(--gradient-hero);
  }

  .bg-noise {
    position: relative;
  }
  
  .bg-noise::after {
    content: '';
    position: absolute;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
    opacity: 0.03;
    pointer-events: none;
    mix-blend-mode: overlay;
  }

  .transition-smooth {
    transition: var(--transition-smooth);
  }

  .transition-bounce {
    transition: var(--transition-bounce);
  }

  .transition-spring {
    transition: var(--transition-spring);
  }

  .hover-scale {
    @apply transition-transform duration-200 hover:scale-105;
  }

  .hover-lift {
    @apply transition-all duration-300;
  }

  .hover-lift:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg);
  }

  .hover-glow {
    @apply transition-shadow duration-300;
  }

  .hover-glow:hover {
    box-shadow: var(--shadow-glow);
  }

  .nav-link {
    @apply relative;
  }

  .nav-link::after {
    content: '';
    @apply absolute bottom-0 left-0 w-full h-[2px] origin-left scale-x-0 transition-transform duration-300;
    background: linear-gradient(90deg, hsl(var(--accent)) 0%, hsl(var(--accent) / 0.5) 100%);
  }

  .nav-link:hover::after {
    @apply scale-x-100;
  }

  .nav-link.active::after {
    @apply scale-x-100;
  }

  .story-link {
    @apply relative inline-block;
  }

  .story-link::after {
    content: '';
    @apply absolute w-full h-0.5 bottom-0 left-0 origin-bottom-right transition-transform duration-300 scale-x-0;
    background: hsl(var(--accent));
  }

  .story-link:hover::after {
    @apply origin-bottom-left scale-x-100;
  }

  .glass {
    @apply bg-background/80 backdrop-blur-lg border border-border/50;
  }

  .glass-dark {
    @apply bg-primary/80 backdrop-blur-lg border border-border/20;
  }

  .shadow-layered {
    box-shadow: 
      0 1px 2px hsl(0 0% 0% / 0.05),
      0 4px 8px hsl(0 0% 0% / 0.05),
      0 16px 32px hsl(0 0% 0% / 0.05);
  }

  .shadow-layered-lg {
    box-shadow: 
      0 2px 4px hsl(0 0% 0% / 0.03),
      0 8px 16px hsl(0 0% 0% / 0.05),
      0 24px 48px hsl(0 0% 0% / 0.08);
  }

  .border-glow {
    position: relative;
  }

  .border-glow::before {
    content: '';
    position: absolute;
    inset: -2px;
    border-radius: inherit;
    background: var(--gradient-cta);
    z-index: -1;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .border-glow:hover::before {
    opacity: 1;
  }

  .border-gradient-top {
    position: relative;
  }

  .border-gradient-top::before {
    content: '';
    @apply absolute top-0 left-0 right-0 h-px;
    background: linear-gradient(90deg, transparent 0%, hsl(var(--accent) / 0.5) 50%, transparent 100%);
  }

  .fade-edges-x {
    mask-image: linear-gradient(90deg, transparent 0%, black 10%, black 90%, transparent 100%);
    -webkit-mask-image: linear-gradient(90deg, transparent 0%, black 10%, black 90%, transparent 100%);
  }

  .pulse-glow {
    animation: pulse-glow 2s ease-in-out infinite;
  }

  .bg-radial-vignette {
    background: radial-gradient(
      ellipse 50% 50% at 50% 50%,
      hsl(var(--background) / 0.95) 0%,
      hsl(var(--background) / 0.8) 30%,
      hsl(var(--background) / 0.3) 60%,
      transparent 100%
    );
  }

  .footer-link {
    @apply relative text-muted-foreground transition-all duration-300;
  }

  .footer-link:hover {
    @apply text-foreground pl-1;
  }

  .footer-link::before {
    content: '';
    @apply absolute left-0 top-1/2 -translate-y-1/2 w-0 h-0.5 bg-accent transition-all duration-300;
  }

  .footer-link:hover::before {
    @apply w-2;
  }
}

@layer components {
  .btn-glow {
    @apply relative overflow-hidden;
    box-shadow: var(--shadow-button);
  }

  .btn-glow::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, transparent, hsl(0 0% 100% / 0.2), transparent);
    transform: translateX(-100%);
    transition: transform 0.5s ease;
  }

  .btn-glow:hover::before {
    transform: translateX(100%);
  }

  .btn-glow:hover {
    box-shadow: var(--shadow-glow);
  }

  .card-hover {
    @apply transition-all duration-300 border border-border/50;
  }

  .card-hover:hover {
    @apply border-accent/50;
    box-shadow: var(--shadow-glow);
    transform: translateY(-2px);
  }

  .section {
    @apply py-16 sm:py-20 md:py-24 lg:py-32;
  }

  .hero {
    @apply relative min-h-[80vh] flex items-center justify-center overflow-hidden;
    background: var(--gradient-hero);
  }

  .hero::before {
    content: '';
    @apply absolute inset-0 bg-mesh pointer-events-none;
  }
}

#chat-widget,
.chat-widget,
[class*="chat-widget"],
.leadconnector-chat {
  z-index: 40 !important;
}

::selection {
  background: hsl(var(--accent) / 0.3);
  color: hsl(var(--foreground));
}

::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: hsl(var(--muted));
}

::-webkit-scrollbar-thumb {
  background: hsl(var(--muted-foreground) / 0.5);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: hsl(var(--muted-foreground) / 0.7);
}`;
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(generatedConfig);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({
      title: 'Copied!',
      description: 'Config copied to clipboard. Paste into src/config/themes.ts',
    });
  };

  // Save config to database for GitHub sync
  const saveToDatabase = async (): Promise<number | null> => {
    const activeTheme = themes.find(t => t.is_active);
    if (!activeTheme || !generatedConfig) return null;

    try {
      // Get next version number
      const { data: versionData } = await supabase.rpc('get_next_theme_config_version');
      const nextVersion = versionData || 1;

      // Insert the published config with CSS
      const { error } = await supabase
        .from('published_theme_configs')
        .insert({
          source_theme_id: activeTheme.id,
          source_theme_name: activeTheme.name,
          version: nextVersion,
          config_typescript: generatedConfig,
          config_css: generatedCss,
          config_json: {
            accentConfig: activeTheme.accent_config,
            staticColors: activeTheme.static_colors,
            darkModeOverrides: activeTheme.dark_mode_overrides,
            gradientConfigs: activeTheme.gradient_configs,
          },
          is_active: true,
          notes: `Published from admin UI`,
        });

      if (error) throw error;

      // Deactivate previous versions
      await supabase
        .from('published_theme_configs')
        .update({ is_active: false })
        .neq('version', nextVersion);

      setPublishedVersion(nextVersion);
      return nextVersion;
    } catch (error) {
      console.error('Error saving to database:', error);
      toast({
        variant: 'destructive',
        title: 'Database Error',
        description: 'Failed to save theme config to database',
      });
      return null;
    }
  };

  // Publish to GitHub via edge function
  const publishToGithub = async () => {
    setIsPublishingToGithub(true);
    setCommitUrl(null);

    try {
      // First save to database
      const version = await saveToDatabase();
      if (!version) {
        setIsPublishingToGithub(false);
        return;
      }

      // Call edge function
      const { data, error } = await supabase.functions.invoke('sync-theme-to-github');

      if (error) throw error;

      if (data?.success) {
        setCommitUrl(data.commitUrl);
        toast({
          title: 'Published to GitHub!',
          description: `Theme v${data.version} committed successfully.`,
        });
      } else {
        throw new Error(data?.error || 'Unknown error');
      }
    } catch (error) {
      console.error('GitHub publish error:', error);
      toast({
        variant: 'destructive',
        title: 'GitHub Error',
        description: error instanceof Error ? error.message : 'Failed to publish to GitHub',
      });
    } finally {
      setIsPublishingToGithub(false);
    }
  };

  const getLogoForTheme = (theme: Theme): LogoVersion | undefined => {
    return logoVersions.find(l => l.id === theme.logo_version_id) || logoVersions[0];
  };

  const getAccentColor = (theme: Theme): string => {
    const config = theme.accent_config as Record<string, string>;
    return config?.accent || '38 92% 50%';
  };

  const hslToHex = (h: number, s: number, l: number): string => {
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
  };

  // Parse HSL string to object
  const parseHsl = (hslStr: string): { h: number; s: number; l: number } => {
    const parts = hslStr.split(' ').map((p) => parseFloat(p.replace('%', '')));
    return { h: parts[0] || 0, s: parts[1] || 0, l: parts[2] || 0 };
  };

  // Format HSL object to string
  const formatHsl = (h: number, s: number, l: number): string => {
    return `${Math.round(h)} ${Math.round(s)}% ${Math.round(l)}%`;
  };

  // HSL Editor Component with sliders AND number inputs
  const HslEditor = ({ 
    label, 
    value, 
    onChange,
    description 
  }: { 
    label: string; 
    value: string; 
    onChange: (val: string) => void;
    description?: string;
  }) => {
    const hsl = parseHsl(value);
    
    const updateHsl = (key: 'h' | 's' | 'l', newValue: number) => {
      const updated = { ...hsl, [key]: newValue };
      onChange(formatHsl(updated.h, updated.s, updated.l));
    };

    return (
      <AccordionItem value={label.toLowerCase().replace(/\s/g, '-')}>
        <AccordionTrigger className="text-sm py-2">
          <div className="flex items-center gap-2">
            <div 
              className="h-4 w-4 rounded border shrink-0"
              style={{ backgroundColor: `hsl(${value})` }}
            />
            {label}
          </div>
        </AccordionTrigger>
        <AccordionContent className="space-y-3 pb-4">
          {description && (
            <p className="text-xs text-muted-foreground">{description}</p>
          )}
          
          {/* Color preview */}
          <div className="flex items-center gap-3">
            <div 
              className="h-10 w-10 rounded-lg border shrink-0"
              style={{ backgroundColor: `hsl(${value})` }}
            />
            <Input
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder="0 0% 100%"
              className="font-mono text-xs flex-1"
            />
          </div>
          
          {/* Hue slider + number input */}
          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <Label className="text-xs text-muted-foreground">Hue</Label>
              <Input
                type="number"
                min={0}
                max={360}
                value={Math.round(hsl.h)}
                onChange={(e) => updateHsl('h', Number(e.target.value))}
                className="w-16 h-6 text-xs font-mono"
              />
            </div>
            <Slider 
              value={[hsl.h]} 
              max={360} 
              onValueChange={(v) => updateHsl('h', v[0])} 
              className="[&_.relative]:h-2"
            />
            <div 
              className="h-2 rounded"
              style={{ 
                background: `linear-gradient(90deg, 
                  hsl(0, ${hsl.s}%, ${hsl.l}%), 
                  hsl(60, ${hsl.s}%, ${hsl.l}%), 
                  hsl(120, ${hsl.s}%, ${hsl.l}%), 
                  hsl(180, ${hsl.s}%, ${hsl.l}%), 
                  hsl(240, ${hsl.s}%, ${hsl.l}%), 
                  hsl(300, ${hsl.s}%, ${hsl.l}%), 
                  hsl(360, ${hsl.s}%, ${hsl.l}%)
                )`
              }}
            />
          </div>
          
          {/* Saturation slider + number input */}
          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <Label className="text-xs text-muted-foreground">Saturation</Label>
              <Input
                type="number"
                min={0}
                max={100}
                value={Math.round(hsl.s)}
                onChange={(e) => updateHsl('s', Number(e.target.value))}
                className="w-16 h-6 text-xs font-mono"
              />
            </div>
            <Slider 
              value={[hsl.s]} 
              max={100} 
              onValueChange={(v) => updateHsl('s', v[0])} 
            />
          </div>
          
          {/* Lightness slider + number input */}
          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <Label className="text-xs text-muted-foreground">Lightness</Label>
              <Input
                type="number"
                min={0}
                max={100}
                value={Math.round(hsl.l)}
                onChange={(e) => updateHsl('l', Number(e.target.value))}
                className="w-16 h-6 text-xs font-mono"
              />
            </div>
            <Slider 
              value={[hsl.l]} 
              max={100} 
              onValueChange={(v) => updateHsl('l', v[0])} 
            />
          </div>
        </AccordionContent>
      </AccordionItem>
    );
  };

  // Color Controls Component (for accent which has gradient option)
  const ColorSliderControls = ({ 
    label,
    hsl,
    onHslChange,
    showGradient = false,
    gradient,
    onGradientChange,
  }: { 
    label: string;
    hsl: { h: number; s: number; l: number };
    onHslChange: (hsl: { h: number; s: number; l: number }) => void;
    showGradient?: boolean;
    gradient?: { useGradient?: boolean; gradientFrom?: string; gradientTo?: string; gradientAngle?: number };
    onGradientChange?: (g: { useGradient?: boolean; gradientFrom?: string; gradientTo?: string; gradientAngle?: number }) => void;
  }) => (
    <AccordionItem value={label.toLowerCase().replace(/\s/g, '-')}>
      <AccordionTrigger className="text-sm py-2">
        <div className="flex items-center gap-2">
          <div 
            className="h-4 w-4 rounded border shrink-0"
            style={{ backgroundColor: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` }}
          />
          {label}
        </div>
      </AccordionTrigger>
      <AccordionContent className="space-y-3 pb-4">
        <Tabs defaultValue="hsl" className="w-full">
          <TabsList className="grid w-full grid-cols-3 h-8">
            <TabsTrigger value="preset" className="text-xs">Preset</TabsTrigger>
            <TabsTrigger value="hsl" className="text-xs">HSL</TabsTrigger>
            {showGradient && <TabsTrigger value="gradient" className="text-xs">Gradient</TabsTrigger>}
          </TabsList>
          
          <TabsContent value="preset" className="mt-2 space-y-2">
            <div className="flex flex-wrap gap-1">
              {presetColors.map((c) => (
                <button
                  key={c}
                  className="w-6 h-6 rounded border border-border hover:ring-2 hover:ring-primary"
                  style={{ backgroundColor: c }}
                  onClick={() => {
                    // Convert hex to HSL (simplified)
                    onHslChange({ h: 38, s: 92, l: 50 });
                  }}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="hsl" className="mt-2 space-y-3">
            <div className="flex items-center gap-3">
              <div 
                className="h-10 w-10 rounded-lg border shrink-0"
                style={{ backgroundColor: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` }}
              />
              <div className="text-xs text-muted-foreground font-mono">
                {hsl.h}° {hsl.s}% {hsl.l}%
              </div>
            </div>
            
            {/* Hue with number input */}
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">Hue</span>
                <Input
                  type="number"
                  min={0}
                  max={360}
                  value={Math.round(hsl.h)}
                  onChange={(e) => onHslChange({ ...hsl, h: Number(e.target.value) })}
                  className="w-16 h-6 text-xs font-mono"
                />
              </div>
              <Slider 
                value={[hsl.h]} 
                max={360} 
                onValueChange={(v) => onHslChange({ ...hsl, h: v[0] })} 
              />
            </div>
            
            {/* Saturation with number input */}
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">Saturation</span>
                <Input
                  type="number"
                  min={0}
                  max={100}
                  value={Math.round(hsl.s)}
                  onChange={(e) => onHslChange({ ...hsl, s: Number(e.target.value) })}
                  className="w-16 h-6 text-xs font-mono"
                />
              </div>
              <Slider 
                value={[hsl.s]} 
                max={100} 
                onValueChange={(v) => onHslChange({ ...hsl, s: v[0] })} 
              />
            </div>
            
            {/* Lightness with number input */}
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">Lightness</span>
                <Input
                  type="number"
                  min={0}
                  max={100}
                  value={Math.round(hsl.l)}
                  onChange={(e) => onHslChange({ ...hsl, l: Number(e.target.value) })}
                  className="w-16 h-6 text-xs font-mono"
                />
              </div>
              <Slider 
                value={[hsl.l]} 
                max={100} 
                onValueChange={(v) => onHslChange({ ...hsl, l: v[0] })} 
              />
            </div>
          </TabsContent>

          {showGradient && gradient && onGradientChange && (
            <TabsContent value="gradient" className="mt-2 space-y-3">
              <div className="flex items-center gap-2">
                <Switch 
                  checked={gradient.useGradient || false} 
                  onCheckedChange={(v) => onGradientChange({ ...gradient, useGradient: v })} 
                />
                <Label className="text-xs">Enable Gradient</Label>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label className="text-xs text-muted-foreground">From</Label>
                  <Input 
                    type="color" 
                    value={gradient.gradientFrom || '#F97316'} 
                    onChange={(e) => onGradientChange({ ...gradient, gradientFrom: e.target.value })} 
                    className="h-8 cursor-pointer" 
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs text-muted-foreground">To</Label>
                  <Input 
                    type="color" 
                    value={gradient.gradientTo || '#EF4444'} 
                    onChange={(e) => onGradientChange({ ...gradient, gradientTo: e.target.value })} 
                    className="h-8 cursor-pointer"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">Angle</span>
                  <Input
                    type="number"
                    min={0}
                    max={360}
                    value={gradient.gradientAngle || 90}
                    onChange={(e) => onGradientChange({ ...gradient, gradientAngle: Number(e.target.value) })}
                    className="w-16 h-6 text-xs font-mono"
                  />
                </div>
                <Slider 
                  value={[gradient.gradientAngle || 90]} 
                  max={360} 
                  onValueChange={(v) => onGradientChange({ ...gradient, gradientAngle: v[0] })} 
                />
              </div>
              {gradient.useGradient && (
                <div 
                  className="h-8 rounded-lg border"
                  style={{ 
                    background: `linear-gradient(${gradient.gradientAngle || 90}deg, ${gradient.gradientFrom || '#F97316'}, ${gradient.gradientTo || '#EF4444'})` 
                  }}
                />
              )}
            </TabsContent>
          )}
        </Tabs>
      </AccordionContent>
    </AccordionItem>
  );

  /**
   * GHL Color Control Component for chat widget theming.
   * Provides a full-featured HSL color editor with:
   * - Native color picker (hex input converted to HSL)
   * - Manual HSL string input
   * - Individual H/S/L sliders with increment/decrement buttons
   * 
   * Matches the HslEditor pattern used for other theme colors.
   * 
   * @param label - Display label for the color control
   * @param value - Current HSL value as "H S% L%" string
   * @param onChange - Callback when color value changes
   */
  const GhlColorControl = ({ 
    label, 
    value, 
    onChange 
  }: { 
    label: string; 
    value: string; 
    onChange: (val: string) => void;
  }) => {
    const hsl = parseHsl(value);
    
    const updateHsl = (key: 'h' | 's' | 'l', newValue: number) => {
      const updated = { ...hsl, [key]: newValue };
      onChange(formatHsl(updated.h, updated.s, updated.l));
    };

    const increment = (key: 'h' | 's' | 'l', amount: number) => {
      const max = key === 'h' ? 360 : 100;
      const newVal = Math.max(0, Math.min(max, hsl[key] + amount));
      updateHsl(key, newVal);
    };

    return (
      <AccordionItem value={`ghl-${label.toLowerCase().replace(/\s/g, '-')}`}>
        <AccordionTrigger className="text-xs py-1.5">
          <div className="flex items-center gap-2">
            <div 
              className="h-3 w-3 rounded border shrink-0"
              style={{ backgroundColor: `hsl(${value})` }}
            />
            {label}
          </div>
        </AccordionTrigger>
        <AccordionContent className="space-y-2 pb-3">
          {/* Color preview with hex picker */}
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={hslToHex(hsl.h, hsl.s, hsl.l)}
              onChange={(e) => {
                // Convert hex to HSL
                const hex = e.target.value;
                const r = parseInt(hex.slice(1, 3), 16) / 255;
                const g = parseInt(hex.slice(3, 5), 16) / 255;
                const b = parseInt(hex.slice(5, 7), 16) / 255;
                const max = Math.max(r, g, b), min = Math.min(r, g, b);
                let h = 0, s = 0;
                const l = (max + min) / 2;
                if (max !== min) {
                  const d = max - min;
                  s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
                  switch (max) {
                    case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
                    case g: h = ((b - r) / d + 2) / 6; break;
                    case b: h = ((r - g) / d + 4) / 6; break;
                  }
                }
                onChange(formatHsl(h * 360, s * 100, l * 100));
              }}
              className="h-8 w-10 rounded border cursor-pointer shrink-0"
            />
            <Input
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder="0 0% 100%"
              className="font-mono text-xs flex-1"
            />
          </div>
          
          {/* Hue control */}
          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <Label className="text-xs text-muted-foreground">Hue</Label>
              <div className="flex items-center gap-1">
                <Button variant="outline" size="icon" className="h-5 w-5" onClick={() => increment('h', -5)}>
                  <ChevronDown className="h-3 w-3" />
                </Button>
                <Input
                  type="number"
                  min={0}
                  max={360}
                  value={Math.round(hsl.h)}
                  onChange={(e) => updateHsl('h', Number(e.target.value))}
                  className="w-14 h-5 text-xs font-mono text-center"
                />
                <Button variant="outline" size="icon" className="h-5 w-5" onClick={() => increment('h', 5)}>
                  <ChevronUp className="h-3 w-3" />
                </Button>
              </div>
            </div>
            <Slider 
              value={[hsl.h]} 
              max={360} 
              onValueChange={(v) => updateHsl('h', v[0])} 
              className="[&_.relative]:h-1.5"
            />
          </div>
          
          {/* Saturation control */}
          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <Label className="text-xs text-muted-foreground">Saturation</Label>
              <div className="flex items-center gap-1">
                <Button variant="outline" size="icon" className="h-5 w-5" onClick={() => increment('s', -5)}>
                  <ChevronDown className="h-3 w-3" />
                </Button>
                <Input
                  type="number"
                  min={0}
                  max={100}
                  value={Math.round(hsl.s)}
                  onChange={(e) => updateHsl('s', Number(e.target.value))}
                  className="w-14 h-5 text-xs font-mono text-center"
                />
                <Button variant="outline" size="icon" className="h-5 w-5" onClick={() => increment('s', 5)}>
                  <ChevronUp className="h-3 w-3" />
                </Button>
              </div>
            </div>
            <Slider 
              value={[hsl.s]} 
              max={100} 
              onValueChange={(v) => updateHsl('s', v[0])} 
              className="[&_.relative]:h-1.5"
            />
          </div>
          
          {/* Lightness control */}
          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <Label className="text-xs text-muted-foreground">Lightness</Label>
              <div className="flex items-center gap-1">
                <Button variant="outline" size="icon" className="h-5 w-5" onClick={() => increment('l', -5)}>
                  <ChevronDown className="h-3 w-3" />
                </Button>
                <Input
                  type="number"
                  min={0}
                  max={100}
                  value={Math.round(hsl.l)}
                  onChange={(e) => updateHsl('l', Number(e.target.value))}
                  className="w-14 h-5 text-xs font-mono text-center"
                />
                <Button variant="outline" size="icon" className="h-5 w-5" onClick={() => increment('l', 5)}>
                  <ChevronUp className="h-3 w-3" />
                </Button>
              </div>
            </div>
            <Slider 
              value={[hsl.l]} 
              max={100} 
              onValueChange={(v) => updateHsl('l', v[0])} 
              className="[&_.relative]:h-1.5"
            />
          </div>
        </AccordionContent>
      </AccordionItem>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2 sm:gap-4">
            <Link to="/admin">
              <Button variant="ghost" size="sm" className="px-2 sm:px-3">
                <ArrowLeft className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">Back</span>
              </Button>
            </Link>
            <h1 className="text-base sm:text-xl font-bold">Themes</h1>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <Button 
              onClick={generateProductionConfig}
              size="sm" 
              className="text-xs sm:text-sm bg-accent hover:bg-accent-hover text-accent-foreground"
            >
              <Rocket className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline">Publish to Prod</span>
            </Button>
            {selectedTheme && (
              <Button
                variant="outline"
                size="sm"
                className="text-xs sm:text-sm"
                onClick={() => {
                  const exportData = {
                    $schema: 'https://everintent.com/schemas/theme-export-v2.0.json',
                    version: '2.0',
                    exportedAt: new Date().toISOString(),
                    theme: {
                      name: selectedTheme.name,
                      baseHue: selectedTheme.base_hue,
                      defaultMode: selectedTheme.default_mode,
                      accentConfig: selectedTheme.accent_config,
                      staticColors: selectedTheme.static_colors,
                      gradientConfigs: selectedTheme.gradient_configs,
                      ghlChatConfig: selectedTheme.ghl_chat_config,
                      ecommerceColors: selectedTheme.ecommerce_colors,
                      ctaVariants: selectedTheme.cta_variants,
                      typographyConfig: selectedTheme.typography_config,
                      motionConfig: selectedTheme.motion_config,
                      styleModules: selectedTheme.style_modules,
                      adaWidgetConfig: selectedTheme.ada_widget_config,
                    },
                  };
                  const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `${selectedTheme.name.toLowerCase().replace(/\s+/g, '-')}-theme-v2.0.json`;
                  a.click();
                  URL.revokeObjectURL(url);
                  toast({ title: 'Theme exported', description: `Downloaded ${a.download}` });
                }}
              >
                <Download className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">Export JSON</span>
              </Button>
            )}
            <Link to={`/admin/theme-test${selectedTheme ? `?themeId=${selectedTheme.id}` : ''}`} target="_blank">
              <Button variant="outline" size="sm" className="text-xs sm:text-sm">
                <Eye className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">Test Page</span>
              </Button>
            </Link>
            <span className="hidden md:inline text-sm text-muted-foreground">{user?.email}</span>
          </div>
        </div>
      </header>

      <main className="container py-4 lg:py-8 px-3 lg:px-4">
        <div className="grid gap-4 lg:gap-8 lg:grid-cols-[300px_1fr]">
          {/* Theme List */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Themes ({themes.length})</h2>
            <ScrollArea className="h-48 lg:h-[calc(100vh-12rem)]">
              <div className="space-y-2 pr-4">
                {themes.map((theme) => {
                  const accentColor = getAccentColor(theme);
                  
                  return (
                    <Card 
                      key={theme.id}
                      className={`cursor-pointer transition-all ${
                        selectedTheme?.id === theme.id 
                          ? 'ring-2 ring-primary' 
                          : 'hover:border-primary/50'
                      }`}
                      onClick={() => {
                        setSelectedTheme(theme);
                        setIsEditing(false);
                      }}
                    >
                      <CardHeader className="p-3">
                        <div className="flex items-center gap-3">
                          <div 
                            className="h-8 w-8 rounded-lg border shrink-0"
                            style={{ backgroundColor: `hsl(${accentColor})` }}
                          />
                          <div className="min-w-0 flex-1">
                            <CardTitle className="text-sm flex items-center gap-2 truncate">
                              {theme.name}
                              {theme.is_active && (
                                <Badge variant="default" className="text-[10px] px-1.5 py-0">
                                  Active
                                </Badge>
                              )}
                            </CardTitle>
                            <CardDescription className="text-xs">
                              v{theme.version} • Hue {theme.base_hue}°
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                    </Card>
                  );
                })}
              </div>
            </ScrollArea>
          </div>

          {/* Theme Editor */}
          <div className="space-y-4">
            {selectedTheme ? (
              <Card>
                <CardHeader className="p-3 lg:pb-4 lg:p-6">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2 text-base lg:text-lg">
                        <Palette className="h-4 w-4 lg:h-5 lg:w-5" />
                        {isEditing ? 'Edit Theme' : selectedTheme.name}
                      </CardTitle>
                      <CardDescription className="text-xs">
                        {isEditing ? 'Adjust colors and settings' : 'Click Edit to modify'}
                      </CardDescription>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {!selectedTheme.is_active && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleSetActive(selectedTheme)}
                        >
                          <Check className="h-4 w-4 sm:mr-2" />
                          <span className="hidden sm:inline">Set Active</span>
                        </Button>
                      )}
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 sm:mr-2" />
                            <span className="hidden sm:inline">Preview</span>
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-lg">
                          <DialogHeader>
                            <DialogTitle>Preview: {selectedTheme.name}</DialogTitle>
                            <DialogDescription>
                              Logo preview with current theme colors
                            </DialogDescription>
                          </DialogHeader>
                          <div 
                            className="rounded-lg p-8 flex items-center justify-center"
                            style={{ backgroundColor: `hsl(${staticColors.primary})` }}
                          >
                            {getLogoForTheme(selectedTheme) && (
                              <LogoRenderer 
                                config={getLogoForTheme(selectedTheme)!}
                                accentHsl={`${accentConfig.h} ${accentConfig.s}% ${accentConfig.l}%`}
                              />
                            )}
                          </div>
                        </DialogContent>
                      </Dialog>
                      {!selectedTheme.is_active && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-destructive hover:text-destructive"
                          onClick={() => handleDelete(selectedTheme)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                      {isEditing ? (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setIsEditing(false);
                              const original = themes.find(t => t.id === selectedTheme.id);
                              if (original) setSelectedTheme(original);
                            }}
                          >
                            Cancel
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-destructive hover:text-destructive"
                            onClick={() => setShowRevertWarning1(true)}
                          >
                            <RotateCcw className="h-4 w-4 sm:mr-1" />
                            <span className="hidden sm:inline">Revert</span>
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setShowSaveDefaultWarning1(true)}
                          >
                            <Save className="h-4 w-4 sm:mr-1" />
                            <span className="hidden sm:inline">Set Default</span>
                          </Button>
                          <Button
                            size="sm"
                            onClick={handleSave}
                            disabled={isSaving}
                          >
                            {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Save
                          </Button>
                        </>
                      ) : (
                        <Button
                          size="sm"
                          onClick={() => setIsEditing(true)}
                        >
                          <Edit className="h-4 w-4 sm:mr-2" />
                          <span className="hidden sm:inline">Edit</span>
                        </Button>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {isEditing ? (
                    <div className="space-y-4">
                      {/* Basic Settings Row */}
                      <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
                        <div className="space-y-1">
                          <Label className="text-xs">Theme Name</Label>
                          <Input
                            value={selectedTheme.name}
                            onChange={(e) => setSelectedTheme({ ...selectedTheme, name: e.target.value })}
                            className="h-8 text-sm"
                          />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs">Base Hue</Label>
                          <div className="flex items-center gap-2">
                            <Slider
                              value={[selectedTheme.base_hue]}
                              max={360}
                              onValueChange={(v) => setSelectedTheme({ ...selectedTheme, base_hue: v[0] })}
                              className="flex-1"
                            />
                            <Input
                              type="number" min={0} max={360}
                              value={selectedTheme.base_hue}
                              onChange={(e) => setSelectedTheme({ ...selectedTheme, base_hue: Math.min(360, Math.max(0, parseInt(e.target.value) || 0)) })}
                              className="w-14 h-8 text-xs text-center"
                            />
                          </div>
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs">Changelog</Label>
                          <Input
                            value={selectedTheme.changelog_notes || ''}
                            onChange={(e) => setSelectedTheme({ ...selectedTheme, changelog_notes: e.target.value })}
                            placeholder="Describe changes..."
                            className="h-8 text-xs"
                          />
                        </div>
                      </div>

                      {/* Nav + Editor Panels */}
                      <div className="flex flex-col lg:flex-row gap-4">
                        <ThemeEditorNav active={editorSection} onChange={setEditorSection} />
                        <div className="flex-1 min-w-0">
                          <ThemeEditorPanels
                            active={editorSection}
                            accentConfig={accentConfig}
                            setAccentConfig={setAccentConfig}
                            staticColors={staticColors}
                            setStaticColors={setStaticColors}
                            gradientConfigs={gradientConfigs}
                            setGradientConfigs={setGradientConfigs}
                            ghlChatConfig={ghlChatConfig}
                            setGhlChatConfig={setGhlChatConfig}
                            darkModeOverrides={darkModeOverrides}
                            setDarkModeOverrides={setDarkModeOverrides}
                            ecommerceColors={ecommerceColors}
                            setEcommerceColors={setEcommerceColors}
                            ctaVariants={ctaVariants}
                            setCtaVariants={setCtaVariants}
                            typographyConfig={typographyConfig}
                            setTypographyConfig={setTypographyConfig}
                            motionConfig={motionConfig}
                            setMotionConfig={setMotionConfig}
                            styleModules={styleModules}
                            setStyleModules={setStyleModules}
                            defaultMode={defaultMode}
                            setDefaultMode={setDefaultMode}
                            adaWidgetConfig={adaWidgetConfig}
                            setAdaWidgetConfig={setAdaWidgetConfig}
                            selectedTheme={selectedTheme}
                            setSelectedTheme={setSelectedTheme}
                            themes={themes}
                            fetchData={fetchData}
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* View Mode — Theme Summary Dashboard */
                    <ThemeSummaryDashboard
                      themeName={selectedTheme.name}
                      isActive={!!selectedTheme.is_active}
                      defaultMode={defaultMode}
                      accentConfig={accentConfig}
                      staticColors={staticColors}
                      darkModeOverrides={darkModeOverrides}
                      gradientConfigs={gradientConfigs}
                      typographyConfig={typographyConfig}
                      motionConfig={motionConfig}
                      ecommerceColors={ecommerceColors}
                      ctaVariants={ctaVariants}
                      styleModules={styleModules}
                      adaWidgetConfig={adaWidgetConfig}
                      ghlChatConfig={ghlChatConfig}
                      logoVersion={getLogoForTheme(selectedTheme)}
                    />
                  )}
                </CardContent>
              </Card>
            ) : (
              <Card className="flex items-center justify-center h-64">
                <div className="text-center text-muted-foreground">
                  <Palette className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Select a theme to view details</p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </main>

      {/* Publish to Production Dialog */}
      <Dialog open={showPublishDialog} onOpenChange={(open) => {
        setShowPublishDialog(open);
        if (!open) {
          setCommitUrl(null);
          setPublishedVersion(null);
        }
      }}>
        <DialogContent className="max-w-4xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Rocket className="h-5 w-5 text-accent" />
              Publish Theme to Production
            </DialogTitle>
            <DialogDescription>
              Publish directly to GitHub or copy to clipboard. Publishing to GitHub commits the config to <code className="bg-muted px-1 rounded">src/config/themes.ts</code>.
            </DialogDescription>
          </DialogHeader>
          
          {commitUrl && (
            <div className="flex items-center gap-2 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span className="text-sm">
                Successfully published v{publishedVersion}!{' '}
                <a 
                  href={commitUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-accent hover:underline"
                >
                  View commit →
                </a>
              </span>
            </div>
          )}

          <ScrollArea className="h-[45vh] border rounded-lg">
            <pre className="p-4 text-xs font-mono bg-muted/50">
              {generatedConfig}
            </pre>
          </ScrollArea>
          <div className="flex justify-between gap-2">
            <Button variant="outline" onClick={() => setShowPublishDialog(false)}>
              Cancel
            </Button>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={copyToClipboard}
              >
                {copied ? (
                  <>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy to Clipboard
                  </>
                )}
              </Button>
              <Button 
                onClick={publishToGithub} 
                disabled={isPublishingToGithub}
                className="bg-accent hover:bg-accent-hover text-accent-foreground"
              >
                {isPublishingToGithub ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Publishing...
                  </>
                ) : (
                  <>
                    <Github className="h-4 w-4 mr-2" />
                    Publish to GitHub
                  </>
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      {/* 7.17: Revert to Default — Warning Layer 1 */}
      <AlertDialog open={showRevertWarning1} onOpenChange={setShowRevertWarning1}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              Revert to Default?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This will discard all current edits and restore "{selectedTheme?.name}" to its saved default snapshot. 
              You may want to export your current config first as a backup.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-col sm:flex-row gap-2">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button variant="outline" onClick={() => { exportCurrentThemeJson(); }}>
              <Download className="h-4 w-4 mr-2" />
              Export First
            </Button>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => {
                setShowRevertWarning1(false);
                setShowRevertWarning2(true);
              }}
            >
              Continue to Revert
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* 7.17: Revert to Default — Warning Layer 2 (Final Confirmation) */}
      <AlertDialog open={showRevertWarning2} onOpenChange={setShowRevertWarning2}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="h-5 w-5" />
              Final Confirmation
            </AlertDialogTitle>
            <AlertDialogDescription>
              <strong>This action cannot be undone.</strong> All unsaved changes to "{selectedTheme?.name}" will be permanently lost 
              and replaced with the default seed snapshot.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={handleRevertToDefault}
              disabled={isReverting}
            >
              {isReverting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Reverting...
                </>
              ) : (
                'Yes, Revert to Default'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* 7.17a: Save Current as Default — Warning Layer 1 */}
      <AlertDialog open={showSaveDefaultWarning1} onOpenChange={setShowSaveDefaultWarning1}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <Save className="h-5 w-5 text-accent" />
              Save Current as Default?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This will overwrite the existing default snapshot for "{selectedTheme?.name}" with the current configuration. 
              The previous default will be lost. You may want to export it first.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-col sm:flex-row gap-2">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button variant="outline" onClick={() => { exportCurrentThemeJson(); }}>
              <Download className="h-4 w-4 mr-2" />
              Export First
            </Button>
            <AlertDialogAction
              onClick={() => {
                setShowSaveDefaultWarning1(false);
                setShowSaveDefaultWarning2(true);
              }}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* 7.17a: Save Current as Default — Warning Layer 2 (Final Confirmation) */}
      <AlertDialog open={showSaveDefaultWarning2} onOpenChange={setShowSaveDefaultWarning2}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-accent" />
              Confirm Overwrite
            </AlertDialogTitle>
            <AlertDialogDescription>
              <strong>The current default snapshot will be permanently replaced.</strong> The current configuration of 
              "{selectedTheme?.name}" will become the new baseline for future reverts.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleSaveAsDefault}
              disabled={isSavingDefault}
            >
              {isSavingDefault ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                'Yes, Save as Default'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
