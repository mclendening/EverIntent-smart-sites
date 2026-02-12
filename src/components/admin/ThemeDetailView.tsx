/**
 * @fileoverview ThemeDetailView — Premium read-only theme inspection dashboard.
 *
 * Provides a comprehensive at-a-glance view of a theme's full visual identity
 * with a rich accent hero banner, organized config sections, and action toolbar.
 * This is the second level of the drill-down (list → detail → editor).
 *
 * ## Architecture
 * - Full-width accent gradient hero banner at top with theme identity.
 * - Sticky action bar with Edit, Activate, Export, Preview, Delete actions.
 * - Dashboard grid of visual config cards organized by category.
 * - Full-viewport layout (100dvh minus header).
 *
 * ## Data Contract
 * - Receives parsed theme config states from useThemeAdmin hook.
 * - All JSONB-sourced values are guarded with optional chaining and fallbacks.
 * - Action callbacks are passed through from the hook.
 *
 * ## Security
 * - Admin-only (parent is AdminGuard-protected).
 *
 * ## SSG Compatibility
 * - Admin-only, not SSG-rendered.
 *
 * ## Portability
 * - Copy with useThemeAdmin.ts + types referenced in props.
 */

import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  ArrowLeft, Edit, Trash2, Check, Download, Eye,
  Palette, Type, Sun, Moon, Monitor, Layers, ShoppingBag,
  MessageSquare, Accessibility, X, Zap,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Theme, LogoVersion, AccentConfig, StaticColors, GradientConfig, GHLChatConfig } from '@/hooks/useThemeAdmin';
import { parseHsl } from '@/hooks/useThemeAdmin';
import type { EcommerceColors, CtaVariants } from './EcommerceColorEditor';
import type { TypographyConfig } from './TypographyEditor';
import type { MotionConfig } from './MotionEditor';
import type { StyleModule } from './StyleModulesEditor';
import type { AdaWidgetConfig } from './AdaWidgetConfigEditor';
import type { DarkModeOverrides } from './DarkModeOverridesEditor';

// ─── TYPES ───────────────────────────────────────────────────

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

// ─── FALLBACKS ───────────────────────────────────────────────
const FALLBACK_HSL = '0 0% 50%';
const FALLBACK_FONT = 'system-ui, sans-serif';

// ─── HELPERS ─────────────────────────────────────────────────

function safeHsl(obj: Record<string, string> | null | undefined, key: string, fallback = FALLBACK_HSL): string {
  return obj?.[key] || fallback;
}

/** Section card wrapper for dashboard grid */
function Section({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-4 space-y-3">
      <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
        <Icon className="h-3.5 w-3.5 shrink-0" />
        <span>{title}</span>
      </div>
      {children}
    </div>
  );
}

/** Color swatch with label */
function Swatch({ color, label }: { color: string; label: string }) {
  return (
    <div className="text-center">
      <div
        className="h-8 w-8 sm:h-9 sm:w-9 rounded-lg border border-border shadow-sm mx-auto"
        style={{ backgroundColor: `hsl(${color})` }}
      />
      <span className="text-[9px] text-muted-foreground mt-1 block">{label}</span>
    </div>
  );
}

/** Status indicator */
function StatusLine({ enabled, label }: { enabled: boolean; label: string }) {
  return (
    <div className="flex items-center gap-2">
      {enabled ? (
        <Check className="h-3.5 w-3.5 text-accent shrink-0" />
      ) : (
        <X className="h-3.5 w-3.5 text-muted-foreground/40 shrink-0" />
      )}
      <span className={`text-xs ${enabled ? 'text-foreground' : 'text-muted-foreground'}`}>
        {label}
      </span>
    </div>
  );
}

// ─── MAIN COMPONENT ──────────────────────────────────────────

export function ThemeDetailView({
  theme, logoVersion,
  accentConfig, staticColors, gradientConfigs, ghlChatConfig, darkModeOverrides,
  ecommerceColors, ctaVariants, typographyConfig, motionConfig, styleModules,
  adaWidgetConfig, defaultMode,
  onBack, onEdit, onSetActive, onDelete, onExportJson,
}: ThemeDetailViewProps) {
  const h = accentConfig?.h ?? 38;
  const s = accentConfig?.s ?? 92;
  const l = accentConfig?.l ?? 50;
  const accentHsl = `${h} ${s}% ${l}%`;
  const useGradient = accentConfig?.useGradient ?? false;
  const ModeIcon = defaultMode === 'dark' ? Moon : defaultMode === 'light' ? Sun : Monitor;

  const modules = Array.isArray(styleModules) ? styleModules : [];
  const headingFont = typographyConfig?.fontHeading || FALLBACK_FONT;
  const bodyFont = typographyConfig?.fontBody || FALLBACK_FONT;

  // Build hero gradient
  const heroGradient = useGradient
    ? `linear-gradient(${accentConfig?.gradientAngle ?? 135}deg, ${accentConfig?.gradientFrom ?? `hsl(${accentHsl})`}, ${accentConfig?.gradientTo ?? `hsl(${accentHsl})`})`
    : (() => {
        const fromH = (h - 20 + 360) % 360;
        const toH = (h + 20) % 360;
        return `linear-gradient(135deg, hsl(${fromH} ${Math.min(s + 10, 100)}% ${Math.min(l + 8, 65)}%), hsl(${h} ${s}% ${l}%), hsl(${toH} ${Math.min(s + 10, 100)}% ${Math.max(l - 12, 20)}%))`;
      })();

  return (
    <div className="flex flex-col h-[calc(100dvh-4rem)]">
      {/* Sticky action bar */}
      <div className="px-3 py-2 border-b border-border bg-card flex items-center gap-2 shrink-0">
        <Button variant="ghost" size="sm" className="px-2" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <span className="text-sm font-semibold truncate flex-1">{theme.name}</span>
        <div className="flex gap-1.5 shrink-0">
          {!theme.is_active && (
            <Button variant="outline" size="sm" className="text-[10px] h-7 px-2"
              onClick={() => onSetActive(theme)}>
              <Check className="h-3 w-3 mr-1" /> Activate
            </Button>
          )}
          <Button variant="outline" size="sm" className="text-[10px] h-7 px-2" onClick={onExportJson}>
            <Download className="h-3 w-3" />
          </Button>
          <Link to={`/admin/theme-test?themeId=${theme.id}`} target="_blank">
            <Button variant="outline" size="sm" className="text-[10px] h-7 px-2">
              <Eye className="h-3 w-3" />
            </Button>
          </Link>
          {!theme.is_active && (
            <Button variant="outline" size="sm" className="text-[10px] h-7 px-2 text-destructive hover:text-destructive"
              onClick={() => onDelete(theme)}>
              <Trash2 className="h-3 w-3" />
            </Button>
          )}
          <Button size="sm" className="text-[10px] h-7 px-3 bg-accent hover:bg-accent/90 text-accent-foreground" onClick={onEdit}>
            <Edit className="h-3 w-3 mr-1" /> Edit
          </Button>
        </div>
      </div>

      {/* Scrollable content */}
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-4 max-w-5xl mx-auto">
          {/* Hero banner */}
          <div className="rounded-xl overflow-hidden border border-border">
            <div
              className="h-28 sm:h-36 lg:h-44 w-full relative"
              style={{ background: heroGradient }}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.12),transparent_60%)]" />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/50 to-transparent">
                <h2 className="text-lg sm:text-xl font-bold text-white">{theme.name}</h2>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-xs text-white/70 font-mono">
                    {Math.round(h)}° {Math.round(s)}% {Math.round(l)}%
                  </span>
                  <span className="text-xs text-white/70">v{theme.version}</span>
                  <span className="flex items-center gap-1 text-xs text-white/70">
                    <ModeIcon className="h-3 w-3" />
                    <span className="capitalize">{defaultMode}</span>
                  </span>
                  {theme.is_active && (
                    <span className="flex items-center gap-1 text-xs text-white bg-white/20 px-1.5 py-0.5 rounded">
                      <Check className="h-3 w-3" /> Active
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Dashboard grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {/* Light Palette */}
            <Section icon={Sun} title="Light Palette">
              <div className="flex flex-wrap gap-2">
                <Swatch color={safeHsl(staticColors as any, 'background', '0 0% 100%')} label="BG" />
                <Swatch color={safeHsl(staticColors as any, 'foreground', '222 47% 11%')} label="FG" />
                <Swatch color={safeHsl(staticColors as any, 'primary', '222 47% 11%')} label="Primary" />
                <Swatch color={safeHsl(staticColors as any, 'secondary', '60 9% 98%')} label="Sec" />
                <Swatch color={safeHsl(staticColors as any, 'card', '0 0% 100%')} label="Card" />
                <Swatch color={safeHsl(staticColors as any, 'muted', '60 5% 96%')} label="Muted" />
                <Swatch color={safeHsl(staticColors as any, 'border', '220 13% 91%')} label="Border" />
              </div>
            </Section>

            {/* Dark Palette */}
            <Section icon={Moon} title="Dark Palette">
              <div className="flex flex-wrap gap-2">
                <Swatch color={safeHsl(darkModeOverrides as any, 'background', '222 47% 7%')} label="BG" />
                <Swatch color={safeHsl(darkModeOverrides as any, 'foreground', '60 9% 98%')} label="FG" />
                <Swatch color={safeHsl(darkModeOverrides as any, 'primary', '60 9% 98%')} label="Primary" />
                <Swatch color={safeHsl(darkModeOverrides as any, 'secondary', '217 33% 17%')} label="Sec" />
                <Swatch color={safeHsl(darkModeOverrides as any, 'card', '222 47% 7%')} label="Card" />
                <Swatch color={safeHsl(darkModeOverrides as any, 'muted', '217 33% 17%')} label="Muted" />
                <Swatch color={safeHsl(darkModeOverrides as any, 'border', '217 19% 27%')} label="Border" />
              </div>
            </Section>

            {/* Typography */}
            <Section icon={Type} title="Typography">
              <div className="space-y-3">
                <div>
                  <span className="text-[10px] text-muted-foreground uppercase tracking-wide">Heading</span>
                  <p className="text-base font-bold truncate mt-0.5" style={{ fontFamily: headingFont }}>
                    {headingFont.split(',')[0]?.trim()}
                  </p>
                </div>
                <div>
                  <span className="text-[10px] text-muted-foreground uppercase tracking-wide">Body</span>
                  <p className="text-sm truncate mt-0.5" style={{ fontFamily: bodyFont }}>
                    The quick brown fox jumps over the lazy dog
                  </p>
                </div>
              </div>
            </Section>

            {/* Gradients */}
            <Section icon={Palette} title="Gradients">
              <div className="space-y-2">
                {gradientConfigs?.hero && (
                  <div>
                    <span className="text-[10px] text-muted-foreground">Hero</span>
                    <div className="h-6 rounded-md border border-border mt-0.5" style={{ background: gradientConfigs.hero }} />
                  </div>
                )}
                {gradientConfigs?.cta && (
                  <div>
                    <span className="text-[10px] text-muted-foreground">CTA</span>
                    <div className="h-6 rounded-md border border-border mt-0.5" style={{ background: gradientConfigs.cta }} />
                  </div>
                )}
                {gradientConfigs?.text && (
                  <div>
                    <span className="text-[10px] text-muted-foreground">Text</span>
                    <div className="h-6 rounded-md border border-border mt-0.5" style={{ background: gradientConfigs.text }} />
                  </div>
                )}
                {!gradientConfigs?.hero && !gradientConfigs?.cta && !gradientConfigs?.text && (
                  <p className="text-xs text-muted-foreground italic">No gradients configured</p>
                )}
              </div>
            </Section>

            {/* Commerce & CTA */}
            <Section icon={ShoppingBag} title="Commerce & CTA">
              <div className="space-y-3">
                <div>
                  <span className="text-[10px] text-muted-foreground uppercase tracking-wide mb-1.5 block">Gold Accents</span>
                  <div className="flex gap-2">
                    <Swatch color={ecommerceColors?.gold || '39 95% 50%'} label="Gold" />
                    <Swatch color={ecommerceColors?.goldHover || '35 95% 44%'} label="Hover" />
                    <Swatch color={ecommerceColors?.goldGlow || '39 95% 60%'} label="Glow" />
                  </div>
                </div>
                <div>
                  <span className="text-[10px] text-muted-foreground uppercase tracking-wide mb-1.5 block">CTA Buttons</span>
                  <div className="flex gap-2">
                    <div
                      className="flex-1 text-center text-[11px] font-semibold py-2 rounded-lg"
                      style={{ backgroundColor: `hsl(${ctaVariants?.primary || '240 70% 60%'})`, color: 'white' }}
                    >
                      Primary
                    </div>
                    <div
                      className="flex-1 text-center text-[11px] font-semibold py-2 rounded-lg"
                      style={{ backgroundColor: `hsl(${ctaVariants?.secondary || '39 95% 50%'})`, color: 'white' }}
                    >
                      Secondary
                    </div>
                  </div>
                </div>
              </div>
            </Section>

            {/* Motion */}
            <Section icon={Zap} title="Motion & Transitions">
              <div className="space-y-2">
                {(['transitionSmooth', 'transitionBounce', 'transitionSpring'] as const).map((key) => (
                  <div key={key}>
                    <span className="text-[10px] text-muted-foreground capitalize">
                      {key.replace('transition', '')}
                    </span>
                    <code className="text-[10px] text-foreground/80 block truncate mt-0.5 bg-muted/50 px-1.5 py-0.5 rounded">
                      {motionConfig?.[key] || 'default'}
                    </code>
                  </div>
                ))}
              </div>
            </Section>

            {/* Style Modules */}
            <Section icon={Layers} title={`Style Modules (${modules.length})`}>
              {modules.length > 0 ? (
                <div className="space-y-2">
                  {modules.map((m) => (
                    <div key={m?.name || 'unknown'} className="flex items-center justify-between bg-muted/30 rounded-lg px-2.5 py-1.5">
                      <span className="text-xs font-medium text-foreground truncate">{m?.name || '?'}</span>
                      <span className="text-[10px] text-muted-foreground shrink-0">
                        {Object.keys(m?.tokens || {}).length} tokens
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-muted-foreground italic">No style modules</p>
              )}
            </Section>

            {/* Integrations */}
            <Section icon={MessageSquare} title="Integrations">
              <div className="space-y-2">
                <StatusLine enabled={!!ghlChatConfig?.sendButtonBg} label="GHL Chat Widget" />
                <StatusLine enabled={adaWidgetConfig?.enabled ?? false} label="ADA Accessibility" />
                {adaWidgetConfig?.enabled && (
                  <div className="pl-6 space-y-1 text-[10px] text-muted-foreground">
                    <p>Position: {adaWidgetConfig?.position || 'bottom-right'}</p>
                    <p>Icon: {adaWidgetConfig?.iconType || 'universal'} ({adaWidgetConfig?.iconShape || 'circle'})</p>
                    <p>Size: {adaWidgetConfig?.iconSize || 48}px</p>
                  </div>
                )}
              </div>
            </Section>

            {/* Logo */}
            {logoVersion && (
              <Section icon={Palette} title="Logo Version">
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Name</span>
                    <span className="font-medium text-foreground">{logoVersion.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Version</span>
                    <span className="font-medium text-foreground">v{logoVersion.version}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Active</span>
                    <span className="font-medium text-foreground">{logoVersion.is_active ? 'Yes' : 'No'}</span>
                  </div>
                  {logoVersion.tagline_text && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tagline</span>
                      <span className="font-medium text-foreground truncate ml-2">{logoVersion.tagline_text}</span>
                    </div>
                  )}
                </div>
              </Section>
            )}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
