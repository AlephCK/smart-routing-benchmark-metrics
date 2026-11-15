# QA Activity 1 — Exploratory QA Plan

**Model:** GPT-6 Luna Medium  
**Target:** [Sauce Demo Shopify storefront](https://sauce-demo.myshopify.com/)  
**Run date:** 2026-11-11  
**Scope:** Functional, usability, and defect-focused test cases for a demo ecommerce storefront.

## Environment notes observed

- Storefront is a Shopify demo and displays prices in GBP (£).
- Homepage headline: “Just a demo site showing off what Sauce can do.”
- Homepage exposes Home, Catalog, Blog, About Us, Login, Create account, cart and search navigation.
- Homepage displays Grey jacket (£55.00), Noir jacket (£60.00), and Striped top (£50.00).
- About Us copy visibly contains “and s ee what their friends,” a spacing defect.
- Checkout and payment processing are outside the safe scope of this manual plan; use the automated negative-discount case only and do not submit payment.

## Priority and result conventions

P0 = purchase path or critical navigation; P1 = core storefront function; P2 = content, accessibility, and edge behavior. Record **Pass**, **Fail**, **Blocked**, or **Not Run** with browser, date/time, evidence URL, and screenshot/trace when relevant. These are proposed tests; unexecuted manual cases remain Not Run.

## Coverage summary

| Area | Cases | Case IDs |
|---|---:|---|
| Navigation and content | 5 | NAV-01–05 |
| Catalog and inventory | 5 | CAT-01–05 |
| Product details and variants | 5 | PDP-01–05 |
| Cart and checkout | 6 | CART-01–06 |
| Search and account | 6 | DISC-01–06 |
| Defect and quality checks | 5 | QUAL-01–05 |
| **Total** | **32** | |

## Known observations to turn into regression checks

The live homepage crawl confirms the About Us copy spacing issue (QUAL-01). The existing benchmark corpus in this workspace has additional candidate findings (e.g., search relevance, sold-out state, and product-handle/title mismatch); treat them as **regression candidates requiring fresh reproduction**, not as defects independently verified in this run.
