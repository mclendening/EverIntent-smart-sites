
-- Task 6.20: Add v5.2 checkout columns (re-run after partial failure)
ALTER TABLE public.checkout_submissions
  ADD COLUMN IF NOT EXISTS first_name text,
  ADD COLUMN IF NOT EXISTS last_name text,
  ADD COLUMN IF NOT EXISTS business_name text,
  ADD COLUMN IF NOT EXISTS has_domain boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS domain_name text,
  ADD COLUMN IF NOT EXISTS selected_tier text,
  ADD COLUMN IF NOT EXISTS addons jsonb DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS monthly_total integer DEFAULT 0,
  ADD COLUMN IF NOT EXISTS setup_total integer DEFAULT 0;
