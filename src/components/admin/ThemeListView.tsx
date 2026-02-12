/**
 * @fileoverview ThemeListView — Professional theme administration hub.
 *
 * Renders a high-density, Shopify-inspired table view of themes with inline
 * color chips, status indicators, and quick actions. Designed for rapid
 * scanning and selection — prioritizes information density over decoration.
 *
 * ## Design Philosophy (informed by Shopify, Webflow, Figma admin patterns)
 * - **Table layout** with semantic rows, not cards with giant decorative banners.
 * - **Inline color chips** (small circles/squares) show palette at a glance.
 * - **Quick actions** (activate, delete) accessible without drilling down.
 * - **Search + filter** for fast theme lookup in large libraries.
 * - **Subtle row hover** with accent border — no heavy animations.
 *
 * ## Architecture
 * - Full-viewport height (100dvh minus global header).
 * - Responsive: table on desktop, compact list on mobile.
 * - Each row: accent chip, name, version, module count, mode, palette, status, actions.
 *
 * ## Data Contract
 * - `themes`: Array of site_themes rows from Supabase.
 * - `onSelect`: Callback with theme row — triggers drill-down to detail.
 * - `onSetActive`: Callback to activate a theme.
 * - `onDelete`: Callback to delete a theme.
 *
 * ## Security
 * - Admin-only (parent is AdminGuard-protected).
 *
 * ## SSG Compatibility
 * - Admin-only, not SSG-rendered.
 *
 * ## Portability
 * - Copy with useThemeAdmin.ts. Only needs theme rows and callbacks.
 */

import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search, Moon, Sun, Monitor, Check, Trash2, ChevronRight } from 'lucide-react';
import type { Theme } from '@/hooks/useThemeAdmin';
import { getAccentColor, parseHsl } from '@/hooks/useThemeAdmin';

// ─── TYPES ───────────────────────────────────────────────────

interface ThemeListViewProps {
  themes: Theme[];
  onSelect: (theme: Theme) => void;
  onSetActive: (theme: Theme) => void;
  onDelete: (theme: Theme) => void;
}

// ─── HELPERS ─────────────────────────────────────────────────

/** Extract 5 key palette colors as HSL strings */
function getPalette(theme: Theme): string[] {
  const accentHsl = getAccentColor(theme);
  const sc = theme.static_colors as Record<string, string> || {};
  const dc = theme.dark_mode_overrides as Record<string, string> || {};
  const ec = theme.ecommerce_colors as Record<string, string> || {};
  return [
    accentHsl,
    sc.background || '0 0% 100%',
    sc.foreground || '222 47% 11%',
    dc.background || '222 47% 7%',
    ec.gold || '39 95% 50%',
  ];
}

// ─── COMPONENT ───────────────────────────────────────────────

export function ThemeListView({ themes, onSelect, onSetActive, onDelete }: ThemeListViewProps) {
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    if (!search.trim()) return themes;
    const q = search.toLowerCase();
    return themes.filter(t => t.name.toLowerCase().includes(q));
  }, [themes, search]);

  return (
    <div className="flex flex-col h-[calc(100dvh-4rem)]">
      {/* Header bar */}
      <div className="px-4 sm:px-6 py-4 border-b border-border">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-sm font-semibold text-foreground">Themes</h2>
            <p className="text-xs text-muted-foreground">{themes.length} theme{themes.length !== 1 ? 's' : ''}</p>
          </div>
          <div className="relative w-56 sm:w-72">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <Input
              placeholder="Search…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8 h-8 text-xs"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <ScrollArea className="flex-1">
        {/* Desktop table header */}
        <div className="hidden sm:grid grid-cols-[auto_1fr_auto_auto_auto_auto_auto] gap-x-4 px-6 py-2 border-b border-border text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
          <span className="w-3" />
          <span>Name</span>
          <span>Version</span>
          <span>Modules</span>
          <span>Mode</span>
          <span>Palette</span>
          <span className="text-right">Actions</span>
        </div>

        <div className="divide-y divide-border">
          {filtered.map((theme) => {
            const accentHsl = getAccentColor(theme);
            const { h, s, l } = parseHsl(accentHsl);
            const mode = theme.default_mode || 'dark';
            const ModeIcon = mode === 'dark' ? Moon : mode === 'light' ? Sun : Monitor;
            const modules = theme.style_modules as unknown as any[] || [];
            const moduleCount = Array.isArray(modules) ? modules.length : 0;
            const palette = getPalette(theme);

            return (
              <button
                key={theme.id}
                onClick={() => onSelect(theme)}
                className="w-full text-left group transition-colors hover:bg-muted/30 focus-visible:bg-muted/30 focus-visible:outline-none"
              >
                {/* Mobile row */}
                <div className="sm:hidden px-4 py-3 flex items-center gap-3">
                  {/* Accent dot */}
                  <div
                    className="w-3 h-3 rounded-full shrink-0 ring-1 ring-border"
                    style={{ backgroundColor: `hsl(${accentHsl})` }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium truncate">{theme.name}</span>
                      {theme.is_active && (
                        <span className="text-[9px] font-semibold text-accent bg-accent/10 px-1.5 py-0.5 rounded">Active</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-0.5 text-[10px] text-muted-foreground">
                      <span>v{theme.version}</span>
                      <span>·</span>
                      <span>{moduleCount} modules</span>
                      <span>·</span>
                      <ModeIcon className="h-2.5 w-2.5 inline" />
                      <span className="capitalize">{mode}</span>
                    </div>
                  </div>
                  {/* Mini palette */}
                  <div className="flex gap-0.5 shrink-0">
                    {palette.map((c, i) => (
                      <div key={i} className="w-4 h-4 rounded-sm ring-1 ring-border/50" style={{ backgroundColor: `hsl(${c})` }} />
                    ))}
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground/40 shrink-0" />
                </div>

                {/* Desktop row */}
                <div className="hidden sm:grid grid-cols-[auto_1fr_auto_auto_auto_auto_auto] gap-x-4 items-center px-6 py-2.5">
                  {/* Accent indicator */}
                  <div
                    className="w-3 h-3 rounded-full ring-1 ring-border"
                    style={{ backgroundColor: `hsl(${accentHsl})` }}
                  />
                  {/* Name + active badge */}
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-sm font-medium truncate group-hover:text-accent transition-colors">
                      {theme.name}
                    </span>
                    {theme.is_active && (
                      <span className="text-[9px] font-semibold text-accent bg-accent/10 px-1.5 py-0.5 rounded flex items-center gap-0.5">
                        <Check className="h-2.5 w-2.5" /> Active
                      </span>
                    )}
                  </div>
                  {/* Version */}
                  <span className="text-xs text-muted-foreground tabular-nums">v{theme.version}</span>
                  {/* Modules */}
                  <span className="text-xs text-muted-foreground tabular-nums">{moduleCount}</span>
                  {/* Mode */}
                  <span className="flex items-center gap-1 text-xs text-muted-foreground capitalize">
                    <ModeIcon className="h-3 w-3" /> {mode}
                  </span>
                  {/* Palette chips */}
                  <div className="flex gap-0.5">
                    {palette.map((c, i) => (
                      <div key={i} className="w-5 h-5 rounded-sm ring-1 ring-border/50" style={{ backgroundColor: `hsl(${c})` }} />
                    ))}
                  </div>
                  {/* Actions */}
                  <div className="flex gap-1 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                    {!theme.is_active && (
                      <>
                        <Button
                          variant="ghost" size="sm"
                          className="h-6 w-6 p-0 text-muted-foreground hover:text-accent"
                          onClick={(e) => { e.stopPropagation(); onSetActive(theme); }}
                          title="Set as active"
                        >
                          <Check className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost" size="sm"
                          className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive"
                          onClick={(e) => { e.stopPropagation(); onDelete(theme); }}
                          title="Delete theme"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </>
                    )}
                    <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/40" />
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            <p className="text-sm">{search ? 'No themes match your search.' : 'No themes found.'}</p>
          </div>
        )}
      </ScrollArea>
    </div>
  );
}
