/**
 * @fileoverview Header - Luxury minimal navigation
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

/**
 * Smart Websites dropdown items
 */
const smartWebsitesTiers = [
  { title: 'Smart Site', path: '/pricing#smart-site', description: '$249 one-time' },
  { title: 'Smart Lead', path: '/pricing#smart-lead', description: '$97/mo' },
  { title: 'Smart Business', path: '/pricing#smart-business', description: '$197/mo' },
  { title: 'Smart Growth', path: '/pricing#smart-growth', description: '$297/mo' },
];

/**
 * AI Employee modes dropdown
 */
const aiEmployeeModes = [
  { title: 'After-Hours', path: '/let-ai-handle-it#after-hours', description: 'Coverage when you\'re closed' },
  { title: 'Booking Agent', path: '/let-ai-handle-it#booking', description: 'Appointment scheduling' },
  { title: 'Missed Call Recovery', path: '/let-ai-handle-it#missed-call', description: 'Recapture lost leads' },
  { title: 'Front Line Screening', path: '/let-ai-handle-it#screening', description: 'Qualify before you answer' },
  { title: 'Full Takeover', path: '/let-ai-handle-it#full-takeover', description: 'Complete phone management' },
];

/**
 * Industries dropdown
 */
const industriesItems = [
  { title: 'Home Services', path: '/industries/home-services', description: 'HVAC, Plumbing, Electrical' },
  { title: 'Professional Services', path: '/industries/professional-services', description: 'Legal, Real Estate' },
  { title: 'Health & Wellness', path: '/industries/health-wellness', description: 'MedSpa, Dental' },
  { title: 'Automotive', path: '/industries/automotive', description: 'Auto Repair, Detailing' },
];

/**
 * Flat nav links
 */
const flatNavLinks = [
  { title: 'Pricing', path: '/pricing' },
  { title: 'About', path: '/about' },
  { title: 'Contact', path: '/contact' },
];

/**
 * Luxury minimal header with serif-influenced navigation
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
          ? 'bg-background/95 backdrop-blur-sm border-b border-border/20' 
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
              className="nav-link px-4 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-300"
              activeClassName="text-foreground"
            >
              {link.title}
            </NavLink>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center">
          <Link 
            to="/pricing" 
            className="px-6 py-2.5 bg-accent text-accent-foreground text-sm font-medium transition-all duration-300 hover:bg-accent-hover"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="lg:hidden text-foreground" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          <span className="sr-only">Toggle menu</span>
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMounted && mobileMenuOpen && (
        <>
          <div className="fixed inset-0 bg-background/90 backdrop-blur-sm z-40 lg:hidden" onClick={closeMobileMenu} />
          <div className="fixed top-20 right-0 bottom-0 w-full max-w-sm bg-card border-l border-border/20 z-50 lg:hidden overflow-y-auto">
            <div className="flex flex-col p-8 space-y-6">
              {/* AI Employee section */}
              <div>
                <span className="text-xs uppercase tracking-widest text-muted-foreground mb-3 block">AI Employee</span>
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
              
              {/* Smart Websites section */}
              <div className="pt-4 border-t border-border/20">
                <span className="text-xs uppercase tracking-widest text-muted-foreground mb-3 block">Smart Websites</span>
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
              
              {/* Industries section */}
              <div className="pt-4 border-t border-border/20">
                <Link 
                  to="/industries" 
                  className="text-xs uppercase tracking-widest text-muted-foreground hover:text-accent mb-3 block"
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
              <div className="pt-4 border-t border-border/20">
                {flatNavLinks.map((link) => (
                  <Link 
                    key={link.path}
                    to={link.path} 
                    className="block py-3 text-lg font-medium text-foreground hover:text-accent transition-colors" 
                    onClick={closeMobileMenu}
                  >
                    {link.title}
                  </Link>
                ))}
              </div>

              {/* Mobile CTA */}
              <div className="pt-6">
                <Link 
                  to="/pricing" 
                  className="block w-full py-4 bg-accent text-accent-foreground text-center font-medium"
                  onClick={closeMobileMenu}
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
