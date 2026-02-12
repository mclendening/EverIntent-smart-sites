/**
 * @fileoverview ThemeEditorView — Professional sidebar+content editor layout.
 *
 * The third level of the drill-down (list → detail → editor). Uses a proper
 * sidebar+content panel layout on desktop (like Webflow/Figma style panels)
 * and a pill-bar+content stack on mobile.
 *
 * ## Design Philosophy
 * - **Desktop**: Fixed sidebar nav on left, scrollable content panel on right.
 *   The sidebar and content are side-by-side in a flex row — NOT stacked.
 * - **Mobile**: Horizontal pill bar at top, content below.
 * - **Sticky toolbar**: Theme name + save/cancel always visible.
 * - **Compact settings bar**: Name, base hue, changelog in one row.
 *
 * ## Architecture
 * - Full-viewport height (100dvh minus global header).
 * - `flex flex-row` on desktop for sidebar + content layout.
 * - All state managed by useThemeAdmin hook.
 *
 * ## Portability
 * - Copy with useThemeAdmin.ts + ThemeEditorNav.tsx + ThemeEditorPanels.tsx.
 */

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { ScrollArea } from '@/components/ui/scroll-area';
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
  selectedTheme: Theme;
  setSelectedTheme: (t: Theme) => void;
  themes: Theme[];
  fetchData: () => void;
  editorSection: EditorSection;
  setEditorSection: (s: EditorSection) => void;
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
      {/* ── Sticky toolbar ── */}
      <div className="px-4 sm:px-6 py-2 border-b border-border flex items-center gap-3 shrink-0">
        <Button variant="ghost" size="sm" className="px-2 shrink-0" onClick={onCancel}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <span className="text-sm font-semibold truncate flex-1 min-w-0">{selectedTheme.name}</span>
        <div className="flex gap-1.5 shrink-0">
          <Button variant="outline" size="sm" className="h-7 w-7 p-0 text-destructive hover:text-destructive"
            onClick={onRevert} title="Revert to default">
            <RotateCcw className="h-3 w-3" />
          </Button>
          <Button variant="outline" size="sm" className="h-7 w-7 p-0"
            onClick={onSaveDefault} title="Save as default">
            <Save className="h-3 w-3" />
          </Button>
          <Button variant="outline" size="sm" className="text-xs h-7 px-2.5" onClick={onCancel}>
            Cancel
          </Button>
          <Button size="sm" className="text-xs h-7 px-3 bg-accent hover:bg-accent/90 text-accent-foreground" onClick={onSave} disabled={isSaving}>
            {isSaving && <Loader2 className="h-3 w-3 animate-spin mr-1" />}
            Save
          </Button>
        </div>
      </div>

      {/* ── Settings bar ── */}
      <div className="px-4 sm:px-6 py-2 border-b border-border shrink-0">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <div className="space-y-0.5">
            <Label className="text-[10px] text-muted-foreground">Name</Label>
            <Input
              value={selectedTheme.name}
              onChange={(e) => setSelectedTheme({ ...selectedTheme, name: e.target.value })}
              className="h-7 text-xs"
            />
          </div>
          <div className="space-y-0.5">
            <Label className="text-[10px] text-muted-foreground">Base Hue</Label>
            <div className="flex items-center gap-2">
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
            <Label className="text-[10px] text-muted-foreground">Changelog</Label>
            <Input
              value={selectedTheme.changelog_notes || ''}
              onChange={(e) => setSelectedTheme({ ...selectedTheme, changelog_notes: e.target.value })}
              placeholder="Describe changes…"
              className="h-7 text-xs"
            />
          </div>
        </div>
      </div>

      {/* ── Sidebar + Content (desktop) / Pill bar + Content (mobile) ── */}
      <div className="flex-1 min-h-0 flex flex-col lg:flex-row">
        {/* Sidebar nav (desktop) / Pill bar (mobile) */}
        <div className="lg:border-r lg:border-border shrink-0 lg:w-48 px-4 sm:px-6 lg:px-0 py-2 lg:py-3">
          <ScrollArea className="lg:h-full">
            <div className="lg:px-3">
              <ThemeEditorNav active={editorSection} onChange={setEditorSection} />
            </div>
          </ScrollArea>
        </div>

        {/* Content panel */}
        <div className="flex-1 min-h-0 min-w-0">
          <ScrollArea className="h-full">
            <div className="p-4 sm:p-6 max-w-3xl">
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
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
