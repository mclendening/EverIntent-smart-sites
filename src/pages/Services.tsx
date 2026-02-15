/**
 * @fileoverview Services Hub Page - Central entry point for all EverIntent offerings
 * @module pages/Services
 * 
 * Organized by business outcomes (not product names) to match how SMB owners think.
 * Each section links to the relevant deep-dive product page.
 * 
 * Service categories (from BRD Section 5):
 * 1. Smart Websites - Professional web presence ($249–$297/mo)
 * 2. Get Found Online - SEO & local search visibility
 * 3. Never Miss a Lead - Missed call text-back, AI chat, lead capture
 * 4. Book More Jobs - Online booking & scheduling
 * 5. Build Your Reputation - Review automation & monitoring
 * 6. Let AI Handle It - AI Employee voice/SMS/chat automation
 * 7. Email Deliverability - Warmy-powered inbox placement
 * 
 * Adjacent high-margin services surfaced as add-on upsells:
 * - Social Autopilot ($79/mo)
 * - Omnichannel Inbox ($99/mo)
 * - Get Paid Now ($49/mo)
 * 
 * SEO: ItemList + FAQPage JSON-LD, canonical /services, local keywords
 * AEO: FAQ section with voice-search-optimized Q&A
 * All navigation uses native <a> tags per SSG standard
 */

import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/SEO';
import { CTAButton } from '@/components/CTAButton';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Globe,
  Search,
  PhoneOff,
  CalendarCheck,
  Star,
  Bot,
  Mail,
  ArrowRight,
  CheckCircle,
  Zap,
  MessageSquare,
  CreditCard,
  Share2,
  Inbox,
  ChevronDown,
  Phone,
  TrendingUp,
} from 'lucide-react';

// Service imagery imports
import imgSmartWebsites from '@/assets/services/smart-websites.jpg';
import imgAiEmployee from '@/assets/services/ai-employee.jpg';
import imgGetFound from '@/assets/services/get-found-online.jpg';
import imgNeverMiss from '@/assets/services/never-miss-lead.jpg';
import imgBookJobs from '@/assets/services/book-more-jobs.jpg';
import imgReputation from '@/assets/services/build-reputation.jpg';
import imgEmail from '@/assets/services/email-deliverability.jpg';

// ============================================
// SERVICE DATA
// ============================================

/**
 * Primary service offerings organized by business outcome.
 * Each maps to a dedicated product page.
 */
const primaryServices = [
  {
    icon: Globe,
    image: imgSmartWebsites,
    imageAlt: 'Professional business website displayed on a laptop in a modern office',
    title: 'Smart Websites',
    headline: 'A Website That Pays for Itself',
    description: 'Professional 5-page website built in 5 days. Mobile-first, SEO-ready, upgrade-ready with AI under the hood. Starting at just $249.',
    features: ['Mobile-optimized design', 'Built-in SEO', 'CRM-ready architecture', 'AI upgrade path'],
    cta: 'Explore Plans',
    href: '/smart-websites',
    pricing: 'From $249',
  },
  {
    icon: Bot,
    image: imgAiEmployee,
    imageAlt: 'Smartphone showing incoming call notification in a dark office at night',
    title: 'AI Employee',
    headline: 'Let AI Handle It, 24/7',
    description: 'AI answers calls after hours, screens during business hours, texts back missed calls, and books appointments. Your virtual receptionist that never sleeps.',
    features: ['24/7 call answering', 'Missed call text-back', 'Lead qualification', 'Appointment booking'],
    cta: 'See AI Plans',
    href: '/let-ai-handle-it',
    pricing: 'From $197/mo',
  },
  {
    icon: Search,
    image: imgGetFound,
    imageAlt: 'Business owner viewing Google search results showing local business rankings',
    title: 'Get Found Online',
    headline: 'Show Up When Customers Search',
    description: 'SEO fundamentals baked into every site. Google Business optimization and local search visibility so customers find you, not your competitor.',
    features: ['On-page SEO', 'Google Business sync', 'Local search targeting', 'Schema markup'],
    cta: 'Learn More',
    href: '/get-found-online',
    pricing: 'Included',
  },
  {
    icon: PhoneOff,
    image: imgNeverMiss,
    imageAlt: 'Contractor checking lead notifications on phone at a job site',
    title: 'Never Miss a Lead',
    headline: 'Every Inquiry Gets a Response',
    description: '85% of callers won\'t leave a voicemail. Missed call text-back, AI chat, and 24/7 lead capture ensure no opportunity falls through the cracks.',
    features: ['Missed call text-back', 'AI web chat', 'Form capture', 'Instant notifications'],
    cta: 'Stop Losing Leads',
    href: '/never-miss-a-lead',
    pricing: 'From $97/mo',
  },
  {
    icon: CalendarCheck,
    image: imgBookJobs,
    imageAlt: 'Tablet showing booking calendar with confirmed appointments',
    title: 'Book More Jobs',
    headline: 'Customers Book, You Show Up',
    description: 'Online booking eliminates phone tag. Automated reminders reduce no-shows. Calendar integration keeps your schedule tight.',
    features: ['Online booking widget', 'Automated reminders', 'Calendar sync', 'Deposit collection'],
    cta: 'Automate Scheduling',
    href: '/book-more-jobs',
    pricing: 'From $197/mo',
  },
  {
    icon: Star,
    image: imgReputation,
    imageAlt: 'Five star review notification on smartphone screen',
    title: 'Build Your Reputation',
    headline: 'More 5-Star Reviews, Automatically',
    description: '93% of customers check reviews first. Automated review requests after every job, response templates, and reputation monitoring across platforms.',
    features: ['Automated review requests', 'Review monitoring', 'Response templates', 'Reputation alerts'],
    cta: 'Grow Your Reviews',
    href: '/build-your-reputation',
    pricing: 'From $197/mo',
  },
  {
    icon: Mail,
    image: imgEmail,
    imageAlt: 'Email deliverability dashboard showing high inbox placement rates',
    title: 'Email Deliverability',
    headline: 'Your Emails Deserve to Be Seen',
    description: 'AI-powered email warm-up with inbox placement testing across 35+ providers. Stop landing in spam. 95%+ inbox placement guaranteed.',
    features: ['AI warm-up engine', 'Inbox placement testing', 'Domain health monitoring', 'Blacklist alerts'],
    cta: 'Boost Deliverability',
    href: '/warmy-email-deliverability',
    pricing: '$49/mo',
  },
];

/**
 * High-margin add-on services for upsell section
 */
const addOnServices = [
  {
    icon: Share2,
    title: 'Social Autopilot',
    description: 'Automated social posting and content calendar across all platforms.',
    price: '$79/mo',
    href: '/smart-websites/add-ons',
  },
  {
    icon: Inbox,
    title: 'Omnichannel Inbox',
    description: 'WhatsApp, Facebook, Instagram, and Google Business chat in one place.',
    price: '$99/mo',
    href: '/smart-websites/add-ons',
  },
  {
    icon: CreditCard,
    title: 'Get Paid Now',
    description: 'Text-to-pay invoicing and proposals sent in 60 seconds.',
    price: '$49/mo',
    href: '/smart-websites/add-ons',
  },
  {
    icon: MessageSquare,
    title: 'AI Voice Chat',
    description: 'Voice-enabled AI chat widget embedded directly on your website.',
    price: '$79/mo',
    href: '/smart-websites/add-ons',
  },
];

/**
 * FAQ items for SEO/AEO structured data
 */
const faqItems = [
  {
    question: 'What services does EverIntent offer for local businesses?',
    answer: 'EverIntent provides smart websites starting at $249, AI Employee call answering from $197/month, email deliverability services, review automation, online booking, lead capture, and SEO. All designed specifically for local service businesses in Long Beach, Orange County, and Los Angeles.',
  },
  {
    question: 'How much does a website cost with EverIntent?',
    answer: 'Our Launch plan starts at $249 one-time for a professional 5-page website. Monthly plans with CRM, lead capture, and automation range from $97 to $297 per month. Every site is mobile-optimized, SEO-ready, and built to convert visitors into customers.',
  },
  {
    question: 'What is the AI Employee and how does it work?',
    answer: 'The AI Employee is a managed AI receptionist that answers calls, qualifies leads, books appointments, and sends missed-call text-backs. It works 24/7 using voice AI and SMS automation powered by GoHighLevel. Plans start at $197/month for after-hours coverage.',
  },
  {
    question: 'Do you serve businesses outside of Southern California?',
    answer: 'While our primary service areas are Long Beach, Orange County, and Los Angeles, our smart websites and AI Employee services work nationwide. The AI answering service and email deliverability tools have no geographic limitations.',
  },
  {
    question: 'Can I start with just a website and add AI later?',
    answer: 'Absolutely. Every smart website ships upgrade-ready with automation and AI built into the architecture. You can start with our $249 Launch plan and add AI Employee, review automation, or any add-on when you are ready. No rebuilds required.',
  },
  {
    question: 'What industries do you specialize in?',
    answer: 'We serve 65+ local business verticals across four main categories: Home Services (HVAC, plumbing, electrical, roofing), Professional Services (legal, real estate, accounting), Health & Wellness (dental, medspa, chiropractic), and Automotive (auto repair, detailing, tire shops).',
  },
];

/**
 * Structured data for SEO - ItemList of all services
 */
const structuredData = [
  {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'EverIntent Services for Local Businesses',
    description: 'Smart websites, AI automation, and digital marketing services for local service businesses in Long Beach, Orange County, and Los Angeles.',
    numberOfItems: primaryServices.length,
    itemListElement: primaryServices.map((service, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Service',
        name: service.title,
        description: service.description,
        url: `https://everintent.com${service.href}`,
        provider: {
          '@type': 'LocalBusiness',
          name: 'EverIntent',
          url: 'https://everintent.com',
          areaServed: [
            { '@type': 'City', name: 'Long Beach', containedInPlace: { '@type': 'State', name: 'California' } },
            { '@type': 'City', name: 'Los Angeles', containedInPlace: { '@type': 'State', name: 'California' } },
            { '@type': 'AdministrativeArea', name: 'Orange County', containedInPlace: { '@type': 'State', name: 'California' } },
          ],
        },
      },
    })),
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  },
];

// ============================================
// COMPONENT
// ============================================

/**
 * Services - Premium hub page showcasing all EverIntent service offerings.
 * 
 * Organized by business outcomes for SMB decision-makers.
 * Every section includes native <a> links to deep-dive pages.
 * FAQ section pre-rendered in DOM for AEO visibility.
 * 
 * @returns Services hub page with full SEO/AEO structured data
 */
export default function Services() {
  return (
    <>
      <SEO
        title="Services for Local Businesses"
        description="Websites from $249, AI receptionist from $197/mo, lead capture, and review automation. Serving Long Beach, LA & Orange County."
        canonical="/services"
        structuredData={structuredData}
      />

      {/* Hero Section */}
      <section className="relative pt-20 pb-12 md:pt-28 md:pb-16 overflow-hidden">
        {/* Animated background orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 -left-32 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-accent/3 rounded-full blur-3xl" />
        </div>

        <div className="container relative z-10 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-accent/10 border border-accent/20 mb-4 text-xs">
            <Zap className="w-3 h-3 text-accent" />
            <span className="font-medium text-accent">Serving Long Beach, Orange County & Los Angeles</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 max-w-3xl mx-auto leading-tight">
            Every Tool Your Business Needs to{' '}
            <span className="text-accent">Grow</span>
          </h1>

          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
            From your first website to a full AI-powered office. Smart websites, AI call answering, 
            lead capture, review automation, and email deliverability, all under one roof.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <CTAButton to="/pricing" defaultText="See Pricing" hoverText="Find Your Plan!" />
            <a href="/contact">
              <Button variant="outline" size="lg" className="gap-2 w-full sm:w-auto">
                <Phone className="w-4 h-4" />
                Book a Strategy Call
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* How It Works - 3-step conversion ladder */}
      <section className="py-8 md:py-10 border-y border-border/20 bg-muted/20">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto">
            {[
              { step: '01', title: 'Launch Your Site', desc: 'Professional website in 5 days, from $249', icon: Globe },
              { step: '02', title: 'Capture Every Lead', desc: 'AI chat, missed-call text-back, review requests', icon: PhoneOff },
              { step: '03', title: 'Automate Growth', desc: 'AI Employee handles calls, booking & follow-up', icon: Bot },
            ].map((item) => (
              <div key={item.step} className="flex items-start gap-3 p-4 rounded-lg bg-card border border-border/30">
                <div className="flex-shrink-0 w-8 h-8 rounded-md bg-accent/10 flex items-center justify-center">
                  <span className="text-xs font-bold text-accent">{item.step}</span>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground">{item.title}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Primary Services Grid */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              Our <span className="text-accent">Services</span>
            </h2>
            <p className="text-sm text-muted-foreground max-w-lg mx-auto">
              Built for local service businesses. Each service works standalone or as part of a complete growth system.
            </p>
          </div>

          <div className="grid gap-6 md:gap-8">
            {primaryServices.map((service, index) => (
              <div
                key={service.title}
                className={`grid md:grid-cols-2 gap-6 items-center ${
                  index % 2 === 1 ? 'md:[&>*:first-child]:order-2' : ''
                }`}
              >
                {/* Content */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-accent/10 border border-accent/20">
                      <service.icon className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-foreground">{service.title}</h3>
                      <span className="text-xs font-medium text-accent">{service.pricing}</span>
                    </div>
                  </div>

                  <p className="text-xl md:text-2xl font-semibold text-foreground leading-snug">
                    {service.headline}
                  </p>

                  <p className="text-sm text-muted-foreground">{service.description}</p>

                  <ul className="grid grid-cols-2 gap-1.5">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-1.5 text-xs text-foreground/80">
                        <CheckCircle className="w-3.5 h-3.5 text-accent flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <a href={service.href}>
                    <Button variant="outline" className="gap-2 mt-2">
                      {service.cta}
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </a>
                </div>

                {/* Visual Card — Lifestyle photography */}
                <Card className="bg-muted/30 border-border/30 overflow-hidden">
                  <CardContent className="p-0">
                    <div className="relative aspect-[3/2] overflow-hidden">
                      <img
                        src={service.image}
                        alt={service.imageAlt}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                        <p className="text-2xl md:text-3xl font-bold text-foreground">{service.pricing}</p>
                        <a 
                          href={service.href}
                          className="mt-2 text-xs text-accent hover:text-accent/80 transition-colors inline-flex items-center gap-1"
                        >
                          Learn more <ArrowRight className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Add-On Upsell Section */}
      <section className="py-10 md:py-14 bg-muted/20 border-y border-border/20">
        <div className="container">
          <div className="text-center mb-8">
            <h2 className="text-xl md:text-2xl font-bold mb-2">
              Power-Up <span className="text-accent">Add-Ons</span>
            </h2>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              High-impact tools you can bolt onto any plan. Low effort, high margin, instant results.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {addOnServices.map((addon) => (
              <a
                key={addon.title}
                href={addon.href}
                className="group block p-4 rounded-lg bg-card border border-border/30 hover:border-accent/30 transition-all duration-300"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-1.5 rounded-md bg-accent/10">
                    <addon.icon className="w-4 h-4 text-accent" />
                  </div>
                  <span className="text-sm font-semibold text-foreground group-hover:text-accent transition-colors">
                    {addon.title}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mb-3">{addon.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-accent">{addon.price}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-accent transition-colors" />
                </div>
              </a>
            ))}
          </div>

          <div className="text-center mt-6">
            <a href="/smart-websites/add-ons">
              <Button variant="outline" size="sm" className="gap-2">
                View All Add-Ons
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Industries We Serve */}
      <section className="py-10 md:py-14">
        <div className="container">
          <div className="text-center mb-8">
            <h2 className="text-xl md:text-2xl font-bold mb-2">
              65+ Industries <span className="text-accent">Served</span>
            </h2>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              From HVAC to dental to auto repair: we know your industry.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto">
            {[
              { title: 'Home Services', desc: 'HVAC, Plumbing, Electrical, Roofing', href: '/industries/home-services', count: '31 verticals' },
              { title: 'Professional', desc: 'Legal, Real Estate, Accounting', href: '/industries/professional-services', count: '15 verticals' },
              { title: 'Health & Wellness', desc: 'Dental, MedSpa, Chiropractic', href: '/industries/health-wellness', count: '15 verticals' },
              { title: 'Automotive', desc: 'Auto Repair, Detailing, Towing', href: '/industries/automotive-services', count: '10 verticals' },
            ].map((industry) => (
              <a
                key={industry.title}
                href={industry.href}
                className="group block p-4 rounded-lg bg-card border border-border/30 hover:border-accent/30 transition-all text-center"
              >
                <h3 className="text-sm font-semibold text-foreground group-hover:text-accent transition-colors mb-1">
                  {industry.title}
                </h3>
                <p className="text-[10px] text-muted-foreground mb-2">{industry.desc}</p>
                <span className="text-[10px] text-accent font-medium">{industry.count}</span>
              </a>
            ))}
          </div>

          <div className="text-center mt-4">
            <a href="/industries" className="text-sm text-accent hover:underline inline-flex items-center gap-1">
              Browse All Industries <ArrowRight className="w-3 h-3" />
            </a>
          </div>
        </div>
      </section>

      {/* Local Trust Bar */}
      <section className="py-6 border-y border-border/20 bg-muted/10">
        <div className="container">
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-accent" />
              <span>Serving <strong className="text-foreground">Long Beach</strong>, <strong className="text-foreground">Orange County</strong> & <strong className="text-foreground">Los Angeles</strong></span>
            </div>
            <span className="hidden md:inline text-border">|</span>
            <span><strong className="text-foreground">65+</strong> industry verticals</span>
            <span className="hidden md:inline text-border">|</span>
            <span>Setup in <strong className="text-foreground">5 days</strong></span>
            <span className="hidden md:inline text-border">|</span>
            <span>From <strong className="text-foreground">$249</strong></span>
          </div>
        </div>
      </section>

      {/* FAQ Section - Pre-rendered for AEO */}
      <section className="py-10 md:py-14">
        <div className="container max-w-3xl">
          <h2 className="text-xl md:text-2xl font-bold text-center mb-8">
            Frequently Asked <span className="text-accent">Questions</span>
          </h2>

          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <details
                key={index}
                className="group bg-card border border-border/30 rounded-lg overflow-hidden"
              >
                <summary className="flex items-center justify-between p-4 cursor-pointer list-none">
                  <h3 className="text-sm font-semibold text-foreground pr-4">{item.question}</h3>
                  <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0 transition-transform group-open:rotate-180" />
                </summary>
                <div className="px-4 pb-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-12 md:py-16 bg-muted/20 border-t border-border/20">
        <div className="container text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Ready to Stop Losing <span className="text-accent">Customers</span>?
          </h2>
          <p className="text-sm text-muted-foreground max-w-lg mx-auto mb-6">
            Whether you need a professional website, an AI receptionist, or a complete growth system, 
            we have the plan for you. Most businesses launch in 5 days.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <CTAButton to="/pricing" defaultText="View All Plans" hoverText="Let's Build!" />
            <a href="/contact">
              <Button variant="outline" size="lg" className="gap-2 w-full sm:w-auto">
                <Phone className="w-4 h-4" />
                Talk to a Human
              </Button>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
