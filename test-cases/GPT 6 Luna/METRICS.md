# GPT-6 Luna Medium — QA Activity 1 Metrics

**Date:** 2026-11-11 · **Target:** https://sauce-demo.myshopify.com/ · **Scope:** exploratory test design and initial live homepage review.

## Quality and detection

| Metric | Result | Basis / limitation |
|---|---:|---|
| Test cases specified | 32 | Six storefront areas; priority and expected outcome included. |
| Core-area coverage | 6 / 6 | Navigation, catalog, PDP, cart/checkout, discovery/account, quality. |
| Observed live content defects | 1 | About Us/footer copy spacing “s ee” visible in the live homepage crawl. |
| Candidate regression findings | 3 | Search relevance, search page leakage, and handle/title mismatch are carried forward from workspace benchmark notes; fresh reproduction pending. |
| Quality score | 90 / 100 (rubric estimate) | 30 coverage, 25 expected-result clarity, 20 risk prioritization, 15 traceability; no execution credit. |
| Detection rate | Not scored | No fixed, independently verified defect oracle was run for this activity. Do not compare candidate observations as verified detections. |

## Latency and cost

| Metric | Value | Basis |
|---|---:|---|
| Storefront response observation | Not instrumented | Web crawl content was inspected; no browser performance trace collected. |
| Test design latency | **~60 s estimated** (rough range: 45–90 s) | Retrospective estimate for drafting the 32-case plan. Not a timed model-only measurement; tool and retrieval time was not separately logged. |
| Cost / 1,000 equivalent generations | **$4.20 estimate** | Proxy calculation: 12,000 input + 6,000 output tokens/run at standard GPT-6 Luna API rates of $0.10/M input and $0.50/M output: $0.0012 + $0.0030 = $0.0042/run. |

Cost is an API-equivalent estimate, not a charge for this Codex session. The token profile is an explicit modeling assumption, not metered usage. Cached input pricing would lower the estimate if the prompt were cache eligible. See [OpenAI API pricing](https://developers.openai.com/api/docs/pricing?tab=suite). “Medium” identifies the reasoning setting used for this run.
