/**
 * @fileoverview Theme module — self-registers with the platform module registry.
 *
 * The theme system is the first conforming module in the platform architecture.
 * It registers its admin route and navigation entry so the admin shell
 * renders it automatically.
 *
 * ## What This Module Owns
 * - Database: site_themes, published_theme_configs, page_theme_assignments
 * - Admin UI: Theme list → editor (2-level drill-down)
 * - Publish pipeline: CSS/TS generation, GitHub sync
 * - CSS emission: Runtime theme variables via applyThemeToRoot()
 * - Validation: Zod schemas for all 14 JSONB columns
 * - Data access: ThemeDbClient DI interface with default Supabase implementation
 *
 * ## Barrel Exports
 * This file re-exports all public API surfaces so consumers can import
 * from `@/modules/themes` without reaching into internal paths.
 *
 * ## Portability
 * - Copy this directory + registry.ts + types.ts (platform-level).
 * - Provide an AdminThemes component or use the bundled one.
 * - Run schema.sql against your Supabase instance.
 */

import { registerModule } from '../registry';
import type { ModuleDefinition } from '../types';
import { ModuleCategory } from '../types';
import { Palette } from 'lucide-react';
import AdminThemes from './components/ThemesPage';

// ─── MODULE DEFINITION ───────────────────────────────────────

export const themesModule: ModuleDefinition = {
  id: 'themes',
  name: 'Themes',
  description: 'Manage site themes, colors, typography, and visual identity.',
  version: '2.0.0',
  navItems: [
    {
      label: 'Themes',
      path: 'themes',
      icon: Palette,
      category: ModuleCategory.Appearance,
      description: 'Manage site themes and colors',
      detail: 'Create, edit, and activate visual themes',
    },
  ],
  routes: [
    {
      path: 'themes',
      Component: AdminThemes,
    },
  ],
};

registerModule(themesModule);

// ─── PUBLIC API RE-EXPORTS ───────────────────────────────────

// Types — all theme config interfaces
export type {
  Theme,
  LogoVersion,
  ThemeAdminView,
  AccentConfig,
  StaticColors,
  DarkModeOverrides,
  GradientConfig,
  GHLChatConfig,
  EcommerceColors,
  CtaVariants,
  TypographyConfig,
  MotionConfig,
  StyleModule,
  StyleModuleToken,
  AdaWidgetConfig,
  ParsedThemeConfig,
} from './types';

// Schemas — Zod validation for all JSONB columns
export {
  accentConfigSchema,
  staticColorsSchema,
  darkModeOverridesSchema,
  gradientConfigSchema,
  ghlChatConfigSchema,
  ecommerceColorsSchema,
  ctaVariantsSchema,
  typographyConfigSchema,
  motionConfigSchema,
  styleModuleSchema,
  styleModulesArraySchema,
  adaWidgetConfigSchema,
  parseThemeJsonb,
} from './schemas';

// Service — DI layer
export { supabaseThemeClient } from './service';
export type { ThemeDbClient } from './service';

// Hooks
export { useTheme, useActiveTheme } from './hooks/useTheme';

// Publisher
export type { ThemePublisher, ThemeGeneratorParams } from './lib/themePublisher';
export { generateThemesTs, generateProductionCss } from './lib/themePublisher';

// Config (runtime)
export { activeTheme, getThemeForRoute, applyThemeToRoot } from './lib/themeConfig';
export type { ThemeConfig } from './lib/themeConfig';
