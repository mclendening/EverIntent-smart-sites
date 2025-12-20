import { ArrowRight, Phone, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CTAButton } from '@/components/CTAButton';

export function FinalCTASection() {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-hero" />
      <div className="absolute inset-0 bg-mesh opacity-40" />
      <div className="absolute inset-0 bg-noise" />
      
      {/* Accent orbs */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-48 h-48 bg-accent/10 rounded-full blur-3xl" />
      
      <div className="relative container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          {/* Headline */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            <span className="text-foreground">Ready to grow</span>
            <br />
            <span className="text-gradient">your business?</span>
          </h2>
          
          {/* Subhead */}
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-xl mx-auto">
            Get a professional website that works as hard as you do. Starting at just $249.
          </p>
          
          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <CTAButton 
              to="/pricing" 
              defaultText="Get Started Today"
              hoverText="View Plans"
              className="w-full sm:w-auto"
            />
            <Link 
              to="/contact" 
              className="group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-border/50 text-foreground hover:border-primary/50 hover:text-primary transition-all duration-300 w-full sm:w-auto"
            >
              <Calendar className="w-4 h-4" />
              <span>Book a Free Call</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
          
          {/* Trust signal */}
          <p className="text-sm text-muted-foreground">
            <span className="text-accent">✓</span> No contracts required
            <span className="mx-2">•</span>
            <span className="text-accent">✓</span> 5-day delivery
            <span className="mx-2">•</span>
            <span className="text-accent">✓</span> You own everything
          </p>
        </div>
      </div>
    </section>
  );
}
