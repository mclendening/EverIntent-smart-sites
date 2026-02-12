/**
 * @fileoverview Module registry — central catalog of all registered feature modules.
 *
 * Provides `registerModule()` for self-registration and `getModules()` for
 * consuming registered modules in the admin shell (dashboard, routing, nav).
 *
 * ## Architecture
 * - Modules call `registerModule()` from their barrel export on app startup.
 * - The admin shell calls `getModules()` to build routes and navigation dynamically.
 * - Duplicate module IDs throw at registration time (fail-fast).
 *
 * ## Portability
 * - Depends only on `./types.ts`. Copy both files to bootstrap in any project.
 */

import type { ModuleDefinition } from './types';

const registry: ModuleDefinition[] = [];

/**
 * Register a feature module with the platform.
 * Called once per module at app startup (from the module's index.ts).
 *
 * @throws Error if a module with the same ID is already registered.
 */
export function registerModule(module: ModuleDefinition): void {
  if (registry.some((m) => m.id === module.id)) {
    throw new Error(
      `[ModuleRegistry] Module "${module.id}" is already registered. Each module must have a unique ID.`
    );
  }
  registry.push(module);
}

/**
 * Returns all registered modules.
 * Used by the admin shell to build navigation and routes.
 *
 * @param enabledOnly - If true, returns only modules where `enabled !== false`.
 */
export function getModules(enabledOnly = true): readonly ModuleDefinition[] {
  if (enabledOnly) {
    return registry.filter((m) => m.enabled !== false);
  }
  return [...registry];
}

/**
 * Returns a single module by ID, or undefined if not found.
 */
export function getModule(id: string): ModuleDefinition | undefined {
  return registry.find((m) => m.id === id);
}
