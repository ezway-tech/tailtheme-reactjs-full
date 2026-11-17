import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Progress,
  Sparkline,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui';
import { ShowcaseSection } from '@/components/showcase/showcase-section';

const DEMO = [
  {
    id: '1',
    name: 'Alice Nguyen',
    email: 'alice@tailtheme.dev',
    role: 'Admin',
    avatarUrl: undefined,
    score: 94,
    series: [12, 14, 13, 15, 16, 18],
  },
  {
    id: '2',
    name: 'Bob Tran',
    email: 'bob@tailtheme.dev',
    role: 'Member',
    avatarUrl: undefined,
    score: 72,
    series: [10, 11, 10, 12, 11, 13],
  },
  {
    id: '3',
    name: 'Chi Le',
    email: 'chi@tailtheme.dev',
    role: 'Member',
    avatarUrl: undefined,
    score: 88,
    series: [14, 15, 14, 16, 17, 18],
  },
  {
    id: '4',
    name: 'Dung Vo',
    email: 'dung@tailtheme.dev',
    role: 'Viewer',
    avatarUrl: undefined,
    score: 41,
    series: [8, 7, 9, 8, 9, 10],
  },
];

const WIDE_ROWS = Array.from({ length: 24 }, (_, i) => ({
  id: `w-${i}`,
  col1: `Row ${i + 1}`,
  col2: `Value ${(i % 5) + 1}`,
  col3: `Tag ${(i % 3) + 1}`,
  col4: `${1000 + i * 17}`,
  col5: `Note ${i % 4}`,
}));

export function VisualTab() {
  return (
    <div className="space-y-6">
      <ShowcaseSection
        block
        title="Striped rows"
        description="Even body rows get a subtle alternate background — pure CSS, no JS."
      >
        <Table className="[&_tbody_tr:nth-child(even)]:bg-muted/35">
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="text-right">Score</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {DEMO.map((row) => (
              <TableRow key={row.id}>
                <TableCell className="font-medium">{row.name}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell className="text-right tabular-nums">{row.score}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ShowcaseSection>

      <ShowcaseSection
        block
        title="Dense (compact)"
        description="Tighter header + cell padding for data-heavy screens."
      >
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="h-8 py-1 text-xs">Name</TableHead>
              <TableHead className="h-8 py-1 text-xs">Role</TableHead>
              <TableHead className="h-8 py-1 text-right text-xs">Score</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {DEMO.map((row) => (
              <TableRow key={row.id}>
                <TableCell className="py-1.5 text-xs">{row.name}</TableCell>
                <TableCell className="py-1.5 text-xs">{row.role}</TableCell>
                <TableCell className="py-1.5 text-right text-xs tabular-nums">
                  {row.score}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ShowcaseSection>

      <ShowcaseSection
        block
        title="Bordered grid"
        description="Full cell borders — useful for spreadsheets or dense comparisons."
      >
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="border border-border">Name</TableHead>
              <TableHead className="border border-border">Role</TableHead>
              <TableHead className="border border-border text-right">Score</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {DEMO.map((row) => (
              <TableRow key={row.id}>
                <TableCell className="border border-border">{row.name}</TableCell>
                <TableCell className="border border-border">{row.role}</TableCell>
                <TableCell className="border border-border text-right tabular-nums">
                  {row.score}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ShowcaseSection>

      <ShowcaseSection
        block
        title="Sticky header"
        description="Scroll the body; header stays pinned inside the scroll container (native overflow)."
      >
        <Table wrapperClassName="max-h-[220px] rounded-md border border-border">
          <TableHeader className="sticky top-0 z-10 shadow-[inset_0_-1px_0_0_hsl(var(--border))]">
            <TableRow>
              <TableHead className="bg-background">Col A</TableHead>
              <TableHead className="bg-background">Col B</TableHead>
              <TableHead className="bg-background">Col C</TableHead>
              <TableHead className="bg-background text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {WIDE_ROWS.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.col1}</TableCell>
                <TableCell>{row.col2}</TableCell>
                <TableCell>{row.col3}</TableCell>
                <TableCell className="text-right tabular-nums">{row.col4}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ShowcaseSection>

      <ShowcaseSection
        block
        title="Sticky first column"
        description="First column stays visible during horizontal scroll."
      >
        <div className="w-full max-w-full overflow-x-auto rounded-md border border-border">
          <Table className="min-w-[720px]">
            <TableHeader>
              <TableRow>
                <TableHead className="sticky left-0 z-20 min-w-[140px] bg-background shadow-[1px_0_0_0_hsl(var(--border))]">
                  Label
                </TableHead>
                <TableHead>Q1</TableHead>
                <TableHead>Q2</TableHead>
                <TableHead>Q3</TableHead>
                <TableHead>Q4</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {['North', 'South', 'East', 'West', 'Central'].map((region, i) => (
                <TableRow key={region}>
                  <TableCell className="sticky left-0 z-10 min-w-[140px] bg-background font-medium shadow-[1px_0_0_0_hsl(var(--border))]">
                    {region}
                  </TableCell>
                  <TableCell className="tabular-nums">{120 + i * 11}</TableCell>
                  <TableCell className="tabular-nums">{98 + i * 9}</TableCell>
                  <TableCell className="tabular-nums">{140 + i * 7}</TableCell>
                  <TableCell className="tabular-nums">{110 + i * 13}</TableCell>
                  <TableCell className="text-right tabular-nums">
                    {(120 + i * 11 + 98 + i * 9 + 140 + i * 7 + 110 + i * 13).toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        block
        title="Avatar & badges"
        description="Rich cells — identity + status at a glance."
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Score</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {DEMO.map((row) => (
              <TableRow key={row.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={row.avatarUrl} alt="" />
                      <AvatarFallback className="text-xs">
                        {row.name
                          .split(' ')
                          .map((p) => p[0])
                          .join('')
                          .slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="font-medium">{row.name}</span>
                      <span className="text-xs text-muted-foreground">{row.email}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">{row.role}</Badge>
                </TableCell>
                <TableCell className="tabular-nums">{row.score}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ShowcaseSection>

      <ShowcaseSection
        block
        title="Progress in cell"
        description="Completion or budget consumption at a glance."
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Project</TableHead>
              <TableHead>Budget used</TableHead>
              <TableHead className="w-[45%]">Progress</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[
              { name: 'Design system', pct: 72 },
              { name: 'Checkout revamp', pct: 45 },
              { name: 'Analytics MVP', pct: 91 },
            ].map((p) => (
              <TableRow key={p.name}>
                <TableCell className="font-medium">{p.name}</TableCell>
                <TableCell className="tabular-nums">{p.pct}%</TableCell>
                <TableCell>
                  <Progress value={p.pct} className="h-2" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ShowcaseSection>

      <ShowcaseSection
        block
        title="Sparkline in cell"
        description="Mini trend using `Sparkline` from StatCard — still not a full chart."
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Metric</TableHead>
              <TableHead className="text-right">Latest</TableHead>
              <TableHead className="w-[140px]">Trend</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {DEMO.map((row) => (
              <TableRow key={row.id}>
                <TableCell className="font-medium">{row.name}</TableCell>
                <TableCell className="text-right tabular-nums">
                  {row.series[row.series.length - 1]}
                </TableCell>
                <TableCell>
                  <Sparkline points={row.series} className="h-8 w-[120px]" tone="neutral" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ShowcaseSection>
    </div>
  );
}
