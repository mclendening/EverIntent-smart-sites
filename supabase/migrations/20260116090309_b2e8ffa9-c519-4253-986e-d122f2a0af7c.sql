-- Rollback Indigo Night theme accent colors to proper values (was incorrectly set to 11% lightness)
UPDATE site_themes 
SET accent_config = jsonb_set(
  jsonb_set(
    jsonb_set(
      accent_config,
      '{accent}', '"240 70% 60%"'
    ),
    '{accentGlow}', '"240 70% 60%"'
  ),
  '{l}', '60'
),
updated_at = now()
WHERE id = '69c97504-8907-4947-bd97-91effa2dbdbf';