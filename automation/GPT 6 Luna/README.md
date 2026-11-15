# Sauce Demo — Playwright Automation (GPT-6 Luna Medium)

Five independent Chromium regression flows for `https://sauce-demo.myshopify.com/`.

## Run

```bash
npm install
npx playwright install chromium
npm test
```

Set `PLAYWRIGHT_CHROMIUM_EXECUTABLE` to use an installed Chromium binary if needed. The suite uses one worker, no retries, fresh Playwright contexts, JSON and HTML reports, and no arbitrary sleeps. Checkout validation stops before payment submission.

| Test | Flow |
|---|---|
| TC-AUTO-01 | Catalog, prices, and sold-out badges |
| TC-AUTO-02 | Product detail and variant selection |
| TC-AUTO-03 | Cart quantity and total recalculation |
| TC-AUTO-04 | Positive and zero-results search |
| TC-AUTO-05 | Checkout handoff and invalid discount |
