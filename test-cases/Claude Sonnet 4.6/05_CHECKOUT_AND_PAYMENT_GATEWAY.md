# Test Suite 05: Checkout Flow & Bogus Gateway
**Model:** Claude Sonnet 4.6 (Thinking)
**Module:** Shopify Hosted Checkout, Coupon Validation, Shipping & Payment Simulation
**Target:** `https://sauce-demo.myshopify.com/`

---

### TC-CHK-001: Checkout Initiation & Order Summary Accuracy
- **Priority:** P0 (Critical Path)
- **Type:** Functional / Integration
- **Pre-conditions:** Cart contains 1 `Grey jacket` (£55.00).
- **Test Steps:**
  1. From `/cart`, click `"Check Out"` (`<input name="checkout">`).
  2. Verify redirect to `https://sauce-demo.myshopify.com/checkouts/cn/...` (HTTPS secured).
  3. Expand `"Order summary"` accordion if collapsed.
  4. Verify line item: `Grey jacket` × 1 = `£55.00`.
  5. Verify subtotal: `£55.00`.
  6. Verify shipping: `International Shipping` = `£20.00`.
  7. Verify total: `GBP £75.00`.
- **Expected Results:**
  - Checkout loads under HTTPS. Total = Subtotal + Shipping = £55.00 + £20.00 = £75.00.

---

### TC-CHK-002: Discount Code Input — Invalid Code Error Message
- **Priority:** P0 (Critical Path)
- **Type:** Negative Testing / Form Validation
- **Pre-conditions:** User is on the checkout page.
- **Test Steps:**
  1. Locate discount code input (`placeholder="Discount code"`).
  2. Enter `TESTCODE123`.
  3. Click the `"Apply"` button.
  4. Wait for validation response.
  5. Inspect the exact error rendered.
- **Expected Results:**
  - Error renders in red, directly below input, with `aria-invalid="true"` on input.
  - **Exact error message:** `"Enter a valid discount code"`
  - Order total remains unchanged at `£75.00`.
  - No other form fields are cleared.

---

### TC-CHK-003: Contact Section — Email Field Validation
- **Priority:** P1 (High)
- **Type:** Field Validation / Error Handling
- **Pre-conditions:** On checkout page, `Contact` section heading visible.
- **Test Steps:**
  1. In the `Email` field, enter an invalid format: `@@invalidemail`.
  2. Tab to the next field or click `"Pay now"`.
  3. Inspect validation message.
- **Expected Results:**
  - Input enters error state (red border or inline tooltip).
  - Validation message: `"Enter a valid email"` or native browser HTML5 validation.
  - Form submission is blocked.

---

### TC-CHK-004: Delivery Form — Required Fields Validation
- **Priority:** P1 (High)
- **Type:** Field Validation
- **Pre-conditions:** Valid email entered; delivery fields left empty.
- **Test Steps:**
  1. Enter valid email `tester@qa.example.com`.
  2. Leave `Last name`, `Address`, and `City` blank.
  3. Click `"Pay now"`.
  4. Observe which fields highlight as errors.
- **Expected Results:**
  - Required fields: `Last name`, `Address`, `City` show inline error messages.
  - Optional fields (Company, Apartment/Suite, Postal code, Phone) do not block submission.

---

### TC-CHK-005: Shipping Method — International Shipping Rate Displayed
- **Priority:** P0 (Critical Path)
- **Type:** Pricing / Shipping Calculation
- **Pre-conditions:** Delivery address completed.
- **Test Steps:**
  1. Complete the delivery address form.
  2. Inspect the `"Shipping method"` section.
  3. Verify exactly one rate shown: `"International Shipping"` = `£20.00`.
  4. Confirm order summary updates: Subtotal + £20.00 shipping.
- **Expected Results:**
  - Single rate `"International Shipping"` at `£20.00` shown. No other rates present.

---

### TC-CHK-006: Bogus Gateway Instructions Visible on Payment Section
- **Priority:** P0 (Critical Path)
- **Type:** Integration / Test Environment Verification
- **Pre-conditions:** On checkout page, payment section visible.
- **Test Steps:**
  1. Scroll to the `Payment` section.
  2. Verify subheading: `"Testing instruction"` (or `"Testing instructions"`).
  3. Confirm on-screen text shows all 3 test card codes:
     - `"1 · to simulate an approved transaction"`
     - `"2 · to simulate a declined transaction"`
     - `"3 · to simulate a gateway failure"`
  4. Verify iframe fields: `Card number`, `Expiration date (MM / YY)`, `Security code`, `Name on card`.
- **Expected Results:**
  - All 3 card simulation instructions are visible. Payment iframe loads without error.

---

### TC-CHK-007: Bogus Gateway — Approved Transaction (Card `1`)
- **Priority:** P0 (Critical Path)
- **Type:** End-to-End Payment Flow
- **Pre-conditions:** Contact and delivery fields completed.
- **Test Steps:**
  1. In the card number iframe field, enter: `1`.
  2. Enter expiration: `12/28` (any future date).
  3. Enter security code: `123`.
  4. Verify `"Use shipping address as billing address"` checkbox is checked.
  5. Click `"Pay now (£75.00)"`.
- **Expected Results:**
  - Redirect to order confirmation page (`/checkouts/.../thank_you`).
  - Confirmation shows order number and line item summary.

---

### TC-CHK-008: Bogus Gateway — Declined (Card `2`) & Gateway Failure (Card `3`)
- **Priority:** P1 (High)
- **Type:** Payment Error Handling / Negative Flows
- **Pre-conditions:** Delivery address completed.
- **Test Steps:**
  1. Enter card `2`; complete all other fields; click `"Pay now"`.
  2. Record exact error message shown.
  3. Re-enter with card `3`; click `"Pay now"`.
  4. Record exact error message shown.
- **Expected Results:**
  - Card `2`: Decline message displayed; user stays on checkout; order preserved.
  - Card `3`: Gateway failure message displayed; system does not double-charge.
