import { BrainCircuit, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui';
import { PageContent, PageHeader } from '@/components/patterns';
import { urls } from '@/routes/urls';

export default function QuizLinkPage() {
  return (
    <PageContent width="narrow" className="space-y-6">
      <PageHeader
        title="Quiz"
        description="Quizzes also use the fullscreen layout to minimize distractions while taking a test."
      />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BrainCircuit className="h-5 w-5" /> Start a sample quiz
          </CardTitle>
          <CardDescription>
            Launches the timed quiz page with progress, answers and submission confirmation.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild>
            <Link to={urls.learn.quiz('q-1')}>
              Open sample quiz <ExternalLink className="ml-1 h-3.5 w-3.5" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    </PageContent>
  );
}
