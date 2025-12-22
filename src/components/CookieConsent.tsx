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
import { X, Settings } from 'lucide-react';
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
    const consent = localStorage.getItem(CONSENT_KEY);
    if (!consent) {
      // Delay showing banner slightly for better UX
      const timer = setTimeout(() => setShowBanner(true), 1000);
      return () => clearTimeout(timer);
    }
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

  if (!showBanner) return null;

  return (
    <>
      <div 
        className="fixed bottom-0 left-0 right-0 z-[2147483647] p-4 bg-card border-t border-border shadow-elevated animate-in slide-in-from-bottom duration-300"
        role="dialog"
        aria-label="Cookie consent"
      >
        <div className="container mx-auto max-w-4xl relative">
          {/* Mobile close button */}
          <button
            onClick={handleRejectOptional}
            className="sm:hidden absolute -top-1 right-0 p-2 text-muted-foreground hover:text-foreground transition-colors touch-manipulation"
            aria-label="Close and reject optional cookies"
            type="button"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pr-8 sm:pr-0">
            <div className="flex-1">
              <p className="text-sm font-semibold text-foreground mb-1">
                We value your privacy
              </p>
              <p className="text-sm text-muted-foreground">
                We use cookies to enhance your experience. By default, only essential cookies are enabled.{' '}
                <a 
                  href="/legal/cookies" 
                  className="text-accent hover:text-accent-hover underline transition-colors"
                >
                  Learn more
                </a>
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2 shrink-0 w-full sm:w-auto">
              <Button
                variant="outline"
                size="default"
                onClick={handleRejectOptional}
                className="text-muted-foreground flex-1 sm:flex-none min-h-[44px] touch-manipulation"
                type="button"
              >
                Reject Optional
              </Button>
              <Button
                variant="outline"
                size="default"
                onClick={() => setShowModal(true)}
                className="flex-1 sm:flex-none min-h-[44px] touch-manipulation"
                type="button"
              >
                <Settings className="h-4 w-4 mr-2" aria-hidden="true" />
                Preferences
              </Button>
              <Button
                size="default"
                onClick={handleAcceptAll}
                className="bg-accent text-accent-foreground hover:bg-accent-hover flex-1 sm:flex-none min-h-[44px] touch-manipulation"
                type="button"
              >
                Accept All
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
