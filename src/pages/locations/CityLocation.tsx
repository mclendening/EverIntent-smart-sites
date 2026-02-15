/**
 * @fileoverview Generic city location page component.
 * @module pages/locations/CityLocation
 * 
 * Data-driven location page that reads the URL slug
 * and renders LocationPageTemplate with the matching config.
 */

import { useLocation } from 'react-router-dom';
import { LocationPageTemplate } from '@/components/locations/LocationPageTemplate';
import { locationConfigs } from '@/data/locationConfigs';
import NotFound from '@/pages/NotFound';

/**
 * CityLocation - Generic location page that loads config by URL slug.
 * Extracts slug from pathname (not useParams) for SSG compatibility.
 * Used for all 32 sub-city location pages.
 * @component
 */
export default function CityLocation() {
  const { pathname } = useLocation();
  const slug = pathname.split('/').pop() || '';
  const config = slug ? locationConfigs[slug] : undefined;

  if (!config) {
    return <NotFound />;
  }

  return <LocationPageTemplate {...config} />;
}
