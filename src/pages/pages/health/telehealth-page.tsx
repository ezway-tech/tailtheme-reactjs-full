import { Link } from 'react-router-dom';
import { MessageSquare, Mic, PhoneOff, Video } from 'lucide-react';
import { Button, Input, ScrollArea } from '@/components/ui';
import { urls } from '@/routes/urls';

const CHAT = [
  { user: 'Dr. Lee', text: 'Good morning — can you hear me clearly?' },
  { user: 'You', text: 'Yes, audio is fine. Ready when you are.' },
  { user: 'Dr. Lee', text: 'Let’s review your latest labs first.' },
];

export default function TelehealthPage() {
  return (
    <div className="flex h-[100dvh] flex-col bg-background text-foreground">
      <header className="flex items-center justify-between border-b border-border px-4 py-3">
        <div>
          <p className="text-xs text-muted-foreground">Telehealth visit</p>
          <h1 className="font-semibold">Dr. Sarah Lee · Follow-up</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link to={urls.app.pages.health.appointments}>Exit</Link>
          </Button>
          <Button variant="destructive" size="sm">
            <PhoneOff className="h-4 w-4" aria-hidden /> End call
          </Button>
        </div>
      </header>

      <div className="grid min-h-0 flex-1 lg:grid-cols-[1fr_300px]">
        <div className="flex min-h-0 min-w-0 flex-col items-center justify-center bg-muted/30 p-4">
          <div className="flex aspect-video w-full max-w-3xl items-center justify-center rounded-lg border border-border bg-muted">
            <Video className="h-16 w-16 text-muted-foreground/50" aria-hidden />
            <span className="sr-only">Video placeholder</span>
          </div>
          <div className="mt-4 flex gap-2">
            <Button size="icon" variant="secondary" aria-label="Toggle microphone">
              <Mic className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <aside className="flex min-h-0 min-w-0 flex-col border-t border-input bg-card shadow-sm lg:border-t-0 lg:border-l lg:border-input">
          <div className="flex items-center gap-2 border-b border-input px-4 py-3 text-sm font-medium text-foreground">
            <MessageSquare className="h-4 w-4 shrink-0" aria-hidden /> Chat
          </div>
          <ScrollArea className="min-h-0 flex-1 px-4 py-3">
            <ul className="space-y-4 text-sm">
              {CHAT.map((m, i) => (
                <li key={i} className="min-w-0">
                  <span className="font-medium text-foreground">{m.user}</span>
                  <p className="mt-0.5 break-words text-foreground/90">{m.text}</p>
                </li>
              ))}
            </ul>
          </ScrollArea>
          <div className="flex gap-2 border-t border-input px-4 py-3">
            <Input
              className="min-w-0 flex-1"
              placeholder="Type a message…"
              aria-label="Chat message"
            />
            <Button size="sm" className="shrink-0">
              Send
            </Button>
          </div>
        </aside>
      </div>
    </div>
  );
}
