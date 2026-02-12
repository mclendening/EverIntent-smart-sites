/**
 * @fileoverview ThemeDetailView — Professional read-only theme inspection.
 *
 * Provides a Webflow/Figma-inspired detail view with a compact identity header,
 * organized property groups, and live preview elements. Designed for quick
 * auditing before entering edit mode.
 *
 * ## Design Philosophy (informed by Shopify, Webflow, Figma admin patterns)
 * - **Compact identity header** with accent chip, name, status — NOT a giant banner.
 * - **Property groups** with clear labels and inline values — like a CSS inspector.
 * - **Live previews** where meaningful (font samples, gradient strips, CTA buttons).
 * - **High information density** — everything visible without excessive scrolling.
 *
 * ## Architecture
 * - Full-viewport layout (100dvh minus header).
 * - Sticky top bar with back, name, and action buttons.
 * - Two-column layout on desktop, single column on mobile.
 * - Property groups use consistent label/value patterns.
 *
 * ## Data Contract
 * - Receives parsed theme config states from useThemeAdmin hook.
 * - All JSONB-sourced values guarded with optional chaining and fallbacks.
 *
 * ## Portability
 * - Copy with useThemeAdmin.ts + types referenced in props.
 */

import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  ArrowLeft, Edit, Trash2, Check, Download, Eye,
  Sun, Moon, Monitor, X,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Theme, LogoVersion, AccentConfig, StaticColors, GradientConfig, GHLChatConfig } from '@/hooks/useThemeAdmin';
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

// ─── HELPERS ─────────────────────────────────────────────────

const FALLBACK_FONT = 'system-ui, sans-serif';

function safeHsl(obj: Record<string, string> | null | undefined, key: string, fallback = '0 0% 50%'): string {
  return obj?.[key] || fallback;
}

/** Property group header */
function GroupHeader({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2 mt-4 first:mt-0">
      {children}
    </h3>
  );
}

/** Key-value property row */
function Prop({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between py-1.5 border-b border-border/50 last:border-0">
      <span className="text-xs text-muted-foreground">{label}</span>
      <div className="text-xs text-foreground font-medium">{children}</div>
    </div>
  );
}

/** Color swatch chip (inline, small) */
function Chip({ color, label }: { color: string; label?: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <div
        className="w-4 h-4 rounded-sm ring-1 ring-border/50 shrink-0"
        style={{ backgroundColor: `hsl(${color})` }}
      />
      {label && <span className="text-[10px] text-muted-foreground">{label}</span>}
    </div>
  );
}

/** Palette row — horizontal strip of color chips */
function PaletteRow({ colors, labels }: { colors: string[]; labels: string[] }) {
  return (
    <div className="flex gap-1.5 flex-wrap">
      {colors.map((c, i) => (
        <div key={i} className="text-center">
          <div className="w-7 h-7 rounded-md ring-1 ring-border/50" style={{ backgroundColor: `hsl(${c})` }} />
          <span className="text-[8px] text-muted-foreground mt-0.5 block">{labels[i]}</span>
        </div>
      ))}
    </div>
  );
}

/** Status indicator */
function Status({ enabled, label }: { enabled: boolean; label: string }) {
  return (
    <div className="flex items-center gap-1.5">
      {enabled
        ? <Check className="h-3 w-3 text-accent" />
        : <X className="h-3 w-3 text-muted-foreground/30" />}
      <span className={`text-xs ${enabled ? 'text-foreground' : 'text-muted-foreground'}`}>{label}</span>
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
  const ModeIcon = defaultMode === 'dark' ? Moon : defaultMode === 'light' ? Sun : Monitor;
  const modules = Array.isArray(styleModules) ? styleModules : [];
  const headingFont = typographyConfig?.fontHeading || FALLBACK_FONT;
  const bodyFont = typographyConfig?.fontBody || FALLBACK_FONT;

  return (
    <div className="flex flex-col h-[calc(100dvh-4rem)]">
      {/* Action bar */}
      <div className="px-4 sm:px-6 py-2.5 border-b border-border flex items-center gap-3 shrink-0">
        <Button variant="ghost" size="sm" className="px-2" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        {/* Identity cluster */}
        <div
          className="w-4 h-4 rounded-full ring-1 ring-border shrink-0"
          style={{ backgroundColor: `hsl(${accentHsl})` }}
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold truncate">{theme.name}</span>
            {theme.is_active && (
              <span className="text-[9px] font-semibold text-accent bg-accent/10 px-1.5 py-0.5 rounded">Active</span>
            )}
          </div>
          <div className="text-[10px] text-muted-foreground flex items-center gap-1.5">
            <span>v{theme.version}</span>
            <span>·</span>
            <ModeIcon className="h-2.5 w-2.5" />
            <span className="capitalize">{defaultMode}</span>
            <span>·</span>
            <span>{modules.length} modules</span>
          </div>
        </div>
        {/* Actions */}
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
            <Button variant="outline" size="sm" className="h-7 w-7 p-0" title="Preview">
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
            <Edit className="h-3 w-3 mr-1" /> Edit
          </Button>
        </div>
      </div>

      {/* Content */}
      <ScrollArea className="flex-1">
        <div className="p-4 sm:p-6 max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-0">
            {/* ─── Left Column ─── */}
            <div>
              {/* Accent */}
              <GroupHeader>Accent Color</GroupHeader>
              <Prop label="HSL">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-md ring-1 ring-border" style={{ backgroundColor: `hsl(${accentHsl})` }} />
                  <code className="text-[10px] font-mono">{Math.round(h)}° {Math.round(s)}% {Math.round(l)}%</code>
                </div>
              </Prop>
              <Prop label="Gradient">{accentConfig?.useGradient ? 'Enabled' : 'Off'}</Prop>
              {accentConfig?.useGradient && (
                <Prop label="Preview">
                  <div
                    className="w-24 h-4 rounded-sm ring-1 ring-border"
                    style={{ background: `linear-gradient(${accentConfig.gradientAngle ?? 90}deg, ${accentConfig.gradientFrom}, ${accentConfig.gradientTo})` }}
                  />
                </Prop>
              )}

              {/* Light palette */}
              <GroupHeader>Light Palette</GroupHeader>
              <div className="mb-3">
                <PaletteRow
                  colors={[
                    safeHsl(staticColors as any, 'background', '0 0% 100%'),
                    safeHsl(staticColors as any, 'foreground', '222 47% 11%'),
                    safeHsl(staticColors as any, 'primary', '222 47% 11%'),
                    safeHsl(staticColors as any, 'secondary', '60 9% 98%'),
                    safeHsl(staticColors as any, 'card', '0 0% 100%'),
                    safeHsl(staticColors as any, 'muted', '60 5% 96%'),
                    safeHsl(staticColors as any, 'border', '220 13% 91%'),
                  ]}
                  labels={['BG', 'FG', 'Pri', 'Sec', 'Card', 'Mut', 'Bdr']}
                />
              </div>

              {/* Dark palette */}
              <GroupHeader>Dark Palette</GroupHeader>
              <div className="mb-3">
                <PaletteRow
                  colors={[
                    safeHsl(darkModeOverrides as any, 'background', '222 47% 7%'),
                    safeHsl(darkModeOverrides as any, 'foreground', '60 9% 98%'),
                    safeHsl(darkModeOverrides as any, 'primary', '60 9% 98%'),
                    safeHsl(darkModeOverrides as any, 'secondary', '217 33% 17%'),
                    safeHsl(darkModeOverrides as any, 'card', '222 47% 7%'),
                    safeHsl(darkModeOverrides as any, 'muted', '217 33% 17%'),
                    safeHsl(darkModeOverrides as any, 'border', '217 19% 27%'),
                  ]}
                  labels={['BG', 'FG', 'Pri', 'Sec', 'Card', 'Mut', 'Bdr']}
                />
              </div>

              {/* Typography */}
              <GroupHeader>Typography</GroupHeader>
              <Prop label="Heading">
                <span className="font-semibold" style={{ fontFamily: headingFont }}>
                  {headingFont.split(',')[0]?.trim()}
                </span>
              </Prop>
              <Prop label="Body">
                <span style={{ fontFamily: bodyFont }}>
                  {bodyFont.split(',')[0]?.trim()}
                </span>
              </Prop>
              <Prop label="Preview">
                <span className="text-[11px]" style={{ fontFamily: bodyFont }}>
                  The quick brown fox…
                </span>
              </Prop>
            </div>

            {/* ─── Right Column ─── */}
            <div>
              {/* Gradients */}
              <GroupHeader>Gradients</GroupHeader>
              {gradientConfigs?.hero ? (
                <Prop label="Hero">
                  <div className="w-24 h-4 rounded-sm ring-1 ring-border" style={{ background: gradientConfigs.hero }} />
                </Prop>
              ) : <Prop label="Hero"><span className="text-muted-foreground italic">—</span></Prop>}
              {gradientConfigs?.cta ? (
                <Prop label="CTA">
                  <div className="w-24 h-4 rounded-sm ring-1 ring-border" style={{ background: gradientConfigs.cta }} />
                </Prop>
              ) : <Prop label="CTA"><span className="text-muted-foreground italic">—</span></Prop>}
              {gradientConfigs?.text ? (
                <Prop label="Text">
                  <div className="w-24 h-4 rounded-sm ring-1 ring-border" style={{ background: gradientConfigs.text }} />
                </Prop>
              ) : <Prop label="Text"><span className="text-muted-foreground italic">—</span></Prop>}

              {/* Commerce */}
              <GroupHeader>Commerce & CTA</GroupHeader>
              <Prop label="Gold">
                <div className="flex gap-1">
                  <Chip color={ecommerceColors?.gold || '39 95% 50%'} />
                  <Chip color={ecommerceColors?.goldHover || '35 95% 44%'} />
                  <Chip color={ecommerceColors?.goldGlow || '39 95% 60%'} />
                </div>
              </Prop>
              <Prop label="CTA Primary">
                <div className="flex items-center gap-2">
                  <div
                    className="px-3 py-0.5 rounded text-[10px] font-semibold text-white"
                    style={{ backgroundColor: `hsl(${ctaVariants?.primary || '240 70% 60%'})` }}
                  >
                    Button
                  </div>
                </div>
              </Prop>
              <Prop label="CTA Secondary">
                <div className="flex items-center gap-2">
                  <div
                    className="px-3 py-0.5 rounded text-[10px] font-semibold text-white"
                    style={{ backgroundColor: `hsl(${ctaVariants?.secondary || '39 95% 50%'})` }}
                  >
                    Button
                  </div>
                </div>
              </Prop>

              {/* Motion */}
              <GroupHeader>Motion</GroupHeader>
              <Prop label="Smooth">
                <code className="text-[9px] font-mono text-muted-foreground">{motionConfig?.transitionSmooth || '—'}</code>
              </Prop>
              <Prop label="Bounce">
                <code className="text-[9px] font-mono text-muted-foreground">{motionConfig?.transitionBounce || '—'}</code>
              </Prop>
              <Prop label="Spring">
                <code className="text-[9px] font-mono text-muted-foreground">{motionConfig?.transitionSpring || '—'}</code>
              </Prop>

              {/* Style Modules */}
              <GroupHeader>Style Modules ({modules.length})</GroupHeader>
              {modules.length > 0 ? modules.map((m) => (
                <Prop key={m?.name} label={m?.name || '?'}>
                  <span className="text-muted-foreground">{Object.keys(m?.tokens || {}).length} tokens</span>
                </Prop>
              )) : (
                <p className="text-xs text-muted-foreground italic py-1.5">None</p>
              )}

              {/* Integrations */}
              <GroupHeader>Integrations</GroupHeader>
              <div className="space-y-1.5 py-1">
                <Status enabled={!!ghlChatConfig?.sendButtonBg} label="GHL Chat Widget" />
                <Status enabled={adaWidgetConfig?.enabled ?? false} label="ADA Accessibility" />
              </div>
              {adaWidgetConfig?.enabled && (
                <>
                  <Prop label="Position">{adaWidgetConfig.position || 'bottom-right'}</Prop>
                  <Prop label="Icon">{adaWidgetConfig.iconType || 'universal'} · {adaWidgetConfig.iconShape || 'circle'} · {adaWidgetConfig.iconSize || 48}px</Prop>
                </>
              )}

              {/* Logo */}
              {logoVersion && (
                <>
                  <GroupHeader>Logo</GroupHeader>
                  <Prop label="Name">{logoVersion.name}</Prop>
                  <Prop label="Version">v{logoVersion.version}</Prop>
                  <Prop label="Active">{logoVersion.is_active ? 'Yes' : 'No'}</Prop>
                  {logoVersion.tagline_text && <Prop label="Tagline">{logoVersion.tagline_text}</Prop>}
                </>
              )}
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
