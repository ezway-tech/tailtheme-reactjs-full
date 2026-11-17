import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  Label,
} from '@/components/ui';
import { PageContent, PageHeader } from '@/components/patterns';
import { urls } from '@/routes/urls';

/**
 * Minimal starter home — shows a few UI primitives in context.
 */
export default function StarterHomePage() {
  return (
    <PageContent>
      <PageHeader
        title="Welcome"
        description="A small starter surface using TailTheme UI primitives. Edit branding in src/config.ts."
      />

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Components</CardTitle>
            <CardDescription>Buttons, badges, and inputs from the design system.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap items-center gap-3">
            <Button>Primary</Button>
            <Button variant="outline">Outline</Button>
            <Badge>New</Badge>
            <Badge variant="secondary">Secondary</Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick form</CardTitle>
            <CardDescription>Open the sample form page for a fuller example.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <Label htmlFor="starter-email">Email</Label>
              <Input id="starter-email" type="email" placeholder="you@example.com" />
            </div>
            <Button asChild>
              <Link to={urls.app.starter.form}>
                Open form example
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </PageContent>
  );
}
