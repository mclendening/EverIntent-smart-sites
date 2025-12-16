# EverIntent SmartSites — Task Tracker

> **Reference Documents:**
> - BRD: `docs/smartsites-brd-v32.2.md` (v32.9)
> - Implementation Roadmap: `docs/implementation-roadmap-v1.md`
> - Personas: `docs/persona-spec.md`
> - Careers Spec: `docs/careers-spec.md`

---

## Current Status: Phase 1 — Form Architecture Foundation

### Phase Overview

| Phase | Name | Status | Blocker |
|-------|------|--------|---------|
| 1 | Form Architecture Foundation | 🔄 NOT STARTED | — |
| 2 | Cookie Consent + GHL Widget | ⏳ BLOCKED | Phase 1 |
| 3 | Core Marketing Pages (Prompts 6/7/8) | ⏳ BLOCKED | Phase 2 |
| 4 | Checkout Flow | ⏳ BLOCKED | Phase 3 |
| 5 | LocalPros Apply | ⏳ BLOCKED | Phase 4 |
| 6 | Careers MVP | ⏳ BLOCKED | Phase 1 |
| 7 | Legal Pages | ⏳ BLOCKED | Phase 3 |

---

## 🔧 MANUAL SETUP REQUIRED (User Actions)

### GHL (GoHighLevel) Configuration

**Step 1: Create Private Integration Token**
1. Log in to GHL → Settings → Integrations → Private Integrations
2. Click "Create App"
3. Name: `SmartSites API`
4. Select scopes: `contacts.readonly`, `contacts.write`, `locations/customFields.readonly`, `locations/customFields.write`
5. Click "Create" and copy the **Private Integration Token**

**Step 2: Get Location ID**
1. In GHL → Settings → Business Profile
2. Copy the **Location ID** from the URL: `https://app.gohighlevel.com/location/{LOCATION_ID}/...`

**Step 3: Create Custom Fields (in GHL)**
1. GHL → Settings → Custom Fields → Contacts
2. Create field: `Resume URL` (type: Text) — note the field ID
3. Create field: `Video Link` (type: Text) — note the field ID
4. Field IDs look like: `fkf9vd3Zptv5g4ZLmjEZ`

**Step 4: Create Tags (in GHL)**
1. GHL → Contacts → Tags
2. Create these tags exactly as written:
   - `SS: Checkout Started - T1`
   - `SS: Checkout Started - T2`
   - `SS: Checkout Started - T3`
   - `SS: Checkout Started - T4`
   - `LP: Partner Apply`
   - `Careers: Application`

---

### Supabase Secrets Configuration

**How to add secrets in Supabase:**
1. Go to: https://supabase.com/dashboard/project/nweklcxzoemcnwaoakvq/settings/functions
2. Click "Add new secret"
3. Add each secret below:

| Secret Name | Where to Get Value | Status |
|-------------|-------------------|--------|
| `GHL_API_TOKEN` | GHL → Private Integration Token (Step 1 above) | ⬜ TODO |
| `GHL_LOCATION_ID` | GHL → URL (Step 2 above) | ⬜ TODO |
| `GHL_RESUME_CUSTOM_FIELD_ID` | Use `/admin/ghl-fields` tool after Phase 1 | ⬜ TODO |
| `GHL_VIDEO_LINK_CUSTOM_FIELD_ID` | Use `/admin/ghl-fields` tool after Phase 1 | ⬜ TODO |

---

### Vercel Environment Variables

**How to add env vars in Vercel:**
1. Go to Vercel Dashboard → Project → Settings → Environment Variables
2. Add these variables for **Production**, **Preview**, and **Development**:

| Variable | Value | Status |
|----------|-------|--------|
| `VITE_SUPABASE_URL` | `https://nweklcxzoemcnwaoakvq.supabase.co` | ✅ DONE |
| `VITE_SUPABASE_ANON_KEY` | (your anon key) | ✅ DONE |
| `VITE_GHL_LOCATION_ID` | Same as `GHL_LOCATION_ID` above | ⬜ TODO |

> **Note:** `VITE_GHL_LOCATION_ID` is needed for client-side chat widget loader. Private API token stays server-side only (Supabase secrets).

---

### Google Analytics (GA4) Setup

**Step 1: Create GA4 Property**
1. Go to https://analytics.google.com
2. Admin → Create Property → Enter "EverIntent SmartSites"
3. Create Web data stream with your domain
4. Copy **Measurement ID** (format: `G-XXXXXXXXXX`)

**Step 2: Add to Vercel**
| Variable | Value | Status |
|----------|-------|--------|
| `VITE_GA_MEASUREMENT_ID` | `G-XXXXXXXXXX` | ⬜ TODO |

---

## Phase 1: Form Architecture Foundation

### 1.1 Database Migrations (Lovable runs these)

| Task | Status | Notes |
|------|--------|-------|
| Create `form_submissions` table | ⬜ TODO | Unified table with `form_type` discriminator |
| Create `jobs` table | ⬜ TODO | Job postings for careers |
| Create `job_applications` table | ⬜ TODO | Applications with resume_url |
| Add GHL sync columns to `checkout_submissions` | ⬜ TODO | ghl_contact_id, ghl_sync_status, ghl_synced_at, ghl_error |
| Create `resumes` storage bucket | ⬜ TODO | Private bucket, 7-day signed URLs |
| Add RLS policies | ⬜ TODO | Per ChatGPT C2 SQL patterns |

### 1.2 Shared Edge Function Modules (Lovable builds these)

| Task | Status | Notes |
|------|--------|-------|
| `_shared/cors.ts` | ⬜ TODO | CORS headers helper |
| `_shared/supabaseAdmin.ts` | ⬜ TODO | Service role client |
| `_shared/ghlClient.ts` | ⬜ TODO | **CRITICAL**: v2 API with array-format customFields |
| `_shared/validators.ts` | ⬜ TODO | Zod schemas for form validation |

### 1.3 Edge Functions (Lovable builds these)

| Function | Status | Purpose |
|----------|--------|---------|
| `start-checkout` | ⬜ TODO | Checkout form → Supabase + GHL → redirect |
| `submit-form` | ⬜ TODO | Generic form (contact, LocalPros apply) |
| `submit-job-application` | ⬜ TODO | Careers application + resume |
| `careers-upload-url` | ⬜ TODO | Generate signed upload URL for resumes |
| `get-resume-download-url` | ⬜ TODO | Admin: regenerate 7-day download URL |
| `ghl-admin-fields` | ⬜ TODO | Query GHL for custom field IDs |

### 1.4 Admin Tool (Lovable builds this)

| Task | Status | Notes |
|------|--------|-------|
| `/admin/ghl-fields` page | ⬜ TODO | UI to query and display GHL custom fields |

**After `/admin/ghl-fields` is built:**
1. Navigate to `/admin/ghl-fields` in browser
2. Click "Fetch Custom Fields"
3. Find `Resume URL` field → copy ID → add to Supabase secrets as `GHL_RESUME_CUSTOM_FIELD_ID`
4. Find `Video Link` field → copy ID → add to Supabase secrets as `GHL_VIDEO_LINK_CUSTOM_FIELD_ID`

---

## Phase 2: Cookie Consent + GHL Widget

### User Action Required: GHL Chat Widget ID

**How to get Chat Widget ID:**
1. GHL → Sites → Chat Widget
2. Create or select existing widget
3. Copy the widget embed code
4. Extract the `widget_id` from the script URL

| Variable (Vercel) | Value | Status |
|-------------------|-------|--------|
| `VITE_GHL_WIDGET_ID` | From GHL Chat Widget | ⬜ TODO |

### Lovable Builds These:

| Task | Status | Notes |
|------|--------|-------|
| `CookieConsent.tsx` | ⬜ TODO | Banner with Accept/Reject/Preferences |
| `ghlLoader.ts` | ⬜ TODO | Widget loader with fallback chain |
| `GHLChatWidget.tsx` | ⬜ TODO | Widget injection after consent |
| `DesktopChatButton.tsx` | ⬜ TODO | Floating button (consent-gated) |
| Wire into `App.tsx` | ⬜ TODO | Consent gating logic |
| Update `MobileBottomBar.tsx` | ⬜ TODO | Respect consent state |
| Footer "Cookie Preferences" link | ⬜ TODO | Dispatches consent event |

---

## Phase 3: Core Marketing Pages

| Page | Route | Status | Lovable Prompt |
|------|-------|--------|----------------|
| Homepage | `/` | ⬜ TODO | Prompt 6 |
| Beautiful Websites | `/beautiful-websites` | ⬜ TODO | Prompt 7 |
| Pricing | `/pricing` | ⬜ TODO | Prompt 8 |

---

## Phase 4: Checkout Flow

### User Action Required: Stripe Configuration

**Step 1: Get Stripe Keys**
1. Go to https://dashboard.stripe.com/apikeys
2. Copy **Publishable key** (starts with `pk_live_` or `pk_test_`)
3. Copy **Secret key** (starts with `sk_live_` or `sk_test_`)

**Step 2: Create Products in Stripe**
1. Stripe Dashboard → Products → Add Product
2. Create 4 products matching tiers:
   - Smart Site (T1) - $297/one-time + $47/mo
   - Smart Lead (T2) - $497/one-time + $147/mo
   - Smart Business (T3) - $997/one-time + $297/mo
   - Smart Growth (T4) - $1,497/one-time + $497/mo
3. Note each **Price ID** (starts with `price_`)

**Step 3: Add to Supabase Secrets**
| Secret Name | Value | Status |
|-------------|-------|--------|
| `STRIPE_SECRET_KEY` | `sk_live_...` or `sk_test_...` | ⬜ TODO |

**Step 4: Add to Vercel (publishable only)**
| Variable | Value | Status |
|----------|-------|--------|
| `VITE_STRIPE_PUBLISHABLE_KEY` | `pk_live_...` or `pk_test_...` | ⬜ TODO |

### Lovable Builds These:

| Task | Status | Notes |
|------|--------|-------|
| `/checkout/smart-site` (T1) | ⬜ TODO | |
| `/checkout/smart-lead` (T2) | ⬜ TODO | |
| `/checkout/smart-business` (T3) | ⬜ TODO | |
| `/checkout/smart-growth` (T4) | ⬜ TODO | |
| `/checkout/success` | ⬜ TODO | Post-redirect confirmation |
| `FormShell.tsx` | ⬜ TODO | Shared form wrapper |
| `ConsentCheckbox.tsx` | ⬜ TODO | TCPA disclosure |
| `UTMHiddenFields.tsx` | ⬜ TODO | UTM capture |

---

## Phase 5: LocalPros Apply

| Task | Status | Notes |
|------|--------|-------|
| `/localpros` landing page | ⬜ TODO | Cold outreach entry point |
| `/localpros/apply` form | ⬜ TODO | Partner application |

---

## Phase 6: Careers MVP

| Task | Status | Notes |
|------|--------|-------|
| `/careers` job listing | ⬜ TODO | Public |
| `/careers/:slug` job detail + apply | ⬜ TODO | Public |
| `/admin/careers` CRUD | ⬜ TODO | Admin |

---

## Phase 7: Legal Pages

| Task | Status | Notes |
|------|--------|-------|
| `/legal/privacy` | ⬜ TODO | Privacy Policy |
| `/legal/terms` | ⬜ TODO | Terms of Service |
| `/legal/data-request` | ⬜ TODO | CCPA/DSAR form |
| `/legal/cookies` | ⬜ TODO | Cookie preferences page |

---

## GHL Configuration Reference

### API Constants (hardcoded in `_shared/ghlClient.ts`)
```typescript
const GHL_API_BASE = 'https://services.leadconnectorhq.com';
const GHL_API_VERSION = '2021-07-28';
```

### Tag Taxonomy (hardcoded in `_shared/ghlClient.ts`)
```typescript
const GHL_TAGS = {
  CHECKOUT_T1: 'SS: Checkout Started - T1',
  CHECKOUT_T2: 'SS: Checkout Started - T2',
  CHECKOUT_T3: 'SS: Checkout Started - T3',
  CHECKOUT_T4: 'SS: Checkout Started - T4',
  LOCALPROS_APPLY: 'LP: Partner Apply',
  CAREERS_APPLICATION: 'Careers: Application',
} as const;
```

### Custom Fields Format (v2 CRITICAL)
```typescript
// ✅ CORRECT - Array format
customFields: [
  { id: 'fieldId123', value: 'some value' }
]

// ❌ WRONG - Object format (v1 pattern, will fail)
customFields: {
  fieldId123: 'some value'
}
```

---

## Deferred Items (Post-MVP)

| Item | Origin | Rationale |
|------|--------|-----------|
| Looker Studio analytics | ChatGPT review | Post-launch enhancement |
| Portfolio/Testimonials admin CRUD | BRD scope | Tables exist, admin UI deferred |
| Stripe webhook confirmation | Phase 4 | Enhancement beyond MVP |
| Advanced GHL pipeline automation | GHL-side | Configuration, not code |
| A/B testing framework | Not in BRD | Post-traffic optimization |

---

## Completed (Already Built)

- ✅ Supabase schema: `user_roles`, `allowed_admin_emails`, `checkout_submissions`, `portfolio`, `testimonials`
- ✅ Edge Function: `verify-admin-email`
- ✅ Admin auth: `Login.tsx`, `AdminGuard.tsx`, `useAdminAuth.ts`
- ✅ Navigation: `Header.tsx`, `Footer.tsx`, `MobileBottomBar.tsx`, `Layout.tsx`
- ✅ Design system: HSL tokens in `index.css`, extended `tailwind.config.ts`
- ✅ Routes: 90+ marketing routes configured, SSG via `vite-react-ssg`
- ✅ Deployment: Vercel Pro ready, GitHub connected
- ✅ BRD: Updated to v32.9 (domain purchase removed)

---

## Quick Links

- [Supabase Dashboard](https://supabase.com/dashboard/project/nweklcxzoemcnwaoakvq)
- [Supabase Edge Function Secrets](https://supabase.com/dashboard/project/nweklcxzoemcnwaoakvq/settings/functions)
- [Supabase Storage Buckets](https://supabase.com/dashboard/project/nweklcxzoemcnwaoakvq/storage/buckets)
- [Vercel Project Settings](https://vercel.com) (add env vars here)
- [Stripe Dashboard](https://dashboard.stripe.com)
- [GHL Dashboard](https://app.gohighlevel.com)
