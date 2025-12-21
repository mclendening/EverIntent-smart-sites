import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { HeroSection } from '@/components/home/HeroSection';
import { SocialProofBar } from '@/components/home/SocialProofBar';
import HowWeHelpSection from '@/components/home/HowWeHelpSection';
import { TransformationSection } from '@/components/home/TransformationSection';
import { PricingTeaser } from '@/components/home/PricingTeaser';
import { PortfolioPreview } from '@/components/home/PortfolioPreview';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';
import { IndustriesSection } from '@/components/home/IndustriesSection';
import { FinalCTASection } from '@/components/home/FinalCTASection';
import type { Tables } from '@/integrations/supabase/types';

type Theme = Tables<'site_themes'>;

export default function ThemeTestPage() {
  const [activeTheme, setActiveTheme] = useState<Theme | null>(null);

  // Fetch and apply the active theme
  useEffect(() => {
    const fetchActiveTheme = async () => {
      const { data } = await supabase
        .from('site_themes')
        .select('*')
        .eq('is_active', true)
        .maybeSingle();
      
      if (data) {
        setActiveTheme(data);
      }
    };

    fetchActiveTheme();

    // Subscribe to changes
    const channel = supabase
      .channel('theme-changes')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'site_themes' 
      }, () => {
        fetchActiveTheme();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Apply theme CSS variables when active theme changes
  useEffect(() => {
    if (!activeTheme) return;

    const root = document.documentElement;
    const accentConfig = activeTheme.accent_config as Record<string, any> || {};
    const staticColors = activeTheme.static_colors as Record<string, string> || {};
    const gradientConfigs = activeTheme.gradient_configs as Record<string, any> || {};

    // List of all CSS variables we'll set (for cleanup)
    const appliedVars: string[] = [];

    const setVar = (name: string, value: string) => {
      root.style.setProperty(name, value);
      appliedVars.push(name);
    };

    // Apply accent colors
    const accent = accentConfig.accent || '38 92% 50%';
    setVar('--accent', accent);
    if (accentConfig.accentHover) setVar('--accent-hover', accentConfig.accentHover);
    if (accentConfig.accentGlow) setVar('--accent-glow', accentConfig.accentGlow);
    if (accentConfig.accentForeground) setVar('--accent-foreground', accentConfig.accentForeground);

    // Apply all static colors
    const colorMappings: Record<string, string> = {
      primary: '--primary',
      primaryLight: '--primary-light',
      primaryForeground: '--primary-foreground',
      secondary: '--secondary',
      secondaryForeground: '--secondary-foreground',
      background: '--background',
      foreground: '--foreground',
      card: '--card',
      cardForeground: '--card-foreground',
      popover: '--popover',
      popoverForeground: '--popover-foreground',
      muted: '--muted',
      mutedForeground: '--muted-foreground',
      border: '--border',
      input: '--input',
      ring: '--ring',
      destructive: '--destructive',
      destructiveForeground: '--destructive-foreground',
    };

    Object.entries(colorMappings).forEach(([key, cssVar]) => {
      if (staticColors[key]) {
        setVar(cssVar, staticColors[key]);
      }
    });

    // Apply gradient configs
    if (gradientConfigs.hero) {
      setVar('--gradient-hero', gradientConfigs.hero);
    }
    if (gradientConfigs.cta) {
      setVar('--gradient-cta', gradientConfigs.cta);
    }
    if (gradientConfigs.text) {
      setVar('--gradient-text', gradientConfigs.text);
    }

    // Cleanup on unmount - remove all applied variables
    return () => {
      appliedVars.forEach(varName => {
        root.style.removeProperty(varName);
      });
    };
  }, [activeTheme]);

  return (
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
  );
}
