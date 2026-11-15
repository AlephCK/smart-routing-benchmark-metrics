# Test Suite 01: Navigation, Header & Layout
**Model:** Claude Sonnet 4.6 (Thinking)
**Module:** Header, Utility Bar, Sidebar Menu & Responsive Navigation
**Target:** `https://sauce-demo.myshopify.com/`

---

### TC-NAV-001: Top Utility Bar — All Elements Present & Functional
- **Priority:** P0 (Critical Path)
- **Type:** Functional / Visual
- **Pre-conditions:** Browser at desktop viewport width (≥ 1024px).
- **Test Steps:**
  1. Navigate to `https://sauce-demo.myshopify.com/`.
  2. Locate the top utility navigation bar.
  3. Verify search input: `<input name="q" placeholder="Search">` and `id="search-submit"` icon button.
  4. Verify cart link text matches pattern `"My Cart (N)"` where N reflects session item count.
  5. Verify branding: logo image `alt="Sauce Demo"` and tagline `"Just a demo site showing off what Sauce can do."`.
- **Expected Results:**
  - All utility elements render, are visible, and correctly labelled.
  - Cart counter defaults to `"My Cart (0)"` on a fresh session.

---

### TC-NAV-002: Desktop Sidebar Navigation — Link Routing Accuracy
- **Priority:** P0 (Critical Path)
- **Type:** Functional / Navigation
- **Pre-conditions:** Desktop viewport (≥ 1024px).
- **Test Steps:**
  1. Navigate to `https://sauce-demo.myshopify.com/`.
  2. Click `Home` → verify URL is `/`.
  3. Click `Catalog` → verify URL is `/collections/all`.
  4. Click `Blog` → verify URL is `/blogs/news`.
  5. Click `About Us` → verify URL is `/pages/about-us`.
- **Expected Results:**
  - All routes resolve with HTTP 200.
  - Page content matches the clicked destination label.

---

### TC-NAV-003: Mobile Viewport — Header Collapse & Menu Toggle
- **Priority:** P1 (High)
- **Type:** Responsive UI / Functional
- **Pre-conditions:** Browser viewport resized to 375px width (mobile simulation).
- **Test Steps:**
  1. Navigate to homepage at 375px width.
  2. Confirm desktop sidebar is hidden.
  3. Locate and click the `Menu` toggle button (`href="/#"` or current-page hash).
  4. Verify slide-down mobile menu expands showing: `Home`, `Catalog`, `Blog`, `About Us`.
  5. Click the toggle again or tap outside.
- **Expected Results:**
  - Menu opens and closes cleanly without horizontal overflow or layout breaks.
  - Cart link navigates directly to `/cart` on mobile.

---

### TC-NAV-004: Footer — Links, Copyright Text & Payment Icons
- **Priority:** P1 (High)
- **Type:** Visual / Compliance
- **Pre-conditions:** Any storefront page loaded.
- **Test Steps:**
  1. Scroll to footer on the homepage.
  2. Verify exact copyright text: `"Copyright © 2026 Sauce Demo. Shopping Cart by Shopify."`.
  3. Verify quick links: `Search` → `/search`, `About Us` → `/pages/about-us`.
  4. Verify 3 payment SVG/PNG icons render: American Express, Visa, Mastercard.
  5. Verify "Powered by" link text: `"Shopping Cart by Shopify"` routing to Shopify UK tour URL.
- **Expected Results:**
  - Footer renders without broken images.
  - Copyright year matches current year.

---

### TC-NAV-005: Footer "About Us" Text — Typo Regression (Defect D-07)
- **Priority:** P2 (Low / Cosmetic)
- **Defect Ref:** D-07
- **Type:** Content / Regression Defect
- **Test Steps:**
  1. Scroll to the site-wide footer section on any page.
  2. Inspect the footer's "About Us" blurb text for the substring `"s ee"`.
  3. Exact string to detect: `"and s ee what their friends have purchased"`.
- **Expected Results (Defect Verification):**
  - Text contains the accidental space-broken word `"s ee"` instead of `"see"`.
  - Test flags this as a Liquid template / footer content defect for correction.
