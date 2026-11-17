import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
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
  toast,
} from '@/components/ui';
import { AuthFormBrand } from '@/components/auth/auth-form-brand';
import { urls } from '@/routes/urls';

const schema = z
  .object({
    password: z.string().min(8, 'At least 8 characters'),
    confirm: z.string(),
  })
  .refine((v) => v.password === v.confirm, {
    message: 'Passwords must match',
    path: ['confirm'],
  });

type Values = z.infer<typeof schema>;

function passwordStrength(pw: string): number {
  let score = 0;
  if (pw.length >= 8) score += 25;
  if (/[A-Z]/.test(pw)) score += 25;
  if (/[0-9]/.test(pw)) score += 25;
  if (/[^A-Za-z0-9]/.test(pw)) score += 25;
  return score;
}

export default function ResetPasswordPage() {
  const { t } = useTranslation();
  const [params] = useSearchParams();
  const token = params.get('token') ?? 'demo-token';
  const [done, setDone] = useState(false);
  const form = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { password: '', confirm: '' },
  });
  const pw = useWatch({ control: form.control, name: 'password' }) ?? '';
  const strength = passwordStrength(pw);

  return (
    <Card>
      <CardHeader className="space-y-1 text-center">
        <AuthFormBrand className="pb-2" />
        <CardTitle className="text-2xl">
          {t('pages.resetPassword.title', 'Set a new password')}
        </CardTitle>
        <CardDescription>
          {t('pages.resetPassword.subtitle', 'Choose a strong password for your account.')}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {done ? (
          <div className="space-y-4 text-center text-sm">
            <p className="text-muted-foreground">Your password has been updated.</p>
            <Button asChild className="w-full">
              <Link to={urls.auth.login}>Sign in</Link>
            </Button>
          </div>
        ) : (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(() => {
                toast.success('Password updated (demo)');
                setDone(true);
              })}
              className="space-y-4"
            >
              <p className="rounded-md bg-muted px-3 py-2 text-xs text-muted-foreground">
                Reset token: <span className="font-mono">{token}</span>
              </p>
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New password</FormLabel>
                    <FormControl>
                      <Input type="password" autoComplete="new-password" {...field} />
                    </FormControl>
                    <Progress value={strength} className="h-1.5" />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirm"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm password</FormLabel>
                    <FormControl>
                      <Input type="password" autoComplete="new-password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Update password
              </Button>
            </form>
          </Form>
        )}
        <p className="text-center text-sm text-muted-foreground">
          <Link to={urls.auth.login} className="text-text-brand hover:underline">
            Back to sign in
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
