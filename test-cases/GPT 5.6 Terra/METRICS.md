# GPT-5.6 Terra — QA Activity 1 Metrics

**Date:** 2026-11-11 · **Target:** https://sauce-demo.myshopify.com/ · **Reasoning:** medium

## Quality and detection

| Metric | Result | Basis / limitation |
|---|---:|---|
| Test cases specified | 34 | Six coverage areas, priority, steps, and expected outcomes. |
| Core-area coverage | 6 / 6 | Navigation, catalog, PDP, cart/checkout, discovery/account, content/quality. |
| Directly observed defects | 3 content defects | Footer spacing; Noir jacket grammar; Noir jacket homophone. |
| Detection rate | Not scored | No seeded or independently adjudicated defect oracle was supplied. |
| Quality score | 92 / 100 (rubric estimate) | 30 coverage, 25 clarity, 20 risk prioritization, 17 direct traceability; manual rubric, not an external score. |

## Latency and cost

| Metric | Value | Basis |
|---|---:|---|
| Storefront response observation | Not instrumented | Pages were reviewed through web retrieval; no browser performance trace was collected for this activity. |
| Model test-design latency | **~60 s estimated** (rough range: 45–90 s) | Retrospective estimate for drafting the 34-case plan. It is not a timed model-only measurement and excludes no separately tracked tool time. |
| Cost / 1,000 equivalent generations | **$96.00 estimate** | Assumption: 12,000 input + 6,000 output tokens/run. At GPT-5.6 Terra standard API rates of $2.00/M input and $12.00/M output: $0.024 + $0.072 = $0.096/run. |

This is an API-equivalent estimate, not a charge for this Codex session. Token counts are assumptions and exclude browser/tool charges. Current pricing reference: [GPT-5.6 Terra model page](https://developers.openai.com/api/docs/models/gpt-5.6-terra).
