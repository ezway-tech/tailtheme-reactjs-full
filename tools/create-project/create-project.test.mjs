import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterEach, describe, expect, it } from 'vitest';
import { resolveModuleClosure, mergeModules, resolveFromPreset } from './lib/resolve-modules.mjs';
import { assertSafeOutputPath } from './lib/path-safety.mjs';
import { createProject } from './lib/create.mjs';

const SOURCE = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const temps = [];

function tempDir() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'tt-create-'));
  temps.push(dir);
  return dir;
}

afterEach(() => {
  for (const dir of temps.splice(0)) {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

describe('resolve modules', () => {
  it('resolves project with core dependency', () => {
    const mods = resolveModuleClosure(['project']);
    expect(mods.map((m) => m.id)).toEqual(['core', 'project']);
  });

  it('rejects unknown module', () => {
    expect(() => resolveModuleClosure(['nope'])).toThrow(/Unknown module/);
  });

  it('minimal preset is core only', () => {
    const mods = resolveFromPreset('minimal');
    expect(mods.map((m) => m.id)).toEqual(['core']);
  });

  it('lite preset is lite module only', () => {
    const mods = resolveFromPreset('lite');
    expect(mods.map((m) => m.id)).toEqual(['lite']);
  });

  it('merge includes project routes', () => {
    const plan = mergeModules(resolveModuleClosure(['project']));
    expect(plan.routeEntries.some((e) => e.id.includes('project'))).toBe(true);
    expect(plan.packageDependencies).toContain('react');
  });

  it('lite merge skips generated routes', () => {
    const plan = mergeModules(resolveFromPreset('lite'));
    expect(plan.skipGeneratedRoutes).toBe(true);
    expect(plan.homePath).toBe('/app/dashboard');
  });
});

describe('path safety', () => {
  it('rejects writing into source', () => {
    expect(() => assertSafeOutputPath(SOURCE, SOURCE)).toThrow(/source directory/);
  });

  it('rejects non-empty output', () => {
    const dir = tempDir();
    fs.writeFileSync(path.join(dir, 'keep.txt'), 'x');
    expect(() => assertSafeOutputPath(SOURCE, dir)).toThrow(/not empty/);
  });
});

describe('createProject', () => {
  it('dry-run does not create files', () => {
    const dir = path.join(tempDir(), 'out');
    const before = fs.existsSync(dir);
    const result = createProject({
      sourceRoot: SOURCE,
      out: dir,
      preset: 'minimal',
      dryRun: true,
    });
    expect(result.dryRun).toBe(true);
    expect(result.fileCount).toBeGreaterThan(10);
    expect(fs.existsSync(dir)).toBe(before);
  });

  it('creates minimal project without excluded heavy modules', () => {
    const dir = path.join(tempDir(), 'app');
    createProject({
      sourceRoot: SOURCE,
      out: dir,
      preset: 'minimal',
    });
    expect(fs.existsSync(path.join(dir, 'src/pages/starter/home-page.tsx'))).toBe(true);
    expect(fs.existsSync(path.join(dir, 'src/pages/pages/project/kanban-page.tsx'))).toBe(false);
    expect(fs.existsSync(path.join(dir, 'src/routes/route-objects.tsx'))).toBe(true);
    const pkg = JSON.parse(fs.readFileSync(path.join(dir, 'package.json'), 'utf8'));
    expect(pkg.license).toBe('MIT');
    expect(pkg.dependencies['@google/genai']).toBeUndefined();
    expect(pkg.dependencies.recharts).toBeUndefined();
  });

  it('creates project module export with kanban page', () => {
    const dir = path.join(tempDir(), 'proj');
    createProject({
      sourceRoot: SOURCE,
      out: dir,
      modules: ['project'],
    });
    expect(fs.existsSync(path.join(dir, 'src/pages/pages/project/kanban-page.tsx'))).toBe(true);
  });

  it('creates lite preset with Free-scope README and dashboard', () => {
    const dir = path.join(tempDir(), 'lite');
    createProject({
      sourceRoot: SOURCE,
      out: dir,
      preset: 'lite',
    });
    expect(fs.existsSync(path.join(dir, 'src/pages/dashboard/dashboard-page.tsx'))).toBe(true);
    expect(fs.existsSync(path.join(dir, 'src/pages/starter/home-page.tsx'))).toBe(false);
    const readme = fs.readFileSync(path.join(dir, 'README.md'), 'utf8');
    expect(readme).toMatch(/TailTheme React Lite/);
    expect(readme).toMatch(/tailtheme\.dev/);
    expect(readme).not.toMatch(/for buyers|purchase|upgrade to Pro/i);
  });
});
