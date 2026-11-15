# Test Suite 03: Product Detail Pages (PDP) & Variants
**Model:** Gemini 3.8 Flash High  
**Module:** Product Views, Variant Switching, Inventory States & Add to Cart  
**Target:** `https://sauce-demo.myshopify.com/`

---

### TC-PDP-001: Single Variant Product Presentation (`/products/grey-jacket`)
- **Priority:** P0 (Critical Path)
- **Type:** Functional / Visual
- **Pre-conditions:** Direct navigation to `/products/grey-jacket`.
- **Test Steps:**
  1. Open `https://sauce-demo.myshopify.com/products/grey-jacket`.
  2. Verify page elements:
     - Title: "Grey jacket"
     - Price: "£50.00"
     - Main Product Image: Renders correctly with zoom/lightbox capability if present.
     - Product Description: Full text is readable.
     - Add to Cart Button: Present, enabled, labeled `ADD TO CART`.
  3. Verify variant selector:
     - No dropdown selectors should appear since this product has only one SKU/variant (single hidden input `id="product-select"` exists).
- **Expected Results:**
  - Page loads cleanly with single hidden variant ID.
  - User can immediately add item to cart without selecting attributes.

---

### TC-PDP-002: Multi-Option Variant Dropdowns (`/products/noir-jacket`)
- **Priority:** P0 (Critical Path)
- **Type:** Functional / Interactive State
- **Pre-conditions:** Direct navigation to `/products/noir-jacket`.
- **Test Steps:**
  1. Open `/products/noir-jacket`.
  2. Inspect the options area. Verify two distinct `<select>` dropdowns:
     - Select 1: `Size` with options: `S`, `M`, `L`.
     - Select 2: `Color` with options: `Blue`, `Red`.
  3. Change `Size` to `M` and `Color` to `Red`.
  4. Inspect the hidden input `select[name="id"]` or URL hash.
- **Expected Results:**
  - Both dropdowns are independently selectable.
  - The variant ID updates to the matching SKU combination without page reload.
  - Add to Cart button remains active.

---

### TC-PDP-003: Single Option Variant Dropdown (`/products/flower-print-jeans`)
- **Priority:** P1 (High)
- **Type:** Functional / Variant Mapping
- **Pre-conditions:** Open `/products/flower-print-jeans` (renders "Black heels").
- **Test Steps:**
  1. Open `/products/flower-print-jeans`.
  2. Verify single dropdown labeled `Size` containing shoe sizes: `37`, `38`, `39`, `40`.
  3. Select size `39`.
  4. Verify price display (£45.00).
- **Expected Results:**
  - Option changes execute smoothly.
  - Form data contains correct variant ID for size 39.

---

### TC-PDP-004: "Sold Out" Product State & Disabled CTA (`/products/white-sandals`)
- **Priority:** P0 (Critical Path)
- **Type:** Business Rule / Negative Flow
- **Pre-conditions:** Product `/products/white-sandals` has 0 inventory units.
- **Test Steps:**
  1. Navigate to `/products/white-sandals`.
  2. Inspect the call-to-action button.
  3. Verify:
     - Button label changes from `ADD TO CART` to `SOLD OUT`.
     - Button has attribute `disabled="disabled"` or class `disabled`.
  4. Attempt to click or submit the form via button click.
  5. Attempt to trigger form submission via keyboard Enter on the form.
- **Expected Results:**
  - Click action is prevented.
  - Form is not submitted to `/cart/add`.
  - No items are added to the cart drawer or session.

---

### TC-PDP-005: Successful "Add to Cart" Form Submission
- **Priority:** P0 (Critical Path)
- **Type:** Functional / End-to-End
- **Pre-conditions:** Cart is initially empty.
- **Test Steps:**
  1. Open `/products/grey-jacket`.
  2. Click `ADD TO CART` (`input[type="submit"][name="add"]`).
  3. Observe system response (either redirection to `/cart` or AJAX mini-cart banner drop-down).
- **Expected Results:**
  - Item is added to session cart.
  - Cart item counter increments from 0 to 1.
  - Floating badge or mini-cart reflects "Grey jacket" with price `£50.00`.

---

### TC-PDP-006: Behavior Verification of Missing Quantity Selector
- **Priority:** P2 (UX Edge Case)
- **Type:** Exploratory / UX Defect Tracking
- **Pre-conditions:** Any active PDP (e.g. `/products/striped-top`).
- **Test Steps:**
  1. Search PDP DOM for `input[name="quantity"]`.
  2. Confirm absence of user-facing quantity input.
  3. Click `ADD TO CART`.
  4. Verify that the request payload to `/cart/add` defaults to `quantity=1`.
- **Expected Results:**
  - Without a quantity selector, exactly 1 unit is added per click.
  - Documented as UX limitation requiring multiple clicks or cart-page adjustment for bulk additions.
