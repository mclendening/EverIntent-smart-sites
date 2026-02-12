/**
 * @fileoverview Admin Dashboard — dynamically renders module cards from the registry.
 *
 * This is the admin shell's home page. Instead of hardcoding cards for each feature,
 * it reads registered modules from the platform registry and renders navigation cards
 * for each module's navItems.
 *
 * ## Architecture
 * - Reads modules via `getModules()` from the registry
 * - Renders cards grouped by ModuleCategory
 * - Each card links to the module's admin route
 * - Auth/sign-out handled via useAdminAuth hook
 *
 * ## Portability
 * - Adding a new module automatically adds its card here — zero changes needed.
 */

import { useAdminAuth } from '@/hooks/useAdminAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { getModules } from '@/modules';

export default function AdminDashboard() {
  const { user, signOut } = useAdminAuth();
  const modules = getModules();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container flex h-14 sm:h-16 items-center justify-between px-4">
          <h1 className="text-base sm:text-xl font-bold">Admin</h1>
          <div className="flex items-center gap-2 sm:gap-4">
            <span className="hidden sm:inline text-sm text-muted-foreground truncate max-w-[150px]">{user?.email}</span>
            <Button variant="outline" size="sm" onClick={handleSignOut} className="px-2 sm:px-3">
              <LogOut className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline">Sign Out</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="container py-4 sm:py-8 px-4">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {modules.flatMap((mod) =>
            mod.navItems.map((nav) => {
              const Icon = nav.icon;
              return (
                <Link key={`${mod.id}-${nav.path}`} to={`/admin/${nav.path}`}>
                  <Card className="transition-colors hover:border-primary">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        {Icon && <Icon className="h-5 w-5" />}
                        {nav.label}
                      </CardTitle>
                      <CardDescription>{nav.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{nav.detail}</p>
                    </CardContent>
                  </Card>
                </Link>
              );
            })
          )}
        </div>
      </main>
    </div>
  );
}
