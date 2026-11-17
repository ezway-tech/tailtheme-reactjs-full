import { Link } from 'react-router-dom';
import { useMemo, useState } from 'react';
import { Plus } from 'lucide-react';
import {
  Badge,
  Button,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui';
import { PageHeader } from '@/components/patterns';
import { sampleAssignments, type AssignmentStatus } from '@/mocks/fixtures';
import { urls } from '@/routes/urls';

const STATUS_VARIANT: Record<
  AssignmentStatus,
  'default' | 'secondary' | 'outline' | 'success' | 'warning' | 'danger'
> = {
  open: 'outline',
  submitted: 'default',
  graded: 'success',
  overdue: 'danger',
};

export default function AssignmentsPage() {
  const [q, setQ] = useState('');
  const [status, setStatus] = useState<'all' | AssignmentStatus>('all');

  const rows = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return sampleAssignments.filter((a) => {
      if (status !== 'all' && a.status !== status) return false;
      if (needle && !`${a.title} ${a.course}`.toLowerCase().includes(needle)) return false;
      return true;
    });
  }, [q, status]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Assignments"
        description="Track your coursework, deadlines and grades across all enrolled courses."
        actions={
          <Button size="sm">
            <Plus className="h-4 w-4" /> New assignment
          </Button>
        }
      />

      <div className="flex flex-wrap items-center gap-2">
        <Input
          className="max-w-sm"
          placeholder="Search assignments…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <Select value={status} onValueChange={(v) => setStatus(v as typeof status)}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            <SelectItem value="open">Open</SelectItem>
            <SelectItem value="submitted">Submitted</SelectItem>
            <SelectItem value="graded">Graded</SelectItem>
            <SelectItem value="overdue">Overdue</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Assignment</TableHead>
            <TableHead>Course</TableHead>
            <TableHead>Due</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Grade</TableHead>
            <TableHead className="w-16 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((a) => (
            <TableRow key={a.id}>
              <TableCell className="font-medium">{a.title}</TableCell>
              <TableCell className="text-muted-foreground">{a.course}</TableCell>
              <TableCell>{a.due}</TableCell>
              <TableCell>
                <Badge variant={STATUS_VARIANT[a.status]}>{a.status}</Badge>
              </TableCell>
              <TableCell className="tabular-nums">{a.grade ?? '—'}</TableCell>
              <TableCell className="text-right">
                <Button asChild size="sm" variant="ghost">
                  <Link to={urls.app.pages.edu.assignmentSubmit(a.id)}>
                    {a.status === 'graded' ? 'View' : 'Submit'}
                  </Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <p className="text-xs text-muted-foreground">{rows.length} assignments</p>
    </div>
  );
}
