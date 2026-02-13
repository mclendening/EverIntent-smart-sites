/**
 * @fileoverview Module Manager module — self-registers with the platform module registry.
 *
 * Provides the admin UI for exporting and importing portable EverIntent modules.
 * This is a meta-module — it manages other modules rather than domain data.
 *
 * ## What This Module Owns
 * - Admin UI: Module Manager hub (/admin/modules) with Export, Import, Baseline tabs
 * - No database tables — operates on the module registry and file system
 * - Export engine: Generates portable module bundles with manifests
 * - Import engine: Validates bundles and generates declarative install plans
 *
 * ## Portability
 * - This module is part of the baseline build system.
 * - Depends on: registry.ts, types.ts, manifest.ts, exportEngine.ts, importEngine.ts
 */

import { registerModule } from '../registry';
import type { ModuleDefinition } from '../types';
import { ModuleCategory } from '../types';
import { Package } from 'lucide-react';
import { ModuleManagerHub } from './components';

export const moduleManagerModule: ModuleDefinition = {
  id: 'module-manager',
  name: 'Module Manager',
  description: 'Export, import, and manage portable EverIntent modules.',
  version: '1.0.0',
  navItems: [
    {
      label: 'Modules',
      path: 'modules',
      icon: Package,
      category: ModuleCategory.Settings,
      description: 'Export and import modules',
      detail: 'Manage portable module packages with the EverIntent Module Standard',
    },
  ],
  routes: [
    {
      path: 'modules',
      Component: ModuleManagerHub,
    },
  ],
};

registerModule(moduleManagerModule);
