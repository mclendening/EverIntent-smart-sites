/**
 * @fileoverview E-Commerce & CTA Color Editor
 *
 * Manages two independent color groups that drive the conversion layer:
 * 1. **Gold Colors** — premium accent palette for pricing badges, checkout
 *    highlights, and trust-building gold accents. Intentionally decoupled
 *    from the theme accent so pricing visuals remain stable across accent changes.
 * 2. **CTA Variants** — primary and secondary call-to-action button colors
 *    with hover states, used by CTAButton and checkout components.
 *
 * ## Business Purpose
 * Separating commerce colors from the brand accent ensures that conversion-critical
 * elements (pricing, CTAs) maintain tested visual impact regardless of brand
 * accent experiments.
 *
 * ## Data Contract
 * - **Gold Input**: `EcommerceColors` from `site_themes.ecommerce_colors` JSONB.
 *   Keys: gold, goldHover, goldGlow, goldForeground, pricingHighlight.
 * - **CTA Input**: `CtaVariants` from `site_themes.cta_variants` JSONB.
 *   Keys: primary, primaryHover, secondary, secondaryHover.
 * - All values are HSL triplets (e.g., "39 95% 50%").
 * - **Output**: Two callbacks — `onEcommerceChange` and `onCtaChange`.
 *
 * ## CSS Variables Emitted (via publish pipeline)
 * --gold, --gold-hover, --gold-glow, --gold-foreground, --pricing-highlight,
 * --cta-primary, --cta-primary-hover, --cta-secondary, --cta-secondary-hover.
 *
 * ## Security
 * - Admin-only editor. No direct DB access.
 *
 * ## SSG Compatibility
 * - No browser APIs. Values are baked into static CSS at publish time.
 *
 * ## Portability
 * - Copy this file + EcommerceColors/CtaVariants interfaces. Consumer must
 *   wire the output CSS variables to button/pricing components.
 */

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { AccordionItem, AccordionTrigger, AccordionContent, Accordion } from '@/components/ui/accordion';
import { ChevronUp, ChevronDown } from 'lucide-react';

export interface EcommerceColors {
  gold: string;
  goldHover: string;
  goldGlow: string;
  goldForeground: string;
  pricingHighlight: string;
}

export interface CtaVariants {
  primary: string;
  primaryHover: string;
  secondary: string;
  secondaryHover: string;
}

interface Props {
  ecommerceColors: EcommerceColors;
  onEcommerceChange: (colors: EcommerceColors) => void;
  ctaVariants: CtaVariants;
  onCtaChange: (variants: CtaVariants) => void;
}

const parseHsl = (hslStr: string) => {
  const parts = hslStr.split(' ').map((p) => parseFloat(p.replace('%', '')));
  return { h: parts[0] || 0, s: parts[1] || 0, l: parts[2] || 0 };
};

const formatHsl = (h: number, s: number, l: number) =>
  `${Math.round(h)} ${Math.round(s)}% ${Math.round(l)}%`;

function HslControl({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  const hsl = parseHsl(value);
  const update = (key: 'h' | 's' | 'l', v: number) => {
    const u = { ...hsl, [key]: v };
    onChange(formatHsl(u.h, u.s, u.l));
  };
  const inc = (key: 'h' | 's' | 'l', amt: number) => {
    const max = key === 'h' ? 360 : 100;
    update(key, Math.max(0, Math.min(max, hsl[key] + amt)));
  };

  return (
    <AccordionItem value={`ecom-${label.toLowerCase().replace(/\s/g, '-')}`}>
      <AccordionTrigger className="text-xs py-1.5">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded border shrink-0" style={{ backgroundColor: `hsl(${value})` }} />
          {label}
        </div>
      </AccordionTrigger>
      <AccordionContent className="space-y-2 pb-3">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg border shrink-0" style={{ backgroundColor: `hsl(${value})` }} />
          <Input value={value} onChange={(e) => onChange(e.target.value)} placeholder="0 0% 100%" className="font-mono text-xs flex-1" />
        </div>
        {(['h', 's', 'l'] as const).map((key) => (
          <div key={key} className="space-y-1">
            <div className="flex justify-between items-center">
              <Label className="text-xs text-muted-foreground capitalize">{key === 'h' ? 'Hue' : key === 's' ? 'Saturation' : 'Lightness'}</Label>
              <div className="flex items-center gap-1">
                <Button variant="outline" size="icon" className="h-5 w-5" onClick={() => inc(key, -5)}><ChevronDown className="h-3 w-3" /></Button>
                <Input type="number" min={0} max={key === 'h' ? 360 : 100} value={Math.round(hsl[key])} onChange={(e) => update(key, Number(e.target.value))} className="w-14 h-5 text-xs font-mono text-center" />
                <Button variant="outline" size="icon" className="h-5 w-5" onClick={() => inc(key, 5)}><ChevronUp className="h-3 w-3" /></Button>
              </div>
            </div>
            <Slider value={[hsl[key]]} max={key === 'h' ? 360 : 100} onValueChange={(v) => update(key, v[0])} className="[&_.relative]:h-1.5" />
          </div>
        ))}
      </AccordionContent>
    </AccordionItem>
  );
}

export function EcommerceColorEditor({ ecommerceColors, onEcommerceChange, ctaVariants, onCtaChange }: Props) {
  return (
    <AccordionItem value="ecommerce-colors">
      <AccordionTrigger className="text-sm py-2">
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded border shrink-0" style={{ backgroundColor: `hsl(${ecommerceColors.gold})` }} />
          E-commerce & Gold Colors
        </div>
      </AccordionTrigger>
      <AccordionContent className="space-y-4 pb-4">
        <p className="text-xs text-muted-foreground">
          Gold accents for pricing, checkout, and CTA elements. These are independent from the theme accent.
        </p>

        <div className="space-y-2">
          <Label className="text-xs font-medium">Gold Colors</Label>
          <Accordion type="multiple" className="w-full">
            <HslControl label="Gold" value={ecommerceColors.gold} onChange={(v) => onEcommerceChange({ ...ecommerceColors, gold: v })} />
            <HslControl label="Gold Hover" value={ecommerceColors.goldHover} onChange={(v) => onEcommerceChange({ ...ecommerceColors, goldHover: v })} />
            <HslControl label="Gold Glow" value={ecommerceColors.goldGlow} onChange={(v) => onEcommerceChange({ ...ecommerceColors, goldGlow: v })} />
            <HslControl label="Gold Foreground" value={ecommerceColors.goldForeground} onChange={(v) => onEcommerceChange({ ...ecommerceColors, goldForeground: v })} />
            <HslControl label="Pricing Highlight" value={ecommerceColors.pricingHighlight} onChange={(v) => onEcommerceChange({ ...ecommerceColors, pricingHighlight: v })} />
          </Accordion>
        </div>

        {/* Preview */}
        <div className="space-y-2">
          <Label className="text-xs font-medium">Preview</Label>
          <div className="flex gap-2">
            <div className="flex-1 rounded-lg p-3 text-center text-xs font-semibold" style={{ backgroundColor: `hsl(${ecommerceColors.gold})`, color: `hsl(${ecommerceColors.goldForeground})` }}>
              $249/mo
            </div>
            <div className="flex-1 rounded-lg p-3 text-center text-xs font-semibold" style={{ backgroundColor: `hsl(${ecommerceColors.goldHover})`, color: `hsl(${ecommerceColors.goldForeground})` }}>
              Hover
            </div>
            <div className="flex-1 rounded-lg p-3 text-center text-xs font-semibold border" style={{ boxShadow: `0 0 20px hsl(${ecommerceColors.goldGlow} / 0.4)`, color: `hsl(${ecommerceColors.gold})` }}>
              Glow
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-xs font-medium">CTA Variants</Label>
          <Accordion type="multiple" className="w-full">
            <HslControl label="CTA Primary" value={ctaVariants.primary} onChange={(v) => onCtaChange({ ...ctaVariants, primary: v })} />
            <HslControl label="CTA Primary Hover" value={ctaVariants.primaryHover} onChange={(v) => onCtaChange({ ...ctaVariants, primaryHover: v })} />
            <HslControl label="CTA Secondary" value={ctaVariants.secondary} onChange={(v) => onCtaChange({ ...ctaVariants, secondary: v })} />
            <HslControl label="CTA Secondary Hover" value={ctaVariants.secondaryHover} onChange={(v) => onCtaChange({ ...ctaVariants, secondaryHover: v })} />
          </Accordion>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
