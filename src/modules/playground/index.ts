/**
 * @fileoverview Playground module — self-registers with the platform module registry.
 */

import { registerModule } from '../registry';
import type { ModuleDefinition } from '../types';
import { ModuleCategory } from '../types';
import { FlaskConical } from 'lucide-react';
import AdminPlayground from '@/pages/admin/Playground';
import AdminPlaygroundBadges from '@/pages/admin/PlaygroundBadges';
import AdminPlaygroundTimelines from '@/pages/admin/PlaygroundTimelines';
import AdminPlaygroundSeparators from '@/pages/admin/PlaygroundSeparators';

export const playgroundModule: ModuleDefinition = {
  id: 'playground',
  name: 'Playground',
  description: 'Style experiments and callout alternatives.',
  version: '1.0.0',
  navItems: [
    {
      label: 'Playground',
      path: 'playground',
      icon: FlaskConical,
      category: ModuleCategory.Tools,
      description: 'Style experiments and callout alternatives',
      detail: 'Preview premium badge replacement styles',
    },
  ],
  routes: [
    { path: 'playground', Component: AdminPlayground },
    { path: 'playground/badges', Component: AdminPlaygroundBadges },
    { path: 'playground/timelines', Component: AdminPlaygroundTimelines },
    { path: 'playground/separators', Component: AdminPlaygroundSeparators },
  ],
};

registerModule(playgroundModule);
