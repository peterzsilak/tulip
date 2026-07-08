import { Locator, Page } from '@playwright/test';

/**
 * Page Object template.
 * - Reusable widgets: extend ElementContainer<T> instead of taking `page`.
 * - Locators are readonly + lazy, scoped to the PO root, getByTestId-first.
 * - Actions only; assertions live in tests.
 */
export class FeaturePage {
  private readonly root: Page;

  readonly heading: Locator;
  readonly addButton: Locator;
  readonly items: Locator;

  constructor(page: Page) {
    this.root = page;
    this.heading = page.getByTestId('feature.heading');
    this.addButton = page.getByRole('button', { name: 'Add' });
    this.items = page.getByTestId('feature.item');
  }

  async addItem(title: string): Promise<void> {
    await this.root.getByTestId('feature.input').fill(title);
    await this.addButton.click();
  }
}
