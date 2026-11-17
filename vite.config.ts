import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig, loadEnv, type PluginOption } from 'vite';

function clientPortFromEnv(env: Record<string, string>): number {
  const raw = env.VITE_APP_PORT?.replace(/^["']|["']$/g, '').trim() ?? '';
  const n = Number.parseInt(raw, 10);
  return Number.isFinite(n) && n > 0 ? n : 5173;
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  const clientPort = clientPortFromEnv(env);

  const plugins: PluginOption[] = [react(), tailwindcss()];
  if (mode === 'analyze') {
    plugins.push(
      visualizer({
        filename: 'dist/stats.html',
        gzipSize: true,
        open: true,
      }),
    );
  }

  return {
    plugins,
    /** Warm pre-bundle with the same `react` instance as `resolve.alias` (helps dev after clearing `.vite`). */
    optimizeDeps: {
      include: ['react', 'react-dom', 'react/jsx-runtime', 'react/jsx-dev-runtime'],
    },
    resolve: {
      /** One React instance — avoids "Invalid hook call" / null dispatcher when a parent monorepo also installs `react`. */
      dedupe: ['react', 'react-dom'],
      alias: {
        '@': path.resolve(__dirname, 'src'),
        /** Pin React to this package — required when a parent directory also has `node_modules/react` (duplicate React breaks hooks). */
        react: path.resolve(__dirname, 'node_modules/react'),
        'react-dom': path.resolve(__dirname, 'node_modules/react-dom'),
        /** Ensure `@import 'tailwindcss'` in `src/styles/globals.css` resolves to the package CSS entry. */
        tailwindcss: path.resolve(__dirname, 'node_modules/tailwindcss/index.css'),
      },
    },
    server: {
      port: clientPort,
      host: '0.0.0.0',
      hmr: process.env.DISABLE_HMR !== 'true',
    },
    build: {
      /** Demo bundle includes large syntax-highlighter / icons chunks; default 500 kB is too noisy. */
      chunkSizeWarningLimit: 2000,
    },
  };
});
