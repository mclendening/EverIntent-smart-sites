/**
 * @fileoverview Mini Mockup for Portfolio Hub Page
 * @module components/portfolio/MiniMockup
 * 
 * Renders a macOS-style browser frame with a REAL hero image
 * and a simulated website overlay showing navigation and branding.
 */

import { Phone, MessageCircle } from 'lucide-react';
import { type PortfolioProject } from './portfolioData';

interface MiniMockupProps {
  project: PortfolioProject;
}

/**
 * MiniMockup - Real hero image with simulated website overlay
 * 
 * Uses actual Unsplash images for visual impact while showing
 * a stylized navigation bar and branding overlay for context.
 */
export const MiniMockup = ({ project }: MiniMockupProps) => {
  const companyInitials = project.company.split(' ').map(w => w[0]).join('').slice(0, 2);

  return (
    <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-card border border-border/50 group-hover:border-accent/30 transition-all duration-300 shadow-lg isolate">
      {/* Browser Chrome */}
      <div className="h-5 sm:h-6 bg-muted/90 flex items-center px-2 gap-1.5 border-b border-border/50 relative z-10">
        {/* Traffic lights */}
        <div className="flex gap-1">
          <div className="w-2 h-2 rounded-full bg-red-500/80" />
          <div className="w-2 h-2 rounded-full bg-yellow-500/80" />
          <div className="w-2 h-2 rounded-full bg-green-500/80" />
        </div>
        {/* URL bar */}
        <div className="flex-1 ml-2">
          <div className="bg-background/80 rounded px-2 py-0.5 text-[7px] sm:text-[8px] text-muted-foreground truncate font-mono">
            🔒 {project.slug.replace(/-/g, '')}.com
          </div>
        </div>
      </div>

      {/* Website Content - Real Image with Overlay */}
      <div className="h-[calc(100%-1.25rem)] sm:h-[calc(100%-1.5rem)] relative overflow-hidden">
        {/* Real Hero Image */}
        <img 
          src={project.heroImage} 
          alt={`${project.company} website preview`}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
        
        {/* Gradient overlay for readability */}
        <div 
          className="absolute inset-0"
          style={{ 
            background: `linear-gradient(to bottom, ${project.primaryColor}ee 0%, ${project.primaryColor}aa 30%, transparent 60%, ${project.primaryColor}cc 100%)` 
          }}
        />

        {/* Navigation Bar Overlay */}
        <nav className="absolute top-0 left-0 right-0 h-6 sm:h-7 bg-white/95 flex items-center justify-between px-2 sm:px-3 border-b border-gray-200 z-10">
          {/* Logo */}
          <div className="flex items-center gap-1.5">
            <div 
              className="w-4 h-4 sm:w-5 sm:h-5 rounded flex items-center justify-center text-white text-[6px] sm:text-[7px] font-bold shadow-sm"
              style={{ backgroundColor: project.accentColor }}
            >
              {companyInitials}
            </div>
            <span className="text-[7px] sm:text-[9px] font-semibold text-gray-800 truncate max-w-[80px] sm:max-w-[100px]">
              {project.company.split(' ').slice(0, 2).join(' ')}
            </span>
          </div>

          {/* Nav Items - Desktop only */}
          <div className="hidden sm:flex items-center gap-3">
            <span className="text-[7px] text-gray-600 font-medium">Home</span>
            <span className="text-[7px] text-gray-600">Services</span>
            <span className="text-[7px] text-gray-600">About</span>
            <span className="text-[7px] text-gray-600">Contact</span>
          </div>

          {/* CTA Button */}
          <div 
            className="px-2 py-0.5 sm:py-1 rounded text-[6px] sm:text-[7px] text-white font-medium flex items-center gap-1 shadow-sm"
            style={{ backgroundColor: project.accentColor }}
          >
            <Phone className="w-2 h-2 sm:w-2.5 sm:h-2.5" />
            <span className="hidden sm:inline">Get Quote</span>
          </div>
        </nav>

        {/* Hero Content Overlay */}
        <div className="absolute top-10 sm:top-12 left-0 right-0 px-3 sm:px-4 text-center">
          <h2 className="text-white text-[11px] sm:text-sm font-bold mb-1 leading-tight drop-shadow-md">
            {project.company.split(' ').slice(0, 2).join(' ')}
          </h2>
          <p className="text-white/90 text-[8px] sm:text-[10px] mb-2 drop-shadow-sm">
            {project.description.slice(0, 50)}...
          </p>
          
          {/* CTA Buttons */}
          <div className="flex justify-center gap-2">
            <button 
              className="px-2 sm:px-3 py-1 rounded text-[6px] sm:text-[8px] text-white font-medium shadow-md"
              style={{ backgroundColor: project.accentColor }}
            >
              Free Quote
            </button>
            <button className="px-2 sm:px-3 py-1 rounded text-[6px] sm:text-[8px] text-white border border-white/60 backdrop-blur-sm">
              Learn More
            </button>
          </div>
        </div>

        {/* Bottom Info Bar */}
        <div className="absolute bottom-0 left-0 right-0 px-2 py-1.5 bg-black/40 backdrop-blur-sm flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[7px] sm:text-[8px] text-white/90 font-medium">
              ⭐ 4.9 Rating
            </span>
            <span className="text-[6px] sm:text-[7px] text-white/70">
              {project.location}
            </span>
          </div>
          <span className="text-[6px] sm:text-[7px] text-white/70 font-medium">
            {project.industry}
          </span>
        </div>

        {/* Simulated Chat Widget - positioned lower to avoid top-right area */}
        <div 
          className="absolute bottom-10 right-2 w-6 h-6 sm:w-7 sm:h-7 rounded-full shadow-lg flex items-center justify-center z-20"
          style={{ backgroundColor: project.accentColor }}
        >
          <MessageCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white" />
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/10 transition-colors duration-500 pointer-events-none" />
      </div>
    </div>
  );
};

export default MiniMockup;
