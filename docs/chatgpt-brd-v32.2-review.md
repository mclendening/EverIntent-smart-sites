## A) LEVEL SET

### Exact customer journey (end‑to‑end)

1. **Entry → Tier selection (marketing site)**

* Customer lands on SmartSites marketing pages (ads/organic/referral) and selects a tier from Pricing. 

2. **Pre‑checkout “Get Started”**

* Customer completes a pre‑checkout form that captures **tier + contact info + business name + domain choice** (existing vs new). 
* If “new domain,” they must be able to do **real‑time domain search/check** (either inline during checkout or via the dedicated `/domains` tool page). 

3. **Payment**

* Customer is redirected to a **GoHighLevel (GHL) checkout page** and completes payment there. 
* Payments run through the connected **EverIntent Stripe account** in GHL. 

4. **Post‑checkout provisioning**

* After purchase, GHL automations provision the account (sub‑account snapshot, access, etc.) and send a welcome email. The customer should receive **portal access + intake link quickly** (“within 5 minutes”). 

5. **Intake**

* Customer completes the intake form (target ~10 minutes) which kicks off the build pipeline. 

6. **Build**

* Team builds the WordPress site (OVH/Plesk + Elementor) using a predictable SOP timeline (days 0–5). 

7. **Revisions**

* Preview is delivered, customer gets a defined revision window/rounds, then final QA. 

8. **Go‑live**

* Go‑live happens, launch email sent, and support/billing continues by tier. 

9. **Billing cycles + overages**

* Ongoing billing is managed via GHL subscriptions and (where applicable) **wallet/usage rebilling** concepts. 
* Wallet auto‑recharge is a real feature in HighLevel, and thresholds/amounts are configurable (defaults vary).

### Support‑risk moments + how we remove them

* **Domain confusion (“Do I need to buy one? What if it’s taken?”)**
  Fix: inline domain search + clear microcopy + fallback state if API is down: “We’ll verify availability after checkout.” (No dead ends.)
* **Payment → “What now?” drop‑off**
  Fix: a **post‑redirect success page** that repeats the next 3 steps (portal email → intake → build timeline) and sets a clear expectation (“check your email in ~5 minutes”). 
* **Intake not completed**
  Fix: success page CTA + automated reminder in GHL if intake not submitted in X hours (automation, not support tickets).
* **Form submissions “lost” / duplicates in GHL**
  Fix: all forms go through a single Edge layer that **upserts** contacts and applies tags/notes consistently. Upsert behavior and duplicate rules are documented in GHL.
* **Cookie banner / chat widget chaos**
  Fix: consent gating pattern: no GA4/chat until consent stored, banner appears after delay, and z‑index layering is defined. 

---

## B) DECISIONS + RECOMMENDATIONS

### 1) Supabase forms storage model (single recommended approach)

**Recommendation:** **Keep `checkout_submissions` for checkout** (domain + tier workflow) and add **one new generic table `form_submissions`** for all other public forms (Contact, LocalPros Apply, future DSAR). For Careers, follow the Careers spec with **`jobs` + `job_applications`** tables (because job postings need their own CRUD + relational reporting).  

Why this meets constraints:

* **Low LOE:** no risky renames of the already‑live `checkout_submissions`.
* **Low support churn:** consistent “submission status + GHL sync status” fields across tables, unified admin view.
* **Extensible:** `form_submissions.data jsonb` lets you add fields without schema churn.

### 2) Edge Function architecture for GHL v2 integration (single recommended approach)

**Recommendation:** Use **small, form‑specific Edge functions** that all share the same GHL client module.

* **Shared module:** `_shared/ghlClient.ts`

  * `upsertContact()` → `POST /contacts/upsert`
  * `addTags()` → `POST /contacts/{contactId}/tags`
  * `createNote()` → `POST /contacts/{contactId}/notes`
  * Optional: `uploadMediaFromUrl()` → `POST /medias/upload-file` (supports `fileUrl` when `hosted=true`).
* **Auth method:** **Private Integration Token** + required API version header.
* **Secrets/env var organization (Supabase Edge secrets):**

  * `GHL_PRIVATE_TOKEN` (Private Integration Token)
  * `GHL_LOCATION_ID`
  * `GHL_API_BASE_URL` default `https://services.leadconnectorhq.com`
  * `GHL_API_VERSION` default `2021-07-28`
  * Tag constants per flow (e.g., `GHL_TAG_CHECKOUT_T1`, `GHL_TAG_LOCALPROS_APPLY`, etc.)

**Avoid duplication + keep debugging simple**

* 3 edge functions only (MVP):

  1. `start-checkout` (checkout_submissions + tag + note + redirect URL)
  2. `submit-form` (form_submissions for contact/localpros)
  3. `submit-job-application` (job_applications + resume link + tag + note)

Each function logs with a consistent prefix: `[smartsites][functionName][submissionId]` and writes back `ghl_sync_status` + `ghl_error` for admin troubleshooting.

### 3) Careers/jobs data model (single recommended approach)

**Recommendation:** Implement exactly the spec’s relational model:

* `jobs` table controls what fields are required (loom/portfolio) and stores `custom_questions jsonb`.
* `job_applications` stores applicant data + `custom_answers jsonb` + optional `resume_url`.
* Resume handling: store resumes in **Supabase Storage private bucket** and store the storage path in `resume_url` (or `resume_path`). Admin generates signed links on demand.

This matches the careers spec schema direction (jobs + applications, dynamic questions).  

### 4) Admin UI pattern (single recommended approach)

**Recommendation:** Keep existing admin routing and implement:

* **One unified `/admin/submissions`** with a **Type filter** (`Checkout | Contact | LocalPros | Careers | All`) and a **detail drawer**.
* Keep `/admin/portfolio` + `/admin/testimonials` as-is.
* Add `/admin/careers` for job CRUD (per careers spec). 

This matches existing admin patterns (AdminGuard + separate pages) while minimizing “where do I click” churn.

---

## C) SPECIFIC BUILD OUTPUTS

### C1) SQL schemas (tables + indexes)

#### 1) `form_submissions` (new)

```sql
-- 1) Generic marketing form submissions (non-checkout)
create table if not exists public.form_submissions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  form_type text not null,           -- e.g. 'contact', 'localpros_apply', 'data_request'
  status text not null default 'new',

  first_name text,
  last_name text,
  email text,
  phone text,

  tcpa_consent boolean not null default false,
  consent_timestamp timestamptz,
  ip_address inet,
  user_agent text,

  source_url text,
  referrer text,

  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_term text,
  utm_content text,
  gclid text,
  fbclid text,

  data jsonb not null default '{}'::jsonb,

  ghl_contact_id text,
  ghl_sync_status text not null default 'pending', -- 'pending' | 'success' | 'error'
  ghl_synced_at timestamptz,
  ghl_error text
);

create index if not exists idx_form_submissions_created_at on public.form_submissions (created_at desc);
create index if not exists idx_form_submissions_form_type on public.form_submissions (form_type);
create index if not exists idx_form_submissions_email on public.form_submissions (email);
create index if not exists idx_form_submissions_status on public.form_submissions (status);
create index if not exists idx_form_submissions_ghl_sync on public.form_submissions (ghl_sync_status);

-- updated_at trigger
drop trigger if exists trg_form_submissions_updated_at on public.form_submissions;
create trigger trg_form_submissions_updated_at
before update on public.form_submissions
for each row execute function public.update_updated_at_column();

-- optional guardrails
alter table public.form_submissions
  drop constraint if exists form_submissions_ghl_sync_status_chk;
alter table public.form_submissions
  add constraint form_submissions_ghl_sync_status_chk
  check (ghl_sync_status in ('pending','success','error'));
```

#### 2) Careers tables (from careers spec, with small GHL sync additions)

```sql
-- 2) Jobs (public listing)
create table if not exists public.jobs (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  title text not null,
  slug text not null unique,
  location text,
  department text,
  description text,
  is_open boolean not null default true,

  loom_required boolean not null default false,
  portfolio_required boolean not null default false,
  custom_questions jsonb not null default '[]'::jsonb
);

create index if not exists idx_jobs_is_open on public.jobs (is_open);
create index if not exists idx_jobs_slug on public.jobs (slug);

drop trigger if exists trg_jobs_updated_at on public.jobs;
create trigger trg_jobs_updated_at
before update on public.jobs
for each row execute function public.update_updated_at_column();


-- 3) Job applications
create table if not exists public.job_applications (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  job_id uuid not null references public.jobs(id) on delete cascade,

  name text not null,
  email text not null,
  phone text,
  linkedin_url text,
  portfolio_url text,
  loom_url text,
  cover_letter text,

  custom_answers jsonb not null default '{}'::jsonb,
  resume_url text, -- store Supabase Storage path, not public URL

  status text not null default 'pending',

  ghl_contact_id text,
  ghl_sync_status text not null default 'pending',
  ghl_synced_at timestamptz,
  ghl_error text
);

create index if not exists idx_job_apps_job_id_created on public.job_applications (job_id, created_at desc);
create index if not exists idx_job_apps_email on public.job_applications (email);
create index if not exists idx_job_apps_status on public.job_applications (status);

drop trigger if exists trg_job_apps_updated_at on public.job_applications;
create trigger trg_job_apps_updated_at
before update on public.job_applications
for each row execute function public.update_updated_at_column();

alter table public.job_applications
  drop constraint if exists job_applications_status_chk;
alter table public.job_applications
  add constraint job_applications_status_chk
  check (status in ('pending','reviewing','interviewing','offer','hired','rejected'));

alter table public.job_applications
  drop constraint if exists job_applications_ghl_sync_status_chk;
alter table public.job_applications
  add constraint job_applications_ghl_sync_status_chk
  check (ghl_sync_status in ('pending','success','error'));
```

#### 3) Optional upgrade for existing `checkout_submissions` (keep table, add tracking + GHL sync if missing)

```sql
-- Add columns only if they don't exist (safe migration)
alter table public.checkout_submissions
  add column if not exists ip_address inet,
  add column if not exists user_agent text,
  add column if not exists source_url text,
  add column if not exists referrer text,
  add column if not exists utm_source text,
  add column if not exists utm_medium text,
  add column if not exists utm_campaign text,
  add column if not exists utm_term text,
  add column if not exists utm_content text,
  add column if not exists gclid text,
  add column if not exists fbclid text,
  add column if not exists ghl_contact_id text,
  add column if not exists ghl_sync_status text not null default 'pending',
  add column if not exists ghl_synced_at timestamptz,
  add column if not exists ghl_error text;

alter table public.checkout_submissions
  drop constraint if exists checkout_submissions_ghl_sync_status_chk;
alter table public.checkout_submissions
  add constraint checkout_submissions_ghl_sync_status_chk
  check (ghl_sync_status in ('pending','success','error'));
```

---

### C2) RLS policies (public insert where needed; admin read/update/delete)

#### `form_submissions`

```sql
alter table public.form_submissions enable row level security;

drop policy if exists "public_insert_form_submissions" on public.form_submissions;
create policy "public_insert_form_submissions"
on public.form_submissions for insert
to public
with check (true);

drop policy if exists "admin_select_form_submissions" on public.form_submissions;
create policy "admin_select_form_submissions"
on public.form_submissions for select
to authenticated
using (auth.uid() is not null and public.has_role(auth.uid(), 'admin'));

drop policy if exists "admin_update_form_submissions" on public.form_submissions;
create policy "admin_update_form_submissions"
on public.form_submissions for update
to authenticated
using (auth.uid() is not null and public.has_role(auth.uid(), 'admin'))
with check (auth.uid() is not null and public.has_role(auth.uid(), 'admin'));

drop policy if exists "admin_delete_form_submissions" on public.form_submissions;
create policy "admin_delete_form_submissions"
on public.form_submissions for delete
to authenticated
using (auth.uid() is not null and public.has_role(auth.uid(), 'admin'));
```

#### `jobs`

```sql
alter table public.jobs enable row level security;

drop policy if exists "public_read_open_jobs" on public.jobs;
create policy "public_read_open_jobs"
on public.jobs for select
to public
using (is_open = true);

drop policy if exists "admin_manage_jobs" on public.jobs;
create policy "admin_manage_jobs"
on public.jobs for all
to authenticated
using (auth.uid() is not null and public.has_role(auth.uid(), 'admin'))
with check (auth.uid() is not null and public.has_role(auth.uid(), 'admin'));
```

#### `job_applications`

```sql
alter table public.job_applications enable row level security;

drop policy if exists "public_insert_job_apps_open_jobs_only" on public.job_applications;
create policy "public_insert_job_apps_open_jobs_only"
on public.job_applications for insert
to public
with check (
  exists (
    select 1
    from public.jobs j
    where j.id = job_applications.job_id
      and j.is_open = true
  )
);

drop policy if exists "admin_select_job_apps" on public.job_applications;
create policy "admin_select_job_apps"
on public.job_applications for select
to authenticated
using (auth.uid() is not null and public.has_role(auth.uid(), 'admin'));

drop policy if exists "admin_update_job_apps" on public.job_applications;
create policy "admin_update_job_apps"
on public.job_applications for update
to authenticated
using (auth.uid() is not null and public.has_role(auth.uid(), 'admin'))
with check (auth.uid() is not null and public.has_role(auth.uid(), 'admin'));

drop policy if exists "admin_delete_job_apps" on public.job_applications;
create policy "admin_delete_job_apps"
on public.job_applications for delete
to authenticated
using (auth.uid() is not null and public.has_role(auth.uid(), 'admin'));
```

---

### C3) Edge Function folder/module structure (TypeScript, pseudocode‑level)

#### Folder structure

```
supabase/functions/
  _shared/
    cors.ts
    supabaseAdmin.ts
    validators.ts
    ghlClient.ts
    notes.ts
    utm.ts
  start-checkout/
    index.ts
  submit-form/
    index.ts
  careers-upload-url/
    index.ts
  submit-job-application/
    index.ts
  get-resume-download-url/
    index.ts
```

#### `_shared/ghlClient.ts` (core, shared)

Key verified behaviors:

* Upsert contact endpoint exists and respects “Allow Duplicate Contact” setting.
* Add tags endpoint exists.
* Create note endpoint exists.
* Private integration token usage + `Version: 2021-07-28` header.

Pseudocode:

```ts
// supabase/functions/_shared/ghlClient.ts
const BASE = Deno.env.get('GHL_API_BASE_URL') ?? 'https://services.leadconnectorhq.com';
const TOKEN = Deno.env.get('GHL_PRIVATE_TOKEN')!;
const VERSION = Deno.env.get('GHL_API_VERSION') ?? '2021-07-28';
const LOCATION_ID = Deno.env.get('GHL_LOCATION_ID')!;

function ghlHeaders(extra: Record<string,string> = {}) {
  return {
    'Authorization': TOKEN,          // accept raw token; if you store "Bearer xxx", it will still work
    'Version': VERSION,
    'Accept': 'application/json',
    ...extra,
  };
}

export async function upsertContact(input: {
  firstName?: string; lastName?: string; name?: string;
  email?: string; phone?: string;
  tags?: string[];
  customFields?: Array<{id: string; value: string}>;
}) {
  const body = { locationId: LOCATION_ID, ...input };
  const res = await fetch(`${BASE}/contacts/upsert`, {
    method: 'POST',
    headers: ghlHeaders({'Content-Type':'application/json'}),
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`GHL upsert failed: ${res.status} ${await res.text()}`);
  return await res.json(); // contains contact object
}

export async function addTags(contactId: string, tags: string[]) {
  const res = await fetch(`${BASE}/contacts/${contactId}/tags`, {
    method: 'POST',
    headers: ghlHeaders({'Content-Type':'application/json'}),
    body: JSON.stringify({ tags }),
  });
  if (!res.ok) throw new Error(`GHL tags failed: ${res.status} ${await res.text()}`);
}

export async function createNote(contactId: string, body: string) {
  const res = await fetch(`${BASE}/contacts/${contactId}/notes`, {
    method: 'POST',
    headers: ghlHeaders({'Content-Type':'application/json'}),
    body: JSON.stringify({ body }),
  });
  if (!res.ok) throw new Error(`GHL note failed: ${res.status} ${await res.text()}`);
}
```

#### `_shared/validators.ts`

* Zod schemas per form_type (checkout/contact/localpros/job_app).
* Normalize phone/email.
* Enforce TCPA checkbox required (BRD consent disclosure). 

#### `start-checkout/index.ts`

Purpose: validate → insert into `checkout_submissions` → upsert contact + tag + note → return redirect URL.

**Needs Verification:** BRD states URL params are passed to GHL checkout.  I could not verify official documentation for “order form prefill via URL params,” so MVP should redirect to the correct checkout URL without prefill if needed.

Pseudocode:

```ts
// start-checkout/index.ts
import { corsHeaders } from '../_shared/cors.ts';
import { supabaseAdmin } from '../_shared/supabaseAdmin.ts';
import { upsertContact, addTags, createNote } from '../_shared/ghlClient.ts';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const payload = await req.json(); // tier, first_name, last_name, email, phone, business_name, domain_choice, domain_name...
    // validate...

    const sb = supabaseAdmin();

    const { data: row, error: insErr } = await sb
      .from('checkout_submissions')
      .insert({
        tier: payload.tier,
        first_name: payload.first_name,
        last_name: payload.last_name,
        email: payload.email,
        phone: payload.phone,
        business_name: payload.business_name,
        domain_choice: payload.domain_choice,
        domain_name: payload.domain_name ?? null,
        tcpa_consent: payload.tcpa_consent,
        consent_timestamp: new Date().toISOString(),
        source_url: payload.source_url,
        referrer: payload.referrer,
        utm_source: payload.utm?.utm_source,
        // ...
        ghl_sync_status: 'pending',
      })
      .select('*')
      .single();

    if (insErr) throw insErr;

    const contact = await upsertContact({
      firstName: payload.first_name,
      lastName: payload.last_name,
      email: payload.email,
      phone: payload.phone,
    });

    await addTags(contact.contact.id, [tagForTier(payload.tier)]);
    await createNote(contact.contact.id, buildCheckoutNote(payload, row.id));

    await sb.from('checkout_submissions').update({
      ghl_contact_id: contact.contact.id,
      ghl_sync_status: 'success',
      ghl_synced_at: new Date().toISOString(),
    }).eq('id', row.id);

    return json({ submission_id: row.id, redirect_url: checkoutUrlForTier(payload.tier) }, 200);
  } catch (e) {
    return json({ error: String(e) }, 400);
  }
});
```

#### `submit-form/index.ts`

Handles `form_submissions` for:

* contact/get-started (non‑checkout “contact us” style, if used)
* localpros apply

Same pattern: insert → upsert contact → tags + note → update row.

#### Resume upload flow for careers (browser → storage → edge fn → GHL)

**Recommended MVP flow:**

1. Browser requests signed upload URL → `careers-upload-url`
2. Browser uploads resume to Supabase Storage using signed URL/token
3. Browser submits application → `submit-job-application`, passing `resume_path`
4. Edge function generates a **7‑day signed download URL** for the resume and includes it in the GHL note (and stores the storage path in DB).

   * If the link expires, admin can regenerate via `get-resume-download-url`.

This keeps resumes private by default, avoids open upload buckets, and still gives GHL users a “clickable” resume for a reasonable window.

`careers-upload-url/index.ts` pseudocode:

```ts
// careers-upload-url/index.ts
// input: { fileName, contentType, sizeBytes, jobId }
const path = `resumes/${jobId}/${crypto.randomUUID()}-${sanitize(fileName)}`;
const { data } = await sb.storage.from('resumes').createSignedUploadUrl(path);
return { path, signedUrl: data.signedUrl, token: data.token };
```

`submit-job-application/index.ts` pseudocode:

```ts
// submit-job-application/index.ts
// validate payload vs job config (loom_required/portfolio_required/custom_questions)
insert job_applications (resume_url = resume_path)
if resume_path:
  signed = await sb.storage.from('resumes').createSignedUrl(resume_path, 60*60*24*7)
upsert contact + tag + note (include signed.signedUrl)
update job_applications ghl_sync_status
```

---

### C4) Frontend component organization (shared + per‑form configs)

#### Shared form components

```
src/components/forms/
  FormShell.tsx           // title, description, submit button, loading, error/success UI
  Field.tsx               // base wrapper (label, hint, error)
  fields/
    TextInput.tsx
    EmailInput.tsx
    PhoneInput.tsx
    Textarea.tsx
    Select.tsx
    Checkbox.tsx
    FileInput.tsx
  ConsentCheckbox.tsx     // includes TCPA disclosure text
  UTMHiddenFields.tsx     // pulls UTM/gclid/fbclid from URL and passes into payload
  useSubmission.ts        // calls supabase.functions.invoke + handles toast/errors
```

#### Form configs (mapping fields → validation → endpoint)

```
src/forms/
  types.ts
  checkoutSmartSite.config.ts
  localProsApply.config.ts
  contact.config.ts
```

Example config shape:

```ts
export type FormConfig<TValues> = {
  formType: string;
  submitFn: 'start-checkout' | 'submit-form' | 'submit-job-application';
  buildPayload: (values: TValues, ctx: { utm: UTM; page: string; referrer?: string }) => any;
  validate: (values: TValues) => { ok: true } | { ok: false; errors: Record<string,string> };
};
```

* Checkout pre‑form uses `start-checkout` and writes to `checkout_submissions`.
* LocalPros apply uses `submit-form` and writes to `form_submissions` with `form_type='localpros_apply'`.
* Careers apply uses `careers-upload-url` + `submit-job-application`.

---

## D) IMPLEMENTATION PLAN (TIGHT, MVP‑FIRST)

### 1) Decide + implement form architecture (unblocks everything)

**Definition of Done**

* `form_submissions`, `jobs`, `job_applications` tables exist with RLS.
* Edge shared modules exist (`_shared/ghlClient.ts`, `_shared/validators.ts`).
* Skeleton edge functions deployed: `start-checkout`, `submit-form`, `careers-upload-url`, `submit-job-application`.
* Admin `/admin/submissions` updated to support “Type” filter UI (even if some types are empty initially).

**Lovable changes (files/routes)**

* Add shared form components + configs under `src/components/forms/*` + `src/forms/*`.
* Update `/admin/submissions` page to support filter dropdown and “detail drawer” UI.

**Supabase changes (SQL)**

* Run SQL in C1 + C2.
* Ensure existing `checkout_submissions` has the additional tracking/GHL sync columns (C1.3).

**GHL changes**

* Create a Private Integration Token (used by edge functions).
* Decide location ID.

**Can be deferred safely**

* Domain purchase automation (n8n) and GHL custom fields mapping (notes + tags are enough for MVP).

---

### 2) Implement Contact/Get Started checkout flow end‑to‑end into GHL

This is the **pre‑checkout → redirect to GHL checkout** flow. 

**Definition of Done**

* `/checkout/smart-site` (at least) is fully functional:

  * Validates required fields + TCPA consent
  * Optional domain availability check when “new domain”
  * Calls `start-checkout` edge function
  * Redirects to the correct GHL checkout URL
* `checkout_submissions` row is created and shows `ghl_contact_id` + `ghl_sync_status='success'`.
* `/checkout/success` page exists with next steps and support links. 

**Lovable changes (files/routes)**

* Implement routes/pages:

  * `src/pages/checkout/SmartSiteCheckout.tsx`
  * `src/pages/checkout/Success.tsx`
* Add/implement `DomainSearch` component (shared with `/domains`) based on BRD patterns. 

**Supabase changes (SQL)**

* Apply the `checkout_submissions` “upgrade” SQL (C1.3) if needed.

**GHL changes**

* Create tags:

  * `SS: Checkout Started - T1` (and later T2/T3/T4)
* Optional (recommended): configure contact duplicate rules to reduce dupes (upsert behavior respects location setting).

**Needs Verification (safe fallback)**

* **Prefill in GHL checkout via URL params**: BRD implies it. 
  If unverified, redirect without prefill; rely on GHL checkout to collect billing info and keep our pre-checkout record + GHL tags/notes for reconciliation.

**Can be deferred safely**

* Multi‑tier checkout pages (build T1 first, then clone config for others).
* Automated domain purchase (keep status “pending” + internal manual process).

---

### 3) Implement LocalPros apply end‑to‑end

**Definition of Done**

* `/localpros/apply` form works and writes to `form_submissions` with `form_type='localpros_apply'`.
* Edge function upserts GHL contact, tags it, and adds a note with niche + market.
* Admin can view it in `/admin/submissions` filtered to LocalPros.

**Lovable changes (files/routes)**

* Implement:

  * `src/pages/localpros/Apply.tsx`
  * Add config `src/forms/localProsApply.config.ts`
* Minimum fields aligned with BRD partner requirements (name/email/phone + niche + market). 

**Supabase changes (SQL)**

* None beyond Step 1.

**GHL changes**

* Tag: `LP: Partner Apply`
* Workflow: send internal notification (email/Slack) with submission details.

**Can be deferred safely**

* Partner “approval” workflow UI (status changes can be handled in admin later).

---

### 4) Implement Careers MVP (jobs + apply + resume upload)

**Definition of Done**

* Public:

  * `/careers` lists open jobs
  * `/careers/:slug` shows job details + apply form
* Admin:

  * `/admin/careers` CRUD job postings (create/edit/close)
* Apply:

  * Resume upload works (private storage)
  * Application inserts into `job_applications`
  * GHL contact upsert + tag + note (includes 7‑day resume signed link)

**Lovable changes (files/routes)**

* Public pages:

  * `src/pages/careers/Index.tsx`
  * `src/pages/careers/JobDetail.tsx`
* Admin page:

  * `src/pages/admin/Careers.tsx` (jobs CRUD)
* Shared “dynamic field” builder for `custom_questions` + conditional loom/portfolio requirements. 

**Supabase changes (SQL)**

* Careers tables + RLS from Step 1.

**GHL changes**

* Tag: `Careers: Application`
* Workflow: internal notification with job slug + applicant info.

**Can be deferred safely**

* Uploading the resume *into* GHL media (store in Supabase + link is enough for MVP).
* Interview scheduling integration.

---

### 5) Cookie consent gating + chat widget injection

This must gate GA4 + chat until consent. 

**Definition of Done**

* Cookie banner:

  * Appears after ~1.5s if no stored choice
  * Stores choice in localStorage (`cookie-consent`)
  * Supports Accept All / Reject All / Preferences
* GA4 only loads after analytics consent.
* GHL chat widget only loads after consent + not on admin routes, using the loader pattern. 
* Desktop chat button works and is hidden on mobile. 

**Lovable changes (files/routes)**

* Add:

  * `src/components/consent/CookieConsent.tsx`
  * `src/components/chat/GHLChatWidget.tsx`
  * `src/components/chat/DesktopChatButton.tsx`
  * `src/utils/ghlLoader.ts` (loader.js constants) 
* Wire into App root per integration pattern. 

**Supabase changes**

* None.

**GHL changes**

* Ensure widget is configured in GHL and you have the widget key/script settings.

**Can be deferred safely**

* Full CMP / IAB framework (overkill for MVP).

---

### 6) Finish core marketing pages + legal pages

**Definition of Done**

* Core public pages implemented enough to support ads + checkout.
* Legal pages implemented and linked in footer:

  * `/legal/privacy-policy`
  * `/legal/terms-of-service`
  * `/legal/data-request` 
* Domain tool page `/domains` shipped per spec. 

**Lovable changes (files/routes)**

* Implement `/domains` page + shared `DomainSearch`.
* Implement legal pages + cookie preferences page behavior.

**Supabase changes**

* None.

**GHL changes**

* None.

**Domain API (Namecheap) Reality Check**

* Namecheap requires **whitelisting ClientIp** for API access.
* Vercel can provide **Static IPs for Serverless Functions** (not Edge).
  **Recommendation:** implement `/api/domains/check` as a **Vercel Serverless Function** and enable Vercel Static IPs → whitelist those IPs in Namecheap.

**Can be deferred safely**

* Full domain purchase automation (n8n). Keep it manual initially if needed.

---

### 7) Ads + GTM tracking reliability

**Definition of Done**

* GA4 fires only after consent, and key events are tracked:

  * `checkout_started`
  * `form_submitted` (localpros, careers)
* UTM + gclid/fbclid captured and stored alongside submissions (DB + GHL notes).
* Test plan executed (GA4 DebugView + real checkout test).

**Lovable changes**

* Add analytics utility + event emitter used by forms.
* Confirm SSG routing doesn’t double‑fire events on hydration.

**Supabase**

* Already storing UTM fields (Step 1).

**GHL**

* Optional: map “lead source” fields in GHL workflows based on tags/notes.

**Can be deferred safely**

* Multi-touch attribution, offline conversions, advanced GTM containers.

---

### Assumptions (defaults chosen to minimize support + LOE)

* If GHL checkout URL prefill is not reliable, MVP redirects to the correct checkout URL without prefill and relies on **tags + notes** created during `start-checkout`. (No launch blocker.)
* Domain purchase automation (n8n) can be deferred; the critical MVP requirement is **real-time domain check** in checkout and/or `/domains`. 
* Resumes stay in Supabase private storage; GHL note includes a **7‑day signed URL**, and admin can regenerate if needed.
