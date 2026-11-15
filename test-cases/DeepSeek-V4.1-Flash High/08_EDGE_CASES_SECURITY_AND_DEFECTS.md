# Test Suite 08: Edge Cases, Security & Accessibility
**Model:** DeepSeek V4.1 Flash (High) · **Module:** Dead controls, mixed content, DOM validity, a11y, direct-URL abuse
**Target:** `https://sauce-demo.myshopify.com/`
**Cases:** 10 · **Executed:** 10 · **PASS:** 4 · **FAIL:** 6

---

### TC-EDGE-001: "Wish list" sidebar control has a working destination
- **Priority:** P1 · **Type:** Functional / Dead control · **Defect:** DS-D08
- **Steps:**
  1. From `/`, click the sidebar `Wish list` link.
  2. Inspect the URL hash and search the DOM for the target `#sauce-show-wish-list`.
  3. Observe whether any panel/modal opens.
- **Expected:** Either a rendered wish-list panel or a link to a real page.
- **Observed:** `href="#sauce-show-wish-list"` but `document.getElementById('sauce-show-wish-list')` is `null`; URL changes only by hash; no UI appears. The Sauce widget script that used to own this anchor is no longer loaded.
- **Status:** **FAIL** → DS-D08

---

### TC-EDGE-002: "Refer a friend" sidebar control has a working destination
- **Priority:** P1 · **Type:** Functional / Dead control · **Defect:** DS-D08
- **Steps:**
  1. From `/`, click `Refer a friend`.
  2. Inspect `href` and the presence of `#sauce-show-refer-friend`.
- **Expected:** A referral panel or a real destination page.
- **Observed:** `href="#sauce-show-refer-friend"` with no matching element and no visible response — second dead control from the retired Sauce integration.
- **Status:** **FAIL** → DS-D08

---

### TC-EDGE-003: All outbound links from an HTTPS storefront use HTTPS
- **Priority:** P1 · **Type:** Security / Mixed content · **Defect:** DS-D09
- **Steps:**
  1. Enumerate every absolute `http(s)` link on `/` and on a PDP.
  2. List any destination whose scheme is `http:`.
- **Expected:** Zero `http://` destinations; external links carry `rel="noopener noreferrer"`.
- **Observed:** 6 insecure destinations — `http://www.facebook.com/shopify`, `http://www.twitter.com/sauce_io`, `http://www.instagram.com/shopify`, `http://www.pinterest.com/...`, `http://sauceapp.io`, and the in-description `http://www.shopify.ca/blog/...`. `rel` is missing on all social links.
- **Status:** **FAIL** → DS-D09

---

### TC-EDGE-004: Every page has one visible, non-empty H1
- **Priority:** P1 · **Type:** Accessibility / SEO · **Defect:** DS-D10
- **Steps:**
  1. Visit `/`, `/collections/all`, `/products/noir-jacket`, `/cart`.
  2. Enumerate `h1` nodes with visibility and text length.
- **Expected:** Exactly one visible H1 whose text is non-empty.
- **Observed:** Each page renders an **empty visible H1** (`textContent === ""`) before the real heading. Homepage has no non-empty H1 at all. Screen readers announce a blank top-level heading, and SEO crawlers see an empty primary heading.
- **Status:** **FAIL** → DS-D10

---

### TC-EDGE-005: Cart document contains no duplicate IDs
- **Priority:** P2 · **Type:** HTML validity · **Defect:** DS-D11
- **Steps:**
  1. Add a product and open `/cart`.
  2. Build an ID frequency map for the whole document.
  3. Repeat for `/account/login` and `/`.
- **Expected:** No ID appears more than once in a document.
- **Observed:** `/cart` duplicates `updates_611952521`, `customer_login_link`, `customer_register_link` (hidden drawer form + visible page form). `/account/login` and `/` are clean.
- **Status:** **FAIL** → DS-D11

---

### TC-EDGE-006: A sold-out product cannot be purchased by direct URL
- **Priority:** P0 · **Type:** Negative / Business rule
- **Steps:**
  1. Open `/products/brown-shades` directly.
  2. Attempt `#add` click; monitor `My Cart (n)`.
  3. Force-enable the button in DevTools and submit.
- **Expected:** UI blocks purchase; only the natural click path is asserted here.
- **Observed:** CTA is `disabled`, value `Sold Out`; click does nothing; counter remains `My Cart (0)`. (Forced DOM tampering is a server-trust concern outside this UI suite.)
- **Status:** **PASS**

---

### TC-EDGE-007: Unknown URLs are not soft-404s
- **Priority:** P1 · **Type:** Error handling / SEO
- **Steps:**
  1. Request `/products/does-not-exist-xyz` and `/this-path-does-not-exist`.
  2. Record HTTP status and body.
- **Expected:** HTTP 404 with the themed error page.
- **Observed:** Both return **404**; body shows "Page Not Found", "Ooops. Sorry, something has gone wrong.", "404", and a homepage link.
- **Status:** **PASS**

---

### TC-EDGE-008: Currency remains GBP from catalog through checkout
- **Priority:** P0 · **Type:** Localisation / Financial
- **Steps:**
  1. Confirm catalog and PDP prices use `£`.
  2. Proceed to checkout and read the summary.
- **Expected:** No currency switch or symbol drift; checkout labels the currency `GBP`.
- **Observed:** Cart `£120.00`; checkout "Subtotal £120.00", "Total GBP £120.00", "Including £20.00 in taxes". Consistent end-to-end.
- **Status:** **PASS**

---

### TC-EDGE-009: Document language and image alternatives are declared
- **Priority:** P2 · **Type:** Accessibility
- **Steps:**
  1. Read `document.documentElement.lang`.
  2. Enumerate `img` elements and their `alt` values on `/`.
- **Expected:** `lang="en"`; every content image has a meaningful `alt`.
- **Observed:** `lang="en"`; all 7 images on `/` have descriptive alts (logo "Sauce Demo", product names, "We accept Amex/Visa/Mastercard").
- **Status:** **PASS**

---

### TC-EDGE-010: Search keeps the active query in the input
- **Priority:** P2 · **Type:** UX / Accessibility · **Defect:** DS-D15
- **Steps:**
  1. Search `xyznonexistent999`.
  2. Read `#search-field.value`; also test `sandals`.
- **Expected:** Input mirrors the active query and remains focusable for refinement.
- **Observed:** Value stays `""` in both cases even though the heading shows the query. This is especially confusing on the zero-results page, where the user's only recovery action is to edit a term that is no longer displayed.
- **Status:** **FAIL** → DS-D15
