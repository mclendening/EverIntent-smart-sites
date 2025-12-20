import { Star } from 'lucide-react';

export function SocialProofBar() {
  return (
    <div className="py-3 border-b border-border/20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span className="font-semibold text-foreground">65+</span> Industries Served
          </span>
          <span className="hidden sm:inline text-border/50">•</span>
          <span className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 fill-primary text-primary" />
            <span className="font-semibold text-foreground">4.9</span> Rating
          </span>
          <span className="hidden sm:inline text-border/50">•</span>
          <span>
            <span className="font-semibold text-foreground">5-Day</span> Delivery
          </span>
          <span className="hidden sm:inline text-border/50">•</span>
          <span>
            <span className="font-semibold text-foreground">100%</span> Satisfaction Guarantee
          </span>
        </div>
      </div>
    </div>
  );
}
