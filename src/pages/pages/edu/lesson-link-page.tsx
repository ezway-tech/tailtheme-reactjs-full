import { ArrowRight, ExternalLink, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui';
import { PageContent, PageHeader } from '@/components/patterns';
import { urls } from '@/routes/urls';

export default function LessonLinkPage() {
  return (
    <PageContent width="narrow" className="space-y-6">
      <PageHeader
        title="Lesson player"
        description="The lesson player uses a dedicated fullscreen layout for focus. Open a sample from any course."
      />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Play className="h-5 w-5" /> Try the player
          </CardTitle>
          <CardDescription>
            Click below to launch a sample lesson in the fullscreen layout. Use Esc or the exit
            button to return.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          <Button asChild>
            <Link to={urls.learn.lesson(1)}>
              Open lesson 1 <ExternalLink className="ml-1 h-3.5 w-3.5" />
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link to={urls.app.pages.edu.courses}>
              Browse courses <ArrowRight className="ml-1 h-3.5 w-3.5" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    </PageContent>
  );
}
