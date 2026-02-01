/**
 * @fileoverview Mini Interactive Mockup for Portfolio Hub Page
 * @module components/portfolio/MiniMockup
 * 
 * Renders a scaled-down but readable interactive mockup of each portfolio website.
 * Uses actual industry-relevant content and colors from the project data.
 */

import { Phone, Star, MessageCircle } from 'lucide-react';
import { type PortfolioProject } from './portfolioData';

interface MiniMockupProps {
  project: PortfolioProject;
}

/**
 * Industry-specific hero headlines
 */
const getHeroContent = (category: string, company: string): { headline: string; subheadline: string } => {
  switch (category) {
    case 'home-services':
      return {
        headline: `${company.split(' ')[0]}'s Trusted Experts`,
        subheadline: '24/7 Emergency Service • Licensed & Insured'
      };
    case 'healthcare':
      return {
        headline: 'Your Smile, Our Priority',
        subheadline: 'Family & Cosmetic Care • New Patients Welcome'
      };
    case 'professional':
      return {
        headline: 'Results You Can Trust',
        subheadline: 'Experienced Team • Proven Track Record'
      };
    case 'automotive':
      return {
        headline: 'Expert Auto Care',
        subheadline: 'Factory-Trained Technicians • All Makes & Models'
      };
    default:
      return {
        headline: 'Professional Service',
        subheadline: 'Quality You Can Count On'
      };
  }
};

/**
 * MiniMockup - Scaled-down readable mockup for hub page
 * 
 * Shows a realistic preview of the website with:
 * - Actual text content (not placeholder bars)
 * - Readable navigation
 * - Industry-specific theming
 * - Simulated chat widget indicator
 */
export const MiniMockup = ({ project }: MiniMockupProps) => {
  const heroContent = getHeroContent(project.filterCategory, project.company);
  const companyInitials = project.company.split(' ').map(w => w[0]).join('').slice(0, 2);

  return (
    <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-card border border-border/50 group-hover:border-accent/30 transition-all duration-300 shadow-lg">
      {/* Browser Chrome */}
      <div className="h-5 sm:h-6 bg-muted/90 flex items-center px-2 gap-1.5 border-b border-border/50">
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

      {/* Website Content */}
      <div 
        className="h-[calc(100%-1.25rem)] sm:h-[calc(100%-1.5rem)] relative overflow-hidden"
        style={{ backgroundColor: project.primaryColor }}
      >
        {/* Navigation Bar */}
        <nav 
          className="h-5 sm:h-6 bg-white/95 flex items-center justify-between px-2 border-b border-gray-200"
        >
          {/* Logo */}
          <div className="flex items-center gap-1">
            <div 
              className="w-4 h-4 rounded flex items-center justify-center text-white text-[6px] font-bold"
              style={{ backgroundColor: project.accentColor }}
            >
              {companyInitials}
            </div>
            <span className="text-[7px] sm:text-[8px] font-semibold text-gray-800 hidden xs:inline truncate max-w-[60px]">
              {project.company.split(' ').slice(0, 2).join(' ')}
            </span>
          </div>

          {/* Nav Items */}
          <div className="hidden sm:flex items-center gap-2">
            <span className="text-[6px] text-gray-600">Home</span>
            <span className="text-[6px] text-gray-600">Services</span>
            <span className="text-[6px] text-gray-600">About</span>
          </div>

          {/* CTA Button */}
          <div 
            className="px-1.5 py-0.5 rounded text-[6px] text-white font-medium flex items-center gap-0.5"
            style={{ backgroundColor: project.accentColor }}
          >
            <Phone className="w-2 h-2" />
            <span className="hidden sm:inline">Call</span>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="px-2 sm:px-3 py-3 sm:py-4 text-center">
          <h1 className="text-white text-[10px] sm:text-xs font-bold mb-1 leading-tight">
            {heroContent.headline}
          </h1>
          <p className="text-white/80 text-[7px] sm:text-[8px] mb-2">
            {heroContent.subheadline}
          </p>
          
          {/* Hero CTA Buttons */}
          <div className="flex justify-center gap-1">
            <button 
              className="px-2 py-1 rounded text-[6px] sm:text-[7px] text-white font-medium"
              style={{ backgroundColor: project.accentColor }}
            >
              Free Quote
            </button>
            <button className="px-2 py-1 rounded text-[6px] sm:text-[7px] text-white border border-white/40">
              Learn More
            </button>
          </div>
        </div>

        {/* Trust Bar */}
        <div className="bg-white/10 px-2 py-1.5 flex justify-center gap-3 flex-wrap">
          <div className="flex items-center gap-0.5 text-white">
            <Star className="w-2 h-2 text-yellow-400 fill-yellow-400" />
            <span className="text-[6px]">4.9★ Rating</span>
          </div>
          <div className="flex items-center gap-0.5 text-white">
            <span className="text-[6px]">✓ Licensed</span>
          </div>
        </div>

        {/* Services Grid Preview */}
        <div className="bg-gray-50 px-2 py-2">
          <p className="text-[7px] font-semibold text-center mb-1.5" style={{ color: project.primaryColor }}>
            Our Services
          </p>
          <div className="grid grid-cols-3 gap-1">
            {['Service 1', 'Service 2', 'Service 3'].map((service, i) => (
              <div 
                key={i} 
                className="bg-white rounded p-1 text-center shadow-sm"
              >
                <div 
                  className="w-3 h-3 rounded-full mx-auto mb-0.5"
                  style={{ backgroundColor: `${project.accentColor}20` }}
                >
                  <div 
                    className="w-1.5 h-1.5 rounded-full mx-auto translate-y-[3px]"
                    style={{ backgroundColor: project.accentColor }}
                  />
                </div>
                <p className="text-[5px] text-gray-700">{service}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Widget Indicator */}
        <div 
          className="absolute bottom-2 right-2 w-6 h-6 rounded-full shadow-lg flex items-center justify-center"
          style={{ backgroundColor: project.accentColor }}
        >
          <MessageCircle className="w-3 h-3 text-white" />
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/5 transition-colors duration-500 pointer-events-none" />
      </div>
    </div>
  );
};

export default MiniMockup;
