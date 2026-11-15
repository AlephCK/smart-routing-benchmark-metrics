# Test Suite 08: Edge Cases, Security & Defects Detection
**Model:** Gemini 3.8 Flash High  
**Module:** Live Defects, Data Consistency, Broken Anchors & Edge Cases  
**Target:** `https://sauce-demo.myshopify.com/`

---

### TC-EDG-001: Product Slug vs Title & Image Data Mismatch (Defect D-001)
- **Priority:** P1 (High / Data Integrity Defect)
- **Type:** Data Integrity / Regression
- **Defect ID:** `DEF-001`
- **Pre-conditions:** Direct navigation to `/products/flower-print-jeans`.
- **Test Steps:**
  1. Open `https://sauce-demo.myshopify.com/products/flower-print-jeans`.
  2. Inspect the page URL path: `/products/flower-print-jeans`.
  3. Inspect rendered title: `"Black heels"`.
  4. Inspect rendered image and description: Shows high-heeled women's shoes with sizes `37`, `38`, `39`, `40`.
- **Expected Results / Actual Finding:**
  - *Actual Behavior:* URL handle reflects "flower print jeans", but product catalog data presents footwear.
  - *Verification:* Test flags catalog inconsistency between product handle and product title/assets.

---

### TC-EDG-002: Third-Party Unimplemented Anchors (Defect D-002)
- **Priority:** P1 (High / Dead Link Defect)
- **Type:** Functional / Broken Feature
- **Defect ID:** `DEF-002`
- **Pre-conditions:** Storefront homepage.
- **Test Steps:**
  1. Locate `"Wish list"` link in sidebar (`a[href="#sauce-show-wish-list"]`).
  2. Click `"Wish list"`.
  3. Locate `"Refer a friend"` link in sidebar (`a[href="#sauce-show-refer-friend"]`).
  4. Click `"Refer a friend"`.
- **Expected Results / Actual Finding:**
  - *Actual Behavior:* Clicking triggers dead hash anchors; no popup, modal, or drawer opens because Sauce third-party script assets are missing/unloaded.
  - *Verification:* Test detects dormant third-party integrations and broken user interactions.

---

### TC-EDG-003: Insecure Protocol on External Links (Defect D-005)
- **Priority:** P2 (Medium / Security Defect)
- **Type:** Security Compliance / Mixed Protocol
- **Defect ID:** `DEF-005`
- **Pre-conditions:** Storefront homepage loaded over HTTPS.
- **Test Steps:**
  1. Inspect the `href` attributes of all social links in the sidebar:
     - Facebook: `http://www.facebook.com/shopify`
     - Twitter: `http://www.twitter.com/sauce_io`
     - Pinterest: `http://www.pinterest.com/chrisjhoughton/awesome-facebook-integration/`
  2. Verify if URLs use `http://` instead of `https://`.
- **Expected Results / Actual Finding:**
  - *Actual Behavior:* Links use obsolete unencrypted `http://`.
  - *Verification:* Flag as security compliance violation (should upgrade to `https://`).

---

### TC-EDG-004: Storefront Password Bypass & Redirection Check
- **Priority:** P1 (High / Access Control)
- **Type:** Security / Routing
- **Pre-conditions:** Store is configured publicly.
- **Test Steps:**
  1. Navigate explicitly to `https://sauce-demo.myshopify.com/password`.
  2. Inspect HTTP response status and landing URL.
- **Expected Results:**
  - Standard Shopify stores with password protection display `/password`.
  - On this demo store, `/password` cleanly redirects (HTTP 302/301) directly to `/` without leaking admin or setup interfaces.

---

### TC-EDG-005: 404 Non-Existent Route Handling
- **Priority:** P1 (High)
- **Type:** Error Handling
- **Pre-conditions:** Storefront accessible.
- **Test Steps:**
  1. Navigate to an arbitrary non-existent route: `https://sauce-demo.myshopify.com/non-existent-page-404`.
  2. Inspect HTTP status code and rendered HTML.
- **Expected Results:**
  - Server returns HTTP 404 Not Found.
  - Page renders custom branded 404 layout with navigation links to return to home or search.
  - Page does not crash or expose raw Liquid stack traces.

---

### TC-EDG-006: Product Description Template Typo Regression (Defect D-004)
- **Priority:** P2 (Low / Cosmetic Defect)
- **Type:** Cosmetic / Typography
- **Defect ID:** `DEF-004`
- **Pre-conditions:** On PDPs with standard template description (e.g. `/products/grey-jacket`).
- **Test Steps:**
  1. Inspect the paragraph text in product description.
  2. Search for the phrase: `"write of the product images"`.
- **Expected Results / Actual Finding:**
  - *Actual Behavior:* Typo in theme template reads `"write of the product images"` rather than `"right of the product images"`.
  - *Verification:* Test flags grammatical error in Liquid template for correction.
