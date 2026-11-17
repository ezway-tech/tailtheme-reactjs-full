#!/usr/bin/env node
import path from 'node:path';
import { createProject, listModules, loadPresets } from './lib/create.mjs';

function parseArgs(argv) {
  const args = {
    modules: [],
    dryRun: false,
    list: false,
    syncLite: false,
  };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--list') args.list = true;
    else if (a === '--dry-run') args.dryRun = true;
    else if (a === '--sync-lite') args.syncLite = true;
    else if (a === '--preset') args.preset = argv[++i];
    else if (a === '--modules') {
      const raw = argv[++i] ?? '';
      args.modules = raw
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);
    } else if (a === '--out') args.out = argv[++i];
    else if (a === '--name') args.name = argv[++i];
    else if (a === '--help' || a === '-h') args.help = true;
    else if (a.startsWith('-')) {
      throw new Error(`Unknown option: ${a}`);
    }
  }
  return args;
}

function printHelp() {
  console.log(`Usage:
  npm run create:project -- --list
  npm run create:project -- --preset minimal --out ../my-app
  npm run create:project -- --modules project --out ../my-project-app
  npm run create:project -- --modules project --out ../my-project-app --dry-run
  npm run sync:lite

Options:
  --preset <name>     Use a preset (see presets.json)
  --modules <ids>     Comma-separated module ids (pulls dependencies)
  --out <path>        Output directory (must be empty for create)
  --dry-run           Plan only; do not write files
  --sync-lite         Maintainer sync into sibling tailtheme-reactjs-lite
  --list              List modules and presets
  --name <npm-name>   package.json name override
`);
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }
  if (args.list) {
    console.log('Presets:');
    for (const [id, p] of Object.entries(loadPresets())) {
      console.log(`  ${id} — ${p.description} [${p.modules.join(', ')}]`);
    }
    console.log('Modules:');
    for (const m of listModules()) {
      console.log(
        `  ${m.id} — ${m.description}${m.dependsOn.length ? ` (depends: ${m.dependsOn.join(', ')})` : ''}`,
      );
    }
    return;
  }

  const result = createProject({
    out: args.out,
    preset: args.preset ?? (args.syncLite ? 'minimal' : undefined),
    modules: args.modules,
    dryRun: args.dryRun,
    syncLite: args.syncLite,
    name: args.name,
  });

  console.log(
    JSON.stringify(
      {
        mode: result.mode ?? (result.dryRun ? 'dry-run' : 'create'),
        out: result.out,
        modules: result.modules,
        fileCount: result.fileCount,
        packageDependencies: result.packageDependencies,
        dryRun: result.dryRun,
      },
      null,
      2,
    ),
  );
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
