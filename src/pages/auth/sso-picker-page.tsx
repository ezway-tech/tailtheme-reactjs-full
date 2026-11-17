import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui';
import { AuthFormBrand } from '@/components/auth/auth-form-brand';
import { AuthSocialProviders } from '@/components/auth/auth-social-providers';
import { urls } from '@/routes/urls';

export default function SsoPickerPage() {
  return (
    <Card>
      <CardHeader className="space-y-1 text-center">
        <AuthFormBrand className="pb-2" />
        <CardTitle className="text-2xl">Sign in with SSO</CardTitle>
        <CardDescription>Choose your organization&apos;s identity provider.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <AuthSocialProviders intent="signin" preset="all" stackProviders oauthFirst />
        <p className="text-center text-sm text-muted-foreground">
          <Link to={urls.auth.login} className="text-primary underline-offset-4 hover:underline">
            Back to email sign in
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
