
-- Fix: trigger already exists, use CREATE OR REPLACE via DROP + CREATE
DROP TRIGGER IF EXISTS update_checkout_submissions_updated_at ON public.checkout_submissions;
CREATE TRIGGER update_checkout_submissions_updated_at
  BEFORE UPDATE ON public.checkout_submissions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
