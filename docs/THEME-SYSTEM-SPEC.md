# Theme System Technical Specification

**Version:** 2.0  
**Last Updated:** 2026-01-26  
**Status:** Production

---

## Table of Contents

1. [System Overview](#1-system-overview)
2. [Architecture Principles](#2-architecture-principles)
3. [Database Schema](#3-database-schema)
4. [TypeScript Interfaces](#4-typescript-interfaces)
5. [Frontend Components](#5-frontend-components)
6. [Admin UI Implementation](#6-admin-ui-implementation)
7. [Edge Functions](#7-edge-functions)
8. [GitHub Integration](#8-github-integration)
9. [CSS Generation](#9-css-generation)
10. [Deployment Workflow](#10-deployment-workflow)
11. [Secrets Configuration](#11-secrets-configuration)
12. [Seed Data](#12-seed-data)
13. [Troubleshooting](#13-troubleshooting)

---

## 1. System Overview

The theme system provides:

- **Logo Customization:** Full control over logo text, colors, gradients, and positioning
- **Site-Wide Theming:** Accent colors, static colors, gradients, shadows
- **Per-Page Themes:** Assign different themes to different routes
- **GHL Chat Widget Theming:** Custom colors for GoHighLevel chat widget
- **GitHub Deployment:** Automatic push of baked theme config to repository
- **Zero Runtime Overhead:** Production sites use static, pre-baked configuration

### Key Design Decision: Static Baked, Not Runtime

Production sites **never** query the database for theme values. Instead:

1. Admin edits theme in database
2. Admin clicks "Publish to Production"
3. System generates static `themes.ts` and `index.css` files
4. Edge function pushes files to GitHub in a single atomic commit
5. CI/CD deploys the static files

This eliminates:
- Runtime database queries
- Flash of unstyled content (FOUC)
- Theme loading delays
- Database dependency for theming

---

## 2. Architecture Principles

### 2.1 Color Format: HSL Everywhere

All colors are stored and used as HSL strings for consistent manipulation:

```typescript
// Format: "H S% L%" (no commas, space-separated)
const accent = "240 70% 60%";  // Indigo
const background = "222 47% 7%";  // Dark blue-grey
```

### 2.2 Logo Rendering: SVG for Pixel-Perfect Alignment

The logo uses inline CSS styles (not Tailwind) for export compatibility. The streak (underline) uses an SVG polygon for the tapered effect.

**Critical:** The "Intent" text requires a `-1px` vertical offset to achieve pixel-perfect baseline alignment with "Ever" text due to subpixel antialiasing differences across colors.

### 2.3 Two-File Publish

Both `src/config/themes.ts` and `src/index.css` are generated and pushed together in a single Git commit to prevent style inconsistencies.

---

## 3. Database Schema

### 3.1 Table: `logo_versions`

Stores logo design configurations.

```sql
CREATE TABLE public.logo_versions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  version INTEGER NOT NULL DEFAULT 1,
  name TEXT NOT NULL,
  
  -- Logo element configurations (JSONB)
  ever_config JSONB NOT NULL DEFAULT '{
    "size": 72,
    "weight": 700,
    "solidColor": "#FFFFFF",
    "useGradient": false,
    "gradientFrom": "#FFFFFF",
    "gradientTo": "#A855F7",
    "gradientAngle": 135,
    "marginLeft": 0,
    "marginRight": 0,
    "verticalOffset": 0
  }',
  
  intent_config JSONB NOT NULL DEFAULT '{
    "size": 72,
    "weight": 700,
    "solidColor": "#A855F7",
    "useGradient": false,
    "gradientFrom": "#A855F7",
    "gradientTo": "#FFFFFF",
    "gradientAngle": 135,
    "marginLeft": 0,
    "marginRight": 0,
    "verticalOffset": 1
  }',
  
  streak_config JSONB NOT NULL DEFAULT '{
    "length": 373,
    "leftThick": 4,
    "rightThick": 1,
    "solidColor": "#A855F7",
    "useGradient": true,
    "gradientFrom": "#A855F7",
    "gradientTo": "#FBF9F9",
    "gradientAngle": 90,
    "marginLeft": 0,
    "marginRight": 0
  }',
  
  tagline_config JSONB NOT NULL DEFAULT '{
    "size": 29,
    "weight": 400,
    "solidColor": "#FFFFFF",
    "useGradient": false,
    "gradientFrom": "#FFFFFF",
    "gradientTo": "#A855F7",
    "gradientAngle": 135,
    "marginLeft": 0,
    "marginRight": 0,
    "marginTop": 5
  }',
  
  tagline_text TEXT DEFAULT 'Web Design & Automation',
  is_active BOOLEAN DEFAULT false,
  changelog_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- RLS Policies
ALTER TABLE public.logo_versions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view logo versions" ON public.logo_versions
  FOR SELECT USING (true);

CREATE POLICY "Admins can insert logo versions" ON public.logo_versions
  FOR INSERT WITH CHECK (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update logo versions" ON public.logo_versions
  FOR UPDATE USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete logo versions" ON public.logo_versions
  FOR DELETE USING (has_role(auth.uid(), 'admin'));
```

### 3.2 Table: `site_themes`

Stores complete theme configurations.

```sql
CREATE TABLE public.site_themes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  version INTEGER NOT NULL DEFAULT 1,
  name TEXT NOT NULL,
  
  -- Foreign key to logo
  logo_version_id UUID REFERENCES logo_versions(id),
  
  -- Base hue for accent color derivation
  base_hue INTEGER NOT NULL DEFAULT 270,
  
  -- When true, accent colors auto-derive from base_hue
  accent_locked_to_base BOOLEAN DEFAULT true,
  
  -- Accent color configuration
  accent_config JSONB NOT NULL DEFAULT '{
    "accent": "38 92% 50%",
    "accentHover": "32 95% 44%",
    "accentGlow": "38 92% 50%",
    "accentForeground": "222 47% 11%",
    "h": 38,
    "s": 92,
    "l": 50,
    "hoverBrightness": 1.1,
    "iconGlowOpacity": 0.3
  }',
  
  -- Static colors (backgrounds, text, borders)
  static_colors JSONB NOT NULL DEFAULT '{
    "background": "222 47% 7%",
    "foreground": "60 9% 98%",
    "card": "222 47% 10%",
    "cardForeground": "60 9% 98%",
    "popover": "222 47% 10%",
    "popoverForeground": "60 9% 98%",
    "primary": "215 25% 27%",
    "primaryLight": "215 20% 40%",
    "primaryForeground": "0 0% 100%",
    "secondary": "222 47% 12%",
    "secondaryForeground": "60 9% 98%",
    "muted": "222 47% 15%",
    "mutedForeground": "215 16% 65%",
    "border": "215 25% 20%",
    "input": "215 25% 20%",
    "ring": "240 70% 60%"
  }',
  
  -- Gradient configurations
  gradient_configs JSONB NOT NULL DEFAULT '{
    "hero": "linear-gradient(135deg, hsl(222 47% 11%) 0%, hsl(240 30% 18%) 50%, hsl(222 47% 11%) 100%)",
    "cta": "linear-gradient(135deg, hsl(240 70% 60%) 0%, hsl(250 70% 50%) 100%)",
    "text": "linear-gradient(135deg, hsl(240 70% 60%) 0%, hsl(250 70% 70%) 50%, hsl(240 70% 60%) 100%)"
  }',
  
  -- GHL Chat Widget theming
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
  }',
  
  -- Dark mode specific overrides (optional)
  dark_mode_overrides JSONB DEFAULT '{}',
  
  is_active BOOLEAN DEFAULT false,
  changelog_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- RLS Policies
ALTER TABLE public.site_themes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view themes" ON public.site_themes
  FOR SELECT USING (true);

CREATE POLICY "Admins can insert themes" ON public.site_themes
  FOR INSERT WITH CHECK (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update themes" ON public.site_themes
  FOR UPDATE USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete themes" ON public.site_themes
  FOR DELETE USING (has_role(auth.uid(), 'admin'));
```

### 3.3 Table: `page_theme_assignments`

Maps routes to specific themes for per-page theming.

```sql
CREATE TABLE public.page_theme_assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_route TEXT NOT NULL UNIQUE,
  theme_id UUID REFERENCES site_themes(id),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- RLS Policies
ALTER TABLE public.page_theme_assignments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view page assignments" ON public.page_theme_assignments
  FOR SELECT USING (true);

CREATE POLICY "Admins can insert page assignments" ON public.page_theme_assignments
  FOR INSERT WITH CHECK (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update page assignments" ON public.page_theme_assignments
  FOR UPDATE USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete page assignments" ON public.page_theme_assignments
  FOR DELETE USING (has_role(auth.uid(), 'admin'));
```

### 3.4 Table: `published_theme_configs`

Stores generated theme configurations for version history and deployment.

```sql
CREATE TABLE public.published_theme_configs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  version INTEGER NOT NULL DEFAULT 1,
  source_theme_id UUID REFERENCES site_themes(id),
  source_theme_name TEXT NOT NULL,
  
  -- Generated file contents
  config_typescript TEXT NOT NULL,  -- Full themes.ts content
  config_css TEXT,                   -- Full index.css content
  config_json JSONB NOT NULL,        -- Theme as JSON for API access
  
  is_active BOOLEAN DEFAULT false,
  is_default BOOLEAN DEFAULT false,
  notes TEXT,
  created_by UUID,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Auto-increment version function
CREATE OR REPLACE FUNCTION public.get_next_theme_config_version()
RETURNS INTEGER
LANGUAGE SQL
SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT COALESCE(MAX(version), 0) + 1 FROM public.published_theme_configs;
$$;

-- RLS Policies
ALTER TABLE public.published_theme_configs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view published configs" ON public.published_theme_configs
  FOR SELECT USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert published configs" ON public.published_theme_configs
  FOR INSERT WITH CHECK (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update published configs" ON public.published_theme_configs
  FOR UPDATE USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete published configs" ON public.published_theme_configs
  FOR DELETE USING (has_role(auth.uid(), 'admin'));
```

### 3.5 Required Supporting Tables

```sql
-- User roles for admin access control
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Role check function
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;
```

---

## 4. TypeScript Interfaces

### 4.1 Logo Configuration Types

**File:** `src/components/logo/types.ts`

```typescript
/**
 * Text element configuration for Ever/Intent logo text
 */
export interface TextElementConfig {
  size: number;           // Font size in px (12-120)
  weight: number;         // Font weight (300-800)
  solidColor: string;     // Hex color (#FFFFFF)
  useGradient: boolean;   // Toggle gradient vs solid
  gradientFrom: string;   // Gradient start (hex)
  gradientTo: string;     // Gradient end (hex)
  gradientAngle: number;  // Gradient angle (0-360)
  marginLeft: number;     // Left margin in px
  marginRight: number;    // Right margin in px
  verticalOffset: number; // Baseline adjustment (-10 to 10)
}

/**
 * Streak (underline) configuration
 * Creates a tapered line from left to right
 */
export interface StreakConfig {
  length: number;        // Total width in px
  leftThick: number;     // Left edge thickness in px
  rightThick: number;    // Right edge thickness (creates taper)
  solidColor: string;    // Hex color
  useGradient: boolean;  // Toggle gradient vs solid
  gradientFrom: string;  // Gradient start (hex)
  gradientTo: string;    // Gradient end (hex)
  gradientAngle: number; // Gradient angle (0-360)
  marginLeft: number;    // Left margin in px
  marginRight: number;   // Right margin in px
}

/**
 * Tagline text configuration
 */
export interface TaglineConfig {
  size: number;          // Font size in px (8-48)
  weight: number;        // Font weight (300-600)
  solidColor: string;    // Hex color
  useGradient: boolean;  // Toggle gradient vs solid
  gradientFrom: string;  // Gradient start (hex)
  gradientTo: string;    // Gradient end (hex)
  gradientAngle: number; // Gradient angle (0-360)
  marginLeft: number;    // Left margin in px
  marginRight: number;   // Right margin in px
  marginTop: number;     // Distance from streak in px
}

/**
 * Complete logo version configuration
 */
export interface LogoVersionConfig {
  id?: string;
  name: string;
  taglineText: string;
  everConfig: TextElementConfig;
  intentConfig: TextElementConfig;
  streakConfig: StreakConfig;
  taglineConfig: TaglineConfig;
}

// Default configurations
export const defaultEverConfig: TextElementConfig = {
  size: 72,
  weight: 700,
  solidColor: '#FFFFFF',
  useGradient: false,
  gradientFrom: '#FFFFFF',
  gradientTo: '#A855F7',
  gradientAngle: 135,
  marginLeft: 0,
  marginRight: 0,
  verticalOffset: 0,
};

export const defaultIntentConfig: TextElementConfig = {
  size: 72,
  weight: 700,
  solidColor: '#A855F7',
  useGradient: false,
  gradientFrom: '#A855F7',
  gradientTo: '#FFFFFF',
  gradientAngle: 135,
  marginLeft: 0,
  marginRight: 0,
  verticalOffset: 1, // Critical for baseline alignment
};

export const defaultStreakConfig: StreakConfig = {
  length: 373,
  leftThick: 4,
  rightThick: 1,
  solidColor: '#A855F7',
  useGradient: true,
  gradientFrom: '#A855F7',
  gradientTo: '#FBF9F9',
  gradientAngle: 90,
  marginLeft: 0,
  marginRight: 0,
};

export const defaultTaglineConfig: TaglineConfig = {
  size: 29,
  weight: 400,
  solidColor: '#FFFFFF',
  useGradient: false,
  gradientFrom: '#FFFFFF',
  gradientTo: '#A855F7',
  gradientAngle: 135,
  marginLeft: 0,
  marginRight: 0,
  marginTop: 5,
};

export const defaultLogoConfig: LogoVersionConfig = {
  name: 'Default Logo',
  taglineText: 'Web Design & Automation',
  everConfig: defaultEverConfig,
  intentConfig: defaultIntentConfig,
  streakConfig: defaultStreakConfig,
  taglineConfig: defaultTaglineConfig,
};
```

### 4.2 Theme Configuration Types

**File:** `src/config/themes.ts` (generated, but defines types)

```typescript
/**
 * Accent color configuration
 */
export interface AccentConfig {
  accent: string;           // HSL "240 70% 60%"
  accentHover: string;      // HSL for hover state
  accentGlow: string;       // HSL for glow effects
  accentForeground: string; // HSL for text on accent
  h: number;                // Hue (0-360)
  s: number;                // Saturation (0-100)
  l: number;                // Lightness (0-100)
  hoverBrightness?: number; // Brightness multiplier (1.0-1.5)
  iconGlowOpacity?: number; // Glow opacity (0-1.0)
}

/**
 * Static colors (backgrounds, text, borders)
 * All values are HSL strings
 */
export interface StaticColors {
  background: string;
  foreground: string;
  card: string;
  cardForeground: string;
  popover: string;
  popoverForeground: string;
  primary: string;
  primaryLight: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  muted: string;
  mutedForeground: string;
  border: string;
  input: string;
  ring: string;
}

/**
 * Gradient configurations
 * Full CSS gradient strings
 */
export interface GradientConfig {
  hero: string;   // Hero section background
  cta: string;    // Call-to-action buttons
  text: string;   // Gradient text effects
}

/**
 * GHL Chat Widget theming
 * All values are HSL strings
 */
export interface GHLChatConfig {
  textareaBg: string;
  textareaText: string;
  textareaBorder: string;
  textareaFocusBorder: string;
  textareaFocusGlow: string;
  sendButtonBg: string;
  sendButtonBorder: string;
  sendButtonIcon: string;
  selectionBg: string;
}

/**
 * Complete theme configuration
 */
export interface ThemeConfig {
  id: string;
  name: string;
  baseHue: number;
  accentConfig: AccentConfig;
  staticColors: StaticColors;
  gradientConfigs: GradientConfig;
  logoVersionId?: string;
  logoConfig?: {
    taglineText: string;
    everConfig: LogoElementConfig;
    intentConfig: LogoElementConfig;
    streakConfig: StreakElementConfig;
    taglineConfig: TaglineElementConfig;
  };
}

/**
 * Route to theme mapping
 */
export interface RouteThemeMapping {
  route: string;
  themeId: string;
}
```

---

## 5. Frontend Components

### 5.1 LogoRenderer Component

**File:** `src/components/logo/LogoRenderer.tsx`

```typescript
import React, { useMemo } from 'react';
import {
  LogoVersionConfig,
  TextElementConfig,
  StreakConfig,
  TaglineConfig,
  defaultLogoConfig,
} from './types';

interface LogoRendererProps {
  config?: LogoVersionConfig;
  scale?: number;           // Size multiplier (default 1)
  showTagline?: boolean;    // Show/hide tagline
  className?: string;
  accentHsl?: string;       // Override accent color (HSL string)
}

export const LogoRenderer: React.FC<LogoRendererProps> = ({
  config = defaultLogoConfig,
  scale = 1,
  showTagline = true,
  className = '',
  accentHsl,
}) => {
  // Generate unique gradient ID to prevent SVG conflicts
  const gradientId = useMemo(
    () => `streak-gradient-${Math.random().toString(36).substr(2, 9)}`,
    []
  );

  // HSL to Hex converter for accent override
  const hslToHex = (hslStr: string): string => {
    const parts = hslStr.split(' ').map(p => parseFloat(p));
    const h = parts[0] || 0;
    const s = (parts[1] || 0) / 100;
    const l = (parts[2] || 0) / 100;
    
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs((h / 60) % 2 - 1));
    const m = l - c / 2;
    let r = 0, g = 0, b = 0;
    
    if (h < 60) { r = c; g = x; }
    else if (h < 120) { r = x; g = c; }
    else if (h < 180) { g = c; b = x; }
    else if (h < 240) { g = x; b = c; }
    else if (h < 300) { r = x; b = c; }
    else { r = c; b = x; }
    
    const toHex = (n: number) => 
      Math.round((n + m) * 255).toString(16).padStart(2, '0');
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  };

  const accentColor = accentHsl 
    ? hslToHex(accentHsl) 
    : config.intentConfig.solidColor;

  // Text element style generator
  const getTextStyle = (
    cfg: TextElementConfig, 
    isAccent = false
  ): React.CSSProperties => {
    const base: React.CSSProperties = {
      fontSize: cfg.size * scale,
      fontWeight: cfg.weight,
      marginLeft: cfg.marginLeft * scale,
      marginRight: cfg.marginRight * scale,
      position: 'relative',
      top: cfg.verticalOffset * scale,
      lineHeight: 1,
    };

    const color = isAccent && accentHsl ? accentColor : cfg.solidColor;

    if (cfg.useGradient) {
      const from = isAccent && accentHsl ? accentColor : cfg.gradientFrom;
      return {
        ...base,
        background: `linear-gradient(${cfg.gradientAngle}deg, ${from}, ${cfg.gradientTo})`,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
      };
    }

    return { ...base, color };
  };

  // Tagline style generator
  const getTaglineStyle = (cfg: TaglineConfig): React.CSSProperties => {
    const base: React.CSSProperties = {
      fontSize: cfg.size * scale,
      fontWeight: cfg.weight,
      marginLeft: cfg.marginLeft * scale,
      marginRight: cfg.marginRight * scale,
      marginTop: cfg.marginTop * scale,
      display: 'block',
      lineHeight: 1.2,
    };

    if (cfg.useGradient) {
      return {
        ...base,
        background: `linear-gradient(${cfg.gradientAngle}deg, ${cfg.gradientFrom}, ${cfg.gradientTo})`,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
      };
    }

    return { ...base, color: cfg.solidColor };
  };

  // SVG streak renderer (tapered polygon)
  const renderStreak = (cfg: StreakConfig) => {
    const width = cfg.length * scale;
    const maxThickness = Math.max(cfg.leftThick, cfg.rightThick) * scale;
    const leftThick = cfg.leftThick * scale;
    const rightThick = cfg.rightThick * scale;

    const topLeft = (maxThickness - leftThick) / 2;
    const bottomLeft = (maxThickness + leftThick) / 2;
    const topRight = (maxThickness - rightThick) / 2;
    const bottomRight = (maxThickness + rightThick) / 2;

    const points = `0,${topLeft} ${width},${topRight} ${width},${bottomRight} 0,${bottomLeft}`;

    const streakFromColor = accentHsl ? accentColor : cfg.gradientFrom;
    const streakSolidColor = accentHsl ? accentColor : cfg.solidColor;

    return (
      <svg
        width={width}
        height={maxThickness}
        style={{
          marginTop: 8 * scale,
          marginLeft: cfg.marginLeft * scale,
          marginRight: cfg.marginRight * scale,
          display: 'block',
        }}
      >
        <defs>
          {cfg.useGradient && (
            <linearGradient
              id={gradientId}
              gradientTransform={`rotate(${cfg.gradientAngle - 90})`}
            >
              <stop offset="0%" stopColor={streakFromColor} />
              <stop offset="100%" stopColor={cfg.gradientTo} />
            </linearGradient>
          )}
        </defs>
        <polygon
          points={points}
          fill={cfg.useGradient ? `url(#${gradientId})` : streakSolidColor}
        />
      </svg>
    );
  };

  return (
    <div className={`text-left ${className}`}>
      {/* Main Logo Text */}
      <div className="leading-none whitespace-nowrap">
        <span style={getTextStyle(config.everConfig, false)}>Ever</span>
        <span style={getTextStyle(config.intentConfig, true)}>Intent</span>
      </div>

      {/* Streak */}
      {renderStreak(config.streakConfig)}

      {/* Tagline */}
      {showTagline && config.taglineText && (
        <p style={getTaglineStyle(config.taglineConfig)}>
          {config.taglineText}
        </p>
      )}
    </div>
  );
};

export default LogoRenderer;
```

### 5.2 Logo Export Hook

**File:** `src/components/logo/useLogoExport.ts`

```typescript
import { RefObject, useCallback } from 'react';
import html2canvas from 'html2canvas';

export function useLogoExport(containerRef: RefObject<HTMLDivElement>) {
  
  const exportAsSvg = useCallback(() => {
    if (!containerRef.current) return;
    
    const svgElements = containerRef.current.querySelectorAll('svg');
    const mainSvg = svgElements[0];
    if (!mainSvg) return;
    
    const svgData = new XMLSerializer().serializeToString(mainSvg);
    const blob = new Blob([svgData], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'logo.svg';
    link.click();
    
    URL.revokeObjectURL(url);
  }, [containerRef]);

  const exportAsPngNative = useCallback(async (scale = 2) => {
    if (!containerRef.current) return;
    
    const canvas = await html2canvas(containerRef.current, {
      scale,
      backgroundColor: null, // Transparent
      useCORS: true,
    });
    
    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `logo-${scale}x.png`;
      link.click();
      URL.revokeObjectURL(url);
    }, 'image/png');
  }, [containerRef]);

  return { exportAsSvg, exportAsPngNative };
}
```

### 5.3 Component Index

**File:** `src/components/logo/index.ts`

```typescript
export { LogoRenderer } from './LogoRenderer';
export { useLogoExport } from './useLogoExport';
export * from './types';
```

---

## 6. Admin UI Implementation

### 6.1 Theme Editor Page

**Route:** `/admin/themes`

**Key Features:**
- Theme list with create/edit/delete
- Accent color editor with HSL sliders
- Static colors editor for all background/text/border colors
- Gradient editor with live preview
- GHL chat config for widget theming
- Hover effects controls (brightness, glow opacity)
- Logo config editor (embedded)
- "Publish to Production" workflow

**Layout Requirements:**
- Sidebar with controls (add `pt-16` to avoid header overlap)
- Live preview panel on right
- Accordion-based sections for compact UI
- All controls visible without scrolling

### 6.2 Logo Config Editor Component

**File:** `src/components/admin/LogoConfigEditor.tsx`

Editor sections:
1. **Logo Version Selector** - Dropdown of saved versions
2. **Ever Config** - Size, weight, color/gradient, margins, vertical offset
3. **Intent Config** - Same as Ever (this is the brand color element)
4. **Streak Config** - Length, thickness (left/right), color/gradient
5. **Tagline Config** - Text, size, weight, color, margins

### 6.3 Theme Test Page

**Route:** `/admin/theme-test?themeId={id}`

- Protected by AdminGuard
- Exact replica of homepage for testing themes
- Uses Supabase realtime subscription to watch theme changes
- Updates live as admin edits in separate window

```typescript
// Realtime subscription pattern
const channel = supabase
  .channel('theme-changes')
  .on('postgres_changes', {
    event: '*',
    schema: 'public',
    table: 'site_themes',
    filter: `id=eq.${themeId}`
  }, (payload) => {
    setTheme(payload.new);
  })
  .subscribe();
```

---

## 7. Edge Functions

### 7.1 sync-theme-to-github

**Path:** `supabase/functions/sync-theme-to-github/index.ts`

**Config (supabase/config.toml):**
```toml
[functions.sync-theme-to-github]
verify_jwt = true
```

**Implementation:**

```typescript
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface FileUpdate {
  path: string;
  content: string;
  sha?: string;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get GitHub credentials
    const githubPat = Deno.env.get("GITHUB_PAT");
    const repoOwner = Deno.env.get("GITHUB_REPO_OWNER");
    const repoName = Deno.env.get("GITHUB_REPO_NAME");

    if (!githubPat || !repoOwner || !repoName) {
      return new Response(
        JSON.stringify({ error: "GitHub credentials not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Get Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Fetch active published config
    const { data: publishedConfig, error } = await supabase
      .from("published_theme_configs")
      .select("*")
      .eq("is_active", true)
      .order("version", { ascending: false })
      .limit(1)
      .single();

    if (error || !publishedConfig) {
      return new Response(
        JSON.stringify({ error: "No active published theme config found" }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Files to update
    const filesToUpdate: FileUpdate[] = [
      { path: "src/config/themes.ts", content: publishedConfig.config_typescript },
    ];

    if (publishedConfig.config_css) {
      filesToUpdate.push({ path: "src/index.css", content: publishedConfig.config_css });
    }

    // Get current file SHAs
    for (const file of filesToUpdate) {
      const response = await fetch(
        `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${file.path}`,
        {
          headers: {
            Authorization: `Bearer ${githubPat}`,
            Accept: "application/vnd.github.v3+json",
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        file.sha = data.sha;
      }
    }

    // Get current commit SHA
    const refResponse = await fetch(
      `https://api.github.com/repos/${repoOwner}/${repoName}/git/refs/heads/main`,
      {
        headers: {
          Authorization: `Bearer ${githubPat}`,
          Accept: "application/vnd.github.v3+json",
        },
      }
    );
    const refData = await refResponse.json();
    const baseCommitSha = refData.object.sha;

    // Get base tree
    const commitResponse = await fetch(
      `https://api.github.com/repos/${repoOwner}/${repoName}/git/commits/${baseCommitSha}`,
      {
        headers: {
          Authorization: `Bearer ${githubPat}`,
          Accept: "application/vnd.github.v3+json",
        },
      }
    );
    const commitData = await commitResponse.json();
    const baseTreeSha = commitData.tree.sha;

    // Create new tree with file changes
    const treeItems = filesToUpdate.map((file) => ({
      path: file.path,
      mode: "100644" as const,
      type: "blob" as const,
      content: file.content,
    }));

    const createTreeResponse = await fetch(
      `https://api.github.com/repos/${repoOwner}/${repoName}/git/trees`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${githubPat}`,
          Accept: "application/vnd.github.v3+json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ base_tree: baseTreeSha, tree: treeItems }),
      }
    );
    const newTree = await createTreeResponse.json();

    // Create commit
    const commitMessage = `chore: update theme config to v${publishedConfig.version} (${publishedConfig.source_theme_name})`;
    const createCommitResponse = await fetch(
      `https://api.github.com/repos/${repoOwner}/${repoName}/git/commits`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${githubPat}`,
          Accept: "application/vnd.github.v3+json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: commitMessage,
          tree: newTree.sha,
          parents: [baseCommitSha],
        }),
      }
    );
    const newCommit = await createCommitResponse.json();

    // Update branch ref
    await fetch(
      `https://api.github.com/repos/${repoOwner}/${repoName}/git/refs/heads/main`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${githubPat}`,
          Accept: "application/vnd.github.v3+json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sha: newCommit.sha }),
      }
    );

    const commitUrl = `https://github.com/${repoOwner}/${repoName}/commit/${newCommit.sha}`;

    return new Response(
      JSON.stringify({
        success: true,
        message: `Theme v${publishedConfig.version} published to GitHub`,
        commitSha: newCommit.sha,
        commitUrl,
        version: publishedConfig.version,
        themeName: publishedConfig.source_theme_name,
        filesUpdated: filesToUpdate.map(f => f.path),
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
```

---

## 8. GitHub Integration

### 8.1 Required Secrets

| Secret Name | Description | Example |
|------------|-------------|---------|
| `GITHUB_PAT` | Personal Access Token with `repo` scope | `ghp_xxxx...` |
| `GITHUB_REPO_OWNER` | GitHub username or organization | `your-username` |
| `GITHUB_REPO_NAME` | Repository name | `your-project` |

### 8.2 GitHub PAT Permissions

Required scopes:
- `repo` (Full control of private repositories)
- Or for public repos: `public_repo`

### 8.3 API Flow

1. **Get current ref:** `GET /repos/{owner}/{repo}/git/refs/heads/main`
2. **Get base commit:** `GET /repos/{owner}/{repo}/git/commits/{sha}`
3. **Create tree:** `POST /repos/{owner}/{repo}/git/trees`
4. **Create commit:** `POST /repos/{owner}/{repo}/git/commits`
5. **Update ref:** `PATCH /repos/{owner}/{repo}/git/refs/heads/main`

This creates an atomic commit with both files in one operation.

---

## 9. CSS Generation

### 9.1 Generated CSS Structure

The `generateProductionCss()` function creates a complete `index.css` with:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Auto-generated from theme: {theme_name} */

@layer base {
  :root {
    /* Core Colors */
    --background: {hsl};
    --foreground: {hsl};
    --card: {hsl};
    --card-foreground: {hsl};
    /* ... all static colors ... */
    
    /* Accent Colors */
    --accent: {hsl};
    --accent-hover: {hsl};
    --accent-glow: {hsl};
    --accent-foreground: {hsl};
    
    /* Gradients */
    --gradient-hero: {css_gradient};
    --gradient-cta: {css_gradient};
    --gradient-text: {css_gradient};
    --gradient-glow: {css_gradient};
    --gradient-mesh: {css_gradient};
    
    /* Shadows */
    --shadow-sm: {css_shadow};
    --shadow-md: {css_shadow};
    --shadow-lg: {css_shadow};
    --shadow-xl: {css_shadow};
    --shadow-glow: {css_shadow};
    --shadow-glow-lg: {css_shadow};
    --shadow-button: {css_shadow};
    
    /* Sidebar */
    --sidebar-background: {hsl};
    --sidebar-foreground: {hsl};
    --sidebar-primary: {hsl};
    /* ... */
    
    /* GHL Chat Widget */
    --ghl-textarea-bg: {hsl};
    --ghl-textarea-text: {hsl};
    --ghl-textarea-border: {hsl};
    --ghl-textarea-focus-border: {hsl};
    --ghl-textarea-focus-glow: {hsl};
    --ghl-send-button-bg: {hsl};
    --ghl-send-button-border: {hsl};
    --ghl-send-button-icon: {hsl};
    --ghl-selection-bg: {hsl};
    
    --radius: 0.75rem;
  }
}

@layer base {
  * { @apply border-border; }
  html { scroll-behavior: smooth; }
  body {
    @apply bg-background text-foreground antialiased;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  }
  h1, h2, h3, h4, h5, h6 {
    font-family: 'Space Grotesk', -apple-system, BlinkMacSystemFont, sans-serif;
    @apply font-bold tracking-tight;
  }
}

@layer utilities {
  .text-gradient { /* gradient text utility */ }
  .glow { /* glow effect */ }
  .bg-mesh { /* mesh gradient background */ }
  .bg-hero { /* hero gradient background */ }
  .hover-lift { /* lift on hover */ }
  .hover-glow { /* glow on hover */ }
  .nav-link { /* navigation link underline */ }
  .glass { /* glassmorphism effect */ }
  /* ... more utilities ... */
}

@layer components {
  .btn-glow { /* glowing button */ }
  /* ... more components ... */
}
```

### 9.2 Key CSS Custom Properties

| Property | Purpose | Example |
|----------|---------|---------|
| `--background` | Page background | `222 47% 7%` |
| `--foreground` | Primary text | `60 9% 98%` |
| `--accent` | Brand/accent color | `240 70% 60%` |
| `--gradient-hero` | Hero section gradient | `linear-gradient(...)` |
| `--shadow-glow` | Glow shadow effect | `0 0 40px hsl(...)` |

---

## 10. Deployment Workflow

### 10.1 Admin Workflow

1. **Edit Theme** → Make changes in admin UI
2. **Save** → Updates `site_themes` table
3. **Set Active** → Marks theme as `is_active = true`
4. **Test** → Open theme test page, verify changes
5. **Publish** → Click "Publish to Production"
   - Generates `themes.ts` content
   - Generates `index.css` content
   - Stores in `published_theme_configs` with new version
   - Calls `sync-theme-to-github` edge function
6. **Verify** → Check GitHub commit, wait for CI/CD

### 10.2 Publish to Production Function

```typescript
const handlePublishToProduction = async () => {
  // 1. Generate theme config TypeScript
  const configTs = generateProductionConfig(activeTheme, logoVersion, assignments);
  
  // 2. Generate CSS
  const configCss = generateProductionCss(activeTheme);
  
  // 3. Get next version number
  const version = await getNextVersion();
  
  // 4. Store in published_theme_configs
  await supabase.from('published_theme_configs').insert({
    version,
    source_theme_id: activeTheme.id,
    source_theme_name: activeTheme.name,
    config_typescript: configTs,
    config_css: configCss,
    config_json: themeAsJson,
    is_active: true,
    created_by: user.id,
  });
  
  // 5. Deactivate previous configs
  await supabase
    .from('published_theme_configs')
    .update({ is_active: false })
    .neq('version', version);
  
  // 6. Call edge function to push to GitHub
  const { data } = await supabase.functions.invoke('sync-theme-to-github');
  
  // 7. Show success with commit URL
  showSuccess(data.commitUrl);
};
```

---

## 11. Secrets Configuration

### 11.1 Required Supabase Secrets

Set these in Supabase Dashboard → Settings → Edge Functions → Secrets:

| Secret | Required | Description |
|--------|----------|-------------|
| `GITHUB_PAT` | Yes | GitHub Personal Access Token |
| `GITHUB_REPO_OWNER` | Yes | GitHub username/org |
| `GITHUB_REPO_NAME` | Yes | Repository name |

### 11.2 Lovable Project Secrets

These should also be set in Lovable project secrets for local development.

---

## 12. Seed Data

### 12.1 Initial Logo Version

```sql
INSERT INTO logo_versions (
  name, version, is_active, tagline_text,
  ever_config, intent_config, streak_config, tagline_config
) VALUES (
  'Default Logo', 1, true, 'Web Design & Practical AI',
  '{"size":72,"weight":700,"solidColor":"#FFFFFF","useGradient":false,"gradientFrom":"#FFFFFF","gradientTo":"#A855F7","gradientAngle":135,"marginLeft":0,"marginRight":3,"verticalOffset":-1}',
  '{"size":72,"weight":700,"solidColor":"#A855F7","useGradient":false,"gradientFrom":"#A855F7","gradientTo":"#FFFFFF","gradientAngle":135,"marginLeft":0,"marginRight":0,"verticalOffset":1}',
  '{"length":366,"leftThick":4,"rightThick":1,"solidColor":"#A855F7","useGradient":true,"gradientFrom":"#A855F7","gradientTo":"#7878dd","gradientAngle":90,"marginLeft":0,"marginRight":0}',
  '{"size":29,"weight":400,"solidColor":"#FFFFFF","useGradient":false,"gradientFrom":"#FFFFFF","gradientTo":"#A855F7","gradientAngle":135,"marginLeft":5,"marginRight":0,"marginTop":5}'
);
```

### 12.2 Initial Theme

```sql
INSERT INTO site_themes (
  name, version, base_hue, is_active,
  logo_version_id,
  accent_config, static_colors, gradient_configs, ghl_chat_config
) VALUES (
  'Indigo Night', 1, 240, true,
  (SELECT id FROM logo_versions WHERE name = 'Default Logo'),
  '{"accent":"240 70% 60%","h":240,"s":70,"l":60,"accentHover":"240 70% 50%","accentGlow":"240 70% 70%","accentForeground":"0 0% 100%","hoverBrightness":1.1,"iconGlowOpacity":0.3}',
  '{"background":"222 47% 7%","foreground":"60 9% 98%","card":"222 47% 10%","cardForeground":"60 9% 98%","popover":"222 47% 10%","popoverForeground":"60 9% 98%","primary":"215 25% 27%","primaryLight":"215 20% 40%","primaryForeground":"0 0% 100%","secondary":"222 47% 12%","secondaryForeground":"60 9% 98%","muted":"222 47% 15%","mutedForeground":"215 16% 65%","border":"215 25% 20%","input":"215 25% 20%","ring":"240 70% 60%"}',
  '{"hero":"linear-gradient(135deg, hsl(222 47% 11%) 0%, hsl(240 30% 18%) 50%, hsl(222 47% 11%) 100%)","cta":"linear-gradient(135deg, hsl(240 70% 60%) 0%, hsl(250 70% 50%) 100%)","text":"linear-gradient(135deg, hsl(240 70% 60%) 0%, hsl(250 70% 70%) 50%, hsl(240 70% 60%) 100%)"}',
  '{"textareaBg":"222 47% 7%","textareaText":"60 9% 98%","textareaBorder":"215 25% 20%","textareaFocusBorder":"240 70% 60%","textareaFocusGlow":"240 70% 60%","sendButtonBg":"240 70% 60%","sendButtonBorder":"0 0% 100%","sendButtonIcon":"0 0% 100%","selectionBg":"240 70% 60%"}'
);
```

---

## 13. Troubleshooting

### 13.1 Common Issues

| Issue | Cause | Solution |
|-------|-------|----------|
| Theme not applying | CSS variables not updating | Check `applyThemeToRoot()` call |
| Logo colors wrong | Accent override not passing | Verify `accentHsl` prop |
| GitHub push fails | Invalid PAT | Regenerate with `repo` scope |
| FOUC on page load | Runtime theme loading | Ensure static baked config |
| Baseline misalignment | Missing verticalOffset | Set Intent to `verticalOffset: 1` |

### 13.2 Debug Checklist

1. ✅ Database has active theme (`is_active = true`)
2. ✅ Logo version linked to theme (`logo_version_id`)
3. ✅ Published config exists and is active
4. ✅ GitHub secrets configured correctly
5. ✅ Edge function deployed and working
6. ✅ Static files updated in repository

### 13.3 Useful Queries

```sql
-- Check active theme
SELECT * FROM site_themes WHERE is_active = true;

-- Check linked logo
SELECT t.name, l.name as logo_name 
FROM site_themes t 
JOIN logo_versions l ON t.logo_version_id = l.id;

-- Check published versions
SELECT version, source_theme_name, is_active, created_at 
FROM published_theme_configs 
ORDER BY version DESC;
```

---

## 14. UI Styling Utilities

This section documents the CSS utility classes that create the distinctive visual effects throughout the site. These are defined in `src/index.css`.

### 14.1 Navigation Link Animation (`.nav-link`)

The animated underline effect on header navigation links:

```css
.nav-link {
  @apply relative;
}

.nav-link::after {
  content: '';
  @apply absolute bottom-0 left-0 w-full h-[2px] origin-left scale-x-0 transition-transform duration-300;
  background: linear-gradient(90deg, hsl(var(--accent)) 0%, hsl(var(--accent) / 0.5) 100%);
}

.nav-link:hover::after {
  @apply scale-x-100;
}

.nav-link.active::after {
  @apply scale-x-100;
}
```

**Behavior:**
- Creates a 2px underline using `::after` pseudo-element
- Uses gradient from full accent color to 50% opacity accent
- Scales from left (`origin-left`) on hover
- Stays visible when link is active (current page)
- 300ms transition duration

### 14.2 Story Link Animation (`.story-link`)

Secondary underline style for text links (Hero CTA, Portfolio):

```css
.story-link {
  @apply relative inline-block;
}

.story-link::after {
  content: '';
  @apply absolute w-full h-0.5 bottom-0 left-0 origin-bottom-right transition-transform duration-300 scale-x-0;
  background: hsl(var(--accent));
}

.story-link:hover::after {
  @apply origin-bottom-left scale-x-100;
}
```

**Behavior:**
- Uses solid accent color (not gradient)
- Animates from right to left (origin-bottom-right → origin-bottom-left)
- Creates a "reveal" effect that sweeps in
- Used in Hero section CTA links

### 14.3 Footer Heading Decoration

The horizontal line next to footer column headings:

```html
<h3 className="font-display font-bold text-foreground text-sm uppercase tracking-wider flex items-center gap-2">
  <span className="w-6 h-px bg-gradient-to-r from-accent to-transparent" />
  Services
</h3>
```

**Styling:**
- 6px wide (`w-6`), 1px height (`h-px`)
- Gradient from accent color to transparent
- Positioned inline with flexbox (`flex items-center gap-2`)
- Text is uppercase with wider letter-spacing

### 14.4 Footer Link Hover (`.footer-link`)

Footer links with slide-in accent bar:

```css
.footer-link {
  @apply relative text-muted-foreground transition-all duration-300;
}

.footer-link:hover {
  @apply text-foreground pl-1;
}

.footer-link::before {
  content: '';
  @apply absolute left-0 top-1/2 -translate-y-1/2 w-0 h-0.5 bg-accent transition-all duration-300;
}

.footer-link:hover::before {
  @apply w-2;
}
```

**Behavior:**
- Text changes from muted to full foreground on hover
- Small accent bar (8px) slides in from left
- Text shifts right (`pl-1`) to accommodate bar
- Links also include an ArrowUpRight icon that fades in

### 14.5 Header Scroll Line

Subtle gradient line at bottom of header when scrolled:

```tsx
{showScrolledStyles && (
  <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
)}
```

**Styling:**
- 1px height
- Three-point gradient: transparent → 30% accent → transparent
- Only visible when header has scrolled state

### 14.6 Hover Effects

**Scale on hover:**
```css
.hover-scale {
  @apply transition-transform duration-200 hover:scale-105;
}
```

**Lift with shadow:**
```css
.hover-lift {
  @apply transition-all duration-300;
}

.hover-lift:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}
```

**Glow on hover:**
```css
.hover-glow {
  @apply transition-shadow duration-300;
}

.hover-glow:hover {
  box-shadow: var(--shadow-glow);
}
```

### 14.7 Glass Effects

**Standard glass (light blur):**
```css
.glass {
  @apply bg-background/80 backdrop-blur-lg border border-border/50;
}
```

**Dark glass:**
```css
.glass-dark {
  @apply bg-primary/80 backdrop-blur-lg border border-border/20;
}
```

### 14.8 Gradient Border Glow (`.border-glow`)

Border that glows on hover:

```css
.border-glow {
  position: relative;
}

.border-glow::before {
  content: '';
  position: absolute;
  inset: -2px;
  border-radius: inherit;
  background: var(--gradient-cta);
  z-index: -1;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.border-glow:hover::before {
  opacity: 1;
}
```

### 14.9 Button Glow (`.btn-glow`)

Animated shine effect on CTA buttons:

```css
.btn-glow {
  @apply relative overflow-hidden;
  box-shadow: var(--shadow-button);
}

.btn-glow::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, transparent, hsl(0 0% 100% / 0.2), transparent);
  transform: translateX(-100%);
  transition: transform 0.5s ease;
}

.btn-glow:hover::before {
  transform: translateX(100%);
}

.btn-glow:hover {
  box-shadow: var(--shadow-glow);
}
```

**Behavior:**
- Creates "shine" effect that sweeps across button
- Increases glow shadow on hover
- Uses white with 20% opacity for shine

### 14.10 Card Hover (`.card-hover`)

Standard card interaction:

```css
.card-hover {
  @apply transition-all duration-300 border border-border/50;
}

.card-hover:hover {
  @apply border-accent/50;
  box-shadow: var(--shadow-glow);
  transform: translateY(-2px);
}
```

### 14.11 Text Gradients

**Primary gradient text:**
```css
.text-gradient {
  background: var(--gradient-text);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

**Light gradient text:**
```css
.text-gradient-light {
  background: linear-gradient(135deg, hsl(60 9% 98%) 0%, hsl(var(--accent)) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

### 14.12 Icon Gradients

Four preset icon gradient utilities for visual variety:

```css
.icon-gradient-ocean {
  background: linear-gradient(135deg, hsl(210 100% 45%) 0%, hsl(195 100% 50%) 100%);
  /* Blue to cyan */
}

.icon-gradient-royal {
  background: linear-gradient(135deg, hsl(230 80% 55%) 0%, hsl(200 100% 60%) 100%);
  /* Indigo to blue */
}

.icon-gradient-sky {
  background: linear-gradient(135deg, hsl(200 85% 50%) 0%, hsl(180 70% 55%) 100%);
  /* Sky blue to teal */
}

.icon-gradient-electric {
  background: linear-gradient(135deg, hsl(220 90% 55%) 0%, hsl(190 95% 45%) 100%);
  /* Electric blue to aqua */
}
```

### 14.13 Transition Utilities

**Smooth (standard easing):**
```css
.transition-smooth {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
```

**Bounce (elastic):**
```css
.transition-bounce {
  transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}
```

**Spring (overshoot):**
```css
.transition-spring {
  transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

### 14.14 Background Utilities

**Mesh gradient background:**
```css
.bg-mesh {
  background-image: var(--gradient-mesh);
}
```

**Hero gradient:**
```css
.bg-hero {
  background: var(--gradient-hero);
}
```

**Noise texture overlay:**
```css
.bg-noise {
  position: relative;
}

.bg-noise::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,...");  /* SVG noise filter */
  opacity: 0.03;
  pointer-events: none;
  mix-blend-mode: overlay;
}
```

**Radial vignette:**
```css
.bg-radial-vignette {
  background: radial-gradient(
    ellipse 50% 50% at 50% 50%,
    hsl(var(--background) / 0.95) 0%,
    hsl(var(--background) / 0.8) 30%,
    hsl(var(--background) / 0.3) 60%,
    transparent 100%
  );
}
```

### 14.15 Section and Hero Components

**Standard section spacing:**
```css
.section {
  @apply py-16 sm:py-20 md:py-24 lg:py-32;
}
```

**Hero component:**
```css
.hero {
  @apply relative min-h-[80vh] flex items-center justify-center overflow-hidden;
  background: var(--gradient-hero);
}

.hero::before {
  content: '';
  @apply absolute inset-0 bg-mesh pointer-events-none;
}
```

### 14.16 Layered Shadows

```css
.shadow-layered {
  box-shadow: 
    0 1px 2px hsl(0 0% 0% / 0.05),
    0 4px 8px hsl(0 0% 0% / 0.05),
    0 16px 32px hsl(0 0% 0% / 0.05);
}

.shadow-layered-lg {
  box-shadow: 
    0 2px 4px hsl(0 0% 0% / 0.03),
    0 8px 16px hsl(0 0% 0% / 0.05),
    0 24px 48px hsl(0 0% 0% / 0.08);
}
```

### 14.17 Selection and Scrollbar Styling

**Text selection:**
```css
::selection {
  background: hsl(240 70% 60% / 0.3);
  color: hsl(var(--foreground));
}
```

**Custom scrollbar:**
```css
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: hsl(var(--muted));
}

::-webkit-scrollbar-thumb {
  background: hsl(var(--muted-foreground) / 0.5);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: hsl(var(--muted-foreground) / 0.7);
}
```

---

## Appendix A: File Structure

```
src/
├── components/
│   ├── logo/
│   │   ├── index.ts           # Exports
│   │   ├── types.ts           # Type definitions
│   │   ├── LogoRenderer.tsx   # Main renderer
│   │   └── useLogoExport.ts   # Export hook
│   └── admin/
│       └── LogoConfigEditor.tsx
├── config/
│   └── themes.ts              # Generated static config
├── pages/
│   └── admin/
│       ├── Themes.tsx         # Theme editor
│       └── ThemeTestPage.tsx  # Preview page
└── index.css                  # Generated CSS

supabase/
├── config.toml
└── functions/
    └── sync-theme-to-github/
        └── index.ts
```

---

## Appendix B: Dependencies

```json
{
  "dependencies": {
    "@supabase/supabase-js": "^2.x",
    "html2canvas": "^1.x"  // For PNG export
  }
}
```

---

*End of Theme System Technical Specification*
