# EverIntent SmartSites Implementation Roadmap v1

> **Based on:** BRD v32.8, ChatGPT Review, Legal AI GHL v2 Implementation, Persona Spec
> **Created:** 2025-01-XX
> **Status:** Specification Locked

---

## Table of Contents
1. [GHL v2 API Integration Specification](#ghl-v2-api-integration-specification)
2. [Environment Variables & Secrets](#environment-variables--secrets)
3. [Phase 1: Form Architecture Foundation](#phase-1-form-architecture-foundation)
4. [Phase 2: Cookie Consent + GHL Widget](#phase-2-cookie-consent--ghl-widget)
5. [Phase 3: Core Marketing Pages](#phase-3-core-marketing-pages)
6. [Phase 4: Checkout Flow](#phase-4-checkout-flow)
7. [Phase 5: LocalPros Apply](#phase-5-localpros-apply)
8. [Phase 6: Careers MVP](#phase-6-careers-mvp)
9. [Phase 7: Legal Pages + Domain Tool](#phase-7-legal-pages--domain-tool)
10. [Admin Tools](#admin-tools)
11. [Manual GHL Configuration Checklist](#manual-ghl-configuration-checklist)
12. [Deferred Items](#deferred-items)

---

## GHL v2 API Integration Specification

### API Base & Version
```
Base URL: https://services.leadconnectorhq.com
API Version: 2021-07-28 (v2)
```

**All endpoints use v2 API exclusively. No v1 API usage.**

### Authentication Headers
```typescript
// Standard headers for ALL GHL v2 API calls
const ghlHeaders = () => ({
  'Authorization': `Bearer ${Deno.env.get('GHL_PRIVATE_INTEGRATION_TOKEN')}`,
  'Version': '2021-07-28',           // ← CRITICAL v2 identifier
  'Content-Type': 'application/json',
  'Accept': 'application/json',
});
```

### Endpoints Reference

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/contacts/upsert` | POST | Create or update contact by email/phone |
| `/contacts/{id}` | GET | Fetch contact details |
| `/contacts/{id}` | PUT | Update existing contact (custom fields) |
| `/contacts/{id}/tags` | POST | Add tags to contact |
| `/contacts/{id}/notes` | POST | Add note to contact |
| `/locations/{id}` | GET | Validate location (diagnostic) |
| `/locations/{id}/customFields` | GET | **List all custom fields (for admin tool)** |
| `/forms/upload-custom-files` | POST | Upload file to custom field |

### ⚠️ CRITICAL: Custom Fields Format (v2 vs v1)

**GHL v2 requires custom fields as ARRAY of objects, NOT a key-value map:**

```typescript
// ✅ CORRECT - v2 format (ARRAY of objects)
{
  customFields: [
    { id: 'fkf9vd3Zptv5g4ZLmjEZ', value: 'https://loom.com/share/xyz' },
    { id: 'abc123def456', value: 'some value' }
  ]
}

// ❌ WRONG - v1 format (object/map) - WILL SILENTLY FAIL
{
  customFields: {
    'fkf9vd3Zptv5g4ZLmjEZ': 'https://loom.com/share/xyz'
  }
}
```

**Conversion helper:**
```typescript
// Convert object to array format expected by GHL v2 API
const toCustomFieldsArray = (fieldsMap: Record<string, string>) => 
  Object.entries(fieldsMap).map(([id, value]) => ({ id, value }));
```

### File Upload Workflow (Resume/Attachments)

**Two-step process using `/forms/upload-custom-files`:**

```typescript
// Step 1: Build multipart form with SPECIFIC field naming convention
const fieldName = `${GHL_RESUME_CUSTOM_FIELD_ID}_file`;  // e.g. "fkf9vd3Zptv5g4ZLmjEZ_file"
const formData = new FormData();
formData.append(fieldName, blob, fileName);

// Step 2: POST to upload endpoint
// ⚠️ NO Content-Type header - FormData sets multipart boundary automatically
const uploadUrl = `${BASE}/forms/upload-custom-files?contactId=${contactId}&locationId=${locationId}`;
const response = await fetch(uploadUrl, {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${GHL_PRIVATE_INTEGRATION_TOKEN}`,
    'Version': '2021-07-28',
    // NO Content-Type here!
  },
  body: formData,
});
```

**Response Structure:**
```json
{
  "succeded": true,
  "contact": {
    "customFields": [{
      "id": "fieldId",
      "value": {
        "file": {
          "meta": { "originalname": "resume.pdf", "size": 12345 },
          "url": "https://backend.leadconnectorhq.com/contacts/file/download?id=..."
        }
      }
    }]
  }
}
```

### Chat Widget Integration

**Widget Loader URLs:**
```typescript
const GHL_LOADER_SRC = 'https://beta.leadconnectorhq.com/loader.js';
const GHL_RESOURCES_URL = 'https://beta.leadconnectorhq.com/chat-widget/loader.js';
```

**Window API Fallback Order (try in sequence):**
```typescript
// 1. Primary API
window.leadConnector?.open()

// 2. Alternative API
window.leadConnector?.chatWidget?.openWidget()

// 3. Legacy API
window.LC_API?.open_chat_window()
```

**TypeScript Global Declarations:**
```typescript
declare global {
  interface Window {
    toggleGHLChat?: () => void;
    closeGHLChat?: () => void;
    leadConnector?: {
      open?: () => void;
      close?: () => void;
      chatWidget?: {
        openWidget?: () => void;
        closeWidget?: () => void;
      };
    };
    LC_API?: {
      open_chat_window?: () => void;
      close_chat_window?: () => void;
    };
  }
}
```

### Tagging System

**Tag Prefix:** `everintent-smartsites-`

| Context | Tags |
|---------|------|
| Checkout | `['everintent-smartsites-checkout', 'tier:{tier}', 'source:{source_page}']` |
| Contact Form | `['everintent-smartsites-contact', 'source:{source_page}']` |
| LocalPros Apply | `['everintent-smartsites-localpros-apply', 'localpros-partner-prospect']` |
| Job Application | `['everintent-smartsites-job-application', 'job:{job_slug}']` |
| Newsletter | `['everintent-smartsites-newsletter']` |

### Error Handling Patterns

```typescript
// Standard error response structure
interface GHLErrorResponse {
  ok: false;
  step: 'upsert' | 'tags' | 'notes' | 'upload' | 'configuration';
  status?: number;
  error: string;
}

// Common errors
{ ok: false, step: 'upsert', status: 400, error: 'duplicate_contact' }
{ ok: false, step: 'tags', status: 403, error: 'tag_error: insufficient_permissions' }
{ ok: false, step: 'upload', status: 500, error: 'Upload failed: file too large' }
{ ok: false, step: 'configuration', error: 'GHL_RESUME_CUSTOM_FIELD_ID not set' }
```

---

## Environment Variables & Secrets

### Required Supabase Secrets

| Secret Name | Purpose | Where Used |
|-------------|---------|------------|
| `GHL_PRIVATE_INTEGRATION_TOKEN` | Bearer token for GHL v2 API | All GHL Edge Functions |
| `GHL_LOCATION_ID` | GHL location/sub-account ID | All GHL Edge Functions |
| `GHL_RESUME_CUSTOM_FIELD_ID` | Custom field ID for resume uploads | `submit-job-application` |
| `GHL_VIDEO_LINK_CUSTOM_FIELD_ID` | Custom field ID for Loom links | `submit-job-application` |
| `GHL_WIDGET_ID` | Chat widget data-id attribute | Frontend widget loader |

### Frontend Environment (Vercel)

| Variable | Purpose |
|----------|---------|
| `VITE_GHL_WIDGET_ID` | Chat widget data-id for frontend injection |

### Manual GHL Setup Required

1. Create Private Integration in GHL
2. Note the Private Integration Token
3. Get Location ID from GHL settings
4. Create custom fields for Resume and Video Link
5. Use Admin Tool to extract custom field IDs
6. Configure secrets in Supabase

---

## Phase 1: Form Architecture Foundation

### 1.1 Database Migrations

**Migration 1: `form_submissions` table**
```sql
CREATE TABLE public.form_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  form_type TEXT NOT NULL CHECK (form_type IN ('contact', 'localpros_apply', 'newsletter')),
  
  -- Contact info
  email TEXT NOT NULL,
  name TEXT,
  phone TEXT,
  company TEXT,
  message TEXT,
  
  -- Tracking
  source_page TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  
  -- TCPA Compliance
  tcpa_consent BOOLEAN DEFAULT false,
  consent_timestamp TIMESTAMPTZ,
  ip_address TEXT,
  user_agent TEXT,
  
  -- GHL Sync
  ghl_contact_id TEXT,
  ghl_sync_status TEXT DEFAULT 'pending' CHECK (ghl_sync_status IN ('pending', 'synced', 'failed')),
  ghl_synced_at TIMESTAMPTZ,
  ghl_error TEXT,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- RLS
ALTER TABLE public.form_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit forms" ON public.form_submissions
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can view all submissions" ON public.form_submissions
  FOR SELECT USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update submissions" ON public.form_submissions
  FOR UPDATE USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete submissions" ON public.form_submissions
  FOR DELETE USING (has_role(auth.uid(), 'admin'));

-- Indexes
CREATE INDEX idx_form_submissions_type ON public.form_submissions(form_type);
CREATE INDEX idx_form_submissions_email ON public.form_submissions(email);
CREATE INDEX idx_form_submissions_ghl_status ON public.form_submissions(ghl_sync_status);

-- Trigger
CREATE TRIGGER update_form_submissions_updated_at
  BEFORE UPDATE ON public.form_submissions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

**Migration 2: Add GHL sync columns to `checkout_submissions`**
```sql
ALTER TABLE public.checkout_submissions
  ADD COLUMN ghl_contact_id TEXT,
  ADD COLUMN ghl_sync_status TEXT DEFAULT 'pending' CHECK (ghl_sync_status IN ('pending', 'synced', 'failed')),
  ADD COLUMN ghl_synced_at TIMESTAMPTZ,
  ADD COLUMN ghl_error TEXT,
  ADD COLUMN tcpa_consent BOOLEAN DEFAULT false,
  ADD COLUMN consent_timestamp TIMESTAMPTZ,
  ADD COLUMN ip_address TEXT,
  ADD COLUMN user_agent TEXT;

CREATE INDEX idx_checkout_ghl_status ON public.checkout_submissions(ghl_sync_status);
```

**Migration 3: `jobs` table**
```sql
CREATE TABLE public.jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  department TEXT,
  location TEXT DEFAULT 'Remote',
  employment_type TEXT DEFAULT 'Full-time',
  description TEXT,
  requirements TEXT,
  benefits TEXT,
  salary_range TEXT,
  
  -- Form Configuration
  loom_required BOOLEAN DEFAULT false,
  portfolio_required BOOLEAN DEFAULT false,
  custom_questions JSONB DEFAULT '[]',
  
  -- GHL Tags
  ghl_tags TEXT[] DEFAULT '{}',
  
  -- Status
  is_published BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- RLS
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published jobs" ON public.jobs
  FOR SELECT USING (is_published = true);

CREATE POLICY "Admins can manage all jobs" ON public.jobs
  FOR ALL USING (has_role(auth.uid(), 'admin'));

-- Indexes
CREATE INDEX idx_jobs_slug ON public.jobs(slug);
CREATE INDEX idx_jobs_published ON public.jobs(is_published);

-- Trigger
CREATE TRIGGER update_jobs_updated_at
  BEFORE UPDATE ON public.jobs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

**Migration 4: `job_applications` table**
```sql
CREATE TABLE public.job_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id UUID REFERENCES public.jobs(id) ON DELETE SET NULL,
  
  -- Applicant info
  email TEXT NOT NULL,
  name TEXT NOT NULL,
  phone TEXT,
  linkedin_url TEXT,
  portfolio_url TEXT,
  loom_url TEXT,
  
  -- Resume (Supabase Storage)
  resume_path TEXT,
  resume_filename TEXT,
  
  -- Custom answers
  custom_answers JSONB DEFAULT '{}',
  
  -- Cover letter / message
  cover_letter TEXT,
  
  -- Tracking
  source_page TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  
  -- TCPA
  tcpa_consent BOOLEAN DEFAULT false,
  consent_timestamp TIMESTAMPTZ,
  ip_address TEXT,
  user_agent TEXT,
  
  -- GHL Sync
  ghl_contact_id TEXT,
  ghl_sync_status TEXT DEFAULT 'pending',
  ghl_synced_at TIMESTAMPTZ,
  ghl_error TEXT,
  
  -- Status
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'reviewed', 'interviewing', 'offered', 'hired', 'rejected')),
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- RLS
ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit applications" ON public.job_applications
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can manage applications" ON public.job_applications
  FOR ALL USING (has_role(auth.uid(), 'admin'));

-- Indexes
CREATE INDEX idx_job_applications_job ON public.job_applications(job_id);
CREATE INDEX idx_job_applications_email ON public.job_applications(email);
CREATE INDEX idx_job_applications_status ON public.job_applications(status);
CREATE INDEX idx_job_applications_ghl_status ON public.job_applications(ghl_sync_status);

-- Trigger
CREATE TRIGGER update_job_applications_updated_at
  BEFORE UPDATE ON public.job_applications
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

**Migration 5: Storage bucket for resumes**
```sql
INSERT INTO storage.buckets (id, name, public, file_size_limit)
VALUES ('resumes', 'resumes', false, 10485760); -- 10MB limit

-- RLS for resumes bucket
CREATE POLICY "Anyone can upload resumes" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'resumes');

CREATE POLICY "Admins can view resumes" ON storage.objects
  FOR SELECT USING (bucket_id = 'resumes' AND has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete resumes" ON storage.objects
  FOR DELETE USING (bucket_id = 'resumes' AND has_role(auth.uid(), 'admin'));
```

### 1.2 Edge Functions

**File: `supabase/functions/_shared/ghlClient.ts`**
```typescript
// GHL v2 API Client - Shared Module
// API Version: 2021-07-28

const GHL_BASE_URL = 'https://services.leadconnectorhq.com';
const GHL_API_VERSION = '2021-07-28';

interface GHLHeaders {
  'Authorization': string;
  'Version': string;
  'Content-Type': string;
  'Accept': string;
}

interface CustomField {
  id: string;
  value: string;
}

interface UpsertContactPayload {
  email: string;
  name?: string;
  phone?: string;
  companyName?: string;
  source?: string;
  customFields?: CustomField[];
}

interface GHLResponse<T = unknown> {
  ok: boolean;
  data?: T;
  error?: string;
  step?: string;
  status?: number;
}

export const ghlHeaders = (): GHLHeaders => ({
  'Authorization': `Bearer ${Deno.env.get('GHL_PRIVATE_INTEGRATION_TOKEN')}`,
  'Version': GHL_API_VERSION,
  'Content-Type': 'application/json',
  'Accept': 'application/json',
});

// Headers for file upload (no Content-Type - FormData sets boundary)
export const ghlUploadHeaders = () => ({
  'Authorization': `Bearer ${Deno.env.get('GHL_PRIVATE_INTEGRATION_TOKEN')}`,
  'Version': GHL_API_VERSION,
});

export const getLocationId = () => Deno.env.get('GHL_LOCATION_ID');

/**
 * Convert key-value custom fields to GHL v2 array format
 * CRITICAL: v2 requires array, v1 used object map
 */
export const toCustomFieldsArray = (fieldsMap: Record<string, string>): CustomField[] =>
  Object.entries(fieldsMap)
    .filter(([_, value]) => value !== undefined && value !== null && value !== '')
    .map(([id, value]) => ({ id, value: String(value) }));

/**
 * Upsert contact via GHL v2 API
 */
export async function upsertContact(payload: UpsertContactPayload): Promise<GHLResponse<{ contact: { id: string } }>> {
  const locationId = getLocationId();
  if (!locationId) {
    return { ok: false, step: 'configuration', error: 'GHL_LOCATION_ID not set' };
  }

  try {
    const response = await fetch(`${GHL_BASE_URL}/contacts/upsert`, {
      method: 'POST',
      headers: ghlHeaders(),
      body: JSON.stringify({
        locationId,
        email: payload.email,
        name: payload.name,
        phone: payload.phone,
        companyName: payload.companyName,
        source: payload.source || 'SmartSites Website',
        customFields: payload.customFields || [],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[GHL] Upsert failed:', response.status, errorText);
      return { ok: false, step: 'upsert', status: response.status, error: errorText };
    }

    const data = await response.json();
    console.log('[GHL] Upsert success, contactId:', data.contact?.id);
    return { ok: true, data };
  } catch (error) {
    console.error('[GHL] Upsert exception:', error);
    return { ok: false, step: 'upsert', error: String(error) };
  }
}

/**
 * Add tags to contact
 */
export async function addTags(contactId: string, tags: string[]): Promise<GHLResponse> {
  if (!contactId || tags.length === 0) {
    return { ok: true, data: { skipped: true } };
  }

  try {
    const response = await fetch(`${GHL_BASE_URL}/contacts/${contactId}/tags`, {
      method: 'POST',
      headers: ghlHeaders(),
      body: JSON.stringify({ tags }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[GHL] Add tags failed:', response.status, errorText);
      return { ok: false, step: 'tags', status: response.status, error: errorText };
    }

    console.log('[GHL] Tags added:', tags);
    return { ok: true };
  } catch (error) {
    console.error('[GHL] Tags exception:', error);
    return { ok: false, step: 'tags', error: String(error) };
  }
}

/**
 * Add note to contact
 */
export async function addNote(contactId: string, body: string): Promise<GHLResponse> {
  if (!contactId || !body) {
    return { ok: true, data: { skipped: true } };
  }

  try {
    const response = await fetch(`${GHL_BASE_URL}/contacts/${contactId}/notes`, {
      method: 'POST',
      headers: ghlHeaders(),
      body: JSON.stringify({ body }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[GHL] Add note failed:', response.status, errorText);
      return { ok: false, step: 'notes', status: response.status, error: errorText };
    }

    console.log('[GHL] Note added');
    return { ok: true };
  } catch (error) {
    console.error('[GHL] Note exception:', error);
    return { ok: false, step: 'notes', error: String(error) };
  }
}

/**
 * Update contact custom fields
 * CRITICAL: Uses array format for v2 API
 */
export async function updateCustomFields(
  contactId: string,
  customFields: Record<string, string>
): Promise<GHLResponse> {
  if (!contactId || Object.keys(customFields).length === 0) {
    return { ok: true, data: { skipped: true } };
  }

  const customFieldsArray = toCustomFieldsArray(customFields);

  try {
    const response = await fetch(`${GHL_BASE_URL}/contacts/${contactId}`, {
      method: 'PUT',
      headers: ghlHeaders(),
      body: JSON.stringify({ customFields: customFieldsArray }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[GHL] Update custom fields failed:', response.status, errorText);
      return { ok: false, step: 'custom_fields', status: response.status, error: errorText };
    }

    console.log('[GHL] Custom fields updated');
    return { ok: true };
  } catch (error) {
    console.error('[GHL] Custom fields exception:', error);
    return { ok: false, step: 'custom_fields', error: String(error) };
  }
}

/**
 * Upload file to contact custom field
 * Uses /forms/upload-custom-files endpoint
 * CRITICAL: Field name must be `${customFieldId}_file`
 */
export async function uploadFileToCustomField(
  contactId: string,
  customFieldId: string,
  fileBlob: Blob,
  fileName: string
): Promise<GHLResponse<{ fileUrl: string }>> {
  const locationId = getLocationId();
  if (!locationId) {
    return { ok: false, step: 'configuration', error: 'GHL_LOCATION_ID not set' };
  }
  if (!customFieldId) {
    return { ok: false, step: 'configuration', error: 'Custom field ID not provided' };
  }

  try {
    // Field name MUST follow this convention
    const fieldName = `${customFieldId}_file`;
    const formData = new FormData();
    formData.append(fieldName, fileBlob, fileName);

    const uploadUrl = `${GHL_BASE_URL}/forms/upload-custom-files?contactId=${contactId}&locationId=${locationId}`;

    // NO Content-Type header - FormData sets multipart boundary
    const response = await fetch(uploadUrl, {
      method: 'POST',
      headers: ghlUploadHeaders(),
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[GHL] File upload failed:', response.status, errorText);
      return { ok: false, step: 'upload', status: response.status, error: errorText };
    }

    const result = await response.json();
    
    // Extract file URL from response
    const fileUrl = extractFileUrlFromUploadResponse(result, customFieldId);
    console.log('[GHL] File uploaded:', fileUrl);
    
    return { ok: true, data: { fileUrl } };
  } catch (error) {
    console.error('[GHL] Upload exception:', error);
    return { ok: false, step: 'upload', error: String(error) };
  }
}

/**
 * Extract file URL from upload response
 */
function extractFileUrlFromUploadResponse(result: any, customFieldId: string): string {
  try {
    const customFields = result?.contact?.customFields || [];
    const field = customFields.find((f: any) => f.id === customFieldId);
    return field?.value?.file?.url || '';
  } catch {
    return '';
  }
}

/**
 * Get all custom fields for location (Admin tool)
 */
export async function getLocationCustomFields(): Promise<GHLResponse<{ customFields: any[] }>> {
  const locationId = getLocationId();
  if (!locationId) {
    return { ok: false, step: 'configuration', error: 'GHL_LOCATION_ID not set' };
  }

  try {
    const response = await fetch(`${GHL_BASE_URL}/locations/${locationId}/customFields`, {
      method: 'GET',
      headers: ghlHeaders(),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[GHL] Get custom fields failed:', response.status, errorText);
      return { ok: false, step: 'fetch_fields', status: response.status, error: errorText };
    }

    const data = await response.json();
    console.log('[GHL] Custom fields retrieved:', data.customFields?.length || 0);
    return { ok: true, data };
  } catch (error) {
    console.error('[GHL] Get custom fields exception:', error);
    return { ok: false, step: 'fetch_fields', error: String(error) };
  }
}
```

**File: `supabase/functions/ghl-admin-fields/index.ts`**
```typescript
// Admin tool to query GHL custom fields
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { getLocationCustomFields } from "../_shared/ghlClient.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('[ghl-admin-fields] Fetching custom fields from GHL...');
    
    const result = await getLocationCustomFields();
    
    if (!result.ok) {
      console.error('[ghl-admin-fields] Error:', result.error);
      return new Response(
        JSON.stringify({ error: result.error, step: result.step }),
        { status: result.status || 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Format for easy human reading
    const formatted = (result.data?.customFields || []).map((field: any) => ({
      id: field.id,
      name: field.name,
      fieldKey: field.fieldKey,
      dataType: field.dataType,
      placeholder: field.placeholder,
    }));

    console.log('[ghl-admin-fields] Retrieved', formatted.length, 'custom fields');

    return new Response(
      JSON.stringify({ 
        customFields: formatted,
        count: formatted.length,
        locationId: Deno.env.get('GHL_LOCATION_ID'),
        timestamp: new Date().toISOString(),
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('[ghl-admin-fields] Exception:', error);
    return new Response(
      JSON.stringify({ error: String(error) }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
```

**File: `supabase/functions/submit-form/index.ts`**
```typescript
// Generic form submission handler (contact, localpros_apply, newsletter)
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { upsertContact, addTags, addNote } from "../_shared/ghlClient.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface FormPayload {
  form_type: 'contact' | 'localpros_apply' | 'newsletter';
  email: string;
  name?: string;
  phone?: string;
  company?: string;
  message?: string;
  source_page?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  tcpa_consent?: boolean;
}

const TAG_MAP: Record<string, string[]> = {
  contact: ['everintent-smartsites-contact'],
  localpros_apply: ['everintent-smartsites-localpros-apply', 'localpros-partner-prospect'],
  newsletter: ['everintent-smartsites-newsletter'],
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  );

  try {
    const payload: FormPayload = await req.json();
    const clientIP = req.headers.get('x-forwarded-for') || req.headers.get('cf-connecting-ip') || '';
    const userAgent = req.headers.get('user-agent') || '';

    console.log('[submit-form] Processing:', payload.form_type, payload.email);

    // 1. Insert into Supabase
    const { data: submission, error: dbError } = await supabase
      .from('form_submissions')
      .insert({
        form_type: payload.form_type,
        email: payload.email,
        name: payload.name,
        phone: payload.phone,
        company: payload.company,
        message: payload.message,
        source_page: payload.source_page,
        utm_source: payload.utm_source,
        utm_medium: payload.utm_medium,
        utm_campaign: payload.utm_campaign,
        tcpa_consent: payload.tcpa_consent || false,
        consent_timestamp: payload.tcpa_consent ? new Date().toISOString() : null,
        ip_address: clientIP,
        user_agent: userAgent,
        ghl_sync_status: 'pending',
      })
      .select()
      .single();

    if (dbError) {
      console.error('[submit-form] DB error:', dbError);
      return new Response(
        JSON.stringify({ error: 'Failed to save submission' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // 2. Sync to GHL
    const ghlResult = await upsertContact({
      email: payload.email,
      name: payload.name,
      phone: payload.phone,
      companyName: payload.company,
      source: `SmartSites ${payload.form_type}`,
    });

    let ghlContactId: string | null = null;
    let ghlSyncStatus = 'failed';
    let ghlError: string | null = null;

    if (ghlResult.ok && ghlResult.data?.contact?.id) {
      ghlContactId = ghlResult.data.contact.id;
      ghlSyncStatus = 'synced';

      // Add tags
      const tags = [...(TAG_MAP[payload.form_type] || [])];
      if (payload.source_page) {
        tags.push(`source:${payload.source_page.replace(/\//g, '-')}`);
      }
      await addTags(ghlContactId, tags);

      // Add note if message provided
      if (payload.message) {
        const noteBody = `[SmartSites ${payload.form_type}]\n\n${payload.message}\n\nSource: ${payload.source_page || 'unknown'}`;
        await addNote(ghlContactId, noteBody);
      }
    } else {
      ghlError = ghlResult.error || 'Unknown GHL error';
      console.error('[submit-form] GHL sync failed:', ghlError);
    }

    // 3. Update submission with GHL status
    await supabase
      .from('form_submissions')
      .update({
        ghl_contact_id: ghlContactId,
        ghl_sync_status: ghlSyncStatus,
        ghl_synced_at: ghlSyncStatus === 'synced' ? new Date().toISOString() : null,
        ghl_error: ghlError,
      })
      .eq('id', submission.id);

    console.log('[submit-form] Complete. GHL status:', ghlSyncStatus);

    return new Response(
      JSON.stringify({ 
        success: true, 
        id: submission.id,
        ghl_synced: ghlSyncStatus === 'synced',
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('[submit-form] Exception:', error);
    return new Response(
      JSON.stringify({ error: String(error) }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
```

**File: `supabase/functions/start-checkout/index.ts`**
```typescript
// Checkout form submission handler
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { upsertContact, addTags, addNote } from "../_shared/ghlClient.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface CheckoutPayload {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message?: string;
  service_interest?: string;
  source_page?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  tcpa_consent?: boolean;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  );

  try {
    const payload: CheckoutPayload = await req.json();
    const clientIP = req.headers.get('x-forwarded-for') || req.headers.get('cf-connecting-ip') || '';
    const userAgent = req.headers.get('user-agent') || '';

    console.log('[start-checkout] Processing:', payload.email);

    // 1. Insert into Supabase
    const { data: submission, error: dbError } = await supabase
      .from('checkout_submissions')
      .insert({
        name: payload.name,
        email: payload.email,
        phone: payload.phone,
        company: payload.company,
        message: payload.message,
        service_interest: payload.service_interest,
        source_page: payload.source_page,
        utm_source: payload.utm_source,
        utm_medium: payload.utm_medium,
        utm_campaign: payload.utm_campaign,
        tcpa_consent: payload.tcpa_consent || false,
        consent_timestamp: payload.tcpa_consent ? new Date().toISOString() : null,
        ip_address: clientIP,
        user_agent: userAgent,
        ghl_sync_status: 'pending',
      })
      .select()
      .single();

    if (dbError) {
      console.error('[start-checkout] DB error:', dbError);
      return new Response(
        JSON.stringify({ error: 'Failed to save submission' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // 2. Sync to GHL
    const ghlResult = await upsertContact({
      email: payload.email,
      name: payload.name,
      phone: payload.phone,
      companyName: payload.company,
      source: 'SmartSites Checkout',
    });

    let ghlContactId: string | null = null;
    let ghlSyncStatus = 'failed';
    let ghlError: string | null = null;

    if (ghlResult.ok && ghlResult.data?.contact?.id) {
      ghlContactId = ghlResult.data.contact.id;
      ghlSyncStatus = 'synced';

      // Add tags
      const tags = ['everintent-smartsites-checkout'];
      if (payload.service_interest) {
        tags.push(`tier:${payload.service_interest}`);
      }
      if (payload.source_page) {
        tags.push(`source:${payload.source_page.replace(/\//g, '-')}`);
      }
      await addTags(ghlContactId, tags);

      // Add note
      const noteBody = `[SmartSites Checkout]\n\nService: ${payload.service_interest || 'Not specified'}\nCompany: ${payload.company || 'Not provided'}\n\nMessage: ${payload.message || 'None'}\n\nSource: ${payload.source_page || 'unknown'}`;
      await addNote(ghlContactId, noteBody);
    } else {
      ghlError = ghlResult.error || 'Unknown GHL error';
      console.error('[start-checkout] GHL sync failed:', ghlError);
    }

    // 3. Update submission with GHL status
    await supabase
      .from('checkout_submissions')
      .update({
        ghl_contact_id: ghlContactId,
        ghl_sync_status: ghlSyncStatus,
        ghl_synced_at: ghlSyncStatus === 'synced' ? new Date().toISOString() : null,
        ghl_error: ghlError,
      })
      .eq('id', submission.id);

    console.log('[start-checkout] Complete. GHL status:', ghlSyncStatus);

    return new Response(
      JSON.stringify({ 
        success: true, 
        id: submission.id,
        ghl_synced: ghlSyncStatus === 'synced',
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('[start-checkout] Exception:', error);
    return new Response(
      JSON.stringify({ error: String(error) }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
```

**File: `supabase/functions/submit-job-application/index.ts`**
```typescript
// Job application handler with resume upload
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { 
  upsertContact, 
  addTags, 
  addNote, 
  updateCustomFields,
  uploadFileToCustomField,
  toCustomFieldsArray 
} from "../_shared/ghlClient.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface JobApplicationPayload {
  job_id: string;
  job_slug: string;
  job_title: string;
  email: string;
  name: string;
  phone?: string;
  linkedin_url?: string;
  portfolio_url?: string;
  loom_url?: string;
  resume_path?: string;
  resume_filename?: string;
  custom_answers?: Record<string, string>;
  cover_letter?: string;
  source_page?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  tcpa_consent?: boolean;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  );

  try {
    const payload: JobApplicationPayload = await req.json();
    const clientIP = req.headers.get('x-forwarded-for') || req.headers.get('cf-connecting-ip') || '';
    const userAgent = req.headers.get('user-agent') || '';

    console.log('[submit-job-application] Processing:', payload.email, 'for job:', payload.job_slug);

    // 1. Insert into Supabase
    const { data: application, error: dbError } = await supabase
      .from('job_applications')
      .insert({
        job_id: payload.job_id,
        email: payload.email,
        name: payload.name,
        phone: payload.phone,
        linkedin_url: payload.linkedin_url,
        portfolio_url: payload.portfolio_url,
        loom_url: payload.loom_url,
        resume_path: payload.resume_path,
        resume_filename: payload.resume_filename,
        custom_answers: payload.custom_answers || {},
        cover_letter: payload.cover_letter,
        source_page: payload.source_page,
        utm_source: payload.utm_source,
        utm_medium: payload.utm_medium,
        utm_campaign: payload.utm_campaign,
        tcpa_consent: payload.tcpa_consent || false,
        consent_timestamp: payload.tcpa_consent ? new Date().toISOString() : null,
        ip_address: clientIP,
        user_agent: userAgent,
        ghl_sync_status: 'pending',
      })
      .select()
      .single();

    if (dbError) {
      console.error('[submit-job-application] DB error:', dbError);
      return new Response(
        JSON.stringify({ error: 'Failed to save application' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // 2. Sync to GHL
    const ghlResult = await upsertContact({
      email: payload.email,
      name: payload.name,
      phone: payload.phone,
      source: `SmartSites Job Application - ${payload.job_title}`,
    });

    let ghlContactId: string | null = null;
    let ghlSyncStatus = 'failed';
    let ghlError: string | null = null;

    if (ghlResult.ok && ghlResult.data?.contact?.id) {
      ghlContactId = ghlResult.data.contact.id;
      ghlSyncStatus = 'synced';

      // Add tags
      const tags = [
        'everintent-smartsites-job-application',
        `job:${payload.job_slug}`,
      ];
      await addTags(ghlContactId, tags);

      // Update custom fields (Loom URL)
      const videoFieldId = Deno.env.get('GHL_VIDEO_LINK_CUSTOM_FIELD_ID');
      if (payload.loom_url && videoFieldId) {
        await updateCustomFields(ghlContactId, {
          [videoFieldId]: payload.loom_url,
        });
      }

      // Upload resume to GHL if exists
      const resumeFieldId = Deno.env.get('GHL_RESUME_CUSTOM_FIELD_ID');
      if (payload.resume_path && resumeFieldId) {
        try {
          // Download from Supabase Storage
          const { data: fileData, error: downloadError } = await supabase.storage
            .from('resumes')
            .download(payload.resume_path);

          if (!downloadError && fileData) {
            await uploadFileToCustomField(
              ghlContactId,
              resumeFieldId,
              fileData,
              payload.resume_filename || 'resume.pdf'
            );
          }
        } catch (uploadErr) {
          console.error('[submit-job-application] Resume upload to GHL failed:', uploadErr);
          // Continue - don't fail the whole submission for resume upload
        }
      }

      // Build comprehensive note
      let noteBody = `[SmartSites Job Application]\n\nPosition: ${payload.job_title}\n`;
      if (payload.linkedin_url) noteBody += `LinkedIn: ${payload.linkedin_url}\n`;
      if (payload.portfolio_url) noteBody += `Portfolio: ${payload.portfolio_url}\n`;
      if (payload.loom_url) noteBody += `Loom Video: ${payload.loom_url}\n`;
      if (payload.cover_letter) noteBody += `\nCover Letter:\n${payload.cover_letter}\n`;
      if (payload.custom_answers && Object.keys(payload.custom_answers).length > 0) {
        noteBody += `\nCustom Answers:\n`;
        for (const [q, a] of Object.entries(payload.custom_answers)) {
          noteBody += `Q: ${q}\nA: ${a}\n\n`;
        }
      }
      noteBody += `\nSource: ${payload.source_page || 'unknown'}`;

      await addNote(ghlContactId, noteBody);
    } else {
      ghlError = ghlResult.error || 'Unknown GHL error';
      console.error('[submit-job-application] GHL sync failed:', ghlError);
    }

    // 3. Update application with GHL status
    await supabase
      .from('job_applications')
      .update({
        ghl_contact_id: ghlContactId,
        ghl_sync_status: ghlSyncStatus,
        ghl_synced_at: ghlSyncStatus === 'synced' ? new Date().toISOString() : null,
        ghl_error: ghlError,
      })
      .eq('id', application.id);

    console.log('[submit-job-application] Complete. GHL status:', ghlSyncStatus);

    return new Response(
      JSON.stringify({ 
        success: true, 
        id: application.id,
        ghl_synced: ghlSyncStatus === 'synced',
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('[submit-job-application] Exception:', error);
    return new Response(
      JSON.stringify({ error: String(error) }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
```

### 1.3 Update `supabase/config.toml`

Add new functions:
```toml
[functions.ghl-admin-fields]
verify_jwt = true

[functions.submit-form]
verify_jwt = false

[functions.start-checkout]
verify_jwt = false

[functions.submit-job-application]
verify_jwt = false
```

---

## Phase 2: Cookie Consent + GHL Widget

### 2.1 Cookie Consent Component

**File: `src/components/CookieConsent.tsx`**

Features:
- localStorage key: `smartsites-cookie-consent`
- Dispatches `cookie-consent-changed` event on accept/decline
- Gates GA4 script injection
- Accessible via footer "Cookie Preferences" button

### 2.2 GHL Widget Loader

**File: `src/lib/ghlLoader.ts`**

Features:
- Loader URL: `https://beta.leadconnectorhq.com/loader.js`
- Widget data-id from env: `VITE_GHL_WIDGET_ID`
- Window API fallback: `leadConnector → chatWidget → LC_API`
- TypeScript globals declared

### 2.3 GHL Chat Widget

**File: `src/components/GHLChatWidget.tsx`**

Features:
- Only renders after cookie consent
- Loads widget script dynamically
- Provides `window.toggleGHLChat()` and `window.closeGHLChat()`

### 2.4 Desktop Chat Button

**File: `src/components/DesktopChatButton.tsx`**

Features:
- Fixed bottom-right position
- Fade-up animation on mount
- Only visible after cookie consent
- Calls `window.toggleGHLChat()` on click

### 2.5 Mobile Bottom Bar Update

Update `src/components/MobileBottomBar.tsx`:
- Only render after cookie consent
- Include chat button that calls `window.toggleGHLChat()`

### 2.6 Footer Integration

Update footer "Cookies" link:
```typescript
onClick={() => window.dispatchEvent(new Event('cookie-consent-changed'))}
```

---

## Phase 3: Core Marketing Pages

Execute Lovable Prompts 6, 7, 8 from `docs/lovable_prompts.md`:

1. **Prompt 6: Homepage** (`src/pages/Index.tsx`)
2. **Prompt 7: Beautiful Websites** (`src/pages/services/BeautifulWebsites.tsx`)
3. **Prompt 8: Pricing** (`src/pages/Pricing.tsx`)

---

## Phase 4: Checkout Flow

### Pages
- `src/pages/checkout/SmartSiteCheckout.tsx`
- `src/pages/checkout/Success.tsx`

### Shared Components
- `src/components/forms/CheckoutForm.tsx`
- `src/components/forms/TCPAConsent.tsx`
- `src/components/forms/UTMCapture.tsx` (hidden fields from URL params)

### Flow
1. Form collects: name, email, phone, company, message, service_interest
2. Calls `start-checkout` Edge Function
3. On success, redirects to Stripe checkout URL with email prefilled
4. Stripe webhook (future) updates status

---

## Phase 5: LocalPros Apply

### Pages
- `src/pages/localpros/Index.tsx` - Landing page
- `src/pages/localpros/Apply.tsx` - Application form

### Flow
1. Landing page validates offering, shows live site examples
2. Apply form collects: name, email, phone, company, message
3. Calls `submit-form` Edge Function with `form_type: 'localpros_apply'`
4. Shows success message

---

## Phase 6: Careers MVP

### Public Pages
- `src/pages/careers/Index.tsx` - Job listings
- `src/pages/careers/[slug].tsx` - Job detail + application form

### Admin Pages
- `src/pages/admin/careers/Index.tsx` - Job list
- `src/pages/admin/careers/[id].tsx` - Job editor
- `src/pages/admin/careers/applications/Index.tsx` - Application list
- `src/pages/admin/careers/applications/[id].tsx` - Application detail

### Flow
1. Public job page renders form based on job config (loom_required, portfolio_required, custom_questions)
2. Resume uploaded to Supabase Storage first
3. Calls `submit-job-application` Edge Function
4. GHL contact created with tags, custom fields, note, and resume file

---

## Phase 7: Legal Pages + Domain Tool

### Legal Pages
- `src/pages/legal/Privacy.tsx`
- `src/pages/legal/Terms.tsx`
- `src/pages/legal/DataRequest.tsx`
- `src/pages/legal/Cookies.tsx`

### Domain Search
- `src/pages/tools/DomainSearch.tsx`
- Integration with Namecheap API (Edge Function)

---

## Admin Tools

### GHL Custom Fields Admin

**Route:** `/admin/ghl-fields`

**Purpose:** Query GHL for all custom field IDs so human can configure secrets.

**Component: `src/pages/admin/GHLFields.tsx`**
```typescript
// Calls ghl-admin-fields Edge Function
// Displays table with: ID, Name, Field Key, Data Type
// Copy button for each ID
// Refreshable
```

### Unified Submissions View

**Route:** `/admin/submissions`

**Features:**
- Tabs/filter by type: All | Contact | LocalPros | Checkout | Job Applications
- Columns: Date, Type, Name, Email, Status, GHL Sync
- Click row to view detail
- GHL sync status indicator (green check, red x, pending spinner)

---

## Manual GHL Configuration Checklist

### Pre-Implementation (Human Tasks)

1. **Create GHL Private Integration**
   - Go to GHL Settings → Integrations → Private Integrations
   - Create new integration with scopes: contacts, locations, forms
   - Copy Private Integration Token

2. **Get Location ID**
   - Go to GHL Settings → Business Profile
   - Copy Location ID from URL or settings

3. **Create Custom Fields**
   - Go to GHL Settings → Custom Fields → Contact Fields
   - Create "Resume" field (File type)
   - Create "Video Link" field (Text type)
   - Note their IDs using Admin Tool

4. **Get Chat Widget ID**
   - Go to GHL Settings → Chat Widget
   - Copy widget data-id from embed code

5. **Configure Supabase Secrets**
   ```
   GHL_PRIVATE_INTEGRATION_TOKEN = [from step 1]
   GHL_LOCATION_ID = [from step 2]
   GHL_RESUME_CUSTOM_FIELD_ID = [from step 3]
   GHL_VIDEO_LINK_CUSTOM_FIELD_ID = [from step 3]
   ```

6. **Configure Vercel Environment**
   ```
   VITE_GHL_WIDGET_ID = [from step 4]
   ```

### Using Admin Tool to Extract Field IDs

1. Deploy Edge Functions (Phase 1)
2. Add GHL secrets to Supabase
3. Navigate to `/admin/ghl-fields`
4. Login as admin
5. Click "Refresh Fields"
6. Find "Resume" and "Video Link" fields
7. Copy their IDs
8. Update Supabase secrets with IDs

---

## Deferred Items

- Looker Studio analytics integration
- Portfolio/Testimonials advanced CRUD
- Namecheap IP whitelisting for Vercel static IPs
- Stripe webhook for checkout completion
- Advanced GHL pipeline automation
- A/B testing for marketing pages

---

## Execution Order

```
Phase 1.1 → Run database migrations (wait for approval)
Phase 1.2 → Create Edge Functions + update config.toml
Phase 1.3 → Add GHL secrets to Supabase
Phase 1.4 → Deploy, test ghl-admin-fields endpoint
Phase 1.5 → Human configures GHL custom field IDs
Phase 2   → Cookie consent + GHL widget
Phase 3   → Marketing pages (Prompts 6, 7, 8)
Phase 4   → Checkout flow
Phase 5   → LocalPros pages
Phase 6   → Careers pages
Phase 7   → Legal + Domain tool
```

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| v1 | 2025-01-XX | Initial roadmap with GHL v2 spec integrated |
