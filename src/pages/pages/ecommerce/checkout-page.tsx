import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Lock } from 'lucide-react';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
  Label,
  RadioGroup,
  RadioGroupItem,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Separator,
  toast,
} from '@/components/ui';
import { PageHeader } from '@/components/patterns';
import { Confetti } from '@/components/motion';
import { urls } from '@/routes/urls';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [celebrate, setCelebrate] = useState(false);

  function handlePlaceOrder(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    window.setTimeout(() => {
      setSubmitting(false);
      setCelebrate(true);
      toast.success('Order placed — confirmation sent to your email.');
      window.setTimeout(() => {
        setCelebrate(false);
        void navigate(`${urls.app.pages.ecommerce.orderConfirmation}?order=ORD-1048`);
      }, 1200);
    }, 900);
  }

  return (
    <div className="relative space-y-6">
      {celebrate ? <Confetti fire particles={40} duration={2} /> : null}
      <PageHeader title="Checkout" description="Complete your purchase. All fields are required." />

      <form onSubmit={handlePlaceOrder} className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Contact</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="you@example.com" required />
              </div>
              <div>
                <Label htmlFor="first">First name</Label>
                <Input id="first" required />
              </div>
              <div>
                <Label htmlFor="last">Last name</Label>
                <Input id="last" required />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Shipping address</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <Label htmlFor="addr">Street address</Label>
                <Input id="addr" required />
              </div>
              <div>
                <Label htmlFor="city">City</Label>
                <Input id="city" required />
              </div>
              <div>
                <Label htmlFor="zip">ZIP</Label>
                <Input id="zip" required />
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="country">Country</Label>
                <Select defaultValue="US">
                  <SelectTrigger id="country">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="US">United States</SelectItem>
                    <SelectItem value="VN">Vietnam</SelectItem>
                    <SelectItem value="JP">Japan</SelectItem>
                    <SelectItem value="DE">Germany</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Payment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <RadioGroup defaultValue="card" className="grid gap-2 sm:grid-cols-3">
                <Label
                  htmlFor="pm-card"
                  className="flex cursor-pointer items-center gap-2 rounded-md border border-border p-3 [&:has([data-state=checked])]:border-primary"
                >
                  <RadioGroupItem id="pm-card" value="card" />
                  <CreditCard className="h-4 w-4" /> Card
                </Label>
                <Label
                  htmlFor="pm-paypal"
                  className="flex cursor-pointer items-center gap-2 rounded-md border border-border p-3 [&:has([data-state=checked])]:border-primary"
                >
                  <RadioGroupItem id="pm-paypal" value="paypal" />
                  PayPal
                </Label>
                <Label
                  htmlFor="pm-bank"
                  className="flex cursor-pointer items-center gap-2 rounded-md border border-border p-3 [&:has([data-state=checked])]:border-primary"
                >
                  <RadioGroupItem id="pm-bank" value="bank" />
                  Bank transfer
                </Label>
              </RadioGroup>
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="sm:col-span-3">
                  <Label htmlFor="cc">Card number</Label>
                  <Input id="cc" placeholder="•••• •••• •••• ••••" required />
                </div>
                <div>
                  <Label htmlFor="exp">Expiry</Label>
                  <Input id="exp" placeholder="MM/YY" required />
                </div>
                <div>
                  <Label htmlFor="cvv">CVV</Label>
                  <Input id="cvv" placeholder="123" required />
                </div>
                <div className="sm:col-span-3 flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Lock className="h-3.5 w-3.5" /> Encrypted with TLS
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="h-fit">
          <CardHeader>
            <CardTitle className="text-base">Order summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span>3 items</span>
              <span className="tabular-nums">$215.00</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Tax</span>
              <span className="tabular-nums">$17.20</span>
            </div>
            <Separator />
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span className="tabular-nums">$232.20</span>
            </div>
            <Button type="submit" className="w-full" loading={submitting}>
              Place order
            </Button>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
