-- Seed default logo version (matches current LogoExplorer defaults)
INSERT INTO public.logo_versions (
  name,
  version,
  is_active,
  tagline_text,
  ever_config,
  intent_config,
  streak_config,
  tagline_config,
  changelog_notes
) VALUES (
  'Default Logo',
  1,
  true,
  'Web Design & Automation',
  '{"size": 72, "weight": 700, "gradientTo": "#A855F7", "marginLeft": 0, "solidColor": "#FFFFFF", "marginRight": 0, "useGradient": false, "gradientFrom": "#FFFFFF", "gradientAngle": 135, "verticalOffset": 0}',
  '{"size": 72, "weight": 700, "gradientTo": "#FFFFFF", "marginLeft": 0, "solidColor": "#A855F7", "marginRight": 0, "useGradient": false, "gradientFrom": "#A855F7", "gradientAngle": 135, "verticalOffset": 1}',
  '{"length": 373, "leftThick": 4, "gradientTo": "#FBF9F9", "marginLeft": 0, "rightThick": 1, "solidColor": "#A855F7", "marginRight": 0, "useGradient": true, "gradientFrom": "#A855F7", "gradientAngle": 90}',
  '{"size": 29, "weight": 400, "marginTop": 5, "gradientTo": "#A855F7", "marginLeft": 0, "solidColor": "#FFFFFF", "marginRight": 0, "useGradient": false, "gradientFrom": "#FFFFFF", "gradientAngle": 135}',
  'Initial default logo matching current site design'
);

-- Get the logo version ID for FK reference
DO $$
DECLARE
  logo_id uuid;
BEGIN
  SELECT id INTO logo_id FROM public.logo_versions WHERE is_active = true LIMIT 1;
  
  -- Insert 10 themes (purple reference + 9 variations)
  INSERT INTO public.site_themes (name, version, is_active, logo_version_id, base_hue, accent_locked_to_base, accent_config, static_colors, gradient_configs, changelog_notes) VALUES
  
  -- 1. Purple (Reference - current site)
  ('Purple (Default)', 1, true, logo_id, 270, true,
   '{"accent": "270 91% 65%", "accentGlow": "270 91% 75%", "accentHover": "270 91% 55%", "accentForeground": "0 0% 100%"}',
   '{"card": "0 0% 100%", "input": "220 13% 91%", "muted": "60 5% 96%", "border": "220 13% 91%", "primary": "222 47% 11%", "secondary": "60 9% 98%", "background": "0 0% 100%", "foreground": "222 47% 11%", "primaryLight": "215 25% 27%", "cardForeground": "222 47% 11%", "mutedForeground": "215 16% 47%", "primaryForeground": "0 0% 100%", "secondaryForeground": "222 47% 11%"}',
   '{"cta": "linear-gradient(135deg, hsl(270 91% 65%) 0%, hsl(280 91% 55%) 100%)", "hero": "linear-gradient(135deg, hsl(222 47% 11%) 0%, hsl(270 30% 20%) 50%, hsl(222 47% 11%) 100%)", "text": "linear-gradient(135deg, hsl(270 91% 65%) 0%, hsl(280 91% 75%) 50%, hsl(270 91% 65%) 100%)"}',
   'Reference purple theme matching current brand'),

  -- 2. Ocean Blue
  ('Ocean Blue', 1, false, logo_id, 210, true,
   '{"accent": "210 91% 65%", "accentGlow": "210 91% 75%", "accentHover": "210 91% 55%", "accentForeground": "0 0% 100%"}',
   '{"card": "0 0% 100%", "input": "220 13% 91%", "muted": "60 5% 96%", "border": "220 13% 91%", "primary": "222 47% 11%", "secondary": "60 9% 98%", "background": "0 0% 100%", "foreground": "222 47% 11%", "primaryLight": "215 25% 27%", "cardForeground": "222 47% 11%", "mutedForeground": "215 16% 47%", "primaryForeground": "0 0% 100%", "secondaryForeground": "222 47% 11%"}',
   '{"cta": "linear-gradient(135deg, hsl(210 91% 65%) 0%, hsl(220 91% 55%) 100%)", "hero": "linear-gradient(135deg, hsl(222 47% 11%) 0%, hsl(210 30% 20%) 50%, hsl(222 47% 11%) 100%)", "text": "linear-gradient(135deg, hsl(210 91% 65%) 0%, hsl(220 91% 75%) 50%, hsl(210 91% 65%) 100%)"}',
   'Ocean blue theme'),

  -- 3. Emerald Green
  ('Emerald Green', 1, false, logo_id, 160, true,
   '{"accent": "160 84% 39%", "accentGlow": "160 84% 49%", "accentHover": "160 84% 29%", "accentForeground": "0 0% 100%"}',
   '{"card": "0 0% 100%", "input": "220 13% 91%", "muted": "60 5% 96%", "border": "220 13% 91%", "primary": "222 47% 11%", "secondary": "60 9% 98%", "background": "0 0% 100%", "foreground": "222 47% 11%", "primaryLight": "215 25% 27%", "cardForeground": "222 47% 11%", "mutedForeground": "215 16% 47%", "primaryForeground": "0 0% 100%", "secondaryForeground": "222 47% 11%"}',
   '{"cta": "linear-gradient(135deg, hsl(160 84% 39%) 0%, hsl(170 84% 29%) 100%)", "hero": "linear-gradient(135deg, hsl(222 47% 11%) 0%, hsl(160 30% 15%) 50%, hsl(222 47% 11%) 100%)", "text": "linear-gradient(135deg, hsl(160 84% 39%) 0%, hsl(170 84% 49%) 50%, hsl(160 84% 39%) 100%)"}',
   'Emerald green theme'),

  -- 4. Sunset Orange
  ('Sunset Orange', 1, false, logo_id, 25, true,
   '{"accent": "25 95% 53%", "accentGlow": "25 95% 63%", "accentHover": "25 95% 43%", "accentForeground": "0 0% 100%"}',
   '{"card": "0 0% 100%", "input": "220 13% 91%", "muted": "60 5% 96%", "border": "220 13% 91%", "primary": "222 47% 11%", "secondary": "60 9% 98%", "background": "0 0% 100%", "foreground": "222 47% 11%", "primaryLight": "215 25% 27%", "cardForeground": "222 47% 11%", "mutedForeground": "215 16% 47%", "primaryForeground": "0 0% 100%", "secondaryForeground": "222 47% 11%"}',
   '{"cta": "linear-gradient(135deg, hsl(25 95% 53%) 0%, hsl(35 95% 43%) 100%)", "hero": "linear-gradient(135deg, hsl(222 47% 11%) 0%, hsl(25 30% 18%) 50%, hsl(222 47% 11%) 100%)", "text": "linear-gradient(135deg, hsl(25 95% 53%) 0%, hsl(35 95% 63%) 50%, hsl(25 95% 53%) 100%)"}',
   'Sunset orange theme'),

  -- 5. Rose Pink
  ('Rose Pink', 1, false, logo_id, 330, true,
   '{"accent": "330 81% 60%", "accentGlow": "330 81% 70%", "accentHover": "330 81% 50%", "accentForeground": "0 0% 100%"}',
   '{"card": "0 0% 100%", "input": "220 13% 91%", "muted": "60 5% 96%", "border": "220 13% 91%", "primary": "222 47% 11%", "secondary": "60 9% 98%", "background": "0 0% 100%", "foreground": "222 47% 11%", "primaryLight": "215 25% 27%", "cardForeground": "222 47% 11%", "mutedForeground": "215 16% 47%", "primaryForeground": "0 0% 100%", "secondaryForeground": "222 47% 11%"}',
   '{"cta": "linear-gradient(135deg, hsl(330 81% 60%) 0%, hsl(340 81% 50%) 100%)", "hero": "linear-gradient(135deg, hsl(222 47% 11%) 0%, hsl(330 30% 18%) 50%, hsl(222 47% 11%) 100%)", "text": "linear-gradient(135deg, hsl(330 81% 60%) 0%, hsl(340 81% 70%) 50%, hsl(330 81% 60%) 100%)"}',
   'Rose pink theme'),

  -- 6. Teal
  ('Teal', 1, false, logo_id, 180, true,
   '{"accent": "180 70% 45%", "accentGlow": "180 70% 55%", "accentHover": "180 70% 35%", "accentForeground": "0 0% 100%"}',
   '{"card": "0 0% 100%", "input": "220 13% 91%", "muted": "60 5% 96%", "border": "220 13% 91%", "primary": "222 47% 11%", "secondary": "60 9% 98%", "background": "0 0% 100%", "foreground": "222 47% 11%", "primaryLight": "215 25% 27%", "cardForeground": "222 47% 11%", "mutedForeground": "215 16% 47%", "primaryForeground": "0 0% 100%", "secondaryForeground": "222 47% 11%"}',
   '{"cta": "linear-gradient(135deg, hsl(180 70% 45%) 0%, hsl(190 70% 35%) 100%)", "hero": "linear-gradient(135deg, hsl(222 47% 11%) 0%, hsl(180 30% 15%) 50%, hsl(222 47% 11%) 100%)", "text": "linear-gradient(135deg, hsl(180 70% 45%) 0%, hsl(190 70% 55%) 50%, hsl(180 70% 45%) 100%)"}',
   'Teal theme'),

  -- 7. Crimson Red
  ('Crimson Red', 1, false, logo_id, 0, true,
   '{"accent": "0 72% 51%", "accentGlow": "0 72% 61%", "accentHover": "0 72% 41%", "accentForeground": "0 0% 100%"}',
   '{"card": "0 0% 100%", "input": "220 13% 91%", "muted": "60 5% 96%", "border": "220 13% 91%", "primary": "222 47% 11%", "secondary": "60 9% 98%", "background": "0 0% 100%", "foreground": "222 47% 11%", "primaryLight": "215 25% 27%", "cardForeground": "222 47% 11%", "mutedForeground": "215 16% 47%", "primaryForeground": "0 0% 100%", "secondaryForeground": "222 47% 11%"}',
   '{"cta": "linear-gradient(135deg, hsl(0 72% 51%) 0%, hsl(10 72% 41%) 100%)", "hero": "linear-gradient(135deg, hsl(222 47% 11%) 0%, hsl(0 30% 15%) 50%, hsl(222 47% 11%) 100%)", "text": "linear-gradient(135deg, hsl(0 72% 51%) 0%, hsl(10 72% 61%) 50%, hsl(0 72% 51%) 100%)"}',
   'Crimson red theme'),

  -- 8. Golden Amber
  ('Golden Amber', 1, false, logo_id, 38, true,
   '{"accent": "38 92% 50%", "accentGlow": "38 92% 60%", "accentHover": "32 95% 44%", "accentForeground": "222 47% 11%"}',
   '{"card": "0 0% 100%", "input": "220 13% 91%", "muted": "60 5% 96%", "border": "220 13% 91%", "primary": "222 47% 11%", "secondary": "60 9% 98%", "background": "0 0% 100%", "foreground": "222 47% 11%", "primaryLight": "215 25% 27%", "cardForeground": "222 47% 11%", "mutedForeground": "215 16% 47%", "primaryForeground": "0 0% 100%", "secondaryForeground": "222 47% 11%"}',
   '{"cta": "linear-gradient(135deg, hsl(38 92% 50%) 0%, hsl(32 95% 44%) 100%)", "hero": "linear-gradient(135deg, hsl(222 47% 11%) 0%, hsl(38 30% 18%) 50%, hsl(222 47% 11%) 100%)", "text": "linear-gradient(135deg, hsl(38 92% 50%) 0%, hsl(45 93% 58%) 50%, hsl(38 92% 50%) 100%)"}',
   'Golden amber theme'),

  -- 9. Indigo Night
  ('Indigo Night', 1, false, logo_id, 240, true,
   '{"accent": "240 70% 60%", "accentGlow": "240 70% 70%", "accentHover": "240 70% 50%", "accentForeground": "0 0% 100%"}',
   '{"card": "0 0% 100%", "input": "220 13% 91%", "muted": "60 5% 96%", "border": "220 13% 91%", "primary": "222 47% 11%", "secondary": "60 9% 98%", "background": "0 0% 100%", "foreground": "222 47% 11%", "primaryLight": "215 25% 27%", "cardForeground": "222 47% 11%", "mutedForeground": "215 16% 47%", "primaryForeground": "0 0% 100%", "secondaryForeground": "222 47% 11%"}',
   '{"cta": "linear-gradient(135deg, hsl(240 70% 60%) 0%, hsl(250 70% 50%) 100%)", "hero": "linear-gradient(135deg, hsl(222 47% 11%) 0%, hsl(240 30% 18%) 50%, hsl(222 47% 11%) 100%)", "text": "linear-gradient(135deg, hsl(240 70% 60%) 0%, hsl(250 70% 70%) 50%, hsl(240 70% 60%) 100%)"}',
   'Indigo night theme'),

  -- 10. Forest Sage
  ('Forest Sage', 1, false, logo_id, 120, true,
   '{"accent": "120 40% 45%", "accentGlow": "120 40% 55%", "accentHover": "120 40% 35%", "accentForeground": "0 0% 100%"}',
   '{"card": "0 0% 100%", "input": "220 13% 91%", "muted": "60 5% 96%", "border": "220 13% 91%", "primary": "222 47% 11%", "secondary": "60 9% 98%", "background": "0 0% 100%", "foreground": "222 47% 11%", "primaryLight": "215 25% 27%", "cardForeground": "222 47% 11%", "mutedForeground": "215 16% 47%", "primaryForeground": "0 0% 100%", "secondaryForeground": "222 47% 11%"}',
   '{"cta": "linear-gradient(135deg, hsl(120 40% 45%) 0%, hsl(130 40% 35%) 100%)", "hero": "linear-gradient(135deg, hsl(222 47% 11%) 0%, hsl(120 20% 15%) 50%, hsl(222 47% 11%) 100%)", "text": "linear-gradient(135deg, hsl(120 40% 45%) 0%, hsl(130 40% 55%) 50%, hsl(120 40% 45%) 100%)"}',
   'Forest sage theme');

  -- Set default homepage theme assignment
  INSERT INTO public.page_theme_assignments (page_route, theme_id)
  SELECT '/', id FROM public.site_themes WHERE is_active = true LIMIT 1;
  
END $$;