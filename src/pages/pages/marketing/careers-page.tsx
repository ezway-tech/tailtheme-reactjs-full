import { MapPin } from 'lucide-react';
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui';
import { PageHeader } from '@/components/patterns';

const JOBS = [
  {
    id: 'eng-1',
    title: 'Senior Frontend Engineer',
    team: 'Product',
    location: 'Remote · UTC±3',
    type: 'Full-time',
  },
  {
    id: 'des-1',
    title: 'Design Systems Designer',
    team: 'Design',
    location: 'Hybrid · HCMC',
    type: 'Full-time',
  },
  {
    id: 'mkt-1',
    title: 'Developer Advocate',
    team: 'Marketing',
    location: 'Remote',
    type: 'Full-time',
  },
  {
    id: 'sup-1',
    title: 'Customer Success Manager',
    team: 'Support',
    location: 'Remote · APAC',
    type: 'Contract',
  },
];

export default function CareersPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Careers"
        description="Help teams ship better admin UIs. We're a small, remote-friendly crew."
      />

      <div className="space-y-4">
        {JOBS.map((job) => (
          <Card key={job.id}>
            <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0">
              <div>
                <CardTitle className="text-base">{job.title}</CardTitle>
                <CardDescription>{job.team}</CardDescription>
              </div>
              <Button size="sm">Apply</Button>
            </CardHeader>
            <CardContent className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" aria-hidden />
              {job.location}
              <Badge variant="outline">{job.type}</Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
