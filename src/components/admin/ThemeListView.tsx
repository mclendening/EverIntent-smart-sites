/**
 * @fileoverview ThemeListView — WordPress/Shopify-style theme browser with visual previews.
 *
 * Each theme card contains a LIVE MINI-MOCKUP showing actual UI components
 * (nav bar, card, button, input) rendered with that theme's real color tokens.
 * This lets admins visually compare themes at a glance — not just read data.
 *
 * ## Design Pattern
 * - Inspired by WordPress theme browser, Shopify theme selector, shadcn theme editor.
 * - Each card = mini website preview + metadata footer.
 * - Responsive grid: 1 col mobile, 2 col tablet, 3 col desktop.
 */

import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search, Check, Trash2, Star } from 'lucide-react';
import type { Theme } from '@/hooks/useThemeAdmin';
import { getAccentColor } from '@/hooks/useThemeAdmin';

interface ThemeListViewProps {
  themes: Theme[];
  onSelect: (theme: Theme) => void;
  onSetActive: (theme: Theme) => void;
  onDelete: (theme: Theme) => void;
}

/** Extract key colors from a theme for rendering the mini mockup */
function getThemeColors(theme: Theme) {
  const sc = (theme.static_colors || {}) as Record<string, string>;
  const dc = (theme.dark_mode_overrides || {}) as Record<string, string>;
  const ec = (theme.ecommerce_colors || {}) as Record<string, string>;
  const tc = (theme.typography_config || {}) as Record<string, string>;
  const accent = getAccentColor(theme);
  const mode = theme.default_mode || 'dark';
  const isDark = mode === 'dark';

  // Use the appropriate palette based on default mode
  const bg = isDark ? (dc.background || '222 47% 7%') : (sc.background || '0 0% 100%');
  const fg = isDark ? (dc.foreground || '60 9% 98%') : (sc.foreground || '222 47% 11%');
  const card = isDark ? (dc.card || '222 47% 11%') : (sc.card || '0 0% 100%');
  const cardFg = isDark ? (dc.cardForeground || '60 9% 98%') : (sc.cardForeground || '222 47% 11%');
  const muted = isDark ? (dc.muted || '217 33% 17%') : (sc.muted || '60 5% 96%');
  const mutedFg = isDark ? (dc.mutedForeground || '215 16% 47%') : (sc.mutedForeground || '215 16% 47%');
  const border = isDark ? (dc.border || '217 19% 27%') : (sc.border || '220 13% 91%');
  const primary = isDark ? (dc.primary || '60 9% 98%') : (sc.primary || '222 47% 11%');
  const gold = ec.gold || '39 95% 50%';
  const headingFont = tc.fontHeading || 'system-ui, sans-serif';
  const bodyFont = tc.fontBody || 'system-ui, sans-serif';

  return { bg, fg, card, cardFg, muted, mutedFg, border, primary, accent, gold, headingFont, bodyFont, isDark };
}

/** Mini website mockup rendered with theme colors */
function ThemeMockup({ theme }: { theme: Theme }) {
  const c = getThemeColors(theme);

  return (
    <div
      className="w-full aspect-[4/3] rounded-t-lg overflow-hidden relative select-none"
      style={{ backgroundColor: `hsl(${c.bg})` }}
    >
      {/* Mini nav bar */}
      <div
        className="flex items-center justify-between px-3 py-1.5"
        style={{ backgroundColor: `hsl(${c.primary})`, borderBottom: `1px solid hsl(${c.border})` }}
      >
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: `hsl(${c.accent})` }} />
          <div className="w-12 h-1.5 rounded-full" style={{ backgroundColor: `hsl(${c.fg})`, opacity: 0.7 }} />
        </div>
        <div className="flex gap-2">
          {[1, 2, 3].map(i => (
            <div key={i} className="w-6 h-1 rounded-full" style={{ backgroundColor: `hsl(${c.fg})`, opacity: 0.3 }} />
          ))}
        </div>
      </div>

      {/* Hero section */}
      <div className="px-3 pt-3 pb-2">
        <div className="w-24 h-2 rounded mb-1" style={{ backgroundColor: `hsl(${c.fg})`, opacity: 0.8, fontFamily: c.headingFont }} />
        <div className="w-32 h-1.5 rounded mb-2" style={{ backgroundColor: `hsl(${c.mutedFg})`, opacity: 0.5 }} />
        <div
          className="w-14 h-4 rounded-sm flex items-center justify-center"
          style={{ backgroundColor: `hsl(${c.accent})` }}
        >
          <span style={{ color: 'white', fontSize: '5px', fontWeight: 600 }}>Get Started</span>
        </div>
      </div>

      {/* Card row */}
      <div className="px-3 flex gap-1.5">
        {[1, 2, 3].map(i => (
          <div
            key={i}
            className="flex-1 rounded-sm p-1.5"
            style={{ backgroundColor: `hsl(${c.card})`, border: `0.5px solid hsl(${c.border})` }}
          >
            <div className="w-full h-3 rounded-sm mb-1" style={{ backgroundColor: `hsl(${c.muted})` }} />
            <div className="w-3/4 h-1 rounded-full mb-0.5" style={{ backgroundColor: `hsl(${c.cardFg})`, opacity: 0.6 }} />
            <div className="w-1/2 h-1 rounded-full" style={{ backgroundColor: `hsl(${c.mutedFg})`, opacity: 0.4 }} />
          </div>
        ))}
      </div>

      {/* Bottom section — input + gold CTA */}
      <div className="px-3 pt-2 flex gap-1.5 items-center">
        <div
          className="flex-1 h-4 rounded-sm px-1.5 flex items-center"
          style={{ backgroundColor: `hsl(${c.card})`, border: `0.5px solid hsl(${c.border})` }}
        >
          <span style={{ color: `hsl(${c.mutedFg})`, fontSize: '4px', opacity: 0.5 }}>Enter email...</span>
        </div>
        <div
          className="h-4 px-2 rounded-sm flex items-center"
          style={{ backgroundColor: `hsl(${c.gold})` }}
        >
          <span style={{ color: 'white', fontSize: '4px', fontWeight: 700 }}>Subscribe</span>
        </div>
      </div>
    </div>
  );
}

export function ThemeListView({ themes, onSelect, onSetActive, onDelete }: ThemeListViewProps) {
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    if (!search.trim()) return themes;
    const q = search.toLowerCase();
    return themes.filter(t => t.name.toLowerCase().includes(q));
  }, [themes, search]);

  return (
    <div className="flex flex-col h-[calc(100dvh-4rem)]">
      {/* Header */}
      <div className="px-4 sm:px-6 py-4 border-b border-border shrink-0">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-foreground">Theme Hub</h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              {themes.length} theme{themes.length !== 1 ? 's' : ''} · Click to inspect
            </p>
          </div>
          <div className="relative w-56 sm:w-72">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <Input
              placeholder="Search themes…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8 h-8 text-xs"
            />
          </div>
        </div>
      </div>

      {/* Theme grid */}
      <ScrollArea className="flex-1">
        <div className="p-4 sm:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
            {filtered.map((theme) => {
              const accent = getAccentColor(theme);
              const modules = Array.isArray(theme.style_modules) ? (theme.style_modules as any[]) : [];

              return (
                <div
                  key={theme.id}
                  onClick={() => onSelect(theme)}
                  className="group cursor-pointer rounded-lg border border-border bg-card overflow-hidden transition-all hover:border-accent/50 hover:shadow-lg hover:shadow-accent/5 hover:-translate-y-0.5"
                >
                  {/* Visual preview */}
                  <ThemeMockup theme={theme} />

                  {/* Info footer */}
                  <div className="p-3 border-t border-border">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="text-sm font-semibold truncate">{theme.name}</span>
                        {theme.is_active && (
                          <span className="flex items-center gap-0.5 text-[9px] font-bold uppercase tracking-wider text-accent bg-accent/10 px-1.5 py-0.5 rounded-full">
                            <Star className="h-2.5 w-2.5 fill-current" /> Active
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-muted-foreground tabular-nums">v{theme.version}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      {/* Palette strip */}
                      <div className="flex gap-0.5">
                        {(() => {
                          const tc = getThemeColors(theme);
                          return [tc.bg, tc.fg, tc.accent, tc.card, tc.muted, tc.gold].map((c, i) => (
                            <div key={i} className="w-4 h-4 rounded-sm ring-1 ring-border/40" style={{ backgroundColor: `hsl(${c})` }} />
                          ));
                        })()}
                      </div>

                      {/* Hover actions */}
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        {!theme.is_active && (
                          <>
                            <Button
                              variant="ghost" size="sm"
                              className="h-6 w-6 p-0 text-muted-foreground hover:text-accent"
                              onClick={(e) => { e.stopPropagation(); onSetActive(theme); }}
                              title="Activate"
                            >
                              <Check className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="ghost" size="sm"
                              className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive"
                              onClick={(e) => { e.stopPropagation(); onDelete(theme); }}
                              title="Delete"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mt-1.5 text-[10px] text-muted-foreground">
                      <span className="capitalize">{theme.default_mode || 'dark'} mode</span>
                      <span>·</span>
                      <span>{modules.length} modules</span>
                      {theme.changelog_notes && (
                        <>
                          <span>·</span>
                          <span className="truncate">{theme.changelog_notes}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-muted-foreground">
              <p className="text-sm">{search ? 'No themes match your search.' : 'No themes found.'}</p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
