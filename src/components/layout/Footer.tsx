/**
 * @fileoverview Footer - Luxury minimal design
 * @module components/layout/Footer
 */

import { Link } from 'react-router-dom';
import { Linkedin, Twitter, Facebook } from 'lucide-react';

const servicesLinks = [
  { title: 'AI Employee', path: '/let-ai-handle-it' },
  { title: 'Smart Site', path: '/pricing#smart-site' },
  { title: 'Smart Lead', path: '/pricing#smart-lead' },
  { title: 'Smart Business', path: '/pricing#smart-business' },
  { title: 'Smart Growth', path: '/pricing#smart-growth' },
];

const aiModesLinks = [
  { title: 'After-Hours', path: '/let-ai-handle-it#after-hours' },
  { title: 'Booking Agent', path: '/let-ai-handle-it#booking' },
  { title: 'Missed Call Recovery', path: '/let-ai-handle-it#missed-call' },
  { title: 'Front Line Screening', path: '/let-ai-handle-it#screening' },
  { title: 'Full Takeover', path: '/let-ai-handle-it#full-takeover' },
];

const companyLinks = [
  { title: 'About', path: '/about' },
  { title: 'Contact', path: '/contact' },
  { title: 'Pricing', path: '/pricing' },
  { title: 'Industries', path: '/industries' },
];

const legalLinks = [
  { title: 'Privacy', path: '/legal/privacy' },
  { title: 'Terms', path: '/legal/terms' },
  { title: 'Cookies', path: '/legal/cookies' },
];

const socialLinks = [
  { icon: Linkedin, href: 'https://linkedin.com/company/everintent', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://twitter.com/everintent', label: 'X' },
  { icon: Facebook, href: 'https://facebook.com/everintent', label: 'Facebook' },
];

/**
 * Luxury footer with refined typography and spacing.
 */
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-card border-t border-border/20">
      <div className="container py-20 md:py-24">
        {/* Main grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
          {/* Services */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.15em] text-muted-foreground mb-6">
              Services
            </h3>
            <ul className="space-y-3">
              {servicesLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-foreground/70 hover:text-accent transition-colors duration-400"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* AI Modes */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.15em] text-muted-foreground mb-6">
              AI Modes
            </h3>
            <ul className="space-y-3">
              {aiModesLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-foreground/70 hover:text-accent transition-colors duration-400"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.15em] text-muted-foreground mb-6">
              Company
            </h3>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-foreground/70 hover:text-accent transition-colors duration-400"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Brand & Social */}
          <div>
            <h3 className="font-serif text-2xl text-foreground mb-4">
              Ever<span className="text-gradient">Intent</span>
            </h3>
            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
              AI-powered business solutions. Never miss a call. Never lose a lead.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 flex items-center justify-center border border-border/30 text-muted-foreground hover:text-accent hover:border-accent/50 transition-all duration-400"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="py-8 border-t border-border/20 mb-8">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm text-muted-foreground">
            <a href="mailto:info@everintent.com" className="hover:text-accent transition-colors duration-400">
              info@everintent.com
            </a>
            <a href="tel:+15626859500" className="hover:text-accent transition-colors duration-400">
              (562) 685-9500
            </a>
            <span>Long Beach, CA</span>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 pb-20 md:pb-0 border-t border-border/10">
          <p className="text-xs text-muted-foreground/60">
            © {currentYear} EverIntent LLC. All rights reserved.
          </p>

          <div className="flex items-center gap-6 text-xs">
            {legalLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-muted-foreground/60 hover:text-accent transition-colors duration-400"
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
