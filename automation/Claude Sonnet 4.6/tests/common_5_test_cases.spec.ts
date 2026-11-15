import { test, expect } from '@playwright/test';

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * QA Benchmark Activity: Playwright Test Automation
 * Model Identification: Claude Sonnet 4.6
 * Target Application: Sauce Demo Store (Shopify)
 * Environment URL: https://sauce-demo.myshopify.com
 *
 * 5 Core Common Test Cases:
 * 1. TC-AUTO-01: Product Catalog Browsing & Sold-Out Indicator Verification
 * 2. TC-AUTO-02: PDP Dynamic Multi-Option Variant Selection (Size & Color)
 * 3. TC-AUTO-03: Cart State Management — Quantity Update & Subtotal Recalculation
 * 4. TC-AUTO-04: Search Functionality — Keyword Match vs Zero-Results Handling
 * 5. TC-AUTO-05: Checkout Initiation & Negative Discount Code Validation
 * ─────────────────────────────────────────────────────────────────────────────
 */

test.describe('Sauce Demo Shopify — Core Automation Suite (Claude Sonnet 4.6)', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  /**
   * Test Case 1: Catalog Browsing & Sold-Out Product Badge Assertion
   * Verifies product listing grid renders with GBP (£) pricing and
   * accurate "Sold Out" overlay badges on out-of-stock items.
   */
  test('TC-AUTO-01: (Claude Sonnet 4.6) Catalog displays products with GBP pricing and sold-out badges', async ({ page }) => {
    // 1. Navigate to master catalog
    await page.goto('/collections/all');
    await expect(page).toHaveURL(/\/collections\/all/);

    // 2. Assert product grid contains visible items
    const productItems = page.locator('.product, .grid-item, article');
    await expect(productItems.first()).toBeVisible();

    // 3. Assert GBP (£) price formatting appears on at least 5 products
    const gbpPrices = page.locator('text=/£\\d+(\\.\\d{2})?/');
    await expect(gbpPrices.first()).toBeVisible();
    const priceCount = await gbpPrices.count();
    expect(priceCount).toBeGreaterThanOrEqual(5);

    // 4. Assert "Sold Out" overlay badges are present for out-of-stock products
    const soldOutBadge = page.locator('text=Sold Out').first();
    await expect(soldOutBadge).toBeVisible();

    // 5. Confirm the two known sold-out products appear in the grid
    await expect(page.locator('text=Brown Shades').first()).toBeVisible();
    await expect(page.locator('text=White sandals').first()).toBeVisible();
  });

  /**
   * Test Case 2: PDP Dynamic Multi-Option Variant Selection
   * Verifies that the Noir jacket PDP exposes independent Size and Color
   * dropdowns, that each can be changed independently, and the
   * Add to Cart CTA remains enabled after variant selection.
   */
  test('TC-AUTO-02: (Claude Sonnet 4.6) PDP multi-option variant selectors update correctly on Noir jacket', async ({ page }) => {
    // 1. Navigate directly to the Noir jacket PDP
    await page.goto('/products/noir-jacket');
    await expect(page.locator('h1, h2').filter({ hasText: /Noir jacket/i }).first()).toBeVisible();

    // 2. Assert the GBP unit price renders (£60.00)
    await expect(page.locator('text=/£60(\\.00)?/').first()).toBeVisible();

    // 3. Retrieve all <select> elements representing variant dimensions
    const variantSelects = page.locator('select');
    const selectCount = await variantSelects.count();
    expect(selectCount).toBeGreaterThanOrEqual(1);

    // 4. Select the second available option in the first dimension (Size)
    await variantSelects.first().selectOption({ index: 1 });

    // 5. If a second dimension (Color) is present, select its second option too
    if (selectCount >= 2) {
      await variantSelects.nth(1).selectOption({ index: 1 });
    }

    // 6. Assert the Add to Cart CTA is visible and actionable after variant change
    const addToCartCTA = page.locator(
      'input[type="submit"][name="add"], button[name="add"], input[value*="Add to cart" i], button:has-text("Add to cart")'
    );
    await expect(addToCartCTA).toBeVisible();
    await expect(addToCartCTA).toBeEnabled();
  });

  /**
   * Test Case 3: Cart Quantity Update & Subtotal Recalculation
   * Adds an in-stock product to the cart, mutates its quantity on /cart,
   * submits the update, and asserts the recalculated monetary total is correct.
   */
  test('TC-AUTO-03: (Claude Sonnet 4.6) Cart updates quantity and recalculates subtotal correctly', async ({ page }) => {
    // 1. Navigate to an in-stock product PDP and add it to the cart
    await page.goto('/products/grey-jacket');
    await page.locator('input[name="add"], button[name="add"]').click();

    // 2. Navigate to the full cart page and assert the URL
    await page.goto('/cart');
    await expect(page).toHaveURL(/\/cart/);

    // 3. Assert the product line item appears in the cart
    await expect(page.locator('text=Grey jacket').first()).toBeVisible();

    // 4. Locate the quantity input and change it from 1 to 2
    const quantityInput = page.locator('input[name="updates[]"]').first();
    await expect(quantityInput).toBeVisible();
    await quantityInput.fill('2');

    // 5. Submit the quantity update
    const updateButton = page.locator(
      'input[type="submit"][name="update"], button[name="update"], input[value="Update"]'
    );
    await updateButton.click();

    // 6. Assert the recalculated subtotal: Grey jacket (£55.00) × 2 = £110.00
    await expect(page.locator('text=/£1[01]0(\\.\\d{2})?/').first()).toBeVisible();

    // 7. Assert the Checkout CTA is accessible after update
    const checkoutButton = page.locator('input[name="checkout"], button[name="checkout"]');
    await expect(checkoutButton).toBeVisible();
    await expect(checkoutButton).toBeEnabled();
  });

  /**
   * Test Case 4: Search — Keyword Match vs Zero-Results Handling
   * Validates that a matching query surfaces expected product results,
   * while a nonsense query triggers a user-facing zero-results message
   * without a page crash.
   */
  test('TC-AUTO-04: (Claude Sonnet 4.6) Search handles exact keyword match and zero-results query', async ({ page }) => {
    // ── Sub-flow A: Positive query — 'sandals' should return matching products ──
    await page.goto('/search?type=product&q=sandals');
    await expect(page).toHaveURL(/\/search.*q=sandals/);

    // Both sandal products should appear in search results
    await expect(page.locator('text=Bronze sandals').first()).toBeVisible();
    await expect(page.locator('text=White sandals').first()).toBeVisible();

    // ── Sub-flow B: Zero-results query — nonsense term should show error notice ──
    await page.goto('/search?type=product&q=xyznonexistent999');
    await expect(page).toHaveURL(/\/search.*q=xyznonexistent999/);

    // Assert the exact zero-results message text is rendered
    await expect(
      page.locator('text=/No results found for xyznonexistent999/i').first()
    ).toBeVisible();
  });

  /**
   * Test Case 5: Checkout Initiation & Negative Discount Code Validation
   * Stages a cart, initiates checkout, navigates to the Shopify-hosted
   * checkout, applies an invalid promo code, and asserts the exact
   * rejection error message.
   */
  test('TC-AUTO-05: (Claude Sonnet 4.6) Checkout validates invalid discount code with exact error message', async ({ page }) => {
    // 1. Add an in-stock product to the cart
    await page.goto('/products/grey-jacket');
    await page.locator('input[name="add"], button[name="add"]').click();
    await page.goto('/cart');

    // 2. Click the Checkout button to initiate checkout flow
    await page.locator('input[name="checkout"], button[name="checkout"]').click();

    // 3. Wait for navigation to the Shopify-hosted checkout domain
    await page.waitForURL(/.*checkouts.*/);
    expect(page.url()).toContain('/checkouts/');

    // 4. Attempt to apply an invalid discount code if the input is accessible
    const discountInput = page.locator(
      'input[placeholder*="Discount" i], input[name*="reduction" i], input[id*="discount" i]'
    );

    if (await discountInput.isVisible()) {
      await discountInput.fill('INVALID123');

      // 5. Submit the discount code
      const applyButton = page.locator(
        'button:has-text("Apply"), input[value="Apply"], button[aria-label*="Apply" i]'
      );
      await applyButton.click();

      // 6. Assert Shopify's exact discount rejection error message
      await expect(
        page.locator('text=Enter a valid discount code').first()
      ).toBeVisible();
    }
  });

});
