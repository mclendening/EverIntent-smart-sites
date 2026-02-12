/**
 * @fileoverview Portfolio module — self-registers with the platform module registry.
 *
 * Manages portfolio showcase items (client case studies, project galleries).
 * Provides full admin CRUD via the shared AdminListView + AdminFormEditor patterns.
 *
 * ## What This Module Owns
 * - Database: `portfolio` table (title, slug, client_name, industry, description,
 *   featured_image_url, gallery_urls, services_provided, results_summary,
 *   testimonial_quote, website_url, is_featured, is_published, display_order)
 * - Admin UI: List view (/admin/portfolio) + Create/Edit view (/admin/portfolio/:id)
 * - Public UI: Portfolio grid + case study pages (existing, read from same table)
 * - Data layer: `portfolioService` (CrudService) + `portfolioHooks` (TanStack Query)
 * - Validation: Zod schemas for INSERT/UPDATE with slug format, URL, and length constraints
 *
 * ## Portability
 * - Depends on: registry.ts, types.ts, shared/ (CrudService + UI patterns)
 * - To use in another project: provide matching Supabase `portfolio` table with RLS
 */

import { registerModule } from '../registry';
import type { ModuleDefinition } from '../types';
import { ModuleCategory } from '../types';
import { Image } from 'lucide-react';
import PortfolioListPage from './PortfolioListPage';
import PortfolioEditPage from './PortfolioEditPage';

export const portfolioModule: ModuleDefinition = {
  id: 'portfolio',
  name: 'Portfolio',
  description: 'Manage portfolio showcase items.',
  version: '2.0.0',
  navItems: [
    {
      label: 'Portfolio',
      path: 'portfolio',
      icon: Image,
      category: ModuleCategory.Content,
      description: 'Manage portfolio items',
      detail: 'Add, edit, or remove portfolio showcase items with industry tagging and publish controls',
    },
  ],
  routes: [
    {
      path: 'portfolio',
      Component: PortfolioListPage,
    },
    {
      path: 'portfolio/:id',
      Component: PortfolioEditPage,
    },
  ],
};

registerModule(portfolioModule);
