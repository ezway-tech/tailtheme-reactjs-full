/**
 * Runs Lighthouse against key template URLs (requires preview server on port 4173).
 *
 * Usage:
 *   npm run build && npm run preview -- --host 127.0.0.1 --port 4173
 *   npm run lighthouse
 */
import { spawn } from 'node:child_process';

const BASE = process.env.LIGHTHOUSE_BASE_URL ?? 'http://127.0.0.1:4173';
const PATHS = ['/landing', '/auth/login', '/app/dashboard', '/app/ui'];

const urls = PATHS.map((p) => `${BASE}${p}`);

for (const url of urls) {
  console.log(`\n▶ Lighthouse: ${url}`);
  await new Promise((resolve, reject) => {
    const child = spawn(
      'npx',
      ['lighthouse', url, '--preset=desktop', '--quiet', '--chrome-flags=--headless'],
      { stdio: 'inherit', shell: true },
    );
    child.on('close', (code) => (code === 0 ? resolve() : reject(new Error(`exit ${code}`))));
  });
}

console.log('\nDone. Target: Perf ≥ 85, A11y ≥ 95 on each URL.');
