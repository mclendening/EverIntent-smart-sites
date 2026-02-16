/**
 * Static Theme Configuration
 * Generated: 2026-02-16
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
  typographyConfig?: { fontHeading: string; fontBody: string; fontDisplay: string; fontMono: string; };
  motionConfig?: { transitionSmooth: string; transitionBounce: string; transitionSpring: string; };
  styleModules?: Array<{ id?: string; name: string; tokens: Array<{ name: string; value: string | null; description?: string }>; description?: string; }>;
  defaultMode?: string;
  darkModeOverrides?: { background: string; foreground: string; card: string; cardForeground: string; popover: string; popoverForeground: string; primary: string; primaryLight: string; primaryForeground: string; secondary: string; secondaryForeground: string; muted: string; mutedForeground: string; border: string; input: string; ring: string; };
  logoVersionId?: string;
  logoConfig?: {
    taglineText: string;
    everConfig: LogoElementConfig;
    intentConfig: LogoElementConfig;
    streakConfig: StreakElementConfig;
    taglineConfig: TaglineElementConfig;
  };
}

export interface RouteThemeMapping { route: string; themeId: string; }

export const activeTheme: ThemeConfig = {
  id: 'ocean-blue',
  name: 'Ocean Blue',
  baseHue: 210,
  accentConfig: {
    accent: '210 91% 65%',
    accentHover: '32 95% 44%',
    accentGlow: '210 91% 65%',
    accentForeground: '222 47% 11%',
    h: 210, s: 91, l: 65,
  },
  staticColors: {
    background: '222 47% 7%', foreground: '60 9% 98%',
    card: '222 47% 10%', cardForeground: '60 9% 98%',
    popover: '222 47% 10%', popoverForeground: '60 9% 98%',
    primary: '215 25% 27%', primaryLight: '215 20% 40%',
    primaryForeground: '0 0% 100%',
    secondary: '222 47% 12%', secondaryForeground: '60 9% 98%',
    muted: '222 47% 15%', mutedForeground: '215 16% 65%',
    border: '215 25% 20%', input: '215 25% 20%',
    ring: '38 92% 50%',
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
      "fontMono": "JetBrains Mono, Fira Code, monospace",
      "fontDisplay": "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
      "fontHeading": "Space Grotesk, -apple-system, BlinkMacSystemFont, sans-serif"
  },
  motionConfig: {
      "transitionBounce": "all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
      "transitionSmooth": "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      "transitionSpring": "all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)"
  },
  styleModules: [
      {
          "id": "mod-checkout-progress",
          "name": "checkout-progress",
          "tokens": [
              {
                  "name": "step-active-bg",
                  "value": "210 91% 65%",
                  "description": "Active step circle background"
              },
              {
                  "name": "step-active-fg",
                  "value": "0 0% 100%",
                  "description": "Active step circle foreground"
              },
              {
                  "name": "step-active-border",
                  "value": "210 91% 65%",
                  "description": "Active step circle border"
              },
              {
                  "name": "step-complete-bg",
                  "value": "210 91% 65%",
                  "description": "Completed step circle fill"
              },
              {
                  "name": "step-complete-fg",
                  "value": "0 0% 100%",
                  "description": "Completed step checkmark"
              },
              {
                  "name": "step-inactive-border",
                  "value": "215 16% 47%",
                  "description": "Inactive step border (muted)"
              },
              {
                  "name": "step-inactive-fg",
                  "value": "215 16% 47%",
                  "description": "Inactive step number (muted)"
              },
              {
                  "name": "connector-active",
                  "value": "210 91% 65%",
                  "description": "Completed connector line"
              },
              {
                  "name": "connector-inactive",
                  "value": "215 16% 30%",
                  "description": "Pending connector line"
              },
              {
                  "name": "label-active",
                  "value": "210 91% 65%",
                  "description": "Current step label"
              },
              {
                  "name": "label-inactive",
                  "value": "215 16% 47%",
                  "description": "Non-current step label"
              },
              {
                  "name": "step-current-bg",
                  "value": null,
                  "description": "Current step glow ring"
              }
          ],
          "description": "Checkout step indicator tokens (progress circles, connectors, states)"
      },
      {
          "id": "mod-comparison-grid",
          "name": "comparison-grid",
          "tokens": [
              {
                  "name": "header-bg",
                  "value": "222 47% 8%",
                  "description": "Column header background"
              },
              {
                  "name": "header-fg",
                  "value": "0 0% 100%",
                  "description": "Column header text"
              },
              {
                  "name": "row-stripe",
                  "value": "222 47% 6%",
                  "description": "Alternating row background"
              },
              {
                  "name": "row-border",
                  "value": "215 25% 15%",
                  "description": "Row divider border"
              },
              {
                  "name": "check-color",
                  "value": "142 71% 45%",
                  "description": "Feature checkmark (green)"
              },
              {
                  "name": "x-color",
                  "value": "0 0% 40%",
                  "description": "Feature excluded X (dim)"
              },
              {
                  "name": "tier-accent",
                  "value": "210 91% 65%",
                  "description": "Tier column highlight"
              },
              {
                  "name": "price-color",
                  "value": "39 95% 50%",
                  "description": "Price text (gold)"
              },
              {
                  "name": "tooltip-bg",
                  "value": "222 47% 14%",
                  "description": "Tooltip background"
              },
              {
                  "name": "tooltip-fg",
                  "value": "60 9% 98%",
                  "description": "Tooltip text"
              },
              {
                  "name": "cta-bg",
                  "value": "210 91% 65%",
                  "description": "CTA button background"
              },
              {
                  "name": "cta-fg",
                  "value": "0 0% 100%",
                  "description": "CTA button text"
              }
          ],
          "description": "Plan comparison table tokens (headers, rows, checkmarks, tier accents)"
      },
      {
          "id": "mod-sms-demo",
          "name": "sms-demo",
          "tokens": [
              {
                  "name": "incoming-bg",
                  "value": "222 47% 14%",
                  "description": "Incoming message bubble"
              },
              {
                  "name": "incoming-fg",
                  "value": "60 9% 98%",
                  "description": "Incoming message text"
              },
              {
                  "name": "outgoing-bg",
                  "value": "210 91% 65%",
                  "description": "Outgoing message bubble"
              },
              {
                  "name": "outgoing-fg",
                  "value": "0 0% 100%",
                  "description": "Outgoing message text"
              },
              {
                  "name": "system-bg",
                  "value": "0 84% 60%",
                  "description": "System alert bubble (red)"
              },
              {
                  "name": "system-fg",
                  "value": "0 0% 100%",
                  "description": "System alert text"
              },
              {
                  "name": "timestamp",
                  "value": "215 16% 47%",
                  "description": "Timestamp color"
              },
              {
                  "name": "typing-dot",
                  "value": "215 16% 47%",
                  "description": "Typing indicator dot"
              },
              {
                  "name": "chat-bg",
                  "value": "222 47% 5%",
                  "description": "Chat window background"
              },
              {
                  "name": "header-bg",
                  "value": "222 47% 8%",
                  "description": "Chat header background"
              },
              {
                  "name": "header-fg",
                  "value": "0 0% 100%",
                  "description": "Chat header text"
              },
              {
                  "name": "checkmark-sent",
                  "value": "215 16% 47%",
                  "description": "Sent checkmark (gray)"
              },
              {
                  "name": "checkmark-read",
                  "value": "210 91% 65%",
                  "description": "Read checkmark (blue)"
              }
          ],
          "description": "SMS conversation demo tokens (bubbles, system alerts, typing indicator)"
      }
  ],
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

export const routeThemeMappings: RouteThemeMapping[] = [
  { route: '/', themeId: '38aafcee-1959-4968-b74b-6c2d53815323' },
];

export const publishedThemes: Record<string, ThemeConfig> = { 'ocean-blue': activeTheme };

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
  if (theme.ecommerceColors) Object.entries(theme.ecommerceColors).forEach(([key, value]) => { root.style.setProperty(`--${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`, value); });
  if (theme.ctaVariants) Object.entries(theme.ctaVariants).forEach(([key, value]) => { root.style.setProperty(`--cta-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`, value); });
  if (theme.typographyConfig) Object.entries(theme.typographyConfig).forEach(([key, value]) => { root.style.setProperty(`--${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`, value); });
  if (theme.motionConfig) Object.entries(theme.motionConfig).forEach(([key, value]) => { root.style.setProperty(`--${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`, value); });
  if (theme.styleModules) theme.styleModules.forEach(mod => { mod.tokens.forEach(tok => { root.style.setProperty(`--module-${mod.name}-${tok.name}`, tok.value); }); });
}
