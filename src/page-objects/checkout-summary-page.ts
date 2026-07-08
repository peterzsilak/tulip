import { Locator, Page } from '@playwright/test';

import { CartItem } from '@/page-objects/element-containers/cart-item';

export class CheckoutSummaryPage {
  private readonly container: Locator;
  private readonly list: Locator;
  readonly paymentInfoValue: Locator;
  readonly shippingInfoValue: Locator;
  readonly subtotalLabel: Locator;
  readonly taxLabel: Locator;
  readonly totalLabel: Locator;
  private readonly cancelButton: Locator;
  private readonly finishButton: Locator;

  constructor(page: Page) {
    this.container = page.getByTestId('checkout-summary-container');
    this.list = this.container.getByTestId('cart-list');
    this.paymentInfoValue = this.container.getByTestId('payment-info-value');
    this.shippingInfoValue = this.container.getByTestId('shipping-info-value');
    this.subtotalLabel = this.container.getByTestId('subtotal-label');
    this.taxLabel = this.container.getByTestId('tax-label');
    this.totalLabel = this.container.getByTestId('total-label');
    this.cancelButton = this.container.getByTestId('cancel');
    this.finishButton = this.container.getByTestId('finish');
  }

  get items(): CartItem {
    return new CartItem(this.list.getByTestId('inventory-item'));
  }

  getItemByName(name: string): CartItem {
    return this.items.filter({
      hasText: name,
    });
  }

  async getAllItems(): Promise<CartItem[]> {
    return this.items.all();
  }

  async getSubtotal(): Promise<string> {
    return this.subtotalLabel.innerText();
  }

  async getTax(): Promise<string> {
    return this.taxLabel.innerText();
  }

  async getTotal(): Promise<string> {
    return this.totalLabel.innerText();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  async finish(): Promise<void> {
    await this.finishButton.click();
  }
}
