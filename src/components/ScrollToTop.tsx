/**
 * ScrollToTop Component - Handles scroll restoration on navigation
 * 
 * Automatically scrolls to top of page on route changes.
 * Respects hash anchors (e.g., /page#section) by scrolling to the element.
 * 
 * Must be placed inside the Router context and wrapped in ClientOnly.
 */

import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Scrolls to top on route change, or to anchor if hash present.
 * Uses smooth scrolling for anchor navigation, instant for page changes.
 */
export function ScrollToTop() {
  const { pathname, hash, key } = useLocation();
  const lastPathRef = useRef(pathname);

  useEffect(() => {
    // If there's a hash, scroll to that element
    if (hash) {
      // Longer delay to ensure DOM is fully ready after navigation
      const timeoutId = setTimeout(() => {
        const elementId = hash.slice(1);
        if (!elementId) return;
        
        const element = document.getElementById(elementId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          // Element not found, scroll to top
          window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        }
      }, 150);
      return () => clearTimeout(timeoutId);
    }
    
    // Only scroll to top if pathname actually changed (not just hash)
    // This prevents unwanted scrolling on same-page hash navigation
    if (pathname !== lastPathRef.current || !hash) {
      // Scroll to top instantly
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      lastPathRef.current = pathname;
    }
  }, [pathname, hash, key]);

  return null;
}
