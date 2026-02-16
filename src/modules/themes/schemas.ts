/**
 * @fileoverview Zod validation schemas for all theme JSONB configurations.
 *
 * Provides runtime validation for the 14 JSONB columns in the `site_themes`
 * table. Each schema mirrors the corresponding interface in `types.ts` and
 * provides sensible defaults via `.default()` so partially-populated themes
 * never crash the admin UI.
 *
 * ## Usage
 * ```ts
 * import { accentConfigSchema } from './schemas';
 * const parsed = accentConfigSchema.parse(rawJsonb);
 * ```
 *
 * ## Data Contract
 * - Input: Raw `unknown` values from Supabase JSONB columns.
 * - Output: Fully typed, validated objects matching the interfaces in `types.ts`.
 * - Invalid/missing fields fall back to defaults (no throws for partial data).
 *
 * ## Portability
 * - Depends only on `zod`. Copy this file + `types.ts` to any project.
 */

import { z } from 'zod';

/** HSL triplet string pattern (e.g., "222 47% 7%") — permissive for admin flexibility */
const hslString = z.string().default('0 0% 0%');

// ─── ACCENT CONFIG ───────────────────────────────────────────

export const accentConfigSchema = z.object({
  accent: hslString.default('38 92% 50%'),
  h: z.number().default(38),
  s: z.number().default(92),
  l: z.number().default(50),
  useGradient: z.boolean().optional().default(false),
  gradientFrom: z.string().optional().default('#F97316'),
  gradientTo: z.string().optional().default('#EF4444'),
  gradientAngle: z.number().optional().default(90),
  hoverBrightness: z.number().optional().default(1.1),
  iconGlowOpacity: z.number().optional().default(0.3),
}).default({
  accent: '38 92% 50%', h: 38, s: 92, l: 50,
});

// ─── STATIC COLORS ───────────────────────────────────────────

export const staticColorsSchema = z.object({
  primary: hslString.default('222 47% 11%'),
  primaryLight: hslString.default('215 25% 27%'),
  primaryForeground: hslString.default('0 0% 100%'),
  secondary: hslString.default('60 9% 98%'),
  secondaryForeground: hslString.default('222 47% 11%'),
  background: hslString.default('0 0% 100%'),
  foreground: hslString.default('222 47% 11%'),
  card: hslString.default('0 0% 100%'),
  cardForeground: hslString.default('222 47% 11%'),
  muted: hslString.default('60 5% 96%'),
  mutedForeground: hslString.default('215 16% 47%'),
  border: hslString.default('220 13% 91%'),
  input: hslString.default('220 13% 91%'),
  ring: hslString.default('38 92% 50%'),
  popover: hslString.default('0 0% 100%'),
  popoverForeground: hslString.default('222 47% 11%'),
}).default({});

// ─── DARK MODE OVERRIDES ─────────────────────────────────────

export const darkModeOverridesSchema = z.object({
  background: hslString.default('222 47% 7%'),
  foreground: hslString.default('60 9% 98%'),
  card: hslString.default('222 47% 10%'),
  cardForeground: hslString.default('60 9% 98%'),
  popover: hslString.default('222 47% 10%'),
  popoverForeground: hslString.default('60 9% 98%'),
  primary: hslString.default('215 25% 27%'),
  primaryLight: hslString.default('215 20% 40%'),
  primaryForeground: hslString.default('0 0% 100%'),
  secondary: hslString.default('222 47% 12%'),
  secondaryForeground: hslString.default('60 9% 98%'),
  muted: hslString.default('222 47% 15%'),
  mutedForeground: hslString.default('215 16% 65%'),
  border: hslString.default('215 25% 20%'),
  input: hslString.default('215 25% 20%'),
  ring: hslString.default('247 92% 50%'),
}).default({});

// ─── GRADIENT CONFIGS ────────────────────────────────────────

export const gradientConfigSchema = z.object({
  hero: z.string().optional(),
  cta: z.string().optional(),
  text: z.string().optional(),
}).default({});

// ─── GHL CHAT CONFIG ─────────────────────────────────────────

export const ghlChatConfigSchema = z.object({
  textareaBg: hslString.default('222 47% 7%'),
  textareaText: hslString.default('60 9% 98%'),
  textareaBorder: hslString.default('215 25% 20%'),
  textareaFocusBorder: hslString.default('240 70% 60%'),
  textareaFocusGlow: hslString.default('240 70% 60%'),
  sendButtonBg: hslString.default('240 70% 60%'),
  sendButtonBorder: hslString.default('0 0% 100%'),
  sendButtonIcon: hslString.default('0 0% 100%'),
  selectionBg: hslString.default('240 70% 60%'),
}).default({});

// ─── ECOMMERCE COLORS ────────────────────────────────────────

export const ecommerceColorsSchema = z.object({
  gold: hslString.default('39 95% 50%'),
  goldHover: hslString.default('35 95% 44%'),
  goldGlow: hslString.default('39 95% 60%'),
  goldForeground: hslString.default('0 0% 100%'),
  pricingHighlight: hslString.default('39 95% 50%'),
}).default({});

// ─── CTA VARIANTS ────────────────────────────────────────────

export const ctaVariantsSchema = z.object({
  primary: hslString.default('240 70% 60%'),
  primaryHover: hslString.default('240 70% 50%'),
  secondary: hslString.default('39 95% 50%'),
  secondaryHover: hslString.default('35 95% 44%'),
}).default({});

// ─── TYPOGRAPHY CONFIG ───────────────────────────────────────

export const typographyConfigSchema = z.object({
  fontHeading: z.string().default('Space Grotesk, -apple-system, BlinkMacSystemFont, sans-serif'),
  fontBody: z.string().default('Inter, -apple-system, BlinkMacSystemFont, sans-serif'),
  fontDisplay: z.string().default('Inter, -apple-system, BlinkMacSystemFont, sans-serif'),
  fontMono: z.string().default('JetBrains Mono, Fira Code, monospace'),
}).default({});

// ─── MOTION CONFIG ───────────────────────────────────────────

export const motionConfigSchema = z.object({
  transitionSmooth: z.string().default('all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'),
  transitionBounce: z.string().default('all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)'),
  transitionSpring: z.string().default('all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)'),
}).default({});

// ─── STYLE MODULE TOKEN ──────────────────────────────────────

export const styleModuleTokenSchema = z.object({
  name: z.string(),
  value: z.string(),
  description: z.string().optional(),
});

export const styleModuleSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  tokens: z.array(styleModuleTokenSchema).default([]),
});

export const styleModulesArraySchema = z.array(styleModuleSchema).default([]);

// ─── ADA WIDGET CONFIG ───────────────────────────────────────

export const adaWidgetConfigSchema = z.object({
  enabled: z.boolean().default(true),
  position: z.enum(['bottom-right', 'bottom-left', 'top-right', 'top-left']).default('bottom-right'),
  hideOnMobile: z.boolean().default(false),
  hideOnDesktop: z.boolean().default(false),
  pauseUntil: z.string().nullable().default(null),
  hiddenIndefinitely: z.boolean().default(false),
  iconType: z.enum(['universal', 'wheelchair', 'eye', 'human']).default('universal'),
  iconColor: hslString.default('0 0% 100%'),
  iconBgColor: hslString.default('240 70% 60%'),
  iconSize: z.number().default(48),
  iconShape: z.enum(['circle', 'rounded-square', 'pill']).default('circle'),
  readingHandleSize: z.number().default(28),
}).default({});

// ─── COMPOSITE: FULL THEME PARSE ─────────────────────────────

/**
 * Parse all JSONB columns from a raw theme row into validated, typed objects.
 * Safe to call with partial/null data — every field has a fallback.
 *
 * @param raw - Raw theme row from Supabase (Tables<'site_themes'>)
 * @returns Fully validated ParsedThemeConfig
 */
export function parseThemeJsonb(raw: {
  accent_config?: unknown;
  static_colors?: unknown;
  dark_mode_overrides?: unknown;
  gradient_configs?: unknown;
  ghl_chat_config?: unknown;
  ecommerce_colors?: unknown;
  cta_variants?: unknown;
  typography_config?: unknown;
  motion_config?: unknown;
  style_modules?: unknown;
  default_mode?: string;
  ada_widget_config?: unknown;
}) {
  return {
    accentConfig: accentConfigSchema.parse(raw.accent_config ?? {}),
    staticColors: staticColorsSchema.parse(raw.static_colors ?? {}),
    darkModeOverrides: darkModeOverridesSchema.parse(raw.dark_mode_overrides ?? {}),
    gradientConfigs: gradientConfigSchema.parse(raw.gradient_configs ?? {}),
    ghlChatConfig: ghlChatConfigSchema.parse(raw.ghl_chat_config ?? {}),
    ecommerceColors: ecommerceColorsSchema.parse(raw.ecommerce_colors ?? {}),
    ctaVariants: ctaVariantsSchema.parse(raw.cta_variants ?? {}),
    typographyConfig: typographyConfigSchema.parse(raw.typography_config ?? {}),
    motionConfig: motionConfigSchema.parse(raw.motion_config ?? {}),
    styleModules: styleModulesArraySchema.parse(raw.style_modules ?? []),
    defaultMode: raw.default_mode || 'dark',
    adaWidgetConfig: adaWidgetConfigSchema.parse(raw.ada_widget_config ?? {}),
  };
}
