/**
 * @fileoverview Testimonials module — self-registers with the platform module registry.
 *
 * Manages customer testimonials displayed across the marketing site.
 * Provides full admin CRUD via the shared AdminListView + AdminFormEditor patterns.
 *
 * ## What This Module Owns
 * - Database: `testimonials` table (client_name, quote, rating, client_title,
 *   client_company, client_photo_url, industry, service_type, is_featured,
 *   is_published, display_order)
 * - Admin UI: List view (/admin/testimonials) + Create/Edit view (/admin/testimonials/:id)
 * - Public UI: Testimonials sections on homepage and industry pages (existing)
 * - Data layer: `testimonialService` (CrudService) + `testimonialHooks` (TanStack Query)
 * - Validation: Zod schemas for INSERT/UPDATE with rating range (1-5) and length constraints
 *
 * ## Portability
 * - Depends on: registry.ts, types.ts, shared/ (CrudService + UI patterns)
 * - To use in another project: provide matching Supabase `testimonials` table with RLS
 */

import React from 'react';
import { registerModule } from '../registry';
import type { ModuleDefinition } from '../types';
import { ModuleCategory } from '../types';
import { MessageSquare } from 'lucide-react';

/** Lazy-loaded — admin-only, excluded from SSG prerenderRoutes (BRD v36.11 §D5 P2) */
const TestimonialsListPage = React.lazy(() => import('./TestimonialsListPage'));
import TestimonialsEditPage from './TestimonialsEditPage';

export const testimonialsModule: ModuleDefinition = {
  id: 'testimonials',
  name: 'Testimonials',
  description: 'Manage customer testimonials.',
  version: '2.0.0',
  navItems: [
    {
      label: 'Testimonials',
      path: 'testimonials',
      icon: MessageSquare,
      category: ModuleCategory.Content,
      description: 'Manage customer testimonials',
      detail: 'Add, edit, or remove customer testimonials with ratings and publish controls',
    },
  ],
  routes: [
    {
      path: 'testimonials',
      Component: TestimonialsListPage,
    },
    {
      path: 'testimonials/:id',
      Component: TestimonialsEditPage,
    },
  ],
};

registerModule(testimonialsModule);
