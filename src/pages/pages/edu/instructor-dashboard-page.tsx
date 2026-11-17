import { Link } from 'react-router-dom';
import { BookOpen, ClipboardList, Users } from 'lucide-react';
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
import { StatCard } from '@/components/ui';
import { sampleAssignments } from '@/mocks/fixtures';
import { urls } from '@/routes/urls';

const PENDING = sampleAssignments.filter((a) => a.status === 'submitted' || a.status === 'open');

export default function InstructorDashboardPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Instructor dashboard"
        description="Overview for teachers — pending reviews and class health."
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Active classes" value="4" icon={BookOpen} delta="+1" trend="up" />
        <StatCard label="Students" value="91" icon={Users} delta="+6" trend="up" />
        <StatCard
          label="To review"
          value={String(PENDING.length)}
          icon={ClipboardList}
          trend="neutral"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Pending reviews</CardTitle>
          <CardDescription>Submissions waiting for grades.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table framed={false}>
            <TableHeader>
              <TableRow>
                <TableHead>Assignment</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Status</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>
            <TableBody>
              {PENDING.map((a) => (
                <TableRow key={a.id}>
                  <TableCell className="font-medium">{a.title}</TableCell>
                  <TableCell className="text-muted-foreground">{a.course}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">
                      {a.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button asChild size="sm" variant="ghost">
                      <Link to={urls.app.pages.edu.assignmentSubmit(a.id)}>Review</Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
