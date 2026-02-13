/**
 * @fileoverview Theme module type definitions — single source of truth for all
 * theme configuration interfaces used across the admin editor, publish pipeline,
 * runtime hook, and DI service layer.
 *
 * ## Data Contract
 * Each interface maps 1:1 to a JSONB column in the `site_themes` table:
 * - AccentConfig → accent_config
 * - StaticColors → static_colors
 * - DarkModeOverrides → dark_mode_overrides
 * - GradientConfig → gradient_configs
 * - GHLChatConfig → ghl_chat_config
 * - EcommerceColors → ecommerce_colors
 * - CtaVariants → cta_variants
 * - TypographyConfig → typography_config
 * - MotionConfig → motion_config
 * - StyleModule → style_modules (array)
 * - AdaWidgetConfig → ada_widget_config
 *
 * All HSL values are stored as triplet strings without the `hsl()` wrapper
 * (e.g., "222 47% 7%"). This matches both the CSS variable format and the
 * Supabase JSONB storage convention.
 *
 * ## Portability
 * Zero dependencies. Copy this file into any project to establish the theme
 * type contract. All other theme module files import from here.
 */

import type { Tables } from '@/integrations/supabase/types';

// ─── DATABASE ROW TYPES ──────────────────────────────────────

/** Full theme row from the `site_themes` table */
export type Theme = Tables<'site_themes'>;

/** Logo version row from the `logo_versions` table */
export type LogoVersion = Tables<'logo_versions'>;

// ─── NAVIGATION ──────────────────────────────────────────────

/** Admin navigation views — 2-level: Hub → Editor (Shopify pattern) */
export type ThemeAdminView = 'list' | 'editor';

// ─── JSONB CONFIG INTERFACES ─────────────────────────────────

/** Accent color configuration — maps to `site_themes.accent_config` JSONB */
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

/** Light-mode semantic colors — maps to `site_themes.static_colors` JSONB */
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

/** Dark-mode color overrides — maps to `site_themes.dark_mode_overrides` JSONB */
export interface DarkModeOverrides {
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
}

/** Gradient configurations — maps to `site_themes.gradient_configs` JSONB */
export interface GradientConfig {
  hero?: string;
  cta?: string;
  text?: string;
}

/** GHL chat widget colors — maps to `site_themes.ghl_chat_config` JSONB */
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

/** E-commerce gold accent colors — maps to `site_themes.ecommerce_colors` JSONB */
export interface EcommerceColors {
  gold: string;
  goldHover: string;
  goldGlow: string;
  goldForeground: string;
  pricingHighlight: string;
}

/** CTA button color variants — maps to `site_themes.cta_variants` JSONB */
export interface CtaVariants {
  primary: string;
  primaryHover: string;
  secondary: string;
  secondaryHover: string;
}

/** Font family configuration — maps to `site_themes.typography_config` JSONB */
export interface TypographyConfig {
  fontHeading: string;
  fontBody: string;
  fontDisplay: string;
}

/** Motion/transition configuration — maps to `site_themes.motion_config` JSONB */
export interface MotionConfig {
  transitionSmooth: string;
  transitionBounce: string;
  transitionSpring: string;
}

/** Single token within a style module */
export interface StyleModuleToken {
  name: string;
  value: string;
  description?: string;
}

/** Component-level CSS token group — maps to `site_themes.style_modules` JSONB array */
export interface StyleModule {
  id: string;
  name: string;
  description?: string;
  tokens: StyleModuleToken[];
}

/** ADA accessibility widget configuration — maps to `site_themes.ada_widget_config` JSONB */
export interface AdaWidgetConfig {
  enabled: boolean;
  position: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  hideOnMobile: boolean;
  hideOnDesktop: boolean;
  pauseUntil: string | null;
  hiddenIndefinitely: boolean;
  iconType: 'universal' | 'wheelchair' | 'eye' | 'human';
  iconColor: string;
  iconBgColor: string;
  iconSize: number;
  iconShape: 'circle' | 'rounded-square' | 'pill';
  readingHandleSize: number;
}

// ─── COMPOSITE PARSED THEME ──────────────────────────────────

/** Fully parsed theme configuration — all JSONB columns resolved to typed objects */
export interface ParsedThemeConfig {
  accentConfig: AccentConfig;
  staticColors: StaticColors;
  gradientConfigs: GradientConfig;
  ghlChatConfig: GHLChatConfig;
  ecommerceColors: EcommerceColors;
  ctaVariants: CtaVariants;
  typographyConfig: TypographyConfig;
  motionConfig: MotionConfig;
  styleModules: StyleModule[];
  defaultMode: string;
  darkModeOverrides: DarkModeOverrides;
  adaWidgetConfig: AdaWidgetConfig;
}
