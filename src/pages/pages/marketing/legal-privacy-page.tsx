import { PageContent, PageHeader } from '@/components/patterns';
import { TocSticky } from '@/components/patterns/marketing';
import { cn } from '@/lib/cn';

const SECTIONS = [
  {
    id: 'collect',
    title: '1. Data we collect',
    body: 'Demo pages do not persist personal data. In your fork, document account fields, analytics, and payment metadata explicitly.',
  },
  {
    id: 'use',
    title: '2. How we use data',
    body: 'Use data only for providing the service, security, and product improvement. Obtain consent for marketing email.',
  },
  {
    id: 'cookies',
    title: '3. Cookies',
    body: 'Essential cookies power authentication. Analytics cookies should remain off until the user accepts via the cookie banner.',
  },
  {
    id: 'rights',
    title: '4. Your rights',
    body: 'Users may request export or deletion of personal data. Provide a contact channel and SLA for GDPR/CCPA requests.',
  },
] as const;

const TOC = SECTIONS.map((s) => ({ id: s.id, label: s.title }));

export default function LegalPrivacyPage() {
  return (
    <PageContent width="content" className="space-y-8 py-6">
      <PageHeader
        title="Privacy policy"
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
