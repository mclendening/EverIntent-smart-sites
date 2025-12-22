-- Add hoverBrightness and iconGlowOpacity to existing accent_config for all themes
UPDATE public.site_themes
SET accent_config = accent_config || '{"hoverBrightness": 1.1, "iconGlowOpacity": 0.3}'::jsonb
WHERE NOT (accent_config ? 'hoverBrightness');