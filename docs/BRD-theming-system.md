# BRD: Per-Page Theming System

**Version:** 1.0  
**Date:** 2025-06-19  
**Status:** Approved

---

## 1. Overview

A comprehensive theming system that allows full control over logo appearance and site-wide color schemes, with per-page theme assignment and versioning support.

---

## 2. Logo System

### 2.1 Logo Elements (exact controls from LogoExplorer)

Each logo version stores configuration for 4 elements:

#### Ever Config
- `size` (px)
- `weight` (100-900)
- `marginRight` (px)
- `useGradient` (boolean)
- `solidColor` (hex)
- `gradientFrom` (hex)
- `gradientTo` (hex)
- `gradientAngle` (degrees)
- HSL sliders for solid color (h, s, l)

#### Intent Config
- Same structure as Ever Config
- **This is the BASE COLOR** - all theme derivations start here

#### Streak Config
- `height` (px)
- `width` (px)
- `marginLeft` (px)
- `useGradient` (boolean)
- `solidColor` (hex)
- `gradientFrom` (hex) - should match Intent solid color
- `gradientTo` (hex) - typically white
- `gradientAngle` (degrees)

#### Tagline Config
- `size` (px)
- `weight` (100-900)
- `marginTop` (px)
- `useGradient` (boolean)
- `solidColor` (hex) - typically matches Ever color
- `gradientFrom` (hex)
- `gradientTo` (hex)
- `gradientAngle` (degrees)

### 2.2 Logo Display Method

**Hybrid Approach:**
- Store configurations in database as JSONB
- Render inline SVG via `<LogoRenderer />` component for page display
- Generate PNG exports on-demand via edge function for external use

---

## 3. Theme System

### 3.1 Theme Structure

Each theme is built from:

1. **Base Color (Intent Solid)** - The primary hue that defines the theme
2. **Accent Colors** - Currently gold (`38 92% 50%`), can be:
   - Independent (custom values)
   - Locked to Base (derives from Intent color with same HSL relationships)
3. **Static Colors** - Consistent across themes but editable:
   - Grey-blue family for muted text (`215 16% 47%`)
   - Background colors
   - Border colors (`220 13% 91%`)
   - Foreground text colors

### 3.2 Color Derivation Pattern

When **accent_locked_to_base = true**:
- Take the current gold accent HSL relationships
- Swap the hue to match the Intent base color
- Maintain same saturation/lightness offsets for hover, glow, shadows

### 3.3 Site-Wide Applications

The base color affects:
- Navbar backgrounds/gradients
- Section separators
- Footer gradient
- CTA button gradients (when locked)
- Glow effects and shadows
- Ring/focus colors

### 3.4 Lock Feature

**ONLY applies to accent colors (gold family)**
- When locked: All accent colors derive from Intent base color
- When unlocked: Accent colors are independently configurable
- Static colors are NEVER locked - always independent controls

---

## 4. Versioning

### 4.1 Logo Versions
- Each logo configuration gets a version number
- Track `created_at`, `updated_at`
- Optional `changelog_notes` for documenting changes
- `is_active` flag for current version

### 4.2 Theme Versions
- Each theme configuration gets a version number
- Same versioning structure as logos
- Theme references a specific `logo_version_id`

---

## 5. Database Schema

### 5.1 logo_versions
```sql
id UUID PRIMARY KEY
version INTEGER NOT NULL
name TEXT NOT NULL
ever_config JSONB NOT NULL
intent_config JSONB NOT NULL
streak_config JSONB NOT NULL
tagline_config JSONB NOT NULL
tagline_text TEXT DEFAULT 'Digital Agency'
is_active BOOLEAN DEFAULT false
changelog_notes TEXT
created_at TIMESTAMPTZ
updated_at TIMESTAMPTZ
```

### 5.2 site_themes
```sql
id UUID PRIMARY KEY
version INTEGER NOT NULL
name TEXT NOT NULL
logo_version_id UUID REFERENCES logo_versions
base_hue INTEGER NOT NULL -- The Intent color hue (0-360)
accent_locked_to_base BOOLEAN DEFAULT true
accent_config JSONB NOT NULL -- accent, accent_hover, accent_glow, etc.
static_colors JSONB NOT NULL -- muted, border, background families
gradient_configs JSONB NOT NULL -- hero, text, cta, mesh gradients
is_active BOOLEAN DEFAULT false
changelog_notes TEXT
created_at TIMESTAMPTZ
updated_at TIMESTAMPTZ
```

### 5.3 page_theme_assignments
```sql
id UUID PRIMARY KEY
page_route TEXT NOT NULL UNIQUE
theme_id UUID REFERENCES site_themes
created_at TIMESTAMPTZ
updated_at TIMESTAMPTZ
```

---

## 6. Seed Data (10 Themes)

All themes share identical static colors but different base hues:

| # | Name | Base Hue | Intent Color |
|---|------|----------|--------------|
| 1 | Ocean Blue | 200° | Current default |
| 2 | Teal | 175° | |
| 3 | Emerald | 160° | |
| 4 | Forest | 140° | |
| 5 | Royal Purple | 270° | |
| 6 | Magenta | 320° | |
| 7 | Crimson | 350° | |
| 8 | Sunset Orange | 25° | |
| 9 | Electric Indigo | 240° | |
| 10 | Slate Blue | 220° | |

**Seed Pattern:**
- Intent = solid base hue color at 100% saturation, 50% lightness
- Streak gradient = base color → white
- Ever & Tagline = same neutral color (typically white or dark based on context)
- Accent colors locked to base by default

---

## 7. Admin UI Requirements

- CRUD for logo versions with all LogoExplorer controls
- CRUD for themes with color pickers and lock toggle
- Preview panel showing live logo + theme application
- Version history with ability to revert
- Page assignment interface

---

## 8. Cleanup Tasks

After implementation complete:
- Remove `/logo-explorer` page (or convert to admin-only)
- Move LogoExplorer functionality into admin theme editor
- Clean up any dead code from prototyping phase

---

## 9. Open Questions

- [ ] User to provide purple logo values for seeding
- [ ] Confirm if PNG export edge function is needed for MVP
