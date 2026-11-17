import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslation } from 'react-i18next';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Label,
  RadioGroup,
  RadioGroupItem,
  Textarea,
  toast,
} from '@/components/ui';
import { PageHeader } from '@/components/patterns';
import { Shake } from '@/components/motion';
import { DURATION, EASE } from '@/lib/motion';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { cn } from '@/lib/cn';

const schema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  role: z.enum(['student', 'instructor', 'admin']),
  bio: z.string().max(280).optional(),
});

type Values = z.infer<typeof schema>;

const STEPS = ['Basics', 'Role', 'Bio', 'Review'] as const;

export default function FormWizardPage() {
  const { t } = useTranslation();
  const reduced = useReducedMotion();
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [shakeKey, setShakeKey] = useState(0);

  const form = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { fullName: '', email: '', role: 'student', bio: '' },
    mode: 'onChange',
  });

  const fieldsByStep = useMemo<Array<(keyof Values)[]>>(
    () => [['fullName', 'email'], ['role'], ['bio'], []],
    [],
  );

  const next = async () => {
    const fields = fieldsByStep[step];
    const valid = fields.length === 0 ? true : await form.trigger(fields);
    if (valid) {
      setDirection(1);
      setStep((s) => Math.min(s + 1, STEPS.length - 1));
    } else {
      setShakeKey((k) => k + 1);
    }
  };

  const back = () => {
    setDirection(-1);
    setStep((s) => Math.max(0, s - 1));
  };

  const onSubmit = (values: Values) => {
    toast.success(`Profile created for ${values.fullName}`);
    form.reset();
    setStep(0);
  };

  // eslint-disable-next-line react-hooks/incompatible-library -- react-hook-form watch() is intentionally not memoized
  const values = form.watch();

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title={t('pages.formWizard.title', 'Form wizard')}
        description={t('pages.formWizard.subtitle', 'Multi-step form with validation and summary.')}
      />
      <ol className="flex items-center gap-2 text-sm">
        {STEPS.map((label, idx) => (
          <li key={label} className="flex items-center gap-2">
            <span
              className={cn(
                'flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold',
                idx < step && 'bg-primary text-primary-foreground',
                idx === step &&
                  'border-2 border-primary bg-primary/10 text-primary shadow-sm ring-1 ring-primary/20',
                idx > step && 'border border-input bg-card text-foreground shadow-sm',
              )}
            >
              {idx < step ? <Check className="h-3 w-3" /> : idx + 1}
            </span>
            <span className={cn('text-foreground', idx === step && 'font-medium')}>{label}</span>
            {idx < STEPS.length - 1 ? (
              <span className="mx-1 h-px w-6 bg-border" aria-hidden />
            ) : null}
          </li>
        ))}
      </ol>
      <Card>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardHeader>
              <CardTitle>{STEPS[step]}</CardTitle>
              <CardDescription>
                {t('pages.formWizard.stepOf', { current: step + 1, total: STEPS.length })}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 overflow-hidden">
              <Shake trigger={shakeKey}>
                <AnimatePresence mode="wait" initial={false} custom={direction}>
                  <motion.div
                    key={step}
                    custom={direction}
                    initial={reduced ? false : { opacity: 0, x: direction * 32 }}
                    animate={reduced ? undefined : { opacity: 1, x: 0 }}
                    exit={reduced ? undefined : { opacity: 0, x: direction * -32 }}
                    transition={{ duration: DURATION.md, ease: EASE.out }}
                    className="space-y-4"
                  >
                    {step === 0 ? (
                      <>
                        <FormField
                          control={form.control}
                          name="fullName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full name</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input type="email" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </>
                    ) : null}

                    {step === 1 ? (
                      <FormField
                        control={form.control}
                        name="role"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Role</FormLabel>
                            <FormControl>
                              <RadioGroup
                                value={field.value}
                                onValueChange={field.onChange}
                                className="grid gap-2"
                              >
                                {(['student', 'instructor', 'admin'] as const).map((role) => (
                                  <Label
                                    key={role}
                                    htmlFor={role}
                                    className="flex cursor-pointer items-center gap-3 rounded-md border border-border p-3 hover:bg-muted"
                                  >
                                    <RadioGroupItem id={role} value={role} />
                                    <div>
                                      <div className="text-sm font-medium capitalize">{role}</div>
                                      <div className="text-xs text-muted-foreground">
                                        {role === 'student'
                                          ? 'Enroll in courses.'
                                          : role === 'instructor'
                                            ? 'Create and publish courses.'
                                            : 'Manage users and billing.'}
                                      </div>
                                    </div>
                                  </Label>
                                ))}
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    ) : null}

                    {step === 2 ? (
                      <FormField
                        control={form.control}
                        name="bio"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Short bio (optional)</FormLabel>
                            <FormControl>
                              <Textarea rows={5} maxLength={280} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    ) : null}

                    {step === 3 ? (
                      <dl className="grid gap-2 text-sm sm:grid-cols-2">
                        <dt className="text-muted-foreground">Full name</dt>
                        <dd className="font-medium">{values.fullName || '—'}</dd>
                        <dt className="text-muted-foreground">Email</dt>
                        <dd className="font-medium">{values.email || '—'}</dd>
                        <dt className="text-muted-foreground">Role</dt>
                        <dd className="font-medium capitalize">{values.role}</dd>
                        <dt className="text-muted-foreground">Bio</dt>
                        <dd className="whitespace-pre-wrap">{values.bio || '—'}</dd>
                      </dl>
                    ) : null}
                  </motion.div>
                </AnimatePresence>
              </Shake>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button type="button" variant="outline" onClick={back} disabled={step === 0}>
                <ArrowLeft className="h-3.5 w-3.5" />
                {t('pages.formWizard.back', 'Back')}
              </Button>
              {step < STEPS.length - 1 ? (
                <Button type="button" onClick={next}>
                  {t('pages.formWizard.next', 'Next')}
                  <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              ) : (
                <Button type="submit">{t('pages.formWizard.finish', 'Finish')}</Button>
              )}
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
