import { cn } from '@/lib/cn';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import type { Testimonial } from './testimonials-grid';

export interface TestimonialsMarqueeProps {
  items: Testimonial[];
  className?: string;
}

/**
 * Horizontally scrolling testimonials. Animation disabled when user prefers reduced motion.
 */
export function TestimonialsMarquee({ items, className }: TestimonialsMarqueeProps) {
  const reduced = useReducedMotion();
  const doubled = [...items, ...items];

  return (
    <section
      className={cn('overflow-hidden border-y border-border bg-muted/20 py-12', className)}
      aria-label="Customer testimonials"
    >
      <div
        className={cn(
          'flex w-max gap-4 px-4',
          reduced ? 'flex-wrap justify-center' : 'animate-marquee motion-reduce:animate-none',
        )}
      >
        {doubled.map((t, i) => (
          <figure
            key={`${t.name}-${i}`}
            className="w-72 shrink-0 rounded-lg border border-border bg-card p-5 shadow-sm"
          >
            <blockquote className="text-sm text-foreground">&ldquo;{t.quote}&rdquo;</blockquote>
            <figcaption className="mt-3 text-xs text-muted-foreground">
              <span className="font-medium text-foreground">{t.name}</span> — {t.role}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
