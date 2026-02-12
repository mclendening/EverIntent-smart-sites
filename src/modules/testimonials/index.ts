/**
 * @fileoverview Testimonials module — self-registers with the platform module registry.
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
