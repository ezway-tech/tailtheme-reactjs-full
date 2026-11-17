import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Star, Users } from 'lucide-react';
import {
  Badge,
  Button,
  Card,
  CardContent,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui';
import { PageHeader } from '@/components/patterns';
import { sampleCourses } from '@/mocks/fixtures';
import { urls } from '@/routes/urls';
import { cn } from '@/lib/cn';
import { MotionCard, StaggerGrid } from '@/components/motion';

export default function CoursesPage() {
  const { t } = useTranslation();
  const [query, setQuery] = useState('');
  const [level, setLevel] = useState<string>('all');
  const [category, setCategory] = useState<string>('all');

  const categories = useMemo(() => Array.from(new Set(sampleCourses.map((c) => c.category))), []);

  const filtered = useMemo(() => {
    return sampleCourses.filter((c) => {
      const matchQuery = `${c.title} ${c.description}`.toLowerCase().includes(query.toLowerCase());
      const matchLevel = level === 'all' || c.level === level;
      const matchCategory = category === 'all' || c.category === category;
      return matchQuery && matchLevel && matchCategory;
    });
  }, [query, level, category]);

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title={t('pages.courses.title', 'Courses')}
        description={t('pages.courses.subtitle', 'Browse and enroll in courses.')}
      />

      <div className="flex flex-wrap items-center gap-2">
        <Input
          placeholder="Search courses…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="max-w-xs"
        />
        <Select value={level} onValueChange={setLevel}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All levels</SelectItem>
            <SelectItem value="beginner">Beginner</SelectItem>
            <SelectItem value="intermediate">Intermediate</SelectItem>
            <SelectItem value="advanced">Advanced</SelectItem>
          </SelectContent>
        </Select>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All categories</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <StaggerGrid
        key={`${query}|${level}|${category}`}
        className="grid gap-4 md:grid-cols-2 xl:grid-cols-3"
        stagger="normal"
      >
        {filtered.map((course) => (
          <MotionCard key={course.id} className="h-full">
            <Card className="flex h-full flex-col overflow-hidden">
              <div
                className="h-32 w-full"
                style={{
                  background: `linear-gradient(135deg, hsl(${course.coverColor}) 0%, hsl(${course.coverColor} / 0.6) 100%)`,
                }}
              />
              <CardContent className="flex flex-1 flex-col gap-3 p-4">
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">{course.category}</Badge>
                  <span
                    className={cn(
                      'text-xs font-medium',
                      course.level === 'beginner' && 'text-success-text',
                      course.level === 'intermediate' && 'text-info-text',
                      course.level === 'advanced' && 'text-warning-text',
                    )}
                  >
                    {course.level}
                  </span>
                </div>
                <h3 className="line-clamp-2 text-lg font-semibold">{course.title}</h3>
                <p className="line-clamp-2 flex-1 text-sm text-muted-foreground">
                  {course.description}
                </p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" /> {course.rating}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="h-3.5 w-3.5" /> {course.learners.toLocaleString()}
                  </span>
                  <span>{course.lessons.length} lessons</span>
                </div>
                <Button asChild size="sm" className="mt-auto">
                  <Link to={urls.app.courseDetail(course.id)}>View course</Link>
                </Button>
              </CardContent>
            </Card>
          </MotionCard>
        ))}
      </StaggerGrid>
      {filtered.length === 0 ? (
        <div className="rounded-md border border-dashed border-border py-10 text-center text-sm text-muted-foreground">
          No courses match your filters.
        </div>
      ) : null}
    </div>
  );
}
