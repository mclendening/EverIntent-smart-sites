import { Link } from 'react-router-dom';
import { Linkedin, Twitter, Facebook } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Services links (Pricing at bottom per nav decisions)
const servicesLinks = [
  { title: 'Beautiful Websites', path: '/beautiful-websites' },
  { title: 'Get Found Online', path: '/get-found-online' },
  { title: 'Never Miss a Lead', path: '/never-miss-a-lead' },
  { title: 'Book More Jobs', path: '/book-more-jobs' },
  { title: 'Run From Your Phone', path: '/run-from-your-phone' },
  { title: 'Build Your Reputation', path: '/build-your-reputation' },
  { title: 'Let AI Handle It', path: '/let-ai-handle-it' },
  { title: 'Pricing', path: '/pricing' },
];

// Industries links
const industriesLinks = [
  { title: 'Home Services', path: '/industries/home-services' },
  { title: 'Professional Services', path: '/industries/professional-services' },
  { title: 'Health & Wellness', path: '/industries/health-wellness' },
  { title: 'Automotive Services', path: '/industries/automotive-services' },
];

// Resources links
const resourcesLinks = [
  { title: 'Help', path: '/help' },
  { title: 'FAQ', path: '/faq' },
  { title: 'Support', path: '/support' },
];

// Company links
const companyLinks = [
  { title: 'About', path: '/about' },
  { title: 'Contact', path: '/contact' },
  { title: 'Portfolio', path: '/portfolio' },
];

// Legal links (for bottom section)
const legalLinks = [
  { title: 'Privacy', path: '/legal/privacy' },
  { title: 'Cookies', path: '/legal/cookies' },
  { title: 'Terms of Service', path: '/legal/terms' },
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
    <footer className="border-t border-border bg-primary text-primary-foreground">
      <div className="container py-12 md:py-16">
        {/* Main footer grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {/* Services */}
          <div>
            <h3 className="font-semibold text-primary-foreground mb-4">Services</h3>
            <ul className="space-y-2">
              {servicesLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-primary-foreground/70 hover:text-accent transition-colors"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Industries */}
          <div>
            <h3 className="font-semibold text-primary-foreground mb-4">Industries</h3>
            <ul className="space-y-2">
              {industriesLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-primary-foreground/70 hover:text-accent transition-colors"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-primary-foreground mb-4">Resources</h3>
            <ul className="space-y-2">
              {resourcesLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-primary-foreground/70 hover:text-accent transition-colors"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-primary-foreground mb-4">Company</h3>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-primary-foreground/70 hover:text-accent transition-colors"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Branded Footer Section */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/20">
          {/* Logo, CTA, Social, and Contact */}
          <div className="flex flex-col items-center text-center space-y-6">
            {/* Brand Name */}
            <Link to="/" className="text-2xl font-bold text-primary-foreground">
              EverIntent Smart Sites
            </Link>

            {/* CTA + Social Icons Row */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Button
                asChild
                className="bg-accent text-accent-foreground hover:bg-accent-hover font-medium px-6 shadow-button"
              >
                <Link to="/contact">Book a Call</Link>
              </Button>

              {/* Social Icons */}
              <div className="flex items-center gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-primary-foreground/10 hover:bg-accent hover:text-accent-foreground transition-colors"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

          {/* Contact Info */}
          <div className="flex flex-col items-center gap-1 text-sm text-primary-foreground/70">
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6">
              <a href="mailto:info@everintent.com" className="hover:text-accent transition-colors">
                info@everintent.com
              </a>
              <a href="tel:+15626859500" className="hover:text-accent transition-colors">
                (562) 685-9500
              </a>
            </div>
            <p className="mt-1 text-center">
              EverIntent LLC, 2892 N Bellflower Blvd, PMB 1018, Long Beach, CA 90815
            </p>
          </div>
          </div>

          {/* Divider */}
          <div className="my-8 border-t border-primary-foreground/20" />

          {/* Legal Links */}
          <div className="flex flex-wrap justify-center gap-4 text-sm text-primary-foreground/70">
            {legalLinks.map((link, index) => (
              <span key={link.path} className="flex items-center">
                <Link
                  to={link.path}
                  className="hover:text-accent transition-colors"
                >
                  {link.title}
                </Link>
                {index < legalLinks.length - 1 && (
                  <span className="ml-4 text-primary-foreground/30">|</span>
                )}
              </span>
            ))}
          </div>

          {/* Copyright and Tagline */}
          <div className="mt-6 text-center">
            <p className="text-sm text-primary-foreground/70">
              © {currentYear} EverIntent LLC. All rights reserved.
            </p>
            <p className="text-sm text-primary-foreground/50 mt-2">
              Professional websites for local businesses.
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
}
