/**
 * @fileoverview Portfolio data and types
 * @module components/portfolio/portfolioData
 * 
 * Hero images sourced from Unsplash per BRD spec:
 * - Real service business owners (diverse, authentic)
 * - People working: on phones, at job sites, with customers
 */

export type IndustryFilter = 'all' | 'home-services' | 'healthcare' | 'professional' | 'automotive';

export interface PortfolioProject {
  id: string;
  slug: string;
  company: string;
  industry: string;
  filterCategory: IndustryFilter;
  location: string;
  keyMetric: string;
  metricLabel: string;
  primaryColor: string;
  accentColor: string;
  description: string;
  /** Hero image for case study page - Unsplash URL */
  heroImage: string;
  /** Thumbnail for additional visual interest */
  thumbnailImage?: string;
}

/**
 * Portfolio projects with Unsplash hero images per BRD spec
 * Images selected for authenticity and industry relevance
 */
export const portfolioProjects: PortfolioProject[] = [
  {
    id: '1',
    slug: 'riverstone-plumbing',
    company: 'Riverstone Plumbing & Heating',
    industry: 'Home Services',
    filterCategory: 'home-services',
    location: 'Denver, CO',
    keyMetric: '+312%',
    metricLabel: 'Qualified Leads',
    primaryColor: '#1E3A5F',
    accentColor: '#F97316',
    description: 'Third-generation plumbing company ready to grow beyond word-of-mouth.',
    // Professional plumber at work
    heroImage: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=80',
    thumbnailImage: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: '2',
    slug: 'clearview-dentistry',
    company: 'Clearview Family Dentistry',
    industry: 'Healthcare',
    filterCategory: 'healthcare',
    location: 'Austin, TX',
    keyMetric: '47',
    metricLabel: 'New Patients/Mo',
    primaryColor: '#0D9488',
    accentColor: '#0EA5E9',
    description: 'Anxiety-friendly dental practice focused on gentle patient care.',
    // Modern dental office
    heroImage: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80',
    thumbnailImage: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: '3',
    slug: 'ashford-law',
    company: 'Ashford & Associates Law',
    industry: 'Professional Services',
    filterCategory: 'professional',
    location: 'Chicago, IL',
    keyMetric: '+847%',
    metricLabel: 'Lead Conversions',
    primaryColor: '#1E293B',
    accentColor: '#7C3AED',
    description: 'Premier personal injury attorneys serving the Chicago area.',
    // Professional law office
    heroImage: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80',
    thumbnailImage: 'https://images.unsplash.com/photo-1521791055366-0d553872125f?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: '4',
    slug: 'summit-climate',
    company: 'Summit Climate Solutions',
    industry: 'HVAC',
    filterCategory: 'home-services',
    location: 'Phoenix, AZ',
    keyMetric: '100%',
    metricLabel: 'Calls Answered',
    primaryColor: '#F97316',
    accentColor: '#2563EB',
    description: 'Emergency AC repair specialists in extreme desert heat.',
    // HVAC technician working
    heroImage: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=80',
    thumbnailImage: 'https://images.unsplash.com/photo-1635048424329-a9bfb146d7aa?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: '5',
    slug: 'golden-gate-roofing',
    company: 'Golden Gate Roofing',
    industry: 'Roofing',
    filterCategory: 'home-services',
    location: 'San Francisco, CA',
    keyMetric: '67%',
    metricLabel: 'Close Rate',
    primaryColor: '#B91C1C',
    accentColor: '#D4AF37',
    description: 'Premium residential roofing for Bay Area historic homes.',
    // Roofing work
    heroImage: 'https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?auto=format&fit=crop&w=1200&q=80',
    thumbnailImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: '6',
    slug: 'harmony-wellness',
    company: 'Harmony Wellness Center',
    industry: 'Holistic Health',
    filterCategory: 'healthcare',
    location: 'Nashville, TN',
    keyMetric: '62',
    metricLabel: 'New Patients/Mo',
    primaryColor: '#7C3AED',
    accentColor: '#10B981',
    description: 'Naturopathic medicine, acupuncture, and holistic healing.',
    // Wellness spa setting
    heroImage: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=1200&q=80',
    thumbnailImage: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: '7',
    slug: 'precision-auto',
    company: 'Precision Auto Group',
    industry: 'Auto Repair',
    filterCategory: 'automotive',
    location: 'Portland, OR',
    keyMetric: '156',
    metricLabel: 'New Customers/Mo',
    primaryColor: '#0891B2',
    accentColor: '#F97316',
    description: 'Honest, transparent auto repair with no surprises.',
    // Auto mechanic at work
    heroImage: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=1200&q=80',
    thumbnailImage: 'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: '8',
    slug: 'evergreen-landscapes',
    company: 'Evergreen Landscapes',
    industry: 'Landscaping',
    filterCategory: 'home-services',
    location: 'Seattle, WA',
    keyMetric: '+42%',
    metricLabel: 'Avg Project Value',
    primaryColor: '#16A34A',
    accentColor: '#78350F',
    description: 'Award-winning landscape design for Pacific Northwest homes.',
    // Landscaping work
    heroImage: 'https://images.unsplash.com/photo-1558904541-efa843a96f01?auto=format&fit=crop&w=1200&q=80',
    thumbnailImage: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=600&q=80',
  },
];

export const filterOptions: { value: IndustryFilter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'home-services', label: 'Home Services' },
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'professional', label: 'Professional' },
  { value: 'automotive', label: 'Automotive' },
];

export const hubStats = [
  { value: 87, suffix: '', label: 'Projects' },
  { value: 3.8, suffix: 'M', prefix: '$', label: 'Revenue Generated' },
  { value: 4.9, suffix: '★', label: 'Rating' },
];
