/* Utilities to inject and control the GHL chat widget without GTM.
   - Doc-compliant: injects <chat-widget> and the official loader script
   - Supports swapping locationId by removing/recreating the <chat-widget>
   
   EXACT COPY from Legal AI reference - only widget ID changed.
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
const WIDGET_ID = 'ghl-chat-widget';
const LOADER_SRC = 'https://beta.leadconnectorhq.com/loader.js';
const RESOURCES_URL = 'https://beta.leadconnectorhq.com/chat-widget/loader.js';
const GHL_WIDGET_DATA_ID = '694220dc4ca1823bfbe5f213'; // SmartSites GHL widget ID

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
  const existing = document.getElementById(LOADER_ID) as HTMLScriptElement | null;
  if (existing) {
    existing.setAttribute('data-widget-id', GHL_WIDGET_DATA_ID);
    existing.setAttribute('data-resources-url', RESOURCES_URL);
    return;
  }
  const s = document.createElement('script');
  s.id = LOADER_ID;
  s.src = LOADER_SRC;
  s.setAttribute('data-resources-url', RESOURCES_URL);
  s.setAttribute('data-widget-id', GHL_WIDGET_DATA_ID);
  s.defer = true;
  document.body.appendChild(s);
}

function ensureWidgetElement(locationId: string): HTMLElement {
  const existing = document.getElementById(WIDGET_ID) as HTMLElement | null;
  if (existing) {
    const currentLoc = existing.getAttribute('location-id');
    const currentWid = existing.getAttribute('widget-id');
    if (currentLoc === locationId && currentWid === GHL_WIDGET_DATA_ID) {
      return existing;
    }
    if (currentLoc !== locationId) existing.setAttribute('location-id', locationId);
    if (currentWid !== GHL_WIDGET_DATA_ID) existing.setAttribute('widget-id', GHL_WIDGET_DATA_ID);
    return existing;
  }
  const host = document.createElement('chat-widget');
  host.id = WIDGET_ID;
  host.setAttribute('location-id', locationId);
  host.setAttribute('widget-id', GHL_WIDGET_DATA_ID);
  document.body.appendChild(host);
  return host;
}

export async function ensureGHLWidget(locationId?: string, timeout = 12000) {
  if (locationId) {
    ensureWidgetElement(locationId);
  }
  ensureLoaderScript();
  await waitForAPI(timeout);
  
  // Hide the default launcher - we control it via custom button
  const hide = () => {
    if (window.leadConnector?.hideLauncher) {
      window.leadConnector.hideLauncher();
    } else if (window.LC_API?.hide_chat_window) {
      window.LC_API.hide_chat_window();
    }
  };
  setTimeout(hide, 300);
  setTimeout(hide, 1000);
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
  const el = document.getElementById(WIDGET_ID);
  if (el) el.remove();
}
