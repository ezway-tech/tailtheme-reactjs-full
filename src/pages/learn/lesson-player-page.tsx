import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, ArrowRight, BookOpen, CheckCircle2, Circle, Play, X } from 'lucide-react';
import {
  Button,
  Progress,
  ScrollArea,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui';
import { sampleCourses } from '@/mocks/fixtures';
import { urls } from '@/routes/urls';
import { cn } from '@/lib/cn';

export default function LessonPlayerPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  let course = sampleCourses[0];
  let idx = 0;
  for (const c of sampleCourses) {
    const i = c.lessons.findIndex((l) => l.id === id);
    if (i >= 0) {
      course = c;
      idx = i;
      break;
    }
  }

  const [activeIdx, setActiveIdx] = useState(idx);
  const activeLesson = course.lessons[activeIdx];

  const progress = ((activeIdx + 1) / course.lessons.length) * 100;
  const canPrev = activeIdx > 0;
  const canNext = activeIdx < course.lessons.length - 1;

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <div className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur">
        <Progress value={progress} className="h-1 rounded-none" />
        <div className="flex items-center gap-3 px-4 py-3">
          <Button variant="ghost" size="icon" asChild>
            <Link to={urls.app.courseDetail(course.id)} aria-label={t('pages.lesson.exit', 'Exit')}>
              <X className="h-4 w-4" />
            </Link>
          </Button>
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs uppercase tracking-wider text-muted-foreground">
              {course.title}
            </p>
            <h1 className="truncate text-sm font-semibold">{activeLesson?.title}</h1>
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="hidden md:inline-flex">
                <BookOpen className="h-4 w-4" />
                {t('pages.lesson.outline', 'Outline')}
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <SheetHeader>
                <SheetTitle>{t('pages.lesson.outline', 'Lesson outline')}</SheetTitle>
              </SheetHeader>
              <ScrollArea className="h-[calc(100vh-5rem)]">
                <ol className="mt-4 flex flex-col gap-1 pr-2">
                  {course.lessons.map((lesson, lessonIdx) => {
                    const active = lessonIdx === activeIdx;
                    return (
                      <li key={lesson.id}>
                        <button
                          type="button"
                          onClick={() => setActiveIdx(lessonIdx)}
                          className={cn(
                            'flex w-full items-center gap-2 rounded-md px-2 py-2 text-left text-sm transition-colors hover:bg-muted',
                            active && 'bg-primary text-primary-foreground hover:bg-primary',
                          )}
                        >
                          {lesson.completed ? (
                            <CheckCircle2 className="h-4 w-4 shrink-0" />
                          ) : (
                            <Circle className="h-4 w-4 shrink-0" />
                          )}
                          <span className="flex-1 truncate">{lesson.title}</span>
                          <span className="text-xs opacity-70">{lesson.durationMinutes}m</span>
                        </button>
                      </li>
                    );
                  })}
                </ol>
              </ScrollArea>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <main id="main-content" className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-6 p-6">
        <div className="relative flex aspect-video items-center justify-center rounded-xl bg-gradient-to-br from-muted via-background to-muted shadow-inner">
          <Button size="lg" className="h-16 w-16 rounded-full">
            <Play className="h-6 w-6" />
          </Button>
          <span className="absolute bottom-3 right-3 rounded-md bg-background/80 px-2 py-1 text-xs text-muted-foreground backdrop-blur">
            {activeLesson?.durationMinutes} min
          </span>
        </div>

        <div>
          <h2 className="text-2xl font-semibold">{activeLesson?.title}</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            This is a demo video player placeholder. Replace with your own video/content component —
            the layout handles progress, navigation and drawer outline.
          </p>
        </div>

        <div className="mt-auto flex items-center justify-between gap-2 border-t border-border pt-4">
          <Button variant="outline" disabled={!canPrev} onClick={() => setActiveIdx((i) => i - 1)}>
            <ArrowLeft className="h-3.5 w-3.5" />
            {t('pages.lesson.prev', 'Previous')}
          </Button>
          {canNext ? (
            <Button onClick={() => setActiveIdx((i) => i + 1)}>
              {t('pages.lesson.next', 'Next lesson')}
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          ) : (
            <Button onClick={() => navigate(urls.learn.quiz('q-1'))}>
              Take quiz
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          )}
        </div>
      </main>
    </div>
  );
}
