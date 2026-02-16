# EverIntent GHL Tag Registry

**Version:** 1.0 (v36.3)  

**Last Updated:** 2026-02-16  

**Authority:** This file is the SINGLE SOURCE OF TRUTH for all GHL tags.

## Convention

Format: `ei: {category} - {value}`

- All lowercase

- Standard hyphen (-), NEVER en-dash (–)  

- Categories: tier, addon, checkout, form, lifecycle, affiliate, source

## Complete Tag List

### Tier Tags (product identity)

| Constant | Tag |

|----------|-----|

| TIER_LAUNCH | ei: tier - launch |

| TIER_CAPTURE | ei: tier - capture |

| TIER_CONVERT | ei: tier - convert |

| TIER_SCALE | ei: tier - scale |

| TIER_AFTER_HOURS | ei: tier - after-hours |

| TIER_FRONT_OFFICE | ei: tier - front office |

| TIER_FULL_AI | ei: tier - full ai employee |

| TIER_WEB_CHAT | ei: tier - web chat only |

### Add-On Tags

| Constant | Tag |

|----------|-----|

| ADDON_EMAIL_AUTHORITY | ei: addon - email authority |

| ADDON_GET_PAID_NOW | ei: addon - get paid now |

| ADDON_AI_VOICE_CHAT | ei: addon - ai voice chat |

| ADDON_SOCIAL_AUTOPILOT | ei: addon - social autopilot |

| ADDON_OMNICHANNEL | ei: addon - omnichannel inbox |

| ADDON_UNLIMITED_AI | ei: addon - unlimited ai |

### Checkout Funnel Tags

| Constant | Tag |

|----------|-----|

| CHECKOUT_PENDING | ei: checkout - pending |

| CHECKOUT_LAUNCH | ei: checkout - launch |

| CHECKOUT_CAPTURE | ei: checkout - capture |

| CHECKOUT_CONVERT | ei: checkout - convert |

| CHECKOUT_SCALE | ei: checkout - scale |

| CHECKOUT_AFTER_HOURS | ei: checkout - after-hours |

| CHECKOUT_FRONT_OFFICE | ei: checkout - front office |

| CHECKOUT_FULL_AI | ei: checkout - full ai employee |

| CHECKOUT_WEB_CHAT | ei: checkout - web chat only |

### Form Tags

| Constant | Tag |

|----------|-----|

| FORM_CONTACT | ei: form - contact |

| FORM_DATA_RIGHTS | ei: form - data rights request |

| FORM_JOB_APPLICATION | ei: form - job application |

### Lifecycle Tags

| Constant | Tag |

|----------|-----|

| LIFECYCLE_ACTIVE | ei: active customer |

| LIFECYCLE_ONBOARDING | ei: onboarding complete |

| LIFECYCLE_PAID | ei: paid |

| LIFECYCLE_REDIRECTED | ei: redirected |

| LIFECYCLE_CHURNED | ei: churned |

| LIFECYCLE_UPGRADE | ei: upgrade |

| LIFECYCLE_DOWNGRADE | ei: downgrade |

| LIFECYCLE_RENEWAL | ei: renewal |

### Affiliate Tags

| Constant / Function | Tag |

|---------------------|-----|

| AFFILIATE_REFERRED | ei: affiliate - referred |

| buildAffiliateTag(slug) | ei: affiliate - {slug} |

### Source Tags (GHL workflow, not edge functions)

| Tag | Trigger |

|-----|---------|

| ei: source - organic | utm_source = google/bing organic |

| ei: source - paid | utm_source = google/meta paid |

| ei: source - ai-call | utm_source = ai-call |

| ei: source - newsletter | utm_source = newsletter |

| ei: source - skool | utm_source = skool |

### Deprecated Tags — DO NOT USE

| Old Tag | Replacement |

|---------|-------------|

| EI: AI Mode - M1 through M5 | ei: tier - {plan} |

| EI: Tier - Smart Site/Lead/Business/Growth | ei: tier - launch/capture/convert/scale |

| EI: Product - Web Chat Only | ei: tier - web chat only |

| EI: Product - Warmy Booster | ei: addon - email authority |

| EI: Checkout Started - T1 through T4 | ei: checkout - {tier} |

| Any tag with en-dash (–) | Hyphen (-) equivalent |
