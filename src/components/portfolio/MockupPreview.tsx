/**
 * @fileoverview Mini mockup preview for portfolio cards
 * @module components/portfolio/MockupPreview
 * 
 * Renders a simplified visual representation of each portfolio website
 * inside a macOS-style browser chrome frame.
 */

import { type PortfolioProject } from './portfolioData';

interface MockupPreviewProps {
  project: PortfolioProject;
}

/**
 * Simplified website mockup preview for portfolio cards
 * Shows a stylized representation of the website with the project's color palette
 */
export const MockupPreview = ({ project }: MockupPreviewProps) => {
  return (
    <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-card border border-border/50 group-hover:border-accent/30 transition-colors duration-300">
      {/* Browser Chrome */}
      <div className="h-6 sm:h-7 bg-muted/80 flex items-center px-2 sm:px-3 gap-1.5 border-b border-border/50">
        {/* Traffic lights */}
        <div className="flex gap-1 sm:gap-1.5">
          <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-red-500/80" />
          <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-yellow-500/80" />
          <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-green-500/80" />
        </div>
        {/* URL bar */}
        <div className="flex-1 ml-2 sm:ml-3">
          <div className="bg-background/60 rounded px-2 py-0.5 text-[8px] sm:text-[10px] text-muted-foreground truncate">
            {project.slug.replace(/-/g, '')}.com
          </div>
        </div>
      </div>

      {/* Mockup Content - Stylized representation */}
      <div 
        className="h-[calc(100%-1.5rem)] sm:h-[calc(100%-1.75rem)] relative overflow-hidden"
        style={{ backgroundColor: project.primaryColor }}
      >
        {/* Header bar */}
        <div 
          className="h-4 sm:h-5 flex items-center justify-between px-2 sm:px-3"
          style={{ backgroundColor: `${project.primaryColor}ee` }}
        >
          {/* Logo placeholder */}
          <div className="flex items-center gap-1">
            <div 
              className="w-3 h-3 sm:w-4 sm:h-4 rounded-sm"
              style={{ backgroundColor: project.accentColor }}
            />
            <div className="w-8 sm:w-12 h-1.5 sm:h-2 bg-white/30 rounded-full" />
          </div>
          {/* Nav items */}
          <div className="flex gap-1 sm:gap-2">
            <div className="w-4 sm:w-6 h-1 bg-white/30 rounded-full" />
            <div className="w-4 sm:w-6 h-1 bg-white/30 rounded-full" />
            <div className="w-4 sm:w-6 h-1 bg-white/30 rounded-full" />
          </div>
          {/* CTA button */}
          <div 
            className="w-8 sm:w-12 h-2 sm:h-3 rounded-sm"
            style={{ backgroundColor: project.accentColor }}
          />
        </div>

        {/* Hero section */}
        <div className="p-2 sm:p-4 flex flex-col items-center justify-center h-[60%]">
          {/* Headline */}
          <div className="w-3/4 h-2 sm:h-3 bg-white/90 rounded mb-1.5 sm:mb-2" />
          <div className="w-1/2 h-2 sm:h-3 bg-white/70 rounded mb-2 sm:mb-4" />
          {/* Subheadline */}
          <div className="w-2/3 h-1 sm:h-1.5 bg-white/30 rounded mb-1" />
          <div className="w-1/2 h-1 sm:h-1.5 bg-white/30 rounded mb-2 sm:mb-4" />
          {/* CTA buttons */}
          <div className="flex gap-1 sm:gap-2">
            <div 
              className="w-10 sm:w-16 h-2 sm:h-4 rounded-sm"
              style={{ backgroundColor: project.accentColor }}
            />
            <div className="w-10 sm:w-16 h-2 sm:h-4 rounded-sm border border-white/30" />
          </div>
        </div>

        {/* Cards section */}
        <div className="px-2 sm:px-4 flex gap-1 sm:gap-2 justify-center">
          {[1, 2, 3].map((i) => (
            <div 
              key={i} 
              className="w-1/4 h-6 sm:h-10 rounded-sm bg-white/10 flex flex-col items-center justify-center p-0.5 sm:p-1"
            >
              <div 
                className="w-2 h-2 sm:w-3 sm:h-3 rounded-full mb-0.5"
                style={{ backgroundColor: project.accentColor }}
              />
              <div className="w-3/4 h-0.5 sm:h-1 bg-white/40 rounded-full" />
            </div>
          ))}
        </div>

        {/* Hover animation overlay */}
        <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/5 transition-colors duration-500" />
      </div>
    </div>
  );
};

export default MockupPreview;
