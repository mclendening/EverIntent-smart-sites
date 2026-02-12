/**
 * @fileoverview Portfolio module — self-registers with the platform module registry.
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
