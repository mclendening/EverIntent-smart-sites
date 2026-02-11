import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Type } from 'lucide-react';

export interface TypographyConfig {
  fontHeading: string;
  fontBody: string;
  fontDisplay: string;
}

const fontOptions = [
  { value: "Space Grotesk, -apple-system, BlinkMacSystemFont, sans-serif", label: "Space Grotesk" },
  { value: "Inter, -apple-system, BlinkMacSystemFont, sans-serif", label: "Inter" },
  { value: "Poppins, -apple-system, BlinkMacSystemFont, sans-serif", label: "Poppins" },
  { value: "DM Sans, -apple-system, BlinkMacSystemFont, sans-serif", label: "DM Sans" },
  { value: "Outfit, -apple-system, BlinkMacSystemFont, sans-serif", label: "Outfit" },
  { value: "Sora, -apple-system, BlinkMacSystemFont, sans-serif", label: "Sora" },
  { value: "Plus Jakarta Sans, -apple-system, BlinkMacSystemFont, sans-serif", label: "Plus Jakarta Sans" },
  { value: "Manrope, -apple-system, BlinkMacSystemFont, sans-serif", label: "Manrope" },
  { value: "Satoshi, -apple-system, BlinkMacSystemFont, sans-serif", label: "Satoshi" },
  { value: "General Sans, -apple-system, BlinkMacSystemFont, sans-serif", label: "General Sans" },
];

const getFontLabel = (value: string): string => {
  const match = fontOptions.find(f => f.value === value);
  return match?.label || value.split(',')[0].replace(/'/g, '').trim();
};

interface Props {
  typography: TypographyConfig;
  onChange: (config: TypographyConfig) => void;
}

export function TypographyEditor({ typography, onChange }: Props) {
  return (
    <AccordionItem value="typography-config">
      <AccordionTrigger className="text-sm py-2">
        <div className="flex items-center gap-2">
          <Type className="h-4 w-4 shrink-0" />
          Typography
        </div>
      </AccordionTrigger>
      <AccordionContent className="space-y-4 pb-4">
        <p className="text-xs text-muted-foreground">
          Font families used across the site. Changes take effect after publishing.
        </p>

        <div className="space-y-3">
          <div className="space-y-1">
            <Label className="text-xs">Heading Font</Label>
            <Select value={typography.fontHeading} onValueChange={(v) => onChange({ ...typography, fontHeading: v })}>
              <SelectTrigger className="text-xs"><SelectValue /></SelectTrigger>
              <SelectContent>
                {fontOptions.map(f => (
                  <SelectItem key={f.value} value={f.value} className="text-xs">{f.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">h1–h6 elements</p>
          </div>

          <div className="space-y-1">
            <Label className="text-xs">Body Font</Label>
            <Select value={typography.fontBody} onValueChange={(v) => onChange({ ...typography, fontBody: v })}>
              <SelectTrigger className="text-xs"><SelectValue /></SelectTrigger>
              <SelectContent>
                {fontOptions.map(f => (
                  <SelectItem key={f.value} value={f.value} className="text-xs">{f.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">Paragraphs and general text</p>
          </div>

          <div className="space-y-1">
            <Label className="text-xs">Display Font</Label>
            <Select value={typography.fontDisplay} onValueChange={(v) => onChange({ ...typography, fontDisplay: v })}>
              <SelectTrigger className="text-xs"><SelectValue /></SelectTrigger>
              <SelectContent>
                {fontOptions.map(f => (
                  <SelectItem key={f.value} value={f.value} className="text-xs">{f.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">Hero headlines and display text</p>
          </div>
        </div>

        {/* Preview */}
        <div className="space-y-2 mt-4">
          <Label className="text-xs font-medium">Preview</Label>
          <div className="rounded-lg border p-4 bg-card space-y-2">
            <h3 className="text-lg font-bold" style={{ fontFamily: typography.fontHeading }}>
              Heading: {getFontLabel(typography.fontHeading)}
            </h3>
            <p className="text-sm" style={{ fontFamily: typography.fontBody }}>
              Body text: {getFontLabel(typography.fontBody)} — The quick brown fox jumps over the lazy dog.
            </p>
            <p className="text-2xl font-semibold" style={{ fontFamily: typography.fontDisplay }}>
              Display: {getFontLabel(typography.fontDisplay)}
            </p>
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
