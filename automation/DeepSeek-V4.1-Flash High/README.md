# Sauce Demo — Playwright Automation (DeepSeek V4.1 Flash High)

Executable regression suite for the 5 common benchmark flows on
`https://sauce-demo.myshopify.com/`.

## Quick start

```bash
npm install
npx playwright install chromium   # once per machine
npm test
npm run report                    # open the HTML report
```

If the bundled browser revision is unavailable, point at any Chromium binary:

```bash
PLAYWRIGHT_CHROMIUM_EXECUTABLE=/path/to/chrome npx playwright test
```

## Coverage

| Test | Flow | Key assertions |
|:---|:---|:---|
| `TC-AUTO-01` | Catalog browsing & inventory badges | 7 product tiles, exact prices, GBP only, exactly 2 sold-out overlays |
| `TC-AUTO-02` | PDP variant selection | Size × Colour selects, variant ID `7805236929` for M/Red, cart line label |
| `TC-AUTO-03` | Cart quantity arithmetic | qty `1 → 2`, line/order total `£60 → £120`, header `My Cart (2)` |
| `TC-AUTO-04` | Search positive + zero results | 3 sandal results, exact zero-results copy, form still usable |
| `TC-AUTO-05` | Checkout & invalid discount | `/checkouts/` hand-off, test-gateway copy, exact "Enter a valid discount code" |

Every test runs in a fresh context (`workers: 1`, no retries), so cart state never leaks
between flows. Locators prefer stable IDs (`#product-select`, `#add`), scoped CSS
(`section.product-grid`), and exact text assertions over positional selectors.

## Layout

```
.
├── playwright.config.ts
├── package.json
├── tests/
│   └── common_5_test_cases.spec.ts
├── results/                 # JSON reporter output (per-run evidence)
├── test-results/            # traces/screenshots for failed runs (git-ignored in practice)
└── METRICS.md               # quality, latency and cost for this activity
```

## Notes

- `results/playwright-results.json` always holds the latest run; `results/run-1..3.json`
  preserve the three benchmark runs used for the stability numbers in `METRICS.md`.
- The suite is read-only except for cart/checkout state held in the shopper session; it
  never submits a payment.
- `video` is disabled and traces are retained only on failure to keep runs fast.
