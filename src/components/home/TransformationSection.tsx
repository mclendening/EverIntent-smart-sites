/**
 * @fileoverview Results/Benefits Section
 * @module components/home/TransformationSection
 * 
 * Four metrics with lifestyle photography backdrop.
 */

import revenueImg from '@/assets/lifestyle/revenue-growth.jpg';

/**
 * Key business results metrics.
 */
const results = [
  { metric: '3x', label: 'More Calls' },
  { metric: '47%', label: 'Revenue Growth' },
  { metric: '4.8★', label: 'Client Rating' },
  { metric: '24/7', label: 'Lead Capture' },
];

/**
 * Transformation metrics section with lifestyle photo and overlay metrics.
 * 
 * @component
 */
export function TransformationSection() {
  return (
    <section className="relative py-20 md:py-28 bg-background">
      {/* Top border accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
            Real results
          </h2>
          <p className="text-muted-foreground text-lg">
            Our clients see measurable growth within 90 days.
          </p>
        </div>
        
        {/* Hero image with overlaid metrics */}
        <div className="relative max-w-4xl mx-auto rounded-2xl overflow-hidden">
          <img
            src={revenueImg}
            alt="Business owner reviewing growth metrics on tablet showing upward revenue trends"
            className="w-full h-64 md:h-80 object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-background/70 backdrop-blur-sm" />
          
          {/* Results grid overlaid */}
          <div className="absolute inset-0 grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 items-center px-8 md:px-12">
            {results.map((result) => (
              <div 
                key={result.label}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-foreground mb-2">
                  {result.metric}
                </div>
                <div className="text-sm text-muted-foreground uppercase tracking-wide">
                  {result.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Bottom border accent */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
    </section>
  );
}
