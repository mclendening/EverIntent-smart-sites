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
