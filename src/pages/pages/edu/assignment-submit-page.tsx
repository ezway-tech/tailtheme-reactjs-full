import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Upload } from 'lucide-react';
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  FileUpload,
  Label,
  RichTextEditor,
  toast,
} from '@/components/ui';
import { PageContent, PageHeader } from '@/components/patterns';
import { getSampleAssignment } from '@/mocks/fixtures';
import { urls } from '@/routes/urls';

export default function AssignmentSubmitPage() {
  const { id = '' } = useParams<{ id: string }>();
  const assignment = getSampleAssignment(id);

  if (!assignment) {
    return (
      <div className="space-y-4">
        <p className="text-muted-foreground">Assignment not found.</p>
        <Button asChild variant="outline">
          <Link to={urls.app.pages.edu.assignments}>Back to assignments</Link>
        </Button>
      </div>
    );
  }

  return (
    <PageContent width="narrow" className="space-y-6">
      <Button asChild variant="ghost" size="sm" className="-ml-2 w-fit">
        <Link to={urls.app.pages.edu.assignments}>
          <ArrowLeft className="h-4 w-4" /> Assignments
        </Link>
      </Button>

      <PageHeader
        title={assignment.title}
        description={`${assignment.course} · Due ${assignment.due} · ${assignment.maxPoints} pts`}
      />

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Rubric</CardTitle>
          <CardDescription>Your submission is scored against these criteria.</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
            {assignment.rubric.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Your work</CardTitle>
          <CardDescription>Attach files and add a short reflection.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Written response</Label>
            <RichTextEditor placeholder="Summarize your approach…" />
          </div>
          <div className="space-y-2">
            <Label>Attachments</Label>
            <FileUpload accept=".pdf,.zip,.png,.jpg" maxFiles={3} maxSize={10 * 1024 * 1024} />
          </div>
          <div className="flex items-center justify-between gap-2 pt-2">
            <Badge variant="outline">Draft saved</Badge>
            <Button
              onClick={() => toast.success('Assignment submitted (demo)')}
              disabled={assignment.status === 'graded'}
            >
              <Upload className="h-4 w-4" /> Submit
            </Button>
          </div>
        </CardContent>
      </Card>
    </PageContent>
  );
}
