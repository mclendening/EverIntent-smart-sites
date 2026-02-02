/**
 * @fileoverview Portfolio data and types
 * @module components/portfolio/portfolioData
 * 
 * Hero images from Unsplash per BRD spec - downloaded locally for reliability
 */

// Import hero images
import desertCoolHero from '@/assets/portfolio/desertcoolair/hero-mountain.jpg';
import desertCoolPreview from '@/assets/portfolio/screenshots/desert-cool-air-preview.png';
import clearviewHero from '@/assets/portfolio/clearview-dentistry-hero.jpg';
import clearviewPreview from '@/assets/portfolio/screenshots/clearview-dentistry-austin-preview.png';
import ashfordHero from '@/assets/portfolio/ashford-law-hero.jpg';
import summitHero from '@/assets/portfolio/summit-climate-hero.jpg';
import goldenGateHero from '@/assets/portfolio/golden-gate-roofing-hero.jpg';
import harmonyHero from '@/assets/portfolio/harmony-wellness-hero.jpg';
import precisionHero from '@/assets/portfolio/precision-auto-hero.jpg';
import alexanderTreeHero from '@/assets/portfolio/alexandertree/hero-screenshot.jpg';

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
  /** Hero image for mockup and case study - local import */
  heroImage: string;
  /** Optional screenshot preview for portfolio hub cards */
  previewImage?: string;
}

/**
 * Portfolio projects with local hero images per BRD spec
 */
export const portfolioProjects: PortfolioProject[] = [
  {
    id: '1',
    slug: 'desert-cool-air',
    company: 'Desert Cool Air',
    industry: 'HVAC',
    filterCategory: 'home-services',
    location: 'Phoenix, AZ',
    keyMetric: '+247%',
    metricLabel: 'Qualified Leads',
    primaryColor: '#1a1a1a',
    accentColor: '#E6A44C',
    description: 'Phoenix HVAC company keeping the Valley cool since 2010.',
    heroImage: desertCoolHero,
    previewImage: desertCoolPreview,
  },
  {
    id: '2',
    slug: 'clearview-dentistry-austin',
    company: 'Clearview Dentistry Austin',
    industry: 'Healthcare',
    filterCategory: 'healthcare',
    location: 'Austin, TX',
    keyMetric: '47',
    metricLabel: 'New Patients/Mo',
    primaryColor: '#0D9488',
    accentColor: '#0EA5E9',
    description: 'Anxiety-friendly dental practice focused on gentle patient care.',
    heroImage: clearviewHero,
    previewImage: clearviewPreview,
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
    heroImage: ashfordHero,
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
    heroImage: summitHero,
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
    heroImage: goldenGateHero,
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
    heroImage: harmonyHero,
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
    heroImage: precisionHero,
  },
  {
    id: '8',
    slug: 'alexander-tree',
    company: 'Alexander Tree & Landscaping',
    industry: 'Tree Service',
    filterCategory: 'home-services',
    location: 'Orange County, CA',
    keyMetric: '+186%',
    metricLabel: 'Qualified Leads',
    primaryColor: '#166534',
    accentColor: '#FEFCE8',
    description: 'Old school craftsmanship, modern reliability. Tree service since 1999.',
    heroImage: alexanderTreeHero,
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
