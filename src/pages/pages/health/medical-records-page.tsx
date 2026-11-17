import { Download, FileText, Image as ImageIcon, TestTube2 } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui';
import { PageHeader } from '@/components/patterns';

type RecordKind = 'lab' | 'image' | 'report';
type RecordStatus = 'final' | 'preliminary' | 'pending';

interface MedicalRecord {
  id: string;
  date: string;
  patient: string;
  kind: RecordKind;
  title: string;
  status: RecordStatus;
  size: string;
}

const RECORDS: MedicalRecord[] = [
  {
    id: 'r-1',
    date: '2026-04-18',
    patient: 'Nora Kim',
    kind: 'lab',
    title: 'Lipid panel',
    status: 'final',
    size: '12 KB',
  },
  {
    id: 'r-2',
    date: '2026-04-18',
    patient: 'Chen Wei',
    kind: 'lab',
    title: 'HbA1c',
    status: 'final',
    size: '8 KB',
  },
  {
    id: 'r-3',
    date: '2026-04-16',
    patient: 'Jorge Pérez',
    kind: 'image',
    title: 'Chest X-ray',
    status: 'preliminary',
    size: '4.2 MB',
  },
  {
    id: 'r-4',
    date: '2026-04-15',
    patient: 'Priya Patel',
    kind: 'report',
    title: 'Neurology consult',
    status: 'final',
    size: '148 KB',
  },
  {
    id: 'r-5',
    date: '2026-04-14',
    patient: 'Sam Taylor',
    kind: 'image',
    title: 'MRI brain',
    status: 'pending',
    size: '—',
  },
];

const kindIconMap: Record<RecordKind, LucideIcon> = {
  lab: TestTube2,
  image: ImageIcon,
  report: FileText,
};

const statusVariant: Record<RecordStatus, 'default' | 'secondary' | 'outline'> = {
  final: 'default',
  preliminary: 'secondary',
  pending: 'outline',
};

export default function MedicalRecordsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Medical records"
        description="Labs, imaging, and reports across the practice."
        actions={
          <Button variant="outline">
            <Download className="h-4 w-4" /> Export selection
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total records
            </CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold">1,284</CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Pending review
            </CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold">12</CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Added this week
            </CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold">38</CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent records</CardTitle>
          <CardDescription>Sorted by most recent first</CardDescription>
        </CardHeader>
        <CardContent>
          <Table framed={false}>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Patient</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Size</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {RECORDS.map((r) => {
                const Icon = kindIconMap[r.kind];
                return (
                  <TableRow key={r.id}>
                    <TableCell className="font-mono text-xs">{r.date}</TableCell>
                    <TableCell className="font-medium">{r.patient}</TableCell>
                    <TableCell>
                      <span className="flex items-center gap-2 text-sm capitalize text-muted-foreground">
                        <Icon className="h-4 w-4" /> {r.kind}
                      </span>
                    </TableCell>
                    <TableCell>{r.title}</TableCell>
                    <TableCell>
                      <Badge variant={statusVariant[r.status]} className="capitalize">
                        {r.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right text-muted-foreground">{r.size}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
