import { Badge } from '@/components/ui/badge';
import { PageContent, PageHeader } from '@/components/patterns';
import { CHANGELOG_RELEASES, type ChangelogEntryType } from '@/mocks/fixtures/changelog';

const TYPE_LABEL: Record<
  ChangelogEntryType,
  { label: string; variant: 'default' | 'secondary' | 'outline' }
> = {
  new: { label: 'New', variant: 'default' },
  improved: { label: 'Improved', variant: 'secondary' },
  fixed: { label: 'Fixed', variant: 'outline' },
};

export default function ChangelogPage() {
  const releases = CHANGELOG_RELEASES;

  return (
    <PageContent width="content" className="space-y-8">
      <PageHeader
        title="Changelog"
        description="What shipped in each release. Sample data — replace with your own feed or CMS."
      />
      <ol className="space-y-9">
        {releases.map((release, index) => (
          <li key={release.version} className="flex gap-5">
            <div className="relative flex w-7 shrink-0 flex-col items-center self-stretch pt-1">
              {index < releases.length - 1 ? (
                <div
                  className="absolute left-1/2 top-5 bottom-0 w-px -translate-x-1/2 bg-border"
                  aria-hidden
                />
              ) : null}
              <span
                className="relative z-[1] h-3 w-3 shrink-0 rounded-full border-2 border-card bg-primary ring-2 ring-background"
                aria-hidden
              />
            </div>

            <div className="min-w-0 flex-1 space-y-3">
              <header className="space-y-1.5">
                <h2 className="text-h4 font-semibold leading-tight text-foreground">
                  v{release.version}
                </h2>
                <time
                  className="block text-sm tabular-nums text-muted-foreground"
                  dateTime={release.date}
                >
                  {release.date}
                </time>
              </header>

              {release.title ? (
                <p className="text-sm leading-relaxed text-muted-foreground">{release.title}</p>
              ) : null}

              <ul className="space-y-2.5 border-t border-input/40 pt-4">
                {release.items.map((item, i) => {
                  const meta = TYPE_LABEL[item.type];
                  return (
                    <li key={i} className="flex items-start gap-3 text-sm leading-relaxed">
                      <Badge
                        variant={meta.variant}
                        className="mt-0.5 h-5 shrink-0 px-1.5 text-[10px]"
                      >
                        {meta.label}
                      </Badge>
                      <span className="min-w-0 text-foreground">{item.text}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </PageContent>
  );
}
