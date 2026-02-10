/**
 * @fileoverview Affiliate tracking hook and cookie utilities.
 * @module hooks/useAffiliateTracking
 * @description Captures ?ref= URL parameter into a first-party cookie (90-day expiry)
 * and provides a utility to read the affiliate ID for inclusion in POST bodies
 * to Edge Functions. Per architecture decision, cookies cannot be read by
 * Edge Functions directly — they must be passed in the request body.
 * 
 * @see docs/e-commerce-feature-matrix-v1.3.md Phase 2
 */

import { useEffect } from 'react';

const COOKIE_NAME = 'ei_affiliate';
const COOKIE_MAX_AGE_DAYS = 90;

/**
 * Sets a first-party cookie with the given name, value, and max-age in days.
 */
function setCookie(name: string, value: string, days: number): void {
  const maxAge = days * 24 * 60 * 60; // Convert days to seconds
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAge}; SameSite=Lax; Secure`;
}

/**
 * Reads a cookie value by name. Returns null if not found.
 */
function getCookie(name: string): string | null {
  const cookies = document.cookie.split('; ');
  for (const cookie of cookies) {
    const [key, ...valueParts] = cookie.split('=');
    if (key === name) {
      return decodeURIComponent(valueParts.join('='));
    }
  }
  return null;
}

/**
 * React hook that captures the ?ref= URL parameter and stores it
 * in a first-party cookie with a 90-day expiry.
 * 
 * Should be mounted once in Layout.tsx (inside ClientOnly) so it
 * runs on every page load across the site.
 * 
 * @example
 * // In Layout.tsx
 * <ClientOnly>
 *   <AffiliateTracker />
 * </ClientOnly>
 */
export function useAffiliateTracking(): void {
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const ref = params.get('ref');
      
      if (ref && ref.trim().length > 0) {
        // Sanitize: alphanumeric, hyphens, underscores only (max 50 chars)
        const sanitized = ref.trim().replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 50);
        if (sanitized.length > 0) {
          setCookie(COOKIE_NAME, sanitized, COOKIE_MAX_AGE_DAYS);
          console.log(`[Affiliate] Tracked ref=${sanitized}`);
        }
      }
    } catch (err) {
      // Silent fail — affiliate tracking is non-critical
      console.warn('[Affiliate] Failed to capture ref param:', err);
    }
  }, []);
}

/**
 * Reads the affiliate ID from the ei_affiliate cookie.
 * Returns null if no affiliate cookie is set.
 * 
 * Use this in form submission handlers to include affiliate_id
 * in the POST body sent to Edge Functions.
 * 
 * @example
 * const affiliateId = getAffiliateId();
 * await fetch('/start-checkout', {
 *   body: JSON.stringify({ ...formData, affiliate_id: affiliateId }),
 * });
 */
export function getAffiliateId(): string | null {
  if (typeof document === 'undefined') return null;
  return getCookie(COOKIE_NAME);
}
