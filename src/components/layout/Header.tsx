import { Link } from 'react-router-dom';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold text-foreground">SmartSites</span>
        </Link>
        
        {/* Navigation placeholder - will be built in Prompt 5 */}
        <nav className="hidden md:flex items-center space-x-6">
          <span className="text-sm text-muted-foreground">Navigation coming soon</span>
        </nav>
      </div>
    </header>
  );
}
