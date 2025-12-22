/**
 * @fileoverview DesktopChatButton Component - Desktop Chat Trigger Button
 * @description Fixed-position chat trigger button for desktop viewports (hidden on mobile).
 *              Appears only after cookie consent is granted. Triggers GHL chat widget.
 * 
 * @module components/DesktopChatButton
 * @see {@link https://docs.lovable.dev} Lovable Documentation
 * 
 * @brd-reference BRD v33.0 Section 14 - GHL Chat Widget Integration
 * @brd-reference BRD v33.0 Section 21 - Cookie Consent Requirements
 */

import { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';

/**
 * LocalStorage key for cookie consent status
 * @constant {string}
 */
const CONSENT_KEY = 'cookie-consent';

/**
 * DesktopChatButton - Fixed desktop chat trigger (hidden on mobile)
 * 
 * Features per BRD v33.0:
 * - Only renders after cookie consent is accepted
 * - Fixed position bottom-right (desktop only, hidden md:flex)
 * - Slide-up animation after consent
 * - Triggers global toggleGHLChat() function
 * - Text swaps on hover for engagement
 * 
 * @component
 * @example
 * // In Layout.tsx, wrapped in ClientOnly
 * <ClientOnly>
 *   <DesktopChatButton />
 * </ClientOnly>
 * 
 * @returns {JSX.Element | null} Desktop chat button or null if no consent
 */
export function DesktopChatButton() {
  const [hasConsent, setHasConsent] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  /**
   * Check and listen for cookie consent changes
   */
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

  /**
   * Animate button sliding up after consent granted
   */
  useEffect(() => {
    // Slide up after consent (delayed fade-up animation)
    if (hasConsent) {
      const timer = setTimeout(() => setIsVisible(true), 300);
      return () => clearTimeout(timer);
    }
  }, [hasConsent]);

  /**
   * Handle click - trigger GHL chat widget
   */
  const handleClick = () => {
    if (window.toggleGHLChat) {
      window.toggleGHLChat();
    }
  };

  // Don't render until cookies are accepted
  if (!hasConsent) return null;

  return (
    <button
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="hidden md:flex fixed right-6 z-40 items-center gap-3 px-5 py-3 bg-primary/95 backdrop-blur-sm border border-accent/30 rounded-lg shadow-lg transition-all duration-300 ease-out hover:bg-primary hover:border-accent hover:shadow-xl hover:shadow-accent/20 group"
      style={{
        bottom: isVisible ? '24px' : '-80px',
      }}
      aria-label="Chat with our AI assistant"
    >
      <Sparkles 
        className="text-accent transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12 pointer-events-none"
        size={18}
        strokeWidth={2}
      />
      <span className="text-primary-foreground font-medium text-sm tracking-wide whitespace-nowrap pointer-events-none">
        {isHovered ? 'Chat with us' : 'Need help?'}
      </span>
      <div className="w-2 h-2 rounded-full bg-accent animate-pulse pointer-events-none" />
    </button>
  );
}
