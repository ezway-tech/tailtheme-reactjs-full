import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
  Separator,
} from '@/components/ui';
import { PageHeader } from '@/components/patterns';
import { CountUp } from '@/components/motion';
import { SPRING } from '@/lib/motion';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { sampleProducts } from '@/mocks/fixtures';
import { urls } from '@/routes/urls';

const INITIAL = sampleProducts.slice(0, 3).map((p, i) => ({ ...p, qty: i + 1 }));

export default function CartPage() {
  const reduced = useReducedMotion();
  const [items, setItems] = useState(INITIAL);

  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = subtotal > 50 ? 0 : 5;
  const tax = Math.round(subtotal * 0.08 * 100) / 100;
  const total = subtotal + shipping + tax;

  const updateQty = (id: string, delta: number) => {
    setItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, qty: Math.max(1, it.qty + delta) } : it)),
    );
  };
  const remove = (id: string) => setItems((prev) => prev.filter((i) => i.id !== id));

  return (
    <div className="space-y-6">
      <PageHeader
        title="Cart"
        description={`${items.length} item${items.length === 1 ? '' : 's'} in your cart`}
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-3 lg:col-span-2">
          <AnimatePresence initial={false}>
            {items.map((it) => {
              const inner = (
                <Card>
                  <CardContent className="flex gap-4 p-4">
                    <div className="h-20 w-20 shrink-0 overflow-hidden rounded-md bg-muted">
                      <img src={it.image} alt={it.name} className="h-full w-full object-cover" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="font-medium">{it.name}</p>
                          <p className="text-xs text-muted-foreground">{it.category}</p>
                        </div>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => remove(it.id)}
                          aria-label="Remove"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex items-center justify-between pt-1">
                        <div className="flex items-center gap-1">
                          <Button
                            size="icon"
                            variant="outline"
                            className="h-7 w-7"
                            onClick={() => updateQty(it.id, -1)}
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </Button>
                          <CountUp
                            value={it.qty}
                            duration={0.4}
                            className="w-6 text-center tabular-nums"
                          />
                          <Button
                            size="icon"
                            variant="outline"
                            className="h-7 w-7"
                            onClick={() => updateQty(it.id, 1)}
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                        <span className="font-medium tabular-nums">
                          ${(it.price * it.qty).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
              if (reduced) return <div key={it.id}>{inner}</div>;
              return (
                <motion.div
                  key={it.id}
                  layout
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -16, scale: 0.98 }}
                  transition={SPRING.layout}
                >
                  {inner}
                </motion.div>
              );
            })}
          </AnimatePresence>
          {items.length === 0 ? (
            <div className="rounded-md border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
              Your cart is empty.{' '}
              <Link
                to={urls.app.pages.ecommerce.storefront}
                className="text-primary hover:underline"
              >
                Continue shopping
              </Link>
            </div>
          ) : null}
        </div>

        <Card className="h-fit">
          <CardHeader>
            <CardTitle>Order summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="tabular-nums">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Shipping</span>
              <span className="tabular-nums">
                {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
              </span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Tax</span>
              <span className="tabular-nums">${tax.toFixed(2)}</span>
            </div>
            <div className="flex gap-2">
              <Input placeholder="Promo code" />
              <Button variant="outline">Apply</Button>
            </div>
            <Separator />
            <div className="flex justify-between text-base font-semibold">
              <span>Total</span>
              <CountUp
                value={total}
                decimals={2}
                prefix="$"
                duration={0.6}
                className="tabular-nums"
              />
            </div>
            <Button asChild className="w-full" disabled={items.length === 0}>
              <Link to={urls.app.pages.ecommerce.checkout}>Checkout</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
