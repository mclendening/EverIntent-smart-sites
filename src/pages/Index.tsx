/**
 * @fileoverview Homepage Index
 * @module pages/Index
 * 
 * Simplified homepage with 4 key sections:
 * 1. Hero - Single powerful headline
 * 2. How We Help - Problem/Solution
 * 3. Results - Benefits/Metrics
 * 4. Testimonials - Social proof
 * 5. Final CTA - Closing conversion
 */
import { HeroSection } from '@/components/home/HeroSection';
import HowWeHelpSection from '@/components/home/HowWeHelpSection';
import { TransformationSection } from '@/components/home/TransformationSection';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';
import { FinalCTASection } from '@/components/home/FinalCTASection';

/**
 * Index - Homepage component
 * 
 * Simplified to 5 focused sections:
 * 1. HeroSection - Main headline and CTAs
 * 2. HowWeHelpSection - Problem & solution
 * 3. TransformationSection - Results metrics
 * 4. TestimonialsSection - Client quotes
 * 5. FinalCTASection - Closing conversion
 * 
 * @component
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
