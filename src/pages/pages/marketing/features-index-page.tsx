import { Link } from 'react-router-dom';
import { ArrowRight, Layers } from 'lucide-react';
import { Button, Card, CardContent } from '@/components/ui';
import { BentoGrid, PageContent, PageHeader } from '@/components/patterns';
import { marketingFeatures } from '@/mocks/fixtures';
import { urls } from '@/routes/urls';

export default function FeaturesIndexPage() {
  return (
    <PageContent width="content" className="space-y-10">
      <PageHeader
        title="Features"
        description="Everything included in TailTheme — from tokens to vertical demo packs."
      />

      <BentoGrid
        title="Built for shipping"
        className="px-0 py-0"
        items={marketingFeatures.map((f, i) => ({
          icon: Layers,
          title: f.title,
          description: f.tagline,
          metrics: i === 0 ? f.metrics : undefined,
        }))}
      />

      <div className="grid gap-6 md:grid-cols-2 md:gap-8">
        {marketingFeatures.map((f) => (
          <Card key={f.slug} className="overflow-hidden border-input shadow-sm">
            <div className="aspect-[2/1] overflow-hidden bg-muted">
              <img src={f.image} alt="" className="h-full w-full object-cover" />
            </div>
            <CardContent className="space-y-3 pt-5">
              <h2 className="text-lg font-semibold text-foreground">{f.title}</h2>
              <p className="text-sm leading-relaxed text-muted-foreground">{f.description}</p>
              <Button asChild variant="outline" size="sm">
                <Link to={urls.app.pages.marketing.featureDetail(f.slug)}>
                  Learn more <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </PageContent>
  );
}
