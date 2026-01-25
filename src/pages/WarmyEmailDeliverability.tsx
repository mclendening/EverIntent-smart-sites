/**
 * @fileoverview Warmy Email Deliverability Full Service Page
 * @description Dedicated service page for email deliverability solution per BRD v35.3
 * 
 * @module pages/WarmyEmailDeliverability
 * 
 * Features:
 * - AI-Powered Warm-Up
 * - Inbox Placement Testing (35 seed emails)
 * - Domain Health Monitoring (SPF/DKIM/DMARC)
 * - Deliverability Analytics
 * 
 * Pricing: $49/mo standalone OR free with Smart Lead
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
  RefreshCw
} from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * Core features for Warmy service
 */
const coreFeatures = [
  {
    icon: Zap,
    title: 'AI-Powered Warm-Up',
    description: 'Gradual sending volume increases with smart reply patterns that mimic real human behavior.',
  },
  {
    icon: Mail,
    title: 'Inbox Placement Testing',
    description: '35 seed email providers with real-time inbox, spam, and missing placement reporting.',
  },
  {
    icon: Shield,
    title: 'Domain Health Monitoring',
    description: 'SPF, DKIM, DMARC configuration validation with instant alerts when issues arise.',
  },
  {
    icon: BarChart3,
    title: 'Deliverability Analytics',
    description: 'Sender score tracking, blacklist monitoring, and detailed performance reports.',
  },
];

/**
 * Benefits list for the why section
 */
const benefits = [
  'Achieve 95%+ inbox placement rate',
  'Automatic volume reduction when issues detected',
  'Works with GHL, any SMTP provider',
  'No technical setup required',
  'Real-time deliverability alerts',
  'Blacklist monitoring & removal assistance',
];

/**
 * FAQ items for the page
 */
const faqItems = [
  {
    question: 'How long does warm-up take?',
    answer: 'Most domains reach optimal deliverability within 2-4 weeks. New domains may take longer. Our AI adjusts the pace based on your domain reputation.',
  },
  {
    question: 'How many emails can I send?',
    answer: 'Warmy handles warm-up emails automatically. Your regular sending limits depend on your email provider. We optimize delivery, not volume limits.',
  },
  {
    question: 'Does it work with GoHighLevel?',
    answer: 'Yes! Warmy integrates seamlessly with GHL and any SMTP-compatible email system including Gmail, Outlook, and custom SMTP servers.',
  },
  {
    question: 'What if I already have deliverability issues?',
    answer: 'Warmy can help recover damaged sender reputation. The warm-up process gradually rebuilds trust with email providers while our monitoring prevents future issues.',
  },
  {
    question: 'Is this included with Smart Lead?',
    answer: 'Yes! Warmy Email Deliverability is included free with our Smart Lead tier ($97/mo). Standalone pricing is $49/mo for businesses with existing websites.',
  },
];

/**
 * WarmyEmailDeliverability - Full service page for email deliverability
 */
export default function WarmyEmailDeliverability() {
  return (
    <Layout>
      <SEO 
        title="Email Deliverability Service | Warmy Email Warm-Up"
        description="Stop landing in spam. AI-powered email warm-up with inbox placement testing and domain health monitoring. $49/mo or free with Smart Lead."
        canonical="/warmy-email-deliverability"
      />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-background to-background" />
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-8">
              <Mail className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-accent">Email Deliverability Solution</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Your Emails Deserve to Be{' '}
              <span className="text-accent">Seen</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              If your emails land in spam, your leads never see them. Warmy ensures 95%+ inbox 
              placement for all your marketing and follow-up emails.
            </p>

            {/* Deliverability Score Visual */}
            <div className="flex justify-center mb-10">
              <div className="relative w-48 h-48">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    className="text-muted/20"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray="283"
                    strokeDashoffset="14"
                    strokeLinecap="round"
                    className="text-accent"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-bold text-accent">95%</span>
                  <span className="text-sm text-muted-foreground">Inbox Rate</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <CTAButton to="/pricing" defaultText="Get Warmy — $49/mo" hoverText="Boost Deliverability!" />
              <Link to="/smart-websites#smart-lead">
                <Button variant="outline" size="lg" className="gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Free with Smart Lead
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 bg-destructive/5">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <AlertTriangle className="w-8 h-8 text-destructive" />
              <h2 className="text-3xl font-bold">The Hidden Problem Killing Your Leads</h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <Card className="bg-card/50 border-destructive/20">
                <CardContent className="pt-6 text-center">
                  <p className="text-4xl font-bold text-destructive mb-2">21%</p>
                  <p className="text-muted-foreground">of legitimate emails never reach the inbox</p>
                </CardContent>
              </Card>
              <Card className="bg-card/50 border-destructive/20">
                <CardContent className="pt-6 text-center">
                  <p className="text-4xl font-bold text-destructive mb-2">$14.5B</p>
                  <p className="text-muted-foreground">lost annually to email deliverability issues</p>
                </CardContent>
              </Card>
              <Card className="bg-card/50 border-destructive/20">
                <CardContent className="pt-6 text-center">
                  <p className="text-4xl font-bold text-destructive mb-2">85%</p>
                  <p className="text-muted-foreground">of cold emails land in spam folders</p>
                </CardContent>
              </Card>
            </div>

            <p className="text-lg text-muted-foreground">
              Every email that lands in spam is a lost opportunity. Your follow-ups, nurture sequences, 
              and marketing campaigns are worthless if they never reach your prospects.
            </p>
          </div>
        </div>
      </section>

      {/* Solution Grid - Core Features */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              AI-Powered Deliverability Protection
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Warmy uses artificial intelligence to warm your domain, test placement, 
              and monitor health — automatically.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {coreFeatures.map((feature, index) => (
              <Card key={index} className="group hover:border-accent/50 transition-colors">
                <CardContent className="pt-8 pb-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-accent/10 group-hover:bg-accent/20 transition-colors">
                      <feature.icon className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Integration Section */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">
                  Works With Your Existing Tools
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Warmy integrates seamlessly with GoHighLevel and any SMTP-compatible 
                  email system. No migration required — just better deliverability.
                </p>

                <div className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-accent shrink-0" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Card className="bg-card">
                  <CardContent className="pt-6 flex flex-col items-center text-center">
                    <Globe className="w-10 h-10 text-accent mb-3" />
                    <p className="font-medium">Any SMTP</p>
                  </CardContent>
                </Card>
                <Card className="bg-card">
                  <CardContent className="pt-6 flex flex-col items-center text-center">
                    <Lock className="w-10 h-10 text-accent mb-3" />
                    <p className="font-medium">GoHighLevel</p>
                  </CardContent>
                </Card>
                <Card className="bg-card">
                  <CardContent className="pt-6 flex flex-col items-center text-center">
                    <TrendingUp className="w-10 h-10 text-accent mb-3" />
                    <p className="font-medium">Gmail / GSuite</p>
                  </CardContent>
                </Card>
                <Card className="bg-card">
                  <CardContent className="pt-6 flex flex-col items-center text-center">
                    <RefreshCw className="w-10 h-10 text-accent mb-3" />
                    <p className="font-medium">Outlook / O365</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Card */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
              <p className="text-xl text-muted-foreground">
                No hidden fees. No long-term contracts. Cancel anytime.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Standalone Pricing */}
              <Card className="border-2">
                <CardContent className="pt-8 pb-6">
                  <div className="text-center mb-6">
                    <p className="text-sm uppercase tracking-wider text-muted-foreground mb-2">Standalone</p>
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-5xl font-bold">$49</span>
                      <span className="text-muted-foreground">/month</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">For businesses with existing websites</p>
                  </div>

                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-accent" />
                      <span>AI-Powered Warm-Up</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-accent" />
                      <span>35-Provider Inbox Testing</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-accent" />
                      <span>Domain Health Monitoring</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-accent" />
                      <span>Deliverability Analytics</span>
                    </li>
                  </ul>

                  <CTAButton 
                    to="/pricing#warmy-booster" 
                    defaultText="Get Started" 
                    hoverText="Boost Now!" 
                    className="w-full"
                  />
                </CardContent>
              </Card>

              {/* Bundled with Smart Lead */}
              <Card className="border-2 border-accent relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-accent text-accent-foreground px-4 py-1 rounded-full text-sm font-medium">
                    Best Value
                  </span>
                </div>
                <CardContent className="pt-8 pb-6">
                  <div className="text-center mb-6">
                    <p className="text-sm uppercase tracking-wider text-muted-foreground mb-2">With Smart Lead</p>
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-5xl font-bold text-accent">FREE</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">Included with Smart Lead ($97/mo)</p>
                  </div>

                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-accent" />
                      <span>Everything in Standalone</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-accent" />
                      <span>+ Professional Website</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-accent" />
                      <span>+ CRM & Contact Management</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-accent" />
                      <span>+ AI Chat Widget</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-accent" />
                      <span>+ Missed Call Text-Back</span>
                    </li>
                  </ul>

                  <CTAButton 
                    to="/smart-websites#smart-lead" 
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

      {/* FAQ Section */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Frequently Asked Questions
            </h2>

            <div className="space-y-6">
              {faqItems.map((item, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-semibold mb-2">{item.question}</h3>
                    <p className="text-muted-foreground">{item.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Stop Losing Leads to the Spam Folder
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of businesses achieving 95%+ inbox placement with Warmy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <CTAButton 
                to="/pricing" 
                defaultText="Boost Your Deliverability" 
                hoverText="Get Started — $49/mo" 
              />
              <Link to="/contact">
                <Button variant="outline" size="lg">
                  Have Questions? Let's Talk
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
