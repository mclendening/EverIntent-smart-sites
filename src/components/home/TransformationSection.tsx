/**
 * @fileoverview Results/Benefits Section
 * @module components/home/TransformationSection
 * 
 * Four simple metrics in a clean horizontal layout.
 */

import { TrendingUp, Phone, Star, Clock } from 'lucide-react';

/**
 * Key business results metrics.
 */
const results = [
  {
    icon: Phone,
    metric: '3x',
    label: 'More Calls',
  },
  {
    icon: TrendingUp,
    metric: '47%',
    label: 'Revenue Growth',
  },
  {
    icon: Star,
    metric: '4.8★',
    label: 'Client Rating',
  },
  {
    icon: Clock,
    metric: '24/7',
    label: 'Lead Capture',
  },
];

/**
 * Transformation metrics section - horizontal layout with minimal styling.
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
          <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-4">
            Real results
          </h2>
          <p className="text-muted-foreground text-lg">
            Our clients see measurable growth within 90 days.
          </p>
        </div>
        
        {/* Results grid - horizontal on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 max-w-4xl mx-auto">
          {results.map((result) => (
            <div 
              key={result.label}
              className="text-center"
            >
              <result.icon className="w-6 h-6 text-accent mx-auto mb-4" strokeWidth={1.5} />
              <div className="text-4xl md:text-5xl font-serif font-semibold text-foreground mb-2">
                {result.metric}
              </div>
              <div className="text-sm text-muted-foreground uppercase tracking-wide">
                {result.label}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Bottom border accent */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
    </section>
  );
}
