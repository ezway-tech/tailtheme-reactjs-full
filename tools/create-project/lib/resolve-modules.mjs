import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const MODULES_DIR = path.join(HERE, '..', 'modules');
const PRESETS_PATH = path.join(HERE, '..', 'presets.json');

export function loadPresets() {
  return JSON.parse(fs.readFileSync(PRESETS_PATH, 'utf8'));
}

export function listModules() {
  return fs
    .readdirSync(MODULES_DIR)
    .filter((f) => f.endsWith('.json'))
    .map((f) => {
      const mod = JSON.parse(fs.readFileSync(path.join(MODULES_DIR, f), 'utf8'));
      return { id: mod.id, description: mod.description, dependsOn: mod.dependsOn ?? [] };
    })
    .sort((a, b) => a.id.localeCompare(b.id));
}

export function loadModule(id) {
  const file = path.join(MODULES_DIR, `${id}.json`);
  if (!fs.existsSync(file)) {
    throw new Error(`Unknown module id: ${id}. Run with --list to see available modules.`);
  }
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

/**
 * Resolve module ids with dependencies (topo order). Detects cycles and missing deps.
 */
export function resolveModuleClosure(requestedIds) {
  const presets = loadPresets();
  const ids = [...requestedIds];
  const visiting = new Set();
  const visited = new Set();
  const ordered = [];

  function visit(id) {
    if (visited.has(id)) return;
    if (visiting.has(id)) {
      throw new Error(`Circular module dependency involving: ${id}`);
    }
    visiting.add(id);
    const mod = loadModule(id);
    for (const dep of mod.dependsOn ?? []) {
      visit(dep);
    }
    visiting.delete(id);
    visited.add(id);
    ordered.push(mod);
  }

  for (const id of ids) {
    if (presets[id] && !fs.existsSync(path.join(MODULES_DIR, `${id}.json`))) {
      throw new Error(`"${id}" is a preset, not a module. Use --preset ${id}.`);
    }
    visit(id);
  }

  return ordered;
}

export function resolveFromPreset(presetName) {
  const presets = loadPresets();
  const preset = presets[presetName];
  if (!preset) {
    throw new Error(`Unknown preset: ${presetName}. Available: ${Object.keys(presets).join(', ')}`);
  }
  return resolveModuleClosure(preset.modules);
}

export function mergeModules(modules) {
  const files = new Set();
  const exclude = new Set();
  const packageDependencies = new Set();
  const packageDevDependencies = new Set();
  const emitUiBarrel = new Set();
  const routeEntries = [];
  const urls = {};

  for (const mod of modules) {
    for (const f of mod.files ?? []) files.add(f);
    for (const e of mod.exclude ?? []) exclude.add(e);
    for (const d of mod.packageDependencies ?? []) packageDependencies.add(d);
    for (const d of mod.packageDevDependencies ?? []) packageDevDependencies.add(d);
    for (const u of mod.emitUiBarrel ?? []) emitUiBarrel.add(u);
    for (const entry of mod.routes?.entries ?? []) routeEntries.push(entry);
    deepMerge(urls, mod.urls ?? {});
  }

  return {
    modules,
    files: [...files],
    exclude: [...exclude],
    packageDependencies: [...packageDependencies].sort(),
    packageDevDependencies: [...packageDevDependencies].sort(),
    emitUiBarrel: [...emitUiBarrel],
    routeEntries,
    urls,
    skipGeneratedRoutes: modules.some((m) => m.skipGeneratedRoutes === true),
    homePath: modules.find((m) => m.routes?.homePath)?.routes?.homePath ?? '/app/starter',
  };
}

function deepMerge(target, source) {
  for (const [key, value] of Object.entries(source)) {
    if (
      value &&
      typeof value === 'object' &&
      !Array.isArray(value) &&
      typeof target[key] === 'object' &&
      target[key] !== null &&
      !Array.isArray(target[key])
    ) {
      deepMerge(target[key], value);
    } else {
      target[key] = value;
    }
  }
}
