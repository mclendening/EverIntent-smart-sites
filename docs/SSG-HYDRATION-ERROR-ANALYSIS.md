# SSG Hydration Error Analysis

## Problem Summary
React hydration errors #418 and #423 persist in production Vercel deployment despite multiple fix attempts.

**Error Type:** `Hydration failed because the server rendered HTML didn't match the client.`
**Error Codes:** #418 (text content mismatch), #423 (hydration mismatch)

---

## Architecture Overview

### Tech Stack
- **Framework:** React 18.3.1 + Vite
- **SSG Library:** vite-react-ssg (v0.8.9)
- **UI Components:** Shadcn/ui built on Radix UI primitives
- **Routing:** react-router-dom v6.30.1
- **Build Output:** Static HTML pre-rendered at build time

### How vite-react-ssg Works
1. At build time, vite-react-ssg renders each route to static HTML
2. HTML is served to browsers as pre-rendered content
3. React "hydrates" the static HTML, attaching event handlers
4. **Hydration requires server HTML to match exactly what React would render client-side**

### The Hydration Problem
When server-rendered HTML differs from what React generates on first client render, React throws hydration errors. Common causes:
- Components rendering differently on server vs client
- Browser APIs accessed during SSR (window, document, localStorage)
- Portal-based components (Radix UI dialogs, sheets, dropdowns)
- Date/time values that differ between server and client
- Random IDs generated during render

---

## Root Cause Analysis

### Radix UI Portal Components
Radix UI components like `Sheet`, `Dialog`, `DropdownMenu`, and `Collapsible` create **portals** - DOM nodes rendered outside the normal component hierarchy.

**Server (SSR):**
- Portals cannot render because there's no DOM
- Radix generates placeholder refs
- Component tree structure differs from client

**Client (Hydration):**
- Portals render to `document.body`
- Refs point to actual DOM elements
- Structure differs from server-rendered HTML

### Ref Forwarding Issues
Radix components use `forwardRef` extensively. When refs are forwarded to function components (common in Shadcn), React throws:
```
Function components cannot be given refs. Attempts to access this ref will fail.
```

---

## Fix Attempts History

### Attempt 1: isMounted Pattern
**Approach:** Only render Radix components after client hydration
```tsx
const [isMounted, setIsMounted] = useState(false);
useEffect(() => setIsMounted(true), []);

return isMounted ? <RadixComponent /> : <StaticPlaceholder />;
```
**Result:** FAILED - Still caused hydration mismatch because the placeholder differs from Radix output

### Attempt 2: Conditional Rendering with Same Visual
**Approach:** Render visually identical placeholder during SSR
**Result:** FAILED - Radix internal state and attributes still differ

### Attempt 3: Remove Radix Components Entirely (CURRENT)
**Approach:** Replace Sheet, DropdownMenu, Collapsible with pure CSS/state-based divs
**Result:** TESTING - This is the current implementation

---

## Current Implementation (Header.tsx)

```tsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, ChevronDown, Globe, X } from 'lucide-react';
import { NavLink } from '@/components/NavLink';
import { Button } from '@/components/ui/button';

// Services dropdown items - Beautiful Websites at TOP per BRD
const servicesItems = [
  { title: 'Beautiful Websites', path: '/beautiful-websites', description: 'Professional websites that get you customers' },
  { title: 'Get Found Online', path: '/get-found-online', description: 'SEO and local search visibility' },
  { title: 'Never Miss a Lead', path: '/never-miss-a-lead', description: 'Lead capture and follow-up' },
  { title: 'Book More Jobs', path: '/book-more-jobs', description: 'Online booking and scheduling' },
  { title: 'Run From Your Phone', path: '/run-from-your-phone', description: 'Mobile app access' },
  { title: 'Build Your Reputation', path: '/build-your-reputation', description: 'Review automation' },
  { title: 'Let AI Handle It', path: '/let-ai-handle-it', description: 'AI automation' },
  { title: 'Domains', path: '/domains', description: 'Domain search and registration' },
];

// Industries dropdown items
const industriesItems = [
  { title: 'Home Services', path: '/industries/home-services', description: 'HVAC, Plumbing, Electrical & more' },
  { title: 'Professional Services', path: '/industries/professional-services', description: 'Legal, Real Estate, Accounting & more' },
  { title: 'Health & Wellness', path: '/industries/health-wellness', description: 'MedSpa, Dental, Chiropractic & more' },
  { title: 'Automotive Services', path: '/industries/automotive-services', description: 'Auto Repair, Detailing, Towing & more' },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileIndustriesOpen, setMobileIndustriesOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [industriesOpen, setIndustriesOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Close mobile menu on route change
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setMobileServicesOpen(false);
    setMobileIndustriesOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/20 bg-primary">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <Globe className="w-5 h-5 text-accent" />
          <span className="text-lg font-medium text-primary-foreground">EverIntent Smart Sites</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {/* Services Dropdown - Pure CSS/State based, no Radix */}
          <div className="relative">
            <Button 
              variant="ghost" 
              className="flex items-center gap-1 text-primary-foreground hover:text-primary-foreground hover:bg-primary-foreground/10"
              onClick={() => setServicesOpen(!servicesOpen)}
              onBlur={() => setTimeout(() => setServicesOpen(false), 150)}
            >
              Services
              <ChevronDown className={`h-4 w-4 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
            </Button>
            {isMounted && servicesOpen && (
              <div className="absolute top-full left-0 mt-1 w-64 bg-popover border border-border rounded-md shadow-lg z-50">
                {servicesItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="flex flex-col items-start px-3 py-2 hover:bg-muted transition-colors"
                    onClick={() => setServicesOpen(false)}
                  >
                    <span className="font-medium text-foreground">{item.title}</span>
                    <span className="text-xs text-muted-foreground">{item.description}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Industries Dropdown - Pure CSS/State based, no Radix */}
          <div className="relative">
            <Button 
              variant="ghost" 
              className="flex items-center gap-1 text-primary-foreground hover:text-primary-foreground hover:bg-primary-foreground/10"
              onClick={() => setIndustriesOpen(!industriesOpen)}
              onBlur={() => setTimeout(() => setIndustriesOpen(false), 150)}
            >
              Industries
              <ChevronDown className={`h-4 w-4 transition-transform ${industriesOpen ? 'rotate-180' : ''}`} />
            </Button>
            {isMounted && industriesOpen && (
              <div className="absolute top-full left-0 mt-1 w-64 bg-popover border border-border rounded-md shadow-lg z-50">
                {industriesItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="flex flex-col items-start px-3 py-2 hover:bg-muted transition-colors"
                    onClick={() => setIndustriesOpen(false)}
                  >
                    <span className="font-medium text-foreground">{item.title}</span>
                    <span className="text-xs text-muted-foreground">{item.description}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Static Links */}
          <Button variant="ghost" asChild className="text-primary-foreground hover:text-primary-foreground hover:bg-primary-foreground/10">
            <NavLink to="/pricing">Pricing</NavLink>
          </Button>
          <Button variant="ghost" asChild className="text-primary-foreground hover:text-primary-foreground hover:bg-primary-foreground/10">
            <NavLink to="/portfolio">Portfolio</NavLink>
          </Button>
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center space-x-2">
          <Button asChild className="bg-accent text-primary hover:bg-accent/90">
            <NavLink to="/pricing">Get Started</NavLink>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden text-primary-foreground"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          <span className="sr-only">Toggle menu</span>
        </Button>
      </div>

      {/* Mobile Menu - Simple div, no Radix Sheet */}
      {isMounted && mobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={closeMobileMenu}
          />
          {/* Menu Panel */}
          <div className="fixed top-16 right-0 bottom-0 w-80 bg-background z-50 md:hidden overflow-y-auto animate-in slide-in-from-right duration-300">
            <div className="flex flex-col space-y-4 p-6">
              {/* Services Collapsible */}
              <div>
                <button
                  className="flex items-center justify-between w-full py-2 text-lg font-medium text-foreground"
                  onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                >
                  Services
                  <ChevronDown className={`h-5 w-5 transition-transform ${mobileServicesOpen ? 'rotate-180' : ''}`} />
                </button>
                {mobileServicesOpen && (
                  <div className="pl-4 space-y-2 mt-2">
                    {servicesItems.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        className="block py-2 text-muted-foreground hover:text-foreground transition-colors"
                        onClick={closeMobileMenu}
                      >
                        {item.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Industries Collapsible */}
              <div>
                <button
                  className="flex items-center justify-between w-full py-2 text-lg font-medium text-foreground"
                  onClick={() => setMobileIndustriesOpen(!mobileIndustriesOpen)}
                >
                  Industries
                  <ChevronDown className={`h-5 w-5 transition-transform ${mobileIndustriesOpen ? 'rotate-180' : ''}`} />
                </button>
                {mobileIndustriesOpen && (
                  <div className="pl-4 space-y-2 mt-2">
                    {industriesItems.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        className="block py-2 text-muted-foreground hover:text-foreground transition-colors"
                        onClick={closeMobileMenu}
                      >
                        {item.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Static Links */}
              <Link 
                to="/pricing" 
                className="py-2 text-lg font-medium text-foreground"
                onClick={closeMobileMenu}
              >
                Pricing
              </Link>
              <Link 
                to="/portfolio" 
                className="py-2 text-lg font-medium text-foreground"
                onClick={closeMobileMenu}
              >
                Portfolio
              </Link>
              <Link 
                to="/about" 
                className="py-2 text-lg font-medium text-foreground"
                onClick={closeMobileMenu}
              >
                About
              </Link>

              {/* Mobile CTAs */}
              <div className="pt-4 border-t border-border space-y-3">
                <Button asChild className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                  <Link to="/pricing" onClick={closeMobileMenu}>Get Started</Link>
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
```

---

## Why Current Fix May Still Fail

### Problem: isMounted Pattern Creates Mismatch
The current code uses `isMounted` to conditionally render dropdowns and mobile menu:

```tsx
{isMounted && servicesOpen && (
  <div>...</div>
)}
```

**During SSR:** `isMounted` is `false`, so nothing renders
**First Client Render:** `isMounted` is still `false` (useEffect hasn't run)
**After useEffect:** `isMounted` becomes `true`

This should work because the first client render matches SSR (both have `isMounted = false`). However, the error persists.

### Potential Issues
1. **Other components** in the app may still use Radix components
2. **GHL Chat Widget** may inject DOM elements that differ
3. **Cookie Consent** component may render differently
4. **Layout.tsx** or **App.tsx** may have SSR mismatches
5. **NavLink component** may use browser APIs

---

## Other Components to Investigate

### Files That May Cause Hydration Issues:
1. `src/components/GHLChatWidget.tsx` - Uses localStorage, window APIs
2. `src/components/CookieConsent.tsx` - Uses localStorage
3. `src/components/DesktopChatButton.tsx` - Uses localStorage
4. `src/components/MobileBottomBar.tsx` - Uses localStorage
5. `src/components/layout/Layout.tsx` - Wraps all pages
6. `src/components/NavLink.tsx` - May use browser routing APIs
7. `src/App.tsx` - Root component

### Pattern to Check For:
```tsx
// BAD - Causes hydration mismatch
const value = localStorage.getItem('key'); // undefined on server, value on client

// GOOD - Check after mount
const [value, setValue] = useState(null);
useEffect(() => {
  setValue(localStorage.getItem('key'));
}, []);
```

---

## Recommended Investigation Steps

1. **Check browser console** for exact error message and component stack trace
2. **Review all components** that access browser APIs (localStorage, window, document)
3. **Search codebase** for Radix imports that may still exist
4. **Verify build output** - inspect generated HTML vs React hydration
5. **Test with minimal app** - strip components until error disappears
6. **Consider suppressHydrationWarning** as temporary debugging aid

---

## Potential Solutions

### Option A: Full Radix Removal
Remove all Radix UI components from SSG-rendered pages. Use only on client-rendered admin pages.

### Option B: Dynamic Import with ssr: false
```tsx
const Header = dynamic(() => import('./Header'), { ssr: false });
```
Note: vite-react-ssg may not support Next.js dynamic imports

### Option C: Wrap Entire App in Client Check
```tsx
function App() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  
  if (!mounted) return <StaticShell />; // Minimal SSR output
  return <FullApp />;
}
```

### Option D: Abandon SSG, Use CSR
Convert to client-side rendering only. Lose SEO benefits but eliminate hydration issues.

### Option E: Switch to Next.js
Next.js has better SSR/SSG support and more mature hydration handling.

---

## Files to Share with Other AI Tools

1. This document: `docs/SSG-HYDRATION-ERROR-ANALYSIS.md`
2. Current Header: `src/components/layout/Header.tsx`
3. GHL Widget: `src/components/GHLChatWidget.tsx`
4. Cookie Consent: `src/components/CookieConsent.tsx`
5. Layout: `src/components/layout/Layout.tsx`
6. App: `src/App.tsx`
7. Routes: `src/routes.tsx`
8. Vite config: `vite.config.ts`

---

## Version History
- v1.0 - Initial analysis document
- Date: 2025-12-17
