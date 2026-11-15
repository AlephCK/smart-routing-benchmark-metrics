import { test, expect, type Page } from '@playwright/test';

/**
 * DeepSeek-V4.1-Flash High — Automated QA benchmark
 * Target: Sauce Demo Store (Shopify)
 *
 * Five common e-commerce regression flows. Each test starts from a fresh
 * browser context, so cart state is always empty at the beginning.
 */

const PRODUCTS = [
  'Black heels',
  'Bronze sandals',
  'Brown Shades',
  'Grey jacket',
  'Noir jacket',
  'Striped top',
  'White sandals',
] as const;

const cartCounter = (page: Page) => page.locator('a.cart:visible', { hasText: 'My Cart' }).first();

async function addNoirJacketToCart(page: Page, size = 'S', colour = 'Blue') {
  await page.goto('/products/noir-jacket');
  await expect(page.locator('#product-form')).toBeVisible();
  await page.locator('#product-select-option-0').selectOption(size);
  await page.locator('#product-select-option-1').selectOption(colour);
  await page.locator('#add').click();
  await expect(cartCounter(page)).toContainText(/My Cart \(1\)/);
}

test.describe('Sauce Demo — core storefront regression suite', () => {
  test('TC-AUTO-01 catalog browsing, currency and sold-out indicators', async ({ page }) => {
    const grid = page.locator('section.product-grid');

    await test.step('Open the all-products collection', async () => {
      await page.goto('/collections/all');
      await expect(page).toHaveURL(/\/collections\/all$/);
      await expect(page.locator('h1', { hasText: 'Products' })).toBeVisible();
    });

    await test.step('Every product tile is rendered with its GBP price', async () => {
      await expect(grid.locator('a[href*="/products/"]')).toHaveCount(PRODUCTS.length);
      for (const name of PRODUCTS) {
        await expect(grid).toContainText(name);
      }
      for (const price of ['£45.00', '£39.99', '£20.00', '£55.00', '£60.00', '£50.00', '£25.00']) {
        await expect(grid).toContainText(price);
      }
      // Storefront currency must not leak the store's base currency.
      await expect(grid).not.toContainText('$');
    });

    await test.step('Only the two out-of-stock products carry a Sold Out overlay', async () => {
      const soldOut = page.locator('.sold-out');
      await expect(soldOut).toHaveCount(2);
      await expect(soldOut.first()).toHaveText(/Sold Out/i);
      await expect(soldOut.nth(1)).toHaveText(/Sold Out/i);
      // The two sold-out titles still render alongside their overlays.
      await expect(grid).toContainText('Brown Shades');
      await expect(grid).toContainText('White sandals');
    });
  });

  test('TC-AUTO-02 product detail page variant selection and CTA state', async ({ page }) => {
    await page.goto('/products/noir-jacket');

    await test.step('PDP renders name, price and both option selectors', async () => {
      await expect(page.locator('#product-form h1')).toHaveText('Noir jacket');
      await expect(page.locator('#product-price')).toContainText('£60.00');
      await expect(page.locator('#product-select-option-0')).toBeVisible();
      await expect(page.locator('#product-select-option-1')).toBeVisible();
      await expect(page.locator('#add')).toBeEnabled();
      await expect(page.locator('#add')).toHaveValue('Add to Cart');
    });

    await test.step('Size and colour selections resolve to the correct variant ID', async () => {
      await page.locator('#product-select-option-0').selectOption('M');
      await page.locator('#product-select-option-1').selectOption('Red');
      // M / Red is variant 7805236929 in the Shopify variant payload.
      await expect(page.locator('#product-select')).toHaveValue('7805236929');
      await expect(page.locator('#product-select option:checked')).toHaveText('M / Red - £60.00');
    });

    await test.step('Adding the selected variant updates the cart counter', async () => {
      await page.locator('#add').click();
      await expect(cartCounter(page)).toContainText(/My Cart \(1\)/);
      await page.goto('/cart');
      await expect(page.locator('body')).toContainText('Noir jacket - M / Red');
    });
  });

  test('TC-AUTO-03 cart quantity update recalculates the subtotal', async ({ page }) => {
    await test.step('Seed the cart with one Noir jacket (S / Blue, £60.00)', async () => {
      await addNoirJacketToCart(page);
      await page.goto('/cart');
      await expect(page.locator('body')).toContainText('Noir jacket - S / Blue');
      await expect(page.locator('body')).toContainText('Total £60.00');
    });

    await test.step('Change quantity from 1 to 2 and submit the update', async () => {
      const cartForm = page.locator('form[action="/cart"]:visible');
      const qty = cartForm.locator('input[name="updates[]"]');
      await expect(qty).toHaveValue('1');
      await qty.fill('2');
      await cartForm.locator('input[name="update"]').click();
      await expect(page).toHaveURL(/\/cart$/);
    });

    await test.step('Line total, order total and header badge all move to £120 / 2', async () => {
      const cartForm = page.locator('form[action="/cart"]:visible');
      await expect(cartForm.locator('input[name="updates[]"]')).toHaveValue('2');
      await expect(page.locator('body')).toContainText('£120.00');
      await expect(page.locator('body')).toContainText('Total £120.00');
      await expect(cartCounter(page)).toContainText(/My Cart \(2\)/);
    });
  });

  test('TC-AUTO-04 search returns matching products and an explicit zero-results state', async ({ page }) => {
    await test.step('A positive query returns the relevant catalog items', async () => {
      await page.goto('/search?q=sandals');
      await expect(page).toHaveTitle(/results found for "sandals"/);
      await expect(page.locator('section.product-grid').locator('a[href*="/products/"]')).toHaveCount(3);
      await expect(page.locator('section.product-grid')).toContainText('Bronze sandals');
      await expect(page.locator('section.product-grid')).toContainText('White sandals');
      await expect(page.locator('body')).not.toContainText('No results found');
    });

    await test.step('A non-existent query shows the exact zero-results message and keeps the form usable', async () => {
      await page.goto('/search?q=xyznonexistent999');
      await expect(page.locator('body')).toContainText('No results found for xyznonexistent999');
      await expect(page.locator('#search-field')).toBeVisible();
      await expect(page.locator('#search-field')).toBeEditable();
    });
  });

  test('TC-AUTO-05 checkout hand-off and invalid discount code validation', async ({ page }) => {
    await test.step('Move a cart item into the Shopify checkout', async () => {
      await addNoirJacketToCart(page);
      await page.goto('/cart');
      await Promise.all([
        page.waitForURL(/\/checkouts\//, { timeout: 30_000 }),
        page.locator('input[name="checkout"]:visible').click(),
      ]);
      await expect(page).toHaveURL(/\/checkouts\//);
    });

    await test.step('Checkout exposes the test gateway and the discount form', async () => {
      await expect(page.locator('body')).toContainText('Test Payment Gateway');
      await expect(page.locator('body')).toContainText('1 to simulate an approved transaction');
      await expect(page.locator('input[name="reductions"]')).toBeVisible();
    });

    await test.step('An invalid code is rejected with the exact inline error', async () => {
      await page.locator('input[name="reductions"]').fill('FAKECODE999');
      const apply = page.locator('button[data-event-name="apply_discount"]');
      await expect(apply).toBeEnabled();
      await apply.click();
      await expect(page.getByText('Enter a valid discount code', { exact: true })).toBeVisible();
      // The checkout must survive the rejection, not fall into an error page.
      await expect(page).toHaveURL(/\/checkouts\//);
      await expect(page.locator('button[data-event-name="apply_discount"]')).toBeVisible();
    });
  });
});
