UPDATE site_themes 
SET static_colors = '{
  "background": "0 0% 100%",
  "foreground": "222 47% 11%",
  "card": "0 0% 100%",
  "cardForeground": "222 47% 11%",
  "popover": "0 0% 100%",
  "popoverForeground": "222 47% 11%",
  "primary": "215 25% 27%",
  "primaryLight": "215 20% 46%",
  "primaryForeground": "0 0% 100%",
  "secondary": "222 47% 96%",
  "secondaryForeground": "222 47% 11%",
  "muted": "222 47% 96%",
  "mutedForeground": "215 16% 47%",
  "border": "215 25% 88%",
  "input": "215 25% 88%",
  "ring": "247 92% 50%"
}'::jsonb
WHERE id = '69c97504-8907-4947-bd97-91effa2dbdbf';
