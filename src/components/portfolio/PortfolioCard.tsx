/**
 * @fileoverview Individual portfolio project card
 * @module components/portfolio/PortfolioCard
 */

import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { type PortfolioProject } from './portfolioData';
import { MiniMockup } from './MiniMockup';
import { cn } from '@/lib/utils';

interface PortfolioCardProps {
  project: PortfolioProject;
  index: number;
}

/**
 * Get badge color based on industry filter category
 */
const getBadgeStyles = (category: string): string => {
  switch (category) {
    case 'home-services':
      return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
    case 'healthcare':
      return 'bg-teal-500/20 text-teal-400 border-teal-500/30';
    case 'professional':
      return 'bg-violet-500/20 text-violet-400 border-violet-500/30';
    case 'automotive':
      return 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30';
    default:
      return 'bg-accent/20 text-accent border-accent/30';
  }
};

/**
 * Portfolio card with mockup preview, metrics, and hover effects
 */
export const PortfolioCard = ({ project, index }: PortfolioCardProps) => {
  return (
    <Link
      to={`/portfolio/${project.slug}`}
      className={cn(
        'group block bg-card rounded-xl overflow-hidden border border-border/50',
        'hover:border-accent/40 hover:shadow-glow transition-all duration-500',
        'transform hover:-translate-y-1'
      )}
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      {/* Preview - Use screenshot if available, otherwise MiniMockup */}
      <div className="p-3 sm:p-4 pb-0">
        {project.previewImage ? (
          <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-card border border-border/50 group-hover:border-accent/30 transition-all duration-300 shadow-lg">
            <img 
              src={project.previewImage} 
              alt={`${project.company} website preview`}
              className="w-full h-full object-cover object-top"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/10 transition-colors duration-500 pointer-events-none" />
          </div>
        ) : (
          <MiniMockup project={project} />
        )}
      </div>

      {/* Card Content */}
      <div className="p-4 sm:p-5">
        {/* Company Name */}
        <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2 group-hover:text-accent transition-colors duration-300">
          {project.company}
        </h3>

        {/* Industry Badge + Location */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className={cn(
            'px-2 py-0.5 text-xs font-medium rounded border',
            getBadgeStyles(project.filterCategory)
          )}>
            {project.industry}
          </span>
          <span className="text-sm text-muted-foreground">
            {project.location}
          </span>
        </div>

        {/* Key Metric */}
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-2xl sm:text-3xl font-bold text-accent">
            {project.keyMetric}
          </span>
          <span className="text-sm text-muted-foreground">
            {project.metricLabel}
          </span>
        </div>

        {/* View CTA */}
        <div className="flex items-center text-sm font-medium text-muted-foreground group-hover:text-accent transition-colors duration-300">
          <span>View Case Study</span>
          <ArrowRight className="ml-1 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
        </div>
      </div>
    </Link>
  );
};

export default PortfolioCard;
