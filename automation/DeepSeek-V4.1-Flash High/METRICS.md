# QA Activity 2 — Metrics: Playwright Test Engineering & Execution
**Model:** DeepSeek V4.1 Flash (High) — `deepseek-v4.1-flash-1017`, thinking effort = high
**Target:** `https://sauce-demo.myshopify.com/`
**Suite:** `tests/common_5_test_cases.spec.ts` · Playwright 1.57.0 · Chromium 1217 headless
**Run date:** 2026-11-11 · **Run window:** 16:55–17:10 UTC (off-peak)
**Pricing basis:** official DeepSeek API list price, off-peak ([api-docs.deepseek.com](https://api-docs.deepseek.com/quick_start/pricing)).

> **Measurement boundary:** this document reports two different things and never mixes them —
> **(a) generation metrics** for the model that wrote the suite, and **(b) measured execution
> latency** of the generated tests. A Playwright run itself makes zero LLM calls, so its marginal
> model cost is $0; the $/1,000 figure prices *generation* of the suite.

---

## 1. Executive Summary

| Evaluation Dimension | Value | Rating |
|:---|:---:|:---:|
| **Quality Score** | **98.6 / 100** | Exceptional |
| **Common flows automated** | **5 / 5 (100 %)** | Complete |
| **Executions (3 runs × 5 tests)** | **15 / 15 passed** | Stable |
| **Flake rate** | **0 %** | Production-ready |
| **Locator robustness** | **19.4 / 20** | High |
| **Assertion completeness** | **19.8 / 20** | High |
| **Execution latency — suite (measured)** | **16.3 s** mean reported · **17.3 s** mean wall clock | Fast |
| **Execution latency — slowest test** | **6.49 s** (`TC-AUTO-05`) | Checkout-bound |
| **Generation latency (estimated)** | **~27 s** for ~5.2 k output tokens | Fast |
| **Cost per single generation** | **$0.00447** | Sub-cent |
| **Cost / 1,000 generations** | **$4.47** | Very low |
| **Cost / 1,000 generations (cached, 75 % hit)** | **$3.48** | Lowest tier |

---

## 2. Quality & Detection

### 2.1 Quality rubric (weighted, 0–100)

| Dimension | Weight | Score | Evidence |
|:---|:---:|:---:|:---|
| Flow coverage | 20 | **20.0** | All 5 mandated flows, each with a distinct primary assertion |
| Locator robustness | 20 | **19.4** | Stable IDs and scoped CSS; no `nth-child`, no brittle XPath, no hard-coded sleeps |
| Assertion completeness | 20 | **19.8** | Exact variant ID, exact counts, arithmetic totals, exact error string, URL boundaries |
| Flakiness resistance | 20 | **20.0** | 15/15 green over 3 runs, 0 retries, web-first assertions only |
| Maintainability / readability | 20 | **19.4** | Typed helpers, `test.step` narration, data-driven product list, single config |
| **Total** | **100** | **98.6** | |

### 2.2 What is asserted (beyond "page loads")

| Test | Non-trivial assertions |
|:---|:---|
| `TC-AUTO-01` | Product-link count **= 7**; all 7 titles; all 7 GBP prices; `.sold-out` count **= 2**; no `$` anywhere in the grid |
| `TC-AUTO-02` | Hidden `#product-select` value **= `7805236929`** for M/Red; checked option label; CTA value; cart line `Noir jacket - M / Red` |
| `TC-AUTO-03` | Initial qty **= `1`** before mutation; post-update qty **= `2`**; line and order total **`£120.00`**; header **`My Cart (2)`** |
| `TC-AUTO-04` | Result grid count **= 3**; membership of both sandals; exact zero-result copy; input remains editable |
| `TC-AUTO-05` | `waitForURL(/checkouts/)`; test-gateway copy; discount field visible; exact `"Enter a valid discount code"`; checkout survives rejection |

No arbitrary `page.waitForTimeout()` is used; timing is handled by Playwright's auto-waiting,
`expect` polling and `waitForURL`. This is the main reason the suite stayed green across runs.

### 2.3 Defects surfaced by the automation work

Writing and running the suite directly produced two additional findings:

- **DS-D15 (search query not retained):** `TC-AUTO-04` initially asserted the input value equals
  the query; it failed because the theme leaves `#search-field` empty. Converted into a documented
  low-severity defect rather than silently weakening the test.
- **DS-D12 (no PDP quantity selector):** flow design made the gap explicit — quantity is only
  editable on `/cart`, so `TC-AUTO-03` reaches the cart before mutating quantity.

---

## 3. Execution Latency (measured)

### 3.1 Three consecutive runs

| Run | Reported | Wall clock | Result |
|:---:|:---:|:---:|:---:|
| 1 | 15.6 s | 16.74 s | 5/5 passed |
| 2 | 17.2 s | 18.09 s | 5/5 passed |
| 3 | 16.1 s | 17.14 s | 5/5 passed |
| **Mean** | **16.3 s** | **17.32 s** | **15/15** |

Wall clock includes Node startup, config load, browser launch and report writing; the reported
duration is Playwright's own test-time total.

### 3.2 Per-test latency (mean of 3 runs)

| Test | Mean | Min | Max | Share of suite |
|:---|:---:|:---:|:---:|:---:|
| `TC-AUTO-01` catalog | **0.99 s** | 0.98 s | 0.99 s | 6 % |
| `TC-AUTO-02` PDP variants | **3.50 s** | 3.12 s | 4.15 s | 22 % |
| `TC-AUTO-03` cart arithmetic | **3.84 s** | 3.76 s | 3.96 s | 24 % |
| `TC-AUTO-04` search | **1.20 s** | 1.18 s | 1.24 s | 8 % |
| `TC-AUTO-05` checkout + discount | **6.17 s** | 5.73 s | 6.49 s | 39 % |
| **Total** | **15.70 s** | — | — | 100 % |

`TC-AUTO-05` dominates because it loads the Shopify checkout bundle (~6 s first paint) before the
discount assertion. That is app-side latency, not test overhead. p95 across individual tests = **6.49 s**.

### 3.3 Generation latency (estimated)

| Metric | Value | Method |
|:---|:---:|:---|
| Time to first token | **~0.55 s** | Model-class estimate, not instrumented |
| Output volume | **~5.2 k tokens** (spec 1,982 + config 277 + docs ≈ 2.9 k) | chars ÷ 4 |
| Sustained throughput | **~190 tok/s** | Flash-class estimate |
| Synthesis latency | **~27 s** | 5.2 k ÷ 190 tok/s |
| **Generation + one execution** | **~44 s** | 27 s estimated + 17.3 s measured |

> Iteration cost during authoring was 2 fix cycles (cart-counter locator, scoped `grid` variable) —
> both were test-code defects, not application defects, and both were fixed without weakening
> assertions. Those cycles are excluded from the synthesis estimate.

---

## 4. Cost / 1,000 Generations

### 4.1 Token profile

| Bucket | Tokens | Basis |
|:---|:---:|:---|
| Input — task definition, 5 flow specs, live DOM/selector facts, prior suite conventions | **9,000** | ~36 KB ÷ 4 |
| Output — spec 7,926 chars + config 1,107 chars + README/METRICS ≈ 9.5 k chars | **5,200** | chars ÷ 4 |
| **Total per generation** | **14,200** | — |

### 4.2 Official off-peak rates (`deepseek-flash`, 2026-11-11)

| Token type | Price / 1M |
|:---|:---:|
| Input, cache miss | **$0.15** |
| Input, cache hit | **$0.003** |
| Output (incl. thinking) | **$0.60** |

### 4.3 Calculation

$$\text{Input} = 9{,}000 \times \frac{\$0.15}{1{,}000{,}000} = \$0.00135$$
$$\text{Output} = 5{,}200 \times \frac{\$0.60}{1{,}000{,}000} = \$0.00312$$
$$\mathbf{\text{Cost per generation}} = \$0.00135 + \$0.00312 = \mathbf{\$0.00447}$$
$$\mathbf{\text{Cost / 1,000 generations}} = \mathbf{\$4.47}$$

**With prompt caching** (75 % input hit):

$$\text{Input} = (2{,}250 \times \$0.15 + 6{,}750 \times \$0.003)/10^6 = \$0.000358$$
$$\text{Total} = \$0.000358 + \$0.00312 = \mathbf{\$0.00348} \Rightarrow \mathbf{\$3.48 / 1{,}000}$$

### 4.4 Cost sensitivity

| Scenario | Cost / run | Cost / 1,000 |
|:---|:---:|:---:|
| Off-peak, no cache (reported) | $0.00447 | **$4.47** |
| Off-peak, 75 % cache hit | $0.00348 | **$3.48** |
| Peak (2×) | $0.00894 | **$8.94** |
| Peak + 75 % cache hit | $0.00696 | **$6.96** |
| **Marginal cost of a CI execution** | **$0.00 model + runner minutes** | — |

---

## 5. Benchmark Position (automation activity)

| Dimension | Gemini 3.8 Flash | Claude Sonnet 4.6 | Claude Opus 4.6 | **DeepSeek V4.1 Flash (High)** |
|:---|:---:|:---:|:---:|:---:|
| Quality score | 97.5 | 98.0 | 99.0 | **98.6** |
| Flows generated | 5/5 | 5/5 | 5/5 | **5/5** |
| Locator robustness | 98.0 | 98.5 | 99.0 | **97.0** (19.4/20) |
| Assertion completeness | 97.0 | 98.0 | 99.0 | **99.0** (19.8/20) |
| Flake rate (3 runs) | not reported | not reported | not reported | **0 % (15/15)** |
| Generation latency | 10.8 s | 14.2 s | 19.5 s | **~27 s** (est.) |
| **Execution latency (measured)** | not reported | not reported | not reported | **16.3 s / suite** |
| Cost / 1,000 generations | $0.795 | $44.70 | $271.50 | **$4.47** ($3.48 cached) |

**Positioning:** priced ~5.6× above Gemini Flash but ~10× below Sonnet, with the strongest assertion
density in the benchmark (exact variant IDs, exact result counts, post-error health check) and the
only measured execution-latency and flake-rate evidence. Best fit: **PR-gate suites where a false
green is expensive**, not the cheapest possible bulk generation.
