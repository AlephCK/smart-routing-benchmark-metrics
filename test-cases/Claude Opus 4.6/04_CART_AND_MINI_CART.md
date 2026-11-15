# Test Suite 04: Cart & Mini-Cart Synchronization
**Model:** Claude Opus 4.6 (Thinking)
**Module:** AJAX Add to Cart, Badge Synchronization, Cart Recalculations & JavaScript Errors
**Target:** `https://sauce-demo.myshopify.com/`

---

### TC-CRT-001: AJAX Add to Cart & Floating Badge Desynchronization (Defect D-03)
- **Priority:** P0 (Critical Path / UI Sync Defect)
- **Defect Ref:** D-03
- **Type:** State Synchronization / Functional
- **Pre-conditions:** Fresh session, cart empty (`My Cart (0)`).
- **Test Steps:**
  1. Navigate to `/products/bronze-sandals` and click `Add to Cart`.
  2. Observe floating badge counter and header link text.
  3. Navigate to `/products/striped-top` and click `Add to Cart`.
  4. Compare the number displayed inside the black floating circle badge versus the text in `My Cart (N)`.
- **Expected Results / Finding:**
  - Defect D-03 verified: Header text updates to `"My Cart (2)"`, but the black floating circle badge icon fails to sync and remains stuck displaying `"1"`.

---

### TC-CRT-002: Cart AJAX Theme Script Exception Detection (Defect D-04)
- **Priority:** P1 (High / Console Defect)
- **Defect Ref:** D-04
- **Type:** JavaScript Execution / Error Handling
- **Pre-conditions:** Browser developer console active / error listener attached.
- **Test Steps:**
  1. Navigate to any PDP (e.g. `/products/grey-jacket`).
  2. Open browser console to monitor uncaught exceptions.
  3. Click `Add to Cart`.
  4. Inspect console logs for theme asset errors.
- **Expected Results / Finding:**
  - Defect D-04 verified: Uncaught exception thrown:
    `Uncaught TypeError: Cannot read properties of null (reading 'description')` at `https://sauce-demo.myshopify.com/cdn/shop/t/2/assets/jquery.theme.js:1`.

---

### TC-CRT-003: Full Cart Page (`/cart`) Layout & Line Item Display
- **Priority:** P0 (Critical Path)
- **Type:** Functional / Visual
- **Pre-conditions:** Cart contains `Bronze sandals` (£39.99) and `Striped top` (£50.00).
- **Test Steps:**
  1. Navigate to `https://sauce-demo.myshopify.com/cart`.
  2. Verify column structure: `Description`, `Price`, `Quantity`, `Total`.
  3. For each line item, verify:
     - Product thumbnail image renders.
     - Title link routes to PDP.
     - Vendor name is displayed (e.g. `Sauce Demo`, `ASOS`).
     - Truncated description snippet appears.
     - Quantity input textbox is populated.
     - Unit price multiplier is displayed (`x £39.99`, `x £50.00`).
  4. Verify total heading (H2): displays `Total £89.99` (or sum of items).
- **Expected Results:**
  - Cart table renders with all semantic elements intact and correct subtotal.

---

### TC-CRT-004: Quantity Modification & Real-Time Arithmetic Recalculation
- **Priority:** P0 (Critical Path)
- **Type:** Business Logic / Calculation
- **Pre-conditions:** Cart contains 1 `Bronze sandals` (£39.99) and 2 `Striped top` (£50.00 × 2 = £100.00); Total = `£139.99`.
- **Test Steps:**
  1. On `/cart`, locate quantity input for `Striped top`.
  2. Change value from `2` to `1`.
  3. Click the `Update` button (`input[name="update"]`).
  4. Wait for page reload.
  5. Verify new total: Total should equal `£39.99 + £50.00 = £89.99`.
  6. Verify header text updates to `My Cart (2)`.
- **Expected Results:**
  - Total recalculates accurately to `£89.99` with zero rounding errors.

---

### TC-CRT-005: Line Item Removal via Zero-Quantity Submission
- **Priority:** P0 (Critical Path)
- **Type:** Functional / Session Update
- **Pre-conditions:** Cart contains 1 `Bronze sandals` (£39.99) and 1 `Striped top` (£50.00).
- **Test Steps:**
  1. On `/cart`, change quantity input for `Bronze sandals` to `0`.
  2. Click `Update`.
  3. After reload, verify `Bronze sandals` is completely removed from the table.
  4. Verify total updates to `£50.00`.
  5. Verify header counter updates to `My Cart (1)`.
- **Expected Results:**
  - Setting quantity to 0 removes the item cleanly without leaving ghost entries.

---

### TC-CRT-006: Order Notes Textarea Persistence
- **Priority:** P1 (High)
- **Type:** Functional / Form Data Persistence
- **Pre-conditions:** Cart contains at least 1 item.
- **Test Steps:**
  1. Locate `<textarea name="note" id="note" placeholder="Add a note to your order...">`.
  2. Enter note: `"Test special instruction note: please leave at front door."`.
  3. Click `Update` button.
  4. Verify the entered text remains in the textarea after reload.
  5. Click `Check Out` and inspect checkout session payload.
- **Expected Results:**
  - Note text persists in cart attributes and transfers into checkout order data.

---

### TC-CRT-007: Empty Cart State & Navigation Link
- **Priority:** P1 (High)
- **Type:** Visual / Functional
- **Pre-conditions:** All items removed from cart.
- **Test Steps:**
  1. Navigate to `/cart` with 0 items.
  2. Verify empty cart message: `"It appears that your cart is currently empty! Continue Shopping."`.
  3. Verify link `"Continue Shopping"` points to `/collections/all`.
  4. Click link; confirm arrival at `/collections/all`.
- **Expected Results:**
  - Empty state informs user and provides seamless return to catalog.

---

### TC-CRT-008: Header Mini-Cart Drawer Toggle (Desktop Viewport)
- **Priority:** P1 (High)
- **Type:** Functional / UI State
- **Pre-conditions:** Desktop viewport (≥ 1024px).
- **Test Steps:**
  1. Click `My Cart (N)` in top header.
  2. Observe whether mini-cart dropdown overlay toggles open across the header.
  3. Verify presence of product list, unit price, and direct checkout link.
- **Expected Results:**
  - Desktop mini-cart dropdown opens/closes predictably.
