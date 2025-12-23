-- Add GHL Chat Widget Configuration to site_themes
-- These values derive from the base theme accent color and allow customization of the GHL shadow DOM styling

ALTER TABLE public.site_themes 
ADD COLUMN IF NOT EXISTS ghl_chat_config jsonb NOT NULL DEFAULT '{
  "textareaBg": "222 47% 7%",
  "textareaText": "60 9% 98%",
  "textareaBorder": "215 25% 20%",
  "textareaFocusBorder": "240 70% 60%",
  "textareaFocusGlow": "240 70% 60%",
  "sendButtonBg": "240 70% 60%",
  "sendButtonBorder": "0 0% 100%",
  "sendButtonIcon": "0 0% 100%",
  "selectionBg": "240 70% 60%"
}'::jsonb;

-- Add comment explaining the column
COMMENT ON COLUMN public.site_themes.ghl_chat_config IS 'GHL chat widget shadow DOM styling. All values are HSL (H S% L%) format. textareaBg/Text for input, sendButton* for the send button, selection* for text selection.';

-- Update existing themes with base hue-derived GHL configs
-- The pattern: sendButton uses accent color, textarea uses dark bg with white text

-- Update Indigo Night (base_hue 240)
UPDATE public.site_themes 
SET ghl_chat_config = '{
  "textareaBg": "222 47% 7%",
  "textareaText": "60 9% 98%",
  "textareaBorder": "215 25% 20%",
  "textareaFocusBorder": "240 70% 60%",
  "textareaFocusGlow": "240 70% 60%",
  "sendButtonBg": "240 70% 60%",
  "sendButtonBorder": "0 0% 100%",
  "sendButtonIcon": "0 0% 100%",
  "selectionBg": "240 70% 60%"
}'::jsonb
WHERE name = 'Indigo Night';