# Test Suite Overview: Sauce Demo Store (Shopify)
**Model Benchmark Series:** Claude Sonnet 4.6 (Thinking)
**Target Environment:** `https://sauce-demo.myshopify.com/`
**Test Suite Version:** 1.0.0
**Generated On:** 2026-11-11
**Exploration Elapsed Time:** ~125 seconds | **Distinct URLs Visited:** 24 | **Unique Products Found:** 7

---

## 1. System Architecture & Scope

The application under test is a live demonstration e-commerce store hosted on **Shopify**, utilizing a legacy "Simple" Liquid theme. Store operates in GBP (£) with no currency or language switching.

### Key Technical Attributes:
- **Platform:** Shopify Hosted Storefront (Liquid engine)
- **Store Tagline:** `"Just a demo site showing off what Sauce can do."`
- **Currency:** British Pound Sterling (£ / GBP — consistent site-wide)
- **Checkout:** Shopify Hosted One-Page Checkout (`/checkouts/cn/...`)
- **Payment Gateway:** Shopify Bogus Gateway (Test Mode)
- **Authentication:** Shopify Customer Accounts (`/account/login`, `/account/register`)
- **Known Sold-Out Products:** `Brown Shades` (£20.00), `White sandals` (£25.00)
- **Static Pages Discovered:** `/pages/about-us`, `/pages/terms`

---

## 2. Live Defect Register (Independently Captured)

During this run, **7 distinct live defects** were identified and catalogued:

| ID | Severity | Location | Description |
|:---|:---:|:---|:---|
| **D-01** | High | `/products/flower-print-jeans` | Product handle `flower-print-jeans` renders title `"Black heels"` with jeans imagery |
| **D-02** | High | `/search?q=shi` | Static `/pages/terms` renders in product grid with `"No image"` placeholder and `"SOLD OUT"` badge |
| **D-03** | Medium | `/search?q=jacket` | `"Striped top"` returned as a result for the query `"jacket"` — false positive |
| **D-04** | Medium | All PDPs | Description typo: `"change render the product description"` (grammar error) |
| **D-05** | Medium | All PDPs | Description homophone typo: `"to the write of the product images"` (should be `"right"`) |
| **D-06** | Low | PDPs (Grey jacket, Striped top, Black heels) | Trailing stray character at end of description: `" · X"` or `".X"` |
| **D-07** | Low | Site footer (all pages) | Footer text typo: `"and s ee what their friends"` (extra space in `s ee`) |

---

## 3. Test Coverage & Module Matrix

| Test Suite | Module Area | Total Cases | Priority (P0 / P1 / P2) |
|:---|:---|:---:|:---:|
| **01** | Navigation & Header | 5 | 2 / 2 / 1 |
| **02** | Catalog & Collections | 6 | 2 / 3 / 1 |
| **03** | Product Detail & Variants | 7 | 3 / 3 / 1 |
| **04** | Cart & Mini-Cart | 7 | 4 / 2 / 1 |
| **05** | Checkout & Bogus Gateway | 8 | 5 / 2 / 1 |
| **06** | Search & Discovery | 6 | 3 / 2 / 1 |
| **07** | Account Management & Static Pages | 5 | 1 / 3 / 1 |
| **08** | Edge Cases & Live Defects | 7 | 2 / 3 / 2 |
| **Total** | **Full Storefront Coverage** | **51** | **22 / 20 / 9** |
