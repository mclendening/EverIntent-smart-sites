-- Theme system is now 100% config-file driven (src/config/themes.ts).
-- Drop all theme-related DB objects.

DROP TABLE IF EXISTS public.page_theme_assignments CASCADE;
DROP TABLE IF EXISTS public.published_theme_configs CASCADE;
DROP TABLE IF EXISTS public.site_themes CASCADE;
DROP TABLE IF EXISTS public.logo_versions CASCADE;

DROP FUNCTION IF EXISTS public.get_next_theme_config_version();