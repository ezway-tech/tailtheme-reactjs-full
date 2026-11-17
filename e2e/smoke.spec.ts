import { test, expect } from '@playwright/test';

test.describe('Public smoke', () => {
  test('landing page loads', async ({ page }) => {
    await page.goto('/landing');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });

  test('login page loads', async ({ page }) => {
    await page.goto('/auth/login');
    await expect(page.getByRole('heading', { name: /sign in/i })).toBeVisible();
  });
});

test.describe('CRM smoke', () => {
  test('pipeline page loads', async ({ page }) => {
    await page.goto('/app/pages/crm/pipeline');
    await expect(page.getByRole('heading', { name: 'Pipeline' })).toBeVisible();
  });

  test('contacts page loads', async ({ page }) => {
    await page.goto('/app/pages/crm/contacts');
    await expect(page.getByRole('heading', { name: 'Contacts' })).toBeVisible();
  });

  test('deal detail loads', async ({ page }) => {
    await page.goto('/app/pages/crm/deals/dl-1');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });
});
