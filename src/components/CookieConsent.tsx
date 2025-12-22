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
    const handleConsentChange = (e: Event) => {
      const customEvent = e as CustomEvent;
      // If triggered with openModal flag, open modal directly
      if (customEvent.detail?.openModal) {
        setShowModal(true);
        return;
      }
      // Otherwise show banner if no consent
      const consent = localStorage.getItem(CONSENT_KEY);
      if (!consent) {
        setShowBanner(true);
      }
    };

    window.addEventListener('cookie-consent-changed', handleConsentChange);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('cookie-consent-changed', handleConsentChange);
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

  // Always render the modal (controlled by showModal state)
  // Only render banner if showBanner is true AND modal is not open
  return (
    <>
      {showBanner && !showModal && (
        <div 
          className="fixed bottom-0 left-0 right-0 z-[2147483647] bg-card border-t border-border shadow-elevated animate-in slide-in-from-bottom duration-300"
          role="dialog"
          aria-label="Cookie consent"
        >
          <div className="container mx-auto max-w-4xl px-4 py-4">
            {/* Text row */}
            <p className="text-sm text-muted-foreground mb-3">
              We use cookies to improve your experience.{' '}
              <a 
                href="/legal/cookies" 
                className="text-accent hover:text-accent-hover underline"
              >
                Learn more
              </a>
            </p>
            
            {/* Buttons row - evenly spaced */}
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleRejectOptional}
                className="flex-1 h-9 text-sm"
                type="button"
              >
                Reject
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowModal(true)}
                className="flex-1 h-9 text-sm"
                type="button"
              >
                <Settings className="h-4 w-4 mr-1.5" aria-hidden="true" />
                Settings
              </Button>
              <Button
                size="sm"
                onClick={handleAcceptAll}
                className="flex-1 bg-accent text-accent-foreground hover:bg-accent-hover h-9 text-sm"
                type="button"
              >
                Accept All
              </Button>
            </div>
          </div>
        </div>
      )}

      <CookiePreferencesModal
        open={showModal}
        onOpenChange={setShowModal}
        onSave={handleSavePreferences}
      />
    </>
  );
}

/**
 * triggerCookiePreferences - Opens the cookie preferences modal directly
 * 
 * Called from Footer "Cookies" link or Cookie Policy page to allow
 * users to change their preferences at any time.
 */
export function triggerCookiePreferences() {
  // Dispatch event with openModal flag to open modal directly
  window.dispatchEvent(new CustomEvent('cookie-consent-changed', { 
    detail: { openModal: true } 
  }));
}

// Re-export for convenience
export { getCookiePreferences, isCategoryEnabled } from './CookiePreferencesModal';
export type { CookiePreferences } from './CookiePreferencesModal';
