import { useState } from 'react';
import { motion } from 'motion/react';
import { Phone, Search, Send, Video } from 'lucide-react';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Button,
  Input,
  ScrollArea,
  Textarea,
} from '@/components/ui';
import { PageContent, PageHeader } from '@/components/patterns';
import { EASE, SPRING, STAGGER } from '@/lib/motion';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { cn } from '@/lib/cn';

const CONVERSATIONS = [
  {
    id: 'c-1',
    name: 'Maria Garcia',
    avatar: 'https://i.pravatar.cc/64?img=5',
    last: 'Can you review my PR?',
    time: '2m',
    unread: 2,
  },
  {
    id: 'c-2',
    name: 'Alex Nguyen',
    avatar: 'https://i.pravatar.cc/64?img=1',
    last: 'Thanks 🙏',
    time: '1h',
    unread: 0,
  },
  {
    id: 'c-3',
    name: 'Design team',
    avatar: '',
    last: 'New icons merged to main.',
    time: '3h',
    unread: 5,
  },
  {
    id: 'c-4',
    name: 'Priya Patel',
    avatar: 'https://i.pravatar.cc/64?img=10',
    last: 'See you tomorrow!',
    time: '1d',
    unread: 0,
  },
];

const MESSAGES = [
  { id: 'm-1', me: false, text: 'Hey, do you have a moment?', time: '10:03' },
  { id: 'm-2', me: true, text: "Sure, what's up?", time: '10:04' },
  { id: 'm-3', me: false, text: 'Can you review my PR for the theming guide?', time: '10:05' },
  { id: 'm-4', me: true, text: 'Yes, looking now.', time: '10:06' },
];

export default function MessagesPage() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(CONVERSATIONS[0]!.id);
  const current = CONVERSATIONS.find((c) => c.id === active) ?? CONVERSATIONS[0]!;

  return (
    <div className="space-y-4">
      <PageHeader title="Messages" description="Direct and group conversations." />

      <div className="grid h-[calc(100vh-16rem)] overflow-hidden rounded-lg border border-input shadow-sm md:grid-cols-[320px_1fr]">
        <aside className="flex min-h-0 min-w-0 flex-col border-r border-input bg-card">
          <div className="p-3">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input className="pl-8" placeholder="Search" />
            </div>
          </div>
          <ScrollArea className="min-h-0 flex-1">
            <ul>
              {CONVERSATIONS.map((c) => (
                <li key={c.id}>
                  <button
                    type="button"
                    onClick={() => setActive(c.id)}
                    className={cn(
                      'flex w-full items-center gap-3 border-b border-input px-3 py-3 text-left transition-colors hover:bg-muted/80',
                      c.id === active && 'bg-muted/80',
                    )}
                  >
                    <Avatar>
                      {c.avatar ? <AvatarImage src={c.avatar} alt={c.name} /> : null}
                      <AvatarFallback>{c.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="truncate text-sm font-medium">{c.name}</span>
                        <span className="shrink-0 text-[10px] text-muted-foreground">{c.time}</span>
                      </div>
                      <p className="truncate text-xs text-muted-foreground">{c.last}</p>
                    </div>
                    {c.unread > 0 ? <Badge className="shrink-0">{c.unread}</Badge> : null}
                  </button>
                </li>
              ))}
            </ul>
          </ScrollArea>
        </aside>

        <section className="flex min-h-0 min-w-0 flex-col bg-background">
          <header className="flex items-center justify-between border-b border-input px-4 py-3">
            <div className="flex items-center gap-3">
              <Avatar>
                {current.avatar ? <AvatarImage src={current.avatar} alt={current.name} /> : null}
                <AvatarFallback>{current.name.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-semibold">{current.name}</p>
                <p className="text-xs text-muted-foreground">Active now</p>
              </div>
            </div>
            <div className="flex gap-1">
              <Button size="icon" variant="ghost" aria-label="Voice call">
                <Phone className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="ghost" aria-label="Video call">
                <Video className="h-4 w-4" />
              </Button>
            </div>
          </header>
          <ScrollArea className="flex-1 bg-muted/30 p-4">
            <PageContent width="content" className="space-y-3">
              {MESSAGES.map((m, i) => (
                <motion.div
                  key={m.id}
                  className={cn('flex', m.me ? 'justify-end' : 'justify-start')}
                  initial={reduced ? false : { opacity: 0, y: 8, scale: 0.96 }}
                  animate={reduced ? undefined : { opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    ...SPRING.press,
                    delay: reduced ? 0 : i * STAGGER.tight,
                  }}
                  style={
                    reduced ? undefined : { transformOrigin: m.me ? 'bottom right' : 'bottom left' }
                  }
                >
                  <div
                    className={cn(
                      'max-w-xs min-w-0 break-words rounded-2xl px-3 py-2 text-sm shadow-sm',
                      m.me
                        ? 'bg-primary text-primary-foreground'
                        : 'border border-input bg-card text-foreground',
                    )}
                  >
                    {m.text}
                    <div
                      className={cn(
                        'mt-0.5 text-[10px]',
                        m.me ? 'opacity-70' : 'text-muted-foreground',
                      )}
                    >
                      {m.time}
                    </div>
                  </div>
                </motion.div>
              ))}
              {reduced ? null : (
                <div className="flex justify-start">
                  <div className="flex items-center gap-1 rounded-2xl border border-input bg-card px-3 py-2 shadow-sm">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="h-1.5 w-1.5 rounded-full bg-muted-foreground/60"
                        animate={{ y: [0, -3, 0] }}
                        transition={{
                          duration: 0.9,
                          delay: i * 0.15,
                          ease: EASE.inOut,
                          repeat: Infinity,
                        }}
                      />
                    ))}
                    <span className="sr-only">typing…</span>
                  </div>
                </div>
              )}
            </PageContent>
          </ScrollArea>
          <footer className="border-t border-input bg-card p-3">
            <div className="flex items-end gap-2">
              <Textarea
                placeholder="Write a message…"
                className="min-h-[40px] max-h-32 flex-1 resize-none"
              />
              <Button size="icon" aria-label="Send">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </footer>
        </section>
      </div>
    </div>
  );
}
