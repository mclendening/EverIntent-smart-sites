/**
 * @fileoverview Results metrics section - Minimal luxury design
 * @module components/home/TransformationSection
 */

import { TrendingUp, Phone, Star, Clock } from 'lucide-react';

const results = [
  {
    icon: Phone,
    metric: '3×',
    label: 'More inquiries',
  },
  {
    icon: TrendingUp,
    metric: '47%',
    label: 'Revenue growth',
  },
  {
    icon: Star,
    metric: '4.9',
    label: 'Client rating',
  },
  {
    icon: Clock,
    metric: '24/7',
    label: 'AI coverage',
  },
];

/**
 * Four-column metrics with minimal luxury styling
 */
export function TransformationSection() {
  return (
    <section className="relative py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-accent text-sm font-medium tracking-widest uppercase mb-4">
            Results
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-foreground">
            Real growth for real businesses
          </h2>
        </div>
        
        {/* Results grid - Clean, minimal */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 max-w-4xl mx-auto">
          {results.map((result, index) => (
            <div 
              key={result.label}
              className="text-center animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <result.icon className="w-6 h-6 text-accent mx-auto mb-4" strokeWidth={1.5} />
              <div className="font-serif text-4xl md:text-5xl text-foreground mb-2">
                {result.metric}
              </div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider">
                {result.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
