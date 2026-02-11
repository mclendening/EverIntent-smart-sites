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
import { SEO } from '@/components/SEO';

/**
 * LocalBusiness + ProfessionalService JSON-LD structured data
 */
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["ProfessionalService", "LocalBusiness"],
  "name": "EverIntent",
  "url": "https://everintent.com",
  "logo": "https://everintent.com/favicon.svg",
  "description": "AI Employee automation and smart websites for service businesses. AI answers calls 24/7, books appointments, and captures every lead.",
  "telephone": "+1-562-685-9500",
  "priceRange": "$249 - $597/mo",
  "areaServed": {
    "@type": "Country",
    "name": "United States"
  },
  "knowsAbout": [
    "AI automation for businesses",
    "Smart website design",
    "AI voice assistants",
    "Lead capture automation",
    "Appointment booking automation"
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Smart Website: Launch",
          "description": "Professional 5-page website with SEO, SSL, and mobile responsive design.",
          "url": "https://everintent.com/smart-websites/launch"
        },
        "price": "249",
        "priceCurrency": "USD"
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Smart Website: Capture",
          "description": "AI chat widget, missed call text-back, and lead capture automation.",
          "url": "https://everintent.com/smart-websites/capture"
        },
        "price": "97",
        "priceCurrency": "USD",
        "priceSpecification": {
          "@type": "UnitPriceSpecification",
          "billingDuration": "P1M"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "AI Employee",
          "description": "AI answers calls 24/7, books appointments, qualifies leads, and sends follow-ups.",
          "url": "https://everintent.com/let-ai-handle-it"
        },
        "price": "197",
        "priceCurrency": "USD",
        "priceSpecification": {
          "@type": "UnitPriceSpecification",
          "billingDuration": "P1M"
        }
      }
    ]
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "50",
    "bestRating": "5"
  }
};

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
      <SEO
        title="AI Employee and Smart Websites"
        description="Stop losing money to missed calls. AI Employee answers 24/7, books appointments, and captures every lead. Smart Websites starting at $249."
        canonical="/"
        structuredData={localBusinessSchema}
      />
      <HeroSection />
      <HowWeHelpSection />
      <TransformationSection />
      <TestimonialsSection />
      <FinalCTASection />
    </main>
  );
};

export default Index;
