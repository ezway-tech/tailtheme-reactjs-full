import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Heart, MessageCircle } from 'lucide-react';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Card,
  CardContent,
  CardHeader,
  Separator,
  Textarea,
} from '@/components/ui';
import { PageContent } from '@/components/patterns';
import { getSocialPost, socialPostComments } from '@/mocks/fixtures';
import { urls } from '@/routes/urls';

export default function PostDetailPage() {
  const { id = '' } = useParams<{ id: string }>();
  const post = getSocialPost(id);
  const comments = socialPostComments[id] ?? [];

  if (!post) {
    return (
      <PageContent width="feed" className="space-y-4">
        <p className="text-muted-foreground">Post not found.</p>
        <Button asChild variant="outline">
          <Link to={urls.app.pages.social.feed}>Back to feed</Link>
        </Button>
      </PageContent>
    );
  }

  return (
    <PageContent width="feed" className="space-y-4">
      <Button asChild variant="ghost" size="sm" className="-ml-2 w-fit">
        <Link to={urls.app.pages.social.feed}>
          <ArrowLeft className="h-4 w-4" /> Feed
        </Link>
      </Button>

      <Card>
        <CardHeader className="flex flex-row items-center gap-3 space-y-0">
          <Avatar>
            <AvatarImage src={post.avatar} alt="" />
            <AvatarFallback>{post.author.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold">{post.author}</p>
            <p className="text-sm text-muted-foreground">
              {post.handle} · {post.time}
            </p>
          </div>
        </CardHeader>
        <CardContent className="text-sm">{post.content}</CardContent>
        <Separator />
        <div className="flex gap-2 px-6 py-3">
          <Button variant="ghost" size="sm">
            <Heart className="h-4 w-4" /> {post.likes}
          </Button>
          <Button variant="ghost" size="sm">
            <MessageCircle className="h-4 w-4" /> {post.comments}
          </Button>
        </div>
      </Card>

      <Card>
        <CardHeader>
          <p className="font-medium">Comments</p>
        </CardHeader>
        <CardContent className="space-y-4">
          {comments.map((c) => (
            <div key={c.id} className="rounded-md border border-border p-3 text-sm">
              <p className="font-medium">{c.author}</p>
              <p className="mt-1">{c.text}</p>
              <p className="mt-1 text-xs text-muted-foreground">{c.time}</p>
            </div>
          ))}
          <Textarea placeholder="Write a reply…" rows={2} />
          <Button size="sm">Reply</Button>
        </CardContent>
      </Card>
    </PageContent>
  );
}
