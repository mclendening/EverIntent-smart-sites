/**
 * @fileoverview Footer - Luxury minimal design
 * @module components/layout/Footer
 */

import { Link } from 'react-router-dom';
import { Linkedin, Twitter, Facebook, ArrowUpRight } from 'lucide-react';

const servicesLinks = [
  { title: 'AI Employee', path: '/let-ai-handle-it' },
  { title: 'Smart Site', path: '/pricing#smart-site' },
  { title: 'Smart Lead', path: '/pricing#smart-lead' },
  { title: 'Smart Business', path: '/pricing#smart-business' },
  { title: 'Smart Growth', path: '/pricing#smart-growth' },
  { title: 'Warmy Email', path: '/warmy-email-deliverability' },
];

const aiModesLinks = [
  { title: 'After-Hours', path: '/let-ai-handle-it#after-hours' },
  { title: 'Booking Agent', path: '/let-ai-handle-it#booking' },
  { title: 'Missed Call Recovery', path: '/let-ai-handle-it#missed-call' },
  { title: 'Front Line Screening', path: '/let-ai-handle-it#screening' },
  { title: 'Full Takeover', path: '/let-ai-handle-it#full-takeover' },
];

const resourcesLinks = [
  { title: 'Pricing', path: '/pricing' },
  { title: 'Industries', path: '/industries' },
];

const companyLinks = [
  { title: 'About', path: '/about' },
  { title: 'Contact', path: '/contact' },
  { title: 'Careers', path: '/careers' },
];

const legalLinks = [
  { title: 'Privacy', path: '/legal/privacy' },
  { title: 'Cookies', path: '/legal/cookies' },
  { title: 'Terms', path: '/legal/terms' },
];

const socialLinks = [
  { icon: Linkedin, href: 'https://linkedin.com/company/everintent', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://twitter.com/everintent', label: 'X' },
  { icon: Facebook, href: 'https://facebook.com/everintent', label: 'Facebook' },
];

/**
 * Luxury minimal footer with 4-column navigation
 */
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-card border-t border-border/20">
      {/* Gold accent line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
      
      <div className="container py-16 md:py-20">
        {/* Main grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-16">
          {/* Services */}
          <div>
            <h3 className="text-sm font-medium text-foreground uppercase tracking-widest mb-6">
              Services
              <span className="block w-8 h-px mt-3 bg-gradient-to-r from-accent to-transparent" />
            </h3>
            <ul className="space-y-3">
              {servicesLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="footer-link text-sm inline-flex items-center gap-1 group">
                    {link.title}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* AI Modes */}
          <div>
            <h3 className="text-sm font-medium text-foreground uppercase tracking-widest mb-6">
              AI Modes
              <span className="block w-8 h-px mt-3 bg-gradient-to-r from-accent to-transparent" />
            </h3>
            <ul className="space-y-3">
              {aiModesLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="footer-link text-sm inline-flex items-center gap-1 group">
                    {link.title}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-medium text-foreground uppercase tracking-widest mb-6">
              Resources
              <span className="block w-8 h-px mt-3 bg-gradient-to-r from-accent to-transparent" />
            </h3>
            <ul className="space-y-3">
              {resourcesLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="footer-link text-sm inline-flex items-center gap-1 group">
                    {link.title}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-medium text-foreground uppercase tracking-widest mb-6">
              Company
              <span className="block w-8 h-px mt-3 bg-gradient-to-r from-accent to-transparent" />
            </h3>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="footer-link text-sm inline-flex items-center gap-1 group">
                    {link.title}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Brand section */}
        <div className="pt-10 border-t border-border/20">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            {/* Brand */}
            <div className="flex flex-col items-center lg:items-start gap-4">
              <Link to="/" className="font-serif text-3xl font-semibold text-foreground">
                Ever<span className="text-accent">Intent</span>
              </Link>
              <p className="text-sm text-muted-foreground text-center lg:text-left max-w-xs">
                AI-powered business solutions. Never miss a lead.
              </p>
            </div>

            {/* Contact + Social */}
            <div className="flex flex-col items-center lg:items-end gap-4">
              <div className="flex items-center gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 border border-border/30 text-muted-foreground hover:text-accent hover:border-accent/30 transition-all duration-300"
                    aria-label={social.label}
                  >
                    <social.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
              <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
                <a href="mailto:info@everintent.com" className="hover:text-accent transition-colors">
                  info@everintent.com
                </a>
                <span className="hidden sm:block">•</span>
                <a href="tel:+15626859500" className="hover:text-accent transition-colors">
                  (562) 685-9500
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 pb-20 md:pb-0 border-t border-border/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground/60">
            © {currentYear} EverIntent LLC. All rights reserved.
          </p>

          <div className="flex items-center gap-6 text-xs">
            {legalLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-muted-foreground/60 hover:text-accent transition-colors py-2"
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
