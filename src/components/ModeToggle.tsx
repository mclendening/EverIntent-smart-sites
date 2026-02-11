/**
 * @fileoverview Light/Dark/System mode toggle
 * @module components/ModeToggle
 * 
 * Reads/writes mode preference to localStorage and applies .dark class to <html>.
 * Integrates with the FOUC prevention script in index.html.
 * Does NOT use next-themes — all styling flows through CSS custom properties.
 */

import React, { useState, useEffect, useRef } from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import { cn } from '@/lib/utils';

type Mode = 'light' | 'dark' | 'system';

function getSystemPreference(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'dark';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyMode(mode: Mode) {
  const resolved = mode === 'system' ? getSystemPreference() : mode;
  if (resolved === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}

function getStoredMode(): Mode {
  if (typeof window === 'undefined') return 'dark';
  return (localStorage.getItem('theme-mode') as Mode) || 'dark';
}

const modes: { value: Mode; icon: typeof Sun; label: string }[] = [
  { value: 'light', icon: Sun, label: 'Light' },
  { value: 'dark', icon: Moon, label: 'Dark' },
  { value: 'system', icon: Monitor, label: 'System' },
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
  }, [mode]);

  // Listen for system preference changes when in 'system' mode
  useEffect(() => {
    if (mode !== 'system') return;
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => applyMode('system');
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
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