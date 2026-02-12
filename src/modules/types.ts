/**
 * @fileoverview Platform module type definitions.
 *
 * Defines the contract every feature module must implement to integrate
 * with the admin shell. This is the foundation of the plugin architecture.
 *
 * ## Data Contract
 * - `ModuleDefinition`: Core registration interface — id, name, routes, nav items
 * - `ModuleNavItem`: Navigation entry for the admin sidebar/dashboard
 * - `ModuleCategory`: Grouping enum for organizing nav items
 *
 * ## Portability
 * - Zero dependencies on project-specific code
 * - Copy this file + registry.ts into any React Router project
 */

import type { RouteObject } from 'react-router-dom';

/**
 * Categories for grouping modules in the admin navigation.
 */
export enum ModuleCategory {
  Content = 'Content',
  Appearance = 'Appearance',
  Commerce = 'Commerce',
  Settings = 'Settings',
  Tools = 'Tools',
}

/**
 * A navigation entry registered by a module.
 * The admin shell renders these as cards on the dashboard
 * and items in the sidebar navigation.
 */
export interface ModuleNavItem {
  /** Display label (e.g., "Themes") */
  label: string;
  /** Admin-relative path (e.g., "themes" → renders at /admin/themes) */
  path: string;
  /** Lucide icon component */
  icon?: React.ComponentType<{ className?: string }>;
  /** Category for grouping in navigation */
  category?: ModuleCategory;
  /** Short description shown on dashboard cards */
  description?: string;
  /** Detailed description shown on dashboard cards */
  detail?: string;
  /** Required permission (future use) */
  requiredRole?: 'admin' | 'moderator' | 'user';
}

/**
 * The core contract every feature module must implement.
 *
 * Modules self-register by calling `registerModule()` from their
 * barrel export (`src/modules/<name>/index.ts`).
 *
 * ## Example
 * ```ts
 * import { registerModule } from '../registry';
 * import { themeModule } from './definition';
 * registerModule(themeModule);
 * ```
 */
export interface ModuleDefinition {
  /** Unique identifier (e.g., "themes", "submissions") */
  id: string;
  /** Human-readable display name */
  name: string;
  /** Brief description of the module's purpose */
  description: string;
  /** Semantic version string */
  version: string;
  /** Navigation items for the admin shell */
  navItems: ModuleNavItem[];
  /**
   * React Router route objects for this module.
   * Paths are relative to /admin/ (e.g., path: "themes").
   * The admin shell wraps these in AdminGuard automatically.
   */
  routes: RouteObject[];
  /** Whether the module is currently enabled */
  enabled?: boolean;
}
