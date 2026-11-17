import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Flame, Shuffle } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import {
  Avatar,
  AvatarFallback,
  Badge,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  tableBodyRowClassName,
} from '@/components/ui';
import { PageHeader } from '@/components/patterns';
import { sampleUsers } from '@/mocks/fixtures';
import { cn } from '@/lib/cn';
import { SPRING } from '@/lib/motion';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { CountUp } from '@/components/motion';

interface RankedUser {
  id: string;
  name: string;
  email: string;
  role: string;
  points: number;
  streak: number;
}

export default function LeaderboardPage() {
  const { t } = useTranslation();
  const reduced = useReducedMotion();

  const [scores, setScores] = useState<Record<string, number>>(() =>
    Object.fromEntries(sampleUsers.map((u) => [u.id, u.points])),
  );

  const ranked: RankedUser[] = useMemo(() => {
    return sampleUsers
      .map((u) => ({
        id: u.id,
        name: u.name,
        email: u.email,
        role: u.role,
        points: scores[u.id] ?? u.points,
        streak: u.streak,
      }))
      .sort((a, b) => b.points - a.points);
  }, [scores]);

  const shuffle = () => {
    setScores((prev) => {
      const next: Record<string, number> = { ...prev };
      for (const u of sampleUsers) {
        const delta = Math.round((Math.random() - 0.5) * 3000);
        next[u.id] = Math.max(50, (prev[u.id] ?? u.points) + delta);
      }
      return next;
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title={t('pages.leaderboard.title', 'Leaderboard')}
        description={t('pages.leaderboard.subtitle', 'Top learners this week.')}
        actions={
          <Button variant="outline" size="sm" onClick={shuffle}>
            <Shuffle className="mr-1 h-4 w-4" />
            Shuffle scores
          </Button>
        }
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-16">{t('pages.leaderboard.rank', 'Rank')}</TableHead>
            <TableHead>{t('pages.leaderboard.learner', 'Learner')}</TableHead>
            <TableHead>Role</TableHead>
            <TableHead className="text-right">{t('pages.leaderboard.points', 'Points')}</TableHead>
            <TableHead className="text-right">{t('pages.leaderboard.streak', 'Streak')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <AnimatePresence initial={false}>
            {ranked.map((user, idx) => {
              const rank = idx + 1;
              const row = (
                <>
                  <TableCell>
                    <span
                      className={cn(
                        'inline-flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold',
                        rank === 1 &&
                          'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300',
                        rank === 2 &&
                          'bg-slate-200 text-slate-700 dark:bg-slate-500/20 dark:text-slate-300',
                        rank === 3 &&
                          'bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-300',
                        rank > 3 && 'bg-muted text-muted-foreground',
                      )}
                    >
                      {rank}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>
                          {user.name
                            .split(' ')
                            .map((n) => n[0])
                            .join('')
                            .slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-xs text-muted-foreground">{user.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="capitalize">
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-semibold tabular-nums">
                    <CountUp value={user.points} />
                  </TableCell>
                  <TableCell className="text-right">
                    <span className="inline-flex items-center gap-1 text-sm tabular-nums">
                      <Flame className="h-3.5 w-3.5 text-orange-500" />
                      {user.streak}
                    </span>
                  </TableCell>
                </>
              );
              if (reduced) {
                return <TableRow key={user.id}>{row}</TableRow>;
              }
              return (
                <motion.tr
                  key={user.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={SPRING.layout}
                  className={tableBodyRowClassName}
                >
                  {row}
                </motion.tr>
              );
            })}
          </AnimatePresence>
        </TableBody>
      </Table>
    </div>
  );
}
