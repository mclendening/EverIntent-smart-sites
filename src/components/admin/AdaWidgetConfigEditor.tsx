/**
 * @fileoverview ADA Widget Configuration Editor
 * Admin panel for controlling accessibility widget visibility, placement, and icon styling.
 * Task 7.15 - ADA widget config (visibility, pause/hide scheduling, device toggle)
 */

import { AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Accessibility, Monitor, Smartphone } from 'lucide-react';

export interface AdaWidgetConfig {
  enabled: boolean;
  position: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  hideOnMobile: boolean;
  hideOnDesktop: boolean;
  pauseUntil: string | null;
  hiddenIndefinitely: boolean;
  iconType: 'universal' | 'wheelchair' | 'eye' | 'human';
  iconColor: string;
  iconBgColor: string;
  iconSize: number;
  iconShape: 'circle' | 'rounded-square' | 'pill';
}

interface AdaWidgetConfigEditorProps {
  config: AdaWidgetConfig;
  onChange: (config: AdaWidgetConfig) => void;
}

export function AdaWidgetConfigEditor({ config, onChange }: AdaWidgetConfigEditorProps) {
  const update = (partial: Partial<AdaWidgetConfig>) => onChange({ ...config, ...partial });

  return (
    <AccordionItem value="ada-widget">
      <AccordionTrigger className="text-sm py-2">
        <div className="flex items-center gap-2">
          <Accessibility className="h-4 w-4 shrink-0" />
          ADA Accessibility Widget
        </div>
      </AccordionTrigger>
      <AccordionContent className="space-y-4 pb-4">
        {/* Enable/Disable */}
        <div className="flex items-center justify-between">
          <div>
            <Label className="text-sm">Widget Enabled</Label>
            <p className="text-xs text-muted-foreground">Show the accessibility floating button</p>
          </div>
          <Switch checked={config.enabled} onCheckedChange={(v) => update({ enabled: v })} />
        </div>

        {/* Position */}
        <div className="space-y-1">
          <Label className="text-xs">Position (Desktop)</Label>
          <Select value={config.position} onValueChange={(v: AdaWidgetConfig['position']) => update({ position: v })}>
            <SelectTrigger className="h-8 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="bottom-right">Bottom Right</SelectItem>
              <SelectItem value="bottom-left">Bottom Left</SelectItem>
              <SelectItem value="top-right">Top Right</SelectItem>
              <SelectItem value="top-left">Top Left</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">On mobile, widget always appears above the bottom nav bar</p>
        </div>

        {/* Device Toggles */}
        <div className="space-y-3">
          <Label className="text-xs font-medium">Device Visibility</Label>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Smartphone className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs">Hide on Mobile</span>
            </div>
            <Switch checked={config.hideOnMobile} onCheckedChange={(v) => update({ hideOnMobile: v })} />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Monitor className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs">Hide on Desktop</span>
            </div>
            <Switch checked={config.hideOnDesktop} onCheckedChange={(v) => update({ hideOnDesktop: v })} />
          </div>
        </div>

        {/* Pause / Hide */}
        <div className="space-y-3">
          <Label className="text-xs font-medium">Scheduling</Label>
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs">Hide Indefinitely</span>
              <p className="text-[10px] text-muted-foreground">Completely remove widget from site</p>
            </div>
            <Switch 
              checked={config.hiddenIndefinitely} 
              onCheckedChange={(v) => update({ hiddenIndefinitely: v, pauseUntil: v ? null : config.pauseUntil })} 
            />
          </div>
          {!config.hiddenIndefinitely && (
            <div className="space-y-1">
              <Label className="text-xs">Pause Until (optional)</Label>
              <Input
                type="datetime-local"
                value={config.pauseUntil || ''}
                onChange={(e) => update({ pauseUntil: e.target.value || null })}
                className="h-8 text-xs"
              />
              {config.pauseUntil && (
                <Button variant="ghost" size="sm" className="h-6 text-xs px-2" onClick={() => update({ pauseUntil: null })}>
                  Clear pause
                </Button>
              )}
            </div>
          )}
        </div>

        {/* Icon Customization */}
        <div className="space-y-3">
          <Label className="text-xs font-medium">Icon Appearance</Label>
          
          <div className="space-y-1">
            <Label className="text-xs">Icon Type</Label>
            <Select value={config.iconType} onValueChange={(v: AdaWidgetConfig['iconType']) => update({ iconType: v })}>
              <SelectTrigger className="h-8 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="universal">Universal Access ♿</SelectItem>
                <SelectItem value="wheelchair">Wheelchair</SelectItem>
                <SelectItem value="eye">Eye / Vision</SelectItem>
                <SelectItem value="human">Human Figure</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1">
            <Label className="text-xs">Icon Shape</Label>
            <Select value={config.iconShape} onValueChange={(v: AdaWidgetConfig['iconShape']) => update({ iconShape: v })}>
              <SelectTrigger className="h-8 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="circle">Circle</SelectItem>
                <SelectItem value="rounded-square">Rounded Square</SelectItem>
                <SelectItem value="pill">Pill</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <Label className="text-xs">Icon Size</Label>
              <span className="text-xs text-muted-foreground">{config.iconSize}px</span>
            </div>
            <Slider
              value={[config.iconSize]}
              min={36}
              max={64}
              step={2}
              onValueChange={([v]) => update({ iconSize: v })}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label className="text-xs">Icon Color (HSL)</Label>
              <Input
                value={config.iconColor}
                onChange={(e) => update({ iconColor: e.target.value })}
                placeholder="0 0% 100%"
                className="h-8 text-xs font-mono"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Background (HSL)</Label>
              <Input
                value={config.iconBgColor}
                onChange={(e) => update({ iconBgColor: e.target.value })}
                placeholder="240 70% 60%"
                className="h-8 text-xs font-mono"
              />
            </div>
          </div>

          {/* Preview */}
          <div className="space-y-1">
            <Label className="text-xs">Preview</Label>
            <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
              <div
                className="flex items-center justify-center shrink-0 shadow-lg"
                style={{
                  width: config.iconSize,
                  height: config.iconSize,
                  backgroundColor: `hsl(${config.iconBgColor})`,
                  color: `hsl(${config.iconColor})`,
                  borderRadius: config.iconShape === 'circle' ? '50%' : config.iconShape === 'pill' ? '999px' : '12px',
                }}
              >
                <Accessibility className="w-1/2 h-1/2" />
              </div>
              <div className="text-xs text-muted-foreground">
                <p>{config.position.replace('-', ' ')}</p>
                <p>{config.iconShape} • {config.iconSize}px</p>
              </div>
            </div>
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
