/**
 * Static Theme Configuration - Luxury Gold Edition
 * 
 * Premium agency aesthetic with deep blacks and gold accents.
 * 
 * @generated 2026-01-27
 */

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
// ACTIVE PRODUCTION THEME (Luxury Gold)
// ============================================
export const activeTheme: ThemeConfig = {
  id: 'luxury-gold',
  name: 'Luxury Gold',
  baseHue: 38,
  accentConfig: {
    accent: '38 92% 50%',           // Rich gold
    accentHover: '38 92% 45%',
    accentGlow: '38 92% 60%',
    accentForeground: '0 0% 4%',    // Dark text on gold
    h: 38,
    s: 92,
    l: 50,
  },
  staticColors: {
    background: '0 0% 4%',          // True black #0a0a0a
    foreground: '40 15% 92%',       // Warm off-white
    card: '0 0% 7%',                // Slightly lifted
    cardForeground: '40 15% 92%',
    popover: '0 0% 7%',
    popoverForeground: '40 15% 92%',
    primary: '0 0% 12%',
    primaryLight: '0 0% 18%',
    primaryForeground: '40 15% 92%',
    secondary: '0 0% 10%',
    secondaryForeground: '40 15% 92%',
    muted: '0 0% 14%',
    mutedForeground: '40 10% 55%',
    border: '0 0% 16%',
    input: '0 0% 16%',
    ring: '38 92% 50%',
  },
  gradientConfigs: {
    hero: 'linear-gradient(180deg, hsl(0 0% 4%) 0%, hsl(0 0% 6%) 100%)',
    cta: 'linear-gradient(135deg, hsl(38 92% 50%) 0%, hsl(35 90% 45%) 100%)',
    text: 'linear-gradient(135deg, hsl(38 92% 50%) 0%, hsl(43 90% 60%) 50%, hsl(38 92% 50%) 100%)',
  },
  logoConfig: {
    taglineText: 'AI-Powered Business Solutions',
    everConfig: {
      size: 72,
      weight: 600,
      gradientTo: '#f5a20a',
      marginLeft: 0,
      solidColor: '#FFFFFF',
      marginRight: 3,
      useGradient: false,
      gradientFrom: '#FFFFFF',
      gradientAngle: 135,
      verticalOffset: -1
    },
    intentConfig: {
      size: 72,
      weight: 600,
      gradientTo: '#FFFFFF',
      marginLeft: 0,
      solidColor: '#f5a20a',  // Gold accent
      marginRight: 0,
      useGradient: false,
      gradientFrom: '#f5a20a',
      gradientAngle: 135,
      verticalOffset: 1
    },
    streakConfig: {
      length: 366,
      leftThick: 4,
      gradientTo: '#f5c830',
      marginLeft: 0,
      rightThick: 1,
      solidColor: '#f5a20a',
      marginRight: 0,
      useGradient: true,
      gradientFrom: '#f5a20a',
      gradientAngle: 90
    },
    taglineConfig: {
      size: 29,
      weight: 400,
      marginTop: 5,
      gradientTo: '#f5a20a',
      marginLeft: 5,
      solidColor: '#FFFFFF',
      marginRight: 0,
      useGradient: false,
      gradientFrom: '#FFFFFF',
      gradientAngle: 135
    },
  },
};

// ============================================
// ROUTE-TO-THEME MAPPINGS
// ============================================
export const routeThemeMappings: RouteThemeMapping[] = [
  { route: '/', themeId: 'luxury-gold' },
];

// ============================================
// ALL PUBLISHED THEMES
// ============================================
export const publishedThemes: Record<string, ThemeConfig> = {
  'luxury-gold': activeTheme,
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
    root.style.setProperty(`--${cssVar}`, value);
  });
  root.style.setProperty('--accent', theme.accentConfig.accent);
  root.style.setProperty('--accent-hover', theme.accentConfig.accentHover);
  root.style.setProperty('--accent-glow', theme.accentConfig.accentGlow);
  root.style.setProperty('--accent-foreground', theme.accentConfig.accentForeground);
  root.style.setProperty('--gradient-hero', theme.gradientConfigs.hero);
  root.style.setProperty('--gradient-cta', theme.gradientConfigs.cta);
  root.style.setProperty('--gradient-text', theme.gradientConfigs.text);
}
