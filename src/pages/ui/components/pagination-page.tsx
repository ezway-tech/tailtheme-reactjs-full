import * as React from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui';
import { PageHeader } from '@/components/patterns';
import { ShowcaseSection } from '@/components/showcase/showcase-section';
import { ComponentApi } from '@/components/showcase/component-api';

const TOTAL = 12;

function PaginationDemo() {
  const [page, setPage] = React.useState(1);
  const goto = (n: number) => (e: React.MouseEvent) => {
    e.preventDefault();
    setPage(Math.max(1, Math.min(TOTAL, n)));
  };
  const visible = React.useMemo(() => {
    const set = new Set<number>([1, TOTAL, page, page - 1, page + 1]);
    return Array.from(set)
      .filter((n) => n >= 1 && n <= TOTAL)
      .sort((a, b) => a - b);
  }, [page]);

  return (
    <div className="w-full space-y-2">
      <p className="text-center text-xs text-muted-foreground">
        Page {page} of {TOTAL}
      </p>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" onClick={goto(page - 1)} />
          </PaginationItem>
          {visible.map((n, idx) => {
            const prev = visible[idx - 1];
            const showEllipsis = prev != null && n - prev > 1;
            return (
              <React.Fragment key={n}>
                {showEllipsis ? (
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                ) : null}
                <PaginationItem>
                  <PaginationLink href="#" isActive={n === page} onClick={goto(n)}>
                    {n}
                  </PaginationLink>
                </PaginationItem>
              </React.Fragment>
            );
          })}
          <PaginationItem>
            <PaginationNext href="#" onClick={goto(page + 1)} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

export default function PaginationPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Pagination"
        description="Numbered navigation for paged content. Renders as semantic anchors so server-rendered links and SPA routers both work."
      />

      <ComponentApi
        description="Source: src/components/ui/pagination.tsx. Slots wrap a <nav><ul><li> tree — bring your own routing by setting `href` and `onClick`."
        importCode={`import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from '@/components/ui';`}
        propsTitle="Slots & key props"
        props={[
          {
            name: 'Pagination',
            type: 'nav — { className }',
            description: 'Outer landmark with `aria-label="pagination"`.',
          },
          {
            name: 'PaginationContent',
            type: 'ul — { className }',
            description: 'Flex row container for items.',
          },
          {
            name: 'PaginationItem',
            type: 'li — { className }',
            description: 'Wrap each link/button.',
          },
          {
            name: 'PaginationLink',
            type: 'a — { isActive?: boolean; size?: ButtonSize; href; onClick }',
            description:
              'Individual page link. Set `isActive` for the current page (sets `aria-current`).',
          },
          {
            name: 'PaginationPrevious / PaginationNext',
            type: 'a — { href, onClick }',
            description: 'Pre-styled previous/next links with chevron icons.',
          },
          {
            name: 'PaginationEllipsis',
            type: 'span',
            description: 'Visual "more pages" hint with `aria-hidden`.',
          },
        ]}
        tokens={[
          { name: '--accent / --accent-foreground', description: 'Hovered link background.' },
          { name: '--border', description: 'Outline of the active page link.' },
          { name: '--radius', description: 'Match other button-like controls.' },
        ]}
      />

      <ShowcaseSection
        title="Static numbers"
        description="Plain page list — wire `href`/`onClick` to your router."
        code={`<Pagination>
  <PaginationContent>
    <PaginationItem><PaginationPrevious href="#" /></PaginationItem>
    <PaginationItem><PaginationLink href="#" isActive>1</PaginationLink></PaginationItem>
    …
  </PaginationContent>
</Pagination>`}
      >
        <div className="w-full">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Stateful with ellipsis"
        description="Hide intermediate pages and only show neighbors of the current page. Resize the dataset by changing TOTAL."
      >
        <PaginationDemo />
      </ShowcaseSection>

      <ShowcaseSection
        title="Compact / icon-only"
        description="Drop the labels for tight toolbars. Keep `aria-label` on the prev/next anchors."
      >
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationLink href="#" aria-label="Go to previous page" className="px-2.5">
                ‹
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" aria-label="Go to next page" className="px-2.5">
                ›
              </PaginationLink>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </ShowcaseSection>
    </div>
  );
}
