# QA Activity 1 — Exploratory QA Plan

**Model:** GPT-5.6 Terra (medium reasoning)  
**Target:** [Sauce Demo Shopify storefront](https://sauce-demo.myshopify.com/)  
**Run date:** 2026-11-11  
**Scope:** Functional storefront coverage, content accuracy, and purchase-path regression risks.

## Fresh live observations

The current homepage exposes Home, Catalog, Blog, About Us, Login, Create account, cart, and search. The catalog shows seven products in GBP; Brown Shades and White sandals are marked Sold Out. Noir jacket is listed at £60.00 and presents variant controls. The homepage and catalog footer show the copy defect `and s ee what their friends`; the Noir jacket description contains `change render` and `to the write`.

These three content issues were directly observed during this review. Other cases are test specifications, not claims that the behavior has been executed.

## Priorities and result states

P0 covers storefront purchase path; P1 covers primary behavior; P2 covers content, resilience, and accessibility. Capture Pass, Fail, Blocked, or Not Run with URL, browser, and evidence for every execution.

| Area | Cases | IDs |
|---|---:|---|
| Navigation and layout | 5 | NAV-01–05 |
| Catalog and inventory | 5 | CAT-01–05 |
| Product detail and variants | 6 | PDP-01–06 |
| Cart and checkout | 7 | CART-01–04, CHECK-01–03 |
| Search and account | 6 | DISC-01–06 |
| Content and quality | 5 | QUAL-01–05 |
| **Total** | **34** | |
