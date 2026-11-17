import { CheckCircle2, Circle } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Progress,
} from '@/components/ui';
import { PageHeader } from '@/components/patterns';
import { sampleCourses } from '@/mocks/fixtures';
import { cn } from '@/lib/cn';

const SKILLS = [
  { name: 'TypeScript', level: 78 },
  { name: 'React', level: 85 },
  { name: 'Design tokens', level: 62 },
  { name: 'Accessibility', level: 54 },
  { name: 'Testing', level: 48 },
];

export default function StudentProgressPage() {
  const enrolled = sampleCourses.slice(0, 3);

  return (
    <div className="space-y-6">
      <PageHeader
        title="My progress"
        description="Course completion and skill growth across your learning path."
      />

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Enrolled courses</CardTitle>
            <CardDescription>Continue where you left off.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {enrolled.map((c) => (
              <div key={c.id} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{c.title}</span>
                  <span className="text-muted-foreground">{c.progress}%</span>
                </div>
                <Progress value={c.progress} />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Skill tree</CardTitle>
            <CardDescription>Estimated mastery from quizzes and projects.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {SKILLS.map((s, i) => (
              <div key={s.name} className="flex items-center gap-3">
                {s.level >= 70 ? (
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-success" aria-hidden />
                ) : (
                  <Circle
                    className={cn(
                      'h-5 w-5 shrink-0',
                      i === 0 ? 'text-primary' : 'text-muted-foreground',
                    )}
                    aria-hidden
                  />
                )}
                <div className="flex-1 space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>{s.name}</span>
                    <span className="text-muted-foreground">{s.level}%</span>
                  </div>
                  <Progress value={s.level} className="h-1.5" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
