// SSG Route configuration for EverIntent SmartSites
// Based on BRD v32.1 Section 15.1.1
// Format: react-router-dom data routes for vite-react-ssg

import type { RouteRecord } from 'vite-react-ssg';
import React, { Suspense, useState } from 'react';
import { Outlet } from 'react-router-dom';

// Providers
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Layout } from '@/components/layout/Layout';
import { AdminGuard } from '@/components/admin/AdminGuard';
import { ClientOnly } from '@/components/ClientOnly';

// Root layout wrapper with all providers
// Fix 2 & 3: QueryClient created inside component, portal-based components wrapped in ClientOnly
function RootLayout() {
  // Fix 3: Create QueryClient inside component to prevent state persistence across SSR renders
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Suspense fallback={<div className="min-h-screen" />}>
          <Outlet />
        </Suspense>
      </Layout>

      {/* Fix 2: Portal-based components only render client-side to prevent hydration mismatches */}
      <ClientOnly>
        <TooltipProvider>
          <Toaster />
          <Sonner />
        </TooltipProvider>
      </ClientOnly>
    </QueryClientProvider>
  );
}

// Admin layout without marketing Layout wrapper
// Fix 2 & 3: Same fixes applied to AdminLayout
function AdminLayout() {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<div className="min-h-screen" />}>
        <Outlet />
      </Suspense>

      <ClientOnly>
        <TooltipProvider>
          <Toaster />
          <Sonner />
        </TooltipProvider>
      </ClientOnly>
    </QueryClientProvider>
  );
}

// Direct imports for SSG (lazy loading breaks SSG pre-rendering)
import Index from './pages/Index';
import NotFound from './pages/NotFound';
import PlaceholderPage from './pages/Placeholder';

// Admin pages (can stay lazy since not SSG pre-rendered)
import AdminLogin from './pages/admin/Login';
import AdminDashboard from './pages/admin/Dashboard';

// Core routes
const coreRoutePaths = ['/', '/pricing', '/portfolio', '/about', '/contact', '/book-call'];

// Primary service
const primaryServicePath = '/beautiful-websites';

// Services
const servicePaths = [
  '/services',
  '/get-found-online',
  '/never-miss-a-lead',
  '/book-more-jobs',
  '/run-from-your-phone',
  '/build-your-reputation',
  '/let-ai-handle-it',
  '/domains',
];

// Features
const featurePaths = [
  '/features/lead-capture',
  '/features/ai-chat',
  '/features/review-management',
  '/features/mobile-app',
  '/features/scheduling',
  '/features/analytics',
];

// Industry hubs
const industryHubPaths = [
  '/industries/home-services',
  '/industries/professional-services',
  '/industries/health-wellness',
  '/industries/automotive-services',
];

// Home Services verticals (31)
const homeServicesPaths = [
  '/industries/home-services/hvac',
  '/industries/home-services/plumbing',
  '/industries/home-services/electrical',
  '/industries/home-services/roofing',
  '/industries/home-services/landscaping',
  '/industries/home-services/cleaning',
  '/industries/home-services/painting',
  '/industries/home-services/flooring',
  '/industries/home-services/remodeling',
  '/industries/home-services/pest-control',
  '/industries/home-services/pool-service',
  '/industries/home-services/garage-doors',
  '/industries/home-services/fencing',
  '/industries/home-services/tree-service',
  '/industries/home-services/handyman',
  '/industries/home-services/locksmith',
  '/industries/home-services/appliance-repair',
  '/industries/home-services/carpet-cleaning',
  '/industries/home-services/pressure-washing',
  '/industries/home-services/window-cleaning',
  '/industries/home-services/gutter-cleaning',
  '/industries/home-services/junk-removal',
  '/industries/home-services/moving',
  '/industries/home-services/glass-repair',
  '/industries/home-services/concrete-driveways',
  '/industries/home-services/deck-building',
  '/industries/home-services/home-inspection',
  '/industries/home-services/waterproofing',
  '/industries/home-services/insulation',
  '/industries/home-services/solar-installation',
  '/industries/home-services/security-systems',
];

// Professional Services verticals (15)
const professionalServicesPaths = [
  '/industries/professional-services/legal',
  '/industries/professional-services/real-estate',
  '/industries/professional-services/accounting',
  '/industries/professional-services/insurance',
  '/industries/professional-services/financial-advisor',
  '/industries/professional-services/mortgage',
  '/industries/professional-services/photography',
  '/industries/professional-services/videography',
  '/industries/professional-services/marketing',
  '/industries/professional-services/consulting',
  '/industries/professional-services/it-services',
  '/industries/professional-services/web-design',
  '/industries/professional-services/event-planning',
  '/industries/professional-services/interior-design',
  '/industries/professional-services/property-management',
];

// Health & Wellness verticals (15)
const healthWellnessPaths = [
  '/industries/health-wellness/medspa',
  '/industries/health-wellness/dental',
  '/industries/health-wellness/chiropractic',
  '/industries/health-wellness/physical-therapy',
  '/industries/health-wellness/massage',
  '/industries/health-wellness/acupuncture',
  '/industries/health-wellness/optometry',
  '/industries/health-wellness/veterinary',
  '/industries/health-wellness/mental-health',
  '/industries/health-wellness/personal-training',
  '/industries/health-wellness/yoga',
  '/industries/health-wellness/martial-arts',
  '/industries/health-wellness/salon',
  '/industries/health-wellness/barbershop',
  '/industries/health-wellness/spa',
];

// Automotive Services verticals (10)
const automotiveServicesPaths = [
  '/industries/automotive-services/auto-repair',
  '/industries/automotive-services/auto-detailing',
  '/industries/automotive-services/tire-shop',
  '/industries/automotive-services/oil-change',
  '/industries/automotive-services/auto-body',
  '/industries/automotive-services/transmission',
  '/industries/automotive-services/towing',
  '/industries/automotive-services/mobile-car-wash',
  '/industries/automotive-services/window-tinting',
  '/industries/automotive-services/audio-installation',
];

// Checkout routes
const checkoutPaths = [
  '/checkout/smart-site',
  '/checkout/smart-lead',
  '/checkout/smart-business',
  '/checkout/smart-growth',
  '/checkout/success',
];

// Legal routes
const legalPaths = ['/legal/privacy', '/legal/terms', '/legal/data-request'];

// LocalPros routes (per BRD v32.6 - only /localpros and /localpros/apply)
const localProsPaths = ['/localpros', '/localpros/apply'];

// Upgrade route
const upgradePath = '/upgrade';

// Admin routes (NOT pre-rendered - handled separately with CSR)
const adminPaths = [
  '/admin/login',
  '/admin',
  '/admin/submissions',
  '/admin/portfolio',
  '/admin/testimonials',
];

// All marketing routes for pre-rendering (excludes admin)
export const prerenderRoutes: string[] = [
  ...coreRoutePaths,
  primaryServicePath,
  ...servicePaths,
  ...featurePaths,
  ...industryHubPaths,
  ...homeServicesPaths,
  ...professionalServicesPaths,
  ...healthWellnessPaths,
  ...automotiveServicesPaths,
  ...checkoutPaths,
  ...legalPaths,
  ...localProsPaths,
  upgradePath,
];

// Helper to create placeholder routes as children
const createPlaceholderChild = (path: string): RouteRecord => ({
  path: path.substring(1), // Remove leading slash for child routes
  Component: PlaceholderPage,
});

// Build routes array for vite-react-ssg
export const routes: RouteRecord[] = [
  // Marketing routes with Layout
  {
    path: '/',
    Component: RootLayout,
    children: [
      // Home page
      {
        index: true,
        Component: Index,
      },
      // Core pages (placeholder for now, will be implemented)
      ...coreRoutePaths.slice(1).map(createPlaceholderChild),
      // Primary service
      createPlaceholderChild(primaryServicePath),
      // Services
      ...servicePaths.map(createPlaceholderChild),
      // Features
      ...featurePaths.map(createPlaceholderChild),
      // Industry hubs
      ...industryHubPaths.map(createPlaceholderChild),
      // Industry verticals
      ...homeServicesPaths.map(createPlaceholderChild),
      ...professionalServicesPaths.map(createPlaceholderChild),
      ...healthWellnessPaths.map(createPlaceholderChild),
      ...automotiveServicesPaths.map(createPlaceholderChild),
      // Checkout
      ...checkoutPaths.map(createPlaceholderChild),
      // Legal
      ...legalPaths.map(createPlaceholderChild),
      // LocalPros
      ...localProsPaths.map(createPlaceholderChild),
      // Upgrade
      createPlaceholderChild(upgradePath),
      // Catch-all 404
      {
        path: '*',
        Component: NotFound,
      },
    ],
  },
  // Admin routes (CSR only, not pre-rendered, no marketing Layout)
  {
    path: '/admin',
    Component: AdminLayout,
    children: [
      {
        path: 'login',
        Component: AdminLogin,
      },
      {
        index: true,
        element: (
          <AdminGuard>
            <AdminDashboard />
          </AdminGuard>
        ),
      },
      {
        path: 'submissions',
        element: (
          <AdminGuard>
            <PlaceholderPage />
          </AdminGuard>
        ),
      },
      {
        path: 'portfolio',
        element: (
          <AdminGuard>
            <PlaceholderPage />
          </AdminGuard>
        ),
      },
      {
        path: 'testimonials',
        element: (
          <AdminGuard>
            <PlaceholderPage />
          </AdminGuard>
        ),
      },
    ],
  },
];
