/**
 * @fileoverview ThemeDbClient — Dependency Injection layer for theme data access.
 *
 * Decouples the theme module from any specific database implementation.
 * The default export (`supabaseThemeClient`) uses the project's Supabase client,
 * but consumers can provide any implementation of `ThemeDbClient` to power
 * the theme system in a different environment (e.g., mock, REST API, local storage).
 *
 * ## Data Contract
 * - Reads/writes `site_themes` table rows (Tables<'site_themes'>).
 * - Reads `logo_versions` table rows (Tables<'logo_versions'>).
 * - Reads/writes `published_theme_configs` for publish snapshots.
 * - Reads `page_theme_assignments` for route-to-theme mappings.
 * - Calls `get_next_theme_config_version` RPC for version sequencing.
 *
 * ## Security
 * - All operations use the authenticated client; RLS policies apply.
 * - Must be used within an AdminGuard-protected context.
 *
 * ## Portability
 * - Copy this file + `types.ts` to any project.
 * - Implement `ThemeDbClient` against your data layer.
 * - The default Supabase implementation requires `@supabase/supabase-js`
 *   and the matching table schema.
 */

import { supabase } from '@/integrations/supabase/client';
import type { Theme, LogoVersion } from './types';
import type { Tables, Json } from '@/integrations/supabase/types';

// ─── DI INTERFACE ────────────────────────────────────────────

/**
 * Generic data access contract for theme operations.
 * Implement this interface to swap the backing data store.
 */
export interface ThemeDbClient {
  /** Fetch all themes ordered by creation date */
  listThemes(): Promise<Theme[]>;

  /** Fetch a single theme by ID */
  getTheme(id: string): Promise<Theme | null>;

  /** Create a new theme row */
  createTheme(data: Partial<Theme> & { name: string }): Promise<Theme>;

  /** Update an existing theme row */
  updateTheme(id: string, data: Partial<Theme>): Promise<Theme>;

  /** Delete a theme by ID */
  deleteTheme(id: string): Promise<void>;

  /** Fetch all logo versions */
  listLogoVersions(): Promise<LogoVersion[]>;

  /** Fetch route-to-theme assignments */
  listAssignments(): Promise<Array<{ page_route: string; theme_id: string }>>;

  /** Get the next published config version number */
  getNextConfigVersion(): Promise<number>;

  /** Fetch the latest published config */
  getLatestPublishedConfig(): Promise<Tables<'published_theme_configs'> | null>;

  /** Insert a published config snapshot */
  insertPublishedConfig(data: {
    source_theme_id: string;
    source_theme_name: string;
    config_json: Json;
    config_typescript: string;
    config_css: string;
    version: number;
    is_active: boolean;
    is_default: boolean;
    notes: string;
  }): Promise<Tables<'published_theme_configs'>>;
}

// ─── DEFAULT SUPABASE IMPLEMENTATION ─────────────────────────

/**
 * Default ThemeDbClient backed by the project's Supabase instance.
 * Uses RLS-protected queries via the authenticated anon/service client.
 */
export const supabaseThemeClient: ThemeDbClient = {
  async listThemes() {
    const { data, error } = await supabase
      .from('site_themes')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw new Error(`Failed to list themes: ${error.message}`);
    return data ?? [];
  },

  async getTheme(id) {
    const { data, error } = await supabase
      .from('site_themes')
      .select('*')
      .eq('id', id)
      .maybeSingle();
    if (error) throw new Error(`Failed to get theme: ${error.message}`);
    return data;
  },

  async createTheme(themeData) {
    const { data, error } = await supabase
      .from('site_themes')
      .insert(themeData as any)
      .select()
      .single();
    if (error) throw new Error(`Failed to create theme: ${error.message}`);
    return data;
  },

  async updateTheme(id, updates) {
    const { data, error } = await supabase
      .from('site_themes')
      .update(updates as any)
      .eq('id', id)
      .select()
      .single();
    if (error) throw new Error(`Failed to update theme: ${error.message}`);
    return data;
  },

  async deleteTheme(id) {
    const { error } = await supabase
      .from('site_themes')
      .delete()
      .eq('id', id);
    if (error) throw new Error(`Failed to delete theme: ${error.message}`);
  },

  async listLogoVersions() {
    const { data, error } = await supabase
      .from('logo_versions')
      .select('*')
      .order('version', { ascending: false });
    if (error) throw new Error(`Failed to list logo versions: ${error.message}`);
    return data ?? [];
  },

  async listAssignments() {
    const { data, error } = await supabase
      .from('page_theme_assignments')
      .select('page_route, theme_id');
    if (error) throw new Error(`Failed to list assignments: ${error.message}`);
    return (data ?? []).map(a => ({
      page_route: a.page_route,
      theme_id: a.theme_id ?? '',
    }));
  },

  async getNextConfigVersion() {
    const { data, error } = await supabase.rpc('get_next_theme_config_version');
    if (error) throw new Error(`Failed to get next version: ${error.message}`);
    return data ?? 1;
  },

  async getLatestPublishedConfig() {
    const { data, error } = await supabase
      .from('published_theme_configs')
      .select('*')
      .order('version', { ascending: false })
      .limit(1)
      .maybeSingle();
    if (error) throw new Error(`Failed to get latest config: ${error.message}`);
    return data;
  },

  async insertPublishedConfig(configData) {
    const { data, error } = await supabase
      .from('published_theme_configs')
      .insert(configData)
      .select()
      .single();
    if (error) throw new Error(`Failed to insert config: ${error.message}`);
    return data;
  },
};
