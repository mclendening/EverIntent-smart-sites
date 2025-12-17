// GHL Chat Widget Loader
// Loads the GoHighLevel chat widget script and provides API access

declare global {
  interface Window {
    leadConnector?: {
      open?: () => void;
      close?: () => void;
      chatWidget?: {
        openWidget?: () => void;
        closeWidget?: () => void;
      };
    };
    LC_API?: {
      open_chat_window?: () => void;
      close_chat_window?: () => void;
    };
    toggleGHLChat?: () => void;
    closeGHLChat?: () => void;
  }
}

let isLoaded = false;
let isLoading = false;

export function loadGHLWidget(locationId: string): Promise<void> {
  if (isLoaded) return Promise.resolve();
  if (isLoading) {
    return new Promise((resolve) => {
      const checkLoaded = setInterval(() => {
        if (isLoaded) {
          clearInterval(checkLoaded);
          resolve();
        }
      }, 100);
    });
  }

  isLoading = true;

  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = `https://widgets.leadconnectorhq.com/loader.js`;
    script.setAttribute('data-resources-url', 'https://widgets.leadconnectorhq.com/chat-widget/loader.js');
    script.setAttribute('data-widget-id', locationId);
    script.async = true;

    script.onload = () => {
      isLoaded = true;
      isLoading = false;
      console.log('[GHL] Widget script loaded');
      resolve();
    };

    script.onerror = () => {
      isLoading = false;
      console.error('[GHL] Failed to load widget script');
      reject(new Error('Failed to load GHL widget'));
    };

    document.body.appendChild(script);
  });
}

// Toggle chat with fallback chain
export function toggleGHLChat(): void {
  console.log('[GHL] Attempting to open chat');
  
  // Try leadConnector API first
  if (window.leadConnector?.open) {
    console.log('[GHL] Using leadConnector.open()');
    window.leadConnector.open();
    return;
  }

  // Try chatWidget API
  if (window.leadConnector?.chatWidget?.openWidget) {
    console.log('[GHL] Using leadConnector.chatWidget.openWidget()');
    window.leadConnector.chatWidget.openWidget();
    return;
  }

  // Try LC_API fallback
  if (window.LC_API?.open_chat_window) {
    console.log('[GHL] Using LC_API.open_chat_window()');
    window.LC_API.open_chat_window();
    return;
  }

  console.warn('[GHL] No chat API available');
}

// Close chat with fallback chain
export function closeGHLChat(): void {
  if (window.leadConnector?.close) {
    window.leadConnector.close();
    return;
  }

  if (window.leadConnector?.chatWidget?.closeWidget) {
    window.leadConnector.chatWidget.closeWidget();
    return;
  }

  if (window.LC_API?.close_chat_window) {
    window.LC_API.close_chat_window();
    return;
  }
}

// Expose global functions for MobileBottomBar and other components
if (typeof window !== 'undefined') {
  window.toggleGHLChat = toggleGHLChat;
  window.closeGHLChat = closeGHLChat;
}
