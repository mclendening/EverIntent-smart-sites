/**
 * CookiePreferencesModal - Granular cookie category selection modal
 * 
 * Provides industry-standard cookie consent controls with four categories:
 * - Strictly Necessary: Always enabled, cannot be disabled (required for site function)
 * - Analytics: Track usage patterns (default: OFF)
 * - Marketing: Advertising and retargeting (default: OFF)
 * - Functional: Enhanced features like chat (default: OFF)
 * 
 * Industry standard defaults: Only necessary cookies enabled by default.
 * Users must opt-in to optional categories (GDPR compliant).
 */

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Shield, BarChart3, Megaphone, Settings2, Lock } from 'lucide-react';

/**
 * Cookie preference categories stored in localStorage
 */
export interface CookiePreferences {
  necessary: boolean;  // Always true, cannot be changed
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
}

/**
 * LocalStorage key for granular cookie preferences
 */
export const COOKIE_PREFERENCES_KEY = 'cookie-preferences';

/**
 * Legacy consent key for backwards compatibility
 */
export const CONSENT_KEY = 'cookie-consent';

/**
 * Industry-standard defaults: Only necessary cookies enabled
 */
export const DEFAULT_PREFERENCES: CookiePreferences = {
  necessary: true,
  analytics: false,
  marketing: false,
  functional: false,
};

/**
 * Get current cookie preferences from localStorage
 */
export function getCookiePreferences(): CookiePreferences | null {
  try {
    const stored = localStorage.getItem(COOKIE_PREFERENCES_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Ensure necessary is always true
      return { ...parsed, necessary: true };
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Check if a specific cookie category is enabled
 */
export function isCategoryEnabled(category: keyof CookiePreferences): boolean {
  const prefs = getCookiePreferences();
  if (!prefs) return category === 'necessary'; // Only necessary enabled if no consent
  return prefs[category];
}

interface CookiePreferencesModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (preferences: CookiePreferences) => void;
}

/**
 * Cookie category configuration for rendering
 */
const categories = [
  {
    key: 'necessary' as const,
    icon: Shield,
    title: 'Strictly Necessary',
    description: 'Essential for the website to function. Includes session cookies, security tokens, and cookie consent storage. Cannot be disabled.',
    locked: true,
  },
  {
    key: 'analytics' as const,
    icon: BarChart3,
    title: 'Analytics',
    description: 'Help us understand how visitors interact with our website. Includes Google Analytics for anonymous usage data.',
    locked: false,
  },
  {
    key: 'marketing' as const,
    icon: Megaphone,
    title: 'Marketing',
    description: 'Used for advertising and retargeting. Includes Facebook Pixel and Google Ads conversion tracking.',
    locked: false,
  },
  {
    key: 'functional' as const,
    icon: Settings2,
    title: 'Functional',
    description: 'Enable enhanced features like live chat support, theme preferences, and personalized content.',
    locked: false,
  },
];

export function CookiePreferencesModal({ open, onOpenChange, onSave }: CookiePreferencesModalProps) {
  const [preferences, setPreferences] = useState<CookiePreferences>(DEFAULT_PREFERENCES);

  // Load existing preferences when modal opens
  useEffect(() => {
    if (open) {
      const stored = getCookiePreferences();
      setPreferences(stored || DEFAULT_PREFERENCES);
    }
  }, [open]);

  const handleToggle = (key: keyof CookiePreferences) => {
    if (key === 'necessary') return; // Cannot disable necessary cookies
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleAcceptAll = () => {
    const allEnabled: CookiePreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true,
    };
    onSave(allEnabled);
    onOpenChange(false);
  };

  const handleRejectOptional = () => {
    onSave(DEFAULT_PREFERENCES);
    onOpenChange(false);
  };

  const handleSavePreferences = () => {
    onSave(preferences);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Shield className="h-5 w-5 text-accent" />
            Cookie Preferences
          </DialogTitle>
          <DialogDescription>
            Choose which cookies you'd like to allow. Your preferences will be saved and you can change them at any time.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {categories.map((category) => {
            const Icon = category.icon;
            const isEnabled = preferences[category.key];
            
            return (
              <div
                key={category.key}
                className="flex items-start gap-4 p-4 rounded-lg border border-border bg-card hover:bg-muted/50 transition-colors"
              >
                <div className="shrink-0 mt-0.5">
                  <Icon className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Label
                      htmlFor={`cookie-${category.key}`}
                      className="text-sm font-semibold text-foreground cursor-pointer"
                    >
                      {category.title}
                    </Label>
                    {category.locked && (
                      <span className="inline-flex items-center gap-1 text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">
                        <Lock className="h-3 w-3" />
                        Required
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {category.description}
                  </p>
                </div>
                <div className="shrink-0">
                  <Switch
                    id={`cookie-${category.key}`}
                    checked={isEnabled}
                    onCheckedChange={() => handleToggle(category.key)}
                    disabled={category.locked}
                    aria-label={`${category.locked ? 'Required' : isEnabled ? 'Disable' : 'Enable'} ${category.title} cookies`}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            onClick={handleRejectOptional}
            className="w-full sm:w-auto"
          >
            Reject Optional
          </Button>
          <Button
            variant="outline"
            onClick={handleSavePreferences}
            className="w-full sm:w-auto"
          >
            Save Preferences
          </Button>
          <Button
            onClick={handleAcceptAll}
            className="w-full sm:w-auto bg-accent text-accent-foreground hover:bg-accent-hover"
          >
            Accept All
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
