import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { Building2, Check, Mail, Sparkles, Users } from 'lucide-react';
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
  Progress,
  Textarea,
  toast,
} from '@/components/ui';
import { AvatarUploadField, SelectableCard } from '@/components/patterns';
import { urls } from '@/routes/urls';

const schema = z.object({
  role: z.enum(['founder', 'developer', 'designer']),
  fullName: z.string().min(2),
  plan: z.enum(['starter', 'pro']),
  workspace: z.string().min(2),
  invites: z.string().optional(),
});

type Values = z.infer<typeof schema>;

const STEPS = ['Welcome', 'Profile', 'Plan', 'Workspace', 'Invite', 'Done'] as const;

export default function OnboardingPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const form = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: {
      role: 'founder',
      fullName: '',
      plan: 'pro',
      workspace: 'Acme Labs',
      invites: '',
    },
  });

  const progress = useMemo(() => ((step + 1) / STEPS.length) * 100, [step]);

  const next = async () => {
    if (step === 1) {
      const ok = await form.trigger(['fullName']);
      if (!ok) return;
    }
    if (step === 3) {
      const ok = await form.trigger(['workspace']);
      if (!ok) return;
    }
    if (step >= STEPS.length - 1) {
      toast.success('Workspace ready (demo)');
      void navigate(urls.app.dashboard);
      return;
    }
    setStep((s) => s + 1);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 px-4 py-12">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <div className="mb-2 flex items-center justify-between text-sm text-muted-foreground">
            <span>
              Step {step + 1} of {STEPS.length}
            </span>
            <span>{STEPS[step]}</span>
          </div>
          <Progress value={progress} className="h-1.5" />
          <CardTitle className="mt-4">
            {step === 0 && 'Welcome to TailTheme'}
            {step === 1 && 'Your profile'}
            {step === 2 && 'Choose a plan'}
            {step === 3 && 'Create your workspace'}
            {step === 4 && 'Invite teammates'}
            {step === 5 && 'You are all set'}
          </CardTitle>
          <CardDescription>
            {step === 0 && 'Pick how you will use the template.'}
            {step === 1 && 'Add a photo and display name.'}
            {step === 2 && 'Start free or trial Pro — change anytime.'}
            {step === 3 && 'A workspace groups billing and members.'}
            {step === 4 && 'Optional — comma-separated emails.'}
            {step === 5 && 'Explore dashboards or the UI showcase.'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            {step === 0 && (
              <fieldset className="grid gap-3">
                <SelectableCard
                  name="role"
                  value="founder"
                  type="radio"
                  defaultChecked
                  title="Founder / PM"
                  description="Ship product demos fast"
                  onCheckedChange={() => form.setValue('role', 'founder')}
                />
                <SelectableCard
                  name="role"
                  value="developer"
                  type="radio"
                  title="Developer"
                  description="Integrate APIs and auth"
                  onCheckedChange={() => form.setValue('role', 'developer')}
                />
                <SelectableCard
                  name="role"
                  value="designer"
                  type="radio"
                  title="Designer"
                  description="Tokens, Figma, and polish"
                  onCheckedChange={() => form.setValue('role', 'designer')}
                />
              </fieldset>
            )}
            {step === 1 && (
              <div className="space-y-4">
                <AvatarUploadField fallback="AN" />
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full name</FormLabel>
                      <FormControl>
                        <Input placeholder="Alex Nguyen" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}
            {step === 2 && (
              <fieldset className="grid gap-3">
                <SelectableCard
                  name="plan"
                  value="starter"
                  type="radio"
                  title="Starter"
                  description="Free forever"
                  price="$0"
                  onCheckedChange={() => form.setValue('plan', 'starter')}
                />
                <SelectableCard
                  name="plan"
                  value="pro"
                  type="radio"
                  defaultChecked
                  title="Pro"
                  description="14-day trial"
                  price="$29/mo"
                  badge="Recommended"
                  onCheckedChange={() => form.setValue('plan', 'pro')}
                />
              </fieldset>
            )}
            {step === 3 && (
              <FormField
                control={form.control}
                name="workspace"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Workspace name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            {step === 4 && (
              <FormField
                control={form.control}
                name="invites"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Mail className="h-4 w-4" /> Invite emails
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        rows={3}
                        placeholder="colleague@company.com, design@agency.io"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            {step === 5 && (
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-success-text" /> Profile saved
                </li>
                <li className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-primary" /> Workspace created
                </li>
                <li className="flex items-center gap-2 text-muted-foreground">
                  <Users className="h-4 w-4" /> Invites sent when you add emails
                </li>
              </ul>
            )}
          </Form>
        </CardContent>
        <CardFooter className="flex justify-between gap-2">
          <Button
            type="button"
            variant="outline"
            disabled={step === 0}
            onClick={() => setStep((s) => Math.max(0, s - 1))}
          >
            Back
          </Button>
          <Button type="button" onClick={() => void next()}>
            {step === 5 ? (
              <>
                <Sparkles className="mr-1 h-4 w-4" /> Go to dashboard
              </>
            ) : (
              'Continue'
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
