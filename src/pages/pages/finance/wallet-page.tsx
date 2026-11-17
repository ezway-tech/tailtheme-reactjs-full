import {
  ArrowDownLeft,
  ArrowUpRight,
  CreditCard,
  Plus,
  TrendingDown,
  TrendingUp,
} from 'lucide-react';
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Progress,
  Separator,
} from '@/components/ui';
import { PageHeader } from '@/components/patterns';
import { CountUp, MotionList, MotionListItem } from '@/components/motion';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { SPRING } from '@/lib/motion';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { useRef } from 'react';

const CARDS = [
  {
    id: 'c-1',
    label: 'Primary',
    number: '•••• 4242',
    holder: 'Alex Nguyen',
    expires: '08/29',
    brand: 'Visa',
  },
  {
    id: 'c-2',
    label: 'Savings',
    number: '•••• 8807',
    holder: 'Alex Nguyen',
    expires: '05/27',
    brand: 'Mastercard',
  },
];

const RECENT = [
  {
    id: 't-1',
    label: 'Netflix subscription',
    amount: -14.99,
    date: 'Today',
    kind: 'expense' as const,
  },
  {
    id: 't-2',
    label: 'Payroll — TailTheme Inc.',
    amount: 3450,
    date: 'Apr 15',
    kind: 'income' as const,
  },
  { id: 't-3', label: 'Grocery store', amount: -52.11, date: 'Apr 14', kind: 'expense' as const },
];

function TiltCard({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), SPRING.soft);
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), SPRING.soft);

  if (reduced) return <>{children}</>;
  return (
    <motion.div
      ref={ref}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      onMouseMove={(e) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        mx.set((e.clientX - rect.left) / rect.width - 0.5);
        my.set((e.clientY - rect.top) / rect.height - 0.5);
      }}
      onMouseLeave={() => {
        mx.set(0);
        my.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

export default function WalletPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Wallet"
        description="Balance, cards, and recent activity."
        actions={
          <Button>
            <Plus className="h-4 w-4" /> Add money
          </Button>
        }
      />

      <div className="grid gap-4 md:grid-cols-3">
        <div className="md:col-span-2">
          <TiltCard>
            <Card className="bg-gradient-to-br from-primary to-accent text-primary-foreground">
              <CardHeader>
                <CardDescription className="text-primary-foreground/80">
                  Total balance
                </CardDescription>
                <CountUp
                  value={12458.2}
                  decimals={2}
                  prefix="$"
                  duration={1.4}
                  className="text-4xl font-semibold"
                />
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <TrendingUp className="h-4 w-4" /> +3.2% vs last month
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <TrendingDown className="h-4 w-4" /> -1.1% vs last week
                </div>
              </CardContent>
            </Card>
          </TiltCard>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Spending budget</CardTitle>
            <CardDescription>April · $1,240 / $2,000</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Progress value={62} />
            <p className="text-xs text-muted-foreground">62% used — 8 days left</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Cards</CardTitle>
            <CardDescription>Manage payment methods</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {CARDS.map((c) => (
              <div
                key={c.id}
                className="flex items-center gap-3 rounded-md border border-border p-3"
              >
                <CreditCard className="h-5 w-5 text-muted-foreground" />
                <div className="flex-1">
                  <p className="text-sm font-medium">
                    {c.brand} {c.number}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {c.holder} · exp {c.expires}
                  </p>
                </div>
                <Badge variant="outline">{c.label}</Badge>
              </div>
            ))}
            <Button variant="outline" className="w-full">
              <Plus className="h-4 w-4" /> Add a new card
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent activity</CardTitle>
            <CardDescription>Last 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <MotionList stagger="tight" className="divide-y divide-border">
              {RECENT.map((t) => (
                <MotionListItem key={t.id} className="flex items-center gap-3 py-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted">
                    {t.kind === 'income' ? (
                      <ArrowDownLeft className="h-4 w-4 text-green-600" />
                    ) : (
                      <ArrowUpRight className="h-4 w-4 text-red-500" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{t.label}</p>
                    <p className="text-xs text-muted-foreground">{t.date}</p>
                  </div>
                  <span
                    className={
                      t.amount < 0 ? 'text-sm font-medium' : 'text-sm font-medium text-green-600'
                    }
                  >
                    {t.amount < 0 ? '' : '+'}${Math.abs(t.amount).toFixed(2)}
                  </span>
                </MotionListItem>
              ))}
            </MotionList>
            <Separator className="my-2" />
            <Button variant="ghost" className="w-full">
              View all transactions
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
