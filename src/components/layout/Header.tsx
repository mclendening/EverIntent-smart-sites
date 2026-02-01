/**
 * @fileoverview Header Component - Luxury Navigation
 * @module components/layout/Header
 * 
 * Clean mega-menu style navigation with logical groupings.
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
 * Smart Websites dropdown - ordered by conversion ladder
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
  { title: 'After-Hours', path: '/let-ai-handle-it/after-hours', description: 'Coverage when you\'re closed' },
  { title: 'Booking Agent', path: '/let-ai-handle-it/booking', description: 'Appointment scheduling' },
  { title: 'Missed Call Recovery', path: '/let-ai-handle-it/missed-call', description: 'Recapture lost leads' },
  { title: 'Front Line Screening', path: '/let-ai-handle-it/screening', description: 'Qualify before you answer' },
  { title: 'Full AI Employee', path: '/let-ai-handle-it/full-takeover', description: 'Complete phone management' },
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
 * Flat navigation links - Portfolio between Industries and Pricing
 */
const flatNavLinks = [
  { title: 'Portfolio', path: '/portfolio' },
  { title: 'Pricing', path: '/pricing' },
  { title: 'Contact', path: '/contact' },
];

/**
 * Resources section for mobile menu (mirrors footer)
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
 * Header - Luxury navigation component
 * 
 * @component
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

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center">
          <Link to="/pricing" className="btn-gold btn-glow">
            Get Started
          </Link>
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
          <div className="fixed top-20 right-0 bottom-0 w-full max-w-sm bg-card border-l border-border/30 z-50 lg:hidden overflow-y-auto animate-slide-in-right">
            <div className="flex flex-col p-6 space-y-2">
            {/* AI Employee section */}
              <div className="py-3">
                <Link 
                  to="/let-ai-handle-it"
                  className="text-xs uppercase tracking-wider text-muted-foreground font-medium hover:text-accent"
                  onClick={closeMobileMenu}
                >
                  AI Employee
                </Link>
                {aiEmployeeModes.map((item) => (
                  <Link 
                    key={item.path}
                    to={item.path} 
                    className="block py-2.5 pl-2 text-foreground hover:text-accent transition-colors" 
                    onClick={closeMobileMenu}
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
              
              {/* Smart Websites section */}
              <div className="py-3 border-t border-border/30">
                <Link 
                  to="/smart-websites"
                  className="text-xs uppercase tracking-wider text-muted-foreground font-medium hover:text-accent"
                  onClick={closeMobileMenu}
                >
                  Smart Websites
                </Link>
                {smartWebsitesTiers.map((item) => (
                  <Link 
                    key={item.path}
                    to={item.path} 
                    className="block py-2.5 pl-2 text-foreground hover:text-accent transition-colors" 
                    onClick={closeMobileMenu}
                  >
                    {item.title}
                    <span className="text-xs text-muted-foreground ml-2">{item.description}</span>
                  </Link>
                ))}
              </div>
              
              {/* Industries section */}
              <div className="py-3 border-t border-border/30">
                <Link 
                  to="/industries" 
                  className="text-xs uppercase tracking-wider text-muted-foreground font-medium hover:text-accent"
                  onClick={closeMobileMenu}
                >
                  Industries
                </Link>
                {industriesItems.map((item) => (
                  <Link 
                    key={item.path}
                    to={item.path} 
                    className="block py-2.5 pl-2 text-foreground hover:text-accent transition-colors" 
                    onClick={closeMobileMenu}
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
              
              {/* Resources section */}
              <div className="py-3 border-t border-border/30">
                <span className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
                  Resources
                </span>
                {resourcesLinks.map((item) => (
                  <Link 
                    key={item.path}
                    to={item.path} 
                    className="block py-2.5 pl-2 text-foreground hover:text-accent transition-colors" 
                    onClick={closeMobileMenu}
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
              
              {/* Company section */}
              <div className="py-3 border-t border-border/30">
                <span className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
                  Company
                </span>
                {companyLinks.map((item) => (
                  <Link 
                    key={item.path}
                    to={item.path} 
                    className="block py-2.5 pl-2 text-foreground hover:text-accent transition-colors" 
                    onClick={closeMobileMenu}
                  >
                    {item.title}
                  </Link>
                ))}
              </div>

              {/* Mobile CTA */}
              <div className="pt-6">
                <Link 
                  to="/pricing" 
                  className="btn-gold btn-glow w-full text-center"
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
