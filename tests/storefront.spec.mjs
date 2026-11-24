import { test, expect } from '@playwright/test';

test('home, search, scent families, sort, galleries and recovery pages', async ({
  page,
  request
}) => {
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('A wardrobeof scent.');
  await page.getByRole('link', { name: 'Explore perfumes', exact: true }).click();
  const cards = page.locator('.perfume-card');
  await expect(cards).toHaveCount(5);
  await page.getByLabel('Sort perfumes').selectOption('low');
  await expect(cards.first()).toContainText('CK One');
  await page.getByRole('textbox', { name: 'Search perfumes' }).fill('bergamot');
  await expect(cards.first()).toBeVisible();
  await page.getByRole('textbox', { name: 'Search perfumes' }).fill('motorcycle');
  await expect(page.getByRole('heading', { name: 'No perfumes found' })).toBeVisible();
  await page.getByRole('button', { name: 'Reset filters' }).click();
  await expect(cards).toHaveCount(5);
  await page.getByRole('navigation', { name: 'Main navigation' }).getByText('Scent guide').click();
  await page.getByRole('link', { name: 'Explore amber perfumes' }).click();
  await expect(cards).toHaveCount(1);
  await cards.getByRole('link', { name: 'View Coco Noir', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Coco Noir' })).toBeVisible();
  await page.getByRole('button', { name: 'View image 2' }).click();
  await expect(page.getByRole('button', { name: 'View image 2' })).toHaveAttribute(
    'aria-pressed',
    'true'
  );
  const products = await (await request.get('/api/products')).json();
  for (const product of products) {
    await page.goto('/product/' + product.id);
    await expect(page.getByRole('heading', { name: product.title, exact: true })).toBeVisible();
    await expect(page.locator('.detail-copy')).toContainText(product.notes.join(' · '));
    for (const path of [product.thumbnail, ...product.images]) {
      const response = await request.get(path);
      expect(response.status()).toBe(200);
      expect(response.headers()['content-type']).toMatch(/^image\//);
    }
  }
  await page.goto('/product/1');
  await expect(page.getByRole('heading', { name: 'Perfume unavailable' })).toBeVisible();
  await page.goto('/not-a-page');
  await expect(page.getByRole('heading', { name: 'Page not found' })).toBeVisible();
  expect(errors).toEqual([]);
});

test('guest shopping, registration, voucher, checkout, order history and returning sign-in', async ({
  page
}) => {
  const username = 'nebo_' + Date.now();
  const password = 'Perfume-Test-2026';
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.goto('/shop');
  const card = page.locator('.perfume-card').filter({ hasText: 'CK One' });
  await card.getByRole('button', { name: 'Save CK One to wishlist' }).click();
  await expect(card.getByRole('button', { name: 'Remove CK One from wishlist' })).toHaveAttribute(
    'aria-pressed',
    'true'
  );
  await card.hover();
  await card.getByRole('button', { name: 'Quick view' }).click();
  await page.getByRole('dialog').getByRole('button', { name: 'Add to bag' }).click();
  await page.getByRole('link', { name: 'Shopping bag, 1 items' }).click();
  await page.getByRole('button', { name: 'Sign in to checkout' }).click();
  await page.getByRole('button', { name: 'New to Nebo? Create an account' }).click();
  await page.getByLabel('Full name').fill('Perfume Collector');
  await page.getByLabel('Username').fill(username);
  await page.getByLabel('Password').fill(password);
  await page.getByRole('button', { name: 'Create account', exact: true }).click();
  await expect(page).toHaveURL(/\/cart$/);
  await page.getByLabel('Voucher code').fill('VIP15');
  await page.getByRole('button', { name: 'Apply', exact: true }).click();
  await expect(page.locator('.summary .total')).toContainText('$86.10');
  await page.getByLabel('Delivery address').fill('18 Garden Road, Colombo, Sri Lanka');
  await page.getByRole('button', { name: 'Place order' }).click();
  await expect(page.getByRole('heading', { name: 'Thank you, Perfume Collector.' })).toBeVisible();
  const ref = await page.locator('.receipt dd').first().textContent();
  await page.getByRole('link', { name: 'View order history' }).click();
  await expect(page).toHaveURL(/\/orders$/);
  await expect(page.getByText(ref, { exact: true })).toBeVisible();
  await page.reload();
  await expect(page.getByText(ref, { exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Sign out' }).click();
  await page.getByRole('link', { name: 'Sign in', exact: true }).click();
  await page.getByLabel('Username').fill(username);
  await page.getByLabel('Password').fill(password);
  await page.getByRole('button', { name: 'Sign in', exact: true }).click();
  await expect(page.getByText(ref, { exact: true })).toBeVisible();
  await page.goto('/wishlist');
  await expect(page.locator('.perfume-card')).toContainText('CK One');
  await page.getByRole('button', { name: 'Add all to bag' }).click();
  await page.getByRole('link', { name: 'Shopping bag, 1 items' }).click();
  await page.getByRole('button', { name: 'Increase CK One' }).click();
  await expect(page.locator('.stepper span')).toHaveText('2');
  await page.getByRole('button', { name: 'Clear bag' }).click();
  await expect(page.getByRole('heading', { name: 'Your bag is empty' })).toBeVisible();
  expect(errors).toEqual([]);
});

test('mobile navigation, layout, theme and newsletter', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  for (const path of [
    '/',
    '/catalog',
    '/scent-guide',
    '/product/7',
    '/cart',
    '/wishlist',
    '/login',
    '/orders',
    '/missing'
  ]) {
    await page.goto(path);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true
    );
  }
  await page.getByRole('button', { name: 'Dark appearance' }).click();
  await page.reload();
  await expect(page.locator('html')).toHaveClass(/dark/);
  await page.getByRole('button', { name: 'Light appearance' }).click();
  await page.getByRole('textbox', { name: 'Newsletter email' }).fill('reader@example.com');
  await page.getByRole('button', { name: 'Subscribe to newsletter' }).click();
  await expect(page.getByText('You’re on the list. Thank you for joining.')).toBeVisible();
});
