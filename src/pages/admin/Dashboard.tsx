/**
 * @fileoverview Admin Dashboard — dynamically renders module cards from the registry.
 *
 * Reads registered modules via `getModules()` and renders navigation cards
 * for each module's navItems. Cards are filtered by the user's role if
 * the navItem specifies a `requiredRole`.
 *
 * ## Permission Filtering
 * - NavItems without `requiredRole` are shown to all authenticated admins
 * - NavItems with `requiredRole` are only shown if the user has that role
 * - Currently all admin users have the 'admin' role, but the system supports
 *   'moderator' and 'user' roles for future granular access control
 */

import { useAdminAuth } from '@/hooks/useAdminAuth';
import { useHasRole } from '@/hooks/useHasRole';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { getModules } from '@/modules';

export default function AdminDashboard() {
  const { user, signOut } = useAdminAuth();
  const { hasRole: isAdmin } = useHasRole('admin');
  const { hasRole: isModerator } = useHasRole('moderator');
  const modules = getModules();

  const handleSignOut = async () => {
    await signOut();
  };

  /**
   * Checks if a nav item should be shown based on the user's roles.
   */
  const canAccess = (requiredRole?: 'admin' | 'moderator' | 'user') => {
    if (!requiredRole) return true;
    if (requiredRole === 'admin') return isAdmin;
    if (requiredRole === 'moderator') return isAdmin || isModerator;
    return true; // 'user' role — any authenticated user
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
            mod.navItems
              .filter((nav) => canAccess(nav.requiredRole))
              .map((nav) => {
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
