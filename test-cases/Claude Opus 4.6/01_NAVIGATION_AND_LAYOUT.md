# Test Suite 01: Navigation, Header & Layout
**Model:** Claude Opus 4.6 (Thinking)
**Module:** Header, Utility Bar, Desktop vs Mobile Navigation & Layout Verification
**Target:** `https://sauce-demo.myshopify.com/`

---

### TC-NAV-001: Top Utility Bar Elements & Branding Integrity
- **Priority:** P0 (Critical Path)
- **Type:** Functional / Visual
- **Pre-conditions:** Desktop viewport width (≥ 1024px).
- **Test Steps:**
  1. Navigate to `https://sauce-demo.myshopify.com/`.
  2. Verify top utility bar:
     - Search input textbox (placeholder `"Search"`).
     - Search submit button with magnifying glass icon.
     - Cart link text matching `"My Cart (N)"` with cart icon, pointing to `/cart`.
  3. Verify store logo:
     - Image with `alt="Sauce Demo"` and wordmark `"simple."`.
     - Anchor points to `https://sauce-demo.myshopify.com/`.
- **Expected Results:**
  - Header utilities render cleanly, all links are functional, and cart counter initializes to `0`.

---

### TC-NAV-002: Desktop Sidebar Navigation Route Mapping
- **Priority:** P0 (Critical Path)
- **Type:** Functional / Navigation
- **Pre-conditions:** Desktop viewport (≥ 1024px).
- **Test Steps:**
  1. Navigate to homepage `/`.
  2. Inspect left-hand desktop sidebar and click each route:
     - Click `Home` -> URL `/` (HTTP 200)
     - Click `Catalog` -> URL `/collections/all` (HTTP 200)
     - Click `Blog` -> URL `/blogs/news` (HTTP 200)
     - Click `About Us` -> URL `/pages/about-us` (HTTP 200)
  3. Inspect auth links in sidebar:
     - `Log In` -> URL `/account/login`
     - `Sign up` -> URL `/account/register`
- **Expected Results:**
  - All navigation links route cleanly to valid pages without redirects or broken routes.

---

### TC-NAV-003: Mobile Menu Drawer & Label Discrepancy (Defect D-05)
- **Priority:** P1 (High / Copy Inconsistency Defect)
- **Defect Ref:** D-05
- **Type:** Responsive UI / Copy Discrepancy
- **Pre-conditions:** Viewport resized to 375px width (mobile resolution).
- **Test Steps:**
  1. Navigate to `https://sauce-demo.myshopify.com/` at 375px viewport.
  2. Confirm desktop sidebar collapses and mobile toggle button `≡ MENU` (`href="#"`) appears.
  3. Tap `≡ MENU` button to expand mobile drawer.
  4. Compare navigation labels in mobile drawer against desktop sidebar:
     - Check login link: Mobile label is `"Login"`, whereas desktop label is `"Log In"`.
     - Check registration link: Mobile label is `"Create account"`, whereas desktop label is `"Sign up"`.
- **Expected Results / Finding:**
  - Defect D-05 confirmed: Copy discrepancy between desktop and mobile navigation menus for authentication routes.

---

### TC-NAV-004: Insecure Protocol on Social Media Links (Defect D-05 / Security)
- **Priority:** P1 (High / Security Compliance)
- **Type:** Security / Compliance
- **Test Steps:**
  1. Inspect the social link anchors in the desktop sidebar:
     - Facebook: `http://www.facebook.com/shopify`
     - Twitter: `http://www.twitter.com/sauce_io`
     - Instagram: `http://www.instagram.com/shopify`
     - Pinterest: `http://www.pinterest.com/chrisjhoughton/awesome-facebook-integration/`
  2. Verify URL protocols.
- **Expected Results / Finding:**
  - All four external social links are hardcoded to unencrypted `http://` rather than modern `https://`, violating mixed content best practices.

---

### TC-NAV-005: Footer Elements, Copyright & Payment Badges
- **Priority:** P1 (High)
- **Type:** Visual / Compliance
- **Test Steps:**
  1. Scroll to page footer.
  2. Verify copyright text: `"Copyright © 2026 Sauce Demo. Shopping Cart by Shopify."`.
  3. Verify payment icons render from valid CDN assets:
     - Amex: `alt="We accept Amex"`
     - Visa: `alt="We accept Visa"`
     - Mastercard: `alt="We accept Mastercard"`
  4. Verify secondary navigation: `Search` (`/search`) and `About Us` (`/pages/about-us`).
- **Expected Results:**
  - All badges render with valid image sources; links route to correct endpoints.

---

### TC-NAV-006: Footer "About Us" Blurb Typo Regression (Defect D-10)
- **Priority:** P2 (Low / Cosmetic Defect)
- **Defect Ref:** D-10
- **Type:** Content Regression
- **Test Steps:**
  1. Inspect the footer text under the `"About Us"` heading on any storefront page.
  2. Search for the word `"see"` in: `"...and s ee what their friends have purchased or "wanted" on your store."`.
- **Expected Results / Finding:**
  - Typo D-10 verified: The word `"see"` is broken by an unintended space into `"s ee"`.
