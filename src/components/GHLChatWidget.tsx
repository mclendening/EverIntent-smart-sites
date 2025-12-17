import { useEffect, useState } from 'react';
import { injectGHLScript, openChat, closeChat } from '@/lib/ghlLoader';

const CONSENT_KEY = 'cookie-consent';

declare global {
  interface Window {
    toggleGHLChat?: () => void;
    closeGHLChat?: () => void;
  }
}

/**
 * GHLChatWidget - Injects GHL script after cookie consent, exposes toggle/close globals.
 * Launcher hiding should be configured in GHL platform (1x1 pixel icon).
 */
export function GHLChatWidget() {
  const [hasConsent, setHasConsent] = useState(false);

  // Check consent on mount (client-side only)
  useEffect(() => {
    setHasConsent(!!localStorage.getItem(CONSENT_KEY));
    
    const checkConsent = () => setHasConsent(!!localStorage.getItem(CONSENT_KEY));
    window.addEventListener('cookie-consent-changed', checkConsent);
    window.addEventListener('storage', checkConsent);
    
    return () => {
      window.removeEventListener('cookie-consent-changed', checkConsent);
      window.removeEventListener('storage', checkConsent);
    };
  }, []);

  // Inject script when consent granted
  useEffect(() => {
    if (hasConsent) {
      injectGHLScript();
    }
  }, [hasConsent]);

  // Setup global functions
  useEffect(() => {
    window.toggleGHLChat = openChat;
    window.closeGHLChat = closeChat;
    
    return () => {
      delete window.toggleGHLChat;
      delete window.closeGHLChat;
    };
  }, []);

  return null;
}
