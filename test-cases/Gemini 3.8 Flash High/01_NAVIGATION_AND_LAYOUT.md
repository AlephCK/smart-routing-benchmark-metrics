# Test Suite 01: Navigation, Header & Layout
**Model:** Gemini 3.8 Flash High  
**Module:** Header, Utility Bar, Sidebar Menu & Responsive Navigation  
**Target:** `https://sauce-demo.myshopify.com/`

---

### TC-NAV-001: Desktop Top Utility Bar Navigation & Elements
- **Priority:** P0 (Critical Path)
- **Type:** Functional / Visual
- **Pre-conditions:** Browser is at viewport width ≥ 1024px.
- **Test Steps:**
  1. Navigate to `https://sauce-demo.myshopify.com/`.
  2. Locate the top utility bar above the primary header logo.
  3. Verify the existence and text of:
     - Search input field (`input[name="q"]`) and submit button.
     - `About Us` link (`a[href="/pages/about-us"]`).
     - `Log In` link (`a[href="/account/login"]`).
     - `Sign up` link (`a[href="/account/register"]`).
     - `My Cart` toggle with item counter (`#cartToggle` or `.cart-count`).
     - `Check Out` direct link (`a[href="/cart"]`).
- **Expected Results:**
  - All utility links are visible, correctly spelled, and route to their respective destinations.
  - Cart counter reflects initial count of 0 (or empty state).

---

### TC-NAV-002: Desktop Sidebar Navigation Menu
- **Priority:** P1 (High)
- **Type:** Functional / Navigation
- **Pre-conditions:** Desktop viewport (≥ 1024px).
- **Test Steps:**
  1. Navigate to `https://sauce-demo.myshopify.com/`.
  2. Locate the left-hand sidebar navigation container.
  3. Sequentially click each primary link and verify destination URL:
     - Click `Home` -> URL is `/`
     - Click `Catalog` -> URL is `/collections/all`
     - Click `Blog` -> URL is `/blogs/news`
     - Click `About Us` -> URL is `/pages/about-us`
- **Expected Results:**
  - All pages load with HTTP 200 status code.
  - Page titles accurately match the active menu item.
  - Active menu state is appropriately highlighted if styled by theme.

---

### TC-NAV-003: Mobile Viewport Header Collapse & Menu Toggle
- **Priority:** P0 (Critical Path)
- **Type:** Responsive UI / Functional
- **Pre-conditions:** Viewport resized to mobile resolution (375x812, e.g., iPhone dimensions).
- **Test Steps:**
  1. Navigate to `https://sauce-demo.myshopify.com/` at 375px width.
  2. Observe header restructuring:
     - Desktop sidebar is hidden (`display: none` or collapsed).
     - Logo centers or aligns cleanly.
     - Mobile hamburger/menu trigger labeled `= MENU` or icon is visible.
  3. Tap `= MENU` button.
  4. Verify mobile drawer expands showing `Home`, `Catalog`, `Blog`, `About Us`, `Wish list`, `Refer a friend`.
  5. Tap `= MENU` button again.
- **Expected Results:**
  - Menu toggle opens and closes smoothly without horizontal scrollbar overflow.
  - Mobile cart icon directly navigates to `/cart` or displays accessible drawer.

---

### TC-NAV-004: Social Media External Links Verification
- **Priority:** P2 (Medium)
- **Type:** Integration / Compliance
- **Pre-conditions:** Store homepage loaded.
- **Test Steps:**
  1. Inspect the social icon list in the sidebar.
  2. Verify URLs and link attributes:
     - Facebook: `http://www.facebook.com/shopify`
     - Twitter: `http://www.twitter.com/sauce_io`
     - Instagram: `http://www.instagram.com/shopify`
     - Pinterest: `http://www.pinterest.com/chrisjhoughton/awesome-facebook-integration/`
     - RSS / Atom: `/blogs/news.atom`
- **Expected Results:**
  - Links open external profiles in a new tab (`target="_blank"`) or current window.
  - *Defect Note:* Identified that social links use insecure `http://` instead of modern `https://` standard.

---

### TC-NAV-005: Footer Payment Methods & Copyright Notice
- **Priority:** P1 (High)
- **Type:** Visual / Informational
- **Pre-conditions:** Any storefront page loaded.
- **Test Steps:**
  1. Scroll to the footer section at the bottom of the page.
  2. Check the copyright notice text: `Copyright © [Year] Sauce Demo. Shopping Cart by Shopify.`
  3. Verify payment provider iconography rendered:
     - American Express icon
     - Visa icon
     - MasterCard icon
  4. Verify secondary quick links (`Search`, `About Us`).
- **Expected Results:**
  - All badge images render without broken image icons.
  - Copyright statement is cleanly aligned.
