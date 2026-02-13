/**
 * @fileoverview Module barrel — imports all feature modules to trigger self-registration.
 *
 * This file MUST be imported early in the app startup (e.g., in routes.tsx or main.tsx)
 * before the admin shell reads the registry. The import order doesn't matter —
 * each module registers independently.
 *
 * ## Adding a New Module
 * 1. Create `src/modules/<name>/index.ts` with a `registerModule()` call.
 * 2. Add `import './modules/<name>';` below.
 * That's it. The admin shell picks it up automatically.
 */

// Feature modules — each import triggers self-registration
import './themes';
import './submissions';
import './portfolio';
import './testimonials';
import './playground';
import './module-manager';

// Re-export registry utilities for convenience
export { getModules, getModule, registerModule } from './registry';
export type { ModuleDefinition, ModuleNavItem, ModuleCategory } from './types';
