/**
 * @fileoverview Smart Site Product Page - Entry-level website tier
 * @module pages/smart-websites/SmartSite
 * 
 * Dedicated product page for the $249 one-time Smart Site tier.
 * Includes breadcrumbs, full SEO/AEO optimization, and purchase CTA.
 * 
 * @brd-reference BRD v35.3 Section 10.1 - Smart Website Tiers
 */

import { Link } from 'react-router-dom';
import { Check, ArrowRight, Globe, Shield, MapPin, BarChart3, FileText, Smartphone } from 'lucide-react';
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
 * Features included in Smart Site tier
 */
const features = [
  { icon: FileText, title: 'Professional 5-page website', description: 'Home, About, Services, Contact, and one custom page' },
  { icon: Smartphone, title: 'Mobile responsive design', description: 'Looks perfect on phones, tablets, and desktops' },
  { icon: Shield, title: 'SSL certificate included', description: 'Secure HTTPS connection builds customer trust' },
  { icon: Globe, title: 'Basic SEO setup', description: 'Meta tags, site structure, and Google indexing' },
  { icon: MapPin, title: 'Google Maps integration', description: 'Show your location to local customers' },
  { icon: BarChart3, title: 'GA4 analytics (view only)', description: 'Track visitors and page performance' },
];

/**
 * FAQs specific to Smart Site tier
 */
const faqs = [
  {
    question: 'What happens after the first year?',
    answer: 'Smart Site includes 1 year of hosting free. After Year 1, hosting renews at $149/year. This covers hosting, SSL, security updates, and basic maintenance.',
  },
  {
    question: 'Do I own my website?',
    answer: 'Yes, 100%. Your domain, your content, your site. We don\'t do lock-in contracts. If you ever want to leave, we\'ll help you migrate everything.',
  },
  {
    question: 'Can I upgrade to Smart Lead later?',
    answer: 'Absolutely. Every Smart Website is built upgrade-ready. When you\'re ready for lead capture and automation, upgrading is seamless.',
  },
  {
    question: 'How long does it take to build?',
    answer: '5 business days from kickoff to launch. Once you provide your content and branding, we move fast.',
  },
];

/**
 * Smart Site product page component
 */
export default function SmartSite() {
  return (
    <>
      <SEO 
        title="Launch: Professional Website for $249 One-Time"
        description="Get a professional 5-page website for just $249 one-time. Includes mobile design, SSL, SEO setup, and Google Maps. Built in 5 days. You own everything."
        canonical="/smart-websites/smart-site"
      />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center bg-background pt-24 pb-16">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-card/30" />
        
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
                <BreadcrumbPage className="text-foreground">Launch</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="max-w-4xl">
            {/* Tier badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-accent/10 border border-accent/20 text-accent text-sm font-medium mb-6">
              Entry Level • Perfect for Getting Online
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.1] mb-6 tracking-tight">
              <span className="text-gradient">Launch</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl">
              Get online fast. A professional website without the professional price tag. 
              One payment. No monthly fees. You own everything.
            </p>

            {/* Pricing */}
            <div className="flex items-baseline gap-2 mb-8">
              <span className="text-5xl md:text-6xl font-bold text-accent">$249</span>
              <span className="text-xl text-muted-foreground">one-time</span>
            </div>
            <p className="text-sm text-muted-foreground mb-8">
              $149/yr hosting after Year 1 • 5-day delivery • You own everything
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" variant="gold" className="btn-glow">
                <a href="/checkout/launch">
                  Get Started
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

      {/* Features Section */}
      <section className="py-16 lg:py-24 bg-card/30">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Everything You Need to Get Online
            </h2>
            <p className="text-lg text-muted-foreground">
              No fluff. No upsells. Just a clean, professional website that works.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {features.map((feature, index) => (
              <Card key={index} className="border-border/50 bg-card/50">
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

      {/* Who Is This For */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
              Perfect For
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 rounded-xl bg-card/50 border border-border/50">
                <Check className="h-6 w-6 text-accent mb-3" />
                <h3 className="text-lg font-semibold text-foreground mb-2">New businesses</h3>
                <p className="text-muted-foreground">Just starting out and need a professional presence without breaking the bank.</p>
              </div>
              <div className="p-6 rounded-xl bg-card/50 border border-border/50">
                <Check className="h-6 w-6 text-accent mb-3" />
                <h3 className="text-lg font-semibold text-foreground mb-2">Word-of-mouth businesses</h3>
                <p className="text-muted-foreground">Most of your leads come from referrals—you just need somewhere to send them.</p>
              </div>
              <div className="p-6 rounded-xl bg-card/50 border border-border/50">
                <Check className="h-6 w-6 text-accent mb-3" />
                <h3 className="text-lg font-semibold text-foreground mb-2">Budget-conscious owners</h3>
                <p className="text-muted-foreground">Want quality without monthly fees eating into your profits.</p>
              </div>
              <div className="p-6 rounded-xl bg-card/50 border border-border/50">
                <Check className="h-6 w-6 text-accent mb-3" />
                <h3 className="text-lg font-semibold text-foreground mb-2">DIY site replacements</h3>
                <p className="text-muted-foreground">Ready to upgrade from Wix/Squarespace to something professional.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 lg:py-24 bg-card/30">
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
                  className="rounded-xl bg-background border border-border/50 px-6"
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
      <RecommendedAddOns tier="launch" />

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Ready to Get Online?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            $249 today. Professional website in 5 days. No monthly fees until you want more.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" variant="gold" className="btn-glow">
              <a href="/checkout/launch">
                Start Your Project
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/smart-websites/smart-lead">See Capture →</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
