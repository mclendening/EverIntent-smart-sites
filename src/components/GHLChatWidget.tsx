import { useEffect } from 'react';
import { ensureGHLWidget, openChat, closeChat } from '@/lib/ghlLoader';

declare global {
  interface Window {
    toggleGHLChat?: () => void;
    closeGHLChat?: () => void;
  }
}

/**
 * GHLChatWidget - Sets up global toggle/close functions.
 * Widget loads lazily on first button click.
 */
export function GHLChatWidget() {
  useEffect(() => {
    window.toggleGHLChat = async () => {
      if (!openChat()) {
        try {
          await ensureGHLWidget();
          openChat();
        } catch (e) {
          console.warn('[GHL] Load failed', e);
        }
      }
    };

    window.closeGHLChat = () => {
      closeChat();
    };

    return () => {
      delete window.toggleGHLChat;
      delete window.closeGHLChat;
    };
  }, []);

  return null;
}
