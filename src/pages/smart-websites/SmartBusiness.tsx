/**
 * @fileoverview Smart Business (Convert) Product Page ($197/mo)
 * @module pages/smart-websites/SmartBusiness
 *
 * Features expandable feature cards for new Convert features,
 * Product structured data, and SSG-safe rendering.
 */

import { Link } from 'react-router-dom';
import { Check, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { SEO } from '@/components/SEO';
import { RecommendedAddOns } from '@/components/smart-websites/RecommendedAddOns';
import { ExpandableFeatureGrid } from '@/components/ai-employee';
import { smartBusinessFeatures } from '@/data/features';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

const includedFromLead = [
  'Professional 5-page website',
  'Mobile responsive design',
  'SSL certificate & SEO setup',
  'Missed-call text-back',
  'AI chat widget',
  'CRM & mobile app',
  'Full GA4 analytics',
  'Lead notifications',
  'Response automation',
];

const faqs = [
  {
    question: 'What\'s the difference from Capture?',
    answer: 'Convert adds online booking and review automation. If customers need to schedule with you, or if Google reviews matter to your business, this is the tier.',
  },
  {
    question: 'How does the booking system work?',
    answer: 'Customers pick a time on your calendar, and it syncs with your schedule. You get notified, they get reminders. No back-and-forth phone tag.',
  },
  {
    question: 'Will review automation seem spammy?',
    answer: 'No. We send a simple, professional request after each job. Happy customers leave reviews. Unhappy ones reach you privately first.',
  },
  {
    question: 'Can I upgrade from Capture?',
    answer: 'Yes. If you\'re on Capture and want booking + reviews, we migrate you seamlessly. Pay the difference in setup, new monthly rate kicks in.',
  },
];

export default function SmartBusiness() {
  return (
    <>
      <SEO 
        title="Convert: Booking and Reviews Website $197/mo"
        description="Turn visitors into customers in Long Beach, Orange County, and LA. Online booking + review automation for $197/mo. Customers book 24/7."
        canonical="/smart-websites/convert"
        structuredData={[
          {
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: 'Convert Smart Website',
            description: 'Website with online booking and review automation for appointment-based businesses.',
            brand: { '@type': 'Brand', name: 'EverIntent' },
            offers: {
              '@type': 'Offer',
              price: '197',
              priceCurrency: 'USD',
              priceSpecification: { '@type': 'UnitPriceSpecification', price: '197', priceCurrency: 'USD', billingDuration: 'P1M' },
              availability: 'https://schema.org/InStock',
            },
          },
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map(faq => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: { '@type': 'Answer', text: faq.answer },
            })),
          },
        ]}
      />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center bg-background pt-24 pb-16">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-card/30" />
        
        <div className="relative z-10 container mx-auto px-6">
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
                <BreadcrumbPage className="text-foreground">Convert</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-accent/10 border border-accent/20 text-accent text-sm font-medium mb-6">
              Turn Visitors into Customers • Booking + Reviews
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.1] mb-6 tracking-tight">
              <span className="text-gradient">Convert</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl">
              Turn visitors into customers. Online booking + review automation. 
              Let customers schedule themselves. Build your reputation on autopilot.
            </p>

            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-5xl md:text-6xl font-bold text-accent">$197</span>
              <span className="text-xl text-muted-foreground">/month</span>
            </div>
            <p className="text-sm text-muted-foreground mb-8">
              $497 setup • 5-day delivery • No contracts
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" variant="gold" className="btn-glow">
                <a href="/checkout/convert">
                  Grow Your Business
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

      {/* New Features - Expandable */}
      <section className="py-16 lg:py-24 bg-card/30">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              What's New in Convert
            </h2>
            <p className="text-lg text-muted-foreground">
              Everything in Capture, plus the tools to scale.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <ExpandableFeatureGrid features={smartBusinessFeatures} columns={2} />
          </div>
        </div>
      </section>

      {/* Also Includes */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
              Plus Everything in Capture
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              {includedFromLead.map((item, index) => (
                <div key={index} className="flex items-center gap-3 p-4 rounded-lg bg-card/30 border border-border/50">
                  <Check className="h-5 w-5 text-accent flex-shrink-0" />
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
              Perfect For Appointment-Based Businesses
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 rounded-xl bg-background border border-border/50">
                <Check className="h-6 w-6 text-accent mb-3" />
                <h3 className="text-lg font-semibold text-foreground mb-2">Service providers</h3>
                <p className="text-muted-foreground">HVAC, plumbing, electrical—anyone who books jobs.</p>
              </div>
              <div className="p-6 rounded-xl bg-background border border-border/50">
                <Check className="h-6 w-6 text-accent mb-3" />
                <h3 className="text-lg font-semibold text-foreground mb-2">Health & wellness</h3>
                <p className="text-muted-foreground">Dentists, chiropractors, medspas—anyone with appointments.</p>
              </div>
              <div className="p-6 rounded-xl bg-background border border-border/50">
                <Check className="h-6 w-6 text-accent mb-3" />
                <h3 className="text-lg font-semibold text-foreground mb-2">Local businesses</h3>
                <p className="text-muted-foreground">Where Google reviews drive new customers to your door.</p>
              </div>
              <div className="p-6 rounded-xl bg-background border border-border/50">
                <Check className="h-6 w-6 text-accent mb-3" />
                <h3 className="text-lg font-semibold text-foreground mb-2">Growing teams</h3>
                <p className="text-muted-foreground">Multiple technicians or staff who need coordinated scheduling.</p>
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

      <RecommendedAddOns tier="convert" />

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-card/30">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Ready to Scale?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            $197/mo for booking, reviews, and complete lead capture. $497 setup. Live in 5 days.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" variant="gold" className="btn-glow">
              <a href="/checkout/convert">
                Get Convert
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/smart-websites/scale">See Scale →</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
