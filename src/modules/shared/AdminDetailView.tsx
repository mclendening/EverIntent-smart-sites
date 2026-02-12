/**
 * @fileoverview Generic admin detail/edit view layout component.
 *
 * Provides a consistent page shell for viewing or editing a single entity.
 * Renders a back button, title, optional action buttons (Edit, Delete),
 * and a content slot for the detail or form content.
 *
 * ## Features
 * - Back navigation button with configurable path
 * - Page title with optional subtitle
 * - Action bar slot for Edit/Delete/custom buttons
 * - Loading state (skeleton)
 * - Responsive padding and layout
 *
 * ## Props Contract
 * - `title`: Page heading (e.g., "Edit Portfolio Item")
 * - `subtitle`: Optional secondary text below the title
 * - `backPath`: Path for the back button (e.g., "/admin/portfolio")
 * - `backLabel`: Label for the back button (default: "Back")
 * - `actions`: Optional ReactNode for action buttons in the header
 * - `isLoading`: Whether to show loading skeleton
 * - `children`: Content slot (form, detail cards, etc.)
 *
 * ## Portability
 * - Depends on: shadcn Button, Card, Skeleton; react-router-dom Link
 * - Uses semantic design tokens from the project's Tailwind config
 */

import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft } from 'lucide-react';

/**
 * Props for `AdminDetailView`.
 */
export interface AdminDetailViewProps {
  /** Page heading (e.g., "Edit Portfolio Item") */
  title: string;
  /** Optional secondary text below the title */
  subtitle?: string;
  /** Navigation path for the back button */
  backPath: string;
  /** Label for the back button (default: "Back") */
  backLabel?: string;
  /** Optional action buttons rendered in the header (e.g., Delete button) */
  actions?: ReactNode;
  /** Whether to display a loading skeleton instead of children */
  isLoading?: boolean;
  /** Content slot — typically an `AdminFormEditor` or detail cards */
  children: ReactNode;
}

/**
 * Generic admin detail/edit view layout.
 *
 * Wraps entity detail or edit pages with consistent navigation,
 * header, and action bar patterns.
 *
 * ## Usage
 * ```tsx
 * <AdminDetailView
 *   title="Edit Portfolio Item"
 *   subtitle="Update the details for this portfolio entry"
 *   backPath="/admin/portfolio"
 *   actions={
 *     <Button variant="destructive" size="sm" onClick={handleDelete}>
 *       Delete
 *     </Button>
 *   }
 * >
 *   <AdminFormEditor {...formProps} />
 * </AdminDetailView>
 * ```
 */
export function AdminDetailView({
  title,
  subtitle,
  backPath,
  backLabel = 'Back',
  actions,
  isLoading = false,
  children,
}: AdminDetailViewProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="container py-4 sm:py-8 px-4 max-w-3xl mx-auto">
        {/* Navigation */}
        <div className="mb-6">
          <Button variant="ghost" size="sm" asChild>
            <Link to={backPath}>
              <ArrowLeft className="h-4 w-4 mr-1" />
              {backLabel}
            </Link>
          </Button>
        </div>

        {/* Header */}
        <Card>
          <CardHeader className="flex flex-row items-start justify-between space-y-0">
            <div>
              <CardTitle className="text-lg sm:text-xl">{title}</CardTitle>
              {subtitle && (
                <CardDescription className="mt-1">{subtitle}</CardDescription>
              )}
            </div>
            {actions && (
              <div className="flex items-center gap-2">{actions}</div>
            )}
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                ))}
              </div>
            ) : (
              children
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
