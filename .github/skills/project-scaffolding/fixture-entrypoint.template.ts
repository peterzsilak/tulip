import { test as base, expect, Locator, Page } from '@playwright/test';

class ExamplePageObject {
  readonly heading: Locator;

  constructor(page: Page) {
    this.heading = page.getByRole('heading');
  }
}

export interface CustomFixtures {
  examplePage: ExamplePageObject;
}

export const test = base.extend<CustomFixtures>({
  examplePage: async ({ page }, use) => {
    await use(new ExamplePageObject(page));
  },
});

export { expect };
