/**
 * @fileoverview Portfolio project grid with filtering
 * @module components/portfolio/PortfolioGrid
 */

import { useState, useMemo } from 'react';
import { portfolioProjects, type IndustryFilter } from './portfolioData';
import { PortfolioFilters } from './PortfolioFilters';
import { PortfolioCard } from './PortfolioCard';

/**
 * Portfolio grid with filter functionality
 */
export const PortfolioGrid = () => {
  const [activeFilter, setActiveFilter] = useState<IndustryFilter>('all');

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'all') {
      return portfolioProjects;
    }
    return portfolioProjects.filter(project => project.filterCategory === activeFilter);
  }, [activeFilter]);

  return (
    <section className="pb-20 sm:pb-28 md:pb-36">
      <div className="container">
        {/* Filters */}
        <PortfolioFilters 
          activeFilter={activeFilter} 
          onFilterChange={setActiveFilter} 
        />

        {/* Project Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {filteredProjects.map((project, index) => (
            <PortfolioCard 
              key={project.id} 
              project={project} 
              index={index}
            />
          ))}
        </div>

        {/* Empty state */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground">No projects found for this category.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default PortfolioGrid;
