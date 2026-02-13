/**
 * @fileoverview Los Angeles, CA Location Landing Page
 * @module pages/locations/LosAngeles
 * 
 * SEO/AEO Gap 8: Location-specific landing page targeting
 * "web design Los Angeles", "AI receptionist LA",
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

/** Services offered in Los Angeles */
const services = [
  {
    title: 'Smart Websites',
    description: 'Stand out in the LA market with a conversion-focused website. Mobile-first, SEO-optimized, live in 5 days.',
    icon: Globe,
    href: '/smart-websites',
  },
  {
    title: 'AI Receptionist',
    description: 'Never miss a call from LA customers. AI answers 24/7, books appointments, and qualifies leads automatically.',
    icon: Phone,
    href: '/let-ai-handle-it',
  },
  {
    title: 'Missed-Call Text-Back',
    description: "Stuck in LA traffic? AI texts back your leads instantly so they don't call the next business on Google.",
    icon: MessageSquare,
    href: '/let-ai-handle-it/after-hours',
  },
  {
    title: 'Online Booking',
    description: 'Let Los Angeles customers self-schedule estimates, appointments, and consultations 24/7.',
    icon: CalendarCheck,
    href: '/smart-websites/convert',
  },
  {
    title: 'Review Automation',
    description: 'Build a 5-star reputation in LA with automated post-service review requests to Google.',
    icon: Star,
    href: '/smart-websites/scale',
  },
  {
    title: 'Lead Capture & Follow-Up',
    description: 'AI chat widgets and automated follow-ups that convert LA website visitors into booked appointments.',
    icon: Zap,
    href: '/smart-websites/capture',
  },
];

/** Local testimonials */
const testimonials = [
  {
    quote: "In a city as competitive as LA, you need every edge. The AI receptionist books us 15+ appointments a week that we used to miss.",
    name: 'Ricardo S.',
    company: 'LA Pro Landscaping',
    industry: 'Home Services — Landscaping',
  },
  {
    quote: "We went from invisible on Google to page one for 'personal injury attorney Los Angeles' in 4 months. The website EverIntent built converts like crazy.",
    name: 'Sarah K.',
    company: 'Westside Legal Group',
    industry: 'Professional Services — Legal',
  },
  {
    quote: "The missed-call text-back is perfect for LA. I'm always on the road between job sites and now every lead gets an instant response.",
    name: 'Tony D.',
    company: 'Downtown Electric Co.',
    industry: 'Home Services — Electrical',
  },
];

/** Industries served in Los Angeles */
const industries = [
  { name: 'HVAC', href: '/industries/home-services' },
  { name: 'Plumbing', href: '/industries/home-services' },
  { name: 'Electrical', href: '/industries/home-services' },
  { name: 'Roofing', href: '/industries/home-services' },
  { name: 'Landscaping', href: '/industries/home-services' },
  { name: 'Painting', href: '/industries/home-services' },
  { name: 'Dental', href: '/industries/health-wellness' },
  { name: 'Med Spa', href: '/industries/health-wellness' },
  { name: 'Personal Training', href: '/industries/health-wellness' },
  { name: 'Legal', href: '/industries/professional-services' },
  { name: 'Real Estate', href: '/industries/professional-services' },
  { name: 'Auto Repair', href: '/industries/automotive-services' },
];

/** Nearby cities */
const nearbyCities = [
  'Santa Monica', 'Beverly Hills', 'Pasadena', 'Glendale',
  'Burbank', 'Culver City', 'Inglewood', 'Torrance',
  'West Hollywood', 'Downtown LA', 'Venice', 'Silver Lake',
];

/**
 * LosAngeles — Location landing page for Los Angeles, CA
 * @component
 */
export default function LosAngeles() {
  return (
    <LocationPageTemplate
      locationName="Los Angeles"
      state="CA"
      regionLabel="Los Angeles, CA"
      seoTitle="Web Design and AI Automation: Los Angeles, CA"
      seoDescription="Smart websites and AI receptionist for Los Angeles businesses. Never miss a call, book more jobs, and dominate LA local search. Starting at $249."
      canonical="/locations/los-angeles"
      latitude={34.0522}
      longitude={-118.2437}
      heroHeadline="Los Angeles Businesses"
      heroSubheadline="In a city of 500,000+ small businesses, standing out is everything. Get a website that converts and an AI that never sleeps — built for the pace of LA."
      localStat="500,000+"
      localStatLabel="small businesses in Los Angeles"
      services={services}
      testimonials={testimonials}
      industries={industries}
      mapEmbedUrl="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d423286.2!2d-118.6!3d34.02!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2c75ddc27da13%3A0xe22fdf6f254608f4!2sLos%20Angeles%2C%20CA!5e0!3m2!1sen!2sus!4v1"
      nearbyCities={nearbyCities}
    />
  );
}
