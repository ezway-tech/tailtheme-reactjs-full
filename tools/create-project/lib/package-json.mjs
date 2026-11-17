import fs from 'node:fs';
import path from 'node:path';

const DROP_SCRIPTS = new Set([
  'create:project',
  'sync:lite',
  'test:create-project',
  'docs:components',
  'lighthouse',
  'build:analyze',
  'test:e2e',
  'test:e2e:ui',
  'capture:rn-showcase',
]);

/**
 * Build a package.json for the export from Full's package.json + allowed dependency sets.
 * Does not invent lockfile entries — copies package-lock only when present and deps are subset;
 * for slim exports we omit package-lock so `npm install` resolves fresh (documented).
 */
export function buildPackageJson(sourceRoot, plan, { name, description }) {
  const srcPkg = JSON.parse(fs.readFileSync(path.join(sourceRoot, 'package.json'), 'utf8'));
  const deps = {};
  const devDeps = {};
  for (const key of plan.packageDependencies) {
    if (!srcPkg.dependencies?.[key] && !srcPkg.devDependencies?.[key]) {
      throw new Error(`Module requests dependency not in Full package.json: ${key}`);
    }
    const ver = srcPkg.dependencies?.[key] ?? srcPkg.devDependencies?.[key];
    if (srcPkg.dependencies?.[key]) deps[key] = ver;
    else devDeps[key] = ver;
  }
  for (const key of plan.packageDevDependencies) {
    if (!srcPkg.devDependencies?.[key] && !srcPkg.dependencies?.[key]) {
      throw new Error(`Module requests devDependency not in Full package.json: ${key}`);
    }
    const ver = srcPkg.devDependencies?.[key] ?? srcPkg.dependencies?.[key];
    devDeps[key] = ver;
  }

  const scripts = {};
  for (const [k, v] of Object.entries(srcPkg.scripts ?? {})) {
    if (DROP_SCRIPTS.has(k)) continue;
    if (k.startsWith('infra:') || k.startsWith('deploy:') || k.startsWith('publish:')) continue;
    if (k.startsWith('build:lite') || k.startsWith('build:base') || k.startsWith('package:'))
      continue;
    scripts[k] = v;
  }

  return {
    name,
    version: srcPkg.version ?? '0.1.0',
    private: true,
    type: 'module',
    description,
    license: 'MIT',
    scripts,
    lintStaged: srcPkg['lint-staged'],
    dependencies: sortKeys(deps),
    devDependencies: sortKeys(devDeps),
  };
}

function sortKeys(obj) {
  return Object.fromEntries(Object.entries(obj).sort(([a], [b]) => a.localeCompare(b)));
}

export function writePackageJson(destRoot, pkg, { dryRun = false } = {}) {
  const rel = 'package.json';
  if (!dryRun) {
    const out = { ...pkg };
    if (out.lintStaged) {
      out['lint-staged'] = out.lintStaged;
      delete out.lintStaged;
    }
    fs.writeFileSync(path.join(destRoot, rel), `${JSON.stringify(out, null, 2)}\n`, 'utf8');
  }
  return rel;
}
