-- Phase 1: Form Architecture Foundation

-- 1. Create form_submissions table with form_type discriminator
CREATE TABLE public.form_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  form_type TEXT NOT NULL CHECK (form_type IN ('contact', 'localpros_apply')),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  message TEXT,
  
  -- TCPA compliance
  tcpa_consent BOOLEAN NOT NULL DEFAULT false,
  consent_timestamp TIMESTAMPTZ,
  ip_address TEXT,
  user_agent TEXT,
  
  -- UTM tracking
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  source_page TEXT,
  
  -- GHL sync
  ghl_contact_id TEXT,
  ghl_sync_status TEXT DEFAULT 'pending' CHECK (ghl_sync_status IN ('pending', 'synced', 'failed')),
  ghl_synced_at TIMESTAMPTZ,
  ghl_error TEXT,
  
  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. Create jobs table for careers
CREATE TABLE public.jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  department TEXT,
  location TEXT,
  employment_type TEXT CHECK (employment_type IN ('full-time', 'part-time', 'contract', 'internship')),
  description TEXT,
  requirements TEXT,
  benefits TEXT,
  salary_range TEXT,
  is_published BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3. Create job_applications table
CREATE TABLE public.job_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id UUID REFERENCES public.jobs(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  resume_url TEXT,
  cover_letter TEXT,
  linkedin_url TEXT,
  portfolio_url TEXT,
  video_intro_url TEXT,
  
  -- TCPA compliance
  tcpa_consent BOOLEAN NOT NULL DEFAULT false,
  consent_timestamp TIMESTAMPTZ,
  ip_address TEXT,
  user_agent TEXT,
  
  -- UTM tracking
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  source_page TEXT,
  
  -- GHL sync
  ghl_contact_id TEXT,
  ghl_sync_status TEXT DEFAULT 'pending' CHECK (ghl_sync_status IN ('pending', 'synced', 'failed')),
  ghl_synced_at TIMESTAMPTZ,
  ghl_error TEXT,
  
  -- Status tracking
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'reviewing', 'interviewed', 'offered', 'hired', 'rejected')),
  
  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 4. Add GHL sync columns to checkout_submissions
ALTER TABLE public.checkout_submissions
ADD COLUMN IF NOT EXISTS ghl_contact_id TEXT,
ADD COLUMN IF NOT EXISTS ghl_sync_status TEXT DEFAULT 'pending' CHECK (ghl_sync_status IN ('pending', 'synced', 'failed')),
ADD COLUMN IF NOT EXISTS ghl_synced_at TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS ghl_error TEXT,
ADD COLUMN IF NOT EXISTS tcpa_consent BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS consent_timestamp TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS ip_address TEXT,
ADD COLUMN IF NOT EXISTS user_agent TEXT;

-- 5. Create resumes storage bucket
INSERT INTO storage.buckets (id, name, public) VALUES ('resumes', 'resumes', false);

-- 6. Enable RLS on all new tables
ALTER TABLE public.form_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;

-- 7. RLS policies for form_submissions
CREATE POLICY "Anyone can submit forms" ON public.form_submissions
FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can view all form submissions" ON public.form_submissions
FOR SELECT USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update form submissions" ON public.form_submissions
FOR UPDATE USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete form submissions" ON public.form_submissions
FOR DELETE USING (has_role(auth.uid(), 'admin'::app_role));

-- 8. RLS policies for jobs
CREATE POLICY "Anyone can view published jobs" ON public.jobs
FOR SELECT USING (is_published = true);

CREATE POLICY "Admins can view all jobs" ON public.jobs
FOR SELECT USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can insert jobs" ON public.jobs
FOR INSERT WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update jobs" ON public.jobs
FOR UPDATE USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete jobs" ON public.jobs
FOR DELETE USING (has_role(auth.uid(), 'admin'::app_role));

-- 9. RLS policies for job_applications
CREATE POLICY "Anyone can submit job applications" ON public.job_applications
FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can view all job applications" ON public.job_applications
FOR SELECT USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update job applications" ON public.job_applications
FOR UPDATE USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete job applications" ON public.job_applications
FOR DELETE USING (has_role(auth.uid(), 'admin'::app_role));

-- 10. Storage policies for resumes bucket
CREATE POLICY "Anyone can upload resumes" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'resumes');

CREATE POLICY "Admins can view resumes" ON storage.objects
FOR SELECT USING (bucket_id = 'resumes' AND has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete resumes" ON storage.objects
FOR DELETE USING (bucket_id = 'resumes' AND has_role(auth.uid(), 'admin'::app_role));

-- 11. Triggers for updated_at
CREATE TRIGGER update_form_submissions_updated_at
BEFORE UPDATE ON public.form_submissions
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_jobs_updated_at
BEFORE UPDATE ON public.jobs
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_job_applications_updated_at
BEFORE UPDATE ON public.job_applications
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();