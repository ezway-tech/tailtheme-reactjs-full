import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import App from '@/App';
import { APP_TITLE } from '@/config';
import { bootstrap } from '@/bootstrap';
import './styles/globals.css';

document.title = APP_TITLE;

if (import.meta.env.DEV) {
  void import('@axe-core/react').then(({ default: axe }) => {
    void axe(React, ReactDOM, 1000);
  });
}

const rootEl = document.getElementById('root');
if (!rootEl) {
  throw new Error('Missing root element');
}

createRoot(rootEl).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

void bootstrap().catch((error) => {
  console.error('[TailTheme] Bootstrap failed', error);
});
