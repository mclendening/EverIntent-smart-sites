-- =============================================
-- THEMING SYSTEM TABLES
-- =============================================

-- 1. Logo Versions - stores all logo configurations with versioning
CREATE TABLE public.logo_versions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  version INTEGER NOT NULL DEFAULT 1,
  name TEXT NOT NULL,
  
  -- Ever element config
  ever_config JSONB NOT NULL DEFAULT '{
    "size": 72,
    "weight": 700,
    "marginLeft": 0,
    "marginRight": 0,
    "verticalOffset": 0,
    "useGradient": false,
    "solidColor": "#FFFFFF",
    "gradientFrom": "#FFFFFF",
    "gradientTo": "#A855F7",
    "gradientAngle": 135
  }'::jsonb,
  
  -- Intent element config (BASE COLOR)
  intent_config JSONB NOT NULL DEFAULT '{
    "size": 72,
    "weight": 700,
    "marginLeft": 0,
    "marginRight": 0,
    "verticalOffset": 1,
    "useGradient": false,
    "solidColor": "#A855F7",
    "gradientFrom": "#A855F7",
    "gradientTo": "#FFFFFF",
    "gradientAngle": 135
  }'::jsonb,
  
  -- Streak config
  streak_config JSONB NOT NULL DEFAULT '{
    "length": 373,
    "leftThick": 4,
    "rightThick": 1,
    "marginLeft": 0,
    "marginRight": 0,
    "useGradient": true,
    "solidColor": "#A855F7",
    "gradientFrom": "#A855F7",
    "gradientTo": "#FBF9F9",
    "gradientAngle": 90
  }'::jsonb,
  
  -- Tagline config
  tagline_config JSONB NOT NULL DEFAULT '{
    "size": 29,
    "weight": 400,
    "marginTop": 5,
    "marginLeft": 0,
    "marginRight": 0,
    "useGradient": false,
    "solidColor": "#FFFFFF",
    "gradientFrom": "#FFFFFF",
    "gradientTo": "#A855F7",
    "gradientAngle": 135
  }'::jsonb,
  
  tagline_text TEXT DEFAULT 'Web Design & Automation',
  is_active BOOLEAN DEFAULT false,
  changelog_notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. Site Themes - stores full theme configurations
CREATE TABLE public.site_themes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  version INTEGER NOT NULL DEFAULT 1,
  name TEXT NOT NULL,
  logo_version_id UUID REFERENCES public.logo_versions(id) ON DELETE SET NULL,
  
  -- Base hue from Intent color (0-360)
  base_hue INTEGER NOT NULL DEFAULT 270,
  
  -- Lock accent colors to base
  accent_locked_to_base BOOLEAN DEFAULT true,
  
  -- Accent colors config (gold family by default)
  accent_config JSONB NOT NULL DEFAULT '{
    "accent": "38 92% 50%",
    "accentHover": "32 95% 44%",
    "accentGlow": "38 92% 50%",
    "accentForeground": "222 47% 11%"
  }'::jsonb,
  
  -- Static colors (same across themes)
  static_colors JSONB NOT NULL DEFAULT '{
    "background": "0 0% 100%",
    "foreground": "222 47% 11%",
    "muted": "60 5% 96%",
    "mutedForeground": "215 16% 47%",
    "border": "220 13% 91%",
    "input": "220 13% 91%",
    "card": "0 0% 100%",
    "cardForeground": "222 47% 11%",
    "primary": "222 47% 11%",
    "primaryLight": "215 25% 27%",
    "primaryForeground": "0 0% 100%",
    "secondary": "60 9% 98%",
    "secondaryForeground": "222 47% 11%"
  }'::jsonb,
  
  -- Gradient configurations
  gradient_configs JSONB NOT NULL DEFAULT '{
    "hero": "linear-gradient(135deg, hsl(222 47% 11%) 0%, hsl(215 25% 27%) 50%, hsl(222 47% 11%) 100%)",
    "text": "linear-gradient(135deg, hsl(38 92% 50%) 0%, hsl(45 93% 58%) 50%, hsl(38 92% 50%) 100%)",
    "cta": "linear-gradient(135deg, hsl(38 92% 50%) 0%, hsl(32 95% 44%) 100%)"
  }'::jsonb,
  
  -- Dark mode overrides
  dark_mode_overrides JSONB DEFAULT '{}'::jsonb,
  
  is_active BOOLEAN DEFAULT false,
  changelog_notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3. Page Theme Assignments - maps routes to themes
CREATE TABLE public.page_theme_assignments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  page_route TEXT NOT NULL UNIQUE,
  theme_id UUID REFERENCES public.site_themes(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.logo_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_themes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.page_theme_assignments ENABLE ROW LEVEL SECURITY;

-- RLS Policies for logo_versions
CREATE POLICY "Anyone can view logo versions"
  ON public.logo_versions FOR SELECT
  USING (true);

CREATE POLICY "Admins can insert logo versions"
  ON public.logo_versions FOR INSERT
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update logo versions"
  ON public.logo_versions FOR UPDATE
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete logo versions"
  ON public.logo_versions FOR DELETE
  USING (has_role(auth.uid(), 'admin'::app_role));

-- RLS Policies for site_themes
CREATE POLICY "Anyone can view themes"
  ON public.site_themes FOR SELECT
  USING (true);

CREATE POLICY "Admins can insert themes"
  ON public.site_themes FOR INSERT
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update themes"
  ON public.site_themes FOR UPDATE
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete themes"
  ON public.site_themes FOR DELETE
  USING (has_role(auth.uid(), 'admin'::app_role));

-- RLS Policies for page_theme_assignments
CREATE POLICY "Anyone can view page assignments"
  ON public.page_theme_assignments FOR SELECT
  USING (true);

CREATE POLICY "Admins can insert page assignments"
  ON public.page_theme_assignments FOR INSERT
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update page assignments"
  ON public.page_theme_assignments FOR UPDATE
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete page assignments"
  ON public.page_theme_assignments FOR DELETE
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Triggers for updated_at
CREATE TRIGGER update_logo_versions_updated_at
  BEFORE UPDATE ON public.logo_versions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_site_themes_updated_at
  BEFORE UPDATE ON public.site_themes
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_page_theme_assignments_updated_at
  BEFORE UPDATE ON public.page_theme_assignments
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();