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
  AlertCircle,
  ChevronDown
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

      {/* Hero Section - Compact */}
      <section className="relative pt-20 pb-10 md:pt-24 md:pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-accent/10 via-accent/5 to-background" />
        
        <div className="container relative z-10">
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-center">
            {/* Text content */}
            <div className="text-center lg:text-left order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 mb-4 text-xs">
                <Mail className="w-3.5 h-3.5 text-accent" />
                <span className="font-medium text-accent">Powered by Warmy.io</span>
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
                Your Emails Deserve to Be{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent/70">Seen</span>
              </h1>
              
              <p className="text-base text-muted-foreground mb-6 max-w-lg mx-auto lg:mx-0">
                Get <strong>95%+ inbox placement</strong> with AI-powered warm-up and monitoring.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <CTAButton to="/pricing#warmy" defaultText="Get Warmy — $49/mo" hoverText="Boost Deliverability!" />
                <Link to="/pricing#smart-lead">
                  <Button variant="outline" size="default" className="gap-2 w-full sm:w-auto text-sm">
                    <CheckCircle className="w-4 h-4" />
                    Free with Smart Lead
                  </Button>
                </Link>
              </div>
            </div>

            {/* Dashboard */}
            <div className="order-1 lg:order-2">
              <DeliverabilityScoreDashboard />
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof - Inline compact */}
      <section className="py-3 border-y border-border/30 bg-muted/20">
        <div className="container">
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 text-xs">
            <div className="flex items-center gap-1.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-accent text-accent" />
              ))}
              <span className="text-muted-foreground ml-1">4.9/5</span>
            </div>
            <span className="text-muted-foreground"><strong>10K+</strong> domains</span>
            <span className="text-muted-foreground"><strong>500M+</strong> emails</span>
            <span className="text-muted-foreground"><strong>95%+</strong> inbox rate</span>
          </div>
        </div>
      </section>

      {/* Problem Section - Compact funnel */}
      <section className="py-10 md:py-12 bg-[#0a0a0a]">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl md:text-2xl font-bold text-white text-center mb-6">
              Where Are Your Emails <span className="text-red-500">Really</span> Going?
            </h2>

            {/* Compact funnel - horizontal on mobile too */}
            <div className="grid grid-cols-4 gap-2 md:gap-3 mb-6">
              <div className="bg-orange-500/20 border border-orange-500/30 rounded-lg p-3 text-center">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-orange-500 mx-auto mb-2 flex items-center justify-center">
                  <Mail className="w-4 h-4 md:w-5 md:h-5 text-white" />
                </div>
                <p className="text-lg md:text-xl font-bold text-white">1,000</p>
                <p className="text-[10px] md:text-xs text-zinc-500">Sent</p>
              </div>
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-center">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-red-500/30 mx-auto mb-2 flex items-center justify-center">
                  <Shield className="w-4 h-4 md:w-5 md:h-5 text-red-500" />
                </div>
                <p className="text-lg md:text-xl font-bold text-red-500">-210</p>
                <p className="text-[10px] md:text-xs text-zinc-500">Blocked</p>
              </div>
              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3 text-center">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-yellow-500/30 mx-auto mb-2 flex items-center justify-center">
                  <AlertCircle className="w-4 h-4 md:w-5 md:h-5 text-yellow-500" />
                </div>
                <p className="text-lg md:text-xl font-bold text-yellow-500">-320</p>
                <p className="text-[10px] md:text-xs text-zinc-500">Spam</p>
              </div>
              <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3 text-center">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-green-500/30 mx-auto mb-2 flex items-center justify-center">
                  <Inbox className="w-4 h-4 md:w-5 md:h-5 text-green-500" />
                </div>
                <p className="text-lg md:text-xl font-bold text-green-500">470</p>
                <p className="text-[10px] md:text-xs text-zinc-500">Inbox</p>
              </div>
            </div>

            {/* Comparison - Side by side compact */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-red-500/5 border border-red-500/20 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <X className="w-4 h-4 text-red-500" />
                  <span className="text-sm font-medium text-white">Without Warm-Up</span>
                </div>
                <div className="space-y-1.5 text-xs text-zinc-400">
                  {['Spam filters block you', 'Reputation tanks', 'Follow-ups unseen'].map((item, i) => (
                    <div key={i} className="flex items-center gap-1.5">
                      <X className="w-3 h-3 text-red-500 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-sm font-medium text-white">With Warmy</span>
                </div>
                <div className="space-y-1.5 text-xs text-zinc-300">
                  {['95%+ inbox rate', 'Auto reputation build', 'Every email lands'].map((item, i) => (
                    <div key={i} className="flex items-center gap-1.5">
                      <Check className="w-3 h-3 text-green-500 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Features - Compact */}
      <section className="py-10 md:py-14">
        <div className="container">
          <div className="text-center mb-8">
            <h2 className="text-xl md:text-2xl font-bold mb-2">
              AI-Powered Deliverability <span className="text-accent">Protection</span>
            </h2>
            <p className="text-sm text-muted-foreground max-w-lg mx-auto">
              Warm your domain, test placement, and monitor health — automatically.
            </p>
          </div>

          <div className="space-y-10 md:space-y-12">
            {coreFeatures.map((feature, index) => (
              <div 
                key={index}
                className={`grid lg:grid-cols-2 gap-6 items-center ${index % 2 === 1 ? '' : ''}`}
              >
                <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <feature.Visual />
                </div>
                <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-accent/10">
                      <feature.icon className="w-5 h-5 text-accent" />
                    </div>
                    <h3 className="text-lg md:text-xl font-bold">{feature.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{feature.description}</p>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-muted text-xs font-medium">
                    <Activity className="w-3 h-3 text-accent" />
                    {feature.stats}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integration + Benefits - Super compact */}
      <section className="py-8 bg-muted/30">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="flex flex-wrap items-center justify-center gap-3 mb-4">
              {integrations.map((integration, index) => (
                <div key={index} className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-card border border-border/50 text-xs">
                  <integration.icon className="w-4 h-4 text-accent" />
                  <span>{integration.name}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-1 text-xs text-muted-foreground">
              {benefits.slice(0, 4).map((benefit, index) => (
                <span key={index} className="flex items-center gap-1">
                  <Check className="w-3 h-3 text-accent" />
                  {benefit.text}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials - Compact inline */}
      <section className="py-10">
        <div className="container">
          <h2 className="text-lg font-bold text-center mb-6">What Clients Say</h2>
          <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-muted/30 rounded-lg p-4">
                <div className="flex gap-0.5 mb-2">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} className="w-3 h-3 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-sm italic mb-3">"{t.quote}"</p>
                <div className="flex items-center gap-2 text-xs">
                  <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold text-[10px]">
                    {t.author[0]}
                  </div>
                  <span className="font-medium">{t.author}</span>
                  <span className="text-muted-foreground">• {t.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing - Compact cards */}
      <section className="py-10 bg-muted/20">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-xl md:text-2xl font-bold text-center mb-6">Simple Pricing</h2>
            
            <div className="grid md:grid-cols-2 gap-4">
              {/* Standalone */}
              <div className="bg-card border border-border rounded-lg p-5">
                <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Standalone</p>
                <div className="flex items-baseline gap-1 mb-3">
                  <span className="text-3xl font-bold">$49</span>
                  <span className="text-muted-foreground text-sm">/mo</span>
                </div>
                <ul className="space-y-2 mb-4 text-sm">
                  {['AI Warm-Up', 'Inbox Testing', 'Domain Monitoring', 'Analytics'].map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
                <CTAButton to="/pricing#warmy" defaultText="Get Started" hoverText="Go!" className="w-full" />
              </div>

              {/* Bundle */}
              <div className="bg-card border-2 border-accent rounded-lg p-5 relative">
                <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground px-3 py-0.5 rounded-full text-xs font-medium">
                  Best Value
                </span>
                <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">With Smart Lead</p>
                <div className="flex items-baseline gap-1 mb-3">
                  <span className="text-3xl font-bold text-accent">FREE</span>
                </div>
                <ul className="space-y-2 mb-4 text-sm">
                  {['Everything above', '+ Website', '+ CRM', '+ AI Chat', '+ Text-Back'].map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
                <CTAButton to="/pricing#smart-lead" defaultText="Get Smart Lead" hoverText="Save $49!" className="w-full" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ - Already compact */}
      <section className="py-8">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-lg font-bold text-center mb-4">FAQ</h2>
            <div className="grid gap-1">
              {faqItems.map((item, index) => (
                <details key={index} className="group bg-muted/30 rounded-lg">
                  <summary className="flex items-center justify-between p-3 cursor-pointer hover:bg-muted/50 transition-colors list-none text-sm">
                    <span className="font-medium">{item.question}</span>
                    <ChevronDown className="w-4 h-4 text-muted-foreground group-open:rotate-180 transition-transform shrink-0 ml-3" />
                  </summary>
                  <div className="px-3 pb-3 text-xs text-muted-foreground">{item.answer}</div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA - Compact */}
      <section className="py-10 bg-gradient-to-t from-accent/10 to-background">
        <div className="container">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-xl md:text-2xl font-bold mb-3">Stop Losing Leads to Spam</h2>
            <p className="text-sm text-muted-foreground mb-5">
              Join 10,000+ businesses with 95%+ inbox placement.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <CTAButton to="/pricing" defaultText="Start Free Trial" hoverText="14 Days Free!" />
              <Link to="/contact">
                <Button variant="outline" size="default" className="gap-2 w-full sm:w-auto text-sm">
                  Talk to an Expert
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
