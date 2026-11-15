# Test Suite 02: Product Catalog & Collections
**Model:** Gemini 3.8 Flash High  
**Module:** Collection Views, Grid Rendering & Product Browsing  
**Target:** `https://sauce-demo.myshopify.com/`

---

### TC-CAT-001: All Products Catalog (`/collections/all`) Grid Rendering
- **Priority:** P0 (Critical Path)
- **Type:** Functional / Visual
- **Pre-conditions:** User is on the store.
- **Test Steps:**
  1. Navigate to `/collections/all` (via Catalog link or direct URL).
  2. Inspect the product grid layout.
  3. Verify all 7 active store products are displayed:
     - `Grey jacket`
     - `Noir jacket`
     - `Striped top`
     - `Blue and black checked shirt`
     - `Black heels` (handle `/products/flower-print-jeans`)
     - `White sandals`
     - `Red sleeveless dress`
  4. Verify that each grid cell renders:
     - Product thumbnail image with non-broken `src`.
     - Product title as an anchor link to PDP.
     - Price formatted with currency prefix `£` (GBP).
- **Expected Results:**
  - All 7 products display in a responsive 3-column grid structure.
  - No broken image icons or undefined text strings.

---

### TC-CAT-002: Specific Collection View Filtering (`/collections/frontpage` & `/collections/another-test`)
- **Priority:** P1 (High)
- **Type:** Functional / Data Routing
- **Pre-conditions:** Direct navigation to specific collection endpoints.
- **Test Steps:**
  1. Navigate to `https://sauce-demo.myshopify.com/collections/frontpage`.
  2. Count the products rendered (should be 3 products: `Grey jacket`, `Noir jacket`, `Striped top`).
  3. Navigate to `https://sauce-demo.myshopify.com/collections/another-test`.
  4. Count the products rendered (should display full 7 product set).
  5. Navigate to `/collections` (collections overview).
- **Expected Results:**
  - Collection endpoints correctly partition products according to Shopify backend collection rules.
  - `/collections` presents the list of collections with title and thumbnail image.

---

### TC-CAT-003: "Sold Out" Overlay Badge Verification on Catalog Grid
- **Priority:** P0 (Critical Path)
- **Type:** Business Logic / Inventory State
- **Pre-conditions:** Product `White sandals` is marked out of stock.
- **Test Steps:**
  1. Open `/collections/all`.
  2. Locate the product card for `White sandals`.
  3. Verify visual indicator / overlay badge on top of the product card.
- **Expected Results:**
  - Product card visibly renders a "Sold Out" badge / flag.
  - The card remains clickable to view details, but clearly communicates unavailability before user clicks.

---

### TC-CAT-004: Currency Symbol Consistency Across Catalog
- **Priority:** P1 (High)
- **Type:** Compliance / Localization
- **Test Steps:**
  1. Iterate across all items on `/collections/all`.
  2. Inspect the price string format for each item:
     - `Grey jacket` -> `£50.00`
     - `Noir jacket` -> `£60.00`
     - `Striped top` -> `£25.00`
     - `Blue and black checked shirt` -> `£35.00`
     - `Black heels` -> `£45.00`
     - `White sandals` -> `£30.00`
     - `Red sleeveless dress` -> `£70.00`
- **Expected Results:**
  - All currency symbols consistently use the British Pound (`£`).
  - No USD (`$`) or EUR (`€`) leakage exists in Liquid templates.

---

### TC-CAT-005: Absence of Dynamic Filter / Sort Controls Verification
- **Priority:** P2 (Medium)
- **Type:** Exploratory / UX Baseline
- **Test Steps:**
  1. Inspect the catalog DOM on `/collections/all`.
  2. Search for sorting dropdowns (`select[name="sort_by"]`) and tag filtering controls.
- **Expected Results:**
  - Confirm theme operates in legacy Simple mode without client-side facet filtering.
  - Manual URL query parameters like `?sort_by=price-ascending` fallback gracefully or sort according to Shopify standard Liquid handling without throwing 500 errors.
