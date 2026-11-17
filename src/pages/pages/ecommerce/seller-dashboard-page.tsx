import { Link } from 'react-router-dom';
import { DollarSign, Package, TrendingUp, Users } from 'lucide-react';
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui';
import { PageHeader } from '@/components/patterns';
import { StatCard } from '@/components/ui';
import { sampleOrders } from '@/mocks/fixtures';
import { urls } from '@/routes/urls';

export default function SellerDashboardPage() {
  const recent = sampleOrders.slice(0, 5);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Seller dashboard"
        description="Revenue, orders, and fulfillment at a glance."
        actions={
          <Button asChild size="sm" variant="outline">
            <Link to={urls.app.pages.ecommerce.inventory}>Manage inventory</Link>
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Revenue (30d)"
          value="$12,480"
          icon={DollarSign}
          delta="+8.2%"
          trend="up"
        />
        <StatCard label="Orders" value="186" icon={Package} delta="+12" trend="up" />
        <StatCard label="Conversion" value="3.4%" icon={TrendingUp} delta="+0.3%" trend="up" />
        <StatCard label="Customers" value="1,024" icon={Users} delta="+41" trend="up" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Recent orders</CardTitle>
          <CardDescription>Latest transactions across your storefront.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table framed={false}>
            <TableHeader>
              <TableRow>
                <TableHead>Order</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recent.map((o) => (
                <TableRow key={o.id}>
                  <TableCell>
                    <Link
                      to={urls.app.pages.ecommerce.orderDetail(o.id)}
                      className="font-mono text-sm hover:text-text-brand"
                    >
                      {o.id}
                    </Link>
                  </TableCell>
                  <TableCell>{o.customer}</TableCell>
                  <TableCell>${o.total}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">
                      {o.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
