/**
 * @fileoverview Logo Configuration Editor — Brand wordmark element styling.
 *
 * Full CRUD editor for the EverIntent brand logo, which is a composed wordmark
 * consisting of four configurable elements: "Ever" text, "Intent" text, a
 * decorative streak (underline), and a tagline. Each element has independent
 * size, weight, color (solid or gradient), margins, and vertical offset controls.
 *
 * ## Business Purpose
 * The logo is a multi-element SVG/CSS composition rendered by LogoRenderer.
 * This editor gives admins pixel-level control over each element's appearance
 * without designer intervention — critical for theme-specific logo variants
 * (e.g., light backgrounds need dark text, dark backgrounds need white/gradient text).
 *
 * ## Data Contract
 * - **Database**: Reads/writes `logo_versions` table via Supabase client.
 *   Columns: ever_config, intent_config, streak_config, tagline_config (all JSONB),
 *   tagline_text (text).
 * - **Props**: `selectedLogoId` (FK to logo_versions.id, stored on site_themes.logo_version_id),
 *   `onLogoChange` (updates parent's FK), `accentHsl` (for accent-aware preview),
 *   `previewBgColor` (preview panel background).
 * - **Config shapes**: TextElementConfig, StreakConfig, TaglineConfig (from logo/types.ts).
 *
 * ## Security
 * - Admin-only (behind AdminGuard). Authenticated Supabase client.
 * - RLS on `logo_versions`: only admin role can write.
 *
 * ## SSG Compatibility
 * - Admin-only, not SSG-rendered. Logo config is baked into `themes.ts` at publish time.
 *
 * ## Portability
 * - Copy this file + logo/types.ts + LogoRenderer. Adjust the wordmark elements
 *   (Ever/Intent) to match your brand's wordmark composition.
 */

import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { LogoRenderer } from '@/components/logo';
import { Loader2, Type, Minus, AlignLeft, Save } from 'lucide-react';
import type { Tables, Json } from '@/integrations/supabase/types';
import {
  TextElementConfig,
  StreakConfig,
  TaglineConfig,
  defaultEverConfig,
  defaultIntentConfig,
  defaultStreakConfig,
  defaultTaglineConfig,
} from '@/components/logo/types';

type LogoVersion = Tables<'logo_versions'>;

interface LogoConfigEditorProps {
  selectedLogoId: string | null;
  onLogoChange: (logoId: string) => void;
  accentHsl: string;
  previewBgColor: string;
}

// Preset colors for quick selection
const presetColors = [
  '#FFFFFF', '#000000', '#A855F7', '#3B82F6', '#22C55E', 
  '#F97316', '#EF4444', '#EAB308', '#06B6D4', '#6B7280'
];

export function LogoConfigEditor({ 
  selectedLogoId, 
  onLogoChange, 
  accentHsl,
  previewBgColor 
}: LogoConfigEditorProps) {
  const { toast } = useToast();
  const [logoVersions, setLogoVersions] = useState<LogoVersion[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [selectedLogo, setSelectedLogo] = useState<LogoVersion | null>(null);
  
  // Editable states for logo elements
  const [everConfig, setEverConfig] = useState<TextElementConfig>(defaultEverConfig);
  const [intentConfig, setIntentConfig] = useState<TextElementConfig>(defaultIntentConfig);
  const [streakConfig, setStreakConfig] = useState<StreakConfig>(defaultStreakConfig);
  const [taglineConfig, setTaglineConfig] = useState<TaglineConfig>(defaultTaglineConfig);
  const [taglineText, setTaglineText] = useState('Web Design & Automation');

  useEffect(() => {
    fetchLogoVersions();
  }, []);

  useEffect(() => {
    if (selectedLogoId && logoVersions.length > 0) {
      const logo = logoVersions.find(l => l.id === selectedLogoId);
      if (logo) {
        loadLogoConfig(logo);
      }
    }
  }, [selectedLogoId, logoVersions]);

  const fetchLogoVersions = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('logo_versions')
        .select('*')
        .order('version', { ascending: false });

      if (error) throw error;
      setLogoVersions(data || []);
      
      // Auto-select first logo if none selected
      if (!selectedLogoId && data && data.length > 0) {
        onLogoChange(data[0].id);
      }
    } catch (error) {
      console.error('Error fetching logos:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadLogoConfig = (logo: LogoVersion) => {
    setSelectedLogo(logo);
    setEverConfig((logo.ever_config as unknown as TextElementConfig) || defaultEverConfig);
    setIntentConfig((logo.intent_config as unknown as TextElementConfig) || defaultIntentConfig);
    setStreakConfig((logo.streak_config as unknown as StreakConfig) || defaultStreakConfig);
    setTaglineConfig((logo.tagline_config as unknown as TaglineConfig) || defaultTaglineConfig);
    setTaglineText(logo.tagline_text || 'Web Design & Automation');
  };

  const handleSave = async () => {
    if (!selectedLogo) return;
    
    setSaving(true);
    try {
      const { error } = await supabase
        .from('logo_versions')
        .update({
          ever_config: everConfig as unknown as Json,
          intent_config: intentConfig as unknown as Json,
          streak_config: streakConfig as unknown as Json,
          tagline_config: taglineConfig as unknown as Json,
          tagline_text: taglineText,
        })
        .eq('id', selectedLogo.id);

      if (error) throw error;

      toast({
        title: 'Logo saved',
        description: `"${selectedLogo.name}" has been updated.`,
      });

      fetchLogoVersions();
    } catch (error) {
      console.error('Error saving logo:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to save logo configuration',
      });
    } finally {
      setSaving(false);
    }
  };

  // Text Element Editor Component
  const TextElementEditor = ({ 
    label, 
    icon,
    config, 
    onChange 
  }: { 
    label: string;
    icon: React.ReactNode;
    config: TextElementConfig; 
    onChange: (cfg: TextElementConfig) => void;
  }) => (
    <AccordionItem value={label.toLowerCase()}>
      <AccordionTrigger className="text-sm py-2">
        <div className="flex items-center gap-2">
          {icon}
          {config.text || label}
          {config.enabled === false && <span className="text-xs text-muted-foreground">(disabled)</span>}
        </div>
      </AccordionTrigger>
      <AccordionContent className="space-y-4 pb-4">
        {/* Text & Enabled */}
        <div className="grid grid-cols-[1fr_auto] gap-3 items-end">
          <div className="space-y-1">
            <Label className="text-xs">Display Text</Label>
            <Input
              value={config.text || ''}
              onChange={(e) => onChange({ ...config, text: e.target.value })}
              placeholder={label}
              className="h-7 text-xs"
            />
          </div>
          <div className="flex items-center gap-2 pb-0.5">
            <Switch
              checked={config.enabled !== false}
              onCheckedChange={(v) => onChange({ ...config, enabled: v })}
            />
            <Label className="text-xs">Visible</Label>
          </div>
        </div>
        {/* Size & Weight */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <Label className="text-xs">Size (px)</Label>
            <div className="flex items-center gap-2">
              <Slider
                value={[config.size]}
                min={12}
                max={120}
                onValueChange={(v) => onChange({ ...config, size: v[0] })}
              />
              <Input
                type="number"
                value={config.size}
                onChange={(e) => onChange({ ...config, size: Number(e.target.value) })}
                className="w-16 h-7 text-xs"
              />
            </div>
          </div>
          <div className="space-y-1">
            <Label className="text-xs">Weight</Label>
            <Select 
              value={config.weight.toString()} 
              onValueChange={(v) => onChange({ ...config, weight: Number(v) })}
            >
              <SelectTrigger className="h-7 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="300">Light (300)</SelectItem>
                <SelectItem value="400">Normal (400)</SelectItem>
                <SelectItem value="500">Medium (500)</SelectItem>
                <SelectItem value="600">Semi-Bold (600)</SelectItem>
                <SelectItem value="700">Bold (700)</SelectItem>
                <SelectItem value="800">Extra-Bold (800)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Color Mode */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Switch
              checked={config.useGradient}
              onCheckedChange={(v) => onChange({ ...config, useGradient: v })}
            />
            <Label className="text-xs">Use Gradient</Label>
          </div>
        </div>

        {config.useGradient ? (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label className="text-xs">From</Label>
                <Input
                  type="color"
                  value={config.gradientFrom}
                  onChange={(e) => onChange({ ...config, gradientFrom: e.target.value })}
                  className="h-8 cursor-pointer"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">To</Label>
                <Input
                  type="color"
                  value={config.gradientTo}
                  onChange={(e) => onChange({ ...config, gradientTo: e.target.value })}
                  className="h-8 cursor-pointer"
                />
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <Label className="text-xs">Angle</Label>
                <span className="text-xs text-muted-foreground">{config.gradientAngle}°</span>
              </div>
              <Slider
                value={[config.gradientAngle]}
                max={360}
                onValueChange={(v) => onChange({ ...config, gradientAngle: v[0] })}
              />
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <Label className="text-xs">Solid Color</Label>
            <div className="flex gap-1 flex-wrap">
              {presetColors.map((c) => (
                <button
                  key={c}
                  className={`w-6 h-6 rounded border-2 ${config.solidColor === c ? 'border-accent' : 'border-border'}`}
                  style={{ backgroundColor: c }}
                  onClick={() => onChange({ ...config, solidColor: c })}
                />
              ))}
            </div>
            <Input
              type="color"
              value={config.solidColor}
              onChange={(e) => onChange({ ...config, solidColor: e.target.value })}
              className="h-8 w-full cursor-pointer"
            />
          </div>
        )}

        {/* Margins & Offset */}
        <div className="grid grid-cols-3 gap-2">
          <div className="space-y-1">
            <Label className="text-xs">Margin L</Label>
            <Input
              type="number"
              value={config.marginLeft}
              onChange={(e) => onChange({ ...config, marginLeft: Number(e.target.value) })}
              className="h-7 text-xs"
            />
          </div>
          <div className="space-y-1">
            <Label className="text-xs">Margin R</Label>
            <Input
              type="number"
              value={config.marginRight}
              onChange={(e) => onChange({ ...config, marginRight: Number(e.target.value) })}
              className="h-7 text-xs"
            />
          </div>
          <div className="space-y-1">
            <Label className="text-xs">V. Offset</Label>
            <Input
              type="number"
              value={config.verticalOffset}
              onChange={(e) => onChange({ ...config, verticalOffset: Number(e.target.value) })}
              className="h-7 text-xs"
            />
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );

  // Streak Editor Component
  const StreakEditor = () => (
    <AccordionItem value="streak">
      <AccordionTrigger className="text-sm py-2">
        <div className="flex items-center gap-2">
          <Minus className="h-4 w-4" />
          Streak (Underline)
        </div>
      </AccordionTrigger>
      <AccordionContent className="space-y-4 pb-4">
        {/* Dimensions */}
        <div className="grid grid-cols-3 gap-2">
          <div className="space-y-1">
            <Label className="text-xs">Length</Label>
            <Input
              type="number"
              value={streakConfig.length}
              onChange={(e) => setStreakConfig({ ...streakConfig, length: Number(e.target.value) })}
              className="h-7 text-xs"
            />
          </div>
          <div className="space-y-1">
            <Label className="text-xs">Left Thick</Label>
            <Input
              type="number"
              value={streakConfig.leftThick}
              onChange={(e) => setStreakConfig({ ...streakConfig, leftThick: Number(e.target.value) })}
              className="h-7 text-xs"
            />
          </div>
          <div className="space-y-1">
            <Label className="text-xs">Right Thick</Label>
            <Input
              type="number"
              value={streakConfig.rightThick}
              onChange={(e) => setStreakConfig({ ...streakConfig, rightThick: Number(e.target.value) })}
              className="h-7 text-xs"
            />
          </div>
        </div>

        {/* Color Mode */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Switch
              checked={streakConfig.useGradient}
              onCheckedChange={(v) => setStreakConfig({ ...streakConfig, useGradient: v })}
            />
            <Label className="text-xs">Use Gradient</Label>
          </div>
        </div>

        {streakConfig.useGradient ? (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label className="text-xs">From</Label>
                <Input
                  type="color"
                  value={streakConfig.gradientFrom}
                  onChange={(e) => setStreakConfig({ ...streakConfig, gradientFrom: e.target.value })}
                  className="h-8 cursor-pointer"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">To</Label>
                <Input
                  type="color"
                  value={streakConfig.gradientTo}
                  onChange={(e) => setStreakConfig({ ...streakConfig, gradientTo: e.target.value })}
                  className="h-8 cursor-pointer"
                />
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <Label className="text-xs">Angle</Label>
                <span className="text-xs text-muted-foreground">{streakConfig.gradientAngle}°</span>
              </div>
              <Slider
                value={[streakConfig.gradientAngle]}
                max={360}
                onValueChange={(v) => setStreakConfig({ ...streakConfig, gradientAngle: v[0] })}
              />
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <Label className="text-xs">Solid Color</Label>
            <Input
              type="color"
              value={streakConfig.solidColor}
              onChange={(e) => setStreakConfig({ ...streakConfig, solidColor: e.target.value })}
              className="h-8 w-full cursor-pointer"
            />
          </div>
        )}

        {/* Margins */}
        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-1">
            <Label className="text-xs">Margin Left</Label>
            <Input
              type="number"
              value={streakConfig.marginLeft}
              onChange={(e) => setStreakConfig({ ...streakConfig, marginLeft: Number(e.target.value) })}
              className="h-7 text-xs"
            />
          </div>
          <div className="space-y-1">
            <Label className="text-xs">Margin Right</Label>
            <Input
              type="number"
              value={streakConfig.marginRight}
              onChange={(e) => setStreakConfig({ ...streakConfig, marginRight: Number(e.target.value) })}
              className="h-7 text-xs"
            />
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );

  // Tagline Editor
  const TaglineEditor = () => (
    <AccordionItem value="tagline">
      <AccordionTrigger className="text-sm py-2">
        <div className="flex items-center gap-2">
          <AlignLeft className="h-4 w-4" />
          Tagline
        </div>
      </AccordionTrigger>
      <AccordionContent className="space-y-4 pb-4">
        {/* Tagline Text */}
        <div className="space-y-1">
          <Label className="text-xs">Tagline Text</Label>
          <Input
            value={taglineText}
            onChange={(e) => setTaglineText(e.target.value)}
            placeholder="Web Design & Automation"
            className="text-xs"
          />
        </div>

        {/* Size & Weight */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <Label className="text-xs">Size (px)</Label>
            <div className="flex items-center gap-2">
              <Slider
                value={[taglineConfig.size]}
                min={8}
                max={48}
                onValueChange={(v) => setTaglineConfig({ ...taglineConfig, size: v[0] })}
              />
              <Input
                type="number"
                value={taglineConfig.size}
                onChange={(e) => setTaglineConfig({ ...taglineConfig, size: Number(e.target.value) })}
                className="w-16 h-7 text-xs"
              />
            </div>
          </div>
          <div className="space-y-1">
            <Label className="text-xs">Weight</Label>
            <Select 
              value={taglineConfig.weight.toString()} 
              onValueChange={(v) => setTaglineConfig({ ...taglineConfig, weight: Number(v) })}
            >
              <SelectTrigger className="h-7 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="300">Light (300)</SelectItem>
                <SelectItem value="400">Normal (400)</SelectItem>
                <SelectItem value="500">Medium (500)</SelectItem>
                <SelectItem value="600">Semi-Bold (600)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Color */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Switch
              checked={taglineConfig.useGradient}
              onCheckedChange={(v) => setTaglineConfig({ ...taglineConfig, useGradient: v })}
            />
            <Label className="text-xs">Use Gradient</Label>
          </div>
        </div>

        {!taglineConfig.useGradient && (
          <div className="space-y-2">
            <Label className="text-xs">Solid Color</Label>
            <Input
              type="color"
              value={taglineConfig.solidColor}
              onChange={(e) => setTaglineConfig({ ...taglineConfig, solidColor: e.target.value })}
              className="h-8 w-full cursor-pointer"
            />
          </div>
        )}

        {/* Margins */}
        <div className="grid grid-cols-3 gap-2">
          <div className="space-y-1">
            <Label className="text-xs">Margin L</Label>
            <Input
              type="number"
              value={taglineConfig.marginLeft}
              onChange={(e) => setTaglineConfig({ ...taglineConfig, marginLeft: Number(e.target.value) })}
              className="h-7 text-xs"
            />
          </div>
          <div className="space-y-1">
            <Label className="text-xs">Margin R</Label>
            <Input
              type="number"
              value={taglineConfig.marginRight}
              onChange={(e) => setTaglineConfig({ ...taglineConfig, marginRight: Number(e.target.value) })}
              className="h-7 text-xs"
            />
          </div>
          <div className="space-y-1">
            <Label className="text-xs">Margin Top</Label>
            <Input
              type="number"
              value={taglineConfig.marginTop}
              onChange={(e) => setTaglineConfig({ ...taglineConfig, marginTop: Number(e.target.value) })}
              className="h-7 text-xs"
            />
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium">Logo Configuration</CardTitle>
          <Button 
            size="sm" 
            onClick={handleSave}
            disabled={saving || !selectedLogo}
            className="h-7"
          >
            {saving ? (
              <Loader2 className="h-3 w-3 animate-spin mr-1" />
            ) : (
              <Save className="h-3 w-3 mr-1" />
            )}
            Save Logo
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Logo Version Selector */}
        <div className="space-y-2">
          <Label className="text-xs">Logo Version</Label>
          <Select 
            value={selectedLogoId || ''} 
            onValueChange={onLogoChange}
          >
            <SelectTrigger className="h-8 text-xs">
              <SelectValue placeholder="Select a logo version" />
            </SelectTrigger>
            <SelectContent>
              {logoVersions.map((logo) => (
                <SelectItem key={logo.id} value={logo.id}>
                  {logo.name} (v{logo.version})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Live Preview */}
        <div className="space-y-2">
          <Label className="text-xs">Live Preview</Label>
          <div 
            className="rounded-lg p-6 flex items-center justify-center border"
            style={{ backgroundColor: previewBgColor }}
          >
            <LogoRenderer
              config={{
                name: selectedLogo?.name || 'Preview',
                taglineText,
                everConfig,
                intentConfig,
                streakConfig,
                taglineConfig,
              }}
              accentHsl={accentHsl}
              scale={0.7}
            />
          </div>
        </div>

        {/* Element Controls */}
        <Accordion type="multiple" defaultValue={['ever', 'intent']} className="w-full">
          <TextElementEditor 
            label="Ever" 
            icon={<Type className="h-4 w-4" />}
            config={everConfig} 
            onChange={setEverConfig} 
          />
          <TextElementEditor 
            label="Intent" 
            icon={<Type className="h-4 w-4 text-accent" />}
            config={intentConfig} 
            onChange={setIntentConfig} 
          />
          <StreakEditor />
          <TaglineEditor />
        </Accordion>
      </CardContent>
    </Card>
  );
}
