/**
 * @fileoverview Case study layout component with narrative sections
 * @module components/portfolio/case-study/CaseStudyLayout
 * 
 * Reusable layout for portfolio case studies featuring:
 * - Hero with project overview
 * - The Journey section (Discovery, Requirements, Build, Launch)
 * - Interactive mockup container
 * - Results metrics with animated counters
 * - Testimonial section
 */

import { useEffect, useState, useRef, ReactNode } from 'react';
import { ArrowLeft, CheckCircle, Target, Wrench, Rocket, Quote } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '@/components/SEO';
import { Badge } from '@/components/ui/badge';

interface JourneyPhase {
  icon: ReactNode;
  title: string;
  subtitle: string;
  points: string[];
}

interface ResultMetric {
  value: string;
  label: string;
  prefix?: string;
  suffix?: string;
}

interface CaseStudyProps {
  // Meta
  slug: string;
  company: string;
  industry: string;
  location: string;
  description: string;
  services: string[];
  ownerName?: string; // e.g., "Dr. Sarah Chen, DDS"
  
  // Colors
  primaryColor: string;
  accentColor: string;
  
  // Journey
  discoveryPoints: string[];
  requirementsPoints: string[];
  buildPoints: string[];
  launchPoints: string[];
  
  // Results
  results: ResultMetric[];
  
  // Testimonial
  testimonial?: {
    quote: string;
    author: string;
    title: string;
  };
  
  // Interactive mockup component
  mockupComponent: ReactNode;
}

/**
 * Animated counter hook for result metrics
 */
const useCountUp = (target: number, duration = 2000, start = false) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    if (!start) return;
    
    let startTime: number;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [target, duration, start]);
  
  return count;
};

/**
 * Individual result metric card with animation
 */
const ResultCard = ({ metric, index }: { metric: ResultMetric; index: number }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  
  // Parse numeric value for animation
  const numericValue = parseFloat(metric.value.replace(/[^0-9.]/g, ''));
  const hasPercent = metric.value.includes('%');
  const hasPlus = metric.value.includes('+');
  const animatedValue = useCountUp(numericValue, 2000, isVisible);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  
  return (
    <div
      ref={ref}
      className="bg-card border border-border rounded-xl p-4 sm:p-6 text-center transform transition-all duration-500"
      style={{ 
        transitionDelay: `${index * 100}ms`,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)'
      }}
    >
      <div className="text-2xl sm:text-4xl font-bold text-accent mb-2">
        {metric.prefix}
        {hasPlus && '+'}
        {animatedValue}
        {hasPercent && '%'}
        {metric.suffix}
      </div>
      <div className="text-sm text-muted-foreground">{metric.label}</div>
    </div>
  );
};

/**
 * Journey phase card component
 */
const JourneyPhaseCard = ({ phase, index }: { phase: JourneyPhase; index: number }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  
  return (
    <div
      ref={ref}
      className="bg-card border border-border rounded-xl p-4 sm:p-6 transition-all duration-500"
      style={{
        transitionDelay: `${index * 150}ms`,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)'
      }}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
          {phase.icon}
        </div>
        <div>
          <h3 className="font-semibold text-foreground">{phase.title}</h3>
          <p className="text-sm text-muted-foreground">{phase.subtitle}</p>
        </div>
      </div>
      <ul className="space-y-2">
        {phase.points.map((point, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
            <CheckCircle className="w-4 h-4 text-accent mt-0.5 shrink-0" />
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const CaseStudyLayout = ({
  slug,
  company,
  industry,
  location,
  description,
  services,
  ownerName,
  primaryColor,
  accentColor,
  discoveryPoints,
  requirementsPoints,
  buildPoints,
  launchPoints,
  results,
  testimonial,
  mockupComponent,
}: CaseStudyProps) => {
  const journeyPhases: JourneyPhase[] = [
    {
      icon: <Target className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: 'Discovery',
      subtitle: 'Understanding the challenge',
      points: discoveryPoints,
    },
    {
      icon: <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: 'Requirements',
      subtitle: 'Defining success metrics',
      points: requirementsPoints,
    },
    {
      icon: <Wrench className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: 'Build',
      subtitle: 'Implementation details',
      points: buildPoints,
    },
    {
      icon: <Rocket className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: 'Launch',
      subtitle: 'Going live',
      points: launchPoints,
    },
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": `${company} Case Study | EverIntent`,
    "description": description,
    "author": {
      "@type": "Organization",
      "name": "EverIntent"
    },
    "publisher": {
      "@type": "Organization",
      "name": "EverIntent",
      "url": "https://everintent.com"
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://everintent.com/portfolio/${slug}`
    }
  };

  return (
    <>
      <SEO
        title={`${company} Case Study | ${industry} Website | EverIntent`}
        description={`See how EverIntent helped ${company} in ${location} achieve ${results[0]?.value} ${results[0]?.label.toLowerCase()}. ${description}`}
        canonical={`/portfolio/${slug}`}
        structuredData={structuredData}
      />

      <main className="min-h-screen bg-background">
        {/* Hero Section - Clean layout matching screenshot pattern */}
        <section 
          className="relative py-12 sm:py-16 overflow-hidden"
          style={{ 
            background: `linear-gradient(135deg, ${primaryColor} 0%, ${primaryColor}dd 100%)`
          }}
        >
          <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
            {/* Back Link */}
            <Link 
              to="/portfolio" 
              className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-8 sm:mb-10 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Back to Portfolio</span>
            </Link>

            {/* Industry + Location inline */}
            <div className="flex items-center gap-3 mb-4">
              <Badge 
                className="text-xs font-medium"
                style={{ backgroundColor: accentColor, color: 'white' }}
              >
                {industry}
              </Badge>
              <span className="text-white/60 text-sm flex items-center gap-1">
                <span className="text-white/40">◉</span> {location}
              </span>
            </div>

            {/* Company Name */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2 tracking-tight">
              {company}
            </h1>

            {/* Owner/Title */}
            {ownerName && (
              <p className="text-white/70 text-base sm:text-lg mb-4">
                {ownerName}
              </p>
            )}

            {/* Description */}
            <p className="text-white/80 text-sm sm:text-base mb-8 max-w-3xl leading-relaxed">
              {description}
            </p>

            {/* Results - 3 metrics inline */}
            <div className="flex flex-wrap gap-x-10 sm:gap-x-16 gap-y-4 mb-8">
              {results.slice(0, 3).map((metric, index) => (
                <div key={index}>
                  <div 
                    className="text-2xl sm:text-4xl font-bold mb-1"
                    style={{ color: accentColor }}
                  >
                    {metric.value}{metric.suffix}
                  </div>
                  <div className="text-white/60 text-xs sm:text-sm">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Services - Elegant typographic list */}
            <div className="flex flex-wrap items-center gap-x-1 text-white/50 text-xs sm:text-sm tracking-wide uppercase">
              {services.map((service, i) => (
                <span key={i} className="flex items-center">
                  <span className="text-white/80 font-light">{service}</span>
                  {i < services.length - 1 && (
                    <span className="mx-3 text-white/30">—</span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Interactive Mockup Section */}
        <section className="py-12 sm:py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-xl sm:text-3xl font-bold text-foreground mb-3">
                Experience the Website
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base">
                Interact with the live mockup below. Click around, chat with the AI assistant, and see how the site converts visitors into customers.
              </p>
            </div>
            
            <div className="max-w-5xl mx-auto">
              {mockupComponent}
            </div>
          </div>
        </section>

        {/* The Journey Section */}
        <section className="py-12 sm:py-20">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-xl sm:text-3xl font-bold text-foreground mb-3">
                The Journey
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base">
                From initial discovery to successful launch, here's how we transformed {company}'s online presence.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto">
              {journeyPhases.map((phase, index) => (
                <JourneyPhaseCard key={phase.title} phase={phase} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* Results Section */}
        <section className="py-12 sm:py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-xl sm:text-3xl font-bold text-foreground mb-3">
                The Results
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base">
                Real numbers that prove the impact of our partnership.
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-4xl mx-auto">
              {results.map((metric, index) => (
                <ResultCard key={metric.label} metric={metric} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* Testimonial Section */}
        {testimonial && (
          <section className="py-12 sm:py-20">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="max-w-3xl mx-auto text-center">
                <Quote className="w-10 h-10 sm:w-12 sm:h-12 text-accent mx-auto mb-6 opacity-50" />
                <blockquote className="text-lg sm:text-2xl text-foreground font-medium mb-6 italic">
                  "{testimonial.quote}"
                </blockquote>
                <div>
                  <p className="font-semibold text-foreground">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section 
          className="py-12 sm:py-16"
          style={{ backgroundColor: primaryColor }}
        >
          <div className="container mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
              Ready for Results Like These?
            </h2>
            <p className="text-white/80 mb-6 max-w-xl mx-auto text-sm sm:text-base">
              Let's discuss how EverIntent can transform your business with a smart website and AI automation.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/contact"
                className="px-6 py-3 rounded-lg font-medium transition-colors text-sm sm:text-base"
                style={{ backgroundColor: accentColor, color: 'white' }}
              >
                Get Your Free Consultation
              </Link>
              <Link
                to="/portfolio"
                className="px-6 py-3 bg-white/10 text-white rounded-lg font-medium hover:bg-white/20 transition-colors text-sm sm:text-base"
              >
                View More Projects
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default CaseStudyLayout;
