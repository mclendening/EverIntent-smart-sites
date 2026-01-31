/**
 * @fileoverview Site Footer - Mobile-First Design
 * @module components/layout/Footer
 * 
 * Clean multi-section layout matching the original design.
 */

import { Link } from 'react-router-dom';
import { Linkedin, Twitter, Facebook, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * Services column links
 */
const servicesLinks = [
  { title: 'AI Employee', path: '/let-ai-handle-it' },
  { title: 'Smart Site', path: '/pricing#smart-site' },
  { title: 'Smart Lead', path: '/pricing#smart-lead' },
  { title: 'Smart Business', path: '/pricing#smart-business' },
  { title: 'Smart Growth', path: '/pricing#smart-growth' },
  { title: 'Web Chat Only', path: '/pricing#web-chat' },
  { title: 'Warmy Email Deliverability', path: '/warmy-email-deliverability' },
];

/**
 * AI Modes column links
 */
const aiModesLinks = [
  { title: 'After-Hours', path: '/let-ai-handle-it/after-hours' },
  { title: 'Booking Agent', path: '/let-ai-handle-it/booking' },
  { title: 'Missed Call Recovery', path: '/let-ai-handle-it/missed-call' },
  { title: 'Front Line Screening', path: '/let-ai-handle-it/screening' },
  { title: 'Full AI Employee', path: '/let-ai-handle-it/full-takeover' },
];

/**
 * Resources column links
 */
const resourcesLinks = [
  { title: 'FAQ', path: '/pricing#faq' },
  { title: 'Industries', path: '/industries' },
];

/**
 * Company column links
 */
const companyLinks = [
  { title: 'About', path: '/about' },
  { title: 'Contact', path: '/contact' },
  { title: 'Careers', path: '/careers' },
  { title: 'Legal', path: '/legal/privacy' },
];

/**
 * Legal links for bottom section
 */
const legalLinks = [
  { title: 'Privacy', path: '/legal/privacy' },
  { title: 'Cookies', path: '/legal/cookies' },
  { title: 'Terms', path: '/legal/terms' },
  { title: 'Data Rights', path: '/legal/data-request' },
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
 * Site footer with original mobile-first design.
 * 
 * @component
 */
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-card border-t border-border/20">
      <div className="container py-12 md:py-16">
        {/* Main footer grid - 2 columns on mobile, 4 on desktop */}
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

          {/* AI Modes */}
          <div>
            <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
              AI Modes
            </h3>
            <div className="w-8 h-[2px] bg-gradient-to-r from-accent to-accent/20 mb-4" />
            <ul className="space-y-2">
              {aiModesLinks.map((link) => (
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
            <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
              Resources
            </h3>
            <div className="w-8 h-[2px] bg-gradient-to-r from-accent to-accent/20 mb-4" />
            <ul className="space-y-2">
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
            <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
              Company
            </h3>
            <div className="w-8 h-[2px] bg-gradient-to-r from-accent to-accent/20 mb-4" />
            <ul className="space-y-2">
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
        </div>

        {/* Brand section */}
        <div className="border-t border-border/20 pt-10 pb-8">
          {/* Mobile: all centered | Desktop: brand left, CTA+social right */}
          <div className="flex flex-col items-center md:flex-row md:items-start md:justify-between gap-6">
            {/* Left side - Brand */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <Link to="/" className="text-2xl font-bold text-foreground mb-3">
                <span className="text-accent">✦</span> Ever<span className="text-gradient">Intent</span>
              </Link>
              <p className="text-sm text-muted-foreground max-w-xs">
                AI-powered business solutions. Never miss a call. Never lose a lead. <span className="text-accent font-medium">Smart Websites from $249.</span>
              </p>
            </div>
            
            {/* Right side - CTA + Social (desktop only on right) */}
            <div className="flex flex-col items-center md:items-end gap-4">
              <div className="flex items-center gap-4">
                <Button asChild>
                  <Link to="/contact">
                    <Phone className="w-4 h-4 mr-2" />
                    Book a Call
                  </Link>
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
          
          {/* Contact Info - Always centered */}
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

        {/* Bottom section - Mobile: centered | Desktop: copyright left, legal right */}
        <div className="border-t border-border/20 pt-6 pb-24 md:pb-6">
          <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
            <p className="text-xs text-muted-foreground">
              © {currentYear} EverIntent LLC. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
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
          </div>
        </div>
      </div>
    </footer>
  );
}
