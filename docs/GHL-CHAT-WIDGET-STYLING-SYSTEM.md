# GHL Chat Widget Styling System - Complete Technical Documentation

## Overview

The GoHighLevel (GHL) chat widget uses a **triple-nested shadow DOM** that cannot be styled with normal CSS. This system provides admin-configurable theming by:

1. Storing style values in the database
2. Baking them into CSS custom properties during publish
3. Reading those properties at runtime and injecting styles directly into the shadow DOM

---

## Architecture Layers

```
┌─────────────────────────────────────────────────────────────────────────┐
│  LAYER 1: Database Storage                                              │
│  Table: site_themes                                                     │
│  Column: ghl_chat_config (JSONB)                                        │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│  LAYER 2: Admin UI Editor                                               │
│  File: src/pages/admin/Themes.tsx                                       │
│  State: ghlChatConfig useState                                          │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│  LAYER 3: CSS Generation                                                │
│  Function: generateProductionCss() in Themes.tsx                        │
│  Output: Full index.css with --ghl-* variables                          │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│  LAYER 4: Publish Storage                                               │
│  Table: published_theme_configs                                         │
│  Column: config_css (stores generated CSS)                              │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│  LAYER 5: GitHub Sync                                                   │
│  Edge Function: sync-theme-to-github                                    │
│  Pushes: src/index.css + src/config/themes.ts                           │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│  LAYER 6: Frontend CSS Variables                                        │
│  File: src/index.css                                                    │
│  Variables: --ghl-textarea-bg, --ghl-send-button-bg, etc.               │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│  LAYER 7: Runtime Shadow DOM Injection                                  │
│  File: src/lib/ghlLoader.ts                                             │
│  Functions: getGHLThemeColors(), injectGHLComposerFix()                 │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Layer 1: Database Schema

### Table: `site_themes`

The `ghl_chat_config` column stores HSL color values for all widget elements:

```sql
-- Column definition
ghl_chat_config JSONB NOT NULL DEFAULT '{
  "textareaBg": "222 47% 7%",
  "textareaText": "60 9% 98%",
  "textareaBorder": "215 25% 20%",
  "textareaFocusBorder": "240 70% 60%",
  "textareaFocusGlow": "240 70% 60%",
  "sendButtonBg": "240 70% 60%",
  "sendButtonBorder": "0 0% 100%",
  "sendButtonIcon": "0 0% 100%",
  "selectionBg": "240 70% 60%"
}'::jsonb
```

### Field Definitions

| Field               | Purpose                                  | Format          |
|---------------------|------------------------------------------|-----------------|
| `textareaBg`        | Background color of message input textarea | HSL: "H S% L%"  |
| `textareaText`      | Text color and caret color in textarea    | HSL: "H S% L%"  |
| `textareaBorder`    | Border color when textarea is unfocused   | HSL: "H S% L%"  |
| `textareaFocusBorder` | Border color when textarea is focused    | HSL: "H S% L%"  |
| `textareaFocusGlow` | Box-shadow glow color on focus             | HSL: "H S% L%"  |
| `sendButtonBg`      | Background color of send button            | HSL: "H S% L%"  |
| `sendButtonBorder`  | Border color of send button                 | HSL: "H S% L%"  |
| `sendButtonIcon`    | SVG stroke color on send button icon       | HSL: "H S% L%"  |
| `selectionBg`       | Text selection highlight color              | HSL: "H S% L%"  |

---

## Layer 2: Admin UI Editor

### File: `src/pages/admin/Themes.tsx`

### TypeScript Interface (Lines 70-97)

```typescript
/**
 * Configuration for GHL chat widget theming.
 * Controls the appearance of the GoHighLevel embedded chat widget
 * including textarea, send button, and focus states.
 * 
 * All values are HSL color strings in format "H S% L%".
 * Applied via CSS custom properties injected into the widget's shadow DOM.
 */
interface GHLChatConfig {
  /** Background color of the message textarea */
  textareaBg: string;
  /** Text color within the message textarea */
  textareaText: string;
  /** Border color of the message textarea (unfocused) */
  textareaBorder: string;
  /** Border color when textarea is focused */
  textareaFocusBorder: string;
  /** Glow/shadow color when textarea is focused */
  textareaFocusGlow: string;
  /** Background color of the send button */
  sendButtonBg: string;
  /** Border color of the send button */
  sendButtonBorder: string;
  /** Icon/SVG stroke color on send button */
  sendButtonIcon: string;
  /** Text selection highlight color in textarea */
  selectionBg: string;
}
```

### State Management (Lines 152-162)

```typescript
const [ghlChatConfig, setGhlChatConfig] = useState<GHLChatConfig>({
  textareaBg: '222 47% 7%',
  textareaText: '60 9% 98%',
  textareaBorder: '215 25% 20%',
  textareaFocusBorder: '240 70% 60%',
  textareaFocusGlow: '240 70% 60%',
  sendButtonBg: '240 70% 60%',
  sendButtonBorder: '0 0% 100%',
  sendButtonIcon: '0 0% 100%',
  selectionBg: '240 70% 60%',
});
```

### Loading from Database (Lines 211-224)

When a theme is selected, the config is parsed from the JSONB column:

```typescript
useEffect(() => {
  if (selectedTheme) {
    const ghlConfig = selectedTheme.ghl_chat_config as Record<string, string> || {};
    setGhlChatConfig({
      textareaBg: ghlConfig.textareaBg || '222 47% 7%',
      textareaText: ghlConfig.textareaText || '60 9% 98%',
      textareaBorder: ghlConfig.textareaBorder || '215 25% 20%',
      textareaFocusBorder: ghlConfig.textareaFocusBorder || '240 70% 60%',
      textareaFocusGlow: ghlConfig.textareaFocusGlow || '240 70% 60%',
      sendButtonBg: ghlConfig.sendButtonBg || '240 70% 60%',
      sendButtonBorder: ghlConfig.sendButtonBorder || '0 0% 100%',
      sendButtonIcon: ghlConfig.sendButtonIcon || '0 0% 100%',
      selectionBg: ghlConfig.selectionBg || '240 70% 60%',
    });
  }
}, [selectedTheme]);
```

### Saving to Database (Lines 286-334)

```typescript
const handleSave = async () => {
  await supabase
    .from('site_themes')
    .update({
      ghl_chat_config: ghlChatConfig as unknown as Json,  // ← Saved here
      // ... other fields
    })
    .eq('id', selectedTheme.id);
};
```

---

## Layer 3: CSS Generation

### Function: `generateProductionCss()` (Lines 612-720)

When admin clicks "Publish to Production", this function reads `ghl_chat_config` from the active theme and generates a complete `index.css` file with the GHL variables embedded:

```typescript
const generateProductionCss = (theme: Theme): string => {
  // Extract GHL config from theme
  const ghlConfig = theme.ghl_chat_config as Record<string, string> || {};
  
  return `
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* ... other CSS variables ... */

    /* GHL Chat Widget Theming (injected into shadow DOM) */
    --ghl-textarea-bg: ${ghlConfig.textareaBg || '222 47% 7%'};
    --ghl-textarea-text: ${ghlConfig.textareaText || '60 9% 98%'};
    --ghl-textarea-border: ${ghlConfig.textareaBorder || '215 25% 20%'};
    --ghl-textarea-focus-border: ${ghlConfig.textareaFocusBorder || '240 70% 60%'};
    --ghl-textarea-focus-glow: ${ghlConfig.textareaFocusGlow || '240 70% 60%'};
    --ghl-send-button-bg: ${ghlConfig.sendButtonBg || '240 70% 60%'};
    --ghl-send-button-border: ${ghlConfig.sendButtonBorder || '0 0% 100%'};
    --ghl-send-button-icon: ${ghlConfig.sendButtonIcon || '0 0% 100%'};
    --ghl-selection-bg: ${ghlConfig.selectionBg || '240 70% 60%'};
  }
}
`;
};
```

### Output Example

After generation, the CSS contains:

```css
:root {
  /* GHL Chat Widget Theming */
  --ghl-textarea-bg: 0 0% 12%;
  --ghl-textarea-text: 40 10% 91%;
  --ghl-textarea-border: 0 0% 20%;
  --ghl-textarea-focus-border: 42 76% 55%;
  --ghl-textarea-focus-glow: 42 76% 55%;
  --ghl-send-button-bg: 42 76% 55%;
  --ghl-send-button-border: 0 0% 5%;
  --ghl-send-button-icon: 0 0% 5%;
  --ghl-selection-bg: 42 76% 55%;
}
```

---

## Layer 4: Publish Storage

### Table: `published_theme_configs`

The generated CSS is stored for deployment:

```typescript
await supabase.from('published_theme_configs').insert({
  config_typescript: generatedConfig,  // themes.ts content
  config_css: generatedCss,            // Full index.css with --ghl-* vars
  config_json: themeConfigAsJson,      // JSON representation
  source_theme_id: activeTheme.id,
  source_theme_name: activeTheme.name,
  is_active: true,
  is_default: true,
});
```

---

## Layer 5: GitHub Sync

### Edge Function: `supabase/functions/sync-theme-to-github/index.ts`

Pushes both files to GitHub in an atomic commit:

```typescript
// Fetch the latest active published theme config
const { data: publishedConfig } = await supabase
  .from("published_theme_configs")
  .select("*")
  .eq("is_active", true)
  .order("version", { ascending: false })
  .limit(1)
  .single();

// Define files to update
const filesToUpdate: FileUpdate[] = [
  {
    path: "src/config/themes.ts",
    content: publishedConfig.config_typescript,
  },
];

// Add CSS file if it exists
if (publishedConfig.config_css) {
  filesToUpdate.push({
    path: "src/index.css",              // ← GHL variables baked in here
    content: publishedConfig.config_css,
  });
}

// Create atomic commit with both files
// ... GitHub API calls to create tree, commit, and update ref
```

---

## Layer 6: Frontend CSS Variables

### File: `src/index.css` (Lines 90-99)

After publish and deploy, the production CSS contains:

```css
/* GHL Chat Widget Theming */
--ghl-textarea-bg: 0 0% 12%;
--ghl-textarea-text: 40 10% 91%;
--ghl-textarea-border: 0 0% 20%;
--ghl-textarea-focus-border: 42 76% 55%;
--ghl-textarea-focus-glow: 42 76% 55%;
--ghl-send-button-bg: 42 76% 55%;
--ghl-send-button-border: 0 0% 5%;
--ghl-send-button-icon: 0 0% 5%;
--ghl-selection-bg: 42 76% 55%;
```

These are standard CSS custom properties on `:root` that can be read via JavaScript.

---

## Layer 7: Runtime Shadow DOM Injection

### File: `src/lib/ghlLoader.ts`

This is where the magic happens. The GHL widget uses **triple-nested shadow DOM** that CSS cannot pierce:

```
chat-widget (shadowRoot)
  └─ chat-pane (shadowRoot)
       └─ chat-input (shadowRoot)  ← Textarea + send button live here
            ├─ textarea.native-textarea.sc-ion-textarea-ios
            └─ button.live-chat-send-button
```

### Shadow DOM Traversal (Lines 320-343)

```typescript
/**
 * Traverses nested shadow roots to access composer elements.
 * 
 * Path: chat-widget → chat-pane → chat-input (where textarea + send button live)
 * 
 * @returns Innermost shadow root containing composer, or null if not mounted
 */
function getComposerShadowRoot(): ShadowRoot | null {
  if (!isBrowser()) return null;

  // Level 1: chat-widget
  const widget = document.querySelector('chat-widget') as HTMLElement & { shadowRoot?: ShadowRoot };
  const root1 = widget?.shadowRoot;
  if (!root1) return null;

  // Level 2: chat-pane
  const chatPane = root1.querySelector('chat-pane') as HTMLElement & { shadowRoot?: ShadowRoot };
  const root2 = chatPane?.shadowRoot;
  if (!root2) return null;

  // Level 3: chat-input (target)
  const chatInput = root2.querySelector('chat-input') as HTMLElement & { shadowRoot?: ShadowRoot };
  const root3 = chatInput?.shadowRoot;
  if (!root3) return null;

  return root3;
}
```

### Reading CSS Variables (Lines 413-468)

```typescript
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
   * Converts HSL string "H S% L%" to "hsla(H, S%, L%, alpha)".
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
```

### Style Injection (Lines 483-555)

```typescript
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
  const existing = root3.getElementById('ei-ghl-composer-fix');
  if (existing) existing.remove();
  
  const colors = getGHLThemeColors();
  
  const style = document.createElement('style');
  style.id = 'ei-ghl-composer-fix';
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
  
  // INJECT INTO SHADOW DOM
  root3.appendChild(style);

  installComposerGuards(root3);
  return true;
}
```

### Retry Mechanism (Lines 566-573)

GHL widgets mount shadow DOM **lazily/asynchronously**, so injection uses timed retries:

```typescript
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
  injectGHLComposerFix();              // Immediate
  setTimeout(injectGHLComposerFix, 250);   // 250ms
  setTimeout(injectGHLComposerFix, 750);   // 750ms
  setTimeout(injectGHLComposerFix, 1500);  // 1.5s
  setTimeout(injectGHLComposerFix, 2500);  // 2.5s
}
```

---

## Component Orchestration

### File: `src/components/GHLChatWidget.tsx`

This component triggers the entire injection flow after cookie consent:

```typescript
export function GHLChatWidget(): null {
  const [hasConsent, setHasConsent] = useState(false);

  // Check consent on mount and listen for changes
  useEffect(() => {
    const checkConsent = () => setHasConsent(!!localStorage.getItem('cookie-consent'));
    checkConsent();
    window.addEventListener('cookie-consent-changed', checkConsent);
    window.addEventListener('storage', checkConsent);
    return () => {
      window.removeEventListener('cookie-consent-changed', checkConsent);
      window.removeEventListener('storage', checkConsent);
    };
  }, []);

  // Preload widget and apply fixes when consent is granted
  useEffect(() => {
    if (!hasConsent) return;

    let mounted = true;

    const preload = async () => {
      try {
        await ensureGHLWidget();        // Load widget script
        if (!mounted) return;

        hideLauncher();                  // Hide default bubble (we use custom buttons)
        applyGHLComposerFixRetries();   // Apply theme overrides with retries

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
    return () => { mounted = false; };
  }, [hasConsent]);

  // Setup global toggle/close functions
  useEffect(() => {
    window.toggleGHLChat = () => {
      openViaAnyAPI();
      applyGHLComposerFixRetries();  // Apply fixes after open (shadow DOM mounts on first open)
    };

    window.closeGHLChat = () => {
      closeViaAnyAPI();
    };

    return () => {
      delete window.toggleGHLChat;
      delete window.closeGHLChat;
    };
  }, []);

  return null;  // No DOM output - this component is purely for side effects
}
```

### Usage in Layout

```tsx
// src/components/layout/Layout.tsx
<ClientOnly>
  <MobileBottomBar />
  <DesktopChatButton />
  <GHLChatWidget />       {/* ← Triggers injection after consent */}
  <CookieConsent />
</ClientOnly>
```

---

## Complete Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────────────────┐
│  ADMIN UI: /admin/themes                                                │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │  GHL Chat Config Accordion Section                               │   │
│  │  ├─ Textarea Background: [HSL input] → "0 0% 12%"               │   │
│  │  ├─ Textarea Text Color: [HSL input] → "40 10% 91%"             │   │
│  │  ├─ Textarea Border: [HSL input] → "0 0% 20%"                   │   │
│  │  ├─ Focus Border: [HSL input] → "42 76% 55%"                    │   │
│  │  ├─ Focus Glow: [HSL input] → "42 76% 55%"                      │   │
│  │  ├─ Send Button BG: [HSL input] → "42 76% 55%"                  │   │
│  │  ├─ Send Button Border: [HSL input] → "0 0% 5%"                 │   │
│  │  ├─ Send Button Icon: [HSL input] → "0 0% 5%"                   │   │
│  │  └─ Selection Color: [HSL input] → "42 76% 55%"                 │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                              │ [Save Theme]                             │
└──────────────────────────────┼──────────────────────────────────────────┘
                               ▼
┌─────────────────────────────────────────────────────────────────────────┐
│  DATABASE: site_themes.ghl_chat_config (JSONB)                          │
│  {                                                                       │
│    "textareaBg": "0 0% 12%",                                            │
│    "textareaText": "40 10% 91%",                                        │
│    "textareaBorder": "0 0% 20%",                                        │
│    "textareaFocusBorder": "42 76% 55%",                                 │
│    "textareaFocusGlow": "42 76% 55%",                                   │
│    "sendButtonBg": "42 76% 55%",                                        │
│    "sendButtonBorder": "0 0% 5%",                                       │
│    "sendButtonIcon": "0 0% 5%",                                         │
│    "selectionBg": "42 76% 55%"                                          │
│  }                                                                       │
└──────────────────────────────┬──────────────────────────────────────────┘
                               │ [Publish to Production]
                               ▼
┌─────────────────────────────────────────────────────────────────────────┐
│  FUNCTION: generateProductionCss(theme)                                 │
│  Template literal interpolates ghl_chat_config values into CSS:         │
│                                                                          │
│  --ghl-textarea-bg: ${theme.ghl_chat_config.textareaBg};               │
│  --ghl-send-button-bg: ${theme.ghl_chat_config.sendButtonBg};          │
│  ... (9 variables total)                                                │
└──────────────────────────────┬──────────────────────────────────────────┘
                               │ Saved to DB
                               ▼
┌─────────────────────────────────────────────────────────────────────────┐
│  DATABASE: published_theme_configs.config_css                           │
│  Full index.css content with embedded --ghl-* variables                 │
└──────────────────────────────┬──────────────────────────────────────────┘
                               │ [Sync to GitHub] button
                               ▼
┌─────────────────────────────────────────────────────────────────────────┐
│  EDGE FUNCTION: sync-theme-to-github                                    │
│  Atomic commit of:                                                       │
│  • src/config/themes.ts (theme config)                                  │
│  • src/index.css (CSS with --ghl-* variables)                           │
└──────────────────────────────┬──────────────────────────────────────────┘
                               │ Vercel auto-deploys
                               ▼
┌─────────────────────────────────────────────────────────────────────────┐
│  PRODUCTION: src/index.css on :root                                     │
│  --ghl-textarea-bg: 0 0% 12%;                                           │
│  --ghl-send-button-bg: 42 76% 55%;                                      │
│  ... (available via getComputedStyle)                                   │
└──────────────────────────────┬──────────────────────────────────────────┘
                               │ Browser loads page
                               ▼
┌─────────────────────────────────────────────────────────────────────────┐
│  COMPONENT: GHLChatWidget.tsx                                           │
│  On consent: ensureGHLWidget() → applyGHLComposerFixRetries()          │
└──────────────────────────────┬──────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────────────┐
│  FUNCTION: getGHLThemeColors()                                          │
│  getComputedStyle(document.documentElement)                             │
│    .getPropertyValue('--ghl-textarea-bg') → "0 0% 12%"                 │
│  Convert HSL to hsla(): "hsla(0, 0%, 12%, 0.95)"                        │
└──────────────────────────────┬──────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────────────┐
│  FUNCTION: injectGHLComposerFix()                                       │
│                                                                          │
│  1. Traverse shadow DOM:                                                │
│     chat-widget.shadowRoot                                              │
│       → chat-pane.shadowRoot                                            │
│         → chat-input.shadowRoot (root3)                                 │
│                                                                          │
│  2. Create <style> element with resolved colors                         │
│                                                                          │
│  3. Append to innermost shadow root:                                    │
│     root3.appendChild(style)                                            │
│                                                                          │
│  Result: Styles applied INSIDE shadow DOM with !important               │
└─────────────────────────────────────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────────────┐
│  SHADOW DOM: chat-input shadowRoot                                      │
│                                                                          │
│  <style id="ei-ghl-composer-fix">                                       │
│    textarea.native-textarea.sc-ion-textarea-ios {                       │
│      background: hsla(0, 0%, 12%, 0.95) !important;                    │
│      color: hsla(40, 10%, 91%, 0.95) !important;                       │
│      caret-color: hsla(40, 10%, 91%, 0.95) !important;                 │
│    }                                                                     │
│    button.live-chat-send-button {                                       │
│      background-color: hsla(42, 76%, 55%, 0.95) !important;            │
│    }                                                                     │
│    button.live-chat-send-button svg {                                   │
│      stroke: hsla(0, 0%, 5%, 0.95) !important;                         │
│    }                                                                     │
│  </style>                                                                │
│                                                                          │
│  <textarea class="native-textarea sc-ion-textarea-ios">                 │
│    (now styled with theme colors)                                       │
│  </textarea>                                                             │
│                                                                          │
│  <button class="live-chat-send-button">                                 │
│    <svg>...</svg>  (now visible with theme colors)                      │
│  </button>                                                               │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Why This Architecture?

### Problem
GHL widgets use shadow DOM, which encapsulates styles. External CSS cannot reach elements inside shadow DOM.

### Solution
1. **Store config in DB** → Admin can edit without code changes  
2. **Bake into CSS vars at publish** → No runtime DB calls in production (SSG-compatible)  
3. **Read via getComputedStyle** → CSS vars are accessible from JS  
4. **Inject into shadow DOM** → Create `<style>` element inside the shadow root  

### Why Not Just Inline Styles?
GHL owns the DOM elements. We can't add `style` attributes to their elements. But we CAN append `<style>` elements to their shadow roots, which then cascade to their elements.

### Why Retries?
GHL mounts shadow DOM lazily and asynchronously. The textarea/button may not exist when the widget first loads. Retries at 250ms, 750ms, 1500ms, and 2500ms catch different loading scenarios.

---

## Files Reference

| File                                         | Purpose                                  |
|----------------------------------------------|------------------------------------------|
| `src/pages/admin/Themes.tsx`                  | Admin UI for editing ghl_chat_config     |
| `src/lib/ghlLoader.ts`                        | Shadow DOM traversal + style injection   |
| `src/components/GHLChatWidget.tsx`            | Orchestrates injection after consent     |
| `src/index.css`                               | Contains --ghl-* CSS variables (baked at publish) |
| `supabase/functions/sync-theme-to-github/index.ts` | Pushes CSS to GitHub                      |
| DB: `site_themes.ghl_chat_config`             | Source of truth for widget styling       |
| DB: `published_theme_configs.config_css`      | Stores generated CSS for deploy          |
