/**
 * @fileoverview Header Component - Navigation with Dropdowns
 * @description Header with dropdown menus for Smart Websites tiers and AI Employee modes.
 *              Implements conversion ladder navigation per BRD v35.2.
 * 
 * @module components/layout/Header
 * 
 * Navigation Structure (v35.2):
 * - AI Employee (dropdown: M1-M5 modes)
 * - Smart Websites (dropdown: Smart Site → Smart Lead → Smart Business → Smart Growth)
 * - Pricing (/pricing)
 * - Industries (/industries)
 * - About (/about)
 * - Contact (/contact)
 * - Primary CTA: "Get Started" → /pricing
 */

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { NavLink } from '@/components/NavLink';
import { NavDropdown } from '@/components/layout/NavDropdown';
import { Button } from '@/components/ui/button';
import { CTAButton } from '@/components/CTAButton';
import { LogoRenderer } from '@/components/logo/LogoRenderer';
import { activeTheme } from '@/config/themes';

/**
 * Smart Websites tier dropdown items - ordered by conversion ladder
 */
const smartWebsitesTiers = [
  { title: 'Smart Site', path: '/pricing#smart-site', description: '$249 one-time' },
  { title: 'Smart Lead', path: '/pricing#smart-lead', description: '$97/mo — Most Popular' },
  { title: 'Smart Business', path: '/pricing#smart-business', description: '$197/mo' },
  { title: 'Smart Growth', path: '/pricing#smart-growth', description: '$297/mo' },
];

/**
 * AI Employee modes dropdown items (NO M1-M5 prefixes per BRD v35.3)
 */
const aiEmployeeModes = [
  { title: 'After-Hours', path: '/let-ai-handle-it#after-hours', description: 'Coverage when you\'re closed' },
  { title: 'Booking Agent', path: '/let-ai-handle-it#booking', description: 'Appointment scheduling' },
  { title: 'Missed Call Recovery', path: '/let-ai-handle-it#missed-call', description: 'Recapture lost leads' },
  { title: 'Front Line Screening', path: '/let-ai-handle-it#screening', description: 'Qualify before you answer' },
  { title: 'Full Takeover', path: '/let-ai-handle-it#full-takeover', description: 'Complete phone management' },
];

/**
 * Industries dropdown items with hub link
 */
const industriesItems = [
  { title: 'Home Services', path: '/industries/home-services', description: 'HVAC, Plumbing, Electrical' },
  { title: 'Professional Services', path: '/industries/professional-services', description: 'Legal, Real Estate, Accounting' },
  { title: 'Health & Wellness', path: '/industries/health-wellness', description: 'MedSpa, Dental, Chiropractic' },
  { title: 'Automotive', path: '/industries/automotive', description: 'Auto Repair, Detailing, Body Shop' },
];

/**
 * Flat navigation links (no dropdown needed)
 */
const flatNavLinks = [
  { title: 'Pricing', path: '/pricing' },
  { title: 'About', path: '/about' },
  { title: 'Contact', path: '/contact' },
];

/**
 * Header - Main site navigation component (MVP)
 * 
 * Features per BRD v35.0:
 * - Fixed position with scroll-aware styling
 * - Logo with tagline (from theme config)
 * - 5 flat navigation links (no dropdowns)
 * - Primary CTA button → /pricing
 * - Mobile hamburger menu with full nav
 * 
 * SSG-safe: Uses isMounted state to prevent hydration mismatches
 * 
 * @component
 * @returns {JSX.Element} Header with navigation
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

        {/* Desktop Navigation - Dropdowns + Flat Links */}
        <nav className="hidden lg:flex items-center gap-1">
          {/* AI Employee dropdown */}
          <NavDropdown label="AI Employee" items={aiEmployeeModes} />
          
          {/* Smart Websites dropdown (tiers) */}
          <NavDropdown label="Smart Websites" items={smartWebsitesTiers} />
          
          {/* Industries dropdown with clickable hub link */}
          <NavDropdown label="Industries" items={industriesItems} hubPath="/industries" />
          
          {/* Flat navigation links */}
          {flatNavLinks.map((link) => (
            <NavLink 
              key={link.path}
              to={link.path} 
              className="nav-link px-4 py-2.5 text-sm font-medium text-foreground/70 hover:text-foreground transition-all duration-300"
              activeClassName="text-accent"
            >
              {link.title}
            </NavLink>
          ))}
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
              {/* Mobile: AI Employee section */}
              <div className="py-2">
                <span className="text-xs uppercase tracking-wider text-muted-foreground">AI Employee</span>
                {aiEmployeeModes.map((item) => (
                  <Link 
                    key={item.path}
                    to={item.path} 
                    className="block py-2 pl-2 text-foreground/80 hover:text-accent transition-colors" 
                    onClick={closeMobileMenu}
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
              
              {/* Mobile: Smart Websites section */}
              <div className="py-2 border-t border-border/50">
                <span className="text-xs uppercase tracking-wider text-muted-foreground">Smart Websites</span>
                {smartWebsitesTiers.map((item) => (
                  <Link 
                    key={item.path}
                    to={item.path} 
                    className="block py-2 pl-2 text-foreground/80 hover:text-accent transition-colors" 
                    onClick={closeMobileMenu}
                  >
                    {item.title}
                    <span className="text-xs text-muted-foreground ml-2">{item.description}</span>
                  </Link>
                ))}
              </div>
              
              {/* Mobile: Industries section */}
              <div className="py-2 border-t border-border/50">
                <Link 
                  to="/industries" 
                  className="text-xs uppercase tracking-wider text-muted-foreground hover:text-accent"
                  onClick={closeMobileMenu}
                >
                  Industries
                </Link>
                {industriesItems.map((item) => (
                  <Link 
                    key={item.path}
                    to={item.path} 
                    className="block py-2 pl-2 text-foreground/80 hover:text-accent transition-colors" 
                    onClick={closeMobileMenu}
                  >
                    {item.title}
                    <span className="text-xs text-muted-foreground ml-2">{item.description}</span>
                  </Link>
                ))}
              </div>
              
              {/* Mobile: Flat links */}
              <div className="py-2 border-t border-border/50">
              {flatNavLinks.map((link) => (
                <Link 
                  key={link.path}
                  to={link.path} 
                  className="py-3 text-lg font-semibold text-foreground border-b border-border/50 hover:text-accent transition-colors block" 
                  onClick={closeMobileMenu}
                >
                  {link.title}
                </Link>
              ))}
              </div>

              {/* Mobile CTAs */}
              <div className="pt-6 space-y-4">
                <CTAButton to="/pricing" defaultText="Get Started" hoverText="Let's Go!" className="w-full" />
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
