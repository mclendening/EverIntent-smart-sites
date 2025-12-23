/**
 * @fileoverview GoHighLevel Chat Widget Loader & Controller
 * @description Manages GHL chat widget lifecycle: script injection, API detection,
 *              launcher hiding, open/close controls, and shadow DOM styling fixes.
 * 
 * @module lib/ghlLoader
 * 
 * @remarks
 * GHL widgets use nested shadow DOM components that mount lazily. This module
 * handles timing issues with retry-based injection and provides SSG-safe guards.
 * 
 * Shadow DOM structure:
 * ```
 * chat-widget (shadowRoot)
 *   └─ chat-pane (shadowRoot)
 *        └─ chat-input (shadowRoot)
 *             ├─ textarea.native-textarea.sc-ion-textarea-ios
 *             └─ button.live-chat-send-button
 * ```
 */

declare global {
  interface Window {
    /** LeadConnector API (current GHL widget version) */
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
    /** LC_API (legacy GHL widget version) */
    LC_API?: {
      open_chat_window?: () => void;
      close_chat_window?: () => void;
      hide_chat_window?: () => void;
      show_chat_window?: () => void;
    };
  }
}

/** Script element ID for deduplication */
const LOADER_ID = 'ghl-widget-loader';

/** GHL loader script URL */
const LOADER_SRC = 'https://beta.leadconnectorhq.com/loader.js';

/** GHL resources URL for widget initialization */
const RESOURCES_URL = 'https://beta.leadconnectorhq.com/chat-widget/loader.js';

/** GHL Widget ID - TODO: Move to VITE_GHL_WIDGET_ID env var */
const GHL_WIDGET_ID = '694220dc4ca1823bfbe5f213';

/** Style element ID for composer fix injection */
const EI_GHL_FIX_STYLE_ID = 'ei-ghl-composer-fix';

/** Flag key to prevent duplicate event guard installation */
const EI_GHL_EVENT_FIX_FLAG = '__ei_ghl_event_fix_installed__';

/**
 * Checks if code is running in browser environment.
 * @returns `true` if window and document are available
 */
function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof document !== 'undefined';
}

/**
 * Polls for GHL widget API availability.
 * 
 * @param timeout - Maximum wait time in milliseconds
 * @returns Promise resolving to the available API name
 * @throws Error if timeout reached without API availability
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
 * Injects GHL loader script into DOM if not already present.
 * Idempotent - safe to call multiple times.
 */
function ensureLoaderScript(): void {
  if (!isBrowser()) return;
  if (document.getElementById(LOADER_ID)) return;

  const s = document.createElement('script');
  s.id = LOADER_ID;
  s.src = LOADER_SRC;
  s.setAttribute('data-resources-url', RESOURCES_URL);
  s.setAttribute('data-widget-id', GHL_WIDGET_ID);
  document.body.appendChild(s);
}

/**
 * Ensures GHL widget is loaded and API is available.
 * Call before using widget APIs. Safe to call multiple times.
 * 
 * @param timeout - Maximum wait time in milliseconds
 * @throws Error if widget fails to load within timeout
 * 
 * @example
 * ```ts
 * await ensureGHLWidget();
 * openViaAnyAPI();
 * ```
 */
export async function ensureGHLWidget(timeout = 12000): Promise<void> {
  if (!isBrowser()) return;
  ensureLoaderScript();
  await waitForAPI(timeout);
}

/**
 * Hides the default GHL launcher bubble via shadow DOM manipulation.
 * Uses direct style injection rather than API to preserve widget visibility.
 */
export function hideLauncher(): void {
  if (!isBrowser()) return;
  const widget = document.querySelector('chat-widget') as HTMLElement & { shadowRoot: ShadowRoot | null };
  if (widget?.shadowRoot) {
    const launcher = widget.shadowRoot.querySelector('button.lc_text-widget--bubble');
    if (launcher instanceof HTMLElement) {
      launcher.style.cssText =
        'display:none !important; visibility:hidden !important; pointer-events:none !important; width:0 !important; height:0 !important;';
    }
  }
}

/**
 * Opens GHL chat widget using first available API method.
 * Tries: leadConnector.open → chatWidget.openWidget → LC_API.open_chat_window
 * 
 * @returns `true` if successfully opened
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
 * Closes GHL chat widget using first available API method.
 * Tries: leadConnector.close → chatWidget.closeWidget → LC_API.close_chat_window
 * 
 * @returns `true` if successfully closed
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
 * Removes GHL widget script from DOM.
 * Used for cleanup when consent is revoked.
 * Note: Widget may persist in memory until page refresh.
 */
export function destroyGHLWidget(): void {
  if (!isBrowser()) return;
  const el = document.getElementById(LOADER_ID);
  if (el) el.remove();
}

/**
 * Traverses nested shadow roots to access composer elements.
 * 
 * Path: chat-widget → chat-pane → chat-input (where textarea + send button live)
 * 
 * @returns Innermost shadow root containing composer, or null if not mounted
 */
function getComposerShadowRoot(): ShadowRoot | null {
  if (!isBrowser()) return null;

  const widget = document.querySelector('chat-widget') as HTMLElement & { shadowRoot?: ShadowRoot };
  const root1 = widget?.shadowRoot;
  if (!root1) return null;

  const chatPane = root1.querySelector('chat-pane') as HTMLElement & { shadowRoot?: ShadowRoot };
  const root2 = chatPane?.shadowRoot;
  if (!root2) return null;

  const chatInput = root2.querySelector('chat-input') as HTMLElement & { shadowRoot?: ShadowRoot };
  const root3 = chatInput?.shadowRoot;
  if (!root3) return null;

  return root3;
}

/**
 * Installs event guards and focus assist on composer shadow root.
 * 
 * Guards:
 * - Blocks right-click/contextmenu on send button
 * - Blocks middle/right mouse button clicks on send
 * - Auto-focuses textarea when clicking input area
 * 
 * @param root3 - The composer shadow root
 */
function installComposerGuards(root3: ShadowRoot): void {
  const anyRoot = root3 as ShadowRoot & { [key: string]: boolean };
  if (anyRoot[EI_GHL_EVENT_FIX_FLAG]) return;
  anyRoot[EI_GHL_EVENT_FIX_FLAG] = true;

  // Block right-click send
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

  // Block middle/right mouse button send
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

  // Focus assist: clicking input area focuses textarea
  root3.addEventListener(
    'click',
    (e) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      if (target.closest?.('button.live-chat-send-button')) return;

      const inComposer =
        !!target.closest?.('chat-input') ||
        !!target.closest?.('.input-row') ||
        !!target.closest?.('.input-container');
      if (!inComposer) return;

      const ta = root3.querySelector('textarea.native-textarea.sc-ion-textarea-ios') as HTMLTextAreaElement | null;
      if (ta && document.activeElement !== ta) ta.focus();
    },
    true
  );
}

/**
 * Injects CSS fixes into composer shadow root.
 * 
 * Fixes addressed:
 * - Textarea invisible caret (caret-color)
 * - Textarea no focus indication (border, box-shadow)
 * - Send button fully transparent (#524bae00 → visible indigo)
 * - SVG icon low contrast on dark theme
 * 
 * @returns `true` if fix was applied, `false` if shadow root not available
 */
export function injectGHLComposerFix(): boolean {
  const root3 = getComposerShadowRoot();
  if (!root3) return false;

  if (!root3.getElementById(EI_GHL_FIX_STYLE_ID)) {
    const style = document.createElement('style');
    style.id = EI_GHL_FIX_STYLE_ID;
    style.textContent = `
      /* === GHL Chat Composer Fixes === */

      /* Textarea: visible caret, focus state, proper colors */
      textarea.native-textarea.sc-ion-textarea-ios {
        background: rgba(17, 24, 39, 0.95) !important;
        color: rgba(255, 255, 255, 0.95) !important;
        caret-color: rgba(255, 255, 255, 0.95) !important;
        -webkit-text-fill-color: rgba(255, 255, 255, 0.95) !important;
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

      /* Send button: visible background (was fully transparent) */
      button.live-chat-send-button {
        background-color: rgba(99, 102, 241, 0.95) !important;
        border: 1px solid rgba(255, 255, 255, 0.18) !important;
        width: 50px !important;
        height: 50px !important;
        border-radius: 25px !important;
        opacity: 1 !important;
        visibility: visible !important;
      }

      button.live-chat-send-button:hover {
        filter: brightness(1.05) !important;
      }

      /* SVG icon visibility */
      button.live-chat-send-button svg,
      button.live-chat-send-button svg * {
        stroke: rgba(255, 255, 255, 0.95) !important;
        fill: none !important;
        opacity: 1 !important;
      }

      /* Prevent focus-within dimming */
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
 * Applies composer fix with timed retries for lazy-mounted shadow components.
 * 
 * GHL widgets mount shadow DOM components asynchronously. This function
 * attempts injection immediately and at 250ms, 750ms, 1500ms, and 2500ms
 * to handle various load timing scenarios.
 * 
 * SSG-safe: Only executes in browser environment.
 */
export function applyGHLComposerFixRetries(): void {
  if (!isBrowser()) return;
  injectGHLComposerFix();
  setTimeout(injectGHLComposerFix, 250);
  setTimeout(injectGHLComposerFix, 750);
  setTimeout(injectGHLComposerFix, 1500);
  setTimeout(injectGHLComposerFix, 2500);
}
