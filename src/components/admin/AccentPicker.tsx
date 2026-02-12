/**
 * @fileoverview Shared Accent Color Picker + Flip Toggle for Playground pages.
 * Overrides --accent, --accent-hover, --accent-glow CSS vars on a wrapper div
 * so all children render with the selected accent color.
 * The "flip" toggle swaps accent between foreground (icon/text) and background elements.
 */

import React, { useState, createContext, useContext } from 'react';
import { cn } from '@/lib/utils';
import { ArrowLeftRight } from 'lucide-react';

// ─── PRESET ACCENTS ──────────────────────────────────────────

export interface AccentPreset {
  name: string;
  /** HSL values without hsl() wrapper, e.g. "210 100% 60%" */
  hue: string;
  hover: string;
  glow: string;
}

export const ACCENT_PRESETS: AccentPreset[] = [
  { name: 'Theme Default', hue: '', hover: '', glow: '' },
  { name: 'Electric Teal', hue: '174 84% 44%', hover: '174 84% 38%', glow: '174 84% 44%' },
  { name: 'Violet', hue: '262 83% 58%', hover: '262 83% 50%', glow: '262 83% 58%' },
  { name: 'Rose', hue: '347 77% 50%', hover: '347 77% 44%', glow: '347 77% 50%' },
  { name: 'Amber', hue: '38 92% 50%', hover: '38 92% 44%', glow: '38 92% 50%' },
  { name: 'Emerald', hue: '152 69% 41%', hover: '152 69% 35%', glow: '152 69% 41%' },
  { name: 'Sky', hue: '199 89% 48%', hover: '199 89% 42%', glow: '199 89% 48%' },
  { name: 'Coral', hue: '16 85% 57%', hover: '16 85% 50%', glow: '16 85% 57%' },
  { name: 'Indigo', hue: '234 89% 64%', hover: '234 89% 56%', glow: '234 89% 64%' },
];

// ─── CONTEXT ─────────────────────────────────────────────────

interface AccentContextValue {
  preset: AccentPreset;
  flipped: boolean;
}

const AccentContext = createContext<AccentContextValue>({
  preset: ACCENT_PRESETS[0],
  flipped: false,
});

export function useAccent() {
  return useContext(AccentContext);
}

// ─── PICKER BAR ──────────────────────────────────────────────

export function AccentPickerBar({
  selected,
  onChange,
  flipped,
  onFlip,
}: {
  selected: AccentPreset;
  onChange: (preset: AccentPreset) => void;
  flipped?: boolean;
  onFlip?: () => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2 p-3 bg-card border border-border rounded-lg">
      <span className="text-xs font-mono text-muted-foreground mr-1 uppercase tracking-wider">Accent</span>
      {ACCENT_PRESETS.map((preset) => {
        const isDefault = !preset.hue;
        const isActive = preset.name === selected.name;

        return (
          <button
            key={preset.name}
            onClick={() => onChange(preset)}
            className={cn(
              'group relative flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-all',
              isActive
                ? 'bg-accent/15 text-accent ring-1 ring-accent/30'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted',
            )}
            title={preset.name}
          >
            {!isDefault && (
              <span
                className="w-3 h-3 rounded-full shrink-0 ring-1 ring-inset ring-white/20"
                style={{ background: `hsl(${preset.hue})` }}
              />
            )}
            <span className="hidden sm:inline">{preset.name}</span>
          </button>
        );
      })}

      {/* Flip toggle */}
      {onFlip && (
        <>
          <div className="w-px h-6 bg-border mx-1" />
          <button
            onClick={onFlip}
            className={cn(
              'flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-all',
              flipped
                ? 'bg-accent/15 text-accent ring-1 ring-accent/30'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted',
            )}
            title="Flip accent placement — swap which element (icon vs background) gets the accent color"
          >
            <ArrowLeftRight className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Flip</span>
          </button>
        </>
      )}
    </div>
  );
}

// ─── WRAPPER ─────────────────────────────────────────────────

/**
 * Wraps children with CSS variable overrides for the selected accent.
 * When "Theme Default" is selected (empty hue), no overrides are applied.
 * When flipped, swaps accent ↔ accent-foreground colors.
 */
export function AccentWrapper({
  accent,
  flipped = false,
  children,
}: {
  accent: AccentPreset;
  flipped?: boolean;
  children: React.ReactNode;
}) {
  const style = accent.hue
    ? ({
        '--accent': accent.hue,
        '--accent-hover': accent.hover,
        '--accent-glow': accent.glow,
      } as React.CSSProperties)
    : undefined;

  return (
    <AccentContext.Provider value={{ preset: accent, flipped }}>
      <div style={style} className={flipped ? 'accent-flipped' : undefined}>
        {children}
      </div>
    </AccentContext.Provider>
  );
}

// ─── CONVENIENCE HOOK ────────────────────────────────────────

export function useAccentState() {
  const [accent, setAccent] = useState<AccentPreset>(ACCENT_PRESETS[0]);
  const [flipped, setFlipped] = useState(false);
  const toggleFlip = () => setFlipped((f) => !f);
  return { accent, setAccent, flipped, toggleFlip };
}
