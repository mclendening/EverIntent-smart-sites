/**
 * @fileoverview ClientOnly Component - SSG Hydration Safety Wrapper
 * @description Ensures children only render after client-side hydration is complete.
 *              Critical for components that use browser APIs (localStorage, window, etc.)
 *              or Radix UI portals that cause hydration mismatches during SSR.
 * 
 * @module components/ClientOnly
 * @see {@link https://docs.lovable.dev} Lovable Documentation
 * 
 * @brd-reference BRD v33.0 Section 17.2 - SSG Hydration Requirements
 */

import { useState, useEffect, type ReactNode } from 'react';

/**
 * Props for the ClientOnly component
 * @interface ClientOnlyProps
 */
interface ClientOnlyProps {
  /** Children to render only on client-side */
  children: ReactNode;
  /** Optional fallback to render during SSR/initial load */
  fallback?: ReactNode;
}

/**
 * ClientOnly - SSG-safe wrapper for browser-dependent components
 * 
 * Problem solved:
 * During SSG (Static Site Generation), components that use browser APIs
 * (localStorage, window, document) or Radix UI portals cause hydration
 * mismatches because the server HTML differs from client rendering.
 * 
 * Solution:
 * This component renders nothing (or fallback) during SSR, then renders
 * children after the first client-side useEffect runs.
 * 
 * Use for:
 * - Components using localStorage (CookieConsent, MobileBottomBar)
 * - Radix UI portal-based components (Toaster, Sonner, Dialog)
 * - Components with window/document access
 * 
 * @component
 * @example
 * // Wrap browser-dependent components
 * <ClientOnly>
 *   <CookieConsent />
 *   <GHLChatWidget />
 * </ClientOnly>
 * 
 * @example
 * // With fallback skeleton
 * <ClientOnly fallback={<Skeleton className="h-12 w-full" />}>
 *   <DynamicComponent />
 * </ClientOnly>
 * 
 * @param {ClientOnlyProps} props - Component properties
 * @returns {JSX.Element} Children after mount, fallback during SSR
 */
export function ClientOnly({ children, fallback = null }: ClientOnlyProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted ? <>{children}</> : <>{fallback}</>;
}
