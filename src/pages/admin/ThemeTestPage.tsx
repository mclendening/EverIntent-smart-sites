import { useEffect, useState, createContext, useContext } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Menu, ChevronDown, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CTAButton } from '@/components/CTAButton';
import { LogoRenderer } from '@/components/logo/LogoRenderer';
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

// Services dropdown items
const servicesItems = [
  { title: 'Beautiful Websites', path: '/beautiful-websites', description: 'Professional websites that get you customers' },
  { title: 'Get Found Online', path: '/get-found-online', description: 'SEO and local search visibility' },
  { title: 'Never Miss a Lead', path: '/never-miss-a-lead', description: 'Lead capture and follow-up' },
  { title: 'Book More Jobs', path: '/book-more-jobs', description: 'Online booking and scheduling' },
  { title: 'Run From Your Phone', path: '/run-from-your-phone', description: 'Mobile app access' },
  { title: 'Build Your Reputation', path: '/build-your-reputation', description: 'Review automation' },
  { title: 'Let AI Handle It', path: '/let-ai-handle-it', description: 'AI automation' },
];

// Industries dropdown items
const industriesItems = [
  { title: 'Home Services', path: '/industries/home-services', description: 'HVAC, Plumbing, Electrical & more' },
  { title: 'Professional Services', path: '/industries/professional-services', description: 'Legal, Real Estate, Accounting & more' },
  { title: 'Health & Wellness', path: '/industries/health-wellness', description: 'MedSpa, Dental, Chiropractic & more' },
  { title: 'Automotive Services', path: '/industries/automotive-services', description: 'Auto Repair, Detailing, Towing & more' },
];

// Dynamic Header that uses theme from context/props instead of static import
function DynamicHeader({ theme }: { theme: Theme | null }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileIndustriesOpen, setMobileIndustriesOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [industriesOpen, setIndustriesOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setMobileServicesOpen(false);
    setMobileIndustriesOpen(false);
  };

  // Extract logo config from theme if available
  const accentConfig = theme?.accent_config as Record<string, any> || {};
  const accentHsl = accentConfig.accent || '240 70% 60%';
  
  // Get logo config from linked logo_versions if available
  const logoConfig = theme ? {
    name: theme.name,
    taglineText: (theme as any).logo_versions?.tagline_text || 'Web Design & AI Automation',
    everConfig: (theme as any).logo_versions?.ever_config,
    intentConfig: (theme as any).logo_versions?.intent_config,
    streakConfig: (theme as any).logo_versions?.streak_config,
    taglineConfig: (theme as any).logo_versions?.tagline_config,
  } : undefined;

  const showScrolledStyles = isMounted && scrolled;

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        showScrolledStyles 
          ? 'bg-background/95 backdrop-blur-xl border-b border-border/30 shadow-layered' 
          : 'bg-transparent'
      }`}
    >
      {showScrolledStyles && (
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
      )}

      <div className="container flex h-20 items-center justify-between">
        {/* Logo - uses dynamic theme data */}
        <Link to="/" className="flex items-center group">
          <LogoRenderer 
            scale={0.42} 
            showTagline={true}
            accentHsl={accentHsl}
            config={logoConfig?.everConfig ? logoConfig : undefined}
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {/* Services Dropdown */}
          <div className="relative">
            <button 
              className={`nav-link flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium transition-all duration-300 ${
                servicesOpen 
                  ? 'text-accent' 
                  : 'text-foreground/70 hover:text-foreground'
              }`}
              onClick={() => setServicesOpen(!servicesOpen)}
              onBlur={() => setTimeout(() => setServicesOpen(false), 150)}
            >
              Services
              <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${servicesOpen ? 'rotate-180' : ''}`} />
            </button>
            {isMounted && servicesOpen && (
              <div className="absolute top-full left-0 mt-3 w-80 bg-card/95 backdrop-blur-xl border border-border/50 rounded-2xl shadow-layered-lg overflow-hidden animate-fade-in">
                <div className="absolute inset-0 bg-gradient-to-b from-accent/5 to-transparent pointer-events-none" />
                <div className="relative p-2">
                  {servicesItems.map((item, index) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className="flex flex-col items-start px-4 py-3 rounded-xl hover:bg-accent/10 transition-all duration-200 group"
                      onClick={() => setServicesOpen(false)}
                      style={{ animationDelay: `${index * 30}ms` }}
                    >
                      <span className="font-semibold text-foreground group-hover:text-accent transition-colors">{item.title}</span>
                      <span className="text-xs text-muted-foreground mt-0.5 group-hover:text-muted-foreground/80">{item.description}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Industries Dropdown */}
          <div className="relative">
            <button 
              className={`nav-link flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium transition-all duration-300 ${
                industriesOpen 
                  ? 'text-accent' 
                  : 'text-foreground/70 hover:text-foreground'
              }`}
              onClick={() => setIndustriesOpen(!industriesOpen)}
              onBlur={() => setTimeout(() => setIndustriesOpen(false), 150)}
            >
              Industries
              <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${industriesOpen ? 'rotate-180' : ''}`} />
            </button>
            {isMounted && industriesOpen && (
              <div className="absolute top-full left-0 mt-3 w-80 bg-card/95 backdrop-blur-xl border border-border/50 rounded-2xl shadow-layered-lg overflow-hidden animate-fade-in">
                <div className="absolute inset-0 bg-gradient-to-b from-accent/5 to-transparent pointer-events-none" />
                <div className="relative p-2">
                  {industriesItems.map((item, index) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className="flex flex-col items-start px-4 py-3 rounded-xl hover:bg-accent/10 transition-all duration-200 group"
                      onClick={() => setIndustriesOpen(false)}
                      style={{ animationDelay: `${index * 30}ms` }}
                    >
                      <span className="font-semibold text-foreground group-hover:text-accent transition-colors">{item.title}</span>
                      <span className="text-xs text-muted-foreground mt-0.5 group-hover:text-muted-foreground/80">{item.description}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="w-px h-5 bg-border/50 mx-2" />

          <Link to="/pricing" className="nav-link px-4 py-2.5 text-sm font-medium text-foreground/70 hover:text-foreground transition-all duration-300">
            Pricing
          </Link>
          <Link to="/our-work" className="nav-link px-4 py-2.5 text-sm font-medium text-foreground/70 hover:text-foreground transition-all duration-300">
            Our Work
          </Link>
          <Link to="/about" className="nav-link px-4 py-2.5 text-sm font-medium text-foreground/70 hover:text-foreground transition-all duration-300">
            About
          </Link>
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <CTAButton to="/pricing" defaultText="Get Started" hoverText="Let's Go!" />
        </div>

        {/* Mobile Menu Button */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="lg:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          <span className="sr-only">Toggle menu</span>
        </Button>
      </div>

      {/* Mobile Menu - simplified for theme test */}
      {isMounted && mobileMenuOpen && (
        <>
          <div 
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
            onClick={closeMobileMenu}
          />
          <div className="fixed top-20 right-0 bottom-0 w-full max-w-sm bg-card border-l border-border z-50 lg:hidden overflow-y-auto">
            <div className="flex flex-col p-6 space-y-2">
              <Link to="/pricing" className="py-3 text-lg font-semibold text-foreground" onClick={closeMobileMenu}>Pricing</Link>
              <Link to="/our-work" className="py-3 text-lg font-semibold text-foreground" onClick={closeMobileMenu}>Our Work</Link>
              <Link to="/about" className="py-3 text-lg font-semibold text-foreground" onClick={closeMobileMenu}>About</Link>
              <div className="pt-6">
                <CTAButton to="/pricing" defaultText="Get Started" hoverText="Let's Go!" onClick={closeMobileMenu} fullWidth />
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
}

export default function ThemeTestPage() {
  const [searchParams] = useSearchParams();
  const [activeTheme, setActiveTheme] = useState<Theme | null>(null);
  const themeId = searchParams.get('themeId');

  // Fetch theme by ID or most recently updated, including linked logo_versions
  useEffect(() => {
    const fetchTheme = async () => {
      console.log('[ThemeTestPage] Fetching theme, themeId:', themeId);
      
      let query = supabase
        .from('site_themes')
        .select('*, logo_versions(*)');
      
      if (themeId) {
        query = query.eq('id', themeId);
      } else {
        query = query.order('updated_at', { ascending: false }).limit(1);
      }
      
      const { data, error } = await query.maybeSingle();
      
      console.log('[ThemeTestPage] Fetch result:', { data, error });
      
      if (data) {
        console.log('[ThemeTestPage] Setting theme:', data.name, 'accent:', (data.accent_config as any)?.accent);
        console.log('[ThemeTestPage] Logo version:', data.logo_versions);
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
        // Refetch to get joined logo_versions
        fetchTheme();
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
    if (gradientConfigs.hero) setVar('--gradient-hero', gradientConfigs.hero);
    if (gradientConfigs.cta) setVar('--gradient-cta', gradientConfigs.cta);
    if (gradientConfigs.text) setVar('--gradient-text', gradientConfigs.text);

    return () => {
      appliedVars.forEach(varName => {
        root.style.removeProperty(varName);
      });
    };
  }, [activeTheme]);

  return (
    <>
      <DynamicHeader theme={activeTheme} />
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
