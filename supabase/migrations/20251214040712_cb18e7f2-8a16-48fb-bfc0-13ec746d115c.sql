-- Add michael@everintent.com to allowed_admin_emails
INSERT INTO public.allowed_admin_emails (email)
VALUES ('michael@everintent.com');

-- Add admin role for the user
INSERT INTO public.user_roles (user_id, role)
VALUES ('69651548-7123-4aee-a0c5-5f6632c69eb5', 'admin');