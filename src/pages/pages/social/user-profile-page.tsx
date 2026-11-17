import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Card,
  CardContent,
  CardHeader,
} from '@/components/ui';
import { PageContent, PageHeader } from '@/components/patterns';
import { urls } from '@/routes/urls';

const DEMO_USERS: Record<
  string,
  {
    name: string;
    handle: string;
    avatar: string;
    bio: string;
    posts: number;
    followers: number;
    following: number;
  }
> = {
  'u-1': {
    name: 'Maria Garcia',
    handle: '@maria',
    avatar: 'https://i.pravatar.cc/128?img=5',
    bio: 'Design systems lead. Shipping tokens, not hex codes.',
    posts: 128,
    followers: 4200,
    following: 312,
  },
  'u-2': {
    name: 'Alex Nguyen',
    handle: '@alex',
    avatar: 'https://i.pravatar.cc/128?img=1',
    bio: 'Frontend engineer · React 19 enthusiast.',
    posts: 94,
    followers: 2100,
    following: 489,
  },
};

const FALLBACK = DEMO_USERS['u-1']!;

export default function UserProfilePage() {
  const { id = 'u-1' } = useParams<{ id: string }>();
  const user = DEMO_USERS[id] ?? { ...FALLBACK, name: `User ${id}`, handle: `@${id}` };

  return (
    <PageContent width="feed" className="space-y-6">
      <Button asChild variant="ghost" size="sm" className="-ml-2 w-fit">
        <Link to={urls.app.pages.social.feed}>
          <ArrowLeft className="h-4 w-4" /> Feed
        </Link>
      </Button>

      <PageHeader title={user.name} description={user.handle} />

      <Card>
        <CardHeader className="flex flex-row items-start gap-4 space-y-0">
          <Avatar className="h-20 w-20">
            <AvatarImage src={user.avatar} alt="" />
            <AvatarFallback>{user.name.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-3">
            <p className="text-sm text-muted-foreground">{user.bio}</p>
            <div className="flex gap-6 text-sm">
              <span>
                <strong>{user.posts}</strong> <span className="text-muted-foreground">posts</span>
              </span>
              <span>
                <strong>{user.followers.toLocaleString()}</strong>{' '}
                <span className="text-muted-foreground">followers</span>
              </span>
              <span>
                <strong>{user.following}</strong>{' '}
                <span className="text-muted-foreground">following</span>
              </span>
            </div>
            <Button size="sm">Follow</Button>
          </div>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          Recent posts and media would appear here in a full implementation.
        </CardContent>
      </Card>
    </PageContent>
  );
}
