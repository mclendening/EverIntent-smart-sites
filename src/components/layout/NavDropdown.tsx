/**
 * @fileoverview Navigation Dropdown Component
 * @module components/layout/NavDropdown
 * 
 * Dropdown menu for navigation with hover delay to prevent
 * accidental triggers on mobile/touch devices.
 * 
 * Features:
 * - 150ms hover delay before opening
 * - Smooth fade-in animation
 * - Closes on mouse leave with delay
 * - Accessible keyboard navigation
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
  /** Display label for the dropdown trigger */
  label: string;
  /** Array of dropdown menu items */
  items: DropdownItem[];
  /** Additional CSS classes for the trigger */
  className?: string;
}

/**
 * NavDropdown - Accessible dropdown menu with hover delay
 * 
 * Implements 150ms hover delay to prevent accidental triggers,
 * especially important for mobile/touch users.
 * 
 * @component
 * @example
 * <NavDropdown 
 *   label="Smart Websites"
 *   items={[
 *     { title: 'Smart Site', path: '/smart-websites#smart-site', description: '$249 one-time' },
 *     { title: 'Smart Lead', path: '/smart-websites#smart-lead', description: '$97/mo' },
 *   ]}
 * />
 */
export function NavDropdown({ label, items, className }: NavDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const openTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    // Clear any pending close timeout
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    // 150ms delay before opening
    openTimeoutRef.current = setTimeout(() => {
      setIsOpen(true);
    }, 150);
  };

  const handleMouseLeave = () => {
    // Clear any pending open timeout
    if (openTimeoutRef.current) {
      clearTimeout(openTimeoutRef.current);
      openTimeoutRef.current = null;
    }
    // 100ms delay before closing to allow moving to dropdown
    closeTimeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 100);
  };

  // Cleanup timeouts on unmount
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
      {/* Trigger button */}
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

      {/* Dropdown menu */}
      {isOpen && (
        <div 
          className="absolute top-full left-0 mt-1 min-w-[220px] bg-card border border-border rounded-lg shadow-layered z-50 py-2 animate-fade-in"
          role="menu"
        >
          {items.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="block px-4 py-2.5 text-sm hover:bg-accent/10 transition-colors"
              role="menuitem"
              onClick={() => setIsOpen(false)}
            >
              <span className="font-medium text-foreground">{item.title}</span>
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
