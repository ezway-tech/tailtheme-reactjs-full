import { PageContent, PageHeader } from '@/components/patterns';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui';

/**
 * Lightweight profile placeholder for minimal exports.
 */
export default function ProfilePage() {
  return (
    <PageContent>
      <PageHeader title="Profile" description="Replace this page when you connect real auth." />
      <Card className="max-w-xl">
        <CardHeader>
          <CardTitle>Demo user</CardTitle>
          <CardDescription>No backend session — UI only.</CardDescription>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          Edit branding in <code className="text-foreground">src/config.ts</code>.
        </CardContent>
      </Card>
    </PageContent>
  );
}
