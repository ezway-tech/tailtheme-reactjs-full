/**
 * Regenerates docs/components.md from src/components/ui/*.tsx filenames.
 * Run: npm run docs:components
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const uiDir = path.join(root, 'src/components/ui');
const out = path.join(root, 'docs/components.md');

const files = fs
  .readdirSync(uiDir)
  .filter((f) => f.endsWith('.tsx') && !f.startsWith('index'))
  .sort();

const rows = files.map((f) => {
  const slug = f.replace(/\.tsx$/, '');
  const name = slug
    .split('-')
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join('');
  return `| \`${slug}\` | ${name} | \`/app/ui/components/${slug}\` |`;
});

const md = `# Components catalogue

> Auto-generated from \`src/components/ui/\`. Re-run \`npm run docs:components\` after adding primitives.

| File | Export area | Showcase route |
| ---- | ----------- | -------------- |
${rows.join('\n')}

## Patterns

Reusable compositions live under \`src/components/patterns/\`. Browse live examples under **UI → Examples** (e.g. marketing blocks, page header, data table toolkit).

## Notes

- Prefer importing from \`@/components/ui\` barrel when exported.
- Each primitive should support dark mode via semantic tokens only.
`;

fs.writeFileSync(out, md);
console.log(`Wrote ${out} (${files.length} components)`);
