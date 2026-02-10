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

## 11. Per-Page Theme Assignments (Unchanged)

The `page_theme_assignments` table maps routes to themes. This remains unchanged from v1.0.

```sql
-- Example: Portfolio pages use Ocean Blue theme
INSERT INTO page_theme_assignments (page_route, theme_id) 
VALUES ('/portfolio', '<ocean-blue-theme-id>');
```

---

## 12. Publish Pipeline Changes

### 12.1 `sync-theme-to-github` Edge Function Updates

The edge function must be updated to:

1. **Emit dual-mode CSS:** `:root { }` for light, `.dark { }` for dark
2. **Emit ALL tokens:** semantic + component + typography + motion
3. **Generate utility classes:** All utilities use CSS vars, not hardcoded values
4. **Handle component_tokens JSONB:** Flatten nested structure into CSS vars
5. **Handle typography_config:** Emit `--font-heading`, `--font-body`, `--font-mono`

### 12.2 `themes.ts` Updates

The TypeScript config file must include:
- `darkModeTokens` alongside existing `staticColors`
- `componentTokens` for sidebar, gold, shadows, gradients
- `typographyConfig` for font families

---

## 13. Migration Plan

### Phase 1: Schema & Seed (No Breaking Changes)
1. Add `component_tokens` and `typography_config` columns to `site_themes`
2. Populate `dark_mode_overrides` with full dark token set for existing Indigo Night theme
3. Seed 9 additional themes
4. Update admin UI to expose new fields

### Phase 2: Pipeline Update
1. Update `sync-theme-to-github` to emit dual-mode CSS
2. Update `themes.ts` generation to include new token groups
3. Refactor `index.css` to eliminate all hardcoded HSL values

### Phase 3: Component Refactor
1. Audit all components for hardcoded color strings
2. Replace with CSS variable references
3. Verify SSG hydration compatibility

### Phase 4: Light Mode QA
1. Test all pages in light mode
2. Fix contrast issues
3. Verify accessibility (WCAG AA minimum)

---

## 14. Versioning

### 14.1 Logo Versions (Unchanged)
- Each logo configuration gets a version number
- `is_active` flag for current version
- Changelog notes for documentation

### 14.2 Theme Versions (Unchanged)
- Each theme configuration gets a version number
- Theme references a specific `logo_version_id`
- `published_theme_configs` table stores generated output for rollback

---

## 15. Open Items

- [ ] Confirm gold token independence vs. per-theme override strategy
- [ ] Define font loading strategy (Google Fonts CDN vs. self-hosted)
- [ ] Determine if mode toggle should be user-facing or admin-preview only
- [ ] Audit all hardcoded icon-gradient utility classes for token migration
- [ ] Define accessibility contrast requirements per mode (WCAG AA vs AAA)

---

## 16. Appendix: Hardcoded Values Audit

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
