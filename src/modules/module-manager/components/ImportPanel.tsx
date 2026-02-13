/**
 * @fileoverview Import panel for the Module Manager.
 *
 * Provides a multi-step import workflow:
 * 1. Upload or paste a module bundle JSON
 * 2. Validate against the EverIntent Module Standard
 * 3. Review the generated import plan (files, SQL, dependencies, secrets)
 * 4. Execute (simulated in Lovable — produces actionable instructions)
 *
 * ## Design
 * - Drag-and-drop file upload zone
 * - Real-time validation with error/warning display
 * - Detailed import plan with categorized sections
 * - Step indicators with visual progress
 */

import { useState, useCallback, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import {
  Upload, FileJson, CheckCircle2, XCircle, AlertTriangle,
  FileCode, Database, Key, ArrowRight, Package, Layers,
  Shield, FolderOpen, TerminalSquare,
} from 'lucide-react';
import { validateBundle, generateImportPlan } from '@/modules/importEngine';
import type { ImportPlan, ValidationResult } from '@/modules/importEngine';

type ImportStep = 'upload' | 'validating' | 'review' | 'complete';

export function ImportPanel() {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [step, setStep] = useState<ImportStep>('upload');
  const [rawJson, setRawJson] = useState('');
  const [validation, setValidation] = useState<ValidationResult | null>(null);
  const [plan, setPlan] = useState<ImportPlan | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const processJson = useCallback((json: string) => {
    setRawJson(json);
    setStep('validating');

    // Simulate async validation
    setTimeout(() => {
      try {
        const parsed = JSON.parse(json);
        const result = validateBundle(parsed);
        setValidation(result);

        if (result.valid && result.manifest) {
          const importPlan = generateImportPlan(parsed, new Set());
          setPlan(importPlan);
          setStep('review');
        } else {
          setPlan(null);
          setStep('upload');
        }
      } catch (e) {
        setValidation({
          valid: false,
          errors: [`Invalid JSON: ${(e as Error).message}`],
          warnings: [],
          manifest: null,
        });
        setPlan(null);
        setStep('upload');
      }
    }, 300);
  }, []);

  const handleFileDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type === 'application/json') {
      const reader = new FileReader();
      reader.onload = () => processJson(reader.result as string);
      reader.readAsText(file);
    } else {
      toast({ title: 'Invalid file', description: 'Please drop a .json file.', variant: 'destructive' });
    }
  }, [processJson, toast]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => processJson(reader.result as string);
      reader.readAsText(file);
    }
  }, [processJson]);

  const handleReset = () => {
    setStep('upload');
    setRawJson('');
    setValidation(null);
    setPlan(null);
  };

  const handleExecute = () => {
    setStep('complete');
    toast({
      title: 'Import plan ready',
      description: 'Copy the file contents and registration line to complete installation.',
    });
  };

  return (
    <div className="space-y-6">
      {/* Progress Steps */}
      <div className="flex items-center gap-2 text-xs">
        {(['upload', 'review', 'complete'] as const).map((s, i) => {
          const isActive = step === s || (step === 'validating' && s === 'upload');
          const isDone = (['upload', 'review', 'complete'] as const).indexOf(step === 'validating' ? 'upload' : step) > i;
          return (
            <div key={s} className="flex items-center gap-2">
              {i > 0 && <ArrowRight className="h-3 w-3 text-muted-foreground" />}
              <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border transition-colors
                ${isDone ? 'bg-accent/10 border-accent/30 text-accent' :
                  isActive ? 'bg-accent/5 border-accent/20 text-foreground' :
                  'border-border text-muted-foreground'}
              `}>
                {isDone ? <CheckCircle2 className="h-3 w-3" /> : null}
                <span className="font-medium capitalize">{s}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Upload Step */}
      {(step === 'upload' || step === 'validating') && (
        <div className="space-y-4">
          {/* Drag & Drop Zone */}
          <div
            onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleFileDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200
              ${isDragging
                ? 'border-accent bg-accent/5 shadow-[var(--shadow-glow)]'
                : 'border-border hover:border-accent/40 hover:bg-muted/30'}
            `}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={handleFileSelect}
              className="hidden"
            />
            <div className="flex flex-col items-center gap-3">
              <div className={`p-3 rounded-full transition-colors ${isDragging ? 'bg-accent/10 text-accent' : 'bg-muted text-muted-foreground'}`}>
                <Upload className="h-8 w-8" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">
                  Drop module bundle here
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  or click to browse • accepts .json files
                </p>
              </div>
            </div>
          </div>

          {/* Or paste JSON */}
          <div className="relative">
            <div className="absolute inset-x-0 top-0 flex justify-center -translate-y-1/2">
              <span className="bg-background px-3 text-xs text-muted-foreground">or paste JSON</span>
            </div>
            <Card>
              <CardContent className="p-4 space-y-3">
                <Textarea
                  value={rawJson}
                  onChange={e => setRawJson(e.target.value)}
                  placeholder='{"manifest": {...}, "files": {...}}'
                  className="font-mono text-xs h-32 resize-none"
                />
                <Button
                  onClick={() => processJson(rawJson)}
                  size="sm"
                  disabled={!rawJson.trim() || step === 'validating'}
                  className="bg-accent text-accent-foreground hover:bg-accent-hover"
                >
                  {step === 'validating' ? (
                    <Layers className="h-4 w-4 mr-1.5 animate-spin" />
                  ) : (
                    <Shield className="h-4 w-4 mr-1.5" />
                  )}
                  {step === 'validating' ? 'Validating...' : 'Validate Bundle'}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Validation Errors */}
          {validation && !validation.valid && (
            <Card className="border-destructive/30">
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-sm flex items-center gap-2 text-destructive">
                  <XCircle className="h-4 w-4" />
                  Validation Failed
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-1 space-y-1.5">
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
        </div>
      )}

      {/* Review Step */}
      {step === 'review' && plan && (
        <div className="space-y-4">
          {/* Module Identity */}
          <Card className="border-accent/20">
            <CardHeader className="p-4 pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-accent/10 text-accent">
                    <Package className="h-6 w-6" />
                  </div>
                  <div>
                    <CardTitle className="text-base">{plan.module.name}</CardTitle>
                    <CardDescription className="text-xs">
                      {plan.module.id} • v{plan.module.version} • {plan.module.category}
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {plan.isUpgrade && (
                    <Badge variant="secondary" className="text-xs">
                      Upgrade from v{plan.previousVersion}
                    </Badge>
                  )}
                  <Badge className="bg-accent/10 text-accent border-accent/20 text-xs">
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    Valid
                  </Badge>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Plan Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Files */}
            <Card>
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <FolderOpen className="h-4 w-4 text-accent" />
                  Files
                  <Badge variant="outline" className="text-[10px] ml-auto">{plan.fileOperations.length}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-1">
                <ScrollArea className="max-h-48">
                  <div className="space-y-1">
                    {plan.fileOperations.map(op => (
                      <div key={op.targetPath} className="flex items-center gap-2 text-xs py-0.5">
                        <Badge
                          variant={op.action === 'create' ? 'default' : 'secondary'}
                          className={`text-[9px] w-16 justify-center ${
                            op.action === 'create'
                              ? 'bg-accent/10 text-accent border-accent/20'
                              : 'bg-muted text-muted-foreground border-border'
                          }`}
                        >
                          {op.action}
                        </Badge>
                        <FileCode className="h-3 w-3 text-muted-foreground shrink-0" />
                        <span className="font-mono text-muted-foreground truncate">{op.targetPath}</span>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            {/* Database & Dependencies */}
            <div className="space-y-4">
              {plan.sqlStatements.length > 0 && (
                <Card>
                  <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Database className="h-4 w-4 text-accent" />
                      Database
                      <Badge variant="outline" className="text-[10px] ml-auto">{plan.sqlStatements.length} migration{plan.sqlStatements.length !== 1 ? 's' : ''}</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-1">
                    <p className="text-xs text-muted-foreground">
                      {plan.sqlStatements.length} SQL migration(s) will be applied to the database.
                    </p>
                  </CardContent>
                </Card>
              )}

              {plan.packagesToInstall.length > 0 && (
                <Card>
                  <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Package className="h-4 w-4 text-accent" />
                      Dependencies
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-1">
                    <div className="flex gap-1.5 flex-wrap">
                      {plan.packagesToInstall.map(pkg => (
                        <Badge key={pkg} variant="outline" className="text-[10px] font-mono">
                          {pkg}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {plan.secretsToAdd.length > 0 && (
                <Card>
                  <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Key className="h-4 w-4 text-accent" />
                      Secrets
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-1 space-y-1.5">
                    {plan.secretsToAdd.map(s => (
                      <div key={s.name} className="flex items-start gap-2 text-xs">
                        <span className="font-mono font-semibold text-foreground">{s.name}</span>
                        {s.required && (
                          <Badge variant="destructive" className="text-[9px]">Required</Badge>
                        )}
                        <span className="text-muted-foreground">— {s.description}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Registration */}
          <Card>
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <TerminalSquare className="h-4 w-4 text-accent" />
                Registration
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-1">
              <div className="bg-muted/50 rounded-lg p-3 border border-border">
                <p className="text-[10px] text-muted-foreground mb-1.5">
                  Add to <code className="bg-muted px-1 rounded">src/modules/index.ts</code>:
                </p>
                <code className="text-xs font-mono text-accent">{plan.barrelImportLine}</code>
              </div>
            </CardContent>
          </Card>

          {/* Warnings */}
          {plan.warnings.length > 0 && (
            <Card className="border-destructive/20">
              <CardContent className="p-4 space-y-1.5">
                {plan.warnings.map((w, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                    <AlertTriangle className="h-3 w-3 mt-0.5 shrink-0" />
                    <span>{w}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Missing Baseline */}
          {plan.missingBaseline.length > 0 && (
            <Card className="border-destructive/30 bg-destructive/5">
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-sm text-destructive flex items-center gap-2">
                  <XCircle className="h-4 w-4" />
                  Missing Baseline Files
                </CardTitle>
                <CardDescription className="text-xs text-destructive/80">
                  These files must be installed before importing this module.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-1">
                {plan.missingBaseline.map(f => (
                  <div key={f} className="text-xs font-mono text-destructive/80 py-0.5">{f}</div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <Button
              onClick={handleExecute}
              disabled={plan.missingBaseline.length > 0}
              className="bg-accent text-accent-foreground hover:bg-accent-hover"
            >
              <ArrowRight className="h-4 w-4 mr-1.5" />
              Apply Import Plan
            </Button>
            <Button variant="outline" onClick={handleReset}>
              Start Over
            </Button>
          </div>
        </div>
      )}

      {/* Complete Step */}
      {step === 'complete' && plan && (
        <Card className="border-accent/30">
          <CardContent className="p-8 text-center space-y-4">
            <div className="inline-flex p-4 rounded-full bg-accent/10 text-accent mx-auto">
              <CheckCircle2 className="h-10 w-10" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Import Plan Applied</h3>
              <p className="text-sm text-muted-foreground mt-1">
                {plan.module.name} v{plan.module.version} has been prepared for installation.
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                {plan.fileOperations.length} files • {plan.sqlStatements.length} migrations • {plan.packagesToInstall.length} packages
              </p>
            </div>
            <Button variant="outline" onClick={handleReset} className="mt-4">
              Import Another Module
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
