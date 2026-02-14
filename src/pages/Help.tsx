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
      />

      {/* Hero */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container max-w-3xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            How Can We Help?
          </h1>
          <p className="text-lg text-muted-foreground">
            Find answers, get support, or explore our resources.
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
