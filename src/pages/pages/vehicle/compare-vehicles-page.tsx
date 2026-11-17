import { useState } from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import {
  Button,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui';
import { PageHeader } from '@/components/patterns';
import { sampleVehicles, type SampleVehicle } from '@/mocks/fixtures';
import { urls } from '@/routes/urls';
import { cn } from '@/lib/cn';

const ROWS: { label: string; key: keyof SampleVehicle | 'price' }[] = [
  { label: 'Price / day', key: 'price' },
  { label: 'Type', key: 'type' },
  { label: 'Seats', key: 'seats' },
  { label: 'Fuel', key: 'fuel' },
  { label: 'Transmission', key: 'transmission' },
];

function cellValue(v: SampleVehicle, key: (typeof ROWS)[number]['key']) {
  if (key === 'price') return `$${v.pricePerDay}`;
  return String(v[key]);
}

export default function CompareVehiclesPage() {
  const [selected, setSelected] = useState<string[]>(['v-1', 'v-2', 'v-3']);

  const vehicles = sampleVehicles.filter((v) => selected.includes(v.id));

  function toggle(id: string) {
    setSelected((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= 3) return prev;
      return [...prev, id];
    });
  }

  return (
    <section className="space-y-6">
      <PageHeader
        title="Compare vehicles"
        description="Select up to 3 vehicles to compare specs side by side."
        actions={
          <Button asChild variant="outline" size="sm">
            <Link to={urls.app.pages.vehicle.listing}>Back to listing</Link>
          </Button>
        }
      />

      <section className="flex flex-wrap gap-3">
        {sampleVehicles.map((v) => {
          const isOn = selected.includes(v.id);
          return (
            <label
              key={v.id}
              className={cn(
                'flex cursor-pointer items-center gap-2 rounded-md border px-3 py-2 text-sm font-medium text-foreground shadow-sm transition-colors',
                isOn
                  ? 'border-primary bg-primary/10 ring-1 ring-primary/20'
                  : 'border-input bg-card hover:bg-muted/70',
              )}
            >
              <Checkbox checked={isOn} onCheckedChange={() => toggle(v.id)} />
              <span aria-hidden className="text-lg leading-none">
                {v.thumbnail}
              </span>
              <span>
                {v.make} {v.model}
              </span>
            </label>
          );
        })}
      </section>

      {vehicles.length < 2 ? (
        <p className="text-sm text-muted-foreground">Select at least two vehicles to compare.</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-40 min-w-[10rem] pl-6 text-foreground">Spec</TableHead>
              {vehicles.map((v) => (
                <TableHead key={v.id}>
                  <span className="text-2xl" aria-hidden>
                    {v.thumbnail}
                  </span>
                  <span className="mt-1 block font-medium text-foreground">
                    {v.year} {v.make} {v.model}
                  </span>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {ROWS.map(({ label, key }) => (
              <TableRow key={label}>
                <TableCell className="pl-6 font-medium text-foreground">{label}</TableCell>
                {vehicles.map((v) => (
                  <TableCell key={v.id} className="text-foreground">
                    {cellValue(v, key)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
            <TableRow>
              <TableCell className="pl-6" />
              {vehicles.map((v) => (
                <TableCell key={v.id}>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setSelected((s) => s.filter((id) => id !== v.id))}
                  >
                    <X className="h-4 w-4" /> Remove
                  </Button>
                </TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      )}
    </section>
  );
}
