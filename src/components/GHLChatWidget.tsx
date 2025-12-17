import { useEffect, useRef, useState } from 'react';
import { ensureGHLWidget, openViaAnyAPI } from '@/lib/ghlLoader';

const CONSENT_KEY = 'cookie-consent';

/**
 * GHLChatWidget - Preloads widget in background after consent.
 * Widget is hidden (1x1 pixel icon configured in GHL), opens instantly on click.
 */
export function GHLChatWidget() {
  const [hasConsent, setHasConsent] = useState(false);
  const widgetReady = useRef(false);

  // Check consent
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

  // Preload widget in background after consent
  useEffect(() => {
    if (!hasConsent || widgetReady.current) return;

    const locationId = import.meta.env.VITE_GHL_LOCATION_ID || 'glz9nLlYe04lb1B4TLFC';

    ensureGHLWidget(locationId)
      .then(() => {
        widgetReady.current = true;
        console.log('[GHL] Widget preloaded and ready');
      })
      .catch((err) => {
        console.error('[GHL] Failed to preload widget:', err);
      });
  }, [hasConsent]);

  // Set up global toggle function
  useEffect(() => {
    window.toggleGHLChat = () => {
      openViaAnyAPI();
    };

    return () => {
      window.toggleGHLChat = undefined;
    };
  }, []);

  return null;
}
