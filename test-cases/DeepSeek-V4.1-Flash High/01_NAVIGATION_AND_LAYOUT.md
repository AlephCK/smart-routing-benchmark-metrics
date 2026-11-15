# Test Suite 01: Navigation, Header & Layout
**Model:** DeepSeek V4.1 Flash (High) · **Module:** Global chrome, responsive nav, footer, error pages
**Target:** `https://sauce-demo.myshopify.com/`
**Cases:** 7 · **Executed:** 7 · **PASS:** 4 · **FAIL:** 3

---

### TC-NAV-001: Homepage renders brand, tagline and featured products
- **Priority:** P0 · **Type:** Smoke / Visual
- **Steps:**
  1. Navigate to `/`.
  2. Read `document.title` and the hero region.
  3. Verify the three featured product tiles.
- **Expected:** Title `Sauce Demo`; tagline "Just a demo site showing off what Sauce can do."; featured tiles `Grey jacket £55.00`, `Noir jacket £60.00`, `Striped top £50.00`.
- **Observed:** All three tiles and prices present. `document.title = "Sauce Demo"`. Load 549 ms.
- **Status:** **PASS**

---

### TC-NAV-002: Primary navigation resolves every top-level destination
- **Priority:** P0 · **Type:** Navigation / Link integrity
- **Steps:**
  1. From `/`, activate each of `Home`, `Catalog`, `Blog`, `About Us`.
  2. Record final URL, HTTP status and rendered `<h1>`/title.
- **Expected:** `Home → /`, `Catalog → /collections/all`, `Blog → /blogs/news`, `About Us → /pages/about-us`; every response HTTP 200 with a distinct title.
- **Observed:** All four resolve 200; titles `Sauce Demo`, `Products – Sauce Demo`, `News – Sauce Demo`, `About Us – Sauce Demo`.
- **Status:** **PASS**

---

### TC-NAV-003: Header cart entry point and empty-cart state
- **Priority:** P0 · **Type:** Functional / State
- **Steps:**
  1. Open `/` with a fresh context.
  2. Read the desktop cart control (`a.cart`).
  3. Activate it and inspect the drawer.
- **Expected:** Label starts `My Cart (0)`; drawer shows "Your cart is empty."; `Check Out` is present but leads to an empty `/cart`.
- **Observed:** `My Cart (0)`; drawer text "Your cart is empty."; `/cart` shows "It appears that your cart is currently empty!".
- **Status:** **PASS**

---

### TC-NAV-004: Mobile navigation exposes consistent account labels
- **Priority:** P1 · **Type:** Responsive / Consistency · **Defect:** DS-D13
- **Steps:**
  1. Emulate a 390×844 mobile viewport (iPhone UA).
  2. Dump all visible links matching `/log in|login|sign up|create account/`.
  3. Compare desktop labels with mobile labels.
- **Expected:** A single label pair — `Log In` / `Sign up` — visible at each breakpoint.
- **Observed:** Both sets are present: `Log In` + `Sign up` **and** `Login` + `Create account`. The same destination (`/account/login`, `/account/register`) is labelled two different ways in one viewport.
- **Status:** **FAIL** → DS-D13

---

### TC-NAV-005: Footer legal, copyright and social destinations are secure and valid
- **Priority:** P1 · **Type:** Content / Security · **Defect:** DS-D09
- **Steps:**
  1. Scroll to the footer on `/`.
  2. Inspect `Copyright © 2026 Sauce Demo. Shopping Cart by Shopify.`
  3. Enumerate every outbound social link and its scheme.
- **Expected:** Copyright renders with the current year; all outbound links use `https://` and open with `rel="noopener"`.
- **Observed:** Copyright correct. Five links use `http://` (Facebook, Twitter/X, Instagram, Pinterest, `sauceapp.io`); `rel` is absent on all of them.
- **Status:** **FAIL** → DS-D09

---

### TC-NAV-006: Unknown product URL returns a true 404
- **Priority:** P1 · **Type:** Negative / Error handling
- **Steps:**
  1. Request `/products/does-not-exist-xyz`.
  2. Capture the HTTP status, title and body copy.
- **Expected:** HTTP 404 (not a 200 soft-404); heading "Ooops. Sorry, something has gone wrong."; link back to the homepage.
- **Observed:** HTTP **404**; page title `404 Not Found – Sauce Demo`; body contains "Page Not Found", the heading, "404", and "Please try our homepage".
- **Status:** **PASS**

---

### TC-NAV-007: Heading hierarchy exposes a meaningful H1
- **Priority:** P1 · **Type:** Accessibility / SEO · **Defect:** DS-D10
- **Steps:**
  1. On `/`, `/collections/all` and `/products/noir-jacket`, enumerate every `<h1>` with its computed visibility and text.
  2. Check the document outline (H1 count and content).
- **Expected:** Exactly one visible `<h1>` per page carrying the page's primary label.
- **Observed:** Every page emits an **empty visible `<h1>` first**. Homepage: only `[""]` — no meaningful H1 at all. PDP: `["", "Noir jacket"]`. Collection: `["", "Products"]`.
- **Status:** **FAIL** → DS-D10
