/**
 * @fileoverview Module Manager Hub — the main admin page for module management.
 *
 * Provides a commercial-grade UI with three primary workflows:
 * 1. **Export** — Select and bundle any registered module for distribution
 * 2. **Import** — Upload, validate, and install module bundles
 * 3. **Baseline** — Audit project compliance with the EverIntent standard
 *
 * ## Design
 * - Tab navigation with icon indicators
 * - Registered modules overview in header
 * - Admin shell integration via AdminGuard
 *
 * ## Architecture
 * - Composed of ExportPanel, ImportPanel, and BaselinePanel
 * - Each panel is self-contained with its own state
 * - Shares module registry access via `getModules()`
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  ArrowLeft, Download, Upload, Shield, Package, Layers,
} from 'lucide-react';
import { getModules } from '@/modules/registry';
import { ExportPanel } from './ExportPanel';
import { ImportPanel } from './ImportPanel';
import { BaselinePanel } from './BaselinePanel';

type TabId = 'export' | 'import' | 'baseline';

const TABS: { id: TabId; label: string; icon: React.ComponentType<{ className?: string }>; description: string }[] = [
  { id: 'export', label: 'Export', icon: Download, description: 'Bundle modules for distribution' },
  { id: 'import', label: 'Import', icon: Upload, description: 'Install module packages' },
  { id: 'baseline', label: 'Baseline', icon: Shield, description: 'Audit project compliance' },
];

export default function ModuleManagerHub() {
  const navigate = useNavigate();
  const modules = getModules(false);
  const [activeTab, setActiveTab] = useState<TabId>('export');

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-20">
        <div className="container px-4">
          <div className="flex items-center h-14 gap-3">
            <Button variant="ghost" size="sm" onClick={() => navigate('/admin')} className="h-8 w-8 p-0">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-accent/10 text-accent">
                <Package className="h-5 w-5" />
              </div>
              <div>
                <h1 className="text-sm font-bold text-foreground leading-tight">Module Manager</h1>
                <p className="text-[10px] text-muted-foreground leading-tight">EverIntent Module Standard v1.0</p>
              </div>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <Badge variant="outline" className="text-[10px]">
                <Layers className="h-3 w-3 mr-1" />
                {modules.length} registered
              </Badge>
            </div>
          </div>

          {/* Tab Bar */}
          <div className="flex gap-0.5 -mb-px">
            {TABS.map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-medium border-b-2 transition-colors
                    ${isActive
                      ? 'border-accent text-accent'
                      : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
                    }
                  `}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container px-4 py-6 max-w-5xl">
        {activeTab === 'export' && <ExportPanel />}
        {activeTab === 'import' && <ImportPanel />}
        {activeTab === 'baseline' && <BaselinePanel />}
      </main>
    </div>
  );
}
