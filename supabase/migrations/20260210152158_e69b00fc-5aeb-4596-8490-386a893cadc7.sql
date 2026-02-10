-- Task 6.24.2: Add affiliate_id column to all 3 submission tables
-- Nullable TEXT, no FK — audit/attribution only (GHL is system of record)

ALTER TABLE public.checkout_submissions
ADD COLUMN IF NOT EXISTS affiliate_id TEXT;

ALTER TABLE public.form_submissions
ADD COLUMN IF NOT EXISTS affiliate_id TEXT;

ALTER TABLE public.job_applications
ADD COLUMN IF NOT EXISTS affiliate_id TEXT;

-- Add comments for documentation
COMMENT ON COLUMN public.checkout_submissions.affiliate_id IS 'Affiliate partner ID from ?ref= cookie (ei_affiliate). Audit only — GHL manages commissions.';
COMMENT ON COLUMN public.form_submissions.affiliate_id IS 'Affiliate partner ID from ?ref= cookie (ei_affiliate). Audit only — GHL manages commissions.';
COMMENT ON COLUMN public.job_applications.affiliate_id IS 'Affiliate partner ID from ?ref= cookie (ei_affiliate). Audit only — GHL manages commissions.';