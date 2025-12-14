// Placeholder page component for routes not yet implemented
// Per BRD v32.1 - pages will be built incrementally

import { useLocation } from 'react-router-dom';
import { SEO } from '@/components/SEO';

const Placeholder = () => {
  const location = useLocation();
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
        title={`${pageTitle} | EverIntent SmartSites`}
        description={`${pageTitle} - Professional websites for local businesses`}
      />
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
        <h1 className="text-4xl font-bold text-foreground mb-4">{pageTitle}</h1>
        <p className="text-muted-foreground text-lg mb-8">
          This page is coming soon.
        </p>
        <div className="text-sm text-muted-foreground/60">
          Route: <code className="bg-muted px-2 py-1 rounded">{location.pathname}</code>
        </div>
      </div>
    </>
  );
};

export default Placeholder;
