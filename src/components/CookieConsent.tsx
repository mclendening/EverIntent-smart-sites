/**
 * CookieConsent Component - GDPR/CCPA Cookie Consent Banner
 * 
 * Displays a cookie consent banner with granular category selection.
 * Industry-standard defaults: Only strictly necessary cookies enabled.
 * Optional categories (Analytics, Marketing, Functional) are OFF by default.
 * 
 * Components:
 * - CookieConsent: Main banner with Accept All / Manage Preferences / Reject Optional
 * - CookiePreferencesModal: Granular category selection (in separate file)
 */

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';
import { 
  CookiePreferencesModal, 
  CookiePreferences, 
  COOKIE_PREFERENCES_KEY, 
  CONSENT_KEY,
  DEFAULT_PREFERENCES,
  getCookiePreferences 
} from './CookiePreferencesModal';

/**
 * Save cookie preferences to localStorage and dispatch change event
 */
function saveCookiePreferences(preferences: CookiePreferences) {
  localStorage.setItem(COOKIE_PREFERENCES_KEY, JSON.stringify(preferences));
  localStorage.setItem(CONSENT_KEY, 'custom'); // Legacy compatibility
  window.dispatchEvent(new CustomEvent('cookie-consent-changed', { detail: preferences }));
}

/**
 * CookieConsent - GDPR/CCPA compliant cookie consent banner
 * 
 * Features:
 * - Appears 1 second after page load if no consent exists
 * - "Accept All" enables all cookie categories
 * - "Manage Preferences" opens granular selection modal
 * - "Reject Optional" enables only necessary cookies
 * - Maximum z-index ensures visibility over all content
 */
export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Check if consent already given
    const checkConsent = () => {
      const consent = localStorage.getItem(CONSENT_KEY);
      if (!consent) {
        setShowBanner(true);
      }
    };

    // Initial check with delay for better UX
    const timer = setTimeout(checkConsent, 1000);

    // Listen for consent changes (from triggerCookiePreferences)
    const handleConsentChange = () => {
      const consent = localStorage.getItem(CONSENT_KEY);
      if (!consent) {
        setShowBanner(true);
      }
    };

    window.addEventListener('cookie-consent-changed', handleConsentChange);
    window.addEventListener('storage', handleConsentChange);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('cookie-consent-changed', handleConsentChange);
      window.removeEventListener('storage', handleConsentChange);
    };
  }, []);

  /**
   * Handle user accepting all cookies
   */
  const handleAcceptAll = () => {
    const allEnabled: CookiePreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true,
    };
    saveCookiePreferences(allEnabled);
    setShowBanner(false);
  };

  /**
   * Handle user rejecting optional cookies (industry standard default)
   */
  const handleRejectOptional = () => {
    saveCookiePreferences(DEFAULT_PREFERENCES);
    setShowBanner(false);
  };

  /**
   * Handle saving preferences from modal
   */
  const handleSavePreferences = (preferences: CookiePreferences) => {
    saveCookiePreferences(preferences);
    setShowBanner(false);
  };

  // Hide banner when modal is open
  if (!showBanner || showModal) {
    return (
      <CookiePreferencesModal
        open={showModal}
        onOpenChange={setShowModal}
        onSave={handleSavePreferences}
      />
    );
  }

  return (
    <>
      <div 
        className="fixed bottom-0 left-0 right-0 z-[2147483647] px-3 py-2 bg-card border-t border-border shadow-elevated animate-in slide-in-from-bottom duration-300"
        role="dialog"
        aria-label="Cookie consent"
      >
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs text-muted-foreground flex-1">
              We use cookies.{' '}
              <a 
                href="/legal/cookies" 
                className="text-accent hover:text-accent-hover underline"
              >
                Learn more
              </a>
            </p>
            <div className="flex items-center gap-1.5 shrink-0">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleRejectOptional}
                className="text-muted-foreground h-8 px-2 text-xs"
                type="button"
              >
                Reject
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowModal(true)}
                className="h-8 px-2 text-xs"
                type="button"
              >
                <Settings className="h-3 w-3 mr-1" aria-hidden="true" />
                Settings
              </Button>
              <Button
                size="sm"
                onClick={handleAcceptAll}
                className="bg-accent text-accent-foreground hover:bg-accent-hover h-8 px-3 text-xs"
                type="button"
              >
                Accept
              </Button>
            </div>
          </div>
        </div>
      </div>

      <CookiePreferencesModal
        open={showModal}
        onOpenChange={setShowModal}
        onSave={handleSavePreferences}
      />
    </>
  );
}

/**
 * triggerCookiePreferences - Opens the cookie preferences modal
 * 
 * Called from Footer "Cookies" link or Cookie Policy page to allow
 * users to change their preferences at any time.
 */
export function triggerCookiePreferences() {
  // Remove existing consent to show banner again
  localStorage.removeItem(CONSENT_KEY);
  localStorage.removeItem(COOKIE_PREFERENCES_KEY);
  window.dispatchEvent(new CustomEvent('cookie-consent-changed'));
  // Force re-render by dispatching storage event
  window.dispatchEvent(new StorageEvent('storage', { key: CONSENT_KEY }));
}

// Re-export for convenience
export { getCookiePreferences, isCategoryEnabled } from './CookiePreferencesModal';
export type { CookiePreferences } from './CookiePreferencesModal';
