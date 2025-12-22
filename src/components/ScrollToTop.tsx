/**
 * ScrollToTop Component - Handles scroll restoration on navigation
 * 
 * Automatically scrolls to top of page on route changes.
 * Respects hash anchors (e.g., /page#section) by scrolling to the element.
 * 
 * Must be placed inside the Router context.
 */

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Scrolls to top on route change, or to anchor if hash present.
 * Uses smooth scrolling for anchor navigation, instant for page changes.
 */
export function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // If there's a hash, scroll to that element
    if (hash) {
      // Small delay to ensure DOM is ready
      const timeoutId = setTimeout(() => {
        try {
          // Validate hash is a valid CSS selector before querying
          const element = document.getElementById(hash.slice(1));
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        } catch (e) {
          // Invalid selector, just scroll to top
          window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        }
      }, 100);
      return () => clearTimeout(timeoutId);
    }
    
    // Otherwise scroll to top instantly
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname, hash]);

  return null;
}
