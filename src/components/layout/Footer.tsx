import { Link } from 'react-router-dom';

// Services links
const servicesLinks = [
  { title: 'Beautiful Websites', path: '/beautiful-websites' },
  { title: 'Get Found Online', path: '/get-found-online' },
  { title: 'Never Miss a Lead', path: '/never-miss-a-lead' },
  { title: 'Book More Jobs', path: '/book-more-jobs' },
  { title: 'Run From Your Phone', path: '/run-from-your-phone' },
  { title: 'Build Your Reputation', path: '/build-your-reputation' },
  { title: 'Let AI Handle It', path: '/let-ai-handle-it' },
];

// Industries links
const industriesLinks = [
  { title: 'Home Services', path: '/industries/home-services' },
  { title: 'Professional Services', path: '/industries/professional-services' },
  { title: 'Health & Wellness', path: '/industries/health-wellness' },
  { title: 'Automotive Services', path: '/industries/automotive-services' },
];

// Company links
const companyLinks = [
  { title: 'About', path: '/about' },
  { title: 'Contact', path: '/contact' },
  { title: 'Portfolio', path: '/portfolio' },
  { title: 'Book a Call', path: '/book-call' },
  { title: 'Pricing', path: '/pricing' },
];

// Legal links
const legalLinks = [
  { title: 'Privacy Policy', path: '/legal/privacy' },
  { title: 'Terms of Service', path: '/legal/terms' },
  { title: 'Data Request', path: '/legal/data-request' },
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

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Legal</h3>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
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

        {/* Bottom section */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Logo and tagline */}
            <div className="flex flex-col items-center md:items-start">
              <Link to="/" className="text-xl font-bold text-foreground">
                SmartSites
              </Link>
              <p className="text-sm text-muted-foreground mt-1">
                Professional websites for local businesses.
              </p>
            </div>

            {/* Copyright */}
            <p className="text-sm text-muted-foreground text-center md:text-right">
              © {currentYear} EverIntent LLC. All rights reserved.
            </p>
          </div>

          {/* Call recording disclosure */}
          <p className="mt-6 text-xs text-muted-foreground text-center">
            Calls and texts may be recorded for quality assurance and training purposes.
          </p>
        </div>
      </div>
    </footer>
  );
}
