/**
 * @fileoverview Results metrics - Elegant 4-column layout
 * @module components/home/TransformationSection
 */

const results = [
  { metric: '3x', label: 'More Calls', description: 'Average increase in inquiries' },
  { metric: '47%', label: 'More Revenue', description: 'Growth in 90 days' },
  { metric: '4.8★', label: 'Avg Rating', description: 'Client satisfaction' },
  { metric: '24/7', label: 'Lead Capture', description: 'Never miss an opportunity' },
];

/**
 * Four-column metrics with serif numerals.
 */
export function TransformationSection() {
  return (
    <section className="section-tight bg-card/30 border-t border-b border-border/10">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl text-foreground">
            Real results for <span className="italic text-gradient">real businesses</span>
          </h2>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 max-w-4xl mx-auto">
          {results.map((result) => (
            <div key={result.label} className="text-center">
              <div className="font-serif text-4xl md:text-5xl text-gradient mb-2">
                {result.metric}
              </div>
              <div className="text-foreground font-medium text-sm mb-1">
                {result.label}
              </div>
              <div className="text-muted-foreground text-xs">
                {result.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
