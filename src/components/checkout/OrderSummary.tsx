/**
 * @fileoverview Order Summary Component
 * @description Sticky sidebar showing current tier, addons, and totals
 */

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { TIER_CONFIG, ADDON_CONFIG, formatPrice, type TierSlug, type AddonSlug } from '@/config/checkoutConfig';

interface OrderSummaryProps {
  tier: TierSlug;
  addons: AddonSlug[];
  monthlyTotal: number;
  setupTotal: number;
}

export function OrderSummary({ tier, addons, monthlyTotal, setupTotal }: OrderSummaryProps) {
  const tierConfig = TIER_CONFIG[tier];
  
  return (
    <Card className="sticky top-24 bg-card/50 backdrop-blur-sm border-border">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg">Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Selected Plan */}
        <div className="space-y-2">
          <div className="flex justify-between items-start">
            <div>
              <p className="font-medium">{tierConfig.displayName}</p>
              <p className="text-xs text-muted-foreground">{tierConfig.tagline}</p>
            </div>
            <div className="text-right">
              {tierConfig.isOneTime ? (
                <p className="font-semibold">${tierConfig.setupFee}</p>
              ) : (
                <>
                  <p className="font-semibold">{formatPrice(tierConfig.monthlyPrice)}</p>
                  {tierConfig.setupFee > 0 && (
                    <p className="text-xs text-muted-foreground">+ ${tierConfig.setupFee} setup</p>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
        
        {/* Selected Add-ons */}
        {addons.length > 0 && (
          <>
            <Separator />
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Add-Ons</p>
              {addons.map((addonSlug) => {
                const addon = ADDON_CONFIG[addonSlug];
                return (
                  <div key={addonSlug} className="flex justify-between text-sm">
                    <span>{addon.displayName}</span>
                    <span>{formatPrice(addon.monthlyPrice)}</span>
                  </div>
                );
              })}
            </div>
          </>
        )}
        
        {/* Totals */}
        <Separator />
        <div className="space-y-2">
          {!tierConfig.isOneTime && monthlyTotal > 0 && (
            <div className="flex justify-between font-semibold">
              <span>Monthly Total</span>
              <span className="text-primary">{formatPrice(monthlyTotal)}</span>
            </div>
          )}
          {setupTotal > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">One-Time Setup</span>
              <span>${setupTotal}</span>
            </div>
          )}
        </div>
        
        {/* Trust Badge */}
        <div className="pt-4 border-t border-border">
          <p className="text-xs text-center text-muted-foreground">
            🔒 Secure checkout powered by Stripe
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
