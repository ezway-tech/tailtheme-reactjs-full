import { useState } from 'react';
import { CreditCard } from 'lucide-react';
import {
  Badge,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Label,
  Switch,
} from '@/components/ui';
import { PageHeader } from '@/components/patterns';

const CARDS = [
  { id: 'c-1', label: 'Primary', number: '•••• 4242', brand: 'Visa', expires: '08/29' },
  { id: 'c-2', label: 'Travel', number: '•••• 8807', brand: 'Mastercard', expires: '05/27' },
  { id: 'c-3', label: 'Virtual', number: '•••• 1024', brand: 'Visa', expires: '12/28' },
];

export default function CardsPage() {
  const [frozen, setFrozen] = useState<Record<string, boolean>>({});

  return (
    <div className="space-y-6">
      <PageHeader title="Cards" description="Manage debit and credit cards." />

      <div className="grid gap-4 md:grid-cols-2">
        {CARDS.map((card) => (
          <Card key={card.id}>
            <CardHeader className="flex flex-row items-start gap-3 space-y-0">
              <CreditCard className="h-5 w-5 text-muted-foreground" />
              <div className="flex-1">
                <CardTitle className="text-base">
                  {card.brand} {card.number}
                </CardTitle>
                <CardDescription>Exp {card.expires}</CardDescription>
              </div>
              <Badge variant="outline">{card.label}</Badge>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <Label htmlFor={`freeze-${card.id}`}>Freeze card</Label>
              <Switch
                id={`freeze-${card.id}`}
                checked={frozen[card.id] ?? false}
                onCheckedChange={(checked) =>
                  setFrozen((prev) => ({ ...prev, [card.id]: checked }))
                }
              />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
