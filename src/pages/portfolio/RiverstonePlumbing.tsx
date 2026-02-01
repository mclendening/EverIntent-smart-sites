/**
 * @fileoverview Riverstone Plumbing case study page
 * @module pages/portfolio/RiverstonePlumbing
 * 
 * Complete case study featuring:
 * - Interactive website mockup with AI chatbot
 * - The Journey narrative (Discovery → Requirements → Build → Launch)
 * - Animated result metrics
 * - Client testimonial
 */

import { CaseStudyLayout } from '@/components/portfolio/case-study/CaseStudyLayout';
import { RiverstoneInteractiveMockup } from '@/components/portfolio/case-study/RiverstoneInteractiveMockup';

const RiverstonePlumbing = () => {
  return (
    <CaseStudyLayout
      slug="riverstone-plumbing"
      company="Riverstone Plumbing & Heating"
      industry="Home Services"
      location="Denver, CO"
      description="Third-generation plumbing company ready to grow beyond word-of-mouth. They needed a modern website that could capture leads 24/7 and compete with franchises dominating Google search."
      services={[
        'Smart Website',
        'AI Chat Widget',
        'SEO Optimization',
        'Lead Capture',
        '24/7 Automation'
      ]}
      primaryColor="#1E3A5F"
      accentColor="#F97316"
      
      discoveryPoints={[
        'Family business since 1987, third generation now running operations',
        '90% of leads came from word-of-mouth referrals',
        'Losing emergency calls to competitors with better online presence',
        'No way to capture leads after hours or on weekends',
        'Outdated website with no mobile optimization'
      ]}
      
      requirementsPoints={[
        'Increase qualified leads by 200% in first 6 months',
        '24/7 lead capture without hiring additional staff',
        'Rank on first page for "Denver plumber" searches',
        'Mobile-first design for on-the-go customers',
        'Showcase 35+ years of experience and trust'
      ]}
      
      buildPoints={[
        'Designed mobile-first website with emergency CTA always visible',
        'Implemented AI chatbot trained on plumbing scenarios',
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
        { value: '+312%', label: 'Qualified Leads' },
        { value: '47', label: 'Avg. Leads/Month' },
        { value: '100%', label: 'Calls Answered' },
        { value: '4.9', label: 'Google Rating', suffix: '★' }
      ]}
      
      testimonial={{
        quote: "We went from missing half our calls to never missing a single lead. The AI chatbot books appointments while we sleep. Best investment we've made in 35 years of business.",
        author: "Mike Riverstone",
        title: "Owner, Riverstone Plumbing & Heating"
      }}
      
      mockupComponent={<RiverstoneInteractiveMockup />}
    />
  );
};

export default RiverstonePlumbing;
