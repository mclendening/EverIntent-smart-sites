import { useEffect, useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { toggleGHLChat } from '@/lib/ghlLoader';

const CONSENT_KEY = 'cookie-consent';

export function DesktopChatButton() {
  const [hasConsent, setHasConsent] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const checkConsent = () => {
      const consent = localStorage.getItem(CONSENT_KEY);
      const accepted = consent === 'accepted';
      setHasConsent(accepted);
      
      // Animate in after consent
      if (accepted) {
        setTimeout(() => setIsVisible(true), 300);
      } else {
        setIsVisible(false);
      }
    };

    checkConsent();
    window.addEventListener('cookie-consent-changed', checkConsent);
    window.addEventListener('storage', checkConsent);

    return () => {
      window.removeEventListener('cookie-consent-changed', checkConsent);
      window.removeEventListener('storage', checkConsent);
    };
  }, []);

  // Hidden until cookie consent is given
  if (!hasConsent) return null;

  return (
    <button
      onClick={toggleGHLChat}
      className={`
        hidden md:flex fixed bottom-6 right-6 z-40
        items-center justify-center
        w-14 h-14 rounded-full
        bg-accent text-accent-foreground
        shadow-button hover:shadow-glow
        transition-all duration-300 ease-out
        hover:scale-110 hover:bg-accent-hover
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
      `}
      aria-label="Open chat"
    >
      <MessageCircle className="h-6 w-6" />
    </button>
  );
}
