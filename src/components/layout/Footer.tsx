/**
 * @fileoverview Site Footer - SSG-Safe Navigation
 * @module components/layout/Footer
 * 
 * Uses native anchor tags for true static site navigation.
 */

import { Linkedin, Twitter, Facebook, Phone, Mail, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { locationsByRegion } from '@/data/locationConfigs';

const servicesLinks = [
  { title: 'All Services', path: '/services' },
  { title: 'AI Employee', path: '/let-ai-handle-it' },
  { title: 'Launch', path: '/smart-websites/launch' },
  { title: 'Capture', path: '/smart-websites/capture' },
  { title: 'Convert', path: '/smart-websites/convert' },
  { title: 'Scale', path: '/smart-websites/scale' },
  { title: 'Compare Plans', path: '/compare-websites' },
  { title: 'Add-On Packs', path: '/smart-websites/add-ons' },
];

const aiModesLinks = [
  { title: 'After-Hours', path: '/let-ai-handle-it/after-hours' },
  { title: 'Front Office', path: '/let-ai-handle-it/front-office' },
  { title: 'Full AI Employee', path: '/let-ai-handle-it/full-ai-employee' },
  { title: 'Compare Modes', path: '/compare-ai-employee' },
];

const resourcesLinks = [
  { title: 'Pricing', path: '/pricing' },
  { title: 'Portfolio', path: '/portfolio' },
  { title: 'FAQ', path: '/faq' },
  { title: 'Help Center', path: '/help' },
  { title: 'Support', path: '/support' },
  { title: 'Industries', path: '/industries' },
];

const companyLinks = [
  { title: 'About', path: '/about' },
  { title: 'Contact', path: '/contact' },
  { title: 'Careers', path: '/careers' },
  { title: 'Client Login', path: 'https://app.everintent.com', external: true },
];

const legalLinks = [
  { title: 'Privacy', path: '/legal/privacy' },
  { title: 'Cookies', path: '/legal/cookies' },
  { title: 'Terms', path: '/legal/terms' },
  { title: 'Data Rights', path: '/legal/data-request' },
  { title: 'Accessibility', path: '/legal/accessibility-statement' },
];

const socialLinks = [
  { icon: Linkedin, href: 'https://linkedin.com/company/everintent', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://twitter.com/everintent', label: 'X' },
  { icon: Facebook, href: 'https://facebook.com/everintent', label: 'Facebook' },
];

/** Renders a footer link column */
function FooterColumn({ title, links }: { title: string; links: { title: string; path: string; external?: boolean }[] }) {
  return (
    <div>
      <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
        {title}
      </h3>
      <div className="w-8 h-[2px] bg-gradient-to-r from-accent to-accent/20 mb-4" />
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.path}>
            <a
              href={link.path}
              {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="text-sm text-muted-foreground hover:text-accent transition-colors duration-300"
            >
              {link.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-card border-t border-border/20">
      <div className="container py-10 md:py-16">
        {/* Main footer grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 mb-8">
          <FooterColumn title="Services" links={servicesLinks} />
          <FooterColumn title="AI Employee" links={aiModesLinks} />
          <FooterColumn title="Resources" links={resourcesLinks} />
          <FooterColumn title="Company" links={companyLinks} />
        </div>

        {/* Locations - collapsible by region using native <details> (SSG-safe) */}
        <div className="border-t border-border/20 pt-6 mb-8">
          <details className="group">
            <summary className="flex items-center gap-2 cursor-pointer list-none text-xs font-medium text-muted-foreground uppercase tracking-wider select-none">
              <ChevronDown className="w-3.5 h-3.5 transition-transform duration-200 group-open:rotate-180" aria-hidden="true" />
              Locations We Serve (35 Cities)
            </summary>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-4 mt-4">
              {Object.entries(locationsByRegion).map(([region, cities]) => (
                <div key={region}>
                  <p className="text-xs font-medium text-foreground mb-2">{region}</p>
                  <ul className="space-y-1">
                    {cities.map((city) => (
                      <li key={city.slug}>
                        <a
                          href={`/locations/${city.slug}`}
                          rel="nofollow"
                          className="text-xs text-muted-foreground hover:text-accent transition-colors duration-300"
                        >
                          {city.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </details>
        </div>

        {/* Brand section - tightened for mobile */}
        <div className="border-t border-border/20 pt-8 pb-6">
          <div className="flex flex-col items-center md:flex-row md:items-start md:justify-between gap-4">
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <a href="/" className="text-2xl font-bold text-foreground mb-2">
                <span className="text-accent">✦</span> Ever<span className="text-gradient">Intent</span>
              </a>
              <p className="text-xs text-muted-foreground max-w-xs">
                AI-powered business solutions. Never miss a call. <a href="/smart-websites" className="text-accent font-medium hover:underline transition-colors">Smart Websites from $249.</a>
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <Button asChild size="sm">
                <a href="/contact">
                  <Phone className="w-3.5 h-3.5 mr-1.5" aria-hidden="true" />
                  Book a Call
                </a>
              </Button>
              <div className="flex items-center gap-1.5">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 text-muted-foreground hover:text-accent transition-colors"
                    aria-label={social.label}
                  >
                    <social.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
          
          {/* Contact Info - compact */}
          <div className="flex flex-col items-center gap-1.5 text-xs mt-4">
            <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
              <a href="mailto:info@everintent.com" className="text-accent hover:underline flex items-center gap-1">
                <Mail className="w-3 h-3" aria-hidden="true" />
                info@everintent.com
              </a>
              <span className="text-muted-foreground">·</span>
              <a href="tel:+15626859500" className="text-accent hover:underline flex items-center gap-1">
                <Phone className="w-3 h-3" aria-hidden="true" />
                (562) 685-9500
              </a>
            </div>
            <p className="text-muted-foreground">
              2892 N Bellflower Blvd, PMB 1018, Long Beach, CA 90815
            </p>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-border/20 pt-4 pb-20 md:pb-4">
          <div className="flex flex-col items-center gap-3 md:flex-row md:justify-between">
            <p className="text-xs text-muted-foreground">
              © {currentYear} EverIntent LLC. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
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
