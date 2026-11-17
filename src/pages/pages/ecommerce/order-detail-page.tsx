import { Link, Navigate, useParams } from 'react-router-dom';
import { Package, Truck } from 'lucide-react';
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Separator,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui';
import { PageHeader } from '@/components/patterns';
import { sampleOrders, sampleProducts } from '@/mocks/fixtures';
import { urls } from '@/routes/urls';

export default function OrderDetailPage() {
  const { orderId } = useParams<{ orderId: string }>();
  const order = sampleOrders.find((o) => o.id === orderId) ?? sampleOrders[0];
  if (!order) return <Navigate to={urls.errors.notFound} replace />;

  const items = sampleProducts.slice(0, order.items);
  const subtotal = items.reduce((s, i) => s + i.price, 0);

  return (
    <div className="space-y-6">
      <PageHeader
        title={order.id}
        description={`Placed on ${order.placedAt} by ${order.customer}`}
        actions={
          <Button asChild variant="outline" size="sm">
            <Link to={urls.app.pages.ecommerce.orders}>Back to orders</Link>
          </Button>
        }
      />
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Package className="h-4 w-4" /> Items
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table framed={false}>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell className="font-medium">{p.name}</TableCell>
                    <TableCell className="text-muted-foreground">{p.category}</TableCell>
                    <TableCell className="text-right tabular-nums">${p.price}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <Badge>{order.status}</Badge>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Truck className="h-4 w-4" /> FedEx Tracking · 1ZA999ZZ
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="tabular-nums">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <Separator />
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span className="tabular-nums">${order.total.toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
