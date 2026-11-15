# Test Suite 06: Search & Discovery
**Model:** DeepSeek V4.1 Flash (High) · **Module:** Keyword search, result relevance, zero-state, template isolation, output encoding
**Target:** `https://sauce-demo.myshopify.com/`
**Cases:** 7 · **Executed:** 7 · **PASS:** 4 · **FAIL:** 3

---

### TC-SRCH-001: Exact keyword query returns the relevant products
- **Priority:** P0 · **Type:** Functional / Relevance
- **Steps:**
  1. Open `/search?q=sandals`.
  2. Read the result heading and enumerate product tiles.
- **Expected:** Heading includes `results found for "sandals"`; results include `Bronze sandals` and `White sandals`; no error state.
- **Observed:** Title `Search: 3 results found for "sandals"`; tiles: Bronze sandals £39.99, White sandals £25.00 (SOLD OUT), Brown Shades £20.00 (SOLD OUT). Sold-out items are not filtered out of search.
- **Status:** **PASS**

> **Behavioural note:** with a populated cart the same query returned **4** results (Black heels added). Result counts are cart-aware/recommendation-driven; automated assertions therefore check membership, not a fixed count.

---

### TC-SRCH-002: Zero-result query shows an explicit message and keeps search usable
- **Priority:** P0 · **Type:** Negative / Empty state
- **Steps:**
  1. Open `/search?q=xyznonexistent999`.
  2. Read the results region and the search form state.
- **Expected:** Exact copy `No results found for xyznonexistent999`; search input still visible and editable.
- **Observed:** Exact message rendered; `#search-field` remains visible/editable; page title `Search: 0 results found for "xyznonexistent999"`.
- **Status:** **PASS**

---

### TC-SRCH-003: Empty query is handled without an error
- **Priority:** P1 · **Type:** Negative / Empty input
- **Steps:**
  1. Open `/search` with no `q` parameter.
  2. Read the results region.
- **Expected:** Friendly prompt, not a stack trace or empty grid.
- **Observed:** "No search performed. If you are looking for something, please try our homepage". Heading `Search Results`.
- **Status:** **PASS**

---

### TC-SRCH-004: Search results contain product objects only
- **Priority:** P0 · **Type:** Template isolation / Data integrity · **Defect:** DS-D02
- **Steps:**
  1. Search `shi` (matches the static page title "Terms" via its content).
  2. Search `bro` (matches Bronze sandals + Brown Shades + the Terms page).
  3. Inspect every card in the results grid and its link target.
- **Expected:** Only `/products/*` records appear in a product grid; static pages never render as purchasable products.
- **Observed:** `shi` → `Search: 1 result found`, grid contains a single **"SOLD OUT Terms"** card linked to `/pages/terms?_pos=1&_sid=…`. `bro` → 3 results including the same Terms card. The search template fails to branch on `item.object_type`, so a legal page is presented as an out-of-stock product.
- **Status:** **FAIL** → DS-D02

---

### TC-SRCH-005: Search relevance does not return unrelated products
- **Priority:** P1 · **Type:** Relevance / Quality · **Defect:** DS-D03
- **Steps:**
  1. Search `jacket`.
  2. Compare each returned title with the query term.
- **Expected:** Only jacket products — Grey jacket, Noir jacket.
- **Observed:** 3 results: Grey jacket, Noir jacket, **Striped top** (a top, not a jacket). False-positive relevance hit.
- **Status:** **FAIL** → DS-D03

---

### TC-SRCH-006: Search reflects user input as inert text (XSS regression)
- **Priority:** P1 · **Type:** Security / Output encoding
- **Steps:**
  1. Request `/search?q=<script>alert(1)</script>`.
  2. Inspect rendered DOM and listen for dialogs.
- **Expected:** Payload HTML-escaped; no script execution, no alert dialog, no broken layout.
- **Observed:** Heading renders the literal text `Showing results for <script>alert(1)</script>`; the angle brackets appear as text, no dialog fired, page remains intact.
- **Status:** **PASS**

---

### TC-SRCH-007: Search input retains the submitted query for editing
- **Priority:** P2 · **Type:** UX / Accessibility · **Defect:** DS-D15
- **Steps:**
  1. Open `/search?q=xyznonexistent999`.
  2. Read `#search-field.value`.
  3. Repeat for a successful query.
- **Expected:** Input value equals the active query so the shopper can refine it.
- **Observed:** Input value is `""` on both success and zero-result pages, while the heading shows the query. Users must retype the term to adjust it.
- **Status:** **FAIL** → DS-D15
