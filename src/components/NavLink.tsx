/**
 * @fileoverview NavLink Component - Enhanced Navigation Link Wrapper
 * @description Wrapper around react-router-dom's NavLink with additional className support
 *              for active and pending states. Used throughout Header navigation.
 * 
 * @module components/NavLink
 * @see {@link https://docs.lovable.dev} Lovable Documentation
 * 
 * @brd-reference BRD v33.0 Section 8 - Navigation Structure
 */

import { NavLink as RouterNavLink, NavLinkProps } from "react-router-dom";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Props for the NavLink component
 * @interface NavLinkCompatProps
 * @extends {Omit<NavLinkProps, 'className'>}
 */
interface NavLinkCompatProps extends Omit<NavLinkProps, "className"> {
  /** Base className applied always */
  className?: string;
  /** Additional className applied when link is active */
  activeClassName?: string;
  /** Additional className applied when navigation is pending */
  pendingClassName?: string;
}

/**
 * NavLink - Enhanced navigation link with active/pending class support
 * 
 * Wraps react-router-dom NavLink to provide cleaner API for:
 * - Base styles via className
 * - Active route styles via activeClassName
 * - Pending navigation styles via pendingClassName
 * 
 * Uses cn() utility for className merging.
 * 
 * @component
 * @example
 * // Simple usage
 * <NavLink to="/pricing" className="nav-link">
 *   Pricing
 * </NavLink>
 * 
 * @example
 * // With active styling
 * <NavLink 
 *   to="/about" 
 *   className="text-muted-foreground"
 *   activeClassName="text-accent font-bold"
 * >
 *   About
 * </NavLink>
 * 
 * @param {NavLinkCompatProps} props - Component properties
 * @returns {JSX.Element} Rendered navigation link
 */
const NavLink = forwardRef<HTMLAnchorElement, NavLinkCompatProps>(
  ({ className, activeClassName, pendingClassName, to, ...props }, ref) => {
    return (
      <RouterNavLink
        ref={ref}
        to={to}
        className={({ isActive, isPending }) =>
          cn(className, isActive && activeClassName, isPending && pendingClassName)
        }
        {...props}
      />
    );
  },
);

NavLink.displayName = "NavLink";

export { NavLink };
