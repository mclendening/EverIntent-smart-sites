/**
 * @fileoverview Module card component for the Module Manager hub grid.
 *
 * Renders a visually rich card for each registered platform module showing
 * identity, version, category, route count, and nav items. Supports
 * selection state for export workflows.
 *
 * ## Design
 * - Follows the admin card pattern with hover elevation
 * - Uses semantic design tokens exclusively
 * - Category badge with color coding
 * - Animated selection ring
 */

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { ModuleDefinition } from '@/modules/types';
import {
  Package, Palette, ShoppingCart, Settings, Wrench, FileText,
  CheckCircle2,
} from 'lucide-react';

/** Map module categories to icons and colors */
const CATEGORY_CONFIG: Record<string, { icon: React.ComponentType<{ className?: string }>; className: string }> = {
  Content: { icon: FileText, className: 'bg-accent/10 text-accent border-accent/20' },
  Appearance: { icon: Palette, className: 'bg-accent/10 text-accent border-accent/20' },
  Commerce: { icon: ShoppingCart, className: 'bg-accent/10 text-accent border-accent/20' },
  Settings: { icon: Settings, className: 'bg-muted text-muted-foreground border-border' },
  Tools: { icon: Wrench, className: 'bg-muted text-muted-foreground border-border' },
};

interface ModuleCardProps {
  module: ModuleDefinition;
  selected?: boolean;
  onClick?: () => void;
  compact?: boolean;
}

export function ModuleCard({ module, selected, onClick, compact }: ModuleCardProps) {
  const category = module.navItems[0]?.category || 'Tools';
  const catConfig = CATEGORY_CONFIG[category] || CATEGORY_CONFIG.Tools;
  const CatIcon = catConfig.icon;
  const ModIcon = module.navItems[0]?.icon;

  return (
    <Card
      className={`relative cursor-pointer transition-all duration-200 group
        ${selected
          ? 'ring-2 ring-accent border-accent shadow-[var(--shadow-glow)]'
          : 'hover:border-accent/40 hover:shadow-[var(--shadow-md)]'
        }
        ${compact ? '' : 'min-h-[140px]'}
      `}
      onClick={onClick}
    >
      {selected && (
        <div className="absolute top-2 right-2 z-10">
          <CheckCircle2 className="h-5 w-5 text-accent" />
        </div>
      )}

      <CardHeader className={compact ? 'p-3 pb-1' : 'p-4 pb-2'}>
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-accent/10 text-accent shrink-0">
            {ModIcon ? <ModIcon className="h-5 w-5" /> : <Package className="h-5 w-5" />}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-semibold text-sm text-foreground truncate">{module.name}</h3>
              <Badge variant="outline" className="text-[10px] font-mono shrink-0">
                v{module.version}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
              {module.description}
            </p>
          </div>
        </div>
      </CardHeader>

      {!compact && (
        <CardContent className="p-4 pt-1">
          <div className="flex items-center gap-1.5 flex-wrap">
            <Badge variant="secondary" className={`text-[10px] border ${catConfig.className}`}>
              <CatIcon className="h-3 w-3 mr-0.5" />
              {category}
            </Badge>
            <Badge variant="outline" className="text-[10px]">
              {module.routes.length} route{module.routes.length !== 1 ? 's' : ''}
            </Badge>
            <Badge variant="outline" className="text-[10px]">
              {module.navItems.length} nav item{module.navItems.length !== 1 ? 's' : ''}
            </Badge>
          </div>
        </CardContent>
      )}
    </Card>
  );
}
