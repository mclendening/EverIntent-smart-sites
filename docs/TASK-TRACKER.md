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

## Phase 1: Form Architecture Foundation

### 1.1 Database Migrations

| Task | Status | Notes |
|------|--------|-------|
| Create `form_submissions` table | ⬜ TODO | Unified table with `form_type` discriminator |
| Create `jobs` table | ⬜ TODO | Job postings for careers |
| Create `job_applications` table | ⬜ TODO | Applications with resume_url |
| Add GHL sync columns to `checkout_submissions` | ⬜ TODO | ghl_contact_id, ghl_sync_status, ghl_synced_at, ghl_error |
| Create `resumes` storage bucket | ⬜ TODO | Private bucket, 7-day signed URLs |
| Add RLS policies | ⬜ TODO | Per ChatGPT C2 SQL patterns |

### 1.2 Shared Edge Function Modules

| Task | Status | Notes |
|------|--------|-------|
| `_shared/cors.ts` | ⬜ TODO | CORS headers helper |
| `_shared/supabaseAdmin.ts` | ⬜ TODO | Service role client |
| `_shared/ghlClient.ts` | ⬜ TODO | **CRITICAL**: v2 API with array-format customFields |
| `_shared/validators.ts` | ⬜ TODO | Zod schemas for form validation |

### 1.3 Edge Functions

| Function | Status | Purpose |
|----------|--------|---------|
| `start-checkout` | ⬜ TODO | Checkout form → Supabase + GHL → redirect |
| `submit-form` | ⬜ TODO | Generic form (contact, LocalPros apply) |
| `submit-job-application` | ⬜ TODO | Careers application + resume |
| `careers-upload-url` | ⬜ TODO | Generate signed upload URL for resumes |
| `get-resume-download-url` | ⬜ TODO | Admin: regenerate 7-day download URL |
| `ghl-admin-fields` | ⬜ TODO | Query GHL for custom field IDs |

### 1.4 Secrets Required

| Secret | Status | Notes |
|--------|--------|-------|
| `GHL_API_TOKEN` | ⬜ TODO | Private Integration Token from GHL |
| `GHL_LOCATION_ID` | ⬜ TODO | Location ID from GHL |
| `GHL_RESUME_CUSTOM_FIELD_ID` | ⬜ TODO | Extracted via admin tool |
| `GHL_VIDEO_LINK_CUSTOM_FIELD_ID` | ⬜ TODO | For Loom links (careers) |

### 1.5 Admin Tool

| Task | Status | Notes |
|------|--------|-------|
| `/admin/ghl-fields` page | ⬜ TODO | UI to query and display GHL custom fields |

---

## Phase 2: Cookie Consent + GHL Widget

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
