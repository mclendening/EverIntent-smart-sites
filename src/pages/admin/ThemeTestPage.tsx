import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Loader2 } from 'lucide-react';
import type { Tables } from '@/integrations/supabase/types';

// Import actual home page sections
import { HeroSection } from '@/components/home/HeroSection';
import { SocialProofBar } from '@/components/home/SocialProofBar';
import HowWeHelpSection from '@/components/home/HowWeHelpSection';
import { TransformationSection } from '@/components/home/TransformationSection';
import { PricingTeaser } from '@/components/home/PricingTeaser';
import { PortfolioPreview } from '@/components/home/PortfolioPreview';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';
import { IndustriesSection } from '@/components/home/IndustriesSection';
import { FinalCTASection } from '@/components/home/FinalCTASection';

type Theme = Tables<'site_themes'>;

export default function ThemeTestPage() {
  const [themes, setThemes] = useState<Theme[]>([]);
  const [selectedThemeId, setSelectedThemeId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Live HSL overrides for testing
  const [hueOverride, setHueOverride] = useState<number | null>(null);
  const [satOverride, setSatOverride] = useState<number | null>(null);
  const [lightOverride, setLightOverride] = useState<number | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const themesResult = await supabase.from('site_themes').select('*').order('name');
      if (themesResult.data) setThemes(themesResult.data);
      
      // Auto-select active theme
      const activeTheme = themesResult.data?.find(t => t.is_active);
      if (activeTheme) setSelectedThemeId(activeTheme.id);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const selectedTheme = themes.find(t => t.id === selectedThemeId);

  // Get accent color from theme
  const getAccentHsl = (): string => {
    if (!selectedTheme) return '38 92% 50%';
    
    const config = selectedTheme.accent_config as Record<string, any> || {};
    const baseAccent = config.accent || '38 92% 50%';
    
    // Apply overrides if set
    if (hueOverride !== null || satOverride !== null || lightOverride !== null) {
      const parts = baseAccent.split(' ').map((p: string) => parseFloat(p));
      const h = hueOverride ?? parts[0] ?? 38;
      const s = satOverride ?? parts[1] ?? 92;
      const l = lightOverride ?? parts[2] ?? 50;
      return `${h} ${s}% ${l}%`;
    }
    
    return baseAccent;
  };

  const accentHsl = getAccentHsl();

  // Apply theme overrides to CSS variables
  useEffect(() => {
    if (hueOverride !== null || satOverride !== null || lightOverride !== null) {
      document.documentElement.style.setProperty('--accent', accentHsl);
    }
    return () => {
      document.documentElement.style.removeProperty('--accent');
    };
  }, [accentHsl, hueOverride, satOverride, lightOverride]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Control Bar */}
      <div className="sticky top-0 z-50 border-b bg-card/95 backdrop-blur">
        <div className="container flex items-center justify-between h-14 gap-2 sm:gap-4 px-4">
          <div className="flex items-center gap-2 sm:gap-4">
            <Link to="/admin/themes">
              <Button variant="ghost" size="sm" className="px-2 sm:px-3">
                <ArrowLeft className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">Back</span>
              </Button>
            </Link>
            <h1 className="text-sm sm:text-lg font-semibold">Theme Test</h1>
          </div>
          
          <div className="flex items-center">
            <Select value={selectedThemeId || ''} onValueChange={setSelectedThemeId}>
              <SelectTrigger className="w-32 sm:w-48">
                <SelectValue placeholder="Theme" />
              </SelectTrigger>
              <SelectContent>
                {themes.map((theme) => (
                  <SelectItem key={theme.id} value={theme.id}>
                    {theme.name} {theme.is_active && '(Active)'}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Live HSL Controls */}
      <div className="border-b bg-muted/50">
        <div className="container py-3 sm:py-4 px-4">
          <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <Label className="text-xs text-muted-foreground">Hue</Label>
              <div className="flex items-center gap-2 mt-1">
                <Slider 
                  value={[hueOverride ?? 38]} 
                  max={360} 
                  onValueChange={(v) => setHueOverride(v[0])} 
                  className="flex-1"
                />
                <span className="text-xs w-8">{hueOverride ?? 38}°</span>
                <Button size="sm" variant="ghost" onClick={() => setHueOverride(null)} className="h-6 px-1.5 text-xs">
                  ×
                </Button>
              </div>
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Saturation</Label>
              <div className="flex items-center gap-2 mt-1">
                <Slider 
                  value={[satOverride ?? 92]} 
                  max={100} 
                  onValueChange={(v) => setSatOverride(v[0])} 
                  className="flex-1"
                />
                <span className="text-xs w-8">{satOverride ?? 92}%</span>
                <Button size="sm" variant="ghost" onClick={() => setSatOverride(null)} className="h-6 px-1.5 text-xs">
                  ×
                </Button>
              </div>
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Lightness</Label>
              <div className="flex items-center gap-2 mt-1">
                <Slider 
                  value={[lightOverride ?? 50]} 
                  max={100} 
                  onValueChange={(v) => setLightOverride(v[0])} 
                  className="flex-1"
                />
                <span className="text-xs w-8">{lightOverride ?? 50}%</span>
                <Button size="sm" variant="ghost" onClick={() => setLightOverride(null)} className="h-6 px-1.5 text-xs">
                  ×
                </Button>
              </div>
            </div>
            <div className="flex items-end gap-2">
              <div 
                className="h-8 sm:h-10 w-16 sm:w-20 rounded-lg border"
                style={{ backgroundColor: `hsl(${accentHsl})` }}
              />
              <code className="text-xs text-muted-foreground truncate">{accentHsl}</code>
            </div>
          </div>
        </div>
      </div>

      {/* Exact Home Page Content */}
      <main>
        <HeroSection />
        <SocialProofBar />
        <HowWeHelpSection />
        <TransformationSection />
        <PricingTeaser />
        <PortfolioPreview />
        <TestimonialsSection />
        <IndustriesSection />
        <FinalCTASection />
      </main>
    </div>
  );
}
