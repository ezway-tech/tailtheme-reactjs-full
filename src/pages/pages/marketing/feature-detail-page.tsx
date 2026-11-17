import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button, Card, CardContent } from '@/components/ui';
import { PageContent, PageHeader } from '@/components/patterns';
import { getMarketingFeature } from '@/mocks/fixtures';
import { urls } from '@/routes/urls';

export default function FeatureDetailPage() {
  const { slug = '' } = useParams<{ slug: string }>();
  const feature = getMarketingFeature(slug);

  if (!feature) {
    return (
      <div className="space-y-4">
        <p className="text-muted-foreground">Feature not found.</p>
        <Button asChild variant="outline">
          <Link to={urls.app.pages.marketing.features}>All features</Link>
        </Button>
      </div>
    );
  }

  return (
    <PageContent width="feed" className="space-y-6">
      <Button asChild variant="ghost" size="sm" className="-ml-2 w-fit">
        <Link to={urls.app.pages.marketing.features}>
          <ArrowLeft className="h-4 w-4" /> Features
        </Link>
      </Button>

      <PageHeader title={feature.title} description={feature.tagline} />

      <div className="overflow-hidden rounded-lg border border-border">
        <img src={feature.image} alt="" className="aspect-[21/9] w-full object-cover" />
      </div>

      <p className="text-muted-foreground">{feature.description}</p>

      <div className="grid gap-4 sm:grid-cols-2">
        {feature.metrics.map((m) => (
          <Card key={m.label}>
            <CardContent className="pt-6">
              <p className="text-3xl font-bold tracking-tight">{m.value}</p>
              <p className="text-sm text-muted-foreground">{m.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Button asChild>
        <Link to={urls.app.pages.marketing.pricing}>View pricing</Link>
      </Button>
    </PageContent>
  );
}
