# EverIntent - Task Tracker

> **Brand:** EverIntent | **Tagline:** Website Design & Practical AI  
> **BRD Version:** v35.1 (AI-First + Smart Lead + Digital Donut)

## Complete Implementation Checklist (In Order)

Tasks marked `[MANUAL]` require user action. Tasks marked `[LOVABLE]` are AI-implemented.

---

## Primary Reference Documents

| Document | Path | Purpose |
|----------|------|---------|
| **BRD v35.0** | `docs/everintent-brd-v35.0.md` | Single source of truth for all requirements |
| **AI Employee Spec** | `docs/AI-Employee-Product-Spec.md` | AI Employee product definition and modes |
| **Brand Pivot Plan** | `docs/everintent-pivot-plan.md` | Brand architecture, trademark context |

**Key Brand Guidelines (BRD v35.1):**
- Master brand: **EverIntent**
- Tagline: **"Website Design & Practical AI"**
- Primary product: **AI Employee™** (5 modes M1-M5)
- Secondary product: **Smart Websites** (conversion ladder: Smart Site → Smart Lead → Smart Business → Smart Growth)
- Parallel entry: **Web Chat Only** ($497 setup + $79/mo)
- Add-on: **Warmy Booster** (email deliverability, $49/mo)
- All logos, headers, footers use **EverIntent** only

**MVP Navigation Structure (v35.1):**
```
AI Employee ▾ | Smart Websites ▾ | Industries | Pricing | About | Contact
```
Navigation with dropdowns for product exploration. Primary CTA: "Get Started" → /pricing

**The Conversion Ladder:**
```
Smart Site ($249) → Smart Lead ($97/mo) → Smart Business ($197/mo) → Smart Growth ($497/mo) → AI Employee ($149-$297/mo)
```

**AI Employee Modes:**
| Mode | Name | Setup | Monthly |
|------|------|-------|---------|
| M1 | After-Hours Answering | $997 | $497 |
| M2 | After-Hours + Booking | $997 | $497 |
| M3 | Missed Call Recovery | $997 | $497 |
| M4 | Front Line Screener | $1,497 | $547 |
| M5 | Full AI Employee | $2,500 | $597 |

**Smart Website Tiers:**
| Tier | Setup | Monthly | Key Features |
|------|-------|---------|--------------|
| Smart Site | $249 | $149/yr | 5-page site, mobile, SEO |
| Smart Lead | $249 | $97/mo | + Missed-call text-back, GBP sync, Warmy nurture, reputation |
| Smart Business | $749 | $197/mo | + Booking, pipeline, review automation |
| Smart Growth | $1,497 | $497/mo | + AI voice, advanced automation, unified inbox |

**Standalone Products:**
| Product | Setup | Monthly | Use Case |
|---------|-------|---------|----------|
| Web Chat Only | $497 | $79/mo | Chat automation without voice AI |
| Warmy Booster | — | $49/mo | Email deliverability add-on |

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

### Task 2.2 [MANUAL] - Create GHL Chat Widget
**Status:** ✅ Complete

> **Completed:** 2025-12-23

Created GHL chat widget. Widget ID stored in Supabase secrets:

| Widget | Secret Name | Purpose |
|--------|-------------|---------|
| **Sales Bot** | `GHL_WIDGET_ID_SALES` | **Sitewide default** - All pages |

> **Note:** Additional widget secrets exist in Supabase for future expansion (`GHL_WIDGET_ID_SUPPORT`, `GHL_WIDGET_ID_DEMO`, `GHL_WIDGET_ID_LOCALPROS`) but are currently unused.

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

GHL widget ID stored in Supabase secrets:

| Secret Name | Purpose |
|-------------|---------|
| `GHL_WIDGET_ID_SALES` | **Sitewide default** - Used for all routes |

> **Note:** Additional widget secrets (`GHL_WIDGET_ID_SUPPORT`, `GHL_WIDGET_ID_DEMO`, `GHL_WIDGET_ID_LOCALPROS`) exist in Supabase for future multi-widget expansion. Currently unused.

### Task 2.6 [LOVABLE] - GHL Multi-Widget Support
**Status:** ✅ Closed (Descoped)

> **Started:** 2025-12-23
> **Closed:** 2025-01-25 — Descoped to single sitewide widget

**Decision:** Single sitewide widget is sufficient for current needs. Multi-widget infrastructure retained in codebase for future activation.

**Completed Infrastructure (Reserved for Future):**
- `src/lib/ghlLoader.ts` - Includes `fetchWidgetIdForRoute()` for edge function calls (currently unused)
- `supabase/functions/ghl-config/index.ts` - Route-to-widget mapping edge function (deployed, not called)
- Supabase secrets: `GHL_WIDGET_ID_SUPPORT`, `GHL_WIDGET_ID_DEMO`, `GHL_WIDGET_ID_LOCALPROS` (reserved)

**Active Components:**
- `src/components/GHLChatWidget.tsx` - Widget controller
- `src/components/DesktopChatButton.tsx` - Desktop chat trigger
- `src/components/MobileBottomBar.tsx` - Mobile chat trigger
- `GHL_WIDGET_ID_SALES` secret - Sitewide default widget

**To Activate Multi-Widget:** Uncomment edge function call in `ghlLoader.ts` and configure route prefixes in `ghl-config/index.ts`.

---

## Phase 3: v35.1 Updates (AI-First + Smart Lead + Digital Donut)

> **Source:** BRD v35.1 + ChatGPT Review
> **Pivot Date:** 2025-01-25

### Task 3.0 [LOVABLE] - Simplify Navigation to MVP
**Status:** ✅ Complete

> **Completed:** 2025-01-25

Simplified Header.tsx to 5 flat navigation links per BRD v35.0 Section 17:
- ✅ **AI Employee** → `/let-ai-handle-it` (first position)
- ✅ **Smart Websites** → `/smart-websites`
- ✅ **Pricing** → `/pricing`
- ✅ **About** → `/about`
- ✅ **Contact** → `/contact`
- ✅ Removed all dropdowns (Industries, Solutions, Smart Websites dropdown)
- ✅ Primary CTA: "Get Started" → /pricing

### Task 3.1 [LOVABLE] - Rebuild Homepage Hero (AI-First)
**Status:** ✅ Complete

> **Completed:** 2025-01-25

Updated HeroSection.tsx with AI-first messaging:
- ✅ **Headline:** "Stop Losing Money to Missed Calls."
- ✅ **Subheadline:** Revenue loss message ($200+ per missed call)
- ✅ **Eyebrow badge:** "AI Employee™ — Your 24/7 Receptionist"
- ✅ **Primary CTA:** "See AI Employee" → `/let-ai-handle-it`
- ✅ **Secondary CTA:** "Smart Websites" → `/smart-websites`
- ✅ **Value props:** 24/7 Coverage, Instant Booking, Call Screening

### Task 3.2 [LOVABLE] - Create AI Employee Page
**Status:** ✅ Complete

> **Completed:** 2025-01-25

Created `src/pages/AIEmployee.tsx` with:
- ✅ Hero section with "Your 24/7 AI Receptionist" messaging
- ✅ Problem section (missed call revenue loss statistics)
- ✅ Solution section (6 AI capabilities: Voice, SMS, Booking, Screening, Transfer, Web Chat)
- ✅ Modes section with all 5 AI Employee modes (M1-M5)
- ✅ Pricing display ($149-$297/mo + setup fees)
- ✅ Final CTA section
- ✅ Route added to `src/routes.tsx`

### Task 3.3 [LOVABLE] - Update Footer (AI-First)
**Status:** ✅ Complete

> **Completed:** 2025-01-25

Updated Footer.tsx:
- ✅ Solutions column: AI Employee first, Smart Websites second
- ✅ AI Modes column (replaces Packages): Links to all 5 modes
- ✅ Updated tagline: "Starting at $149/mo"
- ✅ Simplified resources (removed LocalPros, Our Work)

### Task 3.4 [LOVABLE] - Smart Websites Page (/smart-websites)
**Status:** ✅ Complete

> **Completed:** 2025-01-25

Created `src/pages/SmartWebsites.tsx` with:
- ✅ Hero section with "$249 • Built in 5 Days" badge
- ✅ H1: "Smart Websites That Pay For Themselves"
- ✅ Problem section (4 pain points: DIY, agencies, mobile, competitors)
- ✅ Solution section (5 features: 5-page site, mobile-first, 5-day delivery, ownership, SEO)
- ✅ What's Included checklist (10 items)
- ✅ Pricing card ($249 one-time, $149/year renewal)
- ✅ AI upgrade teaser (link to AI Employee)
- ✅ Final CTA section
- ✅ Route added to `src/routes.tsx`
- ✅ SSG pre-render configured

### Task 3.5 [LOVABLE] - Pricing Page (/pricing)
**Status:** ✅ Complete

> **Completed:** 2025-01-25

### Task 3.6 [LOVABLE] - AI Employee Checkout Flow
**Status:** ⬜ Not Started

Create checkout pages:
- `/checkout/ai-employee` with mode selection
- Form: Name, email, phone, company, selected mode
- TCPA consent
- Redirect to go.everintent.com (GHL checkout)

### Task 3.7 [LOVABLE] - About Page (/about)
**Status:** ✅ Complete

### Task 3.8 [LOVABLE] - Contact Page (/contact)
**Status:** ✅ Complete

---

## Phase 3A: Footer Restructure (v35.1)

> **Source:** ChatGPT v35.1 Review
> **Added:** 2025-01-25

### Task 3A.1 [LOVABLE] - Restructure Footer to 4 Columns
**Status:** ⬜ Not Started
**Priority:** P1

Update Footer.tsx to 4-column structure:

| Column 1: Services | Column 2: AI Modes | Column 3: Resources | Column 4: Company |
|--------------------|-------------------|---------------------|-------------------|
| Smart Site | After-Hours | Blog (placeholder) | About |
| Smart Lead | Missed Call Recovery | Industries | Contact |
| Smart Business | After-Hours + Booking | FAQ | Careers |
| Smart Growth | Front Line Screener | | Privacy |
| Web Chat Only | Full AI Employee | | Terms |
| Warmy Booster | | | Cookies |

Remove "For Law Firms" link (EverIntent Legal AI is separate site).

---

## Phase 3B: Smart Websites Page Enhancement (v35.1)

> **Source:** ChatGPT v35.1 Review
> **Added:** 2025-01-25

### Task 3B.1 [LOVABLE] - Add 4-Tier Comparison Table
**Status:** ⬜ Not Started
**Priority:** P1

Add comparison table to SmartWebsites.tsx showing all 4 website tiers:
- Smart Site ($249 one-time)
- Smart Lead ($249 setup + $97/mo) — **Flagship for ad buyers**
- Smart Business ($749 setup + $197/mo)
- Smart Growth ($1,497 setup + $497/mo)

Columns: Tier Name, Setup, Monthly, Key Features, CTA

### Task 3B.2 [LOVABLE] - Add 5-Day Build Timeline Infographic
**Status:** ⬜ Not Started
**Priority:** P2

Visual timeline showing:
- Day 1: Kickoff & content gathering
- Day 2-3: Design & build
- Day 4: Review & revisions
- Day 5: Launch

### Task 3B.3 [LOVABLE] - Add Portfolio Thumbnails
**Status:** ⬜ Not Started
**Priority:** P2

"See Our Work" section with 3-6 portfolio thumbnails linking to /our-work.

### Task 3B.4 [LOVABLE] - Add FAQ Section
**Status:** ⬜ Not Started
**Priority:** P1

FAQ accordion with questions:
- "Do I own my website?"
- "Can I upgrade later?"
- "What happens after year one?" ($149/year hosting)
- "What's included in each tier?"

### Task 3B.5 [LOVABLE] - Add "Add AI" Section
**Status:** ⬜ Not Started
**Priority:** P2

Section explaining how to add AI capabilities to any website tier:
- "Already have a Smart Site? Add AI when you're ready."
- Links to specific AI modes (M1-M5)

### Task 3B.6 [LOVABLE] - Add Warmy Booster Callout
**Status:** ⬜ Not Started
**Priority:** P2

Brief section explaining Warmy Booster add-on:
- "Ensure your emails land in the inbox, not spam"
- Link to Warmy Booster landing page (when created)

---

## Phase 3C: Homepage Updates (v35.1)

> **Source:** ChatGPT v35.1 Review
> **Added:** 2025-01-25

### Task 3C.1 [LOVABLE] - Add Conversion Ladder Tagline
**Status:** ⬜ Not Started
**Priority:** P1

Add sub-tagline to hero section:
> "Start with a Smart Site. Upgrade to Smart Lead/Business/Growth. Let AI handle it when you're ready."

### Task 3C.2 [LOVABLE] - Link Industry Cards
**Status:** ⬜ Not Started
**Priority:** P2

Update IndustriesSection cards to link to industry category pages:
- Home Services → /industries/home-services
- Professional Services → /industries/professional
- Health & Wellness → /industries/health-wellness
- Automotive → /industries/automotive

### Task 3.1.1 [LOVABLE] - Rebuild HowWeHelpSection (AI-First)
**Status:** ⬜ Not Started
**Priority:** P0

> **Added:** 2025-01-25

Update content only. Keep current 3-card layout, styling, icons, animations.

| Card | Headline | Body | Link |
|------|----------|------|------|
| 1 | Recover Missed Calls | 62% of calls go unanswered. Our AI texts back every missed call in under 60 seconds — before they call your competitor. | /let-ai-handle-it |
| 2 | Answer After Hours | You close at 5pm. Your AI doesn't. Capture leads, answer questions, and book appointments while you sleep. | /let-ai-handle-it |
| 3 | Screen Every Call | Stop wasting time on tire-kickers. AI handles FAQs and only transfers real opportunities to your team. | /let-ai-handle-it |

Section subhead: "Three ways AI Employee keeps your phone ringing"

### Task 3.1.2 [LOVABLE] - Rebuild PricingTeaser (AI-First)
**Status:** ⬜ Not Started
**Priority:** P0

> **Added:** 2025-01-25

Show AI Employee modes first, Smart Website last. Keep current card styling.

| Position | Product | Price | Features | CTA |
|----------|---------|-------|----------|-----|
| 1 | After Hours | $149/mo | AI answers after hours, Captures lead details, Sends summaries | /pricing#ai-employee |
| 2 | Missed Call Recovery | $149/mo | Texts back missed calls, AI qualifies via SMS, Books appointments | /pricing#ai-employee |
| 3 (Most Popular) | After Hours + Booking | $197/mo | Everything in After Hours, Sends booking links, Self-service scheduling | /pricing#ai-employee |
| 4 | Smart Site | $249 one-time | 5-page website, Mobile responsive, SEO-ready, Ready in 5 days | /pricing#smart-websites |

Section headline: "AI Employee starts at $149/month"
Section subhead: "One setup. Choose your mode. Add a website when ready."
Below cards: "All AI Employee modes include $1,497 one-time setup"
Link below: "Compare all AI plans →" → /pricing

---

## Phase 3D: Pricing Page Updates (v35.1)

> **Source:** ChatGPT v35.1 Review
> **Added:** 2025-01-25

### Task 3D.1 [LOVABLE] - Add Smart Lead Pricing Card
**Status:** ⬜ Not Started
**Priority:** P0

Add Smart Lead to pricing page:
- **Smart Lead** ($249 setup + $97/mo)
- Features: Missed-call text-back, GBP sync, Warmy nurture sequences, Reputation management, Call tracking
- Position: After Smart Site, before Smart Business
- Badge: "Best for Ad Buyers"

### Task 3D.2 [LOVABLE] - Add Web Chat Only Card
**Status:** ⬜ Not Started
**Priority:** P1

Add Web Chat Only product card:
- **Web Chat Only** ($497 setup + $79/mo)
- Features: AI chat widget, lead capture, no voice AI
- Position: Separate section or after AI modes
- Use case: "For businesses that want chat automation without voice"

### Task 3D.3 [LOVABLE] - Add Warmy Booster Card
**Status:** ⬜ Not Started
**Priority:** P2

Add Warmy Booster add-on card:
- **Warmy Booster** ($49/mo)
- Features: Domain warm-up, deliverability monitoring, inbox placement
- Note: "Bundled with Smart Lead or available à la carte"

### Task 3D.4 [LOVABLE] - Show Both Setup and Monthly Fees
**Status:** ⬜ Not Started
**Priority:** P0

Update all pricing cards to show both fees:
- AI Employee: "$997 setup + $497/mo" format
- Smart Website tiers: "$249 one-time" or "$749 setup + $197/mo" format

### Task 3D.5 [LOVABLE] - Add Conversion Journey Note
**Status:** ⬜ Not Started
**Priority:** P2

Add text below pricing grid:
> "Most clients start with a Smart Site or Smart Lead, then add AI capabilities as they grow."

---

## Phase 3E: Industries Pages (v35.1)

> **Source:** ChatGPT v35.1 Review
> **Added:** 2025-01-25

### Task 3E.1 [LOVABLE] - Create /industries Landing Page
**Status:** ⬜ Not Started
**Priority:** P1

Create landing page at `/industries` with:
- Hero: "Smart Solutions for Every Industry"
- 4 category cards linking to category stubs
- Each card shows number of verticals and recommended tier

### Task 3E.2 [LOVABLE] - Create Home Services Category (/industries/home-services)
**Status:** ⬜ Not Started
**Priority:** P2

Category stub with:
- Token words: installs, service calls, repairs, estimates
- Verticals list (HVAC, Plumbing, Electrical, etc.)
- Recommended tier: Smart Lead
- CTA: "Get Smart Lead for Home Services"

### Task 3E.3 [LOVABLE] - Create Professional Services Category (/industries/professional)
**Status:** ⬜ Not Started
**Priority:** P2

Category stub with:
- Token words: consultations, appointments, clients
- Verticals list (Legal, Accounting, Real Estate, etc.)
- Recommended tier: Smart Business
- CTA: "Get Smart Business for Professional Services"

### Task 3E.4 [LOVABLE] - Create Health & Wellness Category (/industries/health-wellness)
**Status:** ⬜ Not Started
**Priority:** P2

Category stub with:
- Token words: patients, appointments, treatments
- Verticals list (MedSpa, Dental, Chiropractic, etc.)
- Recommended tier: Smart Business
- CTA: "Get Smart Business for Health & Wellness"

### Task 3E.5 [LOVABLE] - Create Automotive Category (/industries/automotive)
**Status:** ⬜ Not Started
**Priority:** P2

Category stub with:
- Token words: repairs, services, appointments
- Verticals list (Auto Repair, Detailing, Tire Shop, etc.)
- Recommended tier: Smart Lead
- CTA: "Get Smart Lead for Automotive"

---

## Phase 3F: Navigation Updates (v35.1)

> **Source:** ChatGPT v35.1 Review
> **Added:** 2025-01-25

### Task 3F.1 [LOVABLE] - Add Smart Websites Dropdown
**Status:** ⬜ Not Started
**Priority:** P1

Update Header.tsx navigation:
- **Smart Websites** (dropdown)
  - Smart Site ($249)
  - Smart Lead ($97/mo)
  - Smart Business ($197/mo)
  - Smart Growth ($497/mo)
  - Compare All →

### Task 3F.2 [LOVABLE] - Add AI Employee Dropdown
**Status:** ⬜ Not Started
**Priority:** P1

Update Header.tsx navigation:
- **AI Employee** (dropdown)
  - After-Hours Answering
  - Missed Call Recovery
  - After-Hours + Booking
  - Front Line Screener
  - Full AI Employee
  - Web Chat Only
  - Compare All →

### Task 3F.3 [LOVABLE] - Add Industries Nav Link
**Status:** ⬜ Not Started
**Priority:** P1

Add "Industries" link to Header.tsx after AI Employee dropdown:
- Industries → /industries

---

## Phase 3G: Warmy Booster Landing Page (v35.1)

> **Source:** ChatGPT v35.1 Review
> **Added:** 2025-01-25
> **Priority:** LOW (can defer until assets available)

### Task 3G.1 [LOVABLE] - Create Warmy Booster Landing Page
**Status:** ⬜ Not Started
**Priority:** P3 (Low)

Create landing page at `/warmy-booster` or add section to Services:
- What is email warm-up?
- Why deliverability matters
- What clients get: domain warm-up, monitoring, inbox placement
- Pricing: $49/mo (bundled with Smart Lead or à la carte)
- CTA: Add to any package

---

## Phase 4: Checkout & Payments

### Task 4.1 [MANUAL] - Create Stripe Account & Products
**Status:** ⬜ Not Started

1. Go to https://dashboard.stripe.com
2. Create products:
   - AI Employee M1 ($149/mo)
   - AI Employee M2 ($199/mo)
   - AI Employee M3 ($199/mo)
   - AI Employee M4 ($249/mo)
   - AI Employee M5 ($297/mo)
   - Smart Website ($249 one-time)
   - Web Chat ($79/mo + $497 setup)
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

### Task 4.3 [LOVABLE] - Build AI Employee Checkout
**Status:** ⬜ Not Started

Create `/checkout/ai-employee` with:
- Mode selection (M1-M5)
- Customer info form
- TCPA consent
- Stripe payment integration

### Task 4.4 [LOVABLE] - Build Smart Websites Checkout
**Status:** ⬜ Not Started

Create `/checkout/smart-site` with:
- Customer info form
- TCPA consent
- Stripe one-time payment

---

## Phase 4: Backend & Checkout Updates (v35.1)

> **Source:** ChatGPT v35.1 Review
> **Added:** 2025-01-25
> **Status:** DEFERRED (until frontend complete)

### Task 4.0 [LOVABLE] - Update start-checkout Edge Function
**Status:** ⬜ Not Started
**Priority:** P1 (when Phase 4 begins)

Update `supabase/functions/start-checkout/index.ts`:
- Return `redirect_url` to go.everintent.com for GHL checkout
- Accept mode selection (M1-M5) or tier selection (Smart Site/Lead/Business/Growth)
- Pass UTM params to GHL redirect

### Task 4.1 [LOVABLE] - Update TIER_TAG_MAP in ghlClient.ts
**Status:** ⬜ Not Started
**Priority:** P1 (when Phase 4 begins)

Update `supabase/functions/_shared/ghlClient.ts` with new tags:

```typescript
export const GHL_TAGS = {
  // AI Employee Modes
  CHECKOUT_M1: 'EI: AI - After Hours',
  CHECKOUT_M2: 'EI: AI - After Hours + Booking',
  CHECKOUT_M3: 'EI: AI - Missed Call Recovery',
  CHECKOUT_M4: 'EI: AI - Front Line Screening',
  CHECKOUT_M5: 'EI: AI - Full Employee',
  
  // Smart Website Tiers
  CHECKOUT_SMART_SITE: 'EI: Smart Website - Starter',
  CHECKOUT_SMART_LEAD: 'EI: Smart Website - Lead',
  CHECKOUT_SMART_BUSINESS: 'EI: Smart Website - Business',
  CHECKOUT_SMART_GROWTH: 'EI: Smart Website - Growth',
  
  // Standalone Products
  CHECKOUT_WEB_CHAT: 'EI: Web Chat Only',
  CHECKOUT_WARMY: 'EI: Warmy Booster',
  
  // Other
  CONTACT_FORM: 'EI: Contact Form',
  PARTNER_APPLY: 'LP: Partner Apply',
  CAREERS_APPLICATION: 'Careers: Application',
};
```

### Task 4.2 [MANUAL] - Create GHL Tags for v35.1
**Status:** ⬜ Not Started
**Priority:** P1 (when Phase 4 begins)

Add new tags in GHL Settings → Tags:
- `EI: Smart Website - Lead`
- `EI: Smart Website - Business`
- `EI: Smart Website - Growth`
- `EI: Web Chat Only`
- `EI: Warmy Booster`

### Task 4.3 [MANUAL] - Create donut_id Custom Field in GHL
**Status:** ⬜ Not Started
**Priority:** P2 (Digital Donut workflow)

Create custom field for Digital Donut automation:
- Field Name: `donut_id`
- Field Type: Text
- Purpose: Unique ID for personalized demo page embedding

### Task 4.4 [MANUAL] - Create Stripe Products for v35.1
**Status:** ⬜ Not Started
**Priority:** P1 (when Phase 4 begins)

Create products in Stripe Dashboard:
| Product | Setup Price | Monthly Price |
|---------|-------------|---------------|
| AI Employee M1 | $997 | $497/mo |
| AI Employee M2 | $997 | $497/mo |
| AI Employee M3 | $997 | $497/mo |
| AI Employee M4 | $1,497 | $547/mo |
| AI Employee M5 | $2,500 | $597/mo |
| Smart Site | $249 one-time | — |
| Smart Lead | $249 | $97/mo |
| Smart Business | $749 | $197/mo |
| Smart Growth | $1,497 | $497/mo |
| Web Chat Only | $497 | $79/mo |
| Warmy Booster | — | $49/mo |

### Task 4.5 [MANUAL] - Build n8n Digital Donut Workflow
**Status:** ⬜ Not Started
**Priority:** P3 (post-MVP)

Create n8n workflow for Digital Donut outbound:
1. Lead scraping trigger
2. After-hours call test
3. Create mock site + trained bot
4. Generate unique donut_id
5. Update GHL contact with donut_id
6. Trigger automated demo email sequence

---

## Phase 5: Deferred (Post-MVP)

> **Note:** These tasks are deferred until core MVP (Phases 1-4) is complete.

### Task 5.1 [LOVABLE] - LocalPros Landing Page (/localpros)
**Status:** ⬜ Deferred

Footer Resources link. Partner lead acquisition page.

### Task 5.2 [LOVABLE] - LocalPros Apply Form (/localpros/apply)
**Status:** ⬜ Deferred

Partner application form with GHL sync.

### Task 5.3 [LOVABLE] - Careers Page (/careers)
**Status:** ⬜ Deferred

Public job listings from `jobs` table.

### Task 5.4 [LOVABLE] - Job Application Form
**Status:** ⬜ Deferred

Application form using `job_applications` table.

---

## ~~Phase 7: Legal Pages~~ (Complete)

> **Completed in Task 2.3:** Privacy Policy, Terms of Service, Cookie Policy, Data Rights Request.

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

**BRD Version:** v35.1 (AI-First + Smart Lead + Digital Donut)

**Completed:**
- Phase 0 (Prerequisites) - All GHL configuration complete
- Phase 1 (Database Foundation) - All migrations and Edge Functions deployed
- Phase 1.5 (Theme Publishing System) - All tasks complete
- Phase 1.6 (Theme System Completion) - All tasks complete
- Phase 2 (Cookie Consent & GHL Widget) - All tasks complete
- Task 3.0 - Navigation simplified to MVP 5-link structure
- Task 3.1 - Hero rebuilt (AI-first messaging)
- Task 3.2 - AI Employee page `/let-ai-handle-it` complete
- Task 3.3 - Footer updated (AI modes column)
- Task 3.4 - Smart Websites page `/smart-websites` complete
- Task 3.5 - Pricing page `/pricing` complete
- Task 3.7 - About page `/about` complete
- Task 3.8 - Contact page `/contact` complete with working form
- Title tag updated to AI-first branding

**Not Started (v35.1 Updates):**
- Phase 3A - Footer restructure (4 columns)
- Phase 3B - Smart Websites page enhancements (4-tier table, FAQ, timeline)
- Phase 3C - Homepage updates (ladder tagline, industry links)
- Phase 3D - Pricing page updates (Smart Lead, Web Chat Only, Warmy Booster cards)
- Phase 3E - Industries pages (/industries + 4 category stubs)
- Phase 3F - Navigation updates (dropdowns)
- Phase 3G - Warmy Booster landing page (low priority)
- Task 3.6 - AI Employee checkout flow
- Phase 4 - Backend updates (start-checkout, TIER_TAG_MAP, Stripe)

**Execution Order:**
1. Phase 3A (Footer) — establishes navigation structure
2. Phase 3D (Pricing) — adds Smart Lead, Web Chat Only, Warmy Booster
3. Phase 3B (Smart Websites) — 4-tier table, FAQ, enhancements
4. Phase 3C (Homepage) — ladder tagline, industry links
5. Phase 3E/3F (Industries + Nav) — dropdown menus, industry pages
6. Phase 3G (Warmy Booster page) — low priority, defer if needed
7. Phase 4 (Backend) — checkout flow, Stripe, GHL tags

**Key References:**
- BRD v35.1: `docs/everintent-brd-v35.0.md` (updated to v35.1)
- AI Employee Spec: `docs/AI-Employee-Product-Spec.md`
- Brand Pivot: `docs/everintent-pivot-plan.md`

**SSG Status:** ✅ Full 107-route pre-rendering operational
