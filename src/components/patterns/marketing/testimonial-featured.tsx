import { cn } from '@/lib/cn';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export interface TestimonialFeaturedProps {
  quote: string;
  name: string;
  role: string;
  company?: string;
  avatar?: string;
  className?: string;
}

/** Single large testimonial for hero-adjacent social proof. */
export function TestimonialFeatured({
  quote,
  name,
  role,
  company,
  avatar,
  className,
}: TestimonialFeaturedProps) {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2);

  return (
    <section className={cn('px-6 py-16 md:py-20', className)}>
      <figure className="mx-auto max-w-3xl text-center">
        <blockquote className="text-h3 text-pretty font-medium leading-snug text-foreground">
          &ldquo;{quote}&rdquo;
        </blockquote>
        <figcaption className="mt-8 flex flex-col items-center gap-3">
          <Avatar className="h-14 w-14">
            {avatar ? <AvatarImage src={avatar} alt="" /> : null}
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{name}</p>
            <p className="text-sm text-muted-foreground">
              {role}
              {company ? ` · ${company}` : ''}
            </p>
          </div>
        </figcaption>
      </figure>
    </section>
  );
}
