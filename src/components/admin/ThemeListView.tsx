/**
 * @fileoverview ThemeListView — Full-viewport mobile-first theme list.
 *
 * Renders a scrollable list of high-density theme cards optimized for 390px
 * viewports. Each card shows: accent color swatch strip, theme name, active/mode
 * badges, and version number. Tapping a card drills down to ThemeDetailView.
 *
 * ## Architecture
 * - Full-viewport height (100dvh minus header) — no split panels on mobile.
 * - Cards are 56px tall on mobile with accent swatch, metadata, and badges.
 * - "Publish to Prod" and global actions remain in the page header (Themes.tsx).
 *
 * ## Data Contract
 * - `themes`: Array of site_themes rows.
 * - `onSelect`: Callback with theme row — triggers drill-down navigation.
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

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Check, Moon, Sun, Monitor, Trash2 } from 'lucide-react';
import type { Theme } from '@/hooks/useThemeAdmin';
import { getAccentColor } from '@/hooks/useThemeAdmin';

// ─── TYPES ───────────────────────────────────────────────────

interface ThemeListViewProps {
  themes: Theme[];
  onSelect: (theme: Theme) => void;
  onSetActive: (theme: Theme) => void;
  onDelete: (theme: Theme) => void;
}

// ─── COMPONENT ───────────────────────────────────────────────

export function ThemeListView({ themes, onSelect, onSetActive, onDelete }: ThemeListViewProps) {
  return (
    <div className="flex flex-col h-[calc(100dvh-4rem)]">
      {/* Header */}
      <div className="px-3 py-2 border-b border-border flex items-center justify-between">
        <h2 className="text-sm font-semibold">Themes ({themes.length})</h2>
      </div>

      {/* Scrollable list */}
      <ScrollArea className="flex-1">
        <div className="p-2 space-y-1.5">
          {themes.map((theme) => {
            const accentHsl = getAccentColor(theme);
            const staticCols = theme.static_colors as Record<string, string> || {};
            const mode = theme.default_mode || 'dark';
            const ModeIcon = mode === 'dark' ? Moon : mode === 'light' ? Sun : Monitor;

            // Count enabled modules
            const modules = theme.style_modules as unknown as any[] || [];
            const moduleCount = Array.isArray(modules) ? modules.length : 0;

            return (
              <button
                key={theme.id}
                onClick={() => onSelect(theme)}
                className="w-full flex items-stretch rounded-lg border border-border bg-card hover:border-accent/40 transition-colors overflow-hidden text-left"
              >
                {/* Accent swatch strip */}
                <div
                  className="w-2 shrink-0"
                  style={{ backgroundColor: `hsl(${accentHsl})` }}
                />

                {/* Content */}
                <div className="flex-1 min-w-0 px-3 py-2.5 flex items-center gap-3">
                  {/* Color previews */}
                  <div className="flex gap-0.5 shrink-0">
                    <div className="h-6 w-6 rounded-sm border border-border/50" style={{ backgroundColor: `hsl(${accentHsl})` }} />
                    <div className="h-6 w-6 rounded-sm border border-border/50" style={{ backgroundColor: `hsl(${staticCols.primary || '222 47% 11%'})` }} />
                    <div className="h-6 w-6 rounded-sm border border-border/50" style={{ backgroundColor: `hsl(${staticCols.background || '0 0% 100%'})` }} />
                  </div>

                  {/* Name + metadata */}
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-medium truncate">{theme.name}</div>
                    <div className="text-[10px] text-muted-foreground mt-0.5">
                      v{theme.version} · {moduleCount} module{moduleCount !== 1 ? 's' : ''}
                    </div>
                  </div>

                  {/* Badges */}
                  <div className="flex gap-1 shrink-0 items-center">
                    {theme.is_active && (
                      <Badge className="text-[9px] h-4 px-1.5 gap-0.5">
                        <Check className="h-2.5 w-2.5" />
                        Active
                      </Badge>
                    )}
                    <Badge variant="outline" className="text-[9px] h-4 px-1.5 gap-0.5 capitalize">
                      <ModeIcon className="h-2.5 w-2.5" />
                      {mode}
                    </Badge>
                  </div>
                </div>
              </button>
            );
          })}

          {themes.length === 0 && (
            <div className="text-center py-12 text-muted-foreground text-sm">
              No themes found. Create one to get started.
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
