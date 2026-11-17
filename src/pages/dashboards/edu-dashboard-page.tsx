import * as React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  BookOpen,
  CheckCircle2,
  Circle,
  Clock,
  Download,
  GraduationCap,
  Layers,
  PenLine,
  Route as RouteIcon,
  Users,
} from 'lucide-react';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import {
  Avatar,
  AvatarFallback,
  Badge,
  Button,
  Calendar,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Progress,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  StatCard,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui';
import { PageHeader } from '@/components/patterns';
import { GradientText, Reveal, StaggerGrid } from '@/components/motion';
import { cn } from '@/lib/cn';
import { urls } from '@/routes/urls';
import { sampleCourses, sampleUsers } from '@/mocks/fixtures';

function tooltipStyle(): React.CSSProperties {
  return {
    background: 'hsl(var(--color-card-hsl, 0 0% 100%))',
    border: '1px solid hsl(var(--color-border-hsl, 220 13% 91%))',
    borderRadius: '0.5rem',
    fontSize: '0.75rem',
  };
}

const ENROLLMENT = [
  { m: 'Jan', enrolled: 240, completed: 120 },
  { m: 'Feb', enrolled: 310, completed: 180 },
  { m: 'Mar', enrolled: 420, completed: 260 },
];

/** Demo skill radar — cohort average */
const SKILL_RADAR = [
  { skill: 'TS', score: 88 },
  { skill: 'React', score: 86 },
  { skill: 'CSS', score: 72 },
  { skill: 'A11y', score: 78 },
  { skill: 'Test', score: 64 },
];

const PATH_STEPS = [
  { id: 's1', title: 'Types & generics', done: true },
  { id: 's2', title: 'Component patterns', done: true },
  { id: 's3', title: 'Data fetching', done: false, current: true },
  { id: 's4', title: 'Capstone project', done: false },
];

const WEEK_AGENDA = [
  { time: '09:00', label: 'Async patterns · live', accent: false },
  { time: '11:30', label: 'Peer review breakout', accent: false },
  { time: '14:00', title: '', label: 'Quiz window closes', accent: true },
  { time: '16:00', label: 'Office hours · Q&A', accent: false },
];

const QUIZ_ATTEMPTS = [
  { learner: 'Maria Garcia', course: 'Form Validation', score: '92%', at: '2h ago' },
  { learner: 'Hiro Tanaka', course: 'Design Systems', score: '88%', at: '5h ago' },
  { learner: 'Layla Ahmed', course: 'Accessibility', score: '95%', at: '1d ago' },
];

export default function EduDashboardPage() {
  const { t } = useTranslation();
  const [cal, setCal] = React.useState<Date | undefined>(new Date());

  const kpis = [
    {
      label: 'Active learners',
      value: '1,248',
      caption: 'vs prior 30d',
      delta: '+8.2%',
      trend: 'up' as const,
      sparkline: [980, 1020, 1100, 1150, 1220],
      icon: Users,
    },
    {
      label: 'Courses',
      value: '42',
      caption: '+3 launched',
      delta: '+3',
      trend: 'up' as const,
      sparkline: [38, 39, 40, 41, 42],
      icon: BookOpen,
    },
    {
      label: 'Hours learned',
      value: '8.9k',
      caption: 'This month',
      delta: '+12.4%',
      trend: 'up' as const,
      sparkline: [7200, 7600, 8000, 8400, 8920],
      icon: Clock,
    },
    {
      label: 'Avg completion',
      value: '74%',
      caption: 'Cohort weighted',
      delta: '+4.1%',
      trend: 'up' as const,
      sparkline: [68, 70, 72, 73, 74],
      icon: GraduationCap,
    },
  ];

  return (
    <div data-dash="edu" className="relative flex flex-col gap-8">
      <PageHeader
        title={t('pages.dashboards.edu.title', 'Edu')}
        description={
          <span className="inline-flex flex-wrap items-center gap-2">
            {t('pages.dashboards.edu.subtitle', 'Learning KPIs and cohort progression.')}{' '}
            <RouteIcon className="h-4 w-4 shrink-0 text-primary" aria-hidden />
            <GradientText staticOnly className="text-sm font-medium">
              {t('eduDash.pathTag', 'Structured path')}
            </GradientText>
          </span>
        }
        actions={
          <div className="flex flex-wrap gap-2">
            <Select defaultValue="30">
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">Last 7 days</SelectItem>
                <SelectItem value="30">Last 30 days</SelectItem>
                <SelectItem value="90">Last 90 days</SelectItem>
              </SelectContent>
            </Select>
            <Button type="button" variant="outline">
              <Download className="mr-2 h-4 w-4" /> Export
            </Button>
          </div>
        }
      />

      <Card className="border-emerald-500/25 bg-emerald-500/[0.04] shadow-none ring-1 ring-emerald-500/15 dark:bg-emerald-950/35 dark:ring-emerald-500/25">
        <CardHeader className="flex flex-row items-center gap-2 pb-3">
          <RouteIcon className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
          <CardTitle className="text-lg">
            {t('eduDash.currPath', 'Curriculum checkpoint')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="flex flex-col gap-0 sm:flex-row sm:flex-wrap sm:items-start sm:justify-between">
            {PATH_STEPS.map((step, i) => (
              <li
                key={step.id}
                className="relative flex min-w-[140px] flex-1 gap-3 sm:flex-col sm:items-center sm:text-center"
              >
                {i > 0 ? (
                  <div
                    className="absolute left-[11px] top-[-12px] h-3 w-px bg-border sm:left-1/2 sm:top-auto sm:hidden sm:h-0"
                    aria-hidden
                  />
                ) : null}
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-background shadow ring-2 ring-emerald-500/30">
                  {step.done ? (
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" aria-hidden />
                  ) : step.current ? (
                    <Circle className="h-4 w-4 fill-emerald-500/30 text-emerald-600" aria-hidden />
                  ) : (
                    <Circle className="h-4 w-4 text-muted-foreground" aria-hidden />
                  )}
                </span>
                <span
                  className={cn(
                    'text-sm font-medium leading-tight',
                    step.current ? 'text-foreground' : 'text-muted-foreground',
                  )}
                >
                  {step.title}
                  {step.current ? (
                    <Badge className="ml-2 align-middle text-[10px]" variant="outline">
                      {t('eduDash.now', 'Now')}
                    </Badge>
                  ) : null}
                </span>
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>

      <StaggerGrid
        className="grid gap-4 rounded-2xl border border-transparent bg-muted/30 p-1 sm:p-2 lg:grid-cols-4"
        stagger="normal"
      >
        {kpis.map((k) => (
          <StatCard key={k.label} {...k} className="bg-card shadow-sm ring-1 ring-border/50" />
        ))}
      </StaggerGrid>

      <div className="grid gap-4 xl:grid-cols-12">
        <Card className="relative overflow-hidden xl:col-span-7">
          <CardHeader>
            <CardTitle>{t('eduDash.enrollment', 'Enrollment vs completion')}</CardTitle>
            <CardDescription>2026 cohort</CardDescription>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={ENROLLMENT}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="hsl(var(--color-border-hsl, 220 13% 91%))"
                />
                <XAxis dataKey="m" fontSize={12} stroke="currentColor" />
                <YAxis fontSize={12} stroke="currentColor" />
                <Tooltip contentStyle={tooltipStyle()} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="enrolled"
                  name="Enrolled"
                  stroke="var(--color-primary)"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="completed"
                  name="Completed"
                  stroke="var(--color-accent)"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-dashed border-primary/20 bg-muted/20 xl:col-span-5">
          <CardHeader>
            <CardTitle>{t('eduDash.skillCoverage', 'Skill coverage')}</CardTitle>
            <CardDescription>
              {t('eduDash.skillCoverageDesc', 'Cohort proficiency snapshot')}
            </CardDescription>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={SKILL_RADAR}>
                <PolarGrid stroke="hsl(var(--color-border-hsl, 220 13% 91%))" />
                <PolarAngleAxis dataKey="skill" fontSize={11} stroke="currentColor" />
                <Radar
                  dataKey="score"
                  stroke="var(--color-primary)"
                  fill="var(--color-primary)"
                  fillOpacity={0.35}
                />
                <Tooltip contentStyle={tooltipStyle()} />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
        <Card className="lg:col-span-7">
          <CardHeader>
            <CardTitle>{t('pages.dashboard.continueLearning', 'Continue learning')}</CardTitle>
            <CardDescription>
              {t('eduDash.ringHint', 'Track — drag ring shows weekly goal')}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-5">
            {sampleCourses.slice(0, 4).map((course) => (
              <div
                key={course.id}
                className="flex flex-col gap-3 rounded-xl border border-border/80 bg-background/80 p-4 sm:flex-row sm:items-center"
              >
                <div
                  className="relative mx-auto grid h-[88px] w-[88px] shrink-0 place-items-center rounded-full bg-gradient-to-tr from-emerald-500/15 via-background to-transparent ring-8 ring-muted/80"
                  aria-hidden
                >
                  <span className="absolute inset-3 rounded-full border-4 border-muted" />
                  <span
                    className="absolute inset-3 rounded-full border-4 border-t-emerald-500 border-r-emerald-500/80 border-b-transparent border-l-transparent motion-safe:transition-transform"
                    style={{ transform: `rotate(${course.progress * 3.6 - 90}deg)` }}
                  />
                  <span className="relative text-lg font-semibold tabular-nums">
                    {course.progress}%
                  </span>
                </div>
                <div className="min-w-0 flex-1 space-y-2">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div className="font-semibold leading-snug">{course.title}</div>
                    <Badge variant="secondary">{course.level}</Badge>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {course.instructor} · {course.lessons.filter((l) => l.completed).length}/
                    {course.lessons.length} {t('eduDash.lessonsDone', 'lessons')}
                  </div>
                  <Progress value={course.progress} className="h-2" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="flex flex-col gap-4 lg:col-span-5">
          <Card className="border-l-[3px] border-l-primary shadow-sm">
            <CardHeader>
              <CardTitle>{t('eduDash.weekRail', 'This week · focus')}</CardTitle>
              <CardDescription>{t('eduDash.weekRailDesc', 'Time-aligned agenda')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-0">
              <ul className="space-y-0">
                {WEEK_AGENDA.map((slot) => (
                  <li
                    key={slot.time + slot.label}
                    className="flex gap-4 border-b border-border/60 py-3 last:border-0"
                  >
                    <span className="w-[3.25rem] shrink-0 font-mono text-xs tabular-nums text-muted-foreground">
                      {slot.time}
                    </span>
                    <div
                      className={cn(
                        'min-w-0 flex-1 border-l-2 pl-4',
                        slot.accent ? 'border-accent' : 'border-muted',
                      )}
                    >
                      <p
                        className={cn(
                          'text-sm font-medium',
                          slot.accent ? 'text-accent-foreground' : '',
                        )}
                      >
                        {slot.label}
                      </p>
                      {slot.accent ? (
                        <p className="text-xs text-muted-foreground">
                          {t('eduDash.reminder', 'Reminder')}
                        </p>
                      ) : null}
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">
                {t('eduDash.focusCal', 'Plan the sprint')}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center pb-4">
              <Calendar
                hideNextButton
                hidePreviousButton
                mode="single"
                selected={cal}
                onSelect={setCal}
              />
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>{t('eduDash.quizAttempts', 'Recent quiz attempts')}</CardTitle>
          </CardHeader>
          <CardContent>
            <Table framed={false}>
              <TableHeader>
                <TableRow>
                  <TableHead>Learner</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead className="text-right">When</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {QUIZ_ATTEMPTS.map((row) => (
                  <TableRow key={row.learner + row.course}>
                    <TableCell className="font-medium">{row.learner}</TableCell>
                    <TableCell>{row.course}</TableCell>
                    <TableCell>{row.score}</TableCell>
                    <TableCell className="text-right text-muted-foreground">{row.at}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t('eduDash.leaderboard', 'Leaderboard')}</CardTitle>
            <CardDescription>{t('pages.dashboard.thisWeek', 'This week')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[...sampleUsers]
              .sort((a, b) => b.points - a.points)
              .slice(0, 5)
              .map((user, idx) => (
                <Reveal key={user.id} delay={idx * 0.035} className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-muted-foreground">{idx + 1}</span>
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>
                      {user.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')
                        .slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1 truncate text-sm font-medium">{user.name}</div>
                  <span className="tabular-nums">{user.points.toLocaleString()} pts</span>
                </Reveal>
              ))}
            <Button className="w-full" variant="outline" asChild>
              <Link to={urls.app.pages.edu.leaderboard}>
                {t('eduDash.fullBoard', 'Full leaderboard')}
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 border-t border-dashed pt-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="p-4">
          <PenLine className="mb-3 h-4 w-4 text-muted-foreground" />
          <CardTitle className="mb-3 text-base">Assignments</CardTitle>
          <Button variant="outline" className="w-full" asChild>
            <Link to={urls.app.pages.edu.assignments}>
              {t('eduDash.assignments', 'Assignments due')}
            </Link>
          </Button>
        </Card>
        <Card className="p-4">
          <Layers className="mb-3 h-4 w-4 text-muted-foreground" />
          <CardTitle className="mb-3 text-base">Classes</CardTitle>
          <Button variant="outline" className="w-full" asChild>
            <Link to={urls.app.pages.edu.classes}>{t('eduDash.classesCta', 'Schedule')}</Link>
          </Button>
        </Card>
        <Card className="p-4">
          <GraduationCap className="mb-3 h-4 w-4 text-muted-foreground" />
          <CardTitle className="mb-3 text-base">Courses</CardTitle>
          <Button variant="outline" className="w-full" asChild>
            <Link to={urls.app.pages.edu.courses}>Browse</Link>
          </Button>
        </Card>
        <Card className="p-4">
          <BookOpen className="mb-3 h-4 w-4 text-muted-foreground" />
          <CardTitle className="mb-3 text-base">Quiz</CardTitle>
          <Button variant="outline" className="w-full" asChild>
            <Link to={urls.app.pages.edu.quizLink}>Practice</Link>
          </Button>
        </Card>
      </div>
    </div>
  );
}
