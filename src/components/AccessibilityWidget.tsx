/**
 * @fileoverview ADA Accessibility Floating Widget
 * Task 7.25 (partial) / 7.15 - User-facing accessibility controls
 * 
 * Mobile-first responsive design:
 * - Highest z-index (z-[9999]) on mobile to stay above bottom nav and chat widgets
 * - Configurable desktop placement (bottom-right, bottom-left, top-right, top-left)
 * - On mobile, always positioned above the MobileBottomBar (bottom-20)
 * - Respects admin config for visibility, device toggles, pause scheduling
 */

import { useState, useEffect } from 'react';
import { activeTheme } from '@/config/themes';
import { Accessibility, Eye, Type, Underline, Focus, ZapOff, X } from 'lucide-react';

interface AdaWidgetConfig {
  enabled: boolean;
  position: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  hideOnMobile: boolean;
  hideOnDesktop: boolean;
  pauseUntil: string | null;
  hiddenIndefinitely: boolean;
  iconType: string;
  iconColor: string;
  iconBgColor: string;
  iconSize: number;
  iconShape: 'circle' | 'rounded-square' | 'pill';
}

// Read config from active theme (static, SSG-safe)
function getAdaConfig(): AdaWidgetConfig {
  // Use theme config if available, otherwise defaults
  const themeConfig = (activeTheme as any)?.adaWidgetConfig;
  return {
    enabled: themeConfig?.enabled ?? true,
    position: themeConfig?.position ?? 'bottom-right',
    hideOnMobile: themeConfig?.hideOnMobile ?? false,
    hideOnDesktop: themeConfig?.hideOnDesktop ?? false,
    pauseUntil: themeConfig?.pauseUntil ?? null,
    hiddenIndefinitely: themeConfig?.hiddenIndefinitely ?? false,
    iconType: themeConfig?.iconType ?? 'universal',
    iconColor: themeConfig?.iconColor ?? '0 0% 100%',
    iconBgColor: themeConfig?.iconBgColor ?? '240 70% 60%',
    iconSize: themeConfig?.iconSize ?? 48,
    iconShape: themeConfig?.iconShape ?? 'circle',
  };
}

const a11yControls = [
  { id: 'fontSize', label: 'Larger Text', icon: Type, key: 'ada-font-size' },
  { id: 'contrast', label: 'High Contrast', icon: Eye, key: 'ada-contrast' },
  { id: 'reducedMotion', label: 'Reduce Motion', icon: ZapOff, key: 'ada-motion' },
  { id: 'underlines', label: 'Link Underlines', icon: Underline, key: 'ada-underlines' },
  { id: 'focusHighlight', label: 'Focus Highlight', icon: Focus, key: 'ada-focus' },
];

export function AccessibilityWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState<Record<string, boolean>>({});
  const config = getAdaConfig();

  // Load saved settings
  useEffect(() => {
    const saved: Record<string, boolean> = {};
    a11yControls.forEach(c => {
      saved[c.id] = localStorage.getItem(c.key) === 'true';
    });
    setSettings(saved);
    applySettings(saved);
  }, []);

  // Check if widget should be visible
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  
  if (!config.enabled || config.hiddenIndefinitely) return null;
  if (config.hideOnMobile && isMobile) return null;
  if (config.hideOnDesktop && !isMobile) return null;
  if (config.pauseUntil && new Date(config.pauseUntil) > new Date()) return null;

  function applySettings(s: Record<string, boolean>) {
    const root = document.documentElement;
    root.classList.toggle('ada-large-text', !!s.fontSize);
    root.classList.toggle('ada-high-contrast', !!s.contrast);
    root.classList.toggle('ada-reduced-motion', !!s.reducedMotion);
    root.classList.toggle('ada-underlines', !!s.underlines);
    root.classList.toggle('ada-focus-highlight', !!s.focusHighlight);
  }

  function toggleSetting(id: string) {
    const updated = { ...settings, [id]: !settings[id] };
    setSettings(updated);
    const control = a11yControls.find(c => c.id === id);
    if (control) localStorage.setItem(control.key, String(updated[id]));
    applySettings(updated);
  }

  function resetAll() {
    const cleared: Record<string, boolean> = {};
    a11yControls.forEach(c => {
      cleared[c.id] = false;
      localStorage.removeItem(c.key);
    });
    setSettings(cleared);
    applySettings(cleared);
  }

  // Position classes - mobile always bottom, above nav bar
  const positionClasses = isMobile
    ? 'bottom-20 right-4'
    : config.position === 'bottom-right' ? 'bottom-6 right-6'
    : config.position === 'bottom-left' ? 'bottom-6 left-6'
    : config.position === 'top-right' ? 'top-24 right-6'
    : 'top-24 left-6';

  const shapeClass = config.iconShape === 'circle' ? 'rounded-full'
    : config.iconShape === 'pill' ? 'rounded-full px-4'
    : 'rounded-xl';

  const activeCount = Object.values(settings).filter(Boolean).length;

  return (
    <>
      {/* Trigger Button - z-[9999] to be above EVERYTHING on mobile */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed z-[9999] ${positionClasses} ${shapeClass} shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent flex items-center justify-center`}
        style={{
          width: config.iconSize,
          height: config.iconSize,
          backgroundColor: `hsl(${config.iconBgColor})`,
          color: `hsl(${config.iconColor})`,
        }}
        aria-label={`Accessibility options${activeCount > 0 ? ` (${activeCount} active)` : ''}`}
        aria-expanded={isOpen}
      >
        <Accessibility className="w-1/2 h-1/2" />
        {activeCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
            {activeCount}
          </span>
        )}
      </button>

      {/* Panel */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-[9998] bg-background/40 backdrop-blur-sm md:bg-transparent md:backdrop-blur-none"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Panel - positioned relative to trigger */}
          <div
            className={`fixed z-[9999] ${
              isMobile 
                ? 'bottom-0 left-0 right-0 rounded-t-2xl' 
                : config.position.includes('right') ? 'right-6' : 'left-6'
            } ${
              !isMobile && config.position.includes('bottom') ? 'bottom-20' : ''
            } ${
              !isMobile && config.position.includes('top') ? 'top-24' : ''
            } bg-card border border-border shadow-xl ${!isMobile ? 'rounded-xl w-72' : ''}`}
            role="dialog"
            aria-label="Accessibility Settings"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center gap-2">
                <Accessibility className="h-5 w-5 text-accent" />
                <h2 className="text-sm font-semibold text-foreground">Accessibility</h2>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-md hover:bg-muted transition-colors"
                aria-label="Close accessibility panel"
              >
                <X className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>

            {/* Controls */}
            <div className="p-3 space-y-1">
              {a11yControls.map(control => (
                <button
                  key={control.id}
                  onClick={() => toggleSetting(control.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-all ${
                    settings[control.id]
                      ? 'bg-accent/15 text-accent border border-accent/30'
                      : 'hover:bg-muted text-foreground border border-transparent'
                  }`}
                  aria-pressed={settings[control.id]}
                >
                  <control.icon className="h-5 w-5 shrink-0" />
                  <span className="text-sm font-medium">{control.label}</span>
                  {settings[control.id] && (
                    <span className="ml-auto text-xs bg-accent text-accent-foreground px-2 py-0.5 rounded-full">ON</span>
                  )}
                </button>
              ))}
            </div>

            {/* Footer */}
            {activeCount > 0 && (
              <div className="p-3 pt-0">
                <button
                  onClick={resetAll}
                  className="w-full text-center text-xs text-muted-foreground hover:text-foreground py-2 transition-colors"
                >
                  Reset All Settings
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}
