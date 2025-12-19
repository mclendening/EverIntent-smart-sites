# Careers Feature Specification

## Overview

The Careers section allows EverIntent to post job openings, receive applications, and integrate with GHL for candidate management.

### Key Differences from Legal AI Implementation

- Jobs stored in Supabase (not hardcoded)
- Admin can configure form fields per job (Loom required, portfolio required)
- Dynamic tagging based on job slug
- Custom questions support via JSONB

---

## Routes & Navigation

### Public Routes

| Route            | Purpose                                   |
| ---------------- | ----------------------------------------- |
| `/careers`       | Careers hub - lists all open positions    |
| `/careers/:slug` | Individual job page with application form |

### Admin Routes

| Route                | Purpose                   |
| -------------------- | ------------------------- |
| `/admin/careers`     | Job listings management   |
| `/admin/careers/new` | Create new job posting    |
| `/admin/careers/:id` | Edit existing job posting |

### Navigation Placement

- Footer: Resources column → "Careers" link
- Mobile: Bottom nav or menu access

---

## Database Schema

### `public.jobs` Table

```sql
CREATE TABLE public.jobs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  department text,
  location text,
  type text, -- 'Full-time', 'Part-time', 'Contract'
  description text,
  requirements text,
  is_open boolean DEFAULT true,

  -- Form Configuration
  loom_required boolean DEFAULT true,
  portfolio_required boolean DEFAULT false,
  custom_questions jsonb DEFAULT '[]',

  -- GHL Tagging
  ghl_tags text[] DEFAULT '{}',

  -- Timestamps
  posted_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;

-- Public can view open jobs
CREATE POLICY "Public can view open jobs"
  ON public.jobs FOR SELECT
  USING (is_open = true);

-- Admins can manage all jobs
CREATE POLICY "Admins can manage jobs"
  ON public.jobs FOR ALL
  USING (public.has_role('admin', auth.uid()));

-- Updated at trigger
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
  type: 'text' | 'textarea' | 'select' | 'checkbox';
  required: boolean;
  options?: string[]; // for select type
}

// Example
[
  { "id": "q1", "label": "Why are you interested in this role?", "type": "textarea", "required": true },
  { "id": "q2", "label": "Years of experience", "type": "select", "required": true, "options": ["0-1", "2-3", "4-5", "5+"] }
]
```

---

## GHL v2 API Integration

### Environment Variables (Secrets)

| Secret Name                      | Purpose                               |
| -------------------------------- | ------------------------------------- |
| `GHL_API_TOKEN`                  | Bearer token for GHL API              |
| `GHL_LOCATION_ID`                | GHL location/account ID               |
| `GHL_RESUME_CUSTOM_FIELD_ID`     | Custom field ID for resume attachment |
| `GHL_VIDEO_LINK_CUSTOM_FIELD_ID` | Custom field ID for Loom video URL    |

### API Endpoints

| Action         | Endpoint                                                              |
| -------------- | --------------------------------------------------------------------- |
| Contact Upsert | `POST https://services.leadconnectorhq.com/contacts/upsert`           |
| Resume Upload  | `POST https://services.leadconnectorhq.com/forms/upload-custom-files` |

### Edge Function: `submit-job-application`

**Location:** `supabase/functions/submit-job-application/index.ts`

#### Client → Function Payload

```typescript
interface ApplicationPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  jobSlug: string;
  jobTitle: string;

  // Optional based on job config
  loomUrl?: string;
  portfolioUrl?: string;

  // Free-form
  coverNote: string;

  // Custom question responses
  customAnswers?: Record<string, string>;

  // Resume file
  attachment?: {
    fileData: string;  // base64-encoded
    fileName: string;
  };
}
```

#### GHL Upsert Payload

```typescript
{
  locationId: GHL_LOCATION_ID,
  firstName: payload.firstName,
  lastName: payload.lastName,
  email: payload.email,
  phone: payload.phone,
  tags: ['job-application', `job:${payload.jobSlug}`],
  source: 'EverIntent Smart Sites',
  customFields: [
    { id: GHL_VIDEO_LINK_CUSTOM_FIELD_ID, value: payload.loomUrl }
  ]
}
```

#### Note Construction

```
💼 Job Application (${date})

Position: ${jobTitle}

Cover Note:
${coverNote}

${loomUrl ? `Loom Video:\n${loomUrl}` : ''}

${portfolioUrl ? `Portfolio:\n${portfolioUrl}` : ''}

${customAnswers ? formatCustomAnswers(customAnswers) : ''}
```

### File Handling (Resume)

**Two-step process:**

1. **Upsert contact first** → receive `contactId` in response
2. **Upload file** to `/forms/upload-custom-files`:
   - Query params: `?contactId={id}&locationId={LOCATION_ID}`
   - Form field name: `{RESUME_CUSTOM_FIELD_ID}_file`
   - Content-Type: `multipart/form-data`

### Error Handling

| Failure Point       | Response                                           |
| ------------------- | -------------------------------------------------- |
| Missing env vars    | `{ ok: false, error: 'misconfigured_env' }`        |
| Upsert fails        | `{ ok: false, step: 'upsert', status, error }`     |
| Resume upload fails | `{ ok: true, resumeUpload: { ok: false, error } }` |

### Tagging System

Tags applied to GHL contact:

- `job-application` (universal tag for all applications)
- `job:{slug}` (specific to job, e.g., `job:lead-generation-specialist`)
- Additional tags from `jobs.ghl_tags` array if configured

---

## Admin Configuration

### Admin Jobs Page (`/admin/careers`)

| Field              | Type              | Purpose                                  |
| ------------------ | ----------------- | ---------------------------------------- |
| Title              | text              | Job title                                |
| Slug               | text              | URL-friendly identifier (auto-generated) |
| Department         | text              | e.g., "Marketing", "Engineering"         |
| Location           | text              | e.g., "Remote", "Austin, TX"             |
| Type               | select            | Full-time, Part-time, Contract           |
| Description        | textarea/markdown | Full job description                     |
| Requirements       | textarea/markdown | Required qualifications                  |
| Is Open            | toggle            | Show/hide from public                    |
| Loom Required      | toggle            | Require Loom video submission            |
| Portfolio Required | toggle            | Require portfolio link                   |
| Custom Questions   | JSONB editor      | Additional form fields                   |
| GHL Tags           | array             | Extra tags to apply                      |

### Form Field Rendering Logic

```typescript
// On job detail page
if (job.loom_required) {
  // Show Loom URL input with validation
}

if (job.portfolio_required) {
  // Show Portfolio URL input
}

if (job.custom_questions?.length > 0) {
  // Render dynamic form fields
}
```

---

## UX Flow

### Applicant Journey

1. Browse `/careers` → see list of open positions
2. Click job → navigate to `/careers/:slug`
3. View job description and requirements
4. Fill out application form:
   - Required: Name, Email, Phone, Cover Note
   - Conditional: Loom Video, Portfolio (based on job config)
   - Dynamic: Custom questions
   - Optional: Resume upload
5. Submit → Edge function processes
6. Success → Modal confirmation, redirect to `/careers`
7. Error → Toast with specific message

### Form Validation

| Field         | Validation                                                    |
| ------------- | ------------------------------------------------------------- |
| Email         | Valid email format                                            |
| Phone         | Valid phone format                                            |
| Loom URL      | Regex: `/^https?:\/\/(www\.)?loom\.com\/share\/[a-zA-Z0-9]+/` |
| Portfolio URL | Valid URL format                                              |
| Resume        | Max 5MB, PDF/DOC/DOCX only                                    |

---

## Component Architecture

### Public Pages

- `src/pages/Careers.tsx` - Careers hub listing
- `src/pages/CareerDetail.tsx` - Individual job page
- `src/components/careers/JobCard.tsx` - Job listing card
- `src/components/careers/ApplicationForm.tsx` - Application form

### Admin Pages

- `src/pages/admin/CareersAdmin.tsx` - Jobs list/management
- `src/pages/admin/JobEditor.tsx` - Create/edit job form
- `src/components/admin/CustomQuestionsEditor.tsx` - JSONB editor

### Edge Function

- `supabase/functions/submit-job-application/index.ts`

---

## Implementation Sequence

1. **Database**: Create `jobs` table migration with RLS
2. **Secrets**: Add GHL environment variables
3. **Edge Function**: Create `submit-job-application`
4. **Admin UI**: Build job management pages
5. **Public UI**: Build careers hub and detail pages
6. **Testing**: End-to-end application flow

---

## Reference Implementation

The Legal AI careers implementation serves as a reference for GHL v2 API patterns:

- Contact upsert with custom fields
- Two-step resume upload
- Tagging system
- Error handling

Key differences for SmartSites:

- Jobs stored in Supabase (not hardcoded)
- Admin-configurable form fields
- Dynamic tagging from database
