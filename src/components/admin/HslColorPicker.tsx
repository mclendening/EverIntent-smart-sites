/**
 * @fileoverview Shared HSL Color Picker with popover, sliders, hex input, and presets.
 * Used across all theme admin editors for consistent color selection UX.
 */

import { useState, useCallback, useMemo } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// ─── UTILS ───────────────────────────────────────────────────

export function parseHsl(hslStr: string): { h: number; s: number; l: number } {
  const parts = hslStr.replace(/%/g, '').trim().split(/\s+/).map(Number);
  return { h: parts[0] || 0, s: parts[1] || 0, l: parts[2] || 0 };
}

export function formatHsl(h: number, s: number, l: number): string {
  return `${Math.round(h)} ${Math.round(s)}% ${Math.round(l)}%`;
}

export function hslToHex(h: number, s: number, l: number): string {
  const sN = s / 100;
  const lN = l / 100;
  const c = (1 - Math.abs(2 * lN - 1)) * sN;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = lN - c / 2;
  let r = 0, g = 0, b = 0;
  if (h < 60) { r = c; g = x; }
  else if (h < 120) { r = x; g = c; }
  else if (h < 180) { g = c; b = x; }
  else if (h < 240) { g = x; b = c; }
  else if (h < 300) { r = x; b = c; }
  else { r = c; b = x; }
  const toHex = (n: number) => Math.round((n + m) * 255).toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

export function hexToHsl(hex: string): { h: number; s: number; l: number } {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

// ─── PRESETS ─────────────────────────────────────────────────

const SWATCH_PRESETS = [
  { label: 'White', hsl: '0 0% 100%' },
  { label: 'Black', hsl: '0 0% 0%' },
  { label: 'Amber', hsl: '38 92% 50%' },
  { label: 'Blue', hsl: '217 91% 60%' },
  { label: 'Green', hsl: '142 71% 45%' },
  { label: 'Purple', hsl: '262 83% 58%' },
  { label: 'Red', hsl: '0 72% 51%' },
  { label: 'Cyan', hsl: '189 94% 43%' },
  { label: 'Yellow', hsl: '48 96% 53%' },
  { label: 'Gray', hsl: '220 9% 46%' },
  { label: 'Navy', hsl: '222 47% 11%' },
  { label: 'Slate', hsl: '215 16% 47%' },
];

// ─── MAIN COMPONENT ─────────────────────────────────────────

interface HslColorPickerProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  description?: string;
  /** Compact inline swatch + popover (default) vs full inline editor */
  mode?: 'popover' | 'inline';
}

export function HslColorPicker({ value, onChange, label, description, mode = 'popover' }: HslColorPickerProps) {
  const hsl = useMemo(() => parseHsl(value), [value]);
  const hex = useMemo(() => hslToHex(hsl.h, hsl.s, hsl.l), [hsl]);

  const update = useCallback((key: 'h' | 's' | 'l', v: number) => {
    const u = { ...parseHsl(value), [key]: v };
    onChange(formatHsl(u.h, u.s, u.l));
  }, [value, onChange]);

  const handleHexChange = useCallback((hexVal: string) => {
    if (/^#[0-9a-fA-F]{6}$/.test(hexVal)) {
      const { h, s, l } = hexToHsl(hexVal);
      onChange(formatHsl(h, s, l));
    }
  }, [onChange]);

  const pickerContent = (
    <div className="space-y-3">
      {/* Swatch + Hex + HSL raw */}
      <div className="flex items-center gap-2">
        <div
          className="h-10 w-10 rounded-lg border shrink-0 shadow-inner"
          style={{ backgroundColor: `hsl(${value})` }}
        />
        <div className="flex-1 space-y-1">
          <Input
            value={hex}
            onChange={(e) => handleHexChange(e.target.value)}
            placeholder="#FF9500"
            className="h-7 text-xs font-mono"
          />
          <Input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="38 92% 50%"
            className="h-7 text-xs font-mono"
          />
        </div>
      </div>

      {/* Native color picker */}
      <div className="flex items-center gap-2">
        <input
          type="color"
          value={hex}
          onChange={(e) => handleHexChange(e.target.value)}
          className="h-8 w-8 rounded border cursor-pointer shrink-0 bg-transparent"
        />
        <span className="text-[10px] text-muted-foreground">Native picker</span>
      </div>

      {/* Hue slider */}
      <div className="space-y-1">
        <div className="flex justify-between items-center">
          <Label className="text-[10px] text-muted-foreground uppercase tracking-wider">Hue</Label>
          <Input
            type="number" min={0} max={360}
            value={Math.round(hsl.h)}
            onChange={(e) => update('h', Number(e.target.value))}
            className="w-14 h-5 text-[10px] font-mono text-center"
          />
        </div>
        <Slider value={[hsl.h]} max={360} onValueChange={(v) => update('h', v[0])} className="[&_.relative]:h-1.5" />
        <div
          className="h-2 rounded-sm"
          style={{
            background: `linear-gradient(to right, hsl(0 ${hsl.s}% ${hsl.l}%), hsl(60 ${hsl.s}% ${hsl.l}%), hsl(120 ${hsl.s}% ${hsl.l}%), hsl(180 ${hsl.s}% ${hsl.l}%), hsl(240 ${hsl.s}% ${hsl.l}%), hsl(300 ${hsl.s}% ${hsl.l}%), hsl(360 ${hsl.s}% ${hsl.l}%))`,
          }}
        />
      </div>

      {/* Saturation slider */}
      <div className="space-y-1">
        <div className="flex justify-between items-center">
          <Label className="text-[10px] text-muted-foreground uppercase tracking-wider">Saturation</Label>
          <Input
            type="number" min={0} max={100}
            value={Math.round(hsl.s)}
            onChange={(e) => update('s', Number(e.target.value))}
            className="w-14 h-5 text-[10px] font-mono text-center"
          />
        </div>
        <Slider value={[hsl.s]} max={100} onValueChange={(v) => update('s', v[0])} className="[&_.relative]:h-1.5" />
        <div
          className="h-2 rounded-sm"
          style={{
            background: `linear-gradient(to right, hsl(${hsl.h} 0% ${hsl.l}%), hsl(${hsl.h} 100% ${hsl.l}%))`,
          }}
        />
      </div>

      {/* Lightness slider */}
      <div className="space-y-1">
        <div className="flex justify-between items-center">
          <Label className="text-[10px] text-muted-foreground uppercase tracking-wider">Lightness</Label>
          <Input
            type="number" min={0} max={100}
            value={Math.round(hsl.l)}
            onChange={(e) => update('l', Number(e.target.value))}
            className="w-14 h-5 text-[10px] font-mono text-center"
          />
        </div>
        <Slider value={[hsl.l]} max={100} onValueChange={(v) => update('l', v[0])} className="[&_.relative]:h-1.5" />
        <div
          className="h-2 rounded-sm"
          style={{
            background: `linear-gradient(to right, hsl(${hsl.h} ${hsl.s}% 0%), hsl(${hsl.h} ${hsl.s}% 50%), hsl(${hsl.h} ${hsl.s}% 100%))`,
          }}
        />
      </div>

      {/* Preset swatches */}
      <div className="space-y-1">
        <Label className="text-[10px] text-muted-foreground uppercase tracking-wider">Presets</Label>
        <div className="flex flex-wrap gap-1">
          {SWATCH_PRESETS.map((p) => (
            <button
              key={p.label}
              title={`${p.label}: ${p.hsl}`}
              onClick={() => onChange(p.hsl)}
              className={cn(
                'w-6 h-6 rounded border-2 transition-all hover:scale-110',
                value === p.hsl ? 'border-foreground ring-1 ring-foreground' : 'border-border'
              )}
              style={{ backgroundColor: `hsl(${p.hsl})` }}
            />
          ))}
        </div>
      </div>
    </div>
  );

  if (mode === 'inline') {
    return (
      <div className="space-y-2">
        {label && (
          <div>
            <Label className="text-xs font-medium">{label}</Label>
            {description && <p className="text-[10px] text-muted-foreground">{description}</p>}
          </div>
        )}
        {pickerContent}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      {label && <Label className="text-xs shrink-0">{label}</Label>}
      <Popover>
        <PopoverTrigger asChild>
          <button
            className="flex items-center gap-2 px-2 py-1.5 rounded-md border border-input bg-background hover:bg-muted transition-colors min-w-0"
          >
            <div
              className="h-5 w-5 rounded border shrink-0"
              style={{ backgroundColor: `hsl(${value})` }}
            />
            <span className="text-xs font-mono text-muted-foreground truncate max-w-[120px]">{value}</span>
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-72 p-3" align="start" side="bottom">
          {description && <p className="text-[10px] text-muted-foreground mb-2">{description}</p>}
          {pickerContent}
        </PopoverContent>
      </Popover>
    </div>
  );
}

// ─── LABELED ROW VARIANT ─────────────────────────────────────

interface ColorRowProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  description?: string;
}

/** A labeled row with color swatch + popover picker — for use in editor lists */
export function ColorRow({ label, value, onChange, description }: ColorRowProps) {
  return (
    <div className="flex items-center justify-between gap-3 py-1.5">
      <div className="min-w-0">
        <span className="text-xs font-medium">{label}</span>
        {description && <p className="text-[10px] text-muted-foreground truncate">{description}</p>}
      </div>
      <HslColorPicker value={value} onChange={onChange} />
    </div>
  );
}
