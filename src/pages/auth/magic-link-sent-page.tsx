import { Link } from 'react-router-dom';
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui';
import { AuthFormBrand } from '@/components/auth/auth-form-brand';
import { urls } from '@/routes/urls';

export default function MagicLinkSentPage() {
  return (
    <Card>
      <CardHeader className="space-y-1 text-center">
        <AuthFormBrand className="pb-2" />
        <CardTitle className="text-2xl">Check your email</CardTitle>
        <CardDescription>
          We sent a magic link to <strong>alex@tailtheme.test</strong>. It expires in 15 minutes.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3 text-center text-sm text-muted-foreground">
        <p>Did not receive it? Check spam or request a new link.</p>
        <Button variant="outline" className="w-full">
          Resend link
        </Button>
        <Button asChild variant="link" className="text-text-brand">
          <Link to={urls.auth.login}>Use password instead</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
