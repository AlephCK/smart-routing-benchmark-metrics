import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright Configuration — DeepSeek-V4.1-Flash High benchmark suite
 * Target: https://sauce-demo.myshopify.com/
 *
 * Set PLAYWRIGHT_CHROMIUM_EXECUTABLE to override the browser binary
 * (useful on machines where the bundled browser revision is unavailable).
 */
const executablePath = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE;

export default defineConfig({
  testDir: './tests',
  timeout: 45_000,
  expect: { timeout: 8_000 },
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: 1,
  reporter: [
    ['list'],
    ['json', { outputFile: 'results/playwright-results.json' }],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
  ],
  use: {
    baseURL: 'https://sauce-demo.myshopify.com',
    viewport: { width: 1280, height: 900 },
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'off',
    launchOptions: executablePath ? { executablePath } : {},
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
