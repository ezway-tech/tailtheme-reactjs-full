import { Link, useSearchParams } from 'react-router-dom';
import { CheckCircle2, Package, Truck } from 'lucide-react';
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui';
import { PageContent } from '@/components/patterns';
import { urls } from '@/routes/urls';

export default function OrderConfirmationPage() {
  const [params] = useSearchParams();
  const orderId = params.get('order') ?? 'ORD-1048';

  return (
    <PageContent width="narrow" className="space-y-6 py-8 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success/15">
        <CheckCircle2 className="h-9 w-9 text-success" aria-hidden />
      </div>
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Thank you for your order</h1>
        <p className="mt-2 text-muted-foreground">
          Confirmation sent to your email. Order{' '}
          <span className="font-mono font-medium text-foreground">{orderId}</span>
        </p>
      </div>

      <Card className="text-left">
        <CardHeader>
          <CardTitle className="text-base">What happens next</CardTitle>
          <CardDescription>Typical delivery timeline for demo orders.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-3">
            <Package className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
            <div>
              <p className="text-sm font-medium">Processing</p>
              <p className="text-sm text-muted-foreground">Within 24 hours</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Truck className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
            <div>
              <p className="text-sm font-medium">Shipped</p>
              <p className="text-sm text-muted-foreground">3–5 business days</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
        <Button asChild>
          <Link to={urls.app.pages.ecommerce.orderDetail(orderId)}>View order</Link>
        </Button>
        <Button asChild variant="outline">
          <Link to={urls.app.pages.ecommerce.storefront}>Continue shopping</Link>
        </Button>
      </div>
    </PageContent>
  );
}
