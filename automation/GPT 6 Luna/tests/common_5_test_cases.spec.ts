import { test, expect, type Page } from '@playwright/test';

const PRODUCTS = ['Black heels', 'Bronze sandals', 'Brown Shades', 'Grey jacket', 'Noir jacket', 'Striped top', 'White sandals'];
const cartCounter = (page: Page) => page.locator('a.cart:visible', { hasText: 'My Cart' }).first();

async function addNoirJacketToCart(page: Page) {
  await page.goto('/products/noir-jacket');
  await expect(page.locator('#product-form')).toBeVisible();
  await page.locator('#product-select-option-0').selectOption('M');
  await page.locator('#product-select-option-1').selectOption('Red');
  await page.locator('#add').click();
  await expect(cartCounter(page)).toContainText(/My Cart \(1\)/);
}

test.describe('GPT-6 Luna Medium — Sauce Demo core storefront regression', () => {
  test('TC-AUTO-01 catalog products, GBP prices, and sold-out badges', async ({ page }) => {
    await page.goto('/collections/all');
    await expect(page).toHaveURL(/\/collections\/all$/);
    const grid = page.locator('section.product-grid');
    await expect(grid.locator('a[href*="/products/"]')).toHaveCount(PRODUCTS.length);
    for (const title of PRODUCTS) await expect(grid).toContainText(title);
    for (const price of ['£45.00', '£39.99', '£20.00', '£55.00', '£60.00', '£50.00', '£25.00']) {
      await expect(grid).toContainText(price);
    }
    await expect(grid).not.toContainText('$');
    await expect(page.locator('.sold-out')).toHaveCount(2);
    await expect(grid).toContainText('Brown Shades');
    await expect(grid).toContainText('White sandals');
  });

  test('TC-AUTO-02 product detail and size/color variant synchronization', async ({ page }) => {
    await page.goto('/products/noir-jacket');
    await expect(page.locator('#product-form h1')).toHaveText('Noir jacket');
    await expect(page.locator('#product-price')).toContainText('£60.00');
    await page.locator('#product-select-option-0').selectOption('M');
    await page.locator('#product-select-option-1').selectOption('Red');
    await expect(page.locator('#product-select')).toHaveValue('7805236929');
    await expect(page.locator('#product-select option:checked')).toHaveText('M / Red - £60.00');
    await page.locator('#add').click();
    await expect(cartCounter(page)).toContainText(/My Cart \(1\)/);
    await page.goto('/cart');
    await expect(page.locator('body')).toContainText('Noir jacket - M / Red');
  });

  test('TC-AUTO-03 cart quantity change recalculates totals and badge', async ({ page }) => {
    await addNoirJacketToCart(page);
    await page.goto('/cart');
    await expect(page.locator('body')).toContainText('Total £60.00');
    const cartForm = page.locator('form[action="/cart"]:visible');
    const quantity = cartForm.locator('input[name="updates[]"]');
    await expect(quantity).toHaveValue('1');
    await quantity.fill('2');
    await cartForm.locator('input[name="update"]').click();
    await expect(quantity).toHaveValue('2');
    await expect(page.locator('body')).toContainText('Total £120.00');
    await expect(cartCounter(page)).toContainText(/My Cart \(2\)/);
  });

  test('TC-AUTO-04 positive search results and usable zero-results state', async ({ page }) => {
    await page.goto('/search?q=sandals');
    await expect(page).toHaveTitle(/results found for "sandals"/);
    const grid = page.locator('section.product-grid');
    await expect(grid.locator('a[href*="/products/"]')).toHaveCount(3);
    await expect(grid).toContainText('Bronze sandals');
    await expect(grid).toContainText('White sandals');
    await page.goto('/search?q=xyznonexistent999');
    await expect(page.locator('body')).toContainText('No results found for xyznonexistent999');
    await expect(page.locator('#search-field')).toBeEditable();
  });

  test('TC-AUTO-05 checkout handoff and invalid discount rejection', async ({ page }) => {
    await addNoirJacketToCart(page);
    await page.goto('/cart');
    await Promise.all([
      page.waitForURL(/\/checkouts\//, { timeout: 30_000 }),
      page.locator('input[name="checkout"]:visible').click(),
    ]);
    await expect(page.locator('body')).toContainText('Test Payment Gateway');
    await expect(page.locator('body')).toContainText('1 to simulate an approved transaction');
    const discount = page.locator('input[name="reductions"]');
    await expect(discount).toBeVisible();
    await discount.fill('FAKECODE999');
    await page.locator('button[data-event-name="apply_discount"]').click();
    await expect(page.getByText('Enter a valid discount code', { exact: true })).toBeVisible();
    await expect(page).toHaveURL(/\/checkouts\//);
  });
});
