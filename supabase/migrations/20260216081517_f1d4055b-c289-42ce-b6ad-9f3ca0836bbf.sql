-- Add fontMono to typography_config default
-- Existing themes keep their current typography_config (fontMono will be undefined
-- until edited in admin, and the CSS publisher falls back to JetBrains Mono)
-- New themes will include fontMono in their default config

ALTER TABLE site_themes
ALTER COLUMN typography_config
SET DEFAULT '{
  "fontHeading": "Space Grotesk, -apple-system, BlinkMacSystemFont, sans-serif",
  "fontBody": "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
  "fontDisplay": "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
  "fontMono": "JetBrains Mono, Fira Code, monospace"
}'::jsonb;