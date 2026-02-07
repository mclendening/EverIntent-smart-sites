/**
 * @fileoverview CTAButton Component - SSG-Safe Primary CTA
 * @module components/CTAButton
 * 
 * Uses native anchor tags for true static site navigation.
 * Ensures each page loads as a fresh HTML document for SEO.
 */

import { useState } from 'react';

/**
 * Props for the CTAButton component
 */
interface CTAButtonProps {
  /** Target route path for navigation */
  to: string;
  /** Default text shown when button is not hovered */
  defaultText: string;
  /** Text shown when button is hovered */
  hoverText: string;
  /** Optional click handler */
  onClick?: () => void;
  /** Additional CSS classes */
  className?: string;
  /** Whether button should expand to full width */
  fullWidth?: boolean;
}

/**
 * CTAButton - SSG-safe primary call-to-action button.
 * 
 * Uses native <a href> for all navigation to ensure:
 * - Full page loads for proper SSG behavior
 * - URL updates correctly in all browsers
 * - Search engines follow links naturally
 * 
 * @component
 */
export function CTAButton({ 
  to, 
  defaultText, 
  hoverText, 
  onClick,
  className = '',
  fullWidth = false
}: CTAButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  const buttonContent = (
    <span className="relative">
      {/* Invisible text to set width */}
      <span className="invisible whitespace-nowrap">
        {defaultText.length >= hoverText.length ? defaultText : hoverText}
      </span>
      {/* Actual visible text */}
      <span className="absolute inset-0 flex items-center justify-center whitespace-nowrap transition-opacity duration-200">
        {isHovered ? hoverText : defaultText}
      </span>
    </span>
  );

  return (
    <a 
      href={to}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`btn-gold btn-glow inline-flex items-center justify-center gap-2 ${fullWidth ? 'w-full' : ''} ${className}`}
    >
      {buttonContent}
    </a>
  );
}
