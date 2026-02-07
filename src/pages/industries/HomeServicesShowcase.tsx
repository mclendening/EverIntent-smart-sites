/**
 * @fileoverview Premium Home Services Industry Showcase Page.
 * @module pages/industries/HomeServicesShowcase
 * 
 * Long-form sales page for HVAC, plumbing, electrical, roofing contractors.
 * Features animated AI transcript, website mockups, and Smart Lead tier CTA.
 */

import { SEO } from '@/components/SEO';
import { Home } from 'lucide-react';
import { IndustryShowcaseTemplate } from '@/components/industries/IndustryShowcaseTemplate';

const transcript = [
  { role: 'ai' as const, text: "Good afternoon, thank you for calling Johnson's HVAC. This is the AI assistant. How can I help you today?", delay: 1000 },
  { role: 'caller' as const, text: "Hi, my AC isn't cooling and it's 95 degrees out. I need someone today!", delay: 2000 },
  { role: 'ai' as const, text: "I understand how urgent that is! Let me get you on the schedule right away. Are you available this afternoon between 2-4 PM, or would 4-6 PM work better?", delay: 2000 },
  { role: 'caller' as const, text: "2-4 works. Can you give me a ballpark on cost?", delay: 1800 },
  { role: 'ai' as const, text: "Our diagnostic fee is $89, which gets waived if you proceed with repair. Most AC repairs run $150-$400 depending on the part. I've booked you for 2-4 PM today with Mike, our senior tech. You'll get a text confirmation shortly.", delay: 2500 },
  { role: 'caller' as const, text: "Perfect, thank you!", delay: 1200 },
  { role: 'ai' as const, text: "You're welcome! Mike will call 30 minutes before arrival. Stay cool, and we'll have you fixed up soon!", delay: 1500 },
];

const painPoints = [
  {
    problem: 'Missed calls = lost jobs',
    solution: 'AI answers every call 24/7, qualifies leads, books estimates',
    stat: '$150 average cost per missed service call',
  },
  {
    problem: 'Evenings & weekends are peak',
    solution: 'After-hours AI handling so you can rest',
    stat: '67% of home service calls happen outside 9-5',
  },
  {
    problem: 'No time to follow up on quotes',
    solution: 'Automated follow-up sequences close more jobs',
    stat: '80% of sales require 5+ follow-up touchpoints',
  },
  {
    problem: 'Reputation stuck at 4.2 stars',
    solution: 'Automated review requests after every job',
    stat: '5-star contractors win 3x more bids',
  },
];

const tokenWords = [
  'installs', 'repairs', 'service calls', 'emergency jobs',
  'estimates', 'tune-ups', 'replacements', 'inspections'
];

const websiteMockups = [
  {
    title: 'HVAC Pro Landing',
    type: 'Service contractor',
    placeholderGradient: 'bg-gradient-to-br from-blue-900/50 to-cyan-900/30',
  },
  {
    title: 'Plumbing Emergency',
    type: 'Emergency services',
    placeholderGradient: 'bg-gradient-to-br from-indigo-900/50 to-blue-900/30',
  },
  {
    title: 'Roofing Experts',
    type: 'Project-based',
    placeholderGradient: 'bg-gradient-to-br from-slate-900/50 to-gray-800/30',
  },
  {
    title: 'Electrical Services',
    type: 'Multi-service',
    placeholderGradient: 'bg-gradient-to-br from-amber-900/50 to-orange-900/30',
  },
];

const faqItems = [
  {
    question: 'Does the AI integrate with my scheduling software?',
    answer: 'Yes! We integrate with ServiceTitan, Housecall Pro, Jobber, and most popular field service management platforms. The AI can book directly into your calendar and sync customer data automatically.',
  },
  {
    question: 'What happens if a customer has a complex issue?',
    answer: 'The AI is trained to recognize when to escalate. For complex technical questions or high-value commercial jobs, it captures details and schedules a callback from your team. You get full transcripts of every call.',
  },
  {
    question: 'Can the AI give pricing quotes?',
    answer: 'Absolutely. We configure the AI with your pricing structure—diagnostic fees, common repairs, flat-rate services. It provides accurate ballpark quotes while being transparent about on-site evaluation needs.',
  },
  {
    question: 'How quickly can I get started?',
    answer: 'Capture websites launch in 5 business days. AI Employee setup takes an additional 3-5 days for voice training and integration. Most contractors are fully live within 2 weeks.',
  },
  {
    question: 'Do I own my website and customer data?',
    answer: '100%. You own everything—the website design, content, and all customer data. We provide full exports on request, and there are no lock-in contracts.',
  },
];

export default function HomeServicesShowcase() {
  return (
    <>
      <SEO
        title="Home Services AI Solutions | HVAC, Plumbing, Electrical"
        description="Never miss another service call. AI-powered websites and phone answering for HVAC, plumbing, electrical, and roofing contractors. Get Capture from $97/mo."
        canonical="/industries/home-services/showcase"
      />

      <IndustryShowcaseTemplate
        industryName="Home Services"
        industrySlug="home-services"
        industryIcon={<Home className="w-4 h-4" />}
        verticalCount={31}
        heroHeadline={
          <>
            <span className="text-foreground">Never miss another </span>
            <span className="text-gradient">service call</span>
          </>
        }
        heroSubtext={
          <>
            From emergency <strong className="text-foreground">repairs</strong> to scheduled{' '}
            <strong className="text-foreground">installs</strong>, capture every lead with AI that 
            answers calls, books <strong className="text-foreground">estimates</strong>, and follows up automatically.
          </>
        }
        tokenWords={tokenWords}
        painPoints={painPoints}
        transcript={transcript}
        websiteMockups={websiteMockups}
        recommendedTier="Capture"
        tierPrice="$97/mo"
        tierSetup="$249"
        faqItems={faqItems}
        ctaText="Get Capture"
        ctaLink="/checkout/smart-lead"
      />
    </>
  );
}
