/**
 * @fileoverview SEO Component - Search Engine Optimization Meta Tags
 * @description Manages page-level SEO meta tags using vite-react-ssg's Head component.
 *              Provides consistent SEO structure across all pages per BRD v34.0 Section 18.
 * 
 * @module components/SEO
 * @see {@link https://docs.lovable.dev} Lovable Documentation
 * 
 * @brd-reference BRD v34.0 Section 18 - SEO Strategy
 * @brd-reference BRD v34.0 Section 18.1 - Meta Tag Standards
 * @brd-reference BRD v34.0 Section 18.2 - Open Graph Requirements
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
  /** JSON-LD structured data for SEO/AEO */
  structuredData?: Record<string, unknown>;
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
const DEFAULT_DESCRIPTION = 'Professional smart websites for local businesses. Built in 5 days. Starting at $249. You own everything.';

/**
 * Default Open Graph image
 * @constant {string}
 */
const DEFAULT_OG_IMAGE = '/og-image.jpg';

/**
 * Production site URL for canonical/OG URLs
 * @constant {string}
 */
const SITE_URL = 'https://everintentsmartsites.com';

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
      
      {/* JSON-LD Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Head>
  );
}
