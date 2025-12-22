/**
 * @fileoverview CookieConsent Component - GDPR/CCPA Cookie Consent Banner
 * @description Displays cookie consent banner per BRD v33.0 Section 21 (Legal & Compliance).
 *              Controls access to chat widgets, analytics, and third-party scripts.
 * 
 * @module components/CookieConsent
 * @see {@link https://docs.lovable.dev} Lovable Documentation
 * 
 * @brd-reference BRD v33.0 Section 21 - Legal & Compliance
 * @brd-reference BRD v33.0 Section 19 - TCPA Compliance
 * @brd-reference BRD v33.0 Section 14 - GHL Chat Widget Integration
 */

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

/**
 * LocalStorage key for persisting cookie consent choice
 * @constant {string}
 */
const CONSENT_KEY = 'cookie-consent';

/**
 * CookieConsent - GDPR/CCPA compliant cookie consent banner
 * 
 * Behavior per BRD v33.0:
 * - Appears 1 second after page load if no consent exists
 * - Accept/Decline buttons persist choice to localStorage
 * - Dispatches 'cookie-consent-changed' event for other components
 * - MobileBottomBar, DesktopChatButton, GHLChatWidget listen for this event
 * 
 * @component
 * @example
 * // In Layout.tsx, wrapped in ClientOnly for SSG safety
 * <ClientOnly>
 *   <CookieConsent />
 * </ClientOnly>
 * 
 * @returns {JSX.Element | null} Cookie consent banner or null if consent already given
 */
export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if consent already given
    const consent = localStorage.getItem(CONSENT_KEY);
    if (!consent) {
      // Delay showing banner slightly for better UX
      const timer = setTimeout(() => setShowBanner(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  /**
   * Handle user accepting cookies
   * Sets consent to 'accepted' and notifies other components
   */
  const handleAccept = () => {
    localStorage.setItem(CONSENT_KEY, 'accepted');
    setShowBanner(false);
    // Dispatch event for other components (MobileBottomBar, chat widgets)
    window.dispatchEvent(new CustomEvent('cookie-consent-changed'));
  };

  /**
   * Handle user declining cookies
   * Sets consent to 'declined' - chat features remain hidden
   */
  const handleDecline = () => {
    localStorage.setItem(CONSENT_KEY, 'declined');
    setShowBanner(false);
    window.dispatchEvent(new CustomEvent('cookie-consent-changed'));
  };

  if (!showBanner) return null;

  return (
    <div 
      className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-card border-t border-border shadow-elevated animate-in slide-in-from-bottom duration-300"
      role="dialog"
      aria-label="Cookie consent"
    >
      <div className="container mx-auto max-w-4xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex-1 pr-4">
            <p className="text-sm text-foreground">
              We use cookies to enhance your experience and enable features like our chat support. 
              By clicking "Accept", you consent to our use of cookies.{' '}
              <a 
                href="/legal/cookies" 
                className="text-accent hover:text-accent-hover underline transition-colors"
              >
                Learn more
              </a>
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Button
              variant="outline"
              size="sm"
              onClick={handleDecline}
              className="text-muted-foreground"
            >
              Decline
            </Button>
            <Button
              size="sm"
              onClick={handleAccept}
              className="bg-accent text-accent-foreground hover:bg-accent-hover"
            >
              Accept
            </Button>
          </div>
          <button
            onClick={handleDecline}
            className="absolute top-2 right-2 sm:hidden p-1 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Close cookie banner"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * triggerCookiePreferences - Helper to re-show cookie preferences banner
 * 
 * Called from Footer "Cookies" link to allow users to change their preference.
 * Removes existing consent and forces banner to re-render.
 * 
 * @function
 * @example
 * // In Footer.tsx
 * <button onClick={triggerCookiePreferences}>Cookies</button>
 * 
 * @returns {void}
 */
export function triggerCookiePreferences() {
  // Remove existing consent to show banner again
  localStorage.removeItem(CONSENT_KEY);
  window.dispatchEvent(new CustomEvent('cookie-consent-changed'));
  // Force re-render by dispatching storage event
  window.dispatchEvent(new StorageEvent('storage', { key: CONSENT_KEY }));
}
