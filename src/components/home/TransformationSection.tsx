/**
 * @fileoverview Homepage results/metrics section.
 * @module components/home/TransformationSection
 */

import { TrendingUp, Phone, Star, Users } from 'lucide-react';

/**
 * Business transformation metrics showing typical client results.
 */
const results = [
  {
    icon: Phone,
    metric: '3x',
    label: 'More Calls',
    description: 'Average increase in customer inquiries',
  },
  {
    icon: TrendingUp,
    metric: '47%',
    label: 'More Revenue',
    description: 'Average revenue growth in 90 days',
  },
  {
    icon: Star,
    metric: '4.8★',
    label: 'Avg Rating',
    description: 'Client satisfaction score',
  },
  {
    icon: Users,
    metric: '24/7',
    label: 'Lead Capture',
    description: 'Never miss an opportunity',
  },
];

/**
 * Four-column grid displaying key business transformation metrics.
 * Shows typical client results: calls, revenue, ratings, availability.
 * 
 * @component
 * @example
 * <TransformationSection />
 */
export function TransformationSection() {
  return (
    <section className="relative py-16 md:py-24 bg-card/50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            <span className="text-foreground">Real results for </span>
            <span className="text-gradient">real businesses</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg">
            Our clients see measurable growth. Here's what you can expect.
          </p>
        </div>
        
        {/* Results grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto">
          {results.map((result) => (
            <div 
              key={result.label}
              className="group relative bg-background rounded-xl p-5 md:p-6 border border-border/30 hover:border-primary/30 transition-all duration-300 text-center"
            >
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 mb-4 group-hover:bg-primary/20 transition-colors">
                <result.icon className="w-5 h-5 text-primary" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-gradient mb-1">
                {result.metric}
              </div>
              <div className="text-sm md:text-base font-medium text-foreground mb-1">
                {result.label}
              </div>
              <div className="text-xs text-muted-foreground">
                {result.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
