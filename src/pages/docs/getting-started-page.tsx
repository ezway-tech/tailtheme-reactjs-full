import { Link } from 'react-router-dom';
import {
  DocsBlock,
  DocsCallout,
  DocsCode,
  DocsFooter,
  DocsH2,
  DocsH3,
  DocsList,
  DocsP,
  DocsSubtitle,
  DocsTitle,
} from './docs-prose';
import { urls } from '@/routes/urls';

export default function GettingStartedPage() {
  return (
    <div>
      <DocsTitle>Getting started</DocsTitle>
      <DocsSubtitle>
        Clone the template, install dependencies, configure environment variables, and run the dev
        server. White-label defaults (name, colors, storage keys) live in{' '}
        <DocsCode>src/config.ts</DocsCode>.
      </DocsSubtitle>

      <DocsH2>Prerequisites</DocsH2>
      <DocsList>
        <li>
          Node.js <DocsCode>&gt;= 20</DocsCode> (LTS 22 recommended)
        </li>
        <li>npm (pnpm or bun work too)</li>
      </DocsList>

      <DocsH2>Install</DocsH2>
      <DocsP>
        The template uses <DocsCode>npm</DocsCode> by default. Other managers (pnpm, bun) work the
        same way.
      </DocsP>
      <DocsBlock>
        {`# clone the repo
git clone <your-fork> my-app
cd my-app

# install + start dev
npm install
npm run dev`}
      </DocsBlock>

      <DocsH2>Environment variables</DocsH2>
      <DocsP>
        Copy <DocsCode>.env.example</DocsCode> to <DocsCode>.env</DocsCode> at the repo root. Vite
        exposes only variables prefixed with <DocsCode>VITE_</DocsCode>.
      </DocsP>
      <DocsList>
        <li>
          <DocsCode>VITE_APP_PORT</DocsCode> — dev server port (see{' '}
          <DocsCode>vite.config.ts</DocsCode>)
        </li>
        <li>
          <DocsCode>VITE_API_BASE_URL</DocsCode> — base URL for your backend (when you wire a real
          API)
        </li>
        <li>
          <DocsCode>VITE_USE_API_MOCK</DocsCode> — toggle mock responses during development
        </li>
        <li>
          <DocsCode>APP_URL</DocsCode> — optional public site URL for metadata or redirects
        </li>
      </DocsList>
      <DocsCallout title="Note">
        Product title, default theme colors, motion defaults, and <DocsCode>localStorage</DocsCode>{' '}
        keys are <strong>not</strong> read from <DocsCode>.env</DocsCode> — set them in{' '}
        <DocsCode>src/config.ts</DocsCode> so forks stay easy to grep and ship.
      </DocsCallout>

      <DocsH2>Project scripts</DocsH2>
      <DocsList>
        <li>
          <DocsCode>npm run dev</DocsCode> — start the Vite dev server
        </li>
        <li>
          <DocsCode>npm run build</DocsCode> — production build (outputs to{' '}
          <DocsCode>dist/</DocsCode>)
        </li>
        <li>
          <DocsCode>npm run typecheck</DocsCode> — strict TypeScript check
        </li>
        <li>
          <DocsCode>npm run lint</DocsCode> — ESLint with Prettier rules
        </li>
        <li>
          <DocsCode>npm run test</DocsCode> — Vitest in watch mode
        </li>
        <li>
          <DocsCode>npm run test:run</DocsCode> — Vitest single run (CI-friendly)
        </li>
        <li>
          <DocsCode>npm run build:analyze</DocsCode> — production build + bundle report
        </li>
      </DocsList>

      <DocsH2>Where things live</DocsH2>
      <DocsH3>In-app documentation</DocsH3>
      <DocsP>
        You are reading the docs section under <DocsCode>/app/docs</DocsCode>. It mirrors the same
        AppShell as the rest of the template so buyers can preview layout, i18n, and theming while
        reading.
      </DocsP>
      <DocsH3>UI Elements</DocsH3>
      <DocsP>
        Interactive token tables, primitives, patterns, and motion demos live under{' '}
        <DocsCode>/app/ui</DocsCode>. Open{' '}
        <Link
          to={urls.app.ui.root}
          className="font-medium text-primary underline underline-offset-2"
        >
          UI Elements
        </Link>{' '}
        from the sidebar when the dev server is running.
      </DocsP>
      <DocsH3>Internationalization</DocsH3>
      <DocsP>
        Locale JSON files live in <DocsCode>src/i18n/locales/</DocsCode> (for example{' '}
        <DocsCode>en.json</DocsCode> and <DocsCode>vi.json</DocsCode>). Keys are grouped by feature;
        add a file and register it in the i18n bootstrap when you add a language.
      </DocsP>
      <DocsH3>Sample data</DocsH3>
      <DocsP>
        Replace fixtures under <DocsCode>src/mocks/</DocsCode> when you connect real APIs. Routes
        and pages already expect stable shapes — adapt the fixtures first, then swap in fetchers.
      </DocsP>

      <DocsH2>Folder layout</DocsH2>
      <DocsBlock>
        {`src/
├─ components/
│  ├─ ui/           # Primitive components (Button, Input, …)
│  ├─ patterns/     # Composed components (UserMenu, ThemeCustomizer, …)
│  └─ showcase/     # Gallery blocks used in /showcase
├─ layouts/         # AppShell, AuthLayout, FullscreenLayout, DocsLayout
├─ pages/           # Sample pages (dashboard, courses, quiz, …)
├─ providers/       # App, Theme, Preferences, Toast providers
├─ hooks/           # useTheme, usePreferences, useMediaQuery, …
├─ i18n/            # i18next config + locales
├─ mocks/fixtures/  # Sample data (users, courses, quizzes, …)
├─ styles/          # globals.css + tokens
└─ routes/          # route-objects + urls map`}
      </DocsBlock>

      <DocsFooter next={{ to: urls.docs.configurationTheming, label: 'Configuration & theming' }} />
    </div>
  );
}
