import { Link, useParams } from 'react-router-dom';
import { Mic, MicOff, PhoneOff, Users, Video } from 'lucide-react';
import { Button, ScrollArea } from '@/components/ui';
import { getSampleEduClass } from '@/mocks/fixtures';
import { urls } from '@/routes/urls';

const CHAT = [
  { user: 'Maria', text: 'Welcome everyone!' },
  { user: 'Alex', text: 'Can you share the Figma link?' },
  { user: 'Hiro', text: 'Slides are in the materials tab.' },
];

export default function LiveSessionPage() {
  const { id = 'c-1' } = useParams<{ id: string }>();
  const cls = getSampleEduClass(id) ?? getSampleEduClass('c-1')!;

  return (
    <div className="flex h-[100dvh] flex-col bg-background text-foreground">
      <header className="flex items-center justify-between border-b border-border px-4 py-3">
        <div>
          <p className="text-xs text-muted-foreground">Live session</p>
          <h1 className="font-semibold">{cls.name}</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link to={urls.app.pages.edu.classDetail(cls.id)}>Exit</Link>
          </Button>
          <Button variant="destructive" size="sm">
            <PhoneOff className="h-4 w-4" /> Leave
          </Button>
        </div>
      </header>

      <div className="grid min-h-0 flex-1 gap-0 lg:grid-cols-[1fr_280px]">
        <div className="relative flex min-h-0 min-w-0 flex-col items-center justify-center bg-muted/30 p-4">
          <div className="flex aspect-video w-full max-w-4xl items-center justify-center rounded-lg border border-border bg-muted">
            <Video className="h-16 w-16 text-muted-foreground/50" aria-hidden />
            <span className="sr-only">Live video placeholder</span>
          </div>
          <div className="mt-4 flex gap-2">
            <Button size="icon" variant="secondary" aria-label="Toggle mic">
              <Mic className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="outline" aria-label="Mute">
              <MicOff className="h-4 w-4" />
            </Button>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            Instructor: {cls.teacher} · {cls.students} participants
          </p>
        </div>

        <aside className="flex min-h-0 min-w-0 flex-col border-t border-input bg-card shadow-sm lg:border-t-0 lg:border-l lg:border-input">
          <div className="flex items-center gap-2 border-b border-input px-4 py-3 text-sm font-medium text-foreground">
            <Users className="h-4 w-4 shrink-0" aria-hidden /> Chat
          </div>
          <ScrollArea className="min-h-0 flex-1 px-4 py-3">
            <ul className="space-y-4 text-sm">
              {CHAT.map((m, i) => (
                <li key={i} className="min-w-0 break-words">
                  <span className="font-medium text-foreground">{m.user}</span>
                  <span className="text-muted-foreground"> · </span>
                  <span className="text-foreground/90">{m.text}</span>
                </li>
              ))}
            </ul>
          </ScrollArea>
        </aside>
      </div>
    </div>
  );
}
