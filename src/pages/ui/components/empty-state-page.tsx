import { FilePlus2, RefreshCcw, Search, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { EmptyState } from '@/components/ui/empty-state';
import { PageHeader } from '@/components/patterns';
import { ShowcaseSection } from '@/components/showcase/showcase-section';
import { ComponentApi } from '@/components/showcase/component-api';

export default function EmptyStatePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="EmptyState"
        description="Friendly placeholder when a list, table or page has nothing to show. Five semantic variants cover the most common reasons for an empty screen."
      />

      <ComponentApi
        description="Source: src/components/ui/empty-state.tsx. Wraps an icon ring, headline, helper copy and a row of actions in a centered column."
        importCode={`import { EmptyState } from '@/components/ui';`}
        props={[
          {
            name: 'variant',
            type: `'no-data' | 'no-results' | 'no-permission' | 'error' | 'success'`,
            default: `'no-data'`,
            description: 'Picks the icon ring color and the default lucide icon.',
          },
          {
            name: 'title',
            type: 'React.ReactNode',
            description: 'Required headline. Keep it short and human (3–6 words).',
          },
          {
            name: 'description',
            type: 'React.ReactNode',
            description: 'Optional one-sentence explanation under the title.',
          },
          {
            name: 'icon',
            type: 'LucideIcon',
            description: 'Override the default icon (pass the component, not an element).',
          },
          {
            name: 'illustration',
            type: 'React.ReactNode',
            description: 'Replace the icon ring entirely with a custom illustration node.',
          },
          {
            name: 'actions',
            type: 'React.ReactNode',
            description: 'Row of CTAs at the bottom — typically `<Button>` instances.',
          },
        ]}
        tokens={[
          {
            name: '--muted',
            description: 'Default ring background for the no-data / no-results states.',
          },
          { name: '--destructive', description: 'Tints the ring for the error variant.' },
          { name: '--success-bg / --success-text', description: 'Used by the success variant.' },
          {
            name: 'amber-100/500',
            description: 'Warm tone for the no-permission variant (light + dark).',
          },
        ]}
      />

      <ShowcaseSection
        title="No data"
        description="Default state for a freshly created list before any record exists. Pair with a primary CTA to create the first item."
        code={`<EmptyState
  title="No projects yet"
  description="Create your first project to start tracking work and collaborating with the team."
  actions={<Button>New project</Button>}
/>`}
      >
        <Card className="w-full max-w-xl">
          <EmptyState
            title="No projects yet"
            description="Create your first project to start tracking work and collaborating with the team."
            actions={
              <>
                <Button>
                  <FilePlus2 className="h-4 w-4" aria-hidden /> New project
                </Button>
                <Button variant="outline">View templates</Button>
              </>
            }
          />
        </Card>
      </ShowcaseSection>

      <ShowcaseSection
        title="No results"
        description="Filters or search returned nothing. Always offer a way back — clear filters, broaden the query, or reset."
        code={`<EmptyState
  variant="no-results"
  title="No results for &ldquo;dark theme&rdquo;"
  description="Try adjusting your filters or check the spelling."
  actions={<Button variant="outline">Clear filters</Button>}
/>`}
      >
        <Card className="w-full max-w-xl">
          <EmptyState
            variant="no-results"
            icon={Search}
            title="No results for &ldquo;dark theme&rdquo;"
            description="Try adjusting your filters or check the spelling."
            actions={<Button variant="outline">Clear filters</Button>}
          />
        </Card>
      </ShowcaseSection>

      <ShowcaseSection
        title="No permission"
        description="The user is signed in but the resource is gated. Use a warm tone and offer a path forward (request access, contact admin)."
        code={`<EmptyState
  variant="no-permission"
  title="You can't view this report"
  description="Ask a workspace admin to grant you the &ldquo;Reports / Read&rdquo; permission."
  actions={<Button variant="outline">Request access</Button>}
/>`}
      >
        <Card className="w-full max-w-xl">
          <EmptyState
            variant="no-permission"
            title="You can't view this report"
            description="Ask a workspace admin to grant you the &ldquo;Reports / Read&rdquo; permission."
            actions={<Button variant="outline">Request access</Button>}
          />
        </Card>
      </ShowcaseSection>

      <ShowcaseSection
        title="Error"
        description="A request failed. Be explicit about what broke and offer a retry — never blame the user."
        code={`<EmptyState
  variant="error"
  title="Couldn't load activity feed"
  description="The server didn't respond in time. Check your connection and retry."
  actions={<Button variant="outline"><RefreshCcw /> Retry</Button>}
/>`}
      >
        <Card className="w-full max-w-xl">
          <EmptyState
            variant="error"
            title="Couldn't load activity feed"
            description="The server didn't respond in time. Check your connection and retry."
            actions={
              <Button variant="outline">
                <RefreshCcw className="h-4 w-4" aria-hidden /> Retry
              </Button>
            }
          />
        </Card>
      </ShowcaseSection>

      <ShowcaseSection
        title="Success"
        description="Confirm a multi-step action that ended well — ideal for wizard completion screens."
        code={`<EmptyState
  variant="success"
  title="Account created"
  description="We sent a verification link to your inbox. You can close this tab once verified."
  actions={<Button>Continue to dashboard</Button>}
/>`}
      >
        <Card className="w-full max-w-xl">
          <EmptyState
            variant="success"
            title="Account created"
            description="We sent a verification link to your inbox. You can close this tab once verified."
            actions={<Button>Continue to dashboard</Button>}
          />
        </Card>
      </ShowcaseSection>

      <ShowcaseSection
        title="Custom illustration"
        description="Pass the `illustration` slot to swap the icon ring for a richer visual (SVG, image or custom component)."
        code={`<EmptyState
  illustration={<div className="rounded-2xl bg-primary/10 p-4 text-primary"><Upload /></div>}
  title="Upload your first file"
  description="Drag & drop CSVs, images or PDFs to get started."
/>`}
      >
        <Card className="w-full max-w-xl">
          <EmptyState
            illustration={
              <div className="rounded-2xl bg-primary/10 p-4 text-primary">
                <Upload className="h-7 w-7" aria-hidden />
              </div>
            }
            title="Upload your first file"
            description="Drag & drop CSVs, images or PDFs to get started."
            actions={<Button>Choose file</Button>}
          />
        </Card>
      </ShowcaseSection>
    </div>
  );
}
