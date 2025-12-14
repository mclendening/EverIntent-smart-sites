import { Link } from 'react-router-dom';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-muted/50">
      <div className="container py-12">
        {/* Footer content placeholder - will be built in Prompt 5 */}
        <div className="flex flex-col items-center justify-center space-y-4">
          <Link to="/" className="text-xl font-bold text-foreground">
            SmartSites
          </Link>
          <p className="text-sm text-muted-foreground text-center max-w-md">
            Professional websites for local businesses. Built in 5 days. Starting at $249.
          </p>
        </div>
        
        <div className="mt-8 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © {currentYear} EverIntent LLC. All rights reserved.
            </p>
            <div className="flex items-center space-x-4">
              <Link to="/legal/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Privacy
              </Link>
              <Link to="/legal/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Terms
              </Link>
            </div>
          </div>
          <p className="mt-4 text-xs text-muted-foreground text-center">
            Calls and texts may be recorded for quality assurance and training purposes.
          </p>
        </div>
      </div>
    </footer>
  );
}
