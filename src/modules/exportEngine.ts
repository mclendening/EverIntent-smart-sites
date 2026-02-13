/**
 * @fileoverview Module Export Engine — generates portable module packages.
 *
 * Scans a conforming module directory under `src/modules/<id>/`, generates
 * an `everintent-module.json` manifest, and produces a JSON export bundle
 * that can be imported into any project with the EverIntent Baseline installed.
 *
 * ## Export Format
 * The export produces a JSON object containing:
 * - `manifest`: The complete `everintent-module.json` content
 * - `files`: Map of relative paths → file contents (string)
 * - `edgeFunctions`: Map of function paths → file contents (optional)
 *
 * ## Usage
 * ```ts
 * import { generateModuleExport } from './exportEngine';
 * import { getModule } from './registry';
 *
 * const mod = getModule('themes');
 * const bundle = generateModuleExport('themes', fileReader);
 * // bundle.manifest → everintent-module.json content
 * // bundle.files → { 'index.ts': '...', 'service.ts': '...', ... }
 * ```
 *
 * ## Architecture
 * The export engine is a pure function that takes a module ID and a file reader
 * abstraction. It does NOT touch the filesystem directly — the admin UI provides
 * the file reader (e.g., reading from the Vite dev server or bundled sources).
 *
 * ## Portability
 * - Depends only on `manifest.ts` types. No filesystem or Supabase imports.
 */

import { getModule } from './registry';
import type { ModuleManifest } from './manifest';
import { moduleManifestSchema } from './manifest';
import type { ModuleDefinition } from './types';

// ─── TYPES ───────────────────────────────────────────────────

/** A complete export bundle ready for serialization */
export interface ModuleExportBundle {
  /** Validated manifest */
  manifest: ModuleManifest;
  /** Map of relative file paths → file content strings */
  files: Record<string, string>;
  /** Map of edge function paths → file content strings */
  edgeFunctions: Record<string, string>;
  /** ISO timestamp of export */
  exportedAt: string;
  /** Source project identifier (optional) */
  sourceProject?: string;
}

/** Configuration for export generation */
export interface ExportConfig {
  /** Module ID to export */
  moduleId: string;
  /** Module directory file listing (relative paths from module root) */
  fileList: string[];
  /** Function to read file contents by relative path from module root */
  readFile: (relativePath: string) => string;
  /** Optional: edge function files { 'function-name/index.ts': content } */
  edgeFunctionFiles?: Record<string, string>;
  /** Optional: SQL schema file content */
  sqlSchema?: string;
  /** Optional: additional npm dependencies beyond baseline */
  extraDependencies?: Record<string, string>;
  /** Optional: database tables this module uses */
  tables?: string[];
  /** Optional: RPC functions required */
  rpcFunctions?: string[];
  /** Optional: storage buckets required */
  storageBuckets?: string[];
  /** Optional: secrets required */
  secrets?: Array<{ name: string; description: string; required?: boolean }>;
  /** Optional: other module IDs this depends on */
  moduleDependencies?: string[];
  /** Optional: source project name */
  sourceProject?: string;
}

// ─── CATEGORY RESOLVER ───────────────────────────────────────

/**
 * Resolve the ModuleCategory enum value to the manifest category string.
 */
function resolveCategory(mod: ModuleDefinition): ModuleManifest['module']['category'] {
  const cat = mod.navItems[0]?.category;
  if (cat === 'Content') return 'Content';
  if (cat === 'Appearance') return 'Appearance';
  if (cat === 'Commerce') return 'Commerce';
  if (cat === 'Settings') return 'Settings';
  if (cat === 'Tools') return 'Tools';
  return 'Tools';
}

// ─── EXPORT ENGINE ───────────────────────────────────────────

/**
 * Generate a complete module export bundle from a registered module.
 *
 * @param config - Export configuration with file reader and metadata
 * @returns A validated ModuleExportBundle ready for JSON serialization
 * @throws Error if the module is not registered or manifest validation fails
 */
export function generateModuleExport(config: ExportConfig): ModuleExportBundle {
  const mod = getModule(config.moduleId);
  if (!mod) {
    throw new Error(
      `[ModuleExport] Module "${config.moduleId}" is not registered. ` +
      `Ensure it's imported in src/modules/index.ts.`
    );
  }

  // Build file map
  const files: Record<string, string> = {};
  for (const filePath of config.fileList) {
    files[filePath] = config.readFile(filePath);
  }

  // Build manifest
  const manifestData: ModuleManifest = {
    manifestVersion: '1.0.0',
    module: {
      id: mod.id,
      name: mod.name,
      description: mod.description,
      version: mod.version,
      category: resolveCategory(mod),
    },
    baselineVersion: '1.0.0',
    files: {
      entry: 'index.ts',
      includes: config.fileList,
    },
    database: {
      tables: config.tables ?? [],
      schemaFile: config.sqlSchema ? 'schema.sql' : undefined,
      functions: config.rpcFunctions ?? [],
      storageBuckets: config.storageBuckets ?? [],
    },
    dependencies: {
      runtime: config.extraDependencies ?? {},
      dev: {},
    },
    edgeFunctions: config.edgeFunctionFiles
      ? Object.keys(config.edgeFunctionFiles).map(name => ({
          name: name.split('/')[0],
          description: `Edge function for ${mod.name} module`,
        }))
      : [],
    secrets: (config.secrets ?? []).map(s => ({
      ...s,
      required: s.required ?? true,
    })),
    moduleDependencies: config.moduleDependencies ?? [],
  };

  // Validate manifest
  const manifest = moduleManifestSchema.parse(manifestData);

  // Include SQL schema in files if present
  if (config.sqlSchema) {
    files['schema.sql'] = config.sqlSchema;
  }

  return {
    manifest,
    files,
    edgeFunctions: config.edgeFunctionFiles ?? {},
    exportedAt: new Date().toISOString(),
    sourceProject: config.sourceProject,
  };
}

/**
 * Serialize an export bundle to a JSON string for download/transfer.
 */
export function serializeBundle(bundle: ModuleExportBundle): string {
  return JSON.stringify(bundle, null, 2);
}
