import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button, Input, toast } from '@/components/ui';
import { cn } from '@/lib/cn';

const schema = z.object({
  email: z.string().email('Enter a valid email'),
});

type Values = z.infer<typeof schema>;

export interface NewsletterFormProps {
  className?: string;
  onSuccess?: () => void;
}

/**
 * Inline newsletter capture with validation and success state.
 */
export function NewsletterForm({ className, onSuccess }: NewsletterFormProps) {
  const [sent, setSent] = useState(false);
  const form = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { email: '' },
  });

  if (sent) {
    return (
      <p className={cn('text-sm text-success-text', className)}>
        Thanks — check your inbox to confirm your subscription.
      </p>
    );
  }

  return (
    <form
      className={cn('flex flex-col gap-2 sm:flex-row', className)}
      onSubmit={form.handleSubmit((values) => {
        toast.success(`Subscribed ${values.email} (demo)`);
        setSent(true);
        onSuccess?.();
      })}
    >
      <Input
        type="email"
        placeholder="you@company.com"
        aria-label="Email for newsletter"
        className="flex-1"
        {...form.register('email')}
      />
      <Button type="submit">Subscribe</Button>
    </form>
  );
}
