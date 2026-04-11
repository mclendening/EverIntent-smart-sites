/**
 * @fileoverview FAQ page with accordion-style Q&A sections.
 * @module pages/FAQ
 * 
 * Uses centralized FAQ system from src/data/faqs.ts.
 * All content managed via FAQSection component.
 */

import { SEO } from '@/components/SEO';
import { FAQSection } from '@/components/faq';
import { Globe, Bot, CreditCard, Rocket, Headphones } from 'lucide-react';
import { getFAQsByCategory, generateFAQSchema, filterFAQs } from '@/data/faqs';

const categoryIcons: Record<string, React.ElementType> = {
  'smart-websites': Globe,
  'ai-employee': Bot,
  'pricing': CreditCard,
  'setup': Rocket,
  'support': Headphones,
};

/**
 * FAQ page component with categorized accordion Q&A.
 */
const FAQ = () => {
  const categories = getFAQsByCategory();
  const allItems = categories.flatMap(c => c.items);

  return (
    <>
      <SEO
        title="FAQ"
        description="Common questions about EverIntent Smart Websites, AI Employee, pricing, setup, and support. Get answers fast."
        canonical="/faq"
        structuredData={generateFAQSchema(allItems)}
      />

      {/* Hero */}
      <section className="py-16 md:py-24 bg-background" aria-label="Frequently asked questions">
        <div className="container max-w-3xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Questions Before You Buy
          </h1>
          <p className="text-lg text-muted-foreground">
            Answers to help you choose the right plan for your business.
          </p>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container max-w-3xl space-y-10">
          {categories.map((cat) => {
            const Icon = categoryIcons[cat.category] || Globe;
            return (
              <div key={cat.category}>
                <div className="flex items-center gap-3 mb-4">
                  <Icon className="h-5 w-5 text-accent shrink-0" />
                  <h2 className="text-xl font-semibold text-foreground">
                    {cat.title}
                  </h2>
                </div>
                <FAQSection
                  items={cat.items}
                  showSchema={false}
                  variant="bordered"
                />
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-card border-t border-border/20">
        <div className="container max-w-2xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Still have questions?
          </h2>
          <p className="text-muted-foreground mb-8">
            Our team is here to help. Get in touch and we'll get back to you within 24 hours.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground px-8 py-3 text-sm font-medium shadow hover:bg-primary/90 transition-colors"
          >
            Contact Us
          </a>
        </div>
      </section>
    </>
  );
};

export default FAQ;
