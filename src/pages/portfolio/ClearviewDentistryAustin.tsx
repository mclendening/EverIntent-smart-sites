/**
 * @fileoverview Clearview Dentistry Austin case study page
 * @module pages/portfolio/ClearviewDentistryAustin
 * 
 * Complete case study featuring:
 * - Interactive website mockup with AI chatbot
 * - The Journey narrative (Discovery → Requirements → Build → Launch)
 * - Animated result metrics
 * - Client testimonial
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
      description="Anxiety-friendly dental practice in Austin, TX. Dr. Sarah Chen needed a warm, calming online presence that would attract nervous patients and showcase their gentle approach to dental care."
      services={[
        'Smart Website',
        'AI Chat Widget',
        'Patient Booking',
        'Review Management',
        'Local SEO'
      ]}
      primaryColor="#0D9488"
      accentColor="#0EA5E9"
      
      discoveryPoints={[
        'Family dental practice serving Austin since 2012',
        'Specializes in anxiety-free dentistry and sedation',
        'Word-of-mouth referrals were their only lead source',
        'Outdated website felt clinical and uninviting',
        'No online booking or after-hours inquiry handling'
      ]}
      
      requirementsPoints={[
        'Attract new patients who fear the dentist',
        'Create a warm, calming digital experience',
        'Enable 24/7 appointment requests',
        'Showcase patient testimonials prominently',
        'Rank for "gentle dentist Austin" searches'
      ]}
      
      buildPoints={[
        'Designed warm, anxiety-friendly visual aesthetic',
        'Implemented AI chatbot with supportive, gentle tone',
        'Built $99 new patient special landing flow',
        'Created team profile pages highlighting caring approach',
        'Integrated with practice management system'
      ]}
      
      launchPoints={[
        'Soft launch with staff feedback on chatbot responses',
        'New patient special promotion campaign',
        'Google Business Profile optimization',
        'Automated review request after appointments',
        'Performance tracking dashboard setup'
      ]}
      
      results={[
        { value: '47', label: 'New Patients/Mo' },
        { value: '+312%', label: 'Online Bookings' },
        { value: '94%', label: 'Show Rate' },
        { value: '4.9', label: 'Google Rating', suffix: '★' }
      ]}
      
      testimonial={{
        quote: "I used to dread the dentist. Now I actually look forward to my visits! Dr. Chen and her team made me feel so comfortable from the first call.",
        author: "Jennifer M.",
        title: "Austin Patient"
      }}
      
      mockupComponent={<ClearviewDentistryAustinMockup />}
    />
  );
};

export default ClearviewDentistryAustin;
