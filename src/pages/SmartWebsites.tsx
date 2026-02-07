/**
 * @fileoverview Smart Websites product page showcasing the 4-tier website ladder.
 * @module pages/SmartWebsites
 */

import { ArrowRight, Clock, Smartphone, CheckCircle, Zap, Globe, Lock, Calendar, MessageSquare, Phone, Star, Users, TrendingUp, HelpCircle, Check, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { SEO } from '@/components/SEO';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

/**
 * Smart Websites page component - 4-tier website ladder from $249 to $297/mo.
 */
const SmartWebsites = () => {
  /**
   * 4-tier comparison data aligned with BRD v35.1
   */
  const tiers = [
    {
      name: "Launch",
      tagline: "Get Online Fast",
      price: "$249",
      priceNote: "one-time",
      setup: "$249",
      monthly: "$0",
      hostingNote: "$149/yr after Year 1",
      features: [
        { name: "Professional 5-page website", included: true },
        { name: "Mobile responsive design", included: true },
        { name: "SSL certificate", included: true },
        { name: "Basic SEO setup", included: true },
        { name: "Contact form", included: true },
        { name: "Google Maps integration", included: true },
        { name: "GA4 analytics (view only)", included: true },
        { name: "Missed-call text-back", included: false },
        { name: "AI chat widget", included: false },
        { name: "CRM & mobile app", included: false },
        { name: "Online booking", included: false },
        { name: "Review automation", included: false },
      ],
      highlight: false,
      cta: "Get Started",
    },
    {
      name: "Capture",
      tagline: "Never Miss a Lead",
      price: "$97",
      priceNote: "/month",
      setup: "$249",
      monthly: "$97",
      hostingNote: "Hosting included",
      features: [
        { name: "Professional 5-page website", included: true },
        { name: "Mobile responsive design", included: true },
        { name: "SSL certificate", included: true },
        { name: "Basic SEO setup", included: true },
        { name: "Contact form", included: true },
        { name: "Google Maps integration", included: true },
        { name: "GA4 analytics (full access)", included: true },
        { name: "Missed-call text-back", included: true },
        { name: "AI chat widget", included: true },
        { name: "CRM & mobile app", included: true },
        { name: "Online booking", included: false },
        { name: "Review automation", included: false },
      ],
      highlight: true,
      cta: "Start Capturing Leads",
    },
    {
      name: "Convert",
      tagline: "Turn Visitors into Customers",
      price: "$197",
      priceNote: "/month",
      setup: "$497",
      monthly: "$197",
      hostingNote: "Hosting included",
      features: [
        { name: "Professional 5-page website", included: true },
        { name: "Mobile responsive design", included: true },
        { name: "SSL certificate", included: true },
        { name: "Basic SEO setup", included: true },
        { name: "Contact form", included: true },
        { name: "Google Maps integration", included: true },
        { name: "GA4 analytics (full access)", included: true },
        { name: "Missed-call text-back", included: true },
        { name: "AI chat widget", included: true },
        { name: "CRM & mobile app", included: true },
        { name: "Online booking", included: true },
        { name: "Review automation", included: true },
      ],
      highlight: false,
      cta: "Grow Your Business",
    },
    {
      name: "Scale",
      tagline: "AI-Powered Growth Engine",
      price: "$297",
      priceNote: "/month",
      setup: "$997",
      monthly: "$297",
      hostingNote: "Hosting included",
      features: [
        { name: "Professional 5-page website", included: true },
        { name: "Mobile responsive design", included: true },
        { name: "SSL certificate", included: true },
        { name: "Basic SEO setup", included: true },
        { name: "Contact form", included: true },
        { name: "Google Maps integration", included: true },
        { name: "GA4 analytics (full access)", included: true },
        { name: "Missed-call text-back", included: true },
        { name: "AI chat widget", included: true },
        { name: "CRM & mobile app", included: true },
        { name: "Online booking", included: true },
        { name: "Review automation", included: true },
        { name: "AI Voice Agent", included: true },
        { name: "Advanced automations", included: true },
        { name: "Unified inbox", included: true },
        { name: "Quarterly strategy calls", included: true },
      ],
      highlight: false,
      cta: "Unlock Full AI",
    },
  ];

  /**
   * 5-day build timeline steps
   */
  const timelineSteps = [
    { day: "Day 1", title: "Kickoff", description: "We collect your info, branding, and content preferences." },
    { day: "Day 2", title: "Design", description: "Your custom design mockup is created and shared for feedback." },
    { day: "Day 3", title: "Build", description: "We build your site with all pages and features." },
    { day: "Day 4", title: "Review", description: "You review the site and request any tweaks." },
    { day: "Day 5", title: "Launch", description: "Your site goes live. You're in business!" },
  ];

  /**
   * Portfolio previews - placeholder for real client work
   */
  const portfolioItems = [
    { title: "HVAC Contractor", industry: "Home Services", image: "/placeholder.svg" },
    { title: "Family Dental", industry: "Health & Wellness", image: "/placeholder.svg" },
    { title: "Auto Detailing", industry: "Automotive", image: "/placeholder.svg" },
    { title: "Law Firm", industry: "Professional", image: "/placeholder.svg" },
  ];

  /**
   * FAQ items covering hosting, ownership, and common questions
   */
  const faqItems = [
    {
      question: "Do I own my website?",
      answer: "Yes, 100%. Your domain, your content, your site. We don't do lock-in contracts or hostage situations. If you ever want to leave, we'll help you migrate everything."
    },
    {
      question: "What happens after the first year with Launch?",
      answer: "Launch includes 1 year of hosting free. After Year 1, hosting renews at $149/year. This covers hosting, SSL, security updates, and basic maintenance. You can cancel anytime."
    },
    {
      question: "How long does it take to build my site?",
      answer: "5 business days from kickoff to launch. We've streamlined our process so you're not waiting months. Once you provide your content and branding, we move fast."
    },
    {
      question: "Can I upgrade later?",
      answer: "Absolutely. Every Smart Website is built upgrade-ready. When you're ready for lead capture, automation, or AI, upgrading is seamless. You keep everything and just unlock more features."
    },
    {
      question: "What if I'm running ads?",
      answer: "Capture ($97/mo) is specifically designed for businesses running paid traffic. It includes missed-call text-back, AI chat widget, and CRM so you don't lose leads you paid for."
    },
    {
      question: "Do you offer refunds?",
      answer: "Yes. We offer a 30-day money-back guarantee. If you're not happy with your site within 30 days of launch, we'll refund your setup fee. No questions asked."
    },
  ];

  /**
   * Feature rows for comparison table
   */
  const featureRows = [
    "Professional website",
    "Mobile responsive",
    "SSL certificate",
    "Basic SEO",
    "Contact form",
    "GA4 analytics",
    "Missed-call text-back",
    "AI chat widget",
    "CRM & mobile app",
    "Online booking",
    "Review automation",
    "AI Voice Agent",
  ];

  const getFeatureValue = (tierIndex: number, featureIndex: number): boolean => {
    const tier = tiers[tierIndex];
    // Map feature rows to tier features
    const featureMap: { [key: number]: boolean } = {
      0: true, // Professional website - all tiers
      1: true, // Mobile responsive - all tiers
      2: true, // SSL - all tiers
      3: true, // Basic SEO - all tiers
      4: true, // Contact form - all tiers
      5: true, // GA4 - all tiers
      6: tierIndex >= 1, // Missed-call text-back - T2+
      7: tierIndex >= 1, // AI chat widget - T2+
      8: tierIndex >= 1, // CRM & mobile app - T2+
      9: tierIndex >= 2, // Online booking - T3+
      10: tierIndex >= 2, // Review automation - T3+
      11: tierIndex >= 3, // AI Voice Agent - T4 only
    };
    return featureMap[featureIndex] ?? false;
  };

  return (
    <>
      <SEO 
        title="Smart Websites | Professional Sites from $249 to $297/mo"
        description="Get a professional website built in 5 days. Choose from Launch ($249), Capture ($97/mo), Convert ($197/mo), or Scale ($297/mo). You own everything."
        canonical="/smart-websites"
      />

      {/* Hero Section - Luxury gold aesthetic matching homepage */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-background">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-card/50" />
        
        {/* Very subtle gold accent glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl" />
        
        {/* Content */}
        <div className="relative z-10 container mx-auto px-6 py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            
            {/* Headline - Single powerful statement */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6 md:mb-8 animate-fade-in tracking-tight">
              <span className="text-foreground">Websites that</span>
              <br />
              <span className="text-foreground">pay for </span>
              <span className="text-gradient">themselves.</span>
            </h1>
            
            {/* Subheadline - Clear value prop */}
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 md:mb-12 leading-relaxed animate-fade-in" style={{ animationDelay: '150ms' }}>
              From a simple $249 site to full AI automation at $297/mo. 
              Pick your tier. We build it in 5 days.
            </p>
            
            {/* CTAs - Primary gold, secondary text link */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-16 animate-fade-in" style={{ animationDelay: '300ms' }}>
              <Link 
                to="/pricing" 
                className="btn-gold btn-glow w-full sm:w-auto"
              >
                See All Pricing
              </Link>
              <Link 
                to="/contact" 
                className="group inline-flex items-center gap-2 px-4 py-3 text-foreground hover:text-accent transition-colors duration-300"
              >
                <span className="story-link">Questions? Let's Talk</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
            
            {/* Trust strip - Simple elegant line with gold accents */}
            <div className="animate-fade-in" style={{ animationDelay: '450ms' }}>
              <div className="inline-flex items-center gap-6 md:gap-8 text-sm border-t border-accent/30 pt-8">
                <span className="flex items-center gap-1.5">
                  <span className="text-accent">⚡</span>
                  <span className="text-muted-foreground">5-Day Delivery</span>
                </span>
                <span className="w-px h-4 bg-accent/30" />
                <span className="flex items-center gap-1.5">
                  <span className="text-accent">✓</span>
                  <span className="text-muted-foreground">You Own Everything</span>
                </span>
                <span className="w-px h-4 bg-accent/30" />
                <span className="flex items-center gap-1.5">
                  <span className="text-accent">↑</span>
                  <span className="text-muted-foreground">Upgrade Anytime</span>
                </span>
              </div>
            </div>
          </div>
        </div>
        
      </section>

      {/* Section Divider - Tapered gradient fade */}
      <div className="relative py-8 bg-background">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-card/30" />
      </div>

      {/* 4-Tier Comparison Table */}
      <section className="py-16 lg:py-24 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Choose Your Tier
            </h2>
            <p className="text-lg text-muted-foreground">
              Every tier includes a professional website. Higher tiers unlock more automation.
            </p>
          </div>

          {/* Mobile: Card View */}
          <div className="lg:hidden space-y-6">
            {tiers.map((tier, index) => {
              const tierId = tier.name.toLowerCase().replace(' ', '-');
              return (
              <Card key={index} id={tierId} className={`border ${tier.highlight ? 'border-accent/60 shadow-[0_0_30px_hsl(42_60%_50%/0.15)]' : 'border-border/50 hover:border-accent/30'} transition-all duration-300`}>
                <CardHeader className="text-center pb-4">
                  {tier.highlight && (
                    <Badge className="mb-2 mx-auto bg-accent text-accent-foreground">Most Popular</Badge>
                  )}
                  <CardTitle className="text-2xl">{tier.name}</CardTitle>
                  <CardDescription>{tier.tagline}</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-accent">{tier.price}</span>
                    <span className="text-muted-foreground ml-1">{tier.priceNote}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {tier.setup} setup • {tier.hostingNote}
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    {tier.features.slice(0, 12).map((feature, fIndex) => (
                      <div key={fIndex} className="flex items-center gap-2">
                        {feature.included ? (
                          <CheckCircle className="h-4 w-4 text-accent flex-shrink-0" />
                        ) : (
                          <div className="h-4 w-4 flex-shrink-0" />
                        )}
                        <span className={feature.included ? 'text-foreground' : 'text-muted-foreground/50'}>
                          {feature.name}
                        </span>
                      </div>
                    ))}
                  </div>
                  <Button asChild className="w-full" variant={tier.highlight ? "gold" : "outline"}>
                    <Link to="/pricing">{tier.cta}</Link>
                  </Button>
                </CardContent>
              </Card>
            );
            })}
          </div>

          {/* Desktop: Comparison Table */}
          <div className="hidden lg:block overflow-x-auto">
            <div className="min-w-[800px]">
              {/* Table Header - Tier names & pricing */}
              <div className="grid grid-cols-5 gap-0 mb-0">
                {/* Feature column header */}
                <div className="p-4" />
                
                {/* Tier headers */}
                {tiers.map((tier, index) => (
                  <div 
                    key={index} 
                    className={`relative text-center p-5 rounded-t-xl border-x border-t ${
                      tier.highlight 
                        ? 'border-accent/30 bg-card' 
                        : 'border-border/20 bg-card/40'
                    }`}
                  >
                    {/* Popular indicator - gold top bar */}
                    {tier.highlight && (
                      <div className="absolute -top-1 left-4 right-4">
                        <div className="h-1.5 bg-accent rounded-full" />
                        <div className="mt-3 text-[10px] font-bold tracking-[0.15em] uppercase text-accent">
                          Most Popular
                        </div>
                      </div>
                    )}
                    
                    <div className={tier.highlight ? 'pt-6' : ''}>
                      <h3 className="text-lg font-bold text-foreground">{tier.name}</h3>
                      <p className="text-xs text-muted-foreground mb-3">{tier.tagline}</p>
                      <div className="flex items-baseline justify-center gap-0.5">
                        <span className={`text-3xl font-bold ${tier.highlight ? 'text-accent' : 'text-foreground'}`}>
                          {tier.price}
                        </span>
                        <span className="text-sm text-muted-foreground">{tier.priceNote}</span>
                      </div>
                      <p className="text-[11px] text-muted-foreground mt-1">{tier.setup} setup</p>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Feature rows */}
              {featureRows.map((feature, fIndex) => (
                <div 
                  key={fIndex} 
                  className={`grid grid-cols-5 gap-0 ${fIndex % 2 === 0 ? 'bg-muted/5' : ''}`}
                >
                  <div className="p-3 pl-4 text-sm text-foreground font-medium flex items-center">
                    {feature}
                  </div>
                  {tiers.map((tier, tIndex) => (
                    <div 
                      key={tIndex} 
                      className={`p-3 flex items-center justify-center border-x ${
                        tier.highlight ? 'border-accent/30 bg-accent/[0.02]' : 'border-border/20'
                      }`}
                    >
                      {getFeatureValue(tIndex, fIndex) ? (
                        <Check className="w-4 h-4 text-accent" strokeWidth={2.5} />
                      ) : (
                        <Minus className="w-3 h-3 text-muted-foreground/25" />
                      )}
                    </div>
                  ))}
                </div>
              ))}
              
              {/* Hosting row */}
              <div className="grid grid-cols-5 gap-0 bg-muted/5">
                <div className="p-3 pl-4 text-sm text-foreground font-medium flex items-center">
                  Hosting
                </div>
                <div className="p-3 flex items-center justify-center border-x border-border/20 text-xs text-muted-foreground">
                  $149/yr after Y1
                </div>
                {[1, 2, 3].map((i) => (
                  <div 
                    key={i} 
                    className={`p-3 flex items-center justify-center border-x ${
                      i === 1 ? 'border-accent/30 bg-accent/[0.02]' : 'border-border/20'
                    } text-xs text-muted-foreground`}
                  >
                    Included
                  </div>
                ))}
              </div>
              
              {/* CTA row */}
              <div className="grid grid-cols-5 gap-0">
                <div className="p-4" />
                {tiers.map((tier, index) => (
                  <div 
                    key={index} 
                    className={`p-4 flex items-center justify-center border-x border-b rounded-b-xl ${
                      tier.highlight ? 'border-accent/30 bg-card' : 'border-border/20 bg-card/40'
                    }`}
                  >
                    <Button 
                      asChild 
                      size="sm"
                      className={tier.highlight ? 'btn-gold text-xs' : 'text-xs'}
                      variant={tier.highlight ? "default" : "outline"}
                    >
                      <Link to="/pricing">{tier.cta}</Link>
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5-Day Build Timeline */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              <Clock className="h-4 w-4 mr-1" /> 5-Day Delivery
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              From Kickoff to Launch in 5 Days
            </h2>
            <p className="text-lg text-muted-foreground">
              Not 5 weeks. Not 5 months. Your site is live and working in 5 business days.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-5 gap-4">
              {timelineSteps.map((step, index) => (
                <div key={index} className="relative">
                  <Card className="h-full text-center hover:border-primary/40 transition-colors">
                    <CardHeader className="pb-2">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-2">
                        <span className="text-primary font-bold">{index + 1}</span>
                      </div>
                      <Badge variant="outline" className="mx-auto">{step.day}</Badge>
                      <CardTitle className="text-lg mt-2">{step.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                    </CardContent>
                  </Card>
                  {index < 4 && (
                    <div className="hidden md:block absolute top-1/2 -right-2 transform -translate-y-1/2 z-10">
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Preview */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Real Sites. Real Results.
            </h2>
            <p className="text-lg text-muted-foreground">
              A preview of what we build for businesses like yours.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {portfolioItems.map((item, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow group">
                <div className="aspect-video bg-muted relative overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <Badge variant="secondary" className="text-xs">{item.industry}</Badge>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-foreground">{item.title}</h3>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button asChild variant="outline">
              <Link to="/contact">
                Want to See More? Let's Talk
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Warmy Booster Section */}
      <section id="warmy" className="py-16 lg:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <Badge variant="secondary" className="mb-4">
                  <TrendingUp className="h-4 w-4 mr-1" /> Warmy Booster Add-On
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Get Your Emails Into the Inbox
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Running email campaigns? Warmy Booster warms up your domain so your messages 
                  land in the inbox—not the spam folder. Bundled free with Capture or available 
                  as a $49/mo add-on.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-foreground">Automated domain warm-up</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-foreground">Deliverability monitoring</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-foreground">Spam score alerts</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-foreground">Free with Capture tier</span>
                  </li>
                </ul>
                <div className="flex flex-wrap gap-3">
                  <Button asChild variant="outline">
                    <a href="/pricing#warmy">
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>
              <div className="bg-gradient-to-br from-accent/10 to-primary/10 rounded-2xl p-8 text-center">
                <div className="text-5xl font-bold text-foreground mb-2">$49</div>
                <div className="text-muted-foreground mb-4">/month add-on</div>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-sm text-primary font-medium">
                  <Star className="h-4 w-4" />
                  FREE with Capture
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Upgrade Teaser */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <Badge variant="secondary" className="mb-4">
                  <Zap className="h-4 w-4 mr-1" /> Add AI When Ready
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Every Site is AI-Ready
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Your Smart Website is built with AI under the hood. When you're ready to stop missing calls 
                  and automate bookings, upgrading to AI Employee is seamless.
                </p>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-primary" />
                    <span className="text-foreground">AI answers calls 24/7</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MessageSquare className="h-5 w-5 text-primary" />
                    <span className="text-foreground">Missed-call text-back recovers leads</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-primary" />
                    <span className="text-foreground">Automated booking while you sleep</span>
                  </div>
                </div>
                <Button asChild>
                  <Link to="/let-ai-handle-it">
                    Learn About AI Employee
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Card className="text-center p-6">
                  <div className="text-3xl font-bold text-primary mb-1">24/7</div>
                  <div className="text-sm text-muted-foreground">AI Availability</div>
                </Card>
                <Card className="text-center p-6">
                  <div className="text-3xl font-bold text-primary mb-1">30%</div>
                  <div className="text-sm text-muted-foreground">More Leads Captured</div>
                </Card>
                <Card className="text-center p-6">
                  <div className="text-3xl font-bold text-primary mb-1">5min</div>
                  <div className="text-sm text-muted-foreground">Avg Response Time</div>
                </Card>
                <Card className="text-center p-6">
                  <div className="text-3xl font-bold text-primary mb-1">$0</div>
                  <div className="text-sm text-muted-foreground">Missed Call Cost</div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-4">
                <HelpCircle className="h-4 w-4 mr-1" /> FAQ
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Common Questions
              </h2>
            </div>

            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 lg:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Get Your Smart Website?
            </h2>
            <p className="text-xl opacity-90 mb-8">
              5 days to launch. Starting at $249. Upgrade-ready from day one.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary" className="text-lg px-8 py-6">
                <Link to="/pricing">
                  See All Pricing
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg px-8 py-6 bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                <Link to="/contact">
                  Talk to Us First
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SmartWebsites;
