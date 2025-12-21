-- Update Golden Amber (the production default) with dark theme values
UPDATE site_themes 
SET 
  is_active = true,
  static_colors = '{
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
    "ring": "38 92% 50%"
  }'::jsonb,
  accent_config = '{
    "accent": "38 92% 50%",
    "accentHover": "32 95% 44%",
    "accentGlow": "38 92% 50%",
    "accentForeground": "222 47% 11%",
    "h": 38,
    "s": 92,
    "l": 50
  }'::jsonb,
  gradient_configs = '{
    "hero": "linear-gradient(135deg, hsl(222 47% 7%) 0%, hsl(222 47% 12%) 50%, hsl(222 47% 7%) 100%)",
    "cta": "linear-gradient(135deg, hsl(38 92% 50%) 0%, hsl(32 95% 44%) 100%)",
    "text": "linear-gradient(135deg, hsl(38 92% 50%) 0%, hsl(45 93% 58%) 50%, hsl(38 92% 50%) 100%)"
  }'::jsonb
WHERE name = 'Golden Amber';

-- Deactivate all other themes
UPDATE site_themes SET is_active = false WHERE name != 'Golden Amber';

-- Update all other themes with dark mode static_colors (keeping their unique accent/gradients)
UPDATE site_themes 
SET static_colors = '{
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
    "ring": "38 92% 50%"
  }'::jsonb
WHERE name != 'Golden Amber';