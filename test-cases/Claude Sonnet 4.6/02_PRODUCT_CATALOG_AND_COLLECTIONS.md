# Test Suite 02: Product Catalog & Collections
**Model:** Claude Sonnet 4.6 (Thinking)
**Module:** Collection Views, Grid Rendering, Sold-Out States & Product Browsing
**Target:** `https://sauce-demo.myshopify.com/`

---

### TC-CAT-001: Collections Index Page (`/collections`) — Two Collections Listed
- **Priority:** P1 (High)
- **Type:** Functional / Navigation
- **Pre-conditions:** Direct navigation to `/collections`.
- **Test Steps:**
  1. Navigate to `https://sauce-demo.myshopify.com/collections`.
  2. Verify exactly 2 collection cards render:
     - `Another test (7 items)` → `https://sauce-demo.myshopify.com/collections/another-test`
     - `Frontpage (3 items)` → `https://sauce-demo.myshopify.com/collections/frontpage`
  3. Click each collection card and confirm destination.
- **Expected Results:**
  - Both collections are displayed with correct item counts and routing.

---

### TC-CAT-002: All Products Catalog (`/collections/all`) — Full 7-Product Grid
- **Priority:** P0 (Critical Path)
- **Type:** Functional / Visual
- **Pre-conditions:** Direct navigation to `/collections/all`.
- **Test Steps:**
  1. Navigate to `https://sauce-demo.myshopify.com/collections/all`.
  2. Verify exactly 7 products display in the responsive 3–4 column grid:
     - `Black heels` — `£45.00` (handle: `flower-print-jeans`)
     - `Bronze sandals` — `£30.00`
     - `Brown Shades` — `£20.00` *(Sold Out badge)*
     - `Grey jacket` — `£55.00`
     - `Noir jacket` — `£60.00`
     - `Striped top` — `£50.00`
     - `White sandals` — `£25.00` *(Sold Out badge)*
  3. For each product card, verify: thumbnail renders (non-broken), title shown, price in `£` format, link to `/products/<handle>`.
- **Expected Results:**
  - All 7 products visible. No broken images or malformed prices.

---

### TC-CAT-003: Frontpage Collection (`/collections/frontpage`) — 3-Product Subset
- **Priority:** P1 (High)
- **Type:** Functional / Data Partitioning
- **Pre-conditions:** Direct navigation to `/collections/frontpage`.
- **Test Steps:**
  1. Navigate to `https://sauce-demo.myshopify.com/collections/frontpage`.
  2. Verify exactly 3 products render:
     - `Grey jacket` — `£55.00`
     - `Noir jacket` — `£60.00`
     - `Striped top` — `£50.00`
  3. Confirm no other products appear.
- **Expected Results:**
  - Only the 3 frontpage-assigned products render; no cross-collection bleed.

---

### TC-CAT-004: Sold-Out Overlay Badges — Two Products (`Brown Shades` & `White sandals`)
- **Priority:** P0 (Critical Path)
- **Type:** Business Rule / Inventory State Verification
- **Pre-conditions:** Catalog page at `/collections/all`.
- **Test Steps:**
  1. Navigate to `/collections/all`.
  2. Locate product card for `Brown Shades` (£20.00). Verify `"Sold Out"` badge is overlaid.
  3. Locate product card for `White sandals` (£25.00). Verify `"Sold Out"` badge is overlaid.
  4. Confirm all other 5 product cards do NOT have the sold-out badge.
- **Expected Results:**
  - Exactly 2 sold-out overlays visible; they accurately reflect inventory state.

---

### TC-CAT-005: Currency Symbol Consistency (`£` GBP) Across All Catalog Items
- **Priority:** P1 (High)
- **Type:** Localization / Compliance
- **Test Steps:**
  1. Inspect price text for all 7 products on `/collections/all`.
  2. Verify exact prices: `£45.00`, `£30.00`, `£20.00`, `£55.00`, `£60.00`, `£50.00`, `£25.00`.
  3. Confirm no `$`, `€`, or unformatted numeric strings appear.
- **Expected Results:**
  - All prices consistently formatted in British Pound (£ GBP). No currency leakage.

---

### TC-CAT-006: Absence of Filter & Sort Controls on All Collection Views
- **Priority:** P2 (Medium / Baseline)
- **Type:** Exploratory / UX Baseline
- **Test Steps:**
  1. Inspect DOM on `/collections/all` for `select[name="sort_by"]` or facet filter containers.
  2. Repeat on `/collections/frontpage` and `/collections/another-test`.
  3. Manually append `?sort_by=price-ascending` to URL — verify graceful handling without 500 error.
- **Expected Results:**
  - No sorting or filtering UI components are rendered in this legacy Simple theme.
  - Sort query parameter appended to URL is handled gracefully by Shopify Liquid (no server crash).
