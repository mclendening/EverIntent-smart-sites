// Route configuration for EverIntent SmartSites
// Based on BRD v32.6 Section 15.1.1

export interface RouteConfig {
  path: string;
  title: string;
  description?: string;
}

// Core pages
export const coreRoutes: RouteConfig[] = [
  { path: '/', title: 'Home', description: 'Professional websites for local businesses' },
  { path: '/pricing', title: 'Pricing', description: 'Simple, transparent pricing' },
  { path: '/our-work', title: 'Our Work', description: 'See our work' },
  { path: '/about', title: 'About', description: 'About EverIntent SmartSites' },
  { path: '/contact', title: 'Contact', description: 'Get in touch' },
  { path: '/book-call', title: 'Book a Call', description: 'Schedule a consultation' },
  { path: '/strategy-session', title: 'Strategy Session', description: 'Book a SmartStart Strategy Session' },
  { path: '/careers', title: 'Careers', description: 'Join the EverIntent team' },
];

// Primary service
export const primaryServiceRoute: RouteConfig = {
  path: '/beautiful-websites',
  title: 'Beautiful Websites',
  description: 'Professional websites that get you customers',
};

// Services (benefit-oriented pages - used in nav dropdown)
export const serviceRoutes: RouteConfig[] = [
  { path: '/services', title: 'Services', description: 'All our services' },
  { path: '/get-found-online', title: 'Get Found Online', description: 'SEO and local search visibility' },
  { path: '/never-miss-a-lead', title: 'Never Miss a Lead', description: 'Lead capture and follow-up' },
  { path: '/book-more-jobs', title: 'Book More Jobs', description: 'Online booking and scheduling' },
  { path: '/run-from-your-phone', title: 'Run From Your Phone', description: 'Mobile app access' },
  { path: '/build-your-reputation', title: 'Build Your Reputation', description: 'Review automation' },
  { path: '/let-ai-handle-it', title: 'Let AI Handle It', description: 'AI automation' },
];

// Product category pages (SEO landing pages - per BRD v33.0 Section 16.1)
export const productCategoryRoutes: RouteConfig[] = [
  { path: '/services/web-design', title: 'Web Design Services', description: 'Professional website design for local businesses' },
  { path: '/services/seo', title: 'Local SEO Services', description: 'Get found on Google and local search' },
  { path: '/services/reputation', title: 'Reputation Management', description: 'Build and manage your online reviews' },
  { path: '/services/ai-automation', title: 'AI Automation', description: 'AI solutions for small business automation' },
  { path: '/services/booking', title: 'Online Booking', description: 'Online scheduling and appointment booking' },
];

// Features
export const featureRoutes: RouteConfig[] = [
  { path: '/features/lead-capture', title: 'Lead Capture', description: 'Capture every lead' },
  { path: '/features/ai-chat', title: 'AI Chat', description: 'AI-powered chat widget' },
  { path: '/features/review-management', title: 'Review Management', description: 'Manage your reviews' },
  { path: '/features/mobile-app', title: 'Mobile App', description: 'Run your business from anywhere' },
  { path: '/features/scheduling', title: 'Scheduling', description: 'Online booking' },
  { path: '/features/analytics', title: 'Analytics', description: 'Track your performance' },
];

// Industry hubs
export const industryHubRoutes: RouteConfig[] = [
  { path: '/industries/home-services', title: 'Home Services', description: 'Websites for home service businesses' },
  { path: '/industries/professional-services', title: 'Professional Services', description: 'Websites for professional services' },
  { path: '/industries/health-wellness', title: 'Health & Wellness', description: 'Websites for health and wellness businesses' },
  { path: '/industries/automotive-services', title: 'Automotive Services', description: 'Websites for automotive businesses' },
];

// Home Services verticals (31)
export const homeServicesRoutes: RouteConfig[] = [
  { path: '/industries/home-services/hvac', title: 'HVAC', description: 'Websites for HVAC contractors' },
  { path: '/industries/home-services/plumbing', title: 'Plumbing', description: 'Websites for plumbers' },
  { path: '/industries/home-services/electrical', title: 'Electrical', description: 'Websites for electricians' },
  { path: '/industries/home-services/roofing', title: 'Roofing', description: 'Websites for roofers' },
  { path: '/industries/home-services/landscaping', title: 'Landscaping', description: 'Websites for landscapers' },
  { path: '/industries/home-services/cleaning', title: 'House Cleaning', description: 'Websites for cleaning services' },
  { path: '/industries/home-services/painting', title: 'Painting', description: 'Websites for painters' },
  { path: '/industries/home-services/flooring', title: 'Flooring', description: 'Websites for flooring contractors' },
  { path: '/industries/home-services/remodeling', title: 'Remodeling', description: 'Websites for remodelers' },
  { path: '/industries/home-services/pest-control', title: 'Pest Control', description: 'Websites for pest control' },
  { path: '/industries/home-services/pool-service', title: 'Pool Service', description: 'Websites for pool services' },
  { path: '/industries/home-services/garage-doors', title: 'Garage Doors', description: 'Websites for garage door services' },
  { path: '/industries/home-services/fencing', title: 'Fencing', description: 'Websites for fencing contractors' },
  { path: '/industries/home-services/tree-service', title: 'Tree Service', description: 'Websites for tree services' },
  { path: '/industries/home-services/handyman', title: 'Handyman', description: 'Websites for handyman services' },
  { path: '/industries/home-services/locksmith', title: 'Locksmith', description: 'Websites for locksmiths' },
  { path: '/industries/home-services/appliance-repair', title: 'Appliance Repair', description: 'Websites for appliance repair' },
  { path: '/industries/home-services/carpet-cleaning', title: 'Carpet Cleaning', description: 'Websites for carpet cleaners' },
  { path: '/industries/home-services/pressure-washing', title: 'Pressure Washing', description: 'Websites for pressure washing' },
  { path: '/industries/home-services/window-cleaning', title: 'Window Cleaning', description: 'Websites for window cleaners' },
  { path: '/industries/home-services/gutter-cleaning', title: 'Gutter Cleaning', description: 'Websites for gutter cleaning' },
  { path: '/industries/home-services/junk-removal', title: 'Junk Removal', description: 'Websites for junk removal' },
  { path: '/industries/home-services/moving', title: 'Moving', description: 'Websites for movers' },
  { path: '/industries/home-services/glass-repair', title: 'Glass Repair', description: 'Websites for glass repair' },
  { path: '/industries/home-services/concrete-driveways', title: 'Concrete & Driveways', description: 'Websites for concrete contractors' },
  { path: '/industries/home-services/deck-building', title: 'Deck Building', description: 'Websites for deck builders' },
  { path: '/industries/home-services/home-inspection', title: 'Home Inspection', description: 'Websites for home inspectors' },
  { path: '/industries/home-services/waterproofing', title: 'Waterproofing', description: 'Websites for waterproofing' },
  { path: '/industries/home-services/insulation', title: 'Insulation', description: 'Websites for insulation contractors' },
  { path: '/industries/home-services/solar-installation', title: 'Solar Installation', description: 'Websites for solar installers' },
  { path: '/industries/home-services/security-systems', title: 'Security Systems', description: 'Websites for security system installers' },
];

// Professional Services verticals (15)
export const professionalServicesRoutes: RouteConfig[] = [
  { path: '/industries/professional-services/legal', title: 'Legal', description: 'Websites for attorneys' },
  { path: '/industries/professional-services/real-estate', title: 'Real Estate', description: 'Websites for real estate agents' },
  { path: '/industries/professional-services/accounting', title: 'Accounting', description: 'Websites for accountants' },
  { path: '/industries/professional-services/insurance', title: 'Insurance', description: 'Websites for insurance agents' },
  { path: '/industries/professional-services/financial-advisor', title: 'Financial Advisor', description: 'Websites for financial advisors' },
  { path: '/industries/professional-services/mortgage', title: 'Mortgage', description: 'Websites for mortgage brokers' },
  { path: '/industries/professional-services/photography', title: 'Photography', description: 'Websites for photographers' },
  { path: '/industries/professional-services/videography', title: 'Videography', description: 'Websites for videographers' },
  { path: '/industries/professional-services/marketing', title: 'Marketing', description: 'Websites for marketing agencies' },
  { path: '/industries/professional-services/consulting', title: 'Consulting', description: 'Websites for consultants' },
  { path: '/industries/professional-services/it-services', title: 'IT Services', description: 'Websites for IT services' },
  { path: '/industries/professional-services/web-design', title: 'Web Design', description: 'Websites for web designers' },
  { path: '/industries/professional-services/event-planning', title: 'Event Planning', description: 'Websites for event planners' },
  { path: '/industries/professional-services/interior-design', title: 'Interior Design', description: 'Websites for interior designers' },
  { path: '/industries/professional-services/property-management', title: 'Property Management', description: 'Websites for property managers' },
];

// Health & Wellness verticals (15)
export const healthWellnessRoutes: RouteConfig[] = [
  { path: '/industries/health-wellness/medspa', title: 'MedSpa', description: 'Websites for medspas' },
  { path: '/industries/health-wellness/dental', title: 'Dental', description: 'Websites for dentists' },
  { path: '/industries/health-wellness/chiropractic', title: 'Chiropractic', description: 'Websites for chiropractors' },
  { path: '/industries/health-wellness/physical-therapy', title: 'Physical Therapy', description: 'Websites for physical therapists' },
  { path: '/industries/health-wellness/massage', title: 'Massage', description: 'Websites for massage therapists' },
  { path: '/industries/health-wellness/acupuncture', title: 'Acupuncture', description: 'Websites for acupuncturists' },
  { path: '/industries/health-wellness/optometry', title: 'Optometry', description: 'Websites for optometrists' },
  { path: '/industries/health-wellness/veterinary', title: 'Veterinary', description: 'Websites for veterinarians' },
  { path: '/industries/health-wellness/mental-health', title: 'Mental Health', description: 'Websites for therapists' },
  { path: '/industries/health-wellness/personal-training', title: 'Personal Training', description: 'Websites for personal trainers' },
  { path: '/industries/health-wellness/yoga', title: 'Yoga', description: 'Websites for yoga studios' },
  { path: '/industries/health-wellness/martial-arts', title: 'Martial Arts', description: 'Websites for martial arts studios' },
  { path: '/industries/health-wellness/salon', title: 'Salon', description: 'Websites for hair salons' },
  { path: '/industries/health-wellness/barbershop', title: 'Barbershop', description: 'Websites for barbershops' },
  { path: '/industries/health-wellness/spa', title: 'Spa', description: 'Websites for spas' },
];

// Automotive Services verticals (10)
export const automotiveServicesRoutes: RouteConfig[] = [
  { path: '/industries/automotive-services/auto-repair', title: 'Auto Repair', description: 'Websites for auto repair shops' },
  { path: '/industries/automotive-services/auto-detailing', title: 'Auto Detailing', description: 'Websites for auto detailers' },
  { path: '/industries/automotive-services/tire-shop', title: 'Tire Shop', description: 'Websites for tire shops' },
  { path: '/industries/automotive-services/oil-change', title: 'Oil Change', description: 'Websites for oil change services' },
  { path: '/industries/automotive-services/auto-body', title: 'Auto Body', description: 'Websites for auto body shops' },
  { path: '/industries/automotive-services/transmission', title: 'Transmission', description: 'Websites for transmission shops' },
  { path: '/industries/automotive-services/towing', title: 'Towing', description: 'Websites for towing services' },
  { path: '/industries/automotive-services/mobile-car-wash', title: 'Mobile Car Wash', description: 'Websites for mobile car wash' },
  { path: '/industries/automotive-services/window-tinting', title: 'Window Tinting', description: 'Websites for window tinting' },
  { path: '/industries/automotive-services/audio-installation', title: 'Audio Installation', description: 'Websites for car audio installers' },
];

// Checkout routes
export const checkoutRoutes: RouteConfig[] = [
  { path: '/checkout/smart-site', title: 'Smart Site Checkout', description: 'Get your Smart Site' },
  { path: '/checkout/smart-lead', title: 'Smart Lead Checkout', description: 'Get Smart Lead' },
  { path: '/checkout/smart-business', title: 'Smart Business Checkout', description: 'Get Smart Business' },
  { path: '/checkout/smart-growth', title: 'Smart Growth Checkout', description: 'Get Smart Growth' },
  { path: '/checkout/smart-launch', title: 'Smart Launch Checkout', description: 'Get Smart Launch' },
  { path: '/checkout/success', title: 'Checkout Success', description: 'Thank you for your purchase' },
];

// Legal routes
export const legalRoutes: RouteConfig[] = [
  { path: '/legal/privacy', title: 'Privacy Policy', description: 'Our privacy policy' },
  { path: '/legal/terms', title: 'Terms of Service', description: 'Our terms of service' },
  { path: '/legal/data-request', title: 'Data Request', description: 'Request your data' },
];

// LocalPros routes
export const localProsRoutes: RouteConfig[] = [
  { path: '/localpros', title: 'LocalPros Network', description: 'Get exclusive leads from our ranking sites' },
  { path: '/localpros/apply', title: 'Apply to LocalPros', description: 'Apply to become a LocalPros partner' },
  { path: '/localpros/success-stories', title: 'LocalPros Success Stories', description: 'See how partners grow with LocalPros' },
];

// Upgrade route
export const upgradeRoute: RouteConfig = {
  path: '/upgrade',
  title: 'Upgrade',
  description: 'Upgrade your plan',
};

// Admin routes (NOT pre-rendered)
export const adminRoutes: RouteConfig[] = [
  { path: '/admin/login', title: 'Admin Login', description: 'Admin login' },
  { path: '/admin', title: 'Admin Dashboard', description: 'Admin dashboard' },
  { path: '/admin/submissions', title: 'Submissions', description: 'View submissions' },
  { path: '/admin/portfolio', title: 'Portfolio Management', description: 'Manage portfolio' },
  { path: '/admin/testimonials', title: 'Testimonials Management', description: 'Manage testimonials' },
];

// All marketing routes (for pre-rendering) - excludes admin routes
export const prerenderRoutes: string[] = [
  // Core
  ...coreRoutes.map(r => r.path),
  // Primary service
  primaryServiceRoute.path,
  // Services
  ...serviceRoutes.map(r => r.path),
  // Product category pages (SEO)
  ...productCategoryRoutes.map(r => r.path),
  // Features
  ...featureRoutes.map(r => r.path),
  // Industry hubs
  ...industryHubRoutes.map(r => r.path),
  // Industry verticals
  ...homeServicesRoutes.map(r => r.path),
  ...professionalServicesRoutes.map(r => r.path),
  ...healthWellnessRoutes.map(r => r.path),
  ...automotiveServicesRoutes.map(r => r.path),
  // Checkout
  ...checkoutRoutes.map(r => r.path),
  // Legal
  ...legalRoutes.map(r => r.path),
  // LocalPros
  ...localProsRoutes.map(r => r.path),
  // Upgrade
  upgradeRoute.path,
];

// All routes combined
export const allRoutes: RouteConfig[] = [
  ...coreRoutes,
  primaryServiceRoute,
  ...serviceRoutes,
  ...productCategoryRoutes,
  ...featureRoutes,
  ...industryHubRoutes,
  ...homeServicesRoutes,
  ...professionalServicesRoutes,
  ...healthWellnessRoutes,
  ...automotiveServicesRoutes,
  ...checkoutRoutes,
  ...legalRoutes,
  ...localProsRoutes,
  upgradeRoute,
  ...adminRoutes,
];
