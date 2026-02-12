/**
 * @fileoverview Shared Accent Color Picker + Flip Toggle + Custom HSL + Gradient for Playground pages.
 * Overrides --accent, --accent-hover, --accent-glow, and --accent-gradient CSS vars on a wrapper div.
 */

import React, { useState, createContext, useContext, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { ArrowLeftRight, Pipette, Blend } from 'lucide-react';

// ─── PRESET ACCENTS ──────────────────────────────────────────

export interface AccentPreset {
  name: string;
  /** HSL values without hsl() wrapper, e.g. "210 100% 60%" */
  hue: string;
  hover: string;
  glow: string;
  /** Optional gradient CSS string */
  gradient?: string;
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

export const GRADIENT_PRESETS = [
  { name: 'None', value: '' },
  { name: 'Sunset', value: 'linear-gradient(135deg, hsl(347 77% 50%), hsl(38 92% 50%))' },
  { name: 'Ocean', value: 'linear-gradient(135deg, hsl(199 89% 48%), hsl(174 84% 44%))' },
  { name: 'Aurora', value: 'linear-gradient(135deg, hsl(262 83% 58%), hsl(174 84% 44%))' },
  { name: 'Ember', value: 'linear-gradient(135deg, hsl(16 85% 57%), hsl(38 92% 50%))' },
  { name: 'Neon', value: 'linear-gradient(135deg, hsl(262 83% 58%), hsl(347 77% 50%))' },
  { name: 'Forest', value: 'linear-gradient(135deg, hsl(152 69% 41%), hsl(174 84% 44%))' },
  { name: 'Royal', value: 'linear-gradient(135deg, hsl(234 89% 64%), hsl(262 83% 58%))' },
];

// ─── CONTEXT ─────────────────────────────────────────────────

interface AccentContextValue {
  preset: AccentPreset;
  flipped: boolean;
  gradient: string;
}

const AccentContext = createContext<AccentContextValue>({
  preset: ACCENT_PRESETS[0],
  flipped: false,
  gradient: '',
});

export function useAccent() {
  return useContext(AccentContext);
}

// ─── HSL PICKER ──────────────────────────────────────────────

function HSLCustomPicker({
  onApply,
}: {
  onApply: (preset: AccentPreset) => void;
}) {
  const [h, setH] = useState(210);
  const [s, setS] = useState(80);
  const [l, setL] = useState(55);

  const hslStr = `${h} ${s}% ${l}%`;
  const hoverStr = `${h} ${s}% ${Math.max(l - 6, 10)}%`;

  return (
    <div className="flex flex-col gap-2 p-3 bg-muted/50 rounded-md border border-border min-w-[240px]">
      <div className="flex items-center gap-2 mb-1">
        <span
          className="w-6 h-6 rounded-md ring-1 ring-white/20 shrink-0"
          style={{ background: `hsl(${hslStr})` }}
        />
        <span className="text-xs font-mono text-muted-foreground">{hslStr}</span>
      </div>

      {/* Hue */}
      <label className="flex items-center gap-2 text-xs text-muted-foreground">
        <span className="w-4 font-mono">H</span>
        <input
          type="range" min={0} max={360} value={h}
          onChange={(e) => setH(Number(e.target.value))}
          className="flex-1 h-1.5 accent-foreground rounded-full"
          style={{
            background: `linear-gradient(to right, hsl(0 ${s}% ${l}%), hsl(60 ${s}% ${l}%), hsl(120 ${s}% ${l}%), hsl(180 ${s}% ${l}%), hsl(240 ${s}% ${l}%), hsl(300 ${s}% ${l}%), hsl(360 ${s}% ${l}%))`,
          }}
        />
        <span className="w-8 text-right font-mono">{h}°</span>
      </label>

      {/* Saturation */}
      <label className="flex items-center gap-2 text-xs text-muted-foreground">
        <span className="w-4 font-mono">S</span>
        <input
          type="range" min={0} max={100} value={s}
          onChange={(e) => setS(Number(e.target.value))}
          className="flex-1 h-1.5 rounded-full"
          style={{
            background: `linear-gradient(to right, hsl(${h} 0% ${l}%), hsl(${h} 100% ${l}%))`,
          }}
        />
        <span className="w-8 text-right font-mono">{s}%</span>
      </label>

      {/* Lightness */}
      <label className="flex items-center gap-2 text-xs text-muted-foreground">
        <span className="w-4 font-mono">L</span>
        <input
          type="range" min={10} max={90} value={l}
          onChange={(e) => setL(Number(e.target.value))}
          className="flex-1 h-1.5 rounded-full"
          style={{
            background: `linear-gradient(to right, hsl(${h} ${s}% 10%), hsl(${h} ${s}% 50%), hsl(${h} ${s}% 90%))`,
          }}
        />
        <span className="w-8 text-right font-mono">{l}%</span>
      </label>

      <button
        onClick={() =>
          onApply({ name: 'Custom', hue: hslStr, hover: hoverStr, glow: hslStr })
        }
        className="mt-1 px-3 py-1.5 text-xs font-medium rounded-md bg-accent text-accent-foreground hover:opacity-90 transition-opacity"
        style={{ background: `hsl(${hslStr})`, color: l > 60 ? '#000' : '#fff' }}
      >
        Apply Color
      </button>
    </div>
  );
}

// ─── PICKER BAR ──────────────────────────────────────────────

export function AccentPickerBar({
  selected,
  onChange,
  flipped,
  onFlip,
  gradient,
  onGradientChange,
}: {
  selected: AccentPreset;
  onChange: (preset: AccentPreset) => void;
  flipped?: boolean;
  onFlip?: () => void;
  gradient?: string;
  onGradientChange?: (gradient: string) => void;
}) {
  const [showCustom, setShowCustom] = useState(false);
  const [showGradients, setShowGradients] = useState(false);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap items-center gap-2 p-3 bg-card border border-border rounded-lg">
        <span className="text-xs font-mono text-muted-foreground mr-1 uppercase tracking-wider">Accent</span>
        {ACCENT_PRESETS.map((preset) => {
          const isDefault = !preset.hue;
          const isActive = preset.name === selected.name && !showCustom;

          return (
            <button
              key={preset.name}
              onClick={() => { onChange(preset); setShowCustom(false); }}
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

        {/* Custom HSL toggle */}
        <div className="w-px h-6 bg-border mx-1" />
        <button
          onClick={() => { setShowCustom((v) => !v); setShowGradients(false); }}
          className={cn(
            'flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-all',
            showCustom || selected.name === 'Custom'
              ? 'bg-accent/15 text-accent ring-1 ring-accent/30'
              : 'text-muted-foreground hover:text-foreground hover:bg-muted',
          )}
          title="Custom HSL color picker"
        >
          <Pipette className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Custom</span>
        </button>

        {/* Gradient toggle */}
        {onGradientChange && (
          <button
            onClick={() => { setShowGradients((v) => !v); setShowCustom(false); }}
            className={cn(
              'flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-all',
              showGradients || gradient
                ? 'bg-accent/15 text-accent ring-1 ring-accent/30'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted',
            )}
            title="Gradient presets"
          >
            <Blend className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Gradient</span>
          </button>
        )}

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
              title="Flip accent placement"
            >
              <ArrowLeftRight className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Flip</span>
            </button>
          </>
        )}
      </div>

      {/* Custom HSL panel */}
      {showCustom && (
        <HSLCustomPicker
          onApply={(preset) => {
            onChange(preset);
            setShowCustom(false);
          }}
        />
      )}

      {/* Gradient panel */}
      {showGradients && onGradientChange && (
        <div className="flex flex-wrap items-center gap-2 p-3 bg-muted/50 border border-border rounded-md">
          <span className="text-xs font-mono text-muted-foreground mr-1 uppercase tracking-wider">Gradient</span>
          {GRADIENT_PRESETS.map((g) => {
            const isActive = gradient === g.value;
            return (
              <button
                key={g.name}
                onClick={() => onGradientChange(g.value)}
                className={cn(
                  'flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-all',
                  isActive
                    ? 'bg-accent/15 text-accent ring-1 ring-accent/30'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted',
                )}
              >
                {g.value && (
                  <span
                    className="w-4 h-3 rounded-sm shrink-0 ring-1 ring-inset ring-white/20"
                    style={{ background: g.value }}
                  />
                )}
                {g.name}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─── WRAPPER ─────────────────────────────────────────────────

export function AccentWrapper({
  accent,
  flipped = false,
  gradient = '',
  children,
}: {
  accent: AccentPreset;
  flipped?: boolean;
  gradient?: string;
  children: React.ReactNode;
}) {
  const style: React.CSSProperties = {};

  if (accent.hue) {
    style['--accent' as any] = accent.hue;
    style['--accent-hover' as any] = accent.hover;
    style['--accent-glow' as any] = accent.glow;
  }

  if (gradient) {
    style['--accent-gradient' as any] = gradient;
  }

  const hasStyle = Object.keys(style).length > 0;

  return (
    <AccentContext.Provider value={{ preset: accent, flipped, gradient }}>
      <div
        style={hasStyle ? style : undefined}
        className={cn(flipped && 'accent-flipped', gradient && 'has-gradient')}
      >
        {children}
      </div>
    </AccentContext.Provider>
  );
}

// ─── CONVENIENCE HOOK ────────────────────────────────────────

export function useAccentState() {
  const [accent, setAccent] = useState<AccentPreset>(ACCENT_PRESETS[0]);
  const [flipped, setFlipped] = useState(false);
  const [gradient, setGradient] = useState('');
  const toggleFlip = () => setFlipped((f) => !f);
  return { accent, setAccent, flipped, toggleFlip, gradient, setGradient };
}
