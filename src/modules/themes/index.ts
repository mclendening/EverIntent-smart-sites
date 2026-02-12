/**
 * @fileoverview Theme module — self-registers with the platform module registry.
 *
 * The theme system is the first conforming module in the platform architecture.
 * It registers its admin route and navigation entry so the admin shell
 * renders it automatically.
 *
 * ## What This Module Owns
 * - Database: site_themes, published_theme_configs, page_theme_assignments
 * - Admin UI: Theme list → detail → editor (3-level drill-down)
 * - Publish pipeline: CSS/TS generation, GitHub sync
 * - CSS emission: Runtime theme variables via applyThemeToRoot()
 */

import { registerModule } from '../registry';
import type { ModuleDefinition } from '../types';
import { ModuleCategory } from '../types';
import { Palette } from 'lucide-react';
import AdminThemes from '@/pages/admin/Themes';

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
