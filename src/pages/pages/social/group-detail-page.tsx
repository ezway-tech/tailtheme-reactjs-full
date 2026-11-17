import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Users } from 'lucide-react';
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui';
import { PageContent, PageHeader } from '@/components/patterns';
import { getSocialGroup, socialPosts } from '@/mocks/fixtures';
import { urls } from '@/routes/urls';

export default function GroupDetailPage() {
  const { id = '' } = useParams<{ id: string }>();
  const group = getSocialGroup(id);

  if (!group) {
    return (
      <div className="space-y-4">
        <p className="text-muted-foreground">Group not found.</p>
        <Button asChild variant="outline">
          <Link to={urls.app.pages.social.groups}>Back to groups</Link>
        </Button>
      </div>
    );
  }

  return (
    <PageContent width="feed" className="space-y-6">
      <Button asChild variant="ghost" size="sm" className="-ml-2 w-fit">
        <Link to={urls.app.pages.social.groups}>
          <ArrowLeft className="h-4 w-4" /> Groups
        </Link>
      </Button>

      <PageHeader
        title={group.name}
        description={group.description}
        actions={
          <>
            <Badge variant="outline">{group.visibility}</Badge>
            <Button size="sm">Join group</Button>
          </>
        }
      />

      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Members</CardDescription>
          <CardTitle className="flex items-center gap-2 text-base">
            <Users className="h-4 w-4" />
            {group.members.toLocaleString()}
          </CardTitle>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Recent posts</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {socialPosts.map((post) => (
            <div key={post.id} className="rounded-md border border-border p-3 text-sm">
              <p className="font-medium">{post.author}</p>
              <p className="mt-1 text-muted-foreground">{post.content}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </PageContent>
  );
}
