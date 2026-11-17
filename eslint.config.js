import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import checkFile from 'eslint-plugin-check-file';

/**
 * ESLint 9 flat config for React 19 + TypeScript (Vite).
 */
export default tseslint.config(
  {
    ignores: [
      '.git/**',
      '.cursor/**',
      '.vscode/**',
      '.idea/**',
      '.cache/**',
      '.tmp/**',
      'tmp/**',
      'dist/**',
      'node_modules/**',
      'build/**',
      'coverage/**',
      '*.log',
      // Generated Base/Lite repos under ../../_outputs (see root .gitignore); not part of Pro lint scope
      '../../_outputs/**',
      // Maintainer packaging / derivation tools — linted via their own workflows if needed
      'tools/**',
    ],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  reactHooks.configs.flat.recommended,
  reactRefresh.configs.vite,
  prettierRecommended,
  {
    files: [
      'src/layouts/**/*.{ts,tsx}',
      'src/pages/**/*.{ts,tsx}',
      'src/components/**/*.{ts,tsx}',
      'src/routes/**/*.{ts,tsx}',
      'src/providers/**/*.{ts,tsx}',
      'src/lib/**/*.{ts,tsx}',
      'src/mocks/**/*.{ts,tsx}',
      'src/i18n/**/*.{ts,tsx}',
    ],
    plugins: { 'check-file': checkFile },
    rules: {
      'check-file/filename-naming-convention': [
        'error',
        {
          'src/layouts/**/*.{ts,tsx}': 'KEBAB_CASE',
          'src/pages/**/*.{ts,tsx}': 'KEBAB_CASE',
          'src/components/**/*.{ts,tsx}': 'KEBAB_CASE',
          'src/routes/**/*.{ts,tsx}': 'KEBAB_CASE',
          'src/providers/**/*.{ts,tsx}': 'KEBAB_CASE',
          'src/lib/**/*.{ts,tsx}': 'KEBAB_CASE',
          'src/mocks/**/*.{ts,tsx}': 'KEBAB_CASE',
          'src/i18n/**/*.{ts,tsx}': 'KEBAB_CASE',
        },
        {
          ignoreMiddleExtensions: true,
        },
      ],
      'check-file/folder-naming-convention': [
        'error',
        {
          'src/layouts/**/': 'KEBAB_CASE',
          'src/pages/**/': 'KEBAB_CASE',
          'src/components/**/': 'KEBAB_CASE',
          'src/routes/**/': 'KEBAB_CASE',
          'src/providers/**/': 'KEBAB_CASE',
          'src/lib/**/': 'KEBAB_CASE',
          'src/mocks/**/': 'KEBAB_CASE',
          'src/i18n/**/': 'KEBAB_CASE',
        },
      ],
    },
  },
  {
    files: ['src/**/__tests__/**/*.{ts,tsx}'],
    rules: {
      'check-file/folder-naming-convention': 'off',
    },
  },
  {
    files: [
      'src/components/ui/**/*.{ts,tsx}',
      'src/components/auth/**/*.{ts,tsx}',
      'src/components/patterns/**/*.{ts,tsx}',
      'src/test/**/*.{ts,tsx}',
      'src/routes/**/*.{ts,tsx}',
      'src/hooks/**/*.{ts,tsx}',
      'src/providers/**/*.{ts,tsx}',
      'src/lib/**/*.{ts,tsx}',
      'tools/build-lite/overrides/**/*.{ts,tsx}',
    ],
    rules: {
      'react-refresh/only-export-components': 'off',
    },
  },
  {
    files: ['scripts/**/*.mjs', 'tools/**/*.mjs'],
    languageOptions: {
      globals: {
        console: 'readonly',
        process: 'readonly',
        Buffer: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        URL: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
      },
    },
  },
);
