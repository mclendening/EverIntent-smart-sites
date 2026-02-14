/**
 * @fileoverview Centralized route configuration for EverIntent marketing site.
 * @module config/routes
 * 
 * Defines all application routes organized by category:
 * - Core pages (home, pricing, about, contact, etc.)
 * - Service pages (benefit-oriented and SEO category pages)
 * - Industry hub pages (4 category pages)
 * - Checkout flows (tier-based purchase pages)
 * - Legal/compliance pages
 * - Admin pages (CSR only, not pre-rendered)
 * 
 * Used by:
 * - vite-react-ssg for static pre-rendering
 * - Navigation components for menu generation
 * - Sitemap generation
 */

/**
 * Configuration for a single route.
 */
export interface RouteConfig {
  /** URL path (e.g., '/pricing') */
  path: string;
  /** Page title for navigation and SEO */
  title: string;
  /** Meta description for SEO */
  description?: string;
}

// ============================================
// CORE PAGES
// ============================================

/**
 * Primary marketing pages accessible from main navigation.
 */
export const coreRoutes: RouteConfig[] = [
  { path: '/', title: 'Home', description: 'Professional websites for local businesses' },
  { path: '/pricing', title: 'Pricing', description: 'Simple, transparent pricing' },
  { path: '/portfolio', title: 'Portfolio', description: 'Award-winning websites for local businesses' },
  { path: '/about', title: 'About', description: 'About EverIntent' },
  { path: '/contact', title: 'Contact', description: 'Get in touch' },
  { path: '/book-call', title: 'Book a Call', description: 'Schedule a consultation' },
  { path: '/strategy-session', title: 'Strategy Session', description: 'Book a SmartStart Strategy Session' },
  { path: '/careers', title: 'Careers', description: 'Join the EverIntent team' },
];

/**
 * Portfolio case study routes.
 */
export const portfolioCaseStudyRoutes: RouteConfig[] = [
  { path: '/portfolio/riverstone-plumbing', title: 'Riverstone Plumbing Case Study', description: 'See how we helped Riverstone Plumbing achieve +312% qualified leads' },
];

// ============================================
// SERVICE PAGES
// ============================================

/**
 * Primary service landing page (legacy — redirects to /smart-websites).
 * @deprecated Use /smart-websites instead.
 */
export const primaryServiceRoute: RouteConfig = {
  path: '/beautiful-websites',
  title: 'Beautiful Websites',
  description: 'Professional websites that get you customers',
};

/**
 * Benefit-oriented service pages for navigation dropdowns.
 * Focus on outcomes rather than features.
 */
export const serviceRoutes: RouteConfig[] = [
  { path: '/services', title: 'Services', description: 'All our services' },
  { path: '/get-found-online', title: 'Get Found Online', description: 'SEO and local search visibility' },
  { path: '/never-miss-a-lead', title: 'Never Miss a Lead', description: 'Lead capture and follow-up' },
  { path: '/book-more-jobs', title: 'Book More Jobs', description: 'Online booking and scheduling' },
  { path: '/run-from-your-phone', title: 'Run From Your Phone', description: 'Mobile app access' },
  { path: '/build-your-reputation', title: 'Build Your Reputation', description: 'Review automation' },
  { path: '/let-ai-handle-it', title: 'Let AI Handle It', description: 'AI automation' },
];

/**
 * SEO-focused product category landing pages.
 * Optimized for search traffic with keyword-targeted content.
 */
export const productCategoryRoutes: RouteConfig[] = [
  { path: '/services/web-design', title: 'Web Design Services', description: 'Professional website design for local businesses' },
  { path: '/services/seo', title: 'Local SEO Services', description: 'Get found on Google and local search' },
  { path: '/services/lead-capture', title: 'Lead Capture', description: 'Never miss another customer inquiry' },
  { path: '/services/booking', title: 'Online Booking', description: 'Online scheduling and appointment booking' },
  { path: '/services/reputation', title: 'Reputation Management', description: 'Build and manage your online reviews' },
  { path: '/services/ai-automation', title: 'AI Automation', description: 'AI solutions for small business automation' },
];

/**
 * Feature-specific landing pages.
 */
export const featureRoutes: RouteConfig[] = [
  { path: '/features/lead-capture', title: 'Lead Capture', description: 'Capture every lead' },
  { path: '/features/ai-chat', title: 'AI Chat', description: 'AI-powered chat widget' },
  { path: '/features/review-management', title: 'Review Management', description: 'Manage your reviews' },
  { path: '/features/mobile-app', title: 'Mobile App', description: 'Run your business from anywhere' },
  { path: '/features/scheduling', title: 'Scheduling', description: 'Online booking' },
  { path: '/features/analytics', title: 'Analytics', description: 'Track your performance' },
];

// ============================================
// INDUSTRY PAGES
// ============================================

/**
 * Top-level industry hub pages linking to verticals.
 */
export const industryHubRoutes: RouteConfig[] = [
  { path: '/industries/home-services', title: 'Home Services', description: 'Websites for home service businesses' },
  { path: '/industries/professional-services', title: 'Professional Services', description: 'Websites for professional services' },
  { path: '/industries/health-wellness', title: 'Health & Wellness', description: 'Websites for health and wellness businesses' },
  { path: '/industries/automotive-services', title: 'Automotive Services', description: 'Websites for automotive businesses' },
];

/**
 * Location-specific landing pages for local SEO (Gap 8).
 */
export const locationRoutes: RouteConfig[] = [
  { path: '/locations/long-beach', title: 'Long Beach', description: 'Smart websites and AI automation for Long Beach businesses' },
  { path: '/locations/orange-county', title: 'Orange County', description: 'Smart websites and AI automation for Orange County businesses' },
  { path: '/locations/los-angeles', title: 'Los Angeles', description: 'Smart websites and AI automation for Los Angeles businesses' },
];

// NOTE: Individual vertical pages (65+) have been deferred to post-MVP.
// The 4 hub pages above serve as the primary industry entry points.
// Vertical-specific pages can be added when SEO content strategy is finalized.

// ============================================
// CHECKOUT & CONVERSION PAGES
// ============================================

/**
 * Checkout pages for each service tier.
 * Direct conversion paths from pricing page.
 */
export const checkoutRoutes: RouteConfig[] = [
  { path: '/checkout/launch', title: 'Launch Checkout', description: 'Get your Launch website' },
  { path: '/checkout/capture', title: 'Capture Checkout', description: 'Get Capture' },
  { path: '/checkout/convert', title: 'Convert Checkout', description: 'Get Convert' },
  { path: '/checkout/scale', title: 'Scale Checkout', description: 'Get Scale' },
  { path: '/checkout/after-hours', title: 'After-Hours Checkout', description: 'Get After-Hours AI' },
  { path: '/checkout/front-office', title: 'Front Office Checkout', description: 'Get Front Office AI' },
  { path: '/checkout/full-ai', title: 'Full AI Employee Checkout', description: 'Get Full AI Employee' },
  { path: '/checkout/web-chat', title: 'Web Chat Checkout', description: 'Get Web Chat' },
];

// ============================================
// LEGAL & COMPLIANCE PAGES
// ============================================

/**
 * Legal and compliance pages required for CCPA/privacy compliance.
 */
export const legalRoutes: RouteConfig[] = [
  { path: '/legal/privacy', title: 'Privacy Policy', description: 'Our privacy policy' },
  { path: '/legal/cookies', title: 'Cookie Policy', description: 'Our cookie policy' },
  { path: '/legal/terms', title: 'Terms of Service', description: 'Our terms of service' },
  { path: '/legal/data-request', title: 'Data Request', description: 'Request your data' },
];

// ============================================
// RESOURCE & SUPPORT PAGES
// ============================================

/**
 * Help and support resource pages.
 */
export const resourceRoutes: RouteConfig[] = [
  { path: '/help', title: 'Help', description: 'Get help with EverIntent' },
  { path: '/faq', title: 'FAQ', description: 'Frequently asked questions' },
  { path: '/support', title: 'Support', description: 'Contact support' },
];

/**
 * Upgrade page for existing customers.
 */
export const upgradeRoute: RouteConfig = {
  path: '/upgrade',
  title: 'Upgrade',
  description: 'Upgrade your plan',
};

// ============================================
// ADMIN PAGES (CSR Only)
// ============================================

/**
 * Admin dashboard pages. NOT pre-rendered - client-side only.
 * Requires authentication via AdminGuard.
 */
export const adminRoutes: RouteConfig[] = [
  { path: '/admin/login', title: 'Admin Login', description: 'Admin login' },
  { path: '/admin', title: 'Admin Dashboard', description: 'Admin dashboard' },
  { path: '/admin/submissions', title: 'Submissions', description: 'View submissions' },
  { path: '/admin/portfolio', title: 'Portfolio Management', description: 'Manage portfolio' },
  { path: '/admin/testimonials', title: 'Testimonials Management', description: 'Manage testimonials' },
];

// ============================================
// ROUTE AGGREGATIONS
// ============================================

/**
 * All marketing routes for SSG pre-rendering.
 * Excludes admin routes which are CSR-only.
 */
export const prerenderRoutes: string[] = [
  ...coreRoutes.map(r => r.path),
  ...portfolioCaseStudyRoutes.map(r => r.path),
  primaryServiceRoute.path,
  ...serviceRoutes.map(r => r.path),
  ...productCategoryRoutes.map(r => r.path),
  ...featureRoutes.map(r => r.path),
  ...industryHubRoutes.map(r => r.path),
  ...checkoutRoutes.map(r => r.path),
  ...legalRoutes.map(r => r.path),
  ...resourceRoutes.map(r => r.path),
  ...locationRoutes.map(r => r.path),
  upgradeRoute.path,
];

/**
 * All routes combined for sitemap generation and validation.
 */
export const allRoutes: RouteConfig[] = [
  ...coreRoutes,
  ...portfolioCaseStudyRoutes,
  primaryServiceRoute,
  ...serviceRoutes,
  ...productCategoryRoutes,
  ...featureRoutes,
  ...industryHubRoutes,
  ...checkoutRoutes,
  ...legalRoutes,
  ...resourceRoutes,
  ...locationRoutes,
  upgradeRoute,
  ...adminRoutes,
];
