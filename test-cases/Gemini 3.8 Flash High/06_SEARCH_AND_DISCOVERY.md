# Test Suite 06: Search & Discovery
**Model:** Gemini 3.8 Flash High  
**Module:** Search Input, Query Resolution, Filtering & Zero Results  
**Target:** `https://sauce-demo.myshopify.com/`

---

### TC-SRCH-001: Empty Search Query Submission Handling
- **Priority:** P1 (High)
- **Type:** Functional / Boundary
- **Pre-conditions:** On homepage or any storefront page.
- **Test Steps:**
  1. Locate the search bar in the utility header (`input[name="q"]`).
  2. Leave the field completely blank (or enter only spaces).
  3. Submit search via Enter key or search button.
  4. Inspect the destination page `/search`.
- **Expected Results:**
  - Page routes to `/search` cleanly.
  - Heading indicates: `"Search"`.
  - Body text informs user: `"No search performed. If you are looking for something, please try our homepage"`.
  - No database exception or broken Liquid markup is displayed.

---

### TC-SRCH-002: Exact Keyword Search (`jacket`)
- **Priority:** P0 (Critical Path)
- **Type:** Functional / Search Relevance
- **Pre-conditions:** Storefront loaded.
- **Test Steps:**
  1. In the search input, enter exact keyword: `jacket`.
  2. Press Enter.
  3. Inspect search results list on `/search?type=product&q=jacket`.
- **Expected Results:**
  - Results list renders exactly 2 matching products:
    1. `Grey jacket` (£50.00)
    2. `Noir jacket` (£60.00)
  - Each result displays thumbnail, title link, and price.
  - Clicking either result routes to its respective PDP.

---

### TC-SRCH-003: Partial Keyword Fuzzy Search (`jac`)
- **Priority:** P1 (High)
- **Type:** Functional / Prefix Matching
- **Pre-conditions:** Storefront loaded.
- **Test Steps:**
  1. In the search input, enter prefix: `jac`.
  2. Press Enter.
  3. Inspect search results list on `/search?type=product&q=jac`.
- **Expected Results:**
  - Liquid search algorithm successfully matches `jacket` titles.
  - Both `Grey jacket` and `Noir jacket` are returned.

---

### TC-SRCH-004: Non-Existent Query Zero Results Handling
- **Priority:** P0 (Critical Path)
- **Type:** Negative Flow / Error State
- **Pre-conditions:** Storefront loaded.
- **Test Steps:**
  1. In the search field, enter an unmatchable string: `qwerty12345nonexistent`.
  2. Submit search.
  3. Observe response on `/search?type=product&q=qwerty12345nonexistent`.
- **Expected Results:**
  - Clear, user-friendly zero results notification: `"No results found for qwerty12345nonexistent"`.
  - The searched term is displayed in red italic text (`<span class="terms">`).
  - Search bar remains populated or readily accessible for subsequent queries.

---

### TC-SRCH-005: Search URL Parameter Direct Navigation & Injection Protection
- **Priority:** P2 (Security / Boundary)
- **Type:** Security / URL Robustness
- **Pre-conditions:** Direct navigation in address bar.
- **Test Steps:**
  1. Navigate directly to `/search?type=product&q=<script>alert(1)</script>`.
  2. Verify how the query is rendered in DOM.
  3. Navigate to `/search?type=product&q=' OR 1=1 --`.
- **Expected Results:**
  - XSS payload is strictly HTML-escaped (`&lt;script&gt;`).
  - No JavaScript execution or modal dialogs appear.
  - SQL injection payload produces standard zero-results message safely.
