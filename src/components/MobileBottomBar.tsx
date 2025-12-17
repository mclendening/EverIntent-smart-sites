import { NavLink } from 'react-router-dom';
import { Home, Briefcase, Building2, DollarSign, MessageCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

declare global {
  interface Window {
    toggleGHLChat?: () => void;
  }
}

const navItems = [
  { icon: Home, label: 'Home', path: '/' },
  { icon: Briefcase, label: 'Services', path: '/beautiful-websites' },
  { icon: Building2, label: 'Industries', path: '/industries/home-services' },
  { icon: DollarSign, label: 'Pricing', path: '/pricing' },
];

export function MobileBottomBar() {
  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    const checkConsent = () => {
      const consent = localStorage.getItem('cookie-consent');
      setHasConsent(!!consent);
    };

    checkConsent();
    window.addEventListener('cookie-consent-changed', checkConsent);
    window.addEventListener('storage', checkConsent);

    return () => {
      window.removeEventListener('cookie-consent-changed', checkConsent);
      window.removeEventListener('storage', checkConsent);
    };
  }, []);

  const handleChatClick = () => {
    if (window.toggleGHLChat) {
      window.toggleGHLChat();
    }
  };

  // Hidden until cookie consent is given
  if (!hasConsent) return null;

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur border-t border-border"
      aria-label="Mobile navigation"
    >
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-lg transition-colors ${
                isActive
                  ? 'text-primary bg-primary/10'
                  : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
              }`
            }
            aria-label={item.label}
          >
            <item.icon className="h-5 w-5" aria-hidden="true" />
            <span className="text-xs font-medium">{item.label}</span>
          </NavLink>
        ))}

        {/* Chat Button - triggers GHL */}
        <button
          onClick={handleChatClick}
          className="flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-lg transition-colors text-muted-foreground hover:text-foreground hover:bg-accent/50 active:text-primary active:bg-primary/10"
          aria-label="Chat with us"
        >
          <MessageCircle className="h-5 w-5" aria-hidden="true" />
          <span className="text-xs font-medium">Chat</span>
        </button>
      </div>
    </nav>
  );
}