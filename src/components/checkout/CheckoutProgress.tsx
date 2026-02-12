/**
 * @fileoverview Checkout Progress Indicator
 * @description Visual progress indicator for the 3-step checkout flow.
 * Consumes --module-checkout-progress-* CSS variables with semantic fallbacks.
 */

import React from 'react';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface CheckoutProgressProps {
  currentStep: number;
}

const steps = [
  { number: 1, label: 'Plan & Add-Ons' },
  { number: 2, label: 'Your Details' },
  { number: 3, label: 'Review' },
];

/** Build hsl() from a module token with a semantic fallback */
const mod = (token: string, fallback: string) =>
  `hsl(var(--module-checkout-progress-${token}, var(--${fallback})))`;

/** Build hsl() with alpha from a module token with a semantic fallback */
const modAlpha = (token: string, fallback: string, alpha: number) =>
  `hsl(var(--module-checkout-progress-${token}, var(--${fallback})) / ${alpha})`;

export function CheckoutProgress({ currentStep }: CheckoutProgressProps) {
  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = currentStep > step.number;
          const isCurrent = currentStep === step.number;

          const circleStyle: React.CSSProperties = isCompleted
            ? {
                background: mod('step-complete-bg', 'primary'),
                borderColor: mod('step-active-border', 'primary'),
                color: mod('step-complete-fg', 'primary-foreground'),
              }
            : isCurrent
              ? {
                  borderColor: mod('step-active-border', 'primary'),
                  color: mod('label-active', 'primary'),
                  background: modAlpha('step-active-bg', 'primary', 0.1),
                }
              : {
                  borderColor: modAlpha('step-inactive-border', 'muted-foreground', 0.3),
                  color: mod('step-inactive-fg', 'muted-foreground'),
                };

          return (
            <React.Fragment key={step.number}>
              {/* Step Circle */}
              <div className="flex flex-col items-center">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all"
                  style={circleStyle}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <span className="text-sm font-semibold">{step.number}</span>
                  )}
                </div>
                <span
                  className="mt-2 text-xs font-medium text-center hidden sm:block"
                  style={{
                    color: isCurrent
                      ? mod('label-active', 'primary')
                      : mod('label-inactive', 'muted-foreground'),
                  }}
                >
                  {step.label}
                </span>
              </div>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div
                  className="flex-1 h-0.5 mx-2 transition-colors"
                  style={{
                    background:
                      currentStep > step.number
                        ? mod('connector-active', 'primary')
                        : modAlpha('connector-inactive', 'muted-foreground', 0.3),
                  }}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Mobile Step Label */}
      <p
        className="text-center text-sm mt-4 sm:hidden"
        style={{ color: mod('label-inactive', 'muted-foreground') }}
      >
        Step {currentStep} of 3: {steps[currentStep - 1]?.label}
      </p>
    </div>
  );
}
