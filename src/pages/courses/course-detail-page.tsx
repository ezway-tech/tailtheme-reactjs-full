import { Link, Navigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CheckCircle2, Circle, Clock, PlayCircle, Star } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Avatar,
  AvatarFallback,
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Progress,
} from '@/components/ui';
import { findCourse } from '@/mocks/fixtures';
import { urls } from '@/routes/urls';

export default function CourseDetailPage() {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const course = id ? findCourse(id) : undefined;

  if (!course) return <Navigate to={urls.errors.notFound} replace />;

  const totalMinutes = course.lessons.reduce((acc, l) => acc + l.durationMinutes, 0);
  const completedCount = course.lessons.filter((l) => l.completed).length;

  return (
    <div className="flex flex-col gap-6">
      <div
        className="relative overflow-hidden rounded-lg p-8"
        style={{
          background: `linear-gradient(135deg, hsl(${course.coverColor}) 0%, hsl(${course.coverColor} / 0.5) 100%)`,
        }}
      >
        <div className="relative z-10 max-w-3xl text-primary-foreground">
          <Badge className="mb-3 bg-white/20 text-white hover:bg-white/30">{course.category}</Badge>
          <h1 className="text-3xl font-semibold sm:text-4xl">{course.title}</h1>
          <p className="mt-2 text-white/80">{course.description}</p>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-white/90">
            <span className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-amber-300 text-amber-300" />
              {course.rating}
            </span>
            <span>{course.learners.toLocaleString()} learners</span>
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" /> {Math.round(totalMinutes / 60)}h {totalMinutes % 60}m
            </span>
            <span>Level: {course.level}</span>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>{t('pages.lesson.outline', 'Lesson outline')}</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="multiple" defaultValue={['mod']} className="w-full">
                <AccordionItem value="mod">
                  <AccordionTrigger>Curriculum · {course.lessons.length} lessons</AccordionTrigger>
                  <AccordionContent>
                    <ul className="divide-y divide-border">
                      {course.lessons.map((lesson) => (
                        <li key={lesson.id} className="flex items-center gap-3 py-2.5">
                          {lesson.completed ? (
                            <CheckCircle2 className="h-4 w-4 text-success-text" />
                          ) : (
                            <Circle className="h-4 w-4 text-muted-foreground" />
                          )}
                          <span className="flex-1 text-sm">{lesson.title}</span>
                          <span className="text-xs text-muted-foreground">
                            {lesson.durationMinutes}m
                          </span>
                          <Button asChild size="sm" variant="ghost" className="h-7 text-xs">
                            <Link to={urls.learn.lesson(lesson.id)}>
                              <PlayCircle className="h-3.5 w-3.5" />
                              Play
                            </Link>
                          </Button>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Progress value={course.progress} />
              <p className="text-sm text-muted-foreground">
                {completedCount} / {course.lessons.length} lessons complete
              </p>
              <Button asChild className="w-full">
                <Link to={urls.learn.lesson(course.lessons[0]?.id ?? 'demo')}>
                  {course.progress === 0
                    ? t('pages.courses.enroll', 'Enroll now')
                    : 'Continue learning'}
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link to={urls.learn.quiz('q-1')}>Take quiz</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Instructor</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback>
                  {course.instructor
                    .split(' ')
                    .map((n) => n[0])
                    .join('')
                    .slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="text-sm font-medium">{course.instructor}</div>
                <div className="text-xs text-muted-foreground">Lead instructor</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
