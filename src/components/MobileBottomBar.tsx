/**
 * @fileoverview MobileBottomBar - Luxury minimal mobile navigation
 * @module components/MobileBottomBar
 */

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
  { icon: Briefcase, label: 'Services', path: '/let-ai-handle-it' },
  { icon: Building2, label: 'Industries', path: '/industries' },
  { icon: DollarSign, label: 'Pricing', path: '/pricing' },
];

/**
 * Mobile bottom navigation bar with luxury minimal styling
 */
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

  if (!hasConsent) return null;

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-card/95 backdrop-blur-sm border-t border-border/20"
      aria-label="Mobile navigation"
    >
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center gap-1 px-3 py-2 transition-colors ${
                isActive
                  ? 'text-accent'
                  : 'text-muted-foreground hover:text-foreground'
              }`
            }
            aria-label={item.label}
          >
            <item.icon className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
            <span className="text-[10px] font-medium uppercase tracking-wider">{item.label}</span>
          </NavLink>
        ))}

        {/* Chat Button */}
        <button
          onClick={handleChatClick}
          className="flex flex-col items-center justify-center gap-1 px-3 py-2 text-muted-foreground hover:text-foreground active:text-accent transition-colors"
          aria-label="Chat with us"
        >
          <MessageCircle className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
          <span className="text-[10px] font-medium uppercase tracking-wider">Chat</span>
        </button>
      </div>
    </nav>
  );
}
