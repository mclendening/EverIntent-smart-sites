/**
 * @fileoverview Shared module utilities barrel export.
 *
 * Re-exports the generic CRUD data layer and TanStack Query hooks factory
 * used by all feature modules to interact with Supabase tables.
 *
 * ## Exports
 * - `createCrudService` — Factory for typed, Zod-validated Supabase CRUD operations
 * - `createCrudHooks` — Factory for TanStack Query hooks wrapping a CrudService
 * - `CrudServiceError` — Structured error class for Supabase failures
 * - Type interfaces: `CrudServiceConfig`, `CrudService`, `ListOptions`, `CrudHooks`
 */

export {
  createCrudService,
  CrudServiceError,
  type CrudServiceConfig,
  type CrudService,
  type ListOptions,
} from './crudService';

export {
  createCrudHooks,
  type CrudHooks,
} from './createCrudHooks';
