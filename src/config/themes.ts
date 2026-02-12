/**
 * @fileoverview Static Theme Configuration — Production source of truth.
 *
 * This file is the GENERATED output of the admin "Publish to Production" workflow.
 * It is imported statically by useTheme, Layout, and the SSG build — zero runtime
 * database calls.
 *
 * ## Generation Pipeline
 * Admin edits theme in Themes.tsx → saves to `site_themes` table → clicks
 * "Publish to Production" → `sync-theme-to-github` Edge Function generates this
 * file and commits it to the repo → Vercel rebuilds.
 *
 * ## DO NOT EDIT MANUALLY
 * All visual styling flows through the Admin CRUD → Database → Publish Pipeline.
 * Manual edits will be overwritten on next publish.
 *
 * ## Key Exports
 * - **ThemeConfig**: Full type definition for a theme (accent, colors, typography,
 *   motion, gradients, e-commerce, dark mode, logo, style modules).
 * - **activeTheme**: The currently published default theme.
 * - **publishedThemes**: Map of all published themes by ID.
 * - **routeThemeMappings**: Route-to-theme overrides.
 * - **getThemeForRoute()**: Resolver used by useTheme hook.
 * - **applyThemeToRoot()**: Applies a theme's tokens as CSS variables on `<html>`.
 *   Handles mode-aware selection (dark overrides vs. light base).
 *
 * ## Data Contract
 * - ThemeConfig mirrors the `site_themes` table columns, flattened from JSONB.
 * - CSS variable emission in `applyThemeToRoot()` must stay in sync with
 *   `generateProductionCss()` in Themes.tsx to avoid publish/runtime drift.
 *
 * ## SSG Compatibility
 * - Imported statically. No `document`, `window`, or async calls at module level.
 *   `applyThemeToRoot()` touches `document.documentElement` but is only called
 *   at runtime (inside ClientOnly boundaries).
 *
 * ## Portability
 * - Copy this file + useTheme hook + the `site_themes` table schema.
 *   The publish Edge Function (`sync-theme-to-github`) must be adapted to
 *   generate this file format for your project's repo.
 *
 * @generated
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
  logoVersionId?: string;
  logoConfig?: {
    taglineText: string;
    everConfig: LogoElementConfig;
    intentConfig: LogoElementConfig;
    streakConfig: StreakElementConfig;
    taglineConfig: TaglineElementConfig;
  };
}

export interface RouteThemeMapping {
  route: string;
  themeId: string;
}

// ============================================
// ACTIVE PRODUCTION THEME (Ocean Blue)
// ============================================
export const activeTheme: ThemeConfig = {
  id: 'ocean-blue',
  name: 'Ocean Blue',
  baseHue: 210,
  accentConfig: {
    accent: '210 91% 65%',
    accentHover: '32 95% 44%',
    accentGlow: '210 91% 65%',
    accentForeground: '222 47% 11%',
    h: 210,
    s: 91,
    l: 65,
  },
  staticColors: {
    background: '210 20% 98%',
    foreground: '210 47% 11%',
    card: '0 0% 100%',
    cardForeground: '210 47% 11%',
    popover: '0 0% 100%',
    popoverForeground: '210 47% 11%',
    primary: '210 47% 11%',
    primaryLight: '210 25% 27%',
    primaryForeground: '0 0% 100%',
    secondary: '210 20% 94%',
    secondaryForeground: '210 47% 11%',
    muted: '210 20% 96%',
    mutedForeground: '210 16% 47%',
    border: '210 20% 88%',
    input: '210 20% 88%',
    ring: '210 92% 50%',
  },
  gradientConfigs: {
    hero: 'linear-gradient(135deg, hsl(222 47% 11%) 0%, hsl(210 30% 20%) 50%, hsl(222 47% 11%) 100%)',
    cta: 'linear-gradient(135deg, hsl(210 91% 65%) 0%, hsl(220 91% 55%) 100%)',
    text: 'linear-gradient(135deg, hsl(210 91% 65%) 0%, hsl(220 91% 75%) 50%, hsl(210 91% 65%) 100%)',
  },
  logoVersionId: 'f427aa31-0016-408e-98d4-86a7573b1b15',
  logoConfig: {
    taglineText: 'Web Design & Practical AI',
    everConfig: {
        "size": 72,
        "text": "Ever",
        "weight": 700,
        "gradientTo": "#A855F7",
        "marginLeft": 0,
        "solidColor": "#FFFFFF",
        "marginRight": 3,
        "useGradient": false,
        "gradientFrom": "#FFFFFF",
        "gradientAngle": 135,
        "verticalOffset": -1
    },
    intentConfig: {
        "size": 72,
        "weight": 700,
        "gradientTo": "#FFFFFF",
        "marginLeft": 0,
        "solidColor": "#A855F7",
        "marginRight": 0,
        "useGradient": false,
        "gradientFrom": "#A855F7",
        "gradientAngle": 135,
        "verticalOffset": 1
    },
    streakConfig: {
        "length": 366,
        "leftThick": 4,
        "gradientTo": "#7878dd",
        "marginLeft": 0,
        "rightThick": 1,
        "solidColor": "#A855F7",
        "marginRight": 0,
        "useGradient": true,
        "gradientFrom": "#A855F7",
        "gradientAngle": 90
    },
    taglineConfig: {
        "size": 29,
        "weight": 400,
        "marginTop": 5,
        "gradientTo": "#A855F7",
        "marginLeft": 5,
        "solidColor": "#FFFFFF",
        "marginRight": 0,
        "useGradient": false,
        "gradientFrom": "#FFFFFF",
        "gradientAngle": 135
    },
  },
  ecommerceColors: {
      "gold": "39 95% 50%",
      "goldGlow": "39 95% 60%",
      "goldHover": "35 95% 44%",
      "goldForeground": "0 0% 100%",
      "pricingHighlight": "39 95% 50%"
  },
  ctaVariants: {
      "primary": "240 70% 60%",
      "secondary": "39 95% 50%",
      "primaryHover": "240 70% 50%",
      "secondaryHover": "35 95% 44%"
  },
  typographyConfig: {
      "fontBody": "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
      "fontDisplay": "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
      "fontHeading": "Space Grotesk, -apple-system, BlinkMacSystemFont, sans-serif"
  },
  motionConfig: {
      "transitionBounce": "all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
      "transitionSmooth": "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      "transitionSpring": "all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)"
  },
  styleModules: [],
  defaultMode: 'dark',
  darkModeOverrides: {
      "card": "222 47% 10%",
      "ring": "247 92% 50%",
      "input": "215 25% 20%",
      "muted": "222 47% 15%",
      "border": "215 25% 20%",
      "popover": "222 47% 10%",
      "primary": "215 25% 27%",
      "secondary": "222 47% 12%",
      "background": "222 47% 7%",
      "foreground": "60 9% 98%",
      "primaryLight": "215 20% 40%",
      "cardForeground": "60 9% 98%",
      "mutedForeground": "215 16% 65%",
      "popoverForeground": "60 9% 98%",
      "primaryForeground": "0 0% 100%",
      "secondaryForeground": "60 9% 98%"
  },
};

// ============================================
// ROUTE-TO-THEME MAPPINGS
// ============================================
export const routeThemeMappings: RouteThemeMapping[] = [
  { route: '/', themeId: '38aafcee-1959-4968-b74b-6c2d53815323' },
];

// ============================================
// ALL PUBLISHED THEMES
// ============================================
export const publishedThemes: Record<string, ThemeConfig> = {
  'ocean-blue': activeTheme,
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
    root.style.setProperty(`--${cssVar}`, value);
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
      root.style.setProperty(`--${cssVar}`, value);
    });
  }

  // CTA variant tokens
  if (theme.ctaVariants) {
    Object.entries(theme.ctaVariants).forEach(([key, value]) => {
      const cssVar = 'cta-' + key.replace(/([A-Z])/g, '-$1').toLowerCase();
      root.style.setProperty(`--${cssVar}`, value);
    });
  }

  // Typography tokens
  if (theme.typographyConfig) {
    Object.entries(theme.typographyConfig).forEach(([key, value]) => {
      const cssVar = key.replace(/([A-Z])/g, '-$1').toLowerCase();
      root.style.setProperty(`--${cssVar}`, value);
    });
  }

  // Motion tokens
  if (theme.motionConfig) {
    Object.entries(theme.motionConfig).forEach(([key, value]) => {
      const cssVar = key.replace(/([A-Z])/g, '-$1').toLowerCase();
      root.style.setProperty(`--${cssVar}`, value);
    });
  }

  // Style module tokens
  if (theme.styleModules) {
    theme.styleModules.forEach(mod => {
      mod.tokens.forEach(tok => {
        root.style.setProperty(`--module-${mod.name}-${tok.name}`, tok.value);
      });
    });
  }
}
