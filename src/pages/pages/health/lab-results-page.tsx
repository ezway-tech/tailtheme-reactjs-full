import {
  Badge,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui';
import { PageHeader } from '@/components/patterns';
import { healthLabResults, type LabFlag } from '@/mocks/fixtures';

const flagMeta: Record<LabFlag, { label: string; variant: 'default' | 'secondary' | 'danger' }> = {
  normal: { label: 'Normal', variant: 'default' },
  high: { label: 'High', variant: 'danger' },
  low: { label: 'Low', variant: 'secondary' },
};

export default function LabResultsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Lab results"
        description="Recent panels with reference ranges and abnormal flags."
      />

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Test</TableHead>
            <TableHead>Value</TableHead>
            <TableHead>Reference range</TableHead>
            <TableHead>Flag</TableHead>
            <TableHead className="text-muted-foreground">Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {healthLabResults.map((row) => {
            const meta = flagMeta[row.flag];
            return (
              <TableRow key={row.id}>
                <TableCell className="font-medium">{row.test}</TableCell>
                <TableCell>{row.value}</TableCell>
                <TableCell className="text-muted-foreground">{row.range}</TableCell>
                <TableCell>
                  <Badge variant={meta.variant} className="capitalize">
                    {meta.label}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">{row.date}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
