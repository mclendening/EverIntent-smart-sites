import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, ChevronDown, Globe, X } from 'lucide-react';
import { NavLink } from '@/components/NavLink';
import { Button } from '@/components/ui/button';

// Services dropdown items - Beautiful Websites at TOP per BRD
const servicesItems = [
  { title: 'Beautiful Websites', path: '/beautiful-websites', description: 'Professional websites that get you customers' },
  { title: 'Get Found Online', path: '/get-found-online', description: 'SEO and local search visibility' },
  { title: 'Never Miss a Lead', path: '/never-miss-a-lead', description: 'Lead capture and follow-up' },
  { title: 'Book More Jobs', path: '/book-more-jobs', description: 'Online booking and scheduling' },
  { title: 'Run From Your Phone', path: '/run-from-your-phone', description: 'Mobile app access' },
  { title: 'Build Your Reputation', path: '/build-your-reputation', description: 'Review automation' },
  { title: 'Let AI Handle It', path: '/let-ai-handle-it', description: 'AI automation' },
  { title: 'Domains', path: '/domains', description: 'Domain search and registration' },
];

// Industries dropdown items
const industriesItems = [
  { title: 'Home Services', path: '/industries/home-services', description: 'HVAC, Plumbing, Electrical & more' },
  { title: 'Professional Services', path: '/industries/professional-services', description: 'Legal, Real Estate, Accounting & more' },
  { title: 'Health & Wellness', path: '/industries/health-wellness', description: 'MedSpa, Dental, Chiropractic & more' },
  { title: 'Automotive Services', path: '/industries/automotive-services', description: 'Auto Repair, Detailing, Towing & more' },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileIndustriesOpen, setMobileIndustriesOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [industriesOpen, setIndustriesOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Close mobile menu on route change
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setMobileServicesOpen(false);
    setMobileIndustriesOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/20 bg-primary">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <Globe className="w-5 h-5 text-accent" />
          <span className="text-lg font-medium text-primary-foreground">EverIntent Smart Sites</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {/* Services Dropdown - Pure CSS/State based, no Radix */}
          <div className="relative">
            <Button 
              variant="ghost" 
              className="flex items-center gap-1 text-primary-foreground hover:text-primary-foreground hover:bg-primary-foreground/10"
              onClick={() => setServicesOpen(!servicesOpen)}
              onBlur={() => setTimeout(() => setServicesOpen(false), 150)}
            >
              Services
              <ChevronDown className={`h-4 w-4 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
            </Button>
            {isMounted && servicesOpen && (
              <div className="absolute top-full left-0 mt-1 w-64 bg-popover border border-border rounded-md shadow-lg z-50">
                {servicesItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="flex flex-col items-start px-3 py-2 hover:bg-muted transition-colors"
                    onClick={() => setServicesOpen(false)}
                  >
                    <span className="font-medium text-foreground">{item.title}</span>
                    <span className="text-xs text-muted-foreground">{item.description}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Industries Dropdown - Pure CSS/State based, no Radix */}
          <div className="relative">
            <Button 
              variant="ghost" 
              className="flex items-center gap-1 text-primary-foreground hover:text-primary-foreground hover:bg-primary-foreground/10"
              onClick={() => setIndustriesOpen(!industriesOpen)}
              onBlur={() => setTimeout(() => setIndustriesOpen(false), 150)}
            >
              Industries
              <ChevronDown className={`h-4 w-4 transition-transform ${industriesOpen ? 'rotate-180' : ''}`} />
            </Button>
            {isMounted && industriesOpen && (
              <div className="absolute top-full left-0 mt-1 w-64 bg-popover border border-border rounded-md shadow-lg z-50">
                {industriesItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="flex flex-col items-start px-3 py-2 hover:bg-muted transition-colors"
                    onClick={() => setIndustriesOpen(false)}
                  >
                    <span className="font-medium text-foreground">{item.title}</span>
                    <span className="text-xs text-muted-foreground">{item.description}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Static Links */}
          <Button variant="ghost" asChild className="text-primary-foreground hover:text-primary-foreground hover:bg-primary-foreground/10">
            <NavLink to="/pricing">Pricing</NavLink>
          </Button>
          <Button variant="ghost" asChild className="text-primary-foreground hover:text-primary-foreground hover:bg-primary-foreground/10">
            <NavLink to="/portfolio">Portfolio</NavLink>
          </Button>
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center space-x-2">
          <Button asChild className="bg-accent text-primary hover:bg-accent/90">
            <NavLink to="/pricing">Get Started</NavLink>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden text-primary-foreground"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          <span className="sr-only">Toggle menu</span>
        </Button>
      </div>

      {/* Mobile Menu - Simple div, no Radix Sheet */}
      {isMounted && mobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={closeMobileMenu}
          />
          {/* Menu Panel */}
          <div className="fixed top-16 right-0 bottom-0 w-80 bg-background z-50 md:hidden overflow-y-auto animate-in slide-in-from-right duration-300">
            <div className="flex flex-col space-y-4 p-6">
              {/* Services Collapsible */}
              <div>
                <button
                  className="flex items-center justify-between w-full py-2 text-lg font-medium text-foreground"
                  onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                >
                  Services
                  <ChevronDown className={`h-5 w-5 transition-transform ${mobileServicesOpen ? 'rotate-180' : ''}`} />
                </button>
                {mobileServicesOpen && (
                  <div className="pl-4 space-y-2 mt-2">
                    {servicesItems.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        className="block py-2 text-muted-foreground hover:text-foreground transition-colors"
                        onClick={closeMobileMenu}
                      >
                        {item.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Industries Collapsible */}
              <div>
                <button
                  className="flex items-center justify-between w-full py-2 text-lg font-medium text-foreground"
                  onClick={() => setMobileIndustriesOpen(!mobileIndustriesOpen)}
                >
                  Industries
                  <ChevronDown className={`h-5 w-5 transition-transform ${mobileIndustriesOpen ? 'rotate-180' : ''}`} />
                </button>
                {mobileIndustriesOpen && (
                  <div className="pl-4 space-y-2 mt-2">
                    {industriesItems.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        className="block py-2 text-muted-foreground hover:text-foreground transition-colors"
                        onClick={closeMobileMenu}
                      >
                        {item.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Static Links */}
              <Link 
                to="/pricing" 
                className="py-2 text-lg font-medium text-foreground"
                onClick={closeMobileMenu}
              >
                Pricing
              </Link>
              <Link 
                to="/portfolio" 
                className="py-2 text-lg font-medium text-foreground"
                onClick={closeMobileMenu}
              >
                Portfolio
              </Link>
              <Link 
                to="/about" 
                className="py-2 text-lg font-medium text-foreground"
                onClick={closeMobileMenu}
              >
                About
              </Link>

              {/* Mobile CTAs */}
              <div className="pt-4 border-t border-border space-y-3">
                <Button asChild className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
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
