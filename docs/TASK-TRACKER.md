# EverIntent SmartSites - Task Tracker

> **Reference Documents:** BRD v32.9, implementation-roadmap-v1.md, persona-spec.md, careers-spec.md

---

## Current Status

| Phase | Name | Status | Blocked By |
|-------|------|--------|------------|
| 1 | Form Architecture Foundation | **Not Started** | Manual GHL Setup |
| 2 | Cookie Consent + GHL Widget | Not Started | Phase 1 |
| 3 | Core Marketing Pages | Not Started | Phase 2 |
| 4 | Checkout Flow | Not Started | Phase 3 + Stripe Setup |
| 5 | LocalPros Apply | Not Started | Phase 4 |
| 6 | Careers MVP | Not Started | Phase 1 |
| 7 | Legal Pages + Domain Tool | Not Started | Phase 3 |

---

## Manual Setup & Configuration

### Understanding Where Secrets Go

There are **THREE** different places for configuration. Do NOT confuse them:

| Location | Purpose | Who Uses It | Example Keys |
|----------|---------|-------------|--------------|
| **.env file** (in code repo) | Local development only | Vite build (client-side) | `VITE_SUPABASE_URL` |
| **Vercel Environment Variables** | Production deployment | Vite build (client-side) | `VITE_SUPABASE_URL`, `VITE_GA_MEASUREMENT_ID` |
| **Supabase Secrets** | Edge Functions (server-side) | Edge Functions only | `GHL_API_TOKEN`, `GHL_LOCATION_ID` |

### Key Rules:
- **VITE_*** variables are PUBLIC - they get bundled into client JavaScript, visible to anyone
- **Supabase Secrets** are PRIVATE - only accessible by Edge Functions on the server
- **Never put private API keys in .env or Vercel** - they would be exposed to the browser

---

### 1. GHL Configuration (Do This First)

**Where:** GoHighLevel Dashboard → Settings → Integrations

#### Step 1: Create Private Integration Token
1. Go to GHL Dashboard → Settings → Integrations → Private Integrations
2. Click "Create New Integration"
3. Name it "SmartSites API"
4. Copy the generated token (starts with `pit-...`)
5. **Save this token** - you'll add it to Supabase secrets later

#### Step 2: Get Your Location ID
1. In GHL, go to Settings → Business Profile
2. Look at the URL: `https://app.gohighlevel.com/v2/location/XXXXX/settings`
3. The `XXXXX` part is your Location ID
4. **Save this ID** - you'll add it to Supabase secrets later

#### Step 3: Create Required Custom Fields
1. Go to Settings → Custom Fields → Contacts
2. Create these fields (note the IDs after creation):

| Field Name | Field Type | Purpose |
|------------|------------|---------|
| Resume URL | Text/URL | Stores link to uploaded resume |
| Video Link | Text/URL | Stores video introduction link |

3. After creating each field, click on it to see the Field ID (looks like `fkf9vd3Zptv5g4ZLmjEZ`)
4. **Save these Field IDs** - you'll add them to Supabase secrets later

#### Step 4: Create Required Tags
Go to Settings → Tags and create these tags exactly as shown:

| Tag Name | Purpose |
|----------|---------|
| `SS: Checkout Started - T1` | Tier 1 checkout initiated |
| `SS: Checkout Started - T2` | Tier 2 checkout initiated |
| `SS: Checkout Started - T3` | Tier 3 checkout initiated |
| `SS: Checkout Started - T4` | Tier 4 checkout initiated |
| `LP: Partner Apply` | LocalPros application submitted |
| `Careers: Application` | Job application submitted |

---

### 2. Supabase Secrets (Private - For Edge Functions)

**Where:** Supabase Dashboard → Project Settings → Edge Functions → Secrets

**How to Add:**
1. Go to https://supabase.com/dashboard/project/nweklcxzoemcnwaoakvq/settings/functions
2. Click "Add secret"
3. Enter the name and value from the table below

| Secret Name | Value Source | Status |
|-------------|--------------|--------|
| `GHL_API_TOKEN` | From GHL Step 1 above | ⬜ TODO |
| `GHL_LOCATION_ID` | From GHL Step 2 above | ⬜ TODO |
| `GHL_RESUME_CUSTOM_FIELD_ID` | From GHL Step 3 above | ⬜ TODO |
| `GHL_VIDEO_LINK_CUSTOM_FIELD_ID` | From GHL Step 3 above | ⬜ TODO |

> ✅ Already configured: `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `SUPABASE_DB_URL`, `SUPABASE_PUBLISHABLE_KEY`, `SUPABASE_URL`

---

### 3. Vercel Environment Variables (Public - For Production Build)

**Where:** Vercel Dashboard → Project → Settings → Environment Variables

**How to Add:**
1. Go to your Vercel project settings
2. Navigate to Environment Variables
3. Add each variable below for "Production" environment

| Variable Name | Value | Status |
|---------------|-------|--------|
| `VITE_SUPABASE_URL` | `https://nweklcxzoemcnwaoakvq.supabase.co` | ⬜ TODO |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase anon key | ⬜ TODO |
| `VITE_GA_MEASUREMENT_ID` | From Google Analytics (e.g., `G-XXXXXXXXXX`) | ⬜ TODO |

> ⚠️ These are the SAME values as in your .env file - Vercel needs them to build the production site

---

### 4. Google Analytics Setup (Optional for MVP)

**Where:** Google Analytics → Admin → Create Property

1. Go to https://analytics.google.com/
2. Create a new GA4 property for your domain
3. Get the Measurement ID (starts with `G-`)
4. Add it to Vercel as `VITE_GA_MEASUREMENT_ID`

---

### 5. Stripe Configuration (Phase 4 - Later)

**When:** After Phase 3 is complete

**Supabase Secrets to add:**
- `STRIPE_SECRET_KEY` - From Stripe Dashboard → Developers → API Keys

**Vercel Environment Variables to add:**
- `VITE_STRIPE_PUBLISHABLE_KEY` - From Stripe Dashboard (starts with `pk_`)

---

## Phased Implementation Plan

### Phase 1: Form Architecture Foundation

**Prerequisites:** GHL secrets added to Supabase (Section 2 above)

#### 1.1 Database Migrations (Lovable runs this)
- [ ] `form_submissions` table with `form_type` discriminator
- [ ] `jobs` and `job_applications` tables  
- [ ] GHL sync columns on `checkout_submissions`
- [ ] `resumes` Supabase Storage bucket
- [ ] RLS policies for all new tables

#### 1.2 Shared Modules (Lovable builds this)
- [ ] `supabase/functions/_shared/ghlClient.ts` - GHL v2 API helpers
  - `ghlHeaders()` - Auth headers with version
  - `upsertContact()` - Create/update contacts
  - `addTags()` - Tag management
  - `addNote()` - Add notes to contacts
  - `uploadFileToCustomField()` - Resume uploads

#### 1.3 Edge Functions (Lovable builds this)
- [ ] `start-checkout` - Creates GHL contact, adds tier tag
- [ ] `submit-form` - Generic form handler (contact, LocalPros)
- [ ] `submit-job-application` - Careers with resume upload
- [ ] `careers-upload-url` - Get signed URL for resume upload
- [ ] `get-resume-download-url` - Admin resume download

#### 1.4 Admin Tool (Lovable builds this)
- [ ] `/admin/ghl-fields` page - Extract GHL custom field IDs

---

### Phase 2: Cookie Consent + GHL Widget

- [ ] `CookieConsent.tsx` component
- [ ] `ghlLoader.ts` - Load GHL chat widget
- [ ] `GHLChatWidget.tsx` - Widget wrapper
- [ ] `DesktopChatButton.tsx` - Floating chat button
- [ ] Update `MobileBottomBar.tsx` with consent gating
- [ ] Footer "Cookies" link triggers consent banner

---

### Phase 3: Core Marketing Pages

- [ ] Homepage (`/`)
- [ ] Beautiful Websites service page (`/beautiful-websites`)
- [ ] Pricing page (`/pricing`)

---

### Phase 4: Checkout Flow

**User Action Required:** Configure Stripe (see Section 5)

- [ ] Multi-step checkout pages
- [ ] Shared form components
- [ ] Stripe payment integration
- [ ] GHL contact creation on checkout start

---

### Phase 5: LocalPros Apply

- [ ] `/localpros` landing page
- [ ] `/localpros/apply` application form
- [ ] GHL form submission integration

---

### Phase 6: Careers MVP

- [ ] `/careers` - Public job listings
- [ ] `/careers/:slug` - Job detail + application form
- [ ] `/admin/careers` - Admin CRUD for jobs
- [ ] Resume upload to Supabase Storage
- [ ] GHL integration for applications

---

### Phase 7: Legal Pages + Domain Tool

- [ ] `/legal/privacy` - Privacy Policy
- [ ] `/legal/terms` - Terms of Service
- [ ] `/legal/data-request` - CCPA Data Request
- [ ] `/legal/cookies` - Cookie Preferences

---

## Technical References

### GHL API Constants
```
Base URL: https://services.leadconnectorhq.com
Version Header: 2021-07-28
Auth Header: Authorization: Bearer {GHL_API_TOKEN}
```

### GHL Tag Taxonomy
```
SS: Checkout Started - T1/T2/T3/T4
LP: Partner Apply
Careers: Application
```

### Critical: GHL v2 Custom Fields Format
```javascript
// ✅ CORRECT - Array format
customFields: [
  { id: "field_id_here", value: "field value" }
]

// ❌ WRONG - Object format (will fail)
customFields: {
  "field_id_here": "field value"
}
```

---

## Deferred Items (Post-MVP)

| Item | Reason |
|------|--------|
| Looker Studio analytics | Post-launch enhancement |
| Portfolio/Testimonials advanced CRUD | Beyond MVP scope |
| Namecheap IP whitelisting | Infrastructure optimization |
| Stripe webhooks for completion tracking | Phase 4 enhancement |
| A/B testing framework | Post-launch |

---

## Quick Links

- [Supabase Dashboard](https://supabase.com/dashboard/project/nweklcxzoemcnwaoakvq)
- [Supabase Edge Function Secrets](https://supabase.com/dashboard/project/nweklcxzoemcnwaoakvq/settings/functions)
- [Supabase SQL Editor](https://supabase.com/dashboard/project/nweklcxzoemcnwaoakvq/sql/new)
