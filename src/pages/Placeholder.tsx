// Placeholder page component for routes not yet implemented
// Per BRD v32.1 - pages will be built incrementally
// SSG-safe: useLocation is safe during SSR with vite-react-ssg

import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SEO } from '@/components/SEO';

const Placeholder = () => {
  const location = useLocation();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  // Always derive title from pathname - this is consistent between SSR and client
  // vite-react-ssg renders each route statically, so pathname is known during SSR
  const pathSegments = location.pathname.split('/').filter(Boolean);
  const pageTitle = pathSegments.length > 0 
    ? pathSegments[pathSegments.length - 1]
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    : 'Page';

  return (
    <>
      <SEO 
        title={pageTitle}
        description={`${pageTitle} - Professional websites for local businesses`}
        noIndex
      />
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
        <h1 className="text-4xl font-bold text-foreground mb-4">{pageTitle}</h1>
        <p className="text-muted-foreground text-lg mb-8">
          This page is coming soon.
        </p>
        {/* Only show route info after mount to avoid any potential hydration issues with dynamic content */}
        {mounted && (
          <div className="text-sm text-muted-foreground/60">
            Route: <code className="bg-muted px-2 py-1 rounded">{location.pathname}</code>
          </div>
        )}
      </div>
    </>
  );
};

export default Placeholder;
