# SSG Best Practices for SEO-Perfect Static Sites

## Overview

This guide covers all gotchas and requirements for generating fully static HTML pages with perfect SEO using `vite-react-ssg`.

**IMPORTANT**: This document serves as the authoritative reference for SSG patterns in this project. All future development prompts MUST reference this guide.

---

## Project Setup Workflow (New Projects)

Setting up a new SSG project requires **three sequential prompts** to Lovable, with external service connections between prompts. This workflow establishes guardrails that prevent Lovable from accidentally breaking SSG patterns.

### Workflow Overview

```
┌─────────────────────────────────────────────────────────────────────────┐
│  PROMPT 1: Create blank Lovable project                                 │
│  ↓                                                                      │
│  USER ACTION: Connect GitHub, Vercel Pro, Supabase                      │
│  ↓                                                                      │
│  PROMPT 2: SSG infrastructure & guardrails                              │
│  ↓                                                                      │
│  PROMPT 3+: Site-specific features (always include compliance line)     │
└─────────────────────────────────────────────────────────────────────────┘
```

### Prompt 1: Initial Blank Project

**Purpose**: Create a clean foundation project.

**Copy this prompt exactly:**

```
Create a blank React project with the following:
- React 18 with TypeScript
- Tailwind CSS with a semantic token-based design system in index.css
- shadcn/ui components library configured
- React Router v6 for routing
- A basic App.tsx with a single "/" route showing a placeholder page
- A clean index.css with CSS custom properties for theming (--background, --foreground, --primary, etc.)
- All colors in HSL format

Do NOT add any complex features yet. This is a foundation project.
```

### After Prompt 1: External Connections

Complete these steps before running Prompt 2:

1. **Connect to GitHub**
   - Lovable: Settings → GitHub → Connect Repository
   - Create new repo or connect existing

2. **Connect to Vercel Pro**
   - Import GitHub repository into Vercel
   - Build command: `npm run build`
   - Output directory: `dist`
   - Framework preset: Vite

3. **Connect to Supabase**
   - Lovable: Settings → Supabase → Connect Project
   - Or use Lovable Cloud to create new project
   - Note your project URL and anon key

### Prompt 2: SSG Infrastructure & Guardrails

**Purpose**: Install SSG framework and create patterns that prevent future drift.

**Copy this prompt exactly:**

```
Set up vite-react-ssg for static site generation with full SSG infrastructure:

1. **Install vite-react-ssg** and configure vite.config.ts:
   - Use `script: 'defer'` and `formatting: 'minify'`
   - Exclude all `/admin/*` routes from SSG pre-rendering via includedRoutes filter
   - Marketing/public pages should be pre-rendered

2. **Create vercel.json** with SPA fallback rewrites:
   - Explicit rewrites for each admin route to `/index.html`:
     - /admin/reset-password
     - /admin/login
     - /admin (dashboard)
   - Wildcard `/admin/:path*` rewrite
   - General SPA fallback for dynamic routes

3. **Create src/components/ClientOnly.tsx**:
   - SSG-safe wrapper that renders null during SSR
   - Uses useState + useEffect to detect browser environment
   - Supports optional fallback prop for loading states

4. **Configure src/routes.tsx** for ViteReactSSG:
   - Export routes array compatible with ViteReactSSG
   - Direct component imports for SSG routes (no lazy loading for pre-rendered pages)
   - Admin routes wrapped in AdminLayout using ClientOnly
   - Include NotFound catch-all route

5. **Update src/main.tsx**:
   - Use ViteReactSSG for the app entry
   - Wrap with QueryClientProvider, TooltipProvider
   - Import routes from routes.tsx

6. **Create src/integrations/supabase/client.ts**:
   - Browser detection: `const isBrowser = typeof window !== 'undefined'`
   - `detectSessionInUrl: true` for auth callbacks
   - localStorage only when isBrowser is true
   - Export `processRecoveryTokens()` function for manual password reset token handling

7. **Create src/components/admin/AdminGuard.tsx**:
   - Check authentication with useAdminAuth hook
   - Show loading spinner during auth check
   - Redirect to /admin/login if not authenticated
   - Pass location state for return redirect after login

8. **Create src/pages/admin/ResetPassword.tsx**:
   - Use pageState state machine: 'loading' | 'password-form' | 'request-form' | 'success' | 'error'
   - Call processRecoveryTokens() in useEffect before checking session
   - Handle both reset request and password update flows

9. **Create docs/SSG-BEST-PRACTICES.md**:
   - Document all SSG patterns implemented
   - Include this setup workflow
   - This file serves as project knowledge for all future prompts

10. **Update public/robots.txt**:
    - Add: Disallow: /admin/

CRITICAL: This establishes the SSG architecture. All future prompts MUST follow docs/SSG-BEST-PRACTICES.md patterns. Any component using browser APIs (window, document, localStorage) MUST be wrapped in ClientOnly.
```

### Prompt 3+: Site-Specific Features

**Purpose**: Build actual site features while maintaining SSG compliance.

**EVERY site-specific prompt MUST include this compliance line at the end:**

```
Follow all patterns in docs/SSG-BEST-PRACTICES.md - wrap browser code in ClientOnly, no window/document at module level.
```

### Example Prompt 3

```
Create a marketing website homepage with:
- Hero section with headline and CTA button
- Features grid with 3 feature cards
- Testimonials section
- Footer with links

Follow all patterns in docs/SSG-BEST-PRACTICES.md - wrap browser code in ClientOnly, no window/document at module level.
```

### Example Prompt 4 (Adding Features)

```
Add a contact page with:
- Contact form (name, email, message)
- Form submits to Supabase form_submissions table
- Success/error toast notifications

Follow all patterns in docs/SSG-BEST-PRACTICES.md - wrap browser code in ClientOnly, no window/document at module level.
```

### Quick Reference: The Compliance Line

Add this exact line to the end of EVERY feature prompt:

```
Follow all patterns in docs/SSG-BEST-PRACTICES.md - wrap browser code in ClientOnly, no window/document at module level.
```

This single line instructs Lovable to:
- Reference this document before making changes
- Wrap browser-dependent components in ClientOnly
- Avoid window/document/localStorage at module level
- Keep admin routes excluded from SSG
- Maintain the established architecture

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

## 17. GoHighLevel (GHL) Chat Widget Integration

This section documents the complete GHL chat widget integration pattern used in this project.

### 17.1 Architecture Overview

```
┌────────────────────────────────────────────────────────────────────────────┐
│  Layout.tsx (Global)                                                        │
│  └─ ClientOnly                                                              │
│      ├─ MobileBottomBar (mobile nav + chat trigger)                         │
│      ├─ DesktopChatButton (desktop chat trigger)                            │
│      ├─ GHLChatWidget (lifecycle controller - renders null)                 │
│      └─ CookieConsent (must accept before GHL loads)                        │
└────────────────────────────────────────────────────────────────────────────┘
```

Key components:
- **GHLChatWidget**: Controller component (no DOM output) that manages widget lifecycle
- **DesktopChatButton**: Fixed bottom-right button for desktop (hidden on mobile)
- **MobileBottomBar**: Fixed bottom navigation bar for mobile with chat button
- **ghlLoader.ts**: Utility module for script injection, API detection, and styling fixes

### 17.2 Component Hierarchy

```tsx
// Layout.tsx - GHL components wrapped in ClientOnly for SSG safety
export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 pb-16 md:pb-0">{children}</main>
      <Footer />
      
      {/* Browser-dependent components - prevents hydration mismatches */}
      <ClientOnly>
        <MobileBottomBar />
        <DesktopChatButton />
        <GHLChatWidget />
        <CookieConsent />
      </ClientOnly>
    </div>
  );
}
```

### 17.3 Cookie Consent Gating

GHL widget only loads after user accepts cookies:

```tsx
// GHLChatWidget.tsx
const CONSENT_KEY = 'cookie-consent';

export function GHLChatWidget(): null {
  const [hasConsent, setHasConsent] = useState(false);

  // Check consent on mount and listen for changes
  useEffect(() => {
    const checkConsent = () => setHasConsent(!!localStorage.getItem(CONSENT_KEY));
    checkConsent();
    window.addEventListener('cookie-consent-changed', checkConsent);
    window.addEventListener('storage', checkConsent);
    return () => {
      window.removeEventListener('cookie-consent-changed', checkConsent);
      window.removeEventListener('storage', checkConsent);
    };
  }, []);

  // Only preload widget when consent granted
  useEffect(() => {
    if (!hasConsent) return;
    // ... load widget
  }, [hasConsent]);

  return null;
}
```

### 17.4 GHL Loader Utility (ghlLoader.ts)

Core functions:

```tsx
// Script source and configuration
const LOADER_SRC = 'https://beta.leadconnectorhq.com/chat-widget/loader.js';

// Browser detection (critical for SSG)
export function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof document !== 'undefined';
}

// Load widget and wait for API
export async function ensureGHLWidget(timeout = 12000): Promise<void> {
  if (!isBrowser()) return;  // SSG safety
  await ensureLoaderScript();
  await waitForAPI(timeout);
}

// Hide default launcher (we use custom buttons)
export function hideLauncher(): void {
  if (!isBrowser()) return;
  const widget = document.querySelector('chat-widget') as HTMLElement & { shadowRoot: ShadowRoot | null };
  if (widget?.shadowRoot) {
    const launcher = widget.shadowRoot.querySelector('button.lc_text-widget--bubble');
    if (launcher instanceof HTMLElement) {
      launcher.style.cssText =
        'display:none !important; visibility:hidden !important; pointer-events:none !important; width:0 !important; height:0 !important;';
    }
  }
}

// Open chat via available API
export function openViaAnyAPI(): boolean {
  if (window.leadConnector?.open) {
    window.leadConnector.open();
    return true;
  }
  if (window.leadConnector?.chatWidget?.openWidget) {
    window.leadConnector.chatWidget.openWidget();
    return true;
  }
  if (window.LC_API?.open_chat_window) {
    window.LC_API.open_chat_window();
    return true;
  }
  return false;
}

// Close chat via available API
export function closeViaAnyAPI(): boolean {
  if (window.leadConnector?.close) {
    window.leadConnector.close();
    return true;
  }
  if (window.leadConnector?.chatWidget?.closeWidget) {
    window.leadConnector.chatWidget.closeWidget();
    return true;
  }
  if (window.LC_API?.close_chat_window) {
    window.LC_API.close_chat_window();
    return true;
  }
  return false;
}
```

### 17.5 Global Toggle Functions

GHLChatWidget exposes global functions for custom triggers:

```tsx
// GHLChatWidget.tsx - Setup global functions
useEffect(() => {
  window.toggleGHLChat = () => {
    openViaAnyAPI();
    applyGHLComposerFixRetries(); // Apply fixes after open
  };

  window.closeGHLChat = () => {
    closeViaAnyAPI();
  };

  return () => {
    delete window.toggleGHLChat;
    delete window.closeGHLChat;
  };
}, []);

// TypeScript declaration
declare global {
  interface Window {
    toggleGHLChat?: () => void;
    closeGHLChat?: () => void;
  }
}
```

### 17.6 Desktop Chat Button Styling

The desktop button has specific styling and text:

```tsx
// DesktopChatButton.tsx
<button
  onClick={handleClick}
  onMouseEnter={() => setIsHovered(true)}
  onMouseLeave={() => setIsHovered(false)}
  className="hidden md:flex fixed right-6 z-40 items-center gap-3 px-5 py-3 
             bg-primary/95 backdrop-blur-sm border border-accent/30 rounded-lg 
             shadow-lg transition-all duration-300 ease-out 
             hover:bg-primary hover:border-accent hover:shadow-xl hover:shadow-accent/20 group"
  style={{ bottom: isVisible ? '24px' : '-80px' }}
  aria-label="Chat with our AI assistant"
>
  <Sparkles 
    className="text-accent transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12"
    size={18}
    strokeWidth={2}
  />
  <span className="text-primary-foreground font-medium text-sm tracking-wide whitespace-nowrap">
    {isHovered ? 'Chat with us' : 'Need help?'}
  </span>
  <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
</button>
```

**Desktop Button Behavior:**
- **Position**: Fixed, bottom-right corner (`right-6`, `bottom: 24px`)
- **Visibility**: Hidden until consent granted, animates up from below
- **Text**: "Need help?" (default) → "Chat with us" (on hover)
- **Icon**: Sparkles icon from lucide-react (rotates and scales on hover)
- **Indicator**: Pulsing green dot indicating live chat
- **Responsive**: `hidden md:flex` - only visible on desktop (≥768px)

### 17.7 Mobile Chat Button (MobileBottomBar)

```tsx
// MobileBottomBar.tsx - Chat button in mobile nav
<button
  onClick={handleChatClick}
  className="flex flex-col items-center justify-center flex-1 py-2 text-primary-foreground/70 
             hover:text-primary-foreground transition-colors"
  aria-label="Start chat"
>
  <MessageCircle size={22} />
  <span className="text-xs mt-1 font-medium">Chat</span>
</button>
```

**Mobile Button Behavior:**
- **Position**: Part of fixed bottom navigation bar (`bottom: 0`)
- **Text**: "Chat" with MessageCircle icon above
- **Integration**: Calls `window.toggleGHLChat()` on click

### 17.8 Z-Index Hierarchy (Critical)

```css
/* index.css - GHL widget z-index */
#chat-widget,
.chat-widget,
[class*="chat-widget"],
.leadconnector-chat {
  z-index: 40 !important;
}
```

**Z-Index Stack (bottom to top):**
1. Content: default
2. GHL Chat Widget: `z-index: 40`
3. Desktop/Mobile Chat Buttons: `z-index: 40` (same level as widget)
4. Cookie Consent Banner: `z-index: 50` (overlays everything)

This ensures:
- Chat widget doesn't cover cookie banner
- Custom trigger buttons appear at same level as widget
- Cookie consent is always accessible

### 17.9 Shadow DOM Styling Fixes

GHL uses nested shadow DOM. The composer fix injects CSS into the innermost shadow root:

```tsx
// ghlLoader.ts - Composer styling fixes
export function injectGHLComposerFix(): boolean {
  const root3 = getComposerShadowRoot(); // Navigate 3 levels of shadow DOM
  if (!root3) return false;

  const style = document.createElement('style');
  style.id = 'ei-ghl-composer-fix';
  style.textContent = `
    /* Textarea: visible caret, focus state */
    textarea.native-textarea.sc-ion-textarea-ios {
      background: ${colors.textareaBg} !important;
      color: ${colors.textareaText} !important;
      caret-color: ${colors.textareaText} !important;
      -webkit-text-fill-color: ${colors.textareaText} !important;
      border: 1px solid ${colors.textareaBorder} !important;
      border-radius: 12px !important;
      padding: 10px 12px !important;
    }

    textarea.native-textarea.sc-ion-textarea-ios:focus {
      border-color: ${colors.textareaFocusBorder} !important;
      box-shadow: 0 0 0 3px ${colors.textareaFocusGlow} !important;
    }

    /* Send button: visible background (was transparent) */
    button.live-chat-send-button {
      background-color: ${colors.sendButtonBg} !important;
      border: 1px solid ${colors.sendButtonBorder} !important;
      width: 50px !important;
      height: 50px !important;
      border-radius: 25px !important;
      opacity: 1 !important;
      visibility: visible !important;
    }

    button.live-chat-send-button svg {
      stroke: ${colors.sendButtonIcon} !important;
      fill: none !important;
      opacity: 1 !important;
    }
  `;
  root3.appendChild(style);
  return true;
}
```

**What these fixes solve:**
- Invisible text caret in textarea
- Transparent send button (not visible against background)
- Missing focus indicators
- Theme-aware colors from CSS custom properties

### 17.10 Multi-Widget Routing (Edge Function)

Widget ID is determined by route via Supabase edge function:

```tsx
// supabase/functions/ghl-config/index.ts
const ROUTE_WIDGET_MAP: Array<{ prefix: string; envKey: string }> = [
  { prefix: '/localpros', envKey: 'GHL_WIDGET_ID_LOCALPROS' },
  { prefix: '/support', envKey: 'GHL_WIDGET_ID_SUPPORT' },
  { prefix: '/help', envKey: 'GHL_WIDGET_ID_SUPPORT' },
  { prefix: '/demo', envKey: 'GHL_WIDGET_ID_DEMO' },
];

function getWidgetIdForRoute(pathname: string): string {
  for (const { prefix, envKey } of ROUTE_WIDGET_MAP) {
    if (pathname.startsWith(prefix)) {
      const widgetId = Deno.env.get(envKey);
      if (widgetId) return widgetId;
    }
  }
  // Default to sales widget
  return Deno.env.get('GHL_WIDGET_ID_SALES') || '';
}
```

**Required Supabase Secrets:**
- `GHL_WIDGET_ID_SALES` (default/fallback)
- `GHL_WIDGET_ID_SUPPORT` (optional)
- `GHL_WIDGET_ID_LOCALPROS` (optional)
- `GHL_WIDGET_ID_DEMO` (optional)

### 17.11 GHL Integration Checklist

- [ ] `GHLChatWidget` wrapped in `ClientOnly` in Layout
- [ ] `DesktopChatButton` wrapped in `ClientOnly` in Layout
- [ ] `MobileBottomBar` wrapped in `ClientOnly` in Layout
- [ ] Cookie consent check before widget load
- [ ] Global `window.toggleGHLChat()` function available
- [ ] Z-index set to 40 in index.css (below cookie banner)
- [ ] Default launcher hidden via shadow DOM manipulation
- [ ] Composer styling fixes applied via `injectGHLComposerFix()`
- [ ] Edge function `ghl-config` deployed for widget ID routing
- [ ] Required secrets configured in Supabase

### 17.12 Limitations & Fallbacks

**What GHL integration does NOT do:**
- Does not communicate with GHL API directly from frontend
- Does not store chat transcripts locally
- Does not work without cookie consent

**Hard Dependencies:**
- Cookie consent must be granted for widget to load
- GHL `loader.js` must be accessible from CDN
- Widget ID must be configured in Supabase secrets

**Fallback Behavior:**
- If GHL scripts fail: Chat buttons render but clicking does nothing
- If consent denied: Chat buttons don't render at all
- If edge function fails: Uses empty widget ID (widget won't load)
- Core site functionality remains unaffected in all failure scenarios

---

## 18. GHL Form Integration (Data Rights Request)

### 18.1 Form Architecture

The Data Rights Request page uses a custom React form that syncs to GHL via Supabase edge function:

```
┌────────────────────────────────────────────────────────────────────────────┐
│  User submits form on /legal/data-request                                   │
│  ↓                                                                          │
│  React form handler (handleSubmit)                                          │
│  ↓                                                                          │
│  supabase.functions.invoke('submit-form', { body: formData })               │
│  ↓                                                                          │
│  Edge function: saves to DB + calls ghlClient.upsertContact()               │
│  ↓                                                                          │
│  GHL contact created/updated with tags                                       │
└────────────────────────────────────────────────────────────────────────────┘
```

### 18.2 Form Implementation

```tsx
// pages/legal/DataRightsRequest.tsx
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  // Validate required fields
  if (!formData.name || !formData.email || !formData.requestType) {
    toast({ title: 'Missing required fields', variant: 'destructive' });
    return;
  }

  setIsSubmitting(true);

  try {
    const { data, error } = await supabase.functions.invoke('submit-form', {
      body: {
        form_type: 'data_rights_request',
        name: formData.name,
        email: formData.email,
        message: `Request Type: ${requestTypeLabel}\n\nDetails: ${formData.details}`,
        tcpa_consent: false,
        source_page: '/legal/data-request',
      },
    });

    if (error) throw error;
    setIsSubmitted(true);
  } catch (error) {
    toast({ title: 'Submission failed', variant: 'destructive' });
  } finally {
    setIsSubmitting(false);
  }
};
```

**Key Points:**
- **Form Type**: Custom React form (NOT GHL embed)
- **Submission**: JavaScript interception via `handleSubmit`
- **Data Flow**: Frontend → Edge Function → Supabase DB + GHL API
- **No `data-ghl-form` attribute** - GHL integration is backend-only

### 18.3 Field Mapping

| React Field | Edge Function Field | GHL Field |
|-------------|---------------------|-----------|
| `formData.name` | `name` | `firstName` / `lastName` |
| `formData.email` | `email` | `email` |
| `formData.requestType` | `message` (concatenated) | Custom field |
| `formData.details` | `message` (concatenated) | Custom field |

### 18.4 GHL Workflow Assumptions

The edge function applies tags to identify submissions:

```tsx
// supabase/functions/_shared/ghlClient.ts
// Tag applied: 'DSAR: Data Rights Request'
```

**Expected GHL Configuration:**
- Workflow triggers on tag `DSAR: Data Rights Request`
- Automation notifies compliance team
- SLA tracking for 45-day response requirement

---

## 19. Legal Page Routing

### 19.1 Route Configuration

```tsx
// routes.tsx - Legal routes under Layout
{
  path: '/',
  Component: RootLayout,
  children: [
    // ... other routes
    { path: 'legal/privacy', Component: PrivacyPolicy },
    { path: 'legal/terms', Component: TermsOfService },
    { path: 'legal/cookies', Component: CookiePolicy },
    { path: 'legal/data-request', Component: DataRightsRequest },
  ],
}
```

### 19.2 Footer Links

```tsx
// components/layout/Footer.tsx
const legalLinks = [
  { title: 'Privacy', path: '/legal/privacy' },
  { title: 'Cookies', path: '/legal/cookies' },
  { title: 'Terms', path: '/legal/terms' },
  { title: 'Data Rights', path: '/legal/data-request' },
];
```

### 19.3 SSG Pre-rendering

Legal pages are included in SSG pre-render:

```tsx
// vite.config.ts or routes.tsx prerenderRoutes
export const prerenderRoutes = [
  // ... other routes
  '/legal/privacy',
  '/legal/terms', 
  '/legal/cookies',
  '/legal/data-request',
];
```

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
- [ ] GHL widget wrapped in ClientOnly
- [ ] GHL z-index set to 40 (below cookie banner at 50)
- [ ] GHL default launcher hidden
- [ ] GHL form submissions via edge function (not direct embed)
