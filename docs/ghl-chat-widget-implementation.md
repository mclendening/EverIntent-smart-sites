# GoHighLevel Chat Widget Implementation Guide

> **Reusable pattern for styling and fixing GHL chat widgets in Lovable/Vite/React projects.**

## Problem Statement

GoHighLevel (GHL) chat widgets use nested shadow DOM elements that cannot be styled with standard CSS. Common issues include:

- **Invisible send button** (`background-color: #524bae00` - fully transparent)
- **No visible caret** in textarea (missing `caret-color`)
- **Right-click triggers send** (unguarded mouse events)
- **SSG/SSR hydration errors** (DOM access during server render)

---

## Solution Architecture

### Shadow DOM Structure

```
document
└── chat-widget (custom element)
    └── #shadow-root (open)
        └── chat-pane (custom element)
            └── #shadow-root (open)
                └── chat-input (custom element)
                    └── #shadow-root (open)  ← TARGET
                        ├── textarea.native-textarea.sc-ion-textarea-ios
                        └── button.live-chat-send-button
```

### Key Techniques

1. **Shadow Root Traversal** - Navigate nested shadow DOMs to reach target elements
2. **CSS Injection** - Append `<style>` elements directly into shadow roots
3. **Event Guards** - Capture-phase listeners to block unwanted interactions
4. **Timed Retries** - Handle lazy-mounted components with multiple injection attempts
5. **SSG Safety** - `isBrowser()` checks prevent server-side DOM access

---

## Complete Implementation

### 1. GHL Loader Module (`src/lib/ghlLoader.ts`)

```typescript
/**
 * @fileoverview GHL Chat Widget Loader & Styling Fix
 * @description Loads GoHighLevel chat widget and applies shadow DOM styling fixes.
 * @module ghlLoader
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

// ═══════════════════════════════════════════════════════════════════════════════
// CONFIGURATION - Update these for your GHL account
// ═══════════════════════════════════════════════════════════════════════════════

const LOADER_ID = 'ghl-widget-loader';
const LOADER_SRC = 'https://beta.leadconnectorhq.com/loader.js';
const RESOURCES_URL = 'https://beta.leadconnectorhq.com/chat-widget/loader.js';
const GHL_WIDGET_ID = 'YOUR_WIDGET_ID_HERE'; // ← Replace with your widget ID

// ═══════════════════════════════════════════════════════════════════════════════
// INTERNAL CONSTANTS
// ═══════════════════════════════════════════════════════════════════════════════

const EI_GHL_FIX_STYLE_ID = 'ghl-composer-fix';
const EI_GHL_EVENT_FIX_FLAG = '__ghl_event_fix_installed__';

// ═══════════════════════════════════════════════════════════════════════════════
// SSG SAFETY
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Checks if code is running in browser environment.
 * Essential for SSG/SSR safety - prevents DOM access during server render.
 */
function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof document !== 'undefined';
}

// ═══════════════════════════════════════════════════════════════════════════════
// WIDGET LOADING
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Waits for GHL API to become available on window object.
 * @param timeout - Maximum wait time in milliseconds
 * @returns Promise resolving to detected API type
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
 * Injects GHL loader script into document if not already present.
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
 * @param timeout - Maximum wait time for API availability
 */
export async function ensureGHLWidget(timeout = 12000): Promise<void> {
  if (!isBrowser()) return;
  ensureLoaderScript();
  await waitForAPI(timeout);
}

// ═══════════════════════════════════════════════════════════════════════════════
// WIDGET CONTROL
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Hides the default GHL launcher bubble.
 * Traverses into first shadow root to find and hide the bubble button.
 */
export function hideLauncher(): void {
  if (!isBrowser()) return;
  const widget = document.querySelector('chat-widget') as HTMLElement | null;
  const shadowRoot = widget?.shadowRoot;
  if (shadowRoot) {
    const launcher = shadowRoot.querySelector('button.lc_text-widget--bubble') as HTMLElement | null;
    if (launcher) {
      launcher.style.cssText =
        'display:none !important; visibility:hidden !important; pointer-events:none !important; width:0 !important; height:0 !important;';
    }
  }
}

/**
 * Opens chat widget using any available API.
 * @returns True if successfully opened, false if no API available
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
 * Closes chat widget using any available API.
 * @returns True if successfully closed, false if no API available
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
 * Removes the GHL loader script from document.
 */
export function destroyGHLWidget(): void {
  if (!isBrowser()) return;
  const el = document.getElementById(LOADER_ID);
  if (el) el.remove();
}

// ═══════════════════════════════════════════════════════════════════════════════
// SHADOW DOM STYLING FIX
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Traverses nested shadow DOMs to reach the composer input shadow root.
 * Path: chat-widget → chat-pane → chat-input (where textarea + send button live)
 * @returns The innermost shadow root containing form controls, or null if not found
 */
function getComposerShadowRoot(): ShadowRoot | null {
  if (!isBrowser()) return null;

  const widget = document.querySelector('chat-widget') as HTMLElement | null;
  const root1 = widget?.shadowRoot;
  if (!root1) return null;

  const chatPane = root1.querySelector('chat-pane') as HTMLElement | null;
  const root2 = chatPane?.shadowRoot;
  if (!root2) return null;

  const chatInput = root2.querySelector('chat-input') as HTMLElement | null;
  const root3 = chatInput?.shadowRoot;
  if (!root3) return null;

  return root3;
}

/**
 * Installs event guards on the composer shadow root.
 * - Blocks right-click context menu on send button
 * - Blocks non-left mouse button clicks on send button
 * - Focuses textarea when clicking anywhere in input area
 * @param root3 - The composer shadow root to attach listeners to
 */
function installComposerGuards(root3: ShadowRoot): void {
  const anyRoot = root3 as any;
  if (anyRoot[EI_GHL_EVENT_FIX_FLAG]) return;
  anyRoot[EI_GHL_EVENT_FIX_FLAG] = true;

  // Block right-click context menu on send button
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

  // Block middle/right mouse button clicks on send button
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

      const ta = root3.querySelector(
        'textarea.native-textarea.sc-ion-textarea-ios'
      ) as HTMLTextAreaElement | null;
      if (ta && document.activeElement !== ta) ta.focus();
    },
    true
  );
}

/**
 * Injects CSS fixes into the composer shadow root.
 * Fixes: transparent send button, invisible caret, missing focus styles.
 * @returns True if injection succeeded, false if shadow root not found
 */
export function injectGHLComposerFix(): boolean {
  const root3 = getComposerShadowRoot();
  if (!root3) return false;

  if (!root3.getElementById(EI_GHL_FIX_STYLE_ID)) {
    const style = document.createElement('style');
    style.id = EI_GHL_FIX_STYLE_ID;
    style.textContent = `
      /* ===== GHL Chat Composer Fixes ===== */

      /* TEXTAREA: visible caret, focus ring, proper colors */
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

      /* SEND BUTTON: visible background (was transparent) */
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

      /* SEND BUTTON ICON: ensure visibility */
      button.live-chat-send-button svg,
      button.live-chat-send-button svg * {
        stroke: rgba(255, 255, 255, 0.95) !important;
        fill: none !important;
        opacity: 1 !important;
      }

      /* Prevent widget from dimming controls */
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
 * Applies composer fixes with timed retries.
 * GHL widget lazily mounts nested shadow components, so multiple attempts are needed.
 * Call after widget load and after opening the chat.
 */
export function applyGHLComposerFixRetries(): void {
  if (!isBrowser()) return;
  injectGHLComposerFix();
  setTimeout(injectGHLComposerFix, 250);
  setTimeout(injectGHLComposerFix, 750);
  setTimeout(injectGHLComposerFix, 1500);
  setTimeout(injectGHLComposerFix, 2500);
}
```

---

### 2. React Component (`src/components/GHLChatWidget.tsx`)

```tsx
/**
 * @fileoverview GHL Chat Widget React Component
 * @description SSG-safe component that loads GHL widget and applies styling fixes.
 */

import { useEffect, useState } from 'react';
import {
  ensureGHLWidget,
  openViaAnyAPI,
  closeViaAnyAPI,
  hideLauncher,
  applyGHLComposerFixRetries,
} from '@/lib/ghlLoader';

const CONSENT_KEY = 'cookie-consent';

declare global {
  interface Window {
    toggleGHLChat?: () => void;
    closeGHLChat?: () => void;
  }
}

/**
 * GHL Chat Widget wrapper component.
 * - Loads widget only after cookie consent
 * - Hides default launcher bubble
 * - Applies shadow DOM styling fixes
 * - Exposes global toggle/close functions
 */
export function GHLChatWidget(): null {
  const [hasConsent, setHasConsent] = useState(false);

  // Check cookie consent status
  useEffect(() => {
    const checkConsent = () => setHasConsent(!!localStorage.getItem(CONSENT_KEY));
    checkConsent();
    window.addEventListener('cookie-consent-changed', checkConsent);
    window.addEventListener('storage', checkConsent);
    return () => {
      window.removeEventListener('cookie-consent-changed', checkConsent);
      window.removeEventListener('storage', checkConsent);
    };
  }, []);

  // Load widget and apply fixes after consent
  useEffect(() => {
    if (!hasConsent) return;

    let mounted = true;

    const preload = async () => {
      try {
        await ensureGHLWidget();
        if (!mounted) return;

        hideLauncher();
        applyGHLComposerFixRetries();

        // Retry for lazy-mounted components
        setTimeout(() => {
          hideLauncher();
          applyGHLComposerFixRetries();
        }, 500);

        setTimeout(() => {
          hideLauncher();
          applyGHLComposerFixRetries();
        }, 1500);
      } catch (e) {
        console.warn('[GHL Chat] Preload failed', e);
      }
    };

    preload();
    return () => {
      mounted = false;
    };
  }, [hasConsent]);

  // Expose global control functions
  useEffect(() => {
    window.toggleGHLChat = () => {
      openViaAnyAPI();
      applyGHLComposerFixRetries();
    };

    window.closeGHLChat = () => {
      closeViaAnyAPI();
    };

    return () => {
      delete window.toggleGHLChat;
      delete window.closeGHLChat;
    };
  }, []);

  return null;
}
```

---

### 3. Usage in App

```tsx
// In your App.tsx or layout component
import { GHLChatWidget } from '@/components/GHLChatWidget';

function App() {
  return (
    <>
      {/* Your app content */}
      <GHLChatWidget />
    </>
  );
}
```

### 4. Trigger Button Example

```tsx
// Custom chat trigger button
function ChatButton() {
  const handleClick = () => {
    window.toggleGHLChat?.();
  };

  return (
    <button onClick={handleClick}>
      Open Chat
    </button>
  );
}
```

---

## Key Selectors Reference

| Element | Selector |
|---------|----------|
| Launcher bubble | `button.lc_text-widget--bubble` |
| Textarea | `textarea.native-textarea.sc-ion-textarea-ios` |
| Send button | `button.live-chat-send-button` |

---

## Customization

### Changing Colors

Update the CSS in `injectGHLComposerFix()`:

```css
/* Primary accent color (default: indigo) */
rgba(99, 102, 241, 0.95)  /* → Your brand color */

/* Background color (default: dark gray) */
rgba(17, 24, 39, 0.95)    /* → Your input background */
```

### Adding More Fixes

To target additional elements, extend the shadow root traversal or CSS:

```typescript
// Example: hiding emoji picker
const style = document.createElement('style');
style.textContent = `
  .emoji-picker-button {
    display: none !important;
  }
`;
root3.appendChild(style);
```

---

## Troubleshooting

### Fix Not Applied

1. Check console for `[GHL Chat] Preload failed`
2. Increase retry timeouts in `applyGHLComposerFixRetries()`
3. Verify widget ID matches your GHL account

### SSG Build Errors

Ensure all DOM access is wrapped in:
- `isBrowser()` checks
- `useEffect()` hooks
- Never in module scope or component body

### Selector Changed

GHL may update their widget. Debug with:
```javascript
// In browser console:
document.querySelector('chat-widget')
  .shadowRoot.querySelector('chat-pane')
  .shadowRoot.querySelector('chat-input')
  .shadowRoot.querySelectorAll('*')
```

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2024-12 | Initial implementation |

---

## Credits

Pattern developed for EverIntent/SmartSites projects. Reusable across any Lovable/Vite/React project with GHL integration.
