import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Calendar, FileText, Users, Video } from 'lucide-react';
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
import { getSampleEduClass } from '@/mocks/fixtures';
import { urls } from '@/routes/urls';

const MATERIALS = [
  { name: 'Week 4 slides.pdf', size: '2.4 MB' },
  { name: 'Reading list', size: 'Link' },
  { name: 'Figma library', size: 'Link' },
];

const ROSTER = [
  { name: 'Alex Nguyen', role: 'Student' },
  { name: 'Maria Garcia', role: 'TA' },
  { name: 'Sam Taylor', role: 'Student' },
];

export default function ClassDetailPage() {
  const { id = '' } = useParams<{ id: string }>();
  const cls = getSampleEduClass(id);

  if (!cls) {
    return (
      <div className="space-y-4">
        <p className="text-muted-foreground">Class not found.</p>
        <Button asChild variant="outline">
          <Link to={urls.app.pages.edu.classes}>Back to classes</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Button asChild variant="ghost" size="sm" className="-ml-2 w-fit">
        <Link to={urls.app.pages.edu.classes}>
          <ArrowLeft className="h-4 w-4" /> Classes
        </Link>
      </Button>

      <PageHeader
        title={cls.name}
        description={cls.description}
        actions={
          <Button asChild size="sm">
            <Link to={urls.learn.live(cls.id)}>
              <Video className="h-4 w-4" /> Join live
            </Link>
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Schedule</CardDescription>
            <CardTitle className="flex items-center gap-2 text-base">
              <Calendar className="h-4 w-4" /> {cls.schedule}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Room</CardDescription>
            <CardTitle className="text-base">{cls.room}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Students</CardDescription>
            <CardTitle className="flex items-center gap-2 text-base">
              <Users className="h-4 w-4" /> {cls.students}
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <FileText className="h-5 w-5" /> Materials
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {MATERIALS.map((m) => (
              <div
                key={m.name}
                className="flex items-center justify-between rounded-md border border-border px-3 py-2 text-sm"
              >
                <span>{m.name}</span>
                <span className="text-muted-foreground">{m.size}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Roster</CardTitle>
            <CardDescription>
              Instructor: {cls.teacher}{' '}
              <Badge variant="outline" className="ml-1 capitalize">
                {cls.status}
              </Badge>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table framed={false}>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Role</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ROSTER.map((r) => (
                  <TableRow key={r.name}>
                    <TableCell>{r.name}</TableCell>
                    <TableCell className="text-muted-foreground">{r.role}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
