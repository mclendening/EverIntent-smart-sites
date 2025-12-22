/**
 * @fileoverview Main Entry Point - vite-react-ssg Bootstrap
 * @description Application entry point using vite-react-ssg for static site generation.
 *              Exports createRoot for SSG build process.
 * 
 * @module main
 * @see {@link https://docs.lovable.dev} Lovable Documentation
 * 
 * @brd-reference BRD v33.0 Section 17 - SSG Architecture
 * @brd-reference BRD v33.0 Section 17.1 - Build Configuration
 */

import { ViteReactSSG } from 'vite-react-ssg';
import { routes } from './routes';
import './index.css';

/**
 * createRoot - SSG entry point
 * 
 * Configures vite-react-ssg with route definitions.
 * Routes are pre-rendered at build time for static HTML generation.
 * 
 * @constant {ViteReactSSGContext}
 */
export const createRoot = ViteReactSSG(
  { routes },
  ({ isClient }) => {
    // Client-side initialization if needed
  },
);
