/**
 * @fileoverview ADA Accessibility Floating Widget — Full Implementation
 * 24 modules + 5 preset profiles modeled after WPOneTap feature set.
 *
 * Batch 1 – Content Modules (10)
 * Batch 2 – Color Modules (5) + Orientation Modules (9)
 * Batch 3 – Preset Profiles (5): Vision Impaired, Blind Mode, ADHD, Dyslexia, Motor Impaired
 * Batch 4 – Reset All polish + Accessibility Statement link
 *
 * Architecture:
 * - Each module stores its state in localStorage under `ada-<key>`
 * - CSS classes applied to <html> element; rules in index.css
 * - Multi-level controls cycle through levels on each click
 * - SSG-safe: all DOM access guarded by typeof window checks
 * - Preset profiles activate a combination of modules in one click
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import { activeTheme } from '@/config/themes';
import {
  Accessibility, Type, AlignLeft, AlignCenter, AlignRight,
  Bold, Link2, MousePointer2, Search, X, RotateCcw,
  CaseSensitive, MoveVertical, MoveHorizontal,
  Moon, Sun, Contrast, Palette, Droplets,
  ScanLine, Focus, Keyboard, ImageOff, Pause,
  VolumeX, Heading, FileText, Eye,
  UserRound, EyeOff, Brain, BookOpen, Hand, Sparkles, FileQuestion,
  EyeOff as HideIcon, Clock, Ban, Timer
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
  readingHandleSize: number;
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
    iconBgColor: themeConfig?.iconBgColor ?? '',
    iconSize: themeConfig?.iconSize ?? 48,
    iconShape: themeConfig?.iconShape ?? 'circle',
    readingHandleSize: themeConfig?.readingHandleSize ?? 28,
  };
}

// ─── Module Definitions ─────────────────────────────────────

type ModuleType = 'toggle' | 'multi' | 'cycle';

interface AdaModule {
  id: string;
  label: string;
  icon: React.ElementType;
  secondaryIcons?: React.ElementType[];
  key: string;
  type: ModuleType;
  levels?: string[];
  levelLabels?: string[];
  cssClass?: string;
  exclusiveWith?: string[];
}

// ── Batch 1: Content Modules ──

const contentModules: AdaModule[] = [
  {
    id: 'textSize', label: 'Text Size', icon: Type,
    key: 'ada-text-size', type: 'multi',
    levels: ['', 'ada-text-size-1', 'ada-text-size-2', 'ada-text-size-3'],
    levelLabels: ['Off', 'Large', 'X-Large', 'XX-Large'],
  },
  {
    id: 'lineHeight', label: 'Line Height', icon: MoveVertical,
    key: 'ada-line-height', type: 'multi',
    levels: ['', 'ada-line-height-1', 'ada-line-height-2', 'ada-line-height-3'],
    levelLabels: ['Off', '1.5×', '1.75×', '2×'],
  },
  {
    id: 'letterSpacing', label: 'Letter Spacing', icon: MoveHorizontal,
    key: 'ada-letter-spacing', type: 'multi',
    levels: ['', 'ada-letter-spacing-1', 'ada-letter-spacing-2', 'ada-letter-spacing-3'],
    levelLabels: ['Off', 'Wide', 'Wider', 'Widest'],
  },
  {
    id: 'fontWeight', label: 'Bold Text', icon: Bold,
    key: 'ada-font-weight', type: 'toggle', cssClass: 'ada-bold-text',
  },
  {
    id: 'readableFont', label: 'Readable Font', icon: CaseSensitive,
    key: 'ada-readable-font', type: 'toggle', cssClass: 'ada-readable-font',
    exclusiveWith: ['dyslexiaFont'],
  },
  {
    id: 'dyslexiaFont', label: 'Dyslexia Font', icon: CaseSensitive,
    key: 'ada-dyslexia-font', type: 'toggle', cssClass: 'ada-dyslexia-font',
    exclusiveWith: ['readableFont'],
  },
  {
    id: 'textAlign', label: 'Text Align', icon: AlignLeft,
    key: 'ada-text-align', type: 'cycle',
    levels: ['', 'ada-align-left', 'ada-align-center', 'ada-align-right'],
    levelLabels: ['Default', 'Left', 'Center', 'Right'],
    secondaryIcons: [AlignLeft, AlignLeft, AlignCenter, AlignRight],
  },
  {
    id: 'highlightLinks', label: 'Highlight Links', icon: Link2,
    key: 'ada-highlight-links', type: 'toggle', cssClass: 'ada-highlight-links',
  },
  {
    id: 'textMagnifier', label: 'Text Magnifier', icon: Search,
    key: 'ada-text-magnifier', type: 'toggle', cssClass: 'ada-text-magnifier',
  },
  {
    id: 'bigCursor', label: 'Big Cursor', icon: MousePointer2,
    key: 'ada-big-cursor', type: 'toggle', cssClass: 'ada-big-cursor',
  },
];

// ── Batch 2: Color Modules ──

const colorModules: AdaModule[] = [
  {
    id: 'darkContrast', label: 'Dark Contrast', icon: Moon,
    key: 'ada-dark-contrast', type: 'toggle', cssClass: 'ada-dark-contrast',
    exclusiveWith: ['lightContrast', 'highContrast'],
  },
  {
    id: 'lightContrast', label: 'Light Contrast', icon: Sun,
    key: 'ada-light-contrast', type: 'toggle', cssClass: 'ada-light-contrast',
    exclusiveWith: ['darkContrast', 'highContrast'],
  },
  {
    id: 'highContrast', label: 'High Contrast', icon: Contrast,
    key: 'ada-high-contrast', type: 'toggle', cssClass: 'ada-high-contrast',
    exclusiveWith: ['darkContrast', 'lightContrast'],
  },
  {
    id: 'monochrome', label: 'Monochrome', icon: Palette,
    key: 'ada-monochrome', type: 'toggle', cssClass: 'ada-monochrome',
    exclusiveWith: ['highSaturation'],
  },
  {
    id: 'highSaturation', label: 'High Saturation', icon: Droplets,
    key: 'ada-high-saturation', type: 'toggle', cssClass: 'ada-high-saturation',
    exclusiveWith: ['monochrome'],
  },
];

// ── Batch 2: Orientation Modules ──

const orientationModules: AdaModule[] = [
  {
    id: 'readingLine', label: 'Reading Line', icon: ScanLine,
    key: 'ada-reading-line', type: 'toggle', cssClass: 'ada-reading-line',
    exclusiveWith: ['readingMask'],
  },
  {
    id: 'readingMask', label: 'Reading Mask', icon: Focus,
    key: 'ada-reading-mask', type: 'toggle', cssClass: 'ada-reading-mask',
    exclusiveWith: ['readingLine'],
  },
  {
    id: 'keyboardNav', label: 'Keyboard Navigation', icon: Keyboard,
    key: 'ada-keyboard-nav', type: 'toggle', cssClass: 'ada-keyboard-nav',
  },
  {
    id: 'hideImages', label: 'Hide Images', icon: ImageOff,
    key: 'ada-hide-images', type: 'toggle', cssClass: 'ada-hide-images',
  },
  {
    id: 'stopAnimations', label: 'Stop Animations', icon: Pause,
    key: 'ada-stop-animations', type: 'toggle', cssClass: 'ada-reduced-motion',
  },
  {
    id: 'muteSounds', label: 'Mute Sounds', icon: VolumeX,
    key: 'ada-mute-sounds', type: 'toggle', cssClass: 'ada-mute-sounds',
  },
  {
    id: 'highlightTitles', label: 'Highlight Titles', icon: Heading,
    key: 'ada-highlight-titles', type: 'toggle', cssClass: 'ada-highlight-titles',
  },
  {
    id: 'highlightContent', label: 'Highlight Content', icon: FileText,
    key: 'ada-highlight-content', type: 'toggle', cssClass: 'ada-highlight-content',
  },
  {
    id: 'focusHighlight', label: 'Focus Highlight', icon: Eye,
    key: 'ada-focus-highlight', type: 'toggle', cssClass: 'ada-focus-highlight',
  },
];

/** All modules flattened for state management */
const allModules: AdaModule[] = [...contentModules, ...colorModules, ...orientationModules];

// ─── Batch 3: Preset Profiles ───────────────────────────────

interface PresetProfile {
  id: string;
  label: string;
  description: string;
  icon: React.ElementType;
  /** Module ID → value to set */
  modules: Record<string, number>;
}

const presetProfiles: PresetProfile[] = [
  {
    id: 'visionImpaired',
    label: 'Vision Impaired',
    description: 'Larger text, high contrast, bold, highlight links',
    icon: Eye,
    modules: {
      textSize: 2,        // X-Large
      fontWeight: 1,      // Bold
      highContrast: 1,    // WCAG AAA
      highlightLinks: 1,  // Underline + highlight
      highlightTitles: 1, // Outline headings
      lineHeight: 1,      // Comfortable spacing
    },
  },
  {
    id: 'blindMode',
    label: 'Blind Mode',
    description: 'Maximum text size, high contrast, screen reader optimized',
    icon: EyeOff,
    modules: {
      textSize: 3,         // XX-Large
      fontWeight: 1,       // Bold
      highContrast: 1,     // WCAG AAA
      lineHeight: 2,       // 1.75×
      letterSpacing: 1,    // Wide
      highlightLinks: 1,
      highlightTitles: 1,
      highlightContent: 1,
      focusHighlight: 1,
      keyboardNav: 1,
      hideImages: 1,
    },
  },
  {
    id: 'adhdFriendly',
    label: 'ADHD Friendly',
    description: 'Reading mask, reduced motion, muted distractions',
    icon: Brain,
    modules: {
      readingMask: 1,      // Spotlight focus
      stopAnimations: 1,   // No distracting motion
      muteSounds: 1,       // No unexpected audio
      highlightTitles: 1,  // Content structure
      lineHeight: 1,       // Comfortable reading
    },
  },
  {
    id: 'dyslexiaFriendly',
    label: 'Dyslexia Friendly',
    description: 'OpenDyslexic font, wider spacing, reading line',
    icon: BookOpen,
    modules: {
      dyslexiaFont: 1,     // OpenDyslexic
      lineHeight: 2,       // 1.75×
      letterSpacing: 2,    // Wider
      textSize: 1,         // Large
      readingLine: 1,      // Track reading position
      highlightLinks: 1,
    },
  },
  {
    id: 'motorImpaired',
    label: 'Motor Impaired',
    description: 'Big cursor, large targets, keyboard navigation',
    icon: Hand,
    modules: {
      bigCursor: 1,
      textSize: 1,         // Large for bigger click targets
      keyboardNav: 1,      // Enhanced focus rings
      focusHighlight: 1,   // Extra focus visibility
      highlightLinks: 1,   // Identify clickable elements
    },
  },
];

const ACTIVE_PROFILE_KEY = 'ada-active-profile';

// ─── Position Helpers ───────────────────────────────────────

const POSITION_KEY = 'ada-widget-position';
const HIDE_KEY = 'ada-hide-until';

/** Check if the widget should be hidden based on user preference */
function isUserHidden(): boolean {
  try {
    const raw = localStorage.getItem(HIDE_KEY);
    if (!raw) return false;
    if (raw === 'permanent') return true;
    if (raw === 'session') return true; // session-based, cleared on page refresh via sessionStorage
    const until = parseInt(raw, 10);
    if (!isNaN(until) && Date.now() < until) return true;
    // Expired — clean up
    localStorage.removeItem(HIDE_KEY);
    return false;
  } catch { return false; }
}

/** Session-based hiding uses sessionStorage to survive SPA navigation but not tab close */
function isSessionHidden(): boolean {
  try { return sessionStorage.getItem(HIDE_KEY) === 'session'; } catch { return false; }
}

function hideWidget(mode: 'session' | '24h' | 'permanent') {
  try {
    if (mode === 'session') {
      sessionStorage.setItem(HIDE_KEY, 'session');
    } else if (mode === '24h') {
      localStorage.setItem(HIDE_KEY, String(Date.now() + 24 * 60 * 60 * 1000));
    } else {
      localStorage.setItem(HIDE_KEY, 'permanent');
    }
  } catch {}
}

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

function applyModule(mod: AdaModule, value: number) {
  const root = document.documentElement;
  if (mod.type === 'toggle') {
    root.classList.toggle(mod.cssClass!, value === 1);
  } else if (mod.type === 'multi' || mod.type === 'cycle') {
    mod.levels?.forEach(cls => { if (cls) root.classList.remove(cls); });
    const activeClass = mod.levels?.[value];
    if (activeClass) root.classList.add(activeClass);
  }
}

function applyAllModules(state: Record<string, number>) {
  allModules.forEach(mod => applyModule(mod, state[mod.id] ?? 0));
}

function clearAllModules() {
  const root = document.documentElement;
  allModules.forEach(mod => {
    if (mod.type === 'toggle' && mod.cssClass) root.classList.remove(mod.cssClass);
    else if (mod.levels) mod.levels.forEach(cls => { if (cls) root.classList.remove(cls); });
  });
}

// ─── Reading Line / Reading Mask runtime ────────────────────

/** Create a draggable reading-aid element (line or mask).
 *  On desktop the element follows the mouse by default; on mobile it starts at 40%
 *  viewport height. A small drag handle lets users reposition it on any device.
 */
function createDraggableReadingAid(
  id: string,
  applyY: (el: HTMLElement, y: number) => void,
) {
  if (document.getElementById(id)) return;

  const config = getAdaConfig();
  const handleSize = config.readingHandleSize;

  const el = document.createElement('div');
  el.id = id;
  el.setAttribute('aria-hidden', 'true');
  document.body.appendChild(el);

  // Drag handle — horizontal slide
  const handle = document.createElement('div');
  handle.className = 'ada-reading-handle';
  handle.setAttribute('aria-label', 'Drag to reposition');
  handle.innerHTML = '<span></span><span></span><span></span>';
  handle.style.setProperty('--handle-size', `${handleSize}px`);
  el.appendChild(handle);

  let currentY = window.innerHeight * 0.4;
  let currentX = window.innerWidth * 0.5;
  let isDragging = false;
  applyY(el, currentY);
  handle.style.setProperty('--handle-x', `${currentX}px`);

  // Mouse-follow on desktop (non-touch) — vertical only
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  const onMouseMove = (e: MouseEvent) => {
    if (isDragging) return;
    currentY = e.clientY;
    applyY(el, currentY);
  };
  if (!isTouchDevice) {
    document.addEventListener('mousemove', onMouseMove);
  }

  // Pointer-based drag — horizontal slide for handle position
  const onPointerDown = (e: PointerEvent) => {
    isDragging = true;
    handle.setPointerCapture(e.pointerId);
    handle.style.cursor = 'grabbing';
    e.preventDefault();
  };
  const onPointerMove = (e: PointerEvent) => {
    if (!isDragging) return;
    currentX = Math.max(handleSize / 2, Math.min(e.clientX, window.innerWidth - handleSize / 2));
    currentY = Math.max(0, Math.min(e.clientY, window.innerHeight));
    handle.style.setProperty('--handle-x', `${currentX}px`);
    applyY(el, currentY);
    e.preventDefault();
  };
  const onPointerUp = () => {
    isDragging = false;
    handle.style.cursor = '';
  };

  handle.addEventListener('pointerdown', onPointerDown);
  handle.addEventListener('pointermove', onPointerMove);
  handle.addEventListener('pointerup', onPointerUp);
  handle.addEventListener('pointercancel', onPointerUp);

  (el as any).__adaCleanup = () => {
    document.removeEventListener('mousemove', onMouseMove);
    handle.removeEventListener('pointerdown', onPointerDown);
    handle.removeEventListener('pointermove', onPointerMove);
    handle.removeEventListener('pointerup', onPointerUp);
    handle.removeEventListener('pointercancel', onPointerUp);
    el.remove();
  };
}

function setupReadingLine() {
  createDraggableReadingAid('ada-reading-line-el', (el, y) => {
    el.style.top = `${y}px`;
  });
}

function teardownReadingLine() {
  const el = document.getElementById('ada-reading-line-el');
  if (el) (el as any).__adaCleanup?.();
}

function setupReadingMask() {
  createDraggableReadingAid('ada-reading-mask-el', (el, y) => {
    el.style.setProperty('--mask-y', `${y}px`);
  });
}

function teardownReadingMask() {
  const el = document.getElementById('ada-reading-mask-el');
  if (el) (el as any).__adaCleanup?.();
}

function handleRuntimeEffects(state: Record<string, number>) {
  if (state.readingLine) setupReadingLine();
  else teardownReadingLine();
  if (state.readingMask) setupReadingMask();
  else teardownReadingMask();
  document.querySelectorAll('audio, video').forEach((el) => {
    (el as HTMLMediaElement).muted = !!(state.muteSounds);
  });
}

// ─── Section rendering helper ───────────────────────────────

interface ModuleSectionProps {
  title: string;
  modules: AdaModule[];
  state: Record<string, number>;
  onToggle: (mod: AdaModule) => void;
}

function ModuleSection({ title, modules, state, onToggle }: ModuleSectionProps) {
  return (
    <div className="px-3 pb-2">
      <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold px-3 pb-2 pt-3">{title}</p>
      <div className="space-y-1">
        {modules.map(mod => {
          const value = state[mod.id] ?? 0;
          const isActive = value > 0;
          let statusLabel: string | null = null;
          if (isActive) {
            statusLabel = mod.type === 'toggle' ? 'ON' : (mod.levelLabels?.[value] ?? `L${value}`);
          }
          const Icon = (mod.secondaryIcons && value > 0)
            ? (mod.secondaryIcons[value] ?? mod.icon)
            : mod.icon;

          return (
            <button
              key={mod.id}
              onClick={() => onToggle(mod)}
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
  );
}

// ─── Profiles Section ───────────────────────────────────────

interface ProfilesSectionProps {
  activeProfile: string | null;
  onActivate: (profile: PresetProfile) => void;
}

function ProfilesSection({ activeProfile, onActivate }: ProfilesSectionProps) {
  return (
    <div className="px-3 pb-2">
      <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold px-3 pb-2 pt-3">
        <Sparkles className="inline h-3 w-3 mr-1 -mt-0.5" />
        Preset Profiles
      </p>
      <div className="space-y-1">
        {presetProfiles.map(profile => {
          const isActive = activeProfile === profile.id;
          const Icon = profile.icon;
          return (
            <button
              key={profile.id}
              onClick={() => onActivate(profile)}
              className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-all ${
                isActive
                  ? 'bg-accent/20 text-accent border border-accent/40 ring-1 ring-accent/20'
                  : 'hover:bg-muted text-foreground border border-transparent'
              }`}
              aria-pressed={isActive}
              aria-label={`${profile.label} profile${isActive ? ' (active)' : ''}`}
            >
              <Icon className="h-5 w-5 shrink-0" />
              <div className="flex-1 min-w-0">
                <span className="text-sm font-medium block">{profile.label}</span>
                <span className="text-[11px] text-muted-foreground block truncate">{profile.description}</span>
              </div>
              {isActive && (
                <span className="text-xs bg-accent text-accent-foreground px-2 py-0.5 rounded-full shrink-0">
                  Active
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Component ──────────────────────────────────────────────

export function AccessibilityWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [state, setState] = useState<Record<string, number>>({});
  const [activeProfile, setActiveProfile] = useState<string | null>(null);
  const [userHidden, setUserHidden] = useState(() => typeof window !== 'undefined' && (isUserHidden() || isSessionHidden()));
  const [showHideOptions, setShowHideOptions] = useState(false);
  const config = getAdaConfig();
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  // Drag state — on mobile, offset above the MobileBottomBar (h-16 = 64px)
  const [pos, setPos] = useState<DragPosition>(() => {
    const saved = getSavedPosition();
    if (saved) return saved;
    if (isMobile) {
      const w = typeof window !== 'undefined' ? window.innerWidth : 390;
      const h = typeof window !== 'undefined' ? window.innerHeight : 800;
      // Place above the 64px bottom nav bar + 16px breathing room
      return { x: w - config.iconSize - 16, y: h - config.iconSize - 64 - 16 };
    }
    return getDefaultPosition(config);
  });
  const dragging = useRef(false);
  const dragStart = useRef({ mx: 0, my: 0, px: 0, py: 0 });
  const hasMoved = useRef(false);

  // Load saved state on mount
  useEffect(() => {
    const loaded: Record<string, number> = {};
    allModules.forEach(mod => {
      const raw = localStorage.getItem(mod.key);
      loaded[mod.id] = raw ? parseInt(raw, 10) : 0;
    });
    setState(loaded);
    applyAllModules(loaded);
    handleRuntimeEffects(loaded);

    // Restore active profile
    try {
      const savedProfile = localStorage.getItem(ACTIVE_PROFILE_KEY);
      if (savedProfile) setActiveProfile(savedProfile);
    } catch {}
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
  if (userHidden) return null;

  function handleHideWidget(mode: 'session' | '24h' | 'permanent') {
    hideWidget(mode);
    setUserHidden(true);
    setIsOpen(false);
  }

  function applyState(newState: Record<string, number>) {
    allModules.forEach(m => {
      localStorage.setItem(m.key, String(newState[m.id] ?? 0));
    });
    applyAllModules(newState);
    handleRuntimeEffects(newState);
  }

  function toggleModule(mod: AdaModule) {
    setState(prev => {
      const current = prev[mod.id] ?? 0;
      let next: number;

      if (mod.type === 'toggle') {
        next = current === 1 ? 0 : 1;
      } else {
        const max = (mod.levels?.length ?? 1) - 1;
        next = current >= max ? 0 : current + 1;
      }

      const updated = { ...prev, [mod.id]: next };

      // Mutual exclusion
      if (next > 0 && mod.exclusiveWith) {
        mod.exclusiveWith.forEach(exId => { updated[exId] = 0; });
      }

      // If a module was manually toggled, clear the active profile
      setActiveProfile(null);
      try { localStorage.removeItem(ACTIVE_PROFILE_KEY); } catch {}

      applyState(updated);
      return updated;
    });
  }

  function activateProfile(profile: PresetProfile) {
    setState(prev => {
      // If this profile is already active, deactivate it (reset all its modules)
      if (activeProfile === profile.id) {
        const cleared: Record<string, number> = {};
        allModules.forEach(mod => { cleared[mod.id] = 0; });
        setActiveProfile(null);
        try { localStorage.removeItem(ACTIVE_PROFILE_KEY); } catch {}
        applyState(cleared);
        return cleared;
      }

      // Clear everything first, then apply profile modules
      const newState: Record<string, number> = {};
      allModules.forEach(mod => { newState[mod.id] = 0; });
      
      // Apply profile module values
      Object.entries(profile.modules).forEach(([modId, value]) => {
        newState[modId] = value;
      });

      // Handle mutual exclusions within the profile
      // (profiles are pre-validated to not conflict, but safety check)
      allModules.forEach(mod => {
        if (newState[mod.id] > 0 && mod.exclusiveWith) {
          mod.exclusiveWith.forEach(exId => {
            if (!(exId in profile.modules)) {
              newState[exId] = 0;
            }
          });
        }
      });

      setActiveProfile(profile.id);
      try { localStorage.setItem(ACTIVE_PROFILE_KEY, profile.id); } catch {}
      applyState(newState);
      return newState;
    });
  }

  function resetAll() {
    const cleared: Record<string, number> = {};
    allModules.forEach(mod => {
      cleared[mod.id] = 0;
      localStorage.removeItem(mod.key);
    });
    setState(cleared);
    setActiveProfile(null);
    try { localStorage.removeItem(ACTIVE_PROFILE_KEY); } catch {}
    clearAllModules();
    handleRuntimeEffects(cleared);
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
          backgroundColor: config.iconBgColor ? `hsl(${config.iconBgColor})` : 'hsl(var(--accent))',
          color: config.iconColor ? `hsl(${config.iconColor})` : 'hsl(var(--accent-foreground))',
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
                    Reset All
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

            {/* Preset Profiles */}
            <ProfilesSection activeProfile={activeProfile} onActivate={activateProfile} />

            {/* Module Sections */}
            <ModuleSection title="Content" modules={contentModules} state={state} onToggle={toggleModule} />
            <ModuleSection title="Color & Contrast" modules={colorModules} state={state} onToggle={toggleModule} />
            <ModuleSection title="Orientation" modules={orientationModules} state={state} onToggle={toggleModule} />

            {/* Footer: Hide Widget + Accessibility Statement */}
            <div className="px-6 py-4 border-t border-border space-y-3">
              {/* Hide Widget Toggle */}
              <div>
                <button
                  onClick={() => setShowHideOptions(prev => !prev)}
                  className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors w-full"
                  aria-expanded={showHideOptions}
                >
                  <EyeOff className="h-3.5 w-3.5 shrink-0" />
                  <span>Hide Widget</span>
                </button>
                {showHideOptions && (
                  <div className="mt-2 ml-5 space-y-1">
                    <button
                      onClick={() => handleHideWidget('session')}
                      className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors w-full py-1"
                    >
                      <Timer className="h-3 w-3 shrink-0" />
                      Hide for this session
                    </button>
                    <button
                      onClick={() => handleHideWidget('24h')}
                      className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors w-full py-1"
                    >
                      <Clock className="h-3 w-3 shrink-0" />
                      Hide for 24 hours
                    </button>
                    <button
                      onClick={() => handleHideWidget('permanent')}
                      className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors w-full py-1"
                    >
                      <Ban className="h-3 w-3 shrink-0" />
                      Hide permanently
                    </button>
                    <p className="text-[10px] text-muted-foreground/70 pt-1">
                      Clear browser cache to restore
                    </p>
                  </div>
                )}
              </div>

              {/* Accessibility Statement */}
              <a
                href="/legal/accessibility-statement"
                className="flex items-center gap-2 text-xs text-muted-foreground hover:text-accent transition-colors"
                aria-label="Read our accessibility statement"
              >
                <FileQuestion className="h-3.5 w-3.5 shrink-0" />
                Accessibility Statement
              </a>
            </div>
          </div>
        </>
      )}
    </>
  );
}
