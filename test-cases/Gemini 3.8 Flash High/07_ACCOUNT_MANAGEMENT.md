# Test Suite 07: Customer Account Management
**Model:** Gemini 3.8 Flash High  
**Module:** User Registration, Login Authentication & Password Recovery  
**Target:** `https://sauce-demo.myshopify.com/`

---

### TC-ACC-001: Customer Registration Form Layout & Inputs (`/account/register`)
- **Priority:** P1 (High)
- **Type:** Functional / Form Verification
- **Pre-conditions:** Direct navigation to `/account/register` or click `Sign up`.
- **Test Steps:**
  1. Open `https://sauce-demo.myshopify.com/account/register`.
  2. Verify form title: `"Create Account"`.
  3. Verify presence of required input fields:
     - `First Name` (`input[name="customer[first_name]"]`)
     - `Last Name` (`input[name="customer[last_name]"]`)
     - `Email Address` (`input[name="customer[email]"]`)
     - `Password` (`input[name="customer[password]"]`)
     - `Create` submit button
     - Return link to store: `"or Return to Store"`
- **Expected Results:**
  - All fields are visible, aligned, and properly labeled.
  - Return link points safely to `/`.

---

### TC-ACC-002: Customer Registration Validation & Error Highlighting
- **Priority:** P1 (High)
- **Type:** Negative Testing / Validation
- **Pre-conditions:** On `/account/register`.
- **Test Steps:**
  1. Leave all fields empty.
  2. Click `Create`.
  3. Attempt submission with invalid email format (e.g., `user@domain`).
  4. Attempt submission with short password (e.g., `123`).
- **Expected Results:**
  - Form does not submit empty fields.
  - Shopify customer service returns appropriate error notice (e.g., `"Password is too short (minimum is 5 characters)"`, `"Email is invalid"`).

---

### TC-ACC-003: Customer Login Flow (`/account/login`)
- **Priority:** P0 (Critical Path)
- **Type:** Authentication / Functional
- **Pre-conditions:** On `/account/login` or click `Log In`.
- **Test Steps:**
  1. Open `https://sauce-demo.myshopify.com/account/login`.
  2. Verify fields:
     - `Email Address` (`input[name="customer[email]"]`)
     - `Password` (`input[name="customer[password]"]`)
     - `Sign In` button
     - `Forgot your password?` link
  3. Enter fictitious non-existent credentials (`fakeuser@example.com` / `Secret123!`).
  4. Click `Sign In`.
- **Expected Results:**
  - System denies access with clear error: `"Incorrect email or password."`
  - Password field is cleared for security.

---

### TC-ACC-004: Inline Password Recovery Toggle (`#recover`)
- **Priority:** P1 (High)
- **Type:** UI Interactive State
- **Pre-conditions:** On `/account/login`.
- **Test Steps:**
  1. Click `Forgot your password?` link (`a[href="#recover"]`).
  2. Observe DOM visibility changes.
  3. Verify the Customer Login form hides or moves aside, and the `"Reset your password"` form appears.
  4. Verify presence of:
     - Reset instructions: `"We will send you an email to reset your password."`
     - `Email Address` field.
     - `Submit` button.
     - `Cancel` button / link.
  5. Click `Cancel`.
- **Expected Results:**
  - Toggle executes via smooth JavaScript display state without reloading the page.
  - Clicking `Cancel` restores the standard Customer Login form.

---

### TC-ACC-005: Static & Informational Pages Integrity (`/pages/about-us` & `/blogs/news`)
- **Priority:** P2 (Medium)
- **Type:** Content / Navigation
- **Pre-conditions:** Storefront accessible.
- **Test Steps:**
  1. Navigate to `/pages/about-us`.
  2. Verify page heading `"About Us"` and body text explaining Sauce social shopping demo context.
  3. Navigate to `/blogs/news`.
  4. Verify article title `"First Post"`, post author (`Shopify`), date (`March 12`), and full body text.
  5. Check comments section status.
- **Expected Results:**
  - Both pages return HTTP 200.
  - No broken Liquid tags or raw JSON leakage.
  - Comments section accurately reflects disabled status.
