-- Drop the existing check constraint and add updated one with data_rights_request
ALTER TABLE public.form_submissions DROP CONSTRAINT IF EXISTS form_submissions_form_type_check;

ALTER TABLE public.form_submissions ADD CONSTRAINT form_submissions_form_type_check 
CHECK (form_type IN ('contact', 'localpros_apply', 'data_rights_request'));