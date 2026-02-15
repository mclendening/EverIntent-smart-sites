/**
 * @fileoverview Shared "What's Unlimited" Section for AI Employee Pages
 * @module components/ai-employee/WhatsUnlimited
 * 
 * Reusable component that displays unlimited features and voice minutes
 * across After-Hours, Front Office, and Full AI Employee pages.
 * Accepts unique voice minute counts as props to customize per tier.
 * 
 * @see docs/everintent-brd-v35.0.md
 */

interface UnlimitedFeature {
  /** Feature name */
  name: string;
  /** Short description */
  description: string;
}

interface WhatsUnlimitedProps {
  /** Voice minutes included per month (e.g., "500", "1,000", "2,500") */
  voiceMinutes: string;
  /** Overage rate (e.g., "$0.06/min after") */
  overageRate?: string;
  /** Optional override for unlimited features list */
  features?: UnlimitedFeature[];
}

/** Default unlimited features shared across all AI Employee tiers */
const defaultFeatures: UnlimitedFeature[] = [
  { name: 'SMS/Text conversations', description: 'Unlimited AI-powered texting' },
  { name: 'Missed call text-back', description: 'Instant response, no per-message fees' },
  { name: 'AI review responses', description: 'Automated reputation management' },
  { name: 'CRM integration', description: 'All leads sync automatically' },
  { name: 'Custom AI training', description: 'Trained on your business' },
];

/**
 * WhatsUnlimited - Shared section for AI Employee unlimited features.
 * 
 * @component
 * @example
 * <WhatsUnlimited voiceMinutes="500" />
 * <WhatsUnlimited voiceMinutes="1,000" features={[...customFeatures]} />
 */
export function WhatsUnlimited({ 
  voiceMinutes, 
  overageRate = '$0.06/min after',
  features = defaultFeatures 
}: WhatsUnlimitedProps) {
  return (
    <section className="py-20 md:py-32 bg-card">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              <span className="text-foreground">What's</span>{' '}
              <span className="text-gradient">Unlimited</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              No per-message fees. No hidden costs. Just results.
            </p>
          </div>

          {/* Unlimited Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            {features.map((feature, index) => (
              <div key={index} className="p-5 rounded-xl bg-accent/5 border border-accent/20">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-accent font-bold">∞</span>
                  <h3 className="font-semibold text-foreground">{feature.name}</h3>
                </div>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Voice Minutes Callout */}
          <div className="p-6 rounded-2xl bg-accent/5 border border-accent/20 text-center">
            <h3 className="text-lg font-semibold text-foreground mb-2">Voice AI Minutes</h3>
            <p className="text-2xl font-bold text-accent mb-1">{voiceMinutes} voice minutes/mo</p>
            <p className="text-sm text-muted-foreground">{overageRate}</p>
          </div>
        </div>
      </div>
    </section>
  );
}