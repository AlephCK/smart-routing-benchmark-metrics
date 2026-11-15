# Test Suite 06: Search & Discovery
**Model:** Claude Opus 4.6 (Thinking)
**Module:** Query Resolution, Search Template Badges, Zero Results & Relevancy
**Target:** `https://sauce-demo.myshopify.com/`

---

### TC-SRCH-001: Empty Query Submission Behavior
- **Priority:** P1 (High)
- **Type:** Functional / Boundary
- **Pre-conditions:** Storefront accessible.
- **Test Steps:**
  1. Submit search without entering text (`/search?q=`).
  2. Inspect HTTP status and page title.
  3. Verify message content.
- **Expected Results:**
  - Page title: `Search – Sauce Demo`.
  - Heading: `Search Results`.
  - Body text: `"No search performed. If you are looking for something, please try our homepage"` with `"homepage"` linking to `/`.
  - Results count is 0.

---

### TC-SRCH-002: Exact Keyword Search — `sandals` (3 Results)
- **Priority:** P0 (Critical Path)
- **Type:** Functional / Search Relevancy
- **Test Steps:**
  1. In the search input, enter: `sandals`.
  2. Submit search.
  3. Verify URL: `/search?q=sandals`.
  4. Verify page title: `Search: 3 results found for "sandals" – Sauce Demo`.
  5. Verify subtitle: `Showing results for · sandals`.
  6. Verify the 3 returned products:
     1. `Bronze sandals` — `£39.99`
     2. `White sandals` — `£25.00` (Sold Out badge)
     3. `Brown Shades` — `£20.00` (Sold Out badge)
- **Expected Results:**
  - Search executes cleanly and returns all 3 matching catalog items.

---

### TC-SRCH-003: Partial Search Query `bro` & Static Page Badge Defect (Defect D-02)
- **Priority:** P0 (Critical Path / Critical Defect)
- **Defect Ref:** D-02
- **Type:** Template Rendering Bug / Search Quality
- **Test Steps:**
  1. In the search input, enter prefix: `bro`.
  2. Submit search.
  3. Verify page title: `Search: 3 results found for "bro" – Sauce Demo`.
  4. Inspect the 3 returned items:
     - Item 1: `Bronze sandals` (£39.99)
     - Item 2: `Brown Shades` (£20.00, Sold Out)
     - Item 3: `Terms` (`/pages/terms`)
  5. Inspect the result card for `Terms`.
- **Expected Results / Finding:**
  - Defect D-02 verified: The search template renders a `"Sold Out"` product badge over the static legal page `/pages/terms` because the Liquid template evaluates `item.available` without first verifying `item.object_type == 'product'`.

---

### TC-SRCH-004: Zero-Results Query — `xyznonexistent999`
- **Priority:** P0 (Critical Path)
- **Type:** Negative Flow / Error State
- **Test Steps:**
  1. In search input, enter: `xyznonexistent999`.
  2. Submit search.
  3. Verify page title: `Search: 0 results found for "xyznonexistent999" – Sauce Demo`.
  4. Verify body message text.
- **Expected Results:**
  - Page heading: `Search Results`.
  - Body text: `"No results found for xyznonexistent999"` with `xyznonexistent999` rendered in red italic font.
  - Results count is 0.

---

### TC-SRCH-005: Search Grid PDP Routing Accuracy
- **Priority:** P1 (High)
- **Type:** Functional / Navigation
- **Pre-conditions:** Search results for `sandals` displayed.
- **Test Steps:**
  1. Click title and thumbnail for `Bronze sandals`.
  2. Verify arrival at `/products/bronze-sandals`.
  3. Return to search and click `White sandals`.
  4. Verify arrival at `/products/white-sandals`.
- **Expected Results:**
  - Both cards route to the correct corresponding PDP.

---

### TC-SRCH-006: Search Security — HTML Escaping on Query Parameters
- **Priority:** P2 (Medium / Security)
- **Type:** Security / XSS Prevention
- **Test Steps:**
  1. Navigate to `/search?q=<script>alert("XSS")</script>`.
  2. Inspect the DOM for script execution or unescaped HTML elements.
- **Expected Results:**
  - Payload is properly escaped as `&lt;script&gt;`; zero JavaScript execution occurs.
