/**
 * @fileoverview Help center landing page with category navigation.
 * @module pages/Help
 * 
 * Hub page linking to FAQ, Support, and relevant resources.
 * Provides quick-access cards for common help topics.
 */

import { SEO } from '@/components/SEO';
import { HelpCircle, MessageSquare, FileText, BookOpen, Phone, Mail } from 'lucide-react';

/** Help category card data */
interface HelpCard {
  icon: React.ElementType;
  title: string;
  description: string;
  href: string;
  cta: string;
}

const helpCards: HelpCard[] = [
  {
    icon: HelpCircle,
    title: 'FAQ',
    description: 'Find quick answers to the most common questions about our services, pricing, and setup process.',
    href: '/faq',
    cta: 'Browse FAQ',
  },
  {
    icon: MessageSquare,
    title: 'Contact Support',
    description: 'Need help with your account or service? Our support team responds within 24 hours.',
    href: '/support',
    cta: 'Get Support',
  },
  {
    icon: FileText,
    title: 'Privacy & Legal',
    description: 'Review our privacy policy, terms of service, cookie policy, and data rights information.',
    href: '/legal/privacy',
    cta: 'View Policies',
  },
  {
    icon: BookOpen,
    title: 'Pricing & Plans',
    description: 'Compare Smart Website tiers and AI Employee modes. Find the right plan for your business.',
    href: '/pricing',
    cta: 'View Pricing',
  },
];

/**
 * Help center hub page.
 * 
 * @component
 */
const Help = () => {
  return (
    <>
      <SEO
        title="Help Center"
        description="Get help with EverIntent services. Browse FAQ, contact support, or explore our resources."
        canonical="/help"
        structuredData={[
          {
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'EverIntent Help Center',
            description: 'Get help with EverIntent Smart Websites and AI Employee services.',
            url: 'https://everintent.com/help',
          },
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              { '@type': 'Question', name: 'How do I get started with EverIntent?', acceptedAnswer: { '@type': 'Answer', text: 'Choose a Smart Website plan starting at $249, complete checkout, and our team builds your site in 5 business days. You can add AI Employee or other services at any time.' } },
              { '@type': 'Question', name: 'How do I contact EverIntent support?', acceptedAnswer: { '@type': 'Answer', text: 'Email support@everintent.com or call (562) 685-9500. All plans include email support with 24-hour response times. Scale plan customers get phone and strategy call access.' } },
              { '@type': 'Question', name: 'Can I upgrade my plan later?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Every Smart Website is built upgrade-ready. You can add AI Employee, review automation, or any add-on service at any time with no rebuilds required.' } },
            ],
          },
        ]}
      />

      {/* Hero */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container max-w-3xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Getting Started With EverIntent
          </h1>
          <p className="text-lg text-muted-foreground">
            Set up your account, connect your tools, and start capturing leads.
          </p>
        </div>
      </section>

      {/* Category Cards */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container max-w-4xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {helpCards.map((card) => (
              <a
                key={card.title}
                href={card.href}
                className="group block rounded-xl border border-border/40 bg-card p-6 hover:border-accent/40 hover:shadow-lg transition-all duration-300"
              >
                <card.icon className="h-8 w-8 text-accent mb-4" />
                <h2 className="text-lg font-semibold text-foreground mb-2 group-hover:text-accent transition-colors">
                  {card.title}
                </h2>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  {card.description}
                </p>
                <span className="text-sm font-medium text-accent">
                  {card.cta} →
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Direct Contact */}
      <section className="py-16 md:py-20 bg-card border-t border-border/20">
        <div className="container max-w-2xl text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Prefer to reach us directly?
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm">
            <a
              href="mailto:info@everintent.com"
              className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors"
            >
              <Mail className="h-4 w-4" />
              info@everintent.com
            </a>
            <a
              href="tel:+15626859500"
              className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors"
            >
              <Phone className="h-4 w-4" />
              (562) 685-9500
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default Help;
