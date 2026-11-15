# Test Suite 06: Search & Discovery
**Model:** Claude Sonnet 4.6 (Thinking)
**Module:** Search Queries, Result Accuracy, Zero Results & Security Validation
**Target:** `https://sauce-demo.myshopify.com/`

---

### TC-SRCH-001: Empty Query Submission — Informational Message
- **Priority:** P1 (High)
- **Type:** Boundary / Functional
- **Pre-conditions:** Homepage loaded.
- **Test Steps:**
  1. Submit search with empty `q` field (`/search?q=`).
  2. Inspect the resulting page.
- **Expected Results:**
  - Heading: `"Search Results"`.
  - **Exact message:** `"No search performed. If you are looking for something, please try our homepage"` with `"homepage"` linked to `/`.
  - No broken Liquid markup.

---

### TC-SRCH-002: Exact Keyword — `jacket` Returns 3 Results (Including Anomaly)
- **Priority:** P0 (Critical Path)
- **Type:** Functional / Result Accuracy
- **Pre-conditions:** Storefront accessible.
- **Test Steps:**
  1. Enter `jacket` in the search input and submit.
  2. Navigate to: `/search?type=product&q=jacket`.
  3. Inspect the page title: `Search: 3 results found for "jacket" – Sauce Demo`.
  4. List all returned products.
- **Expected Results:**
  - **3 results returned:**
    1. `Grey jacket` — `£55.00`
    2. `Noir jacket` — `£60.00`
    3. `Striped top` — `£50.00`
  - **⚠ Defect D-03:** `"Striped top"` has no matching terms for query `"jacket"` and should not appear — this is a search relevance false positive.

---

### TC-SRCH-003: Partial Keyword — `shi` Returns Static Page (Critical Anomaly)
- **Priority:** P0 (Critical Path)
- **Type:** Functional / Defect Verification
- **Defect Ref:** D-02
- **Pre-conditions:** Storefront accessible.
- **Test Steps:**
  1. Enter `shi` in the search input and submit.
  2. Navigate to: `/search?q=shi`.
  3. Inspect page title: `Search: 1 result found for "shi" – Sauce Demo`.
  4. Inspect the result card rendered.
- **Expected Results (Defect Verification):**
  - **D-02 detected:** Result is the static page `/pages/terms`, not a product.
  - The result card renders with a `"No image"` placeholder (broken image display) and a **`"SOLD OUT"` badge** incorrectly overlaid on a non-product page.
  - This represents a critical template bug where non-product search results are incorrectly styled as product cards.

---

### TC-SRCH-004: Zero-Results Query — `zzzznotaproduct`
- **Priority:** P0 (Critical Path)
- **Type:** Negative Flow / Error State
- **Pre-conditions:** Storefront accessible.
- **Test Steps:**
  1. Enter `zzzznotaproduct` in the search input.
  2. Navigate to: `/search?q=zzzznotaproduct`.
  3. Inspect page title: `Search: 0 results found for "zzzznotaproduct" – Sauce Demo`.
  4. Read the displayed body message.
- **Expected Results:**
  - **Exact message:** `"No results found for zzzznotaproduct"` with `zzzznotaproduct` styled in **red italic**.
  - Search input remains usable for a follow-up query.

---

### TC-SRCH-005: Search Result — Each Product Card Links to Correct PDP
- **Priority:** P1 (High)
- **Type:** Navigation / Link Accuracy
- **Pre-conditions:** Use query `jacket` which returns 3 results.
- **Test Steps:**
  1. On search results for `jacket`, click `"Grey jacket"` card.
  2. Verify URL: `/products/grey-jacket`, H1: `"Grey jacket"`.
  3. Go back; click `"Noir jacket"` card.
  4. Verify URL: `/products/noir-jacket`, H1: `"Noir jacket"`.
- **Expected Results:**
  - Both product links route to the correct individual PDP.

---

### TC-SRCH-006: Search URL — XSS & Injection Safety
- **Priority:** P2 (Medium / Security)
- **Type:** Security
- **Test Steps:**
  1. Navigate to: `/search?type=product&q=<script>alert(1)</script>`.
  2. Inspect DOM for any JavaScript execution.
  3. Navigate to: `/search?type=product&q=' OR 1=1 --`.
  4. Observe rendered output.
- **Expected Results:**
  - XSS payload is HTML-escaped in the DOM (`&lt;script&gt;`); no alert dialog executes.
  - SQL payload produces standard zero-results message without error.
