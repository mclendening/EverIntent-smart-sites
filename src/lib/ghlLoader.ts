/* GHL Chat Widget Loader - Matches official GHL embed code exactly.
   Widget ID hardcoded - no environment variables needed.
*/

declare global {
  interface Window {
    leadConnector?: {
      open?: () => void;
      close?: () => void;
      hideLauncher?: () => void;
      chatWidget?: {
        openWidget: () => void;
        closeWidget: () => void;
      };
    };
    LC_API?: {
      open_chat_window?: () => void;
      close_chat_window?: () => void;
      hide_chat_window?: () => void;
    };
  }
}

const LOADER_ID = 'ghl-widget-loader';
const LOADER_SRC = 'https://beta.leadconnectorhq.com/loader.js';
const RESOURCES_URL = 'https://beta.leadconnectorhq.com/chat-widget/loader.js';
const WIDGET_ID = '694220dc4ca1823bfbe5f213';

let widgetLoaded = false;

function injectScript(): void {
  if (document.getElementById(LOADER_ID)) return;
  
  const script = document.createElement('script');
  script.id = LOADER_ID;
  script.src = LOADER_SRC;
  script.setAttribute('data-resources-url', RESOURCES_URL);
  script.setAttribute('data-widget-id', WIDGET_ID);
  document.body.appendChild(script);
}

function waitForAPI(timeout = 10000): Promise<void> {
  return new Promise((resolve, reject) => {
    const start = Date.now();
    const check = setInterval(() => {
      const hasAPI = window.leadConnector?.open || 
                     window.leadConnector?.chatWidget?.openWidget ||
                     window.LC_API?.open_chat_window;
      if (hasAPI) {
        clearInterval(check);
        resolve();
      } else if (Date.now() - start > timeout) {
        clearInterval(check);
        reject(new Error('GHL widget timeout'));
      }
    }, 100);
  });
}

export async function ensureGHLWidget(): Promise<void> {
  if (widgetLoaded) return;
  
  injectScript();
  await waitForAPI();
  widgetLoaded = true;
  
  // Hide default launcher - we use custom button
  const hide = () => {
    window.leadConnector?.hideLauncher?.();
    window.LC_API?.hide_chat_window?.();
  };
  hide();
  setTimeout(hide, 300);
}

export function openChat(): boolean {
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
}

export function closeChat(): boolean {
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
}
