/**
 * @fileoverview useIsMobile Hook - Responsive Breakpoint Detection
 * @description Custom hook for detecting mobile viewport using matchMedia.
 *              Returns boolean indicating if viewport is below mobile breakpoint.
 * 
 * @module hooks/use-mobile
 * @see {@link https://docs.lovable.dev} Lovable Documentation
 * 
 * @brd-reference BRD v33.0 Section 17.1 - Responsive Design Requirements
 */

import * as React from "react";

/**
 * Mobile breakpoint in pixels (matches Tailwind's md breakpoint)
 * @constant {number}
 */
const MOBILE_BREAKPOINT = 768;

/**
 * useIsMobile - Detects if viewport is mobile-sized
 * 
 * Uses matchMedia API for efficient viewport detection with:
 * - Initial undefined state (SSR-safe)
 * - Real-time updates on resize via matchMedia listener
 * 
 * @hook
 * @example
 * const isMobile = useIsMobile();
 * 
 * return (
 *   <div>
 *     {isMobile ? <MobileNav /> : <DesktopNav />}
 *   </div>
 * );
 * 
 * @returns {boolean} true if viewport width < 768px, false otherwise
 */
export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined);

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    
    /**
     * Update isMobile state based on current viewport width
     */
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    
    mql.addEventListener("change", onChange);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return !!isMobile;
}
