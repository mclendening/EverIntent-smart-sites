/**
 * @fileoverview Navigation Dropdown - Luxury styling
 * @module components/layout/NavDropdown
 */

import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DropdownItem {
  title: string;
  path: string;
  description?: string;
}

interface NavDropdownProps {
  label: string;
  items: DropdownItem[];
  hubPath?: string;
  className?: string;
}

/**
 * Minimal dropdown with subtle animations.
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
      {hubPath ? (
        <Link
          to={hubPath}
          className={cn(
            "nav-link px-4 py-2.5 text-sm text-foreground/70 hover:text-foreground transition-all duration-400 flex items-center gap-1",
            isOpen && "text-foreground",
            className
          )}
        >
          {label}
          <ChevronDown 
            className={cn(
              "w-3 h-3 transition-transform duration-300",
              isOpen && "rotate-180"
            )} 
          />
        </Link>
      ) : (
        <button
          className={cn(
            "nav-link px-4 py-2.5 text-sm text-foreground/70 hover:text-foreground transition-all duration-400 flex items-center gap-1",
            isOpen && "text-foreground",
            className
          )}
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          {label}
          <ChevronDown 
            className={cn(
              "w-3 h-3 transition-transform duration-300",
              isOpen && "rotate-180"
            )} 
          />
        </button>
      )}

      {/* Dropdown */}
      {isOpen && (
        <div 
          className="absolute top-full left-0 mt-2 min-w-[200px] bg-card border border-border/30 z-50 py-2 animate-fade-in"
          role="menu"
        >
          {items.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="block px-4 py-2.5 text-sm text-foreground/70 hover:text-accent hover:bg-accent/5 transition-all duration-300"
              role="menuitem"
              onClick={() => setIsOpen(false)}
            >
              {item.title}
              {item.description && (
                <span className="block text-xs text-muted-foreground mt-0.5">
                  {item.description}
                </span>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
