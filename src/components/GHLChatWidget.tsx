import { useEffect, useState } from 'react';
import { loadGHLWidget } from '@/lib/ghlLoader';

const CONSENT_KEY = 'cookie-consent';

export function GHLChatWidget() {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const checkConsent = () => {
      const consent = localStorage.getItem(CONSENT_KEY);
      setShouldLoad(consent === 'accepted');
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
    if (!shouldLoad) return;

    // Get location ID from env
    const locationId = import.meta.env.VITE_GHL_LOCATION_ID;
    
    if (!locationId) {
      console.warn('[GHL] VITE_GHL_LOCATION_ID not configured');
      return;
    }

    loadGHLWidget(locationId).catch((err) => {
      console.error('[GHL] Failed to load widget:', err);
    });
  }, [shouldLoad]);

  // This component doesn't render anything - GHL injects its own UI
  return null;
}
