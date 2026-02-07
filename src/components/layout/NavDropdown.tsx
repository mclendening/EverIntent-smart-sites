/**
 * @fileoverview Navigation Dropdown Component - SSG-Safe
 * @module components/layout/NavDropdown
 * 
 * Uses native anchor tags for true static site navigation.
 * 
 * Features:
 * - 150ms hover delay before opening
 * - Smooth fade-in animation
 * - Native <a> tags for SEO-perfect navigation
 */

import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DropdownItem {
  title: string;
  path: string;
  description?: string;
}

interface NavDropdownProps {
  /** Display label for the dropdown trigger */
  label: string;
  /** Array of dropdown menu items */
  items: DropdownItem[];
  /** Optional hub path - if provided, clicking label navigates here */
  hubPath?: string;
  /** Additional CSS classes for the trigger */
  className?: string;
}

/**
 * NavDropdown - SSG-safe dropdown menu with hover delay
 * 
 * Uses native <a href> for all links to ensure proper static page loads.
 */
export function NavDropdown({ label, items, hubPath, className }: NavDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const openTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    openTimeoutRef.current = setTimeout(() => {
      setIsOpen(true);
    }, 150);
  };

  const handleMouseLeave = () => {
    if (openTimeoutRef.current) {
      clearTimeout(openTimeoutRef.current);
      openTimeoutRef.current = null;
    }
    closeTimeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 100);
  };

  useEffect(() => {
    return () => {
      if (openTimeoutRef.current) clearTimeout(openTimeoutRef.current);
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    };
  }, []);

  return (
    <div 
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Trigger - Native anchor for SSG */}
      {hubPath ? (
        <a
          href={hubPath}
          className={cn(
            "nav-link px-4 py-2.5 text-sm font-medium text-foreground/70 hover:text-foreground transition-all duration-300 flex items-center gap-1",
            isOpen && "text-foreground",
            className
          )}
        >
          {label}
          <ChevronDown 
            className={cn(
              "w-3.5 h-3.5 transition-transform duration-200",
              isOpen && "rotate-180"
            )} 
          />
        </a>
      ) : (
        <button
          className={cn(
            "nav-link px-4 py-2.5 text-sm font-medium text-foreground/70 hover:text-foreground transition-all duration-300 flex items-center gap-1",
            isOpen && "text-foreground",
            className
          )}
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          {label}
          <ChevronDown 
            className={cn(
              "w-3.5 h-3.5 transition-transform duration-200",
              isOpen && "rotate-180"
            )} 
          />
        </button>
      )}

      {/* Dropdown menu - Native anchors */}
      {isOpen && (
        <div 
          className="absolute top-full left-0 mt-1 min-w-[220px] bg-card border border-border rounded-lg shadow-layered z-50 py-2 animate-fade-in"
          role="menu"
        >
          {items.map((item) => (
            <a
              key={item.path}
              href={item.path}
              className="block px-4 py-2.5 text-sm hover:bg-accent/10 transition-colors"
              role="menuitem"
            >
              <span className="font-medium text-foreground">{item.title}</span>
              {item.description && (
                <span className="block text-xs text-muted-foreground mt-0.5">
                  {item.description}
                </span>
              )}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
