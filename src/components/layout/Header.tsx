import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, ChevronDown, X, Sparkles } from 'lucide-react';
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-background/95 backdrop-blur-lg border-b border-border/50 shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <div className="container flex h-20 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative">
            <Sparkles className="w-8 h-8 text-accent transition-transform duration-300 group-hover:scale-110" />
            <div className="absolute inset-0 bg-accent/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-display font-bold text-foreground tracking-tight">
              Smart<span className="text-gradient">Sites</span>
            </span>
            <span className="text-[10px] text-muted-foreground font-medium tracking-widest uppercase">
              by EverIntent
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1">
          {/* Services Dropdown */}
          <div className="relative">
            <button 
              className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                servicesOpen 
                  ? 'text-accent bg-muted' 
                  : 'text-foreground/80 hover:text-foreground hover:bg-muted/50'
              }`}
              onClick={() => setServicesOpen(!servicesOpen)}
              onBlur={() => setTimeout(() => setServicesOpen(false), 150)}
            >
              Services
              <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`} />
            </button>
            {isMounted && servicesOpen && (
              <div className="absolute top-full left-0 mt-2 w-72 bg-card border border-border rounded-xl shadow-xl z-50 overflow-hidden animate-fade-in">
                <div className="p-2">
                  {servicesItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className="flex flex-col items-start px-4 py-3 rounded-lg hover:bg-muted transition-colors group"
                      onClick={() => setServicesOpen(false)}
                    >
                      <span className="font-semibold text-foreground group-hover:text-accent transition-colors">{item.title}</span>
                      <span className="text-xs text-muted-foreground mt-0.5">{item.description}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Industries Dropdown */}
          <div className="relative">
            <button 
              className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                industriesOpen 
                  ? 'text-accent bg-muted' 
                  : 'text-foreground/80 hover:text-foreground hover:bg-muted/50'
              }`}
              onClick={() => setIndustriesOpen(!industriesOpen)}
              onBlur={() => setTimeout(() => setIndustriesOpen(false), 150)}
            >
              Industries
              <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${industriesOpen ? 'rotate-180' : ''}`} />
            </button>
            {isMounted && industriesOpen && (
              <div className="absolute top-full left-0 mt-2 w-72 bg-card border border-border rounded-xl shadow-xl z-50 overflow-hidden animate-fade-in">
                <div className="p-2">
                  {industriesItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className="flex flex-col items-start px-4 py-3 rounded-lg hover:bg-muted transition-colors group"
                      onClick={() => setIndustriesOpen(false)}
                    >
                      <span className="font-semibold text-foreground group-hover:text-accent transition-colors">{item.title}</span>
                      <span className="text-xs text-muted-foreground mt-0.5">{item.description}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Static Links */}
          <NavLink 
            to="/pricing" 
            className="px-4 py-2 text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-muted/50 rounded-lg transition-all duration-200"
          >
            Pricing
          </NavLink>
          <NavLink 
            to="/our-work" 
            className="px-4 py-2 text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-muted/50 rounded-lg transition-all duration-200"
          >
            Our Work
          </NavLink>
          <NavLink 
            to="/about" 
            className="px-4 py-2 text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-muted/50 rounded-lg transition-all duration-200"
          >
            About
          </NavLink>
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <Button variant="glow" size="lg" asChild>
            <NavLink to="/pricing">
              Get Started
            </NavLink>
          </Button>
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
                <Button variant="glow" size="lg" className="w-full" asChild>
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