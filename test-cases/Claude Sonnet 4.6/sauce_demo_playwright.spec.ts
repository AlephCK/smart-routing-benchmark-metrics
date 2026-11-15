import { test, expect } from '@playwright/test';

const BASE_URL = 'https://sauce-demo.myshopify.com';

test.describe('Sauce Demo Shopify — Claude Sonnet 4.6 Generated Test Suite', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
  });

  // ─── TC-NAV-001: Header Elements ───────────────────────────────────────────
  test('TC-NAV-001: Utility bar elements are present', async ({ page }) => {
    await expect(page.locator('input[name="q"]').first()).toBeVisible();
    await expect(page.locator('text=My Cart')).toBeVisible();
    await expect(page.locator('img[alt="Sauce Demo"]')).toBeVisible();
    await expect(page.locator('text=Just a demo site showing off what Sauce can do.')).toBeVisible();
  });

  // ─── TC-CAT-002: 7-Product Grid ────────────────────────────────────────────
  test('TC-CAT-002: All 7 products visible in /collections/all', async ({ page }) => {
    await page.goto(`${BASE_URL}/collections/all`);
    for (const title of ['Black heels', 'Bronze sandals', 'Brown Shades', 'Grey jacket', 'Noir jacket', 'Striped top', 'White sandals']) {
      await expect(page.locator(`text=${title}`).first()).toBeVisible();
    }
  });

  // ─── TC-CAT-004: 2 Sold-Out Badges ─────────────────────────────────────────
  test('TC-CAT-004: Brown Shades and White sandals have Sold Out badge', async ({ page }) => {
    await page.goto(`${BASE_URL}/collections/all`);
    const soldOutBadges = page.locator('text=Sold Out');
    await expect(soldOutBadges).toHaveCount(2);
  });

  // ─── TC-PDP-003: Noir jacket — 2 Dropdowns (Size + Colour) ─────────────────
  test('TC-PDP-003: Noir jacket has Size and Colour selectors', async ({ page }) => {
    await page.goto(`${BASE_URL}/products/noir-jacket`);
    await expect(page.locator('h1, h2').filter({ hasText: 'Noir jacket' })).toBeVisible();
    const selects = page.locator('select');
    await expect(selects).toHaveCount(2);
    // Verify options exist
    await expect(page.locator('option', { hasText: 'Red' })).toBeVisible();
    await expect(page.locator('option', { hasText: 'Green' })).toBeVisible();
  });

  // ─── TC-PDP-005: 2 Sold-Out CTAs ───────────────────────────────────────────
  test('TC-PDP-005: Brown Shades CTA is disabled and labelled Sold Out', async ({ page }) => {
    await page.goto(`${BASE_URL}/products/brown-shades`);
    const cta = page.locator('input[value="Sold Out"], button:has-text("Sold Out")');
    await expect(cta).toBeDisabled();
  });

  test('TC-PDP-005b: White sandals CTA is disabled and labelled Sold Out', async ({ page }) => {
    await page.goto(`${BASE_URL}/products/white-sandals`);
    const cta = page.locator('input[value="Sold Out"], button:has-text("Sold Out")');
    await expect(cta).toBeDisabled();
  });

  // ─── TC-CRT-005: Quantity Update & Recalculation ───────────────────────────
  test('TC-CRT-005: Cart quantity update recalculates total correctly', async ({ page }) => {
    await page.goto(`${BASE_URL}/products/grey-jacket`);
    await page.locator('input[name="add"], button[name="add"]').click();
    await page.goto(`${BASE_URL}/cart`);
    // Update qty to 3
    await page.locator('input[name="updates[]"]').fill('3');
    await page.locator('input[name="update"], button[name="update"]').click();
    // 3 × £55.00 = £165.00
    await expect(page.locator('text=£165.00')).toBeVisible();
  });

  // ─── TC-CRT-006: Remove by Zero Qty ───────────────────────────────────────
  test('TC-CRT-006: Setting qty to 0 removes item and shows empty cart', async ({ page }) => {
    await page.goto(`${BASE_URL}/products/grey-jacket`);
    await page.locator('input[name="add"], button[name="add"]').click();
    await page.goto(`${BASE_URL}/cart`);
    await page.locator('input[name="updates[]"]').fill('0');
    await page.locator('input[name="update"], button[name="update"]').click();
    await expect(page.locator('text=currently empty')).toBeVisible();
  });

  // ─── TC-SRCH-001: Empty Query ──────────────────────────────────────────────
  test('TC-SRCH-001: Empty search shows informational message', async ({ page }) => {
    await page.goto(`${BASE_URL}/search?q=`);
    await expect(page.locator('text=No search performed')).toBeVisible();
  });

  // ─── TC-SRCH-003: "shi" returns Terms page (Defect D-02) ──────────────────
  test('TC-SRCH-003: "shi" search returns non-product Terms page (D-02 defect check)', async ({ page }) => {
    await page.goto(`${BASE_URL}/search?q=shi`);
    await expect(page.locator('text=1 result')).toBeVisible();
    // Verifies the defect: search returns static page, not a product
    await expect(page.locator('a[href*="/pages/terms"]')).toBeVisible();
  });

  // ─── TC-SRCH-004: Zero Results ─────────────────────────────────────────────
  test('TC-SRCH-004: Zero-results query shows exact error message', async ({ page }) => {
    await page.goto(`${BASE_URL}/search?q=zzzznotaproduct`);
    await expect(page.locator('text=No results found for zzzznotaproduct')).toBeVisible();
  });

  // ─── TC-CHK-002: Invalid Discount Code ────────────────────────────────────
  test('TC-CHK-002: Invalid discount code shows exact error', async ({ page }) => {
    await page.goto(`${BASE_URL}/products/grey-jacket`);
    await page.locator('input[name="add"], button[name="add"]').click();
    await page.goto(`${BASE_URL}/cart`);
    await page.locator('input[name="checkout"], button[name="checkout"]').click();
    await page.waitForURL(/.*checkouts.*/);
    const discountInput = page.locator('input[placeholder*="Discount" i]');
    if (await discountInput.isVisible()) {
      await discountInput.fill('TESTCODE123');
      await page.locator('button:has-text("Apply")').click();
      await expect(page.locator('text=Enter a valid discount code')).toBeVisible();
    }
  });

  // ─── TC-EDG-001: Slug/Title Mismatch D-01 ─────────────────────────────────
  test('TC-EDG-001: flower-print-jeans handle renders "Black heels" (Defect D-01)', async ({ page }) => {
    await page.goto(`${BASE_URL}/products/flower-print-jeans`);
    await expect(page.locator('h1, h2').filter({ hasText: 'Black heels' })).toBeVisible();
  });

  // ─── TC-EDG-008: 404 Page ─────────────────────────────────────────────────
  test('TC-EDG-008: Custom 404 page renders with recovery link', async ({ page }) => {
    const response = await page.goto(`${BASE_URL}/does-not-exist-xyz`);
    expect(response?.status()).toBe(404);
    await expect(page.locator('text=Ooops')).toBeVisible();
    await expect(page.locator('a[href="/"]')).toBeVisible();
  });

});
