# Test Suite 02: Product Catalog & Collections
**Model:** DeepSeek V4.1 Flash (High) · **Module:** Collection index, product grids, inventory badges, currency
**Target:** `https://sauce-demo.myshopify.com/`
**Cases:** 7 · **Executed:** 7 · **PASS:** 6 · **FAIL:** 1

---

### TC-CAT-001: Collections index lists every published collection with counts
- **Priority:** P1 · **Type:** Functional / Content
- **Steps:**
  1. Navigate to `/collections`.
  2. Enumerate collection links and their item counts.
- **Expected:** Exactly two collections: `Another test (7 items)` and `Frontpage (3 items)`; each links to `/collections/<handle>`.
- **Observed:** Both entries render with the counts above. No pagination controls.
- **Status:** **PASS**

---

### TC-CAT-002: `/collections/all` renders the complete 7-product grid
- **Priority:** P0 · **Type:** Functional / Catalog integrity
- **Steps:**
  1. Open `/collections/all`.
  2. Count product anchors inside `section.product-grid`.
  3. Verify each title and price.
- **Expected:** 7 tiles — Black heels £45.00, Bronze sandals £39.99, Brown Shades £20.00, Grey jacket £55.00, Noir jacket £60.00, Striped top £50.00, White sandals £25.00.
- **Observed:** 7 tiles, all titles and prices exact. Grid is a 3-column layout (last row 1 tile).
- **Status:** **PASS**

---

### TC-CAT-003: Sold-out overlay appears only on out-of-stock SKUs
- **Priority:** P0 · **Type:** Business rule / Inventory
- **Steps:**
  1. Open `/collections/all`.
  2. Count `.sold-out` overlays and record their parent product titles.
  3. Compare with stock status on each PDP.
- **Expected:** Exactly 2 overlays, attached to `Brown Shades` and `White sandals` only.
- **Observed:** `.sold-out` count = 2, both visible with text "Sold Out"; no overlay on the other five products.
- **Status:** **PASS**

---

### TC-CAT-004: `/collections/frontpage` returns the curated 3-product subset
- **Priority:** P1 · **Type:** Functional / Collection rules
- **Steps:**
  1. Open `/collections/frontpage`.
  2. Enumerate titles.
- **Expected:** Grey jacket, Noir jacket, Striped top — exactly 3 in-stock products.
- **Observed:** 3 tiles, exact match. Heading "Frontpage".
- **Status:** **PASS**

---

### TC-CAT-005: `/collections/another-test` mirrors the full catalog
- **Priority:** P1 · **Type:** Functional / Collection rules
- **Steps:**
  1. Open `/collections/another-test`.
  2. Enumerate titles and sold-out overlays.
- **Expected:** 7 products, 2 sold-out overlays, identical set to `/collections/all`.
- **Observed:** 7 products; overlays on Brown Shades and White sandals. Heading "Another test".
- **Status:** **PASS**

---

### TC-CAT-006: All catalog prices use GBP formatting
- **Priority:** P0 · **Type:** Localisation
- **Steps:**
  1. Open `/collections/all` and each of the 7 PDPs.
  2. Regex every price node for `£\d+\.\d{2}`.
  3. Assert no `$`, `€` or comma-decimal formatting is present.
- **Expected:** Every price matches `£NN.NN`; no foreign currency symbols.
- **Observed:** All 7 catalog prices and 7 PDP prices match; zero `$`/`€` occurrences. Checkout summary renders "Total GBP".
- **Status:** **PASS**

---

### TC-CAT-007: Product handle, title and imagery describe the same product
- **Priority:** P0 · **Type:** Data integrity / SEO · **Defect:** DS-D01
- **Steps:**
  1. Open `/products/flower-print-jeans`.
  2. Compare URL handle, `<title>`, `<h1>`, product image `alt`, and option set.
  3. Repeat from the catalog tile.
- **Expected:** Handle, title, imagery and options all describe one product (jeans).
- **Observed:** Handle is `flower-print-jeans`, yet title/H1 is **"Black heels"** (title tag `Black heels – Sauce Demo`), image alt is "Black heels", and variants are Size S/M/L + Colour Red — a footwear product living under a jeans handle. Catalog tile also shows "Black heels".
- **Status:** **FAIL** → DS-D01
