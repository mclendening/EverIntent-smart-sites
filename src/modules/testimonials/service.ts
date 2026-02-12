/**
 * @fileoverview Testimonials Zod schemas and CrudService instance.
 *
 * Defines the validation schemas for the `testimonials` Supabase table
 * and exports a pre-configured `CrudService` + TanStack Query hooks.
 *
 * ## Data Contract (testimonials table)
 * - `id` (uuid, auto-generated)
 * - `client_name` (text, required, max 100)
 * - `quote` (text, required, max 1000)
 * - `rating` (integer, optional, 1-5)
 * - `client_title` (text, optional, max 100)
 * - `client_company` (text, optional, max 100)
 * - `client_photo_url` (text, optional, valid URL, max 500)
 * - `industry` (text, optional, max 50)
 * - `service_type` (text, optional, max 50)
 * - `is_published` (boolean, default false)
 * - `is_featured` (boolean, default false)
 * - `display_order` (integer, default 0)
 * - `created_at`, `updated_at` (timestamptz, auto-managed)
 *
 * ## RLS
 * - INSERT/UPDATE/DELETE: admin only (has_role check)
 * - SELECT: admin sees all; public sees is_published = true
 *
 * ## Portability
 * - Depends on: `../shared/crudService`, `../shared/createCrudHooks`, `zod`
 */

import { z } from 'zod';
import { createCrudService, createCrudHooks } from '../shared';

/** Zod schema for a testimonials row returned from SELECT */
export const testimonialRowSchema = z.object({
  id: z.string(),
  client_name: z.string(),
  quote: z.string(),
  rating: z.number().nullable().optional(),
  client_title: z.string().nullable().optional(),
  client_company: z.string().nullable().optional(),
  client_photo_url: z.string().nullable().optional(),
  industry: z.string().nullable().optional(),
  service_type: z.string().nullable().optional(),
  is_published: z.boolean().nullable().optional(),
  is_featured: z.boolean().nullable().optional(),
  display_order: z.number().nullable().optional(),
  created_at: z.string(),
  updated_at: z.string(),
});

export interface TestimonialRow {
  id: string;
  client_name: string;
  quote: string;
  rating: number | null;
  client_title: string | null;
  client_company: string | null;
  client_photo_url: string | null;
  industry: string | null;
  service_type: string | null;
  is_published: boolean | null;
  is_featured: boolean | null;
  display_order: number | null;
  created_at: string;
  updated_at: string;
}

/** Zod schema for INSERT payload */
export const testimonialInsertSchema = z.object({
  client_name: z.string().trim().min(1, 'Name is required').max(100),
  quote: z.string().trim().min(1, 'Quote is required').max(1000),
  rating: z.number().int().min(1).max(5).optional().nullable(),
  client_title: z.string().trim().max(100).optional().nullable(),
  client_company: z.string().trim().max(100).optional().nullable(),
  client_photo_url: z.string().url('Must be a valid URL').max(500).optional().nullable().or(z.literal('')),
  industry: z.string().trim().max(50).optional().nullable(),
  service_type: z.string().trim().max(50).optional().nullable(),
  is_published: z.boolean().optional().default(false),
  is_featured: z.boolean().optional().default(false),
  display_order: z.number().int().optional().default(0),
});

export type TestimonialInsert = z.infer<typeof testimonialInsertSchema>;

/** Zod schema for UPDATE payload (all fields optional) */
export const testimonialUpdateSchema = testimonialInsertSchema.partial();

export type TestimonialUpdate = z.infer<typeof testimonialUpdateSchema>;

/** Pre-configured CrudService for the testimonials table */
export const testimonialService = createCrudService<TestimonialRow, TestimonialInsert, TestimonialUpdate>({
  table: 'testimonials',
  rowSchema: testimonialRowSchema as unknown as z.ZodType<TestimonialRow>,
  insertSchema: testimonialInsertSchema as unknown as z.ZodType<TestimonialInsert>,
  updateSchema: testimonialUpdateSchema as unknown as z.ZodType<TestimonialUpdate>,
  defaultOrder: { column: 'display_order', ascending: true },
});

/** Pre-configured TanStack Query hooks for testimonials CRUD */
export const testimonialHooks = createCrudHooks('testimonials', testimonialService);
