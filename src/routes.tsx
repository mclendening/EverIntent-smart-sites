/**
 * @fileoverview SSG route configuration for vite-react-ssg.
 * @module routes
 * 
 * Defines the complete route tree for static site generation using vite-react-ssg.
 * Handles both marketing pages (SSG pre-rendered) and admin pages (CSR only).
 * 
 * Architecture:
 * - RootLayout: Wraps marketing pages with Header/Footer and providers
 * - AdminLayout: Wraps admin pages without marketing layout
 * - ThemeProvider: Applies route-specific theme CSS variables
 * - ClientOnly: Prevents SSR hydration mismatches for browser-dependent components
 * 
 * SSG Considerations:
 * - Uses direct imports (not React.lazy) to prevent hydration mismatches
 * - QueryClient created inside components to prevent state persistence across renders
 * - Portal-based components (Toaster, Sonner) wrapped in ClientOnly
 */

import type { RouteRecord } from 'vite-react-ssg';
import React, { Suspense, useState, useEffect } from 'react';
import { Outlet, useLocation, Navigate } from 'react-router-dom';

// Providers
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Layout } from '@/components/layout/Layout';
import { AdminGuard } from '@/components/admin/AdminGuard';
import { ClientOnly } from '@/components/ClientOnly';
import { ScrollToTop } from '@/components/ScrollToTop';
import { getThemeForRoute, applyThemeToRoot } from '@/config/themes';

// Direct page imports for SSG compatibility
import Index from './pages/Index';
import NotFound from './pages/NotFound';
import PlaceholderPage from './pages/Placeholder';
import AIEmployee from './pages/AIEmployee';
import SmartWebsites from './pages/SmartWebsites';
import Pricing from './pages/Pricing';
import About from './pages/About';
import Contact from './pages/Contact';
import Portfolio from './pages/Portfolio';
import DesertCoolAir from './pages/portfolio/DesertCoolAir';
import ClearviewDentistryAustin from './pages/portfolio/ClearviewDentistryAustin';
import AlexanderTree from './pages/portfolio/AlexanderTree';
import HonestWrenchAuto from './pages/portfolio/HonestWrenchAuto';
import Industries from './pages/Industries';
import HomeServices from './pages/industries/HomeServices';
import ProfessionalServices from './pages/industries/ProfessionalServices';
import HealthWellness from './pages/industries/HealthWellness';
import Automotive from './pages/industries/Automotive';
// Premium industry showcase pages
import HomeServicesShowcase from './pages/industries/HomeServicesShowcase';
import ProfessionalShowcase from './pages/industries/ProfessionalShowcase';
import HealthWellnessShowcase from './pages/industries/HealthWellnessShowcase';
import AutomotiveShowcase from './pages/industries/AutomotiveShowcase';
// Standalone service pages
import WarmyEmailDeliverability from './pages/WarmyEmailDeliverability';
// AI Employee mode pages - Consolidated (After-Hours includes booking + missed call)
import AfterHours from './pages/ai-employee/AfterHours';
import FrontOffice from './pages/ai-employee/FrontOffice';
import FullAIEmployee from './pages/ai-employee/FullAIEmployee';
// Smart Websites tier pages
import SmartSite from './pages/smart-websites/SmartSite';
import SmartLead from './pages/smart-websites/SmartLead';
import SmartBusiness from './pages/smart-websites/SmartBusiness';
import SmartGrowth from './pages/smart-websites/SmartGrowth';
import AddOns from './pages/smart-websites/AddOns';
import CompareWebsites from './pages/CompareWebsites';
import CompareAIEmployee from './pages/CompareAIEmployee';
import AdminLogin from './pages/admin/Login';
import AdminResetPassword from './pages/admin/ResetPassword';
import AdminDashboard from './pages/admin/Dashboard';
import AdminThemes from './pages/admin/Themes';
import AdminSubmissions from './pages/admin/Submissions';
import ThemeTestPage from './pages/admin/ThemeTestPage';
import AdminPlayground from './pages/admin/Playground';
import AdminPlaygroundBadges from './pages/admin/PlaygroundBadges';
import AdminPlaygroundTimelines from './pages/admin/PlaygroundTimelines';

// Legal pages
import PrivacyPolicy from './pages/legal/PrivacyPolicy';
import TermsOfService from './pages/legal/TermsOfService';
import CookiePolicy from './pages/legal/CookiePolicy';
import DataRightsRequest from './pages/legal/DataRightsRequest';
import AccessibilityStatement from './pages/legal/AccessibilityStatement';

// Checkout page
import CheckoutPage from './pages/checkout/CheckoutPage';

// ============================================
// LAYOUT COMPONENTS
// ============================================

/**
 * Applies theme CSS variables based on current route.
 * Watches for route changes and updates theme accordingly.
 * 
 * @param props.children - Child components to render
 */
function ThemeProvider({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  
  useEffect(() => {
    const theme = getThemeForRoute(location.pathname);
    applyThemeToRoot(theme);
  }, [location.pathname]);
  
  return <>{children}</>;
}

/**
 * Root layout wrapper for marketing pages.
 * Provides QueryClient, theme application, Header/Footer, and toast notifications.
 * 
 * Creates QueryClient inside component to prevent state persistence across SSR renders.
 * Portal-based components wrapped in ClientOnly to prevent hydration mismatches.
 */
function RootLayout() {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        {/* ScrollToTop uses window/document APIs, must be client-only */}
        <ClientOnly>
          <ScrollToTop />
        </ClientOnly>
        <Layout>
          <Suspense fallback={<div className="min-h-screen" />}>
            <Outlet />
          </Suspense>
        </Layout>
      </ThemeProvider>

      {/* Portal-based components only render client-side to prevent hydration mismatches */}
      <ClientOnly>
        <TooltipProvider>
          <Toaster />
          <Sonner />
        </TooltipProvider>
      </ClientOnly>
    </QueryClientProvider>
  );
}

/**
 * Admin layout wrapper without marketing Header/Footer.
 * Used for admin dashboard pages that require authentication.
 * 
 * Same SSG-safe patterns as RootLayout:
 * - QueryClient created inside component
 * - Portal components wrapped in ClientOnly
 */
function AdminLayout() {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {/* ScrollToTop uses window/document APIs, must be client-only */}
      <ClientOnly>
        <ScrollToTop />
      </ClientOnly>
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

// ============================================
// ROUTE PATH DEFINITIONS
// ============================================

// Core marketing pages
const coreRoutePaths = ['/', '/pricing', '/our-work', '/about', '/contact', '/book-call', '/strategy-session', '/careers'];

// Primary service landing page
const primaryServicePath = '/beautiful-websites';

// Benefit-oriented service pages
// AI Employee mode paths - Consolidated
const aiEmployeeModePaths = [
  '/let-ai-handle-it/after-hours',
  '/let-ai-handle-it/front-office',
  '/let-ai-handle-it/full-ai-employee',
];

// Smart Websites tier paths
const smartWebsitesTierPaths = [
  '/smart-websites/launch',
  '/smart-websites/capture',
  '/smart-websites/convert',
  '/smart-websites/scale',
  '/smart-websites/add-ons',
];

const servicePaths = [
  '/services',
  '/get-found-online',
  '/never-miss-a-lead',
  '/book-more-jobs',
  '/run-from-your-phone',
  '/build-your-reputation',
  '/let-ai-handle-it',
];

// SEO-focused product category pages
const productCategoryPaths = [
  '/services/web-design',
  '/services/seo',
  '/services/lead-capture',
  '/services/booking',
  '/services/reputation',
  '/services/ai-automation',
];

// Feature landing pages
const featurePaths = [
  '/features/lead-capture',
  '/features/ai-chat',
  '/features/review-management',
  '/features/mobile-app',
  '/features/scheduling',
  '/features/analytics',
];

// Industry hub pages
const industryHubPaths = [
  '/industries/home-services',
  '/industries/professional-services',
  '/industries/health-wellness',
  '/industries/automotive-services',
];

// Premium industry showcase pages
const industryShowcasePaths = [
  '/industries/home-services/showcase',
  '/industries/professional-services/showcase',
  '/industries/health-wellness/showcase',
  '/industries/automotive-services/showcase',
];

// Home Services industry verticals (31)
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

// Professional Services industry verticals (15)
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

// Health & Wellness industry verticals (15)
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

// Automotive Services industry verticals (10)
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

// Checkout flow pages - 8 tiers per v5.2 spec
const checkoutPaths = [
  '/checkout/launch',
  '/checkout/capture',
  '/checkout/convert',
  '/checkout/scale',
  '/checkout/after-hours',
  '/checkout/front-office',
  '/checkout/full-ai',
  '/checkout/web-chat',
];

// Legal and compliance pages
const legalPaths = ['/legal/privacy', '/legal/cookies', '/legal/terms', '/legal/data-request', '/legal/accessibility-statement'];

// Help and support pages
const resourcePaths = ['/help', '/faq', '/support'];

// Upgrade page for existing customers
const upgradePath = '/upgrade';

// Admin dashboard pages (CSR only, not pre-rendered)
const adminPaths = [
  '/admin/login',
  '/admin',
  '/admin/themes',
  '/admin/submissions',
  '/admin/portfolio',
  '/admin/testimonials',
];

// ============================================
// SSG CONFIGURATION
// ============================================

/**
 * All marketing routes for SSG pre-rendering.
 * Excludes admin routes which are CSR-only.
 */
export const prerenderRoutes: string[] = [
  ...coreRoutePaths,
  primaryServicePath,
  ...servicePaths,
  ...aiEmployeeModePaths, // AI Employee mode pages
  ...smartWebsitesTierPaths, // Smart Websites tier pages
  ...productCategoryPaths,
  ...featurePaths,
  '/industries', // Industries landing page
  ...industryHubPaths,
  ...industryShowcasePaths, // Premium showcase pages
  ...homeServicesPaths,
  ...professionalServicesPaths,
  ...healthWellnessPaths,
  ...automotiveServicesPaths,
  ...checkoutPaths,
  ...legalPaths,
  ...resourcePaths,
  upgradePath,
  '/warmy-email-deliverability', // Warmy full service page
];

/**
 * Creates a placeholder child route for unimplemented pages.
 * 
 * @param path - Full path (leading slash removed for child route)
 * @returns RouteRecord for placeholder page
 */
const createPlaceholderChild = (path: string): RouteRecord => ({
  path: path.substring(1),
  Component: PlaceholderPage,
});

// ============================================
// ROUTE TREE
// ============================================

/**
 * Complete route tree for vite-react-ssg.
 * 
 * Structure:
 * - Marketing routes: Use RootLayout with Header/Footer
 * - Admin routes: Use AdminLayout with AdminGuard authentication
 */
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
      // Pricing page - dedicated component
      {
        path: 'pricing',
        Component: Pricing,
      },
      // About page - dedicated component
      {
        path: 'about',
        Component: About,
      },
      // Contact page - dedicated component
      {
        path: 'contact',
        Component: Contact,
      },
      // Portfolio hub page - dedicated component
      {
        path: 'portfolio',
        Component: Portfolio,
      },
      // Portfolio case study pages
      {
        path: 'portfolio/desert-cool-air',
        Component: DesertCoolAir,
      },
      {
        path: 'portfolio/clearview-dentistry-austin',
        Component: ClearviewDentistryAustin,
      },
      {
        path: 'portfolio/alexander-tree',
        Component: AlexanderTree,
      },
      {
        path: 'portfolio/honest-wrench-auto',
        Component: HonestWrenchAuto,
      },
      // Core pages (placeholder for now)
      ...coreRoutePaths.slice(1).map(createPlaceholderChild),
      // AI Employee hub page
      {
        path: 'let-ai-handle-it',
        Component: AIEmployee,
      },
      // AI Employee mode pages - Consolidated
      {
        path: 'let-ai-handle-it/after-hours',
        Component: AfterHours,
      },
      {
        path: 'let-ai-handle-it/front-office',
        Component: FrontOffice,
      },
      {
        path: 'let-ai-handle-it/full-ai-employee',
        Component: FullAIEmployee,
      },
      // Smart Websites hub page
      {
        path: 'smart-websites',
        Component: SmartWebsites,
      },
      // Smart Websites tier pages
      {
        path: 'smart-websites/launch',
        Component: SmartSite,
      },
      {
        path: 'smart-websites/capture',
        Component: SmartLead,
      },
      {
        path: 'smart-websites/convert',
        Component: SmartBusiness,
      },
      {
        path: 'smart-websites/scale',
        Component: SmartGrowth,
      },
      // Smart Websites Add-Ons hub
      {
        path: 'smart-websites/add-ons',
        Component: AddOns,
      },
      // Comparison pages
      {
        path: 'compare-websites',
        Component: CompareWebsites,
      },
      {
        path: 'compare-ai-employee',
        Component: CompareAIEmployee,
      },
      // Warmy Email Deliverability - full service page
      {
        path: 'warmy-email-deliverability',
        Component: WarmyEmailDeliverability,
      },
      // Primary service
      createPlaceholderChild(primaryServicePath),
      // Services (excluding pages with dedicated components)
      ...servicePaths.filter(p => p !== '/let-ai-handle-it').map(createPlaceholderChild),
      // Product category pages (SEO)
      ...productCategoryPaths.map(createPlaceholderChild),
      // Features
      ...featurePaths.map(createPlaceholderChild),
      // Industries landing page
      {
        path: 'industries',
        Component: Industries,
      },
      // Industry hub pages (dedicated components)
      {
        path: 'industries/home-services',
        Component: HomeServices,
      },
      {
        path: 'industries/professional-services',
        Component: ProfessionalServices,
      },
      {
        path: 'industries/health-wellness',
        Component: HealthWellness,
      },
      {
        path: 'industries/automotive-services',
        Component: Automotive,
      },
      // Premium industry showcase pages
      {
        path: 'industries/home-services/showcase',
        Component: HomeServicesShowcase,
      },
      {
        path: 'industries/professional-services/showcase',
        Component: ProfessionalShowcase,
      },
      {
        path: 'industries/health-wellness/showcase',
        Component: HealthWellnessShowcase,
      },
      {
        path: 'industries/automotive-services/showcase',
        Component: AutomotiveShowcase,
      },
      // Industry verticals (placeholder for now)
      ...homeServicesPaths.map(createPlaceholderChild),
      ...professionalServicesPaths.map(createPlaceholderChild),
      ...healthWellnessPaths.map(createPlaceholderChild),
      ...automotiveServicesPaths.map(createPlaceholderChild),
      // Checkout routes - explicit SSG routes for each tier
      { path: 'checkout/launch', Component: CheckoutPage },
      { path: 'checkout/capture', Component: CheckoutPage },
      { path: 'checkout/convert', Component: CheckoutPage },
      { path: 'checkout/scale', Component: CheckoutPage },
      { path: 'checkout/after-hours', Component: CheckoutPage },
      { path: 'checkout/front-office', Component: CheckoutPage },
      { path: 'checkout/full-ai', Component: CheckoutPage },
      { path: 'checkout/web-chat', Component: CheckoutPage },
      // Legal
      // Legal pages (actual components)
      { path: 'legal/privacy', Component: PrivacyPolicy },
      { path: 'legal/terms', Component: TermsOfService },
      { path: 'legal/cookies', Component: CookiePolicy },
      { path: 'legal/data-request', Component: DataRightsRequest },
      { path: 'legal/accessibility-statement', Component: AccessibilityStatement },
      // Resources
      ...resourcePaths.map(createPlaceholderChild),
      // Upgrade
      createPlaceholderChild(upgradePath),
      // Catch-all 404
      {
        path: '*',
        Component: NotFound,
      },
    ],
  },
  // Admin routes (CSR only, not pre-rendered)
  {
    path: '/admin',
    Component: AdminLayout,
    children: [
      {
        path: 'login',
        Component: AdminLogin,
      },
      {
        path: 'reset-password',
        Component: AdminResetPassword,
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
        path: 'themes',
        element: (
          <AdminGuard>
            <AdminThemes />
          </AdminGuard>
        ),
      },
      {
        path: 'submissions',
        element: (
          <AdminGuard>
            <AdminSubmissions />
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
      {
        path: 'theme-test',
        element: (
          <AdminGuard>
            <ThemeTestPage />
          </AdminGuard>
        ),
      },
      {
        path: 'playground',
        element: (
          <AdminGuard>
            <AdminPlayground />
          </AdminGuard>
        ),
      },
      {
        path: 'playground/badges',
        element: (
          <AdminGuard>
            <AdminPlaygroundBadges />
          </AdminGuard>
        ),
      },
      {
        path: 'playground/timelines',
        element: (
          <AdminGuard>
            <AdminPlaygroundTimelines />
          </AdminGuard>
        ),
      },
      // Catch-all: redirect unknown admin routes to home
      {
        path: '*',
        element: <Navigate to="/" replace />,
      },
    ],
  },
];
