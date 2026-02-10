/**
 * @fileoverview Invisible component that runs the affiliate tracking hook.
 * @description Mounted inside ClientOnly in Layout.tsx to capture ?ref= params
 * into a first-party cookie on every page load.
 */

import { useAffiliateTracking } from '@/hooks/useAffiliateTracking';

export function AffiliateTracker() {
  useAffiliateTracking();
  return null;
}
