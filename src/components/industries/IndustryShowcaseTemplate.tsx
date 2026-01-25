/**
 * @fileoverview Premium Industry Showcase Template Component.
 * @module components/industries/IndustryShowcaseTemplate
 * 
 * Long-form (~2500px) sales page template with:
 * - Sticky CTA header
 * - Animated CSS transcript blocks
 * - Website mockup gallery (device frames)
 * - Audio demo mockups (SVG waveforms)
 * - Industry-specific FAQ
 * - Tier badge recommendations
 */

import { ReactNode, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Phone, 
  Clock, 
  Star, 
  CheckCircle2,
  Play,
  Volume2,
  MessageSquare,
  Bot,
  Calendar,
  Shield,
  Zap,
  ChevronDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

// ============================================
// TYPES
// ============================================

export interface TranscriptMessage {
  role: 'caller' | 'ai';
  text: string;
  delay?: number;
}

export interface WebsiteMockup {
  title: string;
  type: string;
  imageUrl?: string;
  placeholderGradient: string;
}

export interface PainPoint {
  problem: string;
  solution: string;
  stat: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface IndustryShowcaseProps {
  /** Industry category name */
  industryName: string;
  /** URL slug for breadcrumb */
  industrySlug: string;
  /** Icon component for industry badge */
  industryIcon: ReactNode;
  /** Number of verticals in category */
  verticalCount: number;
  /** Hero headline (span tags for gradient text) */
  heroHeadline: ReactNode;
  /** Hero subtext with token words */
  heroSubtext: ReactNode;
  /** Industry-specific token words */
  tokenWords: string[];
  /** Pain points with stats */
  painPoints: PainPoint[];
  /** AI transcript conversation */
  transcript: TranscriptMessage[];
  /** Website mockups (4 recommended) */
  websiteMockups: WebsiteMockup[];
  /** Recommended tier name */
  recommendedTier: string;
  /** Recommended tier price */
  tierPrice: string;
  /** Recommended tier setup fee */
  tierSetup: string;
  /** Industry-specific FAQ */
  faqItems: FAQItem[];
  /** CTA button text */
  ctaText?: string;
  /** CTA link */
  ctaLink?: string;
}

// ============================================
// ANIMATED TRANSCRIPT COMPONENT
// ============================================

function AnimatedTranscript({ messages }: { messages: TranscriptMessage[] }) {
  const [visibleMessages, setVisibleMessages] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    if (!isAnimating) return;
    
    if (visibleMessages < messages.length) {
      const delay = messages[visibleMessages]?.delay || 1500;
      const timer = setTimeout(() => {
        setVisibleMessages(prev => prev + 1);
      }, delay);
      return () => clearTimeout(timer);
    } else {
      // Reset after completion
      const resetTimer = setTimeout(() => {
        setVisibleMessages(0);
      }, 5000);
      return () => clearTimeout(resetTimer);
    }
  }, [visibleMessages, messages.length, isAnimating]);

  return (
    <div className="relative bg-card rounded-xl border border-border/30 p-6 overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border/30">
        <div className="p-2 rounded-lg bg-primary/20">
          <Bot className="w-5 h-5 text-accent" />
        </div>
        <div>
          <p className="font-medium text-foreground">AI Receptionist</p>
          <p className="text-xs text-muted-foreground">Live call simulation</p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-xs text-muted-foreground">Active</span>
        </div>
      </div>

      {/* Messages */}
      <div className="space-y-4 min-h-[280px]">
        {messages.slice(0, visibleMessages).map((message, index) => (
          <div
            key={index}
            className={cn(
              "flex gap-3 animate-in slide-in-from-bottom-2 duration-300",
              message.role === 'ai' ? 'justify-start' : 'justify-end'
            )}
          >
            {message.role === 'ai' && (
              <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-accent" />
              </div>
            )}
            <div
              className={cn(
                "max-w-[80%] rounded-xl px-4 py-3",
                message.role === 'ai' 
                  ? 'bg-muted text-foreground' 
                  : 'bg-accent/20 text-foreground'
              )}
            >
              <p className="text-sm">{message.text}</p>
            </div>
            {message.role === 'caller' && (
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <Phone className="w-4 h-4 text-muted-foreground" />
              </div>
            )}
          </div>
        ))}
        
        {/* Typing indicator */}
        {visibleMessages < messages.length && isAnimating && (
          <div className="flex gap-3 animate-in fade-in duration-300">
            <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
              <Bot className="w-4 h-4 text-accent" />
            </div>
            <div className="bg-muted rounded-xl px-4 py-3">
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Disclaimer */}
      <p className="text-xs text-muted-foreground mt-4 pt-4 border-t border-border/30">
        * Simulated conversation. Actual AI responses customized to your business.
      </p>
    </div>
  );
}

// ============================================
// AUDIO DEMO MOCKUP COMPONENT
// ============================================

function AudioDemoMockup() {
  return (
    <div className="bg-card rounded-xl border border-border/30 p-6">
      <div className="flex items-center gap-4 mb-4">
        <button className="w-12 h-12 rounded-full bg-accent flex items-center justify-center hover:bg-accent-hover transition-colors">
          <Play className="w-5 h-5 text-accent-foreground ml-0.5" />
        </button>
        <div className="flex-1">
          <p className="font-medium text-foreground">Listen to a sample call</p>
          <p className="text-sm text-muted-foreground">2:34 demo</p>
        </div>
        <Volume2 className="w-5 h-5 text-muted-foreground" />
      </div>
      
      {/* Waveform SVG */}
      <div className="h-16 flex items-center gap-0.5">
        {Array.from({ length: 50 }).map((_, i) => {
          const height = Math.sin(i * 0.3) * 30 + Math.random() * 20 + 15;
          return (
            <div
              key={i}
              className="flex-1 bg-accent/30 rounded-full transition-all duration-200 hover:bg-accent/50"
              style={{ height: `${height}%` }}
            />
          );
        })}
      </div>

      <p className="text-xs text-muted-foreground mt-4">
        Audio demos available after consultation
      </p>
    </div>
  );
}

// ============================================
// WEBSITE MOCKUP GALLERY
// ============================================

function WebsiteMockupGallery({ mockups }: { mockups: WebsiteMockup[] }) {
  return (
    <div className="grid sm:grid-cols-2 gap-6">
      {mockups.map((mockup, index) => (
        <div
          key={index}
          className="group relative rounded-xl overflow-hidden border border-border/30 bg-card hover:border-accent/50 transition-all duration-300"
        >
          {/* Device Frame */}
          <div className="p-4 bg-muted/30">
            <div className="flex items-center gap-2 mb-3">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-destructive/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/50" />
              </div>
              <div className="flex-1 h-5 rounded bg-muted/50 mx-2" />
            </div>
            
            {/* Mockup Content */}
            <div 
              className={cn(
                "aspect-[4/3] rounded-lg flex items-center justify-center",
                mockup.placeholderGradient
              )}
            >
              {mockup.imageUrl ? (
                <img 
                  src={mockup.imageUrl} 
                  alt={mockup.title}
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <div className="text-center p-4">
                  <p className="text-foreground/80 font-medium text-sm">{mockup.title}</p>
                  <p className="text-foreground/50 text-xs mt-1">{mockup.type}</p>
                </div>
              )}
            </div>
          </div>
          
          {/* Label */}
          <div className="p-4">
            <p className="font-medium text-sm text-foreground">{mockup.title}</p>
            <p className="text-xs text-muted-foreground">{mockup.type}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

// ============================================
// FAQ ACCORDION
// ============================================

function FAQAccordion({ items }: { items: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div
          key={index}
          className="bg-card rounded-xl border border-border/30 overflow-hidden"
        >
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/30 transition-colors"
          >
            <span className="font-medium text-foreground pr-4">{item.question}</span>
            <ChevronDown 
              className={cn(
                "w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform duration-200",
                openIndex === index && "rotate-180"
              )} 
            />
          </button>
          {openIndex === index && (
            <div className="px-4 pb-4 animate-in slide-in-from-top-2 duration-200">
              <p className="text-muted-foreground text-sm leading-relaxed">{item.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ============================================
// STICKY CTA HEADER
// ============================================

function StickyCTA({ tierName, tierPrice, ctaText, ctaLink }: { 
  tierName: string; 
  tierPrice: string; 
  ctaText: string;
  ctaLink: string;
}) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 600);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-lg border-t border-border/50 py-3 px-4 transition-transform duration-300",
        isVisible ? "translate-y-0" : "translate-y-full"
      )}
    >
      <div className="container mx-auto flex items-center justify-between gap-4">
        <div className="hidden sm:block">
          <p className="font-medium text-foreground">{tierName}</p>
          <p className="text-sm text-muted-foreground">{tierPrice}</p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Button asChild variant="outline" size="sm" className="flex-1 sm:flex-none">
            <Link to="/contact">Talk to Sales</Link>
          </Button>
          <Button asChild size="sm" className="flex-1 sm:flex-none">
            <Link to={ctaLink}>{ctaText}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

// ============================================
// MAIN TEMPLATE COMPONENT
// ============================================

export function IndustryShowcaseTemplate({
  industryName,
  industrySlug,
  industryIcon,
  verticalCount,
  heroHeadline,
  heroSubtext,
  tokenWords,
  painPoints,
  transcript,
  websiteMockups,
  recommendedTier,
  tierPrice,
  tierSetup,
  faqItems,
  ctaText = 'Get Started',
  ctaLink = '/pricing',
}: IndustryShowcaseProps) {
  return (
    <>
      {/* Sticky CTA */}
      <StickyCTA 
        tierName={recommendedTier} 
        tierPrice={tierPrice} 
        ctaText={ctaText}
        ctaLink={ctaLink}
      />

      {/* Hero Section */}
      <section className="relative py-16 md:py-24 bg-gradient-to-b from-background to-card/50 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-mesh opacity-50" />
        
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            {/* Breadcrumb */}
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-6">
              <Link to="/industries" className="hover:text-foreground transition-colors">Industries</Link>
              <ArrowRight className="w-3 h-3" />
              <span className="text-foreground">{industryName}</span>
            </div>

            {/* Industry Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              {industryIcon}
              {verticalCount} Verticals
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              {heroHeadline}
            </h1>
            
            {/* Subtext */}
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              {heroSubtext}
            </p>

            {/* Token Words */}
            <div className="flex flex-wrap justify-center gap-2 mb-10">
              {tokenWords.map((word) => (
                <span 
                  key={word}
                  className="px-3 py-1 text-sm rounded-full bg-accent/20 text-accent-foreground border border-accent/30"
                >
                  {word}
                </span>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="min-w-[200px]">
                <Link to={ctaLink}>
                  {ctaText}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/let-ai-handle-it">See AI Demo</Link>
              </Button>
            </div>

            {/* Tier Badge */}
            <div className="mt-8 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-accent/10 border border-accent/30">
              <Star className="w-4 h-4 text-accent" />
              <span className="text-sm">
                Recommended: <strong className="text-foreground">{recommendedTier}</strong> • {tierPrice}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Pain Points Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <Badge variant="secondary" className="mb-4">The Problem</Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
              <span className="text-foreground">Every missed call is </span>
              <span className="text-gradient">money lost</span>
            </h2>
            <p className="text-muted-foreground">
              Your competitors answer 24/7. Can you afford not to?
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {painPoints.map((item, index) => (
              <div 
                key={index}
                className="bg-card rounded-xl p-6 border border-border/30 hover:border-accent/30 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-destructive/10">
                    <Phone className="w-5 h-5 text-destructive" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-foreground mb-1">{item.problem}</p>
                    <p className="text-sm text-muted-foreground mb-3">{item.solution}</p>
                    <p className="text-xs font-medium text-accent">{item.stat}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Transcript Demo Section */}
      <section className="py-16 md:py-24 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <Badge variant="secondary" className="mb-4">The Solution</Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
              <span className="text-foreground">Your AI receptionist </span>
              <span className="text-gradient">in action</span>
            </h2>
            <p className="text-muted-foreground">
              Watch how our AI handles real {industryName.toLowerCase()} calls
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <AnimatedTranscript messages={transcript} />
            <div className="space-y-6">
              <AudioDemoMockup />
              
              {/* Key Features */}
              <div className="bg-card rounded-xl border border-border/30 p-6">
                <h3 className="font-semibold text-foreground mb-4">AI Capabilities</h3>
                <div className="space-y-3">
                  {[
                    { icon: MessageSquare, text: 'Natural conversation flow' },
                    { icon: Calendar, text: 'Books appointments directly' },
                    { icon: Shield, text: 'Qualifies leads instantly' },
                    { icon: Zap, text: 'Responds in milliseconds' },
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="p-1.5 rounded-md bg-accent/10">
                        <feature.icon className="w-4 h-4 text-accent" />
                      </div>
                      <span className="text-sm text-muted-foreground">{feature.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Website Showcase Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <Badge variant="secondary" className="mb-4">Portfolio</Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
              <span className="text-foreground">Websites built for </span>
              <span className="text-gradient">{industryName.toLowerCase()}</span>
            </h2>
            <p className="text-muted-foreground">
              Conversion-focused designs that turn visitors into customers
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <WebsiteMockupGallery mockups={websiteMockups} />
          </div>

          <div className="text-center mt-8">
            <Button asChild variant="outline">
              <Link to="/our-work">View Full Portfolio</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <Badge variant="secondary" className="mb-4">FAQ</Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
              Common questions
            </h2>
            <p className="text-muted-foreground">
              Everything {industryName.toLowerCase()} businesses ask before getting started
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <FAQAccordion items={faqItems} />
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-gradient-to-br from-card to-muted/30 rounded-2xl p-8 md:p-12 border border-accent/30 text-center">
            <Badge className="mb-4 bg-accent/20 text-accent border-accent/30">
              Recommended for {industryName}
            </Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
              {recommendedTier}
            </h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              The perfect starting point for {industryName.toLowerCase()} businesses. 
              Get everything you need to capture more leads and grow.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 mb-8">
              <div className="p-4 bg-background/50 rounded-lg">
                <p className="text-2xl font-bold text-foreground">{tierSetup}</p>
                <p className="text-xs text-muted-foreground">Setup fee</p>
              </div>
              <div className="p-4 bg-background/50 rounded-lg">
                <p className="text-2xl font-bold text-foreground">{tierPrice}</p>
                <p className="text-xs text-muted-foreground">Monthly</p>
              </div>
              <div className="p-4 bg-background/50 rounded-lg">
                <Clock className="w-5 h-5 text-accent mx-auto mb-1" />
                <p className="text-sm font-medium">5-day delivery</p>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="min-w-[180px]">
                <Link to={ctaLink}>
                  {ctaText}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/contact">Talk to Sales</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom padding for sticky CTA */}
      <div className="h-20 md:hidden" />
    </>
  );
}
