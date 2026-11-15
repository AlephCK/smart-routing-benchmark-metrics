# Test Suite 04: Cart & Mini-Cart Drawer
**Model:** Gemini 3.8 Flash High  
**Module:** Mini-Cart Banner, Full Cart Page (`/cart`), Quantity Recalculation & Order Notes  
**Target:** `https://sauce-demo.myshopify.com/`

---

### TC-CRT-001: Mini-Cart Banner Drawer Toggle & Empty State
- **Priority:** P1 (High)
- **Type:** Functional / Visual
- **Pre-conditions:** User session has 0 items in cart.
- **Test Steps:**
  1. Open homepage `/`.
  2. Click `My Cart (0)` in top utility bar (`#cartToggle`).
  3. Observe slide-down mini-cart container.
- **Expected Results:**
  - Drawer slides down into view from top header.
  - Displays explicit empty notice: `"Your cart is empty."`
  - Clicking `My Cart` again closes or collapses the drawer.

---

### TC-CRT-002: Mini-Cart Dynamic Item Display & Direct Checkout Trigger
- **Priority:** P0 (Critical Path)
- **Type:** Functional
- **Pre-conditions:** User has added `Grey jacket` (£50.00) to the cart.
- **Test Steps:**
  1. Click `My Cart (1)` to expand drawer.
  2. Verify contents rendered in mini-cart:
     - Thumbnail image of `Grey jacket`.
     - Title link: `Grey jacket`.
     - Quantity input / display: `1`.
     - Price: `£50.00`.
     - Remove action (`x` or `Remove`).
     - `Check Out` button.
  3. Click `Check Out` button inside drawer.
- **Expected Results:**
  - Drawer displays item details matching added SKU.
  - Clicking `Check Out` navigates immediately to `/cart` or Shopify checkout page.

---

### TC-CRT-003: Floating Cart Badge Counter Synchronization
- **Priority:** P1 (High)
- **Type:** UI State Synchronization
- **Pre-conditions:** Start with 0 items.
- **Test Steps:**
  1. Add 1 item of `Grey jacket` to cart.
  2. Observe top-left floating circular black badge.
  3. Verify badge text displays `1`.
  4. Navigate to `/products/striped-top` and click `ADD TO CART`.
  5. Observe badge text updates to `2`.
- **Expected Results:**
  - Badge counter increments in real time.
  - Persists across page transitions (homepage, collections, PDPs).

---

### TC-CRT-004: Full Cart Page (`/cart`) Quantity Modification & Recalculation
- **Priority:** P0 (Critical Path)
- **Type:** Business Logic / Calculation
- **Pre-conditions:** Cart contains 1 unit of `Grey jacket` (£50.00) on `/cart`.
- **Test Steps:**
  1. Navigate directly to `https://sauce-demo.myshopify.com/cart`.
  2. Locate the line-item quantity input `input[name="updates[]"]`.
  3. Change the value from `1` to `3`.
  4. Click the `UPDATE` button (`input[type="submit"][name="update"]`).
  5. Observe updated row total and cart subtotal.
- **Expected Results:**
  - Item quantity updates to `3`.
  - Line total updates to `£150.00` (3 x £50.00).
  - Cart subtotal recalculates to `£150.00`.
  - No rounding errors or format discrepancies.

---

### TC-CRT-005: Line Item Removal from Cart
- **Priority:** P0 (Critical Path)
- **Type:** Functional / Session Update
- **Pre-conditions:** Cart contains at least 1 item on `/cart`.
- **Test Steps:**
  1. On `/cart`, locate the remove link `x` (targets `/cart/change?line=1&quantity=0`).
  2. Click the `x` link.
  3. Observe page refresh / state update.
- **Expected Results:**
  - Line item is completely removed from table.
  - Page displays cart empty message: `"It appears that your cart is currently empty!"` or similar theme empty state.
  - Utility bar counter updates to `My Cart (0)`.

---

### TC-CRT-006: Order Notes Textarea Persistence
- **Priority:** P1 (High)
- **Type:** Functional / Form Data Persistence
- **Pre-conditions:** On `/cart` with at least 1 item.
- **Test Steps:**
  1. Locate the notes textarea labeled `"Add a note to your order..."` (`textarea[name="note"]`).
  2. Enter special instructions: `"Please deliver between 9 AM and 12 PM. Handle with care."`
  3. Click `UPDATE`.
  4. Refresh the page or navigate away to `/collections/all` and return to `/cart`.
- **Expected Results:**
  - The entered text is preserved in the textarea via session cookie / Shopify cart attributes.
  - The note is carried forward into checkout order details.

---

### TC-CRT-007: Zero and Negative Quantity Boundary Test
- **Priority:** P1 (High)
- **Type:** Boundary / Negative Testing
- **Pre-conditions:** On `/cart` with 1 item.
- **Test Steps:**
  1. Change the quantity input value to `0`.
  2. Click `UPDATE`. Verify item is removed.
  3. Add an item again. Change the quantity input value to `-1`.
  4. Click `UPDATE`.
- **Expected Results:**
  - Quantity `0` cleanly removes item without throwing an exception.
  - Negative quantity `-1` is either rejected (resets to 1 or removes item), but never results in negative subtotal or corrupted checkout session.
