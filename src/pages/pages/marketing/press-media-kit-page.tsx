import { Download, Image } from 'lucide-react';
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui';
import { PageHeader } from '@/components/patterns';

const ASSETS = [
  { name: 'Logo pack (SVG + PNG)', size: '1.2 MB', type: 'Brand' },
  { name: 'Product screenshots', size: '8.4 MB', type: 'Product' },
  { name: 'Founder headshots', size: '3.1 MB', type: 'Team' },
  { name: 'Brand guidelines PDF', size: '420 KB', type: 'Brand' },
];

export default function PressMediaKitPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Press & media kit"
        description="Logos, screenshots, and boilerplate for journalists and partners."
      />

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Boilerplate</CardTitle>
          <CardDescription>Copy-ready company description.</CardDescription>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          <p>
            TailTheme is a premium React admin template with design tokens, 10 vertical demos, and
            80+ sample pages. Teams use it to ship dashboards, marketing sites, and onboarding flows
            faster.
          </p>
        </CardContent>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2">
        {ASSETS.map((a) => (
          <Card key={a.name}>
            <CardHeader className="flex flex-row items-center gap-3 space-y-0">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-muted">
                <Image className="h-5 w-5 text-muted-foreground" aria-hidden />
              </div>
              <div className="flex-1">
                <CardTitle className="text-sm">{a.name}</CardTitle>
                <CardDescription>
                  {a.type} · {a.size}
                </CardDescription>
              </div>
              <Button size="icon" variant="outline" aria-label={`Download ${a.name}`}>
                <Download className="h-4 w-4" />
              </Button>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}
