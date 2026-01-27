/**
 * @fileoverview Header Component - Luxury Navigation
 * @module components/layout/Header
 */

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { NavLink } from '@/components/NavLink';
import { NavDropdown } from '@/components/layout/NavDropdown';
import { Button } from '@/components/ui/button';
import { LogoRenderer } from '@/components/logo/LogoRenderer';
import { activeTheme } from '@/config/themes';

const smartWebsitesTiers = [
  { title: 'Smart Site', path: '/pricing#smart-site', description: '$249 one-time' },
  { title: 'Smart Lead', path: '/pricing#smart-lead', description: '$97/mo' },
  { title: 'Smart Business', path: '/pricing#smart-business', description: '$197/mo' },
  { title: 'Smart Growth', path: '/pricing#smart-growth', description: '$297/mo' },
];

const aiEmployeeModes = [
  { title: 'After-Hours', path: '/let-ai-handle-it#after-hours', description: 'Coverage when you\'re closed' },
  { title: 'Booking Agent', path: '/let-ai-handle-it#booking', description: 'Appointment scheduling' },
  { title: 'Missed Call Recovery', path: '/let-ai-handle-it#missed-call', description: 'Recapture lost leads' },
  { title: 'Front Line Screening', path: '/let-ai-handle-it#screening', description: 'Qualify before you answer' },
  { title: 'Full Takeover', path: '/let-ai-handle-it#full-takeover', description: 'Complete phone management' },
];

const industriesItems = [
  { title: 'Home Services', path: '/industries/home-services', description: 'HVAC, Plumbing, Electrical' },
  { title: 'Professional Services', path: '/industries/professional-services', description: 'Legal, Real Estate' },
  { title: 'Health & Wellness', path: '/industries/health-wellness', description: 'MedSpa, Dental' },
  { title: 'Automotive', path: '/industries/automotive', description: 'Auto Repair, Detailing' },
];

const flatNavLinks = [
  { title: 'Pricing', path: '/pricing' },
  { title: 'About', path: '/about' },
  { title: 'Contact', path: '/contact' },
];

/**
 * Luxury Header with minimal styling.
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
          ? 'bg-background/95 backdrop-blur-md border-b border-border/20' 
          : 'bg-transparent'
      }`}
    >
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
          <NavDropdown label="AI Employee" items={aiEmployeeModes} />
          <NavDropdown label="Smart Websites" items={smartWebsitesTiers} hubPath="/smart-websites" />
          <NavDropdown label="Industries" items={industriesItems} hubPath="/industries" />
          
          {flatNavLinks.map((link) => (
            <NavLink 
              key={link.path}
              to={link.path} 
              className="nav-link px-4 py-2.5 text-sm text-foreground/70 hover:text-foreground transition-all duration-400"
              activeClassName="text-accent"
            >
              {link.title}
            </NavLink>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <Button asChild className="bg-accent hover:bg-accent-hover text-accent-foreground px-6 py-2.5 text-sm font-medium transition-all duration-400">
            <Link to="/pricing">Get Started</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          <span className="sr-only">Toggle menu</span>
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMounted && mobileMenuOpen && (
        <>
          <div className="fixed inset-0 bg-background/90 backdrop-blur-sm z-40 lg:hidden" onClick={closeMobileMenu} />
          <div className="fixed top-20 right-0 bottom-0 w-full max-w-sm bg-card border-l border-border/20 z-50 lg:hidden overflow-y-auto">
            <div className="flex flex-col p-8 space-y-2">
              {/* AI Employee */}
              <div className="py-4">
                <span className="text-xs uppercase tracking-[0.15em] text-muted-foreground">AI Employee</span>
                {aiEmployeeModes.map((item) => (
                  <Link 
                    key={item.path}
                    to={item.path} 
                    className="block py-2 text-foreground/80 hover:text-accent transition-colors" 
                    onClick={closeMobileMenu}
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
              
              {/* Smart Websites */}
              <div className="py-4 border-t border-border/20">
                <span className="text-xs uppercase tracking-[0.15em] text-muted-foreground">Smart Websites</span>
                {smartWebsitesTiers.map((item) => (
                  <Link 
                    key={item.path}
                    to={item.path} 
                    className="block py-2 text-foreground/80 hover:text-accent transition-colors" 
                    onClick={closeMobileMenu}
                  >
                    {item.title}
                    <span className="text-xs text-muted-foreground ml-2">{item.description}</span>
                  </Link>
                ))}
              </div>
              
              {/* Industries */}
              <div className="py-4 border-t border-border/20">
                <Link 
                  to="/industries" 
                  className="text-xs uppercase tracking-[0.15em] text-muted-foreground hover:text-accent"
                  onClick={closeMobileMenu}
                >
                  Industries
                </Link>
                {industriesItems.map((item) => (
                  <Link 
                    key={item.path}
                    to={item.path} 
                    className="block py-2 text-foreground/80 hover:text-accent transition-colors" 
                    onClick={closeMobileMenu}
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
              
              {/* Flat links */}
              <div className="py-4 border-t border-border/20">
                {flatNavLinks.map((link) => (
                  <Link 
                    key={link.path}
                    to={link.path} 
                    className="block py-3 text-lg text-foreground hover:text-accent transition-colors" 
                    onClick={closeMobileMenu}
                  >
                    {link.title}
                  </Link>
                ))}
              </div>

              {/* Mobile CTA */}
              <div className="pt-6">
                <Button asChild className="w-full bg-accent hover:bg-accent-hover text-accent-foreground py-3 font-medium">
                  <Link to="/pricing" onClick={closeMobileMenu}>Get Started</Link>
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
