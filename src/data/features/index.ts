/**
 * @fileoverview Feature Data Barrel Export
 * @module data/features
 *
 * Centralized export for all product feature data used by ExpandableFeatureGrid.
 * Each dataset corresponds to a specific product page/tier.
 */

export { afterHoursFeatures } from './after-hours-features';
export { frontOfficeFeatures } from './front-office-features';
export { fullAiFeatures } from './full-ai-features';
export { smartSiteFeatures } from './smart-site-features';
export { smartLeadFeatures } from './smart-lead-features';
export { smartBusinessFeatures } from './smart-business-features';
export { smartGrowthFeatures } from './smart-growth-features';
export type { ExpandableFeature } from '@/components/ai-employee/ExpandableFeatureCard';
