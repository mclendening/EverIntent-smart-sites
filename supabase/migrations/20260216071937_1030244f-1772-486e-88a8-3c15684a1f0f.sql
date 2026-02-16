-- Fix static_colors default: add missing popover, popoverForeground, and ring keys
-- These 3 keys are expected by generateProductionCss() and themes.ts generator
-- Without them, new themes created via admin start with incomplete token sets

ALTER TABLE site_themes
ALTER COLUMN static_colors
SET DEFAULT '{
  "background": "0 0% 100%",
  "foreground": "222 47% 11%",
  "card": "0 0% 100%",
  "cardForeground": "222 47% 11%",
  "popover": "0 0% 100%",
  "popoverForeground": "222 47% 11%",
  "primary": "222 47% 11%",
  "primaryLight": "215 25% 27%",
  "primaryForeground": "0 0% 100%",
  "secondary": "60 9% 98%",
  "secondaryForeground": "222 47% 11%",
  "muted": "60 5% 96%",
  "mutedForeground": "215 16% 47%",
  "border": "220 13% 91%",
  "input": "220 13% 91%",
  "ring": "240 70% 60%"
}'::jsonb;

-- Note: Existing themes are NOT affected. This only changes the default for NEW themes.
-- Existing themes that are missing these keys will continue to use the hardcoded
-- fallbacks in generateProductionCss() until manually updated via the admin editor.