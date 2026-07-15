import { Locator, Page } from '@playwright/test';

export class ExamplePage {
  private readonly root: Page;

  readonly primaryAction: Locator;

  constructor(page: Page) {
    this.root = page;
    this.primaryAction = this.root.getByRole('button', { name: 'Primary action' });
  }

  async performPrimaryAction(): Promise<void> {
    await this.primaryAction.click();
  }
}
