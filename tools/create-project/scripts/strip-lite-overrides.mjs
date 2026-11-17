import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../overrides/lite');

function rm(rel) {
  const p = path.join(root, rel);
  if (fs.existsSync(p)) {
    fs.rmSync(p, { recursive: true, force: true });
    console.log('removed', rel);
  }
}

rm('src/pages/upgrade-page.tsx');
rm('src/components/patterns/sidebar-purchase-banner.tsx');
rm('src/components/patterns/upgrade-cta.tsx');

fs.writeFileSync(
  path.join(root, 'LICENSE'),
  `MIT License

Copyright (c) 2026 Ezway Tech

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
`,
);

const pkgPath = path.join(root, 'package.json');
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
pkg.name = 'tailtheme-reactjs-lite';
pkg.private = true;
pkg.license = 'MIT';
pkg.description =
  'TailTheme React Lite — open-source Free-scope admin template (MIT). Copyright (c) 2026 Ezway Tech.';
pkg.scripts.prepare = 'node ./scripts/prepare.mjs';
delete pkg.scripts['test:e2e'];
delete pkg.scripts['test:e2e:ui'];
fs.writeFileSync(pkgPath, `${JSON.stringify(pkg, null, 2)}\n`);

let patterns = fs.readFileSync(path.join(root, 'src/components/patterns/index.ts'), 'utf8');
patterns = patterns
  .replace(/export \{ SidebarPurchaseBanner \} from '\.\/sidebar-purchase-banner';\r?\n?/g, '')
  .replace(/export \{ UpgradeCta \} from '\.\/upgrade-cta';\r?\n?/g, '');
fs.writeFileSync(path.join(root, 'src/components/patterns/index.ts'), patterns);

const tablePage = path.join(root, 'src/pages/ui/components/table-page.tsx');
if (fs.existsSync(tablePage)) {
  let t = fs.readFileSync(tablePage, 'utf8');
  t = t.replace(
    'Accessible table primitives with semantic tokens. Upgrade to Pro for full data-table recipes.',
    'Accessible table primitives with semantic tokens.',
  );
  fs.writeFileSync(tablePage, t);
}

console.log('strip-lite-overrides done');
