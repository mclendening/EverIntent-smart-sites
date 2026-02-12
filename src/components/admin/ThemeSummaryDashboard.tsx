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
 * - All props come from parsed theme state in Themes.tsx (the page-level orchestrator).
 * - No database interaction — pure presentation.
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
import { LogoRenderer } from '@/components/logo';
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

// ─── TYPES ───────────────────────────────────────────────────

interface ThemeSummaryDashboardProps {
  themeName: string;
  isActive: boolean;
  defaultMode: string;
  accentConfig: {
    h: number;
    s: number;
    l: number;
    useGradient?: boolean;
    gradientFrom?: string;
    gradientTo?: string;
    gradientAngle?: number;
  };
  staticColors: any;
  darkModeOverrides: DarkModeOverrides;
  gradientConfigs: { hero?: string; cta?: string; text?: string };
  typographyConfig: TypographyConfig;
  motionConfig: MotionConfig;
  ecommerceColors: EcommerceColors;
  ctaVariants: CtaVariants;
  styleModules: StyleModule[];
  adaWidgetConfig: AdaWidgetConfig;
  ghlChatConfig: any;
  logoVersion?: any;
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
    <div className={`rounded-lg border border-border bg-card p-4 space-y-3 ${className}`}>
      <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
        <Icon className="h-3.5 w-3.5" />
        {title}
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
        <Check className="h-3 w-3 text-accent" />
      ) : (
        <X className="h-3 w-3 text-muted-foreground" />
      )}
      <span className={`text-xs ${enabled ? 'text-foreground' : 'text-muted-foreground'}`}>
        {label}
      </span>
    </div>
  );
}

// ─── SWATCH ROW ──────────────────────────────────────────────

function SwatchRow({ colors, labels }: { colors: string[]; labels?: string[] }) {
  return (
    <div className="flex gap-1.5">
      {colors.map((color, i) => (
        <div key={i} className="text-center group relative">
          <div
            className="h-7 w-7 rounded-md border border-border shadow-sm"
            style={{ backgroundColor: `hsl(${color})` }}
          />
          {labels?.[i] && (
            <span className="text-[9px] text-muted-foreground mt-0.5 block truncate max-w-[28px]">
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
    themeName, isActive, defaultMode, accentConfig, staticColors,
    darkModeOverrides, gradientConfigs, typographyConfig, motionConfig,
    ecommerceColors, ctaVariants, styleModules, adaWidgetConfig,
    ghlChatConfig, logoVersion,
  } = props;

  const accentHsl = `${accentConfig.h} ${accentConfig.s}% ${accentConfig.l}%`;

  // Determine mode icon
  const ModeIcon = defaultMode === 'dark' ? Moon : defaultMode === 'light' ? Sun : Monitor;

  return (
    <div className="space-y-4">
      {/* Header row: Accent hero + status badges */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Accent hero block */}
        <div className="flex-1 rounded-lg border border-border overflow-hidden">
          <div
            className="h-16 sm:h-20 w-full flex items-center justify-center"
            style={{
              background: accentConfig.useGradient
                ? `linear-gradient(${accentConfig.gradientAngle || 90}deg, ${accentConfig.gradientFrom || `hsl(${accentHsl})`}, ${accentConfig.gradientTo || `hsl(${accentHsl})`})`
                : `hsl(${accentHsl})`,
            }}
          >
            <span className="text-xs font-mono px-3 py-1 rounded bg-black/30 text-white">
              {accentConfig.h}° {accentConfig.s}% {accentConfig.l}%
            </span>
          </div>
          <div className="px-3 py-2 bg-card flex items-center justify-between">
            <span className="text-xs font-medium">Accent Color</span>
            <div className="flex gap-1.5">
              {isActive && <Badge className="text-[10px] h-5">Active</Badge>}
              <Badge variant="outline" className="text-[10px] h-5 capitalize gap-1">
                <ModeIcon className="h-3 w-3" />
                {defaultMode}
              </Badge>
            </div>
          </div>
        </div>

        {/* Logo preview */}
        {logoVersion && (
          <div
            className="w-full sm:w-48 rounded-lg border border-border p-4 flex items-center justify-center"
            style={{ backgroundColor: `hsl(${staticColors.primary || '222 47% 11%'})` }}
          >
            <LogoRenderer config={logoVersion} accentHsl={accentHsl} />
          </div>
        )}
      </div>

      {/* Dashboard grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {/* Color Palette */}
        <SectionCard icon={Palette} title="Light Palette">
          <SwatchRow
            colors={[
              staticColors.background || '0 0% 100%',
              staticColors.foreground || '222 47% 11%',
              staticColors.primary || '222 47% 11%',
              staticColors.secondary || '60 9% 98%',
              staticColors.card || '0 0% 100%',
              staticColors.muted || '60 5% 96%',
              staticColors.border || '220 13% 91%',
            ]}
            labels={['BG', 'FG', 'Pri', 'Sec', 'Card', 'Mut', 'Bdr']}
          />
        </SectionCard>

        {/* Dark Mode */}
        <SectionCard icon={Moon} title="Dark Palette">
          <SwatchRow
            colors={[
              darkModeOverrides.background,
              darkModeOverrides.foreground,
              darkModeOverrides.primary,
              darkModeOverrides.secondary,
              darkModeOverrides.card,
              darkModeOverrides.muted,
              darkModeOverrides.border,
            ]}
            labels={['BG', 'FG', 'Pri', 'Sec', 'Card', 'Mut', 'Bdr']}
          />
        </SectionCard>

        {/* Typography */}
        <SectionCard icon={Type} title="Typography">
          <div className="space-y-2">
            <div>
              <span className="text-[10px] text-muted-foreground block">Heading</span>
              <p className="text-sm font-semibold truncate" style={{ fontFamily: typographyConfig.fontHeading }}>
                {typographyConfig.fontHeading.split(',')[0]}
              </p>
            </div>
            <div>
              <span className="text-[10px] text-muted-foreground block">Body</span>
              <p className="text-sm truncate" style={{ fontFamily: typographyConfig.fontBody }}>
                {typographyConfig.fontBody.split(',')[0]}
              </p>
            </div>
          </div>
        </SectionCard>

        {/* Gradients */}
        <SectionCard icon={Palette} title="Gradients">
          <div className="space-y-2">
            {gradientConfigs.hero && (
              <div>
                <span className="text-[10px] text-muted-foreground">Hero</span>
                <div className="h-5 rounded border border-border" style={{ background: gradientConfigs.hero }} />
              </div>
            )}
            {gradientConfigs.cta && (
              <div>
                <span className="text-[10px] text-muted-foreground">CTA</span>
                <div className="h-5 rounded border border-border" style={{ background: gradientConfigs.cta }} />
              </div>
            )}
            {gradientConfigs.text && (
              <div>
                <span className="text-[10px] text-muted-foreground">Text</span>
                <div className="h-5 rounded border border-border" style={{ background: gradientConfigs.text }} />
              </div>
            )}
            {!gradientConfigs.hero && !gradientConfigs.cta && !gradientConfigs.text && (
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
                colors={[ecommerceColors.gold, ecommerceColors.goldHover, ecommerceColors.goldGlow]}
                labels={['Gold', 'Hover', 'Glow']}
              />
            </div>
            <div>
              <span className="text-[10px] text-muted-foreground block mb-1">CTA Buttons</span>
              <div className="flex gap-2">
                <div
                  className="flex-1 text-center text-[10px] font-semibold py-1.5 rounded"
                  style={{ backgroundColor: `hsl(${ctaVariants.primary})`, color: 'white' }}
                >
                  Primary
                </div>
                <div
                  className="flex-1 text-center text-[10px] font-semibold py-1.5 rounded"
                  style={{ backgroundColor: `hsl(${ctaVariants.secondary})`, color: 'white' }}
                >
                  Secondary
                </div>
              </div>
            </div>
          </div>
        </SectionCard>

        {/* Integrations & Modules */}
        <SectionCard icon={Layers} title="Integrations & Modules">
          <div className="space-y-2">
            <StatusPill enabled={!!ghlChatConfig?.sendButtonBg} label="GHL Chat Widget" />
            <StatusPill enabled={adaWidgetConfig.enabled} label="ADA Accessibility" />
            <div className="border-t border-border pt-2 mt-2">
              <span className="text-[10px] text-muted-foreground block mb-1">Style Modules</span>
              {styleModules.length > 0 ? (
                <div className="flex flex-wrap gap-1">
                  {styleModules.map(m => (
                    <Badge key={m.name} variant="secondary" className="text-[10px] h-5">
                      {m.name}
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
