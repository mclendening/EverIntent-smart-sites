/**
 * Real-time WCAG contrast checker for foreground/background token pairs.
 * Displays AA/AAA pass/fail badges based on computed luminance ratios.
 * Checks normal text (4.5:1 AA, 7:1 AAA) and large text (3:1 AA, 4.5:1 AAA).
 */

import { useMemo } from 'react';
import { AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Eye } from 'lucide-react';

interface ColorPair {
  label: string;
  fg: string;
  bg: string;
}

interface ContrastCheckerProps {
  staticColors: {
    background: string;
    foreground: string;
    card: string;
    cardForeground: string;
    primary: string;
    primaryForeground: string;
    secondary: string;
    secondaryForeground: string;
    muted: string;
    mutedForeground: string;
    popover: string;
    popoverForeground: string;
  };
  accentHsl: string;
}

/** Parse "H S% L%" string to {h, s, l} numbers */
function parseHsl(hsl: string): { h: number; s: number; l: number } | null {
  const parts = hsl.replace(/%/g, '').trim().split(/\s+/).map(Number);
  if (parts.length < 3 || parts.some(isNaN)) return null;
  return { h: parts[0], s: parts[1], l: parts[2] };
}

/** Convert HSL to linear RGB channel (0–1) */
function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  s /= 100;
  l /= 100;
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let r = 0, g = 0, b = 0;
  if (h < 60) { r = c; g = x; }
  else if (h < 120) { r = x; g = c; }
  else if (h < 180) { g = c; b = x; }
  else if (h < 240) { g = x; b = c; }
  else if (h < 300) { r = x; b = c; }
  else { r = c; b = x; }
  return [r + m, g + m, b + m];
}

/** Compute relative luminance per WCAG 2.1 */
function relativeLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map(c =>
    c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
  );
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

/** Compute contrast ratio between two HSL strings */
function contrastRatio(fgHsl: string, bgHsl: string): number | null {
  const fg = parseHsl(fgHsl);
  const bg = parseHsl(bgHsl);
  if (!fg || !bg) return null;
  const l1 = relativeLuminance(...hslToRgb(fg.h, fg.s, fg.l));
  const l2 = relativeLuminance(...hslToRgb(bg.h, bg.s, bg.l));
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

function ContrastBadge({ ratio }: { ratio: number | null }) {
  if (ratio === null) return <Badge variant="outline" className="text-[10px]">N/A</Badge>;

  const aaaNormal = ratio >= 7;
  const aaNormal = ratio >= 4.5;
  const aaLarge = ratio >= 3;

  return (
    <div className="flex items-center gap-1">
      <span className="text-[10px] font-mono text-muted-foreground">{ratio.toFixed(1)}:1</span>
      {aaaNormal ? (
        <Badge className="text-[10px] px-1.5 py-0 bg-green-600 hover:bg-green-600 text-white">AAA</Badge>
      ) : aaNormal ? (
        <Badge className="text-[10px] px-1.5 py-0 bg-green-500/80 hover:bg-green-500/80 text-white">AA</Badge>
      ) : aaLarge ? (
        <Badge className="text-[10px] px-1.5 py-0 bg-yellow-600 hover:bg-yellow-600 text-white">AA Large</Badge>
      ) : (
        <Badge className="text-[10px] px-1.5 py-0 bg-red-600 hover:bg-red-600 text-white">Fail</Badge>
      )}
    </div>
  );
}

function PairRow({ pair }: { pair: ColorPair }) {
  const ratio = useMemo(() => contrastRatio(pair.fg, pair.bg), [pair.fg, pair.bg]);

  return (
    <div className="flex items-center justify-between gap-2 py-1.5 border-b border-border/50 last:border-0">
      <div className="flex items-center gap-2 min-w-0">
        <div className="flex items-center shrink-0">
          <div
            className="w-5 h-5 rounded-l border border-r-0"
            style={{ backgroundColor: `hsl(${pair.bg})` }}
          />
          <div
            className="w-5 h-5 rounded-r border flex items-center justify-center text-[8px] font-bold"
            style={{ backgroundColor: `hsl(${pair.bg})`, color: `hsl(${pair.fg})` }}
          >
            Aa
          </div>
        </div>
        <span className="text-xs truncate">{pair.label}</span>
      </div>
      <ContrastBadge ratio={ratio} />
    </div>
  );
}

export function ContrastChecker({ staticColors, accentHsl }: ContrastCheckerProps) {
  const pairs: ColorPair[] = useMemo(() => [
    { label: 'Foreground / Background', fg: staticColors.foreground, bg: staticColors.background },
    { label: 'Card Foreground / Card', fg: staticColors.cardForeground, bg: staticColors.card },
    { label: 'Primary Fg / Primary', fg: staticColors.primaryForeground, bg: staticColors.primary },
    { label: 'Secondary Fg / Secondary', fg: staticColors.secondaryForeground, bg: staticColors.secondary },
    { label: 'Muted Fg / Background', fg: staticColors.mutedForeground, bg: staticColors.background },
    { label: 'Muted Fg / Muted', fg: staticColors.mutedForeground, bg: staticColors.muted },
    { label: 'Popover Fg / Popover', fg: staticColors.popoverForeground, bg: staticColors.popover },
    { label: 'Accent / Background', fg: accentHsl, bg: staticColors.background },
    { label: 'Accent / Card', fg: accentHsl, bg: staticColors.card },
    { label: 'Foreground / Muted', fg: staticColors.foreground, bg: staticColors.muted },
  ], [staticColors, accentHsl]);

  const failCount = useMemo(() => {
    return pairs.filter(p => {
      const r = contrastRatio(p.fg, p.bg);
      return r !== null && r < 4.5;
    }).length;
  }, [pairs]);

  return (
    <AccordionItem value="contrast-checker">
      <AccordionTrigger className="text-sm py-2">
        <div className="flex items-center gap-2">
          <Eye className="h-4 w-4 shrink-0" />
          Contrast Checker
          {failCount > 0 && (
            <Badge variant="destructive" className="text-[10px] px-1.5 py-0 ml-1">
              {failCount} fail
            </Badge>
          )}
        </div>
      </AccordionTrigger>
      <AccordionContent className="space-y-2 pb-4">
        <div className="flex items-center justify-between mb-2">
          <Label className="text-xs text-muted-foreground">WCAG 2.1 contrast ratios</Label>
          <div className="flex gap-1">
            <Badge variant="outline" className="text-[9px] px-1 py-0">AA ≥ 4.5:1</Badge>
            <Badge variant="outline" className="text-[9px] px-1 py-0">AAA ≥ 7:1</Badge>
          </div>
        </div>
        {pairs.map((pair, i) => (
          <PairRow key={i} pair={pair} />
        ))}
      </AccordionContent>
    </AccordionItem>
  );
}
