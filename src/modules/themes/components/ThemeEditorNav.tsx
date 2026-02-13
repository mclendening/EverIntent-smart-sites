/**
 * @fileoverview Theme Editor Navigation — mobile-first horizontal pill bar + desktop sidebar.
 *
 * Provides the navigation interface for the theme editor, enabling users to
 * switch between editor panels (Accent, Typography, Gradients, etc.).
 *
 * ## Architecture
 * - **Mobile (default)**: Horizontal scrollable pill bar for top-level groups
 *   (Brand, Appearance, etc.) with sections listed as compact buttons below.
 *   Optimized for thumb-reach on 390px+ viewports — the primary admin device.
 * - **Desktop (lg+)**: VS Code-style vertical sidebar with grouped sections.
 * - Section IDs are typed as `EditorSection` union — used by ThemeEditorPanels
 *   to conditionally render the active panel.
 *
 * ## Groups (feature-first organization)
 * - **Brand Identity**: Accent Color, Logo Config, Typography.
 * - **Appearance**: Light Mode Colors, Dark Mode Colors, Gradients.
 * - **Interaction**: Motion & Transitions, Style Modules.
 * - **Commerce**: E-Commerce & CTA colors (isolated from brand accent for
 *   stable conversion elements).
 * - **Integrations**: GHL Chat Widget, ADA Accessibility Widget.
 * - **System**: Default Mode, Contrast Checker, Import Theme.
 *
 * ## Data Contract
 * - **Input**: `active` (EditorSection), `onChange` callback.
 * - No database interaction — pure presentation component.
 *
 * ## Security
 * - Rendered inside AdminGuard. No auth logic here.
 *
 * ## SSG Compatibility
 * - Admin-only route, not SSG-rendered.
 *
 * ## Portability
 * - Copy this file + ThemeEditorPanels.tsx as a pair. The `EDITOR_SECTIONS`
 *   array is the single source of truth for available panels. The `GROUPS`
 *   array drives both mobile pill bar and desktop sidebar rendering.
 */

import { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import {
  Palette, Sun, Moon, ShoppingBag, Type, Zap, Layers,
  MessageSquare, Accessibility, Eye, Upload, Image, Settings,
} from 'lucide-react';

// ─── SECTION TYPE ────────────────────────────────────────────

/**
 * Union type of all editor section IDs.
 * Each ID maps 1:1 to a panel rendered by ThemeEditorPanels.tsx.
 */
export type EditorSection =
  | 'accent'
  | 'light-colors'
  | 'dark-colors'
  | 'gradients'
  | 'ecommerce'
  | 'typography'
  | 'motion'
  | 'style-modules'
  | 'ghl-chat'
  | 'ada-widget'
  | 'settings'
  | 'contrast'
  | 'import'
  | 'logo';

// ─── SECTION DEFINITION ─────────────────────────────────────

/**
 * Metadata for a single editor section.
 * - `id`: Typed key matching EditorSection union.
 * - `label`: Full label for desktop sidebar and accessibility.
 * - `shortLabel`: Compact label for mobile buttons (≤6 chars ideal).
 * - `icon`: Lucide icon component for visual identification.
 * - `group`: Parent group name — drives pill bar tabs and sidebar grouping.
 */
interface SectionDef {
  id: EditorSection;
  label: string;
  shortLabel: string;
  icon: React.ElementType;
  group: string;
}

/**
 * Complete section registry — single source of truth for all editor panels.
 * Order within each group determines render order in both mobile and desktop nav.
 */
export const EDITOR_SECTIONS: SectionDef[] = [
  // Brand Identity — "who you are": accent, logo, typography
  { id: 'accent', label: 'Accent Color', shortLabel: 'Accent', icon: Palette, group: 'Brand Identity' },
  { id: 'logo', label: 'Logo Config', shortLabel: 'Logo', icon: Image, group: 'Brand Identity' },
  { id: 'typography', label: 'Typography', shortLabel: 'Type', icon: Type, group: 'Brand Identity' },
  // Appearance — surface colors and gradients
  { id: 'light-colors', label: 'Light Mode Colors', shortLabel: 'Light', icon: Sun, group: 'Appearance' },
  { id: 'dark-colors', label: 'Dark Mode Colors', shortLabel: 'Dark', icon: Moon, group: 'Appearance' },
  { id: 'gradients', label: 'Gradients', shortLabel: 'Grads', icon: Palette, group: 'Appearance' },
  // Interaction — motion and per-component token modules
  { id: 'motion', label: 'Motion & Transitions', shortLabel: 'Motion', icon: Zap, group: 'Interaction' },
  { id: 'style-modules', label: 'Style Modules', shortLabel: 'Modules', icon: Layers, group: 'Interaction' },
  // Commerce & Conversion
  { id: 'ecommerce', label: 'E-Commerce & CTA', shortLabel: 'E-Comm', icon: ShoppingBag, group: 'Commerce' },
  // Integrations — third-party widget styling
  { id: 'ghl-chat', label: 'GHL Chat Widget', shortLabel: 'Chat', icon: MessageSquare, group: 'Integrations' },
  { id: 'ada-widget', label: 'ADA Accessibility', shortLabel: 'ADA', icon: Accessibility, group: 'Integrations' },
  // System — utilities and meta-tools
  { id: 'settings', label: 'Default Mode', shortLabel: 'Mode', icon: Settings, group: 'System' },
  { id: 'contrast', label: 'Contrast Checker', shortLabel: 'WCAG', icon: Eye, group: 'System' },
  { id: 'import', label: 'Import Theme', shortLabel: 'Import', icon: Upload, group: 'System' },
];

/**
 * Ordered group names — determines tab/pill order in navigation.
 * Matches the `group` field in EDITOR_SECTIONS entries.
 */
const GROUPS = ['Brand Identity', 'Appearance', 'Interaction', 'Commerce', 'Integrations', 'System'];

/**
 * Short labels for mobile pill bar to conserve horizontal space.
 * Maps full group names to abbreviated versions for 390px viewports.
 */
const GROUP_SHORT_LABELS: Record<string, string> = {
  'Brand Identity': 'Brand',
  'Appearance': 'Colors',
  'Interaction': 'Motion',
  'Commerce': 'CTA',
  'Integrations': 'Widgets',
  'System': 'System',
};

// ─── PROPS ───────────────────────────────────────────────────

interface ThemeEditorNavProps {
  /** Currently active section ID */
  active: EditorSection;
  /** Callback when user selects a different section */
  onChange: (section: EditorSection) => void;
}

// ─── COMPONENT ───────────────────────────────────────────────

/**
 * ThemeEditorNav — responsive navigation for the theme editor.
 *
 * Mobile-first design: horizontal scrollable pill bar for group selection,
 * with section buttons rendered below the active group's pill. On desktop
 * (lg+), renders a traditional vertical sidebar with grouped sections.
 *
 * @example
 * ```tsx
 * <ThemeEditorNav active={editorSection} onChange={setEditorSection} />
 * ```
 */
export function ThemeEditorNav({ active, onChange }: ThemeEditorNavProps) {
  /** Determine which group the active section belongs to */
  const activeGroup = EDITOR_SECTIONS.find((s) => s.id === active)?.group || GROUPS[0];

  /** Ref for the pill bar container — used to auto-scroll active pill into view */
  const pillBarRef = useRef<HTMLDivElement>(null);

  /** Auto-scroll the active group pill into view on mobile */
  useEffect(() => {
    if (!pillBarRef.current) return;
    const activePill = pillBarRef.current.querySelector('[data-active-group="true"]');
    if (activePill) {
      activePill.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [activeGroup]);

  /** Sections belonging to the currently active group */
  const groupSections = EDITOR_SECTIONS.filter((s) => s.group === activeGroup);

  return (
    <>
      {/* ── Mobile: Pill bar + section buttons ── */}
      <div className="lg:hidden space-y-2">
        {/* Horizontal scrollable pill bar for groups */}
        <div
          ref={pillBarRef}
          className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none -mx-1 px-1"
          role="tablist"
          aria-label="Editor section groups"
        >
          {GROUPS.map((group) => {
            const isActiveGroup = activeGroup === group;
            return (
              <button
                key={group}
                role="tab"
                aria-selected={isActiveGroup}
                data-active-group={isActiveGroup ? 'true' : undefined}
                onClick={() => {
                  // Select the first section in this group
                  const firstInGroup = EDITOR_SECTIONS.find((s) => s.group === group);
                  if (firstInGroup) onChange(firstInGroup.id);
                }}
                className={cn(
                  'shrink-0 px-3 py-1.5 rounded-full text-[11px] font-medium transition-colors whitespace-nowrap',
                  isActiveGroup
                    ? 'bg-accent text-accent-foreground shadow-sm'
                    : 'bg-muted/60 text-muted-foreground hover:bg-muted'
                )}
              >
                {GROUP_SHORT_LABELS[group] || group}
              </button>
            );
          })}
        </div>

        {/* Section buttons for active group */}
        <div className="flex flex-wrap gap-1.5">
          {groupSections.map((section) => {
            const Icon = section.icon;
            const isActive = active === section.id;
            return (
              <button
                key={section.id}
                onClick={() => onChange(section.id)}
                className={cn(
                  'flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-[11px] font-medium transition-colors',
                  isActive
                    ? 'bg-accent/15 text-accent border border-accent/30'
                    : 'bg-card text-muted-foreground border border-border hover:text-foreground hover:border-border/80'
                )}
              >
                <Icon className="h-3 w-3 shrink-0" />
                {section.shortLabel}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Desktop: Vertical sidebar tabs ── */}
      <nav className="hidden lg:block w-48 shrink-0 space-y-1 pr-2 border-r border-border">
        {GROUPS.map((group) => (
          <div key={group} className="mb-3">
            <div className="px-2 py-1 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
              {group}
            </div>
            {EDITOR_SECTIONS.filter((s) => s.group === group).map((section) => {
              const Icon = section.icon;
              const isActive = active === section.id;
              return (
                <button
                  key={section.id}
                  onClick={() => onChange(section.id)}
                  className={cn(
                    'w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-xs transition-colors text-left',
                    isActive
                      ? 'bg-accent/10 text-accent font-medium'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  )}
                >
                  <Icon className="h-3.5 w-3.5 shrink-0" />
                  <span className="truncate">{section.shortLabel}</span>
                </button>
              );
            })}
          </div>
        ))}
      </nav>
    </>
  );
}
