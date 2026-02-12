/**
 * @fileoverview Submissions module — self-registers with the platform module registry.
 *
 * Manages form submissions (contact inquiries) and checkout submissions
 * (purchase-intent flows). Provides a read-only admin view for reviewing
 * and managing customer submissions.
 *
 * ## What This Module Owns
 * - Database: form_submissions, checkout_submissions
 * - Admin UI: Submissions list with filtering and status management
 *
 * ## Data Contract
 * - `form_submissions` table: name, email, phone, company, message,
 *   form_type, tcpa_consent, ghl_sync_status, UTM fields.
 * - `checkout_submissions` table: name, email, phone, selected_tier,
 *   addons (JSONB), monthly_total, setup_total, ghl_sync_status, UTM fields.
 *
 * ## Portability
 * - Depends on: registry.ts, types.ts, AdminSubmissions page component.
 * - To use in another project: provide matching Supabase tables and
 *   an AdminSubmissions component.
 */

import { registerModule } from '../registry';
import type { ModuleDefinition } from '../types';
import { ModuleCategory } from '../types';
import { FileText } from 'lucide-react';
import AdminSubmissions from '@/pages/admin/Submissions';

export const submissionsModule: ModuleDefinition = {
  id: 'submissions',
  name: 'Submissions',
  description: 'View and manage form and checkout submissions.',
  version: '1.0.0',
  navItems: [
    {
      label: 'Submissions',
      path: 'submissions',
      icon: FileText,
      category: ModuleCategory.Content,
      description: 'View and manage checkout submissions',
      detail: 'Review customer submissions and track orders',
    },
  ],
  routes: [
    {
      path: 'submissions',
      Component: AdminSubmissions,
    },
  ],
};

registerModule(submissionsModule);
