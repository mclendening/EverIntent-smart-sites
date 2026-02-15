/**
 * @fileoverview Premium Health & Wellness Industry Showcase Page.
 * @module pages/industries/HealthWellnessShowcase
 * 
 * Long-form sales page for medspas, dental, chiropractic, fitness studios.
 * Features animated AI transcript, website mockups, and Smart Business tier CTA.
 */

import { SEO } from '@/components/SEO';
import { Heart } from 'lucide-react';
import { IndustryShowcaseTemplate } from '@/components/industries/IndustryShowcaseTemplate';

const transcript = [
  { role: 'ai' as const, text: "Good afternoon, thank you for calling Radiance MedSpa. This is the AI assistant. How can I help you today?", delay: 1000 },
  { role: 'caller' as const, text: "Hi, I'm interested in Botox. I've never had it done before.", delay: 2000 },
  { role: 'ai' as const, text: "Welcome! We'd love to help you explore Botox. Our injectors are highly experienced and we offer complimentary consultations for first-time clients. What areas are you looking to treat?", delay: 2200 },
  { role: 'caller' as const, text: "Mainly my forehead and the lines between my eyebrows.", delay: 1800 },
  { role: 'ai' as const, text: "Those are our most popular treatment areas! Most clients see beautiful results with just one session. For first-timers, we have availability with Dr. Chen this Thursday at 3 PM or Saturday at 11 AM. Which works better for your schedule?", delay: 2500 },
  { role: 'caller' as const, text: "Saturday would be perfect.", delay: 1200 },
  { role: 'ai' as const, text: "Wonderful! I've booked your complimentary consultation with Dr. Chen for Saturday at 11 AM. You'll receive a text confirmation with our address and a brief health questionnaire. Is there anything specific you'd like Dr. Chen to address during your visit?", delay: 2200 },
  { role: 'caller' as const, text: "Just pricing and how long results last.", delay: 1500 },
  { role: 'ai' as const, text: "Dr. Chen will cover all of that. We're very transparent about pricing. For reference, forehead and glabellar lines typically range from $300-$400, with results lasting 3-4 months. See you Saturday!", delay: 2000 },
];

const painPoints = [
  {
    problem: 'Front desk overwhelmed',
    solution: 'AI handles booking while staff focuses on patient care',
    stat: 'Average practice misses 30% of calls during busy hours',
  },
  {
    problem: 'New patient inquiries go to voicemail',
    solution: 'AI answers every call and books immediately',
    stat: '62% of callers won\'t leave a voicemail. They call competitors',
  },
  {
    problem: 'Appointment no-shows hurt revenue',
    solution: 'Automated reminders via text and email',
    stat: '$200+ average revenue lost per no-show',
  },
  {
    problem: 'Website doesn\'t showcase services well',
    solution: 'Beautiful galleries and clear service menus',
    stat: '74% of patients research online before booking',
  },
];

const tokenWords = [
  'patients', 'appointments', 'consultations', 'treatments',
  'sessions', 'bookings', 'visits', 'wellness'
];

const websiteMockups = [
  {
    title: 'Luxury MedSpa',
    type: 'Aesthetic services',
    placeholderGradient: 'bg-gradient-to-br from-rose-900/50 to-pink-900/30',
  },
  {
    title: 'Modern Dental',
    type: 'Dental practice',
    placeholderGradient: 'bg-gradient-to-br from-sky-900/50 to-cyan-900/30',
  },
  {
    title: 'Chiropractic Wellness',
    type: 'Chiropractic',
    placeholderGradient: 'bg-gradient-to-br from-green-900/50 to-emerald-900/30',
  },
  {
    title: 'Yoga & Fitness Studio',
    type: 'Fitness studio',
    placeholderGradient: 'bg-gradient-to-br from-purple-900/50 to-fuchsia-900/30',
  },
];

const faqItems = [
  {
    question: 'Is the AI HIPAA compliant?',
    answer: 'Yes. Our platform is built with HIPAA compliance in mind. The AI doesn\'t access patient records. It only handles scheduling and general inquiries. All call logs are encrypted and access-controlled.',
  },
  {
    question: 'Can it integrate with my EMR/practice management system?',
    answer: 'We integrate with most major healthcare practice management systems including Jane App, Mindbody, Vagaro, and aesthetic platforms like Aesthetic Record and Boulevard.',
  },
  {
    question: 'How does it handle medical questions?',
    answer: 'The AI is trained to recognize medical questions and appropriately redirect to qualified staff. It never provides medical advice, only scheduling assistance and general service information that you approve.',
  },
  {
    question: 'Can patients book specific providers?',
    answer: 'Absolutely. The AI knows your staff schedule and can book with specific providers based on patient preference, availability, or service type requirements.',
  },
  {
    question: 'What about membership and package sales?',
    answer: 'The AI can explain membership options and packages you offer. For purchases, it captures interest and books a consultation, or routes to your team for immediate follow-up.',
  },
];

export default function HealthWellnessShowcase() {
  return (
    <>
      <SEO
        title="Health & Wellness AI Solutions | MedSpa, Dental, Chiropractic"
        description="Book more patients with AI-powered scheduling. Smart websites and phone answering for medspas, dental practices, and wellness studios. Convert from $197/mo."
        canonical="/industries/health-wellness/showcase"
      />

      <IndustryShowcaseTemplate
        industryName="Health & Wellness"
        industrySlug="health-wellness"
        industryIcon={<Heart className="w-4 h-4" />}
        verticalCount={15}
        heroHeadline={
          <>
            <span className="text-foreground">Book more </span>
            <span className="text-gradient">patients</span>
          </>
        }
        heroSubtext={
          <>
            From first-time <strong className="text-foreground">consultations</strong> to recurring{' '}
            <strong className="text-foreground">appointments</strong>, fill your schedule with AI that 
            answers calls, books <strong className="text-foreground">treatments</strong>, and reduces no-shows.
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
