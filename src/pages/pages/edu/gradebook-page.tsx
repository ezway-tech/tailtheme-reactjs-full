import { useMemo, useState } from 'react';
import {
  Input,
  Progress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui';
import { PageHeader } from '@/components/patterns';

interface GradeRow {
  student: string;
  course: string;
  assignments: number;
  avg: number;
  trend: number[];
}

const GRADES: GradeRow[] = [
  {
    student: 'Alex Nguyen',
    course: 'Design Systems',
    assignments: 8,
    avg: 92,
    trend: [88, 90, 91, 92],
  },
  {
    student: 'Maria Garcia',
    course: 'React Advanced',
    assignments: 6,
    avg: 88,
    trend: [85, 86, 87, 88],
  },
  {
    student: 'Hiro Tanaka',
    course: 'A11y Foundations',
    assignments: 5,
    avg: 95,
    trend: [93, 94, 94, 95],
  },
  {
    student: 'Priya Patel',
    course: 'UX Research',
    assignments: 4,
    avg: 84,
    trend: [80, 82, 83, 84],
  },
];

export default function GradebookPage() {
  const [q, setQ] = useState('');

  const rows = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return GRADES.filter(
      (r) => !needle || `${r.student} ${r.course}`.toLowerCase().includes(needle),
    );
  }, [q]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Gradebook"
        description="Class averages and assignment completion at a glance."
      />

      <Input
        className="max-w-sm"
        placeholder="Search student or course…"
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Student</TableHead>
            <TableHead>Course</TableHead>
            <TableHead>Assignments</TableHead>
            <TableHead>Average</TableHead>
            <TableHead className="w-48">Progress</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((r) => (
            <TableRow key={`${r.student}-${r.course}`}>
              <TableCell className="font-medium">{r.student}</TableCell>
              <TableCell className="text-muted-foreground">{r.course}</TableCell>
              <TableCell>{r.assignments}</TableCell>
              <TableCell className="tabular-nums font-medium">{r.avg}%</TableCell>
              <TableCell>
                <Progress value={r.avg} className="h-2" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
