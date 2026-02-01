/**
 * @fileoverview Portfolio filter buttons
 * @module components/portfolio/PortfolioFilters
 */

import { filterOptions, type IndustryFilter } from './portfolioData';
import { cn } from '@/lib/utils';

interface PortfolioFiltersProps {
  activeFilter: IndustryFilter;
  onFilterChange: (filter: IndustryFilter) => void;
}

/**
 * Filter button group for portfolio categories
 */
export const PortfolioFilters = ({ activeFilter, onFilterChange }: PortfolioFiltersProps) => {
  return (
    <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10 sm:mb-14">
      {filterOptions.map((option) => (
        <button
          key={option.value}
          onClick={() => onFilterChange(option.value)}
          className={cn(
            'px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-sm font-medium transition-all duration-300',
            activeFilter === option.value
              ? 'bg-accent text-accent-foreground shadow-button'
              : 'bg-card border border-border text-muted-foreground hover:text-foreground hover:border-accent/50'
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default PortfolioFilters;
