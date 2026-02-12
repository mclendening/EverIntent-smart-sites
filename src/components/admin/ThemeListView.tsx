/**
 * @fileoverview ThemeListView — Premium visual grid for browsing themes.
 *
 * Renders themes as rich visual cards in a responsive grid layout with
 * accent-colored hero banners, palette previews, and status indicators.
 * Designed for an award-winning admin experience that surfaces visual
 * identity at a glance before drilling into detail.
 *
 * ## Architecture
 * - Responsive grid: 1 col mobile, 2 col tablet, 3 col desktop.
 * - Each card shows: gradient/accent hero banner, palette swatches,
 *   theme name, version, module count, mode, and active status.
 * - Search bar filters themes by name in real-time.
 * - Cards use framer-motion for subtle hover lift and staggered entrance.
 * - Full-viewport height (100dvh minus header).
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
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search, Moon, Sun, Monitor, Check, Layers } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Theme } from '@/hooks/useThemeAdmin';
import { getAccentColor, parseHsl, hslToHex } from '@/hooks/useThemeAdmin';

// ─── TYPES ───────────────────────────────────────────────────

interface ThemeListViewProps {
  themes: Theme[];
  onSelect: (theme: Theme) => void;
  onSetActive: (theme: Theme) => void;
  onDelete: (theme: Theme) => void;
}

// ─── HELPERS ─────────────────────────────────────────────────

/** Build a CSS gradient string from accent config for the card hero banner */
function getCardGradient(theme: Theme): string {
  const accent = theme.accent_config as Record<string, any> || {};
  const accentHsl = getAccentColor(theme);
  const { h, s, l } = parseHsl(accentHsl);

  if (accent.useGradient && accent.gradientFrom && accent.gradientTo) {
    return `linear-gradient(${accent.gradientAngle ?? 135}deg, ${accent.gradientFrom}, ${accent.gradientTo})`;
  }

  // Generate a rich gradient from the accent hue
  const fromH = (h - 15 + 360) % 360;
  const toH = (h + 15) % 360;
  return `linear-gradient(135deg, hsl(${fromH} ${Math.min(s + 10, 100)}% ${Math.min(l + 5, 60)}%), hsl(${h} ${s}% ${l}%), hsl(${toH} ${Math.min(s + 10, 100)}% ${Math.max(l - 10, 25)}%))`;
}

/** Extract palette swatches from a theme */
function getPaletteSwatches(theme: Theme): string[] {
  const accentHsl = getAccentColor(theme);
  const staticCols = theme.static_colors as Record<string, string> || {};
  const darkCols = theme.dark_mode_overrides as Record<string, string> || {};
  const ecomCols = theme.ecommerce_colors as Record<string, string> || {};

  return [
    accentHsl,
    staticCols.primary || '222 47% 11%',
    staticCols.background || '0 0% 100%',
    darkCols.background || '222 47% 7%',
    ecomCols.gold || '39 95% 50%',
  ];
}

// ─── COMPONENT ───────────────────────────────────────────────

export function ThemeListView({ themes, onSelect }: ThemeListViewProps) {
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    if (!search.trim()) return themes;
    const q = search.toLowerCase();
    return themes.filter(t => t.name.toLowerCase().includes(q));
  }, [themes, search]);

  return (
    <div className="flex flex-col h-[calc(100dvh-4rem)]">
      {/* Search header */}
      <div className="px-4 py-3 border-b border-border bg-card/50">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-base font-bold text-foreground">Theme Library</h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              {themes.length} theme{themes.length !== 1 ? 's' : ''} · Select to inspect
            </p>
          </div>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <Input
            placeholder="Search themes…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-9 text-sm bg-background"
          />
        </div>
      </div>

      {/* Grid */}
      <ScrollArea className="flex-1">
        <div className="p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((theme, i) => {
              const accentHsl = getAccentColor(theme);
              const { h, s, l } = parseHsl(accentHsl);
              const mode = theme.default_mode || 'dark';
              const ModeIcon = mode === 'dark' ? Moon : mode === 'light' ? Sun : Monitor;
              const modules = theme.style_modules as unknown as any[] || [];
              const moduleCount = Array.isArray(modules) ? modules.length : 0;
              const swatches = getPaletteSwatches(theme);
              const gradient = getCardGradient(theme);

              return (
                <motion.button
                  key={theme.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03, duration: 0.3 }}
                  whileHover={{ y: -2 }}
                  onClick={() => onSelect(theme)}
                  className="group relative rounded-xl border border-border bg-card overflow-hidden text-left transition-shadow hover:shadow-lg hover:shadow-accent/5 hover:border-accent/30 focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
                >
                  {/* Accent hero banner */}
                  <div
                    className="h-24 sm:h-28 w-full relative"
                    style={{ background: gradient }}
                  >
                    {/* Subtle mesh overlay */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.15),transparent_60%)]" />

                    {/* Active indicator */}
                    {theme.is_active && (
                      <div className="absolute top-2.5 right-2.5 flex items-center gap-1 bg-black/40 backdrop-blur-sm text-white text-[10px] font-semibold px-2 py-0.5 rounded-md">
                        <Check className="h-3 w-3" />
                        Active
                      </div>
                    )}

                    {/* HSL readout */}
                    <div className="absolute bottom-2.5 left-2.5 font-mono text-[10px] text-white/70 bg-black/20 backdrop-blur-sm px-1.5 py-0.5 rounded">
                      {Math.round(h)}° {Math.round(s)}% {Math.round(l)}%
                    </div>
                  </div>

                  {/* Card body */}
                  <div className="p-3.5">
                    {/* Name row */}
                    <div className="flex items-start justify-between gap-2 mb-2.5">
                      <div className="min-w-0">
                        <h3 className="text-sm font-semibold text-foreground truncate group-hover:text-accent transition-colors">
                          {theme.name}
                        </h3>
                        <p className="text-[11px] text-muted-foreground mt-0.5">
                          v{theme.version} · {moduleCount} module{moduleCount !== 1 ? 's' : ''}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground shrink-0">
                        <ModeIcon className="h-3.5 w-3.5" />
                        <span className="text-[10px] capitalize">{mode}</span>
                      </div>
                    </div>

                    {/* Palette preview */}
                    <div className="flex gap-1">
                      {swatches.map((swatch, j) => (
                        <div
                          key={j}
                          className="h-5 flex-1 rounded-sm border border-border/50 first:rounded-l-md last:rounded-r-md"
                          style={{ backgroundColor: `hsl(${swatch})` }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16 text-muted-foreground">
              <Layers className="h-8 w-8 mx-auto mb-3 opacity-40" />
              <p className="text-sm font-medium">No themes found</p>
              <p className="text-xs mt-1">
                {search ? 'Try a different search term' : 'Create a theme to get started'}
              </p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
