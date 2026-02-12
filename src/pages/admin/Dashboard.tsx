import { useAdminAuth } from '@/hooks/useAdminAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { FileText, Image, MessageSquare, LogOut, Palette, FlaskConical } from 'lucide-react';

export default function AdminDashboard() {
  const { user, signOut } = useAdminAuth();

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
          <Link to="/admin/themes">
            <Card className="transition-colors hover:border-primary">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  Themes
                </CardTitle>
                <CardDescription>
                  Manage site themes and colors
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Create, edit, and activate visual themes
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/admin/submissions">
            <Card className="transition-colors hover:border-primary">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Submissions
                </CardTitle>
                <CardDescription>
                  View and manage checkout submissions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Review customer submissions and track orders
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/admin/portfolio">
            <Card className="transition-colors hover:border-primary">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Image className="h-5 w-5" />
                  Portfolio
                </CardTitle>
                <CardDescription>
                  Manage portfolio items
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Add, edit, or remove portfolio showcase items
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/admin/testimonials">
            <Card className="transition-colors hover:border-primary">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Testimonials
                </CardTitle>
                <CardDescription>
                  Manage customer testimonials
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Add, edit, or remove customer testimonials
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/admin/playground">
            <Card className="transition-colors hover:border-primary">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FlaskConical className="h-5 w-5" />
                  Playground
                </CardTitle>
                <CardDescription>
                  Style experiments and callout alternatives
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Preview premium badge replacement styles
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </main>
    </div>
  );
}
