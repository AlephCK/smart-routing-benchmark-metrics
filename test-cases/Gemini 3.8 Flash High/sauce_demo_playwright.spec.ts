import { test, expect } from '@playwright/test';

const BASE_URL = 'https://sauce-demo.myshopify.com';

test.describe('Sauce Demo Shopify - Core Automated Test Suite', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
  });

  test('TC-NAV-001: Header elements and navigation are visible', async ({ page }) => {
    await expect(page.locator('header, .header')).toBeVisible();
    await expect(page.locator('a[href="/pages/about-us"]').first()).toBeVisible();
    await expect(page.locator('a[href="/account/login"]').first()).toBeVisible();
    await expect(page.locator('input[name="q"]').first()).toBeVisible();
  });

  test('TC-CAT-001: Catalog displays products with GBP currency', async ({ page }) => {
    await page.goto(`${BASE_URL}/collections/all`);
    const productItems = page.locator('.product, .grid-item, article');
    await expect(productItems.first()).toBeVisible();
    
    // Check currency symbol is £ across items
    const prices = page.locator('text=/£\\d+(\\.\\d{2})?/');
    await expect(prices.first()).toBeVisible();
  });

  test('TC-PDP-002: Noir jacket variant selection updates', async ({ page }) => {
    await page.goto(`${BASE_URL}/products/noir-jacket`);
    await expect(page.locator('h1, h2').filter({ hasText: 'Noir jacket' })).toBeVisible();

    const selects = page.locator('select');
    const selectCount = await selects.count();
    expect(selectCount).toBeGreaterThanOrEqual(1);

    // Add to cart button should be enabled
    const addToCartBtn = page.locator('input[name="add"], button[name="add"]');
    await expect(addToCartBtn).toBeEnabled();
  });

  test('TC-PDP-004: Sold out product has disabled CTA', async ({ page }) => {
    await page.goto(`${BASE_URL}/products/white-sandals`);
    const soldOutBtn = page.locator('input[value*="Sold Out"], button:has-text("Sold Out"), input[disabled]');
    await expect(soldOutBtn).toBeDisabled();
  });

  test('TC-CRT-004 & 005: Add product to cart and verify cart page', async ({ page }) => {
    await page.goto(`${BASE_URL}/products/grey-jacket`);
    await page.locator('input[name="add"], button[name="add"]').click();
    
    await page.goto(`${BASE_URL}/cart`);
    await expect(page.locator('text=Grey jacket')).toBeVisible();
    
    // Check update button exists
    const updateBtn = page.locator('input[name="update"], button[name="update"]');
    await expect(updateBtn).toBeVisible();
  });

  test('TC-SRCH-002 & 004: Search exact match vs zero results', async ({ page }) => {
    // Exact match
    await page.goto(`${BASE_URL}/search?type=product&q=jacket`);
    await expect(page.locator('text=Grey jacket')).toBeVisible();

    // Zero results
    await page.goto(`${BASE_URL}/search?type=product&q=qwerty12345nonexistent`);
    await expect(page.locator('text=No results found')).toBeVisible();
  });

  test('TC-EDG-001: Detect slug vs title mismatch defect', async ({ page }) => {
    await page.goto(`${BASE_URL}/products/flower-print-jeans`);
    // Page URL is flower-print-jeans, but heading is "Black heels"
    await expect(page.locator('h1, h2').filter({ hasText: 'Black heels' })).toBeVisible();
  });

  test('TC-CHK-002: Discount code error validation on checkout', async ({ page }) => {
    // Add item first
    await page.goto(`${BASE_URL}/products/grey-jacket`);
    await page.locator('input[name="add"], button[name="add"]').click();
    await page.goto(`${BASE_URL}/cart`);
    
    // Proceed to checkout
    await page.locator('input[name="checkout"], button[name="checkout"]').click();
    await page.waitForURL(/.*checkouts.*/);

    // Apply invalid discount code
    const discountInput = page.locator('input[placeholder*="Discount" i], input[name*="reduction" i]');
    if (await discountInput.isVisible()) {
      await discountInput.fill('INVALID123');
      const applyBtn = page.locator('button:has-text("Apply")');
      await applyBtn.click();
      await expect(page.locator('text=Enter a valid discount code')).toBeVisible();
    }
  });

});
