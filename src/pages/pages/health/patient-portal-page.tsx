import { Link } from 'react-router-dom';
import { Calendar, FileText, FlaskConical, Pill, Stethoscope } from 'lucide-react';
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui';
import { PageHeader } from '@/components/patterns';
import { urls } from '@/routes/urls';

const QUICK_LINKS = [
  { label: 'Appointments', href: urls.app.pages.health.appointments, icon: Calendar },
  { label: 'Prescriptions', href: urls.app.pages.health.prescriptions, icon: Pill },
  { label: 'Lab results', href: urls.app.pages.health.labResults, icon: FlaskConical },
  { label: 'Medical records', href: urls.app.pages.health.records, icon: FileText },
  { label: 'Telehealth', href: urls.app.pages.health.telehealth, icon: Stethoscope },
  { label: 'Billing', href: urls.app.pages.health.billing, icon: FileText },
] as const;

export default function PatientPortalPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Patient portal"
        description="Welcome back, Nora — manage your care in one place."
      />

      <Card className="border-primary/20 bg-primary/5">
        <CardHeader>
          <CardTitle className="text-base">Next appointment</CardTitle>
          <CardDescription>Today · 2:30 PM · Dr. Sarah Lee · Clinic 2B</CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild size="sm">
            <Link to={urls.app.pages.health.appointments}>View schedule</Link>
          </Button>
        </CardContent>
      </Card>

      <div>
        <h2 className="mb-3 text-sm font-medium text-muted-foreground">Quick links</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {QUICK_LINKS.map(({ label, href, icon: Icon }) => (
            <Button
              key={label}
              asChild
              variant="outline"
              className="h-auto justify-start gap-2 py-3"
            >
              <Link to={href}>
                <Icon className="h-4 w-4 shrink-0" aria-hidden />
                {label}
              </Link>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
