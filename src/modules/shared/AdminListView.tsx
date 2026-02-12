/**
 * @fileoverview Generic admin list view component.
 *
 * Renders a paginated, filterable data table for any Supabase-backed entity.
 * Used by module admin pages (Portfolio, Testimonials, etc.) to display
 * rows fetched via `CrudService.list()` through TanStack Query hooks.
 *
 * ## Features
 * - Dynamic columns via `ColumnDef<T>[]` descriptors
 * - Optional "Create New" button in the header
 * - Loading skeleton state (8 shimmer rows)
 * - Empty state with configurable message
 * - Row click navigation
 * - Responsive table with horizontal scroll on small screens
 *
 * ## Props Contract
 * - `title`: Page heading (e.g., "Portfolio Items")
 * - `columns`: Array of `ColumnDef<T>` describing each table column
 * - `data`: Array of row objects (from `useList` hook)
 * - `isLoading`: Whether data is being fetched
 * - `onRowClick`: Callback when a row is clicked (typically navigates to detail/edit)
 * - `onCreateClick`: Optional callback for the "Create New" button
 * - `createLabel`: Optional label for the create button (default: "Create New")
 * - `emptyMessage`: Optional message when no rows exist
 *
 * ## Portability
 * - Depends on: shadcn Table, Button, Card, Skeleton components
 * - Uses semantic design tokens from the project's Tailwind config
 * - Copy this file + `types.ts` into any shadcn project
 */

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { Plus } from 'lucide-react';
import type { ColumnDef } from './types';

/**
 * Props for `AdminListView`.
 *
 * @template T - The row data type (must have an `id` string field)
 */
export interface AdminListViewProps<T extends { id: string }> {
  /** Page heading displayed in the card header */
  title: string;
  /** Column definitions describing table structure */
  columns: ColumnDef<T>[];
  /** Row data array (from TanStack Query `useList` hook) */
  data: T[] | undefined;
  /** Whether the data is currently loading */
  isLoading: boolean;
  /** Callback fired when a table row is clicked */
  onRowClick?: (row: T) => void;
  /** Callback for the "Create New" button. If omitted, button is hidden. */
  onCreateClick?: () => void;
  /** Label for the create button (default: "Create New") */
  createLabel?: string;
  /** Message shown when the table has zero rows */
  emptyMessage?: string;
}

/**
 * Generic admin list view with data table, loading skeleton, and empty state.
 *
 * @template T - Row type with required `id: string`
 *
 * ## Usage
 * ```tsx
 * <AdminListView
 *   title="Portfolio Items"
 *   columns={[
 *     { header: 'Title', accessor: 'title' },
 *     { header: 'Industry', accessor: 'industry' },
 *     { header: 'Published', accessor: 'is_published', render: (v) => v ? '✓' : '—' },
 *   ]}
 *   data={portfolioItems}
 *   isLoading={isLoading}
 *   onRowClick={(item) => navigate(`/admin/portfolio/${item.id}`)}
 *   onCreateClick={() => navigate('/admin/portfolio/new')}
 * />
 * ```
 */
export function AdminListView<T extends { id: string }>({
  title,
  columns,
  data,
  isLoading,
  onRowClick,
  onCreateClick,
  createLabel = 'Create New',
  emptyMessage = 'No items found.',
}: AdminListViewProps<T>) {
  return (
    <div className="min-h-screen bg-background">
      <div className="container py-4 sm:py-8 px-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-lg sm:text-xl">{title}</CardTitle>
            {onCreateClick && (
              <Button size="sm" onClick={onCreateClick}>
                <Plus className="h-4 w-4 mr-1" />
                {createLabel}
              </Button>
            )}
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-3">
                {Array.from({ length: 8 }).map((_, i) => (
                  <Skeleton key={i} className="h-10 w-full" />
                ))}
              </div>
            ) : !data?.length ? (
              <p className="text-center text-muted-foreground py-12">
                {emptyMessage}
              </p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    {columns.map((col) => (
                      <TableHead key={col.accessor}>{col.header}</TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.map((row) => (
                    <TableRow
                      key={row.id}
                      className={onRowClick ? 'cursor-pointer' : ''}
                      onClick={() => onRowClick?.(row)}
                    >
                      {columns.map((col) => (
                        <TableCell key={col.accessor} className={col.className}>
                          {col.render
                            ? col.render(row[col.accessor], row)
                            : String(row[col.accessor] ?? '—')}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
