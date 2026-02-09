/**
 * @fileoverview Checkout Page - Multi-step checkout flow per v5.2 spec
 * @description 3-step checkout: Selection → Details → Review with GHL redirect
 * 
 * @brd-reference Detail-Checkout-design-v5.2.md Section 4
 */

import { useState, useEffect } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import { SEO } from '@/components/SEO';
import { CheckoutStep1Selection } from '@/components/checkout/CheckoutStep1Selection';
import { CheckoutStep2Details } from '@/components/checkout/CheckoutStep2Details';
import { CheckoutStep3Review } from '@/components/checkout/CheckoutStep3Review';
import { CheckoutProgress } from '@/components/checkout/CheckoutProgress';
import { OrderSummary } from '@/components/checkout/OrderSummary';
import { TIER_CONFIG, ADDON_CONFIG, type TierSlug, type AddonSlug } from '@/config/checkoutConfig';

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

  // SSG-safe: Only access sessionStorage after hydration
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Load from sessionStorage on mount (handles refresh and resume)
  // Only runs client-side after hydration
  useEffect(() => {
    if (!isHydrated) return;
    
    const resumeId = searchParams.get('resume');
    
    try {
      const savedState = sessionStorage.getItem(STORAGE_KEY);
      if (savedState) {
        const parsed = JSON.parse(savedState) as CheckoutState;
        setState(parsed);
        // If resuming, go to review step
        if (resumeId) {
          setStep(3);
        }
      }
    } catch {
      // Invalid state or SSR, use defaults
      setState(getInitialState(validTier));
    }
  }, [isHydrated, validTier, searchParams]);

  // Persist to sessionStorage on state change (client-side only)
  useEffect(() => {
    if (!isHydrated) return;
    
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // sessionStorage not available
    }
  }, [state, isHydrated]);

  // Handle tier change - clear addons per v5.2 spec
  const handleTierChange = (newTier: TierSlug) => {
    setState(prev => ({
      ...prev,
      tier: newTier,
      addons: [], // Reset addons on tier change
    }));
  };

  // Handle addon toggle
  const handleAddonToggle = (addon: AddonSlug) => {
    setState(prev => ({
      ...prev,
      addons: prev.addons.includes(addon)
        ? prev.addons.filter(a => a !== addon)
        : [...prev.addons, addon],
    }));
  };

  // Update individual fields
  const updateField = <K extends keyof CheckoutState>(field: K, value: CheckoutState[K]) => {
    setState(prev => ({ ...prev, [field]: value }));
  };

  // Step navigation - scroll to top when changing steps
  const nextStep = () => {
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

  // Get tier display name for SEO - use colon per SEO standard, no manual brand append
  const tierDisplayName = tierConfig?.displayName || 'Checkout';

  return (
    <>
      <SEO 
        title={`Checkout: ${tierDisplayName} Plan`}
        description={`Complete your ${tierDisplayName} plan checkout. Get started with EverIntent today.`}
        canonical={`/checkout/${validTier}`}
        noIndex
      />
      
      <div className="min-h-screen bg-background pt-24 pb-24 md:pt-28 md:pb-12">
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
                    // Submit logic will be wired in Batch 4
                  }}
                  isLoading={isLoading}
                  error={error}
                />
              )}
            </div>
            
            {/* Desktop Order Summary Sidebar - hidden on mobile */}
            <div className="hidden lg:block lg:col-span-1">
              <OrderSummary
                tier={state.tier}
                addons={state.addons}
                monthlyTotal={monthlyTotal}
                setupTotal={setupTotal}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
