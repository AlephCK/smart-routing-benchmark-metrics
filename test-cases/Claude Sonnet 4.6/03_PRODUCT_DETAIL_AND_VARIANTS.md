# Test Suite 03: Product Detail Pages (PDP) & Variants
**Model:** Claude Sonnet 4.6 (Thinking)
**Module:** All 7 PDPs — Variants, Inventory States, Descriptions & Add to Cart
**Target:** `https://sauce-demo.myshopify.com/`

---

### TC-PDP-001: No-Variant Products — `Bronze sandals` & `Striped top`
- **Priority:** P1 (High)
- **Type:** Functional / Single-SKU Baseline
- **Test Steps:**
  1. Navigate to `/products/bronze-sandals`.
  2. Verify H1 title: `"Bronze sandals"`, Price: `"£30.00"`.
  3. Verify no variant dropdowns are present.
  4. Verify no quantity input is present.
  5. Verify CTA: `Add to Cart` button is enabled (`disabled=false`).
  6. Repeat steps for `/products/striped-top` (title: `"Striped top"`, price: `"£50.00"`).
- **Expected Results:**
  - Both pages display a single enabled CTA with no selector complexity.

---

### TC-PDP-002: Single-Option Size Selector — `Grey jacket` (S, M, L)
- **Priority:** P0 (Critical Path)
- **Type:** Functional / Variant Interaction
- **Pre-conditions:** Navigate to `/products/grey-jacket`.
- **Test Steps:**
  1. Verify H1: `"Grey jacket"`, Price: `"£55.00"`.
  2. Verify exactly 1 dropdown selector labelled `"Size"` with options: `S`, `M`, `L`.
  3. Select each size in sequence; verify no page reload occurs (AJAX or hidden input update).
  4. Verify no quantity input exists on the page.
  5. Verify CTA button is enabled with label `"Add to Cart"`.
- **Expected Results:**
  - Variant selection is functional; variant ID input updates on selection.

---

### TC-PDP-003: Dual-Option Variant Selectors — `Noir jacket` (Size + Colour)
- **Priority:** P0 (Critical Path)
- **Type:** Functional / Multi-Variant Interaction
- **Pre-conditions:** Navigate to `/products/noir-jacket`.
- **Test Steps:**
  1. Verify H1: `"Noir jacket"`, Price: `"£60.00"`.
  2. Verify exactly 2 dropdown selectors:
     - Selector 1 label: `"Size"` | Options: `S`, `M`, `L`.
     - Selector 2 label: `"Colour"` | Options: `Red`, `Green`, `Blue`.
  3. Set Size to `M` and Colour to `Green`.
  4. Confirm hidden `select[name="id"]` or variant ID input reflects the M/Green combination.
  5. Click `"Add to Cart"`. Verify cart counter increments.
- **Expected Results:**
  - Both selectors independently update variant state.
  - Cart item shows `"Noir jacket - M / Green"` in the mini-cart.

---

### TC-PDP-004: Single-Option Size Selector — `Black heels` & `White sandals` (Shoe Sizes 38–40)
- **Priority:** P1 (High)
- **Type:** Functional / Variant Interaction
- **Test Steps:**
  1. Navigate to `/products/flower-print-jeans` (renders "Black heels").
  2. Verify H1: `"Black heels"`, Price: `"£45.00"`.
  3. Verify 1 dropdown labelled `"Size"` with options: `38`, `39`, `40`.
  4. Navigate to `/products/white-sandals`.
  5. Verify H1: `"White sandals"`, Price: `"£25.00"`.
  6. Verify 1 dropdown labelled `"Size"` with options: `38`, `39`, `40`.
- **Expected Results:**
  - Both products display shoe-sizing options (38–40).

---

### TC-PDP-005: Sold-Out CTAs — `Brown Shades` & `White sandals`
- **Priority:** P0 (Critical Path)
- **Type:** Business Rule / Negative Flow
- **Test Steps:**
  1. Navigate to `/products/brown-shades`.
  2. Inspect the CTA button: label must be `"Sold Out"` and `disabled=true`.
  3. Attempt click/keyboard activation on the disabled button.
  4. Navigate to `/products/white-sandals`.
  5. Inspect the CTA button: same assertion (`"Sold Out"`, `disabled=true`).
  6. For both: confirm no request is sent to `/cart/add`.
- **Expected Results:**
  - Both sold-out CTAs are non-interactive and cannot add items to cart.

---

### TC-PDP-006: Missing Quantity Selector on All PDPs (UX Limitation)
- **Priority:** P2 (Medium / UX Defect Tracking)
- **Type:** Exploratory / Baseline
- **Test Steps:**
  1. Visit each of the 7 PDPs.
  2. For each, inspect DOM for `input[name="quantity"]`.
  3. Confirm absence of a user-facing quantity input on all PDPs.
  4. Click `"Add to Cart"` once on `/products/grey-jacket`.
  5. Verify that POST to `/cart/add` sends `quantity=1`.
- **Expected Results:**
  - No quantity selector exists; all PDP additions default to 1 unit per click.

---

### TC-PDP-007: Description Defects — Typo & Trailing Character Regression (D-04, D-05, D-06)
- **Priority:** P1 (High / Template Defect Regression)
- **Defect Refs:** D-04, D-05, D-06
- **Type:** Content Regression
- **Test Steps:**
  1. Open `/products/grey-jacket`.
  2. In product description, search for the substring: `"change render the product description"` → **D-04 detected**.
  3. In product description, search for: `"to the write of the product images"` → **D-05 detected**.
  4. In product description, search for trailing: `"· X"` or `".X"` appended after period → **D-06 detected**.
  5. Repeat on `/products/striped-top` and `/products/flower-print-jeans`.
- **Expected Results (Defect Verification):**
  - All 3 description defects are confirmed on affected PDPs.
  - Remaining PDPs (`Bronze sandals`, `Noir jacket`, `Brown Shades`) also exhibit D-04 and D-05 (but may not have trailing X).
