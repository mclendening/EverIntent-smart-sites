/**
 * @fileoverview Theme Summary Dashboard — read-only landing view for a selected theme.
 *
 * Provides an at-a-glance overview of the theme's visual identity before entering
 * edit mode. Inspired by Figma's style overview and Shopify's theme inspector patterns.
 *
 * ## Architecture
 * - Rendered as the default view when a theme is selected (non-editing state).
 * - Organized into visual cards: Brand Identity, Color Palette, Typography,
 *   Gradients, Commerce, and Integrations.
 * - Each card shows live swatches, font samples, badges, and status indicators.
 * - Fully read-only — clicking "Edit" in the parent transitions to ThemeEditorPanels.
 *
 * ## Data Contract
 * - All props sourced from JSONB columns in the `site_themes` table, parsed by
 *   the Themes.tsx orchestrator. Every prop may be undefined, null, or partially
 *   populated — the component applies defensive fallbacks at every access point.
 * - `accentConfig`: from `accent_config` JSONB — contains h/s/l values plus
 *   optional gradient fields (useGradient, gradientFrom, gradientTo, gradientAngle).
 * - `staticColors`: from `static_colors` JSONB — light-mode semantic token map
 *   (background, foreground, primary, secondary, card, muted, border).
 * - `darkModeOverrides`: from `dark_mode_overrides` JSONB — dark-mode semantic
 *   overrides mirroring staticColors keys.
 * - `gradientConfigs`: from `gradient_configs` JSONB — hero/cta/text gradient CSS strings.
 * - `typographyConfig`: from `typography_config` JSONB — fontHeading, fontBody, fontDisplay.
 * - `ecommerceColors`: from `ecommerce_colors` JSONB — gold accent HSL values.
 * - `ctaVariants`: from `cta_variants` JSONB — primary/secondary CTA HSL values.
 * - `styleModules`: from `style_modules` JSONB array — named token groups.
 * - `adaWidgetConfig`: from `ada_widget_config` JSONB — accessibility widget settings.
 * - `ghlChatConfig`: from `ghl_chat_config` JSONB — GoHighLevel chat widget theming.
 *
 * ## Null Safety (Phase 7A.4)
 * Every JSONB-sourced value is guarded with optional chaining and HSL fallbacks.
 * This is critical for mobile stability where partially-populated themes previously
 * caused the entire dashboard to crash on viewports < 768px.
 *
 * ## Security
 * - Admin-only (behind AdminGuard in parent). No auth logic here.
 *
 * ## SSG Compatibility
 * - Admin-only, not SSG-rendered.
 *
 * ## Portability
 * - Copy this file alongside ThemeEditorNav + ThemeEditorPanels + Themes.tsx.
 *   Requires only parsed theme state objects as props.
 */

import { Badge } from '@/components/ui/badge';
import {
  Palette, Type, Sun, Moon, Layers, ShoppingBag,
  MessageSquare, Accessibility, Check, X, Monitor,
} from 'lucide-react';
import type { TypographyConfig } from './TypographyEditor';
import type { EcommerceColors, CtaVariants } from './EcommerceColorEditor';
import type { AdaWidgetConfig } from './AdaWidgetConfigEditor';
import type { StyleModule } from './StyleModulesEditor';
import type { MotionConfig } from './MotionEditor';
import type { DarkModeOverrides } from './DarkModeOverridesEditor';

// ─── FALLBACK CONSTANTS ──────────────────────────────────────
/** Default HSL values used when JSONB fields are null or missing */
const FALLBACK_HSL = '0 0% 50%';
const FALLBACK_BG = '0 0% 100%';
const FALLBACK_FG = '222 47% 11%';
const FALLBACK_FONT = 'system-ui, sans-serif';

// ─── TYPES ───────────────────────────────────────────────────

/**
 * Props interface with all fields treated as potentially partial.
 * The orchestrator (Themes.tsx) provides parsed state, but JSONB
 * columns can yield null/undefined at any nesting depth.
 */
export interface ThemeSummaryDashboardProps {
  themeName: string;
  isActive: boolean;
  defaultMode: string;
  accentConfig?: {
    h?: number;
    s?: number;
    l?: number;
    useGradient?: boolean;
    gradientFrom?: string;
    gradientTo?: string;
    gradientAngle?: number;
  } | null;
  staticColors?: any;
  darkModeOverrides?: Partial<DarkModeOverrides> | null;
  gradientConfigs?: { hero?: string; cta?: string; text?: string } | null;
  typographyConfig?: Partial<TypographyConfig> | null;
  motionConfig?: Partial<MotionConfig> | null;
  ecommerceColors?: Partial<EcommerceColors> | null;
  ctaVariants?: Partial<CtaVariants> | null;
  styleModules?: StyleModule[] | null;
  adaWidgetConfig?: { enabled?: boolean; [key: string]: any } | null;
  ghlChatConfig?: any;
  logoVersion?: any;
}

// ─── SAFE ACCESSOR ───────────────────────────────────────────

/** Safely read an HSL string from a record, returning fallback if missing */
function safeHsl(obj: Record<string, string> | null | undefined, key: string, fallback = FALLBACK_HSL): string {
  return obj?.[key] || fallback;
}

// ─── SECTION CARD ────────────────────────────────────────────

function SectionCard({
  icon: Icon,
  title,
  children,
  className = '',
}: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`rounded-lg border border-border bg-card p-3 sm:p-4 space-y-3 ${className}`}>
      <div className="flex items-center gap-2 text-[10px] sm:text-xs font-semibold text-muted-foreground uppercase tracking-wider">
        <Icon className="h-3.5 w-3.5 shrink-0" />
        <span className="truncate">{title}</span>
      </div>
      {children}
    </div>
  );
}

// ─── STATUS PILL ─────────────────────────────────────────────

function StatusPill({ enabled, label }: { enabled: boolean; label: string }) {
  return (
    <div className="flex items-center gap-1.5">
      {enabled ? (
        <Check className="h-3 w-3 text-accent shrink-0" />
      ) : (
        <X className="h-3 w-3 text-muted-foreground shrink-0" />
      )}
      <span className={`text-xs truncate ${enabled ? 'text-foreground' : 'text-muted-foreground'}`}>
        {label}
      </span>
    </div>
  );
}

// ─── SWATCH ROW ──────────────────────────────────────────────

/**
 * Renders a horizontal row of color swatches with optional labels.
 * Uses overflow-x-auto on mobile to prevent layout breakage with 7+ swatches.
 */
function SwatchRow({ colors, labels }: { colors: string[]; labels?: string[] }) {
  return (
    <div className="flex gap-1 sm:gap-1.5 overflow-x-auto pb-1">
      {colors.map((color, i) => (
        <div key={i} className="text-center shrink-0">
          <div
            className="h-6 w-6 sm:h-7 sm:w-7 rounded-md border border-border shadow-sm"
            style={{ backgroundColor: `hsl(${color})` }}
          />
          {labels?.[i] && (
            <span className="text-[8px] sm:text-[9px] text-muted-foreground mt-0.5 block truncate max-w-[24px] sm:max-w-[28px]">
              {labels[i]}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

// ─── MAIN COMPONENT ──────────────────────────────────────────

export function ThemeSummaryDashboard(props: ThemeSummaryDashboardProps) {
  const {
    themeName,
    isActive,
    defaultMode = 'dark',
    accentConfig,
    staticColors,
    darkModeOverrides,
    gradientConfigs,
    typographyConfig,
    ecommerceColors,
    ctaVariants,
    styleModules,
    adaWidgetConfig,
    ghlChatConfig,
  } = props;

  // ── Safe accent extraction ──
  const h = accentConfig?.h ?? 38;
  const s = accentConfig?.s ?? 92;
  const l = accentConfig?.l ?? 50;
  const accentHsl = `${h} ${s}% ${l}%`;
  const useGradient = accentConfig?.useGradient ?? false;

  // ── Mode icon ──
  const ModeIcon = defaultMode === 'dark' ? Moon : defaultMode === 'light' ? Sun : Monitor;

  // ── Safe typography extraction ──
  const headingFont = typographyConfig?.fontHeading || FALLBACK_FONT;
  const bodyFont = typographyConfig?.fontBody || FALLBACK_FONT;

  // ── Safe style modules ──
  const safeModules = Array.isArray(styleModules) ? styleModules : [];

  // ── Safe gradient configs ──
  const heroGrad = gradientConfigs?.hero;
  const ctaGrad = gradientConfigs?.cta;
  const textGrad = gradientConfigs?.text;
  const hasGradients = !!(heroGrad || ctaGrad || textGrad);

  return (
    <div className="space-y-3 sm:space-y-4">
      {/* ── Accent Hero Banner ── */}
      <div className="rounded-lg border border-border overflow-hidden">
        <div
          className="h-14 sm:h-20 w-full flex items-center justify-center"
          style={{
            background: useGradient
              ? `linear-gradient(${accentConfig?.gradientAngle ?? 90}deg, ${accentConfig?.gradientFrom ?? `hsl(${accentHsl})`}, ${accentConfig?.gradientTo ?? `hsl(${accentHsl})`})`
              : `hsl(${accentHsl})`,
          }}
        >
          <span className="text-[10px] sm:text-xs font-mono px-2 sm:px-3 py-1 rounded bg-black/30 text-white">
            {h}° {s}% {l}%
          </span>
        </div>
        <div className="px-3 py-2 bg-card flex items-center justify-between gap-2">
          <span className="text-xs font-medium truncate">{themeName || 'Untitled Theme'}</span>
          <div className="flex gap-1.5 shrink-0">
            {isActive && <Badge className="text-[10px] h-5">Active</Badge>}
            <Badge variant="outline" className="text-[10px] h-5 capitalize gap-1">
              <ModeIcon className="h-3 w-3" />
              {defaultMode}
            </Badge>
          </div>
        </div>
      </div>

      {/* ── Dashboard Grid ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
        {/* Light Palette */}
        <SectionCard icon={Sun} title="Light Palette">
          <SwatchRow
            colors={[
              safeHsl(staticColors, 'background', FALLBACK_BG),
              safeHsl(staticColors, 'foreground', FALLBACK_FG),
              safeHsl(staticColors, 'primary', FALLBACK_FG),
              safeHsl(staticColors, 'secondary', '60 9% 98%'),
              safeHsl(staticColors, 'card', FALLBACK_BG),
              safeHsl(staticColors, 'muted', '60 5% 96%'),
              safeHsl(staticColors, 'border', '220 13% 91%'),
            ]}
            labels={['BG', 'FG', 'Pri', 'Sec', 'Card', 'Mut', 'Bdr']}
          />
        </SectionCard>

        {/* Dark Palette */}
        <SectionCard icon={Moon} title="Dark Palette">
          <SwatchRow
            colors={[
              safeHsl(darkModeOverrides, 'background', '222 47% 7%'),
              safeHsl(darkModeOverrides, 'foreground', '60 9% 98%'),
              safeHsl(darkModeOverrides, 'primary', '60 9% 98%'),
              safeHsl(darkModeOverrides, 'secondary', '217 33% 17%'),
              safeHsl(darkModeOverrides, 'card', '222 47% 7%'),
              safeHsl(darkModeOverrides, 'muted', '217 33% 17%'),
              safeHsl(darkModeOverrides, 'border', '217 19% 27%'),
            ]}
            labels={['BG', 'FG', 'Pri', 'Sec', 'Card', 'Mut', 'Bdr']}
          />
        </SectionCard>

        {/* Typography */}
        <SectionCard icon={Type} title="Typography">
          <div className="space-y-2">
            <div>
              <span className="text-[10px] text-muted-foreground block">Heading</span>
              <p className="text-sm font-semibold truncate" style={{ fontFamily: headingFont }}>
                {headingFont.split(',')[0]?.trim() || 'System'}
              </p>
            </div>
            <div>
              <span className="text-[10px] text-muted-foreground block">Body</span>
              <p className="text-sm truncate" style={{ fontFamily: bodyFont }}>
                {bodyFont.split(',')[0]?.trim() || 'System'}
              </p>
            </div>
          </div>
        </SectionCard>

        {/* Gradients */}
        <SectionCard icon={Palette} title="Gradients">
          <div className="space-y-2">
            {heroGrad && (
              <div>
                <span className="text-[10px] text-muted-foreground">Hero</span>
                <div className="h-5 rounded border border-border" style={{ background: heroGrad }} />
              </div>
            )}
            {ctaGrad && (
              <div>
                <span className="text-[10px] text-muted-foreground">CTA</span>
                <div className="h-5 rounded border border-border" style={{ background: ctaGrad }} />
              </div>
            )}
            {textGrad && (
              <div>
                <span className="text-[10px] text-muted-foreground">Text</span>
                <div className="h-5 rounded border border-border" style={{ background: textGrad }} />
              </div>
            )}
            {!hasGradients && (
              <p className="text-xs text-muted-foreground italic">No gradients configured</p>
            )}
          </div>
        </SectionCard>

        {/* Commerce & CTA */}
        <SectionCard icon={ShoppingBag} title="Commerce & CTA">
          <div className="space-y-2">
            <div>
              <span className="text-[10px] text-muted-foreground block mb-1">Gold Accents</span>
              <SwatchRow
                colors={[
                  ecommerceColors?.gold || '39 95% 50%',
                  ecommerceColors?.goldHover || '35 95% 44%',
                  ecommerceColors?.goldGlow || '39 95% 60%',
                ]}
                labels={['Gold', 'Hover', 'Glow']}
              />
            </div>
            <div>
              <span className="text-[10px] text-muted-foreground block mb-1">CTA Buttons</span>
              <div className="flex gap-2">
                <div
                  className="flex-1 text-center text-[10px] font-semibold py-1.5 rounded"
                  style={{ backgroundColor: `hsl(${ctaVariants?.primary || '240 70% 60%'})`, color: 'white' }}
                >
                  Primary
                </div>
                <div
                  className="flex-1 text-center text-[10px] font-semibold py-1.5 rounded"
                  style={{ backgroundColor: `hsl(${ctaVariants?.secondary || '39 95% 50%'})`, color: 'white' }}
                >
                  Secondary
                </div>
              </div>
            </div>
          </div>
        </SectionCard>

        {/* Integrations & Modules */}
        <SectionCard icon={Layers} title="Integrations">
          <div className="space-y-2">
            <StatusPill enabled={!!ghlChatConfig?.sendButtonBg} label="GHL Chat" />
            <StatusPill enabled={adaWidgetConfig?.enabled ?? false} label="ADA Widget" />
            <div className="border-t border-border pt-2 mt-2">
              <span className="text-[10px] text-muted-foreground block mb-1">Style Modules</span>
              {safeModules.length > 0 ? (
                <div className="flex flex-wrap gap-1">
                  {safeModules.map((m) => (
                    <Badge key={m?.name || 'unknown'} variant="secondary" className="text-[10px] h-5">
                      {m?.name || '?'}
                    </Badge>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-muted-foreground italic">None</p>
              )}
            </div>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
