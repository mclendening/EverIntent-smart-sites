/**
 * @fileoverview Long Beach, CA Location Landing Page
 * @module pages/locations/LongBeach
 * 
 * SEO/AEO Gap 8: Location-specific landing page targeting
 * "web design Long Beach", "AI receptionist Long Beach",
 * and related high-intent local search queries.
 */

import {
  Globe,
  MessageSquare,
  CalendarCheck,
  Zap,
  Phone,
  Star,
} from 'lucide-react';
import { LocationPageTemplate } from '@/components/locations/LocationPageTemplate';

/** Services offered in Long Beach */
const services = [
  {
    title: 'Smart Websites',
    description: 'Conversion-focused websites for Long Beach contractors, clinics, and professional firms. Live in 5 days.',
    icon: Globe,
    href: '/smart-websites',
  },
  {
    title: 'AI Receptionist',
    description: 'Never miss a call from Long Beach customers. AI answers 24/7, books appointments, qualifies leads.',
    icon: Phone,
    href: '/let-ai-handle-it',
  },
  {
    title: 'Missed-Call Text-Back',
    description: "When you can't answer, AI texts back instantly so Long Beach leads don't call your competitor.",
    icon: MessageSquare,
    href: '/let-ai-handle-it/after-hours',
  },
  {
    title: 'Online Booking',
    description: 'Let Long Beach customers self-schedule estimates, appointments, and service calls 24/7.',
    icon: CalendarCheck,
    href: '/smart-websites/convert',
  },
  {
    title: 'Review Automation',
    description: 'Automatically request Google reviews after every job. Dominate Long Beach local search.',
    icon: Star,
    href: '/smart-websites/scale',
  },
  {
    title: 'Lead Capture & Follow-Up',
    description: 'AI chat widgets and automated follow-up sequences that convert Long Beach visitors into customers.',
    icon: Zap,
    href: '/smart-websites/capture',
  },
];

/** Local testimonials */
const testimonials = [
  {
    quote: "EverIntent built us a website that actually gets us calls. We've booked 40% more AC installs this summer in Long Beach.",
    name: 'Carlos M.',
    company: 'Pacific Coast HVAC',
    industry: 'Home Services — HVAC',
  },
  {
    quote: "The AI receptionist handles our after-hours calls perfectly. Long Beach homeowners love that we answer at 10pm.",
    name: 'Dana R.',
    company: 'Shoreline Plumbing',
    industry: 'Home Services — Plumbing',
  },
  {
    quote: "Our Google reviews went from 4.1 to 4.8 stars in three months. The automated review requests are a game-changer.",
    name: 'Kevin T.',
    company: 'Belmont Shore Dental',
    industry: 'Health & Wellness — Dental',
  },
];

/** Industries served in Long Beach */
const industries = [
  { name: 'HVAC', href: '/industries/home-services' },
  { name: 'Plumbing', href: '/industries/home-services' },
  { name: 'Electrical', href: '/industries/home-services' },
  { name: 'Roofing', href: '/industries/home-services' },
  { name: 'Landscaping', href: '/industries/home-services' },
  { name: 'Dental', href: '/industries/health-wellness' },
  { name: 'Chiropractic', href: '/industries/health-wellness' },
  { name: 'Med Spa', href: '/industries/health-wellness' },
  { name: 'Legal', href: '/industries/professional-services' },
  { name: 'Real Estate', href: '/industries/professional-services' },
  { name: 'Auto Repair', href: '/industries/automotive-services' },
  { name: 'Auto Detailing', href: '/industries/automotive-services' },
];

/** Nearby cities */
const nearbyCities = [
  'Signal Hill', 'Lakewood', 'Seal Beach', 'Los Alamitos',
  'Carson', 'Cerritos', 'Bellflower', 'Paramount',
];

/**
 * LongBeach — Location landing page for Long Beach, CA
 * @component
 */
export default function LongBeach() {
  return (
    <LocationPageTemplate
      locationName="Long Beach"
      state="CA"
      regionLabel="Long Beach, CA"
      seoTitle="Web Design and AI Automation: Long Beach, CA"
      seoDescription="Smart websites and AI receptionist for Long Beach businesses. Never miss a call, book more jobs, and dominate local search. Starting at $249."
      canonical="/locations/long-beach"
      latitude={33.7701}
      longitude={-118.1937}
      heroHeadline="Long Beach Businesses"
      heroSubheadline="Local businesses in Long Beach lose $1,200+ per month to missed calls and slow follow-ups. Our AI answers 24/7, books appointments, and your website converts visitors into paying customers."
      localStat="2,400+"
      localStatLabel="service businesses in Long Beach"
      services={services}
      testimonials={testimonials}
      industries={industries}
      mapEmbedUrl="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d106091.07278472771!2d-118.25!3d33.77!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80dd313b68a4ef57%3A0x597d80c3e754d5df!2sLong%20Beach%2C%20CA!5e0!3m2!1sen!2sus!4v1"
      nearbyCities={nearbyCities}
    />
  );
}
