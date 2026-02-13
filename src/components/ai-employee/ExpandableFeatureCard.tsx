/**
 * @fileoverview SSG-Safe Expandable Feature Card
 * @module components/ai-employee/ExpandableFeatureCard
 *
 * Renders feature cards with collapsible rich content using Radix Collapsible.
 * All content (benefit, detail, searchTerms) is pre-rendered in the DOM for
 * search engine indexing, then collapsed via CSS data-state attributes.
 * This ensures full SEO/AEO visibility while maintaining a clean expandable UI.
 *
 * SSG Safety:
 * - No browser APIs used (no localStorage, sessionStorage, window)
 * - All content rendered server-side; collapsed via CSS, not JS conditionals
 * - Intersection Observer for stagger animation wrapped in useEffect (client-only)
 *
 * Data Contract:
 * - Accepts ExpandableFeature[] with icon, title, shortDesc, detail, benefit, searchTerms
 * - searchTerms are rendered as visually-hidden semantic text for crawler indexing
 */

import { useState, useRef, useEffect } from 'react';
import { CheckCircle2, ChevronDown, LucideIcon } from 'lucide-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

/**
 * Rich feature data contract for SEO/AEO-optimized expandable cards.
 * All fields are pre-rendered in the DOM for search engine crawling.
 */
export interface ExpandableFeature {
  /** Lucide icon component for visual identification */
  icon: LucideIcon;
  /** Feature name displayed as card heading */
  title: string;
  /** Brief visible summary (1 sentence) */
  shortDesc: string;
  /** Technical "how it works" explanation, accurate to the GHL/Vapi stack */
  detail: string;
  /** Outcome-driven benefit statement focused on business results */
  benefit: string;
  /** Targeted AEO search terms rendered as hidden semantic content */
  searchTerms: string[];
}

interface ExpandableFeatureGridProps {
  /** Array of rich feature objects */
  features: ExpandableFeature[];
  /** Grid column count */
  columns?: 1 | 2;
}

/**
 * ExpandableFeatureGrid - SSG-safe feature grid with collapsible rich content.
 *
 * Renders all content in the DOM at build time. Uses Radix Collapsible which
 * toggles data-state="open"|"closed" on a wrapper div. The CollapsibleContent
 * component uses CSS to hide/show, keeping content in the DOM for crawlers.
 */
export function ExpandableFeatureGrid({ features, columns = 2 }: ExpandableFeatureGridProps) {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          features.forEach((_, index) => {
            setTimeout(() => {
              setVisibleItems((prev) => [...prev, index]);
            }, index * 80);
          });
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [features]);

  return (
    <div
      ref={containerRef}
      className={`grid gap-4 ${columns === 2 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}
    >
      {features.map((feature, idx) => {
        const isVisible = visibleItems.includes(idx);
        const Icon = feature.icon;

        return (
          <Collapsible key={idx} asChild>
            <article
              className={`
                rounded-xl bg-card border border-border/50
                transition-all duration-500 ease-out
                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
              `}
            >
              <CollapsibleTrigger asChild>
                <button
                  type="button"
                  className="flex items-center gap-3 w-full p-4 text-left group cursor-pointer"
                  aria-label={`Expand details for ${feature.title}`}
                >
                  <Icon className="w-5 h-5 text-accent flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground text-sm leading-tight">
                      {feature.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5 leading-snug">
                      {feature.shortDesc}
                    </p>
                  </div>
                  <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                </button>
              </CollapsibleTrigger>

              {/*
                CollapsibleContent: Radix renders this in the DOM always.
                When closed, it sets data-state="closed" and applies
                display:none via CSS. Content remains in DOM for SSG crawlers.
              */}
              <CollapsibleContent className="px-4 pb-4">
                <div className="border-t border-border/30 pt-3 space-y-2">
                  {/* How it works */}
                  <div>
                    <span className="text-xs font-medium text-accent uppercase tracking-wide">
                      How it works
                    </span>
                    <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                      {feature.detail}
                    </p>
                  </div>

                  {/* Business benefit */}
                  <div>
                    <span className="text-xs font-medium text-accent uppercase tracking-wide">
                      Why it matters
                    </span>
                    <p className="text-sm text-foreground font-medium mt-1">
                      {feature.benefit}
                    </p>
                  </div>

                  {/* Search terms - visually hidden but in DOM for crawlers */}
                  <div className="sr-only" aria-hidden="true">
                    {feature.searchTerms.join(', ')}
                  </div>
                </div>
              </CollapsibleContent>
            </article>
          </Collapsible>
        );
      })}
    </div>
  );
}
