# Test Suite 07: Account Management & Static Pages
**Model:** DeepSeek V4.1 Flash (High) · **Module:** Login, registration, password recovery, validation attributes, CMS pages
**Target:** `https://sauce-demo.myshopify.com/`
**Cases:** 5 · **Executed:** 5 · **PASS:** 4 · **FAIL:** 1

---

### TC-ACC-001: Customer login form renders with the expected contract
- **Priority:** P0 · **Type:** Functional / Authentication
- **Steps:**
  1. Open `/account/login`.
  2. Inspect the `#customer_login` form: action, method, field names, submit label.
  3. Verify the "Forgot your password?" link.
- **Expected:** POST to `/account/login`; `customer[email]` (type email) and `customer[password]` (type password); submit label `Sign In`; recovery link present.
- **Observed:** All exact — `action="https://sauce-demo.myshopify.com/account/login"`, `input#customer_email[type=email]`, `input#customer_password[type=password]`, `Sign In`, "Forgot your password?" → `#recover`.
- **Status:** **PASS**

---

### TC-ACC-002: Registration form collects the four required identity fields
- **Priority:** P0 · **Type:** Functional / Registration
- **Steps:**
  1. Open `/account/register`.
  2. Inspect `#create_customer`: action and field names.
- **Expected:** POST to `/account`; First Name, Last Name, Email Address, Password; submit creates a customer.
- **Observed:** `action="https://sauce-demo.myshopify.com/account"`; fields `customer[first_name]`, `customer[last_name]`, `customer[email]`, `customer[password]`; heading `Create Account`.
- **Status:** **PASS**

---

### TC-ACC-003: Password recovery view toggles via the hash route
- **Priority:** P1 · **Type:** Functional / Recovery
- **Steps:**
  1. Open `/account/login#recover` directly.
  2. Read the rendered panel.
- **Expected:** "Reset Password" panel with an email field, instruction copy, and a `Cancel` action back to login.
- **Observed:** Panel shows `Reset Password`, `Email`, "We will send you an email to reset your password.", and `Cancel`; URL keeps `#recover`.
- **Status:** **PASS**

---

### TC-ACC-004: Account inputs declare client-side required constraints
- **Priority:** P2 · **Type:** Accessibility / Validation · **Defect:** DS-D14
- **Steps:**
  1. On `/account/login` and `/account/register`, enumerate inputs.
  2. Check `required`, `aria-required`, and `minlength`/`pattern`.
  3. Inspect the form's constraint attributes.
- **Expected:** Email/password (and name/email on register) are marked required so the browser can block empty submission before the request.
- **Observed:** All inputs report `required: false` and no `aria-required`; no native constraint is declared. Validation is deferred to the Shopify server/JS layer, adding a round-trip and losing inline feedback.
- **Status:** **FAIL** → DS-D14

---

### TC-ACC-005: Static CMS pages render complete content
- **Priority:** P1 · **Type:** Content
- **Steps:**
  1. Open `/pages/about-us`, `/pages/terms`, `/blogs/news`.
  2. Verify HTTP 200 and meaningful body copy.
- **Expected:** About Us paragraph, full Terms of Service text, News index with `First Post` by Shopify (12 Mar).
- **Observed:** All three return 200. About Us shows the Sauce blurb; Terms renders the full ToS; News lists `First Post`, `Posted by Shopify`, `12 Mar`, with the default Shopify blog copy.
- **Status:** **PASS**
