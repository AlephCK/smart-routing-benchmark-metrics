# Test Suite 04: Cart & Mini-Cart
**Model:** DeepSeek V4.1 Flash (High) · **Module:** Cart page, AJAX drawer, quantity arithmetic, DOM integrity
**Target:** `https://sauce-demo.myshopify.com/`
**Cases:** 7 · **Executed:** 7 · **PASS:** 6 · **FAIL:** 1

---

### TC-CART-001: Empty cart communicates state and a recovery path
- **Priority:** P1 · **Type:** Empty state
- **Steps:**
  1. Open `/cart` with an empty context.
  2. Read the cart container copy and available CTAs.
- **Expected:** Explicit empty message plus a `Continue Shopping` link back to the catalog.
- **Observed:** "It appears that your cart is currently empty! Continue Shopping." — link returns to `/collections/all`; header shows `My Cart (0)`.
- **Status:** **PASS**

---

### TC-CART-002: Adding a product updates the header counter and opens the cart drawer
- **Priority:** P0 · **Type:** Functional / AJAX
- **Steps:**
  1. Open `/products/noir-jacket`.
  2. Click `Add to Cart`.
  3. Watch the header counter and drawer for ~2.5 s.
- **Expected:** Counter `My Cart (0) → My Cart (1)`; drawer shows the new line; no full page reload.
- **Observed:** Counter becomes `My Cart (1)`; drawer lists `Noir jacket - S / Blue`, `£60.00`, qty 1. URL stays on the PDP.
- **Status:** **PASS**

---

### TC-CART-003: Cart line item preserves the chosen variant label
- **Priority:** P0 · **Type:** Functional / Data integrity
- **Steps:**
  1. Add Noir jacket in `M / Red`.
  2. Open `/cart`.
  3. Compare the line-item title with the chosen options.
- **Expected:** `Noir jacket - M / Red` (not the default `S / Blue`).
- **Observed:** Exact match `Noir jacket - M / Red`, unit price `£60.00`.
- **Status:** **PASS**

---

### TC-CART-004: Quantity update recalculates the line and order totals
- **Priority:** P0 · **Type:** Functional / Arithmetic
- **Steps:**
  1. Seed cart with 1 × Noir jacket (`£60.00`).
  2. Open `/cart`; assert qty input `1` and `Total £60.00`.
  3. Set the visible `input[name="updates[]"]` to `2`; click `Update`.
  4. Re-read qty, line total and order total.
- **Expected:** qty `2`; line `£120.00`; `Total £120.00`; header `My Cart (2)`.
- **Observed:** qty `2`; line `£120.00`; `Total £120.00`; header `My Cart (2)`. Update is a full POST to `/cart` and returns to `/cart`.
- **Status:** **PASS**

---

### TC-CART-005: Header counter stays in sync after a quantity mutation
- **Priority:** P1 · **Type:** State consistency
- **Steps:**
  1. After TC-CART-004's update, read `a.cart` text and the floating count element.
  2. Reload `/cart` and re-read.
- **Expected:** `My Cart (2)` and count `(2)` before and after reload — no stale badge.
- **Observed:** `My Cart (2)` both before and after reload; `.count` also `(2)`. No desync reproduced in this run.
- **Status:** **PASS**

---

### TC-CART-006: Cart exposes an order-note field
- **Priority:** P2 · **Type:** Feature availability
- **Steps:**
  1. Open `/cart` with one item.
  2. Verify `textarea[name="note"]` is visible and editable.
- **Expected:** Field present with placeholder "Add a note to your order...".
- **Observed:** Visible, editable textarea with the expected placeholder and empty value.
- **Status:** **PASS**

---

### TC-CART-007: Cart page emits unique element IDs
- **Priority:** P2 · **Type:** HTML validity / Accessibility · **Defect:** DS-D11
- **Steps:**
  1. Add an item and open `/cart`.
  2. Collect all `[id]` nodes and count duplicates.
  3. Inspect the two `form[action="/cart"]` forms.
- **Expected:** Every `id` is unique in the document.
- **Observed:** Duplicates: `updates_611952521` (×2), `customer_login_link` (×2), `customer_register_link` (×2). Two cart forms exist — the hidden mini-cart drawer and the visible cart page — and both render the same input ID. `getElementById`/label `for` resolution is therefore ambiguous.
- **Status:** **FAIL** → DS-D11
