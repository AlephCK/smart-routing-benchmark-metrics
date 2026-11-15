# Test Suite 04: Cart & Mini-Cart Drawer
**Model:** Claude Sonnet 4.6 (Thinking)
**Module:** Mini-Cart Banner, Full Cart Page (`/cart`), Quantity Recalculation & Order Notes
**Target:** `https://sauce-demo.myshopify.com/`

---

### TC-CRT-001: Mini-Cart Drawer Toggle — Empty State Message
- **Priority:** P1 (High)
- **Type:** Functional / Visual
- **Pre-conditions:** Fresh session with 0 cart items.
- **Test Steps:**
  1. Navigate to homepage `/`.
  2. Click `"My Cart (0)"` in the top utility bar.
  3. Observe the top drawer overlay that opens.
  4. Read the empty-state message text.
- **Expected Results:**
  - Drawer slides down from header.
  - Displays empty notice (e.g. `"Your cart is empty."` or similar).

---

### TC-CRT-002: Mini-Cart — Populated Item Display & Variant Label
- **Priority:** P0 (Critical Path)
- **Type:** Functional / UI State
- **Pre-conditions:** Add `Noir jacket` Size `M` / Colour `Red` to cart from PDP.
- **Test Steps:**
  1. Add `Noir jacket - M / Red` to cart.
  2. Click `"My Cart (1)"` to open the drawer.
  3. Verify the mini-cart drawer shows:
     - Thumbnail of Noir jacket.
     - Product title + variant: `"Noir jacket - M / Red"`.
     - Quantity input or display showing `1`.
     - Unit price: `£60.00`.
     - `"Remove"` link.
     - `"Check Out"` button.
- **Expected Results:**
  - Variant label is correctly formatted with both options (e.g. `"M / Red"`).
  - `"Check Out"` button navigates to Shopify hosted checkout.

---

### TC-CRT-003: Floating Badge Counter Increments & Persists
- **Priority:** P1 (High)
- **Type:** UI State Synchronization
- **Pre-conditions:** Fresh session, 0 items.
- **Test Steps:**
  1. Add `Grey jacket - S` from `/products/grey-jacket`.
  2. Observe cart icon: badge displays `1`, header reads `"My Cart (1)"`.
  3. Navigate to `/products/striped-top`, click `"Add to Cart"`.
  4. Observe badge updates to `2`, header reads `"My Cart (2)"`.
  5. Navigate to `/collections/all` (a different page).
  6. Confirm counter still reads `"My Cart (2)"`.
- **Expected Results:**
  - Badge increments in real time and persists across page navigations.

---

### TC-CRT-004: Full Cart Page — Layout, Line Items & Totals
- **Priority:** P0 (Critical Path)
- **Type:** Functional / Calculation Verification
- **Pre-conditions:** Cart contains 2 units of `Noir jacket` (£60.00 × 2 = £120.00).
- **Test Steps:**
  1. Navigate to `https://sauce-demo.myshopify.com/cart`.
  2. Verify heading and structure: `"Description"` column heading visible.
  3. Verify line item shows: thumbnail, `"Noir jacket - M / Red"`, vendor `"Sauce Demo"` or `"ASOS"`, quantity input `<input name="updates[]">`, price `× £60.00`.
  4. Verify totals section shows prominent heading: `"Total £120.00"`.
  5. Verify buttons: `"« Continue Shopping"` → `/collections/all`, `"Update"`, `"Check Out"`.
- **Expected Results:**
  - Cart renders correct line items and accurate total calculation.

---

### TC-CRT-005: Quantity Update & Subtotal Recalculation
- **Priority:** P0 (Critical Path)
- **Type:** Business Logic / Arithmetic
- **Pre-conditions:** Cart contains 2 items of `Noir jacket` at £60.00 each; subtotal = £120.00.
- **Test Steps:**
  1. On `/cart`, change quantity input from `2` to `3`.
  2. Click `"Update"` button.
  3. Wait for page reload.
  4. Verify new total heading: `"Total £180.00"` (3 × £60.00).
  5. Verify cart header updates to `"My Cart (3)"`.
- **Expected Results:**
  - Quantity and total recalculate correctly with no rounding errors.

---

### TC-CRT-006: Line Item Removal via Zero Quantity
- **Priority:** P0 (Critical Path)
- **Type:** Functional / Session Update
- **Pre-conditions:** Cart contains 1 item on `/cart`.
- **Test Steps:**
  1. On `/cart`, change quantity input to `0`.
  2. Click `"Update"`.
  3. Observe page reload.
- **Expected Results:**
  - Line item is removed from the cart table.
  - Empty cart message displays: `"It appears that your cart is currently empty! Continue Shopping."` with `"Continue Shopping"` hyperlinked to `/collections/all`.
  - Header updates to `"My Cart (0)"`.

---

### TC-CRT-007: Order Notes Textarea — Persistence After Update
- **Priority:** P1 (High)
- **Type:** Functional / Form State Persistence
- **Pre-conditions:** Cart contains at least 1 item; on `/cart`.
- **Test Steps:**
  1. Locate `<textarea name="note">` with placeholder `"Add a note to your order..."`.
  2. Enter: `"Fragile – please handle with care. Deliver after 10 AM."`.
  3. Click `"Update"` button.
  4. After page reload, verify the textarea still contains the entered note text.
- **Expected Results:**
  - Note text is preserved via Shopify cart attributes across update actions.
  - Text is carried into the checkout order object.
