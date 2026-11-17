import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { ArrowRight, BookOpen, Clock, Layers, Palette, Sparkles, Trophy } from 'lucide-react';
import { Badge, Button } from '@/components/ui';
import {
  CtaSection,
  FaqSection,
  FeatureGrid,
  FooterMarketing,
  LandingMarketingHeader,
  SkipLink,
  TrustedByStrip,
  TestimonialsGrid,
  FeatureZigzag,
  BentoGrid,
  PricingBlock,
  type FaqItem,
  type PricingTier,
} from '@/components/patterns';
import {
  FeatureTabs,
  TestimonialsMarquee,
  type FeatureTabItem,
} from '@/components/patterns/marketing';
import { Reveal } from '@/components/motion';
import { DURATION, EASE, STAGGER } from '@/lib/motion';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { cn } from '@/lib/cn';
import { urls } from '@/routes/urls';

const FEATURES = [
  { icon: Palette, title: 'Design tokens', description: 'Fully themable with runtime CSS vars.' },
  {
    icon: Sparkles,
    title: '40+ primitives',
    description: 'Radix + CVA + Tailwind v4 out of the box.',
  },
  {
    icon: Trophy,
    title: 'E-learning patterns',
    description: 'Fullscreen quiz, lesson player, leaderboard.',
  },
  {
    icon: BookOpen,
    title: 'Docs',
    description: 'Getting started, theming, and customization guides.',
  },
  { icon: Clock, title: 'Fast by default', description: 'Vite 6 + React 19 + code splitting.' },
  { icon: ArrowRight, title: 'RTL & a11y', description: 'Keyboard, screen reader, RTL-friendly.' },
];

const LANDING_PRICING: PricingTier[] = [
  {
    id: 'starter',
    name: 'Starter',
    description: 'For side projects',
    monthlyPrice: 0,
    annualPrice: 0,
    cta: 'Start free',
    features: [{ label: 'All UI primitives' }, { label: '9 dashboards' }],
  },
  {
    id: 'pro',
    name: 'Pro',
    description: 'For teams',
    monthlyPrice: 29,
    annualPrice: 23,
    highlighted: true,
    cta: 'Start trial',
    features: [{ label: 'Everything in Starter' }, { label: 'Priority support' }],
  },
];

const LANDING_FEATURE_TABS: FeatureTabItem[] = [
  {
    id: 'build',
    label: 'Build',
    title: 'Compose from blocks',
    description: 'Hero, bento, FAQ, and CTA sections share one token system.',
    icon: Layers,
  },
  {
    id: 'theme',
    label: 'Theme',
    title: 'Runtime theming',
    description: 'Sixteen presets, density, RTL, and motion preferences.',
    icon: Palette,
  },
  {
    id: 'ship',
    label: 'Ship',
    title: 'Vertical demos',
    description: 'CRM, Edu, E-commerce, and more with realistic fixtures.',
    icon: Sparkles,
  },
];

const LANDING_FAQ: FaqItem[] = [
  {
    question: 'Is this a production-ready template?',
    answer:
      'It is a starter with realistic mocks and patterns. Wire your API, auth, and payments before launch.',
  },
  {
    question: 'Can I remove verticals I do not need?',
    answer:
      'Yes. Routes and nav entries are grouped per theme — delete the folders you do not ship.',
  },
];

export default function LandingPage() {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const reduced = useReducedMotion();
  const isAppEmbedded = pathname.startsWith(urls.app.root);
  const headline = 'Ship a beautiful e-learning product in days, not months.';
  const words = headline.split(' ');
  return (
    <div className={cn('flex flex-col bg-background', isAppEmbedded ? 'min-h-0' : 'min-h-screen')}>
      {!isAppEmbedded ? <SkipLink /> : null}
      {!isAppEmbedded ? <LandingMarketingHeader /> : null}

      <main
        id={isAppEmbedded ? undefined : 'main-content'}
        className="flex min-h-0 flex-1 flex-col"
      >
        <section className="relative overflow-hidden px-6 py-20 text-center md:py-32">
          <motion.div
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,hsl(var(--color-primary-hsl,205_70%_37%)/0.15),transparent_60%)]"
            initial={reduced ? false : { scale: 1 }}
            animate={reduced ? undefined : { scale: [1, 1.05, 1], x: [0, 8, 0], y: [0, -6, 0] }}
            transition={
              reduced
                ? undefined
                : { duration: 18, ease: EASE.inOut, repeat: Infinity, repeatType: 'mirror' }
            }
          />
          <div className="relative mx-auto flex max-w-3xl flex-col items-center gap-6">
            <Reveal>
              <Badge variant="secondary">v0.1 · Vite + React 19 + Tailwind v4</Badge>
            </Reveal>
            <h1 className="text-balance text-4xl font-semibold leading-tight md:text-6xl">
              {reduced
                ? headline
                : words.map((w, i) => (
                    <motion.span
                      key={`${w}-${i}`}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: DURATION.md,
                        delay: i * STAGGER.tight,
                        ease: EASE.out,
                      }}
                      className="inline-block"
                    >
                      {w}
                      {i < words.length - 1 ? '\u00A0' : ''}
                    </motion.span>
                  ))}
            </h1>
            <Reveal delay={0.1}>
              <p className="max-w-xl text-pretty text-lg text-muted-foreground">
                Fully customizable app template with primitives, layouts, sample pages and docs —
                designed to be themed, extended and shipped.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="flex flex-col gap-2 sm:flex-row">
                <Button asChild size="lg">
                  <Link to={urls.app.dashboard}>
                    {t('pages.landing.cta', 'Get started')}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link to={urls.docs.root}>{t('pages.landing.learnMore', 'Learn more')}</Link>
                </Button>
              </div>
            </Reveal>
          </div>
        </section>

        <TrustedByStrip />

        <FeatureZigzag
          items={[
            {
              icon: Layers,
              title: 'Compose pages from blocks',
              description: 'Hero, bento, testimonials, FAQ — all token-driven.',
            },
            {
              icon: Sparkles,
              title: 'Ship vertical demos',
              description: 'E-commerce, Edu, SaaS, and more with realistic mock data.',
            },
          ]}
        />

        <FeatureGrid
          title="Everything you need to ship"
          description="Primitives, patterns, and vertical demos — not just empty layouts."
          items={FEATURES}
        />

        <BentoGrid
          title="Built for modern stacks"
          items={[
            {
              icon: Palette,
              title: 'Tokens',
              description: 'Light/dark + 16 presets.',
              metrics: [
                { label: 'Presets', value: '16' },
                { label: 'Modes', value: '2' },
              ],
            },
            { icon: Trophy, title: 'Patterns', description: 'Tables, wizards, pricing.' },
            { icon: Clock, title: 'Performance', description: 'Lazy routes + Vitest.' },
            { icon: BookOpen, title: 'Docs', description: 'In-app guides.' },
          ]}
        />

        <FeatureTabs
          title="Explore the template"
          description="Switch tabs to see how buyers evaluate different pillars."
          items={LANDING_FEATURE_TABS}
        />

        <TestimonialsMarquee
          items={[
            { quote: 'Shipped our admin in a weekend.', name: 'Jordan Lee', role: 'CTO' },
            { quote: 'Tokens and dark mode just worked.', name: 'Sam Ortiz', role: 'Design lead' },
            { quote: 'Best Tailwind template we bought.', name: 'Riley Chen', role: 'Founder' },
          ]}
        />

        <TestimonialsGrid
          items={[
            {
              quote: 'The fastest path from Figma to production admin.',
              name: 'Jordan Lee',
              role: 'CTO',
              avatar: 'https://i.pravatar.cc/64?img=8',
            },
            {
              quote: 'Our designers and devs finally share one system.',
              name: 'Sam Ortiz',
              role: 'Design lead',
              avatar: 'https://i.pravatar.cc/64?img=15',
            },
            {
              quote: 'Worth every dollar for the auth + settings flows alone.',
              name: 'Riley Chen',
              role: 'Founder',
              avatar: 'https://i.pravatar.cc/64?img=20',
            },
          ]}
        />

        <section className="px-6 py-16">
          <PricingBlock tiers={LANDING_PRICING} className="mx-auto max-w-5xl" />
        </section>

        <FaqSection items={LANDING_FAQ} />

        <CtaSection
          title="Ready to ship?"
          description="Clone the template, wire up your API, and launch."
          primaryCta={{ label: 'Create account', href: urls.auth.register }}
          secondaryCta={{ label: 'Browse components', href: urls.showcase.components }}
        />
      </main>

      <FooterMarketing />
    </div>
  );
}
