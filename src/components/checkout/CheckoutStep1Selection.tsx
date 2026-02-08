/**
 * @fileoverview Checkout Step 1 - Plan & Add-On Selection
 * @description Tier dropdown + add-on cards per v5.2 spec Section 4.1
 */

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { TIER_CONFIG, ADDON_CONFIG, formatPrice, type TierSlug, type AddonSlug } from '@/config/checkoutConfig';
import type { CheckoutState } from '@/pages/checkout/CheckoutPage';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface CheckoutStep1SelectionProps {
  state: CheckoutState;
  onTierChange: (tier: TierSlug) => void;
  onAddonToggle: (addon: AddonSlug) => void;
  onNext: () => void;
}

export function CheckoutStep1Selection({
  state,
  onTierChange,
  onAddonToggle,
  onNext,
}: CheckoutStep1SelectionProps) {
  const tierConfig = TIER_CONFIG[state.tier];
  const allTiers = Object.values(TIER_CONFIG);
  const allAddons = Object.values(ADDON_CONFIG);

  return (
    <div className="space-y-8">
      {/* Step Header */}
      <div>
        <h1 className="text-2xl font-bold">Choose Your Plan & Add-Ons</h1>
        <p className="text-muted-foreground mt-1">
          Select your plan and customize with optional add-ons
        </p>
      </div>

      {/* Plan Selection Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Your Plan</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="tier-select" className="text-sm font-medium">
              Select Plan
            </label>
            <Select
              value={state.tier}
              onValueChange={(value) => onTierChange(value as TierSlug)}
            >
              <SelectTrigger id="tier-select" className="w-full">
                <SelectValue placeholder="Select a plan" />
              </SelectTrigger>
              <SelectContent>
                {allTiers.map((tier) => (
                  <SelectItem key={tier.slug} value={tier.slug}>
                    <div className="flex items-center justify-between w-full gap-4">
                      <span>{tier.displayName}</span>
                      <span className="text-muted-foreground text-sm">
                        {tier.isOneTime 
                          ? `$${tier.setupFee} one-time` 
                          : formatPrice(tier.monthlyPrice)}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Plan Features */}
          <div className="pt-4 border-t border-border">
            <p className="text-sm font-medium mb-2">Included Features:</p>
            <ul className="space-y-1.5">
              {tierConfig.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Add-Ons Grid */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Optional Add-Ons</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {allAddons.map((addon) => {
            const isSelected = state.addons.includes(addon.slug);
            
            return (
              <label
                key={addon.slug}
                className={cn(
                  'relative flex cursor-pointer rounded-lg border p-4 transition-all',
                  isSelected
                    ? 'border-primary bg-primary/5 ring-1 ring-primary'
                    : 'border-border hover:border-primary/50'
                )}
              >
                <Checkbox
                  checked={isSelected}
                  onCheckedChange={() => onAddonToggle(addon.slug)}
                  className="sr-only"
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium">{addon.displayName}</p>
                      <p className="text-sm text-muted-foreground mt-0.5">
                        {addon.description}
                      </p>
                    </div>
                    <div className="ml-4 shrink-0">
                      <span className="font-semibold text-primary">
                        {formatPrice(addon.monthlyPrice)}
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Selection indicator */}
                {isSelected && (
                  <div className="absolute top-2 right-2">
                    <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                      <Check className="w-3 h-3 text-primary-foreground" />
                    </div>
                  </div>
                )}
              </label>
            );
          })}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-end pt-4">
        <Button onClick={onNext} size="lg">
          Continue
        </Button>
      </div>
    </div>
  );
}
