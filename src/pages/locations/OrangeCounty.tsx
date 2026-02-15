/**
 * @fileoverview Orange County, CA Location Landing Page
 * @module pages/locations/OrangeCounty
 * 
 * SEO/AEO Gap 8: Location-specific landing page targeting
 * "web design Orange County", "AI receptionist Orange County",
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

/** Services offered in Orange County */
const services = [
  {
    title: 'Smart Websites',
    description: 'High-converting websites for Orange County service businesses. Mobile-first, SEO-optimized, live in 5 days.',
    icon: Globe,
    href: '/smart-websites',
  },
  {
    title: 'AI Receptionist',
    description: 'Never miss a call from OC customers. AI answers 24/7, books appointments, and qualifies leads automatically.',
    icon: Phone,
    href: '/let-ai-handle-it',
  },
  {
    title: 'Missed-Call Text-Back',
    description: "Busy on a job in Irvine? AI texts back your Orange County leads instantly before they call your competitor.",
    icon: MessageSquare,
    href: '/let-ai-handle-it/after-hours',
  },
  {
    title: 'Online Booking',
    description: 'Let Orange County customers book estimates, consultations, and service calls online 24/7.',
    icon: CalendarCheck,
    href: '/smart-websites/convert',
  },
  {
    title: 'Review Automation',
    description: 'Build a 5-star reputation across Orange County with automated post-job review requests.',
    icon: Star,
    href: '/smart-websites/scale',
  },
  {
    title: 'Lead Capture & Follow-Up',
    description: 'AI chat widgets and automated nurture sequences that turn OC website visitors into booked jobs.',
    icon: Zap,
    href: '/smart-websites/capture',
  },
];

/** Local testimonials */
const testimonials = [
  {
    quote: "We serve all of Orange County and the AI receptionist handles calls from Anaheim to San Clemente. It's like having a full-time receptionist for $197/month.",
    name: 'Jason P.',
    company: 'OC Elite Roofing',
    industry: 'Home Services, Roofing',
  },
  {
    quote: "Our Irvine dental practice saw a 35% increase in new patient bookings within 60 days of launching with EverIntent.",
    name: 'Dr. Amy L.',
    company: 'Irvine Family Dentistry',
    industry: 'Health & Wellness, Dental',
  },
  {
    quote: "The missed-call text-back alone pays for itself. We recovered $8K in jobs last month that would have gone to competitors.",
    name: 'Marcus W.',
    company: 'Newport Electrical Services',
    industry: 'Home Services, Electrical',
  },
];

/** Industries served in Orange County */
const industries = [
  { name: 'HVAC', href: '/industries/home-services' },
  { name: 'Plumbing', href: '/industries/home-services' },
  { name: 'Electrical', href: '/industries/home-services' },
  { name: 'Roofing', href: '/industries/home-services' },
  { name: 'Landscaping', href: '/industries/home-services' },
  { name: 'Pool Service', href: '/industries/home-services' },
  { name: 'Dental', href: '/industries/health-wellness' },
  { name: 'Med Spa', href: '/industries/health-wellness' },
  { name: 'Chiropractic', href: '/industries/health-wellness' },
  { name: 'Legal', href: '/industries/professional-services' },
  { name: 'Real Estate', href: '/industries/professional-services' },
  { name: 'Auto Repair', href: '/industries/automotive-services' },
];

/** Nearby cities */
const nearbyCities = [
  'Irvine', 'Anaheim', 'Santa Ana', 'Huntington Beach',
  'Costa Mesa', 'Newport Beach', 'Fullerton', 'Mission Viejo',
  'Lake Forest', 'Tustin', 'Laguna Beach', 'San Clemente',
];

/**
 * OrangeCounty — Location landing page for Orange County, CA
 * @component
 */
export default function OrangeCounty() {
  return (
    <LocationPageTemplate
      locationName="Orange County"
      state="CA"
      regionLabel="Orange County, CA"
      seoTitle="Web Design and AI Automation: Orange County, CA"
      seoDescription="Smart websites and AI receptionist for Orange County businesses. Never miss a call, book more jobs, and dominate OC local search. Starting at $249."
      canonical="/locations/orange-county"
      latitude={33.7175}
      longitude={-117.8311}
      heroHeadline="Orange County Businesses"
      heroSubheadline="Orange County's 80,000+ small businesses compete for attention. Stand out with a conversion-focused website and AI that answers every call, books every appointment, and never takes a day off."
      localStat="80,000+"
      localStatLabel="small businesses in Orange County"
      services={services}
      testimonials={testimonials}
      industries={industries}
      mapEmbedUrl="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d424143.6324!2d-118.1!3d33.7!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80dc925c54d5f7cf%3A0xdea6c3618ff0d607!2sOrange%20County%2C%20CA!5e0!3m2!1sen!2sus!4v1"
      nearbyCities={nearbyCities}
    />
  );
}
