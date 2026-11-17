import { Star } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Progress,
} from '@/components/ui';
import { PageHeader } from '@/components/patterns';
import { vehicleAverageRating, vehicleRatingBreakdown, vehicleReviews } from '@/mocks/fixtures';

const totalReviews = vehicleRatingBreakdown.reduce((n, r) => n + r.count, 0);

export default function VehicleReviewsPage() {
  return (
    <section className="space-y-6">
      <PageHeader title="Reviews" description="Guest ratings and feedback for your fleet." />

      <section className="grid gap-6 lg:grid-cols-[240px_1fr]">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-3xl">
              {vehicleAverageRating}
              <Star className="h-6 w-6 fill-primary text-primary" aria-hidden />
            </CardTitle>
            <CardDescription>{totalReviews} reviews</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {vehicleRatingBreakdown.map((row) => (
              <section key={row.stars} className="flex items-center gap-2 text-sm">
                <span className="w-8">{row.stars}★</span>
                <Progress value={(row.count / totalReviews) * 100} className="h-2 flex-1" />
                <span className="w-8 text-muted-foreground">{row.count}</span>
              </section>
            ))}
          </CardContent>
        </Card>

        <ul className="space-y-3">
          {vehicleReviews.map((r) => (
            <li key={r.id}>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">{r.title}</CardTitle>
                  <CardDescription>
                    {r.author} · {r.date} · {r.rating}/5
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">{r.body}</CardContent>
              </Card>
            </li>
          ))}
        </ul>
      </section>
    </section>
  );
}
