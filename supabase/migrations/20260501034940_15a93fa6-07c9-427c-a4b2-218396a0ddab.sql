-- Theme system migration: DB tables become read-only.
-- Authoritative source of truth is now src/config/themes.ts (file-based, PR-reviewed).
-- These tables are retained for one sprint as a rollback safety net, then dropped.

-- Replace all admin write policies with deny-writes (NULL using/with-check rejects all).
-- Anonymous and admin SELECT remains intact.

-- ── site_themes ──
DROP POLICY IF EXISTS "Admins can insert themes" ON public.site_themes;
DROP POLICY IF EXISTS "Admins can update themes" ON public.site_themes;
DROP POLICY IF EXISTS "Admins can delete themes" ON public.site_themes;

CREATE POLICY "Theme writes disabled (config-file authority)"
  ON public.site_themes FOR INSERT TO public WITH CHECK (false);
CREATE POLICY "Theme updates disabled (config-file authority)"
  ON public.site_themes FOR UPDATE TO public USING (false);
CREATE POLICY "Theme deletes disabled (config-file authority)"
  ON public.site_themes FOR DELETE TO public USING (false);

-- ── published_theme_configs ──
DROP POLICY IF EXISTS "Admins can insert published configs" ON public.published_theme_configs;
DROP POLICY IF EXISTS "Admins can update published configs" ON public.published_theme_configs;
DROP POLICY IF EXISTS "Admins can delete published configs" ON public.published_theme_configs;

CREATE POLICY "Published-config writes disabled (config-file authority)"
  ON public.published_theme_configs FOR INSERT TO public WITH CHECK (false);
CREATE POLICY "Published-config updates disabled (config-file authority)"
  ON public.published_theme_configs FOR UPDATE TO public USING (false);
CREATE POLICY "Published-config deletes disabled (config-file authority)"
  ON public.published_theme_configs FOR DELETE TO public USING (false);

-- ── page_theme_assignments ──
DROP POLICY IF EXISTS "Admins can insert page assignments" ON public.page_theme_assignments;
DROP POLICY IF EXISTS "Admins can update page assignments" ON public.page_theme_assignments;
DROP POLICY IF EXISTS "Admins can delete page assignments" ON public.page_theme_assignments;

CREATE POLICY "Page-assignment writes disabled (config-file authority)"
  ON public.page_theme_assignments FOR INSERT TO public WITH CHECK (false);
CREATE POLICY "Page-assignment updates disabled (config-file authority)"
  ON public.page_theme_assignments FOR UPDATE TO public USING (false);
CREATE POLICY "Page-assignment deletes disabled (config-file authority)"
  ON public.page_theme_assignments FOR DELETE TO public USING (false);

-- ── logo_versions ──
DROP POLICY IF EXISTS "Admins can insert logo versions" ON public.logo_versions;
DROP POLICY IF EXISTS "Admins can update logo versions" ON public.logo_versions;
DROP POLICY IF EXISTS "Admins can delete logo versions" ON public.logo_versions;

CREATE POLICY "Logo-version writes disabled (config-file authority)"
  ON public.logo_versions FOR INSERT TO public WITH CHECK (false);
CREATE POLICY "Logo-version updates disabled (config-file authority)"
  ON public.logo_versions FOR UPDATE TO public USING (false);
CREATE POLICY "Logo-version deletes disabled (config-file authority)"
  ON public.logo_versions FOR DELETE TO public USING (false);