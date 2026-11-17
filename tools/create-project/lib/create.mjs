import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { assertSafeOutputPath } from './path-safety.mjs';
import { expandIncludes, copyFiles } from './copy.mjs';
import {
  listModules,
  loadPresets,
  mergeModules,
  resolveFromPreset,
  resolveModuleClosure,
} from './resolve-modules.mjs';
import { writeGenerated } from './emit.mjs';
import { buildPackageJson, writePackageJson } from './package-json.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const TOOL_ROOT = path.join(HERE, '..');
const DEFAULT_SOURCE = path.resolve(TOOL_ROOT, '..', '..');

/** Override folder: `lite` for public Free-scope Lite; `minimal` for starter export. */
function resolveOverrideName({ preset, syncLite }) {
  if (syncLite || preset === 'lite') return 'lite';
  return 'minimal';
}

const OVERRIDE_SKIP = new Set([
  'package-lock.json',
  'package.json',
  'CHANGELOG.md',
  'GUIDE.md',
  'banner.png',
  'metadata.json',
]);

function applyOverrides(destRoot, overrideName, { dryRun = false } = {}) {
  const overrideRoot = path.join(TOOL_ROOT, 'overrides', overrideName);
  if (!fs.existsSync(overrideRoot)) return [];
  const written = [];
  function walk(dir, relBase = '') {
    for (const name of fs.readdirSync(dir)) {
      const abs = path.join(dir, name);
      const rel = relBase ? `${relBase}/${name}` : name;
      if (fs.statSync(abs).isDirectory()) {
        walk(abs, rel);
        continue;
      }
      // README for lite is applied via writeReadme from the override template.
      if (!relBase && (OVERRIDE_SKIP.has(name) || name === 'README.md')) continue;
      written.push(rel);
      if (!dryRun) {
        const to = path.join(destRoot, rel);
        fs.mkdirSync(path.dirname(to), { recursive: true });
        fs.copyFileSync(abs, to);
      }
    }
  }
  walk(overrideRoot);
  return written;
}

function writeReadme(destRoot, { name, moduleIds, isLite, isFreeScope }, { dryRun = false } = {}) {
  const rel = 'README.md';

  // Public Lite README is maintained as overrides/lite/README.md so sync:lite cannot drift.
  if (isFreeScope) {
    const template = path.join(TOOL_ROOT, 'overrides', 'lite', 'README.md');
    if (!fs.existsSync(template)) {
      throw new Error(`Missing Lite README template: ${template}`);
    }
    if (!dryRun) {
      fs.copyFileSync(template, path.join(destRoot, rel));
    }
    return rel;
  }

  const content = `# ${name}

Open-source TailTheme React starter (MIT).

## Lite or Full?

- **Lite** — public Free-scope edition (\`tailtheme-reactjs-lite\`, preset \`lite\`).
- **minimal** — small Home/Form starter from \`create:project --preset minimal\` (this export when using minimal).
- **Full** — complete demo, component reference, and exporter.

## Run locally

\`\`\`bash
npm install
cp .env.example .env
npm run dev
\`\`\`

## Branding, theme, navigation

- App name / storage keys: \`src/config.ts\`
- Design tokens: \`src/styles/globals.css\`
- Navigation / routes: under \`src/navigation\` and \`src/routes\`

## Backend?

No real backend. Auth and data screens are UI demos. Optional MSW demo mode uses \`?mock=1\` when mocks are present.

## Figma

https://www.figma.com/design/OjGoqhtHI9gzspszsDQ7Va/TailTheme-Web

## Modules in this export

${moduleIds.map((id) => `- \`${id}\``).join('\n')}

${
  isLite
    ? `## Add components from Full

1. Open the Full repo and locate the component.
2. Copy the file and any files it imports under \`src/\`.
3. Match dependency versions from Full \`package.json\`.
`
    : ''
}
## License

MIT — Copyright (c) 2026 Ezway Tech. TailTheme is the product name.

## Contributions

Shared components belong in **tailtheme-reactjs-full**.
`;
  if (!dryRun) fs.writeFileSync(path.join(destRoot, rel), content, 'utf8');
  return rel;
}

/**
 * Create a project export or plan (dry-run).
 */
export function createProject(options) {
  const {
    sourceRoot = DEFAULT_SOURCE,
    out,
    preset,
    modules: moduleIds = [],
    dryRun = false,
    syncLite = false,
    name,
    description,
  } = options;

  if (!out && !syncLite) {
    throw new Error('Missing --out <path> (or use --sync-lite).');
  }

  let modules;
  if (preset) modules = resolveFromPreset(preset);
  else if (moduleIds.length) modules = resolveModuleClosure(moduleIds);
  else throw new Error('Provide --preset <name> or --modules <id,id>.');

  const plan = mergeModules(modules);
  plan.sourceRoot = sourceRoot;

  const overrideName = resolveOverrideName({ preset, syncLite });
  const isFreeScope = overrideName === 'lite';

  const resolvedOut = syncLite
    ? path.resolve(out ?? path.join(sourceRoot, '..', 'tailtheme-reactjs-lite'))
    : path.resolve(out);

  const safety = assertSafeOutputPath(sourceRoot, resolvedOut, {
    allowNonEmpty: syncLite,
  });

  const includePatterns = plan.files.filter((f) => f !== 'package-lock.json');

  if (!isFreeScope) {
    includePatterns.push(
      'src/assets/image/hero-team-collab.jpg',
      'src/assets/image/hero-workspace.jpg',
      'src/lib/theme-presets.ts',
      'src/lib/header-floating-panel.ts',
      'src/lib/motion.ts',
      'src/lib/utils.ts',
      'src/lib/auth-session.ts',
      'src/lib/toast.tsx',
      'src/lib/progress-toast.tsx',
      'src/lib/color-scale.ts',
      'src/lib/contrast.ts',
      'src/lib/tailwind-palettes.ts',
      'src/mocks/fixtures/notifications.ts',
      'src/components/ui/slider.tsx',
      'src/components/ui/color-picker.tsx',
      'src/components/patterns/marketing/cookie-consent.tsx',
      'src/components/patterns/marketing/index.ts',
    );
    for (const d of ['react-colorful', '@radix-ui/react-slider']) {
      if (!plan.packageDependencies.includes(d)) plan.packageDependencies.push(d);
    }
    plan.packageDependencies.sort();
    if (!plan.emitUiBarrel.includes('slider')) plan.emitUiBarrel.push('slider');
    if (!plan.emitUiBarrel.includes('color-picker')) plan.emitUiBarrel.push('color-picker');
  }

  const uniqueIncludes = [...new Set(includePatterns)];
  const relativeFiles = expandIncludes(sourceRoot, uniqueIncludes, plan.exclude);

  const pkgName =
    name ??
    (isFreeScope || preset === 'minimal' || syncLite
      ? 'tailtheme-reactjs-lite'
      : 'tailtheme-react-app');
  const pkgDescription =
    description ??
    (isFreeScope || syncLite
      ? 'TailTheme React Lite — Free-scope MIT admin template'
      : preset === 'minimal'
        ? 'TailTheme React — minimal MIT starter'
        : 'TailTheme React app export');

  const pkg = buildPackageJson(sourceRoot, plan, {
    name: pkgName,
    description: pkgDescription,
  });

  const result = {
    source: safety.source,
    out: safety.outResolved,
    modules: modules.map((m) => m.id),
    fileCount: relativeFiles.length,
    files: relativeFiles,
    packageDependencies: plan.packageDependencies,
    dryRun,
    syncLite,
    overrideName,
  };

  const generateOpts = { dryRun, skipRoutes: plan.skipGeneratedRoutes === true };

  if (dryRun) {
    result.generated = writeGenerated(safety.outResolved, { ...plan, sourceRoot }, generateOpts);
    result.overrides = applyOverrides(safety.outResolved, overrideName, { dryRun: true });
    return result;
  }

  if (syncLite) {
    const staging = path.join(sourceRoot, '.tmp', 'lite-staging');
    fs.rmSync(staging, { recursive: true, force: true });
    fs.mkdirSync(staging, { recursive: true });
    copyFiles(sourceRoot, staging, relativeFiles);
    writeGenerated(staging, { ...plan, sourceRoot }, generateOpts);
    applyOverrides(staging, overrideName);
    writePackageJson(staging, pkg);
    writeReadme(staging, {
      name: 'TailTheme React Lite',
      moduleIds: result.modules,
      isLite: true,
      isFreeScope: true,
    });
    for (const extra of ['LICENSE', 'THIRD_PARTY_NOTICES.md']) {
      const from = path.join(sourceRoot, extra);
      if (fs.existsSync(from)) {
        fs.copyFileSync(from, path.join(staging, extra));
      }
    }
    const agentsOverride = path.join(TOOL_ROOT, 'overrides', 'lite', 'AGENTS.md');
    if (fs.existsSync(agentsOverride)) {
      fs.copyFileSync(agentsOverride, path.join(staging, 'AGENTS.md'));
    }
    fs.mkdirSync(safety.outResolved, { recursive: true });
    for (const managed of ['src', 'public']) {
      fs.rmSync(path.join(safety.outResolved, managed), { recursive: true, force: true });
    }
    syncTree(staging, safety.outResolved);
    fs.rmSync(staging, { recursive: true, force: true });
    result.mode = 'sync-lite';
    return result;
  }

  fs.mkdirSync(safety.outResolved, { recursive: true });
  copyFiles(sourceRoot, safety.outResolved, relativeFiles);
  result.generated = writeGenerated(safety.outResolved, { ...plan, sourceRoot }, generateOpts);
  result.overrides = applyOverrides(safety.outResolved, overrideName);
  writePackageJson(safety.outResolved, pkg);
  writeReadme(safety.outResolved, {
    name: pkgName,
    moduleIds: result.modules,
    isLite: preset === 'minimal' || isFreeScope,
    isFreeScope,
  });
  for (const extra of ['LICENSE', 'THIRD_PARTY_NOTICES.md', 'AGENTS.md']) {
    const from = path.join(sourceRoot, extra);
    if (fs.existsSync(from)) {
      fs.copyFileSync(from, path.join(safety.outResolved, extra));
    }
  }
  if (isFreeScope) {
    const agentsOverride = path.join(TOOL_ROOT, 'overrides', 'lite', 'AGENTS.md');
    if (fs.existsSync(agentsOverride)) {
      fs.copyFileSync(agentsOverride, path.join(safety.outResolved, 'AGENTS.md'));
    }
  }
  result.mode = 'create';
  return result;
}

function syncTree(fromRoot, toRoot) {
  function walk(dir, rel = '') {
    for (const name of fs.readdirSync(dir)) {
      const abs = path.join(dir, name);
      const r = rel ? `${rel}/${name}` : name;
      if (fs.statSync(abs).isDirectory()) walk(abs, r);
      else {
        const dest = path.join(toRoot, r);
        fs.mkdirSync(path.dirname(dest), { recursive: true });
        fs.copyFileSync(abs, dest);
      }
    }
  }
  walk(fromRoot);
}

export { listModules, loadPresets };
