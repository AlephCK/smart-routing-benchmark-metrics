# Test Suite 03: Product Detail Pages (PDP) & Variants
**Model:** DeepSeek V4.1 Flash (High) · **Module:** PDP rendering, variant mapping, inventory CTA, descriptions, runtime JS
**Target:** `https://sauce-demo.myshopify.com/`
**Cases:** 9 · **Executed:** 9 · **PASS:** 5 · **FAIL:** 4

---

### TC-PDP-001: Multi-option PDP exposes both selectors and the full variant matrix
- **Priority:** P0 · **Type:** Functional / Variants
- **Steps:**
  1. Open `/products/noir-jacket`.
  2. Verify H1 `Noir jacket`, price `£60.00`.
  3. Enumerate Size (`S`,`M`,`L`) and Color (`Blue`,`Red`) options.
  4. Read the hidden `select#product-select` option list.
- **Expected:** 2 visible selectors; 6 variant combinations in the hidden master select.
- **Observed:** Both selectors render (`.single-option-selector`); hidden select contains 6 options — `S/M/L` × `Blue/Red`, each priced `£60.00`.
- **Status:** **PASS**

---

### TC-PDP-002: Selecting Size + Colour resolves the correct Shopify variant ID
- **Priority:** P0 · **Type:** Functional / State sync
- **Steps:**
  1. On `/products/noir-jacket`, select `M`.
  2. Select `Red`.
  3. Read `#product-select.value`.
- **Expected:** Variant ID for M/Red = `7805236929`; selected option label `M / Red - £60.00`.
- **Observed:** `#product-select` = `7805236929`; checked option text `M / Red - £60.00`; price stays `£60.00`.
- **Status:** **PASS**

---

### TC-PDP-003: Add to Cart adds the selected variant, not the default
- **Priority:** P0 · **Type:** Functional / Cart integration
- **Steps:**
  1. On `/products/noir-jacket`, choose `M` / `Red`.
  2. Activate `#add` (`Add to Cart`).
  3. Open `/cart` and inspect the line item.
- **Expected:** Cart line reads `Noir jacket - M / Red`; header counter becomes `My Cart (1)`.
- **Observed:** Header `My Cart (1)`; cart line `Noir jacket - M / Red` at `£60.00`.
- **Status:** **PASS**

---

### TC-PDP-004: Single-variant PDPs render a default-title selector and enabled CTA
- **Priority:** P1 · **Type:** Functional / Variants
- **Steps:**
  1. Open `grey-jacket`, `striped-top`, `bronze-sandals`.
  2. Verify one selector with `Default Title`/product-name option, correct price, enabled `Add to Cart`.
- **Expected:** Grey jacket £55.00, Striped top £50.00, Bronze sandals £39.99; CTA enabled on all three.
- **Observed:** All three match; CTA value `Add to Cart`, `disabled=false`.
- **Status:** **PASS**

---

### TC-PDP-005: Sold-out PDP replaces the purchase CTA with a disabled control
- **Priority:** P0 · **Type:** Business rule / Inventory
- **Steps:**
  1. Open `/products/brown-shades` and `/products/white-sandals`.
  2. Inspect `#add`.
  3. Attempt to click.
- **Expected:** CTA value `Sold Out`, `disabled` attribute set, no cart mutation on click.
- **Observed:** Both PDPs render `#add` with value `Sold Out`, `disabled="disabled"`, class `btn add-to-cart disabled`, opacity 0.5; click is inert; counter stays `My Cart (0)`.
- **Status:** **PASS**

---

### TC-PDP-006: Product description is populated
- **Priority:** P1 · **Type:** Content integrity · **Defect:** DS-D05
- **Steps:**
  1. Open `/products/brown-shades`.
  2. Read the description container `.wysiwyg.no-tabs`.
  3. Compare with `/products/noir-jacket`.
- **Expected:** Every PDP has non-empty description copy.
- **Observed:** Brown Shades container textContent = `""` — a blank gap between price and footer. Noir jacket, Grey jacket, Striped top, Bronze sandals and White sandals all render the demo copy.
- **Status:** **FAIL** → DS-D05

---

### TC-PDP-007: Description copy is grammatically correct
- **Priority:** P2 · **Type:** Content / Copywriting · **Defect:** DS-D06, DS-D07
- **Steps:**
  1. Read the description paragraph on each described PDP.
  2. Proof-read the theme placeholder sentence.
- **Expected:** Grammatical, correctly spelled copy.
- **Observed:** "In Theme Settings you can also **change render** the product description **to the write of** the product images." — one missing verb form and one homophone error on every described PDP.
- **Status:** **FAIL** → DS-D06, DS-D07

---

### TC-PDP-008: Add-to-cart completes without an uncaught JavaScript exception
- **Priority:** P0 · **Type:** Runtime stability · **Defect:** DS-D04
- **Steps:**
  1. Open `/products/noir-jacket` in a clean context.
  2. Attach `pageerror`/`console` listeners.
  3. Click `#add`; wait for `Shopify.onCartUpdate`.
  4. Repeat 3×.
- **Expected:** No uncaught exception; cart drawer refreshes silently.
- **Observed:** **3/3 reproductions** of `TypeError: Cannot read properties of null (reading 'description')` at `cdn/shop/t/2/assets/jquery.theme.js?v=…:1:29646`, stack: `Object.<anonymous>` → `st.each` → `Shopify.onCartUpdate`. The cart still updates, so the failure is silent to the shopper but breaks the theme's AJAX refresh path.
- **Status:** **FAIL** → DS-D04

---

### TC-PDP-009: Product page offers an on-page quantity selector
- **Priority:** P2 · **Type:** UX / Conversion · **Defect:** DS-D12
- **Steps:**
  1. Open any in-stock PDP.
  2. Enumerate form inputs inside `#product-form`.
- **Expected:** A quantity input (default 1) next to `Add to Cart`.
- **Observed:** Form contains only the two option selects, the hidden variant select, and `#add`. No quantity field exists; buyers must add 1 then edit quantity on `/cart`.
- **Status:** **FAIL** → DS-D12
