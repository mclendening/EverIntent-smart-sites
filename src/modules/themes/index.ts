/**
 * @fileoverview Theme module — playground accent picker only.
 *
 * The theme system is now 100% config-file driven via `src/config/themes.ts`.
 * All admin UI, DB tables, Zod schemas, services, and the GitHub sync pipeline
 * have been removed. This barrel exists only to expose the playground-scoped
 * AccentPicker (used by admin Playground pages for live preview) and to
 * re-export the runtime config helpers.
 */

// Playground accent preview (no DB, no persistence)
export {
  AccentPickerBar,
  AccentWrapper,
  useAccent,
  useAccentState,
} from './components/AccentPicker';

// Runtime theme config (re-exported from the authoritative source of truth)
export {
  activeTheme,
  getThemeForRoute,
  applyThemeToRoot,
  publishedThemes,
  routeThemeMappings,
} from '@/config/themes';
export type { ThemeConfig } from '@/config/themes';
