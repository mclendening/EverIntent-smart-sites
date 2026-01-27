/**
 * @fileoverview CTAButton Component - Primary Call-to-Action Button
 * @description Animated CTA button with hover text swap, Sparkles icon, and pulse indicator.
 *              Designed for high-conversion actions per BRD v33.0 Section 7 (Primary CTA).
 * 
 * @module components/CTAButton
 * @see {@link https://docs.lovable.dev} Lovable Documentation
 * 
 * @brd-reference BRD v33.0 Section 7 - Primary CTA Design
 * @brd-reference BRD v33.0 Section 4.3 - Color Psychology (Orange/Gold accent)
 */

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * Props for the CTAButton component
 * @interface CTAButtonProps
 */
interface CTAButtonProps {
  /** Target route path for navigation */
  to: string;
  /** Default text shown when button is not hovered */
  defaultText: string;
  /** Text shown when button is hovered (creates engagement) */
  hoverText: string;
  /** Optional click handler for analytics or custom actions */
  onClick?: () => void;
  /** Additional CSS classes for styling customization */
  className?: string;
  /** Whether button should expand to full container width */
  fullWidth?: boolean;
}

/**
 * CTAButton - Primary call-to-action button with hover text animation
 * 
 * Features per BRD v33.0:
 * - Sparkles icon for visual engagement
 * - Text swap on hover for curiosity/engagement
 * - Pulse indicator dot for attention
 * - Glow variant styling from design system
 * 
 * @component
 * @example
 * // Standard usage
 * <CTAButton 
 *   to="/pricing" 
 *   defaultText="Get Started — $249"
 *   hoverText="See All Plans"
 * />
 * 
 * @example
 * // Full width in mobile menu
 * <CTAButton 
 *   to="/pricing" 
 *   defaultText="Get Started" 
 *   hoverText="Let's Go!" 
 *   fullWidth
 *   onClick={() => closeMobileMenu()}
 * />
 * 
 * @param {CTAButtonProps} props - Component properties
 * @returns {JSX.Element} Rendered CTA button with Link wrapper
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

  return (
    <Button 
      variant="glow" 
      size="lg" 
      asChild 
      className={`group ${fullWidth ? 'w-full' : ''} ${className}`}
    >
      <Link 
        to={to} 
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`flex items-center ${fullWidth ? 'justify-center' : ''} gap-2`}
      >
        <Sparkles 
          className="w-4 h-4 text-accent transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" 
        />
        {/* Fixed width container with both texts to prevent layout shift */}
        <span className="relative">
          {/* Invisible text to set width (use longer of the two) */}
          <span className="invisible whitespace-nowrap">
            {defaultText.length >= hoverText.length ? defaultText : hoverText}
          </span>
          {/* Actual visible text, absolutely positioned */}
          <span className="absolute inset-0 flex items-center justify-center whitespace-nowrap transition-opacity duration-200">
            {isHovered ? hoverText : defaultText}
          </span>
        </span>
        <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
      </Link>
    </Button>
  );
}
