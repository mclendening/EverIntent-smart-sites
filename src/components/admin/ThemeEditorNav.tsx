/**
 * @fileoverview Vertical tabs sidebar for Theme Editor sections.
 * VS Code-style navigation — sidebar on desktop, horizontal scrollable tabs on mobile.
 */

import { cn } from '@/lib/utils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Palette, Sun, Moon, ShoppingBag, Type, Zap, Layers,
  MessageSquare, Accessibility, Eye, Upload, Image, Settings,
} from 'lucide-react';

export type EditorSection =
  | 'accent'
  | 'light-colors'
  | 'dark-colors'
  | 'gradients'
  | 'ecommerce'
  | 'typography'
  | 'motion'
  | 'style-modules'
  | 'ghl-chat'
  | 'ada-widget'
  | 'settings'
  | 'contrast'
  | 'import'
  | 'logo';

interface SectionDef {
  id: EditorSection;
  label: string;
  shortLabel: string;
  icon: React.ElementType;
  group: string;
}

export const EDITOR_SECTIONS: SectionDef[] = [
  // Colors
  { id: 'accent', label: 'Accent Color', shortLabel: 'Accent', icon: Palette, group: 'Colors' },
  { id: 'light-colors', label: 'Light Mode Colors', shortLabel: 'Light', icon: Sun, group: 'Colors' },
  { id: 'dark-colors', label: 'Dark Mode Colors', shortLabel: 'Dark', icon: Moon, group: 'Colors' },
  { id: 'gradients', label: 'Gradients', shortLabel: 'Gradients', icon: Palette, group: 'Colors' },
  { id: 'ecommerce', label: 'E-Commerce & CTA', shortLabel: 'E-Comm', icon: ShoppingBag, group: 'Colors' },
  // Design
  { id: 'typography', label: 'Typography', shortLabel: 'Type', icon: Type, group: 'Design' },
  { id: 'motion', label: 'Motion & Transitions', shortLabel: 'Motion', icon: Zap, group: 'Design' },
  { id: 'style-modules', label: 'Style Modules', shortLabel: 'Modules', icon: Layers, group: 'Design' },
  // Widgets
  { id: 'ghl-chat', label: 'GHL Chat Widget', shortLabel: 'Chat', icon: MessageSquare, group: 'Widgets' },
  { id: 'ada-widget', label: 'ADA Accessibility', shortLabel: 'ADA', icon: Accessibility, group: 'Widgets' },
  // System
  { id: 'logo', label: 'Logo Config', shortLabel: 'Logo', icon: Image, group: 'System' },
  { id: 'settings', label: 'Default Mode', shortLabel: 'Mode', icon: Settings, group: 'System' },
  { id: 'contrast', label: 'Contrast Checker', shortLabel: 'WCAG', icon: Eye, group: 'System' },
  { id: 'import', label: 'Import Theme', shortLabel: 'Import', icon: Upload, group: 'System' },
];

const GROUPS = ['Colors', 'Design', 'Widgets', 'System'];

interface ThemeEditorNavProps {
  active: EditorSection;
  onChange: (section: EditorSection) => void;
}

export function ThemeEditorNav({ active, onChange }: ThemeEditorNavProps) {
  return (
    <>
      {/* Mobile: dropdown selector */}
      <div className="lg:hidden">
        <Select value={active} onValueChange={(v) => onChange(v as EditorSection)}>
          <SelectTrigger className="w-full text-xs h-9">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {GROUPS.map((group) => (
              <div key={group}>
                <div className="px-2 py-1 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                  {group}
                </div>
                {EDITOR_SECTIONS.filter((s) => s.group === group).map((section) => {
                  const Icon = section.icon;
                  return (
                    <SelectItem key={section.id} value={section.id} className="text-xs">
                      <div className="flex items-center gap-2">
                        <Icon className="h-3.5 w-3.5" />
                        {section.label}
                      </div>
                    </SelectItem>
                  );
                })}
              </div>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Desktop: vertical sidebar tabs */}
      <nav className="hidden lg:block w-48 shrink-0 space-y-1 pr-2 border-r border-border">
        {GROUPS.map((group) => (
          <div key={group} className="mb-3">
            <div className="px-2 py-1 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
              {group}
            </div>
            {EDITOR_SECTIONS.filter((s) => s.group === group).map((section) => {
              const Icon = section.icon;
              const isActive = active === section.id;
              return (
                <button
                  key={section.id}
                  onClick={() => onChange(section.id)}
                  className={cn(
                    'w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-xs transition-colors text-left',
                    isActive
                      ? 'bg-accent/10 text-accent font-medium'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  )}
                >
                  <Icon className="h-3.5 w-3.5 shrink-0" />
                  <span className="truncate">{section.shortLabel}</span>
                </button>
              );
            })}
          </div>
        ))}
      </nav>
    </>
  );
}
