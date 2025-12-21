import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { LogoRenderer } from '@/components/logo';
import { ArrowLeft, Palette, Edit, Trash2, Check, Loader2, Eye } from 'lucide-react';
import type { Tables, Json } from '@/integrations/supabase/types';

type Theme = Tables<'site_themes'>;
type LogoVersion = Tables<'logo_versions'>;

// Preset solid colors
const presetColors = [
  '#ffffff', '#F97316', '#3B82F6', '#22C55E', '#A855F7', 
  '#EF4444', '#06B6D4', '#EAB308', '#000000', '#6B7280'
];

interface AccentConfig {
  accent: string;
  h: number;
  s: number;
  l: number;
  useGradient?: boolean;
  gradientFrom?: string;
  gradientTo?: string;
  gradientAngle?: number;
}

interface StaticColors {
  primary: string;
  background: string;
  foreground: string;
}

interface GradientConfig {
  hero?: {
    from: string;
    to: string;
    angle: number;
  };
  cta?: {
    from: string;
    to: string;
    angle: number;
  };
}

export default function AdminThemes() {
  const { user, signOut } = useAdminAuth();
  const { toast } = useToast();
  
  const [themes, setThemes] = useState<Theme[]>([]);
  const [logoVersions, setLogoVersions] = useState<LogoVersion[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTheme, setSelectedTheme] = useState<Theme | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Parsed config states for editing
  const [accentConfig, setAccentConfig] = useState<AccentConfig>({
    accent: '38 92% 50%',
    h: 38,
    s: 92,
    l: 50,
  });
  const [staticColors, setStaticColors] = useState<StaticColors>({
    primary: '222 47% 11%',
    background: '0 0% 100%',
    foreground: '222 47% 11%',
  });
  const [gradientConfigs, setGradientConfigs] = useState<GradientConfig>({});

  // Fetch themes and logo versions
  useEffect(() => {
    fetchData();
  }, []);

  // Parse configs when theme is selected
  useEffect(() => {
    if (selectedTheme) {
      const accent = selectedTheme.accent_config as Record<string, any> || {};
      const accentStr = accent.accent || '38 92% 50%';
      const parts = accentStr.split(' ').map((p: string) => parseFloat(p));
      
      setAccentConfig({
        accent: accentStr,
        h: parts[0] || 38,
        s: parts[1] || 92,
        l: parts[2] || 50,
        useGradient: accent.useGradient || false,
        gradientFrom: accent.gradientFrom || '#F97316',
        gradientTo: accent.gradientTo || '#EF4444',
        gradientAngle: accent.gradientAngle || 90,
      });

      const colors = selectedTheme.static_colors as Record<string, string> || {};
      setStaticColors({
        primary: colors.primary || '222 47% 11%',
        background: colors.background || '0 0% 100%',
        foreground: colors.foreground || '222 47% 11%',
      });

      setGradientConfigs(selectedTheme.gradient_configs as GradientConfig || {});
    }
  }, [selectedTheme]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [themesResult, logosResult] = await Promise.all([
        supabase.from('site_themes').select('*').order('name'),
        supabase.from('logo_versions').select('*').order('version', { ascending: false })
      ]);

      if (themesResult.error) throw themesResult.error;
      if (logosResult.error) throw logosResult.error;

      setThemes(themesResult.data || []);
      setLogoVersions(logosResult.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to load themes',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSetActive = async (theme: Theme) => {
    try {
      await supabase.from('site_themes').update({ is_active: false }).neq('id', 'placeholder');
      const { error } = await supabase
        .from('site_themes')
        .update({ is_active: true })
        .eq('id', theme.id);

      if (error) throw error;

      toast({
        title: 'Theme activated',
        description: `"${theme.name}" is now the active theme.`,
      });

      fetchData();
    } catch (error) {
      console.error('Error setting active theme:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to activate theme',
      });
    }
  };

  const handleSave = async () => {
    if (!selectedTheme) return;
    
    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('site_themes')
        .update({
          name: selectedTheme.name,
          base_hue: selectedTheme.base_hue,
          accent_config: {
            accent: `${accentConfig.h} ${accentConfig.s}% ${accentConfig.l}%`,
            h: accentConfig.h,
            s: accentConfig.s,
            l: accentConfig.l,
            useGradient: accentConfig.useGradient,
            gradientFrom: accentConfig.gradientFrom,
            gradientTo: accentConfig.gradientTo,
            gradientAngle: accentConfig.gradientAngle,
          } as unknown as Json,
          static_colors: staticColors as unknown as Json,
          gradient_configs: gradientConfigs as unknown as Json,
          changelog_notes: selectedTheme.changelog_notes,
        })
        .eq('id', selectedTheme.id);

      if (error) throw error;

      toast({
        title: 'Theme saved',
        description: `"${selectedTheme.name}" has been updated.`,
      });

      setIsEditing(false);
      fetchData();
    } catch (error) {
      console.error('Error saving theme:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to save theme',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (theme: Theme) => {
    if (!confirm(`Are you sure you want to delete "${theme.name}"?`)) return;

    try {
      const { error } = await supabase
        .from('site_themes')
        .delete()
        .eq('id', theme.id);

      if (error) throw error;

      toast({
        title: 'Theme deleted',
        description: `"${theme.name}" has been removed.`,
      });

      if (selectedTheme?.id === theme.id) {
        setSelectedTheme(null);
        setIsEditing(false);
      }
      fetchData();
    } catch (error) {
      console.error('Error deleting theme:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to delete theme',
      });
    }
  };

  const getLogoForTheme = (theme: Theme): LogoVersion | undefined => {
    return logoVersions.find(l => l.id === theme.logo_version_id) || logoVersions[0];
  };

  const getAccentColor = (theme: Theme): string => {
    const config = theme.accent_config as Record<string, string>;
    return config?.accent || '38 92% 50%';
  };

  const hslToHex = (h: number, s: number, l: number): string => {
    const sNorm = s / 100;
    const lNorm = l / 100;
    const c = (1 - Math.abs(2 * lNorm - 1)) * sNorm;
    const x = c * (1 - Math.abs((h / 60) % 2 - 1));
    const m = lNorm - c / 2;
    let r = 0, g = 0, b = 0;
    if (h < 60) { r = c; g = x; }
    else if (h < 120) { r = x; g = c; }
    else if (h < 180) { g = c; b = x; }
    else if (h < 240) { g = x; b = c; }
    else if (h < 300) { r = x; b = c; }
    else { r = c; b = x; }
    const toHex = (n: number) => Math.round((n + m) * 255).toString(16).padStart(2, '0');
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  };

  // Color Controls Component
  const ColorSliderControls = ({ 
    label,
    hsl,
    onHslChange,
    showGradient = false,
    gradient,
    onGradientChange,
  }: { 
    label: string;
    hsl: { h: number; s: number; l: number };
    onHslChange: (hsl: { h: number; s: number; l: number }) => void;
    showGradient?: boolean;
    gradient?: { useGradient?: boolean; gradientFrom?: string; gradientTo?: string; gradientAngle?: number };
    onGradientChange?: (g: { useGradient?: boolean; gradientFrom?: string; gradientTo?: string; gradientAngle?: number }) => void;
  }) => (
    <AccordionItem value={label.toLowerCase().replace(/\s/g, '-')}>
      <AccordionTrigger className="text-sm py-2">{label}</AccordionTrigger>
      <AccordionContent className="space-y-3 pb-4">
        <Tabs defaultValue="hsl" className="w-full">
          <TabsList className="grid w-full grid-cols-3 h-8">
            <TabsTrigger value="preset" className="text-xs">Preset</TabsTrigger>
            <TabsTrigger value="hsl" className="text-xs">HSL</TabsTrigger>
            {showGradient && <TabsTrigger value="gradient" className="text-xs">Gradient</TabsTrigger>}
          </TabsList>
          
          <TabsContent value="preset" className="mt-2 space-y-2">
            <div className="flex flex-wrap gap-1">
              {presetColors.map((c) => (
                <button
                  key={c}
                  className="w-6 h-6 rounded border border-border hover:ring-2 hover:ring-primary"
                  style={{ backgroundColor: c }}
                  onClick={() => {
                    // Convert hex to HSL (simplified)
                    onHslChange({ h: 38, s: 92, l: 50 });
                  }}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="hsl" className="mt-2 space-y-3">
            <div className="flex items-center gap-3">
              <div 
                className="h-10 w-10 rounded-lg border shrink-0"
                style={{ backgroundColor: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` }}
              />
              <div className="text-xs text-muted-foreground font-mono">
                {hsl.h}° {hsl.s}% {hsl.l}%
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Hue</span><span>{hsl.h}°</span>
              </div>
              <Slider 
                value={[hsl.h]} 
                max={360} 
                onValueChange={(v) => onHslChange({ ...hsl, h: v[0] })} 
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Saturation</span><span>{hsl.s}%</span>
              </div>
              <Slider 
                value={[hsl.s]} 
                max={100} 
                onValueChange={(v) => onHslChange({ ...hsl, s: v[0] })} 
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Lightness</span><span>{hsl.l}%</span>
              </div>
              <Slider 
                value={[hsl.l]} 
                max={100} 
                onValueChange={(v) => onHslChange({ ...hsl, l: v[0] })} 
              />
            </div>
          </TabsContent>

          {showGradient && gradient && onGradientChange && (
            <TabsContent value="gradient" className="mt-2 space-y-3">
              <div className="flex items-center gap-2">
                <Switch 
                  checked={gradient.useGradient || false} 
                  onCheckedChange={(v) => onGradientChange({ ...gradient, useGradient: v })} 
                />
                <Label className="text-xs">Enable Gradient</Label>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label className="text-xs text-muted-foreground">From</Label>
                  <Input 
                    type="color" 
                    value={gradient.gradientFrom || '#F97316'} 
                    onChange={(e) => onGradientChange({ ...gradient, gradientFrom: e.target.value })} 
                    className="h-8 cursor-pointer" 
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs text-muted-foreground">To</Label>
                  <Input 
                    type="color" 
                    value={gradient.gradientTo || '#EF4444'} 
                    onChange={(e) => onGradientChange({ ...gradient, gradientTo: e.target.value })} 
                    className="h-8 cursor-pointer"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Angle</span><span>{gradient.gradientAngle || 90}°</span>
                </div>
                <Slider 
                  value={[gradient.gradientAngle || 90]} 
                  max={360} 
                  onValueChange={(v) => onGradientChange({ ...gradient, gradientAngle: v[0] })} 
                />
              </div>
              {gradient.useGradient && (
                <div 
                  className="h-8 rounded-lg border"
                  style={{ 
                    background: `linear-gradient(${gradient.gradientAngle || 90}deg, ${gradient.gradientFrom || '#F97316'}, ${gradient.gradientTo || '#EF4444'})` 
                  }}
                />
              )}
            </TabsContent>
          )}
        </Tabs>
      </AccordionContent>
    </AccordionItem>
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2 sm:gap-4">
            <Link to="/admin">
              <Button variant="ghost" size="sm" className="px-2 sm:px-3">
                <ArrowLeft className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">Back</span>
              </Button>
            </Link>
            <h1 className="text-base sm:text-xl font-bold">Themes</h1>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <Link to="/admin/theme-test">
              <Button variant="outline" size="sm" className="text-xs sm:text-sm">
                <Eye className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">Test Page</span>
              </Button>
            </Link>
            <span className="hidden md:inline text-sm text-muted-foreground">{user?.email}</span>
          </div>
        </div>
      </header>

      <main className="container py-8">
        <div className="grid gap-8 lg:grid-cols-[300px_1fr]">
          {/* Theme List */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Themes ({themes.length})</h2>
            <ScrollArea className="h-[calc(100vh-12rem)]">
              <div className="space-y-2 pr-4">
                {themes.map((theme) => {
                  const accentColor = getAccentColor(theme);
                  
                  return (
                    <Card 
                      key={theme.id}
                      className={`cursor-pointer transition-all ${
                        selectedTheme?.id === theme.id 
                          ? 'ring-2 ring-primary' 
                          : 'hover:border-primary/50'
                      }`}
                      onClick={() => {
                        setSelectedTheme(theme);
                        setIsEditing(false);
                      }}
                    >
                      <CardHeader className="p-3">
                        <div className="flex items-center gap-3">
                          <div 
                            className="h-8 w-8 rounded-lg border shrink-0"
                            style={{ backgroundColor: `hsl(${accentColor})` }}
                          />
                          <div className="min-w-0 flex-1">
                            <CardTitle className="text-sm flex items-center gap-2 truncate">
                              {theme.name}
                              {theme.is_active && (
                                <Badge variant="default" className="text-[10px] px-1.5 py-0">
                                  Active
                                </Badge>
                              )}
                            </CardTitle>
                            <CardDescription className="text-xs">
                              v{theme.version} • Hue {theme.base_hue}°
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                    </Card>
                  );
                })}
              </div>
            </ScrollArea>
          </div>

          {/* Theme Editor */}
          <div className="space-y-4">
            {selectedTheme ? (
              <Card>
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Palette className="h-5 w-5" />
                        {isEditing ? 'Edit Theme' : selectedTheme.name}
                      </CardTitle>
                      <CardDescription>
                        {isEditing ? 'Adjust colors and settings' : 'Click Edit to modify'}
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      {!selectedTheme.is_active && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleSetActive(selectedTheme)}
                        >
                          <Check className="mr-2 h-4 w-4" />
                          Set Active
                        </Button>
                      )}
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Eye className="mr-2 h-4 w-4" />
                            Preview
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-lg">
                          <DialogHeader>
                            <DialogTitle>Preview: {selectedTheme.name}</DialogTitle>
                            <DialogDescription>
                              Logo preview with current theme colors
                            </DialogDescription>
                          </DialogHeader>
                          <div 
                            className="rounded-lg p-8 flex items-center justify-center"
                            style={{ backgroundColor: `hsl(${staticColors.primary})` }}
                          >
                            {getLogoForTheme(selectedTheme) && (
                              <LogoRenderer 
                                config={getLogoForTheme(selectedTheme)!}
                                accentHsl={`${accentConfig.h} ${accentConfig.s}% ${accentConfig.l}%`}
                              />
                            )}
                          </div>
                        </DialogContent>
                      </Dialog>
                      {!selectedTheme.is_active && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-destructive hover:text-destructive"
                          onClick={() => handleDelete(selectedTheme)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                      {isEditing ? (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setIsEditing(false);
                              const original = themes.find(t => t.id === selectedTheme.id);
                              if (original) setSelectedTheme(original);
                            }}
                          >
                            Cancel
                          </Button>
                          <Button
                            size="sm"
                            onClick={handleSave}
                            disabled={isSaving}
                          >
                            {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Save
                          </Button>
                        </>
                      ) : (
                        <Button
                          size="sm"
                          onClick={() => setIsEditing(true)}
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </Button>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {isEditing ? (
                    <div className="grid gap-6 lg:grid-cols-2">
                      {/* Left Column - Basic Settings */}
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label>Theme Name</Label>
                          <Input
                            value={selectedTheme.name}
                            onChange={(e) => setSelectedTheme({ ...selectedTheme, name: e.target.value })}
                          />
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <Label>Base Hue</Label>
                            <span className="text-sm text-muted-foreground">{selectedTheme.base_hue}°</span>
                          </div>
                          <Slider
                            value={[selectedTheme.base_hue]}
                            max={360}
                            onValueChange={(v) => setSelectedTheme({ 
                              ...selectedTheme, 
                              base_hue: v[0]
                            })}
                          />
                          <div 
                            className="h-6 rounded-lg border"
                            style={{ 
                              background: `linear-gradient(90deg, 
                                hsl(0, 70%, 50%), 
                                hsl(60, 70%, 50%), 
                                hsl(120, 70%, 50%), 
                                hsl(180, 70%, 50%), 
                                hsl(240, 70%, 50%), 
                                hsl(300, 70%, 50%), 
                                hsl(360, 70%, 50%)
                              )`
                            }}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Changelog Notes</Label>
                          <Textarea
                            value={selectedTheme.changelog_notes || ''}
                            onChange={(e) => setSelectedTheme({ 
                              ...selectedTheme, 
                              changelog_notes: e.target.value 
                            })}
                            placeholder="Describe changes made..."
                            rows={3}
                          />
                        </div>

                        {/* Live Preview */}
                        <div className="space-y-2">
                          <Label>Live Preview</Label>
                          <div 
                            className="rounded-lg p-6 flex items-center justify-center border"
                            style={{ backgroundColor: `hsl(${staticColors.primary})` }}
                          >
                            {getLogoForTheme(selectedTheme) && (
                              <LogoRenderer 
                                config={getLogoForTheme(selectedTheme)!}
                                accentHsl={`${accentConfig.h} ${accentConfig.s}% ${accentConfig.l}%`}
                              />
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Right Column - Color Controls */}
                      <div className="space-y-2">
                        <Label className="text-base font-semibold">Color Controls</Label>
                        <ScrollArea className="h-[500px] pr-4">
                          <Accordion type="multiple" defaultValue={['accent-color', 'primary-background', 'gradients']} className="w-full">
                            <ColorSliderControls
                              label="Accent Color"
                              hsl={{ h: accentConfig.h, s: accentConfig.s, l: accentConfig.l }}
                              onHslChange={(hsl) => setAccentConfig({ ...accentConfig, ...hsl })}
                              showGradient
                              gradient={accentConfig}
                              onGradientChange={(g) => setAccentConfig({ ...accentConfig, ...g })}
                            />

                            <AccordionItem value="primary-background">
                              <AccordionTrigger className="text-sm py-2">Primary Background</AccordionTrigger>
                              <AccordionContent className="space-y-3 pb-4">
                                <div className="space-y-2">
                                  <Label className="text-xs text-muted-foreground">HSL Value</Label>
                                  <Input
                                    value={staticColors.primary}
                                    onChange={(e) => setStaticColors({ ...staticColors, primary: e.target.value })}
                                    placeholder="222 47% 11%"
                                    className="font-mono text-sm"
                                  />
                                </div>
                                <div 
                                  className="h-10 rounded-lg border"
                                  style={{ backgroundColor: `hsl(${staticColors.primary})` }}
                                />
                              </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="gradients">
                              <AccordionTrigger className="text-sm py-2">Gradient Configs</AccordionTrigger>
                              <AccordionContent className="space-y-4 pb-4">
                                <div className="space-y-3">
                                  <Label className="text-xs font-medium">Hero Gradient</Label>
                                  <div className="grid grid-cols-2 gap-2">
                                    <div className="space-y-1">
                                      <Label className="text-xs text-muted-foreground">From</Label>
                                      <Input 
                                        type="color" 
                                        value={gradientConfigs.hero?.from || '#F97316'} 
                                        onChange={(e) => setGradientConfigs({ 
                                          ...gradientConfigs, 
                                          hero: { ...gradientConfigs.hero, from: e.target.value, to: gradientConfigs.hero?.to || '#EF4444', angle: gradientConfigs.hero?.angle || 90 }
                                        })} 
                                        className="h-8 cursor-pointer" 
                                      />
                                    </div>
                                    <div className="space-y-1">
                                      <Label className="text-xs text-muted-foreground">To</Label>
                                      <Input 
                                        type="color" 
                                        value={gradientConfigs.hero?.to || '#EF4444'} 
                                        onChange={(e) => setGradientConfigs({ 
                                          ...gradientConfigs, 
                                          hero: { ...gradientConfigs.hero, from: gradientConfigs.hero?.from || '#F97316', to: e.target.value, angle: gradientConfigs.hero?.angle || 90 }
                                        })} 
                                        className="h-8 cursor-pointer"
                                      />
                                    </div>
                                  </div>
                                  <div className="space-y-1">
                                    <div className="flex justify-between text-xs text-muted-foreground">
                                      <span>Angle</span><span>{gradientConfigs.hero?.angle || 90}°</span>
                                    </div>
                                    <Slider 
                                      value={[gradientConfigs.hero?.angle || 90]} 
                                      max={360} 
                                      onValueChange={(v) => setGradientConfigs({ 
                                        ...gradientConfigs, 
                                        hero: { ...gradientConfigs.hero, from: gradientConfigs.hero?.from || '#F97316', to: gradientConfigs.hero?.to || '#EF4444', angle: v[0] }
                                      })} 
                                    />
                                  </div>
                                  <div 
                                    className="h-8 rounded-lg border"
                                    style={{ 
                                      background: `linear-gradient(${gradientConfigs.hero?.angle || 90}deg, ${gradientConfigs.hero?.from || '#F97316'}, ${gradientConfigs.hero?.to || '#EF4444'})` 
                                    }}
                                  />
                                </div>

                                <div className="space-y-3">
                                  <Label className="text-xs font-medium">CTA Gradient</Label>
                                  <div className="grid grid-cols-2 gap-2">
                                    <div className="space-y-1">
                                      <Label className="text-xs text-muted-foreground">From</Label>
                                      <Input 
                                        type="color" 
                                        value={gradientConfigs.cta?.from || '#3B82F6'} 
                                        onChange={(e) => setGradientConfigs({ 
                                          ...gradientConfigs, 
                                          cta: { ...gradientConfigs.cta, from: e.target.value, to: gradientConfigs.cta?.to || '#8B5CF6', angle: gradientConfigs.cta?.angle || 90 }
                                        })} 
                                        className="h-8 cursor-pointer" 
                                      />
                                    </div>
                                    <div className="space-y-1">
                                      <Label className="text-xs text-muted-foreground">To</Label>
                                      <Input 
                                        type="color" 
                                        value={gradientConfigs.cta?.to || '#8B5CF6'} 
                                        onChange={(e) => setGradientConfigs({ 
                                          ...gradientConfigs, 
                                          cta: { ...gradientConfigs.cta, from: gradientConfigs.cta?.from || '#3B82F6', to: e.target.value, angle: gradientConfigs.cta?.angle || 90 }
                                        })} 
                                        className="h-8 cursor-pointer"
                                      />
                                    </div>
                                  </div>
                                  <div className="space-y-1">
                                    <div className="flex justify-between text-xs text-muted-foreground">
                                      <span>Angle</span><span>{gradientConfigs.cta?.angle || 90}°</span>
                                    </div>
                                    <Slider 
                                      value={[gradientConfigs.cta?.angle || 90]} 
                                      max={360} 
                                      onValueChange={(v) => setGradientConfigs({ 
                                        ...gradientConfigs, 
                                        cta: { ...gradientConfigs.cta, from: gradientConfigs.cta?.from || '#3B82F6', to: gradientConfigs.cta?.to || '#8B5CF6', angle: v[0] }
                                      })} 
                                    />
                                  </div>
                                  <div 
                                    className="h-8 rounded-lg border"
                                    style={{ 
                                      background: `linear-gradient(${gradientConfigs.cta?.angle || 90}deg, ${gradientConfigs.cta?.from || '#3B82F6'}, ${gradientConfigs.cta?.to || '#8B5CF6'})` 
                                    }}
                                  />
                                </div>
                              </AccordionContent>
                            </AccordionItem>
                          </Accordion>
                        </ScrollArea>
                      </div>
                    </div>
                  ) : (
                    /* View Mode */
                    <div className="grid gap-6 lg:grid-cols-2">
                      <div className="space-y-4">
                        <div>
                          <Label className="text-muted-foreground text-xs">Base Hue</Label>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="font-medium">{selectedTheme.base_hue}°</span>
                            <div 
                              className="h-6 w-12 rounded border"
                              style={{ backgroundColor: `hsl(${selectedTheme.base_hue}, 70%, 50%)` }}
                            />
                          </div>
                        </div>

                        <div>
                          <Label className="text-muted-foreground text-xs">Accent Color</Label>
                          <div className="flex items-center gap-2 mt-1">
                            <div 
                              className="h-8 w-8 rounded-lg border"
                              style={{ backgroundColor: `hsl(${accentConfig.h}, ${accentConfig.s}%, ${accentConfig.l}%)` }}
                            />
                            <span className="font-mono text-sm">{accentConfig.h}° {accentConfig.s}% {accentConfig.l}%</span>
                          </div>
                        </div>

                        <div>
                          <Label className="text-muted-foreground text-xs">Changelog Notes</Label>
                          <p className="text-sm mt-1">{selectedTheme.changelog_notes || 'No notes'}</p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-muted-foreground text-xs">Logo Preview</Label>
                        <div 
                          className="rounded-lg p-6 flex items-center justify-center border"
                          style={{ backgroundColor: `hsl(${staticColors.primary})` }}
                        >
                          {getLogoForTheme(selectedTheme) && (
                            <LogoRenderer 
                              config={getLogoForTheme(selectedTheme)!}
                              accentHsl={`${accentConfig.h} ${accentConfig.s}% ${accentConfig.l}%`}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ) : (
              <Card className="flex items-center justify-center h-64">
                <div className="text-center text-muted-foreground">
                  <Palette className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Select a theme to view details</p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
