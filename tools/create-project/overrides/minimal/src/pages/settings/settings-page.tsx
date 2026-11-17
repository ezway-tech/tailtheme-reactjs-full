import { PageContent, PageHeader, ThemeCustomizer } from '@/components/patterns';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui';

/**
 * Lightweight settings page for minimal exports.
 */
export default function SettingsPage() {
  return (
    <PageContent>
      <PageHeader title="Settings" description="Theme and appearance preferences." />
      <Card className="max-w-xl">
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
          <CardDescription>Adjust colors, radius, and layout for this browser.</CardDescription>
        </CardHeader>
        <CardContent>
          <ThemeCustomizer inline />
        </CardContent>
      </Card>
    </PageContent>
  );
}
