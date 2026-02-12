/**
 * @fileoverview Theme Editor Panels — renders the active editor section.
 * Each panel is a focused, single-purpose editor for one aspect of the theme.
 * Replaces the monolithic Accordion with clean, scrollable panels.
 */

import { ScrollArea } from '@/components/ui/scroll-area';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ColorRow, HslColorPicker } from './HslColorPicker';
import { EcommerceColorEditor, type EcommerceColors, type CtaVariants } from './EcommerceColorEditor';
import { TypographyEditor, type TypographyConfig } from './TypographyEditor';
import { MotionEditor, type MotionConfig } from './MotionEditor';
import { StyleModulesEditor, type StyleModule } from './StyleModulesEditor';
import { DefaultModeSelector } from './DefaultModeSelector';
import { AdaWidgetConfigEditor, type AdaWidgetConfig } from './AdaWidgetConfigEditor';
import { ContrastChecker } from './ContrastChecker';
import { ThemeImporter } from './ThemeImporter';
import { DarkModeOverridesEditor, type DarkModeOverrides, DARK_MODE_DEFAULTS } from './DarkModeOverridesEditor';
import { LogoConfigEditor } from './LogoConfigEditor';
import type { EditorSection } from './ThemeEditorNav';

// ─── PANEL WRAPPER ───────────────────────────────────────────

function PanelWrapper({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-semibold">{title}</h3>
        {description && <p className="text-xs text-muted-foreground mt-0.5">{description}</p>}
      </div>
      {children}
    </div>
  );
}

// ─── ACCENT PANEL ────────────────────────────────────────────

function AccentPanel({
  accentConfig,
  setAccentConfig,
}: {
  accentConfig: any;
  setAccentConfig: (c: any) => void;
}) {
  return (
    <PanelWrapper title="Accent Color" description="Primary brand/CTA color used for buttons, links, and highlights.">
      <HslColorPicker
        value={`${accentConfig.h} ${accentConfig.s}% ${accentConfig.l}%`}
        onChange={(val) => {
          const parts = val.replace(/%/g, '').trim().split(/\s+/).map(Number);
          setAccentConfig({ ...accentConfig, h: parts[0] || 0, s: parts[1] || 0, l: parts[2] || 0 });
        }}
        mode="inline"
      />

      {/* Gradient options */}
      <div className="space-y-3 border-t border-border pt-3">
        <div className="flex items-center gap-2">
          <Switch
            checked={accentConfig.useGradient || false}
            onCheckedChange={(v) => setAccentConfig({ ...accentConfig, useGradient: v })}
          />
          <Label className="text-xs">Enable Gradient</Label>
        </div>
        {accentConfig.useGradient && (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label className="text-xs">From</Label>
                <Input type="color" value={accentConfig.gradientFrom || '#F97316'} onChange={(e) => setAccentConfig({ ...accentConfig, gradientFrom: e.target.value })} className="h-8 cursor-pointer" />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">To</Label>
                <Input type="color" value={accentConfig.gradientTo || '#EF4444'} onChange={(e) => setAccentConfig({ ...accentConfig, gradientTo: e.target.value })} className="h-8 cursor-pointer" />
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <Label className="text-xs">Angle</Label>
                <span className="text-xs text-muted-foreground">{accentConfig.gradientAngle || 90}°</span>
              </div>
              <Slider value={[accentConfig.gradientAngle || 90]} max={360} onValueChange={(v) => setAccentConfig({ ...accentConfig, gradientAngle: v[0] })} />
            </div>
            <div className="h-8 rounded-lg border" style={{ background: `linear-gradient(${accentConfig.gradientAngle || 90}deg, ${accentConfig.gradientFrom || '#F97316'}, ${accentConfig.gradientTo || '#EF4444'})` }} />
          </div>
        )}
      </div>

      {/* Hover Effects */}
      <div className="space-y-3 border-t border-border pt-3">
        <Label className="text-xs font-medium">Hover Effects</Label>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-xs">Hover Brightness</Label>
            <span className="text-xs text-muted-foreground">{((accentConfig.hoverBrightness ?? 1.1) * 100).toFixed(0)}%</span>
          </div>
          <Slider value={[(accentConfig.hoverBrightness ?? 1.1) * 100]} onValueChange={([v]) => setAccentConfig({ ...accentConfig, hoverBrightness: v / 100 })} min={100} max={150} step={5} />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-xs">Icon Glow Opacity</Label>
            <span className="text-xs text-muted-foreground">{((accentConfig.iconGlowOpacity ?? 0.3) * 100).toFixed(0)}%</span>
          </div>
          <Slider value={[(accentConfig.iconGlowOpacity ?? 0.3) * 100]} onValueChange={([v]) => setAccentConfig({ ...accentConfig, iconGlowOpacity: v / 100 })} min={0} max={100} step={5} />
        </div>
      </div>
    </PanelWrapper>
  );
}

// ─── LIGHT COLORS PANEL ──────────────────────────────────────

function LightColorsPanel({
  staticColors,
  setStaticColors,
}: {
  staticColors: any;
  setStaticColors: (c: any) => void;
}) {
  const colors: { key: string; label: string; desc?: string }[] = [
    { key: 'background', label: 'Background', desc: 'Main page background' },
    { key: 'foreground', label: 'Foreground', desc: 'Main text color' },
    { key: 'primary', label: 'Primary', desc: 'Nav / header backgrounds' },
    { key: 'primaryLight', label: 'Primary Light', desc: 'Lighter primary variant' },
    { key: 'primaryForeground', label: 'Primary Foreground', desc: 'Text on primary bg' },
    { key: 'secondary', label: 'Secondary', desc: 'Secondary surfaces' },
    { key: 'secondaryForeground', label: 'Secondary Foreground' },
    { key: 'card', label: 'Card', desc: 'Card background' },
    { key: 'cardForeground', label: 'Card Foreground' },
    { key: 'muted', label: 'Muted', desc: 'Subtle backgrounds' },
    { key: 'mutedForeground', label: 'Muted Foreground' },
    { key: 'border', label: 'Border' },
    { key: 'input', label: 'Input' },
    { key: 'ring', label: 'Ring', desc: 'Focus ring' },
    { key: 'popover', label: 'Popover' },
    { key: 'popoverForeground', label: 'Popover Foreground' },
  ];

  return (
    <PanelWrapper title="Light Mode Colors" description="Base semantic colors used in light mode. These populate :root CSS variables.">
      <div className="space-y-1 divide-y divide-border/50">
        {colors.map(({ key, label, desc }) => (
          <ColorRow
            key={key}
            label={label}
            description={desc}
            value={staticColors[key] || '0 0% 0%'}
            onChange={(v) => setStaticColors({ ...staticColors, [key]: v })}
          />
        ))}
      </div>
    </PanelWrapper>
  );
}

// ─── GRADIENTS PANEL ─────────────────────────────────────────

function GradientsPanel({
  gradientConfigs,
  setGradientConfigs,
}: {
  gradientConfigs: any;
  setGradientConfigs: (c: any) => void;
}) {
  return (
    <PanelWrapper title="Gradients" description="CSS gradient values for hero, CTA, and text effects.">
      <div className="space-y-4">
        {[
          { key: 'hero', label: 'Hero Gradient', desc: 'Full-width hero backgrounds' },
          { key: 'cta', label: 'CTA Gradient', desc: 'Call-to-action button backgrounds' },
          { key: 'text', label: 'Text Gradient', desc: 'Applied via .text-gradient utility' },
        ].map(({ key, label, desc }) => (
          <div key={key} className="space-y-2">
            <Label className="text-xs font-medium">{label}</Label>
            {desc && <p className="text-[10px] text-muted-foreground">{desc}</p>}
            <Textarea
              value={gradientConfigs[key] || ''}
              onChange={(e) => setGradientConfigs({ ...gradientConfigs, [key]: e.target.value })}
              className="font-mono text-xs h-16"
              placeholder="linear-gradient(135deg, hsl(...) 0%, hsl(...) 100%)"
            />
            {gradientConfigs[key] && (
              <div className="h-8 rounded-lg border" style={{ background: gradientConfigs[key] }} />
            )}
          </div>
        ))}
      </div>
    </PanelWrapper>
  );
}

// ─── GHL CHAT PANEL ──────────────────────────────────────────

function GhlChatPanel({
  ghlChatConfig,
  setGhlChatConfig,
  accentConfig,
  staticColors,
}: {
  ghlChatConfig: any;
  setGhlChatConfig: (c: any) => void;
  accentConfig: any;
  staticColors: any;
}) {
  const accentStr = `${accentConfig.h} ${accentConfig.s}% ${accentConfig.l}%`;
  const fields: { key: string; label: string }[] = [
    { key: 'textareaBg', label: 'Textarea Background' },
    { key: 'textareaText', label: 'Textarea Text' },
    { key: 'textareaBorder', label: 'Textarea Border' },
    { key: 'textareaFocusBorder', label: 'Focus Border' },
    { key: 'textareaFocusGlow', label: 'Focus Glow' },
    { key: 'sendButtonBg', label: 'Send Button BG' },
    { key: 'sendButtonBorder', label: 'Send Button Border' },
    { key: 'sendButtonIcon', label: 'Send Button Icon' },
    { key: 'selectionBg', label: 'Selection BG' },
  ];

  return (
    <PanelWrapper title="GHL Chat Widget" description="GoHighLevel embedded chat widget colors.">
      <div className="space-y-1 divide-y divide-border/50">
        {fields.map(({ key, label }) => (
          <ColorRow
            key={key}
            label={label}
            value={ghlChatConfig[key] || '0 0% 0%'}
            onChange={(v) => setGhlChatConfig({ ...ghlChatConfig, [key]: v })}
          />
        ))}
      </div>

      {/* Preview */}
      <div className="space-y-2 mt-4">
        <Label className="text-xs font-medium">Preview</Label>
        <div className="rounded-lg p-3 border flex items-center gap-2" style={{ backgroundColor: `hsl(${ghlChatConfig.textareaBg})` }}>
          <div className="flex-1 h-10 rounded-lg border px-3 flex items-center" style={{ backgroundColor: `hsl(${ghlChatConfig.textareaBg})`, borderColor: `hsl(${ghlChatConfig.textareaBorder})`, color: `hsl(${ghlChatConfig.textareaText})` }}>
            <span className="text-xs opacity-60">Type a message...</span>
          </div>
          <div className="h-10 w-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `hsl(${ghlChatConfig.sendButtonBg})` }}>
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke={`hsl(${ghlChatConfig.sendButtonIcon})`} strokeWidth="2">
              <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="flex gap-2 flex-wrap">
        <Button variant="outline" size="sm" className="text-xs" onClick={() => setGhlChatConfig({
          ...ghlChatConfig,
          textareaFocusBorder: accentStr,
          textareaFocusGlow: accentStr,
          sendButtonBg: accentStr,
          selectionBg: accentStr,
        })}>
          Sync with Accent
        </Button>
        <Button variant="outline" size="sm" className="text-xs" onClick={() => setGhlChatConfig({
          textareaBg: staticColors.background,
          textareaText: staticColors.foreground,
          textareaBorder: staticColors.border,
          textareaFocusBorder: accentStr,
          textareaFocusGlow: accentStr,
          sendButtonBg: accentStr,
          sendButtonBorder: '0 0% 100%',
          sendButtonIcon: '0 0% 100%',
          selectionBg: accentStr,
        })}>
          Reset to Theme
        </Button>
      </div>
    </PanelWrapper>
  );
}

// ─── MAIN EXPORT ─────────────────────────────────────────────

interface ThemeEditorPanelsProps {
  active: EditorSection;
  // State & setters — passed through from Themes.tsx
  accentConfig: any;
  setAccentConfig: (c: any) => void;
  staticColors: any;
  setStaticColors: (c: any) => void;
  gradientConfigs: any;
  setGradientConfigs: (c: any) => void;
  ghlChatConfig: any;
  setGhlChatConfig: (c: any) => void;
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
  // Logo
  selectedTheme: any;
  setSelectedTheme: (t: any) => void;
  // Import/export
  themes: any[];
  fetchData: () => void;
}

export function ThemeEditorPanels(props: ThemeEditorPanelsProps) {
  const {
    active, accentConfig, setAccentConfig, staticColors, setStaticColors,
    gradientConfigs, setGradientConfigs, ghlChatConfig, setGhlChatConfig,
    darkModeOverrides, setDarkModeOverrides, ecommerceColors, setEcommerceColors,
    ctaVariants, setCtaVariants, typographyConfig, setTypographyConfig,
    motionConfig, setMotionConfig, styleModules, setStyleModules,
    defaultMode, setDefaultMode, adaWidgetConfig, setAdaWidgetConfig,
    selectedTheme, setSelectedTheme, themes, fetchData,
  } = props;

  const accentHsl = `${accentConfig.h} ${accentConfig.s}% ${accentConfig.l}%`;

  return (
    <ScrollArea className="h-[60vh] lg:h-[calc(100vh-18rem)] pr-2">
      {active === 'accent' && (
        <AccentPanel accentConfig={accentConfig} setAccentConfig={setAccentConfig} />
      )}

      {active === 'light-colors' && (
        <LightColorsPanel staticColors={staticColors} setStaticColors={setStaticColors} />
      )}

      {active === 'dark-colors' && (
        <PanelWrapper title="Dark Mode Colors" description="Explicit dark mode overrides. Populate .dark CSS block per BRD §7.1.">
          <div className="flex gap-2 flex-wrap mb-3">
            <Button variant="outline" size="sm" className="text-xs" onClick={() => setDarkModeOverrides({ ...staticColors })}>
              Copy from Light
            </Button>
            <Button variant="outline" size="sm" className="text-xs" onClick={() => setDarkModeOverrides({ ...DARK_MODE_DEFAULTS })}>
              Reset Defaults
            </Button>
          </div>
          {/* Preview */}
          <div className="rounded-lg p-4 border space-y-2 mb-4" style={{ backgroundColor: `hsl(${darkModeOverrides.background})`, color: `hsl(${darkModeOverrides.foreground})` }}>
            <div className="text-sm font-semibold">Dark Mode Preview</div>
            <div className="rounded p-2 text-xs" style={{ backgroundColor: `hsl(${darkModeOverrides.card})`, color: `hsl(${darkModeOverrides.cardForeground})`, borderColor: `hsl(${darkModeOverrides.border})`, borderWidth: 1 }}>
              Card content with <span style={{ color: `hsl(${darkModeOverrides.mutedForeground})` }}>muted text</span>
            </div>
          </div>
          <div className="space-y-1 divide-y divide-border/50">
            {(Object.keys(DARK_MODE_DEFAULTS) as (keyof DarkModeOverrides)[]).map((key) => (
              <ColorRow
                key={key}
                label={key.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase())}
                value={darkModeOverrides[key] || DARK_MODE_DEFAULTS[key]}
                onChange={(v) => setDarkModeOverrides({ ...darkModeOverrides, [key]: v })}
              />
            ))}
          </div>
        </PanelWrapper>
      )}

      {active === 'gradients' && (
        <GradientsPanel gradientConfigs={gradientConfigs} setGradientConfigs={setGradientConfigs} />
      )}

      {active === 'ecommerce' && (
        <PanelWrapper title="E-Commerce & CTA" description="Gold accents for pricing, checkout, and CTA elements.">
          <div className="space-y-4">
            <div>
              <Label className="text-xs font-medium mb-2 block">Gold Colors</Label>
              <div className="space-y-1 divide-y divide-border/50">
                <ColorRow label="Gold" value={ecommerceColors.gold} onChange={(v) => setEcommerceColors({ ...ecommerceColors, gold: v })} />
                <ColorRow label="Gold Hover" value={ecommerceColors.goldHover} onChange={(v) => setEcommerceColors({ ...ecommerceColors, goldHover: v })} />
                <ColorRow label="Gold Glow" value={ecommerceColors.goldGlow} onChange={(v) => setEcommerceColors({ ...ecommerceColors, goldGlow: v })} />
                <ColorRow label="Gold Foreground" value={ecommerceColors.goldForeground} onChange={(v) => setEcommerceColors({ ...ecommerceColors, goldForeground: v })} />
                <ColorRow label="Pricing Highlight" value={ecommerceColors.pricingHighlight} onChange={(v) => setEcommerceColors({ ...ecommerceColors, pricingHighlight: v })} />
              </div>
            </div>
            {/* Preview */}
            <div className="flex gap-2">
              <div className="flex-1 rounded-lg p-3 text-center text-xs font-semibold" style={{ backgroundColor: `hsl(${ecommerceColors.gold})`, color: `hsl(${ecommerceColors.goldForeground})` }}>$249/mo</div>
              <div className="flex-1 rounded-lg p-3 text-center text-xs font-semibold" style={{ backgroundColor: `hsl(${ecommerceColors.goldHover})`, color: `hsl(${ecommerceColors.goldForeground})` }}>Hover</div>
              <div className="flex-1 rounded-lg p-3 text-center text-xs font-semibold border" style={{ boxShadow: `0 0 20px hsl(${ecommerceColors.goldGlow} / 0.4)`, color: `hsl(${ecommerceColors.gold})` }}>Glow</div>
            </div>
            <div>
              <Label className="text-xs font-medium mb-2 block">CTA Variants</Label>
              <div className="space-y-1 divide-y divide-border/50">
                <ColorRow label="Primary CTA" value={ctaVariants.primary} onChange={(v) => setCtaVariants({ ...ctaVariants, primary: v })} />
                <ColorRow label="Primary Hover" value={ctaVariants.primaryHover} onChange={(v) => setCtaVariants({ ...ctaVariants, primaryHover: v })} />
                <ColorRow label="Secondary CTA" value={ctaVariants.secondary} onChange={(v) => setCtaVariants({ ...ctaVariants, secondary: v })} />
                <ColorRow label="Secondary Hover" value={ctaVariants.secondaryHover} onChange={(v) => setCtaVariants({ ...ctaVariants, secondaryHover: v })} />
              </div>
            </div>
          </div>
        </PanelWrapper>
      )}

      {active === 'typography' && (
        <PanelWrapper title="Typography" description="Font families for headings, body text, and display elements.">
          <Accordion type="multiple" className="w-full">
            <TypographyEditor typography={typographyConfig} onChange={setTypographyConfig} />
          </Accordion>
        </PanelWrapper>
      )}

      {active === 'motion' && (
        <PanelWrapper title="Motion & Transitions" description="CSS transition values for interactive elements.">
          <Accordion type="multiple" className="w-full">
            <MotionEditor motion={motionConfig} onChange={setMotionConfig} />
          </Accordion>
        </PanelWrapper>
      )}

      {active === 'style-modules' && (
        <PanelWrapper title="Style Modules" description="Custom token groups for specific UI components (checkout, comparison grid, etc.)">
          <Accordion type="multiple" className="w-full">
            <StyleModulesEditor modules={styleModules} onChange={setStyleModules} />
          </Accordion>
        </PanelWrapper>
      )}

      {active === 'ghl-chat' && (
        <GhlChatPanel ghlChatConfig={ghlChatConfig} setGhlChatConfig={setGhlChatConfig} accentConfig={accentConfig} staticColors={staticColors} />
      )}

      {active === 'ada-widget' && (
        <PanelWrapper title="ADA Accessibility Widget" description="Floating accessibility button visibility, position, and styling.">
          <Accordion type="multiple" className="w-full">
            <AdaWidgetConfigEditor config={adaWidgetConfig} onChange={setAdaWidgetConfig} />
          </Accordion>
        </PanelWrapper>
      )}

      {active === 'settings' && (
        <PanelWrapper title="Default Mode" description="Initial color mode before React hydrates.">
          <Accordion type="multiple" className="w-full">
            <DefaultModeSelector defaultMode={defaultMode} onChange={setDefaultMode} />
          </Accordion>
        </PanelWrapper>
      )}

      {active === 'contrast' && (
        <PanelWrapper title="Contrast Checker" description="WCAG 2.1 contrast ratio validation for token pairs.">
          <Accordion type="multiple" className="w-full">
            <ContrastChecker staticColors={staticColors} accentHsl={accentHsl} />
          </Accordion>
        </PanelWrapper>
      )}

      {active === 'import' && (
        <PanelWrapper title="Import Theme" description="Upload a v2.0 JSON theme file to create or update a theme.">
          <Accordion type="multiple" className="w-full">
            <ThemeImporter existingThemeNames={themes.map((t: any) => t.name)} onImportComplete={fetchData} />
          </Accordion>
        </PanelWrapper>
      )}

      {active === 'logo' && (
        <PanelWrapper title="Logo Configuration" description="Brand logo element styling and export.">
          <LogoConfigEditor
            selectedLogoId={selectedTheme?.logo_version_id}
            onLogoChange={(logoId: string) => setSelectedTheme({ ...selectedTheme, logo_version_id: logoId })}
            accentHsl={accentHsl}
            previewBgColor={`hsl(${staticColors.background})`}
          />
        </PanelWrapper>
      )}
    </ScrollArea>
  );
}
