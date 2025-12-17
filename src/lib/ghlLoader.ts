/* GHL Chat Widget Loader - Minimal official embed pattern.
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
      chatWidget?: {
        openWidget: () => void;
        closeWidget: () => void;
      };
    };
    LC_API?: {
      open_chat_window?: () => void;
      close_chat_window?: () => void;
    };
  }
}

const LOADER_ID = 'ghl-widget-loader';
const LOADER_SRC = 'https://beta.leadconnectorhq.com/loader.js';
const RESOURCES_URL = 'https://beta.leadconnectorhq.com/chat-widget/loader.js';
const GHL_WIDGET_ID = '694220dc4ca1823bfbe5f213';

/** Inject the GHL script if not already present */
export function injectGHLScript(): void {
  if (typeof document === 'undefined') return;
  if (document.getElementById(LOADER_ID)) return;
  
  const s = document.createElement('script');
  s.id = LOADER_ID;
  s.src = LOADER_SRC;
  s.setAttribute('data-resources-url', RESOURCES_URL);
  s.setAttribute('data-widget-id', GHL_WIDGET_ID);
  document.body.appendChild(s);
}

/** Open chat via available API */
export function openChat(): void {
  if (window.leadConnector?.open) {
    window.leadConnector.open();
  } else if (window.leadConnector?.chatWidget?.openWidget) {
    window.leadConnector.chatWidget.openWidget();
  } else if (window.LC_API?.open_chat_window) {
    window.LC_API.open_chat_window();
  }
}

/** Close chat via available API */
export function closeChat(): void {
  if (window.leadConnector?.close) {
    window.leadConnector.close();
  } else if (window.leadConnector?.chatWidget?.closeWidget) {
    window.leadConnector.chatWidget.closeWidget();
  } else if (window.LC_API?.close_chat_window) {
    window.LC_API.close_chat_window();
  }
}
