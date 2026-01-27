/**
 * @fileoverview Final CTA section - Luxury minimal design
 * @module components/home/FinalCTASection
 */

import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * Full-width CTA with luxury dark styling
 */
export function FinalCTASection() {
  return (
    <section className="relative py-24 md:py-40 bg-background overflow-hidden">
      {/* Subtle gold glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-accent/5 rounded-full blur-3xl" />
      
      <div className="relative container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
          {/* Headline */}
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-foreground mb-6">
            Ready to grow
            <br />
            <span className="italic text-accent">your business?</span>
          </h2>
          
          {/* Subhead */}
          <p className="text-muted-foreground text-lg md:text-xl mb-12 max-w-xl mx-auto">
            Professional websites from $249. AI receptionist from $149/mo. No contracts.
          </p>
          
          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-12">
            <Link 
              to="/pricing" 
              className="group inline-flex items-center gap-3 px-8 py-4 bg-accent text-accent-foreground font-medium transition-all duration-300 hover:bg-accent-hover hover:shadow-glow"
            >
              <span>Get Started Today</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            
            <Link 
              to="/contact" 
              className="group inline-flex items-center gap-3 px-8 py-4 border border-border/50 text-foreground font-medium transition-all duration-300 hover:border-accent/50"
            >
              <span>Book a Free Call</span>
              <ArrowRight className="w-4 h-4 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
          
          {/* Trust signals */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              No contracts
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              5-day delivery
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              You own everything
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
