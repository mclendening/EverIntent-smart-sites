/**
 * @fileoverview GHLChatWidget Component - GoHighLevel Chat Widget Controller
 * @description Manages GHL chat widget lifecycle: preloading, launcher hiding, toggle/close APIs.
 *              Renders null (no DOM output) - purely manages widget state and global functions.
 * 
 * @module components/GHLChatWidget
 * @see {@link https://docs.lovable.dev} Lovable Documentation
 * 
 * @brd-reference BRD v33.0 Section 14 - GHL Chat Widget Integration
 * @brd-reference BRD v33.0 Section 21 - Cookie Consent Requirements
 */

import { useEffect, useState } from 'react';
import {
  ensureGHLWidget,
  openViaAnyAPI,
  closeViaAnyAPI,
  hideLauncher,
  applyGHLComposerFixRetries
} from '@/lib/ghlLoader';

/**
 * LocalStorage key for cookie consent status
 * @constant {string}
 */
const CONSENT_KEY = 'cookie-consent';

/**
 * Global window extensions for GHL chat control
 */
declare global {
  interface Window {
    /** Toggle GHL chat open/close */
    toggleGHLChat?: () => void;
    /** Close GHL chat window */
    closeGHLChat?: () => void;
  }
}

/**
 * GHLChatWidget - GoHighLevel Chat Widget Controller
 * 
 * Responsibilities per BRD v33.0:
 * 1. Listen for cookie consent changes
 * 2. Preload GHL widget script after consent
 * 3. Hide default GHL launcher bubble (we use custom buttons)
 * 4. Expose window.toggleGHLChat() and window.closeGHLChat() globally
 * 5. Apply composer styling fixes (textarea caret + send button visibility)
 * 
 * This component renders null - it's purely for side effects.
 * 
 * @component
 * @example
 * // In Layout.tsx, wrapped in ClientOnly
 * <ClientOnly>
 *   <GHLChatWidget />
 * </ClientOnly>
 * 
 * @returns {null} No DOM output
 */
export function GHLChatWidget() {
  const [hasConsent, setHasConsent] = useState(false);

  /**
   * Check consent on mount and listen for changes
   */
  useEffect(() => {
    const checkConsent = () => setHasConsent(!!localStorage.getItem(CONSENT_KEY));
    checkConsent();
    window.addEventListener('cookie-consent-changed', checkConsent);
    window.addEventListener('storage', checkConsent);
    return () => {
      window.removeEventListener('cookie-consent-changed', checkConsent);
      window.removeEventListener('storage', checkConsent);
    };
  }, []);

  /**
   * Preload widget when consent is granted
   * Apply launcher hiding and composer fixes after load
   */
  useEffect(() => {
    if (!hasConsent) return;

    let mounted = true;

    const preload = async () => {
      try {
        await ensureGHLWidget();
        if (!mounted) return;

        // Hide the default launcher bubble
        hideLauncher();

        // Apply composer fix (textarea caret + send button visibility + right-click guard)
        applyGHLComposerFixRetries();

        // Retry hiding launcher + fixes because widget mounts lazily
        setTimeout(() => {
          hideLauncher();
          applyGHLComposerFixRetries();
        }, 500);

        setTimeout(() => {
          hideLauncher();
          applyGHLComposerFixRetries();
        }, 1500);
      } catch (e) {
        console.warn('[GHL Chat] Preload failed', e);
      }
    };

    preload();
    return () => {
      mounted = false;
    };
  }, [hasConsent]);

  /**
   * Setup global toggle/close functions
   * These are called by DesktopChatButton and MobileBottomBar
   */
  useEffect(() => {
    window.toggleGHLChat = () => {
      openViaAnyAPI();
      // After open, ensure the composer shadow DOM is mounted, then apply fixes
      applyGHLComposerFixRetries();
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
