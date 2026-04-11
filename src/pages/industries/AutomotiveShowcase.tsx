/**
 * @fileoverview Premium Automotive Services Industry Showcase Page.
 * @module pages/industries/AutomotiveShowcase
 * 
 * Long-form sales page for auto repair, detailing, tire shops, body shops.
 * Features animated AI transcript, website mockups, and Smart Lead tier CTA.
 */

import { SEO } from '@/components/SEO';
import { Car } from 'lucide-react';
import { IndustryShowcaseTemplate } from '@/components/industries/IndustryShowcaseTemplate';

const transcript = [
  { role: 'ai' as const, text: "Thanks for calling Metro Auto Repair. This is the AI assistant. How can I help you today?", delay: 1000 },
  { role: 'caller' as const, text: "Yeah, my check engine light came on this morning. Can I get it looked at?", delay: 2000 },
  { role: 'ai' as const, text: "Absolutely. Check engine lights can mean several things. We'll run a diagnostic to pinpoint the issue. We have availability this afternoon at 2 PM or tomorrow morning at 9 AM. Which works better for you?", delay: 2200 },
  { role: 'caller' as const, text: "Tomorrow at 9 would be great. How much is the diagnostic?", delay: 1800 },
  { role: 'ai' as const, text: "Our diagnostic is $49, which gets applied to any repair you approve. Most check engine issues we see (O2 sensors, catalytic converters, ignition coils) run between $150-$600 for parts and labor. What's the year, make, and model of your vehicle?", delay: 2500 },
  { role: 'caller' as const, text: "It's a 2019 Honda Accord.", delay: 1200 },
  { role: 'ai' as const, text: "Great choice, those are reliable! I've booked you for tomorrow at 9 AM. We'll text you a reminder tonight. Plan for about 30-45 minutes for the diagnostic. Anything else I can help with?", delay: 2000 },
  { role: 'caller' as const, text: "Nope, that's it. Thanks!", delay: 1200 },
  { role: 'ai' as const, text: "You're welcome! See you tomorrow at 9. Drive safe!", delay: 1500 },
];

const painPoints = [
  {
    problem: 'Customers expect instant answers',
    solution: 'AI quotes diagnostics and common repairs immediately',
    stat: '$85 average value of a walk-in that called first',
  },
  {
    problem: 'Bay time wasted on no-shows',
    solution: 'Automated text reminders reduce missed appointments',
    stat: '18% reduction in no-shows with AI reminders',
  },
  {
    problem: 'Upsells get missed during busy hours',
    solution: 'AI recommends services based on mileage/season',
    stat: '$47 average upsell per vehicle when prompted',
  },
  {
    problem: 'Reviews only from unhappy customers',
    solution: 'Automated review requests after every service',
    stat: 'Shops with 4.5+ stars get 28% more calls',
  },
];

const tokenWords = [
  'diagnostics', 'repairs', 'services', 'appointments',
  'oil changes', 'brake jobs', 'inspections', 'estimates'
];

const websiteMockups = [
  {
    title: 'Full-Service Auto Repair',
    type: 'General repair shop',
    placeholderGradient: 'bg-gradient-to-br from-red-900/50 to-orange-900/30',
  },
  {
    title: 'Premium Auto Detailing',
    type: 'Detailing service',
    placeholderGradient: 'bg-gradient-to-br from-slate-900/60 to-gray-800/40',
  },
  {
    title: 'Tire & Wheel Center',
    type: 'Tire specialty',
    placeholderGradient: 'bg-gradient-to-br from-zinc-900/60 to-neutral-800/40',
  },
  {
    title: 'Collision & Body Shop',
    type: 'Body work',
    placeholderGradient: 'bg-gradient-to-br from-blue-900/50 to-slate-900/40',
  },
];

export default function AutomotiveShowcase() {
  return (
    <>
      <SEO
        title="Automotive Services AI Solutions | Auto Repair, Detailing, Tire Shops"
        description="Fill more bays with AI-powered scheduling. Smart websites and phone answering for auto repair, detailing, and tire shops. Capture from $97/mo."
        canonical="/industries/automotive-services/showcase"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: 'AI-Powered Websites for Automotive Services',
          description: 'Smart websites with AI scheduling for auto repair shops, detailing services, and tire shops. Fill more bays from $97/mo.',
          provider: { '@type': 'Organization', name: 'EverIntent', url: 'https://everintent.com' },
          areaServed: [
            { '@type': 'City', name: 'Long Beach' },
            { '@type': 'City', name: 'Los Angeles' },
            { '@type': 'AdministrativeArea', name: 'Orange County' },
          ],
          serviceType: 'Smart Websites for Automotive Services',
        }}
      />

      <IndustryShowcaseTemplate
        industryName="Automotive Services"
        industrySlug="automotive-services"
        industryIcon={<Car className="w-4 h-4" />}
        verticalCount={10}
        heroHeadline={
          <>
            <span className="text-foreground">Fill more </span>
            <span className="text-gradient">bays</span>
          </>
        }
        heroSubtext={
          <>
            From check engine <strong className="text-foreground">diagnostics</strong> to routine{' '}
            <strong className="text-foreground">oil changes</strong>, book every appointment with AI that 
            answers calls, quotes <strong className="text-foreground">services</strong>, and keeps customers coming back.
          </>
        }
        tokenWords={tokenWords}
        painPoints={painPoints}
        transcript={transcript}
        websiteMockups={websiteMockups}
        recommendedTier="Capture"
        tierPrice="$97/mo"
        tierSetup="$249"
        faqCategory="industry-automotive"
        ctaText="Get Capture"
        ctaLink="/checkout/capture"
      />
    </>
  );
}
