import { useEffect } from 'react';
import { ensureGHLWidget, openViaAnyAPI, closeViaAnyAPI } from '@/lib/ghlLoader';

declare global {
  interface Window {
    toggleGHLChat?: () => void;
    closeGHLChat?: () => void;
  }
}

/**
 * GHLChatWidget - Sets up global toggle/close functions.
 * Widget loads lazily on first click. Default launcher hidden via CSS.
 */
export function GHLChatWidget() {
  useEffect(() => {
    // Global toggle function - lazy loads widget if needed
    window.toggleGHLChat = async () => {
      if (!openViaAnyAPI()) {
        try {
          await ensureGHLWidget();
          openViaAnyAPI();
        } catch (e) {
          console.warn('[GHL Chat] Lazy load failed', e);
        }
      }
    };

    // Global close function
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