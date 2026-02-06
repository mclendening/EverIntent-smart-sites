/**
 * @fileoverview CTAButton Component - Primary Call-to-Action Button
 * @module components/CTAButton
 * 
 * Luxury gold CTA button with subtle hover effects.
 * Uses native <a> tags for cross-page hash links to ensure proper scrolling.
 */

import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

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
 * CTAButton - Primary call-to-action button with luxury gold styling.
 * 
 * Uses native <a> for cross-page hash navigation to trigger browser scrolling.
 * Uses React Router Link for same-page or non-hash navigation.
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
  const location = useLocation();
  
  // Determine if this is a cross-page hash link
  const hasHash = to.includes('#');
  const targetPath = hasHash ? to.split('#')[0] : to;
  const currentPath = location.pathname;
  const isCrossPageHash = hasHash && targetPath && targetPath !== currentPath;

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

  const commonProps = {
    onClick,
    onMouseEnter: () => setIsHovered(true),
    onMouseLeave: () => setIsHovered(false),
    className: `btn-gold btn-glow inline-flex items-center justify-center gap-2 ${fullWidth ? 'w-full' : ''} ${className}`,
  };

  // Use native <a> for cross-page hash links to trigger browser's hash scrolling
  if (isCrossPageHash) {
    return (
      <a href={to} {...commonProps}>
        {buttonContent}
      </a>
    );
  }

  // Use React Router Link for same-page or non-hash navigation
  return (
    <Link to={to} {...commonProps}>
      {buttonContent}
    </Link>
  );
}
