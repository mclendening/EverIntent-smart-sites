/**
 * @fileoverview EverIntent Module Manifest — JSON schema and types for portable module packages.
 *
 * A module manifest (`everintent-module.json`) is the package descriptor that accompanies
 * every exported module. It declares the module's identity, file inventory, database
 * requirements, npm dependencies, and compatibility constraints so the import engine
 * can validate and install the module into any conforming EverIntent baseline project.
 *
 * ## Package Format
 * An exported module is a directory (or zip) containing:
 * ```
 * <module-id>/
 * ├── everintent-module.json   ← This manifest
 * ├── index.ts                 ← Registration + barrel exports
 * ├── service.ts               ← Data layer (CrudService or DI client)
 * ├── schemas.ts               ← Zod validation (optional)
 * ├── types.ts                 ← Module-specific type definitions (optional)
 * ├── components/              ← UI components
 * ├── hooks/                   ← React hooks
 * ├── lib/                     ← Utilities, publishers, config
 * └── schema.sql               ← Database DDL (optional)
 * ```
 *
 * ## Baseline Requirements
 * The target project must have the EverIntent Baseline Build System installed:
 * - `src/modules/registry.ts` — Module registration engine
 * - `src/modules/types.ts` — ModuleDefinition contract
 * - `src/modules/shared/` — CrudService, createCrudHooks, AdminListView,
 *   AdminDetailView, AdminFormEditor, shared types
 * - `src/integrations/supabase/client.ts` — Supabase client
 * - shadcn/ui component library
 * - TanStack Query provider
 * - React Router v6
 *
 * ## Portability
 * Zero runtime dependencies. This file defines types and validation only.
 */

import { z } from 'zod';

// ─── MANIFEST SCHEMA ─────────────────────────────────────────

/**
 * Zod schema for the `everintent-module.json` manifest file.
 * Validates module packages at import time.
 */
export const moduleManifestSchema = z.object({
  /** Manifest format version — allows future schema evolution */
  manifestVersion: z.literal('1.0.0'),

  /** Module identity */
  module: z.object({
    /** Unique identifier matching ModuleDefinition.id (e.g., "themes", "portfolio") */
    id: z.string().min(1).max(50).regex(/^[a-z][a-z0-9-]*$/, 'Must be lowercase kebab-case'),
    /** Human-readable name */
    name: z.string().min(1).max(100),
    /** Brief description */
    description: z.string().max(500),
    /** Semantic version */
    version: z.string().regex(/^\d+\.\d+\.\d+$/, 'Must be semver (e.g., 2.0.0)'),
    /** Module category for admin nav grouping */
    category: z.enum(['Content', 'Appearance', 'Commerce', 'Settings', 'Tools']),
    /** Module author/team */
    author: z.string().optional(),
  }),

  /** Minimum baseline version required to install this module */
  baselineVersion: z.string().regex(/^\d+\.\d+\.\d+$/).default('1.0.0'),

  /** File inventory — relative paths from module root */
  files: z.object({
    /** Entry point (must be index.ts) */
    entry: z.literal('index.ts'),
    /** All files included in the package */
    includes: z.array(z.string().min(1)),
  }),

  /** Database requirements */
  database: z.object({
    /** Supabase tables this module reads/writes */
    tables: z.array(z.string()).default([]),
    /** SQL DDL file for table creation (relative path) */
    schemaFile: z.string().optional(),
    /** RPC functions required */
    functions: z.array(z.string()).default([]),
    /** Storage buckets required */
    storageBuckets: z.array(z.string()).default([]),
  }).default({}),

  /** npm dependencies required (beyond the baseline) */
  dependencies: z.object({
    /** Production dependencies: { "package-name": "^version" } */
    runtime: z.record(z.string()).default({}),
    /** Dev dependencies */
    dev: z.record(z.string()).default({}),
  }).default({}),

  /** Edge functions included with this module */
  edgeFunctions: z.array(z.object({
    /** Function name (directory name under supabase/functions/) */
    name: z.string(),
    /** Description */
    description: z.string().optional(),
  })).default([]),

  /** Secrets required by this module's edge functions */
  secrets: z.array(z.object({
    /** Secret name (e.g., "GITHUB_PAT") */
    name: z.string(),
    /** Description of what the secret is for */
    description: z.string(),
    /** Whether the secret is required or optional */
    required: z.boolean().default(true),
  })).default([]),

  /** Other modules this module depends on */
  moduleDependencies: z.array(z.string()).default([]),
});

/** Inferred TypeScript type for the manifest */
export type ModuleManifest = z.infer<typeof moduleManifestSchema>;

// ─── BASELINE SPEC ───────────────────────────────────────────

/**
 * The EverIntent Baseline Build System specification.
 * Defines the minimum file set and capabilities a target project must have
 * for any EverIntent module to be installable.
 */
export const BASELINE_SPEC = {
  /** Current baseline version */
  version: '1.0.0',

  /** Required kernel files (relative to src/) */
  kernelFiles: [
    'modules/registry.ts',
    'modules/types.ts',
    'modules/index.ts',
  ] as const,

  /** Required shared module files (relative to src/) */
  sharedFiles: [
    'modules/shared/index.ts',
    'modules/shared/crudService.ts',
    'modules/shared/createCrudHooks.ts',
    'modules/shared/types.ts',
    'modules/shared/AdminListView.tsx',
    'modules/shared/AdminDetailView.tsx',
    'modules/shared/AdminFormEditor.tsx',
  ] as const,

  /** Required integration files */
  integrationFiles: [
    'integrations/supabase/client.ts',
    'integrations/supabase/types.ts',
  ] as const,

  /** Required npm packages in the baseline */
  requiredPackages: {
    'react': '^18.0.0',
    'react-dom': '^18.0.0',
    'react-router-dom': '^6.0.0',
    '@tanstack/react-query': '^5.0.0',
    '@supabase/supabase-js': '^2.0.0',
    'zod': '^3.0.0',
    '@hookform/resolvers': '^3.0.0',
    'react-hook-form': '^7.0.0',
    'lucide-react': '^0.400.0',
    'tailwind-merge': '^2.0.0',
    'class-variance-authority': '^0.7.0',
    'clsx': '^2.0.0',
  } as const,

  /** Required shadcn/ui components */
  requiredComponents: [
    'button', 'card', 'input', 'textarea', 'label', 'switch',
    'select', 'table', 'skeleton', 'form', 'toast', 'toaster',
    'dialog', 'accordion', 'tabs', 'badge', 'separator',
    'scroll-area', 'popover', 'dropdown-menu',
  ] as const,
} as const;

/** Type for baseline spec */
export type BaselineSpec = typeof BASELINE_SPEC;
