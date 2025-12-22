import { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';

const CONSENT_KEY = 'cookie-consent';

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
    // Slide up after consent (delayed fade-up animation)
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

  // Don't render until cookies are accepted
  if (!hasConsent) return null;

  return (
    <button
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="hidden md:flex fixed right-6 z-40 items-center gap-3 px-5 py-3 bg-primary/95 backdrop-blur-sm border border-accent/30 rounded-lg shadow-lg transition-all duration-300 ease-out hover:bg-primary hover:border-accent hover:shadow-[0_0_25px_hsl(240_70%_60%/0.5)] hover:-translate-y-0.5 group"
      style={{
        bottom: isVisible ? '24px' : '-80px',
      }}
      aria-label="Chat with our AI assistant"
    >
      <Sparkles 
        className="text-accent transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12 pointer-events-none"
        size={18}
        strokeWidth={2}
      />
      <span className="text-primary-foreground font-medium text-sm tracking-wide whitespace-nowrap pointer-events-none">
        {isHovered ? 'Chat with us' : 'Need help?'}
      </span>
      <div className="w-2 h-2 rounded-full bg-accent animate-pulse pointer-events-none" />
    </button>
  );
}