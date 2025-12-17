import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, ChevronDown, Globe } from 'lucide-react';
import { NavLink } from '@/components/NavLink';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

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
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileIndustriesOpen, setMobileIndustriesOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Prevent hydration mismatch - Radix portals render differently on server vs client
  useEffect(() => {
    setIsMounted(true);
  }, []);

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
          {/* Services Dropdown */}
          {isMounted ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-1 text-primary-foreground hover:text-primary-foreground hover:bg-primary-foreground/10">
                  Services
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-64 bg-popover z-50">
                {servicesItems.map((item) => (
                  <DropdownMenuItem key={item.path} asChild>
                    <NavLink to={item.path} className="flex flex-col items-start py-2">
                      <span className="font-medium">{item.title}</span>
                      <span className="text-xs text-muted-foreground">{item.description}</span>
                    </NavLink>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="ghost" className="flex items-center gap-1 text-primary-foreground hover:text-primary-foreground hover:bg-primary-foreground/10">
              Services
              <ChevronDown className="h-4 w-4" />
            </Button>
          )}

          {/* Industries Dropdown */}
          {isMounted ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-1 text-primary-foreground hover:text-primary-foreground hover:bg-primary-foreground/10">
                  Industries
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-64 bg-popover z-50">
                {industriesItems.map((item) => (
                  <DropdownMenuItem key={item.path} asChild>
                    <NavLink to={item.path} className="flex flex-col items-start py-2">
                      <span className="font-medium">{item.title}</span>
                      <span className="text-xs text-muted-foreground">{item.description}</span>
                    </NavLink>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="ghost" className="flex items-center gap-1 text-primary-foreground hover:text-primary-foreground hover:bg-primary-foreground/10">
              Industries
              <ChevronDown className="h-4 w-4" />
            </Button>
          )}

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

        {/* Mobile Menu */}
        {isMounted ? (
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="text-primary-foreground">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 bg-background">
              <div className="flex flex-col space-y-4 mt-8">
                {/* Services Collapsible */}
                <Collapsible open={mobileServicesOpen} onOpenChange={setMobileServicesOpen}>
                  <CollapsibleTrigger className="flex items-center justify-between w-full py-2 text-lg font-medium">
                    Services
                    <ChevronDown className={`h-5 w-5 transition-transform ${mobileServicesOpen ? 'rotate-180' : ''}`} />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pl-4 space-y-2">
                    {servicesItems.map((item) => (
                      <SheetClose key={item.path} asChild>
                        <NavLink
                          to={item.path}
                          className="block py-2 text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {item.title}
                        </NavLink>
                      </SheetClose>
                    ))}
                  </CollapsibleContent>
                </Collapsible>

                {/* Industries Collapsible */}
                <Collapsible open={mobileIndustriesOpen} onOpenChange={setMobileIndustriesOpen}>
                  <CollapsibleTrigger className="flex items-center justify-between w-full py-2 text-lg font-medium">
                    Industries
                    <ChevronDown className={`h-5 w-5 transition-transform ${mobileIndustriesOpen ? 'rotate-180' : ''}`} />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pl-4 space-y-2">
                    {industriesItems.map((item) => (
                      <SheetClose key={item.path} asChild>
                        <NavLink
                          to={item.path}
                          className="block py-2 text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {item.title}
                        </NavLink>
                      </SheetClose>
                    ))}
                  </CollapsibleContent>
                </Collapsible>

                {/* Static Links */}
                <SheetClose asChild>
                  <NavLink to="/pricing" className="py-2 text-lg font-medium">
                    Pricing
                  </NavLink>
                </SheetClose>
                <SheetClose asChild>
                  <NavLink to="/portfolio" className="py-2 text-lg font-medium">
                    Portfolio
                  </NavLink>
                </SheetClose>
                <SheetClose asChild>
                  <NavLink to="/about" className="py-2 text-lg font-medium">
                    About
                  </NavLink>
                </SheetClose>

                {/* Mobile CTAs */}
                <div className="pt-4 border-t border-border space-y-3">
                  <SheetClose asChild>
                    <Button asChild className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                      <NavLink to="/pricing">Get Started</NavLink>
                    </Button>
                  </SheetClose>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        ) : (
          <Button variant="ghost" size="icon" className="md:hidden text-primary-foreground">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Open menu</span>
          </Button>
        )}
      </div>
    </header>
  );
}
