
-- Task 7.27: Seed initial Style Modules into all 10 themes
-- Modules: checkout-progress, comparison-grid, sms-demo
-- Token values are hue-adaptive using each theme's accent_config

WITH theme_accents AS (
  SELECT id,
    accent_config->>'accent' as accent,
    accent_config->>'accentGlow' as accent_glow,
    ecommerce_colors->>'gold' as gold
  FROM site_themes
)
UPDATE site_themes SET style_modules = jsonb_build_array(
  jsonb_build_object(
    'id', 'mod-checkout-progress',
    'name', 'checkout-progress',
    'description', 'Checkout step indicator tokens (progress circles, connectors, states)',
    'tokens', jsonb_build_array(
      jsonb_build_object('name', 'step-active-bg', 'value', ta.accent, 'description', 'Active step circle background'),
      jsonb_build_object('name', 'step-active-fg', 'value', '0 0% 100%', 'description', 'Active step circle foreground'),
      jsonb_build_object('name', 'step-active-border', 'value', ta.accent, 'description', 'Active step circle border'),
      jsonb_build_object('name', 'step-complete-bg', 'value', ta.accent, 'description', 'Completed step circle fill'),
      jsonb_build_object('name', 'step-complete-fg', 'value', '0 0% 100%', 'description', 'Completed step checkmark'),
      jsonb_build_object('name', 'step-inactive-border', 'value', '215 16% 47%', 'description', 'Inactive step border (muted)'),
      jsonb_build_object('name', 'step-inactive-fg', 'value', '215 16% 47%', 'description', 'Inactive step number (muted)'),
      jsonb_build_object('name', 'connector-active', 'value', ta.accent, 'description', 'Completed connector line'),
      jsonb_build_object('name', 'connector-inactive', 'value', '215 16% 30%', 'description', 'Pending connector line'),
      jsonb_build_object('name', 'label-active', 'value', ta.accent, 'description', 'Current step label'),
      jsonb_build_object('name', 'label-inactive', 'value', '215 16% 47%', 'description', 'Non-current step label'),
      jsonb_build_object('name', 'step-current-bg', 'value', ta.accent_glow, 'description', 'Current step glow ring')
    )
  ),
  jsonb_build_object(
    'id', 'mod-comparison-grid',
    'name', 'comparison-grid',
    'description', 'Plan comparison table tokens (headers, rows, checkmarks, tier accents)',
    'tokens', jsonb_build_array(
      jsonb_build_object('name', 'header-bg', 'value', '222 47% 8%', 'description', 'Column header background'),
      jsonb_build_object('name', 'header-fg', 'value', '0 0% 100%', 'description', 'Column header text'),
      jsonb_build_object('name', 'row-stripe', 'value', '222 47% 6%', 'description', 'Alternating row background'),
      jsonb_build_object('name', 'row-border', 'value', '215 25% 15%', 'description', 'Row divider border'),
      jsonb_build_object('name', 'check-color', 'value', '142 71% 45%', 'description', 'Feature checkmark (green)'),
      jsonb_build_object('name', 'x-color', 'value', '0 0% 40%', 'description', 'Feature excluded X (dim)'),
      jsonb_build_object('name', 'tier-accent', 'value', ta.accent, 'description', 'Tier column highlight'),
      jsonb_build_object('name', 'price-color', 'value', ta.gold, 'description', 'Price text (gold)'),
      jsonb_build_object('name', 'tooltip-bg', 'value', '222 47% 14%', 'description', 'Tooltip background'),
      jsonb_build_object('name', 'tooltip-fg', 'value', '60 9% 98%', 'description', 'Tooltip text'),
      jsonb_build_object('name', 'cta-bg', 'value', ta.accent, 'description', 'CTA button background'),
      jsonb_build_object('name', 'cta-fg', 'value', '0 0% 100%', 'description', 'CTA button text')
    )
  ),
  jsonb_build_object(
    'id', 'mod-sms-demo',
    'name', 'sms-demo',
    'description', 'SMS conversation demo tokens (bubbles, system alerts, typing indicator)',
    'tokens', jsonb_build_array(
      jsonb_build_object('name', 'incoming-bg', 'value', '222 47% 14%', 'description', 'Incoming message bubble'),
      jsonb_build_object('name', 'incoming-fg', 'value', '60 9% 98%', 'description', 'Incoming message text'),
      jsonb_build_object('name', 'outgoing-bg', 'value', ta.accent, 'description', 'Outgoing message bubble'),
      jsonb_build_object('name', 'outgoing-fg', 'value', '0 0% 100%', 'description', 'Outgoing message text'),
      jsonb_build_object('name', 'system-bg', 'value', '0 84% 60%', 'description', 'System alert bubble (red)'),
      jsonb_build_object('name', 'system-fg', 'value', '0 0% 100%', 'description', 'System alert text'),
      jsonb_build_object('name', 'timestamp', 'value', '215 16% 47%', 'description', 'Timestamp color'),
      jsonb_build_object('name', 'typing-dot', 'value', '215 16% 47%', 'description', 'Typing indicator dot'),
      jsonb_build_object('name', 'chat-bg', 'value', '222 47% 5%', 'description', 'Chat window background'),
      jsonb_build_object('name', 'header-bg', 'value', '222 47% 8%', 'description', 'Chat header background'),
      jsonb_build_object('name', 'header-fg', 'value', '0 0% 100%', 'description', 'Chat header text'),
      jsonb_build_object('name', 'checkmark-sent', 'value', '215 16% 47%', 'description', 'Sent checkmark (gray)'),
      jsonb_build_object('name', 'checkmark-read', 'value', '210 91% 65%', 'description', 'Read checkmark (blue)')
    )
  )
)
FROM theme_accents ta
WHERE site_themes.id = ta.id;
