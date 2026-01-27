/**
 * @fileoverview DesktopChatButton - Luxury chat trigger
 * @module components/DesktopChatButton
 */

import { useEffect, useState } from 'react';
import { MessageCircle } from 'lucide-react';

const CONSENT_KEY = 'cookie-consent';

/**
 * Minimal desktop chat button with elegant styling.
 */
export function DesktopChatButton() {
  const [hasConsent, setHasConsent] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const checkConsent = () => {
      const consent = localStorage.getItem(CONSENT_KEY);
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

  useEffect(() => {
    if (hasConsent) {
      const timer = setTimeout(() => setIsVisible(true), 300);
      return () => clearTimeout(timer);
    }
  }, [hasConsent]);

  const handleClick = () => {
    if (window.toggleGHLChat) {
      window.toggleGHLChat();
    }
  };

  if (!hasConsent) return null;

  return (
    <button
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="hidden md:flex fixed right-6 z-40 items-center gap-3 px-5 py-3 bg-card border border-border/30 transition-all duration-400 hover:border-accent/50 hover:shadow-glow group"
      style={{
        bottom: isVisible ? '24px' : '-80px',
      }}
      aria-label="Chat with us"
    >
      <MessageCircle 
        className="text-accent transition-transform duration-300 group-hover:scale-110"
        size={18}
        strokeWidth={1.5}
      />
      <span className="text-foreground text-sm tracking-wide whitespace-nowrap">
        {isHovered ? 'Chat with us' : 'Need help?'}
      </span>
      <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
    </button>
  );
}
