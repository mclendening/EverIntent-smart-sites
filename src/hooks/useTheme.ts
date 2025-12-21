/**
 * Theme Hook
 * 
 * Provides access to the current theme based on the route.
 * Uses static config from themes.ts - NO database calls.
 * 
 * SSG Compatible: Theme is determined at build time for static routes.
 */

import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  activeTheme, 
  getThemeForRoute, 
  type ThemeConfig 
} from '@/config/themes';

interface UseThemeResult {
  theme: ThemeConfig;
  accentHsl: string;
  isDefaultTheme: boolean;
}

/**
 * Get the current theme based on the route.
 * This hook is SSG-safe - it reads from static config.
 */
export function useTheme(): UseThemeResult {
  const location = useLocation();
  
  const theme = useMemo(() => {
    return getThemeForRoute(location.pathname);
  }, [location.pathname]);
  
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
 * Get the active (default) theme without route context.
 * Useful for SSG where route context may not be available.
 */
export function useActiveTheme(): ThemeConfig {
  return activeTheme;
}
