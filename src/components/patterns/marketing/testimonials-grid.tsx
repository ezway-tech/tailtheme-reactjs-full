import { cn } from '@/lib/cn';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  avatar?: string;
}

export interface TestimonialsGridProps {
  title?: string;
  description?: string;
  items: Testimonial[];
  className?: string;
}

/**
 * Three-column testimonial grid for landing pages.
 */
export function TestimonialsGrid({
  title = 'Loved by builders',
  description,
  items,
  className,
}: TestimonialsGridProps) {
  return (
    <section className={cn('bg-muted/30 px-6 py-16 md:py-20', className)}>
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <h2 className="text-h2">{title}</h2>
          {description ? (
            <p className="mt-3 text-body text-muted-foreground">{description}</p>
          ) : null}
        </div>
        <ul className="grid gap-6 md:grid-cols-3">
          {items.map((item) => (
            <li key={item.name}>
              <Card className="h-full border-border/80">
                <CardContent className="flex h-full flex-col gap-4 pt-6">
                  <p className="flex-1 text-sm leading-relaxed text-foreground">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      {item.avatar ? <AvatarImage src={item.avatar} alt="" /> : null}
                      <AvatarFallback>
                        {item.name
                          .split(' ')
                          .map((p) => p[0])
                          .join('')
                          .slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-semibold">{item.name}</p>
                      <p className="text-xs text-muted-foreground">{item.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
