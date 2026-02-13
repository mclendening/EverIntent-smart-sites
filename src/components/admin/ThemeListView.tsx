/**
 * @fileoverview ThemeListView — Shopify-style visual theme browser.
 *
 * Each theme is rendered as a card containing a LIVE MINI-MOCKUP that uses
 * the theme's actual color tokens to render a tiny UI preview (nav bar,
 * hero section, CTA button, service cards). Click goes directly to editor.
 *
 * ## Architecture
 * - Cards click directly to the editor (no detail view).
 * - Active theme highlighted with gold border.
 * - Responsive: 1-col mobile, 2-col tablet, 3-col desktop.
 */

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Star, Trash2, CheckCircle } from 'lucide-react';
import type { Theme } from '@/hooks/useThemeAdmin';

// ── Helpers ──────────────────────────────────────────────────

function resolveAccent(theme: Theme): string {
  const cfg = theme.accent_config as Record<string, any> | null;
  return cfg?.accent || '38 92% 50%';
}

function resolveStatic(theme: Theme) {
  const sc = (theme.static_colors || {}) as Record<string, string>;
  return {
    primary: sc.primary || '222 47% 11%',
    primaryForeground: sc.primaryForeground || '0 0% 100%',
    background: sc.background || '0 0% 100%',
    foreground: sc.foreground || '222 47% 11%',
    card: sc.card || '0 0% 100%',
    muted: sc.muted || '60 5% 96%',
    mutedForeground: sc.mutedForeground || '215 16% 47%',
    border: sc.border || '214 32% 91%',
  };
}

function resolveGold(theme: Theme): string {
  const ec = (theme.ecommerce_colors || {}) as Record<string, string>;
  return ec.gold || '43 96% 56%';
}

function hsl(val: string) { return `hsl(${val})`; }

// ── ThemeMockup — Mini-rendered UI using theme tokens ────────

function ThemeMockup({ theme }: { theme: Theme }) {
  const accent = resolveAccent(theme);
  const sc = resolveStatic(theme);
  const gold = resolveGold(theme);

  return (
    <div
      className="w-full aspect-[4/3] rounded-t-md overflow-hidden"
      style={{ backgroundColor: hsl(sc.background), border: `1px solid ${hsl(sc.border)}` }}
    >
      {/* Nav bar */}
      <div
        className="flex items-center justify-between px-3 py-1.5"
        style={{ backgroundColor: hsl(sc.primary) }}
      >
        <div className="flex gap-1.5">
          <div className="w-8 h-1.5 rounded-full" style={{ backgroundColor: hsl(sc.primaryForeground), opacity: 0.9 }} />
          <div className="w-5 h-1.5 rounded-full" style={{ backgroundColor: hsl(sc.primaryForeground), opacity: 0.5 }} />
        </div>
        <div className="w-12 h-4 rounded-sm" style={{ backgroundColor: hsl(accent) }} />
      </div>

      {/* Hero */}
      <div className="px-3 pt-3 pb-2">
        <div className="w-3/4 h-2.5 rounded mb-1.5" style={{ backgroundColor: hsl(sc.foreground) }} />
        <div className="w-1/2 h-2 rounded mb-3" style={{ backgroundColor: hsl(sc.mutedForeground), opacity: 0.6 }} />
        <div className="flex gap-2 mb-3">
          <div className="h-5 w-16 rounded-sm" style={{ backgroundColor: hsl(accent) }} />
          <div className="h-5 w-16 rounded-sm border" style={{ borderColor: hsl(sc.border) }} />
        </div>
      </div>

      {/* Cards row */}
      <div className="px-3 flex gap-1.5">
        {[0, 1, 2].map(i => (
          <div key={i} className="flex-1 rounded-sm p-1.5" style={{ backgroundColor: hsl(sc.card), border: `1px solid ${hsl(sc.border)}` }}>
            <div className="w-full h-3 rounded-sm mb-1" style={{ backgroundColor: hsl(sc.muted) }} />
            <div className="w-2/3 h-1.5 rounded" style={{ backgroundColor: hsl(sc.foreground), opacity: 0.7 }} />
          </div>
        ))}
      </div>

      {/* Gold accent bar */}
      <div className="px-3 mt-2">
        <div className="h-1 rounded-full" style={{ background: `linear-gradient(90deg, ${hsl(gold)}, ${hsl(accent)})` }} />
      </div>
    </div>
  );
}

// ── Main Export ───────────────────────────────────────────────

interface ThemeListViewProps {
  themes: Theme[];
  onSelect: (theme: Theme) => void;
  onSetActive: (theme: Theme) => void;
  onDelete: (theme: Theme) => void;
}

export function ThemeListView({ themes, onSelect, onSetActive, onDelete }: ThemeListViewProps) {
  const [search, setSearch] = useState('');
  const filtered = themes.filter(t => t.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="h-full flex flex-col">
      {/* Search bar */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search themes…" value={search} onChange={e => setSearch(e.target.value)} className="pl-8 h-9" />
        </div>
        <Badge variant="secondary" className="text-xs">{themes.length} theme{themes.length !== 1 ? 's' : ''}</Badge>
      </div>

      {/* Card Grid */}
      <div className="flex-1 overflow-auto p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(theme => (
            <button
              key={theme.id}
              onClick={() => onSelect(theme)}
              className={`group relative text-left rounded-lg transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-ring border-2 ${
                theme.is_active ? 'border-gold shadow-md ring-1 ring-gold/20' : 'border-border hover:border-primary/30'
              }`}
              style={{ backgroundColor: 'hsl(var(--card))' }}
            >
              {theme.is_active && (
                <div className="absolute -top-2 -right-2 z-10">
                  <Badge className="bg-gold text-gold-foreground text-[10px] px-1.5 py-0.5 shadow-sm">
                    <CheckCircle className="h-3 w-3 mr-0.5" />Active
                  </Badge>
                </div>
              )}

              <ThemeMockup theme={theme} />

              <div className="p-3 pt-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-heading font-semibold text-sm text-foreground truncate">{theme.name}</h3>
                  <span className="text-[10px] text-muted-foreground">v{theme.version}</span>
                </div>
                <div className="flex items-center gap-1 mt-1.5">
                  {[resolveStatic(theme).primary, resolveAccent(theme), resolveGold(theme), resolveStatic(theme).background, resolveStatic(theme).muted].map((c, i) => (
                    <div key={i} className="w-4 h-4 rounded-full border border-border" style={{ backgroundColor: hsl(c) }} />
                  ))}
                </div>
                <div className="flex gap-1 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  {!theme.is_active && (
                    <Button variant="ghost" size="sm" className="h-6 text-[10px] px-2" onClick={e => { e.stopPropagation(); onSetActive(theme); }}>
                      <Star className="h-3 w-3 mr-0.5" />Activate
                    </Button>
                  )}
                  <Button variant="ghost" size="sm" className="h-6 text-[10px] px-2 text-destructive hover:text-destructive" onClick={e => { e.stopPropagation(); onDelete(theme); }}>
                    <Trash2 className="h-3 w-3 mr-0.5" />Delete
                  </Button>
                </div>
              </div>
            </button>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            <p className="text-sm">No themes found</p>
          </div>
        )}
      </div>
    </div>
  );
}
