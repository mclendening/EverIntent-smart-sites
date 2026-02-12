/**
 * @fileoverview Shared module utilities barrel export.
 *
 * Re-exports the generic CRUD data layer, TanStack Query hooks factory,
 * and shared admin UI pattern components used by all feature modules.
 *
 * ## Exports
 *
 * ### Data Layer
 * - `createCrudService` — Factory for typed, Zod-validated Supabase CRUD operations
 * - `createCrudHooks` — Factory for TanStack Query hooks wrapping a CrudService
 * - `CrudServiceError` — Structured error class for Supabase failures
 *
 * ### Admin UI Patterns
 * - `AdminListView` — Generic data table with loading/empty states and create button
 * - `AdminDetailView` — Detail/edit page shell with back nav and action bar
 * - `AdminFormEditor` — Dynamic form with Zod validation and field type rendering
 *
 * ### Type Contracts
 * - `FieldDef` — Declarative form field descriptor
 * - `ColumnDef<T>` — Declarative table column descriptor
 * - `CrudServiceConfig`, `CrudService`, `ListOptions`, `CrudHooks`
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

export { AdminListView, type AdminListViewProps } from './AdminListView';
export { AdminDetailView, type AdminDetailViewProps } from './AdminDetailView';
export { AdminFormEditor, type AdminFormEditorProps } from './AdminFormEditor';
export type { FieldDef, ColumnDef } from './types';
