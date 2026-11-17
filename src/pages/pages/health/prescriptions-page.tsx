import {
  Badge,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  toast,
} from '@/components/ui';
import { PageHeader } from '@/components/patterns';
import { healthPrescriptions, type PrescriptionStatus } from '@/mocks/fixtures';

const statusMeta: Record<
  PrescriptionStatus,
  { label: string; variant: 'default' | 'secondary' | 'outline' | 'danger' }
> = {
  active: { label: 'Active', variant: 'default' },
  pending: { label: 'Pending', variant: 'secondary' },
  expired: { label: 'Expired', variant: 'danger' },
};

export default function PrescriptionsPage() {
  function handleRefill(id: string) {
    toast.success(`Refill requested for ${id} (demo)`);
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Prescriptions"
        description="Active medications and refill requests across your panel."
      />

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Patient</TableHead>
            <TableHead>Drug</TableHead>
            <TableHead>Dose</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {healthPrescriptions.map((rx) => {
            const meta = statusMeta[rx.status];
            return (
              <TableRow key={rx.id}>
                <TableCell className="font-medium">{rx.patient}</TableCell>
                <TableCell>{rx.drug}</TableCell>
                <TableCell className="text-muted-foreground">{rx.dose}</TableCell>
                <TableCell>
                  <Badge variant={meta.variant}>{meta.label}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={rx.status === 'expired' || rx.refillsLeft === 0}
                    onClick={() => handleRefill(rx.id)}
                  >
                    Refill
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
