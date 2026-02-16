/**
 * @fileoverview Checkout Configuration - Tier and Add-on definitions
 * @description Central config for all checkout-related pricing and metadata
 * 
 * @brd-reference Detail-Checkout-design-v5.2.md Section 1.1
 * @brd-reference BRD-CODEBASE-DELTA-REPORT-v35.3.md Section 28
 */

// ============================================
// TIER DEFINITIONS
// ============================================

export type TierSlug = 
  | 'launch' 
  | 'capture' 
  | 'convert' 
  | 'scale'
  | 'after-hours'
  | 'front-office'
  | 'full-ai'
  | 'web-chat';

export interface TierConfig {
  slug: TierSlug;
  displayName: string;
  tagline: string;
  monthlyPrice: number;
  setupFee: number;
  isOneTime: boolean;
  productLine: 'smart-websites' | 'ai-employee';
  ghlCheckoutPath: string;
  features: string[];
}

export const TIER_CONFIG: Record<TierSlug, TierConfig> = {
  // Smart Websites line
  launch: {
    slug: 'launch',
    displayName: 'Launch',
    tagline: 'Get online fast',
    monthlyPrice: 0,
    setupFee: 249,
    isOneTime: true,
    productLine: 'smart-websites',
    ghlCheckoutPath: '/launch',
    features: [
      'Professional 5-page website',
      'Mobile-optimized design',
      'Basic SEO setup',
      'Contact form',
    ],
  },
  capture: {
    slug: 'capture',
    displayName: 'Capture',
    tagline: 'Never miss a lead',
    monthlyPrice: 97,
    setupFee: 249,
    isOneTime: false,
    productLine: 'smart-websites',
    ghlCheckoutPath: '/capture',
    features: [
      'Everything in Launch',
      'Missed Call Text Back',
      'Unlimited Forms & Calendars',
      'CRM Integration',
      'Basic Automations',
    ],
  },
  convert: {
    slug: 'convert',
    displayName: 'Convert',
    tagline: 'Turn visitors into customers',
    monthlyPrice: 197,
    setupFee: 249,
    isOneTime: false,
    productLine: 'smart-websites',
    ghlCheckoutPath: '/convert',
    features: [
      'Everything in Capture',
      'Advanced Automations',
      'Online Payments',
      'Booking System',
      'Review Management',
    ],
  },
  scale: {
    slug: 'scale',
    displayName: 'Scale',
    tagline: 'AI-powered growth engine',
    monthlyPrice: 297,
    setupFee: 249,
    isOneTime: false,
    productLine: 'smart-websites',
    ghlCheckoutPath: '/scale',
    features: [
      'Everything in Convert',
      'AI Chat Widget',
      'Unlimited AI Features',
      'Priority Support',
    ],
  },
  
  // AI Employee line
  'after-hours': {
    slug: 'after-hours',
    displayName: 'After-Hours AI',
    tagline: 'Never miss another call',
    monthlyPrice: 197,
    setupFee: 997,
    isOneTime: false,
    productLine: 'ai-employee',
    ghlCheckoutPath: '/after-hours',
    features: [
      '24/7 AI Call Answering',
      'Missed Call Text Back',
      'Appointment Booking',
      'Lead Qualification',
    ],
  },
  'front-office': {
    slug: 'front-office',
    displayName: 'Front Office AI',
    tagline: 'Your AI receptionist',
    monthlyPrice: 297,
    setupFee: 1497,
    isOneTime: false,
    productLine: 'ai-employee',
    ghlCheckoutPath: '/front-office',
    features: [
      'Everything in After-Hours',
      'Call Screening',
      'Advanced Lead Qualification',
      'Warm Call Transfer',
    ],
  },
  'full-ai': {
    slug: 'full-ai',
    displayName: 'Full AI Employee',
    tagline: 'Complete AI-powered office',
    monthlyPrice: 597,
    setupFee: 2500,
    isOneTime: false,
    productLine: 'ai-employee',
    ghlCheckoutPath: '/full-ai',
    features: [
      'Everything in Front Office',
      'AI Voice Chat',
      'AI Web Chat',
      'SMS Conversations',
      'Unlimited AI Usage',
    ],
  },
  'web-chat': {
    slug: 'web-chat',
    displayName: 'Web Chat Only',
    tagline: 'AI chat for your website',
    monthlyPrice: 79,
    setupFee: 0,
    isOneTime: false,
    productLine: 'ai-employee',
    ghlCheckoutPath: '/web-chat',
    features: [
      'AI Web Chat Widget',
      'Lead Capture',
      'Appointment Booking',
    ],
  },
};

// ============================================
// ADD-ON DEFINITIONS
// ============================================

export type AddonSlug = 
  | 'email-authority'
  | 'get-paid-now'
  | 'social-autopilot'
  | 'omnichannel-inbox'
  | 'ai-voice-chat'
  | 'unlimited-ai';

export interface AddonConfig {
  slug: AddonSlug;
  displayName: string;
  description: string;
  monthlyPrice: number;
  ghlTag: string;
  /** Tiers where this add-on is already included */
  includedInTiers?: TierSlug[];
}

export const ADDON_CONFIG: Record<AddonSlug, AddonConfig> = {
  'email-authority': {
    slug: 'email-authority',
    displayName: 'Email Authority',
    description: 'Email warm-up, deliverability monitoring & inbox placement',
    monthlyPrice: 49,
    ghlTag: 'ei: addon - email authority',
  },
  'get-paid-now': {
    slug: 'get-paid-now',
    displayName: 'Get Paid Now',
    description: 'Text-to-Pay, proposals & invoicing in 60 seconds',
    monthlyPrice: 49,
    ghlTag: 'ei: addon - get paid now',
  },
  'social-autopilot': {
    slug: 'social-autopilot',
    displayName: 'Social Autopilot',
    description: 'Automated social posting & content calendar',
    monthlyPrice: 79,
    ghlTag: 'ei: addon - social autopilot',
  },
  'omnichannel-inbox': {
    slug: 'omnichannel-inbox',
    displayName: 'Omnichannel Inbox',
    description: 'WhatsApp, Facebook, Instagram & Google Business chat',
    monthlyPrice: 99,
    ghlTag: 'ei: addon - omnichannel inbox',
  },
  'ai-voice-chat': {
    slug: 'ai-voice-chat',
    displayName: 'AI Voice Chat',
    description: 'Voice-enabled AI chat for your website',
    monthlyPrice: 79,
    ghlTag: 'ei: addon - ai voice chat',
    includedInTiers: ['full-ai'],
  },
  'unlimited-ai': {
    slug: 'unlimited-ai',
    displayName: 'Unlimited AI',
    description: 'Unlimited AI usage across all features',
    monthlyPrice: 149,
    ghlTag: 'ei: addon - unlimited ai',
    includedInTiers: ['full-ai'],
  },
};

// ============================================
// TIER TAG MAPPING (for GHL sync)
// ============================================

export const TIER_TAG_MAP: Record<TierSlug, string> = {
  'launch': 'ei: tier - launch',
  'capture': 'ei: tier - capture',
  'convert': 'ei: tier - convert',
  'scale': 'ei: tier - scale',
  'after-hours': 'ei: tier - after-hours',
  'front-office': 'ei: tier - front office',
  'full-ai': 'ei: tier - full ai employee',
  'web-chat': 'ei: tier - web chat only',
};

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Get all tiers for a specific product line
 */
export function getTiersByProductLine(productLine: 'smart-websites' | 'ai-employee'): TierConfig[] {
  return Object.values(TIER_CONFIG).filter(tier => tier.productLine === productLine);
}

/**
 * Check if an add-on is already included in the selected tier
 */
export function isAddonIncludedInTier(addonSlug: AddonSlug, tierSlug: TierSlug): boolean {
  const addon = ADDON_CONFIG[addonSlug];
  return addon.includedInTiers?.includes(tierSlug) ?? false;
}

/**
 * Format price for display
 */
export function formatPrice(amount: number, isMonthly = true): string {
  if (amount === 0) return 'Free';
  return `$${amount}${isMonthly ? '/mo' : ''}`;
}

/**
 * Get GHL checkout base URL
 */
export function getGHLCheckoutUrl(tierSlug: TierSlug): string {
  return `https://go.everintent.com${TIER_CONFIG[tierSlug].ghlCheckoutPath}`;
}
