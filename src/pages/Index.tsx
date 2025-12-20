import { HeroSection } from '@/components/home/HeroSection';
import { SocialProofBar } from '@/components/home/SocialProofBar';
import HowWeHelpSection from '@/components/home/HowWeHelpSection';
import { TransformationSection } from '@/components/home/TransformationSection';
import { PricingTeaser } from '@/components/home/PricingTeaser';
import { PortfolioPreview } from '@/components/home/PortfolioPreview';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';
import { IndustriesSection } from '@/components/home/IndustriesSection';
import { FinalCTASection } from '@/components/home/FinalCTASection';

const Index = () => {
  return (
    <main>
      <HeroSection />
      <SocialProofBar />
      <HowWeHelpSection />
      <TransformationSection />
      <PricingTeaser />
      <PortfolioPreview />
      <TestimonialsSection />
      <IndustriesSection />
      <FinalCTASection />
    </main>
  );
};

export default Index;
