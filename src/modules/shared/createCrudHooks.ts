/**
 * @fileoverview TanStack Query hooks factory for CrudService instances.
 *
 * Given a query key prefix and a CrudService, produces five ready-to-use hooks:
 * - `useList(opts?)` — fetches paginated/filtered rows
 * - `useGetById(id)` — fetches a single row by UUID
 * - `useCreate()` — mutation that inserts a row and invalidates the list cache
 * - `useUpdate()` — mutation that updates a row with optimistic cache update
 * - `useRemove()` — mutation that deletes a row with optimistic cache removal
 *
 * ## Optimistic Updates
 * - `useUpdate` patches the list cache immediately, rolling back on error.
 * - `useRemove` removes the item from cache immediately, rolling back on error.
 * - Both refetch from server after mutation settles (`onSettled → invalidate`).
 *
 * ## Error Handling
 * - Zod validation errors from CrudService bubble up to the mutation's `onError`.
 * - Callers should catch `ZodError` to map field-level errors into form state.
 * - `CrudServiceError` for Supabase failures is also propagated.
 *
 * ## Portability
 * - Depends on: `@tanstack/react-query`, `./crudService.ts`
 * - Copy this file + `crudService.ts` into any TanStack Query project.
 */

import {
  useQuery,
  useMutation,
  useQueryClient,
  type UseQueryOptions,
} from '@tanstack/react-query';
import type { CrudService, ListOptions } from './crudService';

/**
 * The set of hooks returned by `createCrudHooks`.
 *
 * @template TRow - Row shape returned by queries
 * @template TInsert - Insert payload shape
 * @template TUpdate - Update payload shape
 */
export interface CrudHooks<TRow, TInsert, TUpdate> {
  /** Fetch a paginated/filtered list of rows. */
  useList: (
    opts?: ListOptions,
    queryOpts?: Partial<UseQueryOptions<TRow[], Error>>,
  ) => ReturnType<typeof useQuery<TRow[], Error>>;

  /** Fetch a single row by UUID. Disabled when id is undefined. */
  useGetById: (
    id: string | undefined,
    queryOpts?: Partial<UseQueryOptions<TRow | null, Error>>,
  ) => ReturnType<typeof useQuery<TRow | null, Error>>;

  /** Mutation to create a new row. Invalidates list cache on success. */
  useCreate: () => ReturnType<typeof useMutation<TRow, Error, TInsert>>;

  /** Mutation to update a row. Optimistic list cache update + rollback on error. */
  useUpdate: () => ReturnType<typeof useMutation<TRow, Error, { id: string; data: Partial<TUpdate> }>>;

  /** Mutation to delete a row. Optimistic list cache removal + rollback on error. */
  useRemove: () => ReturnType<typeof useMutation<void, Error, string>>;
}

/**
 * Factory that creates five TanStack Query hooks for a CrudService instance.
 *
 * @param key - Query key prefix (e.g., "portfolio"). All queries are namespaced under `[key, ...]`.
 * @param service - A CrudService instance created via `createCrudService()`.
 *
 * ## Usage
 * ```ts
 * const portfolioHooks = createCrudHooks('portfolio', portfolioService);
 *
 * function PortfolioList() {
 *   const { data, isLoading } = portfolioHooks.useList();
 *   const createMutation = portfolioHooks.useCreate();
 *   // ...
 * }
 * ```
 */
export function createCrudHooks<TRow extends { id: string }, TInsert, TUpdate>(
  key: string,
  service: CrudService<TRow, TInsert, TUpdate>,
): CrudHooks<TRow, TInsert, TUpdate> {
  const listKey = [key, 'list'] as const;

  return {
    useList(opts?: ListOptions, queryOpts?: Partial<UseQueryOptions<TRow[], Error>>) {
      return useQuery<TRow[], Error>({
        queryKey: [...listKey, opts],
        queryFn: () => service.list(opts),
        ...queryOpts,
      });
    },

    useGetById(id: string | undefined, queryOpts?: Partial<UseQueryOptions<TRow | null, Error>>) {
      return useQuery<TRow | null, Error>({
        queryKey: [key, 'detail', id],
        queryFn: () => service.getById(id!),
        enabled: !!id,
        ...queryOpts,
      });
    },

    useCreate() {
      const queryClient = useQueryClient();

      return useMutation<TRow, Error, TInsert>({
        mutationFn: (data) => service.create(data),
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: listKey });
        },
      });
    },

    useUpdate() {
      const queryClient = useQueryClient();

      return useMutation<TRow, Error, { id: string; data: Partial<TUpdate> }>({
        mutationFn: ({ id, data }) => service.update(id, data),
        onMutate: async ({ id, data }) => {
          // Cancel in-flight list queries
          await queryClient.cancelQueries({ queryKey: listKey });

          // Snapshot previous list for rollback
          const previous = queryClient.getQueriesData<TRow[]>({ queryKey: listKey });

          // Optimistically update all list caches
          queryClient.setQueriesData<TRow[]>(
            { queryKey: listKey },
            (old) =>
              old?.map((item) =>
                item.id === id ? { ...item, ...data } : item,
              ),
          );

          return { previous };
        },
        onError: (_err, _vars, context: any) => {
          if (context?.previous) {
            for (const [queryKey, data] of context.previous) {
              queryClient.setQueryData(queryKey, data);
            }
          }
        },
        onSettled: () => {
          queryClient.invalidateQueries({ queryKey: listKey });
        },
      });
    },

    useRemove() {
      const queryClient = useQueryClient();

      return useMutation<void, Error, string>({
        mutationFn: (id) => service.remove(id),
        onMutate: async (id) => {
          await queryClient.cancelQueries({ queryKey: listKey });

          const previous = queryClient.getQueriesData<TRow[]>({ queryKey: listKey });

          // Optimistically remove from all list caches
          queryClient.setQueriesData<TRow[]>(
            { queryKey: listKey },
            (old) => old?.filter((item) => item.id !== id),
          );

          return { previous };
        },
        onError: (_err, _id, context: any) => {
          if (context?.previous) {
            for (const [queryKey, data] of context.previous) {
              queryClient.setQueryData(queryKey, data);
            }
          }
        },
        onSettled: () => {
          queryClient.invalidateQueries({ queryKey: listKey });
        },
      });
    },
  };
}
