/**
 * @fileoverview Portfolio Zod schemas and CrudService instance.
 *
 * Defines the validation schemas for the `portfolio` Supabase table
 * and exports a pre-configured `CrudService` + TanStack Query hooks.
 *
 * ## Data Contract (portfolio table)
 * - `id` (uuid, auto-generated)
 * - `title` (text, required, max 200)
 * - `slug` (text, required, max 100, lowercase-alphanumeric-hyphens only)
 * - `client_name` (text, optional, max 100)
 * - `industry` (text, optional, max 50)
 * - `description` (text, optional, max 2000)
 * - `services_provided` (text[], optional, max 20 items)
 * - `featured_image_url` (text, optional, valid URL, max 500)
 * - `gallery_urls` (text[], optional, max 20 items)
 * - `results_summary` (text, optional, max 1000)
 * - `testimonial_quote` (text, optional, max 500)
 * - `website_url` (text, optional, valid URL, max 500)
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

/** Zod schema for a portfolio row returned from SELECT */
export const portfolioRowSchema = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
  client_name: z.string().nullable().optional(),
  industry: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  services_provided: z.array(z.string()).nullable().optional(),
  featured_image_url: z.string().nullable().optional(),
  gallery_urls: z.array(z.string()).nullable().optional(),
  results_summary: z.string().nullable().optional(),
  testimonial_quote: z.string().nullable().optional(),
  website_url: z.string().nullable().optional(),
  is_published: z.boolean().nullable().optional(),
  is_featured: z.boolean().nullable().optional(),
  display_order: z.number().nullable().optional(),
  created_at: z.string(),
  updated_at: z.string(),
});

export interface PortfolioRow {
  id: string;
  title: string;
  slug: string;
  client_name: string | null;
  industry: string | null;
  description: string | null;
  services_provided: string[] | null;
  featured_image_url: string | null;
  gallery_urls: string[] | null;
  results_summary: string | null;
  testimonial_quote: string | null;
  website_url: string | null;
  is_published: boolean | null;
  is_featured: boolean | null;
  display_order: number | null;
  created_at: string;
  updated_at: string;
}

/** Zod schema for INSERT payload */
export const portfolioInsertSchema = z.object({
  title: z.string().trim().min(1, 'Title is required').max(200, 'Title must be under 200 chars'),
  slug: z.string().trim().min(1, 'Slug is required').max(100).regex(/^[a-z0-9-]+$/, 'Slug must be lowercase alphanumeric with hyphens'),
  client_name: z.string().trim().max(100).optional().nullable(),
  industry: z.string().trim().max(50).optional().nullable(),
  description: z.string().trim().max(2000).optional().nullable(),
  services_provided: z.array(z.string().trim()).max(20).optional().nullable(),
  featured_image_url: z.string().url('Must be a valid URL').max(500).optional().nullable().or(z.literal('')),
  gallery_urls: z.array(z.string().url()).max(20).optional().nullable(),
  results_summary: z.string().trim().max(1000).optional().nullable(),
  testimonial_quote: z.string().trim().max(500).optional().nullable(),
  website_url: z.string().url('Must be a valid URL').max(500).optional().nullable().or(z.literal('')),
  is_published: z.boolean().optional().default(false),
  is_featured: z.boolean().optional().default(false),
  display_order: z.number().int().optional().default(0),
});

export type PortfolioInsert = z.infer<typeof portfolioInsertSchema>;

/** Zod schema for UPDATE payload (all fields optional) */
export const portfolioUpdateSchema = portfolioInsertSchema.partial();

export type PortfolioUpdate = z.infer<typeof portfolioUpdateSchema>;

/** Pre-configured CrudService for the portfolio table */
export const portfolioService = createCrudService<PortfolioRow, PortfolioInsert, PortfolioUpdate>({
  table: 'portfolio',
  rowSchema: portfolioRowSchema as unknown as z.ZodType<PortfolioRow>,
  insertSchema: portfolioInsertSchema as unknown as z.ZodType<PortfolioInsert>,
  updateSchema: portfolioUpdateSchema as unknown as z.ZodType<PortfolioUpdate>,
  defaultOrder: { column: 'display_order', ascending: true },
});

/** Pre-configured TanStack Query hooks for portfolio CRUD */
export const portfolioHooks = createCrudHooks('portfolio', portfolioService);
