/**
 * @fileoverview Admin Playground — Hub page for experimental style pages.
 * Each experiment lives on its own sub-page.
 */

import { useAdminAuth } from '@/hooks/useAdminAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { ArrowLeft, Sparkles, GitBranch, SeparatorHorizontal } from 'lucide-react';

export default function Playground() {
  useAdminAuth();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container flex h-14 sm:h-16 items-center gap-4 px-4">
          <Link to="/admin" className="text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-base sm:text-xl font-bold">Playground</h1>
            <p className="text-xs text-muted-foreground hidden sm:block">Style experiments and component alternatives</p>
          </div>
        </div>
      </header>

      <main className="container py-6 sm:py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Link to="/admin/playground/badges">
              <Card className="transition-colors hover:border-accent/40">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-accent" />
                    Badge Replacements
                  </CardTitle>
                  <CardDescription>
                    Premium callout styles to replace pill-shaped badges
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    34 award-winning callout alternatives using theme gradients
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link to="/admin/playground/timelines">
              <Card className="transition-colors hover:border-accent/40">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GitBranch className="h-5 w-5 text-accent" />
                    Timelines & Stages
                  </CardTitle>
                  <CardDescription>
                    Progress indicators for checkout and delivery flows
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    20 interactive timeline styles with hover, two-tone, and gradient
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link to="/admin/playground/separators">
              <Card className="transition-colors hover:border-accent/40">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <SeparatorHorizontal className="h-5 w-5 text-accent" />
                    Section Separators
                  </CardTitle>
                  <CardDescription>
                    Dividers and ornamental breaks between content sections
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    30 award-winning separator styles with gradients, SVG, and motion
                  </p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
