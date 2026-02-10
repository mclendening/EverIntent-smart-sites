# BRD: Dynamic Theming System

**Version:** 2.0  
**Date:** 2026-02-10  
**Status:** Draft — Pending Owner Approval  
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
| Static colors (16 tokens) | ⚠️ DB-driven but "static" — same values across all themes |
| Shadows (7 tokens) | ❌ Hardcoded in CSS |
| Sidebar tokens (7 tokens) | ❌ Hardcoded in CSS |
| Utility classes (icon-gradients, glow-text, etc.) | ❌ Hardcoded HSL values |
| Typography (font families, sizes) | ❌ Hardcoded in CSS |
| Spacing/radius | ❌ Hardcoded |
| Light mode | ❌ Not supported |
| Multi-theme seeding | ❌ Only 1 theme (Indigo Night) |
| Selection color | ❌ Hardcoded |
| Scrollbar colors | ❌ Hardcoded |
| Highlight/success token | ❌ Hardcoded |
| Intent-blue token | ❌ Hardcoded |
| Gold/e-commerce tokens | ❌ Hardcoded (checkout-specific) |
| Animation/transition tokens | ❌ Hardcoded |
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

The `<html>` element defaults to `class="dark"` (dark-first site). A future toggle can switch modes.

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

## 4. Complete Token Inventory

Every CSS custom property emitted by the publish pipeline. **Nothing is hardcoded.**

### 4.1 Semantic Tokens (Tier 2) — Per Mode

| Token | Current CSS Var | Purpose |
|-------|----------------|---------|
| `--background` | ✅ exists | Page background |
| `--foreground` | ✅ exists | Default text |
| `--card` | ✅ exists | Card surfaces |
| `--card-foreground` | ✅ exists | Card text |
| `--popover` | ✅ exists | Popover surfaces |
| `--popover-foreground` | ✅ exists | Popover text |
| `--primary` | ✅ exists | Primary surfaces |
| `--primary-light` | ✅ exists | Lighter primary variant |
| `--primary-foreground` | ✅ exists | Text on primary |
| `--secondary` | ✅ exists | Secondary surfaces |
| `--secondary-foreground` | ✅ exists | Text on secondary |
| `--muted` | ✅ exists | Subdued backgrounds |
| `--muted-foreground` | ✅ exists | Subdued text |
| `--accent` | ✅ exists | Brand accent |
| `--accent-hover` | ✅ exists | Accent hover state |
| `--accent-glow` | ✅ exists | Accent glow/highlight |
| `--accent-foreground` | ✅ exists | Text on accent |
| `--destructive` | ❌ hardcoded | Error/danger |
| `--destructive-foreground` | ❌ hardcoded | Text on destructive |
| `--border` | ✅ exists | Default borders |
| `--input` | ✅ exists | Form input borders |
| `--ring` | ✅ exists | Focus rings |
| `--radius` | ❌ hardcoded | Border radius base |
| `--highlight` | ❌ hardcoded | Success/highlight color |
| `--highlight-foreground` | ❌ hardcoded | Text on highlight |
| `--intent-blue` | ❌ hardcoded | Logo Intent color (legacy) |

### 4.2 Component Tokens (Tier 3)

| Token Group | Tokens | Status |
|-------------|--------|--------|
| **Sidebar** | `--sidebar-background`, `--sidebar-foreground`, `--sidebar-primary`, `--sidebar-primary-foreground`, `--sidebar-accent`, `--sidebar-accent-foreground`, `--sidebar-border`, `--sidebar-ring` | ❌ hardcoded |
| **GHL Chat** | `--ghl-textarea-bg`, `--ghl-textarea-text`, `--ghl-textarea-border`, `--ghl-textarea-focus-border`, `--ghl-textarea-focus-glow`, `--ghl-send-button-bg`, `--ghl-send-button-border`, `--ghl-send-button-icon`, `--ghl-selection-bg` | ✅ DB-driven |
| **Checkout/E-commerce** | `--gold`, `--gold-hover`, `--gold-foreground`, `--gold-glow` | ❌ hardcoded |
| **Shadows** | `--shadow-sm`, `--shadow-md`, `--shadow-lg`, `--shadow-xl`, `--shadow-glow`, `--shadow-glow-lg`, `--shadow-button` | ❌ hardcoded |
| **Gradients** | `--gradient-hero`, `--gradient-text`, `--gradient-cta`, `--gradient-glow`, `--gradient-mesh` | ⚠️ partial (3 of 5) |
| **Selection** | `::selection` color | ❌ hardcoded |
| **Scrollbar** | `--scrollbar-track`, `--scrollbar-thumb`, `--scrollbar-thumb-hover` | ❌ hardcoded |

### 4.3 Typography Tokens

| Token | Purpose | Default |
|-------|---------|---------|
| `--font-heading` | Heading font family | `'Space Grotesk'` |
| `--font-body` | Body font family | `'Inter'` |
| `--font-mono` | Code font family | `'JetBrains Mono'` |

### 4.4 Motion Tokens

| Token | Purpose | Default |
|-------|---------|---------|
| `--transition-smooth` | Standard easing | `0.3s cubic-bezier(0.4, 0, 0.2, 1)` |
| `--transition-bounce` | Playful easing | `0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)` |
| `--transition-spring` | Springy easing | `0.5s cubic-bezier(0.34, 1.56, 0.64, 1)` |

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

### 7.2 Default Mode

`<html class="dark">` is the default. A future mode toggle can be added without changing the token system.

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

### 11.4 Admin Control

Each theme's admin editor already generates both `:root` (light) and `.dark` (dark) token sets. The toggle simply adds/removes the `.dark` class. No additional admin config needed beyond ensuring both token sets are complete.

---

## 12. ADA Accessibility Module

### 12.1 Requirement

An **admin-managed accessibility module** that ensures WCAG 2.1 AA compliance across all 10 themes, with user-facing controls for common accommodations.

### 12.2 User-Facing Accessibility Widget

A floating accessibility button (♿ icon or equivalent) opens a panel with:

| Control | Function | Persistence |
|---------|----------|-------------|
| **Font Size** | 3 steps: Default, Large (+25%), X-Large (+50%) | `localStorage` |
| **High Contrast** | Increases contrast ratios to WCAG AAA (7:1 min) | `localStorage` |
| **Reduced Motion** | Disables all animations and transitions | `localStorage` + respects `prefers-reduced-motion` |
| **Dyslexia Font** | Switches body font to OpenDyslexic | `localStorage` |
| **Link Underlines** | Forces underlines on all links | `localStorage` |
| **Focus Indicators** | Enhances focus ring visibility (3px solid, high contrast) | `localStorage` |

### 12.3 Admin Theme Config for ADA

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
    }
  }
}
```

### 12.4 Built-In Accessibility Requirements (Every Theme)

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

### 12.5 SSG Compatibility

The accessibility widget preferences are applied via CSS classes on `<html>` (e.g., `class="dark ada-large-text ada-reduced-motion"`), loaded from `localStorage` in the same `<head>` script as the theme mode toggle. No hydration mismatch.

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

## 15. Per-Page Theme Assignments (Unchanged)

The `page_theme_assignments` table maps routes to themes. This remains unchanged from v1.0.

```sql
-- Example: Portfolio pages use Ocean Blue theme
INSERT INTO page_theme_assignments (page_route, theme_id) 
VALUES ('/portfolio', '<ocean-blue-theme-id>');
```

---

## 16. Publish Pipeline Changes

### 16.1 `sync-theme-to-github` Edge Function Updates

The edge function must be updated to:

1. **Emit dual-mode CSS:** `:root { }` for light, `.dark { }` for dark
2. **Emit ALL tokens:** semantic + component + typography + motion + effects
3. **Generate utility classes:** All utilities use CSS vars, not hardcoded values
4. **Handle component_tokens JSONB:** Flatten nested structure into CSS vars
5. **Handle typography_config:** Emit `--font-heading`, `--font-body`, `--font-mono`
6. **Handle effects_config:** Emit transition, focus, alert, and state tokens
7. **Generate ADA utility classes:** `.ada-large-text`, `.ada-high-contrast`, `.ada-reduced-motion`, `.ada-dyslexia-font`, `.ada-underline-links`, `.ada-focus-enhanced`

### 16.2 `themes.ts` Updates

The TypeScript config file must include:
- `darkModeTokens` alongside existing `staticColors`
- `componentTokens` for sidebar, gold, shadows, gradients
- `typographyConfig` for font families
- `effectsConfig` for transitions, hover, alerts, toasts, modals
- `accessibilityConfig` for ADA controls

---

## 17. Migration Plan

### Phase 1: Schema & Seed (No Breaking Changes)
1. Add `component_tokens`, `typography_config`, and `effects_config` columns to `site_themes`
2. Populate `dark_mode_overrides` with full dark token set for existing Indigo Night theme
3. Seed 9 additional themes
4. Update admin UI to expose new fields

### Phase 2: Pipeline Update
1. Update `sync-theme-to-github` to emit dual-mode CSS + effects + ADA tokens
2. Update `themes.ts` generation to include new token groups
3. Refactor `index.css` to eliminate all hardcoded HSL values

### Phase 3: User-Facing Controls
1. Implement light/dark mode toggle (header + mobile)
2. Implement ADA accessibility widget (floating button + panel)
3. Inline `<head>` script for FOUC prevention and localStorage hydration
4. Wire effects tokens into all interactive components

### Phase 4: Export/Import
1. Build theme export (JSON download from admin)
2. Build theme import (file picker + schema validation + create/update flow)
3. Document JSON schema for AI/human editing

### Phase 5: Component Refactor
1. Audit all components for hardcoded color/transition strings
2. Replace with CSS variable references
3. Wire alert/toast/modal variants to effects tokens
4. Verify SSG hydration compatibility

### Phase 6: QA
1. Test all pages in light mode across all 10 themes
2. Test ADA widget in all modes and themes
3. Fix contrast issues
4. Verify accessibility (WCAG AA minimum, AAA for high contrast mode)
5. Export → edit → re-import round-trip test

---

## 18. Versioning

### 18.1 Logo Versions (Unchanged)
- Each logo configuration gets a version number
- `is_active` flag for current version
- Changelog notes for documentation

### 18.2 Theme Versions (Unchanged)
- Each theme configuration gets a version number
- Theme references a specific `logo_version_id`
- `published_theme_configs` table stores generated output for rollback

### 18.3 Export Format Versioning
- `$version` field in exported JSON ensures forward compatibility
- Import logic checks version and applies migrations if importing an older format
- Version history: `1.0` (legacy), `2.0` (current — full token + effects + ADA)

---

## 19. Open Items

- [ ] Confirm gold token independence vs. per-theme override strategy
- [ ] Define font loading strategy (Google Fonts CDN vs. self-hosted)
- [ ] ~~Determine if mode toggle should be user-facing or admin-preview only~~ → **RESOLVED: User-facing (§11)**
- [ ] Audit all hardcoded icon-gradient utility classes for token migration
- [ ] Define accessibility contrast requirements per mode (WCAG AA vs AAA) → **AA default, AAA via high-contrast toggle (§12)**
- [ ] Host JSON schema at `https://everintent.com/schemas/theme-v2.0.json` for validation
- [ ] Decide on OpenDyslexic font licensing / self-hosting
- [ ] Define max file size for theme JSON import (suggested: 500KB)
- [ ] Determine if per-page theme assignments should also carry per-page effects overrides

---

## 20. Appendix: Hardcoded Values Audit

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

---

## 21. Appendix: Updated Phase 7 Task Breakdown (for Tracker v2.2)

| Task | Description | Deps |
|------|-------------|------|
| 7.1 | Add `component_tokens`, `typography_config`, `effects_config` columns to `site_themes` | — |
| 7.2 | Populate Indigo Night `dark_mode_overrides` with full dark token set | 7.1 |
| 7.3 | Build hue-derived primitive generation function (SQL or Edge) | — |
| 7.4 | Seed 9 additional themes using primitive generator | 7.1, 7.3 |
| 7.5 | Seed effects_config defaults for all 10 themes | 7.4 |
| 7.6 | Update `sync-theme-to-github` to emit dual-mode CSS + effects + ADA tokens | 7.1 |
| 7.7 | Update `themes.ts` generation for new token structure | 7.6 |
| 7.8 | Admin: Base hue slider with live preview | 7.1 |
| 7.9 | Admin: Component token editors (sidebar, gold, shadows) | 7.1 |
| 7.10 | Admin: Effects editor panel (transitions, hover, alerts, toasts) | 7.5 |
| 7.11 | Admin: Typography config editor | 7.1 |
| 7.12 | Refactor `index.css` — replace all hardcoded HSL with tokens | 7.6 |
| 7.13 | Refactor `.tsx` components — replace hardcoded colors/transitions | 7.12 |
| 7.14 | Implement user-facing light/dark mode toggle | 7.6 |
| 7.15 | Implement ADA accessibility widget (floating panel + `<head>` script) | 7.6 |
| 7.16 | Admin: ADA config editor + real-time contrast checker | 7.15 |
| 7.17 | Build theme export (JSON download) | 7.1 |
| 7.18 | Build theme import (file upload + validation + create/update) | 7.17 |
| 7.19 | Wire alert/toast/modal variants to effects tokens | 7.5, 7.13 |
| 7.20 | Full QA: all 10 themes × both modes × ADA states | 7.14, 7.15 |
| 7.21 | Export → edit → re-import round-trip validation test | 7.18 |
