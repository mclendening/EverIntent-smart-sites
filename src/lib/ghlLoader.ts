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
 * Style ID for composer fix injection
 * @constant {string}
 */
const EI_GHL_FIX_STYLE_ID = 'ei-ghl-composer-fix';

/**
 * Flag to prevent duplicate event guard installation
 * @constant {string}
 */
const EI_GHL_EVENT_FIX_FLAG = '__ei_ghl_event_fix_installed__';

/**
 * Check if running in browser environment
 * @returns {boolean} True if in browser
 */
function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof document !== 'undefined';
}

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
  if (!isBrowser()) return;
  if (document.getElementById(LOADER_ID)) return;
  
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
  if (!isBrowser()) return;
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
  if (!isBrowser()) return;
  const widget = document.querySelector('chat-widget') as any;
  if (widget?.shadowRoot) {
    const launcher = widget.shadowRoot.querySelector('button.lc_text-widget--bubble');
    if (launcher instanceof HTMLElement) {
      launcher.style.cssText =
        'display:none !important; visibility:hidden !important; pointer-events:none !important; width:0 !important; height:0 !important;';
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
  if (!isBrowser()) return false;

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
  if (!isBrowser()) return false;

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
  if (!isBrowser()) return;
  const el = document.getElementById(LOADER_ID);
  if (el) el.remove();
}

/**
 * Get nested open shadow roots to access composer elements
 * 
 * Navigation: chat-widget -> shadowRoot -> chat-pane -> shadowRoot -> chat-input -> shadowRoot
 * This is where textarea + send button live.
 * 
 * @returns {ShadowRoot | null} The innermost shadow root containing composer elements
 */
function getComposerShadowRoot(): ShadowRoot | null {
  if (!isBrowser()) return null;

  const widget = document.querySelector('chat-widget') as any;
  const root1 = widget?.shadowRoot as ShadowRoot | undefined;
  if (!root1) return null;

  const chatPane = root1.querySelector('chat-pane') as any;
  const root2 = chatPane?.shadowRoot as ShadowRoot | undefined;
  if (!root2) return null;

  const chatInput = root2.querySelector('chat-input') as any;
  const root3 = chatInput?.shadowRoot as ShadowRoot | undefined;
  if (!root3) return null;

  return root3;
}

/**
 * Install event guards and focus assist on composer
 * 
 * - Prevent right-click/contextmenu from triggering send
 * - Prevent non-left mouse buttons from triggering send
 * - Ensure clicking wrapper focuses textarea so caret appears
 * 
 * @param {ShadowRoot} root3 - The composer shadow root
 */
function installComposerGuards(root3: ShadowRoot) {
  const anyRoot = root3 as any;
  if (anyRoot[EI_GHL_EVENT_FIX_FLAG]) return;
  anyRoot[EI_GHL_EVENT_FIX_FLAG] = true;

  // Stop right-click from sending
  root3.addEventListener(
    'contextmenu',
    (e) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const sendBtn = target.closest?.('button.live-chat-send-button');
      if (sendBtn) {
        e.preventDefault();
        e.stopPropagation();
      }
    },
    true
  );

  // Stop middle/right mouse down from triggering send
  root3.addEventListener(
    'mousedown',
    (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const sendBtn = target.closest?.('button.live-chat-send-button');
      if (!sendBtn) return;
      if (e.button !== 0) {
        e.preventDefault();
        e.stopPropagation();
      }
    },
    true
  );

  // Focus assist: click anywhere in composer input area focuses the textarea
  root3.addEventListener(
    'click',
    (e) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // If user clicked send, don't interfere
      if (target.closest?.('button.live-chat-send-button')) return;

      // If user clicked anywhere inside chat-input component, focus textarea
      const inComposer = !!target.closest?.('chat-input') || !!target.closest?.('.input-row') || !!target.closest?.('.input-container');
      if (!inComposer) return;

      const ta = root3.querySelector('textarea.native-textarea.sc-ion-textarea-ios') as HTMLTextAreaElement | null;
      if (ta && document.activeElement !== ta) ta.focus();
    },
    true
  );
}

/**
 * Inject CSS into the composer shadow root
 * 
 * Fixes:
 * - Textarea appears inactive (no caret/focus visibility)
 * - Send button transparent (background-color: #524bae00)
 * - Icon stroke too low-contrast on dark theme
 * 
 * @returns {boolean} True if fix was applied
 */
export function injectGHLComposerFix(): boolean {
  const root3 = getComposerShadowRoot();
  if (!root3) return false;

  if (!root3.getElementById(EI_GHL_FIX_STYLE_ID)) {
    const style = document.createElement('style');
    style.id = EI_GHL_FIX_STYLE_ID;
    style.textContent = `
      /* ===== EverIntent: GHL chat composer fixes ===== */

      /* TEXTAREA: make it look active + show caret + show focus */
      textarea.native-textarea.sc-ion-textarea-ios {
        background: rgba(17, 24, 39, 0.95) !important;
        color: rgba(255, 255, 255, 0.95) !important;
        caret-color: rgba(255,255,255,0.95) !important;
        -webkit-text-fill-color: rgba(255,255,255,0.95) !important;

        border: 1px solid rgba(255, 255, 255, 0.18) !important;
        border-radius: 12px !important;
        padding: 10px 12px !important;
        outline: none !important;
        opacity: 1 !important;
        visibility: visible !important;
      }

      textarea.native-textarea.sc-ion-textarea-ios::selection {
        background: rgba(99, 102, 241, 0.45) !important;
      }

      textarea.native-textarea.sc-ion-textarea-ios:focus {
        border-color: rgba(99, 102, 241, 0.95) !important;
        box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.35) !important;
        background: rgba(17, 24, 39, 0.98) !important;
      }

      /* SEND BUTTON: make visible; was fully transparent (#524bae00) */
      button.live-chat-send-button {
        background-color: rgba(99, 102, 241, 0.95) !important;
        border: 1px solid rgba(255,255,255,0.18) !important;
        width: 50px !important;
        height: 50px !important;
        border-radius: 25px !important;
        opacity: 1 !important;
        visibility: visible !important;
      }

      button.live-chat-send-button:hover {
        filter: brightness(1.05) !important;
      }

      /* Ensure icon is visible (SVG uses stroke="#fff" but keep it forced) */
      button.live-chat-send-button svg,
      button.live-chat-send-button svg * {
        stroke: rgba(255,255,255,0.95) !important;
        fill: none !important;
        opacity: 1 !important;
      }

      /* If widget dims controls on focus-within, override it */
      :focus-within button.live-chat-send-button {
        opacity: 1 !important;
        visibility: visible !important;
      }
    `;
    root3.appendChild(style);
  }

  installComposerGuards(root3);
  return true;
}

/**
 * Apply composer fix with retries for lazy-mounted shadow components
 * 
 * The widget lazily mounts nested shadow components, so we retry
 * multiple times to ensure the fix is applied.
 * SSG-safe: only runs in browser environment.
 * 
 * @returns {void}
 */
export function applyGHLComposerFixRetries() {
  if (!isBrowser()) return;
  injectGHLComposerFix();
  setTimeout(injectGHLComposerFix, 250);
  setTimeout(injectGHLComposerFix, 750);
  setTimeout(injectGHLComposerFix, 1500);
  setTimeout(injectGHLComposerFix, 2500);
}
