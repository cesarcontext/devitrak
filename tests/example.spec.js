// @ts-check
const { test, expect } = require('@playwright/test');

test('page is visible', async ({ page }) => {
  await page.goto('http://localhost:5522/login');

  // Expect a title "to contain" a substring.
  // await expect(page).get;
});

// test('get started link', async ({ page }) => {
//   await page.goto('https://admin.devitrak.net/');

//   // Click the get started link.
//   await screen.getByRole('textbox').inputValue();
// })
//   // Expects page to have a heading with the name of Installation.
//   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
// });
