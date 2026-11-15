# Smart Model Routing in QA

A multi-model AI benchmark comparing how different large language models perform on QA tasks against a [Shopify demo store](https://sauce-demo.myshopify.com/). The results inform a **smart routing strategy** that allocates QA workloads across models to optimize quality, cost, and speed.

## Benchmark Overview

**Target Application:** Sauce Demo Store (Shopify)  
**Models Evaluated:** Gemini 3.8 Flash (High), Claude Sonnet 4.6, Claude Opus 4.6, DeepSeek V4.1 Flash (High), GPT 5.6 Terra (Medium), GPT 6 Luna (Medium)

### Activity 1 — Test Case Generation & Defect Detection

Each model was prompted to generate comprehensive manual test cases and identify defects in the target application.

| Model | Quality Score | Test Cases | Defects Found | Latency | Cost / 1K Runs |
|-------|:---:|:---:|:---:|:---:|:---:|
| Gemini 3.8 Flash (High) | 96.5 | 45 | 12 | 14.2 s | **$1.61** |
| Claude Sonnet 4.6 | 98.5 | 42 | 14 | 18.5 s | $12.30 |
| Claude Opus 4.6 | **99.2** | 48 | **15** | 42.1 s | $577.50 |
| DeepSeek V4.1 Flash (High) | 98.8 | 44 | 13 | 10.8 s | $3.22 |
| GPT 5.6 Terra (Medium) | 92.0 | 38 | 8 | 22.3 s | $18.75 |
| GPT 6 Luna (Medium) | 90.0 | 35 | 1 | 35.7 s | $45.00 |

### Activity 2 — Playwright Test Automation

Each model generated Playwright (TypeScript) test scripts for 5 common test scenarios.

| Model | Quality Score | Locator Robustness | Assertion Completeness | Flakiness Risk | Cost / 1K Runs |
|-------|:---:|:---:|:---:|:---:|:---:|
| Gemini 3.8 Flash (High) | 97.5 | 95% | 94% | Low | **$0.80** |
| Claude Sonnet 4.6 | 98.0 | 97% | 96% | Very Low | $5.75 |
| Claude Opus 4.6 | **99.0** | **99%** | **98%** | Very Low | $271.50 |
| DeepSeek V4.1 Flash (High) | 98.6 | 96% | 95% | Low | $1.55 |
| GPT 5.6 Terra (Medium) | 91.0 | 88% | 85% | Medium | $9.00 |
| GPT 6 Luna (Medium) | 89.5 | 85% | 82% | High | $21.25 |

### Recommended Smart Routing Strategy

Based on the benchmark results, the optimal allocation is:

| Model | Allocation | Use Case |
|-------|:---:|---------|
| Gemini 3.8 Flash (High) | 78% | Standard regression, smoke tests |
| DeepSeek V4.1 Flash (High) | 14% | Complex flows, edge cases |
| Claude Sonnet 4.6 | 5% | High-stakes validations |
| Claude Opus 4.6 | 3% | Critical path, compliance audits |

**Projected cost:** ~$31 / 1,000 runs (vs. $577 with Opus-only) — **94.6% cost savings**.

## Repository Structure

```
smart-routing/
├── test-cases/                        # Activity 1 — Manual test cases per model
│   ├── Gemini 3.8 Flash High/
│   ├── Claude Sonnet 4.6/
│   ├── Claude Opus 4.6/
│   ├── DeepSeek-V4.1-Flash High/
│   ├── GPT 5.6 Terra/
│   └── GPT 6 Luna/
├── automation/                        # Activity 2 — Playwright automation per model
│   ├── Gemini 3.8 Flash High/
│   ├── Claude Sonnet 4.6/
│   ├── Claude Opus 4.6/
│   ├── DeepSeek-V4.1-Flash High/
│   ├── GPT 5.6 Terra/
│   └── GPT 6 Luna/
├── MODEL_BENCHMARK_METRICS.md         # Detailed Activity 1 metrics
├── PLAYWRIGHT_AUTOMATION_METRICS.md   # Detailed Activity 2 metrics
└── README.md
```

## Browsing the Test Cases

Each model directory under `test-cases/` contains a structured set of manual test case documents:

| File | Content |
|------|---------|
| `00_TEST_SUITE_OVERVIEW.md` | Summary and scope of the model's test suite |
| `01_NAVIGATION_AND_LAYOUT.md` | Site navigation, header, footer, responsive layout |
| `02_PRODUCT_CATALOG_AND_COLLECTIONS.md` | Collection pages, filtering, sorting, pagination |
| `03_PRODUCT_DETAIL_AND_VARIANTS.md` | PDP content, variant selection, image gallery |
| `04_CART_AND_MINI_CART.md` | Add-to-cart, quantity updates, subtotal calculations |
| `05_CHECKOUT_AND_PAYMENT_GATEWAY.md` | Checkout flow, form validation, payment processing |
| `06_SEARCH_AND_DISCOVERY.md` | Search functionality, keyword matching, zero results |
| `07_ACCOUNT_MANAGEMENT.md` | Login, registration, account settings |
| `08_EDGE_CASES_SECURITY_AND_DEFECTS.md` | Edge cases, security checks, discovered defects |
| `METRICS.md` | Per-model quality and performance metrics |

Each directory also includes a `sauce_demo_playwright.spec.ts` — the model's full Playwright spec generated during Activity 1.

## Running the Playwright Automation

Each model directory under `automation/` contains Playwright test scripts for 5 common test scenarios:

| ID | Test Case | What It Covers |
|----|-----------|---------------|
| TC-AUTO-01 | Catalog Browsing | Navigate collections, verify product cards load |
| TC-AUTO-02 | PDP Variant Selection | Select size/color variants, verify price update |
| TC-AUTO-03 | Cart Quantity & Subtotal | Add items, change quantity, verify subtotal math |
| TC-AUTO-04 | Search Keyword & Zero Results | Search valid/invalid terms, verify result behavior |
| TC-AUTO-05 | Checkout Discount Validation | Apply discount code, verify price adjustment |

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- npm

### Setup & Run

Some model directories include a ready-to-run `package.json` (DeepSeek, GPT 5.6 Terra, GPT 6 Luna). For models without one (Gemini, Claude Sonnet, Claude Opus), you'll need to initialize the project first.

**For directories with `package.json`:**

```bash
cd automation/DeepSeek-V4.1-Flash\ High
npm install
npx playwright install chromium
npx playwright test
```

**For directories without `package.json`:**

```bash
cd automation/Gemini\ 3.8\ Flash\ High
npm init -y
npm install -D @playwright/test
npx playwright install chromium
npx playwright test
```

### Viewing Test Reports

After running, generate an HTML report:

```bash
npx playwright show-report
```

Models with prior runs (DeepSeek, GPT 5.6 Terra, GPT 6 Luna) already have results in their `results/` and `playwright-report/` directories.

### Configuration

All models target the same base URL configured in `playwright.config.ts`:

```
baseURL: 'https://sauce-demo.myshopify.com'
```

The test file for every model is at `tests/common_5_test_cases.spec.ts`.

## Detailed Metrics

- **[MODEL_BENCHMARK_METRICS.md](MODEL_BENCHMARK_METRICS.md)** — Full Activity 1 data: quality scores, generation latency, cost analysis, defect discovery breakdown
- **[PLAYWRIGHT_AUTOMATION_METRICS.md](PLAYWRIGHT_AUTOMATION_METRICS.md)** — Full Activity 2 data: quality scores, locator robustness, assertion completeness, flakiness risk, throughput

## License

Internal benchmark — not for redistribution.
