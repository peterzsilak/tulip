import { Locator, Page } from '@playwright/test';

export class CheckoutCompletePage {
  readonly root: Locator;
  readonly header: Locator;
  readonly text: Locator;
  private readonly backToProductsButton: Locator;

  constructor(page: Page) {
    this.root = page.getByTestId('checkout-complete-container');
    this.header = this.root.getByTestId('complete-header');
    this.text = this.root.getByTestId('complete-text');
    this.backToProductsButton = this.root.getByTestId('back-to-products');
  }

  async backToProducts(): Promise<void> {
    await this.backToProductsButton.click();
  }
}
