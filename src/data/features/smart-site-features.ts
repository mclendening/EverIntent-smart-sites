/**
 * @fileoverview Rich feature data for the Launch (Smart Site) tier ($249 one-time).
 * @module data/features/smart-site-features
 *
 * Technical detail accurate to the EverIntent delivery stack.
 */

import {
  FileText,
  Smartphone,
  Shield,
  Globe,
  MapPin,
  BarChart3,
} from 'lucide-react';
import type { ExpandableFeature } from '@/components/ai-employee/ExpandableFeatureCard';

export const smartSiteFeatures: ExpandableFeature[] = [
  {
    icon: FileText,
    title: 'Professional 5-Page Website',
    shortDesc: 'Home, About, Services, Contact, and one custom page.',
    detail: 'Custom-designed pages built on a modern tech stack. Each page is optimized for fast loading, clean layout, and professional credibility. Content is structured with proper headings and semantic HTML for accessibility and SEO.',
    benefit: 'Look professional from day one. Customers judge your business by your website.',
    searchTerms: ['professional website for small business', '5 page website design', 'affordable business website', 'small business web design', 'custom website $249'],
  },
  {
    icon: Smartphone,
    title: 'Mobile Responsive Design',
    shortDesc: 'Looks perfect on phones, tablets, and desktops.',
    detail: 'Every page is built mobile-first with responsive breakpoints at 640px, 768px, 1024px, and 1280px. Buttons are touch-friendly, text is readable without zooming, and images adapt to screen size.',
    benefit: '70% of local searches happen on mobile. Your site needs to work where customers are.',
    searchTerms: ['mobile responsive website', 'mobile friendly website design', 'responsive web design small business', 'mobile optimized website'],
  },
  {
    icon: Shield,
    title: 'SSL Certificate Included',
    shortDesc: 'Secure HTTPS connection builds customer trust.',
    detail: 'Free SSL certificate included with hosting. Your site shows the padlock icon in the browser bar. Google requires HTTPS for ranking and Chrome flags non-SSL sites as "Not Secure."',
    benefit: 'Customers trust secure sites. Google ranks them higher. SSL is non-negotiable.',
    searchTerms: ['SSL certificate for website', 'HTTPS website', 'secure business website', 'SSL included web design'],
  },
  {
    icon: Globe,
    title: 'Basic SEO Setup',
    shortDesc: 'Meta tags, site structure, and Google indexing.',
    detail: 'Includes title tags, meta descriptions, header hierarchy (H1-H3), image alt text, XML sitemap, robots.txt, and Google Search Console submission. Your site is indexed and findable.',
    benefit: 'Get found on Google. Proper SEO setup means customers can discover you.',
    searchTerms: ['basic SEO setup', 'SEO for small business website', 'Google indexing service', 'website SEO optimization', 'meta tags setup'],
  },
  {
    icon: MapPin,
    title: 'Google Maps Integration',
    shortDesc: 'Show your location to local customers.',
    detail: 'Embedded Google Map on your contact page with your exact business location. Helps with local SEO signals and makes it easy for customers to get directions.',
    benefit: 'Local customers need to find you. Maps integration drives foot traffic and calls.',
    searchTerms: ['Google Maps on website', 'local business website', 'business location map', 'local SEO website'],
  },
  {
    icon: BarChart3,
    title: 'GA4 Analytics (View Only)',
    shortDesc: 'Track visitors and page performance.',
    detail: 'Google Analytics 4 installed and configured. Track page views, visitor demographics, traffic sources, and user behavior. View-only dashboard access to see how your site performs.',
    benefit: 'Know how many people visit your site and where they come from.',
    searchTerms: ['Google Analytics for website', 'website analytics setup', 'track website visitors', 'GA4 setup service'],
  },
];
