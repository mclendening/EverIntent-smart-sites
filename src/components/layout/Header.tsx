/**
 * @fileoverview Header Component - Main Site Navigation
 * @description Responsive header with logo, navigation dropdowns, and CTA.
 *              Features scroll-aware styling and mobile menu drawer.
 * 
 * @module components/layout/Header
 * @see {@link https://docs.lovable.dev} Lovable Documentation
 * 
 * @brd-reference BRD v34.0 Section 17 - Navigation Structure
 * @brd-reference BRD v34.0 Section 17.1 - Smart Websites Dropdown
 * @brd-reference BRD v34.0 Section 17.2 - Industries Dropdown
 */

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, ChevronDown, X } from 'lucide-react';
import { NavLink } from '@/components/NavLink';
import { Button } from '@/components/ui/button';
import { CTAButton } from '@/components/CTAButton';
import { LogoRenderer } from '@/components/logo/LogoRenderer';
import { activeTheme } from '@/config/themes';

/**
 * Smart Websites dropdown items - per BRD v34.0 nav structure
 * @constant {Array<{title: string, path: string, description: string}>}
 */
const smartWebsitesItems = [
  { title: 'Smart Websites', path: '/smart-websites', description: 'Professional smart websites starting at $249' },
  { title: 'Get Found Online', path: '/get-found-online', description: 'SEO and local search visibility' },
  { title: 'Never Miss a Lead', path: '/never-miss-a-lead', description: 'Lead capture and follow-up' },
  { title: 'Book More Jobs', path: '/book-more-jobs', description: 'Online booking and scheduling' },
  { title: 'Run From Your Phone', path: '/run-from-your-phone', description: 'Mobile app access' },
  { title: 'Build Your Reputation', path: '/build-your-reputation', description: 'Review automation' },
];

/**
 * Solutions dropdown items - external verticals per BRD v34.0
 * @constant {Array<{title: string, path: string, description: string, external?: boolean}>}
 */
const solutionsItems = [
  { title: 'For Law Firms', path: 'https://everintentlegalai.com', description: 'Legal AI solutions', external: true },
];

/**
 * Industries dropdown items - Hub pages per BRD
 * @constant {Array<{title: string, path: string, description: string}>}
 */
const industriesItems = [
  { title: 'Home Services', path: '/industries/home-services', description: 'HVAC, Plumbing, Electrical & more' },
  { title: 'Professional Services', path: '/industries/professional-services', description: 'Legal, Real Estate, Accounting & more' },
  { title: 'Health & Wellness', path: '/industries/health-wellness', description: 'MedSpa, Dental, Chiropractic & more' },
  { title: 'Automotive Services', path: '/industries/automotive-services', description: 'Auto Repair, Detailing, Towing & more' },
];

/**
 * Header - Main site navigation component
 * 
 * Features per BRD v34.0:
 * - Fixed position with scroll-aware styling
 * - Logo with tagline (from theme config)
 * - Smart Websites dropdown (benefit-oriented pages)
 * - AI & Automation static link
 * - Industries dropdown (hub pages)
 * - Solutions dropdown (external verticals)
 * - Static links: Pricing, Our Work, About
 * - Primary CTA button
 * - Mobile hamburger menu with full nav
 * 
 * SSG-safe: Uses isMounted state to prevent hydration mismatches
 * 
 * @component
 * @returns {JSX.Element} Header with navigation
 */
export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSmartWebsitesOpen, setMobileSmartWebsitesOpen] = useState(false);
  const [mobileIndustriesOpen, setMobileIndustriesOpen] = useState(false);
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false);
  const [smartWebsitesOpen, setSmartWebsitesOpen] = useState(false);
  const [industriesOpen, setIndustriesOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
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
    setMobileSmartWebsitesOpen(false);
    setMobileIndustriesOpen(false);
    setMobileSolutionsOpen(false);
  };

  // Use scrolled state only after mount to prevent hydration mismatch
  const showScrolledStyles = isMounted && scrolled;

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        showScrolledStyles 
          ? 'bg-background/95 backdrop-blur-xl border-b border-border/30 shadow-layered' 
          : 'bg-transparent'
      }`}
    >
      {/* Subtle gradient line at bottom when scrolled */}
      {showScrolledStyles && (
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
      )}

      <div className="container flex h-20 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center group">
          <LogoRenderer 
            scale={0.42} 
            showTagline={true}
            accentHsl={activeTheme.accentConfig.accent}
            config={activeTheme.logoConfig ? {
              name: activeTheme.name,
              taglineText: activeTheme.logoConfig.taglineText,
              everConfig: activeTheme.logoConfig.everConfig,
              intentConfig: activeTheme.logoConfig.intentConfig,
              streakConfig: activeTheme.logoConfig.streakConfig,
              taglineConfig: activeTheme.logoConfig.taglineConfig,
            } : undefined}
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {/* Smart Websites Dropdown */}
          <div className="relative">
            <button 
              className={`nav-link flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium transition-all duration-300 ${
                smartWebsitesOpen 
                  ? 'text-accent' 
                  : 'text-foreground/70 hover:text-foreground'
              }`}
              onClick={() => setSmartWebsitesOpen(!smartWebsitesOpen)}
              onBlur={() => setTimeout(() => setSmartWebsitesOpen(false), 150)}
            >
              Smart Websites
              <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${smartWebsitesOpen ? 'rotate-180' : ''}`} />
            </button>
            {isMounted && smartWebsitesOpen && (
              <div className="absolute top-full left-0 mt-3 w-80 bg-card/95 backdrop-blur-xl border border-border/50 rounded-2xl shadow-layered-lg overflow-hidden animate-fade-in">
                <div className="absolute inset-0 bg-gradient-to-b from-accent/5 to-transparent pointer-events-none" />
                <div className="relative p-2">
                  {smartWebsitesItems.map((item, index) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className="flex flex-col items-start px-4 py-3 rounded-xl hover:bg-accent/10 transition-all duration-200 group"
                      onClick={() => setSmartWebsitesOpen(false)}
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

          {/* AI & Automation - Static Link */}
          <NavLink to="/let-ai-handle-it" className="nav-link px-4 py-2.5 text-sm font-medium text-foreground/70 hover:text-foreground transition-all duration-300">AI & Automation</NavLink>

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

          {/* Solutions Dropdown */}
          <div className="relative">
            <button 
              className={`nav-link flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium transition-all duration-300 ${
                solutionsOpen 
                  ? 'text-accent' 
                  : 'text-foreground/70 hover:text-foreground'
              }`}
              onClick={() => setSolutionsOpen(!solutionsOpen)}
              onBlur={() => setTimeout(() => setSolutionsOpen(false), 150)}
            >
              Solutions
              <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${solutionsOpen ? 'rotate-180' : ''}`} />
            </button>
            {isMounted && solutionsOpen && (
              <div className="absolute top-full left-0 mt-3 w-80 bg-card/95 backdrop-blur-xl border border-border/50 rounded-2xl shadow-layered-lg overflow-hidden animate-fade-in">
                <div className="absolute inset-0 bg-gradient-to-b from-accent/5 to-transparent pointer-events-none" />
                <div className="relative p-2">
                  {solutionsItems.map((item, index) => (
                    item.external ? (
                      <a
                        key={item.path}
                        href={item.path}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-start px-4 py-3 rounded-xl hover:bg-accent/10 transition-all duration-200 group"
                        onClick={() => setSolutionsOpen(false)}
                        style={{ animationDelay: `${index * 30}ms` }}
                      >
                        <span className="font-semibold text-foreground group-hover:text-accent transition-colors">{item.title}</span>
                        <span className="text-xs text-muted-foreground mt-0.5 group-hover:text-muted-foreground/80">{item.description}</span>
                      </a>
                    ) : (
                      <Link
                        key={item.path}
                        to={item.path}
                        className="flex flex-col items-start px-4 py-3 rounded-xl hover:bg-accent/10 transition-all duration-200 group"
                        onClick={() => setSolutionsOpen(false)}
                        style={{ animationDelay: `${index * 30}ms` }}
                      >
                        <span className="font-semibold text-foreground group-hover:text-accent transition-colors">{item.title}</span>
                        <span className="text-xs text-muted-foreground mt-0.5 group-hover:text-muted-foreground/80">{item.description}</span>
                      </Link>
                    )
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Separator */}
          <div className="w-px h-5 bg-border/50 mx-2" />

          {/* Static Links */}
          <NavLink to="/pricing" className="nav-link px-4 py-2.5 text-sm font-medium text-foreground/70 hover:text-foreground transition-all duration-300">Pricing</NavLink>
          <NavLink to="/our-work" className="nav-link px-4 py-2.5 text-sm font-medium text-foreground/70 hover:text-foreground transition-all duration-300">Our Work</NavLink>
          <NavLink to="/about" className="nav-link px-4 py-2.5 text-sm font-medium text-foreground/70 hover:text-foreground transition-all duration-300">About</NavLink>
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <CTAButton to="/pricing" defaultText="Get Started" hoverText="Let's Go!" />
        </div>

        {/* Mobile Menu Button */}
        <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          <span className="sr-only">Toggle menu</span>
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMounted && mobileMenuOpen && (
        <>
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden" onClick={closeMobileMenu} />
          <div className="fixed top-20 right-0 bottom-0 w-full max-w-sm bg-card border-l border-border z-50 lg:hidden overflow-y-auto animate-slide-in-right">
            <div className="flex flex-col p-6 space-y-2">
              {/* Smart Websites Collapsible */}
              <div className="border-b border-border/50 pb-2">
                <button className="flex items-center justify-between w-full py-3 text-lg font-semibold text-foreground" onClick={() => setMobileSmartWebsitesOpen(!mobileSmartWebsitesOpen)}>
                  Smart Websites
                  <ChevronDown className={`h-5 w-5 text-muted-foreground transition-transform ${mobileSmartWebsitesOpen ? 'rotate-180' : ''}`} />
                </button>
                {mobileSmartWebsitesOpen && (
                  <div className="pl-4 space-y-1 mt-2 animate-fade-in">
                    {smartWebsitesItems.map((item) => (
                      <Link key={item.path} to={item.path} className="block py-2.5 text-muted-foreground hover:text-accent transition-colors" onClick={closeMobileMenu}>{item.title}</Link>
                    ))}
                  </div>
                )}
              </div>

              {/* AI & Automation - Static Link */}
              <Link to="/let-ai-handle-it" className="py-3 text-lg font-semibold text-foreground border-b border-border/50" onClick={closeMobileMenu}>AI & Automation</Link>

              {/* Industries Collapsible */}
              <div className="border-b border-border/50 pb-2">
                <button className="flex items-center justify-between w-full py-3 text-lg font-semibold text-foreground" onClick={() => setMobileIndustriesOpen(!mobileIndustriesOpen)}>
                  Industries
                  <ChevronDown className={`h-5 w-5 text-muted-foreground transition-transform ${mobileIndustriesOpen ? 'rotate-180' : ''}`} />
                </button>
                {mobileIndustriesOpen && (
                  <div className="pl-4 space-y-1 mt-2 animate-fade-in">
                    {industriesItems.map((item) => (
                      <Link key={item.path} to={item.path} className="block py-2.5 text-muted-foreground hover:text-accent transition-colors" onClick={closeMobileMenu}>{item.title}</Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Solutions Collapsible */}
              <div className="border-b border-border/50 pb-2">
                <button className="flex items-center justify-between w-full py-3 text-lg font-semibold text-foreground" onClick={() => setMobileSolutionsOpen(!mobileSolutionsOpen)}>
                  Solutions
                  <ChevronDown className={`h-5 w-5 text-muted-foreground transition-transform ${mobileSolutionsOpen ? 'rotate-180' : ''}`} />
                </button>
                {mobileSolutionsOpen && (
                  <div className="pl-4 space-y-1 mt-2 animate-fade-in">
                    {solutionsItems.map((item) => (
                      item.external ? (
                        <a key={item.path} href={item.path} target="_blank" rel="noopener noreferrer" className="block py-2.5 text-muted-foreground hover:text-accent transition-colors" onClick={closeMobileMenu}>{item.title}</a>
                      ) : (
                        <Link key={item.path} to={item.path} className="block py-2.5 text-muted-foreground hover:text-accent transition-colors" onClick={closeMobileMenu}>{item.title}</Link>
                      )
                    ))}
                  </div>
                )}
              </div>

              {/* Static Links */}
              <Link to="/pricing" className="py-3 text-lg font-semibold text-foreground border-b border-border/50" onClick={closeMobileMenu}>Pricing</Link>
              <Link to="/our-work" className="py-3 text-lg font-semibold text-foreground border-b border-border/50" onClick={closeMobileMenu}>Our Work</Link>
              <Link to="/about" className="py-3 text-lg font-semibold text-foreground border-b border-border/50" onClick={closeMobileMenu}>About</Link>

              {/* Mobile CTAs */}
              <div className="pt-6 space-y-3">
                <CTAButton to="/pricing" defaultText="Get Started" hoverText="Let's Go!" onClick={closeMobileMenu} fullWidth />
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
