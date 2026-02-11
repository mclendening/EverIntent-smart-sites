
-- Add ADA widget configuration to site_themes
ALTER TABLE public.site_themes 
ADD COLUMN IF NOT EXISTS ada_widget_config jsonb NOT NULL DEFAULT '{
  "enabled": true,
  "position": "bottom-right",
  "hideOnMobile": false,
  "hideOnDesktop": false,
  "pauseUntil": null,
  "hiddenIndefinitely": false,
  "iconType": "universal",
  "iconColor": "0 0% 100%",
  "iconBgColor": "240 70% 60%",
  "iconSize": 48,
  "iconShape": "circle"
}'::jsonb;
