import { Badge, Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { PageHeader } from '@/components/patterns';

const ROADMAP = [
  { quarter: 'Q1', features: ['App shell v2', 'Dark mode tokens', 'Command palette'] },
  { quarter: 'Q2', features: ['Social vertical', 'Finance dashboard', 'Gantt view'] },
  { quarter: 'Q3', features: ['Real-time collab', 'Mobile PWA', 'Audit logs export'] },
  { quarter: 'Q4', features: ['AI assistant', 'Enterprise SSO', 'Multi-region'] },
];

export default function RoadmapPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Product roadmap"
        description="Planned features by quarter for the TailTheme platform."
      />

      <div className="grid gap-4 md:grid-cols-2">
        {ROADMAP.map((q) => (
          <Card key={q.quarter}>
            <CardHeader>
              <CardTitle>{q.quarter}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {q.features.map((feature) => (
                <Badge key={feature} variant="secondary">
                  {feature}
                </Badge>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
