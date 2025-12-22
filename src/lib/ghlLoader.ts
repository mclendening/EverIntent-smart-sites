/**
 * @fileoverview GHL Chat Widget Loader
 * @description GoHighLevel (GHL) chat widget initialization and control.
 *              Exact match to official GHL embed code pattern.
 * 
 * @module lib/ghlLoader
 * @see {@link https://docs.lovable.dev} Lovable Documentation
 * 
 * @brd-reference BRD v33.0 Section 14 - GHL Chat Widget Integration
 * @brd-reference BRD v33.0 Section 14.1 - Widget Configuration
 * 
 * @example Official GHL embed code this replicates:
 * ```html
 * <script 
 *   src="https://beta.leadconnectorhq.com/loader.js"  
 *   data-resources-url="https://beta.leadconnectorhq.com/chat-widget/loader.js" 
 *   data-widget-id="694220dc4ca1823bfbe5f213">
 * </script>
 * ```
 */

/**
 * Global window extensions for GHL widget APIs
 */
declare global {
  interface Window {
    /** LeadConnector API (newer GHL widget) */
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
    /** LC_API (legacy GHL widget) */
    LC_API?: {
      open_chat_window?: () => void;
      close_chat_window?: () => void;
      hide_chat_window?: () => void;
      show_chat_window?: () => void;
    };
  }
}

/**
 * Script element ID for deduplication
 * @constant {string}
 */
const LOADER_ID = 'ghl-widget-loader';

/**
 * GHL loader script URL
 * @constant {string}
 */
const LOADER_SRC = 'https://beta.leadconnectorhq.com/loader.js';

/**
 * GHL resources URL for widget initialization
 * @constant {string}
 */
const RESOURCES_URL = 'https://beta.leadconnectorhq.com/chat-widget/loader.js';

/**
 * GHL Widget ID from environment
 * @constant {string}
 * @todo Move to environment variable (VITE_GHL_WIDGET_ID)
 */
const GHL_WIDGET_ID = '694220dc4ca1823bfbe5f213';

/**
 * Wait for GHL widget API to become available
 * 
 * Polls for either leadConnector or LC_API global object.
 * Rejects after timeout if neither appears.
 * 
 * @param {number} [timeout=10000] - Maximum wait time in ms
 * @returns {Promise<'leadConnector' | 'LC_API'>} Which API became available
 * @throws {Error} If timeout reached without API availability
 */
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

/**
 * Ensure GHL loader script is in the DOM
 * 
 * Creates script element matching official GHL embed code.
 * Idempotent - won't add duplicate scripts.
 * 
 * @returns {void}
 */
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

/**
 * Ensure GHL widget is loaded and API is available
 * 
 * Call this before attempting to use widget APIs.
 * Safe to call multiple times - idempotent.
 * 
 * @param {number} [timeout=12000] - Maximum wait time in ms
 * @returns {Promise<void>} Resolves when widget is ready
 * @throws {Error} If widget fails to load
 * 
 * @example
 * await ensureGHLWidget();
 * openViaAnyAPI();
 */
export async function ensureGHLWidget(timeout = 12000) {
  ensureLoaderScript();
  await waitForAPI(timeout);
}

/**
 * Hide the GHL launcher bubble via DOM manipulation
 * 
 * GHL's default launcher conflicts with our custom buttons.
 * This hides it via shadow DOM CSS injection.
 * 
 * Note: Does NOT use API (hideLauncher) because that can
 * also hide the entire widget. This only hides the bubble.
 * 
 * @returns {void}
 */
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

/**
 * Open GHL chat widget using any available API
 * 
 * Tries multiple API methods in order of preference:
 * 1. leadConnector.open()
 * 2. leadConnector.chatWidget.openWidget()
 * 3. LC_API.open_chat_window()
 * 
 * @returns {boolean} True if successfully opened
 */
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

/**
 * Close GHL chat widget using any available API
 * 
 * Tries multiple API methods in order of preference:
 * 1. leadConnector.close()
 * 2. leadConnector.chatWidget.closeWidget()
 * 3. LC_API.close_chat_window()
 * 
 * @returns {boolean} True if successfully closed
 */
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

/**
 * Remove GHL widget script from DOM
 * 
 * Used for cleanup when consent is revoked.
 * Note: Widget may persist in memory until page refresh.
 * 
 * @returns {void}
 */
export function destroyGHLWidget() {
  const el = document.getElementById(LOADER_ID);
  if (el) el.remove();
}
