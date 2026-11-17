import marketingFeatureDesignImage from '@/assets/image/marketing-feature-design.jpg';
import marketingFeatureAnalyticsImage from '@/assets/image/marketing-feature-analytics.jpg';
import marketingFeatureCollabImage from '@/assets/image/marketing-feature-collab.jpg';
import marketingFeatureTeamImage from '@/assets/image/marketing-feature-team.jpg';

export interface MarketingFeature {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  metrics: { label: string; value: string }[];
  image: string;
}

export const marketingFeatures: MarketingFeature[] = [
  {
    slug: 'design-tokens',
    title: 'Design tokens',
    tagline: 'One source of truth for color, type, and spacing.',
    description:
      'Ship light/dark themes and 16 presets from a single CSS variable layer. Figma variables stay aligned with code.',
    metrics: [
      { label: 'Preset themes', value: '16' },
      { label: 'Semantic tokens', value: '40+' },
    ],
    image: marketingFeatureDesignImage,
  },
  {
    slug: 'admin-shell',
    title: 'Admin shell',
    tagline: 'Sidebar, command palette, and breadcrumbs out of the box.',
    description:
      'AppShell with collapsible nav, theme customizer, and route-driven breadcrumbs. Perfect for B2B dashboards.',
    metrics: [
      { label: 'Nav themes', value: '10' },
      { label: 'Sample pages', value: '80+' },
    ],
    image: marketingFeatureAnalyticsImage,
  },
  {
    slug: 'vertical-demos',
    title: 'Vertical demos',
    tagline: 'Edu, e-commerce, SaaS, and more with realistic fixtures.',
    description:
      'Buyers evaluate templates by vertical fit. Each theme includes dashboards, CRUD tables, and wizards.',
    metrics: [
      { label: 'Verticals', value: '10' },
      { label: 'Dashboards', value: '9' },
    ],
    image: marketingFeatureCollabImage,
  },
  {
    slug: 'accessible-ui',
    title: 'Accessible UI',
    tagline: 'Radix primitives with focus rings and reduced motion.',
    description:
      'Skip links, semantic landmarks, and keyboard-friendly patterns. Run your own audit before launch.',
    metrics: [
      { label: 'Primitives', value: '50+' },
      { label: 'WCAG target', value: 'AA' },
    ],
    image: marketingFeatureTeamImage,
  },
];

export function getMarketingFeature(slug: string): MarketingFeature | undefined {
  return marketingFeatures.find((f) => f.slug === slug);
}
