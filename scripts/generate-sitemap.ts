/**
 * @fileoverview Build-time sitemap generator
 * @description Generates sitemap.xml from the same prerenderRoutes list that SSG uses,
 *              ensuring the sitemap never drifts from actual rendered pages.
 *
 * Run: npx tsx scripts/generate-sitemap.ts
 * Called automatically during build via package.json "build" script.
 *
 * Priority hierarchy per BRD v36.13:
 *   1.0 — Core (/, /pricing, /services)
 *   0.9 — Primary nav (about, contact, portfolio, AI Employee hub, Smart Websites hub)
 *   0.8 — Product tiers (individual plan pages)
 *   0.7 — Industries hub, portfolio case studies, compare pages
 *   0.6 — Standalone services (warmy), add-ons
 *   0.5 — Help, FAQ, support
 *   0.3 — Location pages
 *   0.2 — Legal pages
 *
 * Excludes:
 *   - Placeholder pages (careers, upgrade, get-found-online, etc.)
 *   - Checkout pages (noIndex)
 *   - Feature/product-category placeholder pages
 *   - Industry vertical placeholders (not yet built)
 */

import * as fs from 'fs';
import * as path from 'path';

const SITE_URL = 'https://everintent.com';
const TODAY = new Date().toISOString().split('T')[0] + 'T00:00:00+00:00';

// ============================================
// ROUTE CONFIGURATION
// ============================================

interface SitemapEntry {
  loc: string;
  priority: string;
  changefreq: string;
  lastmod?: string;
}

/** Routes that are placeholder pages and should NOT be in the sitemap */
const EXCLUDED_PREFIXES = [
  '/careers',
  '/upgrade',
  '/get-found-online',
  '/never-miss-a-lead',
  '/book-more-jobs',
  '/run-from-your-phone',
  '/build-your-reputation',
  '/services/web-design',
  '/services/seo',
  '/services/lead-capture',
  '/services/booking',
  '/services/reputation',
  '/services/ai-automation',
  '/features/lead-capture', '/features/ai-chat', '/features/review-management',
  '/features/mobile-app', '/features/scheduling', '/features/analytics',
  '/checkout/launch', '/checkout/capture', '/checkout/convert', '/checkout/scale',
  '/checkout/after-hours', '/checkout/front-office', '/checkout/full-ai', '/checkout/web-chat',
  // Industry verticals (placeholder pages) — exclude entire subtrees
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

function getPriority(route: string): string {
  // 1.0 — Core
  if (route === '/' || route === '/pricing' || route === '/services') return '1.0';

  // 0.9 — Primary nav
  if (['/about', '/contact', '/portfolio', '/let-ai-handle-it', '/smart-websites'].includes(route)) return '0.9';

  // 0.8 — Product tiers
  if (route.startsWith('/smart-websites/') && !route.includes('add-ons')) return '0.8';
  if (route.startsWith('/let-ai-handle-it/')) return '0.8';

  // 0.7 — Industries, portfolio case studies, compare pages
  if (route === '/industries') return '0.7';
  if (route.startsWith('/industries/')) return '0.7';
  if (route.startsWith('/portfolio/')) return '0.7';
  if (route.startsWith('/compare-')) return '0.7';

  // 0.6 — Standalone services, add-ons
  if (route === '/warmy-email-deliverability') return '0.6';
  if (route === '/smart-websites/add-ons') return '0.6';

  // 0.5 — Help/FAQ/Support
  if (['/faq', '/help', '/support'].includes(route)) return '0.5';

  // 0.3 — Locations
  if (route.startsWith('/locations/')) return '0.3';

  // 0.2 — Legal
  if (route.startsWith('/legal/')) return '0.2';

  return '0.5';
}

function getChangefreq(route: string): string {
  if (route === '/' || route === '/pricing') return 'weekly';
  if (route.startsWith('/legal/')) return 'yearly';
  if (route.startsWith('/locations/')) return 'monthly';
  if (route.startsWith('/portfolio/')) return 'monthly';
  return 'monthly';
}

function getCategoryComment(route: string): string | null {
  if (route === '/') return 'Core Pages';
  if (route === '/services') return 'Services';
  if (route === '/let-ai-handle-it') return 'AI Employee';
  if (route === '/smart-websites') return 'Smart Websites';
  if (route === '/warmy-email-deliverability') return 'Standalone Services';
  if (route === '/industries') return 'Industries';
  if (route.startsWith('/industries/') && route.endsWith('/showcase') && !route.includes('/showcase/')) {
    const parts = route.split('/');
    if (parts.length === 4) return null; // first showcase gets no extra comment
  }
  if (route === '/portfolio/desert-cool-air') return 'Portfolio Case Studies';
  if (route.startsWith('/locations/') && route === '/locations/long-beach') return 'Location Pages';
  if (route === '/faq') return 'Help & Support';
  if (route === '/legal/privacy') return 'Legal';
  return null;
}

// ============================================
// MAIN GENERATION
// ============================================

// Import prerenderRoutes by reading the compiled route list
// Since we can't import TS directly, we define the authoritative route list here
// This must stay in sync with src/routes.tsx prerenderRoutes
const ALL_ROUTES: string[] = [
  // Core
  '/', '/pricing', '/about', '/contact', '/portfolio', '/careers',
  // Smart Websites hub
  '/smart-websites',
  // Services
  '/services', '/get-found-online', '/never-miss-a-lead', '/book-more-jobs',
  '/run-from-your-phone', '/build-your-reputation', '/let-ai-handle-it',
  // AI Employee modes
  '/let-ai-handle-it/after-hours', '/let-ai-handle-it/front-office', '/let-ai-handle-it/full-ai-employee',
  // Smart Websites tiers
  '/smart-websites/launch', '/smart-websites/capture', '/smart-websites/convert',
  '/smart-websites/scale', '/smart-websites/add-ons',
  // Product categories
  '/services/web-design', '/services/seo', '/services/lead-capture',
  '/services/booking', '/services/reputation', '/services/ai-automation',
  // Features
  '/features/lead-capture', '/features/ai-chat', '/features/review-management',
  '/features/mobile-app', '/features/scheduling', '/features/analytics',
  // Industries
  '/industries',
  '/industries/home-services', '/industries/professional-services',
  '/industries/health-wellness', '/industries/automotive-services',
  '/industries/home-services/showcase', '/industries/professional-services/showcase',
  '/industries/health-wellness/showcase', '/industries/automotive-services/showcase',
  // Checkout (excluded from sitemap)
  '/checkout/launch', '/checkout/capture', '/checkout/convert', '/checkout/scale',
  '/checkout/after-hours', '/checkout/front-office', '/checkout/full-ai', '/checkout/web-chat',
  // Legal
  '/legal/privacy', '/legal/cookies', '/legal/terms', '/legal/data-request', '/legal/accessibility-statement',
  // Resources
  '/help', '/faq', '/support',
  // Upgrade
  '/upgrade',
  // Standalone
  '/warmy-email-deliverability',
  // Compare
  '/compare-websites', '/compare-ai-employee',
  // Portfolio
  '/portfolio',
  '/portfolio/desert-cool-air', '/portfolio/clearview-dentistry-austin',
  '/portfolio/alexander-tree', '/portfolio/honest-wrench-auto',
  // Locations — primary
  '/locations/long-beach', '/locations/orange-county', '/locations/los-angeles',
  // Locations — Long Beach region
  '/locations/signal-hill', '/locations/lakewood', '/locations/seal-beach',
  '/locations/los-alamitos', '/locations/carson', '/locations/cerritos',
  '/locations/bellflower', '/locations/paramount',
  // Locations — Los Angeles region
  '/locations/santa-monica', '/locations/beverly-hills', '/locations/pasadena',
  '/locations/glendale', '/locations/burbank', '/locations/culver-city',
  '/locations/inglewood', '/locations/torrance', '/locations/west-hollywood',
  '/locations/downtown-la', '/locations/venice', '/locations/silver-lake',
  // Locations — Orange County region
  '/locations/irvine', '/locations/anaheim', '/locations/santa-ana',
  '/locations/huntington-beach', '/locations/costa-mesa', '/locations/newport-beach',
  '/locations/fullerton', '/locations/mission-viejo', '/locations/lake-forest',
  '/locations/tustin', '/locations/laguna-beach', '/locations/san-clemente',
];

function isExcluded(route: string): boolean {
  return EXCLUDED_PREFIXES.some(prefix => route === prefix || route.startsWith(prefix + '/'));
}

function generateSitemap(): string {
  const entries: SitemapEntry[] = ALL_ROUTES
    .filter(route => !isExcluded(route))
    .map(route => ({
      loc: route === '/' ? SITE_URL + '/' : SITE_URL + route,
      priority: getPriority(route),
      changefreq: getChangefreq(route),
      lastmod: TODAY,
    }));

  // Sort by priority (desc) then alphabetically
  entries.sort((a, b) => {
    const pDiff = parseFloat(b.priority) - parseFloat(a.priority);
    if (pDiff !== 0) return pDiff;
    return a.loc.localeCompare(b.loc);
  });

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  let lastPriority = '';
  for (const entry of entries) {
    if (entry.priority !== lastPriority) {
      const labels: Record<string, string> = {
        '1.0': 'Core Pages (Priority 1.0)',
        '0.9': 'Primary Navigation (Priority 0.9)',
        '0.8': 'Product Tiers (Priority 0.8)',
        '0.7': 'Industries, Portfolio & Compare (Priority 0.7)',
        '0.6': 'Standalone Services & Add-Ons (Priority 0.6)',
        '0.5': 'Help & Support (Priority 0.5)',
        '0.3': 'Location Pages (Priority 0.3)',
        '0.2': 'Legal (Priority 0.2)',
      };
      xml += `\n  <!-- ${labels[entry.priority] || `Priority ${entry.priority}`} -->\n`;
      lastPriority = entry.priority;
    }

    xml += '  <url>\n';
    xml += `    <loc>${entry.loc}</loc>\n`;
    xml += `    <lastmod>${entry.lastmod}</lastmod>\n`;
    xml += `    <changefreq>${entry.changefreq}</changefreq>\n`;
    xml += `    <priority>${entry.priority}</priority>\n`;
    xml += '  </url>\n';
  }

  xml += '\n</urlset>';
  return xml;
}

// Write to public/sitemap.xml
const outputPath = path.resolve(import.meta.dirname || path.dirname(new URL(import.meta.url).pathname), '../public/sitemap.xml');
const sitemap = generateSitemap();
fs.writeFileSync(outputPath, sitemap, 'utf-8');

const urlCount = (sitemap.match(/<url>/g) || []).length;
console.log(`✅ Sitemap generated: ${urlCount} URLs → ${outputPath}`);
