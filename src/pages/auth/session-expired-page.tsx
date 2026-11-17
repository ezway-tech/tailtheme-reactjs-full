import { Link } from 'react-router-dom';
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui';
import { AuthFormBrand } from '@/components/auth/auth-form-brand';
import { urls } from '@/routes/urls';

export default function SessionExpiredPage() {
  return (
    <Card>
      <CardHeader className="space-y-1 text-center">
        <AuthFormBrand className="pb-2" />
        <CardTitle className="text-2xl">Session expired</CardTitle>
        <CardDescription>
          For your security, you were signed out after a period of inactivity. Sign in again to
          continue.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button asChild className="w-full">
          <Link to={urls.auth.login}>Sign in again</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
