/**
 * @fileoverview Site Footer - SSG-Safe Navigation
 * @module components/layout/Footer
 * 
 * Uses native anchor tags for true static site navigation.
 */

import { Linkedin, Twitter, Facebook, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * Services column links
 */
const servicesLinks = [
  { title: 'All Services', path: '/services' },
  { title: 'AI Employee', path: '/let-ai-handle-it' },
  { title: 'Launch', path: '/smart-websites/launch' },
  { title: 'Capture', path: '/smart-websites/capture' },
  { title: 'Convert', path: '/smart-websites/convert' },
  { title: 'Scale', path: '/smart-websites/scale' },
  { title: 'Compare Plans', path: '/compare-websites' },
  { title: 'Add-On Packs', path: '/smart-websites/add-ons' },
  { title: 'Warmy Email Deliverability', path: '/warmy-email-deliverability' },
];

/**
 * AI Employee modes column links
 */
const aiModesLinks = [
  { title: 'After-Hours', path: '/let-ai-handle-it/after-hours' },
  { title: 'Front Office', path: '/let-ai-handle-it/front-office' },
  { title: 'Full AI Employee', path: '/let-ai-handle-it/full-ai-employee' },
  { title: 'Compare Modes', path: '/compare-ai-employee' },
];

/**
 * Resources column links
 */
const resourcesLinks = [
  { title: 'Portfolio', path: '/portfolio' },
  { title: 'FAQ', path: '/pricing#faq' },
  { title: 'Industries', path: '/industries' },
  { title: 'Long Beach', path: '/locations/long-beach' },
  { title: 'Orange County', path: '/locations/orange-county' },
  { title: 'Los Angeles', path: '/locations/los-angeles' },
];

/**
 * Company column links
 */
const companyLinks = [
  { title: 'About', path: '/about' },
  { title: 'Contact', path: '/contact' },
  { title: 'Careers', path: '/careers' },
  { title: 'Client Login', path: 'https://app.everintent.com', external: true },
];

/**
 * Legal links for bottom section
 */
const legalLinks = [
  { title: 'Privacy', path: '/legal/privacy' },
  { title: 'Cookies', path: '/legal/cookies' },
  { title: 'Terms', path: '/legal/terms' },
  { title: 'Data Rights', path: '/legal/data-request' },
  { title: 'Accessibility', path: '/legal/accessibility-statement' },
];

/**
 * Social media links
 */
const socialLinks = [
  { icon: Linkedin, href: 'https://linkedin.com/company/everintent', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://twitter.com/everintent', label: 'X' },
  { icon: Facebook, href: 'https://facebook.com/everintent', label: 'Facebook' },
];

/**
 * Site footer with SSG-safe native anchor navigation.
 */
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-card border-t border-border/20">
      <div className="container py-12 md:py-16">
        {/* Main footer grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-12">
          {/* Services */}
          <div>
            <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
              Services
            </h3>
            <div className="w-8 h-[2px] bg-gradient-to-r from-accent to-accent/20 mb-4" />
            <ul className="space-y-2">
              {servicesLinks.map((link) => (
                <li key={link.path}>
                  <a
                    href={link.path}
                    className="text-sm text-muted-foreground hover:text-accent transition-colors duration-300"
                  >
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* AI Employee */}
          <div>
            <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
              AI Employee
            </h3>
            <div className="w-8 h-[2px] bg-gradient-to-r from-accent to-accent/20 mb-4" />
            <ul className="space-y-2">
              {aiModesLinks.map((link) => (
                <li key={link.path}>
                  <a
                    href={link.path}
                    className="text-sm text-muted-foreground hover:text-accent transition-colors duration-300"
                  >
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
              Resources
            </h3>
            <div className="w-8 h-[2px] bg-gradient-to-r from-accent to-accent/20 mb-4" />
            <ul className="space-y-2">
              {resourcesLinks.map((link) => (
                <li key={link.path}>
                  <a
                    href={link.path}
                    className="text-sm text-muted-foreground hover:text-accent transition-colors duration-300"
                  >
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
              Company
            </h3>
            <div className="w-8 h-[2px] bg-gradient-to-r from-accent to-accent/20 mb-4" />
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link.path}>
                  {'external' in link && link.external ? (
                    <a
                      href={link.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted-foreground hover:text-accent transition-colors duration-300"
                    >
                      {link.title}
                    </a>
                  ) : (
                    <a
                      href={link.path}
                      className="text-sm text-muted-foreground hover:text-accent transition-colors duration-300"
                    >
                      {link.title}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Brand section */}
        <div className="border-t border-border/20 pt-10 pb-8">
          <div className="flex flex-col items-center md:flex-row md:items-start md:justify-between gap-6">
            {/* Left side - Brand */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <a href="/" className="text-2xl font-bold text-foreground mb-3">
                <span className="text-accent">✦</span> Ever<span className="text-gradient">Intent</span>
              </a>
              <p className="text-sm text-muted-foreground max-w-xs">
                AI-powered business solutions. Never miss a call. Never lose a lead. <a href="/smart-websites" className="text-accent font-medium hover:underline transition-colors">Smart Websites from $249.</a>
              </p>
            </div>
            
            {/* Right side - CTA + Social */}
            <div className="flex flex-col items-center md:items-end gap-4">
              <div className="flex items-center gap-4">
                <Button asChild>
                  <a href="/contact">
                    <Phone className="w-4 h-4 mr-2" />
                    Book a Call
                  </a>
                </Button>
                <div className="flex items-center gap-2">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-muted-foreground hover:text-accent transition-colors"
                      aria-label={social.label}
                    >
                      <social.icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact Info */}
          <div className="flex flex-col items-center gap-2 text-sm mt-6">
            <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
              <a href="mailto:info@everintent.com" className="text-accent hover:underline flex items-center gap-1">
                <Mail className="w-3 h-3" />
                info@everintent.com
              </a>
              <span className="text-muted-foreground">•</span>
              <a href="tel:+15626859500" className="text-accent hover:underline flex items-center gap-1">
                <Phone className="w-3 h-3" />
                (562) 685-9500
              </a>
            </div>
            <p className="text-xs text-muted-foreground">
              2892 N Bellflower Blvd, PMB 1018, Long Beach, CA 90815
            </p>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-border/20 pt-6 pb-24 md:pb-6">
          <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
            <p className="text-xs text-muted-foreground">
              © {currentYear} EverIntent LLC. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {legalLinks.map((link) => (
                <a
                  key={link.path}
                  href={link.path}
                  className="text-xs text-muted-foreground hover:text-accent transition-colors"
                >
                  {link.title}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
