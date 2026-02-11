import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/components/ui/dialog';
import { Plus, Trash2, Edit, Layers, GripVertical } from 'lucide-react';

export interface StyleModuleToken {
  name: string;
  value: string;
  description?: string;
}

export interface StyleModule {
  id: string;
  name: string;
  description?: string;
  tokens: StyleModuleToken[];
}

interface Props {
  modules: StyleModule[];
  onChange: (modules: StyleModule[]) => void;
}

function generateId() {
  return Math.random().toString(36).substring(2, 10);
}

function ModuleEditor({ module, onSave, onCancel }: { module: StyleModule; onSave: (m: StyleModule) => void; onCancel: () => void }) {
  const [draft, setDraft] = useState<StyleModule>({ ...module, tokens: [...module.tokens.map(t => ({ ...t }))] });

  const addToken = () => {
    setDraft({
      ...draft,
      tokens: [...draft.tokens, { name: '', value: '', description: '' }],
    });
  };

  const removeToken = (idx: number) => {
    setDraft({ ...draft, tokens: draft.tokens.filter((_, i) => i !== idx) });
  };

  const updateToken = (idx: number, field: keyof StyleModuleToken, value: string) => {
    const tokens = [...draft.tokens];
    tokens[idx] = { ...tokens[idx], [field]: value };
    setDraft({ ...draft, tokens });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <Label className="text-xs">Module Name</Label>
          <Input
            value={draft.name}
            onChange={(e) => setDraft({ ...draft, name: e.target.value })}
            placeholder="e.g. checkout-progress"
            className="text-xs"
          />
        </div>
        <div className="space-y-1">
          <Label className="text-xs">Description</Label>
          <Input
            value={draft.description || ''}
            onChange={(e) => setDraft({ ...draft, description: e.target.value })}
            placeholder="e.g. Checkout step indicators"
            className="text-xs"
          />
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label className="text-xs font-medium">Tokens ({draft.tokens.length})</Label>
          <Button variant="outline" size="sm" onClick={addToken} className="h-6 text-xs">
            <Plus className="h-3 w-3 mr-1" /> Add Token
          </Button>
        </div>

        <div className="space-y-2 max-h-[300px] overflow-y-auto">
          {draft.tokens.map((token, idx) => (
            <div key={idx} className="flex items-start gap-2 p-2 rounded border bg-muted/30">
              <GripVertical className="h-4 w-4 text-muted-foreground mt-1 shrink-0" />
              <div className="flex-1 grid grid-cols-[1fr_1fr_auto] gap-2">
                <div className="space-y-0.5">
                  <Input
                    value={token.name}
                    onChange={(e) => updateToken(idx, 'name', e.target.value)}
                    placeholder="token-name"
                    className="text-xs font-mono h-7"
                  />
                  <p className="text-[10px] text-muted-foreground">→ --module-{draft.name}-{token.name || '?'}</p>
                </div>
                <Input
                  value={token.value}
                  onChange={(e) => updateToken(idx, 'value', e.target.value)}
                  placeholder="39 95% 50%"
                  className="text-xs font-mono h-7"
                />
                <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => removeToken(idx)}>
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </div>
          ))}
          {draft.tokens.length === 0 && (
            <p className="text-xs text-muted-foreground text-center py-4">No tokens yet. Click "Add Token" to create one.</p>
          )}
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Button variant="outline" size="sm" onClick={onCancel}>Cancel</Button>
        <Button size="sm" onClick={() => onSave(draft)} disabled={!draft.name.trim()}>Save Module</Button>
      </div>
    </div>
  );
}

export function StyleModulesEditor({ modules, onChange }: Props) {
  const [editingModule, setEditingModule] = useState<StyleModule | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleCreate = () => {
    setEditingModule({ id: generateId(), name: '', description: '', tokens: [] });
    setIsDialogOpen(true);
  };

  const handleEdit = (module: StyleModule) => {
    setEditingModule(module);
    setIsDialogOpen(true);
  };

  const handleSave = (module: StyleModule) => {
    const existing = modules.findIndex(m => m.id === module.id);
    if (existing >= 0) {
      const updated = [...modules];
      updated[existing] = module;
      onChange(updated);
    } else {
      onChange([...modules, module]);
    }
    setIsDialogOpen(false);
    setEditingModule(null);
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this style module? This cannot be undone.')) {
      onChange(modules.filter(m => m.id !== id));
    }
  };

  return (
    <AccordionItem value="style-modules">
      <AccordionTrigger className="text-sm py-2">
        <div className="flex items-center gap-2">
          <Layers className="h-4 w-4 shrink-0" />
          Style Modules ({modules.length})
        </div>
      </AccordionTrigger>
      <AccordionContent className="space-y-3 pb-4">
        <p className="text-xs text-muted-foreground">
          Custom token groups for specific UI components. Each module's tokens are flattened into CSS variables like <code className="bg-muted px-1 rounded">--module-name-token</code>.
        </p>

        <div className="space-y-2">
          {modules.map((module) => (
            <Card key={module.id} className="bg-muted/30">
              <CardHeader className="p-3 pb-1">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xs font-mono">{module.name}</CardTitle>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => handleEdit(module)}>
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-6 w-6 text-destructive" onClick={() => handleDelete(module.id)}>
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-3 pt-0">
                <p className="text-[10px] text-muted-foreground">{module.description || 'No description'}</p>
                <p className="text-[10px] text-muted-foreground mt-1">{module.tokens.length} token{module.tokens.length !== 1 ? 's' : ''}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Button variant="outline" size="sm" onClick={handleCreate} className="w-full">
          <Plus className="h-3 w-3 mr-1" /> New Module
        </Button>

        <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsDialogOpen(open); if (!open) setEditingModule(null); }}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle className="text-sm">
                {editingModule && modules.some(m => m.id === editingModule.id) ? 'Edit' : 'Create'} Style Module
              </DialogTitle>
              <DialogDescription className="text-xs">
                Define a group of CSS tokens for a specific component.
              </DialogDescription>
            </DialogHeader>
            {editingModule && (
              <ModuleEditor
                module={editingModule}
                onSave={handleSave}
                onCancel={() => { setIsDialogOpen(false); setEditingModule(null); }}
              />
            )}
          </DialogContent>
        </Dialog>
      </AccordionContent>
    </AccordionItem>
  );
}
