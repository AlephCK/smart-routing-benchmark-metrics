# Playwright Test Automation Suite (Gemini 3.8 Flash High)

**QA Activity:** Automated Test Engineering (Playwright TypeScript)  
**Target Application:** Sauce Demo Store (`https://sauce-demo.myshopify.com/`)  
**Model Generating Tests:** `Gemini 3.8 Flash (High)`  
**Test Spec File:** [`tests/common_5_test_cases.spec.ts`](./tests/common_5_test_cases.spec.ts)  
**Config File:** [`playwright.config.ts`](./playwright.config.ts)  

---

## 5 Common Test Cases Implemented

| ID | Test Case Name | Target Flow | Key Assertions |
|:---|:---|:---|:---|
| **TC-AUTO-01** | Catalog Browsing & Sold-Out Verification | `/collections/all` | Grid visible, GBP `£` formatting, Sold Out badges on out-of-stock items (`Brown Shades`, `White sandals`) |
| **TC-AUTO-02** | PDP Dynamic Multi-Option Variant Selection | `/products/noir-jacket` | 2 `<select>` dropdowns (Size & Color), variant change, price `£60.00`, active `Add to Cart` CTA |
| **TC-AUTO-03** | Cart Quantity Update & Subtotal Recalculation | `/cart` | Add item, change qty `1 -> 2`, click Update, assert real-time mathematical recalculation |
| **TC-AUTO-04** | Search Functionality — Positive & Zero-Results | `/search` | Positive query (`sandals`) returns matching items; negative query (`xyznonexistent999`) shows exact error |
| **TC-AUTO-05** | Checkout Initiation & Negative Discount Code | `/checkouts/...` | Transition from cart to checkout, apply `INVALID123`, assert exact error `"Enter a valid discount code"` |

---

## How to Run the Tests

```bash
# 1. Install Playwright and dependencies
npm install -D @playwright/test

# 2. Run the test suite headlessly across all projects
npx playwright test

# 3. Run in UI mode
npx playwright test --ui

# 4. View HTML execution report
npx playwright show-report
```
