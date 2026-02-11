
-- Phase 7 Batch 1: Expand site_themes for three-tier token architecture
-- Adds: primitive/semantic/component tokens, style modules, default mode,
-- e-commerce colors, CTA variants, typography, and motion config

-- Three-tier token hierarchy
ALTER TABLE public.site_themes
ADD COLUMN IF NOT EXISTS primitive_tokens jsonb NOT NULL DEFAULT '{}'::jsonb;

ALTER TABLE public.site_themes
ADD COLUMN IF NOT EXISTS semantic_tokens jsonb NOT NULL DEFAULT '{}'::jsonb;

ALTER TABLE public.site_themes
ADD COLUMN IF NOT EXISTS component_tokens jsonb NOT NULL DEFAULT '{}'::jsonb;

-- Style modules: arbitrary JSONB array for tokenizing complex UI components
ALTER TABLE public.site_themes
ADD COLUMN IF NOT EXISTS style_modules jsonb NOT NULL DEFAULT '[]'::jsonb;

-- Default color mode: dark, light, or system
ALTER TABLE public.site_themes
ADD COLUMN IF NOT EXISTS default_mode text NOT NULL DEFAULT 'dark';

-- E-commerce / pricing colors (gold system)
ALTER TABLE public.site_themes
ADD COLUMN IF NOT EXISTS ecommerce_colors jsonb NOT NULL DEFAULT '{
  "gold": "39 95% 50%",
  "goldHover": "35 95% 44%",
  "goldGlow": "39 95% 60%",
  "goldForeground": "0 0% 100%",
  "pricingHighlight": "39 95% 50%"
}'::jsonb;

-- CTA button variant colors
ALTER TABLE public.site_themes
ADD COLUMN IF NOT EXISTS cta_variants jsonb NOT NULL DEFAULT '{
  "primary": "240 70% 60%",
  "primaryHover": "240 70% 50%",
  "secondary": "39 95% 50%",
  "secondaryHover": "35 95% 44%"
}'::jsonb;

-- Typography configuration
ALTER TABLE public.site_themes
ADD COLUMN IF NOT EXISTS typography_config jsonb NOT NULL DEFAULT '{
  "fontHeading": "Space Grotesk, -apple-system, BlinkMacSystemFont, sans-serif",
  "fontBody": "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
  "fontDisplay": "Inter, -apple-system, BlinkMacSystemFont, sans-serif"
}'::jsonb;

-- Motion / transition configuration
ALTER TABLE public.site_themes
ADD COLUMN IF NOT EXISTS motion_config jsonb NOT NULL DEFAULT '{
  "transitionSmooth": "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  "transitionBounce": "all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
  "transitionSpring": "all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)"
}'::jsonb;

-- Add comment for documentation
COMMENT ON COLUMN public.site_themes.primitive_tokens IS 'Base color primitives (hues, saturations) for algorithmic theme generation';
COMMENT ON COLUMN public.site_themes.semantic_tokens IS 'Semantic mappings (success, warning, info) derived from primitives';
COMMENT ON COLUMN public.site_themes.component_tokens IS 'Component-specific token overrides (card borders, button radii, etc.)';
COMMENT ON COLUMN public.site_themes.style_modules IS 'Array of {prefix, tokens} objects for arbitrary UI component tokenization';
COMMENT ON COLUMN public.site_themes.default_mode IS 'Default color mode: dark, light, or system';
COMMENT ON COLUMN public.site_themes.ecommerce_colors IS 'Gold/pricing color system for checkout and e-commerce elements';
COMMENT ON COLUMN public.site_themes.cta_variants IS 'CTA button color variants (primary, secondary, etc.)';
COMMENT ON COLUMN public.site_themes.typography_config IS 'Font family stacks for heading, body, and display text';
COMMENT ON COLUMN public.site_themes.motion_config IS 'Transition and animation timing configurations';
