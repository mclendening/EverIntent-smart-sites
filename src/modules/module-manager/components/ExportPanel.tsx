/**
 * @fileoverview Export panel for the Module Manager.
 *
 * Provides a two-step export workflow:
 * 1. Select a module from the registered module grid
 * 2. Generate, preview, copy, or download the portable JSON bundle
 *
 * The export produces a complete `ModuleExportBundle` containing the manifest,
 * file contents placeholder, and metadata. In the Lovable environment, actual
 * file reading is simulated — the bundle structure is valid for the import engine.
 *
 * ## Design
 * - Module grid with selection state
 * - Preview pane with syntax-highlighted JSON
 * - One-click copy and download actions
 */

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import {
  Package, Download, Copy, FileJson, ArrowRight,
  CheckCircle2, Layers,
} from 'lucide-react';
import { getModules } from '@/modules/registry';
import { ModuleCard } from './ModuleCard';
import type { ModuleManifest } from '@/modules/manifest';

export function ExportPanel() {
  const { toast } = useToast();
  const modules = getModules(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [exportJson, setExportJson] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const selectedModule = useMemo(
    () => modules.find(m => m.id === selectedId),
    [modules, selectedId],
  );

  const handleExport = () => {
    if (!selectedModule) return;
    setIsGenerating(true);

    // Simulate async generation
    setTimeout(() => {
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
          includes: ['index.ts', 'service.ts', 'types.ts', 'schemas.ts'],
        },
        database: { tables: [], functions: [], storageBuckets: [] },
        dependencies: { runtime: {}, dev: {} },
        edgeFunctions: [],
        secrets: [],
        moduleDependencies: [],
      };

      const bundle = {
        manifest,
        files: {
          'index.ts': `// Module: ${selectedModule.id}\n// Registration and barrel exports\nimport { registerModule } from '../registry';\n`,
          'service.ts': `// Data layer for ${selectedModule.name}\n`,
          'types.ts': `// Type definitions for ${selectedModule.name}\n`,
          'schemas.ts': `// Zod validation schemas for ${selectedModule.name}\n`,
        },
        edgeFunctions: {},
        exportedAt: new Date().toISOString(),
        sourceProject: 'everintent',
      };

      const json = JSON.stringify(bundle, null, 2);
      setExportJson(json);
      setIsGenerating(false);

      toast({
        title: 'Bundle generated',
        description: `${selectedModule.name} v${selectedModule.version} ready for download.`,
      });
    }, 400);
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
    <div className="space-y-6">
      {/* Step 1: Module Selection */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center justify-center h-6 w-6 rounded-full bg-accent text-accent-foreground text-xs font-bold">1</div>
          <h3 className="text-sm font-semibold text-foreground">Select Module</h3>
          <span className="text-xs text-muted-foreground">— Choose a module to export</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {modules.map(mod => (
            <ModuleCard
              key={mod.id}
              module={mod}
              selected={selectedId === mod.id}
              onClick={() => {
                setSelectedId(mod.id);
                setExportJson(null);
              }}
            />
          ))}
        </div>
      </div>

      {/* Step 2: Generate */}
      {selectedModule && (
        <>
          <Separator />
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center justify-center h-6 w-6 rounded-full bg-accent text-accent-foreground text-xs font-bold">2</div>
              <h3 className="text-sm font-semibold text-foreground">Generate Bundle</h3>
            </div>

            <Card className="border-accent/20">
              <CardHeader className="p-4 pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-accent/10 text-accent">
                      <Package className="h-5 w-5" />
                    </div>
                    <div>
                      <CardTitle className="text-sm">{selectedModule.name}</CardTitle>
                      <CardDescription className="text-xs">v{selectedModule.version} • {selectedModule.routes.length} routes</CardDescription>
                    </div>
                  </div>
                  <Button
                    onClick={handleExport}
                    size="sm"
                    disabled={isGenerating}
                    className="bg-accent text-accent-foreground hover:bg-accent-hover"
                  >
                    {isGenerating ? (
                      <Layers className="h-4 w-4 mr-1.5 animate-spin" />
                    ) : (
                      <FileJson className="h-4 w-4 mr-1.5" />
                    )}
                    {isGenerating ? 'Generating...' : 'Generate Bundle'}
                  </Button>
                </div>
              </CardHeader>
            </Card>
          </div>
        </>
      )}

      {/* Step 3: Preview & Download */}
      {exportJson && (
        <>
          <Separator />
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center justify-center h-6 w-6 rounded-full bg-accent text-accent-foreground text-xs font-bold">
                <CheckCircle2 className="h-3.5 w-3.5" />
              </div>
              <h3 className="text-sm font-semibold text-foreground">Export Ready</h3>
            </div>

            <Card>
              <CardHeader className="p-4 pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <FileJson className="h-4 w-4 text-accent" />
                    Bundle Preview
                  </CardTitle>
                  <div className="flex gap-1.5">
                    <Button variant="outline" size="sm" onClick={handleCopy} className="h-7 text-xs">
                      <Copy className="h-3 w-3 mr-1" /> Copy
                    </Button>
                    <Button size="sm" onClick={handleDownload} className="h-7 text-xs bg-accent text-accent-foreground hover:bg-accent-hover">
                      <Download className="h-3 w-3 mr-1" /> Download .json
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-2">
                <ScrollArea className="h-72 rounded-lg border border-border">
                  <pre className="text-xs font-mono p-4 text-muted-foreground whitespace-pre-wrap bg-muted/30">
                    {exportJson}
                  </pre>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
}
