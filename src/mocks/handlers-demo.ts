import { http, HttpResponse } from 'msw';
import { sampleCourses, sampleMembers, sampleProducts } from '@/mocks/fixtures';

/**
 * Demo API handlers for screencasts and offline previews.
 * Enable with `?mock=1` or `VITE_USE_API_MOCK=true`.
 */
export const demoHandlers = [
  http.get('/api/health', () => HttpResponse.json({ ok: true, mode: 'demo' })),

  http.get('/api/members', () => HttpResponse.json(sampleMembers)),

  http.get('/api/courses', () => HttpResponse.json(sampleCourses)),

  http.get('/api/products', () => HttpResponse.json(sampleProducts)),

  http.get('/api/me', () =>
    HttpResponse.json({
      id: 'u-demo',
      name: 'Alex Nguyen',
      email: 'alex@tailtheme.dev',
      role: 'Owner',
    }),
  ),
];
