/* GHL Chat Widget Loader - EXACT match to official GHL embed code.
   Official embed:
   <script 
     src="https://beta.leadconnectorhq.com/loader.js"  
     data-resources-url="https://beta.leadconnectorhq.com/chat-widget/loader.js" 
     data-widget-id="694220dc4ca1823bfbe5f213">
   </script>
*/

declare global {
  interface Window {
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

const LOADER_ID = 'ghl-widget-loader';
const LOADER_SRC = 'https://beta.leadconnectorhq.com/loader.js';
const RESOURCES_URL = 'https://beta.leadconnectorhq.com/chat-widget/loader.js';
const GHL_WIDGET_ID = '694220dc4ca1823bfbe5f213';

function waitForAPI(timeout = 10000): Promise<'leadConnector' | 'LC_API'> {
  const start = Date.now();
  return new Promise((resolve, reject) => {
    const t = setInterval(() => {
      if (window.leadConnector?.open || window.leadConnector?.chatWidget?.openWidget) {
        clearInterval(t);
        resolve('leadConnector');
      } else if (window.LC_API?.open_chat_window) {
        clearInterval(t);
        resolve('LC_API');
      } else if (Date.now() - start > timeout) {
        clearInterval(t);
        reject(new Error('GHL widget API not available'));
      }
    }, 100);
  });
}

function ensureLoaderScript(): void {
  if (document.getElementById(LOADER_ID)) {
    return;
  }
  
  // Create script EXACTLY like the official GHL embed code
  const s = document.createElement('script');
  s.id = LOADER_ID;
  s.src = LOADER_SRC;
  s.setAttribute('data-resources-url', RESOURCES_URL);
  s.setAttribute('data-widget-id', GHL_WIDGET_ID);
  document.body.appendChild(s);
}

export async function ensureGHLWidget(timeout = 12000) {
  ensureLoaderScript();
  await waitForAPI(timeout);
}

/** Hide the GHL launcher bubble via DOM manipulation only */
export function hideLauncher() {
  // Target the launcher button inside shadow DOM (NOT the container, NOT via API)
  const widget = document.querySelector('chat-widget');
  if (widget?.shadowRoot) {
    // Only hide the launcher button element
    const launcher = widget.shadowRoot.querySelector('button.lc_text-widget--bubble');
    if (launcher instanceof HTMLElement) {
      launcher.style.cssText = 'display: none !important; visibility: hidden !important; pointer-events: none !important; width: 0 !important; height: 0 !important;';
    }
  }
}

export function openViaAnyAPI(): boolean {
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

export function closeViaAnyAPI(): boolean {
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

export function destroyGHLWidget() {
  const el = document.getElementById(LOADER_ID);
  if (el) el.remove();
}
