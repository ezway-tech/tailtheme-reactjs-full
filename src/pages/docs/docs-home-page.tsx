import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Palette, Rocket, Route } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui';
import { MotionCard, StaggerGrid } from '@/components/motion';
import { DocsSubtitle, DocsTitle } from './docs-prose';
import { urls } from '@/routes/urls';

const SECTIONS = [
  {
    to: urls.docs.gettingStarted,
    icon: Rocket,
    title: 'Getting started',
    desc: 'Install, env, scripts, and project structure.',
  },
  {
    to: urls.docs.configurationTheming,
    icon: Palette,
    title: 'Configuration & theming',
    desc: 'config.ts, tokens, preferences, dark mode, motion.',
  },
  {
    to: urls.docs.architectureRouting,
    icon: Route,
    title: 'Architecture & routing',
    desc: 'Layouts, URL map, nav trees, routes, UI imports.',
  },
];

export default function DocsHomePage() {
  const { t } = useTranslation();
  return (
    <div>
      <DocsTitle>{t('pages.docs.title', 'Documentation')}</DocsTitle>
      <DocsSubtitle>
        {t(
          'pages.docs.subtitle',
          'Three guides: install and tooling, configuration and theming, then architecture, routing, and where UI building blocks live.',
        )}
      </DocsSubtitle>
      <StaggerGrid className="grid gap-4 sm:grid-cols-2" stagger="normal">
        {SECTIONS.map((section) => {
          const Icon = section.icon;
          return (
            <MotionCard key={section.to} className="h-full">
              <Link
                to={section.to}
                className="group block rounded-lg border border-border bg-card transition-shadow hover:shadow-md"
              >
                <Card className="border-0 shadow-none">
                  <CardHeader>
                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <CardTitle className="mt-3 text-base">{section.title}</CardTitle>
                    <CardDescription>{section.desc}</CardDescription>
                  </CardHeader>
                  <CardContent className="text-xs text-primary">Read →</CardContent>
                </Card>
              </Link>
            </MotionCard>
          );
        })}
      </StaggerGrid>
    </div>
  );
}
