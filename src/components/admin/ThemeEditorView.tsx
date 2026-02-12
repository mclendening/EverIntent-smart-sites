/**
 * @fileoverview ThemeEditorView — Full-screen theme editor with pill-bar navigation.
 *
 * The third and deepest level of the drill-down (list → detail → editor).
 * Renders the ThemeEditorNav pill bar at top, followed by ThemeEditorPanels
 * content area, with a sticky toolbar for Save/Cancel/Revert/Set Default.
 *
 * ## Architecture
 * - Full-viewport height (100dvh minus header).
 * - Sticky top bar: back button, theme name, save/cancel actions.
 * - Below: basic settings row (name, base hue, changelog).
 * - Below: ThemeEditorNav pill bar + ThemeEditorPanels.
 * - All state managed by useThemeAdmin hook — this component is pure presentation.
 *
 * ## Data Contract
 * - All editor state props and setters from useThemeAdmin.
 * - Action callbacks for save, cancel, revert, set-default.
 *
 * ## Portability
 * - Copy with useThemeAdmin.ts + ThemeEditorNav.tsx + ThemeEditorPanels.tsx.
 */

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { ArrowLeft, Loader2, RotateCcw, Save } from 'lucide-react';
import { ThemeEditorNav, type EditorSection } from './ThemeEditorNav';
import { ThemeEditorPanels } from './ThemeEditorPanels';
import type { Theme, AccentConfig, StaticColors, GradientConfig, GHLChatConfig } from '@/hooks/useThemeAdmin';
import type { EcommerceColors, CtaVariants } from './EcommerceColorEditor';
import type { TypographyConfig } from './TypographyEditor';
import type { MotionConfig } from './MotionEditor';
import type { StyleModule } from './StyleModulesEditor';
import type { AdaWidgetConfig } from './AdaWidgetConfigEditor';
import type { DarkModeOverrides } from './DarkModeOverridesEditor';

interface ThemeEditorViewProps {
  // Theme
  selectedTheme: Theme;
  setSelectedTheme: (t: Theme) => void;
  themes: Theme[];
  fetchData: () => void;
  // Editor nav
  editorSection: EditorSection;
  setEditorSection: (s: EditorSection) => void;
  // Config states + setters
  accentConfig: AccentConfig;
  setAccentConfig: (c: AccentConfig) => void;
  staticColors: StaticColors;
  setStaticColors: (c: StaticColors) => void;
  gradientConfigs: GradientConfig;
  setGradientConfigs: (c: GradientConfig) => void;
  ghlChatConfig: GHLChatConfig;
  setGhlChatConfig: (c: GHLChatConfig) => void;
  darkModeOverrides: DarkModeOverrides;
  setDarkModeOverrides: (c: DarkModeOverrides) => void;
  ecommerceColors: EcommerceColors;
  setEcommerceColors: (c: EcommerceColors) => void;
  ctaVariants: CtaVariants;
  setCtaVariants: (c: CtaVariants) => void;
  typographyConfig: TypographyConfig;
  setTypographyConfig: (c: TypographyConfig) => void;
  motionConfig: MotionConfig;
  setMotionConfig: (c: MotionConfig) => void;
  styleModules: StyleModule[];
  setStyleModules: (m: StyleModule[]) => void;
  defaultMode: string;
  setDefaultMode: (m: string) => void;
  adaWidgetConfig: AdaWidgetConfig;
  setAdaWidgetConfig: (c: AdaWidgetConfig) => void;
  // Actions
  isSaving: boolean;
  onSave: () => void;
  onCancel: () => void;
  onRevert: () => void;
  onSaveDefault: () => void;
}

export function ThemeEditorView({
  selectedTheme, setSelectedTheme, themes, fetchData,
  editorSection, setEditorSection,
  accentConfig, setAccentConfig, staticColors, setStaticColors,
  gradientConfigs, setGradientConfigs, ghlChatConfig, setGhlChatConfig,
  darkModeOverrides, setDarkModeOverrides, ecommerceColors, setEcommerceColors,
  ctaVariants, setCtaVariants, typographyConfig, setTypographyConfig,
  motionConfig, setMotionConfig, styleModules, setStyleModules,
  defaultMode, setDefaultMode, adaWidgetConfig, setAdaWidgetConfig,
  isSaving, onSave, onCancel, onRevert, onSaveDefault,
}: ThemeEditorViewProps) {
  return (
    <div className="flex flex-col h-[calc(100dvh-4rem)]">
      {/* Sticky toolbar */}
      <div className="px-3 py-2 border-b border-border flex items-center gap-2 shrink-0 overflow-x-auto">
        <Button variant="ghost" size="sm" className="px-2 shrink-0" onClick={onCancel}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <span className="text-xs font-semibold truncate flex-1 min-w-0">{selectedTheme.name}</span>
        <div className="flex gap-1 shrink-0">
          <Button variant="outline" size="sm" className="text-[10px] h-7 px-2 text-destructive hover:text-destructive"
            onClick={onRevert}>
            <RotateCcw className="h-3 w-3" />
          </Button>
          <Button variant="outline" size="sm" className="text-[10px] h-7 px-2" onClick={onSaveDefault}>
            <Save className="h-3 w-3" />
          </Button>
          <Button variant="outline" size="sm" className="text-[10px] h-7 px-2" onClick={onCancel}>
            Cancel
          </Button>
          <Button size="sm" className="text-[10px] h-7 px-3" onClick={onSave} disabled={isSaving}>
            {isSaving && <Loader2 className="h-3 w-3 animate-spin mr-1" />}
            Save
          </Button>
        </div>
      </div>

      {/* Basic settings */}
      <div className="px-3 py-2 border-b border-border shrink-0">
        <div className="grid grid-cols-3 gap-2">
          <div className="space-y-0.5">
            <Label className="text-[10px]">Name</Label>
            <Input
              value={selectedTheme.name}
              onChange={(e) => setSelectedTheme({ ...selectedTheme, name: e.target.value })}
              className="h-7 text-xs"
            />
          </div>
          <div className="space-y-0.5">
            <Label className="text-[10px]">Base Hue</Label>
            <div className="flex items-center gap-1">
              <Slider
                value={[selectedTheme.base_hue]}
                max={360}
                onValueChange={(v) => setSelectedTheme({ ...selectedTheme, base_hue: v[0] })}
                className="flex-1"
              />
              <Input
                type="number" min={0} max={360}
                value={selectedTheme.base_hue}
                onChange={(e) => setSelectedTheme({ ...selectedTheme, base_hue: Math.min(360, Math.max(0, parseInt(e.target.value) || 0)) })}
                className="w-12 h-7 text-[10px] text-center"
              />
            </div>
          </div>
          <div className="space-y-0.5">
            <Label className="text-[10px]">Changelog</Label>
            <Input
              value={selectedTheme.changelog_notes || ''}
              onChange={(e) => setSelectedTheme({ ...selectedTheme, changelog_notes: e.target.value })}
              placeholder="Describe changes..."
              className="h-7 text-[10px]"
            />
          </div>
        </div>
      </div>

      {/* Nav + Panels */}
      <div className="flex-1 min-h-0 px-3 py-2 flex flex-col gap-2 overflow-hidden">
        <ThemeEditorNav active={editorSection} onChange={setEditorSection} />
        <div className="flex-1 min-h-0">
          <ThemeEditorPanels
            active={editorSection}
            accentConfig={accentConfig} setAccentConfig={setAccentConfig}
            staticColors={staticColors} setStaticColors={setStaticColors}
            gradientConfigs={gradientConfigs} setGradientConfigs={setGradientConfigs}
            ghlChatConfig={ghlChatConfig} setGhlChatConfig={setGhlChatConfig}
            darkModeOverrides={darkModeOverrides} setDarkModeOverrides={setDarkModeOverrides}
            ecommerceColors={ecommerceColors} setEcommerceColors={setEcommerceColors}
            ctaVariants={ctaVariants} setCtaVariants={setCtaVariants}
            typographyConfig={typographyConfig} setTypographyConfig={setTypographyConfig}
            motionConfig={motionConfig} setMotionConfig={setMotionConfig}
            styleModules={styleModules} setStyleModules={setStyleModules}
            defaultMode={defaultMode} setDefaultMode={setDefaultMode}
            adaWidgetConfig={adaWidgetConfig} setAdaWidgetConfig={setAdaWidgetConfig}
            selectedTheme={selectedTheme} setSelectedTheme={setSelectedTheme}
            themes={themes} fetchData={fetchData}
          />
        </div>
      </div>
    </div>
  );
}
