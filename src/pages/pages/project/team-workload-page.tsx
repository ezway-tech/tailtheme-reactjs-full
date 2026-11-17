import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui';
import { PageHeader } from '@/components/patterns';

const PEOPLE = ['Alex', 'Maria', 'Hiro', 'Priya', 'Liam'];
const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

/** 0 = light, 4 = heavy workload */
const GRID: number[][] = [
  [2, 3, 4, 3, 1],
  [1, 2, 3, 4, 2],
  [3, 4, 4, 2, 1],
  [0, 1, 2, 3, 4],
  [2, 2, 3, 3, 2],
];

const INTENSITY = ['bg-muted', 'bg-primary/20', 'bg-primary/40', 'bg-primary/60', 'bg-primary'];

export default function TeamWorkloadPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Team workload"
        description="Capacity heatmap — darker cells mean more assigned hours."
      />

      <Card>
        <CardHeader>
          <CardTitle className="text-base">This week</CardTitle>
          <CardDescription>5 team members × 5 weekdays</CardDescription>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <div
            className="grid w-full min-w-[280px] gap-1.5"
            style={{
              gridTemplateColumns: `minmax(4.5rem, 7rem) repeat(${DAYS.length}, minmax(2.5rem, 1fr))`,
            }}
          >
            <div />
            {DAYS.map((day) => (
              <div key={day} className="text-center text-xs font-medium text-muted-foreground">
                {day}
              </div>
            ))}
            {PEOPLE.map((person, row) => (
              <div key={person} className="contents">
                <div className="flex items-center text-sm font-medium">{person}</div>
                {GRID[row]!.map((level, col) => (
                  <div
                    key={`${person}-${DAYS[col]}`}
                    className={`aspect-square w-full min-h-10 rounded-sm ${INTENSITY[level]}`}
                    title={`${person} · ${DAYS[col]}: level ${level}`}
                  />
                ))}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
