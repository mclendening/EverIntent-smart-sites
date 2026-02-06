/**
 * @fileoverview Animated Feature Grid
 * @module components/ai-employee/FeatureGrid
 * 
 * Staggered animation feature grid with checkmark icons.
 */

import { useEffect, useRef, useState } from 'react';
import { CheckCircle2, LucideIcon } from 'lucide-react';

interface Feature {
  text: string;
  icon?: LucideIcon;
}

interface FeatureGridProps {
  features: (string | Feature)[];
  columns?: 1 | 2;
  variant?: 'default' | 'compact';
}

export function FeatureGrid({ features, columns = 2, variant = 'default' }: FeatureGridProps) {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          // Stagger the animations
          features.forEach((_, index) => {
            setTimeout(() => {
              setVisibleItems(prev => [...prev, index]);
            }, index * 100);
          });
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [features]);

  return (
    <div 
      ref={containerRef}
      className={`grid gap-3 ${columns === 2 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}
    >
      {features.map((feature, idx) => {
        const isVisible = visibleItems.includes(idx);
        const featureText = typeof feature === 'string' ? feature : feature.text;
        const FeatureIcon = typeof feature === 'object' && feature.icon ? feature.icon : null;
        
        return (
          <div 
            key={idx} 
            className={`
              flex items-center gap-3 p-4 rounded-xl bg-card border border-border/50
              transition-all duration-500 ease-out
              ${isVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-4'
              }
              ${variant === 'compact' ? 'p-3' : 'p-4'}
            `}
          >
            {FeatureIcon ? (
              <FeatureIcon className="w-5 h-5 text-accent flex-shrink-0" />
            ) : (
              <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
            )}
            <span className={`text-foreground ${variant === 'compact' ? 'text-sm' : ''}`}>
              {featureText}
            </span>
          </div>
        );
      })}
    </div>
  );
}
