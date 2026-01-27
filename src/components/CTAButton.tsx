/**
 * @fileoverview CTAButton - Simplified luxury CTA
 * @module components/CTAButton
 */

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CTAButtonProps {
  to: string;
  defaultText: string;
  hoverText: string;
  onClick?: () => void;
  className?: string;
  fullWidth?: boolean;
}

/**
 * Luxury CTA button with subtle hover text swap.
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
        className={`flex items-center ${fullWidth ? 'justify-center' : ''} gap-3`}
      >
        <span className="relative">
          <span className="invisible whitespace-nowrap">
            {defaultText.length >= hoverText.length ? defaultText : hoverText}
          </span>
          <span className="absolute inset-0 flex items-center justify-center whitespace-nowrap transition-opacity duration-300">
            {isHovered ? hoverText : defaultText}
          </span>
        </span>
        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
      </Link>
    </Button>
  );
}
