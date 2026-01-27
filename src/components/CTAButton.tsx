/**
 * @fileoverview CTAButton - Luxury minimal primary CTA
 * @module components/CTAButton
 */

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface CTAButtonProps {
  to: string;
  defaultText: string;
  hoverText: string;
  onClick?: () => void;
  className?: string;
  fullWidth?: boolean;
}

/**
 * Luxury CTA button with gold styling and hover text swap
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
    <Link 
      to={to} 
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        group inline-flex items-center justify-center gap-3 
        px-8 py-4 
        bg-accent text-accent-foreground 
        font-medium 
        transition-all duration-300 
        hover:bg-accent-hover hover:shadow-glow
        ${fullWidth ? 'w-full' : ''} 
        ${className}
      `}
    >
      {/* Text with swap */}
      <span className="relative">
        <span className="invisible whitespace-nowrap">
          {defaultText.length >= hoverText.length ? defaultText : hoverText}
        </span>
        <span className="absolute inset-0 flex items-center justify-center whitespace-nowrap transition-opacity duration-200">
          {isHovered ? hoverText : defaultText}
        </span>
      </span>
      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
    </Link>
  );
}
