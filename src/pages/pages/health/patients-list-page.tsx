import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search } from 'lucide-react';
import {
  Avatar,
  AvatarFallback,
  Badge,
  Button,
  Input,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui';
import { PageHeader } from '@/components/patterns';
import { samplePatients, type PatientRisk } from '@/mocks/fixtures';
import { urls } from '@/routes/urls';

const riskStyle: Record<
  PatientRisk,
  { variant: 'default' | 'secondary' | 'danger'; label: string }
> = {
  low: { variant: 'secondary', label: 'Low' },
  med: { variant: 'default', label: 'Medium' },
  high: { variant: 'danger', label: 'High' },
};

export default function PatientsListPage() {
  const [q, setQ] = useState('');
  const rows = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return samplePatients;
    return samplePatients.filter(
      (p) =>
        p.name.toLowerCase().includes(needle) ||
        p.condition.toLowerCase().includes(needle) ||
        p.id.toLowerCase().includes(needle),
    );
  }, [q]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Patients"
        description={`${rows.length} patients · clinical view`}
        actions={
          <Button>
            <Plus className="h-4 w-4" /> New patient
          </Button>
        }
      />

      <div className="relative max-w-sm">
        <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          className="pl-8"
          placeholder="Name, MRN, or condition…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Patient</TableHead>
            <TableHead>MRN</TableHead>
            <TableHead>Age</TableHead>
            <TableHead>Condition</TableHead>
            <TableHead>Last visit</TableHead>
            <TableHead>Risk</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((p) => {
            const s = riskStyle[p.risk];
            return (
              <TableRow key={p.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>
                        {p.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{p.name}</span>
                    <Badge variant="outline" className="text-[10px]">
                      {p.gender}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell className="font-mono text-xs text-muted-foreground">{p.id}</TableCell>
                <TableCell>{p.age}</TableCell>
                <TableCell>{p.condition}</TableCell>
                <TableCell className="font-mono text-xs">{p.lastVisit}</TableCell>
                <TableCell>
                  <Badge variant={s.variant}>{s.label}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button asChild variant="ghost" size="sm">
                    <Link to={urls.app.pages.health.patientDetail(p.id)}>Open</Link>
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
