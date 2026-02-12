/**
 * @fileoverview Generic CRUD data service for Supabase-backed modules.
 *
 * Provides a type-safe, Zod-validated abstraction over raw Supabase queries.
 * Modules instantiate a `CrudService` with their table name and Zod schemas,
 * then call `list()`, `getById()`, `create()`, `update()`, `remove()` instead
 * of touching `supabase.from()` directly.
 *
 * ## Data Contract
 * - `CrudServiceConfig<TRow, TInsert, TUpdate>`: Configuration object
 *   - `table`: Supabase table name (e.g., "portfolio", "testimonials")
 *   - `rowSchema`: Zod schema validating rows returned from SELECT queries
 *   - `insertSchema`: Zod schema validating INSERT payloads (client-side gate)
 *   - `updateSchema`: Zod schema validating UPDATE payloads (partial, client-side gate)
 *   - `defaultOrder`: Optional `{ column, ascending }` for list ordering
 *
 * ## Validation Flow
 * 1. Client calls `create(data)` or `update(id, data)`
 * 2. Zod `.parse()` runs client-side — throws `ZodError` with structured field errors
 * 3. Valid payload sent to Supabase via SDK
 * 4. RLS policies enforce server-side authorization (admin-only for most tables)
 * 5. Returned rows validated against `rowSchema` for type safety
 *
 * ## Error Handling
 * - Zod validation errors: thrown as `ZodError` (caller catches and maps to form errors)
 * - Supabase errors: thrown as `CrudServiceError` with `code`, `message`, `details`
 *
 * ## Portability
 * - Depends on: `@supabase/supabase-js`, `zod`, and `@/integrations/supabase/client`
 * - Copy this file + `createCrudHooks.ts` + the Supabase client into any project
 */

import { z } from 'zod';
import { supabase } from '@/integrations/supabase/client';

/**
 * Configuration for a CrudService instance.
 *
 * @template TRow - Shape of a database row (SELECT result)
 * @template TInsert - Shape of an INSERT payload
 * @template TUpdate - Shape of an UPDATE payload (typically Partial<TInsert>)
 */
export interface CrudServiceConfig<
  TRow,
  TInsert,
  TUpdate,
> {
  /** Supabase table name (e.g., "portfolio") */
  table: string;
  /** Zod schema for validating rows returned from SELECT */
  rowSchema: z.ZodType<TRow>;
  /** Zod schema for validating INSERT payloads */
  insertSchema: z.ZodType<TInsert>;
  /** Zod schema for validating UPDATE payloads */
  updateSchema: z.ZodType<TUpdate>;
  /** Default ordering for list queries */
  defaultOrder?: {
    column: string;
    ascending?: boolean;
  };
}

/**
 * Options for the `list()` method.
 */
export interface ListOptions {
  /** Column-value filters applied as `.eq()` clauses */
  filter?: Record<string, unknown>;
  /** Maximum number of rows to return (default: 100) */
  limit?: number;
  /** Offset for pagination */
  offset?: number;
  /** Override the default ordering */
  orderBy?: { column: string; ascending?: boolean };
}

/**
 * Structured error thrown by CrudService on Supabase failures.
 */
export class CrudServiceError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly details?: string,
  ) {
    super(message);
    this.name = 'CrudServiceError';
  }
}

/**
 * Generic CRUD service for a single Supabase table.
 *
 * ## Usage
 * ```ts
 * const portfolioService = createCrudService({
 *   table: 'portfolio',
 *   rowSchema: portfolioRowSchema,
 *   insertSchema: portfolioInsertSchema,
 *   updateSchema: portfolioUpdateSchema,
 *   defaultOrder: { column: 'display_order', ascending: true },
 * });
 *
 * const items = await portfolioService.list();
 * const item = await portfolioService.create({ title: 'New', slug: 'new' });
 * ```
 */
export interface CrudService<TRow, TInsert, TUpdate> {
  /** Fetch a list of rows with optional filtering, pagination, and ordering. */
  list(opts?: ListOptions): Promise<TRow[]>;
  /** Fetch a single row by UUID primary key. Returns null if not found. */
  getById(id: string): Promise<TRow | null>;
  /** Validate and insert a new row. Returns the created row. */
  create(data: TInsert): Promise<TRow>;
  /** Validate and update an existing row by ID. Returns the updated row. */
  update(id: string, data: Partial<TUpdate>): Promise<TRow>;
  /** Delete a row by ID. */
  remove(id: string): Promise<void>;
}

/**
 * Factory function that creates a `CrudService` instance for a given table.
 *
 * @template TRow - Row shape (SELECT result)
 * @template TInsert - Insert payload shape
 * @template TUpdate - Update payload shape
 */
export function createCrudService<TRow, TInsert, TUpdate>(
  config: CrudServiceConfig<TRow, TInsert, TUpdate>,
): CrudService<TRow, TInsert, TUpdate> {
  const { table, rowSchema, insertSchema, updateSchema, defaultOrder } = config;

  /**
   * Wraps a Supabase query result, throwing CrudServiceError on failure.
   */
  function handleError(error: { code: string; message: string; details?: string }): never {
    throw new CrudServiceError(
      error.message,
      error.code,
      error.details,
    );
  }

  // Use `as any` for table name since createCrudService is generic across
  // arbitrary tables, not just those in the generated Database type.
  // Type safety is enforced by Zod schemas at runtime.
  const from = (t: string) => supabase.from(t as any);

  return {
    async list(opts?: ListOptions): Promise<TRow[]> {
      const limit = opts?.limit ?? 100;
      const offset = opts?.offset ?? 0;
      const order = opts?.orderBy ?? defaultOrder;

      let query = from(table)
        .select('*')
        .range(offset, offset + limit - 1);

      // Apply equality filters
      if (opts?.filter) {
        for (const [col, val] of Object.entries(opts.filter)) {
          query = query.eq(col, val as any);
        }
      }

      // Apply ordering
      if (order) {
        query = query.order(order.column, { ascending: order.ascending ?? true });
      }

      const { data, error } = await query;
      if (error) handleError(error);

      return z.array(rowSchema).parse(data);
    },

    async getById(id: string): Promise<TRow | null> {
      const { data, error } = await from(table)
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (error) handleError(error);
      if (!data) return null;

      return rowSchema.parse(data);
    },

    async create(data: TInsert): Promise<TRow> {
      const validated = insertSchema.parse(data);

      const { data: row, error } = await from(table)
        .insert(validated as any)
        .select('*')
        .single();

      if (error) handleError(error);
      return rowSchema.parse(row);
    },

    async update(id: string, data: Partial<TUpdate>): Promise<TRow> {
      const validated = updateSchema.parse(data);

      const { data: row, error } = await from(table)
        .update(validated as any)
        .eq('id', id)
        .select('*')
        .single();

      if (error) handleError(error);
      return rowSchema.parse(row);
    },

    async remove(id: string): Promise<void> {
      const { error } = await from(table)
        .delete()
        .eq('id', id);

      if (error) handleError(error);
    },
  };
}
