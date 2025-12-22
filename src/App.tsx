/**
 * @fileoverview App Component - Root Route Outlet
 * @description Root component for vite-react-ssg. Renders child routes via Outlet.
 *              Providers and layout are handled in routes.tsx via RootLayout.
 * 
 * @module App
 * @see {@link https://docs.lovable.dev} Lovable Documentation
 * 
 * @brd-reference BRD v33.0 Section 17 - SSG Architecture
 */

import { Outlet } from 'react-router-dom';

/**
 * App - Root application component
 * 
 * This is a minimal component that just renders the route Outlet.
 * All providers, layout, and context are in routes.tsx RootLayout.
 * 
 * @component
 * @returns {JSX.Element} Route outlet
 */
const App = () => {
  return <Outlet />;
};

export default App;
