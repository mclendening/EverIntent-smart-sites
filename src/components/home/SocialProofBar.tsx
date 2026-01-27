/**
 * @fileoverview Minimal trust strip - replaces marquee.
 * @module components/home/SocialProofBar
 */

/**
 * Elegant trust strip with key metrics.
 * Simple, refined - no busy animations.
 * 
 * @component
 */
export function SocialProofBar() {
  return (
    <section className="relative py-16 border-t border-b border-border/20">
      <div className="container mx-auto px-6">
        <div className="flex flex-wrap items-center justify-center gap-12 md:gap-20">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-serif text-gradient mb-1">65+</div>
            <div className="text-sm text-muted-foreground tracking-wide">Industries Served</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-serif text-gradient mb-1">4.9</div>
            <div className="text-sm text-muted-foreground tracking-wide">Client Rating</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-serif text-gradient mb-1">5</div>
            <div className="text-sm text-muted-foreground tracking-wide">Day Delivery</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-serif text-gradient mb-1">100%</div>
            <div className="text-sm text-muted-foreground tracking-wide">Satisfaction</div>
          </div>
        </div>
      </div>
    </section>
  );
}
