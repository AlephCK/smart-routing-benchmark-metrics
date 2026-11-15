# Test Suite 07: Account Management & Static Pages
**Model:** Claude Sonnet 4.6 (Thinking)
**Module:** Customer Login, Registration, Password Recovery & Informational Pages
**Target:** `https://sauce-demo.myshopify.com/`

---

### TC-ACC-001: Login Page — Fields, Labels & Exact DOM Attributes
- **Priority:** P0 (Critical Path)
- **Type:** Functional / DOM Verification
- **Pre-conditions:** Navigate to `/account/login`.
- **Test Steps:**
  1. Open `https://sauce-demo.myshopify.com/account/login`.
  2. Verify page title: `"Account – Sauce Demo"`.
  3. Verify H1: `"Customer Login"`.
  4. Verify form attributes: `id="customer_login"`, `action="/account/login"`, `method="post"`.
  5. Verify fields:
     - Label `"Email Address"` → `<input type="email" name="customer[email]" id="customer_email">`.
     - Label `"Password"` → `<input type="password" name="customer[password]" id="customer_password">`.
  6. Verify submit button: `<input type="submit" class="btn" value="Sign In">`.
  7. Verify inline link: `<a href="#">Forgot your password?</a>`.
- **Expected Results:**
  - All DOM attributes match exactly as specified.

---

### TC-ACC-002: Login — Incorrect Credentials Rejection
- **Priority:** P1 (High)
- **Type:** Authentication / Negative Testing
- **Pre-conditions:** On `/account/login`.
- **Test Steps:**
  1. Enter email: `notareal@user.com` and password: `WrongPass1!`.
  2. Click `"Sign In"`.
  3. Observe error response from Shopify customer auth.
- **Expected Results:**
  - Page reloads with error notice: `"Incorrect email or password."`.
  - Password field is cleared (not pre-populated).
  - User remains on `/account/login`.

---

### TC-ACC-003: Inline Password Recovery Toggle — `Forgot your password?` Anchor
- **Priority:** P1 (High)
- **Type:** UI Interactive State / Functional
- **Pre-conditions:** On `/account/login`.
- **Test Steps:**
  1. Click `"Forgot your password?"` link (`<a href="#">`).
  2. Observe DOM changes: main login form hides; `#recover-password` container becomes visible.
  3. Verify recovery form elements:
     - Text: `"We will send you an email to reset your password."` (or similar).
     - `Email Address` input field.
     - `"Submit"` button.
     - `"Cancel"` link.
  4. Click `"Cancel"`. Verify login form is restored.
- **Expected Results:**
  - Toggle executes via JS `display` manipulation (no page reload).
  - Cancel cleanly restores the standard login form.

---

### TC-ACC-004: Registration Page — All Fields & DOM Attributes
- **Priority:** P1 (High)
- **Type:** Functional / DOM Verification
- **Pre-conditions:** Navigate to `/account/register`.
- **Test Steps:**
  1. Verify page title: `"Create Account – Sauce Demo"`.
  2. Verify H1: `"Create Account"`.
  3. Verify form: `id="create_customer"`, `action="/account"`, `method="post"`.
  4. Verify 4 fields:
     - `"First Name"` → `<input type="text" name="customer[first_name]" id="first_name">`.
     - `"Last Name"` → `<input type="text" name="customer[last_name]" id="last_name">`.
     - `"Email Address"` → `<input type="email" name="customer[email]" id="email">`.
     - `"Password"` → `<input type="password" name="customer[password]" id="password">`.
  5. Verify submit button: `<input type="submit" class="btn" value="Create">`.
- **Expected Results:**
  - All DOM attributes verified. Form is wired to `POST /account`.

---

### TC-ACC-005: Static & Informational Pages — About Us, Blog & Terms
- **Priority:** P2 (Medium)
- **Type:** Content / Navigation
- **Test Steps:**
  1. Navigate to `/pages/about-us`. Verify title: `"About Us – Sauce Demo"`, H1: `"About Us"`. Verify body text mentions Sauce social shopping app.
  2. Navigate to `/blogs/news`. Verify title: `"News – Sauce Demo"`. Locate article `"First Post"` (posted by Shopify, date badge: `12 Mar`).
  3. Navigate to `/pages/terms`. Verify title: `"Terms – Sauce Demo"`, H1: `"Terms"`. Verify content begins: `"TERMS OF SERVICE ----- OVERVIEW This website is operated by Sauce Demo..."`.
- **Expected Results:**
  - All 3 static pages return HTTP 200 and render without Liquid/template errors.
  - Terms page is indexable and linked from checkout footer.
