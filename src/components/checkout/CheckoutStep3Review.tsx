/**
 * @fileoverview Checkout Step 3 - Review & Confirm
 * @description Final review with edit links and submit button per v5.2 spec Section 4.3
 */

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { TIER_CONFIG, ADDON_CONFIG, formatPrice } from '@/config/checkoutConfig';
import type { CheckoutState } from '@/pages/checkout/CheckoutPage';
import { Pencil, Loader2, AlertCircle } from 'lucide-react';

interface CheckoutStep3ReviewProps {
  state: CheckoutState;
  monthlyTotal: number;
  setupTotal: number;
  onEdit: (step: number) => void;
  onSubmit: () => void;
  isLoading: boolean;
  error: string | null;
}

export function CheckoutStep3Review({
  state,
  monthlyTotal,
  setupTotal,
  onEdit,
  onSubmit,
  isLoading,
  error,
}: CheckoutStep3ReviewProps) {
  const tierConfig = TIER_CONFIG[state.tier];

  return (
    <div className="space-y-8">
      {/* Step Header */}
      <div>
        <h1 className="text-2xl font-bold">Review Your Order</h1>
        <p className="text-muted-foreground mt-1">
          Please review your selections before completing checkout
        </p>
      </div>

      {/* Error Alert */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Plan & Add-Ons Section */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Plan & Add-Ons</CardTitle>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => onEdit(1)}
            className="gap-1"
          >
            <Pencil className="h-3 w-3" />
            Edit
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Selected Plan */}
          <div className="flex justify-between">
            <div>
              <p className="font-medium">{tierConfig.displayName}</p>
              <p className="text-sm text-muted-foreground">{tierConfig.tagline}</p>
            </div>
            <div className="text-right">
              {tierConfig.isOneTime ? (
                <p className="font-semibold text-accent">${tierConfig.setupFee}</p>
              ) : (
                <>
                  <p className="font-semibold text-accent">{formatPrice(tierConfig.monthlyPrice)}</p>
                  {tierConfig.setupFee > 0 && (
                    <p className="text-xs text-muted-foreground">+ ${tierConfig.setupFee} setup</p>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Selected Add-ons */}
          {state.addons.length > 0 && (
            <>
              <Separator />
              <div className="space-y-2">
                {state.addons.map((addonSlug) => {
                  const addon = ADDON_CONFIG[addonSlug];
                  return (
                    <div key={addonSlug} className="flex justify-between text-sm">
                      <span>{addon.displayName}</span>
                      <span className="text-accent/90">{formatPrice(addon.monthlyPrice)}</span>
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
              <div className="flex justify-between font-semibold text-lg">
                <span>Monthly Total</span>
                <span className="text-accent">{formatPrice(monthlyTotal)}</span>
              </div>
            )}
            {setupTotal > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">One-Time Setup</span>
                <span className="text-accent/80">${setupTotal}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Contact Details Section */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Your Details</CardTitle>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => onEdit(2)}
            className="gap-1"
          >
            <Pencil className="h-3 w-3" />
            Edit
          </Button>
        </CardHeader>
        <CardContent>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <dt className="text-muted-foreground">Name</dt>
              <dd className="font-medium">{state.firstName} {state.lastName}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Email</dt>
              <dd className="font-medium">{state.email}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Phone</dt>
              <dd className="font-medium">{state.phone}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Business</dt>
              <dd className="font-medium">{state.businessName}</dd>
            </div>
            {state.hasDomain && state.domainName && (
              <div>
                <dt className="text-muted-foreground">Domain</dt>
                <dd className="font-medium">{state.domainName}</dd>
              </div>
            )}
            {!state.hasDomain && (
              <div>
                <dt className="text-muted-foreground">Domain</dt>
                <dd className="font-medium text-muted-foreground italic">Need help with domain</dd>
              </div>
            )}
            {state.message && (
              <div className="sm:col-span-2">
                <dt className="text-muted-foreground">Message</dt>
                <dd className="font-medium">{state.message}</dd>
              </div>
            )}
          </dl>
        </CardContent>
      </Card>

      {/* Submit Button */}
      <div className="space-y-4">
        <Button 
          onClick={onSubmit} 
          size="lg" 
          className="w-full text-lg py-6"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Processing...
            </>
          ) : (
            'Complete Checkout'
          )}
        </Button>
        
        <p className="text-xs text-center text-muted-foreground">
          By clicking "Complete Checkout," you agree to our{' '}
          <a href="/legal/terms" target="_blank" className="underline">Terms of Service</a>.
          You'll be redirected to our secure payment page to complete your purchase.
        </p>
      </div>

      {/* Back Button */}
      <div className="flex justify-start">
        <Button variant="ghost" onClick={() => onEdit(2)}>
          ← Back to Details
        </Button>
      </div>
    </div>
  );
}
