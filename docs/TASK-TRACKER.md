# EverIntent SmartSites - Task Tracker

## Complete Implementation Checklist (In Order)

Tasks marked `[MANUAL]` require user action. Tasks marked `[LOVABLE]` are AI-implemented.

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
| `SS: Checkout Started - T1` | Tier 1 checkout initiated |
| `SS: Checkout Started - T2` | Tier 2 checkout initiated |
| `SS: Checkout Started - T3` | Tier 3 checkout initiated |
| `SS: Checkout Started - T4` | Tier 4 checkout initiated |
| `SS: Contact Form` | Contact form submission |
| `LP: Partner Apply` | LocalPros partner application |
| `Careers: Application` | Job application submitted |

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

## Phase 2: Cookie Consent & GHL Widget

### Task 2.1 [LOVABLE] - Create Cookie Consent Component
**Status:** ✅ Complete

Created `src/components/CookieConsent.tsx` with:
- Cookie banner UI with Accept/Decline buttons
- localStorage consent storage (`cookie-consent` key)
- `cookie-consent-changed` event dispatch
- Footer "Cookie Preferences" integration via `triggerCookiePreferences()`

### Task 2.2 [MANUAL] - Get GHL Chat Widget ID
**Status:** ✅ Complete

1. In GHL, go to **Sites** → **Chat Widget**
2. Click on your chat widget (or create one)
3. In the embed code, find the widget ID in the script URL
4. **Copy the Widget ID**

### Task 2.3 [MANUAL] - Add Vercel Environment Variables (GHL Widget)
**Status:** ✅ Complete

1. Go to Vercel Dashboard → Your Project → **Settings** → **Environment Variables**
2. Add:

| Name | Value | Environment |
|------|-------|-------------|
| `VITE_GHL_LOCATION_ID` | From Task 0.2 | Production, Preview, Development |
| `VITE_GHL_WIDGET_ID` | From Task 2.2 | Production, Preview, Development |

### Task 2.4 [LOVABLE] - Create GHL Widget Components
**Status:** ✅ Complete

Created:
- `src/lib/ghlLoader.ts` - widget script loader using `https://beta.leadconnectorhq.com/loader.js` with `<chat-widget>` element injection, hideLauncher support, and fallback API chain
- `src/components/GHLChatWidget.tsx` - chat widget wrapper (consent-gated)
- `src/components/DesktopChatButton.tsx` - floating chat button (consent-gated, desktop only, fade-up animation)
- Updated `src/components/layout/Layout.tsx` to include all components
- Updated `src/components/layout/Footer.tsx` to trigger cookie preferences on "Cookies" link

---

## Phase 3: Core Marketing Pages

### Task 3.1 [LOVABLE] - Homepage
**Status:** ⬜ Not Started

### Task 3.2 [LOVABLE] - Beautiful Websites Service Page
**Status:** ⬜ Not Started

### Task 3.3 [LOVABLE] - Pricing Page
**Status:** ⬜ Not Started

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
4. Enter property name: `EverIntent SmartSites`
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

**Completed:** Phase 0, Phase 1, Phase 2 (All Tasks)

**Next Task:** Task 3.1 - Homepage (Lovable)
