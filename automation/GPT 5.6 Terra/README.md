# Sauce Demo — Playwright Automation (GPT-5.6 Terra)

Five independent Chromium regression flows for `https://sauce-demo.myshopify.com/`.

```bash
npm install
npx playwright install chromium
npm test
```

The suite uses one worker, zero retries, fresh browser contexts, JSON and HTML reporting, and no arbitrary waits. Checkout stops after the invalid-discount assertion; it does not submit payment or an order.

## Measuring model generation latency

With an API key configured, run either command below. Each sends one fixed, versioned benchmark prompt to `gpt-5.6-terra` at medium reasoning, streams the response, and writes a timestamped JSON file with time to first output token, total response latency, and token usage.

```bash
OPENAI_API_KEY=... npm run measure:manual
OPENAI_API_KEY=... npm run measure:automation
```

The API measurement is separate from Playwright execution time. It makes a billable API request and does not browse the store or run generated code.

| Case | Flow |
|---|---|
| TC-AUTO-01 | Catalog, currency, and sold-out indicators |
| TC-AUTO-02 | PDP variant selection and cart persistence |
| TC-AUTO-03 | Cart quantity and total recalculation |
| TC-AUTO-04 | Positive and zero-result search |
| TC-AUTO-05 | Checkout handoff and invalid discount validation |
