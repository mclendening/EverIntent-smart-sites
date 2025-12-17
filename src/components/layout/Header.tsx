import { Link } from 'react-router-dom';
import { Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/20 bg-primary">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <Globe className="w-5 h-5 text-accent" />
          <span className="text-lg font-medium text-primary-foreground">EverIntent Smart Sites</span>
        </Link>

        {/* Desktop Navigation - Static links only for SSG compatibility */}
        <nav className="hidden md:flex items-center space-x-1">
          <Button variant="ghost" asChild className="text-primary-foreground hover:text-primary-foreground hover:bg-primary-foreground/10">
            <Link to="/beautiful-websites">Services</Link>
          </Button>
          <Button variant="ghost" asChild className="text-primary-foreground hover:text-primary-foreground hover:bg-primary-foreground/10">
            <Link to="/industries/home-services">Industries</Link>
          </Button>
          <Button variant="ghost" asChild className="text-primary-foreground hover:text-primary-foreground hover:bg-primary-foreground/10">
            <Link to="/pricing">Pricing</Link>
          </Button>
          <Button variant="ghost" asChild className="text-primary-foreground hover:text-primary-foreground hover:bg-primary-foreground/10">
            <Link to="/portfolio">Portfolio</Link>
          </Button>
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center space-x-2">
          <Button asChild className="bg-accent text-primary hover:bg-accent/90">
            <Link to="/pricing">Get Started</Link>
          </Button>
        </div>

        {/* Mobile - just show CTA for now */}
        <div className="md:hidden">
          <Button asChild size="sm" className="bg-accent text-primary hover:bg-accent/90">
            <Link to="/pricing">Get Started</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
