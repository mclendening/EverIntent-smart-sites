/**
 * @fileoverview Dark Mode Color Overrides Editor
 *
 * Provides explicit per-token dark mode color overrides that populate the
 * `.dark` CSS class block. The theme system follows a "Light-as-Base"
 * architecture: `:root` holds light-mode tokens, and `.dark` overrides
 * only the tokens that differ for dark mode.
 *
 * ## Business Purpose
 * Allows admins to independently tune dark mode aesthetics per theme —
 * critical for clients whose brand looks good in light but needs manual
 * dark adjustments (e.g., card surfaces, muted text legibility).
 *
 * ## Data Contract
 * - **Input**: `DarkModeOverrides` object (from `site_themes.dark_mode_overrides` JSONB).
 *   Also receives `baseColors` (light-mode `staticColors`) for the "Copy from Base" action.
 * - **Output**: `onChange(overrides)` — parent persists to DB.
 * - Each key maps 1:1 to a CSS custom property (e.g., `background` → `--background`).
 * - All values are HSL triplets without the `hsl()` wrapper (e.g., "222 47% 7%").
 *
 * ## Controls
 * - 16 semantic color tokens with individual HSL sliders (H/S/L).
 * - "Copy from Base Colors" — seeds dark overrides from light-mode values.
 * - "Reset to Defaults" — applies DARK_MODE_DEFAULTS constant.
 * - Inline dark-mode preview card.
 *
 * ## Security
 * - Admin-only (behind AdminGuard). No direct DB access.
 *
 * ## SSG Compatibility
 * - No browser APIs; safe for SSR. Published CSS is generated server-side.
 *
 * ## Portability
 * - Copy this file + export `DarkModeOverrides` and `DARK_MODE_DEFAULTS`.
 *   Consumer must apply overrides inside a `.dark` CSS scope.
 */

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { AccordionItem, AccordionTrigger, AccordionContent, Accordion } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Moon, Copy } from 'lucide-react';

export interface DarkModeOverrides {
  background: string;
  foreground: string;
  card: string;
  cardForeground: string;
  popover: string;
  popoverForeground: string;
  primary: string;
  primaryLight: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  muted: string;
  mutedForeground: string;
  border: string;
  input: string;
  ring: string;
}

export const DARK_MODE_DEFAULTS: DarkModeOverrides = {
  background: '222 47% 7%',
  foreground: '60 9% 98%',
  card: '222 47% 10%',
  cardForeground: '60 9% 98%',
  popover: '222 47% 10%',
  popoverForeground: '60 9% 98%',
  primary: '215 25% 27%',
  primaryLight: '215 20% 40%',
  primaryForeground: '0 0% 100%',
  secondary: '222 47% 12%',
  secondaryForeground: '60 9% 98%',
  muted: '222 47% 15%',
  mutedForeground: '215 16% 65%',
  border: '215 25% 20%',
  input: '215 25% 20%',
  ring: '247 92% 50%',
};

interface Props {
  overrides: DarkModeOverrides;
  onChange: (overrides: DarkModeOverrides) => void;
  baseColors: DarkModeOverrides; // staticColors to copy from
}

const parseHsl = (hslStr: string) => {
  const parts = hslStr.split(' ').map((p) => parseFloat(p.replace('%', '')));
  return { h: parts[0] || 0, s: parts[1] || 0, l: parts[2] || 0 };
};

const formatHsl = (h: number, s: number, l: number) =>
  `${Math.round(h)} ${Math.round(s)}% ${Math.round(l)}%`;

function HslControl({ label, value, onChange, description }: { label: string; value: string; onChange: (v: string) => void; description?: string }) {
  const hsl = parseHsl(value);
  const update = (key: 'h' | 's' | 'l', v: number) => {
    const u = { ...hsl, [key]: v };
    onChange(formatHsl(u.h, u.s, u.l));
  };

  return (
    <AccordionItem value={`dark-${label.toLowerCase().replace(/\s/g, '-')}`}>
      <AccordionTrigger className="text-xs py-1.5">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded border shrink-0" style={{ backgroundColor: `hsl(${value})` }} />
          {label}
        </div>
      </AccordionTrigger>
      <AccordionContent className="space-y-2 pb-3">
        {description && <p className="text-xs text-muted-foreground">{description}</p>}
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg border shrink-0" style={{ backgroundColor: `hsl(${value})` }} />
          <Input value={value} onChange={(e) => onChange(e.target.value)} placeholder="0 0% 100%" className="font-mono text-xs flex-1" />
        </div>
        {(['h', 's', 'l'] as const).map((key) => (
          <div key={key} className="space-y-1">
            <div className="flex justify-between items-center">
              <Label className="text-xs text-muted-foreground capitalize">{key === 'h' ? 'Hue' : key === 's' ? 'Saturation' : 'Lightness'}</Label>
              <Input type="number" min={0} max={key === 'h' ? 360 : 100} value={Math.round(hsl[key])} onChange={(e) => update(key, Number(e.target.value))} className="w-14 h-5 text-xs font-mono text-center" />
            </div>
            <Slider value={[hsl[key]]} max={key === 'h' ? 360 : 100} onValueChange={(v) => update(key, v[0])} className="[&_.relative]:h-1.5" />
          </div>
        ))}
      </AccordionContent>
    </AccordionItem>
  );
}

export function DarkModeOverridesEditor({ overrides, onChange, baseColors }: Props) {
  const hasOverrides = Object.values(overrides).some(v => v && v.trim() !== '');

  return (
    <AccordionItem value="dark-mode-overrides">
      <AccordionTrigger className="text-sm py-2">
        <div className="flex items-center gap-2">
          <Moon className="h-4 w-4 shrink-0" />
          Dark Mode Colors
          {hasOverrides && <Badge variant="secondary" className="text-[10px] px-1.5 py-0">Active</Badge>}
        </div>
      </AccordionTrigger>
      <AccordionContent className="space-y-4 pb-4">
        <p className="text-xs text-muted-foreground">
          Explicit dark mode color overrides. These values populate the <code className="text-[10px] bg-muted px-1 rounded">.dark</code> CSS block per BRD §7.1.
          When empty, dark mode auto-derives from the base colors above.
        </p>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onChange({ ...baseColors })}
          >
            <Copy className="h-3 w-3 mr-1" />
            Copy from Base Colors
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onChange({ ...DARK_MODE_DEFAULTS })}
          >
            Reset to Defaults
          </Button>
        </div>

        {/* Preview */}
        <div className="space-y-2">
          <Label className="text-xs font-medium">Dark Mode Preview</Label>
          <div
            className="rounded-lg p-4 border space-y-2"
            style={{ backgroundColor: `hsl(${overrides.background})`, color: `hsl(${overrides.foreground})` }}
          >
            <div className="text-sm font-semibold">Dark Mode Preview</div>
            <div
              className="rounded p-2 text-xs"
              style={{ backgroundColor: `hsl(${overrides.card})`, color: `hsl(${overrides.cardForeground})`, borderColor: `hsl(${overrides.border})`, borderWidth: 1 }}
            >
              Card content with <span style={{ color: `hsl(${overrides.mutedForeground})` }}>muted text</span>
            </div>
          </div>
        </div>

        <Accordion type="multiple" className="w-full">
          <HslControl label="Background" value={overrides.background} onChange={(v) => onChange({ ...overrides, background: v })} description="Dark page background" />
          <HslControl label="Foreground" value={overrides.foreground} onChange={(v) => onChange({ ...overrides, foreground: v })} description="Dark text color" />
          <HslControl label="Card" value={overrides.card} onChange={(v) => onChange({ ...overrides, card: v })} description="Dark card background" />
          <HslControl label="Card Foreground" value={overrides.cardForeground} onChange={(v) => onChange({ ...overrides, cardForeground: v })} />
          <HslControl label="Popover" value={overrides.popover} onChange={(v) => onChange({ ...overrides, popover: v })} />
          <HslControl label="Popover Foreground" value={overrides.popoverForeground} onChange={(v) => onChange({ ...overrides, popoverForeground: v })} />
          <HslControl label="Primary" value={overrides.primary} onChange={(v) => onChange({ ...overrides, primary: v })} />
          <HslControl label="Primary Light" value={overrides.primaryLight} onChange={(v) => onChange({ ...overrides, primaryLight: v })} />
          <HslControl label="Primary Foreground" value={overrides.primaryForeground} onChange={(v) => onChange({ ...overrides, primaryForeground: v })} />
          <HslControl label="Secondary" value={overrides.secondary} onChange={(v) => onChange({ ...overrides, secondary: v })} />
          <HslControl label="Secondary Foreground" value={overrides.secondaryForeground} onChange={(v) => onChange({ ...overrides, secondaryForeground: v })} />
          <HslControl label="Muted" value={overrides.muted} onChange={(v) => onChange({ ...overrides, muted: v })} />
          <HslControl label="Muted Foreground" value={overrides.mutedForeground} onChange={(v) => onChange({ ...overrides, mutedForeground: v })} />
          <HslControl label="Border" value={overrides.border} onChange={(v) => onChange({ ...overrides, border: v })} />
          <HslControl label="Input" value={overrides.input} onChange={(v) => onChange({ ...overrides, input: v })} />
          <HslControl label="Ring" value={overrides.ring} onChange={(v) => onChange({ ...overrides, ring: v })} />
        </Accordion>
      </AccordionContent>
    </AccordionItem>
  );
}
