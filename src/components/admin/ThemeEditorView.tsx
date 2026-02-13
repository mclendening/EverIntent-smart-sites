/**
 * @fileoverview ThemeEditorView — Shopify-style split-screen theme editor.
 *
 * ## Architecture (Shopify + Shadcn Hybrid)
 * - **Left Panel**: Compact control sidebar (~360px desktop) with:
 *   - Sticky toolbar (theme name, save/revert/cancel)
 *   - Category navigation (ThemeEditorNav)
 *   - Active panel controls (ThemeEditorPanels) — scrollable
 * - **Right Panel**: Live component canvas (ThemeLiveCanvas) showing actual
 *   themed UI that updates in real-time as tokens change.
 *
 * ## Mobile Behavior
 * - Toggle between "Controls" and "Preview" via a segmented control.
 *
 * ## Key Design Decision
 * - No detail view — this IS the detail + editor combined (Shopify pattern).
 * - Metadata (Name, Base Hue, Changelog) collapsed by default.
 */

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ArrowLeft, Loader2, RotateCcw, Save, Settings2, Eye, SlidersHorizontal } from 'lucide-react';
import { ThemeEditorNav, type EditorSection } from './ThemeEditorNav';
import { ThemeEditorPanels } from './ThemeEditorPanels';
import { ThemeLiveCanvas } from './ThemeLiveCanvas';
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
  darkModeOverrides: DarkModeOverrides;
  setDarkModeOverrides: (d: DarkModeOverrides) => void;
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
  ecommerceColors, setEcommerceColors, ctaVariants, setCtaVariants,
  typographyConfig, setTypographyConfig, motionConfig, setMotionConfig,
  styleModules, setStyleModules, darkModeOverrides, setDarkModeOverrides,
  defaultMode, setDefaultMode, adaWidgetConfig, setAdaWidgetConfig,
  isSaving, onSave, onCancel, onRevert, onSaveDefault,
}: ThemeEditorViewProps) {
  const [metaOpen, setMetaOpen] = useState(false);
  const [mobileView, setMobileView] = useState<'controls' | 'preview'>('controls');

  return (
    <div className="h-full flex flex-col">
      {/* ── Sticky Toolbar ── */}
      <div className="flex items-center gap-2 px-3 py-2 border-b border-border bg-card shrink-0">
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onCancel}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-heading font-semibold text-sm truncate text-foreground">
              {selectedTheme.name}
            </span>
            <Badge variant="secondary" className="text-[10px]">v{selectedTheme.version}</Badge>
            {selectedTheme.is_active && (
              <Badge className="bg-gold text-gold-foreground text-[10px]">Active</Badge>
            )}
          </div>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setMetaOpen(!metaOpen)}>
          <Settings2 className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="sm" className="h-8 text-xs" onClick={onRevert}>
          <RotateCcw className="h-3.5 w-3.5 mr-1" />Revert
        </Button>
        <Button size="sm" className="h-8 text-xs" onClick={onSave} disabled={isSaving}>
          {isSaving ? <Loader2 className="h-3.5 w-3.5 mr-1 animate-spin" /> : <Save className="h-3.5 w-3.5 mr-1" />}
          Save
        </Button>
      </div>

      {/* ── Collapsible Metadata ── */}
      <Collapsible open={metaOpen} onOpenChange={setMetaOpen}>
        <CollapsibleContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 px-4 py-3 border-b border-border bg-muted/30">
            <div>
              <Label className="text-xs text-muted-foreground">Theme Name</Label>
              <Input value={selectedTheme.name} onChange={e => setSelectedTheme({ ...selectedTheme, name: e.target.value })} className="h-8 text-sm mt-1" />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Base Hue ({selectedTheme.base_hue}°)</Label>
              <Slider value={[selectedTheme.base_hue]} onValueChange={([v]) => setSelectedTheme({ ...selectedTheme, base_hue: v })} min={0} max={360} step={1} className="mt-2" />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Changelog Notes</Label>
              <Textarea value={selectedTheme.changelog_notes || ''} onChange={e => setSelectedTheme({ ...selectedTheme, changelog_notes: e.target.value })} className="h-8 min-h-[32px] text-xs mt-1" rows={1} />
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* ── Mobile View Toggle ── */}
      <div className="lg:hidden flex border-b border-border">
        <button
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-medium transition-colors ${mobileView === 'controls' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
          onClick={() => setMobileView('controls')}
        >
          <SlidersHorizontal className="h-3.5 w-3.5" />Controls
        </button>
        <button
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-medium transition-colors ${mobileView === 'preview' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
          onClick={() => setMobileView('preview')}
        >
          <Eye className="h-3.5 w-3.5" />Preview
        </button>
      </div>

      {/* ── Split-screen Content ── */}
      <div className="flex-1 min-h-0 flex">
        {/* Left: Control Sidebar */}
        <div className={`${mobileView === 'controls' ? 'flex' : 'hidden'} lg:flex flex-col w-full lg:w-[360px] xl:w-[400px] border-r border-border shrink-0`}>
          <div className="px-2 py-2 border-b border-border shrink-0 overflow-x-auto">
            <ThemeEditorNav active={editorSection} onChange={setEditorSection} />
          </div>
          <ScrollArea className="flex-1">
            <div className="p-3">
              <ThemeEditorPanels
                active={editorSection}
                accentConfig={accentConfig} setAccentConfig={setAccentConfig}
                staticColors={staticColors} setStaticColors={setStaticColors}
                gradientConfigs={gradientConfigs} setGradientConfigs={setGradientConfigs}
                ghlChatConfig={ghlChatConfig} setGhlChatConfig={setGhlChatConfig}
                ecommerceColors={ecommerceColors} setEcommerceColors={setEcommerceColors}
                ctaVariants={ctaVariants} setCtaVariants={setCtaVariants}
                typographyConfig={typographyConfig} setTypographyConfig={setTypographyConfig}
                motionConfig={motionConfig} setMotionConfig={setMotionConfig}
                styleModules={styleModules} setStyleModules={setStyleModules}
                darkModeOverrides={darkModeOverrides} setDarkModeOverrides={setDarkModeOverrides}
                defaultMode={defaultMode} setDefaultMode={setDefaultMode}
                adaWidgetConfig={adaWidgetConfig} setAdaWidgetConfig={setAdaWidgetConfig}
                selectedTheme={selectedTheme} setSelectedTheme={setSelectedTheme}
                themes={themes} fetchData={fetchData}
              />
            </div>
          </ScrollArea>
        </div>

        {/* Right: Live Canvas */}
        <div className={`${mobileView === 'preview' ? 'flex' : 'hidden'} lg:flex flex-1 min-w-0 bg-muted/20`}>
          <div className="w-full h-full">
            <ThemeLiveCanvas
              accentConfig={accentConfig}
              staticColors={staticColors}
              gradientConfigs={gradientConfigs}
              darkModeOverrides={darkModeOverrides}
              ecommerceColors={ecommerceColors}
              typographyConfig={typographyConfig}
              motionConfig={motionConfig}
              defaultMode={defaultMode}
              themeName={selectedTheme.name}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
