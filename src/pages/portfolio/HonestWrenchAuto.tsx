/**
 * @fileoverview Honest Wrench Auto case study page
 * @module pages/portfolio/HonestWrenchAuto
 * 
 * Complete case study featuring:
 * - Interactive website mockup with AI chatbot "Wrenchy"
 * - The Journey narrative (Discovery → Requirements → Build → Launch)
 * - Animated result metrics
 * - Client testimonial
 */

import { CaseStudyLayout } from '@/components/portfolio/case-study/CaseStudyLayout';
import { HonestWrenchAutoMockup } from '@/components/portfolio/case-study/HonestWrenchAutoMockup';

const HonestWrenchAuto = () => {
  return (
    <CaseStudyLayout
      slug="honest-wrench-auto"
      company="Honest Wrench Auto"
      industry="Auto Repair"
      location="Riverside, CA"
      description="Family-owned auto repair shop built on transparency. After 17 years of relying on word-of-mouth, Marcus and Elena needed a modern digital presence that communicated their 'no-pressure, honest service' philosophy while capturing leads from customers searching for trustworthy mechanics."
      ownerName="Marcus & Elena Reyes"
      services={[
        'Smart Website',
        'AI Chat Widget',
        'Local SEO',
        'Lead Capture',
        'Digital Inspections',
        '24/7 Automation'
      ]}
      primaryColor="#1E3A5F"
      accentColor="#D97706"
      
      discoveryPoints={[
        'Family-owned shop serving Riverside County since 2008',
        '85% of customers came from word-of-mouth referrals',
        'Losing new customers to chain shops with better Google presence',
        'No system to capture after-hours inquiries or quote requests',
        'Existing website was outdated and didn\'t reflect their transparency values'
      ]}
      
      requirementsPoints={[
        'Increase new customer acquisition by 150% in 6 months',
        'Communicate "honest, no-pressure" brand story visually',
        'Enable 24/7 appointment scheduling and inquiry capture',
        'Rank on first page for "honest mechanic Riverside" searches',
        'Showcase digital inspection photos to build trust before visit'
      ]}
      
      buildPoints={[
        'Designed trust-focused website emphasizing transparency and photos',
        'Implemented "Wrenchy" AI chatbot for scheduling and diagnostics help',
        'Built comprehensive service pages with realistic process explanations',
        'Created photo-based testimonial system showcasing real customers',
        'Integrated with existing shop management and scheduling system'
      ]}
      
      launchPoints={[
        'Soft launch with existing customer feedback collection',
        'Staff training on lead notification and chat handoff',
        'Google Business Profile optimization with new photos',
        'Digital inspection link integration for customer transparency',
        'Review request automation tied to completed services'
      ]}
      
      results={[
        { value: '+186%', label: 'New Customers' },
        { value: '47', label: 'Leads/Month' },
        { value: '89%', label: 'Quote Conversion' },
        { value: '4.9', label: 'Google Rating', suffix: '★' },
        { value: '67%', label: 'Repeat Business' },
        { value: '24/7', label: 'Lead Capture' }
      ]}
      
      testimonial={{
        quote: "Marcus showed me photos of exactly what was wrong with my brakes—no pressure, no upselling, just facts. First time I've ever trusted a mechanic completely. The new website captures that same honesty perfectly.",
        author: "James M.",
        title: "Riverside Customer (3 years)"
      }}
      
      mockupComponent={<HonestWrenchAutoMockup />}
    />
  );
};

export default HonestWrenchAuto;
