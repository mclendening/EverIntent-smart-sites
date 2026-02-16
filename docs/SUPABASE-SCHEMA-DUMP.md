# Supabase Schema Dump

> **Generated**: 2026-02-16  
> **Project ID**: `nweklcxzoemcnwaoakvq`  
> **Purpose**: Complete database schema for cross-system audit

---

## 1. Tables

All 12 tables have **RLS enabled**.

### 1.1 `allowed_admin_emails`

| # | Column | Type | Nullable | Default | Constraints |
|---|--------|------|----------|---------|-------------|
| 1 | id | uuid | NO | `gen_random_uuid()` | PK |
| 2 | email | text | NO | — | UNIQUE |
| 3 | created_at | timestamp without time zone | YES | `now()` | — |
| 4 | created_by | uuid | YES | — | FK → `auth.users.id` |

### 1.2 `checkout_submissions`

| # | Column | Type | Nullable | Default | Constraints |
|---|--------|------|----------|---------|-------------|
| 1 | id | uuid | NO | `gen_random_uuid()` | PK |
| 2 | name | text | NO | — | — |
| 3 | email | text | NO | — | — |
| 4 | phone | text | YES | — | — |
| 5 | company | text | YES | — | — |
| 6 | service_interest | text | YES | — | — |
| 7 | message | text | YES | — | — |
| 8 | source_page | text | YES | — | — |
| 9 | utm_source | text | YES | — | — |
| 10 | utm_medium | text | YES | — | — |
| 11 | utm_campaign | text | YES | — | — |
| 12 | status | text | YES | `'new'` | — |
| 13 | created_at | timestamptz | NO | `now()` | — |
| 14 | updated_at | timestamptz | NO | `now()` | — |
| 15 | ghl_contact_id | text | YES | — | — |
| 16 | ghl_sync_status | text | YES | `'pending'` | — |
| 17 | ghl_synced_at | timestamptz | YES | — | — |
| 18 | ghl_error | text | YES | — | — |
| 19 | tcpa_consent | boolean | YES | `false` | — |
| 20 | consent_timestamp | timestamptz | YES | — | — |
| 21 | ip_address | text | YES | — | — |
| 22 | user_agent | text | YES | — | — |
| 23 | first_name | text | YES | — | — |
| 24 | last_name | text | YES | — | — |
| 25 | business_name | text | YES | — | — |
| 26 | has_domain | boolean | YES | `false` | — |
| 27 | domain_name | text | YES | — | — |
| 28 | selected_tier | text | YES | — | — |
| 29 | addons | jsonb | YES | `'[]'::jsonb` | — |
| 30 | monthly_total | numeric(10,2) | YES | `0.00` | — |
| 31 | setup_total | numeric(10,2) | YES | `0.00` | — |
| 32 | affiliate_id | text | YES | — | — |

### 1.3 `form_submissions`

| # | Column | Type | Nullable | Default | Constraints |
|---|--------|------|----------|---------|-------------|
| 1 | id | uuid | NO | `gen_random_uuid()` | PK |
| 2 | form_type | text | NO | — | — |
| 3 | name | text | NO | — | — |
| 4 | email | text | NO | — | — |
| 5 | phone | text | YES | — | — |
| 6 | company | text | YES | — | — |
| 7 | message | text | YES | — | — |
| 8 | tcpa_consent | boolean | NO | `false` | — |
| 9 | consent_timestamp | timestamptz | YES | — | — |
| 10 | ip_address | text | YES | — | — |
| 11 | user_agent | text | YES | — | — |
| 12 | utm_source | text | YES | — | — |
| 13 | utm_medium | text | YES | — | — |
| 14 | utm_campaign | text | YES | — | — |
| 15 | source_page | text | YES | — | — |
| 16 | ghl_contact_id | text | YES | — | — |
| 17 | ghl_sync_status | text | YES | `'pending'` | — |
| 18 | ghl_synced_at | timestamptz | YES | — | — |
| 19 | ghl_error | text | YES | — | — |
| 20 | created_at | timestamptz | NO | `now()` | — |
| 21 | updated_at | timestamptz | NO | `now()` | — |
| 22 | affiliate_id | text | YES | — | — |

### 1.4 `job_applications`

| # | Column | Type | Nullable | Default | Constraints |
|---|--------|------|----------|---------|-------------|
| 1 | id | uuid | NO | `gen_random_uuid()` | PK |
| 2 | job_id | uuid | YES | — | FK → `jobs.id` |
| 3 | name | text | NO | — | — |
| 4 | email | text | NO | — | — |
| 5 | phone | text | YES | — | — |
| 6 | resume_url | text | YES | — | — |
| 7 | cover_letter | text | YES | — | — |
| 8 | linkedin_url | text | YES | — | — |
| 9 | portfolio_url | text | YES | — | — |
| 10 | video_intro_url | text | YES | — | — |
| 11 | tcpa_consent | boolean | NO | `false` | — |
| 12 | consent_timestamp | timestamptz | YES | — | — |
| 13 | ip_address | text | YES | — | — |
| 14 | user_agent | text | YES | — | — |
| 15 | utm_source | text | YES | — | — |
| 16 | utm_medium | text | YES | — | — |
| 17 | utm_campaign | text | YES | — | — |
| 18 | source_page | text | YES | — | — |
| 19 | ghl_contact_id | text | YES | — | — |
| 20 | ghl_sync_status | text | YES | `'pending'` | — |
| 21 | ghl_synced_at | timestamptz | YES | — | — |
| 22 | ghl_error | text | YES | — | — |
| 23 | status | text | YES | `'new'` | — |
| 24 | created_at | timestamptz | NO | `now()` | — |
| 25 | updated_at | timestamptz | NO | `now()` | — |
| 26 | affiliate_id | text | YES | — | — |

### 1.5 `jobs`

| # | Column | Type | Nullable | Default | Constraints |
|---|--------|------|----------|---------|-------------|
| 1 | id | uuid | NO | `gen_random_uuid()` | PK |
| 2 | title | text | NO | — | — |
| 3 | slug | text | NO | — | UNIQUE |
| 4 | department | text | YES | — | — |
| 5 | location | text | YES | — | — |
| 6 | employment_type | text | YES | — | — |
| 7 | description | text | YES | — | — |
| 8 | requirements | text | YES | — | — |
| 9 | benefits | text | YES | — | — |
| 10 | salary_range | text | YES | — | — |
| 11 | is_published | boolean | YES | `false` | — |
| 12 | display_order | integer | YES | `0` | — |
| 13 | created_at | timestamptz | NO | `now()` | — |
| 14 | updated_at | timestamptz | NO | `now()` | — |

### 1.6 `logo_versions`

| # | Column | Type | Nullable | Default | Constraints |
|---|--------|------|----------|---------|-------------|
| 1 | id | uuid | NO | `gen_random_uuid()` | PK |
| 2 | version | integer | NO | `1` | — |
| 3 | name | text | NO | — | — |
| 4 | ever_config | jsonb | NO | `'{"size":72,"weight":700,"gradientTo":"#A855F7","marginLeft":0,"solidColor":"#FFFFFF","marginRight":0,"useGradient":false,"gradientFrom":"#FFFFFF","gradientAngle":135,"verticalOffset":0}'` | — |
| 5 | intent_config | jsonb | NO | `'{"size":72,"weight":700,"gradientTo":"#FFFFFF","marginLeft":0,"solidColor":"#A855F7","marginRight":0,"useGradient":false,"gradientFrom":"#A855F7","gradientAngle":135,"verticalOffset":1}'` | — |
| 6 | streak_config | jsonb | NO | `'{"length":373,"leftThick":4,"gradientTo":"#FBF9F9","marginLeft":0,"rightThick":1,"solidColor":"#A855F7","marginRight":0,"useGradient":true,"gradientFrom":"#A855F7","gradientAngle":90}'` | — |
| 7 | tagline_config | jsonb | NO | `'{"size":29,"weight":400,"marginTop":5,"gradientTo":"#A855F7","marginLeft":0,"solidColor":"#FFFFFF","marginRight":0,"useGradient":false,"gradientFrom":"#FFFFFF","gradientAngle":135}'` | — |
| 8 | tagline_text | text | YES | `'Web Design & Automation'` | — |
| 9 | is_active | boolean | YES | `false` | — |
| 10 | changelog_notes | text | YES | — | — |
| 11 | created_at | timestamptz | NO | `now()` | — |
| 12 | updated_at | timestamptz | NO | `now()` | — |

### 1.7 `page_theme_assignments`

| # | Column | Type | Nullable | Default | Constraints |
|---|--------|------|----------|---------|-------------|
| 1 | id | uuid | NO | `gen_random_uuid()` | PK |
| 2 | page_route | text | NO | — | UNIQUE |
| 3 | theme_id | uuid | YES | — | FK → `site_themes.id` |
| 4 | created_at | timestamptz | NO | `now()` | — |
| 5 | updated_at | timestamptz | NO | `now()` | — |

### 1.8 `portfolio`

| # | Column | Type | Nullable | Default | Constraints |
|---|--------|------|----------|---------|-------------|
| 1 | id | uuid | NO | `gen_random_uuid()` | PK |
| 2 | title | text | NO | — | — |
| 3 | slug | text | NO | — | UNIQUE |
| 4 | description | text | YES | — | — |
| 5 | client_name | text | YES | — | — |
| 6 | industry | text | YES | — | — |
| 7 | services_provided | text[] | YES | — | — |
| 8 | featured_image_url | text | YES | — | — |
| 9 | gallery_urls | text[] | YES | — | — |
| 10 | results_summary | text | YES | — | — |
| 11 | testimonial_quote | text | YES | — | — |
| 12 | website_url | text | YES | — | — |
| 13 | is_featured | boolean | YES | `false` | — |
| 14 | is_published | boolean | YES | `false` | — |
| 15 | display_order | integer | YES | `0` | — |
| 16 | created_at | timestamptz | NO | `now()` | — |
| 17 | updated_at | timestamptz | NO | `now()` | — |

### 1.9 `published_theme_configs`

| # | Column | Type | Nullable | Default | Constraints |
|---|--------|------|----------|---------|-------------|
| 1 | id | uuid | NO | `gen_random_uuid()` | PK |
| 2 | source_theme_id | uuid | YES | — | FK → `site_themes.id` |
| 3 | source_theme_name | text | NO | — | — |
| 4 | config_json | jsonb | NO | — | — |
| 5 | config_typescript | text | NO | — | — |
| 6 | config_css | text | YES | — | — |
| 7 | version | integer | NO | `1` | UNIQUE |
| 8 | is_active | boolean | YES | `false` | — |
| 9 | is_default | boolean | YES | `false` | — |
| 10 | notes | text | YES | — | — |
| 11 | created_by | uuid | YES | — | FK → `auth.users.id` |
| 12 | created_at | timestamptz | NO | `now()` | — |

### 1.10 `site_themes`

| # | Column | Type | Nullable | Default | Constraints |
|---|--------|------|----------|---------|-------------|
| 1 | id | uuid | NO | `gen_random_uuid()` | PK |
| 2 | name | text | NO | — | — |
| 3 | base_hue | integer | NO | `270` | — |
| 4 | default_mode | text | NO | `'dark'` | — |
| 5 | is_active | boolean | YES | `false` | — |
| 6 | version | integer | NO | `1` | — |
| 7 | accent_config | jsonb | NO | `'{"accent":"38 92% 50%","accentGlow":"38 92% 50%","accentHover":"32 95% 44%","accentForeground":"222 47% 11%"}'` | — |
| 8 | accent_locked_to_base | boolean | YES | `true` | — |
| 9 | primitive_tokens | jsonb | NO | `'{}'` | — |
| 10 | semantic_tokens | jsonb | NO | `'{}'` | — |
| 11 | component_tokens | jsonb | NO | `'{}'` | — |
| 12 | static_colors | jsonb | NO | *(see below)* | — |
| 13 | dark_mode_overrides | jsonb | YES | `'{}'` | — |
| 14 | style_modules | jsonb | NO | `'[]'` | — |
| 15 | typography_config | jsonb | NO | `'{"fontBody":"Inter, …","fontDisplay":"Inter, …","fontHeading":"Space Grotesk, …","fontMono":"JetBrains Mono, …"}'` | — |
| 16 | motion_config | jsonb | NO | `'{"transitionBounce":"…","transitionSmooth":"…","transitionSpring":"…"}'` | — |
| 17 | ecommerce_colors | jsonb | NO | `'{"gold":"39 95% 50%","goldGlow":"39 95% 60%","goldHover":"35 95% 44%","goldForeground":"0 0% 100%","pricingHighlight":"39 95% 50%"}'` | — |
| 18 | cta_variants | jsonb | NO | `'{"primary":"240 70% 60%","secondary":"39 95% 50%","primaryHover":"240 70% 50%","secondaryHover":"35 95% 44%"}'` | — |
| 19 | ada_widget_config | jsonb | NO | *(ADA widget defaults)* | — |
| 20 | ghl_chat_config | jsonb | NO | *(GHL chat styling defaults)* | — |
| 21 | gradient_configs | jsonb | NO | `'{"cta":"linear-gradient(…)","hero":"linear-gradient(…)","text":"linear-gradient(…)"}'` | — |
| 22 | logo_version_id | uuid | YES | — | FK → `logo_versions.id` |
| 23 | changelog_notes | text | YES | — | — |
| 24 | created_at | timestamptz | NO | `now()` | — |
| 25 | updated_at | timestamptz | NO | `now()` | — |

**`static_colors` default:**
```json
{
  "background": "0 0% 100%",
  "foreground": "222 47% 11%",
  "card": "0 0% 100%",
  "cardForeground": "222 47% 11%",
  "popover": "0 0% 100%",
  "popoverForeground": "222 47% 11%",
  "primary": "222 47% 11%",
  "primaryLight": "215 25% 27%",
  "primaryForeground": "0 0% 100%",
  "secondary": "60 9% 98%",
  "secondaryForeground": "222 47% 11%",
  "muted": "60 5% 96%",
  "mutedForeground": "215 16% 47%",
  "border": "220 13% 91%",
  "input": "220 13% 91%",
  "ring": "240 70% 60%"
}
```

### 1.11 `testimonials`

| # | Column | Type | Nullable | Default | Constraints |
|---|--------|------|----------|---------|-------------|
| 1 | id | uuid | NO | `gen_random_uuid()` | PK |
| 2 | client_name | text | NO | — | — |
| 3 | client_title | text | YES | — | — |
| 4 | client_company | text | YES | — | — |
| 5 | client_photo_url | text | YES | — | — |
| 6 | quote | text | NO | — | — |
| 7 | rating | integer | YES | — | — |
| 8 | industry | text | YES | — | — |
| 9 | service_type | text | YES | — | — |
| 10 | is_featured | boolean | YES | `false` | — |
| 11 | is_published | boolean | YES | `false` | — |
| 12 | display_order | integer | YES | `0` | — |
| 13 | created_at | timestamptz | NO | `now()` | — |
| 14 | updated_at | timestamptz | NO | `now()` | — |

### 1.12 `user_roles`

| # | Column | Type | Nullable | Default | Constraints |
|---|--------|------|----------|---------|-------------|
| 1 | id | uuid | NO | `gen_random_uuid()` | PK |
| 2 | user_id | uuid | NO | — | FK → `auth.users.id`, UNIQUE(user_id, role) |
| 3 | role | app_role (enum) | NO | — | UNIQUE(user_id, role) |
| 4 | created_at | timestamp without time zone | YES | `now()` | — |

---

## 2. Foreign Key Summary

| Table | Column | → Foreign Table | → Column | Constraint Name |
|-------|--------|-----------------|----------|-----------------|
| allowed_admin_emails | created_by | auth.users | id | allowed_admin_emails_created_by_fkey |
| job_applications | job_id | jobs | id | job_applications_job_id_fkey |
| page_theme_assignments | theme_id | site_themes | id | page_theme_assignments_theme_id_fkey |
| published_theme_configs | created_by | auth.users | id | published_theme_configs_created_by_fkey |
| published_theme_configs | source_theme_id | site_themes | id | published_theme_configs_source_theme_id_fkey |
| site_themes | logo_version_id | logo_versions | id | site_themes_logo_version_id_fkey |
| user_roles | user_id | auth.users | id | user_roles_user_id_fkey |

---

## 3. RLS Policies

| Table | Policy Name | Cmd | USING | WITH CHECK |
|-------|-------------|-----|-------|------------|
| allowed_admin_emails | Admins can manage allowed emails | ALL | `has_role(auth.uid(), 'admin')` | — |
| checkout_submissions | Admins can delete submissions | DELETE | `has_role(auth.uid(), 'admin')` | — |
| checkout_submissions | Admins can update submissions | UPDATE | `has_role(auth.uid(), 'admin')` | — |
| checkout_submissions | Admins can view all submissions | SELECT | `has_role(auth.uid(), 'admin')` | — |
| checkout_submissions | Anyone can submit checkout form | INSERT | — | `true` |
| form_submissions | Admins can delete form submissions | DELETE | `has_role(auth.uid(), 'admin')` | — |
| form_submissions | Admins can update form submissions | UPDATE | `has_role(auth.uid(), 'admin')` | — |
| form_submissions | Admins can view all form submissions | SELECT | `has_role(auth.uid(), 'admin')` | — |
| form_submissions | Anyone can submit forms | INSERT | — | `true` |
| job_applications | Admins can delete job applications | DELETE | `has_role(auth.uid(), 'admin')` | — |
| job_applications | Admins can update job applications | UPDATE | `has_role(auth.uid(), 'admin')` | — |
| job_applications | Admins can view all job applications | SELECT | `has_role(auth.uid(), 'admin')` | — |
| job_applications | Anyone can submit job applications | INSERT | — | `true` |
| jobs | Admins can delete jobs | DELETE | `has_role(auth.uid(), 'admin')` | — |
| jobs | Admins can insert jobs | INSERT | — | `has_role(auth.uid(), 'admin')` |
| jobs | Admins can update jobs | UPDATE | `has_role(auth.uid(), 'admin')` | — |
| jobs | Admins can view all jobs | SELECT | `has_role(auth.uid(), 'admin')` | — |
| jobs | Anyone can view published jobs | SELECT | `(is_published = true)` | — |
| logo_versions | Admins can delete logo versions | DELETE | `has_role(auth.uid(), 'admin')` | — |
| logo_versions | Admins can insert logo versions | INSERT | — | `has_role(auth.uid(), 'admin')` |
| logo_versions | Admins can update logo versions | UPDATE | `has_role(auth.uid(), 'admin')` | — |
| logo_versions | Anyone can view logo versions | SELECT | `true` | — |
| page_theme_assignments | Admins can delete page assignments | DELETE | `has_role(auth.uid(), 'admin')` | — |
| page_theme_assignments | Admins can insert page assignments | INSERT | — | `has_role(auth.uid(), 'admin')` |
| page_theme_assignments | Admins can update page assignments | UPDATE | `has_role(auth.uid(), 'admin')` | — |
| page_theme_assignments | Anyone can view page assignments | SELECT | `true` | — |
| portfolio | Admins can delete portfolio | DELETE | `has_role(auth.uid(), 'admin')` | — |
| portfolio | Admins can insert portfolio | INSERT | — | `has_role(auth.uid(), 'admin')` |
| portfolio | Admins can update portfolio | UPDATE | `has_role(auth.uid(), 'admin')` | — |
| portfolio | Admins can view all portfolio | SELECT | `has_role(auth.uid(), 'admin')` | — |
| portfolio | Anyone can view published portfolio | SELECT | `(is_published = true)` | — |
| published_theme_configs | Admins can delete published configs | DELETE | `has_role(auth.uid(), 'admin')` | — |
| published_theme_configs | Admins can insert published configs | INSERT | — | `has_role(auth.uid(), 'admin')` |
| published_theme_configs | Admins can update published configs | UPDATE | `has_role(auth.uid(), 'admin')` | — |
| published_theme_configs | Admins can view published configs | SELECT | `has_role(auth.uid(), 'admin')` | — |
| site_themes | Admins can delete themes | DELETE | `has_role(auth.uid(), 'admin')` | — |
| site_themes | Admins can insert themes | INSERT | — | `has_role(auth.uid(), 'admin')` |
| site_themes | Admins can update themes | UPDATE | `has_role(auth.uid(), 'admin')` | — |
| site_themes | Anyone can view themes | SELECT | `true` | — |
| testimonials | Admins can delete testimonials | DELETE | `has_role(auth.uid(), 'admin')` | — |
| testimonials | Admins can insert testimonials | INSERT | — | `has_role(auth.uid(), 'admin')` |
| testimonials | Admins can update testimonials | UPDATE | `has_role(auth.uid(), 'admin')` | — |
| testimonials | Admins can view all testimonials | SELECT | `has_role(auth.uid(), 'admin')` | — |
| testimonials | Anyone can view published testimonials | SELECT | `(is_published = true)` | — |
| user_roles | Admins can manage roles | ALL | `has_role(auth.uid(), 'admin')` | — |

---

## 4. Custom Types / Enums

| Type Name | Values |
|-----------|--------|
| `app_role` | `admin`, `moderator`, `user` |

---

## 5. Functions

### `get_next_theme_config_version()`

| Property | Value |
|----------|-------|
| Language | sql |
| Returns | integer |
| Security | DEFINER |
| Search Path | `public` |

```sql
SELECT COALESCE(MAX(version), 0) + 1 FROM public.published_theme_configs;
```

### `has_role(_user_id uuid, _role app_role)`

| Property | Value |
|----------|-------|
| Language | sql |
| Returns | boolean |
| Security | DEFINER (STABLE) |
| Search Path | `public` |

```sql
SELECT EXISTS (
  SELECT 1
  FROM public.user_roles
  WHERE user_id = _user_id
    AND role = _role
)
```

### `update_updated_at_column()`

| Property | Value |
|----------|-------|
| Language | plpgsql |
| Returns | trigger |
| Security | INVOKER |
| Search Path | `public` |

```sql
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
```

---

## 6. Triggers

| Table | Trigger Name | Timing | Event | Function |
|-------|-------------|--------|-------|----------|
| checkout_submissions | update_checkout_submissions_updated_at | BEFORE | UPDATE | `update_updated_at_column()` |
| form_submissions | update_form_submissions_updated_at | BEFORE | UPDATE | `update_updated_at_column()` |
| job_applications | update_job_applications_updated_at | BEFORE | UPDATE | `update_updated_at_column()` |
| jobs | update_jobs_updated_at | BEFORE | UPDATE | `update_updated_at_column()` |
| logo_versions | update_logo_versions_updated_at | BEFORE | UPDATE | `update_updated_at_column()` |
| page_theme_assignments | update_page_theme_assignments_updated_at | BEFORE | UPDATE | `update_updated_at_column()` |
| portfolio | update_portfolio_updated_at | BEFORE | UPDATE | `update_updated_at_column()` |
| site_themes | update_site_themes_updated_at | BEFORE | UPDATE | `update_updated_at_column()` |
| testimonials | update_testimonials_updated_at | BEFORE | UPDATE | `update_updated_at_column()` |

**Note:** `allowed_admin_emails` and `user_roles` do NOT have `updated_at` triggers (they also lack `updated_at` columns).

---

## 7. Indexes

| Table | Index Name | Columns | Unique |
|-------|-----------|---------|--------|
| allowed_admin_emails | allowed_admin_emails_pkey | id | ✅ |
| allowed_admin_emails | allowed_admin_emails_email_key | email | ✅ |
| checkout_submissions | checkout_submissions_pkey | id | ✅ |
| checkout_submissions | idx_checkout_submissions_created_at | created_at DESC | ❌ |
| checkout_submissions | idx_checkout_submissions_status | status | ❌ |
| form_submissions | form_submissions_pkey | id | ✅ |
| job_applications | job_applications_pkey | id | ✅ |
| jobs | jobs_pkey | id | ✅ |
| jobs | jobs_slug_key | slug | ✅ |
| logo_versions | logo_versions_pkey | id | ✅ |
| page_theme_assignments | page_theme_assignments_pkey | id | ✅ |
| page_theme_assignments | page_theme_assignments_page_route_key | page_route | ✅ |
| portfolio | portfolio_pkey | id | ✅ |
| portfolio | portfolio_slug_key | slug | ✅ |
| portfolio | idx_portfolio_slug | slug | ❌ |
| portfolio | idx_portfolio_is_featured | is_featured | ❌ |
| portfolio | idx_portfolio_is_published | is_published | ❌ |
| published_theme_configs | published_theme_configs_pkey | id | ✅ |
| published_theme_configs | idx_published_theme_configs_version | version | ✅ |
| published_theme_configs | idx_published_theme_configs_active | is_active | ❌ |
| published_theme_configs | idx_published_theme_configs_created | created_at DESC | ❌ |
| site_themes | site_themes_pkey | id | ✅ |
| testimonials | testimonials_pkey | id | ✅ |
| testimonials | idx_testimonials_is_featured | is_featured | ❌ |
| testimonials | idx_testimonials_is_published | is_published | ❌ |
| user_roles | user_roles_pkey | id | ✅ |
| user_roles | user_roles_user_id_role_key | (user_id, role) | ✅ |

---

## 8. Storage Buckets

| Bucket | Public |
|--------|--------|
| `resumes` | No |

---

## 9. Edge Functions

| Function | JWT Required | Description |
|----------|-------------|-------------|
| `ghl-admin-fields` | Yes | Fetches GHL custom fields for admin panel; verifies admin role then calls `getCustomFields()` from shared GHL client. |
| `ghl-config` | No | Returns GHL widget ID based on route prefix (support/demo/sales); currently not actively called by frontend. |
| `review-architecture` | No | Proxies architecture review prompts to Lovable AI gateway (GPT-5-mini); handles rate limiting and credit errors. |
| `send-password-reset` | No | Sends password reset email for allowed admin emails; validates against `allowed_admin_emails` table, redirects to `/admin/reset-password`. |
| `start-checkout` | No | Handles checkout form submission: saves to `checkout_submissions`, syncs contact/tags/notes to GHL, returns redirect URL to `go.everintent.com/{tier}`. |
| `submit-form` | No | Handles contact and DSAR form submissions: saves to `form_submissions`, syncs to GHL with form-type/product/add-on tags and formatted notes. |
| `submit-job-application` | No | Handles job applications: saves to `job_applications`, syncs to GHL with careers tag, maps resume/video URLs to GHL custom fields. |
| `sync-theme-to-github` | Yes | Publishes active theme config to GitHub repo via Git tree API; commits `src/config/themes.ts` and optionally `src/index.css`. |
| `verify-admin-email` | No | Validates email against `allowed_admin_emails` and sends magic link OTP for admin login. |

### Shared Module: `_shared/ghlClient.ts`

Used by: `ghl-admin-fields`, `start-checkout`, `submit-form`, `submit-job-application`  
Exports: `upsertContact()`, `addTags()`, `addNote()`, `getCustomFields()`, `GHL_TAGS`, `TIER_TAG_MAP`

---

## 10. Supabase Secrets

| Secret Name | Purpose |
|-------------|---------|
| SUPABASE_URL | Project URL |
| SUPABASE_ANON_KEY | Anon/publishable key |
| SUPABASE_PUBLISHABLE_KEY | Alias for anon key |
| SUPABASE_SERVICE_ROLE_KEY | Server-side admin key |
| SUPABASE_DB_URL | Direct DB connection string |
| GHL_API_TOKEN | GoHighLevel API authentication |
| GHL_LOCATION_ID | GHL location identifier |
| GHL_WIDGET_ID_SALES | Sales chat widget ID |
| GHL_WIDGET_ID_SUPPORT | Support chat widget ID |
| GHL_WIDGET_ID_DEMO | Demo chat widget ID |
| GHL_WIDGET_ID_LOCALPROS | LocalPros chat widget ID |
| GHL_RESUME_CUSTOM_FIELD_ID | GHL custom field for resume URLs |
| GHL_VIDEO_LINK_CUSTOM_FIELD_ID | GHL custom field for video intro URLs |
| GITHUB_PAT | GitHub personal access token |
| GITHUB_REPO_OWNER | GitHub repo owner |
| GITHUB_REPO_NAME | GitHub repo name |
| LOVABLE_API_KEY | Lovable AI gateway key |
