# Test Suite 08: Edge Cases, Security & Live Defect Verification
**Model:** Claude Opus 4.6 (Thinking)
**Module:** All 10 Live Anomalies, Console Exceptions & 404 Error Handling
**Target:** `https://sauce-demo.myshopify.com/`

---

### TC-EDG-001: Product Handle, Title & Image Contradiction (Defect D-01)
- **Priority:** P1 (High / Critical Content Defect)
- **Defect Ref:** D-01
- **Type:** Data Integrity / Metadata
- **Test Steps:**
  1. Navigate to `/products/flower-print-jeans`.
  2. Inspect URL path: `/products/flower-print-jeans`.
  3. Inspect H1 heading: `"Black heels"`.
  4. Inspect product image: Displays blue denim jeans.
  5. Inspect variant options: Lists clothing sizes (S, M, L) instead of shoe sizing.
- **Expected Results / Finding:**
  - Defect D-01 verified: Irreconcilable conflict across handle, title, imagery, and sizing attributes.

---

### TC-EDG-002: Static Page Flagged with "Sold Out" Badge in Search (Defect D-02)
- **Priority:** P1 (High / Critical Template Bug)
- **Defect Ref:** D-02
- **Type:** Template Rendering Logic Bug
- **Test Steps:**
  1. Navigate to `/search?q=bro`.
  2. Locate the search result card for the legal page `/pages/terms`.
  3. Verify presence of `"Sold Out"` product overlay badge.
  4. Inspect page source: template checks `item.available` without testing `item.object_type == 'product'`.
- **Expected Results / Finding:**
  - Defect D-02 verified: Non-product search results inherit e-commerce inventory badges.

---

### TC-EDG-003: Cart Floating Badge Counter Desynchronization (Defect D-03)
- **Priority:** P1 (High / State Sync Defect)
- **Defect Ref:** D-03
- **Type:** UI State Synchronization
- **Test Steps:**
  1. Add item 1 to cart via AJAX; note counter.
  2. Add item 2 to cart via AJAX.
  3. Compare text inside the black floating circle badge icon vs the header link text `My Cart (N)`.
- **Expected Results / Finding:**
  - Defect D-03 verified: Black circle badge remains stuck on `"1"` while header link text updates to `"My Cart (2)"`.

---

### TC-EDG-004: Unhandled JavaScript Console Error in Theme Assets (Defect D-04)
- **Priority:** P1 (High / Runtime Console Error)
- **Defect Ref:** D-04
- **Type:** JavaScript Exception
- **Test Steps:**
  1. Attach an unhandled error listener (`window.addEventListener('error')`).
  2. Trigger cart update actions on any PDP.
  3. Verify if `TypeError` is caught.
- **Expected Results / Finding:**
  - Defect D-04 verified: Uncaught exception recorded:
    `Uncaught TypeError: Cannot read properties of null (reading 'description')` originating from `jquery.theme.js:1`.

---

### TC-EDG-005: Mobile vs Desktop Navigation Label Inconsistency (Defect D-05)
- **Priority:** P2 (Medium / Copy Inconsistency)
- **Defect Ref:** D-05
- **Type:** Copy Quality
- **Test Steps:**
  1. Inspect desktop sidebar labels for `/account/login` (`"Log In"`) and `/account/register` (`"Sign up"`).
  2. Inspect mobile drawer labels for the same URLs (`"Login"` and `"Create account"`).
- **Expected Results / Finding:**
  - Defect D-05 verified: Inconsistent nomenclature between desktop and mobile navigation menus.

---

### TC-EDG-006: Missing Product Description on `Brown Shades` (Defect D-08)
- **Priority:** P2 (Medium / Content Defect)
- **Defect Ref:** D-08
- **Type:** Content Completeness
- **Test Steps:**
  1. Open `/products/brown-shades`.
  2. Verify the description DOM element text content.
- **Expected Results / Finding:**
  - Defect D-08 verified: Description container contains an empty string `""`.

---

### TC-EDG-007: Grammar & Homophone Defects in Product Template (Defects D-06 & D-07)
- **Priority:** P2 (Low / Template Defect)
- **Defect Refs:** D-06, D-07
- **Type:** Content Quality
- **Test Steps:**
  1. Inspect description on `/products/grey-jacket`.
  2. Search for: `"change render the product description"` (D-06).
  3. Search for: `"to the write of the product images"` (D-07).
- **Expected Results / Finding:**
  - Defects D-06 and D-07 verified across all populated product pages.

---

### TC-EDG-008: Rogue Trailing Character on `Striped top` (Defect D-09)
- **Priority:** P2 (Low / Content Defect)
- **Defect Ref:** D-09
- **Type:** Content Quality
- **Test Steps:**
  1. Inspect the terminal sentence of `/products/striped-top` description.
  2. Verify string ends with: `"write of the product images.X"`.
- **Expected Results / Finding:**
  - Defect D-09 verified: Stray character `"X"` appended to description.

---

### TC-EDG-009: Typographic Space-Break in Footer Blurb (Defect D-10)
- **Priority:** P2 (Low / Content Defect)
- **Defect Ref:** D-10
- **Type:** Content Quality
- **Test Steps:**
  1. Inspect site-wide footer About Us paragraph.
  2. Search for: `"and s ee what their friends have purchased"`.
- **Expected Results / Finding:**
  - Defect D-10 verified: Space-broken word `"s ee"` confirmed in footer.

---

### TC-EDG-010: Custom 404 Error Page Verification
- **Priority:** P1 (High)
- **Type:** Error Handling
- **Test Steps:**
  1. Navigate to: `https://sauce-demo.myshopify.com/this-page-does-not-exist-at-all`.
  2. Verify HTTP response code: 404 Not Found.
  3. Verify page title: `404 Not Found – Sauce Demo`.
  4. Verify Heading 1: `"Ooops. Sorry, something has gone wrong."`.
  5. Verify Heading 2: `"404"`.
  6. Verify body text & link: `"We can’t find the page that you are looking for. Please try our homepage"` with `"homepage"` linking to `/`.
- **Expected Results:**
  - Custom branded 404 page handles invalid routes gracefully without leaking backend stack traces.
