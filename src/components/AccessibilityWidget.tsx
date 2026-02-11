/**
 * @fileoverview ADA Accessibility Floating Widget
 * Task 7.25 (partial) / 7.15 - User-facing accessibility controls
 * 
 * Mobile-first responsive design:
 * - Highest z-index (z-[9999]) on mobile to stay above bottom nav and chat widgets
 * - Draggable on desktop with localStorage position persistence
 * - On mobile, always positioned above the MobileBottomBar (bottom-20)
 * - Respects admin config for visibility, device toggles, pause scheduling
 */

import { useState, useEffect, useRef, useCallback } from 'react';
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

function getAdaConfig(): AdaWidgetConfig {
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

const POSITION_KEY = 'ada-widget-position';

interface DragPosition {
  x: number;
  y: number;
}

function getSavedPosition(): DragPosition | null {
  try {
    const saved = localStorage.getItem(POSITION_KEY);
    if (saved) return JSON.parse(saved);
  } catch {}
  return null;
}

function savePosition(pos: DragPosition) {
  try {
    localStorage.setItem(POSITION_KEY, JSON.stringify(pos));
  } catch {}
}

function getDefaultPosition(config: AdaWidgetConfig): DragPosition {
  const size = config.iconSize;
  const margin = 24;
  const w = typeof window !== 'undefined' ? window.innerWidth : 1200;
  const h = typeof window !== 'undefined' ? window.innerHeight : 800;

  switch (config.position) {
    case 'bottom-left': return { x: margin, y: h - size - margin };
    case 'top-right': return { x: w - size - margin, y: 96 };
    case 'top-left': return { x: margin, y: 96 };
    default: return { x: w - size - margin, y: h - size - margin };
  }
}

function clampPosition(pos: DragPosition, size: number): DragPosition {
  const w = window.innerWidth;
  const h = window.innerHeight;
  return {
    x: Math.max(4, Math.min(pos.x, w - size - 4)),
    y: Math.max(4, Math.min(pos.y, h - size - 4)),
  };
}

export function AccessibilityWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState<Record<string, boolean>>({});
  const config = getAdaConfig();
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  // Drag state (desktop + mobile)
  const [pos, setPos] = useState<DragPosition>(() => {
    const saved = getSavedPosition();
    if (saved) return saved;
    if (isMobile) {
      const w = typeof window !== 'undefined' ? window.innerWidth : 390;
      return { x: w - config.iconSize - 16, y: (typeof window !== 'undefined' ? window.innerHeight : 800) - config.iconSize - 80 };
    }
    return getDefaultPosition(config);
  });
  const dragging = useRef(false);
  const dragStart = useRef<{ mx: number; my: number; px: number; py: number }>({ mx: 0, my: 0, px: 0, py: 0 });
  const hasMoved = useRef(false);

  // Load saved a11y settings
  useEffect(() => {
    const saved: Record<string, boolean> = {};
    a11yControls.forEach(c => {
      saved[c.id] = localStorage.getItem(c.key) === 'true';
    });
    setSettings(saved);
    applySettings(saved);
  }, []);

  // Drag handlers (desktop + mobile)
  const onPointerDown = useCallback((e: React.PointerEvent) => {
    dragging.current = true;
    hasMoved.current = false;
    dragStart.current = { mx: e.clientX, my: e.clientY, px: pos.x, py: pos.y };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    e.preventDefault();
  }, [pos]);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragging.current) return;
    const dx = e.clientX - dragStart.current.mx;
    const dy = e.clientY - dragStart.current.my;
    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) hasMoved.current = true;
    const newPos = clampPosition(
      { x: dragStart.current.px + dx, y: dragStart.current.py + dy },
      config.iconSize
    );
    setPos(newPos);
  }, [config.iconSize]);

  const onPointerUp = useCallback(() => {
    if (!dragging.current) return;
    dragging.current = false;
    if (hasMoved.current) {
      savePosition(pos);
    }
  }, [pos]);

  const handleClick = useCallback(() => {
    // Only toggle if user didn't drag
    if (!hasMoved.current) {
      setIsOpen(prev => !prev);
    }
    hasMoved.current = false;
  }, []);

  // Visibility checks
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

  const shapeClass = config.iconShape === 'circle' ? 'rounded-full'
    : config.iconShape === 'pill' ? 'rounded-full px-4'
    : 'rounded-xl';

  const activeCount = Object.values(settings).filter(Boolean).length;

  // Panel position (relative to trigger)
  const panelStyle: React.CSSProperties = isMobile
    ? {}
    : {
        position: 'fixed' as const,
        left: pos.x < window.innerWidth / 2 ? pos.x : undefined,
        right: pos.x >= window.innerWidth / 2 ? window.innerWidth - pos.x - config.iconSize : undefined,
        ...(pos.y < window.innerHeight / 2
          ? { top: pos.y + config.iconSize + 8 }
          : { bottom: window.innerHeight - pos.y + 8 }),
      };

  return (
    <>
      {/* Trigger Button */}
      <button
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onClick={handleClick}
        className={`fixed z-[9999] ${shapeClass} shadow-lg hover:shadow-xl transition-shadow duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent flex items-center justify-center touch-none select-none`}
        style={{
          left: pos.x,
          top: pos.y,
          width: config.iconSize,
          height: config.iconSize,
          backgroundColor: `hsl(${config.iconBgColor})`,
          color: `hsl(${config.iconColor})`,
          cursor: dragging.current ? 'grabbing' : 'grab',
        }}
        aria-label={`Accessibility options${activeCount > 0 ? ` (${activeCount} active)` : ''}`}
        aria-expanded={isOpen}
      >
        <Accessibility className="w-1/2 h-1/2 pointer-events-none" />
        {activeCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center pointer-events-none">
            {activeCount}
          </span>
        )}
      </button>

      {/* Panel */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-[9998] bg-background/40 backdrop-blur-sm md:bg-transparent md:backdrop-blur-none"
            onClick={() => setIsOpen(false)}
          />

          <div
            className={`fixed z-[9999] ${
              isMobile
                ? 'bottom-0 left-0 right-0 rounded-t-2xl'
                : 'rounded-xl w-72'
            } bg-card border border-border shadow-xl`}
            style={panelStyle}
            role="dialog"
            aria-label="Accessibility Settings"
          >
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
