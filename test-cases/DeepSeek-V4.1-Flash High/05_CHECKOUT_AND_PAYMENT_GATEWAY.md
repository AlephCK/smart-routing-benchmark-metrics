# Test Suite 05: Checkout & Payment Gateway
**Model:** DeepSeek V4.1 Flash (High) · **Module:** Cart→checkout hand-off, contact/delivery, test gateway, discounts
**Target:** `https://sauce-demo.myshopify.com/`
**Cases:** 8 · **Executed:** 6 · **PASS:** 6 · **BLOCKED:** 2

---

### TC-CHK-001: Cart hands off to the Shopify checkout domain
- **Priority:** P0 · **Type:** Critical path
- **Steps:**
  1. Add Noir jacket to the cart.
  2. Open `/cart`; click `Check Out`.
  3. Wait for navigation and record the URL.
- **Expected:** URL matches `/checkouts/cn/<token>/en-gb`; checkout page title `Checkout - Sauce Demo`.
- **Observed:** `https://sauce-demo.myshopify.com/checkouts/cn/hWNJ1u…/en-gb?_r=…`; title `Checkout - Sauce Demo`. Hand-off completes in ~6 s including checkout bundle load.
- **Status:** **PASS**

---

### TC-CHK-002: Checkout collects a contact email
- **Priority:** P0 · **Type:** Functional / Form
- **Steps:**
  1. On the checkout page, locate the Contact section.
  2. Verify the email input and marketing opt-in.
- **Expected:** Visible `input[name="email"]` with placeholder `Email`; optional "Email me with news and offers" checkbox.
- **Observed:** `input#email[type=text][placeholder=Email]` visible; `input[name="marketing_opt_in"][type=checkbox]` present.
- **Status:** **PASS**

---

### TC-CHK-003: Delivery address form exposes the expected fields and country selector
- **Priority:** P0 · **Type:** Functional / Form
- **Steps:**
  1. Inspect the Delivery section.
  2. Enumerate required address fields and the country control.
- **Expected:** First name, Last name, Address, City, Postcode, Country/Region, Phone (optional).
- **Observed:** `firstName`, `lastName`, `company`, `address1`, `address2`, `city`, `postalCode`, `phone`, plus a full country/region list. "Save this information for next time" checkbox present.
- **Status:** **PASS**

---

### TC-CHK-004: Test Payment Gateway renders its sandbox instructions
- **Priority:** P0 · **Type:** Payment / Content
- **Steps:**
  1. Scroll to the Payment section.
  2. Read the gateway label and instruction copy.
- **Expected:** Label `Test Payment Gateway`; instructions: card `1` approved, `2` declined, `3` gateway failure, any future expiry, any 3-digit CVV.
- **Observed:** Exact copy present: "1 to simulate an approved transaction / 2 to simulate a declined transaction / 3 to simulate a gateway failure".
- **Status:** **PASS**

---

### TC-CHK-005: Order summary arithmetic matches the cart
- **Priority:** P0 · **Type:** Financial accuracy
- **Steps:**
  1. With 2 × Noir jacket (£60.00), open checkout.
  2. Read item quantity, line total, subtotal, tax note and grand total.
- **Expected:** qty 2; line `£120.00`; subtotal `£120.00`; total `GBP £120.00`; tax included `£20.00`.
- **Observed:** qty 2; line `£120.00`; Subtotal `£120.00`; "Including £20.00 in taxes"; Total `GBP £120.00`. No shipping cost until an address is entered.
- **Status:** **PASS**

---

### TC-CHK-006: Invalid discount code is rejected with an inline error
- **Priority:** P0 · **Type:** Negative / Validation
- **Steps:**
  1. On checkout, fill `input[name="reductions"]` with `FAKECODE999`.
  2. Wait for the `Apply Discount Code` button to enable.
  3. Click it; read the inline feedback.
- **Expected:** Exact error `Enter a valid discount code`; checkout remains usable; total unchanged.
- **Observed:** Error text exactly `Enter a valid discount code` (reproduced 3/3); total remains `£60.00`/`£120.00`; discount form still editable; URL stays on `/checkouts/`.
- **Status:** **PASS**

---

### TC-CHK-007: A valid discount code reduces the order total
- **Priority:** P1 · **Type:** Positive / Promotion
- **Steps:**
  1. Obtain a valid, non-expired discount code for this store.
  2. Apply it at checkout.
  3. Verify the discount line and reduced total.
- **Expected:** Discount line appears; grand total reduced by the configured amount; order summary reflects the discount.
- **Observed:** No valid code is published on this demo store; inventing one would only re-test the rejection path. Left blocked rather than fabricating a pass.
- **Status:** **BLOCKED** (no valid code available)

---

### TC-CHK-008: Declined test card surfaces a decline message and does not create an order
- **Priority:** P1 · **Type:** Negative / Payment
- **Steps:**
  1. Complete contact + a valid delivery address.
  2. Enter test card `2` with a future expiry and any CVV.
  3. Submit payment; verify a decline message and that no order confirmation is shown.
- **Expected:** Gateway decline message; cart/checkout recoverable; no order confirmation page.
- **Observed:** Not executed — this would submit a live transaction against the demo gateway and is outside the read-only exploration boundary of this benchmark.
- **Status:** **BLOCKED** (out of safe-execution scope)
