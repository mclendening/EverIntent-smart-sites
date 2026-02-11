/**
 * @fileoverview Smart Growth Product Page - Full AI power tier
 * @module pages/smart-websites/SmartGrowth
 * 
 * Dedicated product page for the $297/mo Smart Growth tier (top tier).
 * Includes breadcrumbs, full SEO/AEO optimization, and purchase CTA.
 * 
 * @brd-reference BRD v35.3 Section 10.1 - Smart Website Tiers
 */

import { Link } from 'react-router-dom';
import { Check, ArrowRight, Bot, Inbox, Settings, PhoneCall, Calendar, Star } from 'lucide-react';
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
 * New features in Smart Growth (beyond Smart Business)
 */
const newFeatures = [
  { icon: Bot, title: 'AI Voice Agent', description: 'AI answers calls, qualifies leads, and books appointments—like having a full-time assistant' },
  { icon: Inbox, title: 'Unified inbox', description: 'SMS, email, chat, and social messages in one place' },
  { icon: Settings, title: 'Advanced automations', description: 'Custom workflows that run your business on autopilot' },
  { icon: PhoneCall, title: 'Quarterly strategy calls', description: 'Regular check-ins to optimize your system and results' },
];

/**
 * Everything from Smart Business (included)
 */
const includedFromBusiness = [
  'Professional 5-page website',
  'Mobile responsive design',
  'SSL certificate & SEO setup',
  'Missed-call text-back',
  'AI chat widget',
  'CRM & mobile app',
  'Full GA4 analytics',
  'Online booking system',
  'Review automation',
  'Lead notifications',
  'Response automation',
];

/**
 * FAQs specific to Smart Growth tier
 */
const faqs = [
  {
    question: 'What makes Scale worth the extra cost?',
    answer: 'AI Voice Agent alone replaces a $3k+/month front desk hire. Add unified inbox and advanced automations, and you\'re running a business that scales without hiring.',
  },
  {
    question: 'How does the AI Voice Agent work?',
    answer: 'When someone calls, AI answers professionally, asks qualifying questions, and books appointments on your calendar. You only talk to qualified leads.',
  },
  {
    question: 'What are the quarterly strategy calls?',
    answer: 'Every 3 months, we review your analytics, automation performance, and lead flow. We optimize and suggest improvements to keep your system running at peak.',
  },
  {
    question: 'Is there an AI Employee option beyond this?',
    answer: 'Yes. If you want full AI automation of calls, chat, and scheduling without a website, check out our AI Employee plans starting at $197/mo.',
  },
];

/**
 * Smart Growth product page component
 */
export default function SmartGrowth() {
  return (
    <>
      <SEO 
        title="Scale: AI-Powered Growth Engine $297/mo"
        description="AI Voice Agent + unified inbox + advanced automations for $297/mo. The website that runs your business. $997 setup, 5-day delivery, quarterly strategy calls."
        canonical="/smart-websites/scale"
      />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center bg-background pt-24 pb-16">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-card/30" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-3xl" />
        
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
                <BreadcrumbPage className="text-foreground">Scale</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="max-w-4xl">
            {/* Tier badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-accent/10 border border-accent/20 text-accent text-sm font-medium mb-6">
              AI-Powered Growth Engine • Full AI Power
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.1] mb-6 tracking-tight">
              <span className="text-gradient">Scale</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl">
              AI-powered growth engine. AI Voice Agent. Unified inbox. Advanced automations. 
              This isn't just a website—it's a business that runs itself.
            </p>

            {/* Pricing */}
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-5xl md:text-6xl font-bold text-accent">$297</span>
              <span className="text-xl text-muted-foreground">/month</span>
            </div>
            <p className="text-sm text-muted-foreground mb-8">
              $997 setup • 5-day delivery • Quarterly strategy calls included
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" variant="gold" className="btn-glow">
                <a href="/checkout/scale">
                  Unlock Full AI
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

      {/* New Features */}
      <section className="py-16 lg:py-24 bg-card/30">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              What's New in Scale
            </h2>
            <p className="text-lg text-muted-foreground">
              Everything in Convert, plus full AI power.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {newFeatures.map((feature, index) => (
              <Card key={index} className="border-accent/30 bg-card/50 shadow-gold-glow">
                <CardContent className="p-8">
                  <feature.icon className="h-12 w-12 text-accent mb-6" />
                  <h3 className="text-xl font-semibold text-foreground mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
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
              Plus Everything in Convert
            </h2>
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-3">
              {includedFromBusiness.map((item, index) => (
                <div key={index} className="flex items-center gap-2 p-3 rounded-lg bg-card/30 border border-border/50">
                  <Check className="h-4 w-4 text-accent flex-shrink-0" />
                  <span className="text-foreground text-sm">{item}</span>
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
              Built For Businesses Ready to Scale
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 rounded-xl bg-background border border-accent/20">
                <Check className="h-6 w-6 text-accent mb-3" />
                <h3 className="text-lg font-semibold text-foreground mb-2">High-volume businesses</h3>
                <p className="text-muted-foreground">Too many calls to answer. Too many leads to manage manually.</p>
              </div>
              <div className="p-6 rounded-xl bg-background border border-accent/20">
                <Check className="h-6 w-6 text-accent mb-3" />
                <h3 className="text-lg font-semibold text-foreground mb-2">Multi-location operations</h3>
                <p className="text-muted-foreground">Unified inbox keeps everything organized across locations.</p>
              </div>
              <div className="p-6 rounded-xl bg-background border border-accent/20">
                <Check className="h-6 w-6 text-accent mb-3" />
                <h3 className="text-lg font-semibold text-foreground mb-2">Owner-operators ready to step back</h3>
                <p className="text-muted-foreground">AI handles the phone so you can work ON the business, not IN it.</p>
              </div>
              <div className="p-6 rounded-xl bg-background border border-accent/20">
                <Check className="h-6 w-6 text-accent mb-3" />
                <h3 className="text-lg font-semibold text-foreground mb-2">Businesses serious about growth</h3>
                <p className="text-muted-foreground">Quarterly strategy calls ensure you're always optimizing.</p>
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
      <RecommendedAddOns tier="scale" />

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-card/30">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Ready for Full AI Power?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            $297/mo for a website that runs your business. $997 setup. Live in 5 days.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" variant="gold" className="btn-glow">
              <a href="/checkout/scale">
                Get Scale
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/let-ai-handle-it">Explore AI Employee →</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
