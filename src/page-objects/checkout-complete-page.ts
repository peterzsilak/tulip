import { Locator, Page } from '@playwright/test';

export class CheckoutCompletePage {
  private readonly container: Locator;
  readonly header: Locator;
  readonly text: Locator;
  private readonly backToProductsButton: Locator;

  constructor(page: Page) {
    this.container = page.getByTestId('checkout-complete-container');
    this.header = this.container.getByTestId('complete-header');
    this.text = this.container.getByTestId('complete-text');
    this.backToProductsButton = this.container.getByTestId('back-to-products');
  }

  async backToProducts(): Promise<void> {
    await this.backToProductsButton.click();
  }
}
