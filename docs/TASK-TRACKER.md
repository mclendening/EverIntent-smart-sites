# EverIntent - Task Tracker

> **Brand:** EverIntent | **Tagline:** Web Design & Automation  
> **BRD Version:** v34.0 (Brand Pivot)

## Complete Implementation Checklist (In Order)

Tasks marked `[MANUAL]` require user action. Tasks marked `[LOVABLE]` are AI-implemented.

---

## Primary Reference Documents

| Document | Path | Purpose |
|----------|------|---------|
| **BRD v34.0** | `docs/smartsites-brd-v33.0.md` | Single source of truth for all requirements |
| **Brand Pivot Plan** | `docs/everintent-pivot-plan.md` | Brand architecture, trademark context, implementation phases |
| **PRD Prompt** | `docs/smartsites-prd-prompt.md` | Verbatim marketing copy for all pages |

**Key Brand Guidelines (from Pivot Plan):**
- Master brand: **EverIntent** (not "SmartSites by EverIntent")
- Tagline: **"Web Design & Automation"**
- Use "smart website(s)" / "smart site" as **lowercase descriptive language**, not a brand name
- Tier names: Smart Site, Smart Lead, Smart Business, Smart Growth, Smart Launch
- All logos, headers, footers use **EverIntent** only
- ❌ Never use "SmartSites" as a brand name or logo lockup
- ❌ Never bid on "SmartSites" as a Google Ads keyword

**Navigation Structure (v34):**
```
Smart Websites | AI & Automation | Industries | Solutions | Pricing | Our Work | About
```

**PRD Copy Rules:** All marketing pages MUST use exact copy from PRD - no improvisation.

---

## Phase 0: Prerequisites

### Task 0.1 [MANUAL] - Create GHL Private Integration Token
**Status:** ✅ Complete

1. Log into GoHighLevel at https://app.gohighlevel.com
2. Click **Settings** (gear icon, bottom left)
3. Click **Integrations** → **Private Integrations**
4. Click **Create New Integration**
5. Name it: `SmartSites API`
6. Enable scopes: `contacts.write`, `contacts.read`, `opportunities.write`, `tags.write`, `custom-fields.read`
7. Click **Create**
8. **Copy the API Token** (you'll need this for Task 0.4)

### Task 0.2 [MANUAL] - Get GHL Location ID
**Status:** ✅ Complete

1. In GHL, click **Settings** → **Business Profile**
2. Look at the URL in your browser: `https://app.gohighlevel.com/v2/location/XXXXXXXXXX/...`
3. **Copy the Location ID** (the `XXXXXXXXXX` part after `/location/`)

### Task 0.3 [MANUAL] - Create GHL Custom Fields
**Status:** ✅ Complete (reused from Legal AI project)

1. In GHL, go to **Settings** → **Custom Fields**
2. Click **+ Add Field**
3. Create these fields:

| Field Name | Field Type | Notes |
|------------|------------|-------|
| `Resume URL` | Text | For careers applications |
| `Video Link` | Text | For video submissions |

4. After creating each field, click on it to view details
5. Look at the URL: `https://app.gohighlevel.com/v2/location/.../settings/custom-fields/FIELD_ID`
6. **Copy each Field ID** (you'll need these for Task 0.4)

### Task 0.4 [MANUAL] - Create GHL Tags
**Status:** ✅ Complete

1. In GHL, go to **Settings** → **Tags**
2. Click **+ Create Tag** for each:

| Tag Name | Purpose |
|----------|---------|
| `EI: Checkout Started - T1` | Tier 1 checkout initiated |
| `EI: Checkout Started - T2` | Tier 2 checkout initiated |
| `EI: Checkout Started - T3` | Tier 3 checkout initiated |
| `EI: Checkout Started - T4` | Tier 4 checkout initiated |
| `EI: Contact Form` | Contact form submission |
| `LP: Partner Apply` | LocalPros partner application |
| `Careers: Application` | Job application submitted |

> Note: Tags updated from "SS:" to "EI:" prefix per brand pivot.

### Task 0.5 [MANUAL] - Add Supabase Secrets (GHL)
**Status:** ✅ Complete

1. Go to Supabase Dashboard: https://supabase.com/dashboard/project/nweklcxzoemcnwaoakvq/settings/functions
2. Click **Add Secret** for each:

| Secret Name | Value Source |
|-------------|--------------|
| `GHL_API_TOKEN` | From Task 0.1 |
| `GHL_LOCATION_ID` | From Task 0.2 |
| `GHL_RESUME_CUSTOM_FIELD_ID` | From Task 0.3 (Resume URL field) |
| `GHL_VIDEO_LINK_CUSTOM_FIELD_ID` | From Task 0.3 (Video Link field) |

---

## Phase 1: Database Foundation

### Task 1.1 [LOVABLE] - Run Database Migrations
**Status:** ✅ Complete

Creates:
- `form_submissions` table (unified form storage with form_type discriminator)
- `jobs` table (career postings)
- `job_applications` table (career applications)
- GHL sync columns on `checkout_submissions`
- `resumes` Supabase Storage bucket
- RLS policies for all tables

### Task 1.2 [LOVABLE] - Create Shared GHL Client Library
**Status:** ✅ Complete

Creates `supabase/functions/_shared/ghlClient.ts` with:
- `ghlHeaders()` - auth headers
- `getLocationId()` - get location from env
- `upsertContact()` - create/update GHL contact
- `addTags()` - apply tags to contact
- `addNote()` - add note to contact
- `uploadFileToCustomField()` - resume uploads
- `getCustomFields()` - fetch all custom fields (for admin tool)

### Task 1.3 [LOVABLE] - Create Edge Functions
**Status:** ✅ Complete

Creates:
- `start-checkout` - initiates checkout, creates GHL contact with tier tag
- `submit-form` - handles contact/LocalPros forms
- `submit-job-application` - handles career applications
- `ghl-admin-fields` - queries GHL for custom field IDs (admin tool, requires auth)

---

## Phase 1.5: Theme Publishing System

> **Purpose:** Enable one-click publishing of theme configurations from admin to GitHub repository, eliminating manual copy-paste workflow.
> **BRD Reference:** `docs/BRD-theming-system.md`

### Task 1.5.0 [LOVABLE] - Wire Up Theme Application
**Status:** ✅ Complete

Updated `src/routes.tsx`:
- Added `ThemeProvider` component that wraps RootLayout children
- Calls `applyThemeToRoot()` on route change
- Theme CSS variables now dynamically applied based on `src/config/themes.ts`

**How it works:**
1. `index.css` = SSG baseline (prevents flash on initial load)
2. `themes.ts` = static config (source of truth, committed via GitHub publish)
3. `applyThemeToRoot()` = client-side override for route-based switching

### Task 1.5.1 [MANUAL] - Add GitHub Secrets to Supabase
**Status:** ✅ Complete

| Secret Name | Value |
|-------------|-------|
| `GITHUB_PAT` | Personal Access Token with `repo` scope |
| `GITHUB_REPO_OWNER` | `mclendening` |
| `GITHUB_REPO_NAME` | `EverIntent-smart-sites` |

### Task 1.5.2 [LOVABLE] - Create sync-theme-to-github Edge Function
**Status:** ✅ Complete

Created `supabase/functions/sync-theme-to-github/index.ts`:
- Fetches active theme from `published_theme_configs` table
- Commits to `src/config/themes.ts` via GitHub API
- Returns commit SHA and URL on success
- Requires JWT auth (admin only)

### Task 1.5.3 [LOVABLE] - Add Publish to GitHub Button in Admin
**Status:** ✅ Complete

Updated `src/pages/admin/Themes.tsx`:
- Added "Publish to GitHub" button with GitHub icon
- Shows loading spinner during publish
- Displays success message with commit link
- Saves to `published_theme_configs` table before GitHub sync

### Task 1.5.4 [LOVABLE] - Save Config to Database Before GitHub Sync
**Status:** ✅ Complete (merged into Task 1.5.3)

Publish flow:
1. Generates TypeScript config from active theme in `site_themes`
2. Saves to `published_theme_configs` with version number
3. Calls edge function which reads from database and commits to GitHub

### Database Tables (Reference)

| Table | Purpose |
|-------|---------|
| `site_themes` | Theme definitions (10 seed themes exist) |
| `logo_versions` | Logo configurations |
| `page_theme_assignments` | Route → theme mappings |
| `published_theme_configs` | Published configs for GitHub sync |

**Current Active Theme in DB:** Indigo Night (but `themes.ts` has Golden Amber - will sync on first publish)

---

## Phase 1.6: Theme System Completion

> **Purpose:** Complete all gaps in theme system: CSS variable coverage, logo integration, admin CRUD, export functionality.

### Task 1.6.1 [LOVABLE] - Header Logo Integration
**Status:** ✅ Complete

Header.tsx now uses `<LogoRenderer />` component with theme accent:
```tsx
<LogoRenderer 
  scale={0.42} 
  showTagline={true}
  accentHsl={activeTheme.accent}
/>
```

### Task 1.6.2 [LOVABLE] - Missing CSS Variables in ThemeConfig
**Status:** 🔄 In Progress

**Completed:**
- `accent_config` now includes `hoverBrightness` and `iconGlowOpacity` (added 2024-12-22)

**Still Missing:**
| Variable | Purpose |
|----------|---------|
| `--intent-blue` | Brand color for "Intent" in logo |
| `--highlight` / `--highlight-foreground` | Success/highlight color |
| `--destructive` / `--destructive-foreground` | Error states |
| `--radius` | Border radius |
| `--shadow-sm/md/lg/xl` | Shadow system |
| `--shadow-glow/glow-lg/button` | Glow shadows |
| `--sidebar-*` (7 vars) | Sidebar styling |
| `--gradient-glow` | Radial glow gradient |
| `--gradient-mesh` | Mesh background gradient |

### Task 1.6.3 [LOVABLE] - Admin Theme CRUD Gaps
**Status:** 🔄 In Progress

**Completed:**
- Basic accent config controls (H/S/L)
- Logo preview with theme accent
- Theme publish to GitHub workflow

**Still Needed:**
- Surface `hoverBrightness` and `iconGlowOpacity` controls in UI
- Intent blue color (logo brand color)
- Highlight/destructive colors
- Border radius
- Shadow system (all 7 shadow vars)
- Sidebar colors (7 vars)
- Mesh/glow gradients

### Task 1.6.4 [LOVABLE] - Logo Export (SVG/PNG)
**Status:** ⬜ Not Started

`LogoRenderer` renders to DOM but lacks export capability.

**Requirements:**
- Export as SVG (vector, scalable)
- Export as PNG (raster, with configurable resolution)
- Available in LogoExplorer and/or Admin Themes

### Task 1.6.5 [LOVABLE] - Logo Theme Testing
**Status:** ✅ Complete

LogoRenderer correctly applies theme accent:
- Admin Themes page shows logo preview with accent color
- Header renders LogoRenderer with activeTheme.accent
- Scale prop works correctly (0.42 in header)

### Task 1.6.6 [LOVABLE] - Cleanup LogoExplorer
**Status:** ⬜ Not Started

`LogoExplorer` page has its own inline logo rendering instead of using `LogoRenderer`.

**Fix:** Refactor to use `LogoRenderer` with passed config.

---

## Phase 2: Cookie Consent & GHL Widget

### Task 2.1 [LOVABLE] - Create Cookie Consent Component
**Status:** ✅ Complete

Created `src/components/CookieConsent.tsx` with:
- Cookie banner UI with Accept/Decline buttons
- localStorage consent storage (`cookie-consent` key)
- `cookie-consent-changed` event dispatch
- Footer "Cookie Preferences" integration via `triggerCookiePreferences()`
- Integrated into Layout.tsx

### Task 2.2 [MANUAL] - Create GHL Chat Widgets (3 Bots)
**Status:** ⬜ Not Started

Create 3 separate GHL chat widgets with different training/personas:

| Widget | Purpose | Training Focus |
|--------|---------|----------------|
| **Sales Bot** | Pricing/checkout pages | Conversion, pricing questions, upsells, urgency |
| **Support Bot** | Contact/legal/help pages | FAQ, support inquiries, data requests |
| **Demo Bot** | Homepage, services, industries | Feature showcase, capability demonstration |

**Steps for each widget:**
1. In GHL, go to **Sites** → **Chat Widget**
2. Click **Create New Widget**
3. Name it appropriately (e.g., "SmartSites Sales Bot")
4. Configure AI training/prompt for the specific persona
5. Set launcher icon to **1x1 pixel** (for code-based control)
6. **Copy the Widget ID** from the embed code

### Task 2.3 [MANUAL] - Configure Vercel Pro Environment Variables
**Status:** ⬜ Not Started

> **Architecture:** Environment variables exist in TWO places:
> - **Lovable `.env` file:** Required for Lovable preview/development (already configured)
> - **Vercel Pro dashboard:** Required for production deployment (must mirror `.env`)
>
> Both must contain the same values. The `.env` file is committed to repo for Lovable; Vercel reads from its dashboard.

1. Go to Vercel Dashboard → Your Project → **Settings** → **Environment Variables**
2. Add ALL of the following (Production, Preview, Development):

| Name | Value | Notes |
|------|-------|-------|
| `VITE_SUPABASE_PROJECT_ID` | `nweklcxzoemcnwaoakvq` | Supabase project identifier |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | `eyJhbGci...` (full key) | Supabase anon/public key |
| `VITE_SUPABASE_URL` | `https://nweklcxzoemcnwaoakvq.supabase.co` | Supabase API URL |
| `VITE_GHL_LOCATION_ID` | `glz9nLlYe04lb1B4TLFC` | GHL location ID |
| `VITE_GHL_WIDGET_ID` | `694220dc4ca1823bfbe5f213` | Current single widget (to be split in Task 2.2) |
| `VITE_GHL_WIDGET_ID_SALES` | *(from Task 2.2)* | Sales bot widget ID |
| `VITE_GHL_WIDGET_ID_SUPPORT` | *(from Task 2.2)* | Support bot widget ID |
| `VITE_GHL_WIDGET_ID_DEMO` | *(from Task 2.2)* | Demo bot widget ID |

**Why VITE_ prefix?** Vite requires this prefix to expose env vars to client-side code.

### Task 2.4 [LOVABLE] - Create GHL Widget Components (Multi-Widget)
**Status:** 🔄 Partial

**Completed:**
- `src/lib/ghlLoader.ts` - Widget loader with hideLauncher shadow DOM penetration
- `src/components/GHLChatWidget.tsx` - Basic widget component
- `src/components/DesktopChatButton.tsx` - Custom "Need help?" button with hover effects
- `src/components/MobileBottomBar.tsx` - Mobile chat trigger

**Still Needed:**
- Multi-widget support (route-aware widget selection)
- Environment variable integration for widget IDs

### Task 2.5 [LOVABLE] - Create Legal Pages
**Status:** ⬜ Not Started

> **Source:** BRD v34.0 Section 21.1

Create 4 legal pages for EverIntent and LocalPros portfolio sites:

| Page | Route | Component |
|------|-------|-----------|
| Privacy Policy | `/legal/privacy` | `src/pages/legal/PrivacyPolicy.tsx` |
| Terms of Service | `/legal/terms` | `src/pages/legal/TermsOfService.tsx` |
| Cookie Policy | `/legal/cookies` | `src/pages/legal/CookiePolicy.tsx` |
| Data Rights Request | `/legal/data-request` | `src/pages/legal/DataRightsRequest.tsx` |

**Requirements per BRD 21.1:**

**Privacy Policy:**
- Data collection, usage, sharing sections
- Call/SMS recording disclosure
- "We never sell personal data" statement
- Data retention periods (customer: 7 years, leads: 3 years, analytics: 26 months)
- CCPA rights (know, delete, opt-out, non-discrimination)
- LocalPros lead disclosure paragraph

**Terms of Service:**
- Payment terms (one-time + monthly subscriptions)
- Refund policy: Full refund before "Work Commencement" email; no refunds after
- Chargeback policy with fraud deterrence language
- Portfolio/marketing rights (opt-in at checkout)
- Hosting SLA (99.5% uptime, 24hr support response)
- IP ownership (customer owns deliverable, EI retains templates/code)
- Limitation of liability (12-month cap)
- Dispute resolution (Orange County, CA)
- Termination and modification clauses

**Cookie Policy:**
- Cookie categories table (Necessary, Analytics, Marketing, Functional)
- Third-party cookies list (Google, Facebook, GHL)
- Browser settings + privacy settings links

**Data Rights Request:**
- Form: Name, Email, Request Type dropdown, Details textarea
- Request types: Know | Delete | Correct | Opt-out | Other
- 45-day response commitment
- Verification acknowledgment checkbox

**Database Migration (if needed):**
- Add `data_rights_requests` table for DSAR submissions

**Footer Integration:**
- Add links to all 4 legal pages in Footer.tsx

---

## Phase 3: Core Marketing Pages

> **Source:** BRD v34.0 + `docs/smartsites-prd-prompt.md`

### Task 3.0 [LOVABLE] - Implement Brand Pivot (Phase 1)
**Status:** ⬜ Not Started

Update core branding per `docs/everintent-pivot-plan.md`:
- **Header.tsx** — Logo: "EverIntent" with tagline "Web Design & Automation"
- **Footer.tsx** — Same logo treatment, "Products" → "Solutions" column, add "For Law Firms" external link
- **SEO.tsx** — SITE_NAME: "EverIntent", update DEFAULT_DESCRIPTION
- **routes.ts** — Update descriptions to use EverIntent branding

### Task 3.0.1 [LOVABLE] - Update Navigation Structure
**Status:** ⬜ Not Started

Per BRD v34 Section 17:
- **Smart Websites dropdown** — Rename from "Services", reorder items (Smart Websites first, Let AI Handle It second)
- **AI & Automation** — Add as second nav item → `/services/ai-automation`
- **Solutions dropdown** — Add new nav item with: For Law Firms (external → everintentlegalai.com), future verticals
- Keep: Industries, Pricing, Our Work, About

### Task 3.0.2 [LOVABLE] - Create NavHoverMenu Component
**Status:** ⬜ Not Started

Create `src/components/NavHoverMenu.tsx` for desktop navigation dropdowns:

**Requirements:**
- `NavHoverItem` interface: `to`, `title`, `description?`, `icon?`, `nestedItems?`, `external?`
- Lucide icons rendered with `text-primary` color, `h-5 w-5` size
- Item layout: icon aligned to top, title (font-medium), description (text-xs text-muted-foreground)
- Container: `w-80`, `bg-background` (solid), `z-50`, `shadow-lg`, `border border-border`
- Hover state: `hover:bg-accent`
- Support external links (opens in new tab)
- Update `Header.tsx` to use NavHoverMenu for Smart Websites, Industries, and Solutions dropdowns

**Smart Websites Dropdown Items (v34):**
| Title | Description | Icon |
|-------|-------------|------|
| **Smart Websites** | Professional smart websites starting at $249 | `Globe` |
| **Let AI Handle It** | AI automation and voice agents | `Bot` |
| Get Found Online | SEO and local search visibility | `Search` |
| Capture More Leads | Lead capture and follow-up | `MessageSquare` |
| Reputation Management | Review automation | `Star` |

**Reference:** BRD Section 17.4 NavHoverMenu Component Specification

### Task 3.1 [LOVABLE] - Create Reusable Section Components
**Status:** ⬜ Not Started

Create `src/components/sections/` with reusable marketing page sections:

| Component | Purpose | PRD Reference |
|-----------|---------|---------------|
| `HeroSection.tsx` | Hero with H1, subhead, dual CTAs | Lines 912-924 |
| `ProblemSection.tsx` | "Sound Familiar?" pain point cards | Lines 562-565 |
| `SolutionSection.tsx` | Feature cards with icons | Lines 567-570 |
| `WhatsIncludedSection.tsx` | Bulleted deliverables with tier badges | Lines 572-574 |
| `TestimonialSection.tsx` | Social proof carousel | Lines 576-578 |
| `CTASection.tsx` | Final conversion section | Lines 579-582 |

### Task 3.2 [LOVABLE] - Homepage (/)
**Status:** ⬜ Not Started

**Sections (in order):**
1. **Hero** - "A Professional Website That Actually Gets You Customers" + "Built in 5 days. Starting at $249. You own everything." + [Get Started → /pricing] + [Book a Call → /contact]
2. **Problem** - "Sound Familiar?" with 4 pain point cards
3. **Solution** - 7 service cards linking to individual service pages
4. **Tier Preview** - 4 tier cards (T1-T4) with key features, CTA to /pricing
5. **Social Proof** - Testimonials placeholder + stats
6. **Final CTA** - Benefit restatement with dual CTAs

**SEO:** Title "Professional Websites for Local Businesses | SmartSites"

### Task 3.3 [LOVABLE] - Smart Websites Service Page (/smart-websites)
**Status:** ⬜ Not Started

> **Source:** PRD lines 584-612 (update copy for "Smart Websites" branding)

**H1:** "Smart Websites That Pay For Themselves"
**Subhead:** "Built in 5 days. Starting at $249. Ready for AI when you are."

**H1:** "A Professional Website That Actually Gets You Customers"
**Subhead:** "Built in 5 days. Starting at $249. You own everything."

**Problem Points (4):**
- You know you need a website but the options are overwhelming
- DIY builders take forever and still look amateur
- Agencies quote $5,000+ and take months
- You're losing customers to competitors with better sites

**Solution Features (5):**
- **5-Page Professional Site** — Home, Services, About, Contact, plus one more
- **Mobile-First Design** — 70% of your customers search on their phone
- **Built in 5 Days** — Not 5 weeks. We move fast.
- **You Own Everything** — Your domain, your content, your site. No lock-in.
- **SEO-Ready** — Google can find you from day one

**What's Included (All Tiers):**
- Custom 5-page website
- Mobile-responsive design
- Contact form with email notifications
- Google Maps integration
- Basic SEO setup (meta tags, schema)
- SSL certificate
- 1 year hosting (T1) / Ongoing hosting (T2-T4)
- GA4 analytics dashboard

### Task 3.4 [LOVABLE] - Pricing Page (/pricing)
**Status:** ⬜ Not Started

> **Source:** PRD lines 33-44, 807-809

**H1:** "Simple, Transparent Pricing"

**4-Column Tier Comparison Table:**

| Feature | T1 Smart Site ($249) | T2 Smart Lead ($97/mo) | T3 Smart Business ($197/mo) | T4 Smart Growth ($497/mo) |
|---------|---------------------|----------------------|---------------------------|-------------------------|
| Who It's For | Just need a professional web presence | Ready to capture and convert more leads | Need to streamline operations | Ready for full automation and growth |
| Website | ✓ | ✓ | ✓ | ✓ |
| Lead Capture | - | ✓ | ✓ | ✓ |
| Mobile App | - | ✓ | ✓ | ✓ |
| Scheduling | - | - | ✓ | ✓ |
| Reputation | - | - | Basic | Full |
| AI Voice | - | - | - | ✓ |

**Each Tier Card:** Name, price, tagline, feature list, CTA → /checkout/{tier-slug}

**Footer Notes:** T1 renewal at $149/year, no hidden fees

### Task 3.5 [LOVABLE] - Remaining 6 Service Pages
**Status:** ⬜ Not Started

Build after Tasks 3.2-3.4 are complete. Each follows same structure with copy from PRD:

| Route | H1 | PRD Lines |
|-------|-----|-----------|
| `/get-found-online` | "Show Up When Customers Search For What You Do" | 615-641 |
| `/never-miss-a-lead` | "Every Customer Inquiry Answered. Even When You Can't." | 645-672 |
| `/book-more-jobs` | "Stop Playing Phone Tag. Let Customers Book Online." | 675-701 |
| `/run-from-your-phone` | "Run Your Entire Business From Your Pocket" | 705-731 |
| `/build-your-reputation` | "More 5-Star Reviews. Less Chasing Customers For Them." | 735-762 |
| `/let-ai-handle-it` | "Your 24/7 Receptionist. For Less Than Minimum Wage." | 765-793 |

---

## Phase 4: Checkout Flow

### Task 4.1 [MANUAL] - Create Stripe Account & Products
**Status:** ⬜ Not Started

1. Go to https://dashboard.stripe.com
2. Create products for each tier (T1-T4)
3. Get your **Secret Key**: Developers → API Keys → Secret key
4. Get your **Publishable Key**: Developers → API Keys → Publishable key

### Task 4.2 [MANUAL] - Add Stripe Secrets
**Status:** ⬜ Not Started

1. **Supabase Secrets** (https://supabase.com/dashboard/project/nweklcxzoemcnwaoakvq/settings/functions):

| Secret Name | Value |
|-------------|-------|
| `STRIPE_SECRET_KEY` | Your Stripe secret key (sk_live_... or sk_test_...) |

2. **Vercel Environment Variables** (Project Settings → Environment Variables):

| Name | Value | Environment |
|------|-------|-------------|
| `VITE_STRIPE_PUBLISHABLE_KEY` | Your Stripe publishable key (pk_live_... or pk_test_...) | All |

### Task 4.3 [LOVABLE] - Build Checkout Pages & Components
**Status:** ⬜ Not Started

---

## Phase 5: LocalPros

### Task 5.1 [LOVABLE] - LocalPros Landing Page
**Status:** ⬜ Not Started

### Task 5.2 [LOVABLE] - LocalPros Apply Form
**Status:** ⬜ Not Started

---

## Phase 6: Careers

### Task 6.1 [LOVABLE] - Public Job Listing Page
**Status:** ⬜ Not Started

### Task 6.2 [LOVABLE] - Job Application Form
**Status:** ⬜ Not Started

### Task 6.3 [LOVABLE] - Admin Careers CRUD
**Status:** ⬜ Not Started

---

## Phase 7: Legal Pages & Utilities

### Task 7.1 [LOVABLE] - Privacy Policy Page
**Status:** ⬜ Not Started

### Task 7.2 [LOVABLE] - Terms of Service Page
**Status:** ⬜ Not Started

### Task 7.3 [LOVABLE] - Cookie Settings Page
**Status:** ⬜ Not Started

### Task 7.4 [LOVABLE] - Data Rights Request Page
**Status:** ⬜ Not Started

---

## Phase 8: Analytics

### Task 8.1 [MANUAL] - Create Google Analytics Property
**Status:** ⬜ Not Started

1. Go to https://analytics.google.com
2. Click **Admin** (gear icon)
3. Click **Create Property**
4. Enter property name: `EverIntent`
5. Select **Web** platform
6. Enter your domain URL
7. **Copy the Measurement ID** (starts with `G-`)

### Task 8.2 [MANUAL] - Add GA4 to Vercel
**Status:** ⬜ Not Started

1. Go to Vercel Dashboard → Your Project → **Settings** → **Environment Variables**
2. Add:

| Name | Value | Environment |
|------|-------|-------------|
| `VITE_GA_MEASUREMENT_ID` | Your GA4 Measurement ID (G-XXXXXXXXXX) | Production |

### Task 8.3 [LOVABLE] - Integrate GA4 Script
**Status:** ⬜ Not Started

---

## Quick Reference: Where Things Go

| Item | Location | Access |
|------|----------|--------|
| Private API keys (GHL_API_TOKEN, STRIPE_SECRET_KEY) | Supabase Secrets | Edge Functions only |
| GHL custom field IDs | Supabase Secrets | Edge Functions only |
| Public keys (VITE_*) | Vercel Env Vars | Browser (frontend) |
| Local dev keys | `.env` file | Local only |

---

## Current Status

**BRD Version:** v34.0 (Brand Pivot to EverIntent Master Brand)

**Completed:** 
- Phase 0 (Prerequisites) - All GHL configuration complete
- Phase 1 (Database Foundation) - All migrations and Edge Functions deployed
- **Phase 1.5 (Theme Publishing System)** - All tasks complete:
  - Task 1.5.1: GitHub secrets added to Supabase
  - Task 1.5.2: sync-theme-to-github edge function created
  - Task 1.5.3: Publish to GitHub button added to admin
  - Task 1.5.4: Database save before GitHub sync (merged into 1.5.3)
- Task 2.1 (Cookie Consent) - Component complete and integrated
- SSG Configuration - vite-react-ssg patterns documented in BRD Appendix H
- Brand Pivot Documentation - BRD v34.0 + everintent-pivot-plan.md aligned

**In Progress:** Phase 2 (Tasks 2.2-2.4 need multi-widget GHL setup)

**Next Priority Tasks (Brand Pivot Implementation):**
1. **Task 3.0** - Implement Brand Pivot Phase 1 [LOVABLE] - Header/Footer/SEO branding
2. **Task 3.0.1** - Update Navigation Structure [LOVABLE] - Smart Websites dropdown, Solutions nav
3. **Task 3.0.2** - Create NavHoverMenu Component [LOVABLE]
4. Task 2.2 - Create GHL Chat Widgets (3 Bots) [MANUAL] - Can proceed in parallel
5. Task 3.1 - Create Reusable Section Components [LOVABLE]
6. Task 3.2 - Homepage [LOVABLE]

**Key References:**
- BRD v34.0: `docs/smartsites-brd-v33.0.md`
- Brand Pivot: `docs/everintent-pivot-plan.md`
- PRD Copy: `docs/smartsites-prd-prompt.md`

**SSG Status:** ✅ Full 107-route pre-rendering operational
