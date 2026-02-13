/**
 * @fileoverview Module Import Engine — validates and installs module packages.
 *
 * Takes a `ModuleExportBundle` (from JSON import or API) and produces
 * an `ImportPlan` — a validated, actionable plan describing exactly what
 * files to write, dependencies to install, SQL to run, and secrets to configure.
 *
 * The import engine does NOT perform the actual installation (no filesystem writes).
 * It produces a declarative plan that the admin UI or a CLI tool executes.
 * This separation ensures the engine is testable and environment-agnostic.
 *
 * ## Import Flow
 * 1. User uploads/pastes a module bundle JSON
 * 2. `validateBundle()` — Zod-validates the manifest
 * 3. `generateImportPlan()` — Produces the ImportPlan
 * 4. Admin UI displays the plan for review
 * 5. `executeImportPlan()` — Platform applies the plan (writes files, etc.)
 *
 * ## Conflict Resolution
 * - If a module with the same ID already exists, the import is flagged as
 *   an "upgrade" with a diff of changed files.
 * - File conflicts (existing files at target paths) are listed explicitly.
 *
 * ## Portability
 * - Depends only on `manifest.ts` and `registry.ts`. No filesystem or DB imports.
 */

import { moduleManifestSchema, BASELINE_SPEC } from './manifest';
import type { ModuleManifest } from './manifest';
import type { ModuleExportBundle } from './exportEngine';
import { getModule } from './registry';

// ─── TYPES ───────────────────────────────────────────────────

/** Result of bundle validation */
export interface ValidationResult {
  /** Whether the bundle is valid */
  valid: boolean;
  /** Validation errors (empty if valid) */
  errors: string[];
  /** Warnings that don't block import but should be reviewed */
  warnings: string[];
  /** The validated manifest (null if invalid) */
  manifest: ModuleManifest | null;
}

/** A single file operation in the import plan */
export interface FileOperation {
  /** Target file path relative to src/modules/<module-id>/ */
  relativePath: string;
  /** Full target path relative to project root */
  targetPath: string;
  /** File content to write */
  content: string;
  /** Whether this file already exists (conflict) */
  isConflict: boolean;
  /** Operation type */
  action: 'create' | 'overwrite';
}

/** The complete import plan */
export interface ImportPlan {
  /** Module identity from manifest */
  module: ModuleManifest['module'];
  /** Whether this is an upgrade of an existing module */
  isUpgrade: boolean;
  /** Previous version if upgrading */
  previousVersion?: string;
  /** File operations to execute */
  fileOperations: FileOperation[];
  /** Edge function file operations */
  edgeFunctionOperations: FileOperation[];
  /** SQL to run against the database */
  sqlStatements: string[];
  /** npm packages to install */
  packagesToInstall: string[];
  /** Secrets that need to be configured */
  secretsToAdd: Array<{ name: string; description: string; required: boolean }>;
  /** Line to add to src/modules/index.ts barrel import */
  barrelImportLine: string;
  /** Missing baseline files (if any — blocks import) */
  missingBaseline: string[];
  /** Warnings for the admin to review */
  warnings: string[];
}

// ─── VALIDATION ──────────────────────────────────────────────

/**
 * Validate a raw bundle object (parsed from JSON).
 * Checks manifest schema, file inventory completeness, and baseline compatibility.
 */
export function validateBundle(rawBundle: unknown): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!rawBundle || typeof rawBundle !== 'object') {
    return { valid: false, errors: ['Bundle must be a non-null object'], warnings: [], manifest: null };
  }

  const bundle = rawBundle as Record<string, unknown>;

  // Validate manifest
  if (!bundle.manifest) {
    errors.push('Bundle is missing the "manifest" field');
    return { valid: false, errors, warnings, manifest: null };
  }

  const manifestResult = moduleManifestSchema.safeParse(bundle.manifest);
  if (!manifestResult.success) {
    for (const issue of manifestResult.error.issues) {
      errors.push(`Manifest validation: ${issue.path.join('.')} — ${issue.message}`);
    }
    return { valid: false, errors, warnings, manifest: null };
  }

  const manifest = manifestResult.data;

  // Validate files map exists
  if (!bundle.files || typeof bundle.files !== 'object') {
    errors.push('Bundle is missing the "files" map');
    return { valid: false, errors, warnings, manifest };
  }

  const files = bundle.files as Record<string, string>;

  // Validate entry file exists
  if (!files[manifest.files.entry]) {
    errors.push(`Entry file "${manifest.files.entry}" is missing from the files map`);
  }

  // Validate all declared files exist
  for (const declared of manifest.files.includes) {
    if (!files[declared]) {
      errors.push(`Declared file "${declared}" is missing from the files map`);
    }
  }

  // Check for undeclared files
  for (const filePath of Object.keys(files)) {
    if (!manifest.files.includes.includes(filePath)) {
      warnings.push(`File "${filePath}" is in the bundle but not declared in manifest.files.includes`);
    }
  }

  // Check baseline version compatibility
  if (manifest.baselineVersion !== BASELINE_SPEC.version) {
    warnings.push(
      `Module requires baseline v${manifest.baselineVersion} but current baseline is v${BASELINE_SPEC.version}`
    );
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
    manifest,
  };
}

// ─── IMPORT PLAN GENERATION ──────────────────────────────────

/**
 * Generate a declarative import plan from a validated bundle.
 *
 * @param bundle - A validated ModuleExportBundle
 * @param existingFiles - Set of file paths that already exist in the target project
 * @returns ImportPlan describing all operations needed to install the module
 */
export function generateImportPlan(
  bundle: ModuleExportBundle,
  existingFiles: Set<string> = new Set(),
): ImportPlan {
  const { manifest, files, edgeFunctions } = bundle;
  const moduleDir = `src/modules/${manifest.module.id}`;

  // Check if module already exists
  const existingModule = getModule(manifest.module.id);
  const isUpgrade = !!existingModule;

  // Build file operations
  const fileOperations: FileOperation[] = Object.entries(files).map(([relativePath, content]) => {
    const targetPath = `${moduleDir}/${relativePath}`;
    const isConflict = existingFiles.has(targetPath);
    return {
      relativePath,
      targetPath,
      content,
      isConflict,
      action: isConflict ? 'overwrite' as const : 'create' as const,
    };
  });

  // Build edge function operations
  const edgeFunctionOperations: FileOperation[] = Object.entries(edgeFunctions).map(([relativePath, content]) => {
    const targetPath = `supabase/functions/${relativePath}`;
    const isConflict = existingFiles.has(targetPath);
    return {
      relativePath,
      targetPath,
      content,
      isConflict,
      action: isConflict ? 'overwrite' as const : 'create' as const,
    };
  });

  // SQL statements from schema file
  const sqlStatements: string[] = [];
  if (manifest.database.schemaFile && files[manifest.database.schemaFile]) {
    sqlStatements.push(files[manifest.database.schemaFile]);
  }

  // Packages to install (beyond baseline)
  const packagesToInstall = Object.entries(manifest.dependencies.runtime)
    .map(([pkg, ver]) => `${pkg}@${ver}`);

  // Barrel import line
  const barrelImportLine = `import './${manifest.module.id}';`;

  // Check baseline files exist
  const missingBaseline: string[] = [];
  for (const kernelFile of BASELINE_SPEC.kernelFiles) {
    if (!existingFiles.has(`src/${kernelFile}`)) {
      missingBaseline.push(`src/${kernelFile}`);
    }
  }
  for (const sharedFile of BASELINE_SPEC.sharedFiles) {
    if (!existingFiles.has(`src/${sharedFile}`)) {
      missingBaseline.push(`src/${sharedFile}`);
    }
  }

  // Warnings
  const warnings: string[] = [];
  if (isUpgrade) {
    warnings.push(
      `Module "${manifest.module.id}" v${existingModule!.version} already exists. ` +
      `This will upgrade to v${manifest.module.version}.`
    );
  }
  if (manifest.moduleDependencies.length > 0) {
    for (const dep of manifest.moduleDependencies) {
      if (!getModule(dep)) {
        warnings.push(`Required module dependency "${dep}" is not installed.`);
      }
    }
  }
  if (fileOperations.some(op => op.isConflict)) {
    const conflicts = fileOperations.filter(op => op.isConflict).map(op => op.targetPath);
    warnings.push(`${conflicts.length} file(s) will be overwritten: ${conflicts.join(', ')}`);
  }

  return {
    module: manifest.module,
    isUpgrade,
    previousVersion: existingModule?.version,
    fileOperations,
    edgeFunctionOperations,
    sqlStatements,
    packagesToInstall,
    secretsToAdd: manifest.secrets.map(s => ({
      name: s.name,
      description: s.description,
      required: s.required,
    })),
    barrelImportLine,
    missingBaseline,
    warnings,
  };
}
