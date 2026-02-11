/**
 * @fileoverview Premium Professional Services Industry Showcase Page.
 * @module pages/industries/ProfessionalShowcase
 * 
 * Long-form sales page for lawyers, accountants, consultants, real estate.
 * Features animated AI transcript, website mockups, and Smart Business tier CTA.
 */

import { SEO } from '@/components/SEO';
import { Briefcase } from 'lucide-react';
import { IndustryShowcaseTemplate } from '@/components/industries/IndustryShowcaseTemplate';

const transcript = [
  { role: 'ai' as const, text: "Good morning, thank you for calling Mitchell & Associates Law Firm. This is the AI assistant. How may I direct your call?", delay: 1000 },
  { role: 'caller' as const, text: "Hi, I need to speak with someone about a business contract dispute.", delay: 2000 },
  { role: 'ai' as const, text: "I'd be happy to help connect you with our business litigation team. To ensure we match you with the right attorney, may I ask a few quick questions about your situation?", delay: 2200 },
  { role: 'caller' as const, text: "Sure, go ahead.", delay: 1500 },
  { role: 'ai' as const, text: "Is this regarding a contract with a vendor, client, or business partner? And approximately what's the contract value we're discussing?", delay: 2000 },
  { role: 'caller' as const, text: "It's a vendor contract, about $75,000.", delay: 1800 },
  { role: 'ai' as const, text: "Thank you. For commercial disputes in this range, Sarah Mitchell handles these cases personally. I have availability this Thursday at 2 PM or Friday at 10 AM for a consultation. The initial consultation is complimentary. Which works better for you?", delay: 2500 },
  { role: 'caller' as const, text: "Friday at 10 works.", delay: 1200 },
  { role: 'ai' as const, text: "Perfect. I've scheduled your consultation with Sarah Mitchell for Friday at 10 AM. You'll receive a confirmation email with our office address and a brief intake form. Is there anything else I can help with?", delay: 2000 },
];

const painPoints = [
  {
    problem: 'Clients expect immediate response',
    solution: 'AI answers 24/7, qualifies cases, books consultations',
    stat: '78% of clients choose the firm that responds first',
  },
  {
    problem: 'Staff overwhelmed with intake calls',
    solution: 'AI handles screening while staff focuses on billable work',
    stat: 'Average paralegal: $35/hr on non-billable intake',
  },
  {
    problem: 'Consultations no-shows hurt revenue',
    solution: 'Automated reminders reduce cancellations',
    stat: '23% reduction in no-shows with AI reminders',
  },
  {
    problem: 'Website doesn\'t convert visitors',
    solution: 'Conversion-optimized design with clear CTAs',
    stat: 'Top firms convert 5-8% of website visitors',
  },
];

const tokenWords = [
  'consultations', 'cases', 'clients', 'appointments',
  'retainers', 'contracts', 'closings', 'meetings'
];

const websiteMockups = [
  {
    title: 'Law Firm Professional',
    type: 'Legal services',
    placeholderGradient: 'bg-gradient-to-br from-slate-900/60 to-zinc-800/40',
  },
  {
    title: 'CPA & Tax Advisory',
    type: 'Accounting firm',
    placeholderGradient: 'bg-gradient-to-br from-emerald-900/50 to-teal-900/30',
  },
  {
    title: 'Real Estate Agent',
    type: 'Agent portfolio',
    placeholderGradient: 'bg-gradient-to-br from-blue-900/50 to-indigo-900/30',
  },
  {
    title: 'Business Consultant',
    type: 'Advisory services',
    placeholderGradient: 'bg-gradient-to-br from-purple-900/50 to-violet-900/30',
  },
];

const faqItems = [
  {
    question: 'Is the AI compliant with attorney-client privilege?',
    answer: 'The AI is designed for intake and scheduling only—it doesn\'t provide legal advice or access confidential case information. All calls are logged for your records, and the system is HIPAA-ready for firms handling sensitive matters.',
  },
  {
    question: 'Can the AI screen for conflicts of interest?',
    answer: 'Yes. We can configure the AI to ask key screening questions (opposing parties, case types, etc.) and flag potential conflicts before booking. Your team reviews flagged intakes before consultations proceed.',
  },
  {
    question: 'How does it handle different practice areas?',
    answer: 'The AI routes callers to the appropriate attorney or department based on their needs. Whether it\'s family law, business litigation, or estate planning, it asks the right questions and schedules with the right person.',
  },
  {
    question: 'Does it integrate with my practice management software?',
    answer: 'We integrate with Clio, MyCase, PracticePanther, Lawmatics, and most major legal practice management platforms. Client data syncs automatically.',
  },
  {
    question: 'What about my existing website?',
    answer: 'You can use our AI phone system with any website, or we can build you a new conversion-focused site. Smart Business tier includes a premium 8-page website designed specifically for professional services.',
  },
];

export default function ProfessionalShowcase() {
  return (
    <>
      <SEO
        title="Professional Services AI Solutions | Law, Accounting, Real Estate"
        description="Convert more consultations with AI-powered client intake. Smart websites and phone answering for law firms, CPAs, and professional services. Smart Business from $197/mo."
        canonical="/industries/professional-services/showcase"
      />

      <IndustryShowcaseTemplate
        industryName="Professional Services"
        industrySlug="professional-services"
        industryIcon={<Briefcase className="w-4 h-4" />}
        verticalCount={15}
        heroHeadline={
          <>
            <span className="text-foreground">Convert more </span>
            <span className="text-gradient">consultations</span>
          </>
        }
        heroSubtext={
          <>
            From initial <strong className="text-foreground">inquiries</strong> to booked{' '}
            <strong className="text-foreground">appointments</strong>, capture every potential client with AI that 
            qualifies <strong className="text-foreground">cases</strong> and schedules consultations 24/7.
          </>
        }
        tokenWords={tokenWords}
        painPoints={painPoints}
        transcript={transcript}
        websiteMockups={websiteMockups}
        recommendedTier="Convert"
        tierPrice="$197/mo"
        tierSetup="$497"
        faqItems={faqItems}
        ctaText="Get Convert"
        ctaLink="/checkout/convert"
      />
    </>
  );
}
