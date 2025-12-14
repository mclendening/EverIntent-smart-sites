# EverIntent SmartSites — Careers Feature Specification

**Last Updated:** December 14, 2025  
**Version:** 1.0  
**Status:** DESIGN COMPLETE  
**Reference:** BRD v32.8

---

## Table of Contents

1. [Overview](#1-overview)
2. [Routes & Navigation](#2-routes--navigation)
3. [Database Schema](#3-database-schema)
4. [GHL v2 API Integration](#4-ghl-v2-api-integration)
5. [Admin Configuration](#5-admin-configuration)
6. [UX Flow](#6-ux-flow)
7. [Component Architecture](#7-component-architecture)

---

## 1. Overview

The Careers feature allows EverIntent to post job openings and receive applications. Jobs are stored in Supabase with admin-configurable form requirements. Applications submit directly to GHL via Edge Function, with optional resume upload and Loom video submission.

### Key Differences from Legal AI Implementation

| Aspect | Legal AI | SmartSites |
|--------|----------|------------|
| Job storage | Hardcoded in components | Supabase `jobs` table |
| Form config | Static per job | Admin-configurable (loom_required, portfolio_required) |
| Tagging | Fixed tags | Dynamic from job record |
| Admin UI | None | Full CRUD in /admin/careers |

---

## 2. Routes & Navigation

### Public Routes

| Route | Page | Description |
|-------|------|-------------|
| `/careers` | Careers Hub | Lists all open positions |
| `/careers/:slug` | Job Detail | Job description + application form |

### Admin Routes

| Route | Page | Description |
|-------|------|-------------|
| `/admin/careers` | Jobs List | View/manage all jobs |
| `/admin/careers/new` | Create Job | Add new job posting |
| `/admin/careers/:id` | Edit Job | Modify job details & requirements |

### Navigation Placement

- **Footer**: Company column → "Careers" link to `/careers`
- **Mobile Menu**: Under Company section
- **Header**: Not in main nav (accessed via footer/direct link)

---

## 3. Database Schema

### Jobs Table

```sql
CREATE TABLE public.jobs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  department text,
  location text,
  type text, -- 'Full-time', 'Part-time', 'Contract', 'Internship'
  description text, -- Rich text/markdown
  responsibilities text[], -- Bullet points
  requirements text[], -- Bullet points
  benefits text[], -- Bullet points
  salary_range text, -- Display string e.g. "$50k-70k"
  is_open boolean DEFAULT true,
  is_published boolean DEFAULT false,
  
  -- Form Configuration (Admin-controlled)
  loom_required boolean DEFAULT false,
  portfolio_required boolean DEFAULT false,
  custom_questions jsonb DEFAULT '[]',
  
  -- GHL Tagging
  ghl_tags text[] DEFAULT ARRAY['job-application'],
  
  -- Metadata
  display_order integer DEFAULT 0,
  posted_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;

-- Public can view published, open jobs
CREATE POLICY "Anyone can view published open jobs"
ON public.jobs FOR SELECT
USING (is_published = true AND is_open = true);

-- Admins have full access
CREATE POLICY "Admins can manage jobs"
ON public.jobs FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

-- Trigger for updated_at
CREATE TRIGGER update_jobs_updated_at
BEFORE UPDATE ON public.jobs
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
```

### Custom Questions JSONB Structure

```typescript
interface CustomQuestion {
  id: string;
  label: string;
  type: 'text' | 'textarea' | 'select';
  required: boolean;
  options?: string[]; // For select type
}

// Example:
[
  { id: 'experience', label: 'Years of experience?', type: 'select', required: true, options: ['0-1', '2-5', '5+'] },
  { id: 'availability', label: 'When can you start?', type: 'text', required: false }
]
```

---

## 4. GHL v2 API Integration

### Environment Variables (Supabase Secrets)

| Secret Name | Description |
|-------------|-------------|
| `GHL_API_TOKEN` | GHL v2 API Bearer token |
| `GHL_LOCATION_ID` | GHL Location ID |
| `GHL_RESUME_CUSTOM_FIELD_ID` | Custom field ID for resume attachment |
| `GHL_VIDEO_LINK_CUSTOM_FIELD_ID` | Custom field ID for Loom video link |

### API Endpoints

| Purpose | Endpoint |
|---------|----------|
| **Contact Upsert** | `https://services.leadconnectorhq.com/contacts/upsert` |
| **Resume Upload** | `https://services.leadconnectorhq.com/forms/upload-custom-files` |

### Edge Function: `submit-job-application`

**Request Payload (Client → Edge Function):**

```typescript
interface JobApplicationPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  jobTitle: string;
  jobSlug: string;
  tags: string[]; // ['job-application', 'job:lead-generation-specialist']
  loomUrl?: string;
  portfolioUrl?: string;
  whyFit: string; // "Why are you a good fit?" response
  customAnswers?: Record<string, string>; // Answers to custom questions
  attachment?: {
    fileData: string; // base64-encoded resume
    fileName: string;
  };
}
```

**GHL Upsert Payload:**

```typescript
{
  locationId: GHL_LOCATION_ID,
  firstName: payload.firstName,
  lastName: payload.lastName,
  email: payload.email,
  phone: payload.phone,
  tags: payload.tags,
  source: 'EverIntent SmartSites Website',
  customFields: [
    { id: GHL_VIDEO_LINK_CUSTOM_FIELD_ID, value: payload.loomUrl }
  ]
}
```

**Note Construction:**

```
💼 Job Application (Dec 14, 2025)

Position: Lead Gen Specialist

Why They're a Fit:
[whyFit text]

Portfolio:
https://portfolio-url.com

Custom Answers:
Q: Years of experience?
A: 2-5

Loom Video:
https://loom.com/share/abc123
```

### File Handling (Two-Step Process)

1. **Upsert contact** → Get `contactId` from response
2. **Upload resume** via multipart POST:
   - Endpoint: `/forms/upload-custom-files?contactId={id}&locationId={LOCATION_ID}`
   - Form field: `{GHL_RESUME_CUSTOM_FIELD_ID}_file`
   - File auto-attaches to contact

### Error Handling

| Failure Point | Response |
|---------------|----------|
| Missing env vars | `{ ok: false, error: 'misconfigured_env' }` |
| Upsert fails | `{ ok: false, step: 'upsert', status, error }` |
| Tag add fails | `{ ok: false, step: 'tags', ... }` |
| Resume upload fails | `{ ok: true, resumeDebug: { ok: false, step: 'upload', error } }` |

### Tagging System

- **Universal tag**: `job-application`
- **Job-specific tag**: `job:{slug}` (e.g., `job:lead-generation-specialist`)
- **Additional tags**: From `ghl_tags` column in jobs table

---

## 5. Admin Configuration

### Jobs Admin Page (`/admin/careers`)

| Field | Type | Description |
|-------|------|-------------|
| Title | text | Job title |
| Slug | text | URL-friendly identifier (auto-generated) |
| Department | text | e.g., "Marketing", "Engineering" |
| Location | text | e.g., "Remote", "Austin, TX" |
| Type | select | Full-time, Part-time, Contract, Internship |
| Description | textarea | Rich job description |
| Responsibilities | array | Bullet points |
| Requirements | array | Bullet points |
| Benefits | array | Bullet points |
| Salary Range | text | Display string |
| Is Open | toggle | Accepting applications |
| Is Published | toggle | Visible on public site |
| Loom Required | toggle | Require Loom video submission |
| Portfolio Required | toggle | Require portfolio link |
| Custom Questions | jsonb editor | Dynamic form fields |
| GHL Tags | array | Additional tags to apply |
| Display Order | number | Sort order on careers page |

### Form Field Visibility Logic

```typescript
// On job detail page, form fields render based on job config:
{job.loom_required && <LoomUrlInput required />}
{job.portfolio_required && <PortfolioUrlInput required />}
{job.custom_questions?.map(q => <DynamicQuestion key={q.id} question={q} />)}
```

---

## 6. UX Flow

### Applicant Journey

| Stage | Behavior |
|-------|----------|
| **Browse** | `/careers` shows grid of open positions |
| **Select** | Click job → `/careers/:slug` with full details |
| **Apply** | Scroll to application form |
| **Loom validation** | Client-side regex: `/^https?:\/\/(www\.)?loom\.com\/share\/[a-zA-Z0-9]+/` |
| **Submit** | Button shows "Submitting..." spinner |
| **Turnstile** | 3 retry attempts with 1s delay |
| **Success** | Modal: "Application Submitted!" with CheckCircle icon |
| **On close** | Navigate back to `/careers` |
| **Error** | Destructive toast with specific error message |

### Form Fields

| Field | Required | Validation |
|-------|----------|------------|
| First Name | Yes | Non-empty |
| Last Name | Yes | Non-empty |
| Email | Yes | Email format |
| Phone | Yes | Phone format |
| Resume | Yes | PDF/DOC/DOCX, max 10MB |
| Why are you a good fit? | Yes | Non-empty, max 2000 chars |
| Loom Video | Configurable | Loom URL regex |
| Portfolio | Configurable | URL format |
| Custom Questions | Configurable | Per question config |

---

## 7. Component Architecture

### Public Components

```
src/pages/Careers.tsx          # Hub page - lists all jobs
src/pages/CareerDetail.tsx     # Job detail + application form
src/components/careers/
  JobCard.tsx                  # Card for careers hub
  JobApplicationForm.tsx       # Application form component
  ApplicationSuccessModal.tsx  # Success confirmation
```

### Admin Components

```
src/pages/admin/Careers.tsx         # Jobs list/management
src/pages/admin/CareerEditor.tsx    # Create/edit job form
src/components/admin/
  JobsTable.tsx                     # Data table for jobs
  CustomQuestionsEditor.tsx         # JSONB array editor
```

### Edge Function

```
supabase/functions/submit-job-application/index.ts
```

---

## Implementation Sequence

1. **Database**: Run migration for `jobs` table
2. **Admin UI**: Build /admin/careers CRUD pages
3. **Public Pages**: Build /careers hub and /careers/:slug detail
4. **Edge Function**: Create submit-job-application with GHL integration
5. **Secrets**: Configure GHL_* environment variables
6. **Testing**: End-to-end application flow

---

## Reference Implementation

The GHL v2 API integration pattern is derived from the EverIntent Legal AI careers implementation:
- **Legal AI Careers Hub**: https://everintentlegalai.com/careers
- **Legal AI Job Detail**: https://everintentlegalai.com/careers/lead-gen-specialist

Key differences for SmartSites:
- Jobs stored in Supabase (not hardcoded)
- Admin-configurable form fields
- Dynamic tagging from job record
