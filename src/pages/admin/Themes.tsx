import { useState, useEffect } from 'react';
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
import { LogoRenderer } from '@/components/logo';
import { LogoConfigEditor } from '@/components/admin/LogoConfigEditor';
import { ArrowLeft, Palette, Edit, Trash2, Check, Loader2, Eye, Rocket, Copy, CheckCircle, Github, Image } from 'lucide-react';
import type { Tables, Json } from '@/integrations/supabase/types';

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

export default function AdminThemes() {
  const { user, signOut } = useAdminAuth();
  const { toast } = useToast();
  
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
          } as unknown as Json,
          static_colors: staticColors as unknown as Json,
          gradient_configs: gradientConfigs as unknown as Json,
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
  Object.entries(theme.staticColors).forEach(([key, value]) => {
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
}
`;

    setGeneratedConfig(config);
    
    // Generate matching CSS for index.css
    const cssContent = generateProductionCss(activeTheme);
    setGeneratedCss(cssContent);
    
    setShowPublishDialog(true);
  };

  // Generate CSS content for index.css that matches the theme
  const generateProductionCss = (theme: Theme): string => {
    const accentCfg = theme.accent_config as Record<string, any>;
    const staticCols = theme.static_colors as Record<string, string>;
    const gradientCfg = theme.gradient_configs as Record<string, string>;
    
    // Parse accent HSL for gradient generation
    const accentParts = (accentCfg.accent || '240 70% 60%').split(' ');
    const h = parseFloat(accentParts[0]) || 240;
    const s = parseFloat(accentParts[1]) || 70;
    const l = parseFloat(accentParts[2]) || 60;
    
    return `@tailwind base;
@tailwind components;
@tailwind utilities;

/* SmartSites Design System v2.0
   Award-Winning Agency Aesthetic
   Inspired by SPINX, Shape, VRRB - proven converters
   All colors MUST be HSL.
   
   AUTO-GENERATED from theme: ${theme.name}
   Generated: ${new Date().toISOString().split('T')[0]}
   DO NOT edit manually - use admin theme editor and "Publish to Production".
*/

@layer base {
  :root {
    /* Dark Mode Base - ${theme.name} */
    --background: ${staticCols.background || '222 47% 7%'};
    --foreground: ${staticCols.foreground || '60 9% 98%'};

    --card: ${staticCols.card || '222 47% 10%'};
    --card-foreground: ${staticCols.cardForeground || '60 9% 98%'};

    --popover: ${staticCols.popover || '222 47% 10%'};
    --popover-foreground: ${staticCols.popoverForeground || '60 9% 98%'};

    /* Primary: Slate for dark theme */
    --primary: ${staticCols.primary || '215 25% 27%'};
    --primary-light: ${staticCols.primaryLight || '215 20% 40%'};
    --primary-foreground: ${staticCols.primaryForeground || '0 0% 100%'};

    /* Secondary: Dark variant */
    --secondary: ${staticCols.secondary || '222 47% 12%'};
    --secondary-foreground: ${staticCols.secondaryForeground || '60 9% 98%'};

    /* Muted: Dark backgrounds */
    --muted: ${staticCols.muted || '222 47% 15%'};
    --muted-foreground: ${staticCols.mutedForeground || '215 16% 65%'};

    /* Accent: ${theme.name} - HIGH IMPACT (the brand color) */
    --accent: ${accentCfg.accent || '240 70% 60%'};
    --accent-hover: ${accentCfg.accentHover || `${h} ${s}% ${Math.max(l - 10, 20)}%`};
    --accent-glow: ${accentCfg.accentGlow || `${h} ${s}% ${Math.min(l + 10, 80)}%`};
    --accent-foreground: ${accentCfg.accentForeground || '0 0% 100%'};

    /* Intent Blue - Brand color for "Intent" in logo */
    --intent-blue: 200 100% 50%;

    /* Success/Highlight: Electric Lime */
    --highlight: 82 84% 67%;
    --highlight-foreground: 222 47% 11%;

    --destructive: 0 62% 30%;
    --destructive-foreground: 60 9% 98%;

    --border: ${staticCols.border || '215 25% 20%'};
    --input: ${staticCols.input || '215 25% 20%'};
    --ring: ${staticCols.ring || accentCfg.accent || '240 70% 60%'};

    --radius: 0.75rem;

    /* Gradients - ${theme.name} */
    --gradient-hero: ${gradientCfg.hero || `linear-gradient(135deg, hsl(222 47% 11%) 0%, hsl(${h} 30% 18%) 50%, hsl(222 47% 11%) 100%)`};
    --gradient-text: ${gradientCfg.text || `linear-gradient(135deg, hsl(${h} ${s}% ${l}%) 0%, hsl(${h + 10} ${s}% ${Math.min(l + 10, 80)}%) 50%, hsl(${h} ${s}% ${l}%) 100%)`};
    --gradient-cta: ${gradientCfg.cta || `linear-gradient(135deg, hsl(${h} ${s}% ${l}%) 0%, hsl(${h + 10} ${s}% ${Math.max(l - 10, 30)}%) 100%)`};
    --gradient-glow: radial-gradient(ellipse at center, hsl(${h} ${s}% ${l}% / 0.2) 0%, transparent 70%);
    --gradient-mesh: radial-gradient(at 40% 20%, hsl(${h} ${s}% ${l}% / 0.12) 0px, transparent 50%), radial-gradient(at 80% 0%, hsl(215 25% 27% / 0.15) 0px, transparent 50%), radial-gradient(at 0% 50%, hsl(${h} ${s}% ${l}% / 0.08) 0px, transparent 50%);

    /* Shadows - ${theme.name} */
    --shadow-sm: 0 1px 2px 0 hsl(0 0% 0% / 0.3);
    --shadow-md: 0 4px 6px -1px hsl(0 0% 0% / 0.4), 0 2px 4px -2px hsl(0 0% 0% / 0.3);
    --shadow-lg: 0 10px 15px -3px hsl(0 0% 0% / 0.4), 0 4px 6px -4px hsl(0 0% 0% / 0.3);
    --shadow-xl: 0 20px 25px -5px hsl(0 0% 0% / 0.4), 0 8px 10px -6px hsl(0 0% 0% / 0.3);
    --shadow-glow: 0 0 40px hsl(${h} ${s}% ${l}% / 0.25);
    --shadow-glow-lg: 0 0 60px hsl(${h} ${s}% ${l}% / 0.35);
    --shadow-button: 0 4px 14px 0 hsl(${h} ${s}% ${l}% / 0.3);

    /* Sidebar - Dark */
    --sidebar-background: 222 47% 9%;
    --sidebar-foreground: 60 9% 98%;
    --sidebar-primary: ${accentCfg.accent || '240 70% 60%'};
    --sidebar-primary-foreground: ${accentCfg.accentForeground || '0 0% 100%'};
    --sidebar-accent: 222 47% 15%;
    --sidebar-accent-foreground: 60 9% 98%;
    --sidebar-border: 215 25% 20%;
    --sidebar-ring: ${accentCfg.accent || '240 70% 60%'};
  }

  .dark {
    /* Inherits from :root - already dark theme */
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
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Space Grotesk', -apple-system, BlinkMacSystemFont, sans-serif;
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
    background: linear-gradient(135deg, hsl(60 9% 98%) 0%, hsl(var(--accent)) 100%);
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
    text-shadow: 0 0 40px hsl(${h} ${s}% ${l}% / 0.5);
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
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .transition-bounce {
    transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }

  .transition-spring {
    transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
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
  background: hsl(${h} ${s}% ${l}% / 0.3);
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
            <Link to="/admin/theme-test">
              <Button variant="outline" size="sm" className="text-xs sm:text-sm">
                <Eye className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">Test Page</span>
              </Button>
            </Link>
            <span className="hidden md:inline text-sm text-muted-foreground">{user?.email}</span>
          </div>
        </div>
      </header>

      <main className="container py-8">
        <div className="grid gap-8 lg:grid-cols-[300px_1fr]">
          {/* Theme List */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Themes ({themes.length})</h2>
            <ScrollArea className="h-[calc(100vh-12rem)]">
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
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Palette className="h-5 w-5" />
                        {isEditing ? 'Edit Theme' : selectedTheme.name}
                      </CardTitle>
                      <CardDescription>
                        {isEditing ? 'Adjust colors and settings' : 'Click Edit to modify'}
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      {!selectedTheme.is_active && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleSetActive(selectedTheme)}
                        >
                          <Check className="mr-2 h-4 w-4" />
                          Set Active
                        </Button>
                      )}
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Eye className="mr-2 h-4 w-4" />
                            Preview
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
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </Button>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {isEditing ? (
                    <div className="grid gap-6 lg:grid-cols-2">
                      {/* Left Column - Basic Settings */}
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label>Theme Name</Label>
                          <Input
                            value={selectedTheme.name}
                            onChange={(e) => setSelectedTheme({ ...selectedTheme, name: e.target.value })}
                          />
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <Label>Base Hue</Label>
                            <span className="text-sm text-muted-foreground">{selectedTheme.base_hue}°</span>
                          </div>
                          <Slider
                            value={[selectedTheme.base_hue]}
                            max={360}
                            onValueChange={(v) => setSelectedTheme({ 
                              ...selectedTheme, 
                              base_hue: v[0]
                            })}
                          />
                          <div 
                            className="h-6 rounded-lg border"
                            style={{ 
                              background: `linear-gradient(90deg, 
                                hsl(0, 70%, 50%), 
                                hsl(60, 70%, 50%), 
                                hsl(120, 70%, 50%), 
                                hsl(180, 70%, 50%), 
                                hsl(240, 70%, 50%), 
                                hsl(300, 70%, 50%), 
                                hsl(360, 70%, 50%)
                              )`
                            }}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Changelog Notes</Label>
                          <Textarea
                            value={selectedTheme.changelog_notes || ''}
                            onChange={(e) => setSelectedTheme({ 
                              ...selectedTheme, 
                              changelog_notes: e.target.value 
                            })}
                            placeholder="Describe changes made..."
                            rows={3}
                          />
                        </div>

                        {/* Live Preview */}
                        <div className="space-y-2">
                          <Label>Live Preview</Label>
                          <div 
                            className="rounded-lg p-6 flex items-center justify-center border"
                            style={{ backgroundColor: `hsl(${staticColors.primary})` }}
                          >
                            {getLogoForTheme(selectedTheme) && (
                              <LogoRenderer 
                                config={getLogoForTheme(selectedTheme)!}
                                accentHsl={`${accentConfig.h} ${accentConfig.s}% ${accentConfig.l}%`}
                              />
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Right Column - Color Controls */}
                      <div className="space-y-4">
                        {/* Color Controls */}
                        <div className="space-y-2">
                          <Label className="text-base font-semibold">Color Controls</Label>
                          <ScrollArea className="h-[400px] pr-4">
                          <Accordion type="multiple" defaultValue={['accent-color']} className="w-full">
                            {/* Accent Color - Main CTA color */}
                            <ColorSliderControls
                              label="Accent Color"
                              hsl={{ h: accentConfig.h, s: accentConfig.s, l: accentConfig.l }}
                              onHslChange={(hsl) => setAccentConfig({ ...accentConfig, ...hsl })}
                              showGradient
                              gradient={accentConfig}
                              onGradientChange={(g) => setAccentConfig({ ...accentConfig, ...g })}
                            />

                            {/* Core Colors Section */}
                            <HslEditor
                              label="Primary"
                              value={staticColors.primary}
                              onChange={(v) => setStaticColors({ ...staticColors, primary: v })}
                              description="Main dark color for headers, nav backgrounds"
                            />
                            <HslEditor
                              label="Primary Light"
                              value={staticColors.primaryLight}
                              onChange={(v) => setStaticColors({ ...staticColors, primaryLight: v })}
                              description="Lighter variant of primary"
                            />
                            <HslEditor
                              label="Primary Foreground"
                              value={staticColors.primaryForeground}
                              onChange={(v) => setStaticColors({ ...staticColors, primaryForeground: v })}
                              description="Text color on primary backgrounds"
                            />

                            {/* Background & Foreground */}
                            <HslEditor
                              label="Background"
                              value={staticColors.background}
                              onChange={(v) => setStaticColors({ ...staticColors, background: v })}
                              description="Main page background"
                            />
                            <HslEditor
                              label="Foreground"
                              value={staticColors.foreground}
                              onChange={(v) => setStaticColors({ ...staticColors, foreground: v })}
                              description="Main text color"
                            />

                            {/* Secondary */}
                            <HslEditor
                              label="Secondary"
                              value={staticColors.secondary}
                              onChange={(v) => setStaticColors({ ...staticColors, secondary: v })}
                              description="Secondary surface color"
                            />
                            <HslEditor
                              label="Secondary Foreground"
                              value={staticColors.secondaryForeground}
                              onChange={(v) => setStaticColors({ ...staticColors, secondaryForeground: v })}
                              description="Text on secondary surfaces"
                            />

                            {/* Card */}
                            <HslEditor
                              label="Card"
                              value={staticColors.card}
                              onChange={(v) => setStaticColors({ ...staticColors, card: v })}
                              description="Card background color"
                            />
                            <HslEditor
                              label="Card Foreground"
                              value={staticColors.cardForeground}
                              onChange={(v) => setStaticColors({ ...staticColors, cardForeground: v })}
                              description="Text on cards"
                            />

                            {/* Muted */}
                            <HslEditor
                              label="Muted"
                              value={staticColors.muted}
                              onChange={(v) => setStaticColors({ ...staticColors, muted: v })}
                              description="Muted background areas"
                            />
                            <HslEditor
                              label="Muted Foreground"
                              value={staticColors.mutedForeground}
                              onChange={(v) => setStaticColors({ ...staticColors, mutedForeground: v })}
                              description="Subdued text color"
                            />

                            {/* Border & Input */}
                            <HslEditor
                              label="Border"
                              value={staticColors.border}
                              onChange={(v) => setStaticColors({ ...staticColors, border: v })}
                              description="Border color for elements"
                            />
                            <HslEditor
                              label="Input"
                              value={staticColors.input}
                              onChange={(v) => setStaticColors({ ...staticColors, input: v })}
                              description="Input field border color"
                            />
                            <HslEditor
                              label="Ring"
                              value={staticColors.ring}
                              onChange={(v) => setStaticColors({ ...staticColors, ring: v })}
                              description="Focus ring color"
                            />

                            {/* Popover */}
                            <HslEditor
                              label="Popover"
                              value={staticColors.popover}
                              onChange={(v) => setStaticColors({ ...staticColors, popover: v })}
                              description="Popover/dropdown background"
                            />
                            <HslEditor
                              label="Popover Foreground"
                              value={staticColors.popoverForeground}
                              onChange={(v) => setStaticColors({ ...staticColors, popoverForeground: v })}
                              description="Popover text color"
                            />

                            {/* Gradients Section */}
                            <AccordionItem value="gradients">
                              <AccordionTrigger className="text-sm py-2">
                                <div className="flex items-center gap-2">
                                  <div className="h-4 w-4 rounded border bg-gradient-to-r from-primary to-accent shrink-0" />
                                  Gradients
                                </div>
                              </AccordionTrigger>
                              <AccordionContent className="space-y-4 pb-4">
                                <div className="space-y-2">
                                  <Label className="text-xs font-medium">Hero Gradient</Label>
                                  <p className="text-xs text-muted-foreground">Dark header/hero backgrounds</p>
                                  <Textarea
                                    value={gradientConfigs.hero || ''}
                                    onChange={(e) => setGradientConfigs({ 
                                      ...gradientConfigs, 
                                      hero: e.target.value
                                    })} 
                                    placeholder="linear-gradient(135deg, hsl(222 47% 11%) 0%, hsl(215 25% 27%) 100%)"
                                    className="font-mono text-xs"
                                    rows={2}
                                  />
                                  {gradientConfigs.hero && (
                                    <div 
                                      className="h-8 rounded-lg border"
                                      style={{ background: gradientConfigs.hero }}
                                    />
                                  )}
                                </div>

                                <div className="space-y-2">
                                  <Label className="text-xs font-medium">CTA Gradient</Label>
                                  <p className="text-xs text-muted-foreground">Buttons and call-to-action elements</p>
                                  <Textarea
                                    value={gradientConfigs.cta || ''}
                                    onChange={(e) => setGradientConfigs({ 
                                      ...gradientConfigs, 
                                      cta: e.target.value
                                    })} 
                                    placeholder="linear-gradient(135deg, hsl(38 92% 50%) 0%, hsl(32 95% 44%) 100%)"
                                    className="font-mono text-xs"
                                    rows={2}
                                  />
                                  {gradientConfigs.cta && (
                                    <div 
                                      className="h-8 rounded-lg border"
                                      style={{ background: gradientConfigs.cta }}
                                    />
                                  )}
                                </div>

                                <div className="space-y-2">
                                  <Label className="text-xs font-medium">Text Gradient</Label>
                                  <p className="text-xs text-muted-foreground">Gradient text highlights</p>
                                  <Textarea
                                    value={gradientConfigs.text || ''}
                                    onChange={(e) => setGradientConfigs({ 
                                      ...gradientConfigs, 
                                      text: e.target.value
                                    })} 
                                    placeholder="linear-gradient(135deg, hsl(38 92% 50%) 0%, hsl(45 93% 58%) 100%)"
                                    className="font-mono text-xs"
                                    rows={2}
                                  />
                                  {gradientConfigs.text && (
                                    <div 
                                      className="h-8 rounded-lg border"
                                      style={{ background: gradientConfigs.text }}
                                    />
                                  )}
                                </div>
                              </AccordionContent>
                            </AccordionItem>
                          </Accordion>
                        </ScrollArea>
                        </div>
                        
                        {/* Logo Configuration */}
                        <LogoConfigEditor
                          selectedLogoId={selectedTheme.logo_version_id}
                          onLogoChange={(logoId) => {
                            setSelectedTheme({ ...selectedTheme, logo_version_id: logoId });
                          }}
                          accentHsl={`${accentConfig.h} ${accentConfig.s}% ${accentConfig.l}%`}
                          previewBgColor={`hsl(${staticColors.background})`}
                        />
                      </div>
                    </div>
                  ) : (
                    /* View Mode */
                    <div className="grid gap-6 lg:grid-cols-2">
                      <div className="space-y-4">
                        <div>
                          <Label className="text-muted-foreground text-xs">Base Hue</Label>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="font-medium">{selectedTheme.base_hue}°</span>
                            <div 
                              className="h-6 w-12 rounded border"
                              style={{ backgroundColor: `hsl(${selectedTheme.base_hue}, 70%, 50%)` }}
                            />
                          </div>
                        </div>

                        <div>
                          <Label className="text-muted-foreground text-xs">Accent Color</Label>
                          <div className="flex items-center gap-2 mt-1">
                            <div 
                              className="h-8 w-8 rounded-lg border"
                              style={{ backgroundColor: `hsl(${accentConfig.h}, ${accentConfig.s}%, ${accentConfig.l}%)` }}
                            />
                            <span className="font-mono text-sm">{accentConfig.h}° {accentConfig.s}% {accentConfig.l}%</span>
                          </div>
                        </div>

                        <div>
                          <Label className="text-muted-foreground text-xs">Changelog Notes</Label>
                          <p className="text-sm mt-1">{selectedTheme.changelog_notes || 'No notes'}</p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-muted-foreground text-xs">Logo Preview</Label>
                        <div 
                          className="rounded-lg p-6 flex items-center justify-center border"
                          style={{ backgroundColor: `hsl(${staticColors.primary})` }}
                        >
                          {getLogoForTheme(selectedTheme) && (
                            <LogoRenderer 
                              config={getLogoForTheme(selectedTheme)!}
                              accentHsl={`${accentConfig.h} ${accentConfig.s}% ${accentConfig.l}%`}
                            />
                          )}
                        </div>
                      </div>
                    </div>
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
    </div>
  );
}
