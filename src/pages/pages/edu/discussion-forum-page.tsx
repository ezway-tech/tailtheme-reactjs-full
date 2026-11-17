import { useMemo, useState } from 'react';
import { MessageSquare, Pin, Plus } from 'lucide-react';
import {
  Avatar,
  AvatarFallback,
  Badge,
  Button,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui';
import { PageContent, PageHeader } from '@/components/patterns';

interface Thread {
  id: string;
  title: string;
  author: string;
  course: string;
  replies: number;
  lastActivity: string;
  pinned?: boolean;
}

const THREADS: Thread[] = [
  {
    id: 't-1',
    title: 'Best practices for token naming?',
    author: 'Alex N.',
    course: 'Design Systems',
    replies: 12,
    lastActivity: '2h ago',
    pinned: true,
  },
  {
    id: 't-2',
    title: 'useEffect vs use in React 19',
    author: 'Hiro T.',
    course: 'React Advanced',
    replies: 8,
    lastActivity: '5h ago',
  },
  {
    id: 't-3',
    title: 'Focus trap in nested dialogs',
    author: 'Maria G.',
    course: 'A11y Foundations',
    replies: 4,
    lastActivity: '1d ago',
  },
  {
    id: 't-4',
    title: 'Interview synthesis template',
    author: 'Layla A.',
    course: 'UX Research',
    replies: 2,
    lastActivity: '2d ago',
  },
];

export default function DiscussionForumPage() {
  const [q, setQ] = useState('');
  const [course, setCourse] = useState('all');

  const rows = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return THREADS.filter((t) => {
      if (course !== 'all' && t.course !== course) return false;
      if (needle && !`${t.title} ${t.author}`.toLowerCase().includes(needle)) return false;
      return true;
    });
  }, [q, course]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Discussion forum"
        description="Ask questions and share resources with classmates."
        actions={
          <Button size="sm">
            <Plus className="h-4 w-4" /> New thread
          </Button>
        }
      />

      <PageContent width="content" className="space-y-6">
        <div className="flex flex-wrap gap-2">
          <Input
            className="max-w-sm min-w-[12rem] flex-1"
            placeholder="Search threads…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <Select value={course} onValueChange={setCourse}>
            <SelectTrigger className="w-44 shrink-0 border-input bg-card shadow-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All courses</SelectItem>
              <SelectItem value="Design Systems">Design Systems</SelectItem>
              <SelectItem value="React Advanced">React Advanced</SelectItem>
              <SelectItem value="A11y Foundations">A11y Foundations</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <ul className="space-y-3">
          {rows.map((t) => (
            <li key={t.id}>
              <button
                type="button"
                className="flex w-full items-start gap-3 rounded-lg border border-input bg-card px-4 py-4 text-left shadow-sm transition-colors hover:bg-muted/50"
              >
                <Avatar className="h-9 w-9 shrink-0">
                  <AvatarFallback>{t.author.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    {t.pinned ? (
                      <Pin className="h-3.5 w-3.5 shrink-0 text-primary" aria-label="Pinned" />
                    ) : null}
                    <span className="font-medium text-foreground">{t.title}</span>
                    {t.pinned ? <Badge variant="secondary">Pinned</Badge> : null}
                  </div>
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    {t.author} · {t.course} · {t.replies} replies · {t.lastActivity}
                  </p>
                </div>
                <MessageSquare className="mt-1 h-4 w-4 shrink-0 text-muted-foreground" />
              </button>
            </li>
          ))}
        </ul>
      </PageContent>
    </div>
  );
}
