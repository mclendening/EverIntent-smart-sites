import { useEffect, useState } from 'react';
import { ensureGHLWidget, openViaAnyAPI, closeViaAnyAPI, hideLauncher } from '@/lib/ghlLoader';

const CONSENT_KEY = 'cookie-consent';

declare global {
  interface Window {
    toggleGHLChat?: () => void;
    closeGHLChat?: () => void;
  }
}

/**
 * GHLChatWidget - Preloads widget after consent, hides launcher, exposes toggle/close.
 */
export function GHLChatWidget() {
  const [hasConsent, setHasConsent] = useState(false);

  // Check consent on mount and listen for changes
  useEffect(() => {
    const checkConsent = () => setHasConsent(!!localStorage.getItem(CONSENT_KEY));
    checkConsent(); // Check immediately on mount
    window.addEventListener('cookie-consent-changed', checkConsent);
    window.addEventListener('storage', checkConsent);
    return () => {
      window.removeEventListener('cookie-consent-changed', checkConsent);
      window.removeEventListener('storage', checkConsent);
    };
  }, []);

  // Preload widget when consent is granted
  useEffect(() => {
    if (!hasConsent) return;

    let mounted = true;
    const preload = async () => {
      try {
        await ensureGHLWidget();
        if (mounted) {
          // Aggressively hide launcher after load
          hideLauncher();
          setTimeout(hideLauncher, 500);
          setTimeout(hideLauncher, 1500);
        }
      } catch (e) {
        console.warn('[GHL Chat] Preload failed', e);
      }
    };
    preload();

    return () => { mounted = false; };
  }, [hasConsent]);

  // Setup global functions
  useEffect(() => {
    window.toggleGHLChat = () => {
      openViaAnyAPI();
    };

    window.closeGHLChat = () => {
      closeViaAnyAPI();
    };

    return () => {
      delete window.toggleGHLChat;
      delete window.closeGHLChat;
    };
  }, []);

  return null;
}