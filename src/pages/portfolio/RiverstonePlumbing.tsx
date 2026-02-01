/**
 * @fileoverview Desert Cool Air case study page (formerly Riverstone Plumbing)
 * @module pages/portfolio/RiverstonePlumbing
 * 
 * Complete case study featuring:
 * - Interactive website mockup with AI chatbot
 * - The Journey narrative (Discovery → Requirements → Build → Launch)
 * - Animated result metrics
 * - Client testimonial
 */

import { CaseStudyLayout } from '@/components/portfolio/case-study/CaseStudyLayout';
import { DesertCoolAirMockup } from '@/components/portfolio/case-study/DesertCoolAirMockup';

const RiverstonePlumbing = () => {
  return (
    <CaseStudyLayout
      slug="riverstone-plumbing"
      company="Desert Cool Air"
      industry="HVAC"
      location="Phoenix, AZ"
      description="Phoenix HVAC company serving the Valley since 2010. They needed a modern website that could capture leads 24/7 and compete with franchises dominating Google search in the extreme Arizona heat."
      services={[
        'Smart Website',
        'AI Chat Widget',
        'SEO Optimization',
        'Lead Capture',
        '24/7 Automation'
      ]}
      primaryColor="#1a1a1a"
      accentColor="#E6A44C"
      
      discoveryPoints={[
        'Family-owned HVAC company serving Phoenix since 2010',
        '70% of leads came from word-of-mouth referrals',
        'Losing emergency AC calls to competitors with better online presence',
        'No way to capture leads after hours or on weekends',
        'Outdated website with poor mobile experience'
      ]}
      
      requirementsPoints={[
        'Increase qualified leads by 200% in first 6 months',
        '24/7 lead capture without hiring additional staff',
        'Rank on first page for "Phoenix AC repair" searches',
        'Mobile-first design for emergency callers',
        'Showcase 15+ years of experience and trust'
      ]}
      
      buildPoints={[
        'Designed mobile-first website with emergency CTA always visible',
        'Implemented AI chatbot trained on HVAC scenarios',
        'Built local SEO foundation with service area pages',
        'Created automated lead qualification and routing',
        'Integrated with existing scheduling system'
      ]}
      
      launchPoints={[
        'Soft launch with A/B testing on key CTAs',
        'Staff training on lead notification system',
        'Google Business Profile optimization',
        'Review request automation setup',
        'Performance monitoring dashboard configured'
      ]}
      
      results={[
        { value: '+247%', label: 'Qualified Leads' },
        { value: '62', label: 'Avg. Leads/Month' },
        { value: '100%', label: 'Calls Answered' },
        { value: '4.9', label: 'Google Rating', suffix: '★' }
      ]}
      
      testimonial={{
        quote: "Our AC died during a 115° week. Desert Cool Air had a tech here in 2 hours and got us cool by dinner. The new website and chatbot have been lifesavers for our business.",
        author: "Maria R.",
        title: "Scottsdale Homeowner"
      }}
      
      mockupComponent={<DesertCoolAirMockup />}
    />
  );
};

export default RiverstonePlumbing;
