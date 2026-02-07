/**
 * @fileoverview NavLink Component - SSG-Safe Navigation Link
 * @description Native anchor tag wrapper for true static site navigation.
 *              Ensures each page loads as a fresh HTML document for SEO.
 * 
 * @module components/NavLink
 * @see docs/SSG-BEST-PRACTICES.md
 */

import { forwardRef, type AnchorHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

/**
 * Props for the NavLink component
 */
interface NavLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  /** Target route path */
  to: string;
  /** Base className applied always */
  className?: string;
  /** Additional className applied when link matches current path */
  activeClassName?: string;
}

/**
 * NavLink - SSG-safe navigation link using native anchor tags
 * 
 * Uses native <a href> instead of React Router Link to ensure:
 * - Full page loads for proper SSG behavior
 * - URL updates correctly in all browsers
 * - Search engines follow links naturally
 * - No JavaScript required for navigation
 * 
 * @component
 * @example
 * <NavLink to="/pricing" className="nav-link">
 *   Pricing
 * </NavLink>
 */
const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(
  ({ className, activeClassName, to, children, ...props }, ref) => {
    // Check if current path matches (client-side only)
    const isActive = typeof window !== 'undefined' && window.location.pathname === to;
    
    return (
      <a
        ref={ref}
        href={to}
        className={cn(className, isActive && activeClassName)}
        {...props}
      >
        {children}
      </a>
    );
  },
);

NavLink.displayName = "NavLink";

export { NavLink };
