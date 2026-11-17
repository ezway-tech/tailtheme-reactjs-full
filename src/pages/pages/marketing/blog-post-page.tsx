import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Clock } from 'lucide-react';
import { Avatar, AvatarFallback, Badge, Button, Separator } from '@/components/ui';
import { urls } from '@/routes/urls';
import { PageContent } from '@/components/patterns';
import { blogPosts } from '@/mocks/fixtures';

export default function BlogPostPage() {
  const { slug = 'theming-tokens' } = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.slug === slug) ?? blogPosts[0]!;

  return (
    <PageContent width="content" className="space-y-6">
      <Button asChild variant="ghost" size="sm">
        <Link to={urls.app.pages.marketing.blog}>
          <ArrowLeft className="h-4 w-4" /> Back to blog
        </Link>
      </Button>

      <header className="space-y-4">
        <div className="flex flex-wrap gap-1">
          {post.tags.map((t) => (
            <Badge key={t} variant="outline" className="capitalize">
              {t}
            </Badge>
          ))}
        </div>
        <h1 className="text-3xl font-semibold leading-tight">{post.title}</h1>
        <p className="text-base text-muted-foreground">{post.excerpt}</p>
        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarFallback className="text-[10px]">
                {post.author
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </AvatarFallback>
            </Avatar>
            <span>{post.author}</span>
          </div>
          <span>·</span>
          <span>{post.publishedAt}</span>
          <span>·</span>
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" /> {post.readTime}
          </span>
        </div>
      </header>

      <div className={`h-64 w-full rounded-lg ${post.hero}`} aria-hidden />

      <div className="prose prose-neutral max-w-none text-[15px] leading-relaxed dark:prose-invert">
        <p>
          This is a sample blog post rendered by the marketing theme. In a real app you&apos;d load
          the body from a CMS, a Markdown file, or an MDX bundle — the layout here focuses on
          typography, rhythm, and giving the reader a calm, focused experience.
        </p>
        <h2 className="mt-8 text-xl font-semibold">Why it matters</h2>
        <p>
          Good content deserves good typography: generous line-height, readable measure, balanced
          weights, and tasteful use of color. The AppShell gives this template a consistent frame so
          the body content can shine.
        </p>
        <h2 className="mt-8 text-xl font-semibold">What's next</h2>
        <ul className="mt-3 list-disc space-y-1 pl-5">
          <li>Plug in MDX and syntax highlighting for real articles.</li>
          <li>Add related-posts and share widgets at the bottom.</li>
          <li>Wire RSS + sitemap generation into your build.</li>
        </ul>
        <Separator className="my-8" />
        <p className="text-sm text-muted-foreground">
          Thanks for reading — ping{' '}
          <Link to={urls.app.pages.marketing.contact} className="underline">
            the team
          </Link>{' '}
          if you&apos;d like us to dive deeper into any section.
        </p>
      </div>
    </PageContent>
  );
}
