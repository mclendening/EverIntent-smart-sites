-- Change monetary columns from integer to numeric(10,2)
-- Integer truncates cents when discount math produces values like $346.50
-- Affects: checkout_submissions table only
-- Safe migration: integer values cast to numeric without data loss

ALTER TABLE checkout_submissions
  ALTER COLUMN monthly_total TYPE numeric(10,2) USING monthly_total::numeric(10,2),
  ALTER COLUMN setup_total TYPE numeric(10,2) USING setup_total::numeric(10,2);

-- Update defaults to match new type
ALTER TABLE checkout_submissions
  ALTER COLUMN monthly_total SET DEFAULT 0.00,
  ALTER COLUMN setup_total SET DEFAULT 0.00;