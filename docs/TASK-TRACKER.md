# EverIntent - Task Tracker

> **Brand:** EverIntent | **Tagline:** Web Design AI & Automation  
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
- Tagline: **"Web Design AI & Automation"**
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

## JSDoc Standards (All [LOVABLE] Tasks)

> **CRITICAL REQUIREMENT:** JSDoc documentation MUST be **self-contained** and describe the code as it stands. 
> **NEVER** reference BRD documents, external docs, or file paths in JSDoc comments.
> The BRD may not survive the project - documentation must stand alone.

### Component JSDoc Template
```typescript
/**
 * @fileoverview Brief description of file purpose
 * @module path/to/module
 */

/**
 * Brief description of component purpose and functionality.
 * Include business context (e.g., "Displays service tiers for local business pricing").
 * 
 * @component
 * @example
 * <ComponentName prop1="value" prop2={data} />
 */
```

### Hook JSDoc Template
```typescript
/**
 * Brief description of hook purpose.
 * Include when to use and what problem it solves.
 * 
 * @returns {ReturnType} Description of return value
 * 
 * @example
 * const { data, loading } = useHookName(params);
 */
```

### Edge Function JSDoc Template
```typescript
/**
 * @fileoverview Brief description of edge function purpose
 * @module supabase/functions/function-name
 */

/**
 * Handles [specific purpose].
 * 
 * @param {RequestType} req - Request body shape
 * @returns {ResponseType} Response shape
 * 
 * @endpoint POST /functions/v1/function-name
 * @auth Required|Optional|Public
 */
```

### Type/Interface JSDoc Template
```typescript
/**
 * Represents [what this type models in the system].
 * Used by [which components/functions use it].
 */
interface InterfaceName { ... }
```

### What to Include in JSDoc
- **Purpose**: What the code does
- **Business Context**: Why it exists (e.g., "Captures leads for local service businesses")
- **Props/Params**: All inputs with types and descriptions
- **Returns**: Output type and meaning
- **Examples**: Usage examples where helpful
- **Dependencies**: Key integrations (e.g., "Integrates with GoHighLevel CRM")

### What NOT to Include
- ❌ BRD references (`@brdref`, `@see docs/...`)
- ❌ Version numbers that will become stale
- ❌ File paths to external documentation
- ❌ "See X document for more info"

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
**Status:** ✅ Complete

**Completed:**
- `accent_config` includes `hoverBrightness` and `iconGlowOpacity`
- Core theme variables fully implemented in `themes.ts` and `index.css`
- GHL chat widget variables added (9 properties)

> **Note:** Remaining variables (shadow system, sidebar, mesh gradients) are deferred to future enhancement phase. Current implementation covers all actively used CSS variables.

### Task 1.6.3 [LOVABLE] - Admin Theme CRUD Gaps
**Status:** ✅ Complete

**Completed:**
- Accent config controls (H/S/L sliders with increment buttons)
- Logo preview with theme accent
- Theme publish to GitHub workflow
- GHL chat widget color controls (9 properties with admin UI)
- Sync with Accent and Reset to Defaults quick actions

> **Note:** Advanced controls (shadow system, sidebar, mesh gradients) deferred to future enhancement phase.

### Task 1.6.4 [LOVABLE] - Logo Export (SVG/PNG)
**Status:** ✅ Complete (Deferred)

> **Resolution:** Logo export functionality is not required for MVP. `LogoRenderer` component provides real-time preview in admin. Export capability can be added in future enhancement phase if needed for brand asset downloads.
> **Closed:** 2025-12-23

### Task 1.6.5 [LOVABLE] - Logo Theme Testing
**Status:** ✅ Complete

LogoRenderer correctly applies theme accent:
- Admin Themes page shows logo preview with accent color
- Header renders LogoRenderer with activeTheme.accent
- Scale prop works correctly (0.42 in header)

### Task 1.6.6 [LOVABLE] - Cleanup LogoExplorer
**Status:** ✅ Complete (Obsolete)

> **Resolution:** LogoExplorer page does not exist in the codebase. All logo rendering is handled by `LogoRenderer` component in `src/components/logo/LogoRenderer.tsx`. The admin Themes page uses `LogoRenderer` with theme accent for previews. Task was based on outdated reference.
> **Closed:** 2025-12-23
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
**Status:** ✅ Complete

> **Completed:** 2025-12-23

Created 4 GHL chat widgets with different training/personas. Widget IDs stored in Supabase secrets:

| Widget | Secret Name | Purpose |
|--------|-------------|---------|
| **Default** | `GHL_WIDGET_ID` | Legacy/fallback widget |
| **Sales Bot** | `GHL_WIDGET_ID_SALES` | Pricing/checkout pages |
| **Support Bot** | `GHL_WIDGET_ID_SUPPORT` | Contact/legal/help pages |
| **Demo Bot** | `GHL_WIDGET_ID_DEMO` | Homepage, services, industries |
| **LocalPros Bot** | `GHL_WIDGET_ID_LOCALPROS` | LocalPros vertical pages |

### Task 2.3 [LOVABLE] - Cookie Consent Banner & Legal Pages
**Status:** ✅ Complete

> **Source:** BRD v34.0 Section 21.1
> **Completed:** 2025-12-23

**Completed Items:**
- ✅ Cookie consent banner matching Legal AI site design
- ✅ "We use cookies" heading with description text
- ✅ Privacy Policy and Cookie Settings links with proper contrast (ADA compliant)
- ✅ Reject All, Manage, Accept All buttons
- ✅ Cookie Preferences Modal with category toggles
- ✅ Footer "Cookies" link routes to `/legal/cookies` page
- ✅ All 4 legal pages created and routed
- ✅ Data Rights Request form with DSAR submission to database

### Task 2.4 [LOVABLE] - Fix GHL Chat Widget Styling
**Status:** ✅ Complete

> **Priority:** HIGH - Broken user experience
> **Added:** 2025-12-23
> **Completed:** 2025-12-23

#### Solution Implemented

**Root Cause:** GHL widgets use nested shadow DOM components with hard-to-override internal styles. The send button had a fully transparent background (`#524bae00`) and the textarea lacked visible focus states.

**Fix Applied:**

1. **Theme-Aware Shadow DOM Injection** (`src/lib/ghlLoader.ts`):
   - Added `getGHLThemeColors()` function that reads CSS custom properties from `:root`
   - `injectGHLComposerFix()` now uses theme colors instead of hardcoded values
   - Styles are re-injected when theme changes (existing styles removed first)

2. **New CSS Variables** (`src/index.css`):
   - `--ghl-textarea-bg`, `--ghl-textarea-text`, `--ghl-textarea-border`
   - `--ghl-textarea-focus-border`, `--ghl-textarea-focus-glow`
   - `--ghl-send-button-bg`, `--ghl-send-button-border`, `--ghl-send-button-icon`
   - `--ghl-selection-bg`

3. **Admin Theme Controls** (`src/pages/admin/Themes.tsx`):
   - Added `GHLChatConfig` interface and state management
   - Created `GhlColorControl` component with color picker, sliders, and increment buttons
   - Added "GHL Chat Widget" accordion section with all 9 color controls
   - "Sync with Accent" and "Reset to Theme Defaults" quick action buttons
   - Live preview of chat widget appearance

4. **Theme Application** (`src/config/themes.ts`):
   - `applyThemeToRoot()` now applies GHL chat CSS variables

5. **Database Column** (migration):
   - Added `ghl_chat_config` JSONB column to `site_themes` table

**Files Modified:**
- `src/lib/ghlLoader.ts` - Theme-aware color injection
- `src/index.css` - GHL CSS custom properties
- `src/pages/admin/Themes.tsx` - Admin UI controls (fully JSDoc documented)
- `src/config/themes.ts` - Theme application
- Database migration for `ghl_chat_config` column

---

### Task 2.5 [MANUAL] - Configure Supabase Secrets for GHL Widget IDs
**Status:** ✅ Complete

> **Completed:** 2025-12-23
> **Updated:** Changed from Vercel env vars to Supabase secrets (edge function approach)

All GHL widget IDs stored in Supabase secrets for edge function access:

| Secret Name | Purpose |
|-------------|---------|
| `GHL_WIDGET_ID_SALES` | **Default bot** - Used for all routes unless overridden |
| `GHL_WIDGET_ID_SUPPORT` | Support bot - `/support`, `/help` routes |
| `GHL_WIDGET_ID_DEMO` | Demo bot - `/demo` routes |
| `GHL_WIDGET_ID_LOCALPROS` | LocalPros bot - `/localpros` routes |

> **Note:** `GHL_WIDGET_ID` was deleted. `GHL_WIDGET_ID_SALES` is now the default.
> Edge function `ghl-config` already implements route-to-widget mapping (see `supabase/functions/ghl-config/index.ts`).

### Task 2.6 [LOVABLE] - GHL Multi-Widget Support
**Status:** 🔄 In Progress

> **Started:** 2025-12-23
> **Tested:** Edge function verified via curl - all routes return correct widget IDs

Upgrade from single widget to route-aware multi-widget:

**✅ Completed:**
- `src/lib/ghlLoader.ts` - Widget loader with shadow DOM styling
- `src/components/GHLChatWidget.tsx` - Basic widget component
- `src/components/DesktopChatButton.tsx` - Custom "Need help?" button
- `src/components/MobileBottomBar.tsx` - Mobile chat trigger
- `supabase/functions/ghl-config/index.ts` - Route-to-widget mapping edge function
- Supabase secrets configured: `GHL_WIDGET_ID_SALES` (default), `GHL_WIDGET_ID_SUPPORT`, `GHL_WIDGET_ID_DEMO`, `GHL_WIDGET_ID_LOCALPROS`

**⬜ Remaining:**
- Wire frontend (`ghlLoader.ts`) to call edge function for dynamic widget ID
- Test on live routes when pages are built (`/localpros`, `/support`, `/demo`)

---

## Phase 3: Core Marketing Pages

> **Source:** BRD v34.0 + `docs/smartsites-prd-prompt.md`

### Task 3.0 [LOVABLE] - Implement Brand Pivot (Phase 1)
**Status:** ⬜ Not Started

> **JSDoc:** All layout components must document `@brdref BRD v34.0 Section 2 - Executive Summary` (brand positioning).

Update core branding per `docs/everintent-pivot-plan.md`:
- **Header.tsx** — Logo: "EverIntent" with tagline "Web Design & Automation"
- **Footer.tsx** — Same logo treatment, "Products" → "Solutions" column, add "For Law Firms" external link
- **SEO.tsx** — SITE_NAME: "EverIntent", update DEFAULT_DESCRIPTION
- **routes.ts** — Update descriptions to use EverIntent branding

### Task 3.0.1 [LOVABLE] - Update Navigation Structure
**Status:** ⬜ Not Started

> **JSDoc:** Nav components must document `@brdref BRD v34.0 Section 17 - Navigation Structure`.

Per BRD v34 Section 17:
- **Smart Websites dropdown** — Rename from "Services", reorder items (Smart Websites first, Let AI Handle It second)
- **AI & Automation** — Add as second nav item → `/services/ai-automation`
- **Solutions dropdown** — Add new nav item with: For Law Firms (external → everintentlegalai.com), future verticals
- Keep: Industries, Pricing, Our Work, About

### Task 3.0.2 [LOVABLE] - Create NavHoverMenu Component
**Status:** ⬜ Not Started

> **JSDoc:** `@brdref BRD v34.0 Section 17.4 - NavHoverMenu Component Specification`

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

> **JSDoc:** Each section component must document `@brdref` to corresponding PRD lines and BRD Section 15.

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

> **JSDoc:** Page component must document `@brdref BRD v34.0 Section 15 - Marketing Site Specification`.

**Sections (in order):**
1. **Hero** - "A Professional Website That Actually Gets You Customers" + "Built in 5 days. Starting at $249. You own everything." + [Get Started → /pricing] + [Book a Call → /contact]
2. **Problem** - "Sound Familiar?" with 4 pain point cards
3. **Solution** - 7 service cards linking to individual service pages
4. **Tier Preview** - 4 tier cards (T1-T4) with key features, CTA to /pricing
5. **Social Proof** - Testimonials placeholder + stats
6. **Final CTA** - Benefit restatement with dual CTAs

**SEO:** Title "Professional Websites for Local Businesses | EverIntent"

### Task 3.3 [LOVABLE] - Smart Websites Service Page (/smart-websites)
**Status:** ⬜ Not Started

> **Source:** PRD lines 584-612 (update copy for "Smart Websites" branding)
> **JSDoc:** `@brdref BRD v34.0 Section 5.1 - Smart Websites` and `@brdref PRD lines 584-612`

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
> **JSDoc:** `@brdref BRD v34.0 Section 6 - Tier Definitions` and `@brdref Section 7 - Complete Feature Matrix`

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

> **JSDoc:** Each page must document `@brdref BRD v34.0 Section 5` (corresponding service subsection) and `@brdref PRD lines X-Y`.

Build after Tasks 3.2-3.4 are complete. Each follows same structure with copy from PRD:

| Route | H1 | PRD Lines |
|-------|-----|-----------|
| `/get-found-online` | "Show Up When Customers Search For What You Do" | 615-641 |
| `/never-miss-a-lead` | "Every Customer Inquiry Answered. Even When You Can't." | 645-672 |
| `/book-more-jobs` | "Stop Playing Phone Tag. Let Customers Book Online." | 675-701 |
| `/run-from-your-phone` | "Run Your Entire Business From Your Pocket" | 705-731 |
| `/build-your-reputation` | "More 5-Star Reviews. Less Chasing Customers For Them." | 735-762 |
| `/let-ai-handle-it` | "Your 24/7 Receptionist. For Less Than Minimum Wage." | 765-793 |

### Task 3.6 [LOVABLE] - Partners Page (/partners)
**Status:** ⬜ Not Started

> **JSDoc:** `@brdref BRD v34.0 Section 22 - Partner Program`

**Route:** `/partners`  
**H1:** "Earn Money Referring Clients to EverIntent"  
**Subhead:** "Join our partner program and earn commissions on every referral."

**Page Sections (in order):**
1. **Hero** - Headline, subhead, "Apply Now" CTA (scroll to form)
2. **How It Works** - 3-step process (Apply → Share → Earn) with Lucide icons
3. **Commission Overview** - Styled cards showing 4 commission tiers (10%, $50, $25, 5%)
4. **Who Should Apply** - Bullet list of target audiences
5. **FAQ Accordion** - 5 questions about payments, cookies, eligibility
6. **Application Form** - Name, email, phone, company/website, referral method, TCPA consent
7. **Trust Elements** - "No upfront costs", "90-day cookie", "Real-time tracking", "Monthly payouts"

**Form Submission:**
- Edge function: `submit-form`
- `form_type`: `partner_apply`
- GHL Tag: `EI: Partner Application`
- Store in `form_submissions` table
- Success toast: "Thanks for applying! We'll review your application and be in touch within 2 business days."

**Dependencies:**
- Task 3.1 (Reusable Section Components) - optional, can build standalone
- `submit-form` edge function (already exists)

**Technical Notes:**
- Add `/partners` to `prerenderRoutes` in `src/routes.tsx`
- Add to footer under "Company" column
- SEO: Title "Become a Partner | EverIntent", description "Earn commissions referring clients to EverIntent..."

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

> **JSDoc:** All checkout components must document `@brdref BRD v34.0 Section 10 - Checkout & Billing Architecture`.

---

## Phase 5: LocalPros

### Task 5.1 [LOVABLE] - LocalPros Landing Page
**Status:** ⬜ Not Started

> **JSDoc:** `@brdref BRD v34.0 Section 20 - LocalPros Network`

### Task 5.2 [LOVABLE] - LocalPros Apply Form
**Status:** ⬜ Not Started

> **JSDoc:** `@brdref BRD v34.0 Section 20 - LocalPros Network` (partner requirements)

---

## Phase 6: Careers

### Task 6.1 [LOVABLE] - Public Job Listing Page
**Status:** ⬜ Not Started

> **JSDoc:** `@brdref BRD v34.0 Section 23 - Operational SOPs` (hiring context)

### Task 6.2 [LOVABLE] - Job Application Form
**Status:** ⬜ Not Started

> **JSDoc:** References `job_applications` table, `@brdref BRD v34.0 Section 21` (CCPA compliance)

### Task 6.3 [LOVABLE] - Admin Careers CRUD
**Status:** ⬜ Not Started

> **JSDoc:** Admin components reference `jobs` table schema

---

## ~~Phase 7: Legal Pages & Utilities~~ (Consolidated)

> **Note:** All Phase 7 tasks were completed as part of Task 2.3 (Cookie Consent Banner & Legal Pages). 
> See Phase 2 for completed deliverables: Privacy Policy, Terms of Service, Cookie Policy, Data Rights Request.

---

## Phase 7: Analytics

### Task 7.1 [MANUAL] - Create Google Analytics Property
**Status:** ⬜ Not Started

1. Go to https://analytics.google.com
2. Click **Admin** (gear icon)
3. Click **Create Property**
4. Enter property name: `EverIntent`
5. Select **Web** platform
6. Enter your domain URL
7. **Copy the Measurement ID** (starts with `G-`)

### Task 7.2 [MANUAL] - Add GA4 to Vercel
**Status:** ⬜ Not Started

1. Go to Vercel Dashboard → Your Project → **Settings** → **Environment Variables**
2. Add:

| Name | Value | Environment |
|------|-------|-------------|
| `VITE_GA_MEASUREMENT_ID` | Your GA4 Measurement ID (G-XXXXXXXXXX) | Production |

> **Note:** GA4 Measurement ID uses `VITE_` prefix because it's a publishable key used in client-side analytics script.

### Task 7.3 [LOVABLE] - Integrate GA4 Script
**Status:** ⬜ Not Started

Add GA4 tracking with cookie consent integration.

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
- **Phase 1.5 (Theme Publishing System)** - All tasks complete
- **Phase 1.6 (Theme System Completion)** - ✅ All tasks complete:
  - ✅ Task 1.6.1: Header Logo Integration
  - ✅ Task 1.6.2: CSS Variables (core complete, advanced deferred)
  - ✅ Task 1.6.3: Admin Theme CRUD (core complete, advanced deferred)
  - ✅ Task 1.6.4: Logo Export (deferred, not MVP)
  - ✅ Task 1.6.5: Logo Theme Testing
  - ✅ Task 1.6.6: Closed as obsolete (LogoExplorer never existed)
- **Phase 2 (Cookie Consent & GHL Widget)** - Partial:
  - ✅ Task 2.1: Cookie Consent Component
  - ⬜ Task 2.2: Create GHL Chat Widgets (MANUAL) ← NEXT
  - ✅ Task 2.3: Cookie Consent Banner & Legal Pages
  - ✅ Task 2.4: GHL Chat Widget Styling (theme-aware)
  - ⬜ Task 2.5: Vercel Environment Variables (MANUAL)
  - ⬜ Task 2.6: GHL Multi-Widget Support
- SSG Configuration - vite-react-ssg patterns documented in BRD Appendix H
- Brand Pivot Documentation - BRD v34.0 + everintent-pivot-plan.md aligned

**Next Priority Tasks:**
1. **Task 2.5** [MANUAL] - Configure Vercel env vars for GHL widget ID
2. **Task 3.0** [LOVABLE] - Implement Brand Pivot Phase 1 (Header/Footer/SEO)
3. **Task 3.0.1** [LOVABLE] - Update Navigation Structure
4. **Task 3.0.2** [LOVABLE] - Create NavHoverMenu Component
5. **Task 2.2** [MANUAL] - Create GHL Chat Widgets (3 Bots) - parallel
6. **Task 3.1** [LOVABLE] - Create Reusable Section Components

**Key References:**
- BRD v34.0: `docs/smartsites-brd-v33.0.md`
- Brand Pivot: `docs/everintent-pivot-plan.md`
- PRD Copy: `docs/smartsites-prd-prompt.md`

**SSG Status:** ✅ Full 107-route pre-rendering operational
