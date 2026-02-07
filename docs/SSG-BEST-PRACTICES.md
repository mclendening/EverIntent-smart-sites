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

### ✅ Use Native `<a>` Tags (Not React Router Link)

For true SSG with proper URL handling across all browsers, use native anchor tags:

```tsx
// GOOD: True static navigation, URL updates in all browsers
<a href="/services">Our Services</a>

// BAD: SPA-style client-side navigation (URL may not update in some mobile browsers)
<Link to="/services">Our Services</Link>
```

**Why native anchors for SSG?**
1. Each page loads as a fresh HTML document
2. URL updates correctly in ALL browsers (including Firefox mobile)
3. Search engines follow links naturally
4. No JavaScript required for navigation
5. Matches the static nature of pre-rendered pages

### ✅ Descriptive Link Text

```tsx
// GOOD: Descriptive anchor text
<a href="/services/seo">Learn about our SEO services</a>

// BAD: Generic anchor text
<a href="/services/seo">Click here</a>
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

### 17.11 GHL Environment Variables & Secrets (Complete Reference)

All GHL-related secrets are stored in Supabase Edge Function Secrets (NOT in frontend code).

#### Chat Widget Secrets

| Secret Name | Required | Description |
|-------------|----------|-------------|
| `GHL_WIDGET_ID` | Yes | Legacy fallback widget ID |
| `GHL_WIDGET_ID_SALES` | Yes | Default sales chat widget |
| `GHL_WIDGET_ID_SUPPORT` | No | Support/help pages widget |
| `GHL_WIDGET_ID_LOCALPROS` | No | LocalPros network widget |
| `GHL_WIDGET_ID_DEMO` | No | Demo request pages widget |

#### API & CRM Secrets

| Secret Name | Required | Description |
|-------------|----------|-------------|
| `GHL_API_TOKEN` | Yes | GoHighLevel API v2 bearer token |
| `GHL_LOCATION_ID` | Yes | GHL sub-account/location ID |
| `GHL_RESUME_CUSTOM_FIELD_ID` | No | Custom field for resume uploads (job applications) |
| `GHL_VIDEO_LINK_CUSTOM_FIELD_ID` | No | Custom field for video intro links |

#### How to Configure

1. **Get Widget IDs from GHL:**
   - GHL Dashboard → Sites → Chat Widget → Settings → Widget ID
   - Each widget has a unique ID (looks like: `abc123def456...`)

2. **Get API Token:**
   - GHL Dashboard → Settings → Business Profile → API Keys
   - Create new API key with appropriate scopes (Contacts, Custom Fields, Tags)

3. **Get Location ID:**
   - GHL Dashboard → Settings → Business Info → Location ID
   - Or from URL: `https://app.gohighlevel.com/location/YOUR_LOCATION_ID/...`

4. **Add to Supabase:**
   - Supabase Dashboard → Edge Functions → Secrets
   - Add each secret with exact name and value

#### Widget ID Selection Logic

```
Route visited → ghl-config edge function called
                         ↓
              Check route prefix matches
                         ↓
        ┌────────────────┼────────────────┐
        ↓                ↓                ↓
   /localpros/*     /support/*       /demo/*
        ↓                ↓                ↓
GHL_WIDGET_ID_    GHL_WIDGET_ID_   GHL_WIDGET_ID_
   LOCALPROS          SUPPORT           DEMO
        ↓                ↓                ↓
        └────────────────┼────────────────┘
                         ↓
              No match? Use fallback:
        GHL_WIDGET_ID_SALES → GHL_WIDGET_ID
```

#### Minimum Required for Basic Setup

For a basic single-widget setup, you need:

```bash
# Supabase Edge Function Secrets (minimum)
GHL_WIDGET_ID_SALES=your_widget_id_here
GHL_API_TOKEN=your_api_token_here
GHL_LOCATION_ID=your_location_id_here
```

#### Form Submission Secrets

For form submissions that sync to GHL (like Data Rights Request):

```bash
# Required for any GHL form integration
GHL_API_TOKEN=your_api_token_here
GHL_LOCATION_ID=your_location_id_here

# Optional: Custom fields for file uploads
GHL_RESUME_CUSTOM_FIELD_ID=field_id_for_resumes
GHL_VIDEO_LINK_CUSTOM_FIELD_ID=field_id_for_video_links
```

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

## 20. Legal Page Content Templates

This section provides the actual content structure and text for all legal pages. Copy these templates when setting up a new site.

### 20.1 Privacy Policy Content

**File:** `src/pages/legal/PrivacyPolicy.tsx`

**SEO Metadata:**
```tsx
<SEO
  title="Privacy Policy | {CompanyName}"
  description="{CompanyName} Privacy Policy - Learn how we collect, use, and protect your data. We never sell personal information."
/>
```

**Required Sections:**

#### Section 1: Data We Collect
```
Contact Information:
- Name and business name
- Email address
- Phone number
- Mailing address
- Payment information (processed securely via Stripe)

Usage Data:
- IP address and location data
- Browser type and version
- Pages visited and time spent
- Referring website
- Device information

Cookies & Tracking:
- We use cookies, pixels, and similar technologies to analyze site usage 
  and improve your experience. See our Cookie Policy for details.
```

#### Section 2: How We Use Your Data
```
- Deliver Services: Build your website, provide support, and fulfill your orders
- Communicate: Send project updates, respond to inquiries, and provide customer service
- Marketing: Send promotional emails (with your consent, you may opt out anytime)
- Analytics: Understand how visitors use our site to improve our services
- Fraud Prevention: Protect against unauthorized transactions and abuse
- Legal Compliance: Meet legal and regulatory requirements
```

#### Section 3: Who We Share Data With
```
Service Providers: GoHighLevel (CRM), Stripe (payments), Vercel (hosting), Supabase (database)
Legal Requirements: When required by law, subpoena, or to protect our rights
Business Transfers: In the event of a merger, acquisition, or sale of assets

[Highlighted Box]
"We never sell your personal data. Your information is not sold to advertisers, 
data brokers, or any third parties."
```

#### Section 4: Call & SMS Recording Disclosure
```
Calls and text messages to or from {CompanyName} may be recorded for quality 
assurance and training purposes. By communicating with us via phone or SMS, 
you consent to such recording. We use AI-powered systems for some communications, 
which will identify themselves at the start of the call.
```

#### Section 5: Data Retention
| Data Type | Retention Period |
|-----------|------------------|
| Customer Data | Duration of relationship + 7 years |
| Lead Information | 3 years from last contact |
| Analytics Data | 26 months |

#### Section 6: Your Rights (California/CCPA)
```
- Right to Know: Request what personal information we have collected about you
- Right to Delete: Request deletion of your personal information
- Right to Opt-Out: Opt out of the sale of personal information (we do not sell your data)
- Right to Non-Discrimination: We will not discriminate against you for exercising your rights

To exercise these rights, submit a request via our Data Rights Request page 
or email privacy@{domain}.com.
```

#### Section 7: LocalPros Network Disclosure (if applicable)
```
[Info Box]
This site is part of the LocalPros Network, operated by {CompanyName}. 
Leads generated through this site may be shared with the business featured 
on this site and {CompanyName} for service fulfillment.
```

#### Section 8: Security
```
We implement industry-standard security measures including encryption, 
secure data storage, and access controls. However, no method of transmission 
over the Internet is 100% secure, and we cannot guarantee absolute security.
```

#### Section 9: Children's Privacy
```
Our services are not directed to individuals under 18 years of age. 
We do not knowingly collect personal information from children. 
If we learn we have collected such information, we will delete it promptly.
```

#### Section 10: Changes to This Policy
```
We may update this Privacy Policy from time to time. We will notify you of 
any material changes by posting the new policy on this page and updating 
the "Last updated" date. Continued use of our services after changes 
constitutes acceptance of the updated policy.
```

#### Section 11: Contact Us
```
{CompanyName}
{Street Address}
{City, State ZIP}
Email: privacy@{domain}.com
```

---

### 20.2 Terms of Service Content

**File:** `src/pages/legal/TermsOfService.tsx`

**SEO Metadata:**
```tsx
<SEO
  title="Terms of Service | {CompanyName}"
  description="{CompanyName} Terms of Service - Service agreement, payment terms, refund policy, and legal terms for web design services."
/>
```

**Required Sections:**

#### Section 1: Agreement to Terms
```
By accessing or using {CompanyName}'s website and services, you agree to be 
bound by these Terms of Service and our Privacy Policy. If you do not agree 
to these terms, do not use our services.

These terms constitute a legally binding agreement between you and 
{CompanyName} ("{CompanyName}," "we," "us," or "our").
```

#### Section 2: Services Description
```
{CompanyName} provides web design, development, hosting, and automation 
services for local service businesses. Our services are offered in tiers:

- Smart Site (T1): One-time website build with essential features
- Smart Lead (T2): Website with lead capture and CRM integration
- Smart Business (T3): Full business management suite with automation
- Smart Growth (T4): Advanced features with AI automation and priority support
- Smart Launch: Rush delivery option for faster project completion

Each tier includes specific features as described on our pricing page at 
the time of purchase.
```

#### Section 3: Payment Terms
```
- One-Time Fees: Setup fees are charged at checkout and due immediately
- Monthly Subscriptions: Recurring fees are billed on the same day each month
- Payment Processing: All payments are processed securely via Stripe
- Accepted Methods: Major credit cards (Visa, Mastercard, American Express, Discover)
- Taxes: Sales tax is calculated and collected where required by law
```

#### Section 4: Refund & Cancellation Policy
```
[Highlighted Box - Before Work Begins]
A full refund is available if you cancel before receiving the 
"Work Commencement" email notification. Once you receive this email, 
your project is in active development and no refund is available.

[Standard Box - After Work Begins]
No refunds are available once work has commenced. You may cancel your 
subscription at any time; service continues through the end of your 
billing period.

[Standard Box - Monthly Subscriptions]
Cancel anytime via the customer portal or by contacting support. 
No partial-month refunds are provided.

[Small Italic Note]
Note: California Civil Code §1723 applies to retail goods, not services. 
Web design services are not subject to statutory cooling-off periods.
```

#### Section 5: Work Commencement Notification
```
Within 1-2 business days of payment, you will receive an email titled 
"Your Project Is Starting." This email includes:
- Reminder of our refund policy
- Expected project timeline
- Intake form link (if not already completed)
- Your dedicated project contact information

[Bold] This email triggers the closure of the refund window.
```

#### Section 6: Chargeback Policy
```
If you believe there is an error with your charge, please contact us at 
billing@{domain}.com within 60 days. We will investigate and resolve 
legitimate disputes promptly.

[Warning Box]
Important Notice: Filing a chargeback after receiving services, or for a 
transaction you authorized, may be considered fraud. We maintain detailed 
records of all transactions, communications, and service delivery. We 
reserve the right to pursue fraudulent chargebacks through appropriate 
legal channels and report them to credit bureaus.
```

#### Section 7: Portfolio & Marketing Rights
```
During checkout, you may opt-in to allow us to feature your website in 
our portfolio with the checkbox: "You may feature my completed website 
in your portfolio."

If opted-in, we may:
- Display screenshots of your website
- Describe the project scope and results
- Link to the live website in marketing materials

You may request removal from our portfolio at any time after launch by 
contacting support.

[Small Italic]
LocalPros network sites: Hosted on our platform by default; portfolio 
rights are included in the standard agreement.
```

#### Section 8: Hosting & Service Level Agreement
| Metric | Value |
|--------|-------|
| Uptime Target | 99.5% (excluding scheduled maintenance) |
| Maintenance Window | Sundays 2-6am PT (48-hour notice provided) |
| Support Response | Within 24 business hours |
| Backups | Daily, retained 30 days |

#### Section 9: Intellectual Property
```
- Design Work: Customer owns the final deliverable upon full payment
- Templates & Code: Templates, frameworks, and code libraries remain 
  the property of {CompanyName}
- Customer Content: Customer represents they have rights to all content 
  provided for the website
```

#### Section 10: Limitation of Liability
```
- Maximum Liability: Our total liability is limited to the amount you paid 
  us in the 12 months prior to any claim
- Exclusions: We are not liable for indirect, consequential, or punitive 
  damages; lost profits; or data loss
- Customer Responsibility: Customer is responsible for content accuracy, 
  domain renewals (if self-managed), and third-party integrations
```

#### Section 11: Dispute Resolution
```
- Informal Resolution: Contact support@{domain}.com first to resolve disputes
- Mediation: Disputes will be mediated in {County}, {State}
- Governing Law: These terms are governed by the laws of the State of {State}
- Small Claims: Either party may pursue claims in appropriate small claims court
```

#### Section 12: Termination
```
We may terminate for:
- Non-payment (after 7-day grace period)
- Violation of these Terms of Service
- Abusive behavior toward our team

Customer may terminate:
- Anytime via the customer portal or by emailing support

Post-termination:
- Data retained 30 days for export, then permanently deleted
```

#### Section 13: Modifications
```
We may update these Terms of Service with 30-day notice via email. 
Continued use of our services after the notice period constitutes 
acceptance of the updated terms.
```

#### Section 14: Contact Us
```
{CompanyName}
{Street Address}
{City, State ZIP}
Email: legal@{domain}.com
```

---

### 20.3 Cookie Policy Content

**File:** `src/pages/legal/CookiePolicy.tsx`

**SEO Metadata:**
```tsx
<SEO
  title="Cookie Policy | {CompanyName}"
  description="{CompanyName} Cookie Policy - Learn about the cookies we use and how to manage your preferences."
/>
```

**Required Sections:**

#### Manage Preferences CTA (Top of Page)
```
[Highlighted Box with Button]
Manage Your Cookie Preferences
You can change your cookie settings at any time.
[Cookie Settings Button - triggers triggerCookiePreferences()]
```

#### Section 1: What Are Cookies?
```
Cookies are small text files that are placed on your device when you 
visit a website. They help the website remember your preferences, 
understand how you use the site, and improve your experience.

We also use similar technologies such as:
- Pixels/Web Beacons: Tiny images that track page views and conversions
- Local Storage: Browser storage that persists data across sessions
- Session Storage: Temporary storage cleared when you close your browser
```

#### Section 2: Cookie Categories Table
| Category | Purpose | Examples | Can Disable? |
|----------|---------|----------|--------------|
| Strictly Necessary | Essential site functionality and security | Session cookies, CSRF tokens, authentication | No |
| Analytics | Track usage patterns to improve our site | Google Analytics, page view tracking | Yes |
| Marketing | Advertising, retargeting, conversion tracking | Facebook Pixel, Google Ads | Yes |
| Functional | Remember preferences, enable features | Theme preference, chat widget, cookie consent | Yes |

#### Section 3: Strictly Necessary Cookies
```
These cookies are essential for the website to function and cannot be disabled:
- cookie-consent: Remembers your cookie preferences
- Session cookies: Maintain your session while browsing
- Security tokens: Protect against cross-site request forgery (CSRF)
```

#### Section 4: Analytics Cookies
```
We use analytics cookies to understand how visitors interact with our 
website. This helps us improve our content and user experience.

[Info Box - Google Analytics]
We use Google Analytics to collect anonymous usage data including pages 
visited, time on site, and traffic sources. This data is aggregated and 
does not identify individual visitors.
```

#### Section 5: Marketing Cookies
```
Marketing cookies are used to track visitors across websites for 
advertising purposes.

[Info Box - Facebook/Meta Pixel]
Tracks conversions from Facebook ads and enables retargeting to website visitors.

[Info Box - Google Ads]
Tracks conversions from Google advertising campaigns.
```

#### Section 6: Functional Cookies
```
Functional cookies enable enhanced features and personalization.

[Info Box - GoHighLevel Chat Widget]
Powers our live chat and AI assistant features. Stores conversation 
history and preferences to provide better support.
```

#### Section 7: Third-Party Cookies Table
| Provider | Purpose | Privacy Policy |
|----------|---------|----------------|
| Google | Analytics, Ads | policies.google.com/privacy |
| Meta/Facebook | Advertising, Pixel | facebook.com/privacy/policy |
| GoHighLevel | Chat, CRM | gohighlevel.com/privacy-policy |

#### Section 8: Managing Cookies
```
You can control and manage cookies in several ways:

On Our Website:
Use our Cookie Settings to accept or decline optional cookies.

Browser Settings:
Most browsers allow you to refuse or accept cookies. Here are links to 
manage cookies in popular browsers:
- Google Chrome: support.google.com/chrome/answer/95647
- Mozilla Firefox: support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer
- Safari: support.apple.com/guide/safari/manage-cookies-sfri11471/mac
- Microsoft Edge: support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge

[Note Box]
Disabling certain cookies may affect website functionality. Strictly 
necessary cookies cannot be disabled and are required for basic site operation.
```

#### Section 9: Contact Us
```
{CompanyName}
Email: privacy@{domain}.com
```

---

### 20.4 Data Rights Request Content

**File:** `src/pages/legal/DataRightsRequest.tsx`

**SEO Metadata:**
```tsx
<SEO
  title="Data Rights Request | {CompanyName}"
  description="Submit a data rights request to {CompanyName}. Exercise your CCPA rights to know, delete, or correct your personal data."
/>
```

**Page Header:**
```
[Shield Icon] Data Rights Request

Exercise your privacy rights under the California Consumer Privacy Act 
(CCPA) and other applicable laws.
```

**Form Fields:**
| Field | Type | Required | Placeholder/Options |
|-------|------|----------|---------------------|
| Full Name | text input | Yes | "Your full legal name" |
| Email Address | email input | Yes | "email@example.com" |
| Request Type | select dropdown | Yes | See options below |
| Additional Details | textarea | No | "Provide any additional information..." |
| Verification | checkbox | Yes | See verification text below |

**Request Type Options:**
```tsx
const REQUEST_TYPES = [
  { value: 'know', label: 'Know what data we have about me' },
  { value: 'delete', label: 'Delete my personal data' },
  { value: 'correct', label: 'Correct inaccurate data' },
  { value: 'opt-out', label: 'Opt-out of marketing communications' },
  { value: 'other', label: 'Other request' },
];
```

**Verification Checkbox Text:**
```
I understand that {CompanyName} will need to verify my identity before 
processing this request. I certify that the information provided is 
accurate and that I am authorized to make this request.
```

**Sidebar Content:**

Response Time Box:
```
Response Time
We will respond to all verified requests within 45 days as required by 
CCPA. Complex requests may take up to 90 days with notification.
```

Your Rights Box:
```
Your Rights
• Right to Know: Learn what personal data we collect and how we use it
• Right to Delete: Request deletion of your personal information
• Right to Correct: Fix inaccurate personal data
• Right to Opt-Out: Stop receiving marketing communications
• Non-Discrimination: We will not penalize you for exercising your rights
```

Alternative Contact Box:
```
Prefer Email?
You can also submit requests directly to:
privacy@{domain}.com
```

**Success State:**
```
[CheckCircle Icon] Request Received

Thank you for submitting your data rights request. We will verify your 
identity and respond within 45 days as required by CCPA.

A confirmation email has been sent to {submitted_email}
```

---

### 20.5 Legal Page Implementation Checklist

For each new site, ensure:

- [ ] All legal pages use semantic design tokens (no hardcoded colors)
- [ ] Company name, address, and emails replaced with actual values
- [ ] `lastUpdated` date set to current date
- [ ] All links between legal pages working (`/legal/privacy`, `/legal/cookies`, etc.)
- [ ] Cookie Settings button properly triggers `triggerCookiePreferences()`
- [ ] Data Rights form submits to `submit-form` edge function
- [ ] GHL tags configured for form submissions
- [ ] All pages included in `prerenderRoutes` array
- [ ] Footer links map to correct routes
- [ ] SEO component with unique title/description per page

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
- [ ] GHL secrets configured in Supabase (minimum: GHL_WIDGET_ID_SALES, GHL_API_TOKEN, GHL_LOCATION_ID)
- [ ] All four legal pages created with correct content
- [ ] Legal page routes added to footer links
