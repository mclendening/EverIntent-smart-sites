import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { LogoRenderer } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Palette, Loader2, Star, Check, Zap, Shield, Clock } from 'lucide-react';
import type { Tables } from '@/integrations/supabase/types';

type Theme = Tables<'site_themes'>;
type LogoVersion = Tables<'logo_versions'>;

export default function ThemeTestPage() {
  const [themes, setThemes] = useState<Theme[]>([]);
  const [logoVersions, setLogoVersions] = useState<LogoVersion[]>([]);
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
      const [themesResult, logosResult] = await Promise.all([
        supabase.from('site_themes').select('*').order('name'),
        supabase.from('logo_versions').select('*').order('version', { ascending: false })
      ]);

      if (themesResult.data) setThemes(themesResult.data);
      if (logosResult.data) setLogoVersions(logosResult.data);
      
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
  const logoForTheme = selectedTheme 
    ? logoVersions.find(l => l.id === selectedTheme.logo_version_id) || logoVersions[0]
    : logoVersions[0];

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

  // Get static colors from theme
  const getStaticColors = () => {
    if (!selectedTheme) {
      return {
        primary: '222 47% 11%',
        background: '0 0% 100%',
        foreground: '222 47% 11%',
        muted: '60 5% 96%',
        mutedForeground: '215 16% 47%',
      };
    }
    const colors = selectedTheme.static_colors as Record<string, string> || {};
    return {
      primary: colors.primary || '222 47% 11%',
      background: colors.background || '0 0% 100%',
      foreground: colors.foreground || '222 47% 11%',
      muted: colors.muted || '60 5% 96%',
      mutedForeground: colors.mutedForeground || '215 16% 47%',
    };
  };

  const staticColors = getStaticColors();
  const accentHsl = getAccentHsl();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: `hsl(${staticColors.background})` }}>
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

      {/* Hero Section Clone */}
      <section 
        className="relative py-20 px-4"
        style={{ 
          background: `linear-gradient(135deg, hsl(${staticColors.primary}) 0%, hsl(215 25% 27%) 50%, hsl(${staticColors.primary}) 100%)`
        }}
      >
        <div className="container max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              {/* Logo */}
              <div className="mb-8">
                {logoForTheme && (
                  <LogoRenderer 
                    config={logoForTheme}
                    scale={0.7}
                    showTagline={true}
                    accentHsl={accentHsl}
                  />
                )}
              </div>
              
              <h1 
                className="text-4xl lg:text-5xl font-bold leading-tight"
                style={{ color: `hsl(${staticColors.background})` }}
              >
                Beautiful Websites That{' '}
                <span style={{ color: `hsl(${accentHsl})` }}>
                  Work While You Sleep
                </span>
              </h1>
              
              <p 
                className="text-xl opacity-80"
                style={{ color: `hsl(${staticColors.background})` }}
              >
                Smart websites that capture leads, book appointments, and grow your business on autopilot.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Button 
                  size="lg" 
                  className="text-lg px-8"
                  style={{ 
                    backgroundColor: `hsl(${accentHsl})`,
                    color: `hsl(${staticColors.primary})`
                  }}
                >
                  Get Started
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="text-lg px-8"
                  style={{ 
                    borderColor: `hsl(${accentHsl})`,
                    color: `hsl(${accentHsl})`
                  }}
                >
                  View Our Work
                </Button>
              </div>
            </div>

            {/* Features Card */}
            <Card className="bg-white/10 backdrop-blur border-white/20">
              <CardHeader>
                <CardTitle style={{ color: `hsl(${staticColors.background})` }}>
                  What You Get
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { icon: Zap, text: 'Lightning-fast performance' },
                  { icon: Shield, text: 'Enterprise-grade security' },
                  { icon: Clock, text: '24/7 lead capture' },
                  { icon: Star, text: 'Review management' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div 
                      className="p-2 rounded-lg"
                      style={{ backgroundColor: `hsl(${accentHsl} / 0.2)` }}
                    >
                      <item.icon 
                        className="h-5 w-5" 
                        style={{ color: `hsl(${accentHsl})` }}
                      />
                    </div>
                    <span style={{ color: `hsl(${staticColors.background})` }}>
                      {item.text}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Social Proof Bar Clone */}
      <section 
        className="py-6 border-y"
        style={{ 
          backgroundColor: `hsl(${staticColors.muted})`,
          borderColor: `hsl(${staticColors.primary} / 0.1)`
        }}
      >
        <div className="container">
          <div className="flex flex-wrap justify-center items-center gap-8 text-center">
            {[
              { value: '500+', label: 'Websites Launched' },
              { value: '98%', label: 'Client Satisfaction' },
              { value: '24/7', label: 'Support Available' },
              { value: '50+', label: 'Industries Served' },
            ].map((stat, i) => (
              <div key={i} className="px-4">
                <div 
                  className="text-2xl font-bold"
                  style={{ color: `hsl(${accentHsl})` }}
                >
                  {stat.value}
                </div>
                <div 
                  className="text-sm"
                  style={{ color: `hsl(${staticColors.mutedForeground})` }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Cards Clone */}
      <section 
        className="py-20 px-4"
        style={{ backgroundColor: `hsl(${staticColors.background})` }}
      >
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 
              className="text-3xl font-bold mb-4"
              style={{ color: `hsl(${staticColors.foreground})` }}
            >
              Simple, Transparent Pricing
            </h2>
            <p style={{ color: `hsl(${staticColors.mutedForeground})` }}>
              Choose the plan that fits your business
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'Smart Site', price: '$149', features: ['5-page website', 'Mobile responsive', 'Basic SEO'] },
              { name: 'Smart Lead', price: '$249', popular: true, features: ['10-page website', 'Lead capture', 'CRM integration'] },
              { name: 'Smart Business', price: '$449', features: ['Unlimited pages', 'AI chatbot', 'Full automation'] },
            ].map((plan, i) => (
              <Card 
                key={i} 
                className={`relative ${plan.popular ? 'border-2' : ''}`}
                style={{ 
                  borderColor: plan.popular ? `hsl(${accentHsl})` : undefined 
                }}
              >
                {plan.popular && (
                  <Badge 
                    className="absolute -top-3 left-1/2 -translate-x-1/2"
                    style={{ 
                      backgroundColor: `hsl(${accentHsl})`,
                      color: `hsl(${staticColors.primary})`
                    }}
                  >
                    Most Popular
                  </Badge>
                )}
                <CardHeader className="text-center">
                  <CardTitle style={{ color: `hsl(${staticColors.foreground})` }}>
                    {plan.name}
                  </CardTitle>
                  <div className="mt-2">
                    <span 
                      className="text-4xl font-bold"
                      style={{ color: `hsl(${accentHsl})` }}
                    >
                      {plan.price}
                    </span>
                    <span style={{ color: `hsl(${staticColors.mutedForeground})` }}>
                      /month
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {plan.features.map((feature, j) => (
                    <div key={j} className="flex items-center gap-2">
                      <Check 
                        className="h-4 w-4" 
                        style={{ color: `hsl(${accentHsl})` }}
                      />
                      <span style={{ color: `hsl(${staticColors.foreground})` }}>
                        {feature}
                      </span>
                    </div>
                  ))}
                  <Button 
                    className="w-full mt-4"
                    variant={plan.popular ? 'default' : 'outline'}
                    style={plan.popular ? { 
                      backgroundColor: `hsl(${accentHsl})`,
                      color: `hsl(${staticColors.primary})`
                    } : {
                      borderColor: `hsl(${accentHsl})`,
                      color: `hsl(${accentHsl})`
                    }}
                  >
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section Clone */}
      <section 
        className="py-20 px-4"
        style={{ 
          background: `linear-gradient(135deg, hsl(${accentHsl}) 0%, hsl(${accentHsl} / 0.8) 100%)`
        }}
      >
        <div className="container max-w-4xl mx-auto text-center">
          <h2 
            className="text-3xl lg:text-4xl font-bold mb-6"
            style={{ color: `hsl(${staticColors.primary})` }}
          >
            Ready to Transform Your Business?
          </h2>
          <p 
            className="text-xl mb-8 opacity-90"
            style={{ color: `hsl(${staticColors.primary})` }}
          >
            Join 500+ businesses already growing with EverIntent
          </p>
          <Button 
            size="lg" 
            className="text-lg px-8"
            style={{ 
              backgroundColor: `hsl(${staticColors.primary})`,
              color: `hsl(${staticColors.background})`
            }}
          >
            Schedule Your Free Strategy Call
          </Button>
        </div>
      </section>

      {/* Footer Clone */}
      <footer 
        className="py-12 px-4"
        style={{ backgroundColor: `hsl(${staticColors.primary})` }}
      >
        <div className="container max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Logo in footer */}
            {logoForTheme && (
              <LogoRenderer 
                config={logoForTheme}
                scale={0.5}
                showTagline={false}
                accentHsl={accentHsl}
              />
            )}
            
            <p 
              className="text-sm opacity-60"
              style={{ color: `hsl(${staticColors.background})` }}
            >
              © 2025 EverIntent LLC. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
