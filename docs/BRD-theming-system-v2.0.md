# BRD: Dynamic Theming System

**Version:** 2.0  
**Date:** 2026-02-10 (Updated: 2026-02-11)  
**Status:** Active — Implementation In Progress (Batches 1–5 Complete, ADA Batches 1–2 Complete, Batch 6 Open)
**Supersedes:** BRD v1.0 (2025-06-19)

---

## 1. Executive Summary

Migrate from a partially-static theme system to a **fully dynamic, admin-controlled design token architecture** where every visual element of the site is configurable from the database. The system follows the **W3C Design Tokens Community Group (DTCG) three-tier model** adapted for a static-bake SSG pipeline.

### 1.1 Reference Pattern

> **Three-Tier Design Token Architecture** — an industry-standard pattern used by Salesforce Lightning, IBM Carbon, Adobe Spectrum, Material Design 3, and shadcn/ui.
>
> - **W3C DTCG Spec:** https://www.designtokens.org/TR/2025.10/format/
> - **shadcn/ui Theming:** https://ui.shadcn.com/docs/theming
> - **Salesforce Lightning Design Tokens:** https://www.lightningdesignsystem.com/design-tokens/

This pattern separates tokens into three layers:

| Layer | Purpose | Example |
|-------|---------|---------|
| **Primitive** | Raw palette values | `indigo-600: 240 70% 60%` |
| **Semantic** | Intent-based mapping | `--accent: var(--indigo-600)` |
| **Component** | Scoped overrides | `--btn-primary-bg: var(--accent)` |

### 1.2 Why This Pattern Fits

- **SSG-Compatible:** Tokens compile to CSS custom properties at build time — zero runtime DB calls
- **Admin-Friendly:** Admins edit semantic/component tokens; primitives are generated algorithmically from base hue
- **Dual-Mode Ready:** Light/dark modes are separate semantic token sets sharing the same primitives
- **Battle-Tested:** Proven at scale by the world's largest design systems

---

## 2. Current State & Gaps

### 2.1 What Works Today (v1.0)

| Feature | Status |
|---------|--------|
| Logo config (Ever/Intent/Streak/Tagline) | ✅ DB-driven, admin CRUD |
| Accent colors (4 tokens) | ✅ DB-driven |
| GHL chat widget colors (9 tokens) | ✅ DB-driven |
| Gradient configs (hero/cta/text) | ✅ DB-driven |
| Static colors (16 tokens) | ✅ DB-driven, dual-mode (light in `static_colors`, dark in `dark_mode_overrides`) |
| Shadows (7 tokens) | ✅ CSS defined, dual-mode |
| Sidebar tokens (7 tokens) | ✅ CSS defined, dual-mode |
| Utility classes (icon-gradients, glow-text, etc.) | ✅ Tokenized (`var(--accent)`, etc.) |
| Typography (font families, sizes) | ✅ CSS vars (`--font-heading`, `--font-body`, `--font-display`) |
| Spacing/radius | ✅ CSS var (`--radius`) |
| Light mode | ✅ Implemented — seeded palette, `:root` = light, `.dark` = dark |
| Multi-theme seeding | ✅ 10 themes seeded |
| Selection color | ✅ Tokenized (`hsl(var(--accent) / 0.3)`) |
| Scrollbar colors | ✅ Tokenized |
| Highlight/success token | ✅ CSS defined (`--highlight`) |
| Intent-blue token | ✅ CSS defined (`--intent-blue`) |
| Gold/e-commerce tokens | ✅ CSS defined (`--gold`, `--gold-hover`, etc.) |
| Animation/transition tokens | ✅ CSS vars (`--transition-smooth/bounce/spring`) |
| Logo text words (Ever/Intent) | ✅ Configurable |

### 2.2 Key Principle Change from v1.0

**v1.0 BRD said:** "Static colors are consistent across themes but editable"  
**v2.0 says:** "There are no static colors. Every color is derived from the theme's base hue for full cohesion, with admin override capability."

---

## 3. Architecture

### 3.1 Three-Tier Token Model

```
┌─────────────────────────────────────────────────┐
│ TIER 1: PRIMITIVE TOKENS                        │
│ Auto-generated from base_hue (H)                │
│ e.g., H 47% 7%, H 25% 27%, H 70% 60%          │
│ Admin rarely touches these directly              │
└───────────────┬─────────────────────────────────┘
                │ maps to
┌───────────────▼─────────────────────────────────┐
│ TIER 2: SEMANTIC TOKENS                         │
│ Intent-based: --background, --accent, --border  │
│ Separate sets for LIGHT and DARK modes          │
│ Admin edits these via color pickers              │
└───────────────┬─────────────────────────────────┘
                │ consumed by
┌───────────────▼─────────────────────────────────┐
│ TIER 3: COMPONENT TOKENS                        │
│ Scoped: --sidebar-bg, --ghl-textarea-bg,        │
│ --checkout-gold, --card-hover-shadow             │
│ Override semantic defaults for specific contexts │
└─────────────────────────────────────────────────┘
```

### 3.2 Static-Bake Pipeline (Unchanged)

```
Admin DB ──► sync-theme-to-github Edge Function ──► Git commit ──► Vercel build ──► Static CSS
```

The pipeline generates TWO CSS blocks:
1. `:root { }` — Light mode semantic + component tokens
2. `.dark { }` — Dark mode semantic + component tokens

The `<html>` element defaults to `class="dark"` (dark-first site). A user-facing sun/moon toggle (`ModeToggle.tsx`) switches modes. ✅ Implemented.

### 3.3 Hue-Derived Primitive Generation

Given a base hue `H` (0–360°), primitives are algorithmically generated:

| Primitive | Dark Mode HSL | Light Mode HSL |
|-----------|---------------|----------------|
| `bg-base` | `H 47% 7%` | `H 20% 98%` |
| `bg-card` | `H 47% 10%` | `0 0% 100%` |
| `bg-muted` | `H 47% 15%` | `H 20% 96%` |
| `bg-secondary` | `H 47% 12%` | `H 20% 94%` |
| `fg-base` | `60 9% 98%` | `H 47% 11%` |
| `fg-muted` | `H 16% 65%` | `H 16% 47%` |
| `border-base` | `H 25% 20%` | `H 20% 88%` |
| `primary` | `H 25% 27%` | `H 47% 11%` |
| `primary-light` | `H 20% 40%` | `H 25% 27%` |
| `accent` | `H 70% 60%` | `H 70% 50%` |
| `accent-hover` | `H 70% 50%` | `H 70% 42%` |
| `accent-glow` | `H 70% 70%` | `H 70% 60%` |
| `ring` | `H 92% 50%` | `H 92% 50%` |

**Override rule:** Admins can override any generated primitive. The algorithm provides defaults; the DB stores final values.

---

## 4. Required Token Inventory

> **Authoritative reference for Phase 7.** Every CSS custom property below MUST be emitted by the publish pipeline. Nothing is hardcoded. This inventory was validated against a full codebase audit on 2026-02-11 (see tracker appendix).

### 4.1 Tier 1 — Primitive Tokens (Auto-Generated)

Primitives are derived algorithmically from `base_hue` (§3.3). Admins rarely edit these directly. They serve as inputs to Tier 2 semantic tokens.

| Primitive Slot | Dark Mode Formula | Light Mode Formula |
|----------------|-------------------|--------------------|
| `bg-base` | `H 47% 7%` | `H 20% 98%` |
| `bg-card` | `H 47% 10%` | `0 0% 100%` |
| `bg-muted` | `H 47% 15%` | `H 20% 96%` |
| `bg-secondary` | `H 47% 12%` | `H 20% 94%` |
| `fg-base` | `60 9% 98%` | `H 47% 11%` |
| `fg-muted` | `H 16% 65%` | `H 16% 47%` |
| `border-base` | `H 25% 20%` | `H 20% 88%` |
| `primary` | `H 25% 27%` | `H 47% 11%` |
| `primary-light` | `H 20% 40%` | `H 25% 27%` |
| `accent` | `H 70% 60%` | `H 70% 50%` |
| `accent-hover` | `H 70% 50%` | `H 70% 42%` |
| `accent-glow` | `H 70% 70%` | `H 70% 60%` |
| `ring` | `H 92% 50%` | `H 92% 50%` |

### 4.2 Tier 2 — Semantic Tokens (Per Mode)

Intent-based tokens consumed by components. Each has a light-mode and dark-mode value stored in `static_colors` and `dark_mode_overrides` respectively.

| CSS Variable | Purpose | Current Status | Audit Notes |
|-------------|---------|----------------|-------------|
| `--background` | Page background | ✅ CSS defined | — |
| `--foreground` | Default text | ✅ CSS defined | — |
| `--card` | Card surfaces | ✅ CSS defined | — |
| `--card-foreground` | Card text | ✅ CSS defined | — |
| `--popover` | Popover surfaces | ✅ CSS defined | — |
| `--popover-foreground` | Popover text | ✅ CSS defined | — |
| `--primary` | Primary surfaces | ✅ CSS defined | — |
| `--primary-light` | Lighter primary variant | ✅ CSS defined | — |
| `--primary-foreground` | Text on primary | ✅ CSS defined | — |
| `--secondary` | Secondary surfaces | ✅ CSS defined | — |
| `--secondary-foreground` | Text on secondary | ✅ CSS defined | — |
| `--muted` | Subdued backgrounds | ✅ CSS defined | — |
| `--muted-foreground` | Subdued text | ✅ CSS defined | — |
| `--accent` | Brand accent | ✅ CSS defined | — |
| `--accent-hover` | Accent hover state | ✅ CSS defined | — |
| `--accent-glow` | Accent glow/highlight | ✅ CSS defined | — |
| `--accent-foreground` | Text on accent | ✅ CSS defined | — |
| `--border` | Default borders | ✅ CSS defined | — |
| `--input` | Form input borders | ✅ CSS defined | — |
| `--ring` | Focus rings | ✅ CSS defined | — |
| `--radius` | Border radius base | ✅ CSS defined | — |
| `--destructive` | Error/danger | ✅ CSS defined | — |
| `--destructive-foreground` | Text on destructive | ✅ CSS defined | — |
| `--highlight` | Success/highlight color | ✅ CSS defined | — |
| `--highlight-foreground` | Text on highlight | ✅ CSS defined | — |
| `--intent-blue` | Logo Intent color (brand) | ✅ CSS defined | — |
| `--secondary-accent` | Secondary brand accent | ✅ CSS defined | — |

### 4.3 Tier 3 — Component Tokens

Scoped tokens that override semantic defaults for specific UI contexts. Stored in `component_tokens` JSONB column.

#### 4.3.1 Gold / E-commerce

| CSS Variable | Purpose | Current Status | Audit Notes |
|-------------|---------|----------------|-------------|
| `--gold` | Checkout/pricing accent | ✅ CSS defined | Default: `39 95% 50%` |
| `--gold-hover` | Gold hover state | ✅ CSS defined | Default: `35 95% 44%` |
| `--gold-glow` | Gold glow effect | ✅ CSS defined | Default: `39 95% 60%` |
| `--gold-foreground` | Text on gold | ✅ CSS defined | Default: `0 0% 100%` |

#### 4.3.2 Sidebar

| CSS Variable | Purpose | Current Status |
|-------------|---------|----------------|
| `--sidebar-background` | Sidebar bg | ✅ CSS defined |
| `--sidebar-foreground` | Sidebar text | ✅ CSS defined |
| `--sidebar-primary` | Sidebar primary | ✅ CSS defined |
| `--sidebar-primary-foreground` | Text on sidebar primary | ✅ CSS defined |
| `--sidebar-accent` | Sidebar accent bg | ✅ CSS defined |
| `--sidebar-accent-foreground` | Text on sidebar accent | ✅ CSS defined |
| `--sidebar-border` | Sidebar borders | ✅ CSS defined |
| `--sidebar-ring` | Sidebar focus rings | ✅ CSS defined |

#### 4.3.3 GHL Chat Widget

| CSS Variable | Purpose | Current Status |
|-------------|---------|----------------|
| `--ghl-textarea-bg` | Chat input bg | ✅ CSS defined, DB-driven |
| `--ghl-textarea-text` | Chat input text | ✅ CSS defined, DB-driven |
| `--ghl-textarea-border` | Chat input border | ✅ CSS defined, DB-driven |
| `--ghl-textarea-focus-border` | Chat input focus border | ✅ CSS defined, DB-driven |
| `--ghl-textarea-focus-glow` | Chat input focus glow | ✅ CSS defined, DB-driven |
| `--ghl-send-button-bg` | Send button bg | ✅ CSS defined, DB-driven |
| `--ghl-send-button-border` | Send button border | ✅ CSS defined, DB-driven |
| `--ghl-send-button-icon` | Send button icon | ✅ CSS defined, DB-driven |
| `--ghl-selection-bg` | Chat text selection | ✅ CSS defined, DB-driven |

#### 4.3.4 Shadows

| CSS Variable | Purpose | Current Status |
|-------------|---------|----------------|
| `--shadow-sm` | Small shadow | ✅ CSS defined |
| `--shadow-md` | Medium shadow | ✅ CSS defined |
| `--shadow-lg` | Large shadow | ✅ CSS defined |
| `--shadow-xl` | XL shadow | ✅ CSS defined |
| `--shadow-glow` | Accent glow shadow | ✅ CSS defined |
| `--shadow-glow-lg` | Large glow shadow | ✅ CSS defined |
| `--shadow-button` | Button glow shadow | ✅ CSS defined |

#### 4.3.5 Gradients

| CSS Variable | Purpose | Current Status |
|-------------|---------|----------------|
| `--gradient-hero` | Hero section gradient | ✅ CSS defined |
| `--gradient-text` | Text gradient | ✅ CSS defined |
| `--gradient-cta` | CTA button gradient | ✅ CSS defined |
| `--gradient-glow` | Radial glow overlay | ✅ CSS defined |
| `--gradient-mesh` | Mesh background | ✅ CSS defined |

#### 4.3.6 Selection & Scrollbar

| CSS Variable / Pseudo | Purpose | Current Status | Audit Notes |
|----------------------|---------|----------------|-------------|
| `::selection` background | Text selection bg | ⚠️ Hardcoded | `index.css:423` — uses `hsl(240 70% 60% / 0.3)` instead of `hsl(var(--accent) / 0.3)` |
| `::selection` color | Text selection fg | ✅ Tokenized | Uses `hsl(var(--foreground))` |
| Scrollbar track | Scrollbar track bg | ✅ Tokenized | Uses `hsl(var(--muted))` |
| Scrollbar thumb | Scrollbar thumb | ✅ Tokenized | Uses `hsl(var(--muted-foreground) / 0.5)` |
| Scrollbar thumb hover | Scrollbar thumb:hover | ✅ Tokenized | Uses `hsl(var(--muted-foreground) / 0.7)` |

#### 4.3.7 Icon Gradients (Utility Classes)

| CSS Class | Purpose | Current Status | Audit Notes |
|-----------|---------|----------------|-------------|
| `.icon-gradient-ocean` | Industry icon styling | ⚠️ Hardcoded | `index.css:153` — `hsl(210 100% 45%)` / `hsl(195 100% 50%)`. Must derive from theme or become component token. |
| `.icon-gradient-royal` | Industry icon styling | ⚠️ Hardcoded | `index.css:160` — `hsl(230 80% 55%)` / `hsl(200 100% 60%)` |
| `.icon-gradient-sky` | Industry icon styling | ⚠️ Hardcoded | `index.css:167` — `hsl(200 85% 50%)` / `hsl(180 70% 55%)` |
| `.icon-gradient-electric` | Industry icon styling | ⚠️ Hardcoded | `index.css:174` — `hsl(220 90% 55%)` / `hsl(190 95% 45%)` |
| `.glow-text` | Text glow effect | ⚠️ Hardcoded | `index.css:189` — `hsl(240 70% 60% / 0.5)`. Should use `hsl(var(--accent) / 0.5)` |
| `.text-gradient-light` | Light text gradient | ⚠️ Partial | `index.css:146` — first stop `hsl(60 9% 98%)` hardcoded, second stop tokenized |

#### 4.3.8 Keyframe Animations

| Keyframe | Current Status | Audit Notes |
|----------|----------------|-------------|
| `pulse-glow` | ⚠️ Hardcoded | `tailwind.config.ts:158-159` — `hsl(42 76% 55% / 0.2)` and `0.4`. Should use `var(--gold)` or `var(--accent)` |

#### 4.3.9 Hardcoded Component Colors (TSX Files)

| File | Hardcoded Value | Required Fix |
|------|----------------|--------------|
| `CaseStudyLayout.tsx` | `bg-[#0D0D0D]` | Replace with `bg-background` or `bg-card` |
| `AIEmployee.tsx` | Inline HSL gradients in SVG defs | Extract to component tokens or Style Module |
| `FrontOffice.tsx` | Inline HSL gradients in SVG defs | Extract to component tokens or Style Module |
| `SocialProofBar.tsx` | SVG `<linearGradient>` with hardcoded stops | Extract to component tokens |
| `Industries.tsx` | SVG `<linearGradient>` with hardcoded stops | Extract to component tokens |

### 4.4 Typography Tokens

| CSS Variable | Purpose | Default | Current Status |
|-------------|---------|---------|----------------|
| `--font-heading` | Heading font family | `'Space Grotesk'` | ✅ CSS var defined in `:root` |
| `--font-body` | Body font family | `'Inter'` | ✅ CSS var defined in `:root` |
| `--font-mono` | Code font family | `'JetBrains Mono'` | ❌ Not yet a CSS var |

### 4.5 Motion Tokens

| CSS Variable | Purpose | Default | Current Status |
|-------------|---------|---------|----------------|
| `--transition-smooth` | Standard easing | `0.3s cubic-bezier(0.4, 0, 0.2, 1)` | ✅ CSS variable defined in `:root` |
| `--transition-bounce` | Playful easing | `0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)` | ✅ CSS variable defined in `:root` |
| `--transition-spring` | Springy easing | `0.5s cubic-bezier(0.34, 1.56, 0.64, 1)` | ✅ CSS variable defined in `:root` |

### 4.6 Intentional Exemptions

The following files contain hardcoded colors that are **intentionally excluded** from the token system. They simulate third-party UIs or specific client brand identities and must NOT be tokenized:

| File | Reason |
|------|--------|
| `AlexanderTreeMockup.tsx` | Client brand mockup |
| `ClearviewDentistryAustinMockup.tsx` | Client brand mockup |
| `DesertCoolAirMockup.tsx` | Client brand mockup |
| `HonestWrenchAutoMockup.tsx` | Client brand mockup |
| `RiverstoneInteractiveMockup.tsx` | Client brand mockup |
| `SMSDemo.tsx` | iMessage/Android native UI simulation |
| `RealisticDashboards.tsx` | Third-party dashboard simulation |
| `TranscriptCard.tsx` | Call transcript UI simulation |

---

## 5. Database Schema Changes

### 5.1 `site_themes` — Expanded JSONB Columns

The existing `site_themes` table structure remains. The JSONB column contents expand:

#### `static_colors` → Renamed conceptually to "Semantic Tokens (Light Mode)"

Stores ALL light-mode semantic tokens. Existing keys preserved, new keys added:

```jsonc
{
  // EXISTING (preserved)
  "background": "H 20% 98%",
  "foreground": "H 47% 11%",
  "card": "0 0% 100%",
  "cardForeground": "H 47% 11%",
  "popover": "0 0% 100%",
  "popoverForeground": "H 47% 11%",
  "primary": "H 47% 11%",
  "primaryLight": "H 25% 27%",
  "primaryForeground": "0 0% 100%",
  "secondary": "H 20% 94%",
  "secondaryForeground": "H 47% 11%",
  "muted": "H 20% 96%",
  "mutedForeground": "H 16% 47%",
  "border": "H 20% 88%",
  "input": "H 20% 88%",
  "ring": "H 92% 50%",
  
  // NEW
  "destructive": "0 62% 50%",
  "destructiveForeground": "0 0% 100%",
  "highlight": "82 84% 50%",
  "highlightForeground": "H 47% 11%",
  "radius": "0.75rem"
}
```

#### `dark_mode_overrides` → "Semantic Tokens (Dark Mode)"

Stores ALL dark-mode semantic tokens (complete set, not just overrides):

```jsonc
{
  "background": "H 47% 7%",
  "foreground": "60 9% 98%",
  "card": "H 47% 10%",
  "cardForeground": "60 9% 98%",
  "popover": "H 47% 10%",
  "popoverForeground": "60 9% 98%",
  "primary": "H 25% 27%",
  "primaryLight": "H 20% 40%",
  "primaryForeground": "0 0% 100%",
  "secondary": "H 47% 12%",
  "secondaryForeground": "60 9% 98%",
  "muted": "H 47% 15%",
  "mutedForeground": "H 16% 65%",
  "border": "H 25% 20%",
  "input": "H 25% 20%",
  "ring": "H 92% 50%",
  "destructive": "0 62% 30%",
  "destructiveForeground": "60 9% 98%",
  "highlight": "82 84% 67%",
  "highlightForeground": "H 47% 11%",
  "radius": "0.75rem"
}
```

#### New JSONB Column: `component_tokens`

```sql
ALTER TABLE site_themes ADD COLUMN component_tokens JSONB NOT NULL DEFAULT '{}';
```

Stores Tier 3 tokens:

```jsonc
{
  "sidebar": {
    "background": "H 47% 9%",
    "foreground": "60 9% 98%",
    "primary": "H 70% 60%",
    "primaryForeground": "0 0% 100%",
    "accent": "H 47% 15%",
    "accentForeground": "60 9% 98%",
    "border": "H 25% 20%",
    "ring": "H 70% 60%"
  },
  "gold": {
    "base": "39 95% 50%",
    "hover": "35 95% 44%",
    "foreground": "H 47% 11%",
    "glow": "39 95% 50%"
  },
  "shadows": {
    "sm": "0 1px 2px 0 hsl(0 0% 0% / 0.3)",
    "md": "0 4px 6px -1px hsl(0 0% 0% / 0.4), 0 2px 4px -2px hsl(0 0% 0% / 0.3)",
    "lg": "0 10px 15px -3px hsl(0 0% 0% / 0.4), 0 4px 6px -4px hsl(0 0% 0% / 0.3)",
    "xl": "0 20px 25px -5px hsl(0 0% 0% / 0.4), 0 8px 10px -6px hsl(0 0% 0% / 0.3)",
    "glow": "0 0 40px hsl(H 70% 60% / 0.25)",
    "glowLg": "0 0 60px hsl(H 70% 60% / 0.35)",
    "button": "0 4px 14px 0 hsl(H 70% 60% / 0.3)"
  },
  "gradients": {
    "hero": "linear-gradient(...)",
    "text": "linear-gradient(...)",
    "cta": "linear-gradient(...)",
    "glow": "radial-gradient(...)",
    "mesh": "radial-gradient(...)"
  },
  "scrollbar": {
    "track": "var(--muted)",
    "thumb": "var(--muted-foreground) / 0.5",
    "thumbHover": "var(--muted-foreground) / 0.7"
  },
  "selection": {
    "background": "H 70% 60% / 0.3",
    "color": "var(--foreground)"
  }
}
```

#### New JSONB Column: `typography_config`

```sql
ALTER TABLE site_themes ADD COLUMN typography_config JSONB NOT NULL DEFAULT '{
  "fontHeading": "Space Grotesk",
  "fontBody": "Inter",
  "fontMono": "JetBrains Mono"
}';
```

### 5.2 No Schema Breaking Changes

- `static_colors` column name stays (backward compatible)
- `dark_mode_overrides` column name stays
- `gradient_configs` is subsumed into `component_tokens.gradients` but old column preserved for backward compat during migration
- Two new columns added: `component_tokens`, `typography_config`

---

## 6. Logo System (Unchanged from v1.0)

Logo configuration remains in `logo_versions` table with the existing structure:

- **Ever Config** — text element (size, weight, color, gradient, offset)
- **Intent Config** — text element (same structure, `-1px` vertical offset for alignment)
- **Streak Config** — tapered SVG underline (length, thickness, gradient)
- **Tagline Config** — text element (size, weight, color, margin)
- **Tagline Text** — configurable string (e.g., "Web Design & Practical AI")
- **Logo Word Text** — "Ever" and "Intent" are now configurable words

Logo renders via `<LogoRenderer />` component using inline CSS (not Tailwind) for export compatibility.

---

## 7. Dual-Mode CSS Generation

### 7.1 Output Format

The `sync-theme-to-github` edge function generates:

```css
@layer base {
  :root {
    /* Light Mode — Semantic Tokens */
    --background: 240 20% 98%;
    --foreground: 240 47% 11%;
    /* ... all semantic tokens ... */
    
    /* Component Tokens (shared or light-specific) */
    --sidebar-background: 240 20% 96%;
    /* ... */
    
    /* Typography */
    --font-heading: 'Space Grotesk';
    --font-body: 'Inter';
    
    /* Radius */
    --radius: 0.75rem;
  }
  
  .dark {
    /* Dark Mode — Semantic Token Overrides */
    --background: 240 47% 7%;
    --foreground: 60 9% 98%;
    /* ... all dark semantic tokens ... */
    
    /* Component Tokens (dark-specific) */
    --sidebar-background: 240 47% 9%;
    /* ... */
  }
}
```

### 7.2 Default Mode — ✅ IMPLEMENTED

`<html class="dark">` is the default. User-facing `ModeToggle.tsx` (sun/moon icon in header + mobile menu) switches modes. FOUC prevention script in `<head>` reads `localStorage('theme-mode')`. `applyThemeToRoot()` is mode-aware and re-applies correct color set on toggle.

### 7.3 Utility Classes

All utility classes in `index.css` (`glow-text`, `icon-gradient-*`, `nav-link`, etc.) must reference CSS custom properties, never hardcoded HSL values. The publish pipeline generates these utilities from the theme's component tokens.

**Before (hardcoded — bad):**
```css
.glow-text { text-shadow: 0 0 40px hsl(240 70% 60% / 0.5); }
```

**After (token-driven — good):**
```css
.glow-text { text-shadow: 0 0 40px hsl(var(--accent-glow) / 0.5); }
```

---

## 8. 10-Theme Seed Data

### 8.1 Theme Profiles

All themes are algorithmically generated from their base hue using the primitive generation table in §3.3. Accent lock is ON by default (accent hue = base hue).

| # | Name | Base Hue | Accent Lock | Notes |
|---|------|----------|-------------|-------|
| 1 | **Indigo Night** | 240° | On | Current production theme |
| 2 | **Ocean Blue** | 200° | On | Cool, professional |
| 3 | **Teal** | 175° | On | Modern healthcare/tech |
| 4 | **Emerald** | 160° | On | Growth, nature |
| 5 | **Forest** | 140° | On | Organic, grounded |
| 6 | **Royal Purple** | 270° | On | Premium, creative |
| 7 | **Magenta** | 320° | On | Bold, fashion-forward |
| 8 | **Crimson** | 350° | On | Urgent, energetic |
| 9 | **Sunset Orange** | 25° | On | Warm, approachable |
| 10 | **Slate Blue** | 220° | On | Corporate, trustworthy |

### 8.2 Seed Logic

For each theme, the seed SQL will:
1. Generate all dark-mode semantic tokens by substituting `H` in the primitive table
2. Generate all light-mode semantic tokens by substituting `H`
3. Generate component tokens (shadows, gradients, sidebar) using the same hue
4. Copy GHL chat config with hue-shifted accent
5. Set Indigo Night (240°) as `is_active = true`
6. Link all themes to the same default `logo_version_id` (logo color stays independent)

### 8.3 Gold/E-commerce Tokens

Gold tokens (`--gold`, `--gold-hover`, etc.) are **independent of base hue** by default. They represent a fixed e-commerce visual language. Admins can override per theme.

Default: `39 95% 50%` (vibrant gold) — consistent across all 10 themes.

---

## 9. Accent Lock Behavior (Updated)

### 9.1 Lock Scope Expanded

**v1.0:** Lock only affected accent colors (4 tokens)  
**v2.0:** Lock affects:

| When Locked | Behavior |
|-------------|----------|
| Accent (4 tokens) | Derived from base hue |
| Ring | Derived from base hue |
| Gradients (hero, cta, text, glow, mesh) | Hue-shifted automatically |
| Shadows (glow, glow-lg, button) | Hue-shifted automatically |
| Sidebar accent tokens | Derived from base hue |
| GHL chat accent tokens | Derived from base hue |
| Selection color | Derived from base hue |

When **unlocked**, each group becomes independently editable.

### 9.2 What Lock Does NOT Affect

- Gold/e-commerce tokens (always independent)
- Typography tokens
- Destructive/error tokens
- Highlight/success tokens
- Base semantic colors (background, foreground, card, etc.) — these are always tied to base hue
- Logo colors (managed separately in `logo_versions`)

---

## 10. Admin UI Requirements

### 10.1 Theme Editor Layout

```
┌─────────────────────────────────────────────────┐
│ Theme: [Indigo Night ▼]  Version: 3  [+ New]   │
├──────────────────────┬──────────────────────────┤
│ EDIT PANEL           │ LIVE PREVIEW             │
│                      │                          │
│ ▸ Base Hue (slider)  │  [Dark]  [Light] toggle  │
│ ▸ Semantic Colors    │                          │
│ ▸ Accent Colors 🔒   │  ┌──────────────────┐   │
│ ▸ Component Tokens   │  │ Preview renders  │   │
│ ▸ Gradients          │  │ logo + page      │   │
│ ▸ Shadows            │  │ sections with    │   │
│ ▸ Typography         │  │ current edits    │   │
│ ▸ Gold/E-commerce    │  └──────────────────┘   │
│ ▸ GHL Chat Widget    │                          │
│                      │                          │
│ [Save Draft]         │ [Publish to Production]  │
└──────────────────────┴──────────────────────────┘
```

### 10.2 Key Interactions

- **Base Hue Slider:** When moved, auto-regenerates ALL hue-dependent tokens in real-time preview
- **Lock Toggle (🔒):** Locks/unlocks accent-derived token groups
- **Color Pickers:** HSL color picker with hex input for every editable token
- **Mode Toggle:** Switch preview between light/dark to verify both token sets
- **Publish:** Generates CSS + themes.ts, pushes to GitHub via edge function

---

## 11. Light/Dark Mode Toggle (User-Facing)

### 11.1 Requirement

A **user-facing light/dark mode switch** must be visible on every page. This is NOT an admin-only preview feature — it is a core UX control.

### 11.2 Behavior

| Aspect | Specification |
|--------|---------------|
| **Default** | Dark mode (`<html class="dark">`) |
| **Persistence** | `localStorage` key `theme-mode` with values `light` \| `dark` \| `system` |
| **System Preference** | When set to `system`, respects `prefers-color-scheme` media query |
| **SSG Safety** | Toggle script must be inlined in `<head>` (before paint) to prevent FOUC. No React hydration dependency. |
| **Location** | Header bar — icon toggle (sun/moon) next to nav |
| **Mobile** | Accessible from mobile hamburger menu AND bottom bar |

### 11.3 Implementation

```html
<!-- Inline in index.html <head> to prevent FOUC -->
<script>
  (function() {
    const stored = localStorage.getItem('theme-mode');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = stored === 'dark' || (!stored && prefersDark) || stored === null;
    if (isDark) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  })();
</script>
```

### 11.4 Admin Control — Default Mode Setting

Each theme stores a **`defaultMode`** field (`"dark"` | `"light"` | `"system"`) in the database. This determines the site's default appearance when no user preference is stored in `localStorage`.

```jsonc
// In site_themes table — new field or nested in existing config
{
  "defaultMode": "dark"  // "dark" | "light" | "system"
}
```

The inline `<head>` script checks `localStorage` first; if absent, falls back to the theme's `defaultMode`. Admin can set this per theme in the theme editor.

```html
<script>
  (function() {
    var stored = localStorage.getItem('theme-mode');
    var themeDefault = '{{THEME_DEFAULT_MODE}}'; // Baked at build time
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var mode = stored || themeDefault || 'dark';
    var isDark = mode === 'dark' || (mode === 'system' && prefersDark);
    if (isDark) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  })();
</script>
```

---

## 12. ADA Accessibility Module

### 12.1 Requirement

An **admin-managed accessibility module** that ensures WCAG 2.1 AA compliance across all 10 themes, with user-facing controls for common accommodations. The widget follows the **Elementor Ally pattern** — a floating button that opens a panel, with admin controls for visibility, scheduling, and icon customization.

### 12.2 User-Facing Accessibility Widget

A floating accessibility button opens a categorized panel modeled after the **WPOneTap** feature set. Modules are organized into three batches: Content, Color, and Orientation.

#### 12.2.1 Batch 1 — Content Modules (10) ✅ Implemented

| # | Control | Type | CSS Classes | Persistence | Status |
|---|---------|------|-------------|-------------|--------|
| 1 | **Text Size** | Multi (3 levels) | `ada-text-size-1` (112.5%), `ada-text-size-2` (125%), `ada-text-size-3` (150%) | `localStorage` | ✅ |
| 2 | **Line Height** | Multi (3 levels) | `ada-line-height-1` (1.6), `ada-line-height-2` (1.8), `ada-line-height-3` (2.0) | `localStorage` | ✅ |
| 3 | **Letter Spacing** | Multi (3 levels) | `ada-letter-spacing-1` (0.05em), `ada-letter-spacing-2` (0.1em), `ada-letter-spacing-3` (0.15em) | `localStorage` | ✅ |
| 4 | **Bold Text** | Toggle | `ada-bold-text` | `localStorage` | ✅ |
| 5 | **Readable Font** | Toggle | `ada-readable-font` (system sans stack) | `localStorage` | ✅ |
| 6 | **Dyslexia Font** | Toggle | `ada-dyslexia-font` (OpenDyslexic via CDN) | `localStorage` | ✅ |
| 7 | **Text Align** | Cycle (L/C/R) | `ada-align-left`, `ada-align-center`, `ada-align-right` | `localStorage` | ✅ |
| 8 | **Highlight Links** | Toggle | `ada-highlight-links` (underline + yellow bg + outline) | `localStorage` | ✅ |
| 9 | **Text Magnifier** | Toggle | `ada-text-magnifier` (scale 1.3× on hover) | `localStorage` | ✅ |
| 10 | **Big Cursor** | Toggle | `ada-big-cursor` (40×48 SVG cursor) | `localStorage` | ✅ |

**Mutual exclusion:** Readable Font and Dyslexia Font are mutually exclusive — activating one disables the other.

#### 12.2.2 Batch 2 — Color Modules (5) + Orientation Modules (9) — Planned

| # | Control | Type | CSS Class | Status |
|---|---------|------|-----------|--------|
| 11 | **Dark Contrast** | Toggle | `ada-dark-contrast` | ❌ Planned |
| 12 | **Light Contrast** | Toggle | `ada-light-contrast` | ❌ Planned |
| 13 | **High Contrast** | Toggle | `ada-high-contrast` | ✅ CSS exists |
| 14 | **Monochrome** | Toggle | `ada-monochrome` (`grayscale(100%)`) | ❌ Planned |
| 15 | **High Saturation** | Toggle | `ada-high-saturation` (`saturate(200%)`) | ❌ Planned |
| 16 | **Reading Line** | Toggle | `ada-reading-line` | ❌ Planned |
| 17 | **Reading Mask** | Toggle | `ada-reading-mask` | ❌ Planned |
| 18 | **Keyboard Navigation** | Toggle | `ada-keyboard-nav` | ❌ Planned |
| 19 | **Hide Images** | Toggle | `ada-hide-images` | ❌ Planned |
| 20 | **Stop Animations** | Toggle | `ada-reduced-motion` | ✅ CSS exists |
| 21 | **Mute Sounds** | Toggle | `ada-mute-sounds` | ❌ Planned |
| 22 | **Highlight Titles** | Toggle | `ada-highlight-titles` | ❌ Planned |
| 23 | **Highlight Content** | Toggle | `ada-highlight-content` | ❌ Planned |
| 24 | **Focus Highlight** | Toggle | `ada-focus-highlight` | ✅ CSS exists |

#### 12.2.3 Batch 3 — Preset Profiles (5) — ✅ COMPLETE

| Profile | Activates | Status |
|---------|-----------|--------|
| **Vision Impaired** | Text Size 2, Font Weight, High Contrast, Highlight Links, Highlight Titles, Line Height 1 | ✅ |
| **Blind Mode** | Text Size 3, Font Weight, High Contrast, Line Height 2, Letter Spacing 1, Highlight Links, Highlight Titles, Highlight Content, Focus Highlight, Keyboard Nav, Hide Images | ✅ |
| **ADHD Friendly** | Reading Mask, Stop Animations, Mute Sounds, Highlight Titles, Line Height 1 | ✅ |
| **Dyslexia Friendly** | Dyslexia Font, Line Height 2, Letter Spacing 2, Text Size 1, Reading Line, Highlight Links | ✅ |
| **Motor Impaired** | Big Cursor, Text Size 1, Keyboard Nav, Focus Highlight, Highlight Links | ✅ |

**Implementation details:**
- Profiles stored in `ada-active-profile` localStorage key
- Clicking active profile deactivates it (resets all modules)
- Manually toggling any module clears the active profile
- ProfilesSection component renders at top of panel with description text

#### 12.2.4 Batch 4 — Reset All + Accessibility Statement — ✅ COMPLETE

| Feature | Detail | Status |
|---------|--------|--------|
| **Reset All** | Clears all modules + active profile, removes all `ada-*` localStorage keys | ✅ |
| **Accessibility Statement Link** | Footer link in panel pointing to `/legal/accessibility-statement` | ✅ |

#### 12.2.1 Draggable Positioning (Desktop & Mobile)

The widget trigger button is **draggable on all viewports** (desktop and mobile) using pointer events. Users can reposition the button anywhere on screen, and the custom position is persisted in `localStorage` (`ada-widget-position` key) so it survives page reloads and session changes.

| Behavior | Detail |
|----------|--------|
| **Drag mechanism** | Pointer events (`onPointerDown`, `onPointerMove`, `onPointerUp`) with `setPointerCapture` for reliable tracking |
| **Touch suppression** | `preventDefault()` + `stopPropagation()` on pointer events to prevent browser ghost images and scroll interference on mobile |
| **Boundary clamping** | Position is clamped to viewport bounds (accounting for icon size) so the button never goes off-screen |
| **Click vs. drag** | A 3px movement threshold distinguishes intentional drags from taps/clicks — only drags update position, clicks toggle the panel |
| **Default position (desktop)** | Derived from admin `position` config (bottom-right, bottom-left, top-right, top-left) |
| **Default position (mobile)** | Bottom-right, above the mobile navigation bar (`bottom-20`) |
| **z-index** | `9999` — highest on the page, above all other floating elements including the mobile nav bar |
| **Panel attachment** | Panel opens relative to the trigger's current dragged position on desktop; bottom-sheet on mobile |

### 12.3 Widget Visibility & Scheduling (Admin-Controlled)

Inspired by Elementor Ally's device-specific visibility and the common WordPress "pause/hide widget" pattern:

| Admin Control | Options | Behavior |
|---------------|---------|----------|
| **Widget Visibility** | `visible` \| `hidden` \| `paused` | Controls whether the floating button appears |
| **Hide Indefinitely** | Boolean toggle | Widget is completely removed from DOM (not just `display:none`) |
| **Pause for Duration** | Time picker (hours/days) | Widget hidden for set period, auto-restores. Stores `adaWidgetPausedUntil` timestamp in DB. |
| **Device Visibility** | Desktop / Mobile / Both | Toggle widget per device type (like Elementor Ally) |
| **Position** | `bottom-left` \| `bottom-right` \| `top-left` \| `top-right` + custom offset (px) | Where the floating button appears |

#### Scheduling Schema

```jsonc
// In site_themes.component_tokens.accessibility or dedicated column
{
  "widget": {
    "visibility": "visible",       // "visible" | "hidden" | "paused"
    "pausedUntil": null,           // ISO timestamp or null
    "showOnDesktop": true,
    "showOnMobile": true,
    "position": "bottom-right",
    "offsetX": 16,
    "offsetY": 16
  }
}
```

### 12.4 Widget Icon — Configurable Per Theme

Each of the 10 base themes can have a **different accessibility widget icon**. This allows brand-appropriate iconography rather than a one-size-fits-all ♿ symbol.

| Admin Control | Options |
|---------------|---------|
| **Icon Type** | `accessibility` (♿) \| `universal-access` \| `eye` \| `hand` \| `custom-svg` |
| **Icon Color** | HSL color picker (defaults to `--accent-foreground`) |
| **Button Background** | HSL color picker (defaults to `--accent`) |
| **Button Size** | `sm` (40px) \| `md` (48px) \| `lg` (56px) |
| **Button Shape** | `circle` \| `rounded-square` \| `pill` (with label text) |
| **Label Text** | Optional text shown next to icon (pill shape only), e.g., "Accessibility" |

```jsonc
// In site_themes.component_tokens.accessibility
{
  "icon": {
    "type": "universal-access",    // Lucide icon name or "custom-svg"
    "customSvg": null,             // SVG string if type is "custom-svg"
    "color": "0 0% 100%",
    "background": "H 70% 60%",
    "size": "md",
    "shape": "circle",
    "label": null
  }
}
```

### 12.5 Admin Theme Config for ADA

New JSONB column or nested key in `component_tokens`:

```jsonc
{
  "accessibility": {
    "minimumContrastRatio": 4.5,        // WCAG AA default
    "focusRingColor": "H 70% 60%",      // Accent-derived
    "focusRingWidth": "2px",
    "focusRingOffset": "2px",
    "focusRingStyle": "solid",           // solid | dashed | dotted
    "skipNavBackground": "H 47% 11%",
    "skipNavForeground": "0 0% 100%",
    "highContrastOverrides": {           // Applied when user enables high contrast
      "background": "0 0% 0%",
      "foreground": "0 0% 100%",
      "border": "0 0% 100%",
      "accent": "60 100% 50%"
    },
    "widget": {
      "visibility": "visible",
      "pausedUntil": null,
      "showOnDesktop": true,
      "showOnMobile": true,
      "position": "bottom-right",
      "offsetX": 16,
      "offsetY": 16
    },
    "icon": {
      "type": "universal-access",
      "customSvg": null,
      "color": "0 0% 100%",
      "background": "H 70% 60%",
      "size": "md",
      "shape": "circle",
      "label": null
    }
  }
}
```

### 12.6 Built-In Accessibility Requirements (Every Theme)

| Requirement | Spec |
|-------------|------|
| **Skip Navigation** | Hidden link at top of page, visible on focus: "Skip to main content" |
| **ARIA Landmarks** | `<header>`, `<nav>`, `<main>`, `<footer>` with proper roles |
| **Focus Order** | Logical tab order; no focus traps except modals |
| **Color Independence** | Information never conveyed by color alone (icons, patterns, text labels) |
| **Alt Text** | All `<img>` tags require non-empty `alt` (enforced via linting) |
| **Keyboard Navigation** | All interactive elements reachable and operable via keyboard |
| **Screen Reader** | Proper ARIA labels on custom controls (toggles, sliders, modals) |
| **Contrast Validation** | Admin theme editor shows real-time contrast ratio check (pass/fail badge) for fg/bg pairs |

### 12.7 SSG Compatibility

The accessibility widget preferences are applied via CSS classes on `<html>` (e.g., `class="dark ada-text-size-2 ada-bold-text ada-big-cursor"`), loaded from `localStorage` in the same `<head>` script as the theme mode toggle. Multi-level modules store integer values (0–3) and map to specific CSS classes. No hydration mismatch.

---

## 13. Theme Export & Import

### 13.1 Requirement

Themes must be **exportable and importable** as self-documenting JSON files that a human or AI can read, edit, and apply.

### 13.2 Export Format (JSON)

```jsonc
{
  "$schema": "https://everintent.com/schemas/theme-v2.0.json",
  "$version": "2.0",
  "$generator": "EverIntent Theme System",
  "$exported": "2026-02-10T12:00:00Z",
  "$description": "Human-readable theme configuration. Edit any value and re-import.",

  "meta": {
    "name": "Indigo Night",
    "baseHue": 240,
    "accentLockedToBase": true,
    "version": 3,
    "notes": "Production theme — dark-first luxury agency aesthetic"
  },

  "semanticTokens": {
    "light": {
      "background": "240 20% 98%",
      "foreground": "240 47% 11%",
      "card": "0 0% 100%",
      "cardForeground": "240 47% 11%",
      "primary": "240 47% 11%",
      "primaryLight": "240 25% 27%",
      "primaryForeground": "0 0% 100%",
      "secondary": "240 20% 94%",
      "secondaryForeground": "240 47% 11%",
      "muted": "240 20% 96%",
      "mutedForeground": "240 16% 47%",
      "accent": "240 70% 50%",
      "accentHover": "240 70% 42%",
      "accentGlow": "240 70% 60%",
      "accentForeground": "240 47% 11%",
      "border": "240 20% 88%",
      "input": "240 20% 88%",
      "ring": "240 92% 50%",
      "destructive": "0 62% 50%",
      "destructiveForeground": "0 0% 100%",
      "highlight": "82 84% 50%",
      "highlightForeground": "240 47% 11%",
      "radius": "0.75rem"
    },
    "dark": {
      "background": "240 47% 7%",
      "foreground": "60 9% 98%",
      "// ... complete dark token set": ""
    }
  },

  "accentConfig": {
    "accent": "240 70% 60%",
    "accentGlow": "240 70% 70%",
    "accentHover": "240 70% 50%",
    "accentForeground": "222 47% 11%"
  },

  "componentTokens": {
    "sidebar": { "background": "240 47% 9%", "foreground": "60 9% 98%", "...": "" },
    "gold": { "base": "39 95% 50%", "hover": "35 95% 44%", "foreground": "240 47% 11%", "glow": "39 95% 50%" },
    "shadows": { "sm": "...", "md": "...", "lg": "...", "xl": "...", "glow": "...", "glowLg": "...", "button": "..." },
    "gradients": { "hero": "...", "text": "...", "cta": "...", "glow": "...", "mesh": "..." },
    "scrollbar": { "track": "...", "thumb": "...", "thumbHover": "..." },
    "selection": { "background": "...", "color": "..." },
    "accessibility": { "focusRingColor": "...", "focusRingWidth": "2px", "...": "" }
  },

  "effects": {
    "hover": { "scale": 1.02, "transition": "0.2s ease-out", "shadowElevation": "md" },
    "click": { "scale": 0.98, "transition": "0.1s ease-in" },
    "focus": { "ringWidth": "2px", "ringOffset": "2px", "ringColor": "var(--ring)" },
    "cardHover": { "translateY": "-2px", "shadow": "lg", "borderColor": "var(--accent) / 0.3", "transition": "0.3s ease" },
    "buttonHover": { "brightness": 1.1, "shadow": "button", "transition": "0.2s ease" },
    "linkHover": { "color": "var(--accent)", "underlineOffset": "4px", "transition": "0.2s ease" },
    "alertStyles": {
      "info": { "background": "var(--accent) / 0.1", "border": "var(--accent) / 0.3", "icon": "var(--accent)" },
      "success": { "background": "var(--highlight) / 0.1", "border": "var(--highlight) / 0.3", "icon": "var(--highlight)" },
      "warning": { "background": "var(--gold) / 0.1", "border": "var(--gold) / 0.3", "icon": "var(--gold)" },
      "error": { "background": "var(--destructive) / 0.1", "border": "var(--destructive) / 0.3", "icon": "var(--destructive)" }
    },
    "toast": {
      "enterAnimation": "slideInRight 0.3s ease-out",
      "exitAnimation": "fadeOut 0.2s ease-in",
      "successBg": "var(--highlight) / 0.1",
      "errorBg": "var(--destructive) / 0.1"
    }
  },

  "typography": {
    "fontHeading": "Space Grotesk",
    "fontBody": "Inter",
    "fontMono": "JetBrains Mono"
  },

  "ghlChatConfig": {
    "textareaBg": "240 47% 7%",
    "textareaText": "60 9% 98%",
    "// ... full GHL config": ""
  },

  "logoVersionId": "uuid-or-null"
}
```

### 13.3 Export/Import Admin UI

| Action | Location | Behavior |
|--------|----------|----------|
| **Export** | Theme editor toolbar → "Export JSON" button | Downloads `{theme-name}-v{version}.theme.json` |
| **Import** | Theme editor toolbar → "Import JSON" button | File picker → validates schema → creates new theme or updates existing (user chooses) |
| **Validation** | On import | Schema validation with clear error messages for missing/invalid fields |
| **AI-Friendly** | JSON includes `$description` and inline comments via `"// key": "explanation"` pattern | Allows AI agents to read, understand, and generate valid theme files |

### 13.4 Schema Versioning

The `$version` field ensures forward compatibility. Import logic checks version and applies migrations if importing an older format.

---

## 14. Interaction Effects System

### 14.1 Requirement

All interactive states — hover, active/click, focus, disabled, loading — must be **theme-controlled** via design tokens. No hardcoded transition values or hover effects in components.

### 14.2 Effects Token Schema

New nested key in `component_tokens` or standalone JSONB column `effects_config`:

```jsonc
{
  "effects": {
    "transitions": {
      "fast": "0.15s ease",
      "normal": "0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      "slow": "0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
      "bounce": "0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)"
    },

    "hover": {
      "card": {
        "translateY": "-2px",
        "shadow": "var(--shadow-lg)",
        "borderColor": "hsl(var(--accent) / 0.3)",
        "transition": "normal"
      },
      "button": {
        "brightness": 1.1,
        "shadow": "var(--shadow-button)",
        "scale": 1.02,
        "transition": "fast"
      },
      "link": {
        "color": "var(--accent)",
        "textDecoration": "underline",
        "underlineOffset": "4px",
        "transition": "fast"
      },
      "navItem": {
        "background": "hsl(var(--accent) / 0.1)",
        "color": "var(--accent)",
        "transition": "fast"
      },
      "image": {
        "scale": 1.05,
        "brightness": 1.05,
        "transition": "slow"
      }
    },

    "active": {
      "button": { "scale": 0.98, "brightness": 0.95, "transition": "fast" },
      "card": { "scale": 0.99, "transition": "fast" }
    },

    "focus": {
      "ringWidth": "2px",
      "ringOffset": "2px",
      "ringColor": "var(--ring)",
      "ringStyle": "solid",
      "outlineOffset": "2px"
    },

    "disabled": {
      "opacity": 0.5,
      "cursor": "not-allowed",
      "pointerEvents": "none"
    },

    "loading": {
      "spinnerColor": "var(--accent)",
      "skeletonBase": "var(--muted)",
      "skeletonHighlight": "var(--muted-foreground) / 0.1",
      "pulseAnimation": "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite"
    },

    "alerts": {
      "info": {
        "background": "hsl(var(--accent) / 0.1)",
        "border": "hsl(var(--accent) / 0.3)",
        "foreground": "hsl(var(--accent))",
        "icon": "Info"
      },
      "success": {
        "background": "hsl(var(--highlight) / 0.1)",
        "border": "hsl(var(--highlight) / 0.3)",
        "foreground": "hsl(var(--highlight))",
        "icon": "CheckCircle"
      },
      "warning": {
        "background": "hsl(var(--gold) / 0.1)",
        "border": "hsl(var(--gold) / 0.3)",
        "foreground": "hsl(var(--gold))",
        "icon": "AlertTriangle"
      },
      "error": {
        "background": "hsl(var(--destructive) / 0.1)",
        "border": "hsl(var(--destructive) / 0.3)",
        "foreground": "hsl(var(--destructive))",
        "icon": "AlertCircle"
      }
    },

    "toast": {
      "position": "bottom-right",
      "enterAnimation": "slideInRight",
      "exitAnimation": "fadeOut",
      "duration": 5000,
      "variants": {
        "default": { "background": "var(--card)", "foreground": "var(--card-foreground)", "border": "var(--border)" },
        "success": { "background": "hsl(var(--highlight) / 0.1)", "border": "hsl(var(--highlight) / 0.3)" },
        "error": { "background": "hsl(var(--destructive) / 0.1)", "border": "hsl(var(--destructive) / 0.3)" },
        "warning": { "background": "hsl(var(--gold) / 0.1)", "border": "hsl(var(--gold) / 0.3)" }
      }
    },

    "modal": {
      "overlayColor": "0 0% 0% / 0.7",
      "enterAnimation": "fadeIn 0.2s ease-out, scaleIn 0.2s ease-out",
      "exitAnimation": "fadeOut 0.15s ease-in"
    },

    "tooltip": {
      "background": "var(--popover)",
      "foreground": "var(--popover-foreground)",
      "border": "var(--border)",
      "delay": 300,
      "animation": "fadeIn 0.15s ease"
    }
  }
}
```

### 14.3 CSS Output

The publish pipeline emits these as CSS custom properties:

```css
:root {
  /* Transition tokens */
  --transition-fast: 0.15s ease;
  --transition-normal: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  --transition-slow: 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
  --transition-bounce: 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);

  /* Focus tokens */
  --focus-ring-width: 2px;
  --focus-ring-offset: 2px;
  --focus-ring-color: var(--ring);

  /* Alert tokens */
  --alert-info-bg: hsl(var(--accent) / 0.1);
  --alert-info-border: hsl(var(--accent) / 0.3);
  --alert-success-bg: hsl(var(--highlight) / 0.1);
  --alert-success-border: hsl(var(--highlight) / 0.3);
  --alert-warning-bg: hsl(var(--gold) / 0.1);
  --alert-warning-border: hsl(var(--gold) / 0.3);
  --alert-error-bg: hsl(var(--destructive) / 0.1);
  --alert-error-border: hsl(var(--destructive) / 0.3);

  /* Disabled state */
  --disabled-opacity: 0.5;

  /* Loading state */
  --skeleton-base: var(--muted);
  --skeleton-highlight: hsl(var(--muted-foreground) / 0.1);

  /* Modal */
  --overlay-color: hsl(0 0% 0% / 0.7);
}
```

### 14.4 Admin Effects Editor

The admin UI includes an **Effects** panel with:

| Section | Controls |
|---------|----------|
| **Transitions** | Duration slider (0–1s), easing preset dropdown, live preview |
| **Hover Effects** | Per-element-type controls: cards, buttons, links, images, nav |
| **Active/Click** | Scale + brightness sliders |
| **Focus** | Ring width, offset, color picker, style (solid/dashed/dotted) |
| **Alerts** | Color pickers for each variant (info/success/warning/error) |
| **Toasts** | Position dropdown, animation preset, duration slider |
| **Modals** | Overlay opacity slider, animation preset |
| **Disabled/Loading** | Opacity slider, spinner color picker |

---

## 15. Theme Revert to Original (Safety System)

### 15.1 Requirement

Each of the 10 seeded themes has an **immutable snapshot** stored at creation time. Admins can revert any theme to its original seeded state. This is a destructive operation and requires a **two-layer warning system** with an export escape hatch.

### 15.2 Revert Flow

```
Admin clicks "Revert to Original" on theme editor
    │
    ▼
┌─────────────────────────────────────────┐
│ WARNING 1 — Soft Warning                │
│                                         │
│ "You are about to revert [Theme Name]   │
│  to its original seeded state. All      │
│  custom changes will be lost."          │
│                                         │
│ [Cancel]  [Continue to Revert]          │
└─────────────────────┬───────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────┐
│ WARNING 2 — Hard Warning + Export       │
│                                         │
│ "⚠️ FINAL WARNING: This cannot be      │
│  undone. Your current theme will be     │
│  permanently replaced."                 │
│                                         │
│ [Export Current Theme First (JSON)]     │
│                                         │
│ [Cancel]  [Revert — I understand]       │
└─────────────────────────────────────────┘
```

### 15.3 Key Behaviors

| Behavior | Detail |
|----------|--------|
| **Export before revert** | Warning 2 includes a prominent "Export Current Theme First" button that downloads the current (pre-revert) theme as JSON — works whether the theme is active, in-edit, or just being browsed |
| **Scope** | Reverts the theme the admin is currently **viewing/editing** — NOT necessarily the active production theme |
| **Immutable seed** | Original seed data is stored in a `theme_seeds` table or `original_config` JSONB column on `site_themes`, populated at seeding time and never modified |
| **Version bump** | Revert creates a new version entry with changelog note: "Reverted to original seed" |
| **Active theme protection** | If the theme being reverted is the active production theme, Warning 2 adds: "This theme is currently LIVE. Reverting will affect your production site after the next publish." |

### 15.4 Write Current as New Default

Admins can also **overwrite the seed snapshot** for a theme with the current (potentially edited) configuration, making the current state the new "original" for future reverts. This is equally destructive (destroys the previous baseline) and uses the **same two-layer warning system**.

#### 15.4.1 Flow

```
Admin clicks "Set as New Default" on theme editor
    │
    ▼
┌─────────────────────────────────────────┐
│ WARNING 1 — Soft Warning                │
│                                         │
│ "You are about to overwrite the saved   │
│  default for [Theme Name]. The current  │
│  original default will be permanently   │
│  replaced with the current config."     │
│                                         │
│ [Cancel]  [Continue]                    │
└─────────────────────┬───────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────┐
│ WARNING 2 — Hard Warning + Export       │
│                                         │
│ "⚠️ FINAL WARNING: The existing default │
│  snapshot will be permanently replaced. │
│  This cannot be undone."               │
│                                         │
│ [Export Current Default First (JSON)]   │
│                                         │
│ [Cancel]  [Overwrite Default]           │
└─────────────────────────────────────────┘
```

#### 15.4.2 Key Behaviors

| Behavior | Detail |
|----------|--------|
| **Export button** | Warning 2 includes "Export Current Default First" — downloads the **existing seed snapshot** (not the edited theme) so the admin can recover it later via import |
| **Scope** | Operates on whichever theme the admin is currently viewing/editing — does NOT need to be the active production theme |
| **What gets written** | The complete current `site_themes` row config (all JSONB columns) replaces the `theme_seeds.seed_config` (or `original_seed` column) |
| **Audit** | Creates a changelog entry: "Default snapshot overwritten by admin" with timestamp |
| **No publish triggered** | This only changes the saved baseline — it does NOT publish or affect the live site |

### 15.5 Storage

```sql
-- Option A: Dedicated column on site_themes
ALTER TABLE site_themes ADD COLUMN original_seed JSONB;
-- Populated once during seeding, never modified

-- Option B: Dedicated table (preferred for audit trail)
CREATE TABLE theme_seeds (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  theme_id UUID REFERENCES site_themes(id) ON DELETE CASCADE,
  seed_config JSONB NOT NULL,  -- Complete theme config snapshot
  seeded_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(theme_id)
);
```

---

## 16. Component Style Modules (Admin CRUD)

### 16.1 Requirement

A **generic, extensible system** for admins to create and manage custom color/style tokens for any UI component — without requiring code changes or AI prompting. This is the equivalent of Shopify's **section-level Custom CSS** and Elementor's **Global Styles → Custom Selectors**, adapted as a structured token system.

### 16.2 Concept: Style Modules

A **Style Module** is a named collection of design tokens scoped to a specific UI component or element. Modules are stored as entries in a JSONB array on the theme and emitted as CSS custom properties by the publish pipeline.

**Examples of Style Modules an admin might create:**

| Module Name | Target Component | Tokens |
|-------------|-----------------|--------|
| `checkout-progress` | `CheckoutProgress` | `--cpm-circle-bg`, `--cpm-circle-border`, `--cpm-number-color`, `--cpm-active-bg`, `--cpm-completed-bg`, `--cpm-connector-color` |
| `comparison-grid` | `CompareAIEmployee` | `--cgm-grid-line-color`, `--cgm-checkmark-bg`, `--cgm-checkmark-icon`, `--cgm-x-bg`, `--cgm-x-icon`, `--cgm-header-bg` |
| `sms-demo` | `SMSDemo` | `--sdm-outgoing-bg`, `--sdm-incoming-bg`, `--sdm-system-bg`, `--sdm-input-bg`, `--sdm-action-color` |
| `pricing-card` | Pricing cards | `--pcm-featured-border`, `--pcm-featured-bg`, `--pcm-badge-bg`, `--pcm-badge-text` |

### 16.3 Admin CRUD Interface

```
┌─────────────────────────────────────────────────────────┐
│ Style Modules                           [+ New Module]  │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ ▸ checkout-progress (6 tokens)          [Edit] [Delete] │
│ ▸ comparison-grid (6 tokens)            [Edit] [Delete] │
│ ▸ sms-demo (5 tokens)                   [Edit] [Delete] │
│ ▸ pricing-card (4 tokens)               [Edit] [Delete] │
│                                                         │
│ [+ New Module]                                          │
└─────────────────────────────────────────────────────────┘

── Edit Module: checkout-progress ──────────────────────────

Module Name:  [checkout-progress        ]
CSS Prefix:   [--cpm-                   ]  (auto-generated, editable)
Description:  [Checkout step indicator   ]

Tokens:
┌──────────────────┬───────────────┬──────────────┐
│ Token Name       │ Default Value │ Current      │
├──────────────────┼───────────────┼──────────────┤
│ circle-bg        │ var(--muted)  │ [🎨 picker]  │
│ circle-border    │ var(--border) │ [🎨 picker]  │
│ number-color     │ var(--fg)     │ [🎨 picker]  │
│ active-bg        │ var(--accent) │ [🎨 picker]  │
│ completed-bg     │ var(--accent) │ [🎨 picker]  │
│ connector-color  │ var(--border) │ [🎨 picker]  │
├──────────────────┼───────────────┼──────────────┤
│ [+ Add Token]                                   │
└──────────────────────────────────────────────────┘

[Save Module]  [Delete Module]
```

### 16.4 Database Schema

```jsonc
// In site_themes.component_tokens — new "modules" key
{
  "sidebar": { /* ... */ },
  "gold": { /* ... */ },
  "modules": [
    {
      "id": "checkout-progress",
      "name": "Checkout Progress",
      "prefix": "--cpm",
      "description": "Checkout step indicator styling",
      "tokens": {
        "circle-bg": "var(--muted)",
        "circle-border": "var(--border)",
        "number-color": "var(--foreground)",
        "active-bg": "var(--accent)",
        "completed-bg": "var(--accent)",
        "connector-color": "var(--border)"
      }
    },
    {
      "id": "comparison-grid",
      "name": "Comparison Grid",
      "prefix": "--cgm",
      "description": "Feature comparison table elements",
      "tokens": {
        "grid-line-color": "var(--border)",
        "checkmark-bg": "hsl(var(--accent) / 0.25)",
        "checkmark-icon": "var(--accent)",
        "x-bg": "hsl(var(--foreground) / 0.05)",
        "x-icon": "hsl(var(--foreground) / 0.2)",
        "header-bg": "var(--card)"
      }
    }
  ]
}
```

### 16.5 CSS Output

The publish pipeline flattens modules into CSS custom properties:

```css
:root {
  /* Module: checkout-progress */
  --cpm-circle-bg: var(--muted);
  --cpm-circle-border: var(--border);
  --cpm-number-color: var(--foreground);
  --cpm-active-bg: var(--accent);
  --cpm-completed-bg: var(--accent);
  --cpm-connector-color: var(--border);

  /* Module: comparison-grid */
  --cgm-grid-line-color: var(--border);
  --cgm-checkmark-bg: hsl(var(--accent) / 0.25);
  --cgm-checkmark-icon: var(--accent);
  --cgm-x-bg: hsl(var(--foreground) / 0.05);
  --cgm-x-icon: hsl(var(--foreground) / 0.2);
  --cgm-header-bg: var(--card);
}
```

### 16.6 Component Integration Pattern

Components consume module tokens via standard CSS variables with fallbacks:

```tsx
// CheckoutProgress.tsx
<div className="bg-[hsl(var(--cpm-circle-bg,var(--muted)))]">
  <span className="text-[hsl(var(--cpm-number-color,var(--foreground)))]">1</span>
</div>
```

### 16.7 Why This Matters

- **No code changes needed** to add new style tokens for any component
- **No AI prompting needed** — admin creates modules with a form
- **Follows Shopify/Elementor pattern** of section-level custom styling
- **Theme-portable** — modules are included in theme export/import JSON
- **Composable** — modules reference semantic tokens as defaults, maintaining theme cohesion
- **Future-proof** — as new components are added, admins can create matching modules

---

## 17. Demo & Interactive Element Theming

### 17.1 Requirement

All interactive demo elements on the site (SMS mockups, chat simulations, flow diagrams, dashboard previews) must follow theme color tokens. Currently, components like `SMSDemo` use hardcoded iOS-style colors (`#007AFF`, `#3a3a3c`, `#1c1c1e`, `#34C759`) that are completely disconnected from the theme system.

### 17.2 Demo Token Mapping

| Hardcoded Value | Purpose | Theme Token |
|-----------------|---------|-------------|
| `#007AFF` (iOS blue) | Outgoing message bubble, action buttons | `var(--accent)` |
| `#3a3a3c` | Incoming message bubble | `var(--card)` |
| `#1c1c1e` | Phone frame, input bar | `var(--background)` |
| `#000` | Phone screen | Slightly darker than `var(--background)` |
| `#34C759` | Read receipt checkmark | `var(--highlight)` |
| `#007AFF` | Send button | `var(--accent)` |
| `text-blue-400` | "How It Works" step icon | `var(--accent)` |
| `text-green-400` | "How It Works" step icon | `var(--highlight)` |
| `text-purple-400` | "How It Works" step icon | Could become a Style Module token |

### 17.3 Style Module for Demo Elements

Rather than hardcoding the mapping, this is an ideal candidate for a **Style Module** (§16):

```jsonc
{
  "id": "sms-demo",
  "name": "SMS Demo Mockup",
  "prefix": "--sdm",
  "tokens": {
    "outgoing-bg": "var(--accent)",
    "incoming-bg": "var(--card)",
    "frame-bg": "var(--background)",
    "screen-bg": "0 0% 0%",
    "action-color": "var(--accent)",
    "read-receipt": "var(--highlight)",
    "system-badge-bg": "hsl(var(--foreground) / 0.1)",
    "typing-dot": "hsl(var(--foreground) / 0.5)"
  }
}
```

### 17.4 Other Demo Elements to Theme

| Component | File | Hardcoded Colors to Migrate |
|-----------|------|-----------------------------|
| `SMSDemo` | `src/components/ai-employee/SMSDemo.tsx` | iOS blue, iOS gray, iOS green |
| `AnimatedFlowDiagram` | `src/components/ai-employee/AnimatedFlowDiagram.tsx` | TBD — audit needed |
| `DashboardPreview` | `src/components/ai-employee/DashboardPreview.tsx` | TBD — audit needed |
| `TranscriptCard` | `src/components/ai-employee/TranscriptCard.tsx` | TBD — audit needed |
| `HonestWrenchAutoMockup` | `src/components/portfolio/case-study/HonestWrenchAutoMockup.tsx` | TBD — audit needed |
| All portfolio mockups | `src/components/portfolio/case-study/*.tsx` | TBD — audit needed |

---

## 18. Per-Page Theme Assignments (Unchanged)

The `page_theme_assignments` table maps routes to themes. This remains unchanged from v1.0.

```sql
-- Example: Portfolio pages use Ocean Blue theme
INSERT INTO page_theme_assignments (page_route, theme_id) 
VALUES ('/portfolio', '<ocean-blue-theme-id>');
```

---

## 19. Publish Pipeline Changes

### 19.1 `sync-theme-to-github` Edge Function Updates

The edge function must be updated to:

1. **Emit dual-mode CSS:** `:root { }` for light, `.dark { }` for dark
2. **Emit ALL tokens:** semantic + component + typography + motion + effects
3. **Generate utility classes:** All utilities use CSS vars, not hardcoded values
4. **Handle component_tokens JSONB:** Flatten nested structure into CSS vars
5. **Handle typography_config:** Emit `--font-heading`, `--font-body`, `--font-mono`
6. **Handle effects_config:** Emit transition, focus, alert, and state tokens
7. **Generate ADA utility classes:** `.ada-large-text`, `.ada-high-contrast`, `.ada-reduced-motion`, `.ada-dyslexia-font`, `.ada-underline-links`, `.ada-focus-enhanced`
8. **Flatten Style Modules:** Emit `--{prefix}-{token}` for each module in `component_tokens.modules`
9. **Emit ADA widget config:** Visibility, icon, position as CSS vars or data attributes
10. **Bake `defaultMode`:** Inject into `<head>` script template

### 19.2 `themes.ts` Updates

The TypeScript config file must include:
- `darkModeTokens` alongside existing `staticColors`
- `componentTokens` for sidebar, gold, shadows, gradients, **and Style Modules**
- `typographyConfig` for font families
- `effectsConfig` for transitions, hover, alerts, toasts, modals
- `accessibilityConfig` for ADA controls (widget visibility, icon, position)
- `defaultMode` for light/dark default preference

---

## 20. Migration Plan

### Phase 1: Schema & Seed (No Breaking Changes)
1. Add `component_tokens`, `typography_config`, `effects_config`, `default_mode` columns to `site_themes`
2. Add `original_seed` column or `theme_seeds` table for revert functionality
3. Populate `dark_mode_overrides` with full dark token set for existing Indigo Night theme
4. Seed 9 additional themes + store original seeds
5. Update admin UI to expose new fields

### Phase 2: Pipeline Update
1. Update `sync-theme-to-github` to emit dual-mode CSS + effects + ADA tokens + Style Modules
2. Update `themes.ts` generation to include new token groups
3. Refactor `index.css` to eliminate all hardcoded HSL values

### Phase 3: User-Facing Controls
1. Implement light/dark mode toggle (header + mobile) with admin-configurable default
2. Implement ADA accessibility widget (floating button + panel + pause/hide scheduling)
3. Inline `<head>` script for FOUC prevention, localStorage hydration, and ADA class restoration
4. Wire effects tokens into all interactive components

### Phase 4: Admin — Style Modules & Revert
1. Build Style Modules CRUD UI (create/edit/delete modules + tokens)
2. Build theme revert system (2-layer warnings + export escape hatch)
3. Seed initial Style Modules for checkout-progress, comparison-grid, sms-demo

### Phase 5: Export/Import
1. Build theme export (JSON download from admin — including Style Modules)
2. Build theme import (file picker + schema validation + create/update flow)
3. Document JSON schema for AI/human editing

### Phase 6: Component Refactor
1. Audit all components for hardcoded color/transition strings
2. Replace with CSS variable references (including Style Module tokens)
3. Wire alert/toast/modal variants to effects tokens
4. Migrate demo elements (SMSDemo, etc.) to theme tokens / Style Module tokens
5. Verify SSG hydration compatibility

### Phase 7: QA
1. Test all pages in light mode across all 10 themes
2. Test ADA widget visibility/pause/hide in all modes and themes
3. Test ADA icon customization per theme
4. Fix contrast issues
5. Verify accessibility (WCAG AA minimum, AAA for high contrast mode)
6. Export → edit → re-import round-trip test
7. Revert-to-original round-trip test (revert + verify seed restored)

---

## 21. Versioning

### 21.1 Logo Versions (Unchanged)
- Each logo configuration gets a version number
- `is_active` flag for current version
- Changelog notes for documentation

### 21.2 Theme Versions (Unchanged)
- Each theme configuration gets a version number
- Theme references a specific `logo_version_id`
- `published_theme_configs` table stores generated output for rollback

### 21.3 Export Format Versioning
- `$version` field in exported JSON ensures forward compatibility
- Import logic checks version and applies migrations if importing an older format
- Version history: `1.0` (legacy), `2.0` (current — full token + effects + ADA + Style Modules)

---

## 22. Open Items

- [ ] Confirm gold token independence vs. per-theme override strategy
- [ ] Define font loading strategy (Google Fonts CDN vs. self-hosted)
- [ ] ~~Determine if mode toggle should be user-facing or admin-preview only~~ → **RESOLVED: User-facing (§11)**
- [ ] ~~Determine if ADA widget should be always visible~~ → **RESOLVED: Admin-controlled visibility + pause/hide scheduling (§12.3)**
- [ ] Audit all hardcoded icon-gradient utility classes for token migration
- [ ] ~~Define accessibility contrast requirements per mode~~ → **RESOLVED: AA default, AAA via high-contrast toggle (§12)**
- [ ] Host JSON schema at `https://everintent.com/schemas/theme-v2.0.json` for validation
- [ ] Decide on OpenDyslexic font licensing / self-hosting
- [ ] Define max file size for theme JSON import (suggested: 500KB)
- [ ] Determine if per-page theme assignments should also carry per-page effects overrides
- [ ] Define maximum number of Style Modules per theme (suggested: 50)
- [ ] Determine if Style Modules should support light/dark variants or inherit from semantic tokens
- [ ] Audit all demo/mockup components for hardcoded color inventory
- [ ] Define ADA widget icon library (Lucide subset? Full custom SVG upload?)

---

## 23. Appendix: Hardcoded Values Audit

CSS properties in `index.css` that currently use hardcoded HSL values and must be migrated to tokens:

| Line(s) | Property | Hardcoded Value | Target Token |
|---------|----------|-----------------|--------------|
| 47 | `--intent-blue` | `200 100% 50%` | Remove or add to accent config |
| 50 | `--highlight` | `82 84% 67%` | `component_tokens.highlight` |
| 53 | `--destructive` | `0 62% 30%` | `static_colors.destructive` |
| 66-67 | `--gradient-glow`, `--gradient-mesh` | Hardcoded hue 240 | `component_tokens.gradients` |
| 69-77 | `--shadow-*` | Hardcoded hue 240 | `component_tokens.shadows` |
| 79-86 | `--sidebar-*` | Hardcoded hue values | `component_tokens.sidebar` |
| 88-97 | `--ghl-*` | ✅ Already DB-driven | No change needed |
| 152-178 | `.icon-gradient-*` | Hardcoded hue values | `component_tokens.iconGradients` |
| 189 | `.glow-text` | `hsl(240 70% 60% / 0.5)` | Use `var(--accent-glow)` |
| 422-423 | `::selection` | `hsl(240 70% 60% / 0.3)` | `component_tokens.selection` |
| 432-440 | Scrollbar | `var(--muted)` references | ✅ Already tokenized (via semantic) |
| — | All `hover:` transitions | Hardcoded durations | `effects_config.transitions` |
| — | Alert/toast component styles | Hardcoded variant colors | `effects_config.alerts` / `.toasts` |
| — | Modal overlay | Hardcoded `rgba(0,0,0,0.7)` | `effects_config.modal.overlayColor` |
| — | Disabled states | Hardcoded `opacity: 0.5` | `effects_config.disabled.opacity` |

### 23.1 Component Hardcoded Color Audit

| Component | Hardcoded Values | Target |
|-----------|-----------------|--------|
| `SMSDemo` | `#007AFF`, `#3a3a3c`, `#1c1c1e`, `#34C759`, `#000` | Style Module `sms-demo` |
| `AIEmployee` | `text-blue-400`, `text-green-400`, `text-purple-400` | Semantic or Style Module tokens |
| `CompareAIEmployee` | `bg-accent/25`, `text-foreground/20` | ✅ Already tokenized (mostly) |
| `CheckoutProgress` | Uses `bg-primary`, `border-primary` | Could use Style Module for finer control |
| Portfolio mockups | TBD — full audit needed | Style Modules per mockup |

---

## 24. Appendix: Updated Phase 7 Task Breakdown (for Tracker v2.2)

| Task | Description | Deps |
|------|-------------|------|
| 7.1 | Add `component_tokens`, `typography_config`, `effects_config`, `default_mode` columns to `site_themes` | — |
| 7.2 | Add `original_seed` column or `theme_seeds` table for revert system | — |
| 7.3 | Populate Indigo Night `dark_mode_overrides` with full dark token set | 7.1 |
| 7.4 | Build hue-derived primitive generation function (SQL or Edge) | — |
| 7.5 | Seed 9 additional themes using primitive generator + store original seeds | 7.1, 7.2, 7.4 |
| 7.6 | Seed effects_config + ADA widget config defaults for all 10 themes | 7.5 |
| 7.7 | Update `sync-theme-to-github` to emit dual-mode CSS + effects + ADA + Style Modules | 7.1 |
| 7.8 | Update `themes.ts` generation for new token structure + defaultMode | 7.7 |
| 7.9 | Admin: Base hue slider with live preview | 7.1 |
| 7.10 | Admin: Component token editors (sidebar, gold, shadows) | 7.1 |
| 7.11 | Admin: Effects editor panel (transitions, hover, alerts, toasts) | 7.6 |
| 7.12 | Admin: Typography config editor | 7.1 |
| 7.13 | Admin: Style Modules CRUD (create/edit/delete modules + tokens) | 7.1 |
| 7.14 | Admin: Default light/dark mode selector per theme | 7.1 |
| 7.15 | Admin: ADA widget config (visibility, pause/hide scheduling, device toggle) | 7.6 | ✅ Done |
| 7.16 | Admin: ADA icon customizer per theme (icon type, color, size, shape) | 7.15 | ✅ Done |
| 7.17 | Admin: Theme revert to original (2-layer warning + export escape hatch) | 7.2, 7.19 |
| 7.18 | Admin: Real-time contrast checker for fg/bg token pairs | 7.10 |
| 7.19 | Build theme export (JSON download — includes Style Modules) | 7.1 | ✅ Done |
| 7.20 | Build theme import (file upload + validation + create/update) | 7.19 |
| 7.21 | Refactor `index.css` — replace all hardcoded HSL with tokens | 7.7 |
| 7.22 | Refactor `.tsx` components — replace hardcoded colors/transitions | 7.21 |
| 7.23 | Migrate demo elements (SMSDemo, etc.) to theme tokens / Style Modules | 7.13, 7.22 |
| 7.24 | Implement user-facing light/dark mode toggle (header + mobile + `<head>` script) | 7.7 |
| 7.25 | Implement ADA accessibility widget (floating panel + pause/hide + icon + draggable positioning) | 7.7, 7.15 | ✅ Done |
| 7.26 | Wire alert/toast/modal variants to effects tokens | 7.6, 7.22 |
| 7.27 | Seed initial Style Modules (checkout-progress, comparison-grid, sms-demo) | 7.5, 7.13 |
| 7.28 | Full QA: all 10 themes × both modes × ADA states × Style Modules | 7.24, 7.25, 7.27 |
| 7.29 | Export → edit → re-import round-trip validation test | 7.20 |
| 7.30 | Revert-to-original round-trip validation test | 7.17 |
