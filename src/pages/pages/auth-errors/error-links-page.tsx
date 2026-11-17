import { Link } from 'react-router-dom';
import { Construction, ExternalLink, FileX2, ShieldAlert, ServerCrash } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui';
import { PageHeader } from '@/components/patterns';
import { urls } from '@/routes/urls';

interface ErrorLink {
  icon: LucideIcon;
  code: string;
  title: string;
  description: string;
  href: string;
}

const LINKS: ErrorLink[] = [
  {
    icon: FileX2,
    code: '404',
    title: 'Not found',
    description: 'Route, resource, or entity does not exist.',
    href: urls.errors.notFound,
  },
  {
    icon: ShieldAlert,
    code: '403',
    title: 'Forbidden',
    description: 'The user is authenticated but lacks permission.',
    href: urls.errors.forbidden,
  },
  {
    icon: ServerCrash,
    code: '500',
    title: 'Server error',
    description: 'Something broke upstream. Gives users a retry path.',
    href: urls.errors.server,
  },
  {
    icon: Construction,
    code: '503',
    title: 'Maintenance',
    description: 'Scheduled downtime with ETA and status link.',
    href: urls.errors.maintenance,
  },
];

export default function ErrorLinksPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Error pages"
        description="Full-screen error states live outside AppShell. Open them from here."
      />
      <div className="grid gap-4 md:grid-cols-3">
        {LINKS.map(({ icon: Icon, code, title, description, href }) => (
          <Card key={code} className="flex flex-col">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-destructive/10">
                  <Icon className="h-5 w-5 text-destructive" />
                </div>
                <span className="text-3xl font-bold tracking-tight text-muted-foreground">
                  {code}
                </span>
              </div>
              <CardTitle className="text-base">{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent className="mt-auto">
              <Button asChild variant="outline" className="w-full">
                <Link to={href} target="_blank" rel="noreferrer">
                  Preview <ExternalLink className="h-3.5 w-3.5" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
