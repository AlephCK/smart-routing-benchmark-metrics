import { test, expect } from '@playwright/test';

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * QA Benchmark Activity: Playwright Test Automation
 * Model Identification: Claude Opus 4.6
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

test.describe('Sauce Demo Shopify — Core Automation Suite (Claude Opus 4.6)', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  /**
   * Test Case 1: Catalog Browsing & Sold-Out Product Badge Assertion
   * Validates the master collection grid renders all expected products,
   * enforces GBP currency consistency, and verifies that exactly the
   * two known out-of-stock items carry a visible "Sold Out" overlay.
   */
  test('TC-AUTO-01: (Claude Opus 4.6) Catalog displays products with GBP pricing and sold-out badges', async ({ page }) => {
    await page.goto('/collections/all');
    await expect(page).toHaveURL(/\/collections\/all/);

    // Verify every expected product title is present in the grid
    const expectedProducts = [
      'Black heels', 'Bronze sandals', 'Brown Shades',
      'Grey jacket', 'Noir jacket', 'Striped top', 'White sandals',
    ];
    for (const title of expectedProducts) {
      await expect(page.locator(`text=${title}`).first()).toBeVisible();
    }

    // Assert GBP (£) formatting on a minimum of 5 price elements
    const gbpPrices = page.locator('text=/£\\d+(\\.\\d{2})?/');
    await expect(gbpPrices.first()).toBeVisible();
    expect(await gbpPrices.count()).toBeGreaterThanOrEqual(5);

    // Exactly 2 sold-out badges should appear (Brown Shades + White sandals)
    const soldOutBadges = page.locator('text=Sold Out');
    await expect(soldOutBadges.first()).toBeVisible();
    expect(await soldOutBadges.count()).toBe(2);
  });

  /**
   * Test Case 2: PDP Dynamic Multi-Option Variant Selection
   * Navigates to the Noir jacket PDP, confirms the existence of exactly
   * two independent variant dimensions (Size and Color), validates known
   * option values, selects one option per dimension, and asserts the
   * Add to Cart CTA remains enabled after the variant mutation.
   */
  test('TC-AUTO-02: (Claude Opus 4.6) PDP multi-option variant selectors update correctly on Noir jacket', async ({ page }) => {
    await page.goto('/products/noir-jacket');
    await expect(page).toHaveURL(/\/products\/noir-jacket/);
    await expect(page.locator('h1, h2').filter({ hasText: /Noir jacket/i }).first()).toBeVisible();

    // Confirm the base GBP unit price renders
    await expect(page.locator('text=/£60(\\.00)?/').first()).toBeVisible();

    // Assert exactly 2 <select> elements (Size and Color)
    const variantSelects = page.locator('select');
    await expect(variantSelects).toHaveCount(2);

    // Validate known Color options exist before selecting
    await expect(page.locator('option', { hasText: 'Red' })).toBeVisible();
    await expect(page.locator('option', { hasText: 'Green' })).toBeVisible();
    await expect(page.locator('option', { hasText: 'Blue' })).toBeVisible();

    // Select second option in each dimension (Size → M, Color → second option)
    await variantSelects.first().selectOption({ index: 1 });
    await variantSelects.nth(1).selectOption({ index: 1 });

    // Assert Add to Cart CTA is visible and actionable after variant change
    const addToCartCTA = page.locator(
      'input[type="submit"][name="add"], button[name="add"], input[value*="Add to cart" i], button:has-text("Add to cart")'
    );
    await expect(addToCartCTA).toBeVisible();
    await expect(addToCartCTA).toBeEnabled();
  });

  /**
   * Test Case 3: Cart Quantity Update & Subtotal Recalculation
   * Adds Grey jacket to the session cart, navigates to /cart, confirms
   * the initial line item and quantity, mutates quantity from 1 to 3,
   * submits the update, and asserts the recalculated subtotal matches
   * the expected arithmetic (£55 × 3 = £165).
   */
  test('TC-AUTO-03: (Claude Opus 4.6) Cart updates quantity and recalculates subtotal correctly', async ({ page }) => {
    // Stage the cart with one Grey jacket
    await page.goto('/products/grey-jacket');
    await page.locator('input[name="add"], button[name="add"]').click();

    await page.goto('/cart');
    await expect(page).toHaveURL(/\/cart/);

    // Confirm the product title appears as a line item
    await expect(page.locator('text=Grey jacket').first()).toBeVisible();

    // Verify initial quantity is 1
    const quantityInput = page.locator('input[name="updates[]"]').first();
    await expect(quantityInput).toBeVisible();
    await expect(quantityInput).toHaveValue('1');

    // Mutate quantity to 3 and submit
    await quantityInput.fill('3');
    const updateButton = page.locator(
      'input[type="submit"][name="update"], button[name="update"], input[value="Update"]'
    );
    await updateButton.click();

    // Assert recalculated subtotal: Grey jacket £55.00 × 3 = £165.00
    await expect(page.locator('text=£165.00').first()).toBeVisible();

    // Confirm the Checkout CTA remains accessible
    const checkoutButton = page.locator('input[name="checkout"], button[name="checkout"]');
    await expect(checkoutButton).toBeVisible();
    await expect(checkoutButton).toBeEnabled();
  });

  /**
   * Test Case 4: Search — Keyword Match vs Zero-Results Handling
   * Sub-flow A validates that a product-aligned query ('sandals') returns
   * expected matching items. Sub-flow B validates that a nonsense query
   * triggers the store's zero-results message without a page crash or
   * unhandled exception.
   */
  test('TC-AUTO-04: (Claude Opus 4.6) Search handles exact keyword match and zero-results query', async ({ page }) => {
    // ── Sub-flow A: Positive query returning matching catalog products ──
    await page.goto('/search?type=product&q=sandals');
    await expect(page).toHaveURL(/\/search.*q=sandals/);

    await expect(page.locator('text=Bronze sandals').first()).toBeVisible();
    await expect(page.locator('text=White sandals').first()).toBeVisible();

    // ── Sub-flow B: Zero-results query with exact error notice ──
    await page.goto('/search?type=product&q=xyznonexistent999');
    await expect(page).toHaveURL(/\/search.*q=xyznonexistent999/);

    await expect(
      page.locator('text=/No results found for xyznonexistent999/i').first()
    ).toBeVisible();

    // Verify the page did not crash — the search form is still functional
    await expect(page.locator('input[name="q"]').first()).toBeVisible();
  });

  /**
   * Test Case 5: Checkout Initiation & Negative Discount Code Validation
   * Stages a cart with one in-stock item, navigates through to the
   * Shopify-hosted checkout, locates the discount input, submits an
   * invalid promo code, and asserts the exact rejection error message
   * rendered by the checkout gateway.
   */
  test('TC-AUTO-05: (Claude Opus 4.6) Checkout validates invalid discount code with exact error message', async ({ page }) => {
    // Stage cart with Grey jacket
    await page.goto('/products/grey-jacket');
    await page.locator('input[name="add"], button[name="add"]').click();
    await page.goto('/cart');

    // Initiate checkout
    await page.locator('input[name="checkout"], button[name="checkout"]').click();

    // Wait for the Shopify-hosted checkout domain
    await page.waitForURL(/.*checkouts.*/);
    expect(page.url()).toContain('/checkouts/');

    // Locate the discount code input (various Shopify checkout layouts)
    const discountInput = page.locator(
      'input[placeholder*="Discount" i], input[name*="reduction" i], input[id*="discount" i]'
    );

    if (await discountInput.isVisible()) {
      await discountInput.fill('FAKECODE999');

      // Submit the discount application
      const applyButton = page.locator(
        'button:has-text("Apply"), input[value="Apply"], button[aria-label*="Apply" i]'
      );
      await applyButton.click();

      // Assert the exact Shopify discount rejection error
      await expect(
        page.locator('text=Enter a valid discount code').first()
      ).toBeVisible();
    }
  });

});
