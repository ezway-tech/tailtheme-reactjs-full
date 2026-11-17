import { useEffect, useMemo, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AnimatePresence, motion } from 'motion/react';
import { Clock, X } from 'lucide-react';
import {
  Button,
  Card,
  CardContent,
  Checkbox,
  Label,
  Progress,
  RadioGroup,
  RadioGroupItem,
} from '@/components/ui';
import { useConfirm } from '@/components/patterns/confirm-dialog';
import { findQuiz } from '@/mocks/fixtures';
import { urls } from '@/routes/urls';
import { cn } from '@/lib/cn';
import { Confetti } from '@/components/motion';
import { DURATION, EASE } from '@/lib/motion';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

function formatSeconds(total: number): string {
  const minutes = Math.floor(total / 60);
  const seconds = total % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

export default function QuizPage() {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const confirm = useConfirm();

  const reduced = useReducedMotion();
  const quiz = useMemo(() => (id ? findQuiz(id) : undefined), [id]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [direction, setDirection] = useState(1);
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [secondsLeft, setSecondsLeft] = useState(quiz ? quiz.durationMinutes * 60 : 600);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (submitted) return;
    const timer = window.setInterval(() => {
      setSecondsLeft((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => window.clearInterval(timer);
  }, [submitted]);

  const score = useMemo(() => {
    if (!quiz) return 0;
    let correct = 0;
    for (const q of quiz.questions) {
      const given = (answers[q.id] ?? []).slice().sort().join(',');
      const expected = q.correctIds.slice().sort().join(',');
      if (given && given === expected) correct += 1;
    }
    return Math.round((correct / quiz.questions.length) * 100);
  }, [answers, quiz]);

  if (!quiz) return <Navigate to={urls.errors.notFound} replace />;

  const question = quiz.questions[currentIdx];
  const selected = answers[question.id] ?? [];
  const totalDuration = quiz.durationMinutes * 60;
  const timeProgress = (secondsLeft / totalDuration) * 100;

  const setSelection = (choiceId: string) => {
    setAnswers((prev) => {
      if (question.type === 'single') {
        return { ...prev, [question.id]: [choiceId] };
      }
      const current = prev[question.id] ?? [];
      return {
        ...prev,
        [question.id]: current.includes(choiceId)
          ? current.filter((c) => c !== choiceId)
          : [...current, choiceId],
      };
    });
  };

  const submit = async () => {
    const ok = await confirm({
      title: t('pages.quiz.submit', 'Submit quiz'),
      description: t(
        'pages.quiz.submitConfirm',
        "Are you sure you want to submit? You won't be able to change your answers.",
      ),
      confirmLabel: t('pages.quiz.submit', 'Submit quiz'),
    });
    if (ok) setSubmitted(true);
  };

  if (submitted) {
    const passed = score >= quiz.passingScore;
    return (
      <div className="relative mx-auto flex min-h-screen w-full max-w-xl flex-col items-center justify-center gap-6 p-6 text-center">
        {passed ? <Confetti fire particles={48} duration={2.2} /> : null}
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 18 }}
          className={cn(
            'flex h-20 w-20 items-center justify-center rounded-full text-3xl font-semibold',
            passed ? 'bg-success-bg text-success-text' : 'bg-danger-bg text-danger-text',
          )}
        >
          {score}%
        </motion.div>
        <div>
          <h1 className="text-2xl font-semibold">{passed ? 'Well done!' : 'Keep practicing'}</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            You scored {score}% on {quiz.title}. Passing score is {quiz.passingScore}%.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => navigate(urls.app.courses)}>
            Back to courses
          </Button>
          <Button
            onClick={() => {
              setAnswers({});
              setCurrentIdx(0);
              setSecondsLeft(quiz.durationMinutes * 60);
              setSubmitted(false);
            }}
          >
            Retake quiz
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur">
        <div className="flex items-center gap-3 px-4 py-3">
          <Button
            variant="ghost"
            size="icon"
            aria-label={t('pages.quiz.exit', 'Exit quiz')}
            onClick={() => navigate(urls.app.courses)}
          >
            <X className="h-4 w-4" />
          </Button>
          <div className="flex-1">
            <h1 className="text-sm font-semibold">{quiz.title}</h1>
            <p className="text-xs text-muted-foreground">
              {t('pages.quiz.question', {
                current: currentIdx + 1,
                total: quiz.questions.length,
              })}
            </p>
          </div>
          <div
            className={cn(
              'flex items-center gap-1.5 rounded-md border border-border px-2 py-1 text-sm tabular-nums',
              secondsLeft < 60 && 'border-destructive text-destructive',
            )}
          >
            <Clock className="h-3.5 w-3.5" />
            {formatSeconds(secondsLeft)}
          </div>
        </div>
        <Progress value={100 - timeProgress} className="h-1 rounded-none" />
      </header>

      <main id="main-content" className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-6 p-6">
        <div>
          <p className="text-xs uppercase tracking-wider text-muted-foreground">
            {question.type === 'single' ? 'Choose one' : 'Choose all that apply'}
          </p>
          <h2 className="mt-1 text-xl font-semibold leading-snug">{question.prompt}</h2>
        </div>

        <AnimatePresence mode="wait" initial={false} custom={direction}>
          <motion.div
            key={currentIdx}
            custom={direction}
            initial={reduced ? false : { opacity: 0, x: direction * 40 }}
            animate={reduced ? undefined : { opacity: 1, x: 0 }}
            exit={reduced ? undefined : { opacity: 0, x: direction * -40 }}
            transition={{ duration: DURATION.md, ease: EASE.out }}
          >
            <Card>
              <CardContent className="space-y-2 p-4">
                {question.type === 'single' ? (
                  <RadioGroup
                    value={selected[0] ?? ''}
                    onValueChange={setSelection}
                    className="flex flex-col gap-2"
                  >
                    {question.choices.map((choice) => (
                      <Label
                        key={choice.id}
                        htmlFor={`${question.id}-${choice.id}`}
                        className={cn(
                          'flex cursor-pointer items-start gap-3 rounded-md border border-border p-3 transition-colors hover:bg-muted',
                          selected.includes(choice.id) && 'border-primary bg-primary/5',
                        )}
                      >
                        <RadioGroupItem id={`${question.id}-${choice.id}`} value={choice.id} />
                        <span className="text-sm">{choice.label}</span>
                      </Label>
                    ))}
                  </RadioGroup>
                ) : (
                  <div className="flex flex-col gap-2">
                    {question.choices.map((choice) => (
                      <Label
                        key={choice.id}
                        htmlFor={`${question.id}-${choice.id}`}
                        className={cn(
                          'flex cursor-pointer items-start gap-3 rounded-md border border-border p-3 transition-colors hover:bg-muted',
                          selected.includes(choice.id) && 'border-primary bg-primary/5',
                        )}
                      >
                        <Checkbox
                          id={`${question.id}-${choice.id}`}
                          checked={selected.includes(choice.id)}
                          onCheckedChange={() => setSelection(choice.id)}
                        />
                        <span className="text-sm">{choice.label}</span>
                      </Label>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>

        <nav className="flex flex-wrap gap-1.5" aria-label="Question navigator">
          {quiz.questions.map((q, qIdx) => {
            const answered = (answers[q.id]?.length ?? 0) > 0;
            const active = qIdx === currentIdx;
            return (
              <button
                key={q.id}
                type="button"
                onClick={() => {
                  setDirection(qIdx > currentIdx ? 1 : -1);
                  setCurrentIdx(qIdx);
                }}
                className={cn(
                  'h-8 w-8 rounded-md border text-xs font-medium transition-colors',
                  active && 'border-primary bg-primary text-primary-foreground',
                  !active && answered && 'border-primary/50 bg-primary/10 text-primary',
                  !active && !answered && 'border-border text-muted-foreground hover:bg-muted',
                )}
                aria-label={`Question ${qIdx + 1}`}
              >
                {qIdx + 1}
              </button>
            );
          })}
        </nav>

        <div className="mt-auto flex items-center justify-between border-t border-border pt-4">
          <Button
            variant="outline"
            disabled={currentIdx === 0}
            onClick={() => {
              setDirection(-1);
              setCurrentIdx((i) => i - 1);
            }}
          >
            Previous
          </Button>
          {currentIdx < quiz.questions.length - 1 ? (
            <Button
              onClick={() => {
                setDirection(1);
                setCurrentIdx((i) => i + 1);
              }}
            >
              Next
            </Button>
          ) : (
            <Button onClick={submit}>{t('pages.quiz.submit', 'Submit quiz')}</Button>
          )}
        </div>
      </main>
    </div>
  );
}
