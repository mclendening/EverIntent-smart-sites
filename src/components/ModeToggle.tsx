/**
 * @fileoverview Light/Dark/System mode toggle
 * @module components/ModeToggle
 * 
 * Reads/writes mode preference (light | dark) to localStorage and applies
 * .dark class to <html>. System/OS-preference mode is intentionally omitted
 * to keep the UX simple — users pick light or dark explicitly.
 * Integrates with the FOUC prevention script in index.html.
 * Does NOT use next-themes — all styling flows through CSS custom properties.
 */

import React, { useState, useEffect, useRef } from 'react';
import { Sun, Moon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getThemeForRoute, applyThemeToRoot } from '@/config/themes';

type Mode = 'light' | 'dark';

function applyMode(mode: Mode) {
  if (mode === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}

function getStoredMode(): Mode {
  if (typeof window === 'undefined') return 'dark';
  const stored = localStorage.getItem('theme-mode');
  // Migrate any legacy 'system' value to 'dark'
  if (!stored || stored === 'system') return 'dark';
  return stored as Mode;
}

const modes: { value: Mode; icon: typeof Sun; label: string }[] = [
  { value: 'light', icon: Sun, label: 'Light' },
  { value: 'dark', icon: Moon, label: 'Dark' },
];

interface ModeToggleProps {
  className?: string;
  /** Compact pill for header, expanded for mobile menu */
  variant?: 'compact' | 'expanded';
}

export function ModeToggle({ className, variant = 'compact' }: ModeToggleProps) {
  const [mode, setMode] = useState<Mode>(getStoredMode);
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    applyMode(mode);
    localStorage.setItem('theme-mode', mode);
    // Re-apply theme colors for the new mode (mode-aware)
    const theme = getThemeForRoute(window.location.pathname);
    // Small delay to ensure .dark class is toggled before applyThemeToRoot reads it
    requestAnimationFrame(() => applyThemeToRoot(theme));
  }, [mode]);


  if (variant === 'expanded') {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        <span className="text-xs text-muted-foreground uppercase tracking-wider font-medium mr-2">Theme</span>
        {modes.map(({ value, icon: Icon, label }) => (
          <button
            key={value}
            onClick={() => setMode(value)}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-colors",
              mode === value
                ? "bg-accent/20 text-accent"
                : "text-muted-foreground hover:text-foreground"
            )}
            aria-label={`Switch to ${label} mode`}
          >
            <Icon className="w-4 h-4" />
            <span>{label}</span>
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className={cn(
      "flex items-center bg-muted/50 rounded-full p-0.5 border border-border/30",
      className
    )}>
      {modes.map(({ value, icon: Icon, label }) => (
        <button
          key={value}
          onClick={() => setMode(value)}
          className={cn(
            "p-1.5 rounded-full transition-all duration-200",
            mode === value
              ? "bg-accent text-accent-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          )}
          aria-label={`Switch to ${label} mode`}
          title={label}
        >
          <Icon className="w-3.5 h-3.5" />
        </button>
      ))}
    </div>
  );
}