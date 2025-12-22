/**
 * @fileoverview useTheme Hook - Route-Based Theme Access
 * @description Provides access to the current theme based on the route.
 *              Uses static config from themes.ts - NO database calls.
 *              SSG Compatible: Theme is determined at build time for static routes.
 * 
 * @module hooks/useTheme
 * @see {@link https://docs.lovable.dev} Lovable Documentation
 * 
 * @brd-reference BRD v33.0 Section 4 - Visual Identity System
 * @brd-reference BRD v33.0 Section 4.3 - Theme Configuration
 */

import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  activeTheme, 
  getThemeForRoute, 
  type ThemeConfig 
} from '@/config/themes';

/**
 * Return type for useTheme hook
 * @interface UseThemeResult
 */
interface UseThemeResult {
  /** Current theme configuration object */
  theme: ThemeConfig;
  /** Accent color in HSL format (e.g., "240 70% 60%") */
  accentHsl: string;
  /** Whether current theme is the default/active theme */
  isDefaultTheme: boolean;
}

/**
 * useTheme - Get current theme based on route
 * 
 * SSG-safe hook that reads from static config (themes.ts).
 * No database calls - theme is determined at build time.
 * 
 * Theme selection logic:
 * 1. Check routeThemeMappings for route-specific theme
 * 2. Fall back to activeTheme (default)
 * 
 * @hook
 * @example
 * const { theme, accentHsl, isDefaultTheme } = useTheme();
 * 
 * // Use theme config
 * <div style={{ color: `hsl(${accentHsl})` }}>
 *   Themed content
 * </div>
 * 
 * @returns {UseThemeResult} Theme configuration and helpers
 */
export function useTheme(): UseThemeResult {
  const location = useLocation();
  
  /**
   * Get theme for current route (memoized)
   */
  const theme = useMemo(() => {
    return getThemeForRoute(location.pathname);
  }, [location.pathname]);
  
  /**
   * Compute HSL string for accent color (memoized)
   */
  const accentHsl = useMemo(() => {
    const { h, s, l } = theme.accentConfig;
    return `${h} ${s}% ${l}%`;
  }, [theme]);
  
  const isDefaultTheme = theme.id === activeTheme.id;
  
  return {
    theme,
    accentHsl,
    isDefaultTheme,
  };
}

/**
 * useActiveTheme - Get the active (default) theme without route context
 * 
 * Useful for SSG where route context may not be available,
 * or when you explicitly want the default theme regardless of route.
 * 
 * @hook
 * @example
 * // In a context where useLocation isn't available
 * const theme = useActiveTheme();
 * 
 * @returns {ThemeConfig} The active/default theme configuration
 */
export function useActiveTheme(): ThemeConfig {
  return activeTheme;
}
