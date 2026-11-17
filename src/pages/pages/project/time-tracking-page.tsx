import {
  Button,
  Card,
  CardContent,
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

const ENTRIES = [
  { id: 'tt-1', project: 'TailTheme Web', task: 'Social pages', hours: 4.5, date: 'May 19' },
  { id: 'tt-2', project: 'TailTheme Web', task: 'Finance routes', hours: 3, date: 'May 19' },
  { id: 'tt-3', project: 'Client Portal', task: 'Auth bugfix', hours: 2, date: 'May 18' },
  { id: 'tt-4', project: 'Design System', task: 'Token audit', hours: 6, date: 'May 17' },
  { id: 'tt-5', project: 'TailTheme Web', task: 'Project Gantt', hours: 1.5, date: 'May 16' },
];

export default function TimeTrackingPage() {
  const total = ENTRIES.reduce((sum, e) => sum + e.hours, 0);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Time tracking"
        description={`${total} hours logged this week.`}
        actions={<Button>Log time</Button>}
      />

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Recent entries</CardTitle>
        </CardHeader>
        <CardContent>
          <Table framed={false}>
            <TableHeader>
              <TableRow>
                <TableHead>Project</TableHead>
                <TableHead>Task</TableHead>
                <TableHead className="text-right">Hours</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ENTRIES.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell className="font-medium">{entry.project}</TableCell>
                  <TableCell>{entry.task}</TableCell>
                  <TableCell className="text-right">{entry.hours}</TableCell>
                  <TableCell className="text-muted-foreground">{entry.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
