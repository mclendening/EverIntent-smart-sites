/**
 * @fileoverview ThemeDetailView — Live component preview + action panel.
 *
 * Instead of showing raw data about colors, this view RENDERS actual UI
 * components (buttons, cards, inputs, badges, nav) using the theme's real
 * token values. This is the value-add — seeing what the theme looks like
 * on real components before entering edit mode.
 *
 * ## Design Pattern
 * - Inspired by shadcn theme editor, Shopify theme preview, WordPress customizer.
 * - Top: action bar with theme identity + quick actions.
 * - Main: large live preview area with real shadcn-style components.
 * - Bottom/side: compact palette strip + metadata.
 */

import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  ArrowLeft, Edit, Trash2, Check, Download, Eye, Star,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Theme, LogoVersion, AccentConfig, StaticColors, GradientConfig, GHLChatConfig } from '@/hooks/useThemeAdmin';
import type { EcommerceColors, CtaVariants } from './EcommerceColorEditor';
import type { TypographyConfig } from './TypographyEditor';
import type { MotionConfig } from './MotionEditor';
import type { StyleModule } from './StyleModulesEditor';
import type { AdaWidgetConfig } from './AdaWidgetConfigEditor';
import type { DarkModeOverrides } from './DarkModeOverridesEditor';

interface ThemeDetailViewProps {
  theme: Theme;
  logoVersion?: LogoVersion;
  accentConfig: AccentConfig;
  staticColors: StaticColors;
  gradientConfigs: GradientConfig;
  ghlChatConfig: GHLChatConfig;
  darkModeOverrides: DarkModeOverrides;
  ecommerceColors: EcommerceColors;
  ctaVariants: CtaVariants;
  typographyConfig: TypographyConfig;
  motionConfig: MotionConfig;
  styleModules: StyleModule[];
  adaWidgetConfig: AdaWidgetConfig;
  defaultMode: string;
  onBack: () => void;
  onEdit: () => void;
  onSetActive: (theme: Theme) => void;
  onDelete: (theme: Theme) => void;
  onExportJson: () => void;
}

/** Resolve colors for rendering based on default mode */
function resolveColors(
  staticColors: StaticColors,
  darkModeOverrides: DarkModeOverrides,
  accentConfig: AccentConfig,
  ecommerceColors: EcommerceColors,
  defaultMode: string,
) {
  const isDark = defaultMode === 'dark';
  const sc = staticColors as unknown as Record<string, string>;
  const dc = darkModeOverrides as unknown as Record<string, string>;
  const ec = ecommerceColors as unknown as Record<string, string>;

  const pick = (key: string, fallback: string) =>
    isDark ? (dc?.[key] || fallback) : (sc?.[key] || fallback);

  return {
    bg: pick('background', isDark ? '222 47% 7%' : '0 0% 100%'),
    fg: pick('foreground', isDark ? '60 9% 98%' : '222 47% 11%'),
    card: pick('card', isDark ? '222 47% 11%' : '0 0% 100%'),
    cardFg: pick('cardForeground', isDark ? '60 9% 98%' : '222 47% 11%'),
    muted: pick('muted', isDark ? '217 33% 17%' : '60 5% 96%'),
    mutedFg: pick('mutedForeground', '215 16% 47%'),
    border: pick('border', isDark ? '217 19% 27%' : '220 13% 91%'),
    primary: pick('primary', isDark ? '60 9% 98%' : '222 47% 11%'),
    primaryFg: pick('primaryForeground', isDark ? '222 47% 11%' : '0 0% 100%'),
    secondary: pick('secondary', isDark ? '217 33% 17%' : '60 9% 98%'),
    secondaryFg: pick('secondaryForeground', isDark ? '60 9% 98%' : '222 47% 11%'),
    accent: `${accentConfig?.h ?? 38} ${accentConfig?.s ?? 92}% ${accentConfig?.l ?? 50}%`,
    gold: ec?.gold || '39 95% 50%',
    isDark,
  };
}

export function ThemeDetailView({
  theme, logoVersion,
  accentConfig, staticColors, gradientConfigs, ghlChatConfig, darkModeOverrides,
  ecommerceColors, ctaVariants, typographyConfig, motionConfig, styleModules,
  adaWidgetConfig, defaultMode,
  onBack, onEdit, onSetActive, onDelete, onExportJson,
}: ThemeDetailViewProps) {
  const c = resolveColors(staticColors, darkModeOverrides, accentConfig, ecommerceColors, defaultMode);
  const modules = Array.isArray(styleModules) ? styleModules : [];
  const headingFont = typographyConfig?.fontHeading || 'system-ui, sans-serif';
  const bodyFont = typographyConfig?.fontBody || 'system-ui, sans-serif';

  return (
    <div className="flex flex-col h-[calc(100dvh-4rem)]">
      {/* Action bar */}
      <div className="px-4 sm:px-6 py-2.5 border-b border-border flex items-center gap-3 shrink-0">
        <Button variant="ghost" size="sm" className="px-2" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div
          className="w-4 h-4 rounded-full ring-1 ring-border shrink-0"
          style={{ backgroundColor: `hsl(${c.accent})` }}
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold truncate">{theme.name}</span>
            {theme.is_active && (
              <span className="flex items-center gap-0.5 text-[9px] font-bold text-accent bg-accent/10 px-1.5 py-0.5 rounded-full">
                <Star className="h-2.5 w-2.5 fill-current" /> Active
              </span>
            )}
            <span className="text-[10px] text-muted-foreground">v{theme.version}</span>
          </div>
        </div>
        <div className="flex gap-1.5 shrink-0">
          {!theme.is_active && (
            <Button variant="outline" size="sm" className="text-xs h-7 px-2.5"
              onClick={() => onSetActive(theme)}>
              <Check className="h-3 w-3 mr-1" /> Activate
            </Button>
          )}
          <Button variant="outline" size="sm" className="h-7 w-7 p-0" onClick={onExportJson} title="Export JSON">
            <Download className="h-3 w-3" />
          </Button>
          <Link to={`/admin/theme-test?themeId=${theme.id}`} target="_blank">
            <Button variant="outline" size="sm" className="h-7 w-7 p-0" title="Full preview">
              <Eye className="h-3 w-3" />
            </Button>
          </Link>
          {!theme.is_active && (
            <Button variant="outline" size="sm" className="h-7 w-7 p-0 text-destructive hover:text-destructive"
              onClick={() => onDelete(theme)} title="Delete">
              <Trash2 className="h-3 w-3" />
            </Button>
          )}
          <Button size="sm" className="text-xs h-7 px-3 bg-accent hover:bg-accent/90 text-accent-foreground" onClick={onEdit}>
            <Edit className="h-3 w-3 mr-1" /> Edit Theme
          </Button>
        </div>
      </div>

      {/* Main content: Live preview */}
      <ScrollArea className="flex-1">
        <div className="p-4 sm:p-6 max-w-5xl mx-auto space-y-6">

          {/* ── LIVE COMPONENT PREVIEW ── */}
          <div
            className="rounded-xl overflow-hidden border-2 border-border"
            style={{ backgroundColor: `hsl(${c.bg})`, color: `hsl(${c.fg})`, fontFamily: bodyFont }}
          >
            {/* Preview nav */}
            <div
              className="flex items-center justify-between px-5 py-3 border-b"
              style={{ backgroundColor: `hsl(${c.primary})`, borderColor: `hsl(${c.border})` }}
            >
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full" style={{ backgroundColor: `hsl(${c.accent})` }} />
                <span className="text-sm font-bold" style={{ color: `hsl(${c.primaryFg})`, fontFamily: headingFont }}>
                  Brand Name
                </span>
              </div>
              <div className="flex gap-4">
                {['Home', 'Services', 'About', 'Contact'].map(item => (
                  <span key={item} className="text-xs" style={{ color: `hsl(${c.primaryFg})`, opacity: 0.7 }}>
                    {item}
                  </span>
                ))}
              </div>
              <div
                className="px-3 py-1 rounded-md text-xs font-semibold"
                style={{ backgroundColor: `hsl(${c.accent})`, color: 'white' }}
              >
                Get Quote
              </div>
            </div>

            {/* Hero section */}
            <div className="px-6 py-8 text-center" style={{ borderBottom: `1px solid hsl(${c.border})` }}>
              <h1 className="text-2xl font-bold mb-2" style={{ fontFamily: headingFont, color: `hsl(${c.fg})` }}>
                Welcome to Your Business
              </h1>
              <p className="text-sm mb-4" style={{ color: `hsl(${c.mutedFg})`, fontFamily: bodyFont }}>
                Professional services you can trust. Let us help you grow.
              </p>
              <div className="flex gap-3 justify-center">
                <div
                  className="px-5 py-2 rounded-md text-sm font-semibold cursor-default"
                  style={{ backgroundColor: `hsl(${c.accent})`, color: 'white' }}
                >
                  Primary CTA
                </div>
                <div
                  className="px-5 py-2 rounded-md text-sm font-semibold cursor-default"
                  style={{ backgroundColor: `hsl(${c.gold})`, color: 'white' }}
                >
                  Gold CTA
                </div>
                <div
                  className="px-5 py-2 rounded-md text-sm font-semibold border cursor-default"
                  style={{ borderColor: `hsl(${c.border})`, color: `hsl(${c.fg})` }}
                >
                  Outline
                </div>
              </div>
            </div>

            {/* Card grid */}
            <div className="p-6 grid grid-cols-3 gap-4" style={{ borderBottom: `1px solid hsl(${c.border})` }}>
              {['Web Design', 'SEO Optimization', 'AI Employee'].map((title, i) => (
                <div
                  key={i}
                  className="rounded-lg p-4 border"
                  style={{ backgroundColor: `hsl(${c.card})`, borderColor: `hsl(${c.border})` }}
                >
                  <div
                    className="w-8 h-8 rounded-md mb-3 flex items-center justify-center text-white text-xs font-bold"
                    style={{ backgroundColor: `hsl(${c.accent})` }}
                  >
                    {i + 1}
                  </div>
                  <h3 className="text-sm font-semibold mb-1" style={{ color: `hsl(${c.cardFg})`, fontFamily: headingFont }}>
                    {title}
                  </h3>
                  <p className="text-xs leading-relaxed" style={{ color: `hsl(${c.mutedFg})` }}>
                    A brief description of this service offering and its key benefits.
                  </p>
                </div>
              ))}
            </div>

            {/* Form section */}
            <div className="p-6 grid grid-cols-2 gap-6">
              {/* Left: form inputs */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold" style={{ fontFamily: headingFont }}>Contact Form</h3>
                {['Full Name', 'Email Address', 'Phone Number'].map(label => (
                  <div key={label}>
                    <label className="text-[10px] font-medium block mb-1" style={{ color: `hsl(${c.mutedFg})` }}>
                      {label}
                    </label>
                    <div
                      className="h-8 rounded-md px-3 flex items-center text-xs border"
                      style={{
                        backgroundColor: `hsl(${c.card})`,
                        borderColor: `hsl(${c.border})`,
                        color: `hsl(${c.mutedFg})`,
                      }}
                    >
                      Enter {label.toLowerCase()}…
                    </div>
                  </div>
                ))}
                <div
                  className="h-16 rounded-md px-3 pt-2 text-xs border"
                  style={{
                    backgroundColor: `hsl(${c.card})`,
                    borderColor: `hsl(${c.border})`,
                    color: `hsl(${c.mutedFg})`,
                  }}
                >
                  Your message…
                </div>
                <div
                  className="px-4 py-2 rounded-md text-xs font-semibold text-center cursor-default"
                  style={{ backgroundColor: `hsl(${c.accent})`, color: 'white' }}
                >
                  Send Message
                </div>
              </div>

              {/* Right: badges, pills, states */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold" style={{ fontFamily: headingFont }}>UI Elements</h3>

                {/* Badges */}
                <div>
                  <label className="text-[10px] font-medium block mb-2" style={{ color: `hsl(${c.mutedFg})` }}>Badges</label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { label: 'Active', bg: c.accent, fg: 'white' },
                      { label: 'Featured', bg: c.gold, fg: 'white' },
                      { label: 'Muted', bg: c.muted, fg: c.mutedFg },
                      { label: 'Outline', bg: 'transparent', fg: c.fg, border: c.border },
                    ].map(b => (
                      <span
                        key={b.label}
                        className="px-2 py-0.5 rounded-full text-[10px] font-semibold"
                        style={{
                          backgroundColor: b.bg === 'transparent' ? 'transparent' : `hsl(${b.bg})`,
                          color: b.fg === 'white' ? 'white' : `hsl(${b.fg})`,
                          border: b.border ? `1px solid hsl(${b.border})` : 'none',
                        }}
                      >
                        {b.label}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Toggle states */}
                <div>
                  <label className="text-[10px] font-medium block mb-2" style={{ color: `hsl(${c.mutedFg})` }}>Toggle</label>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-4 rounded-full relative" style={{ backgroundColor: `hsl(${c.accent})` }}>
                      <div className="absolute right-0.5 top-0.5 w-3 h-3 rounded-full bg-white" />
                    </div>
                    <span className="text-xs" style={{ color: `hsl(${c.fg})` }}>Enabled</span>
                  </div>
                </div>

                {/* Secondary card */}
                <div
                  className="rounded-lg p-3 border"
                  style={{ backgroundColor: `hsl(${c.secondary})`, borderColor: `hsl(${c.border})` }}
                >
                  <span className="text-xs font-semibold" style={{ color: `hsl(${c.secondaryFg})` }}>
                    Secondary Surface
                  </span>
                  <p className="text-[10px] mt-1" style={{ color: `hsl(${c.mutedFg})` }}>
                    This shows the secondary background token applied to a card element.
                  </p>
                </div>

                {/* Muted card */}
                <div
                  className="rounded-lg p-3"
                  style={{ backgroundColor: `hsl(${c.muted})` }}
                >
                  <span className="text-xs font-semibold" style={{ color: `hsl(${c.fg})` }}>
                    Muted Surface
                  </span>
                  <p className="text-[10px] mt-1" style={{ color: `hsl(${c.mutedFg})` }}>
                    Muted background with muted foreground text for subtle content areas.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ── METADATA STRIP ── */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {/* Palette */}
            <div className="rounded-lg border border-border p-3">
              <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider block mb-2">
                {c.isDark ? 'Dark' : 'Light'} Palette
              </span>
              <div className="flex gap-1 flex-wrap">
                {[
                  { label: 'BG', val: c.bg },
                  { label: 'FG', val: c.fg },
                  { label: 'Card', val: c.card },
                  { label: 'Muted', val: c.muted },
                  { label: 'Border', val: c.border },
                  { label: 'Accent', val: c.accent },
                  { label: 'Gold', val: c.gold },
                ].map(({ label, val }) => (
                  <div key={label} className="text-center">
                    <div className="w-6 h-6 rounded ring-1 ring-border/50" style={{ backgroundColor: `hsl(${val})` }} />
                    <span className="text-[7px] text-muted-foreground mt-0.5 block">{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Typography */}
            <div className="rounded-lg border border-border p-3">
              <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider block mb-2">Typography</span>
              <div className="space-y-1">
                <div>
                  <span className="text-[9px] text-muted-foreground">Heading</span>
                  <p className="text-xs font-bold truncate" style={{ fontFamily: headingFont }}>
                    {headingFont.split(',')[0]?.trim()}
                  </p>
                </div>
                <div>
                  <span className="text-[9px] text-muted-foreground">Body</span>
                  <p className="text-xs truncate" style={{ fontFamily: bodyFont }}>
                    {bodyFont.split(',')[0]?.trim()}
                  </p>
                </div>
              </div>
            </div>

            {/* Gradients */}
            <div className="rounded-lg border border-border p-3">
              <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider block mb-2">Gradients</span>
              <div className="space-y-1.5">
                {[
                  { label: 'Hero', val: gradientConfigs?.hero },
                  { label: 'CTA', val: gradientConfigs?.cta },
                  { label: 'Text', val: gradientConfigs?.text },
                ].map(({ label, val }) => (
                  <div key={label} className="flex items-center gap-2">
                    <span className="text-[9px] text-muted-foreground w-6">{label}</span>
                    {val ? (
                      <div className="flex-1 h-3 rounded-sm ring-1 ring-border/50" style={{ background: val }} />
                    ) : (
                      <span className="text-[9px] text-muted-foreground/40 italic">None</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* System info */}
            <div className="rounded-lg border border-border p-3">
              <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider block mb-2">System</span>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Mode</span>
                  <span className="capitalize font-medium">{defaultMode}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Modules</span>
                  <span className="font-medium">{modules.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">GHL Chat</span>
                  <span className="font-medium">{ghlChatConfig?.sendButtonBg ? '✓' : '—'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">ADA Widget</span>
                  <span className="font-medium">{adaWidgetConfig?.enabled ? '✓' : '—'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
