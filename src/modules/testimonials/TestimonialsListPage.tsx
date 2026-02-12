/**
 * @fileoverview Testimonials admin list page.
 *
 * Renders a data table of all testimonials using the shared `AdminListView`
 * pattern and `testimonialHooks.useList()` for data fetching.
 *
 * ## Features
 * - Columns: Client Name, Company, Rating (star display), Published, Order
 * - "Create New" button navigates to /admin/testimonials/new
 * - Row click navigates to /admin/testimonials/:id for editing
 *
 * ## Portability
 * - Depends on: `AdminListView`, `testimonialHooks`, react-router-dom
 */

import { useNavigate } from 'react-router-dom';
import { AdminListView } from '../shared/AdminListView';
import { testimonialHooks } from './service';
import type { TestimonialRow } from './service';
import type { ColumnDef } from '../shared/types';
import { Badge } from '@/components/ui/badge';

/** Column definitions for the testimonials list table */
const columns: ColumnDef<TestimonialRow>[] = [
  {
    header: 'Client',
    accessor: 'client_name',
  },
  {
    header: 'Company',
    accessor: 'client_company',
  },
  {
    header: 'Rating',
    accessor: 'rating',
    render: (value) => {
      const rating = Number(value) || 0;
      return rating > 0 ? '★'.repeat(rating) + '☆'.repeat(5 - rating) : '—';
    },
    className: 'text-accent',
  },
  {
    header: 'Quote',
    accessor: 'quote',
    render: (value) => {
      const text = String(value ?? '');
      return (
        <span className="text-xs text-muted-foreground truncate max-w-[200px] block">
          {text.length > 80 ? `${text.slice(0, 80)}…` : text}
        </span>
      );
    },
  },
  {
    header: 'Published',
    accessor: 'is_published',
    render: (value) =>
      value ? (
        <Badge variant="default" className="text-[10px]">Published</Badge>
      ) : (
        <Badge variant="secondary" className="text-[10px]">Draft</Badge>
      ),
  },
];

/**
 * Testimonials admin list page — renders at /admin/testimonials.
 */
export default function TestimonialsListPage() {
  const navigate = useNavigate();
  const { data, isLoading } = testimonialHooks.useList();

  return (
    <AdminListView<TestimonialRow>
      title="Testimonials"
      columns={columns}
      data={data}
      isLoading={isLoading}
      onRowClick={(row) => navigate(`/admin/testimonials/${row.id}`)}
      onCreateClick={() => navigate('/admin/testimonials/new')}
      createLabel="Add Testimonial"
      emptyMessage="No testimonials yet. Click 'Add Testimonial' to create one."
    />
  );
}
