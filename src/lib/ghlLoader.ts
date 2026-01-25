/**
 * @fileoverview GoHighLevel Chat Widget Loader & Controller
 * @description Manages GHL chat widget lifecycle: script injection, API detection,
 *              launcher hiding, open/close controls, and shadow DOM styling fixes.
 * 
 * @module lib/ghlLoader
 * 
 * @remarks
 * ## Current State
 * The site uses a **single sitewide widget** (GHL_WIDGET_ID_SALES). The widget ID is
 * fetched from the `ghl-config` edge function, which currently returns the same
 * widget for all routes.
 * 
 * ## Future Multi-Widget Architecture
 * This module includes infrastructure for route-based widget switching:
 * - `fetchWidgetIdForRoute()` calls the edge function with the current pathname
 * - The edge function returns the appropriate widget ID based on route prefix matching
 * - Widget IDs are stored in Supabase secrets, not exposed in client code
 * 
 * To activate multi-widget support:
 * 1. Configure route mappings in `supabase/functions/ghl-config/index.ts`
 * 2. Ensure widget IDs are set in Supabase secrets
 * 3. The frontend automatically uses the returned widget ID
 * 
 * ## Shadow DOM Structure
 * GHL widgets use nested shadow DOM components that mount lazily:
 * ```
 * chat-widget (shadowRoot)
 *   └─ chat-pane (shadowRoot)
 *        └─ chat-input (shadowRoot)
 *             ├─ textarea.native-textarea.sc-ion-textarea-ios
 *             └─ button.live-chat-send-button
 * ```
 * 
 * This module handles timing issues with retry-based CSS injection for styling fixes.
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

/**
 * Supabase edge function URL for GHL widget configuration.
 * 
 * @remarks
 * This edge function returns the appropriate widget ID based on route prefix.
 * Currently returns GHL_WIDGET_ID_SALES for all routes (single sitewide widget).
 * 
 * Future multi-widget support is configured in the edge function, not here.
 * See `supabase/functions/ghl-config/index.ts` for route mapping configuration.
 */
const GHL_CONFIG_URL = 'https://nweklcxzoemcnwaoakvq.supabase.co/functions/v1/ghl-config';

/**
 * Cached widget ID (fetched from edge function).
 * Cached for session duration to avoid repeated API calls.
 */
let cachedWidgetId: string | null = null;

/**
 * Promise for in-flight widget ID fetch.
 * Prevents duplicate concurrent requests.
 */
let widgetIdFetchPromise: Promise<string> | null = null;

/**
 * Fetches widget ID from edge function based on current route.
 * 
 * @param pathname - Current route pathname (e.g., '/pricing', '/support/contact')
 * @returns Promise resolving to widget ID string
 * 
 * @remarks
 * ## Caching Behavior
 * - Widget ID is cached for the session after first successful fetch
 * - Subsequent calls return cached value immediately
 * - Concurrent calls share the same in-flight promise (no duplicate requests)
 * 
 * ## Multi-Widget Routing
 * The edge function matches the pathname against configured route prefixes:
 * - `/support/*`, `/help/*` → Support Bot
 * - `/demo/*` → Demo Bot
 * - All other routes → Sales Bot (default)
 * 
 * Currently, all routes return the sales widget. Route-specific widgets
 * are activated by configuring the edge function when those pages are built.
 * 
 * @example
 * ```ts
 * const widgetId = await fetchWidgetIdForRoute('/support/contact');
 * // Returns GHL_WIDGET_ID_SUPPORT (when multi-widget is active)
 * ```
 */
async function fetchWidgetIdForRoute(pathname: string): Promise<string> {
  // Return cached value if available
  if (cachedWidgetId) return cachedWidgetId;
  
  // Return existing promise if fetch in progress (dedupe concurrent calls)
  if (widgetIdFetchPromise) return widgetIdFetchPromise;
  
  widgetIdFetchPromise = (async () => {
    try {
      const response = await fetch(`${GHL_CONFIG_URL}?route=${encodeURIComponent(pathname)}`);
      if (!response.ok) {
        console.error('[ghlLoader] Failed to fetch widget config:', response.status);
        return '';
      }
      const data = await response.json();
      cachedWidgetId = data.widgetId || '';
      return cachedWidgetId;
    } catch (error) {
      console.error('[ghlLoader] Error fetching widget config:', error);
      return '';
    } finally {
      widgetIdFetchPromise = null;
    }
  })();
  
  return widgetIdFetchPromise;
}

/**
 * Gets the widget ID synchronously if cached, otherwise returns empty string.
 * 
 * @returns Cached widget ID or empty string if not yet fetched
 * 
 * @remarks
 * Use `fetchWidgetIdForRoute()` for async fetch with caching.
 * This function is useful for synchronous checks after initial load.
 */
function getCachedWidgetId(): string {
  return cachedWidgetId || '';
}

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
 * Fetches widget ID from edge function first.
 * Idempotent - safe to call multiple times.
 */
async function ensureLoaderScript(): Promise<void> {
  if (!isBrowser()) return;
  if (document.getElementById(LOADER_ID)) return;

  const pathname = typeof window !== 'undefined' ? window.location.pathname : '/';
  const widgetId = await fetchWidgetIdForRoute(pathname);
  
  if (!widgetId) {
    console.warn('[ghlLoader] No widget ID available, skipping script injection');
    return;
  }

  const s = document.createElement('script');
  s.id = LOADER_ID;
  s.src = LOADER_SRC;
  s.setAttribute('data-resources-url', RESOURCES_URL);
  s.setAttribute('data-widget-id', widgetId);
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
  await ensureLoaderScript();
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
 * Reads GHL theme CSS variables from :root and returns HSL-to-rgba values.
 * CSS custom properties inherit into shadow DOM, so we read from computed styles.
 * 
 * @returns Object with resolved color values for injection
 */
function getGHLThemeColors(): {
  textareaBg: string;
  textareaText: string;
  textareaBorder: string;
  textareaFocusBorder: string;
  textareaFocusGlow: string;
  sendButtonBg: string;
  sendButtonBorder: string;
  sendButtonIcon: string;
  selectionBg: string;
} {
  const root = document.documentElement;
  const cs = getComputedStyle(root);
  
  /**
   * Converts HSL string "H S% L%" to "hsl(H, S%, L%)" or rgba fallback.
   */
  const hslToColor = (hsl: string, alpha = 0.95): string => {
    const parts = hsl.trim().split(/\s+/);
    if (parts.length >= 3) {
      const h = parts[0];
      const s = parts[1];
      const l = parts[2];
      return `hsla(${h}, ${s}, ${l}, ${alpha})`;
    }
    return `rgba(99, 102, 241, ${alpha})`; // fallback indigo
  };
  
  // Read CSS variables with fallbacks
  const textareaBg = cs.getPropertyValue('--ghl-textarea-bg').trim() || '222 47% 7%';
  const textareaText = cs.getPropertyValue('--ghl-textarea-text').trim() || '60 9% 98%';
  const textareaBorder = cs.getPropertyValue('--ghl-textarea-border').trim() || '215 25% 20%';
  const textareaFocusBorder = cs.getPropertyValue('--ghl-textarea-focus-border').trim() || '240 70% 60%';
  const textareaFocusGlow = cs.getPropertyValue('--ghl-textarea-focus-glow').trim() || '240 70% 60%';
  const sendButtonBg = cs.getPropertyValue('--ghl-send-button-bg').trim() || '240 70% 60%';
  const sendButtonBorder = cs.getPropertyValue('--ghl-send-button-border').trim() || '0 0% 100%';
  const sendButtonIcon = cs.getPropertyValue('--ghl-send-button-icon').trim() || '0 0% 100%';
  const selectionBg = cs.getPropertyValue('--ghl-selection-bg').trim() || '240 70% 60%';
  
  return {
    textareaBg: hslToColor(textareaBg, 0.95),
    textareaText: hslToColor(textareaText, 0.95),
    textareaBorder: hslToColor(textareaBorder, 0.18),
    textareaFocusBorder: hslToColor(textareaFocusBorder, 0.95),
    textareaFocusGlow: hslToColor(textareaFocusGlow, 0.35),
    sendButtonBg: hslToColor(sendButtonBg, 0.95),
    sendButtonBorder: hslToColor(sendButtonBorder, 0.18),
    sendButtonIcon: hslToColor(sendButtonIcon, 0.95),
    selectionBg: hslToColor(selectionBg, 0.45),
  };
}

/**
 * Injects CSS fixes into composer shadow root.
 * Uses CSS custom properties from :root for theme-aware styling.
 * 
 * Fixes addressed:
 * - Textarea invisible caret (caret-color)
 * - Textarea no focus indication (border, box-shadow)
 * - Send button fully transparent (#524bae00 → visible themed color)
 * - SVG icon low contrast on dark theme
 * 
 * @returns `true` if fix was applied, `false` if shadow root not available
 */
export function injectGHLComposerFix(): boolean {
  const root3 = getComposerShadowRoot();
  if (!root3) return false;

  // Always recreate styles to pick up theme changes
  const existing = root3.getElementById(EI_GHL_FIX_STYLE_ID);
  if (existing) existing.remove();
  
  const colors = getGHLThemeColors();
  
  const style = document.createElement('style');
  style.id = EI_GHL_FIX_STYLE_ID;
  style.textContent = `
    /* === GHL Chat Composer Fixes (Theme-Aware) === */

    /* Textarea: visible caret, focus state, theme colors */
    textarea.native-textarea.sc-ion-textarea-ios {
      background: ${colors.textareaBg} !important;
      color: ${colors.textareaText} !important;
      caret-color: ${colors.textareaText} !important;
      -webkit-text-fill-color: ${colors.textareaText} !important;
      border: 1px solid ${colors.textareaBorder} !important;
      border-radius: 12px !important;
      padding: 10px 12px !important;
      outline: none !important;
      opacity: 1 !important;
      visibility: visible !important;
    }

    textarea.native-textarea.sc-ion-textarea-ios::selection {
      background: ${colors.selectionBg} !important;
    }

    textarea.native-textarea.sc-ion-textarea-ios:focus {
      border-color: ${colors.textareaFocusBorder} !important;
      box-shadow: 0 0 0 3px ${colors.textareaFocusGlow} !important;
      background: ${colors.textareaBg} !important;
    }

    /* Send button: visible background (was fully transparent) */
    button.live-chat-send-button {
      background-color: ${colors.sendButtonBg} !important;
      border: 1px solid ${colors.sendButtonBorder} !important;
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
      stroke: ${colors.sendButtonIcon} !important;
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
