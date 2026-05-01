/**
 * @fileoverview Trusted AI Upgrade Card — shared marketing surface
 * @module components/ai-employee/TrustedAIUpgradeCard
 *
 * Single source of truth for the Trusted AI Upgrade pitch.
 * Used on Pricing page, AI tier landing pages, and the dedicated /trusted-ai page.
 *
 * Variants:
 *  - inline:  compact card for embedding inside a tier page
 *  - banner:  full-width hero band for the Pricing page bottom
 */

import { Shield, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ADDON_CONFIG, type TierSlug } from '@/config/checkoutConfig';

export interface TrustedAIUpgradeCardProps {
  /** Tier the user is currently viewing — used to deep-link checkout */
  tierContext?: TierSlug;
  variant: 'inline' | 'banner';
  className?: string;
}

const ELIGIBLE_DEFAULT: TierSlug = 'full-ai';

export function TrustedAIUpgradeCard({
  tierContext,
  variant,
  className,
}: TrustedAIUpgradeCardProps) {
  const config = ADDON_CONFIG['trusted-ai'];
  const eligibleTiers = config.eligibleTiers ?? [];
  const checkoutTier =
    tierContext && eligibleTiers.includes(tierContext) ? tierContext : ELIGIBLE_DEFAULT;
  const checkoutHref = `/checkout/${checkoutTier}?addon=trusted-ai`;

  const isBanner = variant === 'banner';

  return (
    <section
      className={cn(
        'relative overflow-hidden rounded-2xl border border-gold/30 bg-gradient-to-br from-gold/[0.06] via-card to-card',
        isBanner ? 'p-6 md:p-10' : 'p-5 md:p-6',
        className,
      )}
      aria-labelledby="trusted-ai-upgrade-headline"
    >
      <div className={cn('flex flex-col gap-5', isBanner && 'md:flex-row md:items-center md:gap-8')}>
        <div className={cn('flex items-start gap-4', isBanner && 'md:flex-1')}>
          <div
            className="shrink-0 w-12 h-12 rounded-xl bg-gold/15 flex items-center justify-center"
            aria-hidden="true"
          >
            <Shield className="w-6 h-6 text-gold" />
          </div>
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-gold">
              Recommended Upgrade
            </p>
            <h3
              id="trusted-ai-upgrade-headline"
              className={cn(
                'font-bold text-foreground leading-tight',
                isBanner ? 'text-2xl md:text-3xl' : 'text-xl',
              )}
            >
              Trusted AI: the AI that does exactly what you approved
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Standard AI is confident but not always correct. Trusted AI is built on a visual
              canvas, staged, and approved by you before it talks to a customer. Your script,
              your guardrails, your sign-off.
            </p>
            <p className="text-sm text-foreground/90">
              <span className="font-semibold text-gold">+ ${config.monthlyPrice}/mo</span>
              <span className="text-muted-foreground"> · </span>
              <span className="font-semibold text-gold">+ ${config.setupFee} one-time</span>
              <span className="text-muted-foreground"> {config.setupFeeLabel}</span>
            </p>
          </div>
        </div>

        <div
          className={cn(
            'flex flex-col gap-2 shrink-0',
            isBanner ? 'md:items-end' : '',
          )}
        >
          <a
            href={checkoutHref}
            className="btn-gold inline-flex items-center justify-center gap-2 min-h-[44px] rounded-lg px-5"
          >
            Add Trusted AI to my plan
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </a>
          <a
            href="/trusted-ai"
            className="text-sm text-muted-foreground hover:text-accent underline underline-offset-4 text-center md:text-right"
          >
            Learn how Trusted AI works
          </a>
        </div>
      </div>
    </section>
  );
}

export default TrustedAIUpgradeCard;