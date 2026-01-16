/**
 * @fileoverview Index Page - Homepage
 * @description Main landing page composing all home section components.
 *              Entry point for site visitors per BRD v33.0 Section 6.
 * 
 * @module pages/Index
 * @see {@link https://docs.lovable.dev} Lovable Documentation
 * 
 * @brd-reference BRD v33.0 Section 6 - Homepage Structure
 * @brd-reference BRD v33.0 Section 6.1 - Section Order
 */
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { HeroSection } from '@/components/home/HeroSection';
import { SocialProofBar } from '@/components/home/SocialProofBar';
import HowWeHelpSection from '@/components/home/HowWeHelpSection';
import { TransformationSection } from '@/components/home/TransformationSection';
import { PricingTeaser } from '@/components/home/PricingTeaser';
import { PortfolioPreview } from '@/components/home/PortfolioPreview';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';
import { IndustriesSection } from '@/components/home/IndustriesSection';
import { FinalCTASection } from '@/components/home/FinalCTASection';

/**
 * Index - Homepage component
 * 
 * Section order per BRD v33.0:
 * 1. HeroSection - Main headline and primary CTA
 * 2. SocialProofBar - Scrolling stats marquee
 * 3. HowWeHelpSection - Three core outcomes
 * 4. TransformationSection - Results metrics
 * 5. PricingTeaser - Package overview
 * 6. PortfolioPreview - Featured work
 * 7. TestimonialsSection - Client quotes
 * 8. IndustriesSection - Industry hubs
 * 9. FinalCTASection - Closing conversion
 * 
 * @component
 * @returns {JSX.Element} Homepage with all sections
 */
const Index = () => {
  const navigate = useNavigate();

  // Redirect password recovery sessions to reset password page
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') {
        navigate('/admin/reset-password', { replace: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);
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
