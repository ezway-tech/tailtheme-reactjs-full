import { useTranslation } from 'react-i18next';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui';
import { PageHeader } from '@/components/patterns';
import { ComponentApi } from '@/components/showcase/component-api';

const enrollmentData = [
  { month: 'Jan', enrolled: 240, completed: 120 },
  { month: 'Feb', enrolled: 310, completed: 180 },
  { month: 'Mar', enrolled: 420, completed: 260 },
  { month: 'Apr', enrolled: 390, completed: 240 },
  { month: 'May', enrolled: 520, completed: 310 },
  { month: 'Jun', enrolled: 610, completed: 400 },
];

const hoursData = enrollmentData.map((d, idx) => ({
  month: d.month,
  hours: 120 + idx * 40 + idx * idx * 8,
}));

const categoryData = [
  { category: 'Programming', value: 42 },
  { category: 'Design', value: 22 },
  { category: 'UX', value: 18 },
  { category: 'Accessibility', value: 12 },
  { category: 'Other', value: 6 },
];

const skillsData = [
  { skill: 'TS', score: 90 },
  { skill: 'React', score: 88 },
  { skill: 'CSS', score: 70 },
  { skill: 'A11y', score: 65 },
  { skill: 'Testing', score: 78 },
  { skill: 'Perf', score: 60 },
];

const PIE_COLORS = [
  'hsl(var(--color-primary-hsl, 205 70% 37%))',
  'hsl(var(--color-accent-hsl, 16 86% 54%))',
  'hsl(var(--color-info-hsl, 200 95% 46%))',
  'hsl(var(--color-success-hsl, 150 55% 42%))',
  'hsl(var(--color-warning-hsl, 38 95% 50%))',
];

function tooltipStyle() {
  return {
    background: 'hsl(var(--color-card-hsl, 0 0% 100%))',
    border: '1px solid hsl(var(--color-border-hsl, 220 13% 91%))',
    borderRadius: '0.5rem',
    fontSize: '0.75rem',
  } satisfies React.CSSProperties;
}

export default function ChartsShowcasePage() {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title={t('pages.charts.title', 'Charts')}
        description={t('pages.charts.subtitle', 'Powered by recharts using your brand palette.')}
      />
      <ComponentApi
        description={
          <>
            Charts are imported directly from <code>recharts</code> and themed via the app's CSS
            variables. Wrap every chart in a <code>{'<ResponsiveContainer />'}</code> placed inside
            a fixed-height parent (e.g. a <code>{'<Card>'}</code> with <code>h-72</code>).
          </>
        }
        importCode={[
          `import {`,
          `  ResponsiveContainer,`,
          `  LineChart, Line,`,
          `  AreaChart, Area,`,
          `  BarChart, Bar,`,
          `  PieChart, Pie, Cell,`,
          `  RadarChart, Radar, PolarGrid, PolarAngleAxis,`,
          `  CartesianGrid, XAxis, YAxis, Tooltip, Legend,`,
          `} from 'recharts';`,
        ]}
        propsTitle="Conventions"
        props={[
          {
            name: 'ResponsiveContainer',
            type: 'width="100%" height="100%"',
            description:
              'Always required. Place inside a parent with explicit height (CardContent className="h-72").',
          },
          {
            name: 'CartesianGrid stroke',
            type: 'string',
            description:
              'Use hsl(var(--color-border-hsl, 220 13% 91%)) for theme-aware grid lines.',
          },
          {
            name: 'XAxis / YAxis stroke',
            type: '"currentColor"',
            description: 'Inherits foreground color from the parent so axes adapt to dark mode.',
          },
          {
            name: 'Series stroke / fill',
            type: 'var(--color-…)',
            description:
              'Use brand variables (--color-primary, --color-accent, --color-success, --color-warning, --color-info) so charts follow the theme customizer.',
          },
          {
            name: 'Tooltip contentStyle',
            type: 'CSSProperties',
            description:
              'Helper `tooltipStyle()` produces card-surface tooltips. Use the shared instance for consistency across charts.',
          },
        ]}
        tokens={[
          {
            name: '--color-primary / --color-accent',
            description: 'Primary and secondary series.',
          },
          {
            name: '--color-info / --color-success / --color-warning',
            description: 'Categorical palette for pies / radars.',
          },
          {
            name: '--color-card-hsl / --color-border-hsl',
            description: 'Tooltip surface and grid lines.',
          },
          {
            name: 'currentColor',
            description: 'Axes inherit text color for dark/light mode parity.',
          },
        ]}
      />
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Line · Enrollment vs completion</CardTitle>
            <CardDescription>Monthly trend for 2026</CardDescription>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={enrollmentData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="hsl(var(--color-border-hsl, 220 13% 91%))"
                />
                <XAxis dataKey="month" fontSize={12} stroke="currentColor" />
                <YAxis fontSize={12} stroke="currentColor" />
                <Tooltip contentStyle={tooltipStyle()} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="enrolled"
                  stroke="var(--color-primary)"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="completed"
                  stroke="var(--color-accent)"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Area · Learning hours</CardTitle>
            <CardDescription>Cumulative hours across cohorts</CardDescription>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={hoursData}>
                <defs>
                  <linearGradient id="fillHours" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.6} />
                    <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="hsl(var(--color-border-hsl, 220 13% 91%))"
                />
                <XAxis dataKey="month" fontSize={12} stroke="currentColor" />
                <YAxis fontSize={12} stroke="currentColor" />
                <Tooltip contentStyle={tooltipStyle()} />
                <Area
                  type="monotone"
                  dataKey="hours"
                  stroke="var(--color-primary)"
                  fill="url(#fillHours)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Bar · Enrollment by month</CardTitle>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={enrollmentData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="hsl(var(--color-border-hsl, 220 13% 91%))"
                />
                <XAxis dataKey="month" fontSize={12} stroke="currentColor" />
                <YAxis fontSize={12} stroke="currentColor" />
                <Tooltip contentStyle={tooltipStyle()} />
                <Bar dataKey="enrolled" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="completed" fill="var(--color-accent)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pie · Category breakdown</CardTitle>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  dataKey="value"
                  nameKey="category"
                  outerRadius={90}
                  innerRadius={40}
                  paddingAngle={2}
                >
                  {categoryData.map((entry, idx) => (
                    <Cell key={entry.category} fill={PIE_COLORS[idx % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={tooltipStyle()} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Radar · Skill coverage</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={skillsData}>
                <PolarGrid stroke="hsl(var(--color-border-hsl, 220 13% 91%))" />
                <PolarAngleAxis dataKey="skill" fontSize={12} stroke="currentColor" />
                <Radar
                  dataKey="score"
                  stroke="var(--color-primary)"
                  fill="var(--color-primary)"
                  fillOpacity={0.3}
                />
                <Tooltip contentStyle={tooltipStyle()} />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
