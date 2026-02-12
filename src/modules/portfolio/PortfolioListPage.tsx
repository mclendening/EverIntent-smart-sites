/**
 * @fileoverview Portfolio admin list page.
 *
 * Renders a data table of all portfolio items using the shared `AdminListView`
 * pattern and `portfolioHooks.useList()` for data fetching.
 *
 * ## Features
 * - Columns: Title, Client, Industry, Published status, Display Order
 * - "Create New" button navigates to /admin/portfolio/new
 * - Row click navigates to /admin/portfolio/:id for editing
 * - Loading skeleton and empty state handled by AdminListView
 *
 * ## Portability
 * - Depends on: `AdminListView`, `portfolioHooks`, react-router-dom
 */

import { useNavigate } from 'react-router-dom';
import { AdminListView } from '../shared/AdminListView';
import { portfolioHooks } from './service';
import type { PortfolioRow } from './service';
import type { ColumnDef } from '../shared/types';
import { Badge } from '@/components/ui/badge';

/** Column definitions for the portfolio list table */
const columns: ColumnDef<PortfolioRow>[] = [
  {
    header: 'Title',
    accessor: 'title',
  },
  {
    header: 'Client',
    accessor: 'client_name',
  },
  {
    header: 'Industry',
    accessor: 'industry',
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
  {
    header: 'Order',
    accessor: 'display_order',
    className: 'w-16 text-center',
  },
];

/**
 * Portfolio admin list page — renders at /admin/portfolio.
 */
export default function PortfolioListPage() {
  const navigate = useNavigate();
  const { data, isLoading } = portfolioHooks.useList();

  return (
    <AdminListView<PortfolioRow>
      title="Portfolio Items"
      columns={columns}
      data={data}
      isLoading={isLoading}
      onRowClick={(row) => navigate(`/admin/portfolio/${row.id}`)}
      onCreateClick={() => navigate('/admin/portfolio/new')}
      createLabel="Add Portfolio Item"
      emptyMessage="No portfolio items yet. Click 'Add Portfolio Item' to create one."
    />
  );
}
