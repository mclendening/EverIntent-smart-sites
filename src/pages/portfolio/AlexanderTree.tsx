/**
 * @fileoverview Alexander Tree & Landscaping case study page
 * @module pages/portfolio/AlexanderTree
 * 
 * Complete case study featuring:
 * - Interactive website mockup with AI chatbot
 * - The Journey narrative (Discovery → Requirements → Build → Launch)
 * - Animated result metrics
 * - Client testimonial
 */

import { CaseStudyLayout } from '@/components/portfolio/case-study/CaseStudyLayout';
import { AlexanderTreeMockup } from '@/components/portfolio/case-study/AlexanderTreeMockup';

const AlexanderTree = () => {
  return (
    <CaseStudyLayout
      slug="alexander-tree"
      company="Alexander Tree & Landscaping"
      industry="Tree Service"
      location="Orange County, CA"
      description="Family-owned tree and landscaping company serving Orange County since 1999. They needed a modern website that communicated their old-school craftsmanship and captured leads with photo-first estimates."
      services={[
        'Smart Website',
        'AI Chat Widget',
        'SEO Optimization',
        'Lead Capture',
        'Photo Upload System'
      ]}
      primaryColor="#166534"
      accentColor="#FEFCE8"
      
      discoveryPoints={[
        'Family-owned tree service operating for 25+ years',
        'Owner Alexander Aguirre known for old-school craftsmanship',
        'Losing leads to competitors with better online presence',
        'No system to collect project photos before estimates',
        'Word-of-mouth referrals were primary source of new business'
      ]}
      
      requirementsPoints={[
        'Increase qualified leads by 150% in first year',
        'Photo-first estimate process to ensure accurate quotes',
        'Communicate 25+ years of experience and trust',
        'Rank for "Orange County tree service" searches',
        'Mobile-first design for on-the-go homeowners'
      ]}
      
      buildPoints={[
        'Designed modern website reflecting old-school values',
        'Implemented AI chatbot for 24/7 lead qualification',
        'Built photo upload system for accurate estimates',
        'Created service area pages for local SEO',
        'Integrated with existing scheduling workflow'
      ]}
      
      launchPoints={[
        'Soft launch with Alexander reviewing all incoming leads',
        'Staff training on photo review process',
        'Google Business Profile optimization',
        'Review request automation setup',
        'Performance dashboard configured'
      ]}
      
      results={[
        { value: '+186%', label: 'Qualified Leads' },
        { value: '48', label: 'Avg. Leads/Month' },
        { value: '94%', label: 'Quote Accuracy' },
        { value: '4.9', label: 'Google Rating', suffix: '★' }
      ]}
      
      testimonial={{
        quote: "Alexander and his team did an amazing job removing three large trees from my backyard. They were professional, efficient, and left my property spotless. This new website captures exactly who we are.",
        author: "Alexander Aguirre",
        title: "Owner, Alexander Tree & Landscaping"
      }}
      
      mockupComponent={<AlexanderTreeMockup />}
    />
  );
};

export default AlexanderTree;
