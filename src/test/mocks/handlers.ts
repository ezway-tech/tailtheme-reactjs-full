import { http, HttpResponse } from 'msw';

/**
 * Default MSW handlers. Empty by design — this repo is a UI Template
 * library, so tests rarely hit network. Add handlers here to stub
 * any ad-hoc endpoint a pattern test might touch.
 */
export const handlers = [http.get('/api/health', () => HttpResponse.json({ ok: true }))];
