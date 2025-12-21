-- Create table for tracking published theme configurations
-- This provides version history and rollback capability

CREATE TABLE public.published_theme_configs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  version INTEGER NOT NULL DEFAULT 1,
  config_json JSONB NOT NULL,
  config_typescript TEXT NOT NULL,
  source_theme_id UUID REFERENCES public.site_themes(id) ON DELETE SET NULL,
  source_theme_name TEXT NOT NULL,
  is_active BOOLEAN DEFAULT false,
  is_default BOOLEAN DEFAULT false,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL
);

-- Enable RLS
ALTER TABLE public.published_theme_configs ENABLE ROW LEVEL SECURITY;

-- Only admins can view published configs
CREATE POLICY "Admins can view published configs"
  ON public.published_theme_configs
  FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Only admins can insert published configs
CREATE POLICY "Admins can insert published configs"
  ON public.published_theme_configs
  FOR INSERT
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

-- Only admins can update published configs
CREATE POLICY "Admins can update published configs"
  ON public.published_theme_configs
  FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Only admins can delete published configs
CREATE POLICY "Admins can delete published configs"
  ON public.published_theme_configs
  FOR DELETE
  USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Create index for faster lookups
CREATE INDEX idx_published_theme_configs_active ON public.published_theme_configs(is_active);
CREATE INDEX idx_published_theme_configs_created ON public.published_theme_configs(created_at DESC);

-- Add unique constraint on version
CREATE UNIQUE INDEX idx_published_theme_configs_version ON public.published_theme_configs(version);

-- Create function to auto-increment version
CREATE OR REPLACE FUNCTION public.get_next_theme_config_version()
RETURNS INTEGER AS $$
  SELECT COALESCE(MAX(version), 0) + 1 FROM public.published_theme_configs;
$$ LANGUAGE sql SECURITY DEFINER SET search_path = public;

-- Insert default fallback config (version 0, always available)
INSERT INTO public.published_theme_configs (
  version,
  config_json,
  config_typescript,
  source_theme_name,
  is_active,
  is_default,
  notes
) VALUES (
  0,
  '{
    "id": "default-fallback",
    "name": "Default Fallback",
    "baseHue": 38,
    "accentConfig": {
      "accent": "38 92% 50%",
      "accentHover": "32 95% 44%",
      "accentGlow": "38 92% 50%",
      "accentForeground": "222 47% 11%",
      "h": 38,
      "s": 92,
      "l": 50
    },
    "staticColors": {
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
    },
    "gradientConfigs": {
      "hero": "linear-gradient(135deg, hsl(222 47% 7%) 0%, hsl(222 47% 12%) 50%, hsl(222 47% 7%) 100%)",
      "cta": "linear-gradient(135deg, hsl(38 92% 50%) 0%, hsl(32 95% 44%) 100%)",
      "text": "linear-gradient(135deg, hsl(38 92% 50%) 0%, hsl(45 93% 58%) 50%, hsl(38 92% 50%) 100%)"
    }
  }'::jsonb,
  '// DEFAULT FALLBACK - DO NOT DELETE',
  'Default Fallback',
  false,
  true,
  'System default fallback theme - DO NOT DELETE. Used when active config is unavailable.'
);