/**
 * @fileoverview Final CTA Section
 * @module components/home/FinalCTASection
 * 
 * Clean closing CTA with single focus action.
 */

import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * Full-width CTA section at bottom of homepage.
 * Single headline, clear value prop, dual CTAs.
 * 
 * @component
 */
export function FinalCTASection() {
  return (
    <section className="relative py-24 md:py-40 overflow-hidden bg-background">
      {/* Subtle gold glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-accent/5 rounded-full blur-3xl" />
      
      <div className="relative container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
          {/* Headline */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
            Ready to grow your business?
          </h2>
          
          {/* Subhead */}
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-xl mx-auto">
            Professional websites and AI automation. Starting at $249.
          </p>
          
          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link 
              to="/pricing" 
              className="btn-gold btn-glow w-full sm:w-auto"
            >
              Get Started
            </Link>
            <Link 
              to="/contact" 
              className="group inline-flex items-center justify-center gap-2 px-6 py-3 text-foreground hover:text-accent transition-all duration-300 w-full sm:w-auto"
            >
              <span className="story-link">Book a Free Call</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
          
          {/* Trust signals */}
          <div className="inline-flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <span>✓ No contracts</span>
            <span>✓ 5-day delivery</span>
            <span>✓ You own everything</span>
          </div>
        </div>
      </div>
    </section>
  );
}
