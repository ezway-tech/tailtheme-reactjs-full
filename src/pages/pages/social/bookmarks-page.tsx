import { useState } from 'react';
import { BookmarkX } from 'lucide-react';
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
import { socialPosts, type SocialPost } from '@/mocks/fixtures';

export default function BookmarksPage() {
  const [saved, setSaved] = useState<SocialPost[]>([...socialPosts]);

  function remove(id: string) {
    setSaved((prev) => prev.filter((p) => p.id !== id));
  }

  return (
    <PageContent width="feed" className="space-y-6">
      <PageHeader title="Bookmarks" description="Posts you saved for later." />

      {saved.length === 0 ? (
        <p className="text-sm text-muted-foreground">No saved posts yet.</p>
      ) : (
        <div className="space-y-4">
          {saved.map((post) => (
            <Card key={post.id}>
              <CardHeader className="flex flex-row items-center gap-3 space-y-0">
                <Avatar>
                  <AvatarImage src={post.avatar} alt="" />
                  <AvatarFallback>{post.author.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm font-semibold">{post.author}</p>
                  <p className="text-xs text-muted-foreground">
                    {post.handle} · {post.time}
                  </p>
                </div>
                <Button
                  size="icon"
                  variant="ghost"
                  aria-label="Remove bookmark"
                  onClick={() => remove(post.id)}
                >
                  <BookmarkX className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="text-sm">{post.content}</CardContent>
            </Card>
          ))}
        </div>
      )}
    </PageContent>
  );
}
