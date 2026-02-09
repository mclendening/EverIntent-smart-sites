/**
 * @fileoverview Checkout Step 1 - Plan Confirmation & Add-On Selection
 * @description Confirms pre-selected tier from URL, with option to change
 * @brd-reference Detail-Checkout-design-v5.2.md Section 4.1
 */

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TIER_CONFIG, ADDON_CONFIG, formatPrice, getTiersByProductLine, type TierSlug, type AddonSlug } from '@/config/checkoutConfig';
import type { CheckoutState } from '@/pages/checkout/CheckoutPage';
import { cn } from '@/lib/utils';
import { Check, Pencil, Globe, Bot } from 'lucide-react';

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
  const [isChangingPlan, setIsChangingPlan] = useState(false);
  const allAddons = Object.values(ADDON_CONFIG);

  // Get tiers grouped by product line
  const websiteTiers = getTiersByProductLine('smart-websites');
  const aiTiers = getTiersByProductLine('ai-employee');

  // Determine which tab should be active based on current selection
  const currentProductLine = tierConfig.productLine;

  const handlePlanSelect = (tier: TierSlug) => {
    onTierChange(tier);
    setIsChangingPlan(false);
  };

  return (
    <div className="space-y-8">
      {/* Step Header */}
      <div>
        <h1 className="text-2xl font-bold">Confirm Your Plan</h1>
        <p className="text-muted-foreground mt-1">
          Review your selection and add optional features
        </p>
      </div>

      {/* Plan Confirmation / Selection */}
      {!isChangingPlan ? (
        /* Confirmed Plan Card */
        <Card className="border-primary/50 bg-primary/5">
          <CardHeader className="pb-2">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  {tierConfig.productLine === 'smart-websites' ? (
                    <Globe className="w-5 h-5 text-primary" />
                  ) : (
                    <Bot className="w-5 h-5 text-primary" />
                  )}
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    {tierConfig.productLine === 'smart-websites' ? 'Smart Website' : 'AI Employee'}
                  </p>
                  <CardTitle className="text-xl">{tierConfig.displayName}</CardTitle>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setIsChangingPlan(true)}
                className="text-muted-foreground hover:text-foreground"
              >
                <Pencil className="w-4 h-4 mr-1" />
                Change
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">{tierConfig.tagline}</p>
            
            {/* Pricing */}
            <div className="flex items-baseline gap-2">
              {tierConfig.isOneTime ? (
                <>
                  <span className="text-3xl font-bold">${tierConfig.setupFee}</span>
                  <span className="text-muted-foreground">one-time</span>
                </>
              ) : (
                <>
                  <span className="text-3xl font-bold">${tierConfig.monthlyPrice}</span>
                  <span className="text-muted-foreground">/month</span>
                  {tierConfig.setupFee > 0 && (
                    <span className="text-sm text-muted-foreground ml-2">
                      + ${tierConfig.setupFee} setup
                    </span>
                  )}
                </>
              )}
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
      ) : (
        /* Plan Selector with Tabs */
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Select a Different Plan</CardTitle>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setIsChangingPlan(false)}
              >
                Cancel
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue={currentProductLine} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="smart-websites" className="flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  <span className="hidden sm:inline">Smart Websites</span>
                  <span className="sm:hidden">Websites</span>
                </TabsTrigger>
                <TabsTrigger value="ai-employee" className="flex items-center gap-2">
                  <Bot className="w-4 h-4" />
                  <span className="hidden sm:inline">AI Employee</span>
                  <span className="sm:hidden">AI</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="smart-websites" className="space-y-2 mt-0">
                {websiteTiers.map((tier) => (
                  <TierOption
                    key={tier.slug}
                    tier={tier}
                    isSelected={state.tier === tier.slug}
                    onSelect={() => handlePlanSelect(tier.slug)}
                  />
                ))}
              </TabsContent>
              
              <TabsContent value="ai-employee" className="space-y-2 mt-0">
                {aiTiers.map((tier) => (
                  <TierOption
                    key={tier.slug}
                    tier={tier}
                    isSelected={state.tier === tier.slug}
                    onSelect={() => handlePlanSelect(tier.slug)}
                  />
                ))}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}

      {/* Add-Ons Grid */}
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold">Enhance Your Plan</h2>
          <p className="text-sm text-muted-foreground">Add optional features to supercharge your results</p>
        </div>
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
                <div className="flex-1 pr-6">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1">
                    <div className="flex-1">
                      <p className="font-medium">{addon.displayName}</p>
                      <p className="text-sm text-muted-foreground mt-0.5">
                        {addon.description}
                      </p>
                    </div>
                    <div className="shrink-0">
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

/* Tier Option Component for the selector */
interface TierOptionProps {
  tier: typeof TIER_CONFIG[TierSlug];
  isSelected: boolean;
  onSelect: () => void;
}

function TierOption({ tier, isSelected, onSelect }: TierOptionProps) {
  return (
    <button
      onClick={onSelect}
      className={cn(
        'w-full text-left p-4 rounded-lg border transition-all',
        isSelected
          ? 'border-primary bg-primary/5 ring-1 ring-primary'
          : 'border-border hover:border-primary/50'
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-semibold">{tier.displayName}</span>
            {isSelected && (
              <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                <Check className="w-3 h-3 text-primary-foreground" />
              </div>
            )}
          </div>
          <p className="text-sm text-muted-foreground">{tier.tagline}</p>
        </div>
        <div className="text-right">
          {tier.isOneTime ? (
            <span className="font-semibold">${tier.setupFee} <span className="text-sm font-normal text-muted-foreground">one-time</span></span>
          ) : (
            <span className="font-semibold">${tier.monthlyPrice}<span className="text-sm font-normal text-muted-foreground">/mo</span></span>
          )}
        </div>
      </div>
    </button>
  );
}
