import { useEffect } from 'react';
import { ensureGHLWidget } from '@/lib/ghlLoader';

const GHL_LOCATION_ID = 'glz9nLlYe04lb1B4TLFC';

declare global {
  interface Window {
    toggleGHLChat?: () => void;
    closeGHLChat?: () => void;
    dataLayer?: any[];
    leadConnector?: {
      open?: () => void;
      close?: () => void;
      hideLauncher?: () => void;
      showLauncher?: () => void;
      chatWidget?: {
        openWidget: () => void;
        closeWidget: () => void;
      };
    };
    LC_API?: {
      open_chat_window?: () => void;
      close_chat_window?: () => void;
      hide_chat_window?: () => void;
      show_chat_window?: () => void;
    };
  }
}

/**
 * GHLChatWidget - EXACT COPY from Legal AI reference.
 * Sets up global toggle/close functions. Does NOT preload widget.
 * Widget loads lazily on first click for fastest page load.
 */
export function GHLChatWidget() {
  useEffect(() => {
    console.log('[GHL Chat] Helper functions initialized');

    const hasAPI = () =>
      !!(
        window.leadConnector?.open ||
        window.leadConnector?.chatWidget?.openWidget ||
        window.LC_API?.open_chat_window
      );

    const tryOpen = () => {
      if (window.leadConnector?.open) {
        window.leadConnector.open();
        return true;
      }
      if (window.leadConnector?.chatWidget?.openWidget) {
        window.leadConnector.chatWidget.openWidget();
        return true;
      }
      if (window.LC_API?.open_chat_window) {
        window.LC_API.open_chat_window();
        return true;
      }
      return false;
    };

    const tryClose = () => {
      if (window.leadConnector?.close) {
        window.leadConnector.close();
        return true;
      }
      if (window.leadConnector?.chatWidget?.closeWidget) {
        window.leadConnector.chatWidget.closeWidget();
        return true;
      }
      if (window.LC_API?.close_chat_window) {
        window.LC_API.close_chat_window();
        return true;
      }
      return false;
    };

    const hide = () => {
      if (window.leadConnector?.hideLauncher) {
        window.leadConnector.hideLauncher();
      } else if (window.LC_API?.hide_chat_window) {
        window.LC_API.hide_chat_window?.();
      }
    };

    const waitForAPI = (callback: () => void, timeout = 10000) => {
      const startTime = Date.now();
      const checkAPI = setInterval(() => {
        if (hasAPI()) {
          clearInterval(checkAPI);
          callback();
        } else if (Date.now() - startTime > timeout) {
          clearInterval(checkAPI);
          console.warn('[GHL Chat] Widget API not found after', timeout, 'ms');
        }
      }, 100);
    };

    // Hide the default GHL launcher on init (if widget already loaded)
    waitForAPI(() => {
      hide();
    });

    // Global toggle function - lazy loads widget if needed
    window.toggleGHLChat = async () => {
      if (!tryOpen()) {
        try {
          await ensureGHLWidget(GHL_LOCATION_ID);
          setTimeout(hide, 300);
          setTimeout(hide, 1000);
          tryOpen();
        } catch (e) {
          console.warn('[GHL Chat] Lazy load failed', e);
        }
      }
    };

    // Global close function
    window.closeGHLChat = () => {
      if (!tryClose()) {
        waitForAPI(() => {
          tryClose();
          hide();
          setTimeout(hide, 300);
          setTimeout(hide, 1000);
          setTimeout(hide, 2000);
        });
      } else {
        // Aggressive hide after close to prevent lingering bubble
        hide();
        setTimeout(hide, 100);
        setTimeout(hide, 500);
        setTimeout(hide, 1000);
        setTimeout(hide, 2000);
        setTimeout(hide, 3000);
      }
    };

    return () => {
      delete window.toggleGHLChat;
      delete window.closeGHLChat;
    };
  }, []);

  return null;
}
