/**
 * @fileoverview Smart Lead Product Page - Lead capture tier
 * @module pages/smart-websites/SmartLead
 * 
 * Dedicated product page for the $97/mo Smart Lead tier (flagship).
 * Includes breadcrumbs, full SEO/AEO optimization, and purchase CTA.
 * 
 * @brd-reference BRD v35.3 Section 10.1 - Smart Website Tiers
 */

import { Link } from 'react-router-dom';
import { Check, ArrowRight, MessageSquare, Phone, Users, Zap, Clock, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { SEO } from '@/components/SEO';
import { RecommendedAddOns } from '@/components/smart-websites/RecommendedAddOns';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

/**
 * Features included in Smart Lead tier
 */
const features = [
  { icon: Phone, title: 'Missed-call text-back', description: 'Automatically text leads when you miss their call' },
  { icon: MessageSquare, title: 'AI chat widget', description: '24/7 intelligent chat captures leads while you sleep' },
  { icon: Users, title: 'CRM & mobile app', description: 'Manage all leads from your phone or desktop' },
  { icon: BarChart3, title: 'Full GA4 analytics', description: 'Complete insights into your traffic and conversions' },
  { icon: Zap, title: 'Lead notifications', description: 'Instant alerts when new leads come in' },
  { icon: Clock, title: 'Response automation', description: 'Automated follow-ups so no lead goes cold' },
];

/**
 * Everything from Smart Site (included)
 */
const includedFromSite = [
  'Professional 5-page website',
  'Mobile responsive design',
  'SSL certificate',
  'Basic SEO setup',
  'Google Maps integration',
  'Contact form',
];

/**
 * FAQs specific to Smart Lead tier
 */
const faqs = [
  {
    question: 'Why is Capture the most popular?',
    answer: 'Because most businesses running ads or any paid traffic need lead capture. Without missed-call text-back and AI chat, you\'re paying for leads and losing them.',
  },
  {
    question: 'What\'s the difference from Launch?',
    answer: 'Launch is a basic website. Capture adds the tools that actually capture leads: AI chat, missed-call text-back, CRM, and automation.',
  },
  {
    question: 'Is there a contract?',
    answer: 'No contracts. Cancel anytime. We keep you because you love the results, not because you\'re locked in.',
  },
  {
    question: 'How fast can I get started?',
    answer: '5 business days from kickoff to launch. Your lead capture system goes live the same day as your website.',
  },
];

/**
 * Smart Lead product page component
 */
export default function SmartLead() {
  return (
    <>
      <SEO 
        title="Capture: Lead Capture Website $97/mo"
        description="Never miss a lead. Capture includes AI chat, missed-call text-back, CRM, and automation for $97/mo + $249 setup. Built in 5 days."
        canonical="/smart-websites/capture"
      />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center bg-background pt-24 pb-16">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-card/30" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl" />
        
        <div className="relative z-10 container mx-auto px-6">
          {/* Breadcrumb */}
          <Breadcrumb className="mb-8">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/" className="text-muted-foreground hover:text-accent">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/smart-websites" className="text-muted-foreground hover:text-accent">Smart Websites</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-foreground">Capture</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="max-w-4xl">
            {/* Tier badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-accent/10 border border-accent/20 text-accent text-sm font-medium mb-6">
              Never Miss a Lead • Best for Ad Buyers
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.1] mb-6 tracking-tight">
              <span className="text-gradient">Capture</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl">
              Stop paying for leads you never capture. AI chat. Missed-call text-back. 
              CRM. Everything you need to turn traffic into customers.
            </p>

            {/* Pricing */}
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-5xl md:text-6xl font-bold text-accent">$97</span>
              <span className="text-xl text-muted-foreground">/month</span>
            </div>
            <p className="text-sm text-muted-foreground mb-8">
              $249 setup • 5-day delivery • No contracts
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" variant="gold" className="btn-glow">
                <a href="/checkout/capture">
                  Start Capturing Leads
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/smart-websites">Compare All Tiers</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Lead Capture Features */}
      <section className="py-16 lg:py-24 bg-card/30">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Lead Capture Built In
            </h2>
            <p className="text-lg text-muted-foreground">
              Every tool you need to capture, track, and convert leads automatically.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {features.map((feature, index) => (
              <Card key={index} className="border-accent/20 bg-card/50 shadow-gold-glow">
                <CardContent className="p-6">
                  <feature.icon className="h-8 w-8 text-accent mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Also Includes */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
              Plus Everything in Launch
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {includedFromSite.map((item, index) => (
                <div key={index} className="flex items-center gap-3 p-4 rounded-lg bg-card/30 border border-border/50">
                  <Check className="h-5 w-5 text-accent flex-shrink-0" />
                  <span className="text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Who Is This For */}
      <section className="py-16 lg:py-24 bg-card/30">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
              Built For Businesses Running Ads
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 rounded-xl bg-background border border-accent/20">
                <Check className="h-6 w-6 text-accent mb-3" />
                <h3 className="text-lg font-semibold text-foreground mb-2">Google Ads buyers</h3>
                <p className="text-muted-foreground">Capture every lead from your paid campaigns with AI chat and instant follow-up.</p>
              </div>
              <div className="p-6 rounded-xl bg-background border border-accent/20">
                <Check className="h-6 w-6 text-accent mb-3" />
                <h3 className="text-lg font-semibold text-foreground mb-2">Facebook advertisers</h3>
                <p className="text-muted-foreground">Convert social traffic with 24/7 chat and missed-call recovery.</p>
              </div>
              <div className="p-6 rounded-xl bg-background border border-accent/20">
                <Check className="h-6 w-6 text-accent mb-3" />
                <h3 className="text-lg font-semibold text-foreground mb-2">Home service contractors</h3>
                <p className="text-muted-foreground">Never miss another job call while you're on a roof or under a sink.</p>
              </div>
              <div className="p-6 rounded-xl bg-background border border-accent/20">
                <Check className="h-6 w-6 text-accent mb-3" />
                <h3 className="text-lg font-semibold text-foreground mb-2">Growing businesses</h3>
                <p className="text-muted-foreground">Scale your lead intake without hiring more staff to answer phones.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
              Common Questions
            </h2>
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`faq-${index}`}
                  className="rounded-xl bg-card/50 border border-border/50 px-6"
                >
                  <AccordionTrigger className="text-lg font-semibold text-foreground hover:no-underline py-5">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-5">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Recommended Add-Ons */}
      <RecommendedAddOns tier="capture" />

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-card/30">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Stop Losing Leads Today
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            $97/mo for a website that actually captures leads. Setup is $249. Live in 5 days.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" variant="gold" className="btn-glow">
              <a href="/checkout/capture">
                Get Capture
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/smart-websites/convert">See Convert →</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
