/**
 * @fileoverview Header Component - MVP Navigation
 * @description Simplified header with 5 flat navigation links per BRD v35.0.
 *              AI Employee pivot: AI-first positioning with Smart Websites secondary.
 * 
 * @module components/layout/Header
 * 
 * MVP Navigation Structure:
 * - AI Employee (/let-ai-handle-it)
 * - Smart Websites (/smart-websites)
 * - Pricing (/pricing)
 * - About (/about)
 * - Contact (/contact)
 * - Primary CTA: "Get Started" → /pricing
 */

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { NavLink } from '@/components/NavLink';
import { Button } from '@/components/ui/button';
import { CTAButton } from '@/components/CTAButton';
import { LogoRenderer } from '@/components/logo/LogoRenderer';
import { activeTheme } from '@/config/themes';

/**
 * MVP navigation links - 5 flat links per BRD v35.0 Section 17.
 * AI Employee is first to emphasize AI-first positioning.
 */
const navLinks = [
  { title: 'AI Employee', path: '/let-ai-handle-it' },
  { title: 'Smart Websites', path: '/smart-websites' },
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

        {/* Desktop Navigation - 5 flat links */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
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
              {/* Navigation Links */}
              {navLinks.map((link) => (
                <Link 
                  key={link.path}
                  to={link.path} 
                  className="py-3 text-lg font-semibold text-foreground border-b border-border/50 hover:text-accent transition-colors" 
                  onClick={closeMobileMenu}
                >
                  {link.title}
                </Link>
              ))}

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
