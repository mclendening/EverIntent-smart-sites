import { ArrowRight, Zap, TrendingUp, Shield } from 'lucide-react';
import { CTAButton } from '@/components/CTAButton';

const stats = [
  { icon: Zap, value: '10x', label: 'Faster Results' },
  { icon: TrendingUp, value: '300%', label: 'ROI Increase' },
  { icon: Shield, value: '99.9%', label: 'Uptime' },
];

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-hero" />
      <div className="absolute inset-0 bg-mesh opacity-60" />
      <div className="absolute inset-0 bg-noise" />
      
      {/* Floating accent orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-border/50 mb-8 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-sm text-muted-foreground">
              Trusted by 500+ businesses worldwide
            </span>
          </div>
          
          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 animate-fade-in" style={{ animationDelay: '100ms' }}>
            <span className="text-foreground">Transform Your</span>
            <br />
            <span className="text-gradient">Digital Presence</span>
          </h1>
          
          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in" style={{ animationDelay: '200ms' }}>
            We craft stunning websites and smart marketing strategies that turn visitors into loyal customers. Experience the difference of truly intelligent design.
          </p>
          
          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in" style={{ animationDelay: '300ms' }}>
            <CTAButton 
              to="/start-project" 
              defaultText="Start Your Project"
              hoverText="Let's Build Together"
            />
            <a 
              href="/our-work" 
              className="group inline-flex items-center gap-2 px-6 py-3 text-foreground hover:text-primary transition-colors duration-300"
            >
              <span className="story-link">View Our Work</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '400ms' }}>
            {stats.map((stat, index) => (
              <div 
                key={stat.label}
                className="group glass rounded-xl p-6 border border-border/30 hover:border-primary/50 transition-all duration-300 hover-lift"
              >
                <stat.icon className="w-6 h-6 text-accent mx-auto mb-3 transition-transform duration-300 group-hover:scale-110" />
                <div className="text-3xl font-bold text-gradient mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
