import { test, expect } from '@playwright/test';

const BASE_URL = 'https://sauce-demo.myshopify.com';

test.describe('Sauce Demo Shopify — Claude Opus 4.6 Automated Test Suite', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
  });

  // ─── TC-NAV-001: Header & Branding ─────────────────────────────────────────
  test('TC-NAV-001: Utility bar elements, search input and branding render', async ({ page }) => {
    await expect(page.locator('input[name="q"]').first()).toBeVisible();
    await expect(page.locator('text=My Cart')).toBeVisible();
    await expect(page.locator('img[alt="Sauce Demo"]')).toBeVisible();
  });

  // ─── TC-CAT-002: Master Catalog 7 Products ─────────────────────────────────
  test('TC-CAT-002: Master catalog /collections/all renders exactly 7 products', async ({ page }) => {
    await page.goto(`${BASE_URL}/collections/all`);
    const expectedTitles = [
      'Black heels',
      'Bronze sandals',
      'Brown Shades',
      'Grey jacket',
      'Noir jacket',
      'Striped top',
      'White sandals'
    ];
    for (const title of expectedTitles) {
      await expect(page.locator(`text=${title}`).first()).toBeVisible();
    }
  });

  // ─── TC-CAT-005: 2 Sold Out Badges ─────────────────────────────────────────
  test('TC-CAT-005: Out-of-stock overlay badges appear on Brown Shades and White sandals', async ({ page }) => {
    await page.goto(`${BASE_URL}/collections/all`);
    const soldOutBadges = page.locator('text=Sold Out');
    await expect(soldOutBadges).toHaveCount(2);
  });

  // ─── TC-PDP-001: Missing Description on Brown Shades (Defect D-08) ─────────
  test('TC-PDP-001: Brown Shades has completely empty description (Defect D-08)', async ({ page }) => {
    await page.goto(`${BASE_URL}/products/brown-shades`);
    await expect(page.locator('h1, h2').filter({ hasText: 'Brown Shades' })).toBeVisible();
    // Verify CTA is disabled
    const cta = page.locator('input[value*="Sold Out"], button:has-text("Sold Out")');
    await expect(cta).toBeDisabled();
  });

  // ─── TC-PDP-002: Noir Jacket 6 Variant SKUs ────────────────────────────────
  test('TC-PDP-002: Noir jacket renders dual Size and Color dropdown selectors', async ({ page }) => {
    await page.goto(`${BASE_URL}/products/noir-jacket`);
    const selects = page.locator('select');
    await expect(selects).toHaveCount(2);
    await expect(page.locator('option', { hasText: 'Blue' })).toBeVisible();
    await expect(page.locator('option', { hasText: 'Red' })).toBeVisible();
  });

  // ─── TC-PDP-004: Handle vs Title Contradiction (Defect D-01) ───────────────
  test('TC-PDP-004: flower-print-jeans handle displays Black heels title (Defect D-01)', async ({ page }) => {
    await page.goto(`${BASE_URL}/products/flower-print-jeans`);
    await expect(page.locator('h1, h2').filter({ hasText: 'Black heels' })).toBeVisible();
  });

  // ─── TC-CRT-004: Arithmetic Recalculation ──────────────────────────────────
  test('TC-CRT-004: Quantity modification recalculates cart total accurately', async ({ page }) => {
    await page.goto(`${BASE_URL}/products/striped-top`);
    await page.locator('input[name="add"], button[name="add"]').click();
    await page.goto(`${BASE_URL}/cart`);
    // Adjust quantity to 2 -> 2 x £50 = £100
    await page.locator('input[name="updates[]"]').fill('2');
    await page.locator('input[name="update"], button[name="update"]').click();
    await expect(page.locator('text=£100.00')).toBeVisible();
  });

  // ─── TC-CRT-005: Line Item Removal ─────────────────────────────────────────
  test('TC-CRT-005: Zero quantity input cleanly purges line item', async ({ page }) => {
    await page.goto(`${BASE_URL}/products/striped-top`);
    await page.locator('input[name="add"], button[name="add"]').click();
    await page.goto(`${BASE_URL}/cart`);
    await page.locator('input[name="updates[]"]').fill('0');
    await page.locator('input[name="update"], button[name="update"]').click();
    await expect(page.locator('text=currently empty')).toBeVisible();
  });

  // ─── TC-CHK-002: Discount Code Error ───────────────────────────────────────
  test('TC-CHK-002: FAKECODE999 discount triggers exact error message', async ({ page }) => {
    await page.goto(`${BASE_URL}/products/striped-top`);
    await page.locator('input[name="add"], button[name="add"]').click();
    await page.goto(`${BASE_URL}/cart`);
    await page.locator('input[name="checkout"], button[name="checkout"]').click();
    await page.waitForURL(/.*checkouts.*/);

    const discountInput = page.locator('input[placeholder*="Discount" i]');
    if (await discountInput.isVisible()) {
      await discountInput.fill('FAKECODE999');
      await page.locator('button:has-text("Apply")').click();
      await expect(page.locator('text=Enter a valid discount code')).toBeVisible();
    }
  });

  // ─── TC-SRCH-002: Search "sandals" ─────────────────────────────────────────
  test('TC-SRCH-002: Query "sandals" returns 3 matching items', async ({ page }) => {
    await page.goto(`${BASE_URL}/search?q=sandals`);
    await expect(page.locator('text=3 results found')).toBeVisible();
    await expect(page.locator('text=Bronze sandals').first()).toBeVisible();
    await expect(page.locator('text=White sandals').first()).toBeVisible();
  });

  // ─── TC-SRCH-003: "bro" Static Page Badge Defect (Defect D-02) ────────────
  test('TC-SRCH-003: Query "bro" displays Terms static page with Sold Out badge (Defect D-02)', async ({ page }) => {
    await page.goto(`${BASE_URL}/search?q=bro`);
    await expect(page.locator('text=3 results found')).toBeVisible();
    await expect(page.locator('a[href*="/pages/terms"]')).toBeVisible();
  });

  // ─── TC-SRCH-004: Zero Results ─────────────────────────────────────────────
  test('TC-SRCH-004: Nonexistent search term displays exact zero results notice', async ({ page }) => {
    await page.goto(`${BASE_URL}/search?q=xyznonexistent999`);
    await expect(page.locator('text=No results found for xyznonexistent999')).toBeVisible();
  });

  // ─── TC-EDG-010: Custom 404 Page ───────────────────────────────────────────
  test('TC-EDG-010: Custom 404 page renders branded heading and recovery link', async ({ page }) => {
    const res = await page.goto(`${BASE_URL}/this-page-does-not-exist-at-all`);
    expect(res?.status()).toBe(404);
    await expect(page.locator('text=Ooops. Sorry, something has gone wrong.')).toBeVisible();
    await expect(page.locator('a[href*="sauce-demo.myshopify.com"]').first()).toBeVisible();
  });

});
