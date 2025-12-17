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

const SCRIPT_ID = 'ghl-widget-loader';

let injected = false;

export function injectGHLScript(): void {
  if (injected || document.getElementById(SCRIPT_ID)) return;
  
  const s = document.createElement('script');
  s.id = SCRIPT_ID;
  s.src = 'https://beta.leadconnectorhq.com/loader.js';
  s.setAttribute('data-resources-url', 'https://beta.leadconnectorhq.com/chat-widget/loader.js');
  s.setAttribute('data-widget-id', '694220dc4ca1823bfbe5f213');
  document.body.appendChild(s);
  injected = true;
}

export function openGHLChat(): void {
  window.leadConnector?.open?.();
  window.leadConnector?.chatWidget?.openWidget?.();
  window.LC_API?.open_chat_window?.();
}

export function closeGHLChat(): void {
  window.leadConnector?.close?.();
  window.leadConnector?.chatWidget?.closeWidget?.();
  window.LC_API?.close_chat_window?.();
}
