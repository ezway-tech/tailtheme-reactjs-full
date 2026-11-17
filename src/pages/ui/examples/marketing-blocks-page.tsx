import { Layers, Palette, Sparkles, Zap } from 'lucide-react';
import { PageHeader } from '@/components/patterns';
import {
  BentoGrid,
  CtaSection,
  FaqSection,
  FeatureGrid,
  FeatureTabs,
  FeatureZigzag,
  HeroCentered,
  HeroEmailCapture,
  HeroScreenshot,
  HeroSplit,
  NewsletterForm,
  TestimonialFeatured,
  TestimonialsGrid,
  TestimonialsMarquee,
  TrustedByStrip,
  type FaqItem,
} from '@/components/patterns/marketing';
import { urls } from '@/routes/urls';

const FAQ: FaqItem[] = [
  {
    question: 'Can I compose blocks?',
    answer: 'Yes — import from @/components/patterns/marketing.',
  },
];

const TESTIMONIALS = [
  {
    quote: 'We shipped our admin in a weekend.',
    name: 'Jordan Lee',
    role: 'CTO, Northwind',
    avatar: 'https://i.pravatar.cc/64?img=12',
  },
  {
    quote: 'Tokens and dark mode just worked.',
    name: 'Sam Ortiz',
    role: 'Design lead',
    avatar: 'https://i.pravatar.cc/64?img=18',
  },
  {
    quote: 'Best Tailwind template we bought this year.',
    name: 'Riley Chen',
    role: 'Founder',
    avatar: 'https://i.pravatar.cc/64?img=22',
  },
];

export default function MarketingBlocksPage() {
  return (
    <div className="space-y-0">
      <div className="px-6 pt-6">
        <PageHeader
          title="Marketing blocks"
          description="Composable sections for landing pages — copy into LandingPage or your marketing site."
        />
      </div>
      <HeroCentered
        eyebrow="Hero · centered"
        title="Hero centered"
        description="Default landing-style hero with gradient backdrop."
        primaryCta={{ label: 'Get started', href: urls.auth.register }}
        secondaryCta={{ label: 'Docs', href: urls.docs.root }}
      />
      <HeroSplit
        eyebrow="Hero · split"
        title="Hero split"
        description="Primary marketing hero with media column."
        primaryCta={{ label: 'Get started', href: urls.auth.register }}
        secondaryCta={{ label: 'Pricing', href: urls.app.pages.marketing.pricing }}
        media={
          <div className="aspect-video rounded-xl border border-border bg-gradient-to-br from-primary/20 to-muted" />
        }
      />
      <HeroScreenshot
        eyebrow="Hero · screenshot"
        title="Hero with product frame"
        description="Split layout with browser chrome placeholder."
        primaryCta={{ label: 'View demo', href: urls.app.dashboard }}
      />
      <HeroEmailCapture
        eyebrow="Hero · email"
        title="Capture leads on the hero"
        description="Newsletter form with validation and success states."
      />
      <TrustedByStrip />
      <FeatureGrid
        title="Feature grid"
        items={[
          { icon: Palette, title: 'Tokens', description: 'Semantic colors and radius.' },
          { icon: Sparkles, title: 'Motion', description: 'Reduced-motion aware.' },
          { icon: Zap, title: 'Fast', description: 'Vite + code splitting.' },
        ]}
      />
      <FeatureZigzag
        items={[
          {
            icon: Layers,
            title: 'Zigzag feature',
            description: 'Alternate layout for storytelling.',
          },
          {
            icon: Sparkles,
            title: 'Second row',
            description: 'Reversed on desktop for rhythm.',
          },
        ]}
      />
      <BentoGrid
        title="Bento grid"
        items={[
          { icon: Palette, title: 'Design', description: 'Figma + code parity.' },
          { icon: Layers, title: 'Layouts', description: 'App shell variants.' },
          { icon: Zap, title: 'DX', description: 'ESLint + Prettier + Husky.' },
          { icon: Sparkles, title: 'Showcase', description: 'Live component docs.' },
        ]}
      />
      <FeatureTabs
        title="Feature tabs"
        items={[
          {
            id: 'a',
            label: 'Tab A',
            title: 'First panel',
            description: 'Use for product pillars or integrations.',
            icon: Palette,
          },
          {
            id: 'b',
            label: 'Tab B',
            title: 'Second panel',
            description: 'Swap content without new routes.',
            icon: Zap,
          },
        ]}
      />
      <TestimonialsMarquee items={TESTIMONIALS} />
      <TestimonialFeatured
        quote="This block highlights a single champion customer."
        name="Jordan Lee"
        role="CTO"
        company="Northwind"
        avatar="https://i.pravatar.cc/64?img=12"
      />
      <TestimonialsGrid items={TESTIMONIALS} />
      <section className="px-6 py-12">
        <h2 className="text-h4 mb-4 text-center">Newsletter</h2>
        <NewsletterForm className="mx-auto max-w-md" />
      </section>
      <FaqSection items={FAQ} />
      <CtaSection
        title="CTA section"
        description="Full-width call to action."
        primaryCta={{ label: 'Start trial', href: urls.auth.register }}
      />
    </div>
  );
}
