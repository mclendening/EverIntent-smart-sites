/**
 * SEO Component - Search Engine Optimization Meta Tags
 * 
 * Manages page-level SEO meta tags using vite-react-ssg's Head component.
 * Provides consistent SEO structure across all pages.
 * 
 * IMPORTANT TITLE CONVENTIONS:
 * - Do NOT include "| EverIntent" in title prop - it's appended automatically
 * - Do NOT use em dashes (—) anywhere - use colons, commas, or periods instead
 * - Keep titles under 60 characters (before brand suffix)
 * - Use colons for separators: "Launch: Professional Website for $249"
 * 
 * The SEO component automatically appends "| EverIntent" to all titles.
 */

import { Head } from 'vite-react-ssg';

/**
 * Props for the SEO component
 * @interface SEOProps
 */
interface SEOProps {
  /** Page title (will be appended with site name) */
  title?: string;
  /** Meta description (max 160 chars recommended) */
  description?: string;
  /** Canonical URL path (relative, will be prefixed with SITE_URL) */
  canonical?: string;
  /** Open Graph image URL (absolute or relative) */
  ogImage?: string;
  /** Open Graph type */
  ogType?: 'website' | 'article';
  /** Whether to add noindex meta tag (for admin/preview pages) */
  noIndex?: boolean;
  /** JSON-LD structured data for SEO/AEO. Single object or array of objects. */
  structuredData?: Record<string, unknown> | Record<string, unknown>[];
}

/**
 * Site-wide SEO constants per BRD v34.0
 * @constant {string}
 */
const SITE_NAME = 'EverIntent';

/**
 * Default meta description per BRD v34.0 messaging
 * @constant {string}
 */
const DEFAULT_DESCRIPTION = 'Stop losing money to missed calls. AI Employee answers 24/7, books appointments, and captures every lead. Smart Websites starting at $249.';

/**
 * Default Open Graph image
 * @constant {string}
 */
const DEFAULT_OG_IMAGE = '/og-image.jpg';

/**
 * Production site URL for canonical/OG URLs
 * @constant {string}
 */
const SITE_URL = 'https://everintent.com';

/**
 * SEO - Page-level SEO meta tag component
 * 
 * Features per BRD v33.0 Section 18:
 * - Title tag with site name suffix
 * - Meta description
 * - Canonical URL
 * - Open Graph tags (Facebook, LinkedIn)
 * - Twitter Card tags
 * - Optional noindex for admin pages
 * 
 * Uses vite-react-ssg Head component for SSG-compatible meta injection.
 * 
 * @component
 * @example
 * // Basic usage
 * <SEO 
 *   title="Pricing"
 *   description="Simple, transparent pricing for SmartSites"
 *   canonical="/pricing"
 * />
 * 
 * @example
 * // Admin page (noindex)
 * <SEO 
 *   title="Admin Dashboard"
 *   noIndex
 * />
 * 
 * @param {SEOProps} props - Component properties
 * @returns {JSX.Element} Head component with meta tags
 */
export function SEO({
  title,
  description = DEFAULT_DESCRIPTION,
  canonical,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = 'website',
  noIndex = false,
  structuredData,
}: SEOProps) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
  const canonicalUrl = canonical ? `${SITE_URL}${canonical}` : undefined;
  const ogImageUrl = ogImage.startsWith('http') ? ogImage : `${SITE_URL}${ogImage}`;

  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      
      {/* Canonical */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImageUrl} />
      <meta property="og:site_name" content={SITE_NAME} />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImageUrl} />
      
      {/* Robots */}
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      
      {/* JSON-LD Structured Data — supports single object or array */}
      {structuredData && (Array.isArray(structuredData) ? structuredData : [structuredData]).map((schema, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Head>
  );
}
