import { Link } from 'react-router-dom';

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
  { title: 'Terms', path: '/legal/terms' },
  { title: 'Data Rights', path: '/legal/data-request' },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-muted/50">
      <div className="container py-12 md:py-16">
        {/* Main footer grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {/* Services */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Services</h3>
            <ul className="space-y-2">
              {servicesLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Industries */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Industries</h3>
            <ul className="space-y-2">
              {industriesLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Resources</h3>
            <ul className="space-y-2">
              {resourcesLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Company</h3>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Branded Footer Section */}
        <div className="mt-12 pt-8 border-t border-border">
          {/* Logo, CTA, and Contact */}
          <div className="flex flex-col items-center text-center space-y-4">
            <Link to="/" className="text-2xl font-bold text-foreground">
              SmartSites
            </Link>
            
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-6 py-2 bg-accent text-accent-foreground font-medium rounded-md hover:bg-accent/90 transition-colors"
            >
              Book a Call
            </Link>

            {/* Contact Info */}
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6 text-sm text-muted-foreground">
              <a href="mailto:hello@smartsites.com" className="hover:text-foreground transition-colors">
                hello@smartsites.com
              </a>
              <a href="tel:+18005551234" className="hover:text-foreground transition-colors">
                (800) 555-1234
              </a>
            </div>
          </div>

          {/* Legal Links */}
          <div className="mt-8 pt-6 border-t border-border">
            <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
              {legalLinks.map((link, index) => (
                <span key={link.path} className="flex items-center">
                  <Link
                    to={link.path}
                    className="hover:text-foreground transition-colors"
                  >
                    {link.title}
                  </Link>
                  {index < legalLinks.length - 1 && (
                    <span className="ml-4 text-border">|</span>
                  )}
                </span>
              ))}
            </div>

            {/* Copyright and Tagline */}
            <div className="mt-4 text-center">
              <p className="text-sm text-muted-foreground">
                © {currentYear} SmartSites by EverIntent LLC. All rights reserved.
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Professional websites for local businesses.
              </p>
            </div>

            {/* Call recording disclosure */}
            <p className="mt-4 text-xs text-muted-foreground text-center">
              Calls and texts may be recorded for quality assurance and training purposes.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
