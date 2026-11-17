import { Skeleton } from '@/components/ui';
import { PageHeader } from '@/components/patterns';
import { ShowcaseSection } from '@/components/showcase/showcase-section';
import { ComponentApi } from '@/components/showcase/component-api';

export default function SkeletonPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Skeleton"
        description="Pulsing placeholder for content that's loading. Match the final size of each block to avoid layout shift."
      />

      <ComponentApi
        description="Source: src/components/ui/skeleton.tsx. Renders a div with `animate-pulse` — size it with width/height utilities just like a normal box."
        importCode={`import { Skeleton } from '@/components/ui';`}
        props={[
          {
            name: 'className',
            type: 'string',
            description:
              'Tailwind utilities for size, radius and color (e.g. `h-4 w-32 rounded-full`).',
          },
          {
            name: '...divProps',
            type: 'React.HTMLAttributes<HTMLDivElement>',
            description: 'Standard div attributes — useful for `aria-hidden` or test IDs.',
          },
        ]}
        tokens={[
          { name: '--muted', description: 'Pulsing background color (50% opacity).' },
          { name: 'animate-pulse', description: 'Tailwind keyframe used by every skeleton.' },
          {
            name: '--radius',
            description: 'Match the block being replaced (use rounded-full for avatars).',
          },
        ]}
      />

      <ShowcaseSection
        title="Single line"
        description="Use `h-4 w-3/4` style utilities to mirror the final text block."
        code={`<Skeleton className="h-4 w-3/4" />
<Skeleton className="h-4 w-full" />
<Skeleton className="h-4 w-5/6" />`}
      >
        <div className="w-full max-w-md space-y-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Avatar + line"
        description="Round skeletons for avatars; rectangles for the metadata."
        code={`<div className="flex items-center gap-3">
  <Skeleton className="h-10 w-10 rounded-full" />
  <div className="space-y-1.5">
    <Skeleton className="h-4 w-32" />
    <Skeleton className="h-3 w-20" />
  </div>
</div>`}
      >
        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="space-y-1.5">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-20" />
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Card placeholder"
        description="Hero image at the top, headline + sub copy below."
        code={`<div className="space-y-3">
  <Skeleton className="h-32 w-full rounded-md" />
  <Skeleton className="h-5 w-2/3" />
  <Skeleton className="h-4 w-full" />
</div>`}
      >
        <div className="w-full max-w-sm space-y-3">
          <Skeleton className="h-32 w-full rounded-md" />
          <Skeleton className="h-5 w-2/3" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Table rows"
        description="Stack 4–6 rows to preview a realistic loading table."
        code={`{[0,1,2,3,4].map((i) => (
  <Skeleton key={i} className="h-10 w-full" />
))}`}
      >
        <div className="w-full space-y-2">
          {Array.from({ length: 5 }, (_, i) => (
            <Skeleton key={i} className="h-10 w-full" />
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Grid of cards"
        description="Combine the card pattern in a responsive grid."
      >
        <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }, (_, i) => (
            <div key={i} className="space-y-3 rounded-md border border-border bg-background p-3">
              <Skeleton className="h-24 w-full rounded-md" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Form field"
        description="Pair a label-sized skeleton with an input-sized one."
      >
        <div className="w-full max-w-sm space-y-3">
          <div className="space-y-1.5">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-9 w-full" />
          </div>
          <div className="space-y-1.5">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-24 w-full" />
          </div>
        </div>
      </ShowcaseSection>
    </div>
  );
}
