import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, ChevronDown, X, Sparkles } from 'lucide-react';
import { NavLink } from '@/components/NavLink';
import { Button } from '@/components/ui/button';
import { CTAButton } from '@/components/CTAButton';

// Services dropdown items - Beautiful Websites at TOP per BRD
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

export function Header() {
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

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-background/95 backdrop-blur-xl border-b border-border/30 shadow-layered' 
          : 'bg-transparent'
      }`}
    >
      {/* Subtle gradient line at bottom when scrolled */}
      {scrolled && (
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
      )}

      <div className="container flex h-20 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative">
            <Sparkles className="w-8 h-8 text-intent-blue transition-all duration-300 group-hover:scale-110 group-hover:rotate-12" strokeWidth={1.5} />
            <div className="absolute inset-0 bg-intent-blue/30 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500" />
          </div>
          <div className="flex flex-col gap-0">
            <span className="text-2xl font-display font-bold tracking-tight leading-none">
              <span className="text-white">Ever</span><span className="text-intent-blue">Intent</span>
            </span>
            <div className="h-0.5 w-full bg-gradient-to-r from-intent-blue to-intent-blue/30 rounded-full" />
            <span className="text-xs text-muted-foreground/80 font-normal tracking-wide leading-tight mt-0.5">
              Web Design & Automation
            </span>
          </div>
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

          {/* Separator */}
          <div className="w-px h-5 bg-border/50 mx-2" />

          {/* Static Links with animated underline */}
          <NavLink 
            to="/pricing" 
            className="nav-link px-4 py-2.5 text-sm font-medium text-foreground/70 hover:text-foreground transition-all duration-300"
          >
            Pricing
          </NavLink>
          <NavLink 
            to="/our-work" 
            className="nav-link px-4 py-2.5 text-sm font-medium text-foreground/70 hover:text-foreground transition-all duration-300"
          >
            Our Work
          </NavLink>
          <NavLink 
            to="/about" 
            className="nav-link px-4 py-2.5 text-sm font-medium text-foreground/70 hover:text-foreground transition-all duration-300"
          >
            About
          </NavLink>
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

      {/* Mobile Menu */}
      {isMounted && mobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
            onClick={closeMobileMenu}
          />
          {/* Menu Panel */}
          <div className="fixed top-20 right-0 bottom-0 w-full max-w-sm bg-card border-l border-border z-50 lg:hidden overflow-y-auto animate-slide-in-right">
            <div className="flex flex-col p-6 space-y-2">
              {/* Services Collapsible */}
              <div className="border-b border-border/50 pb-2">
                <button
                  className="flex items-center justify-between w-full py-3 text-lg font-semibold text-foreground"
                  onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                >
                  Services
                  <ChevronDown className={`h-5 w-5 text-muted-foreground transition-transform ${mobileServicesOpen ? 'rotate-180' : ''}`} />
                </button>
                {mobileServicesOpen && (
                  <div className="pl-4 space-y-1 mt-2 animate-fade-in">
                    {servicesItems.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        className="block py-2.5 text-muted-foreground hover:text-accent transition-colors"
                        onClick={closeMobileMenu}
                      >
                        {item.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Industries Collapsible */}
              <div className="border-b border-border/50 pb-2">
                <button
                  className="flex items-center justify-between w-full py-3 text-lg font-semibold text-foreground"
                  onClick={() => setMobileIndustriesOpen(!mobileIndustriesOpen)}
                >
                  Industries
                  <ChevronDown className={`h-5 w-5 text-muted-foreground transition-transform ${mobileIndustriesOpen ? 'rotate-180' : ''}`} />
                </button>
                {mobileIndustriesOpen && (
                  <div className="pl-4 space-y-1 mt-2 animate-fade-in">
                    {industriesItems.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        className="block py-2.5 text-muted-foreground hover:text-accent transition-colors"
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
                className="py-3 text-lg font-semibold text-foreground border-b border-border/50"
                onClick={closeMobileMenu}
              >
                Pricing
              </Link>
              <Link 
                to="/our-work" 
                className="py-3 text-lg font-semibold text-foreground border-b border-border/50"
                onClick={closeMobileMenu}
              >
                Our Work
              </Link>
              <Link 
                to="/about" 
                className="py-3 text-lg font-semibold text-foreground border-b border-border/50"
                onClick={closeMobileMenu}
              >
                About
              </Link>

              {/* Mobile CTAs */}
              <div className="pt-6 space-y-3">
                <CTAButton 
                  to="/pricing" 
                  defaultText="Get Started" 
                  hoverText="Let's Go!" 
                  onClick={closeMobileMenu}
                  fullWidth
                />
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
}