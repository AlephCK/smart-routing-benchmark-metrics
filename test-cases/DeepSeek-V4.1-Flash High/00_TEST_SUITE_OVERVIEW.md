# Test Suite Overview — Sauce Demo Store (Shopify)
**Model Benchmark Series:** DeepSeek V4.1 Flash (High)
**Model ID:** `deepseek-v4.1-flash-1017` (thinking mode = high)
**Target Environment:** `https://sauce-demo.myshopify.com/`
**Suite Version:** 1.0.0
**Generated / Executed:** 2026-11-11 (America/Santo_Domingo, UTC-4)
**Exploration Sweep:** 33.84 s measured · 24-page structured pass + 12 targeted probe passes · ~78 page loads
**Distinct URLs Verified:** 27 · **Products Enumerated:** 7 / 7

---

## 1. System Under Test

Legacy Shopify "Simple" Liquid theme operating in GBP (£). The store was built to demo the discontinued "Sauce" social-commerce widget; remnants of that widget explain several dead controls and template leaks found below.

| Attribute | Observed Value |
|:---|:---|
| Platform | Shopify hosted storefront (Liquid) |
| Tagline | "Just a demo site showing off what Sauce can do." |
| Currency | GBP only (`£`), no switcher |
| Collections | `/collections` (2 listed), `/collections/all` (7), `/collections/frontpage` (3), `/collections/another-test` (7) |
| Checkout | Shopify one-page checkout at `/checkouts/cn/<token>/en-gb` |
| Payment | "Test Payment Gateway" — card `1` approved, `2` declined, `3` gateway failure |
| Accounts | Shopify classic customer accounts (`/account/login`, `/account/register`) |
| Static pages | `/pages/about-us`, `/pages/terms`, `/blogs/news` |
| Sold-out SKUs | `Brown Shades` (£20.00), `White sandals` (£25.00) |
| Homepage load (observed) | 0.549 s (549 ms) |
| Catalog load (observed) | 0.221 s (221 ms) |
| PDP load (observed) | 0.172 – 0.206 s |

### Product master data (live)

| # | Handle | Rendered Title | Price | Variants | Stock |
|:--|:---|:---|:---:|:---|:---|
| 1 | `flower-print-jeans` | **Black heels** | £45.00 | Size S/M/L · Colour Red | In stock |
| 2 | `bronze-sandals` | Bronze sandals | £39.99 | Default Title | In stock |
| 3 | `brown-shades` | Brown Shades | £20.00 | Default Title | **Sold out** |
| 4 | `grey-jacket` | Grey jacket | £55.00 | "Grey jacket" | In stock |
| 5 | `noir-jacket` | Noir jacket | £60.00 | Size S/M/L · Colour Blue/Red | In stock |
| 6 | `striped-top` | Striped top | £50.00 | Default Title | In stock |
| 7 | `white-sandals` | White sandals | £25.00 | Default Title | **Sold out** |

---

## 2. Defect Register — 15 verified defects (4 unique to this run)

Every defect below was reproduced against the live site during this run. Severity uses a standard QA scale (Critical / High / Medium / Low).

| ID | Sev. | Location | Description | Discovery |
|:---|:---:|:---|:---|:---|
| **DS-D01** | High | `/products/flower-print-jeans` | URL handle and SKU identity say *jeans*; PDP renders "Black heels" with footwear imagery. Handle/title/type contradiction harms SEO and merchandising trust. | Shared |
| **DS-D02** | Critical | `/search?q=shi`, `/search?q=bro` | Static legal page `/pages/terms` is injected into the product results grid with a "SOLD OUT" badge. Search template renders non-product objects as product cards. | Shared |
| **DS-D03** | Medium | `/search?q=jacket` | Irrelevant result: "Striped top" is returned for a jacket query (3 results, only 2 are jackets). | Shared |
| **DS-D04** | High | Add-to-cart on any PDP | Uncaught `TypeError: Cannot read properties of null (reading 'description')` at `jquery.theme.js:1:29646`, inside `Shopify.onCartUpdate`. Reproduced 3/3. | Refined |
| **DS-D05** | Medium | `/products/brown-shades` | Product description is completely empty (`.wysiwyg.no-tabs` has no text). | Shared |
| **DS-D06** | Medium | All described PDPs | Description grammar error: "change render the product description". | Shared |
| **DS-D07** | Medium | All described PDPs | Homophone typo: "to the write of the product images" (should be "right"); Striped top also carries a trailing `X` after the paragraph. | Shared |
| **DS-D08** | Medium | Home/sidebar | "Wish list" (`#sauce-show-wish-list`) and "Refer a friend" (`#sauce-show-refer-friend`) anchors have no matching target element — clicking is a no-op. | Shared |
| **DS-D09** | Low | Footer (every page) | Five social links plus the in-description blog link (six total) use insecure `http://` on an HTTPS storefront. | Shared |
| **DS-D10** | Medium | Every page | A visible but empty `<h1>` is emitted. The homepage's only `<h1>` is empty; PDPs ship an empty `<h1>` before the product `<h1>`. Fails WCAG 2.4.6 / 1.3.1 heading structure. | **Unique** |
| **DS-D11** | Low | `/cart` | Duplicate DOM IDs (`updates_611952521`, `customer_login_link`, `customer_register_link`) caused by the hidden mini-cart drawer form duplicating the visible cart form. | **Unique** |
| **DS-D12** | Low | Every PDP | No quantity selector on the product page; quantity can only be changed after navigating to `/cart`. | Shared |
| **DS-D13** | Low | Mobile 390×844 | Desktop and mobile navigation are both exposed: "Log In"/"Sign up" and "Login"/"Create account" appear simultaneously with conflicting labels. | Shared (variant) |
| **DS-D14** | Low | `/account/login`, `/account/register` | Email/password inputs carry no `required` or `aria-required` attribute; there is no native client-side validation. | **Unique** |
| **DS-D15** | Low | `/search` | The submitted query is not written back into `#search-field` (value stays `""`), so users cannot see or edit the term they searched. | **Unique** |

> **Detection note:** of the 14 distinct defects in the prior 3-model corpus, **12 were re-verified**
> (the trailing-`X` residue on Striped top is folded into DS-D07). The cart-badge desync (Opus D-03) and
> footer `"s ee"` typo (Opus D-10) did not reproduce and are not claimed. Four defects are new:
> DS-D10 (empty H1), DS-D11 (duplicate IDs), DS-D14 (missing constraints), DS-D15 (query retention).

---

## 3. Coverage Matrix

| Suite | Module Area | Cases | P0 | P1 | P2 | Defects exercised |
|:---|:---|:---:|:---:|:---:|:---:|:---|
| **01** | Navigation, Header & Layout | 7 | 3 | 4 | 0 | DS-D09, DS-D10, DS-D13 |
| **02** | Catalog & Collections | 7 | 4 | 3 | 0 | DS-D01 |
| **03** | Product Detail & Variants | 9 | 5 | 2 | 2 | DS-D04, DS-D05, DS-D06, DS-D07, DS-D12 |
| **04** | Cart & Mini-Cart | 7 | 3 | 2 | 2 | DS-D11 |
| **05** | Checkout & Payment Gateway | 8 | 6 | 2 | 0 | — (validation verified) |
| **06** | Search & Discovery | 7 | 3 | 3 | 1 | DS-D02, DS-D03, DS-D15 |
| **07** | Account Management & Static Pages | 5 | 2 | 2 | 1 | DS-D14 |
| **08** | Edge Cases, Security & Accessibility | 10 | 2 | 5 | 3 | DS-D08 → DS-D15 |
| **Total** | **Full storefront** | **60** | **28** | **23** | **9** | **15 defects** |

---

## 4. Execution Summary

| Status | Count | Meaning |
|:---|:---:|:---|
| **PASS** | 39 | Behaviour matched expectation |
| **FAIL** | 19 | Reproducible defect captured in a case whose expected result was not met |
| **BLOCKED** | 2 | Cannot be executed safely (valid discount code / live charge) |
| **Total** | **60** | — |

- **Defect detection rate:** 15 / 15 confirmed issues documented with evidence (100 %); includes 4 defects not present in the 3-model baseline.
- **False positives:** 0 — every FAIL was reproduced at least twice; DS-D02 was additionally confirmed through two independent query vectors (`shi` and `bro`).
- **Automation coverage:** the 5 highest-value flows are implemented as executable Playwright tests (see `automation/DeepSeek-V4.1-Flash High/`), covering catalog, PDP variants, cart arithmetic, search and checkout validation; that suite passes 5/5 in 16.4 s.

---

## 5. Test Environment & Evidence

- **Browser:** Chromium 1217 headless (Playwright 1.57.0), viewport 1280×900; mobile probe at 390×844 with an iPhone UA.
- **Session:** clean context per flow; cart state intentionally reset between cases.
- **Evidence:** DOM snapshots, `page.title()`, HTTP status codes, console/pageerror stacks, and Playwright traces under `automation/DeepSeek-V4.1-Flash High/test-results/`.
- **Known environmental noise:** Shopify's `event_observer_reporter` occasionally logs `TypeError: Failed to fetch` (analytics beacon blocked). Excluded from the defect register as third-party telemetry noise.

---

## 6. Suite Index

| File | Contents |
|:---|:---|
| `01_NAVIGATION_AND_LAYOUT.md` | Header, sidebar, mobile nav, footer, 404, heading structure |
| `02_PRODUCT_CATALOG_AND_COLLECTIONS.md` | Collection index, grids, sold-out overlays, currency |
| `03_PRODUCT_DETAIL_AND_VARIANTS.md` | Variant matrix, PDP CTAs, descriptions, JS errors |
| `04_CART_AND_MINI_CART.md` | Drawer, cart page, quantity math, duplicate DOM |
| `05_CHECKOUT_AND_PAYMENT_GATEWAY.md` | Checkout hand-off, address, test gateway, discounts |
| `06_SEARCH_AND_DISCOVERY.md` | Positive/zero/empty queries, relevance, template leak, XSS |
| `07_ACCOUNT_MANAGEMENT.md` | Login, register, password recovery, validation attributes |
| `08_EDGE_CASES_SECURITY_AND_DEFECTS.md` | Dead links, mixed content, a11y, duplicate IDs, mobile labels |
| `METRICS.md` | Quality & Detection, latency, cost / 1,000 runs |
