import { Link, useParams } from 'react-router-dom';
import { Activity, Droplet, HeartPulse, Thermometer } from 'lucide-react';
import {
  Avatar,
  AvatarFallback,
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Separator,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui';
import { PageHeader } from '@/components/patterns';
import { getSamplePatient } from '@/mocks/fixtures';
import { urls } from '@/routes/urls';

const VITALS = [
  { icon: HeartPulse, label: 'Heart rate', value: '72 bpm', trend: 'normal' },
  { icon: Thermometer, label: 'Temperature', value: '36.7 °C', trend: 'normal' },
  { icon: Droplet, label: 'Blood pressure', value: '128/82', trend: 'elevated' },
  { icon: Activity, label: 'SpO₂', value: '98%', trend: 'normal' },
];

const HISTORY = [
  { date: '2026-04-12', summary: 'Annual physical. Labs ordered.', doctor: 'Dr. Lee' },
  { date: '2026-01-04', summary: 'Follow-up: BP trending up. Rx adjusted.', doctor: 'Dr. Lee' },
  { date: '2025-10-20', summary: 'Flu vaccination.', doctor: 'Dr. Ortega' },
];

const MEDS = [
  { name: 'Amlodipine', dose: '5 mg', freq: 'once daily' },
  { name: 'Lisinopril', dose: '10 mg', freq: 'once daily' },
];

function patientInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

export default function PatientDetailPage() {
  const { id = 'p-1001' } = useParams<{ id: string }>();
  const patient = getSamplePatient(id) ?? getSamplePatient('p-1001')!;

  return (
    <div className="space-y-6">
      <PageHeader
        title={patient.name}
        description={`${patient.mrn} · ${patient.age} · ${patient.gender} · ${patient.condition}`}
      />

      <div className="flex flex-wrap gap-2">
        <Button asChild variant="outline" size="sm">
          <Link to={urls.app.pages.health.prescriptions}>Prescriptions</Link>
        </Button>
        <Button asChild variant="outline" size="sm">
          <Link to={urls.app.pages.health.labResults}>Lab results</Link>
        </Button>
        <Button asChild variant="outline" size="sm">
          <Link to={urls.app.pages.health.telehealth}>Telehealth</Link>
        </Button>
        <Button asChild variant="outline" size="sm">
          <Link to={urls.app.pages.health.waitingRoom}>Waiting room</Link>
        </Button>
        <Button asChild variant="outline" size="sm">
          <Link to={urls.app.pages.health.patientPortal}>Patient portal</Link>
        </Button>
      </div>

      <div className="flex flex-col gap-4 rounded-lg border border-border p-4 sm:flex-row sm:items-center">
        <Avatar className="h-16 w-16">
          <AvatarFallback>{patientInitials(patient.name)}</AvatarFallback>
        </Avatar>
        <div className="flex-1 text-sm">
          <p className="font-medium">Primary care · Dr. Lee</p>
          <p className="text-muted-foreground">Allergy: penicillin · Blood type: A+</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Message</Button>
          <Button>Schedule visit</Button>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {VITALS.map(({ icon: Icon, label, value, trend }) => (
          <Card key={label}>
            <CardHeader className="flex flex-row items-center gap-2 space-y-0 pb-2">
              <Icon className="h-4 w-4 text-muted-foreground" />
              <CardTitle className="text-sm font-medium">{label}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-semibold">{value}</p>
              <Badge
                variant={trend === 'elevated' ? 'danger' : 'outline'}
                className="mt-1 capitalize"
              >
                {trend}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="history">
        <TabsList>
          <TabsTrigger value="history">Visit history</TabsTrigger>
          <TabsTrigger value="meds">Medications</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
        </TabsList>

        <TabsContent value="history" className="space-y-3">
          {HISTORY.map((h) => (
            <Card key={h.date}>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">{h.date}</CardTitle>
                <CardDescription>{h.doctor}</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">{h.summary}</CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="meds">
          <Card>
            <CardContent className="p-0">
              <ul className="divide-y divide-border">
                {MEDS.map((m) => (
                  <li key={m.name} className="flex items-center justify-between p-4">
                    <div>
                      <p className="font-medium">{m.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {m.dose} · {m.freq}
                      </p>
                    </div>
                    <Button variant="ghost" size="sm">
                      Refill
                    </Button>
                  </li>
                ))}
              </ul>
              <Separator />
              <div className="p-3">
                <Button variant="outline" className="w-full">
                  Prescribe a medication
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notes" className="text-sm text-muted-foreground">
          Provider notes will appear here.
        </TabsContent>
      </Tabs>
    </div>
  );
}
