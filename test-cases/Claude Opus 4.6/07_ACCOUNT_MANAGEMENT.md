# Test Suite 07: Account Management & Static Pages
**Model:** Claude Opus 4.6 (Thinking)
**Module:** Customer Login, Inline Password Reset, Registration & Static Pages
**Target:** `https://sauce-demo.myshopify.com/`

---

### TC-ACC-001: Customer Login Page & Exact DOM Verification
- **Priority:** P0 (Critical Path)
- **Type:** Functional / DOM Verification
- **Pre-conditions:** Direct navigation to `/account/login`.
- **Test Steps:**
  1. Open `https://sauce-demo.myshopify.com/account/login`.
  2. Verify page title: `Account – Sauce Demo`.
  3. Verify Heading 1: `Customer Login`.
  4. Verify input fields and attributes:
     - Textbox: `Email Address` (`type="email"`, `name="customer[email]"`)
     - Textbox: `Password` (`type="password"`, `name="customer[password]"`)
     - Link: `Forgot your password?` (`href="#recover"`)
     - Submit button: `Sign In` (`type="submit"`, value `"Sign In"`)
- **Expected Results:**
  - Login form renders with exact attributes and is wired to handle customer authentication.

---

### TC-ACC-002: Inline Password Recovery Form Toggle (`#recover-password`)
- **Priority:** P1 (High)
- **Type:** UI State / Interactive Form
- **Pre-conditions:** User on `/account/login`.
- **Test Steps:**
  1. Click `Forgot your password?` link (`href="#recover"`).
  2. Observe JavaScript inline toggle: customer login form hides; `#recover-password` container becomes visible.
  3. Verify recovery form elements:
     - Heading 1: `Reset Password`.
     - Subtext: `"We will send you an email to reset your password."`.
     - Input: `Email` (`type="email"`, `name="email"`).
     - Submit button: `Submit` (`type="submit"`, value `"Submit"`).
     - Cancel link: `or Cancel` (`href="#"`).
  4. Click `Cancel`.
- **Expected Results:**
  - Form transitions inline without page reload; clicking `Cancel` restores the standard Customer Login form cleanly.

---

### TC-ACC-003: Customer Registration Form Layout & Attributes (`/account/register`)
- **Priority:** P1 (High)
- **Type:** Functional / Form Verification
- **Pre-conditions:** Direct navigation to `/account/register`.
- **Test Steps:**
  1. Open `https://sauce-demo.myshopify.com/account/register`.
  2. Verify page title: `Create Account – Sauce Demo`.
  3. Verify Heading 1: `Create Account`.
  4. Verify all 4 required registration inputs:
     - `First Name` (`type="text"`, `name="customer[first_name]"`)
     - `Last Name` (`type="text"`, `name="customer[last_name]"`)
     - `Email Address` (`type="email"`, `name="customer[email]"`)
     - `Password` (`type="password"`, `name="customer[password]"`)
     - Button: `Create` (`type="submit"`, value `"Create"`)
- **Expected Results:**
  - Form structure is validated; action is wired to `POST /account`.

---

### TC-ACC-004: Invalid Credentials Error Notice on Login
- **Priority:** P1 (High)
- **Type:** Authentication / Error Handling
- **Test Steps:**
  1. On `/account/login`, enter: `invaliduser999@test.com` and password `IncorrectPass1!`.
  2. Click `Sign In`.
- **Expected Results:**
  - System blocks authentication with error message: `"Incorrect email or password."`. Password input is cleared.

---

### TC-ACC-005: Static Informational Pages — About Us, Blog & Terms of Service
- **Priority:** P2 (Medium)
- **Type:** Content Integrity
- **Test Steps:**
  1. Open `/pages/about-us`: Verify H1 `About Us` and body copy mentioning Sauce social app.
  2. Open `/blogs/news`: Verify post `First Post`, date badge `12 Mar`, author `Posted by Shopify`.
  3. Open `/pages/terms`: Verify H1 `Terms` and full legal overview text.
- **Expected Results:**
  - All 3 pages return HTTP 200 and render valid HTML without template errors.
