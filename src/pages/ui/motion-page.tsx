import * as React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowUpRight, Check, Copy, Heart, Settings, Sparkles, Star, Zap } from 'lucide-react';
import { urls } from '@/routes/urls';
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Label,
  Slider,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui';
import { PageHeader } from '@/components/patterns';
import { ShowcaseSection } from '@/components/showcase/showcase-section';
import {
  ActivePill,
  Confetti,
  CountUp,
  FlipCard,
  GradientText,
  MagnetButton,
  Marquee,
  MorphingBlob,
  MotionCard,
  MotionList,
  MotionListItem,
  Parallax,
  Reveal,
  Shake,
  SkeletonShimmer,
  StaggerGrid,
  Typewriter,
} from '@/components/motion';
import { DURATION, EASE, SPRING, STAGGER } from '@/lib/motion';
import { cn } from '@/lib/cn';

const tabs = ['Overview', 'Builder', 'Tokens'] as const;

function ActivePillDemo() {
  const [active, setActive] = React.useState<(typeof tabs)[number]>('Overview');
  return (
    <div className="inline-flex rounded-md border border-border bg-muted/40 p-1">
      {tabs.map((tab) => (
        <button
          key={tab}
          type="button"
          onClick={() => setActive(tab)}
          className={cn(
            'relative rounded px-3 py-1.5 text-sm font-medium transition-colors',
            active === tab ? 'text-foreground' : 'text-muted-foreground hover:text-foreground',
          )}
        >
          {active === tab ? (
            <ActivePill
              layoutId="motion-demo-pill"
              className="!bg-background !ring-1 !ring-border"
            />
          ) : null}
          <span className="relative">{tab}</span>
        </button>
      ))}
    </div>
  );
}

function ConfettiDemo() {
  const [count, setCount] = React.useState(0);
  return (
    <div className="relative flex min-h-32 w-full items-center justify-center">
      <Confetti key={count} fire={count > 0} />
      <Button onClick={() => setCount((c) => c + 1)} variant="default">
        <Sparkles className="mr-1 h-4 w-4" /> Fire confetti
      </Button>
    </div>
  );
}

function ShakeDemo() {
  const [count, setCount] = React.useState(0);
  return (
    <Shake trigger={count}>
      <Button variant="outline" onClick={() => setCount((c) => c + 1)}>
        Shake me ({count})
      </Button>
    </Shake>
  );
}

function RevealDemo() {
  return (
    <div className="w-full space-y-2">
      <Reveal className="rounded-md border border-border bg-muted/30 px-3 py-2 text-sm">
        Scroll-triggered reveal (up)
      </Reveal>
      <Reveal
        direction="left"
        delay={0.05}
        className="rounded-md border border-border bg-muted/30 px-3 py-2 text-sm"
      >
        Delayed reveal from left
      </Reveal>
      <Reveal
        direction="right"
        delay={0.1}
        className="rounded-md border border-border bg-muted/30 px-3 py-2 text-sm"
      >
        Delayed reveal from right
      </Reveal>
    </div>
  );
}

function MotionListDemo() {
  const [key, setKey] = React.useState(0);
  return (
    <div className="w-full space-y-3">
      <Button size="sm" variant="outline" onClick={() => setKey((k) => k + 1)}>
        Replay
      </Button>
      <MotionList key={key} stagger="normal" className="space-y-2">
        {['Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon'].map((label) => (
          <MotionListItem
            key={label}
            className="rounded-md border border-border bg-muted/30 px-3 py-2 text-sm"
          >
            {label}
          </MotionListItem>
        ))}
      </MotionList>
    </div>
  );
}

function StaggerGridDemo() {
  const [key, setKey] = React.useState(0);
  return (
    <div className="w-full space-y-3">
      <Button size="sm" variant="outline" onClick={() => setKey((k) => k + 1)}>
        Replay
      </Button>
      <StaggerGrid key={key} className="grid grid-cols-2 gap-2 sm:grid-cols-4" stagger="normal">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="flex h-16 items-center justify-center rounded-md border border-border bg-gradient-to-br from-primary/10 to-accent/10 text-sm font-medium"
          >
            {i + 1}
          </div>
        ))}
      </StaggerGrid>
    </div>
  );
}

function CardsDemo() {
  return (
    <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-3">
      {['Subtle', 'Default', 'Strong'].map((name, idx) => (
        <MotionCard key={name} lift={1 + idx}>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">{name}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Hover me — lift {1 + idx}px, tap for press feedback.
            </CardContent>
          </Card>
        </MotionCard>
      ))}
    </div>
  );
}

function CountUpDemo() {
  const [value, setValue] = React.useState(128);
  return (
    <div className="w-full space-y-3">
      <div className="flex items-baseline gap-2">
        <CountUp value={value} className="text-4xl font-semibold tabular-nums text-foreground" />
        <span className="text-sm text-muted-foreground">active users</span>
      </div>
      <div className="flex gap-2">
        <Button
          size="sm"
          variant="outline"
          onClick={() => setValue(Math.round(Math.random() * 9999))}
        >
          Random
        </Button>
        <Button size="sm" variant="outline" onClick={() => setValue((v) => v + 100)}>
          +100
        </Button>
      </div>
    </div>
  );
}

function TokensTable() {
  return (
    <div className="grid w-full gap-4 sm:grid-cols-3">
      <div className="rounded-md border border-border p-3">
        <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          DURATION
        </div>
        <dl className="mt-2 space-y-1 text-sm">
          {Object.entries(DURATION).map(([k, v]) => (
            <div key={k} className="flex justify-between font-mono">
              <dt>{k}</dt>
              <dd>{v}s</dd>
            </div>
          ))}
        </dl>
      </div>
      <div className="rounded-md border border-border p-3">
        <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          EASE
        </div>
        <dl className="mt-2 space-y-1 text-sm">
          {Object.entries(EASE).map(([k, v]) => (
            <div key={k} className="flex flex-col gap-0.5 font-mono text-xs">
              <dt className="text-muted-foreground">{k}</dt>
              <dd className="truncate">{Array.isArray(v) ? `[${v.join(', ')}]` : v}</dd>
            </div>
          ))}
        </dl>
      </div>
      <div className="rounded-md border border-border p-3">
        <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          SPRING
        </div>
        <dl className="mt-2 space-y-1 font-mono text-xs">
          {Object.entries(SPRING).map(([k, v]) => (
            <div key={k} className="flex flex-col gap-0.5">
              <dt className="text-muted-foreground">{k}</dt>
              <dd>
                k={(v as { stiffness: number }).stiffness}, d=
                {(v as { damping: number }).damping}
              </dd>
            </div>
          ))}
        </dl>
      </div>
      <div className="rounded-md border border-border p-3 sm:col-span-3">
        <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          STAGGER
        </div>
        <dl className="mt-2 flex flex-wrap gap-4 font-mono text-sm">
          {Object.entries(STAGGER).map(([k, v]) => (
            <div key={k} className="flex items-center gap-2">
              <dt className="text-muted-foreground">{k}</dt>
              <dd>{v}s</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}

function MarqueeDemo() {
  const logos = [
    'Acme',
    'Globex',
    'Initech',
    'Umbrella',
    'Soylent',
    'Hooli',
    'Vehement',
    'Pied Piper',
  ];
  return (
    <div className="w-full">
      <Marquee className="rounded-md border border-border bg-muted/20 py-3" speed={22}>
        {logos.map((logo) => (
          <span
            key={logo}
            className="inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-muted-foreground"
          >
            <Star className="h-4 w-4 text-primary" /> {logo}
          </span>
        ))}
      </Marquee>
    </div>
  );
}

function ParallaxDemo() {
  return (
    <div className="relative h-44 w-full overflow-hidden rounded-md border border-border bg-gradient-to-br from-primary/10 via-background to-accent/10">
      <Parallax
        offset={40}
        className="absolute inset-x-6 top-4 rounded-md border border-border bg-card px-4 py-2 text-sm shadow-sm"
      >
        <span className="font-medium text-foreground">Parallax layer 1</span>
        <span className="ml-2 text-muted-foreground">offset 40px</span>
      </Parallax>
      <Parallax
        offset={80}
        direction="negative"
        className="absolute inset-x-12 bottom-6 rounded-md border border-border bg-card px-4 py-2 text-sm shadow-sm"
      >
        <span className="font-medium text-foreground">Parallax layer 2</span>
        <span className="ml-2 text-muted-foreground">offset 80px • negative</span>
      </Parallax>
    </div>
  );
}

function TypewriterDemo() {
  return (
    <div className="space-y-2 text-base">
      <div className="font-display text-2xl font-semibold text-foreground">
        Build for{' '}
        <Typewriter
          text={['designers', 'engineers', 'product teams', 'side projects']}
          className="text-primary"
        />
      </div>
      <p className="text-sm text-muted-foreground">
        Cycles through phrases with configurable speed and pause. Honors reduced motion by showing
        the final string.
      </p>
    </div>
  );
}

function GradientTextDemo() {
  return (
    <div className="space-y-2">
      <div className="font-display text-3xl font-extrabold tracking-tight">
        <GradientText gradient="from-primary-500 via-accent-500 to-info-500">
          Animated gradient headline
        </GradientText>
      </div>
      <div className="font-display text-2xl font-semibold">
        <GradientText gradient="from-success-500 via-info-500 to-primary-500" speed={4}>
          Status-tinted variant
        </GradientText>
      </div>
    </div>
  );
}

function MagnetButtonDemo() {
  return (
    <div className="flex w-full items-center justify-center py-6">
      <MagnetButton strength={20} radius={130}>
        <Heart className="h-4 w-4" /> Get started
      </MagnetButton>
    </div>
  );
}

function FlipCardDemo() {
  return (
    <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2">
      <FlipCard
        className="h-40"
        front={
          <Card className="flex h-full items-center justify-center bg-gradient-to-br from-primary/15 to-accent/10">
            <CardContent className="space-y-1 text-center">
              <Sparkles className="mx-auto h-6 w-6 text-primary" />
              <p className="font-semibold">Hover to flip</p>
              <p className="text-xs text-muted-foreground">Hover trigger, Y axis</p>
            </CardContent>
          </Card>
        }
        back={
          <Card className="flex h-full items-center justify-center bg-card">
            <CardContent className="space-y-1 text-center">
              <Zap className="mx-auto h-6 w-6 text-accent-foreground" />
              <p className="font-semibold">Behind the scenes</p>
              <p className="text-xs text-muted-foreground">Reveal context or extra metadata</p>
            </CardContent>
          </Card>
        }
      />
      <FlipCard
        className="h-40"
        trigger="click"
        axis="x"
        front={
          <Card className="flex h-full items-center justify-center bg-gradient-to-br from-info/15 to-success/10">
            <CardContent className="space-y-1 text-center">
              <p className="font-semibold">Click to flip</p>
              <p className="text-xs text-muted-foreground">Click trigger, X axis</p>
            </CardContent>
          </Card>
        }
        back={
          <Card className="flex h-full items-center justify-center bg-card">
            <CardContent className="space-y-1 text-center">
              <p className="font-semibold">Click again to return</p>
              <p className="text-xs text-muted-foreground">Keyboard accessible (Enter/Space)</p>
            </CardContent>
          </Card>
        }
      />
    </div>
  );
}

function SkeletonShimmerDemo() {
  return (
    <div className="grid w-full gap-3 sm:grid-cols-2">
      <div className="space-y-3 rounded-md border border-border p-4">
        <SkeletonShimmer className="h-4 w-3/4" />
        <SkeletonShimmer className="h-4 w-1/2" />
        <SkeletonShimmer className="h-32 w-full" />
      </div>
      <div className="flex items-start gap-3 rounded-md border border-border p-4">
        <SkeletonShimmer className="h-12 w-12" shape="circle" />
        <div className="flex-1 space-y-2">
          <SkeletonShimmer className="h-4 w-2/3" />
          <SkeletonShimmer className="h-4 w-1/2" />
          <SkeletonShimmer className="h-4 w-3/4" />
        </div>
      </div>
    </div>
  );
}

function MorphingBlobDemo() {
  return (
    <div className="relative flex h-48 w-full items-center justify-center overflow-hidden rounded-md border border-border bg-muted/20">
      <MorphingBlob className="absolute -left-10 top-2 opacity-80" size={200} />
      <MorphingBlob
        className="absolute -right-12 bottom-0 opacity-70"
        size={180}
        fromColor="hsl(var(--color-info-500-hsl, 200 80% 48%))"
        toColor="hsl(var(--color-success-500-hsl, 142 70% 48%))"
      />
      <span className="relative font-display text-lg font-semibold text-foreground">
        Decor blob backdrops
      </span>
    </div>
  );
}

const EASE_OPTIONS: Array<{ id: keyof typeof EASE; label: string }> = [
  { id: 'out', label: 'out' },
  { id: 'inOut', label: 'inOut' },
  { id: 'in', label: 'in' },
  { id: 'linear', label: 'linear' },
];

function MotionBuilder() {
  const [mode, setMode] = React.useState<'tween' | 'spring'>('tween');
  const [duration, setDuration] = React.useState<number>(DURATION.md);
  const [easeKey, setEaseKey] = React.useState<keyof typeof EASE>('out');
  const [stiffness, setStiffness] = React.useState<number>(260);
  const [damping, setDamping] = React.useState<number>(24);
  const [stagger, setStagger] = React.useState<number>(STAGGER.normal);
  const [replayKey, setReplayKey] = React.useState<number>(0);
  const [copied, setCopied] = React.useState<boolean>(false);

  const transitionSnippet = React.useMemo(() => {
    if (mode === 'spring') {
      return `{ type: 'spring', stiffness: ${stiffness}, damping: ${damping} }`;
    }
    const ease = EASE[easeKey];
    const easeStr = Array.isArray(ease) ? `[${ease.join(', ')}]` : `'${ease}'`;
    return `{ duration: ${duration}, ease: ${easeStr} }`;
  }, [mode, stiffness, damping, easeKey, duration]);

  const codeSnippet = React.useMemo(
    () =>
      `// Drop into any motion component
const transition = ${transitionSnippet};
const container = {
  show: {
    transition: { staggerChildren: ${stagger} },
  },
};

<MotionList stagger="normal" transition={transition}>...</MotionList>`,
    [transitionSnippet, stagger],
  );

  const handleCopy = React.useCallback(() => {
    void navigator.clipboard.writeText(codeSnippet).then(() => {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    });
  }, [codeSnippet]);

  return (
    <div className="grid w-full gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(280px,360px)]">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between gap-3">
          <CardTitle className="text-sm font-semibold">Live preview</CardTitle>
          <Button size="sm" variant="outline" onClick={() => setReplayKey((k) => k + 1)}>
            Replay
          </Button>
        </CardHeader>
        <CardContent>
          <MotionList
            key={replayKey}
            stagger={stagger > 0.06 ? 'loose' : stagger > 0.04 ? 'normal' : 'tight'}
            className="grid grid-cols-2 gap-2 sm:grid-cols-4"
          >
            {Array.from({ length: 8 }).map((_, i) => (
              <MotionListItem
                key={i}
                className="flex h-16 items-center justify-center rounded-md border border-border bg-gradient-to-br from-primary/15 to-accent/10 text-sm font-semibold"
              >
                {i + 1}
              </MotionListItem>
            ))}
          </MotionList>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm font-semibold">
            <Settings className="h-4 w-4" /> Builder
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Tabs value={mode} onValueChange={(v) => setMode(v as 'tween' | 'spring')}>
            <TabsList className="w-full">
              <TabsTrigger value="tween" className="flex-1">
                Tween
              </TabsTrigger>
              <TabsTrigger value="spring" className="flex-1">
                Spring
              </TabsTrigger>
            </TabsList>
            <TabsContent value="tween" className="space-y-3 pt-3">
              <div className="space-y-1.5">
                <Label className="flex items-center justify-between text-xs">
                  duration{' '}
                  <span className="font-mono text-muted-foreground">{duration.toFixed(2)}s</span>
                </Label>
                <Slider
                  min={0.05}
                  max={1.2}
                  step={0.05}
                  value={[duration]}
                  onValueChange={(v) => setDuration(v[0] ?? duration)}
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">ease</Label>
                <div className="flex flex-wrap gap-1.5">
                  {EASE_OPTIONS.map((opt) => (
                    <Button
                      key={opt.id}
                      type="button"
                      size="sm"
                      variant={easeKey === opt.id ? 'default' : 'outline'}
                      onClick={() => setEaseKey(opt.id)}
                    >
                      {opt.label}
                    </Button>
                  ))}
                </div>
              </div>
            </TabsContent>
            <TabsContent value="spring" className="space-y-3 pt-3">
              <div className="space-y-1.5">
                <Label className="flex items-center justify-between text-xs">
                  stiffness <span className="font-mono text-muted-foreground">{stiffness}</span>
                </Label>
                <Slider
                  min={60}
                  max={500}
                  step={10}
                  value={[stiffness]}
                  onValueChange={(v) => setStiffness(v[0] ?? stiffness)}
                />
              </div>
              <div className="space-y-1.5">
                <Label className="flex items-center justify-between text-xs">
                  damping <span className="font-mono text-muted-foreground">{damping}</span>
                </Label>
                <Slider
                  min={5}
                  max={50}
                  step={1}
                  value={[damping]}
                  onValueChange={(v) => setDamping(v[0] ?? damping)}
                />
              </div>
            </TabsContent>
          </Tabs>
          <div className="space-y-1.5">
            <Label className="flex items-center justify-between text-xs">
              stagger <span className="font-mono text-muted-foreground">{stagger.toFixed(2)}s</span>
            </Label>
            <Slider
              min={0.01}
              max={0.2}
              step={0.01}
              value={[stagger]}
              onValueChange={(v) => setStagger(v[0] ?? stagger)}
            />
          </div>
          <div className="rounded-md border border-border bg-muted/30 p-2.5">
            <div className="mb-1.5 flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Snippet
              </span>
              <Button size="sm" variant="ghost" onClick={handleCopy} className="h-7 px-2">
                {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                <span className="ml-1.5 text-xs">{copied ? 'Copied' : 'Copy'}</span>
              </Button>
            </div>
            <pre className="overflow-x-auto whitespace-pre-wrap text-xs font-mono leading-relaxed text-foreground">
              {codeSnippet}
            </pre>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

interface MotionHubLink {
  href: string;
  label: string;
  description: string;
}

const MOTION_HUB_LINKS: MotionHubLink[] = [
  {
    href: urls.app.ui.components.dialog,
    label: 'Dialog, Drawer, Sheet',
    description: 'Backdrop fade + content scale / slide entrance.',
  },
  {
    href: urls.app.ui.components.tabs,
    label: 'Tabs & Accordion',
    description: 'Panel fade-in, height-morph collapse, active pill underline.',
  },
  {
    href: urls.app.ui.components.tooltip,
    label: 'Tooltip',
    description: 'Side-aware fade + slide on hover/focus.',
  },
  {
    href: urls.app.ui.components.dropdownMenu,
    label: 'Dropdown menu',
    description: 'Trigger-anchored slide; nested submenus animate independently.',
  },
  {
    href: urls.app.ui.components.toast,
    label: 'Toast & Alert',
    description: 'Sonner stack entrance + Reveal scale-in for inline alerts.',
  },
  {
    href: urls.app.ui.components.datePicker,
    label: 'Date picker · Select',
    description: 'Popover-based pickers reuse the dropdown motion language.',
  },
];

function ComponentMotionHub() {
  return (
    <div className="grid w-full gap-2 sm:grid-cols-2">
      {MOTION_HUB_LINKS.map((entry) => (
        <Link
          key={entry.href}
          to={entry.href}
          className="group flex items-start justify-between gap-3 rounded-md border border-border bg-card p-3 transition-colors hover:border-primary-300 hover:bg-primary-50"
        >
          <div className="space-y-0.5">
            <div className="text-sm font-semibold text-foreground group-hover:text-primary-700">
              {entry.label}
            </div>
            <p className="text-xs text-muted-foreground">{entry.description}</p>
          </div>
          <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary-700" />
        </Link>
      ))}
    </div>
  );
}

export default function MotionPage() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('motion.title', 'Animations')}
        description={t(
          'motion.subtitle',
          'Animation tokens + primitives used across PAGES, UI ELEMENTS and DOCS.',
        )}
        actions={
          <Badge variant="secondary" className="gap-1">
            <Sparkles className="h-3 w-3" /> motion/react
          </Badge>
        }
      />

      <ShowcaseSection
        title="Component-specific motion"
        description="Some primitives ship their own motion (open/close, hover, focus). Their dedicated showcase pages include a Motion section with Replay + Slow-mo controls."
      >
        <ComponentMotionHub />
      </ShowcaseSection>

      <ShowcaseSection
        title="Tokens"
        description="Single source of truth for durations, easings, springs, stagger."
      >
        <TokensTable />
      </ShowcaseSection>

      <ShowcaseSection
        title="<Reveal/>"
        description="Scroll-triggered fade + slide using whileInView."
      >
        <RevealDemo />
      </ShowcaseSection>

      <ShowcaseSection
        title="<MotionList/>"
        description="Staggered list container with list-item variants."
      >
        <MotionListDemo />
      </ShowcaseSection>

      <ShowcaseSection
        title="<StaggerGrid/>"
        description="Grid where direct children fade + scale in with a staggered delay."
      >
        <StaggerGridDemo />
      </ShowcaseSection>

      <ShowcaseSection
        title="<MotionCard/>"
        description="Hover lift + press feedback, using a spring transition."
      >
        <CardsDemo />
      </ShowcaseSection>

      <ShowcaseSection
        title="<CountUp/>"
        description="Animate a number on mount and whenever `value` changes."
      >
        <CountUpDemo />
      </ShowcaseSection>

      <ShowcaseSection
        title="<ActivePill/>"
        description="Shared-layout indicator that slides between nav items."
      >
        <ActivePillDemo />
      </ShowcaseSection>

      <ShowcaseSection
        title="<Confetti/>"
        description="One-shot particle burst for celebration moments."
      >
        <ConfettiDemo />
      </ShowcaseSection>

      <ShowcaseSection
        title="<Shake/>"
        description="Horizontal shake triggered by a changing key — great for form errors."
      >
        <ShakeDemo />
      </ShowcaseSection>

      <ShowcaseSection
        title="<Marquee/>"
        description="Infinite-scroll horizontal strip — pause on hover, fade edges by default."
      >
        <MarqueeDemo />
      </ShowcaseSection>

      <ShowcaseSection
        title="<Parallax/>"
        description="Translate elements as the user scrolls. Per-axis, per-direction tuning."
      >
        <ParallaxDemo />
      </ShowcaseSection>

      <ShowcaseSection
        title="<Typewriter/>"
        description="Cycle through an array of phrases with typing/deleting speeds."
      >
        <TypewriterDemo />
      </ShowcaseSection>

      <ShowcaseSection
        title="<GradientText/>"
        description="Text painted with an animated gradient sweep."
      >
        <GradientTextDemo />
      </ShowcaseSection>

      <ShowcaseSection
        title="<MagnetButton/>"
        description="CTA that drifts toward the cursor inside a configurable radius."
      >
        <MagnetButtonDemo />
      </ShowcaseSection>

      <ShowcaseSection
        title="<FlipCard/>"
        description="Two-faced card with hover or click trigger and 3D rotation."
      >
        <FlipCardDemo />
      </ShowcaseSection>

      <ShowcaseSection
        title="<SkeletonShimmer/>"
        description="Loading placeholders with a sweeping highlight."
      >
        <SkeletonShimmerDemo />
      </ShowcaseSection>

      <ShowcaseSection
        title="<MorphingBlob/>"
        description="Animated SVG blob with smooth path interpolation. Great for hero decoration."
      >
        <MorphingBlobDemo />
      </ShowcaseSection>

      <ShowcaseSection
        title="Motion Builder"
        description="Tweak duration, ease, springs, and stagger live; copy the resulting transition snippet."
      >
        <MotionBuilder />
      </ShowcaseSection>
    </div>
  );
}
