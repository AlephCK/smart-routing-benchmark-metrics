# GPT-6 Luna Medium — Playwright Automation Metrics

**Run date:** 2026-11-11 · **Target:** Sauce Demo Shopify · **Browser:** Playwright Chromium 158.0.8127.18 · **Workers:** 1 · **Retries:** 0

## Execution results

| Metric | Result | Basis |
|---|---:|---|
| Automated cases | 5 / 5 passed | Live run, all five core flows. |
| Pass rate | 100% | 5 passed, 0 failed, 0 skipped, 0 flaky. |
| Playwright suite duration | 16.19 s | Latest Playwright JSON reporter run; test run only. |
| Process wall time | Not recorded for latest run | The earlier measured wall time was 21.23 s; the refreshed reporting run did not use `time -p`. |
| Per-test durations | 1.1 / 3.6 / 3.8 / 1.3 / 5.3 s | TC-AUTO-01 through TC-AUTO-05 as printed by the latest Playwright run. |
| Payments submitted | 0 | Checkout test stops after invalid discount rejection. |

The first two attempts were blocked before tests started: one because Chromium was absent, then because the sandbox prevented Chromium startup. After installing the browser and running with the required process permissions, all five passed. A subsequent label-refresh run also passed all five in 16.19 s. These setup attempts are excluded from the successful-run timing above.

## Quality, detection, and cost

| Metric | Result | Basis / limitation |
|---|---:|---|
| Quality score | 96 / 100 (rubric estimate) | 30 isolation, 25 locator/assertion reliability, 25 flow coverage, 16 maintainability; manual rubric, not an external evaluation. |
| Flow coverage | 5 / 5 | Catalog, PDP/variant, cart, search, checkout validation. |
| Defect detection score | Not scored | This is a happy-path regression suite plus invalid-discount check, not a seeded-defect detection benchmark. |
| Model generation latency | **~40 s estimated** (rough range: 25–60 s) | Retrospective estimate for generating the five Playwright cases/config. Not a timed model-only measurement; separate from the measured browser run. |
| Cost per 1,000 generated suites | **$3.00 estimate** | Assumption: 10,000 input + 4,000 output tokens per generation; standard GPT-6 Luna rates $0.10/M input and $0.50/M output produce $0.001 + $0.002 = $0.003/suite. |

Cost is API-equivalent rather than a Codex subscription charge. Token counts are estimated, not metered. Pricing reference: [OpenAI API pricing](https://developers.openai.com/api/docs/pricing?tab=suite). “Medium” identifies the reasoning setting used for this run.

## Reproduce

Run `npm install`, install Chromium with `npx playwright install chromium`, then run `npm test`. The latest machine-readable run is `results/playwright-results.json`; the HTML report is generated under `playwright-report/`.
