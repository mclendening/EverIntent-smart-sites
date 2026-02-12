/**
 * @fileoverview Submissions module — self-registers with the platform module registry.
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
