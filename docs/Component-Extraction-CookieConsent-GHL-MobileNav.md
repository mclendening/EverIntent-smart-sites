# Component Extraction: Cookie Consent, GHL Chat Widget & Mobile Bottom Nav

Complete implementation details for reuse in React + Vite + Tailwind + Supabase projects.

---

## Z-Index Layering Strategy

```
Layer                    Z-Index    Description
─────────────────────────────────────────────────────────────
Cookie Consent Banner    2147483647  Maximum z-index (always on top)
GHL Chat Widget         40          Below consent, above most content
Mobile Bottom Navbar    40          Same level as chat widget
Desktop Chat Button     40          Same level as mobile nav
Standard Content        auto        Default stacking
```

**Key Insight**: Cookie consent uses the maximum possible CSS z-index (`2147483647`) to guarantee it sits above any third-party widgets (including GHL chat) that may inject their own high z-index values.

---

## 1. Cookie Consent Banner

### Component: `src/components/CookieConsent.tsx`

```tsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [height, setHeight] = useState<number>(0);

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const html = document.documentElement;
    const bannerEl = () => document.querySelector('.cookie-consent-elevated') as HTMLElement | null;

    const updateMetrics = () => {
      const h = bannerEl()?.getBoundingClientRect().height ?? 0;
      setHeight(h);
      html.style.setProperty('--cookie-banner-height', `${h}px`);
    };

    updateMetrics();
    const onResize = () => updateMetrics();
    window.addEventListener('resize', onResize);
    setTimeout(updateMetrics, 250);

    return () => {
      html.style.removeProperty('--cookie-banner-height');
      window.removeEventListener('resize', onResize);
    };
  }, [isVisible]);

  const acceptAll = () => {
    localStorage.setItem('cookie-consent', JSON.stringify({
      necessary: true,
      analytics: true,
      marketing: true,
      timestamp: new Date().toISOString()
    }));
    window.dispatchEvent(new Event('cookie-consent-changed'));
    setIsVisible(false);
  };

  const rejectAll = () => {
    localStorage.setItem('cookie-consent', JSON.stringify({
      necessary: true,
      analytics: false,
      marketing: false,
      timestamp: new Date().toISOString()
    }));
    window.dispatchEvent(new Event('cookie-consent-changed'));
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div 
      className="cookie-consent-elevated fixed bottom-0 left-0 right-0 z-[2147483647] bg-background/95 backdrop-blur-sm border-t border-border shadow-lg pointer-events-auto" 
      role="dialog" 
      aria-modal="true" 
      aria-labelledby="cookie-consent-title" 
      aria-describedby="cookie-consent-desc"
    >
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex-1">
            <h3 id="cookie-consent-title" className="font-semibold text-lg mb-2">We use cookies</h3>
            <p id="cookie-consent-desc" className="text-sm text-muted-foreground">
              We use cookies to enhance your experience, analyze site usage, and personalize content.
              By continuing to browse, you consent to our use of cookies{' '}
              <Link to="/privacy" className="text-accent hover:underline">Privacy Policy</Link>
              {' | '}
              <Link to="/cookies" className="text-accent hover:underline">Cookie Settings</Link>
            </p>
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto">
            <Button
              variant="outline"
              onClick={rejectAll}
              className="flex-1 md:flex-none"
            >
              Reject All
            </Button>
            <Button
              variant="outline"
              asChild
              className="flex-1 md:flex-none"
            >
              <Link to="/cookies">Manage</Link>
            </Button>
            <Button
              onClick={acceptAll}
              className="flex-1 md:flex-none"
            >
              Accept All
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
```

### Key CSS Strategy

The critical z-index is set inline: `z-[2147483647]` - this is the maximum 32-bit signed integer, ensuring the banner is always on top.

Additional CSS in `src/index.css` forces GHL widgets below:

```css
/* Ensure GHL chat widget appears behind cookie banner */
#chat-widget,
.chat-widget,
[id*="chat"],
[class*="chat-widget"],
.leadconnector-chat {
  z-index: 40 !important;
}
```

### Custom Event System

The component dispatches a custom event when consent changes:
```ts
window.dispatchEvent(new Event('cookie-consent-changed'));
```

Other components listen for this to show/hide based on consent status.

---

## 2. Desktop Chat Button (Fade-Up Animation)

### Component: `src/components/DesktopChatButton.tsx`

```tsx
import { Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';

export function DesktopChatButton() {
  const [hasConsent, setHasConsent] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Check if user has accepted cookies
    const checkConsent = () => {
      const consent = localStorage.getItem('cookie-consent');
      setHasConsent(!!consent);
    };
    
    checkConsent();
    
    // Listen for cookie consent changes
    window.addEventListener('cookie-consent-changed', checkConsent);
    window.addEventListener('storage', checkConsent);
    
    return () => {
      window.removeEventListener('cookie-consent-changed', checkConsent);
      window.removeEventListener('storage', checkConsent);
    };
  }, []);

  useEffect(() => {
    // Slide up after component mounts (delayed fade-up animation)
    if (hasConsent) {
      const timer = setTimeout(() => setIsVisible(true), 300);
      return () => clearTimeout(timer);
    }
  }, [hasConsent]);

  const handleClick = () => {
    if (window.toggleGHLChat) {
      window.toggleGHLChat();
    }
  };

  // Don't render until cookies are accepted
  if (!hasConsent) return null;

  return (
    <button
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="hidden md:flex fixed right-6 z-40 items-center gap-3 px-5 py-3 bg-primary/95 backdrop-blur-sm border border-accent/30 rounded-lg shadow-lg transition-all duration-300 ease-out hover:bg-primary hover:border-accent hover:shadow-xl hover:shadow-accent/20 group"
      style={{
        bottom: isVisible ? '24px' : '-80px',
      }}
      aria-label="Chat with our AI assistant"
    >
      <Sparkles 
        className="text-accent transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12 pointer-events-none"
        size={18}
        strokeWidth={2}
      />
      <span className="text-primary-foreground font-medium text-sm tracking-wide whitespace-nowrap pointer-events-none">
        {isHovered ? 'Chat with us' : 'Need help?'}
      </span>
      <div className="w-2 h-2 rounded-full bg-accent animate-pulse pointer-events-none" />
    </button>
  );
}
```

### Animation Breakdown

1. **Initial State**: Button positioned at `bottom: -80px` (off-screen)
2. **Trigger**: After 300ms delay post-consent, `isVisible` becomes `true`
3. **Animation**: CSS `transition-all duration-300 ease-out` smoothly animates to `bottom: 24px`
4. **Hover Effects**: Icon scales/rotates, shadow intensifies, text changes

### Responsive Behavior

- `hidden md:flex` - Only visible on desktop (≥768px)
- Mobile uses the bottom navbar instead

---

## 3. GHL Chat Widget Integration

### Loader Utility: `src/lib/ghlLoader.ts`

```ts
/* Utilities to inject and control the GHL chat widget without GTM.
   - Doc-compliant: injects <chat-widget> and the official loader script
   - Supports swapping locationId by removing/recreating the <chat-widget>
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
const GHL_WIDGET_DATA_ID = '69099cc27e51cb2ae46198e9'; // Your GHL widget ID

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
```

### Component: `src/components/GHLChatWidget.tsx`

```tsx
import { useEffect } from 'react';
import { ensureGHLWidget, openViaAnyAPI, closeViaAnyAPI } from '@/lib/ghlLoader';

declare global {
  interface Window {
    toggleGHLChat?: () => void;
    closeGHLChat?: () => void;
    dataLayer?: any[];
    __GHL_OPEN_EVENT?: string;
    __GHL_CLOSE_EVENT?: string;
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

export function GHLChatWidget() {
  useEffect(() => {
    console.log('[GHL Chat] Helper functions initialized');

    const getLocationId = async (): Promise<string | null> => {
      let loc: string | undefined = (window as any).__GHL_LOCATION_ID;
      if (!loc) {
        try {
          const resp = await fetch('/api/ghl/public-config', { cache: 'no-store' });
          if (resp.ok) {
            const data = await resp.json();
            loc = data?.locationId;
          }
        } catch (err) {
          console.warn('[GHL Chat] Failed to fetch location ID:', err);
        }
      }
      return loc || null;
    };

    const hasAPI = () =>
      !!(
        window.leadConnector?.open ||
        window.leadConnector?.chatWidget?.openWidget ||
        window.LC_API?.open_chat_window
      );

    const tryOpen = () => {
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
    };

    const tryClose = () => {
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
    };

    const pushDL = (evt: string) => {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: evt });
    };

    const waitForAPI = (callback: () => void, timeout = 10000) => {
      const startTime = Date.now();
      const checkAPI = setInterval(() => {
        if (hasAPI()) {
          clearInterval(checkAPI);
          callback();
        } else if (Date.now() - startTime > timeout) {
          clearInterval(checkAPI);
          console.warn('[GHL Chat] Widget API not found after', timeout, 'ms');
        }
      }, 100);
    };

    // Hide the default GHL launcher on init
    waitForAPI(() => {
      if (window.leadConnector?.hideLauncher) {
        window.leadConnector.hideLauncher();
      } else if (window.LC_API?.hide_chat_window) {
        window.LC_API.hide_chat_window?.();
      }
    });

    // Global toggle function - lazy loads widget if needed
    window.toggleGHLChat = async () => {
      if (!tryOpen()) {
        try {
          await ensureGHLWidget(undefined);
          const hide = () => {
            if (window.leadConnector?.hideLauncher) {
              window.leadConnector.hideLauncher();
            } else if (window.LC_API?.hide_chat_window) {
              window.LC_API.hide_chat_window?.();
            }
          };
          setTimeout(hide, 300);
          setTimeout(hide, 1000);
          tryOpen();
        } catch (e) {
          console.warn('[GHL Chat] Lazy load failed', e);
        }
      }
    };

    // Global close function
    window.closeGHLChat = () => {
      const hide = () => {
        if (window.leadConnector?.hideLauncher) {
          window.leadConnector.hideLauncher();
        } else if (window.LC_API?.hide_chat_window) {
          window.LC_API.hide_chat_window?.();
        }
      };
      
      if (!tryClose()) {
        pushDL(window.__GHL_CLOSE_EVENT || 'ghl_chat_close');
        waitForAPI(() => {
          tryClose();
          hide();
          setTimeout(hide, 300);
          setTimeout(hide, 1000);
          setTimeout(hide, 2000);
        });
      } else {
        // Aggressive hide after close to prevent lingering bubble
        hide();
        setTimeout(hide, 100);
        setTimeout(hide, 500);
        setTimeout(hide, 1000);
        setTimeout(hide, 2000);
        setTimeout(hide, 3000);
      }
    };

    return () => {
      delete window.toggleGHLChat;
      delete window.closeGHLChat;
    };
  }, []);

  return null;
}
```

### Usage in Layout

Include the widget component once at the app root level:

```tsx
// In App.tsx or Layout.tsx
import { GHLChatWidget } from '@/components/GHLChatWidget';
import { DesktopChatButton } from '@/components/DesktopChatButton';

function App() {
  return (
    <>
      <GHLChatWidget />
      <DesktopChatButton />
      {/* rest of app */}
    </>
  );
}
```

---

## 4. Mobile Bottom Navbar

### Component: `src/components/MobileBottomBar.tsx`

```tsx
import { NavLink } from "react-router-dom";
import { Home, Package, Scale, BookOpen, MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";

export const MobileBottomBar = () => {
  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    const checkConsent = () => {
      const consent = localStorage.getItem('cookie-consent');
      setHasConsent(!!consent);
    };
    
    checkConsent();
    window.addEventListener('cookie-consent-changed', checkConsent);
    window.addEventListener('storage', checkConsent);
    
    return () => {
      window.removeEventListener('cookie-consent-changed', checkConsent);
      window.removeEventListener('storage', checkConsent);
    };
  }, []);

  if (!hasConsent) return null;
  
  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur border-t"
      aria-label="Mobile navigation"
    >
      <div className="flex items-center justify-around h-16 px-2">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-lg transition-colors ${
              isActive
                ? "text-primary bg-primary/10"
                : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
            }`
          }
          aria-label="Home"
        >
          <Home className="h-5 w-5" aria-hidden="true" />
          <span className="text-xs font-medium">Home</span>
        </NavLink>

        <NavLink
          to="/products"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-lg transition-colors ${
              isActive
                ? "text-primary bg-primary/10"
                : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
            }`
          }
          aria-label="Products"
        >
          <Package className="h-5 w-5" aria-hidden="true" />
          <span className="text-xs font-medium">Products</span>
        </NavLink>

        <NavLink
          to="/practice-areas/all"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-lg transition-colors ${
              isActive
                ? "text-primary bg-primary/10"
                : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
            }`
          }
          aria-label="Practice Areas"
        >
          <Scale className="h-5 w-5" aria-hidden="true" />
          <span className="text-xs font-medium">Practice</span>
        </NavLink>

        <NavLink
          to="/guides/all"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-lg transition-colors ${
              isActive
                ? "text-primary bg-primary/10"
                : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
            }`
          }
          aria-label="Guides"
        >
          <BookOpen className="h-5 w-5" aria-hidden="true" />
          <span className="text-xs font-medium">Guides</span>
        </NavLink>

        <button
          onClick={() => {
            if (window.toggleGHLChat) {
              window.toggleGHLChat();
            }
          }}
          className="flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-lg transition-colors text-muted-foreground hover:text-foreground hover:bg-accent/50 active:text-primary active:bg-primary/10"
          aria-label="Chat with us"
        >
          <MessageCircle className="h-5 w-5" aria-hidden="true" />
          <span className="text-xs font-medium">Chat</span>
        </button>
      </div>
    </nav>
  );
};
```

### Responsive Breakpoint Logic

- `md:hidden` - Only visible below 768px (mobile/tablet)
- Desktop uses the floating chat button instead

### Z-Index Coordination

Both Mobile Bottom Bar and Cookie Consent are `fixed bottom-0`, but:
- Cookie Consent: `z-[2147483647]` (maximum, always on top)
- Mobile Bottom Bar: `z-40` (high, but below consent banner)

When the cookie banner is visible, it naturally stacks above the mobile navbar.

---

## 5. Required CSS (index.css)

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 240 28% 14%;
    --primary: 210 73% 15%;
    --primary-foreground: 0 0% 100%;
    --accent: 44 44% 62%;
    --accent-foreground: 240 28% 14%;
    --muted: 210 17% 98%;
    --muted-foreground: 215 19% 35%;
    --border: 214 32% 91%;
    /* Add other tokens as needed */
  }

  /* Force GHL chat widget below cookie banner */
  #chat-widget,
  .chat-widget,
  [id*="chat"],
  [class*="chat-widget"],
  .leadconnector-chat {
    z-index: 40 !important;
  }
}
```

---

## 6. TypeScript Types

Add to a global types file or in individual components:

```ts
declare global {
  interface Window {
    toggleGHLChat?: () => void;
    closeGHLChat?: () => void;
    dataLayer?: any[];
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
```

---

## 7. Integration Checklist

1. **Install Dependencies**
   - `lucide-react` for icons
   - `react-router-dom` for NavLink

2. **Add Components**
   - `CookieConsent.tsx` - cookie banner
   - `DesktopChatButton.tsx` - desktop floating button
   - `MobileBottomBar.tsx` - mobile bottom nav
   - `GHLChatWidget.tsx` - GHL control component
   - `ghlLoader.ts` - GHL script injection utilities

3. **Configure CSS**
   - Add z-index overrides for GHL widget in `index.css`
   - Ensure design tokens are defined

4. **Mount in App**
   ```tsx
   <GHLChatWidget />
   <CookieConsent />
   <DesktopChatButton />
   <MobileBottomBar />
   ```

5. **Update GHL Widget ID**
   - Replace `GHL_WIDGET_DATA_ID` in `ghlLoader.ts` with your widget ID

---

## Key Patterns

| Pattern | Implementation |
|---------|---------------|
| Consent-gated rendering | Components check `localStorage` and listen for `cookie-consent-changed` event |
| Lazy widget loading | GHL widget only injected on first chat button click |
| Fade-up animation | CSS `transition-all` + JS-controlled `bottom` position |
| Z-index hierarchy | Cookie banner uses max z-index; all others at z-40 |
| Responsive show/hide | Tailwind `hidden md:flex` and `md:hidden` classes |
