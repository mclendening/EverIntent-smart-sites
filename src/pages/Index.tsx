/**
 * @fileoverview Simplified homepage structure with 3-4 key sections
 * @module pages/Index
 * 
 * Luxury redesign per spec:
 * - Hero with powerful headline
 * - Problem/Solution (HowWeHelp)
 * - Benefits (Transformation)
 * - Testimonials
 * - Final CTA
 */
import { HeroSection } from '@/components/home/HeroSection';
import HowWeHelpSection from '@/components/home/HowWeHelpSection';
import { TransformationSection } from '@/components/home/TransformationSection';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';
import { FinalCTASection } from '@/components/home/FinalCTASection';

/**
 * Index - Homepage with streamlined luxury sections
 * Removed: SocialProofBar, PricingTeaser, PortfolioPreview, IndustriesSection
 * Kept: Hero, HowWeHelp, Transformation, Testimonials, FinalCTA
 */
const Index = () => {
  return (
    <main>
      <HeroSection />
      <HowWeHelpSection />
      <TransformationSection />
      <TestimonialsSection />
      <FinalCTASection />
    </main>
  );
};

export default Index;
