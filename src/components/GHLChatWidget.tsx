import { useEffect, useState } from 'react';
import { ensureGHLWidget, openViaAnyAPI, closeViaAnyAPI, hideLauncher, setupWidgetLoadedListener } from '@/lib/ghlLoader';

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
  const [hasConsent, setHasConsent] = useState(() => !!localStorage.getItem(CONSENT_KEY));

  // Listen for consent changes
  useEffect(() => {
    const checkConsent = () => setHasConsent(!!localStorage.getItem(CONSENT_KEY));
    window.addEventListener('cookie-consent-changed', checkConsent);
    window.addEventListener('storage', checkConsent);
    return () => {
      window.removeEventListener('cookie-consent-changed', checkConsent);
      window.removeEventListener('storage', checkConsent);
    };
  }, []);

  // Setup widget loaded listener once
  useEffect(() => {
    setupWidgetLoadedListener();
  }, []);

  // Preload widget when consent is granted
  useEffect(() => {
    if (!hasConsent) return;

    let mounted = true;
    const preload = async () => {
      try {
        await ensureGHLWidget();
        if (mounted) {
          // Hide launcher after load and on intervals
          hideLauncher();
          setTimeout(hideLauncher, 500);
          setTimeout(hideLauncher, 1500);
          setTimeout(hideLauncher, 3000);
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