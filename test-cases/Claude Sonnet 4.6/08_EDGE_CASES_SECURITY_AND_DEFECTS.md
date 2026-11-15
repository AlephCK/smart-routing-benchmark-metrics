# Test Suite 08: Edge Cases, Security & Live Defect Verification
**Model:** Claude Sonnet 4.6 (Thinking)
**Module:** All 7 Independently-Discovered Defects + 404 Handling
**Target:** `https://sauce-demo.myshopify.com/`

---

### TC-EDG-001: Product Slug / Title / Asset Mismatch (Defect D-01)
- **Priority:** P1 (High)
- **Defect Ref:** D-01
- **Type:** Data Integrity
- **Test Steps:**
  1. Navigate to `https://sauce-demo.myshopify.com/products/flower-print-jeans`.
  2. Inspect URL: `/products/flower-print-jeans`.
  3. Inspect H1: Expected `"Black heels"` (not `"Flower print jeans"`).
  4. Inspect product image: Verify image depicts blue denim jeans, not heels.
- **Expected Results (Defect Verified):**
  - URL handle `flower-print-jeans` conflicts with the product title `"Black heels"` and image content.
  - Also accessible at `/products/black-heels`; both endpoints serve same conflicting product.

---

### TC-EDG-002: Search Grid Applies Product Badges to Static Pages (Defect D-02)
- **Priority:** P1 (High)
- **Defect Ref:** D-02
- **Type:** Template Rendering Bug / Critical UX Defect
- **Test Steps:**
  1. Navigate to `/search?q=shi`.
  2. Inspect the result card for the `/pages/terms` static page.
  3. Verify that:
     - A `"No image"` placeholder appears where a product image would be.
     - A `"SOLD OUT"` badge overlays the image placeholder.
  4. Inspect the result link: confirms it points to `/pages/terms`, not a product PDP.
- **Expected Results (Defect Verified):**
  - Liquid search results template incorrectly applies `sold_out` product badge logic to non-product search results.
  - Severity: High — misleads users into believing a Terms page is an out-of-stock product.

---

### TC-EDG-003: Search Relevance — `"jacket"` Returns False Positive (Defect D-03)
- **Priority:** P1 (High)
- **Defect Ref:** D-03
- **Type:** Search Algorithm / Result Quality
- **Test Steps:**
  1. Navigate to `/search?type=product&q=jacket`.
  2. Verify 3 results are returned (page title: `"3 results found"`).
  3. Confirm `"Striped top"` appears in results despite containing no `jacket`-related text in its title.
  4. Inspect if product description contains the word `"jacket"` (the shared template does not specifically mention jacket).
- **Expected Results (Defect Verified):**
  - `"Striped top"` is a false positive. Its presence in results indicates an overly broad Shopify Liquid search algorithm indexing shared description template text.

---

### TC-EDG-004: Description Grammar Error — "change render" (Defect D-04)
- **Priority:** P1 (Medium)
- **Defect Ref:** D-04
- **Type:** Content / Regression
- **Test Steps:**
  1. Open any PDP (e.g. `/products/bronze-sandals`).
  2. Inspect description text for substring: `"you can also change render the product description"`.
- **Expected Results (Defect Verified):**
  - Grammar error confirmed in template. Should read `"also change how the product description renders"` or similar.

---

### TC-EDG-005: Description Homophone Typo — "write" vs "right" (Defect D-05)
- **Priority:** P1 (Medium)
- **Defect Ref:** D-05
- **Type:** Content / Regression
- **Test Steps:**
  1. Open any PDP.
  2. Inspect description for substring: `"to the write of the product images"`.
- **Expected Results (Defect Verified):**
  - Typo confirmed. `"write"` should be `"right"`.

---

### TC-EDG-006: Trailing Stray Character "X" in Descriptions (Defect D-06)
- **Priority:** P2 (Low / Cosmetic)
- **Defect Ref:** D-06
- **Type:** Content / Cosmetic
- **Test Steps:**
  1. Open `/products/grey-jacket`.
  2. Inspect the end of the product description text for `"· X"` or `".X"`.
  3. Repeat on `/products/striped-top` and `/products/flower-print-jeans`.
- **Expected Results (Defect Verified):**
  - Trailing character artifact (`" · X"` or `".X"`) confirmed at end of descriptions for at least 3 products.

---

### TC-EDG-007: Footer Typographic Anomaly — "s ee" (Defect D-07)
- **Priority:** P2 (Low / Cosmetic)
- **Defect Ref:** D-07
- **Type:** Content / Cosmetic
- **Test Steps:**
  1. Scroll to the site-wide footer on any page.
  2. Inspect the About Us footer blurb for substring: `"and s ee what their friends"`.
- **Expected Results (Defect Verified):**
  - `"s ee"` (accidental space-broken word) confirmed in footer content across all pages.

---

### TC-EDG-008: 404 Error Page — Custom Theme Error Rendering
- **Priority:** P1 (High)
- **Type:** Error Handling / HTTP
- **Test Steps:**
  1. Navigate to `https://sauce-demo.myshopify.com/does-not-exist-xyz`.
  2. Verify HTTP status: `404 Not Found`.
  3. Inspect page title: `"404 Not Found – Sauce Demo"`.
  4. Verify H1: `"Ooops. Sorry, something has gone wrong."`.
  5. Verify H2: `"404"`.
  6. Verify body link: `"...please try our homepage"` → `/`.
- **Expected Results:**
  - Branded 404 page renders. Recovery link correctly routes to homepage. No raw stack traces or Liquid errors exposed.
