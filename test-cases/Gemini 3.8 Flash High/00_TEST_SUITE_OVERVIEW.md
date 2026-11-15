# Test Suite Overview: Sauce Demo Store (Shopify)
**Model Benchmark Series:** Gemini 3.8 Flash High  
**Target Environment:** `https://sauce-demo.myshopify.com/`  
**Test Suite Version:** 1.0.0  
**Generated On:** 2026-11-11  

---

## 1. System Architecture & Scope

The application under test is a live demonstration e-commerce store hosted on **Shopify**, utilizing a legacy "Simple" Liquid theme. The store was originally configured to demonstrate the "Sauce" social commerce widget.

### Key Technical Attributes:
- **Platform:** Shopify Hosted Storefront (Liquid engine)
- **Currency:** British Pound Sterling (£ / GBP)
- **Checkout:** Shopify Hosted One-Page Checkout (`/checkouts/cn/...`)
- **Payment Gateway:** Shopify Bogus Gateway (Test Mode)
- **Authentication:** Shopify Customer Accounts (`/account/login`, `/account/register`)
- **Inventory Status:** Mixed (In Stock, Multi-variant, Sold Out)

---

## 2. Test Coverage & Module Matrix

| Test Suite | Module Area | Total Cases | Priority (P0 / P1 / P2) | Focus Areas |
|:---|:---|:---:|:---:|:---|
| **01** | Navigation & Header | 5 | 2 / 2 / 1 | Utility bar, mobile drawer, links, cart triggers |
| **02** | Catalog & Collections | 5 | 2 / 2 / 1 | Grid layouts, collection routing, sold-out overlays |
| **03** | Product Detail & Variants | 6 | 3 / 2 / 1 | Dynamic dropdowns, price changes, add-to-cart |
| **04** | Cart & Mini-Cart | 7 | 4 / 2 / 1 | Quantity math, drawer sync, order notes, deletions |
| **05** | Checkout & Bogus Gateway | 8 | 5 / 2 / 1 | Promo code errors, shipping calc, card simulation |
| **06** | Search & Discovery | 5 | 2 / 2 / 1 | Exact match, fuzzy match, zero results error |
| **07** | Account Management | 5 | 1 / 3 / 1 | Sign-in, sign-up, password recovery toggle |
| **08** | Edge Cases & Defects | 6 | 2 / 2 / 2 | Data mismatches, dead anchors, HTTP protocol checks |
| **Total** | **Comprehensive Suite** | **37** | **17 / 15 / 8** | **Full Storefront End-to-End Coverage** |

---

## 3. Discovered Site Anomalies & Defect Register

During automated exploration, the following live defects and anomalies were captured and cataloged into dedicated test cases:

1. **Defect D-001 (Data Integrity / Content Mismatch):**  
   URL `/products/flower-print-jeans` renders the product title `"Black heels"`, displaying photographs of footwear rather than jeans.
2. **Defect D-002 (Dead Third-Party Integration Anchors):**  
   Sidebar links `"Wish list"` and `"Refer a friend"` link to dead hash anchors (`#sauce-show-wish-list` and `#sauce-show-refer-friend`) because the Sauce app client library is no longer loaded.
3. **Defect D-003 (UX Limitation / PDP Quantity Selector):**  
   Product detail pages contain no quantity selector, forcing all item additions to quantity `1` and requiring adjustments inside the cart.
4. **Defect D-004 (Theme Template Typo):**  
   Product description copy contains the string `"write of the product images"` instead of `"right of..."`.
5. **Defect D-005 (Security / Insecure Links):**  
   Sidebar social links for Facebook, Twitter, and Pinterest utilize insecure `http://` URLs instead of `https://`.

---

## 4. Execution Guidance & Traceability

- **Prerequisites:** Modern browser (Chromium / WebKit / Firefox), network access to `sauce-demo.myshopify.com`.
- **Test Credentials:** Bogus Gateway card numbers (`1` = approve, `2` = decline, `3` = error).
- **Automation Ready:** Locator IDs, CSS selectors, and XPath definitions are specified for every test case. Automated Playwright specifications are provided in [`sauce_demo_playwright.spec.ts`](./sauce_demo_playwright.spec.ts).
