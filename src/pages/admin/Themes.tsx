import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { LogoRenderer } from '@/components/logo';
import { ArrowLeft, Palette, Edit, Trash2, Check, Plus, Loader2, Eye } from 'lucide-react';
import type { Tables } from '@/integrations/supabase/types';

type Theme = Tables<'site_themes'>;
type LogoVersion = Tables<'logo_versions'>;

export default function AdminThemes() {
  const { user, signOut } = useAdminAuth();
  const { toast } = useToast();
  
  const [themes, setThemes] = useState<Theme[]>([]);
  const [logoVersions, setLogoVersions] = useState<LogoVersion[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTheme, setSelectedTheme] = useState<Theme | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [previewTheme, setPreviewTheme] = useState<Theme | null>(null);

  // Fetch themes and logo versions
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [themesResult, logosResult] = await Promise.all([
        supabase.from('site_themes').select('*').order('name'),
        supabase.from('logo_versions').select('*').order('version', { ascending: false })
      ]);

      if (themesResult.error) throw themesResult.error;
      if (logosResult.error) throw logosResult.error;

      setThemes(themesResult.data || []);
      setLogoVersions(logosResult.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to load themes',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSetActive = async (theme: Theme) => {
    try {
      // First, set all themes to inactive
      await supabase.from('site_themes').update({ is_active: false }).neq('id', 'placeholder');
      
      // Then set the selected theme as active
      const { error } = await supabase
        .from('site_themes')
        .update({ is_active: true })
        .eq('id', theme.id);

      if (error) throw error;

      toast({
        title: 'Theme activated',
        description: `"${theme.name}" is now the active theme.`,
      });

      fetchData();
    } catch (error) {
      console.error('Error setting active theme:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to activate theme',
      });
    }
  };

  const handleSave = async () => {
    if (!selectedTheme) return;
    
    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('site_themes')
        .update({
          name: selectedTheme.name,
          base_hue: selectedTheme.base_hue,
          accent_config: selectedTheme.accent_config,
          static_colors: selectedTheme.static_colors,
          gradient_configs: selectedTheme.gradient_configs,
          changelog_notes: selectedTheme.changelog_notes,
        })
        .eq('id', selectedTheme.id);

      if (error) throw error;

      toast({
        title: 'Theme saved',
        description: `"${selectedTheme.name}" has been updated.`,
      });

      setIsEditing(false);
      fetchData();
    } catch (error) {
      console.error('Error saving theme:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to save theme',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (theme: Theme) => {
    if (!confirm(`Are you sure you want to delete "${theme.name}"?`)) return;

    try {
      const { error } = await supabase
        .from('site_themes')
        .delete()
        .eq('id', theme.id);

      if (error) throw error;

      toast({
        title: 'Theme deleted',
        description: `"${theme.name}" has been removed.`,
      });

      if (selectedTheme?.id === theme.id) {
        setSelectedTheme(null);
        setIsEditing(false);
      }
      fetchData();
    } catch (error) {
      console.error('Error deleting theme:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to delete theme',
      });
    }
  };

  const getLogoForTheme = (theme: Theme): LogoVersion | undefined => {
    return logoVersions.find(l => l.id === theme.logo_version_id) || logoVersions[0];
  };

  // Parse accent config safely
  const getAccentColor = (theme: Theme): string => {
    const config = theme.accent_config as Record<string, string>;
    return config?.accent || '38 92% 50%';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/admin">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
            </Link>
            <h1 className="text-xl font-bold">Theme Management</h1>
          </div>
          <span className="text-sm text-muted-foreground">{user?.email}</span>
        </div>
      </header>

      <main className="container py-8">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Theme List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Available Themes ({themes.length})</h2>
            </div>

            <ScrollArea className="h-[calc(100vh-16rem)]">
              <div className="space-y-3 pr-4">
                {themes.map((theme) => {
                  const accentColor = getAccentColor(theme);
                  
                  return (
                    <Card 
                      key={theme.id}
                      className={`cursor-pointer transition-all ${
                        selectedTheme?.id === theme.id 
                          ? 'ring-2 ring-primary' 
                          : 'hover:border-primary/50'
                      }`}
                      onClick={() => {
                        setSelectedTheme(theme);
                        setIsEditing(false);
                      }}
                    >
                      <CardHeader className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            {/* Color swatch */}
                            <div 
                              className="h-10 w-10 rounded-lg border"
                              style={{ backgroundColor: `hsl(${accentColor})` }}
                            />
                            <div>
                              <CardTitle className="text-base flex items-center gap-2">
                                {theme.name}
                                {theme.is_active && (
                                  <Badge variant="default" className="text-xs">
                                    <Check className="mr-1 h-3 w-3" />
                                    Active
                                  </Badge>
                                )}
                              </CardTitle>
                              <CardDescription className="text-xs">
                                Version {theme.version} • Base hue: {theme.base_hue}°
                              </CardDescription>
                            </div>
                          </div>
                          
                          <div className="flex gap-1">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setPreviewTheme(theme);
                                  }}
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-lg">
                                <DialogHeader>
                                  <DialogTitle>Preview: {theme.name}</DialogTitle>
                                  <DialogDescription>
                                    Logo preview with theme colors
                                  </DialogDescription>
                                </DialogHeader>
                                <div 
                                  className="rounded-lg p-8 flex items-center justify-center"
                                  style={{ backgroundColor: `hsl(${(theme.static_colors as Record<string, string>)?.primary || '222 47% 11%'})` }}
                                >
                                  {getLogoForTheme(theme) && (
                                    <LogoRenderer 
                                      config={getLogoForTheme(theme)!}
                                      accentHsl={accentColor}
                                    />
                                  )}
                                </div>
                              </DialogContent>
                            </Dialog>
                            
                            {!theme.is_active && (
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-destructive hover:text-destructive"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDelete(theme);
                                }}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardHeader>
                    </Card>
                  );
                })}
              </div>
            </ScrollArea>
          </div>

          {/* Theme Editor */}
          <div className="space-y-4">
            {selectedTheme ? (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Palette className="h-5 w-5" />
                        {isEditing ? 'Edit Theme' : 'Theme Details'}
                      </CardTitle>
                      <CardDescription>
                        {isEditing ? 'Modify theme settings' : 'View and manage this theme'}
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      {!selectedTheme.is_active && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleSetActive(selectedTheme)}
                        >
                          <Check className="mr-2 h-4 w-4" />
                          Set Active
                        </Button>
                      )}
                      {isEditing ? (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setIsEditing(false);
                              // Reset to original
                              const original = themes.find(t => t.id === selectedTheme.id);
                              if (original) setSelectedTheme(original);
                            }}
                          >
                            Cancel
                          </Button>
                          <Button
                            size="sm"
                            onClick={handleSave}
                            disabled={isSaving}
                          >
                            {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Save
                          </Button>
                        </>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setIsEditing(true)}
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </Button>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <Label>Theme Name</Label>
                    {isEditing ? (
                      <Input
                        value={selectedTheme.name}
                        onChange={(e) => setSelectedTheme({ ...selectedTheme, name: e.target.value })}
                      />
                    ) : (
                      <p className="text-sm text-muted-foreground">{selectedTheme.name}</p>
                    )}
                  </div>

                  {/* Base Hue */}
                  <div className="space-y-2">
                    <Label>Base Hue (0-360)</Label>
                    {isEditing ? (
                      <div className="flex items-center gap-4">
                        <Input
                          type="number"
                          min={0}
                          max={360}
                          value={selectedTheme.base_hue}
                          onChange={(e) => setSelectedTheme({ 
                            ...selectedTheme, 
                            base_hue: parseInt(e.target.value) || 0 
                          })}
                          className="w-24"
                        />
                        <div 
                          className="h-8 w-16 rounded border"
                          style={{ backgroundColor: `hsl(${selectedTheme.base_hue}, 70%, 50%)` }}
                        />
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <p className="text-sm text-muted-foreground">{selectedTheme.base_hue}°</p>
                        <div 
                          className="h-6 w-12 rounded border"
                          style={{ backgroundColor: `hsl(${selectedTheme.base_hue}, 70%, 50%)` }}
                        />
                      </div>
                    )}
                  </div>

                  {/* Changelog Notes */}
                  <div className="space-y-2">
                    <Label>Changelog Notes</Label>
                    {isEditing ? (
                      <Textarea
                        value={selectedTheme.changelog_notes || ''}
                        onChange={(e) => setSelectedTheme({ 
                          ...selectedTheme, 
                          changelog_notes: e.target.value 
                        })}
                        placeholder="Describe changes made to this theme..."
                        rows={3}
                      />
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        {selectedTheme.changelog_notes || 'No notes'}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label>Logo Preview</Label>
                    <div 
                      className="rounded-lg p-6 flex items-center justify-center border"
                      style={{ backgroundColor: `hsl(${(selectedTheme.static_colors as Record<string, string>)?.primary || '222 47% 11%'})` }}
                    >
                      {getLogoForTheme(selectedTheme) && (
                        <LogoRenderer 
                          config={getLogoForTheme(selectedTheme)!}
                          accentHsl={getAccentColor(selectedTheme)}
                        />
                      )}
                    </div>
                  </div>

                  {/* JSON configs (read-only display) */}
                  <div className="space-y-2">
                    <Label>Accent Config (JSON)</Label>
                    <pre className="text-xs bg-muted p-3 rounded-lg overflow-auto max-h-32">
                      {JSON.stringify(selectedTheme.accent_config, null, 2)}
                    </pre>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="flex items-center justify-center h-64">
                <div className="text-center text-muted-foreground">
                  <Palette className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Select a theme to view details</p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
