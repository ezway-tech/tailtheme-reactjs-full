import { useState } from 'react';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
  toast,
} from '@/components/ui';
import { PageContent, PageHeader } from '@/components/patterns';

const TRANSACTIONS = [
  { id: 'tx-1', label: 'Amazon — $42.18 · May 18' },
  { id: 'tx-2', label: 'Uber — $18.50 · May 17' },
  { id: 'tx-3', label: 'Unknown merchant — $199.00 · May 15' },
];

export default function DisputePage() {
  const [transaction, setTransaction] = useState('');
  const [reason, setReason] = useState('');

  function submit(e: React.FormEvent) {
    e.preventDefault();
    toast.success('Dispute submitted (demo)', { description: 'Case #DSP-4421 opened.' });
    setTransaction('');
    setReason('');
  }

  return (
    <PageContent width="narrow" className="space-y-6">
      <PageHeader
        title="Dispute a charge"
        description="Report unauthorized or incorrect transactions."
      />

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Dispute form</CardTitle>
          <CardDescription>We typically respond within 5 business days.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={submit} className="space-y-4">
            <div className="space-y-2">
              <Label>Transaction</Label>
              <Select value={transaction} onValueChange={setTransaction}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a transaction" />
                </SelectTrigger>
                <SelectContent>
                  {TRANSACTIONS.map((tx) => (
                    <SelectItem key={tx.id} value={tx.id}>
                      {tx.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="reason">Reason for dispute</Label>
              <Textarea
                id="reason"
                rows={4}
                placeholder="Describe why you are disputing this charge…"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />
            </div>
            <Button type="submit" disabled={!transaction || !reason.trim()}>
              Submit dispute
            </Button>
          </form>
        </CardContent>
      </Card>
    </PageContent>
  );
}
