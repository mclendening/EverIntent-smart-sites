/**
 * @fileoverview Header Component - SSG-Safe Luxury Navigation
 * @module components/layout/Header
 * 
 * Uses native anchor tags for true static site navigation.
 * Each link triggers a full page load for proper SSG behavior.
 */

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { NavLink } from '@/components/NavLink';
import { NavDropdown } from '@/components/layout/NavDropdown';
import { Button } from '@/components/ui/button';
import { LogoRenderer } from '@/components/logo/LogoRenderer';
import { activeTheme } from '@/config/themes';

/**
 * Smart Websites dropdown - ordered by conversion ladder
 */
const smartWebsitesTiers = [
  { title: 'Smart Site', path: '/smart-websites/smart-site', description: '$249 one-time' },
  { title: 'Smart Lead', path: '/smart-websites/smart-lead', description: '$97/mo' },
  { title: 'Smart Business', path: '/smart-websites/smart-business', description: '$197/mo' },
  { title: 'Smart Growth', path: '/smart-websites/smart-growth', description: '$297/mo' },
  { title: 'Compare Plans', path: '/compare-websites', description: 'Side-by-side comparison' },
];

/**
 * AI Employee modes dropdown - Consolidated
 */
const aiEmployeeModes = [
  { title: 'After-Hours', path: '/let-ai-handle-it/after-hours', description: 'Calls, booking & missed call recovery' },
  { title: 'Front Office', path: '/let-ai-handle-it/front-office', description: 'Screen, qualify & transfer' },
  { title: 'Full AI Employee', path: '/let-ai-handle-it/full-ai-employee', description: 'Complete phone management' },
  { title: 'Compare Plans', path: '/compare-ai-employee', description: 'Side-by-side comparison' },
];

/**
 * Industries dropdown
 */
const industriesItems = [
  { title: 'Home Services', path: '/industries/home-services', description: 'HVAC, Plumbing, Electrical' },
  { title: 'Professional Services', path: '/industries/professional-services', description: 'Legal, Real Estate' },
  { title: 'Health & Wellness', path: '/industries/health-wellness', description: 'MedSpa, Dental' },
  { title: 'Automotive', path: '/industries/automotive-services', description: 'Auto Repair, Detailing' },
];

/**
 * Flat navigation links
 */
const flatNavLinks = [
  { title: 'Portfolio', path: '/portfolio' },
  { title: 'Pricing', path: '/pricing' },
  { title: 'Contact', path: '/contact' },
];

/**
 * Resources section for mobile menu
 */
const resourcesLinks = [
  { title: 'Portfolio', path: '/portfolio' },
  { title: 'FAQ', path: '/pricing#faq' },
  { title: 'Industries', path: '/industries' },
];

/**
 * Company section for mobile menu
 */
const companyLinks = [
  { title: 'About', path: '/about' },
  { title: 'Contact', path: '/contact' },
  { title: 'Careers', path: '/careers' },
];

/**
 * Header - SSG-safe luxury navigation component
 */
export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
  };

  const showScrolledStyles = isMounted && scrolled;

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        showScrolledStyles 
          ? 'bg-background/95 backdrop-blur-xl border-b border-border/20' 
          : 'bg-transparent'
      }`}
    >
      <div className="container flex h-20 items-center justify-between">
        {/* Logo - Native anchor */}
        <a href="/" className="flex items-center group">
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
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          <NavDropdown label="AI Employee" items={aiEmployeeModes} hubPath="/let-ai-handle-it" />
          <NavDropdown label="Smart Websites" items={smartWebsitesTiers} hubPath="/smart-websites" />
          <NavDropdown label="Industries" items={industriesItems} hubPath="/industries" />
          
          {flatNavLinks.map((link) => (
            <NavLink 
              key={link.path}
              to={link.path} 
              className="nav-link px-4 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-300"
              activeClassName="text-accent"
            >
              {link.title}
            </NavLink>
          ))}
        </nav>

        {/* Desktop CTA - Native anchor */}
        <div className="hidden lg:flex items-center">
          <a href="/pricing" className="btn-gold btn-glow">
            Get Started
          </a>
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
          <div className="fixed inset-0 bg-background/90 backdrop-blur-sm z-40 lg:hidden" onClick={closeMobileMenu} />
          <div className="fixed top-20 right-0 bottom-0 w-full max-w-sm bg-card border-l border-border/30 z-50 lg:hidden overflow-y-auto overscroll-contain animate-slide-in-right">
            <div className="flex flex-col p-6 pb-24 space-y-2">
            {/* AI Employee section */}
              <div className="py-3">
                <a 
                  href="/let-ai-handle-it"
                  className="text-xs uppercase tracking-wider text-muted-foreground font-medium hover:text-accent"
                >
                  AI Employee
                </a>
                {aiEmployeeModes.map((item) => (
                  <a 
                    key={item.path}
                    href={item.path} 
                    className="block py-2.5 pl-2 text-foreground hover:text-accent transition-colors"
                  >
                    {item.title}
                  </a>
                ))}
              </div>
              
              {/* Smart Websites section */}
              <div className="py-3 border-t border-border/30">
                <a 
                  href="/smart-websites"
                  className="text-xs uppercase tracking-wider text-muted-foreground font-medium hover:text-accent"
                >
                  Smart Websites
                </a>
                {smartWebsitesTiers.map((item) => (
                  <a 
                    key={item.path}
                    href={item.path} 
                    className="block py-2.5 pl-2 text-foreground hover:text-accent transition-colors"
                  >
                    {item.title}
                    <span className="text-xs text-muted-foreground ml-2">{item.description}</span>
                  </a>
                ))}
              </div>
              
              {/* Industries section */}
              <div className="py-3 border-t border-border/30">
                <a 
                  href="/industries" 
                  className="text-xs uppercase tracking-wider text-muted-foreground font-medium hover:text-accent"
                >
                  Industries
                </a>
                {industriesItems.map((item) => (
                  <a 
                    key={item.path}
                    href={item.path} 
                    className="block py-2.5 pl-2 text-foreground hover:text-accent transition-colors"
                  >
                    {item.title}
                  </a>
                ))}
              </div>
              
              {/* Resources section */}
              <div className="py-3 border-t border-border/30">
                <span className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
                  Resources
                </span>
                {resourcesLinks.map((item) => (
                  <a 
                    key={item.path}
                    href={item.path} 
                    className="block py-2.5 pl-2 text-foreground hover:text-accent transition-colors"
                  >
                    {item.title}
                  </a>
                ))}
              </div>
              
              {/* Company section */}
              <div className="py-3 border-t border-border/30">
                <span className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
                  Company
                </span>
                {companyLinks.map((item) => (
                  <a 
                    key={item.path}
                    href={item.path} 
                    className="block py-2.5 pl-2 text-foreground hover:text-accent transition-colors"
                  >
                    {item.title}
                  </a>
                ))}
              </div>

              {/* Mobile CTA - Native anchor */}
              <div className="pt-6">
                <a 
                  href="/pricing" 
                  className="btn-gold btn-glow w-full text-center block"
                >
                  Get Started
                </a>
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
