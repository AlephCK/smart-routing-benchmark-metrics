# Test Suite 05: Checkout Flow & Payment Gateway
**Model:** Claude Opus 4.6 (Thinking)
**Module:** Hosted Shopify Checkout, Discount Validation, Shipping & Bogus Gateway Verification
**Target:** `https://sauce-demo.myshopify.com/`

---

### TC-CHK-001: Checkout Redirection & Total Calculation Accuracy
- **Priority:** P0 (Critical Path)
- **Type:** Functional / Integration
- **Pre-conditions:** Cart contains 1 `Striped top` (£50.00).
- **Test Steps:**
  1. From `/cart`, click `Check Out` button (`input[name="checkout"]`).
  2. Verify redirection to `https://sauce-demo.myshopify.com/checkouts/cn/...`.
  3. Verify page title is `Checkout - Sauce Demo`.
  4. Inspect Order Summary section:
     - Line item: `Striped top` = `£50.00`.
     - Subtotal: `£50.00`.
     - Shipping rate: `International Shipping` = `£20.00`.
     - Total: `GBP £70.00`.
  5. Verify CTA button reads: `Pay now £70.00`.
- **Expected Results:**
  - Secure HTTPS checkout loads; subtotal, shipping, and total match arithmetic expectation exactly.

---

### TC-CHK-002: Discount Code Input — Invalid Code Error (`FAKECODE999`)
- **Priority:** P0 (Critical Path)
- **Type:** Negative Testing / Validation
- **Pre-conditions:** User on checkout page.
- **Test Steps:**
  1. Expand the discount code accordion (`Add discount` / `Order summary`).
  2. In the `Discount code` textbox, enter: `FAKECODE999`.
  3. Click `Apply` button (`Apply Discount Code`).
  4. Inspect the resulting validation error message.
- **Expected Results:**
  - Submission rejected.
  - Red error text displayed directly beneath input: `"Enter a valid discount code"`.
  - Input field marked with `aria-invalid="true"`.
  - Total charge remains unchanged at `GBP £70.00`.

---

### TC-CHK-003: Contact Information Section & Newsletter Opt-In State
- **Priority:** P1 (High)
- **Type:** Functional / Field Verification
- **Test Steps:**
  1. In the `Contact` section, verify presence of `Email` textbox.
  2. Verify `Sign in` link points to `/account/login?checkout_url=...`.
  3. Verify `Email me with news and offers` checkbox is checked by default.
  4. Enter invalid email string: `invalid-email-format`.
  5. Attempt to proceed.
- **Expected Results:**
  - Field indicates error state and halts progression until valid email format is provided.

---

### TC-CHK-004: Delivery Address Form Validation
- **Priority:** P1 (High)
- **Type:** Form Validation
- **Test Steps:**
  1. Verify `Country/Region` dropdown lists 240+ countries.
  2. Leave mandatory fields (`Last name`, `Address`, `City`) blank.
  3. Click `Pay now`.
- **Expected Results:**
  - Form validation blocks checkout progression; required fields highlight with validation errors.

---

### TC-CHK-005: Shipping Method — International Shipping Cost Calculation
- **Priority:** P0 (Critical Path)
- **Type:** Pricing / Shipping
- **Pre-conditions:** Delivery address completed.
- **Test Steps:**
  1. Scroll to `Shipping method` section.
  2. Verify rate name is explicitly: `International Shipping`.
  3. Verify rate cost is: `£20.00`.
- **Expected Results:**
  - Single rate of `£20.00` is applied without alternative untariffed tiers.

---

### TC-CHK-006: Bogus Gateway Instructions & Iframe Verification
- **Priority:** P0 (Critical Path)
- **Type:** Payment Gateway / Integration
- **Pre-conditions:** User in Payment section.
- **Test Steps:**
  1. Locate the `Payment` section under `Pay with credit card`.
  2. Verify badge: `Test Payment Gateway`.
  3. Verify presence of exact on-screen testing instructions:
     - `"Use these values to test your checkout:"`
     - `"1 · to simulate an approved transaction"`
     - `"2 · to simulate a declined transaction"`
     - `"3 · to simulate a gateway failure"`
     - `"Use any future expiration date and any 3-digit security code."`
  4. Verify support link: `https://help.shopify.com/en/manual/checkout-settings/test-orders/payments-test-mode#test-payment-gateway`.
  5. Verify hosted PCI iframe fields loaded from `https://checkout.pci.shopifyinc.com`.
- **Expected Results:**
  - All test instructions and secure card iframes render correctly.

---

### TC-CHK-007: Bogus Gateway Simulation — Successful Transaction (Card `1`)
- **Priority:** P0 (Critical Path)
- **Type:** End-to-End Payment Simulation
- **Pre-conditions:** Valid contact and delivery info entered.
- **Test Steps:**
  1. In the payment iframes, enter:
     - Card number: `1`
     - Expiration date: `12/28` (any future MM/YY)
     - Security code: `123`
     - Name on card: `Bogus Gateway Tester`
  2. Confirm `"Use shipping address as billing address"` is checked.
  3. Click `Pay now`.
- **Expected Results:**
  - Transaction succeeds; browser redirects to order confirmation (`/thank_you`) with an assigned order number.

---

### TC-CHK-008: Bogus Gateway Simulation — Declined (Card `2`) & Gateway Error (Card `3`)
- **Priority:** P1 (High)
- **Type:** Negative Flow / Error Handling
- **Test Steps:**
  1. Enter Card `2` with future expiration and CVV; click `Pay now`.
  2. Confirm decline error message renders.
  3. Re-enter with Card `3`; click `Pay now`.
  4. Confirm gateway error message renders.
- **Expected Results:**
  - Card 2 simulates decline; Card 3 simulates technical gateway failure. Session and order items remain preserved.
