import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:5522/');
  await page.goto('http://localhost:5522/login');
  await page.getByText('Welcome').isVisible();
  await page.getByText('EmailPassword Remember for 30 daysForgot password?Sign in').click();
  await page.getByPlaceholder('Enter your email').click();
  await page.getByPlaceholder('Enter your email').fill('grodriguez@contextglobal.com');
  await page.getByPlaceholder('Enter your email').press('Tab');
  await page.getByPlaceholder('**********').click();
  await page.getByPlaceholder('**********').fill('123456');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.getByText('Events Add new eventSelect the event for which you want to view the metrics.Upco').click();
  await page.locator('div').filter({ hasText: /^Upcoming$/ }).first().click();
  await page.locator('.MuiGrid-root > .iconify').first().click();
  await page.getByText('View quick glance').first().click();
  await page.getByText('checking staff headset empty field Add new event Add new consumerAll eventscheck').click();
  await page.getByText('Staffgrodriguez@contextglobal.com').click();
  await page.locator('div').filter({ hasText: /^Staffgrodriguez@contextglobal\.com$/ }).locator('svg').click();
  await page.getByLabel('Close', { exact: true }).click();
  await page.getByRole('link', { name: 'All events' }).click();
  await page.getByText('Events Add new eventSelect the event for which you want to view the metrics.Upco').click();
  await expect(page.locator('div').filter({ hasText: /^Upcoming$/ }).first()).toBeVisible()
});
await page.goto('http://localhost:5522/events');
await page.locator('html').click();