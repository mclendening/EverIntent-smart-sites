/**
 * @fileoverview Portfolio module — self-registers with the platform module registry.
 *
 * Manages portfolio showcase items (client case studies, project galleries).
 * Currently routes to a placeholder admin page — full CRUD is pending
 * the shared ListLayout/FormEditor pattern system (Phase 8.11–8.12).
 *
 * ## What This Module Owns
 * - Database: portfolio table
 * - Admin UI: Portfolio CRUD (pending implementation)
 * - Public UI: Portfolio grid + case study pages (existing, not admin-managed yet)
 *
 * ## Data Contract
 * - `portfolio` table: title, slug, client_name, description, industry,
 *   featured_image_url, gallery_urls (text[]), services_provided (text[]),
 *   results_summary, testimonial_quote, website_url, is_featured, is_published,
 *   display_order.
 *
 * ## Portability
 * - Depends on: registry.ts, types.ts, a page component for the admin route.
 * - To use in another project: provide matching Supabase table and admin component.
 */

import { registerModule } from '../registry';
import type { ModuleDefinition } from '../types';
import { ModuleCategory } from '../types';
import { Image } from 'lucide-react';
import PlaceholderPage from '@/pages/Placeholder';

export const portfolioModule: ModuleDefinition = {
  id: 'portfolio',
  name: 'Portfolio',
  description: 'Manage portfolio showcase items.',
  version: '1.0.0',
  navItems: [
    {
      label: 'Portfolio',
      path: 'portfolio',
      icon: Image,
      category: ModuleCategory.Content,
      description: 'Manage portfolio items',
      detail: 'Add, edit, or remove portfolio showcase items',
    },
  ],
  routes: [
    {
      path: 'portfolio',
      Component: PlaceholderPage,
    },
  ],
};

registerModule(portfolioModule);
