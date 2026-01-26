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

// ============================================
// CSS/SVG VISUALIZATION COMPONENTS
// ============================================

/**
 * Animated deliverability score gauge - Hero visualization
 */
function DeliverabilityGauge({ score = 98 }: { score?: number }) {
  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (score / 100) * circumference;
  
  return (
    <div className="relative w-full max-w-md mx-auto aspect-square">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-radial from-accent/20 via-transparent to-transparent blur-2xl" />
      
      {/* Main gauge */}
      <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-2xl">
        {/* Outer decorative ring */}
        <circle
          cx="100" cy="100" r="95"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          className="text-accent/10"
        />
        
        {/* Background track */}
        <circle
          cx="100" cy="100" r="70"
          fill="none"
          stroke="currentColor"
          strokeWidth="12"
          className="text-muted/20"
        />
        
        {/* Score arc - animated */}
        <circle
          cx="100" cy="100" r="70"
          fill="none"
          stroke="url(#scoreGradient)"
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform="rotate(-90 100 100)"
          className="transition-all duration-2000 ease-out"
          style={{ 
            animation: 'gaugeAnimate 2s ease-out forwards',
            strokeDashoffset: circumference 
          }}
        />
        
        {/* Gradient definition */}
        <defs>
          <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--accent))" />
            <stop offset="100%" stopColor="hsl(142 76% 36%)" />
          </linearGradient>
        </defs>
        
        {/* Center content */}
        <text x="100" y="90" textAnchor="middle" className="fill-foreground text-5xl font-bold">
          {score}%
        </text>
        <text x="100" y="115" textAnchor="middle" className="fill-muted-foreground text-sm">
          Deliverability Score
        </text>
        
        {/* Status indicator */}
        <circle cx="100" cy="145" r="6" className="fill-accent animate-pulse" />
        <text x="115" y="149" className="fill-accent text-xs font-medium">LIVE</text>
      </svg>
      
      {/* Floating stats */}
      <div className="absolute top-8 right-4 px-3 py-2 rounded-lg bg-card/90 backdrop-blur border border-accent/20 shadow-lg">
        <div className="flex items-center gap-2 text-sm">
          <TrendingUp className="w-4 h-4 text-accent" />
          <span className="font-medium">+12% this week</span>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-4 px-3 py-2 rounded-lg bg-card/90 backdrop-blur border border-accent/20 shadow-lg">
        <div className="flex items-center gap-2 text-sm">
          <Mail className="w-4 h-4 text-accent" />
          <span className="font-medium">2,450 emails sent</span>
        </div>
      </div>
    </div>
  );
}

/**
 * Animated warm-up progress chart
 */
function WarmUpChart() {
  const bars = [15, 25, 35, 50, 65, 75, 85, 92, 95, 98];
  
  return (
    <div className="relative p-6 rounded-2xl bg-card border border-border/50 shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h4 className="font-semibold text-foreground">Warm-Up Progress</h4>
          <p className="text-sm text-muted-foreground">Daily sending volume</p>
        </div>
        <div className="px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium">
          Week 3
        </div>
      </div>
      
      {/* Chart */}
      <div className="flex items-end justify-between gap-2 h-40 mb-4">
        {bars.map((height, index) => (
          <div key={index} className="flex-1 flex flex-col items-center gap-1">
            <div 
              className="w-full rounded-t-md bg-gradient-to-t from-accent to-accent/60 transition-all duration-500"
              style={{ 
                height: `${height}%`,
                animationDelay: `${index * 100}ms`,
                animation: 'barGrow 1s ease-out forwards'
              }}
            />
          </div>
        ))}
      </div>
      
      {/* X-axis labels */}
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>Day 1</span>
        <span>Day 5</span>
        <span>Day 10</span>
      </div>
      
      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-border/50">
        <div className="text-center">
          <p className="text-2xl font-bold text-accent">98%</p>
          <p className="text-xs text-muted-foreground">Current Score</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-foreground">450</p>
          <p className="text-xs text-muted-foreground">Daily Volume</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-foreground">21</p>
          <p className="text-xs text-muted-foreground">Days Active</p>
        </div>
      </div>
    </div>
  );
}

/**
 * Inbox placement test results visualization
 */
function InboxTestResults() {
  const providers = [
    { name: 'Gmail', status: 'inbox', percentage: 98 },
    { name: 'Outlook', status: 'inbox', percentage: 96 },
    { name: 'Yahoo', status: 'inbox', percentage: 94 },
    { name: 'iCloud', status: 'inbox', percentage: 97 },
    { name: 'AOL', status: 'inbox', percentage: 95 },
    { name: 'Corporate', status: 'spam', percentage: 88 },
  ];
  
  return (
    <div className="relative p-6 rounded-2xl bg-card border border-border/50 shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h4 className="font-semibold text-foreground">Inbox Placement Test</h4>
          <p className="text-sm text-muted-foreground">35 seed providers</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium">
          <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          Testing
        </div>
      </div>
      
      {/* Provider list */}
      <div className="space-y-3">
        {providers.map((provider, index) => (
          <div 
            key={provider.name}
            className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center gap-3">
              {provider.status === 'inbox' ? (
                <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                  <Check className="w-4 h-4 text-accent" />
                </div>
              ) : (
                <div className="w-8 h-8 rounded-full bg-destructive/20 flex items-center justify-center">
                  <AlertCircle className="w-4 h-4 text-destructive" />
                </div>
              )}
              <span className="font-medium">{provider.name}</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-24 h-2 rounded-full bg-muted overflow-hidden">
                <div 
                  className={`h-full rounded-full ${provider.status === 'inbox' ? 'bg-accent' : 'bg-destructive'}`}
                  style={{ width: `${provider.percentage}%` }}
                />
              </div>
              <span className={`text-sm font-medium ${provider.status === 'inbox' ? 'text-accent' : 'text-destructive'}`}>
                {provider.percentage}%
              </span>
            </div>
          </div>
        ))}
      </div>
      
      {/* Summary */}
      <div className="flex items-center justify-between mt-6 pt-6 border-t border-border/50">
        <div className="flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-accent" />
          <span className="font-medium">32/35 in Primary Inbox</span>
        </div>
        <Button variant="ghost" size="sm" className="text-accent">
          View Full Report
        </Button>
      </div>
    </div>
  );
}

/**
 * Domain health monitoring dashboard
 */
function DomainHealthDashboard() {
  const checks = [
    { name: 'SPF Record', status: 'pass', description: 'Properly configured' },
    { name: 'DKIM Signature', status: 'pass', description: '2048-bit key active' },
    { name: 'DMARC Policy', status: 'pass', description: 'Reject policy enabled' },
    { name: 'Blacklist Status', status: 'pass', description: 'Not listed (100+ checked)' },
  ];
  
  return (
    <div className="relative p-6 rounded-2xl bg-card border border-border/50 shadow-xl">
      {/* Header with overall score */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h4 className="font-semibold text-foreground">Domain Health</h4>
          <p className="text-sm text-muted-foreground">Last checked 2 min ago</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
            <Shield className="w-6 h-6 text-accent" />
          </div>
          <div>
            <p className="text-2xl font-bold text-accent">100%</p>
            <p className="text-xs text-muted-foreground">Health Score</p>
          </div>
        </div>
      </div>
      
      {/* Security checks */}
      <div className="space-y-3">
        {checks.map((check, index) => (
          <div 
            key={check.name}
            className="flex items-center justify-between p-3 rounded-lg bg-muted/30"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                <Check className="w-4 h-4 text-accent" />
              </div>
              <div>
                <p className="font-medium text-sm">{check.name}</p>
                <p className="text-xs text-muted-foreground">{check.description}</p>
              </div>
            </div>
            <span className="px-2 py-1 rounded text-xs font-medium bg-accent/10 text-accent uppercase">
              {check.status}
            </span>
          </div>
        ))}
      </div>
      
      {/* Alert banner */}
      <div className="mt-6 p-3 rounded-lg bg-accent/5 border border-accent/20 flex items-center gap-3">
        <Activity className="w-5 h-5 text-accent" />
        <p className="text-sm">
          <span className="font-medium">Real-time monitoring active.</span>
          {' '}You'll be notified instantly if any issues are detected.
        </p>
      </div>
    </div>
  );
}

/**
 * Deliverability analytics dashboard
 */
function AnalyticsDashboard() {
  const metrics = [
    { label: 'Emails Sent', value: '12,450', change: '+23%', positive: true },
    { label: 'Inbox Rate', value: '96.8%', change: '+4.2%', positive: true },
    { label: 'Open Rate', value: '38.5%', change: '+12%', positive: true },
    { label: 'Spam Rate', value: '0.8%', change: '-2.1%', positive: true },
  ];
  
  return (
    <div className="relative p-6 rounded-2xl bg-card border border-border/50 shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h4 className="font-semibold text-foreground">Deliverability Analytics</h4>
          <p className="text-sm text-muted-foreground">Last 30 days</p>
        </div>
        <Button variant="outline" size="sm">
          Export Report
        </Button>
      </div>
      
      {/* Metrics grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {metrics.map((metric) => (
          <div key={metric.label} className="p-4 rounded-lg bg-muted/30">
            <p className="text-sm text-muted-foreground mb-1">{metric.label}</p>
            <div className="flex items-baseline gap-2">
              <p className="text-2xl font-bold text-foreground">{metric.value}</p>
              <span className={`text-sm font-medium ${metric.positive ? 'text-accent' : 'text-destructive'}`}>
                {metric.change}
              </span>
            </div>
          </div>
        ))}
      </div>
      
      {/* Mini chart */}
      <div className="h-24 flex items-end gap-1">
        {[40, 55, 45, 60, 75, 65, 80, 85, 70, 90, 85, 95].map((height, i) => (
          <div 
            key={i}
            className="flex-1 rounded-t bg-gradient-to-t from-accent/80 to-accent/40"
            style={{ height: `${height}%` }}
          />
        ))}
      </div>
      <div className="flex justify-between mt-2 text-xs text-muted-foreground">
        <span>Week 1</span>
        <span>Week 2</span>
        <span>Week 3</span>
        <span>Week 4</span>
      </div>
    </div>
  );
}

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
    Visual: WarmUpChart,
  },
  {
    icon: Inbox,
    title: 'Inbox Placement Testing',
    description: '35 seed email providers including Gmail, Outlook, Yahoo, and corporate domains. Real-time inbox, spam, and missing placement reporting.',
    stats: '35+ email provider coverage',
    Visual: InboxTestResults,
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
    Visual: AnalyticsDashboard,
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

            {/* Hero visualization - animated gauge */}
            <div className="order-1 lg:order-2 animate-fade-in">
              <DeliverabilityGauge score={98} />
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

      {/* Problem Section - Urgency */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-background to-destructive/5">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-4 mb-8 text-center md:text-left">
              <div className="p-3 rounded-full bg-destructive/10">
                <AlertTriangle className="w-8 h-8 text-destructive" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold">The Hidden Problem Killing Your Leads</h2>
                <p className="text-muted-foreground mt-1">Why your marketing emails aren't converting</p>
              </div>
            </div>
            
            <div className="grid sm:grid-cols-3 gap-4 md:gap-6 mb-8">
              {problemStats.map((stat, index) => (
                <Card 
                  key={index} 
                  className="bg-card/80 backdrop-blur border-destructive/20 hover:border-destructive/40 transition-colors group"
                >
                  <CardContent className="pt-6 text-center">
                    <p className={`text-3xl md:text-4xl font-bold mb-2 ${stat.color} group-hover:scale-110 transition-transform`}>
                      {stat.value}
                    </p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <p className="text-lg text-muted-foreground text-center md:text-left">
              Every email that lands in spam is a lost opportunity. Your follow-ups, nurture sequences, 
              and marketing campaigns are worthless if they <strong>never reach your prospects</strong>.
            </p>
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
