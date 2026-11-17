import { Link } from 'react-router-dom';
import { Clock } from 'lucide-react';
import {
  Avatar,
  AvatarFallback,
  Badge,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui';
import { PageHeader } from '@/components/patterns';
import { urls } from '@/routes/urls';
import { blogPosts } from '@/mocks/fixtures';

export default function BlogListPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Blog" description="Notes on design, engineering, and the craft." />
      <div className="grid gap-5 md:grid-cols-2">
        {blogPosts.map((p) => (
          <Card key={p.slug} className="flex flex-col overflow-hidden">
            <div className={`h-40 w-full ${p.hero}`} aria-hidden />
            <CardHeader>
              <div className="flex flex-wrap gap-1">
                {p.tags.map((t) => (
                  <Badge key={t} variant="outline" className="text-[10px] capitalize">
                    {t}
                  </Badge>
                ))}
              </div>
              <CardTitle className="text-lg">
                <Link to={urls.app.pages.marketing.blogPost(p.slug)} className="hover:underline">
                  {p.title}
                </Link>
              </CardTitle>
              <CardDescription>{p.excerpt}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1" />
            <CardFooter className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarFallback className="text-[10px]">
                    {p.author
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </AvatarFallback>
                </Avatar>
                <span>{p.author}</span>
                <span>·</span>
                <span>{p.publishedAt}</span>
              </div>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" /> {p.readTime}
              </span>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
