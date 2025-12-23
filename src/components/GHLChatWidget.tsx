/**
 * @fileoverview GHL Chat Widget Controller Component
 * @description Manages GoHighLevel chat widget lifecycle including preloading,
 *              launcher hiding, and global toggle/close functions.
 * 
 * @module components/GHLChatWidget
 * 
 * @remarks
 * This component renders null (no DOM output). It exists purely for side effects:
 * - Listens for cookie consent changes
 * - Preloads GHL widget script after consent
 * - Hides default GHL launcher (custom buttons used instead)
 * - Applies composer styling fixes (textarea caret, send button visibility)
 * - Exposes window.toggleGHLChat() and window.closeGHLChat() globally
 */

import { useEffect, useState } from 'react';
import {
  ensureGHLWidget,
  openViaAnyAPI,
  closeViaAnyAPI,
  hideLauncher,
  applyGHLComposerFixRetries
} from '@/lib/ghlLoader';

/** LocalStorage key for cookie consent status */
const CONSENT_KEY = 'cookie-consent';

declare global {
  interface Window {
    /** Opens GHL chat widget */
    toggleGHLChat?: () => void;
    /** Closes GHL chat widget */
    closeGHLChat?: () => void;
  }
}

/**
 * GHL Chat Widget Controller.
 * 
 * Manages widget lifecycle based on cookie consent state.
 * Used by DesktopChatButton and MobileBottomBar via window.toggleGHLChat().
 * 
 * @returns `null` - No DOM output
 * 
 * @example
 * ```tsx
 * // In Layout.tsx, wrapped in ClientOnly for SSG safety
 * <ClientOnly>
 *   <GHLChatWidget />
 * </ClientOnly>
 * ```
 */
export function GHLChatWidget(): null {
  const [hasConsent, setHasConsent] = useState(false);

  // Check consent on mount and listen for changes
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

  // Preload widget and apply fixes when consent is granted
  useEffect(() => {
    if (!hasConsent) return;

    let mounted = true;

    const preload = async () => {
      try {
        await ensureGHLWidget();
        if (!mounted) return;

        // Hide default launcher bubble (we use custom buttons)
        hideLauncher();

        // Apply composer fixes (textarea caret + send button visibility)
        applyGHLComposerFixRetries();

        // Retry for lazy-mounted components
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

  // Setup global toggle/close functions
  useEffect(() => {
    window.toggleGHLChat = () => {
      openViaAnyAPI();
      // Apply fixes after open (shadow DOM mounts on first open)
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
