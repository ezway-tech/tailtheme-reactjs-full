import { PageContent, PageHeader } from '@/components/patterns';
import { TocSticky } from '@/components/patterns/marketing';
import { cn } from '@/lib/cn';

const SECTIONS = [
  {
    id: 'acceptance',
    title: '1. Acceptance of terms',
    body: 'By accessing TailTheme demo assets you agree to these terms. Replace this copy with counsel-reviewed language before production.',
  },
  {
    id: 'license',
    title: '2. License grant',
    body: 'A non-exclusive license is granted to use the template in end products. Redistribution of source as a competing template is prohibited unless your license tier allows it.',
  },
  {
    id: 'warranty',
    title: '3. Disclaimer',
    body: 'The software is provided "as is" without warranty of any kind. We do not guarantee fitness for a particular purpose.',
  },
  {
    id: 'liability',
    title: '4. Limitation of liability',
    body: 'In no event shall the authors be liable for damages arising from use of the template, including lost profits or data.',
  },
] as const;

const TOC = SECTIONS.map((s) => ({ id: s.id, label: s.title }));

export default function LegalTermsPage() {
  return (
    <PageContent width="content" className="space-y-8 py-6">
      <PageHeader
        title="Terms of service"
        description="Last updated May 19, 2026 · Sample legal copy."
      />
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_220px] lg:gap-12">
        <article className="max-w-prose text-foreground">
          {SECTIONS.map((section, index) => (
            <section
              key={section.id}
              id={section.id}
              className={cn(
                'scroll-mt-28 space-y-5',
                index > 0 && 'mt-14 border-t border-input/50 pt-14',
              )}
            >
              <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                {section.title}
              </h2>
              <p className="text-[0.9375rem] leading-8 text-muted-foreground sm:text-base sm:leading-8">
                {section.body}
              </p>
            </section>
          ))}
        </article>
        <TocSticky entries={TOC} className="min-w-0" />
      </div>
    </PageContent>
  );
}
