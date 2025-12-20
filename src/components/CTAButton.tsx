import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CTAButtonProps {
  to: string;
  defaultText: string;
  hoverText: string;
  onClick?: () => void;
  className?: string;
  fullWidth?: boolean;
}

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
