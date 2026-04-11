/**
 * @fileoverview Centralized FAQ Section Component
 * @module components/faq/FAQSection
 *
 * Shared display component that replaces all inline FAQ rendering.
 * Supports filtering by category, tags, and products.
 * Auto-generates FAQPage JSON-LD for SEO.
 *
 * @see src/data/faqs.ts — Data source
 */

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { cn } from '@/lib/utils';
import {
  type FAQCategory,
  type FAQTag,
  type ProductTag,
  type FAQItem,
  filterFAQs,
  generateFAQSchema,
} from '@/data/faqs';

// ============================================
// TYPES
// ============================================

export interface FAQSectionProps {
  /** Filter by category (single or array) */
  category?: FAQCategory | FAQCategory[];
  /** Filter by tags (OR logic) */
  tags?: FAQTag[];
  /** Filter by product */
  products?: ProductTag[];
  /** Limit display count */
  maxItems?: number;
  /** Include FAQPage JSON-LD schema (default: true) */
  showSchema?: boolean;
  /** Sort objections first (default: true) */
  objectionsFirst?: boolean;
  /** Pass pre-filtered items directly (overrides category/tags/products) */
  items?: FAQItem[];
  /** Additional className for the wrapper */
  className?: string;
  /** Accordion item styling */
  variant?: 'default' | 'bordered' | 'minimal';
}

// ============================================
// COMPONENT
// ============================================

/**
 * Shared FAQ accordion with auto-generated JSON-LD.
 *
 * @example
 * // Show all pricing FAQs
 * <FAQSection category="pricing" />
 *
 * // Show FAQs for a specific product
 * <FAQSection products={['capture']} />
 *
 * // Show industry FAQs
 * <FAQSection category="industry-automotive" />
 */
export function FAQSection({
  category,
  tags,
  products,
  maxItems,
  showSchema = true,
  objectionsFirst = true,
  items: externalItems,
  className,
  variant = 'default',
}: FAQSectionProps) {
  const items = externalItems ?? filterFAQs({ category, tags, products, maxItems, objectionsFirst });

  if (items.length === 0) return null;

  const schema = showSchema ? generateFAQSchema(items) : null;

  const itemClassName = {
    default: 'border border-border/30 rounded-xl px-6 bg-card/30 data-[state=open]:bg-card/50',
    bordered: 'border border-border/40 rounded-lg px-4 bg-card',
    minimal: '',
  }[variant];

  return (
    <>
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}

      <Accordion type="single" collapsible className={cn('space-y-3', className)}>
        {items.map((item, index) => (
          <AccordionItem
            key={item.id}
            value={item.id}
            className={itemClassName}
          >
            <AccordionTrigger className="text-left text-foreground hover:text-accent hover:no-underline py-4">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground pb-4 leading-relaxed">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
}

export default FAQSection;
