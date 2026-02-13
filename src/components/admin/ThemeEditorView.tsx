/**
 * @fileoverview ThemeEditorView — Full-viewport theme editor.
 *
 * ## Key Design Decision
 * Name, Base Hue, and Changelog are NOT in a persistent settings bar.
 * They are collapsed into a minimal expandable row so the editor panels
 * get maximum viewport space — especially critical on mobile (390px).
 *
 * ## Layout
 * - **Toolbar**: 44px sticky bar with theme name + save/cancel (always visible).
 * - **Navigation**: Pill bar (mobile) or sidebar (desktop) — no duplication.
 * - **Content**: Full remaining height for the active editor panel.
 *
 * ## Architecture
 * - flex flex-row on desktop for sidebar + content.
 * - Mobile: pill bar flows inline above content.
 */

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ArrowLeft, Loader2, RotateCcw, Save, ChevronDown, Settings2 } from 'lucide-react';
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
  const [metaOpen, setMetaOpen] = useState(false);

  return (
    <div className="flex flex-col h-[calc(100dvh-4rem)]">
      {/* ── Compact sticky toolbar ── */}
      <div className="px-3 py-1.5 border-b border-border flex items-center gap-2 shrink-0 min-h-[40px]">
        <Button variant="ghost" size="sm" className="px-1.5 shrink-0 h-7 w-7" onClick={onCancel}>
          <ArrowLeft className="h-4 w-4" />
        </Button>

        {/* Theme name + meta toggle */}
        <Collapsible open={metaOpen} onOpenChange={setMetaOpen} className="flex-1 min-w-0">
          <CollapsibleTrigger className="flex items-center gap-1.5 min-w-0 group">
            <span className="text-sm font-semibold truncate">{selectedTheme.name}</span>
            <span className="text-[10px] text-muted-foreground">v{selectedTheme.version}</span>
            <Settings2 className="h-3 w-3 text-muted-foreground group-hover:text-foreground transition-colors shrink-0" />
            <ChevronDown className={`h-3 w-3 text-muted-foreground transition-transform shrink-0 ${metaOpen ? 'rotate-180' : ''}`} />
          </CollapsibleTrigger>
        </Collapsible>

        {/* Actions */}
        <div className="flex gap-1 shrink-0">
          <Button variant="outline" size="sm" className="h-7 w-7 p-0 text-destructive hover:text-destructive"
            onClick={onRevert} title="Revert to default">
            <RotateCcw className="h-3 w-3" />
          </Button>
          <Button variant="outline" size="sm" className="h-7 w-7 p-0"
            onClick={onSaveDefault} title="Save as default">
            <Save className="h-3 w-3" />
          </Button>
          <Button variant="outline" size="sm" className="text-xs h-7 px-2 hidden sm:flex" onClick={onCancel}>
            Cancel
          </Button>
          <Button size="sm" className="text-xs h-7 px-3 bg-accent hover:bg-accent/90 text-accent-foreground" onClick={onSave} disabled={isSaving}>
            {isSaving && <Loader2 className="h-3 w-3 animate-spin mr-1" />}
            Save
          </Button>
        </div>
      </div>

      {/* ── Collapsible meta fields (Name, Base Hue, Changelog) ── */}
      <Collapsible open={metaOpen} onOpenChange={setMetaOpen}>
        <CollapsibleContent>
          <div className="px-3 py-2 border-b border-border bg-muted/30 space-y-2">
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
        </CollapsibleContent>
      </Collapsible>

      {/* ── Navigation + Content ── */}
      <div className="flex-1 min-h-0 flex flex-col lg:flex-row">
        {/* Mobile: pill bar inline */}
        <div className="lg:hidden px-3 py-2 border-b border-border shrink-0">
          <ThemeEditorNav active={editorSection} onChange={setEditorSection} />
        </div>

        {/* Desktop: sidebar nav */}
        <div className="hidden lg:block shrink-0 py-3">
          <ScrollArea className="h-full">
            <ThemeEditorNav active={editorSection} onChange={setEditorSection} />
          </ScrollArea>
        </div>

        {/* Content panel — gets ALL remaining space */}
        <div className="flex-1 min-h-0 min-w-0">
          <ScrollArea className="h-full">
            <div className="p-3 sm:p-4 max-w-3xl">
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
