/**
 * @fileoverview Warmy Email Deliverability Full Service Page
 * @description Premium service page for email deliverability solution per BRD v35.3
 * 
 * @module pages/WarmyEmailDeliverability
 * 
 * Features:
 * - AI-Powered Warm-Up with intelligent reply patterns
 * - Inbox Placement Testing (35 seed email providers)
 * - Domain Health Monitoring (SPF/DKIM/DMARC)
 * - Real-time Deliverability Analytics
 * 
 * Pricing: $49/mo standalone OR free with Smart Lead ($97/mo)
 * 
 * SEO: Optimized for "email deliverability", "email warm-up", "inbox placement"
 * AEO: FAQ schema for voice search and AI answer engines
 * 
 * Visualizations: Pure CSS/SVG components for crisp, professional appearance
 */

import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/SEO';
import { CTAButton } from '@/components/CTAButton';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Mail, 
  Shield, 
  BarChart3, 
  Zap, 
  CheckCircle, 
  AlertTriangle,
  TrendingUp,
  Globe,
  Lock,
  Inbox,
  Activity,
  Server,
  ArrowRight,
  Star,
  Check,
  X,
  AlertCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { 
  DeliverabilityScoreDashboard,
  WarmUpProgressDashboard,
  InboxPlacementDashboard,
  DomainHealthDashboard
} from '@/components/warmy/RealisticDashboards';

// ============================================
// DATA DEFINITIONS
// ============================================

/**
 * Core features data
 */
const coreFeatures = [
  {
    icon: Zap,
    title: 'AI-Powered Warm-Up',
    description: 'Gradual sending volume increases with smart reply patterns that mimic real human behavior. Our AI adapts to your domain reputation in real-time.',
    stats: '2-4 weeks to optimal deliverability',
    Visual: WarmUpProgressDashboard,
  },
  {
    icon: Inbox,
    title: 'Inbox Placement Testing',
    description: '35 seed email providers including Gmail, Outlook, Yahoo, and corporate domains. Real-time inbox, spam, and missing placement reporting.',
    stats: '35+ email provider coverage',
    Visual: InboxPlacementDashboard,
  },
  {
    icon: Shield,
    title: 'Domain Health Monitoring',
    description: 'SPF, DKIM, DMARC configuration validation with instant alerts when issues arise. Blacklist monitoring across 100+ databases.',
    stats: '100+ blacklist databases monitored',
    Visual: DomainHealthDashboard,
  },
  {
    icon: BarChart3,
    title: 'Deliverability Analytics',
    description: 'Sender score tracking, reputation trends, and detailed performance reports. Know exactly where your emails land.',
    stats: 'Real-time score updates',
    Visual: DeliverabilityScoreDashboard,
  },
];

/**
 * Benefits list with icons
 */
const benefits = [
  { text: 'Achieve 95%+ inbox placement rate', icon: TrendingUp },
  { text: 'Automatic volume reduction when issues detected', icon: Activity },
  { text: 'Works with GoHighLevel, any SMTP provider', icon: Globe },
  { text: 'No technical setup required', icon: Zap },
  { text: 'Real-time deliverability alerts', icon: Mail },
  { text: 'Blacklist monitoring & removal assistance', icon: Shield },
];

/**
 * Problem stats for the urgency section
 */
const problemStats = [
  { value: '21%', label: 'of legitimate emails never reach the inbox', color: 'text-destructive' },
  { value: '$14.5B', label: 'lost annually to email deliverability issues', color: 'text-destructive' },
  { value: '85%', label: 'of cold emails land in spam folders', color: 'text-destructive' },
];

/**
 * Integration logos/platforms
 */
const integrations = [
  { name: 'GoHighLevel', icon: Lock },
  { name: 'Gmail / GSuite', icon: Mail },
  { name: 'Outlook / O365', icon: Server },
  { name: 'Any SMTP', icon: Globe },
];

/**
 * FAQ items for SEO/AEO - structured for voice search
 */
const faqItems = [
  {
    question: 'How long does email warm-up take?',
    answer: 'Most domains reach optimal deliverability within 2-4 weeks. New domains may take longer. Our AI adjusts the pace based on your domain reputation, ensuring safe and effective warm-up.',
  },
  {
    question: 'How many emails can I send with Warmy?',
    answer: 'Warmy handles warm-up emails automatically. Your regular sending limits depend on your email provider. We optimize delivery and reputation, not volume limits.',
  },
  {
    question: 'Does Warmy work with GoHighLevel?',
    answer: 'Yes! Warmy integrates seamlessly with GoHighLevel (GHL) and any SMTP-compatible email system including Gmail, Outlook, and custom SMTP servers.',
  },
  {
    question: 'What if I already have email deliverability issues?',
    answer: 'Warmy can help recover damaged sender reputation. The warm-up process gradually rebuilds trust with email providers while our monitoring prevents future issues.',
  },
  {
    question: 'Is Warmy included with Smart Lead?',
    answer: 'Yes! Warmy Email Deliverability is included free with our Smart Lead tier ($97/month). Standalone pricing is $49/month for businesses with existing websites.',
  },
  {
    question: 'What email providers does inbox testing cover?',
    answer: 'Our inbox placement testing covers 35+ email providers including Gmail, Outlook, Yahoo, AOL, iCloud, and major corporate email systems.',
  },
];

/**
 * Testimonials for social proof
 */
const testimonials = [
  {
    quote: "Our email open rates jumped from 12% to 38% after using Warmy for just 3 weeks. Game changer for our lead nurturing.",
    author: "Sarah M.",
    role: "Marketing Director",
    rating: 5,
  },
  {
    quote: "We were losing deals because our follow-ups were landing in spam. Warmy fixed that completely.",
    author: "Michael T.",
    role: "Sales Manager",
    rating: 5,
  },
];

// ============================================
// MAIN COMPONENT
// ============================================

/**
 * WarmyEmailDeliverability - Premium service page for email deliverability
 * 
 * Mobile-first, animation-enhanced, SEO/AEO optimized
 * Uses CSS/SVG visualizations for crisp, professional appearance
 */
export default function WarmyEmailDeliverability() {
  return (
    <Layout>
      <SEO 
        title="Email Deliverability Service | AI Email Warm-Up & Inbox Testing"
        description="Stop landing in spam. AI-powered email warm-up with inbox placement testing across 35+ providers and domain health monitoring. $49/mo or free with Smart Lead."
        canonical="/warmy-email-deliverability"
      />

      {/* JSON-LD Schema for FAQ - AEO optimization */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqItems.map(item => ({
          "@type": "Question",
          "name": item.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": item.answer
          }
        }))
      })}} />

      {/* Custom CSS for animations */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes gaugeAnimate {
          from { stroke-dashoffset: 283; }
          to { stroke-dashoffset: 14; }
        }
        @keyframes barGrow {
          from { transform: scaleY(0); }
          to { transform: scaleY(1); }
        }
        .animate-bar { transform-origin: bottom; }
      `}} />

      {/* Hero Section - Mobile-first with animated gauge */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-accent/10 via-accent/5 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent/20 via-transparent to-transparent opacity-60" />
        
        {/* Floating particles animation */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-accent/40 rounded-full animate-pulse" />
          <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-accent/30 rounded-full animate-pulse" style={{ animationDelay: '300ms' }} />
          <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-accent/50 rounded-full animate-pulse" style={{ animationDelay: '500ms' }} />
        </div>

        <div className="container relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Text content - mobile first */}
            <div className="text-center lg:text-left order-2 lg:order-1">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6 animate-fade-in">
                <Mail className="w-4 h-4 text-accent" />
                <span className="text-sm font-medium text-accent">Powered by Warmy.io</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
                Your Emails Deserve<br className="hidden sm:block" /> to Be{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent/70">
                  Seen
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0 animate-fade-in">
                If your emails land in spam, your leads never see them. Get <strong>95%+ inbox 
                placement</strong> with AI-powered warm-up and monitoring.
              </p>

              {/* CTA buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in">
                <CTAButton to="/pricing#warmy" defaultText="Get Warmy — $49/mo" hoverText="Boost Deliverability!" />
                <Link to="/pricing#smart-lead">
                  <Button variant="outline" size="lg" className="gap-2 w-full sm:w-auto group">
                    <CheckCircle className="w-4 h-4 group-hover:text-accent transition-colors" />
                    Free with Smart Lead
                  </Button>
                </Link>
              </div>
            </div>

            {/* Hero visualization - realistic dashboard */}
            <div className="order-1 lg:order-2 animate-fade-in">
              <DeliverabilityScoreDashboard />
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Bar */}
      <section className="py-6 border-y border-border/50 bg-muted/30">
        <div className="container">
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12 text-center">
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">4.9/5 Rating</span>
            </div>
            <div className="hidden md:block w-px h-6 bg-border" />
            <p className="text-sm"><strong>10,000+</strong> domains warmed</p>
            <div className="hidden md:block w-px h-6 bg-border" />
            <p className="text-sm"><strong>500M+</strong> emails delivered</p>
            <div className="hidden md:block w-px h-6 bg-border" />
            <p className="text-sm"><strong>95%+</strong> avg inbox rate</p>
          </div>
        </div>
      </section>

      {/* Problem Section - Dramatic Email Journey Visualization */}
      <section className="py-16 md:py-24 bg-[#0a0a0a] relative overflow-hidden">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        
        <div className="container relative z-10">
          <div className="max-w-5xl mx-auto">
            {/* Section header */}
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Where Are Your Emails <span className="text-red-500">Really</span> Going?
              </h2>
              <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
                Right now, a shocking percentage of your outreach never reaches human eyes.
              </p>
            </div>

            {/* Animated Email Journey Funnel */}
            <div className="relative bg-white/5 rounded-2xl border border-white/10 p-6 md:p-10 mb-10">
              {/* Journey visualization */}
              <div className="flex flex-col md:flex-row items-stretch gap-4 md:gap-0">
                {/* Step 1: You Send */}
                <div className="flex-1 relative">
                  <div className="bg-orange-500/20 border border-orange-500/30 rounded-xl p-6 text-center h-full">
                    <div className="w-16 h-16 rounded-full bg-orange-500 mx-auto mb-4 flex items-center justify-center">
                      <Mail className="w-8 h-8 text-white" />
                    </div>
                    <p className="text-2xl font-bold text-white mb-1">1,000</p>
                    <p className="text-sm text-zinc-400">Emails Sent</p>
                    <p className="text-xs text-orange-500 mt-2 font-medium">Your Campaign</p>
                  </div>
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <ArrowRight className="w-8 h-8 text-zinc-600" />
                  </div>
                </div>

                {/* Step 2: Spam Filter */}
                <div className="flex-1 relative">
                  <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 text-center h-full">
                    <div className="w-16 h-16 rounded-full bg-red-500/20 mx-auto mb-4 flex items-center justify-center relative">
                      <Shield className="w-8 h-8 text-red-500" />
                      <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-red-500 flex items-center justify-center">
                        <X className="w-4 h-4 text-white" />
                      </div>
                    </div>
                    <p className="text-2xl font-bold text-red-500 mb-1">-210</p>
                    <p className="text-sm text-zinc-400">Blocked by Spam Filters</p>
                    <p className="text-xs text-red-400 mt-2">21% Never Arrive</p>
                  </div>
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <ArrowRight className="w-8 h-8 text-zinc-600" />
                  </div>
                </div>

                {/* Step 3: Spam Folder */}
                <div className="flex-1 relative">
                  <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-6 text-center h-full">
                    <div className="w-16 h-16 rounded-full bg-yellow-500/20 mx-auto mb-4 flex items-center justify-center">
                      <AlertCircle className="w-8 h-8 text-yellow-500" />
                    </div>
                    <p className="text-2xl font-bold text-yellow-500 mb-1">-320</p>
                    <p className="text-sm text-zinc-400">Land in Spam/Junk</p>
                    <p className="text-xs text-yellow-400 mt-2">32% Unseen</p>
                  </div>
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <ArrowRight className="w-8 h-8 text-zinc-600" />
                  </div>
                </div>

                {/* Step 4: Actually Seen */}
                <div className="flex-1">
                  <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-6 text-center h-full">
                    <div className="w-16 h-16 rounded-full bg-green-500/20 mx-auto mb-4 flex items-center justify-center">
                      <Inbox className="w-8 h-8 text-green-500" />
                    </div>
                    <p className="text-2xl font-bold text-green-500 mb-1">470</p>
                    <p className="text-sm text-zinc-400">Actually Reach Inbox</p>
                    <p className="text-xs text-green-400 mt-2">47% Survive</p>
                  </div>
                </div>
              </div>

              {/* Bottom stat highlight */}
              <div className="mt-8 pt-6 border-t border-white/10 text-center">
                <p className="text-lg text-zinc-400">
                  Without proper domain warm-up, <span className="text-red-500 font-bold text-2xl">over half</span> of your emails never get a chance to convert.
                </p>
              </div>
            </div>

            {/* Comparison: Without vs With Warmy */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Without Warmy */}
              <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-red-500/20">
                    <X className="w-5 h-5 text-red-500" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">Without Proper Warm-Up</h3>
                </div>
                <div className="space-y-3">
                  {[
                    'Cold emails trigger spam filters instantly',
                    'Domain reputation tanks after first campaign',
                    'Follow-up sequences never seen',
                    'Ad spend wasted on leads you can\'t reach',
                    'Competitors close deals you started'
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-zinc-400">
                      <X className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* With Warmy */}
              <div className="bg-green-500/5 border border-green-500/20 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-green-500/20">
                    <Check className="w-5 h-5 text-green-500" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">With Warmy Protection</h3>
                </div>
                <div className="space-y-3">
                  {[
                    '95%+ inbox placement from day one',
                    'Domain reputation builds automatically',
                    'Every follow-up lands where it should',
                    'Marketing ROI actually realized',
                    'You close deals, not spam folders'
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-zinc-300">
                      <Check className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Features - Visual showcase with CSS components */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl md:text-4xl font-bold mb-4">
              AI-Powered Deliverability{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent/70">
                Protection
              </span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Warmy uses artificial intelligence to warm your domain, test placement, 
              and monitor health — automatically.
            </p>
          </div>

          <div className="space-y-16 md:space-y-24">
            {coreFeatures.map((feature, index) => (
              <div 
                key={index}
                className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-center ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Visualization */}
                <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <feature.Visual />
                </div>

                {/* Content */}
                <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <div className="p-3 rounded-xl bg-accent/10 w-fit mb-4">
                    <feature.icon className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-4">{feature.title}</h3>
                  <p className="text-lg text-muted-foreground mb-4">{feature.description}</p>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted text-sm font-medium">
                    <Activity className="w-4 h-4 text-accent" />
                    {feature.stats}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integration Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-6">
                  Works With Your{' '}
                  <span className="text-accent">Existing Tools</span>
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Warmy integrates seamlessly with GoHighLevel and any SMTP-compatible 
                  email system. No migration required — just better deliverability.
                </p>

                <div className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <div 
                      key={index} 
                      className="flex items-center gap-3 group"
                    >
                      <div className="p-1.5 rounded-lg bg-accent/10 group-hover:bg-accent/20 transition-colors">
                        <benefit.icon className="w-4 h-4 text-accent" />
                      </div>
                      <span>{benefit.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {integrations.map((integration, index) => (
                  <Card 
                    key={index} 
                    className="bg-card hover:border-accent/50 transition-all hover:shadow-lg hover:-translate-y-1"
                  >
                    <CardContent className="pt-6 flex flex-col items-center text-center">
                      <div className="p-3 rounded-full bg-accent/10 mb-3">
                        <integration.icon className="w-6 h-6 text-accent" />
                      </div>
                      <p className="font-medium">{integration.name}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
            What Our Clients Say
          </h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card 
                key={index}
                className="bg-gradient-to-br from-card to-muted/30 border-accent/10 hover:border-accent/30 transition-colors"
              >
                <CardContent className="pt-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                    ))}
                  </div>
                  <p className="text-lg mb-4 italic">"{testimonial.quote}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                      <span className="font-bold text-accent">{testimonial.author[0]}</span>
                    </div>
                    <div>
                      <p className="font-semibold">{testimonial.author}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-muted/30 to-background">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
              <p className="text-lg md:text-xl text-muted-foreground">
                No hidden fees. No long-term contracts. Cancel anytime.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Standalone Pricing */}
              <Card className="border-2 hover:border-accent/50 transition-colors group">
                <CardContent className="pt-8 pb-6">
                  <div className="text-center mb-6">
                    <p className="text-sm uppercase tracking-wider text-muted-foreground mb-2">Standalone</p>
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-4xl md:text-5xl font-bold">$49</span>
                      <span className="text-muted-foreground">/month</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">For businesses with existing websites</p>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {['AI-Powered Warm-Up', '35-Provider Inbox Testing', 'Domain Health Monitoring', 'Deliverability Analytics'].map((item, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-accent shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <CTAButton 
                    to="/pricing#warmy" 
                    defaultText="Get Started" 
                    hoverText="Boost Now!" 
                    className="w-full"
                  />
                </CardContent>
              </Card>

              {/* Bundled with Smart Lead */}
              <Card className="border-2 border-accent relative shadow-xl shadow-accent/10">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-accent text-accent-foreground px-4 py-1 rounded-full text-sm font-medium shadow-lg">
                    Best Value
                  </span>
                </div>
                <CardContent className="pt-8 pb-6">
                  <div className="text-center mb-6">
                    <p className="text-sm uppercase tracking-wider text-muted-foreground mb-2">With Smart Lead</p>
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-4xl md:text-5xl font-bold text-accent">FREE</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">Included with Smart Lead ($97/mo)</p>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {[
                      'Everything in Standalone',
                      '+ Professional Website',
                      '+ CRM & Contact Management',
                      '+ AI Chat Widget',
                      '+ Missed Call Text-Back'
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-accent shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <CTAButton 
                    to="/pricing#smart-lead" 
                    defaultText="Get Smart Lead" 
                    hoverText="Save $49/mo!" 
                    className="w-full"
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section - AEO optimized */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-center text-muted-foreground mb-12">
              Everything you need to know about email deliverability
            </p>

            <div className="space-y-4">
              {faqItems.map((item, index) => (
                <Card 
                  key={index} 
                  className="overflow-hidden hover:border-accent/50 transition-colors"
                >
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-semibold mb-2 flex items-start gap-2">
                      <span className="text-accent shrink-0">Q:</span>
                      {item.question}
                    </h3>
                    <p className="text-muted-foreground pl-6">{item.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-t from-accent/10 via-accent/5 to-background">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-4xl font-bold mb-6">
              Stop Losing Leads to Spam Folders
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              Join 10,000+ businesses that trust Warmy to ensure their emails reach the inbox.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <CTAButton 
                to="/pricing" 
                defaultText="Start Free Trial" 
                hoverText="14-Day Free Trial!" 
              />
              <Link to="/contact">
                <Button variant="outline" size="lg" className="gap-2 w-full sm:w-auto">
                  Talk to an Expert
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>

            <p className="text-sm text-muted-foreground mt-6">
              No credit card required • Cancel anytime • 14-day free trial
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
