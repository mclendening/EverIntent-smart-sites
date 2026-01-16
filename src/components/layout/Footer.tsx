/**
 * @fileoverview Site footer component with navigation links and branding.
 * @module components/layout/Footer
 */

import { Link } from 'react-router-dom';
import { Linkedin, Twitter, Facebook, Sparkles, ArrowUpRight } from 'lucide-react';

import { CTAButton } from '@/components/CTAButton';

/**
 * Solutions links for the footer - services and external verticals.
 * Per BRD v34.0: "Products" column renamed to "Solutions" with For Law Firms external link.
 */
const solutionsLinks = [
  { title: 'Smart Websites', path: '/smart-websites' },
  { title: 'AI & Automation', path: '/let-ai-handle-it' },
  { title: 'Local SEO', path: '/get-found-online' },
  { title: 'Lead Capture', path: '/never-miss-a-lead' },
  { title: 'Reputation', path: '/build-your-reputation' },
  { title: 'For Law Firms', path: 'https://everintentlegalai.com', external: true },
];

/**
 * Package/tier links for direct conversion paths.
 * Links to checkout pages for each service tier.
 */
const packagesLinks = [
  { title: 'Smart Site', path: '/checkout/smart-site' },
  { title: 'Smart Lead', path: '/checkout/smart-lead' },
  { title: 'Smart Business', path: '/checkout/smart-business' },
  { title: 'Smart Growth', path: '/checkout/smart-growth' },
  { title: 'Smart Launch', path: '/checkout/smart-launch' },
  { title: 'Strategy Session', path: '/strategy-session' },
];

/**
 * Resource and help links for customer support.
 */
const resourcesLinks = [
  { title: 'LocalPros Network', path: '/localpros' },
  { title: 'Help', path: '/help' },
  { title: 'FAQ', path: '/faq' },
  { title: 'Support', path: '/support' },
];

/**
 * Company information links.
 */
const companyLinks = [
  { title: 'About', path: '/about' },
  { title: 'Contact', path: '/contact' },
  { title: 'Our Work', path: '/our-work' },
  { title: 'Careers', path: '/careers' },
];

/**
 * Legal and compliance links for bottom section.
 * Cookies link triggers consent modal instead of navigation.
 */
const legalLinks = [
  { title: 'Privacy', path: '/legal/privacy' },
  { title: 'Cookies', path: '/legal/cookies' },
  { title: 'Terms', path: '/legal/terms' },
  { title: 'Data Rights', path: '/legal/data-request' },
];

/**
 * Social media profile links with icons.
 */
const socialLinks = [
  { icon: Linkedin, href: 'https://linkedin.com/company/everintent', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://twitter.com/everintent', label: 'X (Twitter)' },
  { icon: Facebook, href: 'https://facebook.com/everintent', label: 'Facebook' },
];

/**
 * Site footer with multi-column navigation, branding, contact info, and legal links.
 * Renders EverIntent brand identity with gradient accents and mesh background.
 * The Cookies link triggers the cookie consent modal via triggerCookiePreferences().
 * 
 * Layout:
 * - 4-column grid: Products, Packages, Resources, Company
 * - Branded section with logo, tagline, CTA, and social icons
 * - Contact info row with email and phone
 * - Bottom bar with copyright and legal links
 * 
 * @component
 * @example
 * <Footer />
 */
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-card overflow-hidden">
      {/* Background mesh gradient */}
      <div className="absolute inset-0 bg-mesh opacity-50 pointer-events-none" />
      
      {/* Gradient glow effect at top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-8 bg-gradient-to-b from-accent/10 to-transparent blur-2xl" />
      
      <div className="container relative py-16 md:py-20">
        {/* Main footer grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {/* Solutions (renamed from Products per BRD v34.0) */}
          <div className="space-y-5">
            <h3 className="font-display font-bold text-foreground text-sm uppercase tracking-wider flex items-center gap-2">
              <span className="w-6 h-px bg-gradient-to-r from-accent to-transparent" />
              Solutions
            </h3>
            <ul className="space-y-3">
              {solutionsLinks.map((link) => (
                <li key={link.path}>
                  {link.external ? (
                    <a
                      href={link.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="footer-link text-sm inline-flex items-center gap-1.5 group"
                    >
                      {link.title}
                      <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300" />
                    </a>
                  ) : (
                    <Link
                      to={link.path}
                      className="footer-link text-sm inline-flex items-center gap-1.5 group"
                    >
                      {link.title}
                      <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300" />
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Packages */}
          <div className="space-y-5">
            <h3 className="font-display font-bold text-foreground text-sm uppercase tracking-wider flex items-center gap-2">
              <span className="w-6 h-px bg-gradient-to-r from-accent to-transparent" />
              Packages
            </h3>
            <ul className="space-y-3">
              {packagesLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="footer-link text-sm inline-flex items-center gap-1.5 group"
                  >
                    {link.title}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-5">
            <h3 className="font-display font-bold text-foreground text-sm uppercase tracking-wider flex items-center gap-2">
              <span className="w-6 h-px bg-gradient-to-r from-accent to-transparent" />
              Resources
            </h3>
            <ul className="space-y-3">
              {resourcesLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="footer-link text-sm inline-flex items-center gap-1.5 group"
                  >
                    {link.title}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-5">
            <h3 className="font-display font-bold text-foreground text-sm uppercase tracking-wider flex items-center gap-2">
              <span className="w-6 h-px bg-gradient-to-r from-accent to-transparent" />
              Company
            </h3>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="footer-link text-sm inline-flex items-center gap-1.5 group"
                  >
                    {link.title}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Branded Footer Section */}
        <div className="mt-16 pt-10 border-t border-border/30 relative">
          {/* Subtle gradient on border */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border/50 to-transparent" />
          
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            {/* Brand - Updated per BRD v34.0: EverIntent master brand */}
            <div className="flex flex-col items-center lg:items-start gap-5">
              <Link to="/" className="flex items-center gap-3 group">
                <div className="relative">
                  <Sparkles className="w-9 h-9 text-accent transition-all duration-300 group-hover:scale-110 group-hover:rotate-12" />
                  <div className="absolute inset-0 bg-accent/30 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500" />
                </div>
                <span className="text-[2.5rem] font-display font-bold text-foreground tracking-tight leading-none">
                  Ever<span className="text-gradient">Intent</span>
                </span>
              </Link>
              <p className="text-sm text-muted-foreground text-center lg:text-left max-w-xs leading-relaxed">
                Professional smart websites that actually get you customers. <span className="text-foreground font-medium">Starting at $249.</span>
              </p>
            </div>

            {/* CTA + Social */}
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <CTAButton to="/contact" defaultText="Book a Call" hoverText="Let's Talk" />

              <div className="flex items-center gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative p-2.5 rounded-xl bg-muted/50 border border-border/50 text-muted-foreground hover:text-foreground hover:border-accent/50 hover:bg-accent/10 transition-all duration-300 hover:scale-110 hover:-translate-y-0.5 group"
                    aria-label={social.label}
                  >
                    <social.icon className="w-4 h-4 relative z-10" />
                    <div className="absolute inset-0 rounded-xl bg-accent/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="mt-10 flex flex-col items-center gap-3">
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
              <a href="mailto:info@everintent.com" className="text-muted-foreground hover:text-accent transition-colors duration-300 flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-accent" />
                info@everintent.com
              </a>
              <a href="tel:+15626859500" className="text-muted-foreground hover:text-accent transition-colors duration-300 flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-accent" />
                (562) 685-9500
              </a>
            </div>
            <p className="text-center text-xs text-muted-foreground/60">
              2892 N Bellflower Blvd, PMB 1018, Long Beach, CA 90815
            </p>
          </div>
        </div>

        {/* Bottom bar - extra padding on mobile for MobileBottomBar (h-16 = 64px) */}
        <div className="mt-10 pt-6 pb-20 md:pb-0 border-t border-border/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <p className="text-xs text-muted-foreground/60">
            © {currentYear} EverIntent LLC. All rights reserved.
          </p>

          {/* Legal Links - larger touch targets on mobile */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs">
            {legalLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-muted-foreground/60 hover:text-accent transition-colors duration-300 py-3 px-1 touch-manipulation"
              >
                {link.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
