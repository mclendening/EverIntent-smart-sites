/**
 * @fileoverview Final CTA - Clean and powerful
 * @module components/home/FinalCTASection
 */

import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

/**
 * Minimal CTA section with strong headline and dual buttons.
 */
export function FinalCTASection() {
  return (
    <section className="relative py-32 md:py-40 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-background" />
      
      {/* Subtle accent glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-accent/5 rounded-full blur-[100px]" />
      
      <div className="relative container mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center">
          {/* Headline */}
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-foreground mb-6">
            Ready to grow <span className="italic text-gradient">your business?</span>
          </h2>
          
          {/* Subhead */}
          <p className="text-muted-foreground text-lg md:text-xl mb-12">
            Get started with a professional website or AI employee. Starting at $249.
          </p>
          
          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <Button asChild className="bg-accent hover:bg-accent-hover text-accent-foreground px-8 py-6 text-base font-medium transition-all duration-400 hover:shadow-glow">
              <Link to="/pricing">
                Get Started
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="border-border/50 hover:border-accent/50 text-foreground hover:text-accent px-8 py-6 text-base transition-all duration-400">
              <Link to="/contact">
                Book a Free Call
              </Link>
            </Button>
          </div>
          
          {/* Trust */}
          <p className="text-sm text-muted-foreground/60">
            No contracts required · 5-day delivery · You own everything
          </p>
        </div>
      </div>
    </section>
  );
}
