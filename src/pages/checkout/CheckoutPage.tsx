/**
 * @fileoverview Checkout Page - Multi-step checkout flow per v5.2 spec
 * @description 3-step checkout: Selection → Details → Review with GHL redirect
 * 
 * @brd-reference Detail-Checkout-design-v5.2.md Section 4
 */

import { useState, useEffect, useRef } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import { SEO } from '@/components/SEO';
import { CheckoutStep1Selection } from '@/components/checkout/CheckoutStep1Selection';
import { CheckoutStep2Details } from '@/components/checkout/CheckoutStep2Details';
import { CheckoutStep3Review } from '@/components/checkout/CheckoutStep3Review';
import { CheckoutProgress } from '@/components/checkout/CheckoutProgress';
import { OrderSummary } from '@/components/checkout/OrderSummary';
import { TIER_CONFIG, ADDON_CONFIG, type TierSlug, type AddonSlug } from '@/config/checkoutConfig';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import {
  trackCheckoutStarted,
  trackPlanChanged,
  trackAddonToggled,
  trackDetailsCompleted,
  trackCheckoutSubmitted,
  trackCheckoutRedirected,
} from '@/lib/checkoutAnalytics';

// Storage key for sessionStorage persistence
const STORAGE_KEY = 'everintent_checkout_state';

export interface CheckoutState {
  tier: TierSlug;
  addons: AddonSlug[];
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  businessName: string;
  hasDomain: boolean;
  domainName: string;
  message: string;
  tcpaConsent: boolean;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
}

const getInitialState = (tier: TierSlug): CheckoutState => ({
  tier,
  addons: [],
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  businessName: '',
  hasDomain: false,
  domainName: '',
  message: '',
  tcpaConsent: false,
});

export default function CheckoutPage() {
  const { toast } = useToast();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  
  // Extract tier from URL path (e.g., /checkout/capture -> capture)
  const tierFromPath = location.pathname.split('/').pop() || 'capture';
  const validTier = TIER_CONFIG[tierFromPath as TierSlug] ? tierFromPath as TierSlug : 'capture';
  
  const [step, setStep] = useState(1);
  const [state, setState] = useState<CheckoutState>(() => getInitialState(validTier));
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);
  const [isResuming, setIsResuming] = useState(false);
  const hasTrackedStart = useRef(false);

  // SSG-safe: Only access sessionStorage after hydration
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Track checkout_started once on mount
  useEffect(() => {
    if (!isHydrated || hasTrackedStart.current) return;
    hasTrackedStart.current = true;
    trackCheckoutStarted(validTier);
  }, [isHydrated, validTier]);

  // Capture UTM params on mount (client-side only)
  useEffect(() => {
    if (!isHydrated) return;
    
    const utmSource = searchParams.get('utm_source') || undefined;
    const utmMedium = searchParams.get('utm_medium') || undefined;
    const utmCampaign = searchParams.get('utm_campaign') || undefined;
    
    if (utmSource || utmMedium || utmCampaign) {
      setState(prev => ({ ...prev, utmSource, utmMedium, utmCampaign }));
    }
  }, [isHydrated, searchParams]);

  // Handle ?resume=[id] - fetch from Supabase
  useEffect(() => {
    if (!isHydrated) return;
    
    const resumeId = searchParams.get('resume');
    if (!resumeId) {
      // No resume param - load from sessionStorage
      try {
        const savedState = sessionStorage.getItem(STORAGE_KEY);
        if (savedState) {
          const parsed = JSON.parse(savedState) as CheckoutState;
          // Only restore if tier matches URL (or if it's a valid tier)
          if (TIER_CONFIG[parsed.tier]) {
            setState(parsed);
          }
        }
      } catch {
        setState(getInitialState(validTier));
      }
      return;
    }

    // Resume from Supabase
    setIsResuming(true);
    (async () => {
      try {
        const { data, error: fetchError } = await supabase
          .from('checkout_submissions')
          .select('*')
          .eq('id', resumeId)
          .eq('status', 'pending')
          .maybeSingle();

        if (fetchError || !data) {
          setState(getInitialState(validTier));
          setIsResuming(false);
          // Delay toast so it renders after the main UI mounts
          setTimeout(() => {
            toast({
              title: 'Could not resume checkout',
              description: 'This checkout session may have expired. Starting fresh.',
              variant: 'destructive',
            });
          }, 300);
          return;
        }

        // Map DB record back to CheckoutState
        const addonsArray: AddonSlug[] = Array.isArray(data.addons)
          ? (data.addons as Array<{ slug: string }>).map(a => a.slug as AddonSlug).filter(slug => slug in ADDON_CONFIG)
          : [];

        const resumedState: CheckoutState = {
          tier: (data.selected_tier as TierSlug) || validTier,
          addons: addonsArray,
          firstName: data.first_name || '',
          lastName: data.last_name || '',
          email: data.email || '',
          phone: data.phone || '',
          businessName: data.business_name || '',
          hasDomain: data.has_domain ?? false,
          domainName: data.domain_name || '',
          message: data.message || '',
          tcpaConsent: data.tcpa_consent ?? false,
          utmSource: data.utm_source || undefined,
          utmMedium: data.utm_medium || undefined,
          utmCampaign: data.utm_campaign || undefined,
        };

        setState(resumedState);
        // Jump to review step for resumed checkouts
        setStep(3);
        toast({
          title: 'Checkout resumed',
          description: 'We restored your previous selections. Please review and complete your order.',
        });
      } catch {
        toast({
          title: 'Could not resume checkout',
          description: 'Starting a fresh checkout.',
          variant: 'destructive',
        });
        setState(getInitialState(validTier));
      } finally {
        setIsResuming(false);
      }
    })();
  }, [isHydrated, searchParams, validTier, toast]);

  // Persist to sessionStorage on state change (client-side only)
  useEffect(() => {
    if (!isHydrated) return;
    
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // sessionStorage not available
    }
  }, [state, isHydrated]);

  // Handle tier change - clear addons per v5.2 spec + track
  const handleTierChange = (newTier: TierSlug) => {
    const oldTier = state.tier;
    setState(prev => ({
      ...prev,
      tier: newTier,
      addons: [],
    }));
    trackPlanChanged(oldTier, newTier);
  };

  // Handle addon toggle + track
  const handleAddonToggle = (addon: AddonSlug) => {
    const wasSelected = state.addons.includes(addon);
    setState(prev => ({
      ...prev,
      addons: prev.addons.includes(addon)
        ? prev.addons.filter(a => a !== addon)
        : [...prev.addons, addon],
    }));
    trackAddonToggled(addon, !wasSelected, state.tier);
  };

  // Update individual fields
  const updateField = <K extends keyof CheckoutState>(field: K, value: CheckoutState[K]) => {
    setState(prev => ({ ...prev, [field]: value }));
  };

  // Step navigation - scroll to top when changing steps
  const nextStep = () => {
    if (step === 2) {
      trackDetailsCompleted(state.tier);
    }
    setStep(prev => Math.min(prev + 1, 3));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const prevStep = () => {
    setStep(prev => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const goToStep = (targetStep: number) => {
    setStep(targetStep);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Calculate totals
  const tierConfig = TIER_CONFIG[state.tier];
  const monthlyTotal = tierConfig.monthlyPrice + state.addons.reduce(
    (sum, addon) => sum + (ADDON_CONFIG[addon]?.monthlyPrice || 0), 
    0
  );
  const setupTotal = tierConfig.setupFee;

  const tierDisplayName = tierConfig?.displayName || 'Checkout';

  // Show loading state while resuming
  if (isResuming) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin mx-auto" aria-label="Loading" />
          <p className="text-muted-foreground">Resuming your checkout...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO 
        title={`Checkout: ${tierDisplayName} Plan`}
        description={`Complete your ${tierDisplayName} plan checkout. Get started with EverIntent today.`}
        canonical={`/checkout/${validTier}`}
        noIndex
      />
      
      <main className="min-h-screen bg-background pt-24 pb-24 md:pt-28 md:pb-12" aria-label="Checkout">
        <div className="container max-w-6xl mx-auto px-4">
          {/* Progress Indicator */}
          <CheckoutProgress currentStep={step} />
          
          {/* Mobile Order Summary - shows at top on mobile */}
          <div className="lg:hidden mt-6">
            <OrderSummary
              tier={state.tier}
              addons={state.addons}
              monthlyTotal={monthlyTotal}
              setupTotal={setupTotal}
            />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mt-6 lg:mt-8">
            {/* Main Content Area */}
            <div className="lg:col-span-2">
              {step === 1 && (
                <CheckoutStep1Selection
                  state={state}
                  onTierChange={handleTierChange}
                  onAddonToggle={handleAddonToggle}
                  onNext={nextStep}
                />
              )}
              
              {step === 2 && (
                <CheckoutStep2Details
                  state={state}
                  updateField={updateField}
                  onNext={nextStep}
                  onBack={prevStep}
                />
              )}
              
              {step === 3 && (
                <CheckoutStep3Review
                  state={state}
                  monthlyTotal={monthlyTotal}
                  setupTotal={setupTotal}
                  onEdit={goToStep}
                  onSubmit={async () => {
                    setIsLoading(true);
                    setError(null);
                    
                    trackCheckoutSubmitted(state.tier, monthlyTotal, setupTotal, state.addons.length);
                    
                    try {
                      if (!state.firstName || !state.email || !state.tcpaConsent) {
                        throw new Error('Missing required fields. Please go back and complete all fields.');
                      }

                      const addonDetails = state.addons.map(slug => ({
                        slug,
                        name: ADDON_CONFIG[slug]?.displayName,
                        monthlyPrice: ADDON_CONFIG[slug]?.monthlyPrice,
                        ghlTag: ADDON_CONFIG[slug]?.ghlTag,
                      }));

                      const { data, error: fnError } = await supabase.functions.invoke('start-checkout', {
                        body: {
                          first_name: state.firstName,
                          last_name: state.lastName,
                          email: state.email,
                          phone: state.phone || null,
                          business_name: state.businessName || null,
                          has_domain: state.hasDomain,
                          domain_name: state.domainName || null,
                          message: state.message || null,
                          selected_tier: state.tier,
                          addons: addonDetails,
                          monthly_total: monthlyTotal,
                          setup_total: setupTotal,
                          tcpa_consent: state.tcpaConsent,
                          utm_source: state.utmSource || null,
                          utm_medium: state.utmMedium || null,
                          utm_campaign: state.utmCampaign || null,
                          source_page: location.pathname,
                          user_agent: navigator.userAgent,
                        },
                      });

                      if (fnError) throw new Error(fnError.message || 'Checkout submission failed');
                      if (!data?.success) throw new Error(data?.error || 'Checkout submission failed');

                      sessionStorage.removeItem(STORAGE_KEY);

                      toast({
                        title: 'Order submitted!',
                        description: 'Redirecting to complete your payment...',
                      });

                      if (data.redirect_url) {
                        trackCheckoutRedirected(state.tier, data.redirect_url);
                        window.location.href = data.redirect_url;
                      }

                    } catch (err: unknown) {
                      const message = err instanceof Error ? err.message : 'Something went wrong. Please try again.';
                      setError(message);
                    } finally {
                      setIsLoading(false);
                    }
                  }}
                  isLoading={isLoading}
                  error={error}
                />
              )}
            </div>
            
            {/* Desktop Order Summary Sidebar - hidden on mobile */}
            <aside className="hidden lg:block lg:col-span-1" aria-label="Order summary">
              <OrderSummary
                tier={state.tier}
                addons={state.addons}
                monthlyTotal={monthlyTotal}
                setupTotal={setupTotal}
              />
            </aside>
          </div>
        </div>
      </main>
    </>
  );
}
