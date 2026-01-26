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

      {/* Hero Section - Ultra compact */}
      <section className="relative pt-16 pb-6 md:pt-20 md:pb-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-accent/10 via-accent/5 to-background" />
        
        <div className="container relative z-10">
          <div className="grid lg:grid-cols-2 gap-4 lg:gap-6 items-center">
            <div className="text-center lg:text-left order-2 lg:order-1">
              <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-accent/10 border border-accent/20 mb-3 text-[11px]">
                <Mail className="w-3 h-3 text-accent" />
                <span className="font-medium text-accent">Warmy.io</span>
              </div>

              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">
                Your Emails Deserve to Be <span className="text-accent">Seen</span>
              </h1>
              
              <p className="text-sm text-muted-foreground mb-4 max-w-md mx-auto lg:mx-0">
                <strong>95%+ inbox placement</strong> with AI warm-up and monitoring.
              </p>

              <div className="flex flex-col sm:flex-row gap-2 justify-center lg:justify-start">
                <CTAButton to="/pricing#warmy" defaultText="Get Warmy — $49/mo" hoverText="Boost Deliverability!" />
                <Link to="/pricing#smart-lead">
                  <Button variant="outline" size="sm" className="gap-1.5 w-full sm:w-auto text-xs">
                    <CheckCircle className="w-3 h-3" />Free with Smart Lead
                  </Button>
                </Link>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <DeliverabilityScoreDashboard />
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof - Single line */}
      <section className="py-2 border-y border-border/30 bg-muted/20">
        <div className="container">
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-6 text-[11px]">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-2.5 h-2.5 fill-accent text-accent" />)}
              <span className="text-muted-foreground ml-0.5">4.9</span>
            </div>
            <span className="text-muted-foreground"><strong>10K+</strong> domains</span>
            <span className="text-muted-foreground"><strong>500M+</strong> emails</span>
            <span className="text-muted-foreground"><strong>95%+</strong> inbox</span>
          </div>
        </div>
      </section>

      {/* Problem Section - Ultra compact */}
      <section className="py-6 md:py-8 bg-[#0a0a0a]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-lg md:text-xl font-bold text-white text-center mb-4">
              Where Are Your Emails <span className="text-red-500">Really</span> Going?
            </h2>

            {/* Compact funnel */}
            <div className="grid grid-cols-4 gap-1.5 md:gap-2 mb-4">
              {[
                { icon: Mail, label: 'Sent', value: '1,000', color: 'orange' },
                { icon: Shield, label: 'Blocked', value: '-210', color: 'red' },
                { icon: AlertCircle, label: 'Spam', value: '-320', color: 'yellow' },
                { icon: Inbox, label: 'Inbox', value: '470', color: 'green' },
              ].map((item) => (
                <div key={item.label} className={`bg-${item.color}-500/10 border border-${item.color}-500/20 rounded-md p-2 text-center`}>
                  <div className={`w-6 h-6 rounded-full bg-${item.color}-500/30 mx-auto mb-1 flex items-center justify-center`}>
                    <item.icon className={`w-3 h-3 text-${item.color}-500`} />
                  </div>
                  <p className={`text-sm font-bold text-${item.color === 'orange' ? 'white' : item.color + '-500'}`}>{item.value}</p>
                  <p className="text-[9px] text-zinc-500">{item.label}</p>
                </div>
              ))}
            </div>

            {/* Comparison - Ultra compact */}
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-red-500/5 border border-red-500/20 rounded-md p-2.5">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <X className="w-3 h-3 text-red-500" />
                  <span className="text-xs font-medium text-white">Without</span>
                </div>
                <div className="space-y-0.5 text-[10px] text-zinc-400">
                  {['Spam blocks you', 'Rep tanks', 'Lost leads'].map((t, i) => (
                    <div key={i} className="flex items-center gap-1"><X className="w-2.5 h-2.5 text-red-500" />{t}</div>
                  ))}
                </div>
              </div>
              <div className="bg-green-500/5 border border-green-500/20 rounded-md p-2.5">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <Check className="w-3 h-3 text-green-500" />
                  <span className="text-xs font-medium text-white">With Warmy</span>
                </div>
                <div className="space-y-0.5 text-[10px] text-zinc-300">
                  {['95%+ inbox', 'Auto warmup', 'Every lead'].map((t, i) => (
                    <div key={i} className="flex items-center gap-1"><Check className="w-2.5 h-2.5 text-green-500" />{t}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Features - Ultra compact */}
      <section className="py-8 md:py-10">
        <div className="container">
          <div className="text-center mb-6">
            <h2 className="text-lg md:text-xl font-bold mb-1">
              AI-Powered <span className="text-accent">Protection</span>
            </h2>
            <p className="text-xs text-muted-foreground">Warm, test, monitor — automatically.</p>
          </div>

          <div className="space-y-6">
            {coreFeatures.map((feature, index) => (
              <div key={index} className={`grid lg:grid-cols-2 gap-4 items-center`}>
                <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <feature.Visual />
                </div>
                <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-1.5 rounded-md bg-accent/10">
                      <feature.icon className="w-4 h-4 text-accent" />
                    </div>
                    <h3 className="text-base font-bold">{feature.title}</h3>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">{feature.description}</p>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-muted text-[10px]">
                    <Activity className="w-2.5 h-2.5 text-accent" />{feature.stats}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integration + Benefits - Ultra compact */}
      <section className="py-4 bg-muted/30">
        <div className="container">
          <div className="max-w-2xl mx-auto flex flex-wrap items-center justify-center gap-2">
            {integrations.map((i, idx) => (
              <div key={idx} className="flex items-center gap-1 px-2 py-1 rounded bg-card border border-border/50 text-[10px]">
                <i.icon className="w-3 h-3 text-accent" />{i.name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials - Ultra compact */}
      <section className="py-6">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-3 max-w-2xl mx-auto">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-muted/30 rounded-md p-3">
                <div className="flex gap-0.5 mb-1">
                  {[...Array(t.rating)].map((_, j) => <Star key={j} className="w-2.5 h-2.5 fill-accent text-accent" />)}
                </div>
                <p className="text-xs italic mb-2">"{t.quote}"</p>
                <div className="flex items-center gap-1.5 text-[10px]">
                  <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold text-[9px]">{t.author[0]}</div>
                  <span className="font-medium">{t.author}</span>
                  <span className="text-muted-foreground">• {t.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing - Ultra compact */}
      <section className="py-6 bg-muted/20">
        <div className="container">
          <div className="max-w-xl mx-auto">
            <h2 className="text-lg font-bold text-center mb-4">Pricing</h2>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-card border border-border rounded-md p-3">
                <p className="text-[10px] uppercase text-muted-foreground mb-0.5">Standalone</p>
                <p className="text-2xl font-bold mb-2">$49<span className="text-xs text-muted-foreground">/mo</span></p>
                <ul className="space-y-1 text-[11px] mb-3">
                  {['AI Warm-Up', 'Inbox Testing', 'Domain Monitor'].map((item, i) => (
                    <li key={i} className="flex items-center gap-1"><CheckCircle className="w-3 h-3 text-accent" />{item}</li>
                  ))}
                </ul>
                <CTAButton to="/pricing#warmy" defaultText="Get Started" hoverText="Go!" className="w-full text-xs" />
              </div>

              <div className="bg-card border-2 border-accent rounded-md p-3 relative">
                <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground px-2 py-0.5 rounded-full text-[9px] font-medium">Best Value</span>
                <p className="text-[10px] uppercase text-muted-foreground mb-0.5">Smart Lead</p>
                <p className="text-2xl font-bold text-accent mb-2">FREE</p>
                <ul className="space-y-1 text-[11px] mb-3">
                  {['All above', '+ Website', '+ CRM + AI'].map((item, i) => (
                    <li key={i} className="flex items-center gap-1"><CheckCircle className="w-3 h-3 text-accent" />{item}</li>
                  ))}
                </ul>
                <CTAButton to="/pricing#smart-lead" defaultText="Get Smart Lead" hoverText="Save $49!" className="w-full text-xs" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ - Ultra compact */}
      <section className="py-6">
        <div className="container">
          <div className="max-w-xl mx-auto">
            <h2 className="text-base font-bold text-center mb-3">FAQ</h2>
            <div className="grid gap-0.5">
              {faqItems.slice(0, 4).map((item, index) => (
                <details key={index} className="group bg-muted/30 rounded">
                  <summary className="flex items-center justify-between p-2 cursor-pointer list-none text-xs">
                    <span className="font-medium">{item.question}</span>
                    <ChevronDown className="w-3 h-3 text-muted-foreground group-open:rotate-180 transition-transform ml-2" />
                  </summary>
                  <div className="px-2 pb-2 text-[11px] text-muted-foreground">{item.answer}</div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA - Ultra compact */}
      <section className="py-6 bg-gradient-to-t from-accent/10 to-background">
        <div className="container">
          <div className="max-w-md mx-auto text-center">
            <h2 className="text-lg font-bold mb-2">Stop Losing Leads to Spam</h2>
            <p className="text-xs text-muted-foreground mb-3">Join 10,000+ businesses with 95%+ inbox placement.</p>
            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              <CTAButton to="/pricing" defaultText="Start Free Trial" hoverText="14 Days Free!" />
              <Link to="/contact">
                <Button variant="outline" size="sm" className="w-full sm:w-auto text-xs">Talk to Expert</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
