import { Link } from 'react-router-dom';
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui';
import { AuthFormBrand } from '@/components/auth/auth-form-brand';
import { urls } from '@/routes/urls';

export default function AccountLockedPage() {
  return (
    <Card>
      <CardHeader className="space-y-1 text-center">
        <AuthFormBrand className="pb-2" />
        <CardTitle className="text-2xl">Account temporarily locked</CardTitle>
        <CardDescription>
          Too many failed sign-in attempts. Try again in 15 minutes or reset your password.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button asChild className="w-full">
          <Link to={urls.auth.forgot}>Reset password</Link>
        </Button>
        <Button asChild variant="outline" className="w-full">
          <Link to={urls.auth.login}>Back to sign in</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
