# GPT-5.6 Terra — Playwright Automation Metrics

**Run date:** 2026-11-11 · **Target:** Sauce Demo Shopify · **Browser:** Playwright Chromium 158.0.8127.18 · **Reasoning:** medium · **Workers:** 1 · **Retries:** 0

## Execution results

| Metric | Result | Basis |
|---|---:|---|
| Automated cases | 5 / 5 passed | Final live Chromium run. |
| Pass rate | 100% | 5 passed, 0 failed, 0 skipped, 0 flaky. |
| Playwright suite duration | 18.67 s | JSON reporter final run. |
| Process wall time | 20.02 s | `time -p npm test`; includes runner startup and teardown. |
| Per-test durations | 2.4 / 3.3 / 4.0 / 1.4 / 6.4 s | TC-AUTO-01 through TC-AUTO-05. |
| Payments submitted | 0 | Test stops after the invalid discount error. |

The initial run passed four cases and exposed a test synchronization flaw in TC-AUTO-02: the code opened `/cart` before asynchronous add-to-cart completion. The suite now waits for the cart badge to show one item before navigation; its final run is the metric baseline above.

## Quality, detection, and cost

| Metric | Result | Basis / limitation |
|---|---:|---|
| Quality score | 97 / 100 (rubric estimate) | 30 isolation, 25 locator/assertion design, 25 flow coverage, 17 maintainability; manual rubric. |
| Flow coverage | 5 / 5 | Catalog, PDP/variant, cart, search, checkout validation. |
| Defect detection | 1 test-design race found and corrected | The first run exposed the missing asynchronous synchronization point. No seeded defect oracle was supplied, so a site defect detection rate is not scored. |
| Model generation latency | **~40 s estimated** (rough range: 25–60 s) | Retrospective estimate for generating the five Playwright cases/config. Not a timed model-only measurement; separate from the measured browser run. |
| Cost / 1,000 generated suites | **$68.00 estimate** | Assumption: 10,000 input + 4,000 output tokens/suite. GPT-5.6 Terra standard pricing: $2.00/M input and $12.00/M output = $0.020 + $0.048 = $0.068/suite. |

Cost is API-equivalent, not a Codex subscription charge. Token counts are estimates and exclude browser/tool charges. Pricing reference: [GPT-5.6 Terra model page](https://developers.openai.com/api/docs/models/gpt-5.6-terra).

## Reproduce

Run `npm install`, `npx playwright install chromium`, then `npm test`. The latest machine-readable evidence is `results/playwright-results.json` and the HTML report is in `playwright-report/`.
