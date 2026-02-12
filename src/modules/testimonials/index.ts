/**
 * @fileoverview Testimonials module — self-registers with the platform module registry.
 *
 * Manages customer testimonials displayed across the marketing site.
 * Currently routes to a placeholder admin page — full CRUD is pending
 * the shared ListLayout/FormEditor pattern system (Phase 8.11–8.13).
 *
 * ## What This Module Owns
 * - Database: testimonials table
 * - Admin UI: Testimonials CRUD (pending implementation)
 * - Public UI: Testimonials sections on homepage and industry pages (existing)
 *
 * ## Data Contract
 * - `testimonials` table: client_name, quote, rating (1-5), client_title,
 *   client_company, client_photo_url, industry, service_type, is_featured,
 *   is_published, display_order.
 *
 * ## Portability
 * - Depends on: registry.ts, types.ts, a page component for the admin route.
 * - To use in another project: provide matching Supabase table and admin component.
 */

import { registerModule } from '../registry';
import type { ModuleDefinition } from '../types';
import { ModuleCategory } from '../types';
import { MessageSquare } from 'lucide-react';
import PlaceholderPage from '@/pages/Placeholder';

export const testimonialsModule: ModuleDefinition = {
  id: 'testimonials',
  name: 'Testimonials',
  description: 'Manage customer testimonials.',
  version: '1.0.0',
  navItems: [
    {
      label: 'Testimonials',
      path: 'testimonials',
      icon: MessageSquare,
      category: ModuleCategory.Content,
      description: 'Manage customer testimonials',
      detail: 'Add, edit, or remove customer testimonials',
    },
  ],
  routes: [
    {
      path: 'testimonials',
      Component: PlaceholderPage,
    },
  ],
};

registerModule(testimonialsModule);
