import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Search } from 'lucide-react';
import {
  Badge,
  Button,
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Input,
} from '@/components/ui';
import { PageHeader } from '@/components/patterns';
import { sampleVehicles } from '@/mocks/fixtures';
import { urls } from '@/routes/urls';

export default function MapSearchPage() {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return sampleVehicles;
    return sampleVehicles.filter(
      (v) =>
        v.make.toLowerCase().includes(q) ||
        v.model.toLowerCase().includes(q) ||
        v.type.toLowerCase().includes(q),
    );
  }, [query]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Map search"
        description="Browse vehicles near you — map placeholder with live listings."
      />

      <div className="grid gap-4 lg:grid-cols-2">
        <div
          className="flex min-h-[320px] items-center justify-center rounded-lg border border-border bg-muted/40"
          aria-label="Map placeholder"
        >
          <MapPin className="h-12 w-12 text-muted-foreground/50" />
          <span className="sr-only">Interactive map would render here</span>
        </div>

        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              className="pl-9"
              placeholder="Filter by make, model, or type…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          <ul className="max-h-[420px] space-y-3 overflow-y-auto pr-1">
            {filtered.length === 0 ? (
              <li className="text-sm text-muted-foreground">No vehicles match.</li>
            ) : (
              filtered.map((v) => (
                <li key={v.id}>
                  <Card>
                    <CardHeader className="flex flex-row items-center gap-3 pb-2">
                      <span className="text-3xl" aria-hidden>
                        {v.thumbnail}
                      </span>
                      <div>
                        <CardTitle className="text-base">
                          {v.year} {v.make} {v.model}
                        </CardTitle>
                        <CardDescription>
                          {v.type} · ${v.pricePerDay}/day
                        </CardDescription>
                      </div>
                      <Badge className="ml-auto">{v.transmission}</Badge>
                    </CardHeader>
                    <CardFooter className="pt-0">
                      <Button asChild size="sm" variant="outline">
                        <Link to={urls.app.pages.vehicle.detail}>View</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
