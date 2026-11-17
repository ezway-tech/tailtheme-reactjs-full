import { Award, Download } from 'lucide-react';
import { Button, Card, CardContent, CardDescription, CardHeader } from '@/components/ui';
import { PageHeader } from '@/components/patterns';

const CERTIFICATES = [
  {
    id: 'cert-1',
    course: 'Design Systems with Tailwind CSS',
    issued: 'Mar 12, 2026',
    credential: 'TT-DS-2026-0142',
  },
  {
    id: 'cert-2',
    course: 'A11y Foundations',
    issued: 'Jan 8, 2026',
    credential: 'TT-A11Y-2026-0088',
  },
  {
    id: 'cert-3',
    course: 'React Advanced Patterns',
    issued: 'Nov 2, 2025',
    credential: 'TT-REACT-2025-0310',
  },
];

export default function CertificatesPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Certificates"
        description="Download PDF credentials for completed courses."
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {CERTIFICATES.map((c) => (
          <Card key={c.id} className="overflow-hidden">
            <div className="bg-gradient-to-br from-primary/20 via-background to-accent/20 p-6">
              <Award className="h-10 w-10 text-primary" aria-hidden />
              <p className="mt-4 font-semibold leading-snug">{c.course}</p>
              <p className="mt-1 text-xs text-muted-foreground">Issued {c.issued}</p>
            </div>
            <CardHeader className="pb-2">
              <CardDescription className="font-mono text-xs">{c.credential}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" size="sm" className="w-full">
                <Download className="h-4 w-4" /> Download PDF
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
