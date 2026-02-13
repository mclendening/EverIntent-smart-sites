-- Theme Module Database Schema
-- Run this against your Supabase project to create the required tables.
-- This file is documentation only — the actual migrations are in supabase/migrations/.

-- ─── SITE THEMES ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.site_themes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  base_hue NUMERIC NOT NULL DEFAULT 240,
  default_mode TEXT NOT NULL DEFAULT 'dark',
  is_active BOOLEAN DEFAULT false,
  version INTEGER NOT NULL DEFAULT 1,
  accent_config JSONB DEFAULT '{}'::jsonb,
  accent_locked_to_base BOOLEAN DEFAULT true,
  primitive_tokens JSONB DEFAULT '{}'::jsonb,
  semantic_tokens JSONB DEFAULT '{}'::jsonb,
  component_tokens JSONB DEFAULT '{}'::jsonb,
  static_colors JSONB DEFAULT '{}'::jsonb,
  dark_mode_overrides JSONB DEFAULT NULL,
  style_modules JSONB DEFAULT '[]'::jsonb,
  typography_config JSONB DEFAULT '{}'::jsonb,
  motion_config JSONB DEFAULT '{}'::jsonb,
  ecommerce_colors JSONB DEFAULT '{}'::jsonb,
  cta_variants JSONB DEFAULT '{}'::jsonb,
  ada_widget_config JSONB DEFAULT '{}'::jsonb,
  ghl_chat_config JSONB DEFAULT '{}'::jsonb,
  gradient_configs JSONB DEFAULT '{}'::jsonb,
  logo_version_id UUID REFERENCES public.logo_versions(id),
  changelog_notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.site_themes ENABLE ROW LEVEL SECURITY;

-- ─── PUBLISHED THEME CONFIGS ─────────────────────────────────
CREATE TABLE IF NOT EXISTS public.published_theme_configs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  source_theme_id UUID REFERENCES public.site_themes(id),
  source_theme_name TEXT NOT NULL,
  config_json JSONB NOT NULL,
  config_typescript TEXT NOT NULL,
  config_css TEXT,
  version INTEGER NOT NULL DEFAULT 1,
  is_active BOOLEAN DEFAULT true,
  is_default BOOLEAN DEFAULT false,
  notes TEXT,
  created_by UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.published_theme_configs ENABLE ROW LEVEL SECURITY;

-- ─── PAGE THEME ASSIGNMENTS ─────────────────────────────────
CREATE TABLE IF NOT EXISTS public.page_theme_assignments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  page_route TEXT NOT NULL,
  theme_id UUID REFERENCES public.site_themes(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.page_theme_assignments ENABLE ROW LEVEL SECURITY;

-- ─── VERSION SEQUENCER ───────────────────────────────────────
CREATE OR REPLACE FUNCTION public.get_next_theme_config_version()
RETURNS INTEGER
LANGUAGE sql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT COALESCE(MAX(version), 0) + 1 FROM public.published_theme_configs;
$$;
