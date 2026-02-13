/**
 * @fileoverview Theme Importer — JSON file upload with schema validation.
 *
 * Allows admins to upload a v2.0 theme JSON file exported from another
 * instance (or hand-crafted) and either create a new theme or update an
 * existing one in the `site_themes` table.
 *
 * ## Business Purpose
 * Enables theme portability between environments (dev → staging → prod)
 * and cross-project theme sharing. A designer can export a theme from
 * one Lovable project and import it into another.
 *
 * ## Validation
 * - File must be .json, ≤ 500KB.
 * - Required fields: `version` ("2.0"), `theme.name` (string), `theme.baseHue` (0–360).
 * - Optional typed fields: accentConfig, staticColors, styleModules, etc.
 * - Warnings for version mismatch or unexpected types (non-blocking).
 *
 * ## Import Modes
 * - **Create**: Inserts a new row in `site_themes` (with `is_active: false`).
 * - **Update**: Overwrites an existing theme matched by name.
 *
 * ## Data Contract
 * - **Input Props**: `existingThemeNames` (for conflict detection), `onImportComplete` callback.
 * - **DB Write**: Direct insert/update to `site_themes` via Supabase client.
 * - **Schema**: `ThemeImportData` interface mirrors the export format.
 *
 * ## Security
 * - Admin-only (behind AdminGuard). Uses authenticated Supabase client.
 * - RLS policies on `site_themes` restrict writes to admin role.
 *
 * ## SSG Compatibility
 * - Admin-only component, not rendered during SSG.
 *
 * ## Portability
 * - Copy this file. Adjust the `site_themes` table name and column mappings
 *   to match your project's schema.
 */

import { useState, useRef } from 'react';
import { AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Upload, FileJson, AlertTriangle, CheckCircle, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import type { Json } from '@/integrations/supabase/types';

interface ThemeImportData {
  $schema?: string;
  version: string;
  exportedAt?: string;
  theme: {
    name: string;
    baseHue: number;
    defaultMode?: string;
    accentConfig?: Record<string, unknown>;
    staticColors?: Record<string, string>;
    gradientConfigs?: Record<string, string>;
    ghlChatConfig?: Record<string, string>;
    ecommerceColors?: Record<string, string>;
    ctaVariants?: Record<string, string>;
    typographyConfig?: Record<string, string>;
    motionConfig?: Record<string, string>;
    styleModules?: unknown[];
    adaWidgetConfig?: Record<string, unknown>;
  };
}

interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
  data?: ThemeImportData;
}

/** Validates a parsed JSON object against the v2.0 theme schema */
function validateThemeJson(obj: unknown): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!obj || typeof obj !== 'object') {
    return { valid: false, errors: ['File is not a valid JSON object'], warnings };
  }

  const data = obj as Record<string, unknown>;

  // Version check
  if (!data.version) {
    errors.push('Missing "version" field');
  } else if (data.version !== '2.0') {
    warnings.push(`Version "${data.version}" — expected "2.0". Import may have compatibility issues.`);
  }

  // Theme object
  if (!data.theme || typeof data.theme !== 'object') {
    errors.push('Missing "theme" object');
    return { valid: false, errors, warnings };
  }

  const theme = data.theme as Record<string, unknown>;

  // Required fields
  if (!theme.name || typeof theme.name !== 'string') {
    errors.push('Missing or invalid "theme.name" (must be a string)');
  }
  if (theme.baseHue === undefined || typeof theme.baseHue !== 'number') {
    errors.push('Missing or invalid "theme.baseHue" (must be a number 0–360)');
  } else if (theme.baseHue < 0 || theme.baseHue > 360) {
    errors.push('"theme.baseHue" must be between 0 and 360');
  }

  // Optional typed fields — warn if unexpected types
  if (theme.accentConfig && typeof theme.accentConfig !== 'object') {
    warnings.push('"theme.accentConfig" should be an object');
  }
  if (theme.staticColors && typeof theme.staticColors !== 'object') {
    warnings.push('"theme.staticColors" should be an object');
  }
  if (theme.styleModules && !Array.isArray(theme.styleModules)) {
    warnings.push('"theme.styleModules" should be an array');
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
    data: errors.length === 0 ? (obj as ThemeImportData) : undefined,
  };
}

interface ThemeImporterProps {
  existingThemeNames: string[];
  onImportComplete: () => void;
}

export function ThemeImporter({ existingThemeNames, onImportComplete }: ThemeImporterProps) {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [validation, setValidation] = useState<ValidationResult | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const [importMode, setImportMode] = useState<'create' | 'update'>('create');
  const [customName, setCustomName] = useState('');
  const [isImporting, setIsImporting] = useState(false);

  const nameConflict = validation?.data?.theme.name
    ? existingThemeNames.includes(validation.data.theme.name)
    : false;

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setValidation(null);
    setCustomName('');

    // Size check (500KB max per BRD §22)
    if (file.size > 500 * 1024) {
      setValidation({ valid: false, errors: ['File exceeds 500KB limit'], warnings: [] });
      return;
    }

    if (!file.name.endsWith('.json')) {
      setValidation({ valid: false, errors: ['File must be a .json file'], warnings: [] });
      return;
    }

    try {
      const text = await file.text();
      const parsed = JSON.parse(text);
      const result = validateThemeJson(parsed);
      setValidation(result);

      if (result.data) {
        setCustomName(result.data.theme.name);
        if (existingThemeNames.includes(result.data.theme.name)) {
          setImportMode('update');
        }
      }
    } catch {
      setValidation({ valid: false, errors: ['Invalid JSON — could not parse file'], warnings: [] });
    }
  };

  const handleImport = async () => {
    if (!validation?.data) return;

    const { theme } = validation.data;
    const finalName = importMode === 'create' ? (customName || theme.name) : theme.name;

    setIsImporting(true);
    try {
      if (importMode === 'update') {
        // Update existing theme by name
        const { error } = await supabase
          .from('site_themes')
          .update({
            base_hue: theme.baseHue,
            default_mode: theme.defaultMode || 'dark',
            accent_config: (theme.accentConfig || {}) as unknown as Json,
            static_colors: (theme.staticColors || {}) as unknown as Json,
            gradient_configs: (theme.gradientConfigs || {}) as unknown as Json,
            ghl_chat_config: (theme.ghlChatConfig || {}) as unknown as Json,
            ecommerce_colors: (theme.ecommerceColors || {}) as unknown as Json,
            cta_variants: (theme.ctaVariants || {}) as unknown as Json,
            typography_config: (theme.typographyConfig || {}) as unknown as Json,
            motion_config: (theme.motionConfig || {}) as unknown as Json,
            style_modules: (theme.styleModules || []) as unknown as Json,
            ada_widget_config: (theme.adaWidgetConfig || {}) as unknown as Json,
          })
          .eq('name', finalName);

        if (error) throw error;
        toast({ title: 'Theme updated', description: `"${finalName}" has been updated from import.` });
      } else {
        // Create new theme
        const { error } = await supabase
          .from('site_themes')
          .insert({
            name: finalName,
            base_hue: theme.baseHue,
            default_mode: theme.defaultMode || 'dark',
            accent_config: (theme.accentConfig || {}) as unknown as Json,
            static_colors: (theme.staticColors || {}) as unknown as Json,
            gradient_configs: (theme.gradientConfigs || {}) as unknown as Json,
            ghl_chat_config: (theme.ghlChatConfig || {}) as unknown as Json,
            ecommerce_colors: (theme.ecommerceColors || {}) as unknown as Json,
            cta_variants: (theme.ctaVariants || {}) as unknown as Json,
            typography_config: (theme.typographyConfig || {}) as unknown as Json,
            motion_config: (theme.motionConfig || {}) as unknown as Json,
            style_modules: (theme.styleModules || []) as unknown as Json,
            ada_widget_config: (theme.adaWidgetConfig || {}) as unknown as Json,
            is_active: false,
            version: 1,
          });

        if (error) throw error;
        toast({ title: 'Theme created', description: `"${finalName}" has been imported.` });
      }

      // Reset state
      setValidation(null);
      setFileName('');
      setCustomName('');
      if (fileInputRef.current) fileInputRef.current.value = '';
      onImportComplete();
    } catch (error: any) {
      console.error('Import error:', error);
      toast({
        variant: 'destructive',
        title: 'Import failed',
        description: error?.message || 'Could not save theme to database.',
      });
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <AccordionItem value="theme-import">
      <AccordionTrigger className="text-sm py-2">
        <div className="flex items-center gap-2">
          <Upload className="h-4 w-4 shrink-0" />
          Import Theme
        </div>
      </AccordionTrigger>
      <AccordionContent className="space-y-4 pb-4">
        {/* File Picker */}
        <div className="space-y-2">
          <Label className="text-xs">Upload Theme JSON</Label>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="text-xs"
              onClick={() => fileInputRef.current?.click()}
            >
              <FileJson className="h-3 w-3 mr-1" />
              Choose File
            </Button>
            {fileName && <span className="text-xs text-muted-foreground truncate">{fileName}</span>}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            className="hidden"
            onChange={handleFileSelect}
          />
          <p className="text-[10px] text-muted-foreground">v2.0 theme JSON (max 500KB)</p>
        </div>

        {/* Validation Results */}
        {validation && (
          <div className="space-y-2">
            {validation.errors.length > 0 && (
              <div className="space-y-1 p-2 bg-red-500/10 rounded-md border border-red-500/20">
                {validation.errors.map((err, i) => (
                  <div key={i} className="flex items-start gap-1.5">
                    <AlertTriangle className="h-3 w-3 text-red-500 shrink-0 mt-0.5" />
                    <span className="text-xs text-red-400">{err}</span>
                  </div>
                ))}
              </div>
            )}
            {validation.warnings.length > 0 && (
              <div className="space-y-1 p-2 bg-yellow-500/10 rounded-md border border-yellow-500/20">
                {validation.warnings.map((warn, i) => (
                  <div key={i} className="flex items-start gap-1.5">
                    <AlertTriangle className="h-3 w-3 text-yellow-500 shrink-0 mt-0.5" />
                    <span className="text-xs text-yellow-400">{warn}</span>
                  </div>
                ))}
              </div>
            )}
            {validation.valid && (
              <div className="flex items-center gap-1.5 p-2 bg-green-500/10 rounded-md border border-green-500/20">
                <CheckCircle className="h-3 w-3 text-green-500" />
                <span className="text-xs text-green-400">Schema valid — ready to import</span>
              </div>
            )}
          </div>
        )}

        {/* Import Options (only show when valid) */}
        {validation?.valid && validation.data && (
          <div className="space-y-3">
            {/* Theme info */}
            <div className="p-2 bg-muted/50 rounded-md space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium">{validation.data.theme.name}</span>
                <Badge variant="outline" className="text-[10px]">Hue {validation.data.theme.baseHue}°</Badge>
              </div>
              {validation.data.exportedAt && (
                <p className="text-[10px] text-muted-foreground">
                  Exported: {new Date(validation.data.exportedAt).toLocaleDateString()}
                </p>
              )}
            </div>

            {/* Create vs Update */}
            <div className="space-y-2">
              <Label className="text-xs font-medium">Import Mode</Label>
              <RadioGroup value={importMode} onValueChange={(v) => setImportMode(v as 'create' | 'update')}>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="create" id="import-create" />
                  <Label htmlFor="import-create" className="text-xs cursor-pointer">Create new theme</Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem
                    value="update"
                    id="import-update"
                    disabled={!nameConflict}
                  />
                  <Label htmlFor="import-update" className={`text-xs cursor-pointer ${!nameConflict ? 'text-muted-foreground' : ''}`}>
                    Update existing "{validation.data.theme.name}"
                    {!nameConflict && <span className="text-[10px] ml-1">(no match found)</span>}
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Custom name for create mode */}
            {importMode === 'create' && (
              <div className="space-y-1">
                <Label className="text-xs">Theme Name</Label>
                <Input
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  placeholder={validation.data.theme.name}
                  className="h-8 text-xs"
                />
                {nameConflict && customName === validation.data.theme.name && (
                  <p className="text-[10px] text-yellow-400">
                    A theme with this name already exists — consider renaming or using "Update" mode.
                  </p>
                )}
              </div>
            )}

            {/* Import Button */}
            <Button
              size="sm"
              className="w-full text-xs"
              onClick={handleImport}
              disabled={isImporting || (importMode === 'create' && !customName)}
            >
              {isImporting ? (
                <><Loader2 className="h-3 w-3 mr-1 animate-spin" />Importing...</>
              ) : importMode === 'update' ? (
                <><Upload className="h-3 w-3 mr-1" />Update "{validation.data.theme.name}"</>
              ) : (
                <><Upload className="h-3 w-3 mr-1" />Create "{customName || validation.data.theme.name}"</>
              )}
            </Button>
          </div>
        )}
      </AccordionContent>
    </AccordionItem>
  );
}
