import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { defineConfig, loadEnv } from 'vite';

function clientPortFromEnv(env: Record<string, string>): number {
  const raw = env.VITE_APP_PORT?.replace(/^["']|["']$/g, '').trim() ?? '';
  const n = Number.parseInt(raw, 10);
  return Number.isFinite(n) && n > 0 ? n : 5173;
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  const clientPort = clientPortFromEnv(env);

  return {
    plugins: [react(), tailwindcss()],
    optimizeDeps: {
      include: ['react', 'react-dom', 'react/jsx-runtime', 'react/jsx-dev-runtime'],
    },
    resolve: {
      dedupe: ['react', 'react-dom'],
      alias: {
        '@': path.resolve(__dirname, 'src'),
        react: path.resolve(__dirname, 'node_modules/react'),
        'react-dom': path.resolve(__dirname, 'node_modules/react-dom'),
        tailwindcss: path.resolve(__dirname, 'node_modules/tailwindcss/index.css'),
      },
    },
    server: {
      port: clientPort,
      host: '0.0.0.0',
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
