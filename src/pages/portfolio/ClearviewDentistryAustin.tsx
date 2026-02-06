/**
 * @fileoverview Clearview Dentistry Austin case study page
 * @module pages/portfolio/ClearviewDentistryAustin
 * 
 * Complete case study featuring:
 * - Interactive website mockup with AI chatbot (Sophie)
 * - The Journey narrative (Discovery → Requirements → Build → Launch)
 * - Animated result metrics
 * - Owner testimonial
 */

import { CaseStudyLayout } from '@/components/portfolio/case-study/CaseStudyLayout';
import { ClearviewDentistryAustinMockup } from '@/components/portfolio/case-study/ClearviewDentistryAustinMockup';

const ClearviewDentistryAustin = () => {
  return (
    <CaseStudyLayout
      slug="clearview-dentistry-austin"
      company="Clearview Dentistry Austin"
      industry="Healthcare"
      location="Austin, TX"
      ownerName="Dr. Sarah Chen, DDS"
      description="A patient-focused dental practice ready to grow beyond referrals with anxiety-friendly care as their differentiator. Dr. Chen had built a loyal patient base over 10 years, but growth had stalled at 12 new patients per month."
      services={[
        'Smart Website Professional',
        'AI Employee',
        'Appointment Booking',
        'Review Management'
      ]}
      primaryColor="#0D9488"
      accentColor="#0EA5E9"
      
      discoveryPoints={[
        'Website designed by a friend in 2015 — clinical, cold, and forgettable',
        'Only 12 new patients per month, almost entirely from word-of-mouth referrals',
        'No online booking — 40% of calls came during unstaffed lunch hour',
        '17% no-show rate costing approximately $3,400/month in lost revenue',
        'Anxious patients (their specialty) avoid phone calls — need low-friction booking'
      ]}
      
      requirementsPoints={[
        'Warm, calming design that reduces anxiety before patients arrive',
        'Mobile-first experience (68% of traffic was mobile)',
        '24/7 online booking with real-time availability sync to Dentrix',
        'AI chat for after-hours inquiries with sedation-aware responses',
        'Automated review requests post-appointment for reputation building'
      ]}
      
      buildPoints={[
        'Week 1: Patient journey mapping, competitive audit, calming color palette exploration',
        'Week 2: UI design with rounded corners, warm imagery, anxiety-reducing copy',
        'Week 3: Dentrix integration for real-time scheduling, AI chat training on dental anxiety',
        'Week 4: Testing with actual anxious patients, soft launch, team training'
      ]}
      
      launchPoints={[
        'Timed launch for back-to-school season when parents book dental checkups',
        '89% of appointment requests came through website vs phone on day one',
        'Staff reported patients arriving already feeling calm from website experience',
        'Automated text reminders reduced no-shows from 17% to 4% within 30 days',
        'New patient count hit 47/month by month three — nearly 4x previous rate'
      ]}
      
      results={[
        { value: '47', label: 'New Patients/Month', prefix: '+' },
        { value: '89', label: 'Online Booking Rate', suffix: '%' },
        { value: '4', label: 'No-Show Rate', suffix: '%' },
        { value: '4.9', label: 'Google Rating', suffix: '★' },
        { value: '62', label: 'New 5-Star Reviews' },
        { value: '12,400', label: 'Monthly Savings', prefix: '$' }
      ]}
      
      testimonial={{
        quote: "Patients tell me they felt calm just looking at our website. The biggest surprise? Online booking was huge for anxious patients who dread making phone calls. We've grown more in 6 months than in the previous 3 years.",
        author: "Dr. Sarah Chen",
        title: "Owner, Clearview Dentistry Austin"
      }}
      
      mockupComponent={<ClearviewDentistryAustinMockup />}
    />
  );
};

export default ClearviewDentistryAustin;
