/**
 * @fileoverview Portfolio Hub Page
 * @module pages/Portfolio
 * 
 * Top-level portfolio hub showcasing 8 case studies with:
 * - Animated hero stats
 * - Industry filter system
 * - Live mockup preview cards
 * - Full SEO/AEO optimization
 * - SSG compatible
 */

import { SEO } from '@/components/SEO';
import { PortfolioHero, PortfolioGrid } from '@/components/portfolio';

/**
 * Portfolio hub page with filterable project grid
 */
const Portfolio = () => {
  // Structured data for SEO/AEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "EverIntent Portfolio",
    "description": "Explore our portfolio of award-winning websites and digital solutions for local businesses. See real results from real clients.",
    "publisher": {
      "@type": "Organization",
      "name": "EverIntent",
      "url": "https://everintent.com"
    },
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": 8,
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Riverstone Plumbing & Heating",
          "url": "https://everintent.com/portfolio/riverstone-plumbing"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Clearview Family Dentistry",
          "url": "https://everintent.com/portfolio/clearview-dentistry"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Ashford & Associates Law",
          "url": "https://everintent.com/portfolio/ashford-law"
        },
        {
          "@type": "ListItem",
          "position": 4,
          "name": "Summit Climate Solutions",
          "url": "https://everintent.com/portfolio/summit-climate"
        },
        {
          "@type": "ListItem",
          "position": 5,
          "name": "Golden Gate Roofing",
          "url": "https://everintent.com/portfolio/golden-gate-roofing"
        },
        {
          "@type": "ListItem",
          "position": 6,
          "name": "Harmony Wellness Center",
          "url": "https://everintent.com/portfolio/harmony-wellness"
        },
        {
          "@type": "ListItem",
          "position": 7,
          "name": "Precision Auto Group",
          "url": "https://everintent.com/portfolio/precision-auto"
        },
        {
          "@type": "ListItem",
          "position": 8,
          "name": "Evergreen Landscapes",
          "url": "https://everintent.com/portfolio/evergreen-landscapes"
        }
      ]
    }
  };

  return (
    <>
      <SEO 
        title="Portfolio | Award-Winning Websites for Local Businesses | EverIntent"
        description="Explore our portfolio of award-winning websites that drive real results. 87 projects, $3.8M revenue generated, 4.9★ rating. See how we transform local businesses."
        canonical="/portfolio"
        structuredData={structuredData}
      />
      
      <main className="min-h-screen bg-background">
        <PortfolioHero />
        <PortfolioGrid />
      </main>
    </>
  );
};

export default Portfolio;
