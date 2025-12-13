# SmartSites PRD Builder Prompt

**Purpose:** Paste this into a new Claude/Lovable session to build EverIntent SmartSites marketing pages.
**Reference:** EverIntent SmartSites BRD v32.1 (docs/smartsites-brd-v32.1.md)

---

## PROJECT CONTEXT

You are building the marketing site for **EverIntent SmartSites** — a productized website and automation service for local businesses. The site sells 4 tiers of service to home service contractors, professional services, health/wellness businesses, and automotive shops.

**Live URL:** everintentsmartsites.com  
**Tech Stack:** Vite + React 18 + TypeScript, Tailwind CSS, shadcn/ui, react-router-dom v6, Vercel Pro, Supabase  
**Pre-rendering:** vite-plugin-prerender (static HTML at build time)  
**SEO:** react-helmet-async for meta tags

---

## BRAND VOICE & COPY RULES

1. **Plain language.** No jargon.
2. **Short sentences.** 15 words max.
3. **Benefit-first.** Lead with what they get.
4. **Specific proof.** "$249" not "affordable."
5. **No em dashes.** Use commas or periods.
6. **Active voice.** "We build" not "Websites are built."
7. **Second person.** "You" and "Your."

**Tone:** Confident but not arrogant. Direct but not cold. Expert but not condescending. Operators who built this for operators. Anti-vendor: We help, not sell.

---

## TIER DEFINITIONS (Reference for all pages)

| Tier | Name | Price | Who It's For |
|------|------|-------|--------------|
| T1 | Smart Site | $249 one-time | Just need a professional web presence |
| T2 | Smart Lead | $97/month | Ready to capture and convert more leads |
| T3 | Smart Business | $197/month | Need to streamline operations |
| T4 | Smart Growth | $497/month | Ready for full automation and growth |

**T1 Renewal:** $149/year after first year

---

## ROUTES CONFIGURATION

Create `src/config/routes.ts` with all routes from BRD Section 15.1.1:

```typescript
export const routes = {
  // Core pages
  home: '/',
  pricing: '/pricing',
  portfolio: '/portfolio',
  about: '/about',
  contact: '/contact',
  bookCall: '/book-call',
  
  // Primary service (hero entry)
  beautifulWebsites: '/beautiful-websites',
  
  // Services
  services: '/services',
  getFoundOnline: '/get-found-online',
  neverMissALead: '/never-miss-a-lead',
  bookMoreJobs: '/book-more-jobs',
  runFromYourPhone: '/run-from-your-phone',
  buildYourReputation: '/build-your-reputation',
  letAiHandleIt: '/let-ai-handle-it',
  domains: '/domains',
  
  // Features (SEO pages)
  features: {
    leadCapture: '/features/lead-capture',
    aiChat: '/features/ai-chat',
    reviewManagement: '/features/review-management',
    mobileApp: '/features/mobile-app',
    scheduling: '/features/scheduling',
    analytics: '/features/analytics',
  },
  
  // Industry hubs
  industries: {
    homeServices: '/industries/home-services',
    professionalServices: '/industries/professional-services',
    healthWellness: '/industries/health-wellness',
    automotiveServices: '/industries/automotive-services',
  },
  
  // Checkout
  checkout: {
    smartSite: '/checkout/smart-site',
    smartLead: '/checkout/smart-lead',
    smartBusiness: '/checkout/smart-business',
    smartGrowth: '/checkout/smart-growth',
    success: '/checkout/success',
  },
  
  // Legal
  legal: {
    privacy: '/legal/privacy',
    terms: '/legal/terms',
    dataRequest: '/legal/data-request',
  },
  
  // LocalPros
  localpros: {
    home: '/localpros',
    apply: '/localpros/apply',
    successStories: '/localpros/success-stories',
  },
  
  // Upgrade
  upgrade: '/upgrade',
  
  // Admin (not pre-rendered)
  admin: {
    login: '/admin/login',
    dashboard: '/admin',
    submissions: '/admin/submissions',
    portfolio: '/admin/portfolio',
    testimonials: '/admin/testimonials',
  },
} as const;

// Pre-render all marketing routes (exclude /admin/*)
export const prerenderRoutes = [
  '/',
  '/pricing',
  '/portfolio',
  '/about',
  '/contact',
  '/book-call',
  '/beautiful-websites',
  '/get-found-online',
  '/never-miss-a-lead',
  '/book-more-jobs',
  '/run-from-your-phone',
  '/build-your-reputation',
  '/let-ai-handle-it',
  '/domains',
  '/features/lead-capture',
  '/features/ai-chat',
  '/features/review-management',
  '/features/mobile-app',
  '/features/scheduling',
  '/features/analytics',
  
  // Industry Hub Pages
  '/industries/home-services',
  '/industries/professional-services',
  '/industries/health-wellness',
  '/industries/automotive-services',
  
  // Home Services Industries (31)
  '/industries/home-services/hvac',
  '/industries/home-services/plumbing',
  '/industries/home-services/electrical',
  '/industries/home-services/roofing',
  '/industries/home-services/landscaping',
  '/industries/home-services/cleaning',
  '/industries/home-services/painting',
  '/industries/home-services/flooring',
  '/industries/home-services/remodeling',
  '/industries/home-services/pest-control',
  '/industries/home-services/pool-service',
  '/industries/home-services/garage-doors',
  '/industries/home-services/fencing',
  '/industries/home-services/tree-service',
  '/industries/home-services/handyman',
  '/industries/home-services/locksmith',
  '/industries/home-services/appliance-repair',
  '/industries/home-services/carpet-cleaning',
  '/industries/home-services/pressure-washing',
  '/industries/home-services/window-cleaning',
  '/industries/home-services/gutter-cleaning',
  '/industries/home-services/junk-removal',
  '/industries/home-services/moving',
  '/industries/home-services/glass-repair',
  '/industries/home-services/concrete-driveways',
  '/industries/home-services/deck-building',
  '/industries/home-services/home-inspection',
  '/industries/home-services/waterproofing',
  '/industries/home-services/insulation',
  '/industries/home-services/solar-installation',
  '/industries/home-services/security-systems',
  
  // Professional Services Industries (15)
  '/industries/professional-services/legal',
  '/industries/professional-services/real-estate',
  '/industries/professional-services/accounting',
  '/industries/professional-services/insurance',
  '/industries/professional-services/financial-advisor',
  '/industries/professional-services/mortgage',
  '/industries/professional-services/photography',
  '/industries/professional-services/videography',
  '/industries/professional-services/marketing',
  '/industries/professional-services/consulting',
  '/industries/professional-services/it-services',
  '/industries/professional-services/web-design',
  '/industries/professional-services/event-planning',
  '/industries/professional-services/interior-design',
  '/industries/professional-services/property-management',
  
  // Health & Wellness Industries (15)
  '/industries/health-wellness/medspa',
  '/industries/health-wellness/dental',
  '/industries/health-wellness/chiropractic',
  '/industries/health-wellness/physical-therapy',
  '/industries/health-wellness/massage',
  '/industries/health-wellness/acupuncture',
  '/industries/health-wellness/optometry',
  '/industries/health-wellness/veterinary',
  '/industries/health-wellness/mental-health',
  '/industries/health-wellness/personal-training',
  '/industries/health-wellness/yoga',
  '/industries/health-wellness/martial-arts',
  '/industries/health-wellness/salon',
  '/industries/health-wellness/barbershop',
  '/industries/health-wellness/spa',
  
  // Automotive Services Industries (10)
  '/industries/automotive-services/auto-repair',
  '/industries/automotive-services/auto-detailing',
  '/industries/automotive-services/tire-shop',
  '/industries/automotive-services/oil-change',
  '/industries/automotive-services/auto-body',
  '/industries/automotive-services/transmission',
  '/industries/automotive-services/towing',
  '/industries/automotive-services/mobile-car-wash',
  '/industries/automotive-services/window-tinting',
  '/industries/automotive-services/audio-installation',
  
  // Legal & Checkout
  '/legal/privacy',
  '/legal/terms',
  '/legal/data-request',
  '/checkout/smart-site',
  '/checkout/smart-lead',
  '/checkout/smart-business',
  '/checkout/smart-growth',
  '/checkout/success',

  // LocalPros
  '/localpros',
  '/localpros/apply',
  '/localpros/success-stories',

  // Upgrade
  '/upgrade',

  // Services hub
  '/services',
];
```

---

## NAVIGATION STRUCTURE

```
[Logo] | Services ▼ | Industries ▼ | Pricing | Portfolio | About | [Get Started]
```

**Services Dropdown:**
1. Beautiful Websites (top/primary)
2. Get Found Online
3. Never Miss a Lead
4. Book More Jobs
5. Run From Your Phone
6. Build Your Reputation
7. Let AI Handle It
8. Domains

**Industries Mega Menu:**
- Home Services (31 verticals)
- Professional Services (15 verticals)
- Health & Wellness (15 verticals)
- Automotive Services (10 verticals)

---

## ADMIN AUTHENTICATION (Secure OTP Flow)

### Database Schema

Run this migration to set up secure role-based admin access:

```sql
-- Role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

-- User roles junction table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE (user_id, role)
);

-- Allowed admin emails (OTP whitelist)
CREATE TABLE public.allowed_admin_emails (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id)
);

-- Enable RLS
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.allowed_admin_emails ENABLE ROW LEVEL SECURITY;

-- Security definer function (bypasses RLS safely)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- RLS Policies
CREATE POLICY "Admins can manage roles" ON public.user_roles
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage allowed emails" ON public.allowed_admin_emails
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));
```

### Edge Function: verify-admin-email

Create `supabase/functions/verify-admin-email/index.ts`:

```typescript
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email } = await req.json();
    
    if (!email) {
      return new Response(
        JSON.stringify({ error: "Email is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { autoRefreshToken: false, persistSession: false } }
    );

    // Check if email is in allowed_admin_emails
    const { data: allowedEmail, error: lookupError } = await supabaseAdmin
      .from("allowed_admin_emails")
      .select("email")
      .eq("email", email.toLowerCase())
      .single();

    if (lookupError || !allowedEmail) {
      console.log("Email not in whitelist:", email);
      return new Response(
        JSON.stringify({ error: "Email not authorized for admin access" }),
        { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Email is whitelisted, send OTP
    const { error: otpError } = await supabaseAdmin.auth.signInWithOtp({
      email: email.toLowerCase(),
      options: {
        shouldCreateUser: true,
      },
    });

    if (otpError) {
      console.error("OTP error:", otpError);
      return new Response(
        JSON.stringify({ error: "Failed to send verification email" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, message: "Verification email sent" }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Error in verify-admin-email:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
```

Add to `supabase/config.toml`:

```toml
[functions.verify-admin-email]
verify_jwt = false
```

### Admin Login Flow

1. Admin navigates to `/admin/login`
2. Enters email address
3. Frontend calls `verify-admin-email` Edge Function
4. If email is in `allowed_admin_emails`, OTP magic link is sent
5. Admin clicks link, redirected to `/admin` with active session
6. All admin routes wrapped in `<AdminGuard>` that verifies `has_role(auth.uid(), 'admin')`

### Frontend Components

**`src/pages/admin/Login.tsx`:**
- Two-step form: email input → "Check your email" confirmation
- Calls `supabase.functions.invoke('verify-admin-email', { body: { email } })`
- Error handling for non-whitelisted emails

**`src/hooks/useAdminAuth.ts`:**
- Uses `supabase.auth.onAuthStateChange`
- Checks `has_role()` via RPC call
- Returns `{ user, isAdmin, loading }`

**`src/components/admin/AdminGuard.tsx`:**
- Wraps admin routes
- Redirects to `/admin/login` if not authenticated or not admin

### Seed First Admin

After running the migration, seed your first admin:

```sql
-- Add email to whitelist
INSERT INTO allowed_admin_emails (email) VALUES ('your-admin@example.com');

-- After they log in via OTP, assign admin role
INSERT INTO user_roles (user_id, role)
SELECT id, 'admin' FROM auth.users WHERE email = 'your-admin@example.com';
```

---

## DATA TABLES

### checkout_submissions

```sql
CREATE TABLE checkout_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP DEFAULT NOW(),
  tier TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  business_name TEXT NOT NULL,
  domain_choice TEXT NOT NULL,
  domain_name TEXT,
  domain_status TEXT DEFAULT 'pending',
  tcpa_consent BOOLEAN NOT NULL,
  consent_timestamp TIMESTAMP NOT NULL,
  ip_address TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  utm_content TEXT,
  ghl_checkout_redirected BOOLEAN DEFAULT FALSE,
  status TEXT DEFAULT 'pending'
);

ALTER TABLE checkout_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Submissions admin only" ON checkout_submissions
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));
```

### portfolio

```sql
CREATE TABLE portfolio (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP DEFAULT NOW(),
  business_name TEXT NOT NULL,
  industry TEXT NOT NULL,
  location TEXT NOT NULL,
  site_url TEXT NOT NULL,
  thumbnail_url TEXT,
  testimonial_quote TEXT,
  testimonial_name TEXT,
  display_order INTEGER,
  is_active BOOLEAN DEFAULT TRUE
);

ALTER TABLE portfolio ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Portfolio public read" ON portfolio
  FOR SELECT USING (is_active = true);

CREATE POLICY "Portfolio admin full" ON portfolio
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));
```

### testimonials

```sql
CREATE TABLE testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP DEFAULT NOW(),
  name TEXT NOT NULL,
  business TEXT,
  quote TEXT NOT NULL,
  rating INTEGER,
  photo_url TEXT,
  is_active BOOLEAN DEFAULT TRUE
);

ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Testimonials public read" ON testimonials
  FOR SELECT USING (is_active = true);

CREATE POLICY "Testimonials admin full" ON testimonials
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));
```

---

## 7 CORE SERVICES (Build these pages)

Each service page follows this structure:

```
HERO SECTION
- H1: Benefit-focused headline
- Subhead: Problem → Solution in 1-2 sentences
- Primary CTA: [Get Started] → /pricing
- Secondary CTA: [See Pricing] → /pricing

PROBLEM SECTION
- "The Problem" or "Sound Familiar?"
- 3-4 pain points as short statements
- Empathetic, not salesy

SOLUTION SECTION
- "Here's How We Solve It"
- Feature blocks with icons
- Each feature: Icon + Title + 1-2 sentence benefit

WHAT'S INCLUDED
- Bulleted list of deliverables
- Tier badges showing which tiers include this

SOCIAL PROOF
- 1-2 testimonials relevant to this service
- Stats if available

CTA SECTION
- Benefit restatement
- [Get Started] + [Book a Call]
```

### Service 1: Beautiful Websites (/beautiful-websites)
**This is the PRIMARY service — hero entry point**

**H1:** "A Professional Website That Actually Gets You Customers"
**Subhead:** "Built in 5 days. Starting at $249. You own everything."

**Problem Points:**
- You know you need a website but the options are overwhelming
- DIY builders take forever and still look amateur
- Agencies quote $5,000+ and take months
- You're losing customers to competitors with better sites

**Solution Features:**
- **5-Page Professional Site** — Home, Services, About, Contact, plus one more
- **Mobile-First Design** — 70% of your customers search on their phone
- **Built in 5 Days** — Not 5 weeks. We move fast.
- **You Own Everything** — Your domain, your content, your site. No lock-in.
- **SEO-Ready** — Google can find you from day one

**What's Included (All Tiers):**
- Custom 5-page website
- Mobile-responsive design
- Contact form with email notifications
- Google Maps integration
- Basic SEO setup (meta tags, schema)
- SSL certificate
- 1 year hosting (T1) / Ongoing hosting (T2-T4)
- GA4 analytics dashboard

---

### Service 2: Get Found Online (/get-found-online)

**H1:** "Show Up When Customers Search For What You Do"
**Subhead:** "SEO that actually works. No magic, just the fundamentals done right."

**Problem Points:**
- Customers search Google but you're nowhere to be found
- You paid for SEO before and saw zero results
- Your competitors show up. You don't.
- You don't have time to figure out SEO yourself

**Solution Features:**
- **Google Business Optimization** — Your listing, verified and complete
- **Local Search Setup** — City + service keywords that matter
- **Technical SEO** — Fast loading, mobile-friendly, crawlable
- **Schema Markup** — Rich results that stand out
- **Monthly Reporting** — See what's working

**What's Included:**
- Google Business Profile setup/optimization
- Local keyword targeting
- On-page SEO for all pages
- XML sitemap submission
- Google Search Console setup
- Monthly performance email

**Tiers:** All tiers include basic SEO. T3-T4 include advanced optimization.

---

### Service 3: Never Miss a Lead (/never-miss-a-lead)

**H1:** "Every Customer Inquiry Answered. Even When You Can't."
**Subhead:** "Missed calls cost you money. We make sure you never miss another one."

**Problem Points:**
- You're on a job and can't answer the phone
- 85% of callers won't leave a voicemail
- By the time you call back, they've hired someone else
- You're losing $500+ per missed call

**Solution Features:**
- **Missed Call Text-Back** — Automatic text within 60 seconds
- **AI Chat Widget** — 24/7 website chat that qualifies leads
- **Lead Capture Forms** — Smart forms that get you the info you need
- **Instant Notifications** — SMS + email the moment a lead comes in
- **Lead Dashboard** — All your leads in one place

**What's Included:**
- Missed call text-back automation
- AI-powered chat widget
- Lead capture form builder
- Real-time SMS/email notifications
- Contact management (CRM)
- Mobile app access

**Tiers:** T2, T3, T4 (Not included in T1)

---

### Service 4: Book More Jobs (/book-more-jobs)

**H1:** "Stop Playing Phone Tag. Let Customers Book Online."
**Subhead:** "Online scheduling that fills your calendar without the back-and-forth."

**Problem Points:**
- Scheduling takes 5 calls and 3 texts per job
- No-shows kill your productivity
- You double-book or forget appointments
- Customers want to book at 10pm — you're asleep

**Solution Features:**
- **Online Booking** — Customers pick a time that works
- **Automated Reminders** — SMS/email reminders reduce no-shows by 80%
- **Calendar Sync** — Connects to Google Calendar, Outlook
- **Buffer Time** — Automatic travel time between jobs
- **Service Menu** — Customers see what you offer and how long it takes

**What's Included:**
- Online booking calendar
- Automated appointment reminders
- Calendar sync (Google, Outlook, iCal)
- Service/duration configuration
- Customer self-rescheduling
- No-show protection

**Tiers:** T3, T4 (Not included in T1, T2)

---

### Service 5: Run From Your Phone (/run-from-your-phone)

**H1:** "Run Your Entire Business From Your Pocket"
**Subhead:** "Mobile app that keeps you connected to customers without being chained to a desk."

**Problem Points:**
- You're in the field 10 hours a day
- Leads come in and you can't respond
- Customer info is scattered across apps, texts, and sticky notes
- You miss opportunities because you're not at your computer

**Solution Features:**
- **Mobile App** — iOS and Android, always in your pocket
- **Unified Inbox** — Texts, emails, chats in one place
- **Quick Responses** — Reply to leads in seconds
- **Contact Access** — Full customer history on the go
- **Push Notifications** — Know instantly when leads come in

**What's Included:**
- iOS and Android mobile app
- Unified inbox (SMS, email, chat, calls)
- Customer contact management
- Push notifications for new leads
- Quick-reply templates
- Call/text directly from app

**Tiers:** T2, T3, T4 (Not included in T1)

---

### Service 6: Build Your Reputation (/build-your-reputation)

**H1:** "More 5-Star Reviews. Less Chasing Customers For Them."
**Subhead:** "Automated review requests that build your reputation while you work."

**Problem Points:**
- Happy customers forget to leave reviews
- You feel awkward asking for reviews
- One bad review tanks your rating
- Competitors have 200 reviews. You have 12.

**Solution Features:**
- **Automated Review Requests** — SMS/email after every job
- **Review Monitoring** — See new reviews as they post
- **Response Templates** — Reply to reviews in seconds
- **Review Widget** — Show off reviews on your website
- **Reputation Dashboard** — Track your rating over time

**What's Included:**
- Automated review request sequences
- Multi-platform monitoring (Google, Facebook, Yelp)
- Review response templates
- Website review widget
- Reputation score tracking
- Negative review alerts

**Tiers:** T3 (basic), T4 (full dashboard)

---

### Service 7: Let AI Handle It (/let-ai-handle-it)

**H1:** "Your 24/7 Receptionist. For Less Than Minimum Wage."
**Subhead:** "AI that answers calls, qualifies leads, and books jobs while you sleep."

**Problem Points:**
- You can't afford a full-time receptionist
- After-hours calls go to voicemail (and nowhere else)
- You spend hours on calls that go nowhere
- Competitors answer instantly. You don't.

**Solution Features:**
- **AI Voice Agent** — Answers calls in your voice, 24/7
- **Lead Qualification** — AI asks the right questions
- **Appointment Booking** — Books directly to your calendar
- **Call Summaries** — Know what happened without listening
- **Smart Routing** — Urgent calls go to your cell

**What's Included:**
- AI voice agent (inbound calls)
- Custom voice and script
- Lead qualification logic
- Calendar booking integration
- Call recording and transcription
- Intelligent call routing
- 100 AI minutes/month included

**Tiers:** T4 only

---

## ADDITIONAL PAGES TO BUILD

### /services (Hub Page)
Overview of all 7 services with cards linking to individual pages. Show which tiers include each service.

### /domains
Domain search utility page with:
- Search input + TLD dropdown
- Results showing available/taken
- "What's Included" section (domain registration, DNS, SSL)
- CTA to pricing

### /pricing
Tier comparison table with feature matrix. Four columns (T1-T4). Clear CTAs to checkout pages.

### /checkout/success
Post-payment confirmation page:
- Thank you message with order confirmation
- Next steps timeline (what happens in 24-48 hours)
- "Check your email" reminder
- Links to book onboarding call

### /localpros
Partner program landing page:
- What is LocalPros Network
- Benefits for partners
- How it works
- CTA to apply

### /localpros/apply
Application form for LocalPros Network:
- Business info, industry, location
- Current web presence
- Lead volume expectations
- Submit to Supabase

### /localpros/success-stories
Testimonials and case studies from LocalPros partners.

### /upgrade
Upgrade landing page for existing T1/T2 customers:
- Current plan indicator (via URL param)
- Side-by-side comparison with higher tiers
- Upgrade CTAs to checkout

### /portfolio
Grid of completed sites. Pull from Supabase `portfolio` table. Filter by industry optional.

### /about
Company story. "Built by operators, for operators." Team/founder if applicable.

### /contact
Contact form + map + phone + email. Form submits to Supabase + GHL.

### /book-call
Embedded GHL calendar for 30-min consultation.

---

## INDUSTRY PAGES STRUCTURE

### Hub Pages (4 total)
- /industries/home-services
- /industries/professional-services
- /industries/health-wellness
- /industries/automotive-services

Each hub shows cards for all verticals in that category.

### Vertical Pages (65+ total)
URL pattern: `/industries/{category}/{vertical}`
Example: `/industries/home-services/hvac`

Each vertical page:
- H1: "Websites for {Vertical} Businesses"
- Industry-specific pain points
- How SmartSites solves them
- Testimonial from that industry (if available)
- CTA to pricing

---

## ADMIN PAGES

### /admin/login
- Email input form
- Calls `verify-admin-email` Edge Function
- Shows "Check your email" on success
- Shows error for non-whitelisted emails

### /admin (Dashboard)
- Overview stats: total submissions, portfolio count, etc.
- Recent activity feed
- Quick links to other admin pages

### /admin/submissions
- Table of checkout_submissions
- Filters: status, tier, date range
- Export to CSV
- View individual submission details

### /admin/portfolio
- CRUD interface for portfolio table
- Image upload for thumbnails
- Drag-and-drop reordering (display_order)
- Toggle is_active

### /admin/testimonials
- CRUD interface for testimonials table
- Photo upload
- Toggle is_active

---

## COMPONENT PATTERNS

**Hero Section:**
```jsx
<section className="py-20 bg-gradient-to-b from-slate-900 to-slate-800 text-white">
  <div className="container mx-auto px-4 text-center">
    <h1 className="text-4xl md:text-5xl font-bold mb-6">{headline}</h1>
    <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">{subhead}</p>
    <div className="flex gap-4 justify-center">
      <Button size="lg">Get Started</Button>
      <Button size="lg" variant="outline">See Pricing</Button>
    </div>
  </div>
</section>
```

**Feature Card:**
```jsx
<div className="p-6 bg-white rounded-lg shadow-sm border">
  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
    <Icon className="w-6 h-6 text-primary" />
  </div>
  <h3 className="text-lg font-semibold mb-2">{title}</h3>
  <p className="text-slate-600">{description}</p>
</div>
```

**Tier Badge:**
```jsx
<span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded">
  T2+
</span>
```

---

## SEO REQUIREMENTS

Every page needs:
- Unique `<title>` tag (60 chars max)
- Meta description (155 chars max)
- Open Graph tags (og:title, og:description, og:image)
- Canonical URL
- JSON-LD schema (LocalBusiness for main pages, Service for service pages)

Use the `<SEO>` component with react-helmet-async.

---

## FILE STRUCTURE

```
src/
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── Layout.tsx
│   ├── admin/
│   │   ├── AdminGuard.tsx
│   │   └── AdminLayout.tsx
│   ├── ui/ (shadcn components)
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── ProblemSection.tsx
│   │   ├── SolutionSection.tsx
│   │   ├── TestimonialSection.tsx
│   │   └── CTASection.tsx
│   └── SEO.tsx
├── pages/
│   ├── Home.tsx
│   ├── Pricing.tsx
│   ├── CheckoutSuccess.tsx
│   ├── Upgrade.tsx
│   ├── services/
│   │   ├── BeautifulWebsites.tsx
│   │   ├── GetFoundOnline.tsx
│   │   ├── NeverMissALead.tsx
│   │   ├── BookMoreJobs.tsx
│   │   ├── RunFromYourPhone.tsx
│   │   ├── BuildYourReputation.tsx
│   │   └── LetAiHandleIt.tsx
│   ├── industries/
│   │   ├── HomeServices.tsx
│   │   ├── ProfessionalServices.tsx
│   │   └── [vertical].tsx
│   ├── localpros/
│   │   ├── LocalPros.tsx
│   │   ├── Apply.tsx
│   │   └── SuccessStories.tsx
│   ├── admin/
│   │   ├── Login.tsx
│   │   ├── Dashboard.tsx
│   │   ├── Submissions.tsx
│   │   ├── Portfolio.tsx
│   │   └── Testimonials.tsx
│   └── ...
├── hooks/
│   └── useAdminAuth.ts
├── config/
│   └── routes.ts
└── lib/
    └── supabase.ts

supabase/
├── config.toml
└── functions/
    └── verify-admin-email/
        └── index.ts
```

---

## BUILD ORDER

1. **Foundation**
   - Layout (Header, Footer, navigation)
   - Routes config (`src/config/routes.ts`)
   - SEO component

2. **Admin Security** (before any admin pages)
   - Run database migration (app_role, user_roles, allowed_admin_emails, has_role)
   - Create `verify-admin-email` Edge Function
   - Add to `supabase/config.toml`
   - Build `useAdminAuth` hook
   - Build `AdminGuard` component
   - Build `/admin/login` page

3. **Marketing Pages**
   - Home page
   - /beautiful-websites (primary service)
   - /pricing
   - Remaining 6 service pages
   - /services hub
   - /domains

4. **Data-Driven Pages**
   - Run portfolio + testimonials migrations
   - /portfolio
   - /about
   - /contact
   - /book-call

5. **Checkout Flow**
   - Run checkout_submissions migration
   - 4 checkout pre-forms
   - /checkout/success

6. **Industry Pages**
   - 4 hub pages
   - Start with top 10 verticals

7. **LocalPros**
   - /localpros
   - /localpros/apply
   - /localpros/success-stories

8. **Upgrade Flow**
   - /upgrade

9. **Admin Portal**
   - Admin layout
   - /admin dashboard
   - /admin/submissions
   - /admin/portfolio
   - /admin/testimonials

---

## INSTRUCTIONS FOR BUILDER

1. **Reference BRD v32.1** — All specs come from `/docs/smartsites-brd-v32.1.md`
2. **Start with Foundation** — Layout, routes, SEO component
3. **Set up Admin Security Early** — Before building any admin pages
4. **Build mobile-first** — All pages must work on mobile
5. **Use shadcn/ui** — Don't reinvent components
6. **Keep copy SHORT** — Follow the copy rules strictly
7. **Pre-render all marketing pages** — Add to prerenderRoutes array (not /admin/*)
8. **Test SEO** — Check meta tags render correctly
9. **No placeholder content** — Use real copy from this document

When ready, say: "Ready to build. Which page should I start with?"

---

## REFERENCE: LOCALPROS 20 PORTFOLIO SITES

Use these as examples in portfolio and testimonials:

| Domain | Niche | Market |
|--------|-------|--------|
| desertcoolair.com | HVAC | Phoenix |
| dallasroofingteam.com | Roofing | Dallas |
| houstonplumbersco.com | Plumbing | Houston |
| sonoranlawncare.com | Landscaping | Phoenix |
| texaselectricpros.com | Electrical | Austin |
| socalpestcontrol.com | Pest Control | San Diego |
| georgiapainters.com | Painting | Atlanta |
| tampabayfloors.com | Flooring | Tampa |
| denverhandymanservices.com | Handyman | Denver |
| seattlecarpetcleaners.com | Carpet Cleaning | Seattle |
| phoenixpoolpros.com | Pool Service | Phoenix |
| chicagolocksmith247.com | Locksmith | Chicago |
| miamitreeservice.com | Tree Service | Miami |
| laappliancerepair.com | Appliance Repair | Los Angeles |
| portlandpressurewashing.com | Pressure Washing | Portland |
| nashvillegaragedoors.com | Garage Doors | Nashville |
| austinfencingcompany.com | Fencing | Austin |
| orlandomovingco.com | Moving | Orlando |
| sandiegoglassrepair.com | Glass Repair | San Diego |
| phoenixsolarinstall.com | Solar Installation | Phoenix |
