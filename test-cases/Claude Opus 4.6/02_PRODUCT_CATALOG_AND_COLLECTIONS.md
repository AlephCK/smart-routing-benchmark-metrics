# Test Suite 02: Product Catalog & Collections
**Model:** Claude Opus 4.6 (Thinking)
**Module:** Collection Views, Grid Architecture, Sold-Out Badges & Product Partitioning
**Target:** `https://sauce-demo.myshopify.com/`

---

### TC-CAT-001: Collections Overview (`/collections`) Index View
- **Priority:** P1 (High)
- **Type:** Functional / Navigation
- **Pre-conditions:** Direct navigation to `/collections`.
- **Test Steps:**
  1. Navigate to `https://sauce-demo.myshopify.com/collections`.
  2. Verify HTTP status is 200 OK.
  3. Verify presence of collections list and check links to sub-collections:
     - `/collections/frontpage`
     - `/collections/another-test`
- **Expected Results:**
  - Collection index view renders cleanly without layout collapse.

---

### TC-CAT-002: Master Catalog Grid (`/collections/all`) — 7 Products Verification
- **Priority:** P0 (Critical Path)
- **Type:** Functional / Visual
- **Pre-conditions:** Navigate to `/collections/all`.
- **Test Steps:**
  1. Open `https://sauce-demo.myshopify.com/collections/all`.
  2. Verify responsive layout: 3-column grid on desktop, single-column vertical stack on mobile.
  3. Count total product cards (must equal exactly 7):
     1. `Black heels` — `£45.00` (`/collections/all/products/flower-print-jeans`)
     2. `Bronze sandals` — `£39.99` (`/collections/all/products/bronze-sandals`)
     3. `Brown Shades` — `£20.00` (`/collections/all/products/brown-shades`) [Sold Out]
     4. `Grey jacket` — `£55.00` (`/collections/all/products/grey-jacket`)
     5. `Noir jacket` — `£60.00` (`/collections/all/products/noir-jacket`)
     6. `Striped top` — `£50.00` (`/collections/all/products/striped-top`)
     7. `White sandals` — `£25.00` (`/collections/all/products/white-sandals`) [Sold Out]
- **Expected Results:**
  - Exactly 7 product cards render with non-broken thumbnails, exact titles, and formatted prices in `£`.

---

### TC-CAT-003: Frontpage Collection (`/collections/frontpage`) — 3-Item Subset
- **Priority:** P1 (High)
- **Type:** Data Partitioning / Functional
- **Test Steps:**
  1. Navigate to `/collections/frontpage`.
  2. Verify exactly 3 products are listed:
     - `Grey jacket` (£55.00)
     - `Noir jacket` (£60.00)
     - `Striped top` (£50.00)
- **Expected Results:**
  - Exactly 3 products render matching homepage featured grid items.

---

### TC-CAT-004: Another Test Collection (`/collections/another-test`) — 6-Item Subset
- **Priority:** P1 (High)
- **Type:** Data Partitioning / Functional
- **Test Steps:**
  1. Navigate to `/collections/another-test`.
  2. Verify exactly 6 products are listed:
     - `Black heels` (£45.00)
     - `Bronze sandals` (£39.99)
     - `Brown Shades` (£20.00, Sold Out)
     - `Grey jacket` (£55.00)
     - `Noir jacket` (£60.00)
     - `Striped top` (£50.00)
  3. Confirm `White sandals` is excluded from this collection.
- **Expected Results:**
  - Collection contains exactly 6 products; data partitioning functions as configured.

---

### TC-CAT-005: "Sold Out" Overlay Badges on Collection Grids
- **Priority:** P0 (Critical Path)
- **Type:** Business Rule / Inventory Overlay
- **Pre-conditions:** User on `/collections/all`.
- **Test Steps:**
  1. Inspect product card for `Brown Shades`.
  2. Inspect product card for `White sandals`.
  3. Inspect the other 5 in-stock products.
- **Expected Results:**
  - `Brown Shades` and `White sandals` visibly display a `"Sold Out"` badge overlay.
  - The remaining 5 in-stock items do not display a sold-out overlay.

---

### TC-CAT-006: Absence of Filter and Sort Controls Verification
- **Priority:** P2 (Medium)
- **Type:** UX Baseline / Exploratory
- **Test Steps:**
  1. Search DOM of all collection views for facet filter controls, tag filters, or sort dropdowns (`select[name="sort_by"]`).
- **Expected Results:**
  - Verified: No filtering or sorting controls exist in the Simple theme collection templates.
