/**
 * @fileoverview ThemeDetailView — Full-screen read-only theme dashboard.
 *
 * Provides an at-a-glance summary of the selected theme's visual identity
 * with action buttons to edit, activate, export, delete, or revert. This is
 * the second level of the drill-down navigation (list → detail → editor).
 *
 * ## Architecture
 * - Full-viewport layout (100dvh minus header).
 * - Sticky top bar with theme name + action buttons.
 * - Scrollable content area renders ThemeSummaryDashboard.
 * - "Back" navigates to ThemeListView.
 * - "Edit" navigates to ThemeEditorView.
 *
 * ## Data Contract
 * - Receives parsed theme config states from useThemeAdmin hook.
 * - Action callbacks are passed through from the hook.
 *
 * ## Portability
 * - Copy with useThemeAdmin.ts + ThemeSummaryDashboard.tsx.
 */

import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ArrowLeft, Edit, Trash2, Check, Download, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ThemeSummaryDashboard } from './ThemeSummaryDashboard';
import type { Theme, LogoVersion, AccentConfig, StaticColors, GradientConfig, GHLChatConfig } from '@/hooks/useThemeAdmin';
import type { EcommerceColors, CtaVariants } from './EcommerceColorEditor';
import type { TypographyConfig } from './TypographyEditor';
import type { MotionConfig } from './MotionEditor';
import type { StyleModule } from './StyleModulesEditor';
import type { AdaWidgetConfig } from './AdaWidgetConfigEditor';
import type { DarkModeOverrides } from './DarkModeOverridesEditor';

interface ThemeDetailViewProps {
  theme: Theme;
  logoVersion?: LogoVersion;
  // Parsed configs
  accentConfig: AccentConfig;
  staticColors: StaticColors;
  gradientConfigs: GradientConfig;
  ghlChatConfig: GHLChatConfig;
  darkModeOverrides: DarkModeOverrides;
  ecommerceColors: EcommerceColors;
  ctaVariants: CtaVariants;
  typographyConfig: TypographyConfig;
  motionConfig: MotionConfig;
  styleModules: StyleModule[];
  adaWidgetConfig: AdaWidgetConfig;
  defaultMode: string;
  // Actions
  onBack: () => void;
  onEdit: () => void;
  onSetActive: (theme: Theme) => void;
  onDelete: (theme: Theme) => void;
  onExportJson: () => void;
}

export function ThemeDetailView({
  theme, logoVersion,
  accentConfig, staticColors, gradientConfigs, ghlChatConfig, darkModeOverrides,
  ecommerceColors, ctaVariants, typographyConfig, motionConfig, styleModules,
  adaWidgetConfig, defaultMode,
  onBack, onEdit, onSetActive, onDelete, onExportJson,
}: ThemeDetailViewProps) {
  return (
    <div className="flex flex-col h-[calc(100dvh-4rem)]">
      {/* Sticky top bar */}
      <div className="px-3 py-2 border-b border-border flex items-center gap-2 shrink-0">
        <Button variant="ghost" size="sm" className="px-2" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <span className="text-sm font-semibold truncate flex-1">{theme.name}</span>
        <div className="flex gap-1.5 shrink-0">
          {!theme.is_active && (
            <Button variant="outline" size="sm" className="text-[10px] h-7 px-2"
              onClick={() => onSetActive(theme)}>
              <Check className="h-3 w-3 mr-1" />
              Activate
            </Button>
          )}
          <Button variant="outline" size="sm" className="text-[10px] h-7 px-2" onClick={onExportJson}>
            <Download className="h-3 w-3" />
          </Button>
          <Link to={`/admin/theme-test?themeId=${theme.id}`} target="_blank">
            <Button variant="outline" size="sm" className="text-[10px] h-7 px-2">
              <Eye className="h-3 w-3" />
            </Button>
          </Link>
          {!theme.is_active && (
            <Button variant="outline" size="sm" className="text-[10px] h-7 px-2 text-destructive hover:text-destructive"
              onClick={() => onDelete(theme)}>
              <Trash2 className="h-3 w-3" />
            </Button>
          )}
          <Button size="sm" className="text-[10px] h-7 px-3" onClick={onEdit}>
            <Edit className="h-3 w-3 mr-1" />
            Edit
          </Button>
        </div>
      </div>

      {/* Scrollable dashboard */}
      <ScrollArea className="flex-1">
        <div className="p-3">
          <ThemeSummaryDashboard
            themeName={theme.name}
            isActive={!!theme.is_active}
            defaultMode={defaultMode}
            accentConfig={accentConfig}
            staticColors={staticColors}
            darkModeOverrides={darkModeOverrides}
            gradientConfigs={gradientConfigs}
            typographyConfig={typographyConfig}
            motionConfig={motionConfig}
            ecommerceColors={ecommerceColors}
            ctaVariants={ctaVariants}
            styleModules={styleModules}
            adaWidgetConfig={adaWidgetConfig}
            ghlChatConfig={ghlChatConfig}
            logoVersion={logoVersion}
          />
        </div>
      </ScrollArea>
    </div>
  );
}
