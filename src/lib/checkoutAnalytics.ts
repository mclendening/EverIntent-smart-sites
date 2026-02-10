/**
 * @fileoverview GTM dataLayer event helpers for checkout flow
 * @description Fires analytics events per v5.2 Section 9
 */

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

function pushEvent(event: string, data?: Record<string, unknown>) {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...data });
}

export function trackCheckoutStarted(tier: string) {
  pushEvent('checkout_started', { tier });
}

export function trackPlanChanged(fromTier: string, toTier: string) {
  pushEvent('plan_changed', { from_tier: fromTier, to_tier: toTier });
}

export function trackAddonToggled(addon: string, selected: boolean, tier: string) {
  pushEvent('addon_toggled', { addon, selected, tier });
}

export function trackDetailsCompleted(tier: string) {
  pushEvent('details_completed', { tier });
}

export function trackCheckoutSubmitted(tier: string, monthlyTotal: number, setupTotal: number, addonCount: number) {
  pushEvent('checkout_submitted', { tier, monthly_total: monthlyTotal, setup_total: setupTotal, addon_count: addonCount });
}

export function trackCheckoutRedirected(tier: string, redirectUrl: string) {
  pushEvent('checkout_redirected', { tier, redirect_url: redirectUrl });
}
