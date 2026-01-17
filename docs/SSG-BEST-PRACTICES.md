# SSG Best Practices for SEO-Perfect Static Sites

## Overview

This guide covers all gotchas and requirements for generating fully static HTML pages with perfect SEO using `vite-react-ssg`.

---

## 1. Route Configuration Requirements

### ✅ Correct: Direct Component Imports (SSG-Compatible)

```tsx
// routes.tsx - Components must be directly imported, NOT lazy loaded
import HomePage from './pages/Index';
import AboutPage from './pages/About';
import ContactPage from './pages/Contact';

export const routes: RouteRecord[] = [
  { path: '/', element: <HomePage /> },
  { path: '/about', element: <AboutPage /> },
  { path: '/contact', element: <ContactPage /> },
];
```

### ❌ Wrong: Lazy Loading Breaks SSG

```tsx
// This will NOT pre-render - pages will be empty HTML shells
const HomePage = lazy(() => import('./pages/Index'));
```

### ✅ Correct: Export prerenderRoutes Array

```tsx
// routes.tsx - Explicitly list all routes for SSG
export const prerenderRoutes = [
  '/',
  '/about',
  '/contact',
  '/services',
  '/services/web-design',
  '/services/seo',
  // ... every single route you want pre-rendered
];
```

---

## 2. Main Entry Point (main.tsx)

### ✅ Correct SSG Entry

```tsx
import { ViteReactSSG } from 'vite-react-ssg';
import { routes } from './routes';
import './index.css';

export const createRoot = ViteReactSSG(
  { routes },
  ({ isClient }) => {
    // Client-side only initialization
  },
);
```

### ❌ Wrong: Using createRoot from react-dom

```tsx
// This is CSR only - no static HTML generated
import { createRoot } from 'react-dom/client';
createRoot(document.getElementById('root')!).render(<App />);
```

---

## 3. Vite Configuration (vite.config.ts)

### ✅ Correct SSG Config

```ts
export default defineConfig({
  ssgOptions: {
    script: 'defer',           // Defer JS loading
    formatting: 'minify',       // Minify HTML output
    
    // Control which routes get pre-rendered
    includedRoutes: (paths: string[]) => {
      // Exclude admin/auth routes (CSR only)
      return paths.filter(path => !path.startsWith('/admin'));
    },
  },
});
```

### ❌ Wrong: Manual Chunks Break SSG

```ts
// This causes "external module" errors with vite-react-ssg
build: {
  rollupOptions: {
    output: {
      manualChunks: { ... }  // DO NOT USE
    }
  }
}
```

---

## 4. Hydration Mismatch Prevention

### Problem: Browser-Only Code Runs During SSG Build

SSG runs your React code in Node.js - there's no `window`, `document`, `localStorage`, etc.

### ✅ Solution: ClientOnly Wrapper Component

```tsx
// components/ClientOnly.tsx
import { useState, useEffect, ReactNode } from 'react';

interface ClientOnlyProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export function ClientOnly({ children, fallback = null }: ClientOnlyProps) {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  return mounted ? <>{children}</> : <>{fallback}</>;
}
```

### ✅ Usage: Wrap Browser-Dependent Components

```tsx
// In your layout or page
import { ClientOnly } from '@/components/ClientOnly';
import { CookieConsent } from '@/components/CookieConsent';
import { ChatWidget } from '@/components/ChatWidget';

function Layout({ children }) {
  return (
    <div>
      <Header />
      <main>{children}</main>
      <Footer />
      
      {/* These only render on client - no hydration mismatch */}
      <ClientOnly>
        <CookieConsent />
        <ChatWidget />
      </ClientOnly>
    </div>
  );
}
```

### Components That MUST Be Wrapped in ClientOnly:

- Cookie consent banners
- Chat widgets (Intercom, Drift, GHL, etc.)
- Analytics scripts
- Authentication state displays
- LocalStorage-dependent UI
- Window size/scroll listeners
- Third-party embeds (Twitter, YouTube, etc.)
- Anything using `navigator`, `window`, `document`

---

## 5. SEO Component Requirements

### ✅ Correct: Helmet/Meta Tags in Every Page

```tsx
// components/SEO.tsx
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  noindex?: boolean;
}

export function SEO({ title, description, canonical, ogImage, noindex }: SEOProps) {
  const siteUrl = 'https://yoursite.com';
  const fullCanonical = canonical ? `${siteUrl}${canonical}` : undefined;
  
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {fullCanonical && <link rel="canonical" href={fullCanonical} />}
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      {fullCanonical && <meta property="og:url" content={fullCanonical} />}
      {ogImage && <meta property="og:image" content={ogImage} />}
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      
      {/* Robots */}
      {noindex && <meta name="robots" content="noindex,nofollow" />}
    </Helmet>
  );
}
```

### ✅ Usage in Every Page

```tsx
// pages/Services.tsx
export default function ServicesPage() {
  return (
    <>
      <SEO 
        title="Our Services | Company Name"
        description="Professional web design, SEO, and digital marketing services. Get a free consultation today."
        canonical="/services"
      />
      <main>
        <h1>Our Services</h1>
        {/* Page content */}
      </main>
    </>
  );
}
```

---

## 6. Sitemap Generation

### ✅ Auto-Generated sitemap.xml

Create a script or use the routes array:

```ts
// scripts/generate-sitemap.ts
import { prerenderRoutes } from '../src/routes';
import fs from 'fs';

const siteUrl = 'https://yoursite.com';

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://schemas.sitemaps.org/sitemap/0.9">
${prerenderRoutes.map(route => `  <url>
    <loc>${siteUrl}${route}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${route === '/' ? 'daily' : 'weekly'}</changefreq>
    <priority>${route === '/' ? '1.0' : '0.8'}</priority>
  </url>`).join('\n')}
</urlset>`;

fs.writeFileSync('public/sitemap.xml', sitemap);
```

### ✅ robots.txt

```txt
# public/robots.txt
User-agent: *
Allow: /

# Block admin routes
Disallow: /admin/
Disallow: /admin

Sitemap: https://yoursite.com/sitemap.xml
```

---

## 7. Static Content Rules

### ✅ Content Must Be Available at Build Time

```tsx
// GOOD: Static content renders in HTML
export default function AboutPage() {
  return (
    <div>
      <h1>About Our Company</h1>
      <p>We've been in business since 2010...</p>
    </div>
  );
}
```

### ❌ Dynamic Content Won't Be in Static HTML

```tsx
// BAD: This fetches on client - empty HTML at build
export default function AboutPage() {
  const [content, setContent] = useState('');
  
  useEffect(() => {
    fetch('/api/about').then(r => r.json()).then(setContent);
  }, []);
  
  return <div>{content}</div>; // Empty in static HTML!
}
```

### ✅ Solution for Dynamic Content: Fetch at Build Time

```tsx
// For SSG with dynamic data, use getStaticData (if supported)
// Or pre-generate content and import as static JSON
import aboutContent from '@/data/about.json';

export default function AboutPage() {
  return (
    <div>
      <h1>{aboutContent.title}</h1>
      <p>{aboutContent.body}</p>
    </div>
  );
}
```

---

## 8. Image Optimization

### ✅ Correct: Import Images as Modules

```tsx
// Images are optimized and bundled
import heroImage from '@/assets/hero.jpg';

export default function HomePage() {
  return <img src={heroImage} alt="Hero banner" loading="lazy" />;
}
```

### ✅ Always Include Alt Text

```tsx
// GOOD: Descriptive alt text for SEO
<img src={teamPhoto} alt="Our team of web designers in Austin office" />

// BAD: Empty or missing alt
<img src={teamPhoto} alt="" />
<img src={teamPhoto} />
```

---

## 9. Semantic HTML Structure

### ✅ Every Page Must Have:

```tsx
export default function Page() {
  return (
    <>
      <SEO title="..." description="..." />
      
      {/* Single H1 per page */}
      <main>
        <h1>Primary Page Heading (with target keyword)</h1>
        
        <section aria-labelledby="section-1">
          <h2 id="section-1">Section Heading</h2>
          <p>Content...</p>
        </section>
        
        <section aria-labelledby="section-2">
          <h2 id="section-2">Another Section</h2>
          <article>
            <h3>Subsection</h3>
            <p>More content...</p>
          </article>
        </section>
      </main>
    </>
  );
}
```

### Semantic Elements Checklist:

- `<header>` - Site header/nav
- `<nav>` - Navigation menus
- `<main>` - Primary content (one per page)
- `<section>` - Thematic content groups
- `<article>` - Self-contained content
- `<aside>` - Sidebars, related content
- `<footer>` - Site footer

---

## 10. Internal Linking

### ✅ Use React Router Link (Not `<a>` Tags)

```tsx
import { Link } from 'react-router-dom';

// GOOD: SPA navigation, no full reload
<Link to="/services">Our Services</Link>

// BAD: Causes full page reload
<a href="/services">Our Services</a>
```

### ✅ Descriptive Link Text

```tsx
// GOOD: Descriptive anchor text
<Link to="/services/seo">Learn about our SEO services</Link>

// BAD: Generic anchor text
<Link to="/services/seo">Click here</Link>
```

---

## 11. Structured Data (JSON-LD)

### ✅ Add Schema Markup in SEO Component

```tsx
// For business/organization pages
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Company Name",
  "url": "https://yoursite.com",
  "logo": "https://yoursite.com/logo.png",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+1-555-123-4567",
    "contactType": "sales"
  }
};

<Helmet>
  <script type="application/ld+json">
    {JSON.stringify(organizationSchema)}
  </script>
</Helmet>
```

---

## 12. Build Verification Checklist

After running `npm run build` (or `vite-react-ssg build`):

### Check dist/ folder:

1. **Every route has an HTML file**
   ```
   dist/
   ├── index.html           ✓ Homepage
   ├── about/
   │   └── index.html       ✓ About page
   ├── services/
   │   ├── index.html       ✓ Services index
   │   ├── web-design/
   │   │   └── index.html   ✓ Service subpage
   ```

2. **HTML files contain actual content**
   ```bash
   # Check that content is pre-rendered
   grep -l "Our Services" dist/services/index.html
   ```

3. **Meta tags are present**
   ```bash
   # Check for meta description
   grep "meta name=\"description\"" dist/index.html
   ```

4. **Sitemap exists and is valid**
   ```bash
   # Validate sitemap
   cat dist/sitemap.xml
   ```

---

## 13. Common SSG Errors & Fixes

### Error: "window is not defined"

**Cause**: Browser API used during SSG build  
**Fix**: Wrap in `ClientOnly` or check `typeof window !== 'undefined'`

### Error: "document is not defined"

**Cause**: DOM manipulation during SSG  
**Fix**: Move to `useEffect` or wrap in `ClientOnly`

### Error: Hydration mismatch

**Cause**: Server HTML differs from client render  
**Fix**: Ensure identical render paths, use `ClientOnly` for dynamic content

### Error: Empty HTML files generated

**Cause**: Lazy loading or async data fetching  
**Fix**: Direct imports, static content at build time

### Error: "external module" in build

**Cause**: `manualChunks` in Rollup config  
**Fix**: Remove `manualChunks` from vite.config.ts

---

## 14. SSG vs CSR Route Split

### Marketing Pages (SSG)
- Homepage
- About
- Services
- Contact
- Blog posts
- Legal pages

### Admin/Auth Pages (CSR Only)
- Login
- Dashboard
- User settings
- Protected routes

```ts
// vite.config.ts
ssgOptions: {
  includedRoutes: (paths) => paths.filter(p => !p.startsWith('/admin'))
}
```

---

## 15. Admin Route Implementation (CSR-Only Pattern)

Admin routes require special handling to work correctly with SSG while supporting authentication flows like password reset.

### 15.1 Route Architecture

Admin routes use a separate layout without the marketing Header/Footer:

```tsx
// routes.tsx - Admin routes structure
export const routes: RouteRecord[] = [
  // Marketing routes with Layout
  {
    path: '/',
    Component: RootLayout,
    children: [
      { index: true, Component: Index },
      // ... marketing pages
    ],
  },
  // Admin routes (CSR only, not pre-rendered)
  {
    path: '/admin',
    Component: AdminLayout,
    children: [
      { path: 'login', Component: AdminLogin },
      { path: 'reset-password', Component: AdminResetPassword },
      {
        index: true,
        element: (
          <AdminGuard>
            <AdminDashboard />
          </AdminGuard>
        ),
      },
      // ... other protected admin pages
    ],
  },
];
```

### 15.2 AdminLayout Pattern

Admin layout follows the same SSG-safe patterns as RootLayout but without marketing components:

```tsx
function AdminLayout() {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {/* ScrollToTop uses window/document APIs, must be client-only */}
      <ClientOnly>
        <ScrollToTop />
      </ClientOnly>
      <Suspense fallback={<div className="min-h-screen" />}>
        <Outlet />
      </Suspense>

      {/* Portal-based components wrapped in ClientOnly */}
      <ClientOnly>
        <TooltipProvider>
          <Toaster />
          <Sonner />
        </TooltipProvider>
      </ClientOnly>
    </QueryClientProvider>
  );
}
```

### 15.3 AdminGuard Component

Protected routes use AdminGuard for authentication enforcement:

```tsx
// components/admin/AdminGuard.tsx
import { Navigate, useLocation } from 'react-router-dom';
import { useAdminAuth } from '@/hooks/useAdminAuth';

export function AdminGuard({ children }: { children: ReactNode }) {
  const { user, isAdmin, isLoading } = useAdminAuth();
  const location = useLocation();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  // Redirect with error if not admin
  if (!isAdmin) {
    return <Navigate to="/admin/login" state={{ error: 'Access denied.' }} replace />;
  }

  return <>{children}</>;
}
```

Key patterns:
- Show loading state while checking auth
- Preserve original location for redirect after login
- Pass error messages via navigation state

### 15.4 SSG-Safe Supabase Client Configuration

The Supabase client must be configured for both SSG builds (Node.js) and browser runtime:

```tsx
// integrations/supabase/client.ts
const isBrowser = typeof window !== 'undefined';

export const supabase = createClient<Database>(
  SUPABASE_URL, 
  SUPABASE_ANON_KEY, 
  {
    auth: {
      storage: isBrowser ? localStorage : undefined,
      persistSession: isBrowser,
      autoRefreshToken: isBrowser,
      detectSessionInUrl: true, // Always true - SSR doesn't have URL hash
      flowType: 'pkce',
    }
  }
);
```

### 15.5 Password Reset Flow

Password reset requires special handling for URL hash tokens. This is the recommended pattern:

```tsx
// pages/admin/ResetPassword.tsx

/**
 * Manually process recovery tokens from URL hash.
 * Required because hash fragments aren't sent to server.
 */
export async function processRecoveryTokens(): Promise<boolean> {
  if (typeof window === 'undefined') return false;
  
  const hash = window.location.hash;
  if (!hash) return false;
  
  const params = new URLSearchParams(hash.substring(1));
  const accessToken = params.get('access_token');
  const refreshToken = params.get('refresh_token');
  const type = params.get('type');
  
  if (type === 'recovery' && accessToken && refreshToken) {
    const { data, error } = await supabase.auth.setSession({
      access_token: accessToken,
      refresh_token: refreshToken,
    });
    
    if (!error && data.session) {
      // Clear hash from URL for clean state
      window.history.replaceState(null, '', window.location.pathname);
      return true;
    }
  }
  
  return false;
}
```

### 15.6 ResetPassword Page State Machine

The reset password page should handle multiple states:

```tsx
type PageState = 'loading' | 'password-form' | 'request-form' | 'success' | 'request-sent';

export default function ResetPassword() {
  const [pageState, setPageState] = useState<PageState>('loading');

  useEffect(() => {
    const initialize = async () => {
      // 1. Try to process recovery tokens from URL hash
      const recoveryProcessed = await processRecoveryTokens();
      if (recoveryProcessed) {
        setPageState('password-form');
        return;
      }

      // 2. Check for existing session
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setPageState('password-form');
        return;
      }

      // 3. No valid session - show request form
      setPageState('request-form');
    };

    // Set up auth listener for PASSWORD_RECOVERY events
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if ((event === 'PASSWORD_RECOVERY' || event === 'SIGNED_IN') && session) {
        setPageState('password-form');
      }
    });

    initialize();
    return () => subscription.unsubscribe();
  }, []);

  // Render based on pageState...
}
```

### 15.7 Login Page Pattern

Login pages should handle navigation state for redirects and errors:

```tsx
export default function AdminLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAdmin, isLoading: authLoading } = useAdminAuth();

  // Get error from navigation state (e.g., from AdminGuard)
  const stateError = location.state?.error as string | undefined;

  // Redirect if already authenticated as admin
  useEffect(() => {
    if (!authLoading && user && isAdmin) {
      const from = location.state?.from?.pathname || '/admin';
      navigate(from, { replace: true });
    }
  }, [user, isAdmin, authLoading, navigate, location.state]);

  // Render login form...
}
```

### 15.8 robots.txt for Admin Routes

Always block admin routes from search engines:

```txt
# public/robots.txt
User-agent: *
Allow: /

# Block admin routes
Disallow: /admin/
Disallow: /admin

Sitemap: https://yoursite.com/sitemap.xml
```

### 15.9 Admin Route Checklist

- [ ] Admin routes excluded from SSG via `includedRoutes` filter
- [ ] Separate AdminLayout without marketing Header/Footer
- [ ] AdminGuard protects authenticated routes
- [ ] Login page handles navigation state for redirects/errors
- [ ] Password reset properly processes URL hash tokens
- [ ] Supabase client configured for browser detection
- [ ] Auth state listener set up before checking existing session
- [ ] Loading states shown during auth verification
- [ ] robots.txt blocks `/admin/` from crawlers

---

## 16. Performance Optimizations

### ✅ Defer Non-Critical JS

```ts
ssgOptions: {
  script: 'defer',  // Adds defer to script tags
}
```

### ✅ Lazy Load Images Below Fold

```tsx
<img src={image} alt="..." loading="lazy" />
```

### ✅ Preload Critical Assets

```tsx
<Helmet>
  <link rel="preload" href="/fonts/main.woff2" as="font" crossOrigin="" />
</Helmet>
```

---

## Quick Reference Card

| Requirement | ✅ Do | ❌ Don't |
|-------------|-------|---------|
| Imports | Direct imports | `lazy()` imports |
| Browser APIs | `ClientOnly` wrapper | Direct `window`/`document` |
| Navigation | `<Link to="...">` | `<a href="...">` |
| Content | Static at build | `useEffect` fetch |
| Meta tags | Every page | Missing/duplicate |
| Heading | Single `<h1>` | Multiple/missing `<h1>` |
| Alt text | Descriptive | Empty/missing |
| Sitemap | Auto-generated | Manual/missing |
| Build config | `ssgOptions` | `manualChunks` |
| Admin routes | CSR via `includedRoutes` | Pre-rendered |
| Auth guard | Loading state first | Immediate redirect |
| Password reset | Process URL hash tokens | Rely on auto-detection |

---

## Implementation Checklist for New Sites

- [ ] Use `vite-react-ssg` in main.tsx
- [ ] Direct component imports (no lazy loading for SSG routes)
- [ ] Export `prerenderRoutes` array
- [ ] Configure `ssgOptions` in vite.config.ts
- [ ] Create `ClientOnly` wrapper component
- [ ] Wrap browser-dependent components
- [ ] SEO component with meta tags
- [ ] Unique `<title>` and `<meta description>` per page
- [ ] Single `<h1>` per page with keyword
- [ ] Semantic HTML structure
- [ ] `<Link>` instead of `<a>` for internal navigation
- [ ] Alt text on all images
- [ ] JSON-LD structured data
- [ ] sitemap.xml generation
- [ ] robots.txt with sitemap reference
- [ ] Build verification (HTML content check)
- [ ] Admin routes excluded from SSG
- [ ] AdminGuard with proper loading states
- [ ] Password reset with URL hash token processing
- [ ] SSG-safe Supabase client configuration
