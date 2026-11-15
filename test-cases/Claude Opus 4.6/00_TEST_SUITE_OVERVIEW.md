# Test Suite Overview: Sauce Demo Store (Shopify)
**Model Benchmark Series:** Claude Opus 4.6 (Thinking)
**Target Environment:** `https://sauce-demo.myshopify.com/`
**Test Suite Version:** 1.0.0
**Generated On:** 2026-11-11
**Exploration Elapsed Time:** ~148.6 seconds | **Browser Steps:** 67 | **Distinct URLs Visited:** 18 | **Unique Products Found:** 7

---

## 1. System Architecture & Scope

Live Shopify demonstration store using a legacy "Simple" Liquid theme. Store operates in GBP (£) with no currency or language switching. Originally built to showcase the "Sauce" social commerce widget (now defunct).

### Key Technical Attributes:
- **Platform:** Shopify Hosted Storefront (Liquid engine)
- **Store Tagline:** `"Just a demo site showing off what Sauce can do."`
- **Currency:** British Pound Sterling (£ / GBP — consistent site-wide)
- **Checkout:** Shopify Hosted One-Page Checkout (`/checkouts/cn/...`)
- **Payment Gateway:** Shopify Bogus / Test Payment Gateway
- **Authentication:** Shopify Customer Accounts (`/account/login`, `/account/register`)
- **Known Sold-Out Products:** `Brown Shades` (£20.00), `White sandals` (£25.00)
- **Static Pages Discovered:** `/pages/about-us`, `/pages/terms`
- **Homepage Load Time (Observed):** 1.392 seconds (1392 ms)

---

## 2. Live Defect Register (Independently Captured)

During this run, **10 distinct live defects** were identified — the highest count of any model in this benchmark series:

| ID | Severity | Location | Description |
|:---|:---:|:---|:---|
| **D-01** | Critical | `/products/flower-print-jeans` | Product handle `flower-print-jeans` renders title `"Black heels"`, product_type `Jeans`, with contradictory Size/Color variants |
| **D-02** | Critical | `/search?q=bro` | Static `/pages/terms` renders with `"Sold Out"` badge in product search grid — template doesn't check `item.object_type` |
| **D-03** | High | Cart badge | Floating circle badge desynchronization: badge shows `1` while header text reads `"My Cart (2)"` after AJAX add |
| **D-04** | High | Theme JS | `Uncaught TypeError: Cannot read properties of null (reading 'description')` thrown in `jquery.theme.js` during cart actions |
| **D-05** | Medium | Sidebar / Mobile | Navigation label inconsistency: `"Log In"` vs `"Login"`, `"Sign up"` vs `"Create account"` between desktop and mobile |
| **D-06** | Medium | All PDPs | Description grammar error: `"change render the product description"` |
| **D-07** | Medium | All PDPs | Description homophone typo: `"to the write of the product images"` (should be `"right"`) |
| **D-08** | Medium | `/products/brown-shades` | Product description is **completely empty** — no text at all |
| **D-09** | Low | `/products/striped-top` | Trailing rogue character `"X"` at end of description: `"product images.X"` |
| **D-10** | Low | Site footer (all pages) | Footer text typo: `"and s ee what their friends"` (space-broken word) |

---

## 3. Test Coverage & Module Matrix

| Test Suite | Module Area | Total Cases | Priority (P0 / P1 / P2) |
|:---|:---|:---:|:---:|
| **01** | Navigation, Header & Layout | 6 | 2 / 3 / 1 |
| **02** | Catalog & Collections | 6 | 2 / 3 / 1 |
| **03** | Product Detail & Variants | 8 | 3 / 4 / 1 |
| **04** | Cart & Mini-Cart | 8 | 4 / 3 / 1 |
| **05** | Checkout & Payment Gateway | 8 | 5 / 2 / 1 |
| **06** | Search & Discovery | 6 | 3 / 2 / 1 |
| **07** | Account Management & Static Pages | 5 | 1 / 3 / 1 |
| **08** | Edge Cases, Defects & Console Errors | 10 | 3 / 4 / 3 |
| **Total** | **Full Storefront Coverage** | **57** | **23 / 24 / 10** |
