import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
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
  const [searchParams] = useSearchParams();
  const [activeTheme, setActiveTheme] = useState<Theme | null>(null);
  const themeId = searchParams.get('themeId');

  // Fetch theme by ID or most recently updated
  useEffect(() => {
    const fetchTheme = async () => {
      console.log('[ThemeTestPage] Fetching theme, themeId:', themeId);
      
      let query = supabase.from('site_themes').select('*');
      
      if (themeId) {
        query = query.eq('id', themeId);
      } else {
        query = query.order('updated_at', { ascending: false }).limit(1);
      }
      
      const { data, error } = await query.maybeSingle();
      
      console.log('[ThemeTestPage] Fetch result:', { data, error });
      
      if (data) {
        console.log('[ThemeTestPage] Setting theme:', data.name, 'accent:', (data.accent_config as any)?.accent);
        setActiveTheme(data);
      }
    };

    fetchTheme();

    // Subscribe to realtime changes
    const channel = supabase
      .channel(`theme-test-${themeId || 'latest'}`)
      .on('postgres_changes', { 
        event: 'UPDATE', 
        schema: 'public', 
        table: 'site_themes',
        filter: themeId ? `id=eq.${themeId}` : undefined
      }, (payload) => {
        console.log('[ThemeTestPage] Realtime update received:', payload);
        if (payload.new) {
          setActiveTheme(payload.new as Theme);
        }
      })
      .subscribe((status) => {
        console.log('[ThemeTestPage] Realtime subscription status:', status);
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [themeId]);

  // Apply theme CSS variables when active theme changes
  useEffect(() => {
    if (!activeTheme) {
      console.log('[ThemeTestPage] No active theme to apply');
      return;
    }

    console.log('[ThemeTestPage] Applying theme CSS vars:', activeTheme.name);

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
    <>
      <Header />
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
      <Footer />
    </>
  );
}
