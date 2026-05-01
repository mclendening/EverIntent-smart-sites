/**
 * SandboxLayout - Bare layout for design prototype sandbox.
 * No header, no footer, no design tokens. Adds noindex meta + Outlet.
 */
import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';

export default function SandboxLayout() {
  useEffect(() => {
    // Inject noindex
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex, nofollow, noarchive, nosnippet';
    document.head.appendChild(meta);
    const prevTitle = document.title;
    return () => {
      document.head.removeChild(meta);
      document.title = prevTitle;
    };
  }, []);

  return (
    <>
      {/* SSR-safe noindex (also injected client-side above) */}
      <Outlet />
    </>
  );
}