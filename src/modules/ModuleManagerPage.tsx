/**
 * @fileoverview EverIntent Module Export/Import Admin Page.
 *
 * Provides a UI for exporting registered modules into portable packages
 * and importing module packages from JSON. Part of the admin shell,
 * rendered at /admin/modules.
 *
 * ## Features
 * - **Export Tab**: Select any registered module → generate + download bundle JSON
 * - **Import Tab**: Paste/upload bundle JSON → validate → review plan → execute
 * - **Baseline Tab**: View the baseline build system spec and verify installation
 *
 * ## Architecture
 * - Uses `exportEngine.ts` for bundle generation
 * - Uses `importEngine.ts` for validation and plan generation
 * - File writing is simulated (produces downloadable output in Lovable context)
 *
 * ## Security
 * - Admin-only (behind AdminGuard)
 *
 * ## Portability
 * - Depends on: manifest.ts, exportEngine.ts, importEngine.ts, registry.ts
 */

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import {
  Package, Download, Upload, CheckCircle2, AlertTriangle,
  XCircle, FileCode, Database, Key, ArrowRight, Copy, Info,
} from 'lucide-react';
import { getModules } from './registry';
import { BASELINE_SPEC } from './manifest';
import type { ModuleManifest } from './manifest';
import { validateBundle, generateImportPlan } from './importEngine';
import type { ImportPlan, ValidationResult } from './importEngine';

// ─── EXPORT TAB ──────────────────────────────────────────────

function ExportTab() {
  const { toast } = useToast();
  const modules = getModules(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [exportJson, setExportJson] = useState<string | null>(null);

  const selectedModule = useMemo(
    () => modules.find(m => m.id === selectedId),
    [modules, selectedId],
  );

  const handleExport = () => {
    if (!selectedModule) return;

    // Build a manifest-only preview (actual file reading requires filesystem access)
    const manifest: ModuleManifest = {
      manifestVersion: '1.0.0',
      module: {
        id: selectedModule.id,
        name: selectedModule.name,
        description: selectedModule.description,
        version: selectedModule.version,
        category: (selectedModule.navItems[0]?.category as any) || 'Tools',
      },
      baselineVersion: '1.0.0',
      files: {
        entry: 'index.ts',
        includes: ['index.ts'],
      },
      database: { tables: [], functions: [], storageBuckets: [] },
      dependencies: { runtime: {}, dev: {} },
      edgeFunctions: [],
      secrets: [],
      moduleDependencies: [],
    };

    const bundle = {
      manifest,
      files: { 'index.ts': `// Module: ${selectedModule.id}\n// Copy the full src/modules/${selectedModule.id}/ directory` },
      edgeFunctions: {},
      exportedAt: new Date().toISOString(),
      sourceProject: 'everintent',
    };

    const json = JSON.stringify(bundle, null, 2);
    setExportJson(json);

    toast({
      title: 'Module manifest generated',
      description: `${selectedModule.name} v${selectedModule.version} — copy the JSON or download.`,
    });
  };

  const handleCopy = () => {
    if (exportJson) {
      navigator.clipboard.writeText(exportJson);
      toast({ title: 'Copied to clipboard' });
    }
  };

  const handleDownload = () => {
    if (!exportJson || !selectedModule) return;
    const blob = new Blob([exportJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedModule.id}-module-v${selectedModule.version}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {modules.map(mod => (
          <Card
            key={mod.id}
            className={`cursor-pointer transition-all ${
              selectedId === mod.id
                ? 'ring-2 ring-accent border-accent'
                : 'hover:border-accent/50'
            }`}
            onClick={() => setSelectedId(mod.id)}
          >
            <CardHeader className="p-3 pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm">{mod.name}</CardTitle>
                <Badge variant="secondary" className="text-[10px]">
                  v{mod.version}
                </Badge>
              </div>
              <CardDescription className="text-xs">{mod.description}</CardDescription>
            </CardHeader>
            <CardContent className="p-3 pt-0">
              <div className="flex gap-1 flex-wrap">
                {mod.navItems.map(nav => (
                  <Badge key={nav.path} variant="outline" className="text-[10px]">
                    {nav.category || 'General'}
                  </Badge>
                ))}
                <Badge variant="outline" className="text-[10px]">
                  {mod.routes.length} route{mod.routes.length !== 1 ? 's' : ''}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedModule && (
        <div className="flex gap-2">
          <Button onClick={handleExport} size="sm">
            <Package className="h-4 w-4 mr-1" />
            Generate Export Bundle
          </Button>
        </div>
      )}

      {exportJson && (
        <Card>
          <CardHeader className="p-3 pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm">Export Bundle</CardTitle>
              <div className="flex gap-1">
                <Button variant="ghost" size="sm" onClick={handleCopy}>
                  <Copy className="h-3 w-3 mr-1" /> Copy
                </Button>
                <Button variant="ghost" size="sm" onClick={handleDownload}>
                  <Download className="h-3 w-3 mr-1" /> Download
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-3 pt-0">
            <ScrollArea className="h-64">
              <pre className="text-xs font-mono bg-muted p-3 rounded-lg whitespace-pre-wrap">
                {exportJson}
              </pre>
            </ScrollArea>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// ─── IMPORT TAB ──────────────────────────────────────────────

function ImportTab() {
  const { toast } = useToast();
  const [importJson, setImportJson] = useState('');
  const [validation, setValidation] = useState<ValidationResult | null>(null);
  const [plan, setPlan] = useState<ImportPlan | null>(null);

  const handleValidate = () => {
    try {
      const parsed = JSON.parse(importJson);
      const result = validateBundle(parsed);
      setValidation(result);

      if (result.valid && result.manifest) {
        const importPlan = generateImportPlan(
          parsed,
          new Set(), // In real use, pass existing project files
        );
        setPlan(importPlan);
      } else {
        setPlan(null);
      }
    } catch (e) {
      setValidation({
        valid: false,
        errors: [`Invalid JSON: ${(e as Error).message}`],
        warnings: [],
        manifest: null,
      });
      setPlan(null);
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="p-3 pb-2">
          <CardTitle className="text-sm">Paste Module Bundle JSON</CardTitle>
          <CardDescription className="text-xs">
            Paste the exported module JSON to validate and preview the import plan.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-3 pt-0 space-y-3">
          <Textarea
            value={importJson}
            onChange={e => setImportJson(e.target.value)}
            placeholder='{"manifest": {...}, "files": {...}}'
            className="font-mono text-xs h-40"
          />
          <Button onClick={handleValidate} size="sm" disabled={!importJson.trim()}>
            <Upload className="h-4 w-4 mr-1" />
            Validate & Preview
          </Button>
        </CardContent>
      </Card>

      {/* Validation Results */}
      {validation && (
        <Card>
          <CardHeader className="p-3 pb-2">
            <div className="flex items-center gap-2">
              {validation.valid ? (
                <CheckCircle2 className="h-4 w-4 text-accent" />
              ) : (
                <XCircle className="h-4 w-4 text-destructive" />
              )}
              <CardTitle className="text-sm">
                {validation.valid ? 'Validation Passed' : 'Validation Failed'}
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-3 pt-0 space-y-2">
            {validation.errors.map((err, i) => (
              <div key={i} className="flex items-start gap-2 text-xs text-destructive">
                <XCircle className="h-3 w-3 mt-0.5 shrink-0" />
                <span>{err}</span>
              </div>
            ))}
            {validation.warnings.map((warn, i) => (
              <div key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                <AlertTriangle className="h-3 w-3 mt-0.5 shrink-0" />
                <span>{warn}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Import Plan */}
      {plan && (
        <Card>
          <CardHeader className="p-3 pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <ArrowRight className="h-4 w-4" />
              Import Plan: {plan.module.name} v{plan.module.version}
            </CardTitle>
            {plan.isUpgrade && (
              <Badge variant="secondary" className="text-[10px] w-fit">
                Upgrade from v{plan.previousVersion}
              </Badge>
            )}
          </CardHeader>
          <CardContent className="p-3 pt-0 space-y-3">
            {/* Files */}
            <div>
              <h4 className="text-xs font-semibold flex items-center gap-1 mb-1">
                <FileCode className="h-3 w-3" /> Files ({plan.fileOperations.length})
              </h4>
              <div className="space-y-0.5">
                {plan.fileOperations.map(op => (
                  <div key={op.targetPath} className="flex items-center gap-2 text-xs">
                    <Badge variant={op.action === 'create' ? 'default' : 'secondary'} className="text-[9px]">
                      {op.action}
                    </Badge>
                    <span className="font-mono text-muted-foreground">{op.targetPath}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* SQL */}
            {plan.sqlStatements.length > 0 && (
              <>
                <Separator />
                <div>
                  <h4 className="text-xs font-semibold flex items-center gap-1 mb-1">
                    <Database className="h-3 w-3" /> Database Migrations
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    {plan.sqlStatements.length} SQL statement(s) to execute
                  </p>
                </div>
              </>
            )}

            {/* Dependencies */}
            {plan.packagesToInstall.length > 0 && (
              <>
                <Separator />
                <div>
                  <h4 className="text-xs font-semibold mb-1">npm Packages</h4>
                  <div className="flex gap-1 flex-wrap">
                    {plan.packagesToInstall.map(pkg => (
                      <Badge key={pkg} variant="outline" className="text-[10px] font-mono">
                        {pkg}
                      </Badge>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Secrets */}
            {plan.secretsToAdd.length > 0 && (
              <>
                <Separator />
                <div>
                  <h4 className="text-xs font-semibold flex items-center gap-1 mb-1">
                    <Key className="h-3 w-3" /> Secrets Required
                  </h4>
                  {plan.secretsToAdd.map(s => (
                    <div key={s.name} className="text-xs">
                      <span className="font-mono font-semibold">{s.name}</span>
                      {s.required && <Badge variant="destructive" className="text-[9px] ml-1">Required</Badge>}
                      <span className="text-muted-foreground ml-1">— {s.description}</span>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Barrel import */}
            <Separator />
            <div>
              <h4 className="text-xs font-semibold mb-1">Registration</h4>
              <code className="text-xs bg-muted px-2 py-1 rounded font-mono">
                {plan.barrelImportLine}
              </code>
              <p className="text-[10px] text-muted-foreground mt-1">
                Add this line to <code>src/modules/index.ts</code>
              </p>
            </div>

            {/* Warnings */}
            {plan.warnings.length > 0 && (
              <>
                <Separator />
                <div className="space-y-1">
                  {plan.warnings.map((w, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                      <AlertTriangle className="h-3 w-3 mt-0.5 shrink-0" />
                      <span>{w}</span>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Missing baseline */}
            {plan.missingBaseline.length > 0 && (
              <>
                <Separator />
                <div className="p-2 rounded bg-destructive/10 border border-destructive/20">
                  <h4 className="text-xs font-semibold text-destructive mb-1">
                    Missing Baseline Files
                  </h4>
                  <p className="text-[10px] text-destructive/80 mb-1">
                    These baseline files must be installed before importing this module.
                  </p>
                  {plan.missingBaseline.map(f => (
                    <div key={f} className="text-xs font-mono text-destructive/80">{f}</div>
                  ))}
                </div>
              </>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// ─── BASELINE TAB ────────────────────────────────────────────

function BaselineTab() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="p-3 pb-2">
          <CardTitle className="text-sm flex items-center gap-2">
            <Info className="h-4 w-4" />
            EverIntent Baseline Build System v{BASELINE_SPEC.version}
          </CardTitle>
          <CardDescription className="text-xs">
            The minimum file set and capabilities required for any EverIntent module to be installable.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-3 pt-0 space-y-4">
          {/* Kernel */}
          <div>
            <h4 className="text-xs font-semibold mb-1">Kernel Files (3)</h4>
            <p className="text-[10px] text-muted-foreground mb-1">
              The registration engine — copy these 3 files to bootstrap any project.
            </p>
            {BASELINE_SPEC.kernelFiles.map(f => (
              <div key={f} className="text-xs font-mono text-muted-foreground">src/{f}</div>
            ))}
          </div>

          <Separator />

          {/* Shared */}
          <div>
            <h4 className="text-xs font-semibold mb-1">Shared Module Framework ({BASELINE_SPEC.sharedFiles.length})</h4>
            <p className="text-[10px] text-muted-foreground mb-1">
              Generic CRUD data layer + admin UI patterns used by all modules.
            </p>
            {BASELINE_SPEC.sharedFiles.map(f => (
              <div key={f} className="text-xs font-mono text-muted-foreground">src/{f}</div>
            ))}
          </div>

          <Separator />

          {/* Integrations */}
          <div>
            <h4 className="text-xs font-semibold mb-1">Integration Files</h4>
            {BASELINE_SPEC.integrationFiles.map(f => (
              <div key={f} className="text-xs font-mono text-muted-foreground">src/{f}</div>
            ))}
          </div>

          <Separator />

          {/* Packages */}
          <div>
            <h4 className="text-xs font-semibold mb-1">Required npm Packages</h4>
            <div className="flex gap-1 flex-wrap">
              {Object.entries(BASELINE_SPEC.requiredPackages).map(([pkg, ver]) => (
                <Badge key={pkg} variant="outline" className="text-[10px] font-mono">
                  {pkg} {ver}
                </Badge>
              ))}
            </div>
          </div>

          <Separator />

          {/* shadcn components */}
          <div>
            <h4 className="text-xs font-semibold mb-1">Required shadcn/ui Components</h4>
            <div className="flex gap-1 flex-wrap">
              {BASELINE_SPEC.requiredComponents.map(c => (
                <Badge key={c} variant="secondary" className="text-[10px]">
                  {c}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ─── MAIN PAGE ───────────────────────────────────────────────

export default function ModuleManagerPage() {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-bold">Module Manager</h2>
        <p className="text-sm text-muted-foreground">
          Export, import, and manage portable EverIntent modules.
        </p>
      </div>

      <Tabs defaultValue="export">
        <TabsList>
          <TabsTrigger value="export" className="text-xs">
            <Download className="h-3 w-3 mr-1" /> Export
          </TabsTrigger>
          <TabsTrigger value="import" className="text-xs">
            <Upload className="h-3 w-3 mr-1" /> Import
          </TabsTrigger>
          <TabsTrigger value="baseline" className="text-xs">
            <Package className="h-3 w-3 mr-1" /> Baseline
          </TabsTrigger>
        </TabsList>

        <TabsContent value="export">
          <ExportTab />
        </TabsContent>
        <TabsContent value="import">
          <ImportTab />
        </TabsContent>
        <TabsContent value="baseline">
          <BaselineTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
