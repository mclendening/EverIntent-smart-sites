import { Link } from 'react-router-dom';
import { Linkedin, Twitter, Facebook, Sparkles, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { triggerCookiePreferences } from '@/components/CookieConsent';

// Products links (SEO-focused product category pages)
const productsLinks = [
  { title: 'Web Design', path: '/services/web-design' },
  { title: 'Local SEO', path: '/services/seo' },
  { title: 'Lead Capture', path: '/services/lead-capture' },
  { title: 'Online Booking', path: '/services/booking' },
  { title: 'Reputation', path: '/services/reputation' },
  { title: 'AI Automation', path: '/services/ai-automation' },
];

// Packages links (direct conversion paths)
const packagesLinks = [
  { title: 'Smart Site', path: '/checkout/smart-site' },
  { title: 'Smart Lead', path: '/checkout/smart-lead' },
  { title: 'Smart Business', path: '/checkout/smart-business' },
  { title: 'Smart Growth', path: '/checkout/smart-growth' },
  { title: 'Smart Launch', path: '/checkout/smart-launch' },
  { title: 'Strategy Session', path: '/strategy-session' },
];

// Resources links
const resourcesLinks = [
  { title: 'LocalPros Network', path: '/localpros' },
  { title: 'Help', path: '/help' },
  { title: 'FAQ', path: '/faq' },
  { title: 'Support', path: '/support' },
];

// Company links
const companyLinks = [
  { title: 'About', path: '/about' },
  { title: 'Contact', path: '/contact' },
  { title: 'Our Work', path: '/our-work' },
  { title: 'Careers', path: '/careers' },
];

// Legal links (for bottom section)
const legalLinks = [
  { title: 'Privacy', path: '/legal/privacy' },
  { title: 'Cookies', path: '/legal/cookies' },
  { title: 'Terms', path: '/legal/terms' },
  { title: 'Data Rights', path: '/legal/data-request' },
];

const socialLinks = [
  { icon: Linkedin, href: 'https://linkedin.com/company/everintent', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://twitter.com/everintent', label: 'X (Twitter)' },
  { icon: Facebook, href: 'https://facebook.com/everintent', label: 'Facebook' },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border bg-card">
      {/* Gradient glow effect at top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
      
      <div className="container py-16 md:py-20">
        {/* Main footer grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {/* Products */}
          <div>
            <h3 className="font-display font-semibold text-foreground mb-5 text-sm uppercase tracking-wider">Products</h3>
            <ul className="space-y-3">
              {productsLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-muted-foreground hover:text-accent transition-colors inline-flex items-center gap-1 group"
                  >
                    {link.title}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Packages */}
          <div>
            <h3 className="font-display font-semibold text-foreground mb-5 text-sm uppercase tracking-wider">Packages</h3>
            <ul className="space-y-3">
              {packagesLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-muted-foreground hover:text-accent transition-colors inline-flex items-center gap-1 group"
                  >
                    {link.title}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-display font-semibold text-foreground mb-5 text-sm uppercase tracking-wider">Resources</h3>
            <ul className="space-y-3">
              {resourcesLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-muted-foreground hover:text-accent transition-colors inline-flex items-center gap-1 group"
                  >
                    {link.title}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-display font-semibold text-foreground mb-5 text-sm uppercase tracking-wider">Company</h3>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-muted-foreground hover:text-accent transition-colors inline-flex items-center gap-1 group"
                  >
                    {link.title}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Branded Footer Section */}
        <div className="mt-16 pt-8 border-t border-border">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            {/* Brand */}
            <div className="flex flex-col items-center lg:items-start gap-4">
              <Link to="/" className="flex items-center gap-3 group">
                <div className="relative">
                  <Sparkles className="w-8 h-8 text-accent" />
                  <div className="absolute inset-0 bg-accent/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-display font-bold text-foreground tracking-tight">
                    Smart<span className="text-gradient">Sites</span>
                  </span>
                  <span className="text-[10px] text-muted-foreground font-medium tracking-widest uppercase">
                    by EverIntent
                  </span>
                </div>
              </Link>
              <p className="text-sm text-muted-foreground text-center lg:text-left max-w-xs">
                Professional websites that actually get you customers. Starting at $249.
              </p>
            </div>

            {/* CTA + Social */}
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <Button variant="glow" size="lg" asChild className="group">
                <Link to="/contact" className="flex items-center gap-3">
                  <Sparkles className="w-4 h-4 text-accent transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" />
                  <span>Book a Call</span>
                  <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                </Link>
              </Button>

              <div className="flex items-center gap-2">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-full bg-muted hover:bg-accent hover:text-accent-foreground transition-all duration-200 hover:scale-110"
                    aria-label={social.label}
                  >
                    <social.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="mt-8 flex flex-col items-center gap-2 text-sm text-muted-foreground">
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
              <a href="mailto:info@everintent.com" className="hover:text-accent transition-colors">
                info@everintent.com
              </a>
              <span className="hidden sm:inline text-border">•</span>
              <a href="tel:+15626859500" className="hover:text-accent transition-colors">
                (562) 685-9500
              </a>
            </div>
            <p className="text-center text-xs text-muted-foreground/70">
              2892 N Bellflower Blvd, PMB 1018, Long Beach, CA 90815
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <p className="text-xs text-muted-foreground">
            © {currentYear} EverIntent LLC. All rights reserved.
          </p>

          {/* Legal Links */}
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
            {legalLinks.map((link) => (
              link.path === '/legal/cookies' ? (
                <button
                  key={link.path}
                  onClick={triggerCookiePreferences}
                  className="hover:text-accent transition-colors"
                >
                  {link.title}
                </button>
              ) : (
                <Link
                  key={link.path}
                  to={link.path}
                  className="hover:text-accent transition-colors"
                >
                  {link.title}
                </Link>
              )
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}