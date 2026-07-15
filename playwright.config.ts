import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '.env'), quiet: true });

function readNonNegativeInteger(name: string, fallback: number): number {
  const rawValue = process.env[name];
  if (rawValue === undefined) return fallback;

  const value = Number(rawValue);
  if (!Number.isInteger(value) || value < 0) {
    throw new Error(`${name} must be a non-negative integer`);
  }
  return value;
}

const isCi = process.env['CI'] === 'true';

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const config = defineConfig({
  testDir: './src/tests',
  testMatch: ['**/*.spec.ts', '**/*.setup.ts'],
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Run projects in parallel while keeping local resource usage reasonable */
  workers: readNonNegativeInteger('PLAYWRIGHT_WORKERS', 6),
  /* Fail the build on CI if test.only was left in source. */
  forbidOnly: isCi,
  /* Retry on CI only */
  retries: isCi ? 2 : 0,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: isCi
    ? [['github'], ['list'], ['html'], ['junit', { outputFile: 'test-results/junit.xml' }]]
    : [['html'], ['list']],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    baseURL: process.env['BASE_URL'] ?? 'https://www.saucedemo.com/',
    headless: process.env['PLAYWRIGHT_HEADED'] !== 'true',
    launchOptions: {
      slowMo: readNonNegativeInteger('PLAYWRIGHT_SLOW_MO', 0),
    },
    testIdAttribute: 'data-test',
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configure desktop and mobile projects */
  projects: [
    {
      name: 'desktop-chromium',
      grep: /@desktop/,
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'desktop-firefox',
      grep: /@desktop/,
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'desktop-webkit',
      grep: /@desktop/,
      use: { ...devices['Desktop Safari'] },
    },

    {
      name: 'mobile-chromium',
      grep: /@mobile/,
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'mobile-webkit',
      grep: /@mobile/,
      use: { ...devices['iPhone 12'] },
    },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env['CI'],
  // },
});

export default config;
