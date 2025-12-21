-- Add CSS config column to store generated index.css content
ALTER TABLE public.published_theme_configs 
ADD COLUMN config_css text;