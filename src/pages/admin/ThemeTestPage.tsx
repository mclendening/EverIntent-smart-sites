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

    // Apply accent color
    const accent = accentConfig.accent || '38 92% 50%';
    root.style.setProperty('--accent', accent);
    root.style.setProperty('--accent-foreground', staticColors.primary || '222 47% 11%');

    // Apply other theme colors
    if (staticColors.primary) {
      root.style.setProperty('--primary', staticColors.primary);
      root.style.setProperty('--primary-foreground', staticColors.background || '0 0% 100%');
    }
    if (staticColors.background) {
      root.style.setProperty('--background', staticColors.background);
    }
    if (staticColors.foreground) {
      root.style.setProperty('--foreground', staticColors.foreground);
    }

    // Cleanup on unmount
    return () => {
      root.style.removeProperty('--accent');
      root.style.removeProperty('--accent-foreground');
      root.style.removeProperty('--primary');
      root.style.removeProperty('--primary-foreground');
      root.style.removeProperty('--background');
      root.style.removeProperty('--foreground');
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
