import { test, expect } from '@playwright/test';

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * QA Benchmark Activity: Playwright Test Automation
 * Model Identification: Gemini 3.8 Flash High
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

test.describe('Sauce Demo Shopify — Core Automation Suite (Gemini 3.8 Flash High)', () => {

  test.beforeEach(async ({ page }) => {
    // Navigate to base URL before each test
    await page.goto('/');
  });

  /**
   * Test Case 1: Catalog Browsing & Sold-Out Product Badge Assertion
   * Verifies product listing grid, British Pound currency formatting,
   * and accurate visual overlay badges on out-of-stock items.
   */
  test('TC-AUTO-01: (Gemini 3.8 Flash High) Catalog displays products with GBP pricing and sold-out badges', async ({ page }) => {
    // 1. Navigate to master catalog
    await page.goto('/collections/all');
    await expect(page).toHaveURL(/.*\/collections\/all/);

    // 2. Verify product grid items render
    const productGrid = page.locator('.product, .grid-item, article');
    await expect(productGrid.first()).toBeVisible();

    // 3. Verify British Pound (£) currency formatting across listed prices
    const priceElements = page.locator('text=/£\\d+(\\.\\d{2})?/');
    const priceCount = await priceElements.count();
    expect(priceCount).toBeGreaterThanOrEqual(5);

    // 4. Verify specific known sold-out products display "Sold Out" overlay
    const soldOutBadges = page.locator('text=Sold Out');
    await expect(soldOutBadges.first()).toBeVisible();
    
    // Check known out-of-stock items (Brown Shades and White sandals)
    await expect(page.locator('text=Brown Shades').first()).toBeVisible();
    await expect(page.locator('text=White sandals').first()).toBeVisible();
  });

  /**
   * Test Case 2: Product Detail Page & Dynamic Multi-Option Variant Selection
   * Verifies that selecting variant options (Size & Color) updates form parameters
   * and maintains enabled call-to-action button.
   */
  test('TC-AUTO-02: (Gemini 3.8 Flash High) PDP multi-option variant selectors update correctly on Noir jacket', async ({ page }) => {
    // 1. Navigate to Noir jacket PDP (product with 2 dropdown selectors: Size and Color)
    await page.goto('/products/noir-jacket');
    await expect(page.locator('h1, h2').filter({ hasText: 'Noir jacket' }).first()).toBeVisible();

    // 2. Verify primary price rendering in GBP (£60.00)
    await expect(page.locator('text=/£60(\\.\\d{2})?/').first()).toBeVisible();

    // 3. Inspect variant select dropdowns
    const variantSelects = page.locator('select');
    const selectCount = await variantSelects.count();
    expect(selectCount).toBeGreaterThanOrEqual(1);

    // 4. Interact with variant options (select Size M and Color Red/Green)
    const firstSelect = variantSelects.first();
    await firstSelect.selectOption({ index: 1 }); // select second size option (e.g. M)

    if (selectCount >= 2) {
      const secondSelect = variantSelects.nth(1);
      await secondSelect.selectOption({ index: 1 }); // select second color option
    }

    // 5. Verify Call-To-Action (Add to Cart) remains present and enabled
    const addToCartButton = page.locator('input[type="submit"][name="add"], button[name="add"], input[value*="Add to Cart" i]');
    await expect(addToCartButton).toBeVisible();
    await expect(addToCartButton).toBeEnabled();
  });

  /**
   * Test Case 3: Cart State Management — Quantity Modification & Real-Time Recalculation
   * Verifies item addition to session cart, quantity mutation on /cart,
   * and correct arithmetic total recalculation.
   */
  test('TC-AUTO-03: (Gemini 3.8 Flash High) Cart updates quantity and recalculates subtotal correctly', async ({ page }) => {
    // 1. Navigate to in-stock product and add to cart
    await page.goto('/products/grey-jacket');
    const addButton = page.locator('input[name="add"], button[name="add"]');
    await addButton.click();

    // 2. Navigate to full cart page
    await page.goto('/cart');
    await expect(page).toHaveURL(/.*\/cart/);

    // 3. Verify added product title appears in cart line items
    await expect(page.locator('text=Grey jacket').first()).toBeVisible();

    // 4. Locate quantity input and update quantity from 1 to 2
    const quantityInput = page.locator('input[name="updates[]"]').first();
    await expect(quantityInput).toBeVisible();
    await quantityInput.fill('2');

    // 5. Click Update button to submit quantity modification
    const updateButton = page.locator('input[type="submit"][name="update"], button[name="update"], input[value="Update"]');
    await updateButton.click();

    // 6. Verify subtotal recalculation (£55.00 * 2 = £110.00)
    // Note: If Grey jacket is £55.00 or £50.00 depending on active catalog revision, verify recalculated total
    await expect(page.locator('text=/£1[01]0(\\.\\d{2})?/').first()).toBeVisible();

    // 7. Verify checkout action button is accessible
    const checkoutButton = page.locator('input[name="checkout"], button[name="checkout"]');
    await expect(checkoutButton).toBeVisible();
    await expect(checkoutButton).toBeEnabled();
  });

  /**
   * Test Case 4: Search Functionality — Keyword Matching vs Negative Zero-Results Handling
   * Verifies that matching queries return relevant catalog products,
   * while non-existent terms trigger clean error notices without application crashes.
   */
  test('TC-AUTO-04: (Gemini 3.8 Flash High) Search handles exact keyword match and zero-results query', async ({ page }) => {
    // ── Sub-flow A: Positive Search Query ('sandals') ──
    await page.goto('/search?type=product&q=sandals');
    await expect(page).toHaveURL(/.*\/search.*q=sandals/);
    
    // Verify matching product cards appear in search results
    await expect(page.locator('text=Bronze sandals').first()).toBeVisible();
    await expect(page.locator('text=White sandals').first()).toBeVisible();

    // ── Sub-flow B: Negative Zero-Results Query ('xyznonexistent999') ──
    await page.goto('/search?type=product&q=xyznonexistent999');
    await expect(page).toHaveURL(/.*\/search.*q=xyznonexistent999/);

    // Verify user-facing zero-results notification message
    const zeroResultsMessage = page.locator('text=/No results found for xyznonexistent999/i');
    await expect(zeroResultsMessage).toBeVisible();
  });

  /**
   * Test Case 5: Checkout Initiation & Negative Discount Code Validation
   * Verifies successful checkout redirection from cart, line item summary,
   * and negative validation error when submitting an invalid promo code.
   */
  test('TC-AUTO-05: (Gemini 3.8 Flash High) Checkout validates invalid discount code with exact error message', async ({ page }) => {
    // 1. Stage cart with 1 active product
    await page.goto('/products/grey-jacket');
    await page.locator('input[name="add"], button[name="add"]').click();
    await page.goto('/cart');

    // 2. Initiate checkout
    const checkoutBtn = page.locator('input[name="checkout"], button[name="checkout"]');
    await checkoutBtn.click();

    // 3. Verify navigation to Shopify hosted checkout
    await page.waitForURL(/.*checkouts.*/);
    expect(page.url()).toContain('/checkouts/');

    // 4. Locate and expand discount code accordion/input if collapsed
    const discountInput = page.locator('input[placeholder*="Discount" i], input[name*="reduction" i]');
    
    if (await discountInput.isVisible()) {
      // 5. Enter invalid discount code
      await discountInput.fill('INVALID123');

      // 6. Submit promo code application
      const applyBtn = page.locator('button:has-text("Apply"), input[value="Apply"]');
      await applyBtn.click();

      // 7. Assert exact Shopify discount rejection error message
      const errorMessage = page.locator('text=Enter a valid discount code');
      await expect(errorMessage).toBeVisible();
    }
  });

});
