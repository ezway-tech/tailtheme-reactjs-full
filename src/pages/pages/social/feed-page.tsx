import { Link } from 'react-router-dom';
import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Heart, MessageCircle, Repeat2, Share2 } from 'lucide-react';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  Separator,
  Textarea,
} from '@/components/ui';
import { PageContent, PageHeader } from '@/components/patterns';
import { MotionList, MotionListItem } from '@/components/motion';
import { SPRING } from '@/lib/motion';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { socialPosts } from '@/mocks/fixtures';
import { urls } from '@/routes/urls';
import { cn } from '@/lib/cn';

function LikeButton({ initial }: { initial: number }) {
  const reduced = useReducedMotion();
  const [liked, setLiked] = useState(false);
  const count = initial + (liked ? 1 : 0);
  return (
    <Button
      variant="ghost"
      className={cn('relative overflow-visible rounded-none', liked && 'text-rose-500')}
      onClick={() => setLiked((v) => !v)}
    >
      <motion.span
        animate={reduced || !liked ? undefined : { scale: [1, 1.4, 1] }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="inline-flex items-center gap-2"
      >
        <Heart className={cn('h-4 w-4', liked && 'fill-current')} />
        {count}
      </motion.span>
      <AnimatePresence>
        {!reduced && liked
          ? [0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="pointer-events-none absolute left-1/2 top-1/2 h-1.5 w-1.5 rounded-full bg-rose-500"
                initial={{ opacity: 1, scale: 0.6, x: 0, y: 0 }}
                animate={{
                  opacity: 0,
                  scale: 1.2,
                  x: (i - 1) * 14,
                  y: -14 - i * 4,
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              />
            ))
          : null}
      </AnimatePresence>
    </Button>
  );
}

export default function FeedPage() {
  return (
    <PageContent width="feed" className="space-y-6">
      <PageHeader title="Feed" description="The latest from people you follow." />
      <motion.div
        layout
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={SPRING.layout}
      >
        <Card>
          <CardHeader className="flex flex-row items-start gap-3 space-y-0">
            <Avatar>
              <AvatarFallback>You</AvatarFallback>
            </Avatar>
            <Textarea placeholder="Share something…" className="min-h-[80px] flex-1 resize-none" />
          </CardHeader>
          <CardFooter className="justify-end">
            <Button size="sm">Post</Button>
          </CardFooter>
        </Card>
      </motion.div>

      <MotionList stagger="normal" className="space-y-4">
        {socialPosts.map((p) => (
          <MotionListItem key={p.id}>
            <Card>
              <CardHeader className="flex flex-row items-center gap-3 space-y-0">
                <Avatar>
                  <AvatarImage src={p.avatar} alt={p.author} />
                  <AvatarFallback>{p.author.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-semibold">{p.author}</span>
                    <span className="text-muted-foreground">
                      {p.handle} · {p.time}
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="text-sm">
                <Link to={urls.app.pages.social.postDetail(p.id)} className="hover:text-text-brand">
                  {p.content}
                </Link>
              </CardContent>
              <Separator />
              <CardFooter className="grid grid-cols-4 gap-0 p-0">
                <LikeButton initial={p.likes} />
                <Button asChild variant="ghost" className="rounded-none">
                  <Link to={urls.app.pages.social.postDetail(p.id)}>
                    <MessageCircle className="h-4 w-4" /> {p.comments}
                  </Link>
                </Button>
                <Button variant="ghost" className="rounded-none">
                  <Repeat2 className="h-4 w-4" /> {p.shares}
                </Button>
                <Button variant="ghost" className="rounded-none">
                  <Share2 className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </MotionListItem>
        ))}
      </MotionList>
    </PageContent>
  );
}
