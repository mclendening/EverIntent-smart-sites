/**
 * @fileoverview Site Footer - Simplified Navigation
 * @module components/layout/Footer
 * 
 * Clean 4-column layout with logical groupings.
 * Services, Resources, Company structure.
 */

import { Link } from 'react-router-dom';
import { Linkedin, Twitter, Facebook } from 'lucide-react';

/**
 * Services column links
 */
const servicesLinks = [
  { title: 'AI Employee', path: '/let-ai-handle-it' },
  { title: 'Smart Site', path: '/pricing#smart-site' },
  { title: 'Smart Lead', path: '/pricing#smart-lead' },
  { title: 'Smart Business', path: '/pricing#smart-business' },
  { title: 'Smart Growth', path: '/pricing#smart-growth' },
];

/**
 * Resources column links
 */
const resourcesLinks = [
  { title: 'Pricing', path: '/pricing' },
  { title: 'Industries', path: '/industries' },
];

/**
 * Company column links
 */
const companyLinks = [
  { title: 'About', path: '/about' },
  { title: 'Contact', path: '/contact' },
];

/**
 * Legal links for bottom section
 */
const legalLinks = [
  { title: 'Privacy', path: '/legal/privacy' },
  { title: 'Terms', path: '/legal/terms' },
  { title: 'Cookies', path: '/legal/cookies' },
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
 * Site footer with simplified navigation.
 * 
 * @component
 */
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-card border-t border-border/20">
      <div className="container py-16 md:py-20">
        {/* Main footer grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-16">
          {/* Services */}
          <div>
            <h3 className="text-sm font-medium text-foreground uppercase tracking-wider mb-1">
              Services
            </h3>
            <div className="w-12 h-[2px] bg-gradient-to-r from-accent to-accent/20 mb-5" />
            <ul className="space-y-3">
              {servicesLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-muted-foreground hover:text-accent transition-colors duration-300"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-medium text-foreground uppercase tracking-wider mb-1">
              Resources
            </h3>
            <div className="w-12 h-[2px] bg-gradient-to-r from-accent to-accent/20 mb-5" />
            <ul className="space-y-3">
              {resourcesLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-muted-foreground hover:text-accent transition-colors duration-300"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-medium text-foreground uppercase tracking-wider mb-1">
              Company
            </h3>
            <div className="w-12 h-[2px] bg-gradient-to-r from-accent to-accent/20 mb-5" />
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-muted-foreground hover:text-accent transition-colors duration-300"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-medium text-foreground uppercase tracking-wider mb-1">
              Contact
            </h3>
            <div className="w-12 h-[2px] bg-gradient-to-r from-accent to-accent/20 mb-5" />
            <div className="space-y-2 text-sm text-muted-foreground">
              <p className="text-foreground font-medium">EverIntent LLC</p>
              <p>2892 N Bellflower Blvd</p>
              <p>PMB 1018</p>
              <p>Long Beach, CA 90815</p>
              <a href="mailto:info@everintent.com" className="block hover:text-accent transition-colors mt-3">
                info@everintent.com
              </a>
              <a href="tel:+15626859500" className="block hover:text-accent transition-colors">
                (562) 685-9500
              </a>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="pt-8 border-t border-border/20 pb-20 md:pb-0">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Brand */}
            <div className="flex items-center gap-4">
              <Link to="/" className="text-xl font-bold text-foreground">
                Ever<span className="text-gradient">Intent</span>
              </Link>
              <span className="text-sm text-muted-foreground">
                © {currentYear}
              </span>
            </div>

            {/* Legal + Social */}
            <div className="flex items-center gap-6">
              {/* Legal links */}
              <div className="flex items-center gap-4">
                {legalLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="text-xs text-muted-foreground hover:text-accent transition-colors"
                  >
                    {link.title}
                  </Link>
                ))}
              </div>

              {/* Social icons */}
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
                    <social.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
