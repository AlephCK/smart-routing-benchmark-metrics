# Test Suite 05: Checkout Flow & Bogus Gateway
**Model:** Gemini 3.8 Flash High  
**Module:** Hosted Shopify Checkout, Order Summary, Coupon Validation & Test Cards  
**Target:** `https://sauce-demo.myshopify.com/` (Hosted Checkout)

---

### TC-CHK-001: Hosted Shopify Checkout Initiation & Summary
- **Priority:** P0 (Critical Path)
- **Type:** Functional / Checkout Integration
- **Pre-conditions:** Cart contains 1 item `Grey jacket` (£50.00).
- **Test Steps:**
  1. From `/cart`, click `CHECK OUT` (`input[name="checkout"]`).
  2. Observe redirection to secure Shopify hosted checkout (`https://sauce-demo.myshopify.com/checkouts/cn/...`).
  3. Inspect Order Summary accordion:
     - Line item: `Grey jacket` (£50.00).
     - Subtotal: `£50.00`.
     - Shipping: Pre-selected `£20.00` (International Shipping).
     - Total: `£70.00`.
- **Expected Results:**
  - Checkout loads securely with HTTPS.
  - Subtotal and total match cart values exactly plus designated shipping charge.

---

### TC-CHK-002: Invalid Promo / Discount Code Error Handling
- **Priority:** P0 (Critical Path)
- **Type:** Negative Testing / Form Validation
- **Pre-conditions:** User is on checkout page.
- **Test Steps:**
  1. Locate the discount code input field (`input[placeholder="Discount code"]` or `name="reduction_code"`).
  2. Enter invalid promo string: `INVALID123`.
  3. Click `Apply` button.
  4. Wait for validation response.
- **Expected Results:**
  - System rejects code.
  - Clear, accessible error message renders: `"Enter a valid discount code"`.
  - Order subtotal remains unchanged at `£70.00`.
  - Form does not reset or erase other entered fields.

---

### TC-CHK-003: Customer Contact Email Format Validation
- **Priority:** P1 (High)
- **Type:** Field Validation / Error Handling
- **Pre-conditions:** User on checkout information step.
- **Test Steps:**
  1. In `Email` field, enter an invalid format: `user@@notanemail`.
  2. Tab or click into shipping address.
  3. Attempt to proceed by clicking `Continue to payment` / `Pay now`.
- **Expected Results:**
  - Field indicates error state (red border or inline warning).
  - Validation message states: `"Enter a valid email"` or equivalent HTML5 validation.
  - Form submission is blocked until valid email is provided.

---

### TC-CHK-004: Delivery Address Required Fields Validation
- **Priority:** P1 (High)
- **Type:** Field Validation
- **Pre-conditions:** Valid email `qa-tester@example.com` entered.
- **Test Steps:**
  1. Leave `First name`, `Last name`, `Address`, `City`, and `Postal code` empty.
  2. Click `Pay now` or `Continue`.
- **Expected Results:**
  - Submission is halted.
  - Highlighting or tooltip points to mandatory missing fields:
    - `"Enter an address"`
    - `"Enter a city"`
    - `"Enter a postal code"`

---

### TC-CHK-005: International Shipping Fee Application
- **Priority:** P0 (Critical Path)
- **Type:** Calculation / Pricing
- **Pre-conditions:** Complete address entered with Country set to United Kingdom or United States.
- **Test Steps:**
  1. Inspect Shipping Method radio buttons / section.
  2. Verify available rate is labeled `"International Shipping"` with rate `£20.00`.
  3. Verify calculation:
     $$\text{Total} = \text{Subtotal (£50.00)} + \text{Shipping (£20.00)} = \text{£70.00}$$
- **Expected Results:**
  - Shipping rate is correctly reflected in the final charge line.

---

### TC-CHK-006: Bogus Gateway Simulation - Successful Payment (Card '1')
- **Priority:** P0 (Critical Path)
- **Type:** Payment Gateway / End-to-End Simulation
- **Pre-conditions:** Bogus Gateway test instructions are displayed on screen:
  - Card Number: `1`
  - Name on Card: `Bogus Gateway`
  - Expiration Date: Any valid future date (e.g., `12/28`)
  - Security Code (CVV): `123`
- **Test Steps:**
  1. Enter valid contact information and shipping address.
  2. In the Shopify Bogus Gateway payment iframe:
     - Card number: `1`
     - Expiration: `12/28`
     - CVV: `123`
  3. Check `"Use shipping address as billing address"`.
  4. Click `Pay now`.
- **Expected Results:**
  - Gateway processes transaction successfully.
  - Browser redirects to order confirmation / thank you page (`/checkouts/.../thank_you`).
  - Order number and confirmation summary are displayed.

---

### TC-CHK-007: Bogus Gateway Simulation - Declined Transaction (Card '2')
- **Priority:** P1 (High)
- **Type:** Payment Gateway / Negative Flow
- **Pre-conditions:** Checkout address filled.
- **Test Steps:**
  1. In the payment card number field, enter: `2`.
  2. Enter valid expiration (`12/28`) and CVV (`123`).
  3. Click `Pay now`.
- **Expected Results:**
  - Gateway returns transaction decline status.
  - Clear user-facing error message appears: `"Your payment could not be processed. Card was declined."`
  - User remains on checkout page with order preserved to allow retry.

---

### TC-CHK-008: Bogus Gateway Simulation - Gateway Failure / Error (Card '3')
- **Priority:** P1 (High)
- **Type:** Payment Gateway / Exception Handling
- **Pre-conditions:** Checkout address filled.
- **Test Steps:**
  1. In the payment card number field, enter: `3`.
  2. Enter valid expiration (`12/28`) and CVV (`123`).
  3. Click `Pay now`.
- **Expected Results:**
  - Gateway simulates technical server/network error.
  - Error message informs user: `"There was an error processing your payment. Please try again or contact your card issuer."`
  - System does not crash or double charge.
