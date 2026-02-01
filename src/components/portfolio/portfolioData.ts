/**
 * @fileoverview Portfolio data and types
 * @module components/portfolio/portfolioData
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
}

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
