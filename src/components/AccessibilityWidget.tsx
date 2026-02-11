/**
 * @fileoverview ADA Accessibility Floating Widget — Content Modules (Batch 1)
 * 10 Content Modules modeled after WPOneTap feature set.
 * 
 * Modules:
 *  1. Text Size (3 levels)        6. Dyslexia Font (OpenDyslexic)
 *  2. Line Height (3 levels)      7. Text Align (left/center/right)
 *  3. Letter Spacing (3 levels)   8. Highlight Links
 *  4. Font Weight (bold toggle)   9. Text Magnifier (tooltip on hover)
 *  5. Readable Font (system sans) 10. Big Cursor
 *
 * Architecture:
 * - Each module stores its state in localStorage under `ada-<key>`
 * - CSS classes applied to <html> element; rules in index.css
 * - Multi-level controls cycle through levels on each click
 * - SSG-safe: all DOM access guarded by typeof window checks
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import { activeTheme } from '@/config/themes';
import {
  Accessibility, Type, AlignLeft, AlignCenter, AlignRight,
  Bold, Link2, MousePointer2, Search, X, RotateCcw,
  CaseSensitive, MoveVertical, MoveHorizontal
} from 'lucide-react';

// ─── Admin Config ───────────────────────────────────────────

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

// ─── Module Definitions ─────────────────────────────────────

type ModuleType = 'toggle' | 'multi' | 'cycle';

interface AdaModule {
  id: string;
  label: string;
  icon: React.ElementType;
  /** Secondary icon for cycle display */
  secondaryIcons?: React.ElementType[];
  key: string; // localStorage key
  type: ModuleType;
  /** For 'multi' type: the CSS classes to cycle through (level 0 = off) */
  levels?: string[];
  levelLabels?: string[];
  /** CSS class applied for 'toggle' type */
  cssClass?: string;
}

const contentModules: AdaModule[] = [
  {
    id: 'textSize',
    label: 'Text Size',
    icon: Type,
    key: 'ada-text-size',
    type: 'multi',
    levels: ['', 'ada-text-size-1', 'ada-text-size-2', 'ada-text-size-3'],
    levelLabels: ['Off', 'Large', 'X-Large', 'XX-Large'],
  },
  {
    id: 'lineHeight',
    label: 'Line Height',
    icon: MoveVertical,
    key: 'ada-line-height',
    type: 'multi',
    levels: ['', 'ada-line-height-1', 'ada-line-height-2', 'ada-line-height-3'],
    levelLabels: ['Off', '1.5×', '1.75×', '2×'],
  },
  {
    id: 'letterSpacing',
    label: 'Letter Spacing',
    icon: MoveHorizontal,
    key: 'ada-letter-spacing',
    type: 'multi',
    levels: ['', 'ada-letter-spacing-1', 'ada-letter-spacing-2', 'ada-letter-spacing-3'],
    levelLabels: ['Off', 'Wide', 'Wider', 'Widest'],
  },
  {
    id: 'fontWeight',
    label: 'Bold Text',
    icon: Bold,
    key: 'ada-font-weight',
    type: 'toggle',
    cssClass: 'ada-bold-text',
  },
  {
    id: 'readableFont',
    label: 'Readable Font',
    icon: CaseSensitive,
    key: 'ada-readable-font',
    type: 'toggle',
    cssClass: 'ada-readable-font',
  },
  {
    id: 'dyslexiaFont',
    label: 'Dyslexia Font',
    icon: CaseSensitive,
    key: 'ada-dyslexia-font',
    type: 'toggle',
    cssClass: 'ada-dyslexia-font',
  },
  {
    id: 'textAlign',
    label: 'Text Align',
    icon: AlignLeft,
    key: 'ada-text-align',
    type: 'cycle',
    levels: ['', 'ada-align-left', 'ada-align-center', 'ada-align-right'],
    levelLabels: ['Default', 'Left', 'Center', 'Right'],
    secondaryIcons: [AlignLeft, AlignLeft, AlignCenter, AlignRight],
  },
  {
    id: 'highlightLinks',
    label: 'Highlight Links',
    icon: Link2,
    key: 'ada-highlight-links',
    type: 'toggle',
    cssClass: 'ada-highlight-links',
  },
  {
    id: 'textMagnifier',
    label: 'Text Magnifier',
    icon: Search,
    key: 'ada-text-magnifier',
    type: 'toggle',
    cssClass: 'ada-text-magnifier',
  },
  {
    id: 'bigCursor',
    label: 'Big Cursor',
    icon: MousePointer2,
    key: 'ada-big-cursor',
    type: 'toggle',
    cssClass: 'ada-big-cursor',
  },
];

// ─── Position Helpers ───────────────────────────────────────

const POSITION_KEY = 'ada-widget-position';

interface DragPosition { x: number; y: number; }

function getSavedPosition(): DragPosition | null {
  try {
    const saved = localStorage.getItem(POSITION_KEY);
    if (saved) return JSON.parse(saved);
  } catch {}
  return null;
}

function savePosition(pos: DragPosition) {
  try { localStorage.setItem(POSITION_KEY, JSON.stringify(pos)); } catch {}
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

// ─── Apply/Remove CSS classes ───────────────────────────────

function applyAllModules(state: Record<string, number>) {
  const root = document.documentElement;
  contentModules.forEach(mod => {
    const value = state[mod.id] ?? 0;
    if (mod.type === 'toggle') {
      root.classList.toggle(mod.cssClass!, value === 1);
    } else if (mod.type === 'multi' || mod.type === 'cycle') {
      // Remove all levels, then add the active one
      mod.levels?.forEach(cls => { if (cls) root.classList.remove(cls); });
      const activeClass = mod.levels?.[value];
      if (activeClass) root.classList.add(activeClass);
    }
  });
}

function clearAllModules() {
  const root = document.documentElement;
  contentModules.forEach(mod => {
    if (mod.type === 'toggle' && mod.cssClass) {
      root.classList.remove(mod.cssClass);
    } else if (mod.levels) {
      mod.levels.forEach(cls => { if (cls) root.classList.remove(cls); });
    }
  });
}

// ─── Component ──────────────────────────────────────────────

export function AccessibilityWidget() {
  const [isOpen, setIsOpen] = useState(false);
  // State stores level index for each module (0 = off, 1+ = active level)
  const [state, setState] = useState<Record<string, number>>({});
  const config = getAdaConfig();
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  // Drag state
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
  const dragStart = useRef({ mx: 0, my: 0, px: 0, py: 0 });
  const hasMoved = useRef(false);

  // Load saved state
  useEffect(() => {
    const loaded: Record<string, number> = {};
    contentModules.forEach(mod => {
      const raw = localStorage.getItem(mod.key);
      loaded[mod.id] = raw ? parseInt(raw, 10) : 0;
    });
    setState(loaded);
    applyAllModules(loaded);
  }, []);

  // Drag handlers
  const onPointerDown = useCallback((e: React.PointerEvent) => {
    dragging.current = true;
    hasMoved.current = false;
    dragStart.current = { mx: e.clientX, my: e.clientY, px: pos.x, py: pos.y };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    e.preventDefault();
    e.stopPropagation();
  }, [pos]);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragging.current) return;
    e.preventDefault();
    const dx = e.clientX - dragStart.current.mx;
    const dy = e.clientY - dragStart.current.my;
    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) hasMoved.current = true;
    setPos(() => clampPosition({ x: dragStart.current.px + dx, y: dragStart.current.py + dy }, config.iconSize));
  }, [config.iconSize]);

  const onPointerUp = useCallback(() => {
    if (!dragging.current) return;
    dragging.current = false;
    if (hasMoved.current) setPos(prev => { savePosition(prev); return prev; });
  }, []);

  const handleClick = useCallback(() => {
    if (!hasMoved.current) setIsOpen(prev => !prev);
    hasMoved.current = false;
  }, []);

  // Visibility checks
  if (!config.enabled || config.hiddenIndefinitely) return null;
  if (config.hideOnMobile && isMobile) return null;
  if (config.hideOnDesktop && !isMobile) return null;
  if (config.pauseUntil && new Date(config.pauseUntil) > new Date()) return null;

  function toggleModule(mod: AdaModule) {
    setState(prev => {
      const current = prev[mod.id] ?? 0;
      let next: number;

      if (mod.type === 'toggle') {
        next = current === 1 ? 0 : 1;
      } else {
        // multi / cycle: advance, wrap to 0
        const max = (mod.levels?.length ?? 1) - 1;
        next = current >= max ? 0 : current + 1;
      }

      // Mutual exclusion: readableFont and dyslexiaFont
      const updated = { ...prev, [mod.id]: next };
      if (mod.id === 'readableFont' && next > 0) updated.dyslexiaFont = 0;
      if (mod.id === 'dyslexiaFont' && next > 0) updated.readableFont = 0;

      // Persist
      contentModules.forEach(m => {
        localStorage.setItem(m.key, String(updated[m.id] ?? 0));
      });

      applyAllModules(updated);
      return updated;
    });
  }

  function resetAll() {
    const cleared: Record<string, number> = {};
    contentModules.forEach(mod => {
      cleared[mod.id] = 0;
      localStorage.removeItem(mod.key);
    });
    setState(cleared);
    clearAllModules();
  }

  const shapeClass = config.iconShape === 'circle' ? 'rounded-full'
    : config.iconShape === 'pill' ? 'rounded-full px-4'
    : 'rounded-xl';

  const activeCount = Object.values(state).filter(v => v > 0).length;

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

  function getModuleStatusLabel(mod: AdaModule, value: number): string | null {
    if (value === 0) return null;
    if (mod.type === 'toggle') return 'ON';
    return mod.levelLabels?.[value] ?? `L${value}`;
  }

  function getModuleIcon(mod: AdaModule, value: number): React.ElementType {
    if (mod.secondaryIcons && value > 0) return mod.secondaryIcons[value] ?? mod.icon;
    return mod.icon;
  }

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
                ? 'bottom-0 left-0 right-0 rounded-t-2xl max-h-[80vh] overflow-y-auto'
                : 'rounded-xl w-80 max-h-[70vh] overflow-y-auto'
            } bg-card border border-border shadow-xl`}
            style={panelStyle}
            role="dialog"
            aria-label="Accessibility Settings"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border sticky top-0 bg-card z-10">
              <div className="flex items-center gap-2">
                <Accessibility className="h-5 w-5 text-accent" />
                <h2 className="text-sm font-semibold text-foreground">Accessibility</h2>
              </div>
              <div className="flex items-center gap-2">
                {activeCount > 0 && (
                  <button
                    onClick={resetAll}
                    className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded-md hover:bg-muted"
                    aria-label="Reset all accessibility settings"
                  >
                    <RotateCcw className="h-3 w-3" />
                    Reset
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-md hover:bg-muted transition-colors"
                  aria-label="Close accessibility panel"
                >
                  <X className="h-4 w-4 text-muted-foreground" />
                </button>
              </div>
            </div>

            {/* Content Modules */}
            <div className="p-3">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold px-3 pb-2">Content</p>
              <div className="space-y-1">
                {contentModules.map(mod => {
                  const value = state[mod.id] ?? 0;
                  const statusLabel = getModuleStatusLabel(mod, value);
                  const Icon = getModuleIcon(mod, value);
                  const isActive = value > 0;

                  return (
                    <button
                      key={mod.id}
                      onClick={() => toggleModule(mod)}
                      className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-all ${
                        isActive
                          ? 'bg-accent/15 text-accent border border-accent/30'
                          : 'hover:bg-muted text-foreground border border-transparent'
                      }`}
                      aria-pressed={isActive}
                      aria-label={`${mod.label}${statusLabel ? `: ${statusLabel}` : ''}`}
                    >
                      <Icon className="h-5 w-5 shrink-0" />
                      <span className="text-sm font-medium flex-1">{mod.label}</span>
                      {statusLabel && (
                        <span className="text-xs bg-accent text-accent-foreground px-2 py-0.5 rounded-full">
                          {statusLabel}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
