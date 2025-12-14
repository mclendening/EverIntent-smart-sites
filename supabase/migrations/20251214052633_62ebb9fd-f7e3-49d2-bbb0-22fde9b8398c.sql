-- =============================================
-- PROMPT 4: DATA TABLES FOR SMARTSITES
-- Tables: checkout_submissions, portfolio, testimonials
-- =============================================

-- 1. CHECKOUT SUBMISSIONS TABLE
-- Stores form submissions from checkout/contact forms
CREATE TABLE public.checkout_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    company TEXT,
    service_interest TEXT,
    message TEXT,
    source_page TEXT,
    utm_source TEXT,
    utm_medium TEXT,
    utm_campaign TEXT,
    status TEXT DEFAULT 'new',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.checkout_submissions ENABLE ROW LEVEL SECURITY;

-- Only admins can view submissions
CREATE POLICY "Admins can view all submissions"
ON public.checkout_submissions
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

-- Only admins can update submissions
CREATE POLICY "Admins can update submissions"
ON public.checkout_submissions
FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

-- Only admins can delete submissions
CREATE POLICY "Admins can delete submissions"
ON public.checkout_submissions
FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));

-- Anyone can insert (public form submissions)
CREATE POLICY "Anyone can submit checkout form"
ON public.checkout_submissions
FOR INSERT
WITH CHECK (true);

-- 2. PORTFOLIO TABLE
-- Stores portfolio/case study items
CREATE TABLE public.portfolio (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    client_name TEXT,
    industry TEXT,
    services_provided TEXT[],
    featured_image_url TEXT,
    gallery_urls TEXT[],
    results_summary TEXT,
    testimonial_quote TEXT,
    website_url TEXT,
    is_featured BOOLEAN DEFAULT false,
    is_published BOOLEAN DEFAULT false,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.portfolio ENABLE ROW LEVEL SECURITY;

-- Public can view published portfolio items
CREATE POLICY "Anyone can view published portfolio"
ON public.portfolio
FOR SELECT
USING (is_published = true);

-- Admins can view all portfolio items
CREATE POLICY "Admins can view all portfolio"
ON public.portfolio
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

-- Admins can insert portfolio items
CREATE POLICY "Admins can insert portfolio"
ON public.portfolio
FOR INSERT
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Admins can update portfolio items
CREATE POLICY "Admins can update portfolio"
ON public.portfolio
FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

-- Admins can delete portfolio items
CREATE POLICY "Admins can delete portfolio"
ON public.portfolio
FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));

-- 3. TESTIMONIALS TABLE
-- Stores client testimonials
CREATE TABLE public.testimonials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_name TEXT NOT NULL,
    client_title TEXT,
    client_company TEXT,
    client_photo_url TEXT,
    quote TEXT NOT NULL,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    industry TEXT,
    service_type TEXT,
    is_featured BOOLEAN DEFAULT false,
    is_published BOOLEAN DEFAULT false,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

-- Public can view published testimonials
CREATE POLICY "Anyone can view published testimonials"
ON public.testimonials
FOR SELECT
USING (is_published = true);

-- Admins can view all testimonials
CREATE POLICY "Admins can view all testimonials"
ON public.testimonials
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

-- Admins can insert testimonials
CREATE POLICY "Admins can insert testimonials"
ON public.testimonials
FOR INSERT
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Admins can update testimonials
CREATE POLICY "Admins can update testimonials"
ON public.testimonials
FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

-- Admins can delete testimonials
CREATE POLICY "Admins can delete testimonials"
ON public.testimonials
FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));

-- 4. UPDATE TIMESTAMP TRIGGER FUNCTION
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- 5. APPLY TRIGGERS TO ALL TABLES
CREATE TRIGGER update_checkout_submissions_updated_at
BEFORE UPDATE ON public.checkout_submissions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_portfolio_updated_at
BEFORE UPDATE ON public.portfolio
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_testimonials_updated_at
BEFORE UPDATE ON public.testimonials
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- 6. CREATE INDEXES FOR PERFORMANCE
CREATE INDEX idx_checkout_submissions_status ON public.checkout_submissions(status);
CREATE INDEX idx_checkout_submissions_created_at ON public.checkout_submissions(created_at DESC);
CREATE INDEX idx_portfolio_slug ON public.portfolio(slug);
CREATE INDEX idx_portfolio_is_published ON public.portfolio(is_published);
CREATE INDEX idx_portfolio_is_featured ON public.portfolio(is_featured);
CREATE INDEX idx_testimonials_is_published ON public.testimonials(is_published);
CREATE INDEX idx_testimonials_is_featured ON public.testimonials(is_featured);