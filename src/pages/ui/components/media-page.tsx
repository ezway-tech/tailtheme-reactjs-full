import {
  AspectRatio,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CodeBlock,
  GalleryGrid,
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui';
import { PageHeader } from '@/components/patterns';
import { ShowcaseSection } from '@/components/showcase/showcase-section';

const GALLERY_IMAGES = [
  { src: 'https://picsum.photos/seed/tt1/800/800', alt: 'Slide 1' },
  { src: 'https://picsum.photos/seed/tt2/800/800', alt: 'Slide 2' },
  { src: 'https://picsum.photos/seed/tt3/800/800', alt: 'Slide 3' },
  { src: 'https://picsum.photos/seed/tt4/800/800', alt: 'Slide 4' },
];

const SAMPLE_CODE = `export function greet(name: string) {
  return \`Hello, \${name}!\`;
}`;

export default function MediaPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Media & layout"
        description="Carousel, lightbox gallery, aspect ratio, syntax-highlighted code, and resizable split panes."
      />

      <ShowcaseSection
        title="Carousel"
        description="Embla-powered carousel with previous/next controls."
        code={`<Carousel>
  <CarouselContent>
    <CarouselItem>…</CarouselItem>
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>`}
      >
        <Carousel className="mx-auto w-full max-w-md">
          <CarouselContent>
            {GALLERY_IMAGES.map((img) => (
              <CarouselItem key={img.src}>
                <AspectRatio ratio={16 / 9}>
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="h-full w-full rounded-lg object-cover"
                  />
                </AspectRatio>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </ShowcaseSection>

      <ShowcaseSection
        title="Gallery + lightbox"
        description="Click any thumbnail to open the full-screen lightbox."
      >
        <GalleryGrid images={GALLERY_IMAGES} />
      </ShowcaseSection>

      <ShowcaseSection
        title="Aspect ratio"
        description="Lock media proportions before the image loads."
        code={`<AspectRatio ratio={16 / 9}>
  <img src="…" className="object-cover" />
</AspectRatio>`}
      >
        <div className="grid w-full max-w-2xl grid-cols-2 gap-4">
          <AspectRatio ratio={16 / 9} className="overflow-hidden rounded-lg bg-muted">
            <img
              src="https://picsum.photos/seed/tt5/640/360"
              alt="16:9"
              className="h-full w-full object-cover"
            />
          </AspectRatio>
          <AspectRatio ratio={1} className="overflow-hidden rounded-lg bg-muted">
            <img
              src="https://picsum.photos/seed/tt6/400/400"
              alt="1:1"
              className="h-full w-full object-cover"
            />
          </AspectRatio>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Code block"
        description="Shiki syntax highlighting with copy button (lazy-loaded)."
        code={`<CodeBlock code={source} language="tsx" showLineNumbers />`}
      >
        <CodeBlock code={SAMPLE_CODE} language="tsx" showLineNumbers className="max-w-2xl" />
      </ShowcaseSection>

      <ShowcaseSection
        title="Resizable panels"
        description="Drag the handle to resize adjacent regions."
      >
        <ResizablePanelGroup className="min-h-[200px] max-w-2xl rounded-lg border border-border">
          <ResizablePanel defaultSize={50} minSize={25}>
            <div className="flex h-full items-center justify-center p-4 text-sm text-muted-foreground">
              Panel A
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={50} minSize={25}>
            <div className="flex h-full items-center justify-center p-4 text-sm text-muted-foreground">
              Panel B
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ShowcaseSection>
    </div>
  );
}
