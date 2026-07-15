import { Locator, Page } from '@playwright/test';

import { CartItem } from '@/page-objects/element-containers/cart-item';

export class CheckoutSummaryPage {
  readonly root: Locator;
  private readonly list: Locator;
  readonly items: CartItem;
  readonly paymentInfoValue: Locator;
  readonly shippingInfoValue: Locator;
  readonly subtotalLabel: Locator;
  readonly taxLabel: Locator;
  readonly totalLabel: Locator;
  private readonly cancelButton: Locator;
  private readonly finishButton: Locator;

  constructor(page: Page) {
    this.root = page.getByTestId('checkout-summary-container');
    this.list = this.root.getByTestId('cart-list');
    this.items = new CartItem(this.list.getByTestId('inventory-item'));
    this.paymentInfoValue = this.root.getByTestId('payment-info-value');
    this.shippingInfoValue = this.root.getByTestId('shipping-info-value');
    this.subtotalLabel = this.root.getByTestId('subtotal-label');
    this.taxLabel = this.root.getByTestId('tax-label');
    this.totalLabel = this.root.getByTestId('total-label');
    this.cancelButton = this.root.getByTestId('cancel');
    this.finishButton = this.root.getByTestId('finish');
  }

  getItemByName(name: string): CartItem {
    return this.items.filter({
      hasText: name,
    });
  }

  async cancel(): Promise<void> {
   await this.cancelButton.click();
  }

  async finish(): Promise<void> {
   await this.finishButton.click();
  }
}
