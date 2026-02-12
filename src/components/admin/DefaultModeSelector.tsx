/**
 * @fileoverview Default Color Mode Selector
 *
 * Controls which color mode (dark / light / system) is applied before
 * React hydrates. An inline `<head>` script reads this value and immediately
 * applies the correct class to `<html>`, preventing FOUC (Flash of Unstyled Content).
 *
 * ## Business Purpose
 * Lets admins choose the initial experience per theme — e.g., a luxury brand
 * defaults to dark, while a medical practice defaults to light.
 *
 * ## Data Contract
 * - **Input**: `defaultMode` string ("dark" | "light" | "system") from
 *   `site_themes.default_mode` column.
 * - **Output**: `onChange(mode)` — parent persists to DB.
 *
 * ## Options
 * - **dark**: Always dark mode (current system default).
 * - **light**: Always light mode.
 * - **system**: Respects `prefers-color-scheme` media query.
 *
 * ## Security
 * - Admin-only. Value is baked into published static config.
 *
 * ## SSG Compatibility
 * - Critical for SSG: the head script must match the published `defaultMode`
 *   to avoid hydration mismatch. The publish pipeline writes this value
 *   into the static `themes.ts` config.
 *
 * ## Portability
 * - Copy this file. Consumer must implement the head-script that reads
 *   the mode and toggles `.dark` on `<html>` before paint.
 */

import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Moon, Sun, Monitor } from 'lucide-react';

interface Props {
  defaultMode: string;
  onChange: (mode: string) => void;
}

export function DefaultModeSelector({ defaultMode, onChange }: Props) {
  const icons: Record<string, React.ReactNode> = {
    dark: <Moon className="h-4 w-4" />,
    light: <Sun className="h-4 w-4" />,
    system: <Monitor className="h-4 w-4" />,
  };

  return (
    <AccordionItem value="default-mode">
      <AccordionTrigger className="text-sm py-2">
        <div className="flex items-center gap-2">
          {icons[defaultMode] || <Moon className="h-4 w-4" />}
          Default Mode: {defaultMode}
        </div>
      </AccordionTrigger>
      <AccordionContent className="space-y-3 pb-4">
        <p className="text-xs text-muted-foreground">
          The initial color mode applied before React hydrates. A FOUC-prevention script in the {'<head>'} reads this setting and applies the correct class immediately.
        </p>

        <div className="space-y-1">
          <Label className="text-xs">Default Color Mode</Label>
          <Select value={defaultMode} onValueChange={onChange}>
            <SelectTrigger className="text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="dark" className="text-xs">
                <div className="flex items-center gap-2">
                  <Moon className="h-3 w-3" /> Dark
                </div>
              </SelectItem>
              <SelectItem value="light" className="text-xs">
                <div className="flex items-center gap-2">
                  <Sun className="h-3 w-3" /> Light
                </div>
              </SelectItem>
              <SelectItem value="system" className="text-xs">
                <div className="flex items-center gap-2">
                  <Monitor className="h-3 w-3" /> System (OS preference)
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="rounded-lg border p-3 bg-muted/30">
          <p className="text-[10px] text-muted-foreground">
            <strong>dark</strong> — Always dark mode (current default)<br />
            <strong>light</strong> — Always light mode<br />
            <strong>system</strong> — Follows user's OS preference via <code>prefers-color-scheme</code>
          </p>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
