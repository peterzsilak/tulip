import { Locator, Page } from '@playwright/test';

import { CartItem } from '@/page-objects/element-containers/cart-item';
import { parseCurrencyAmount } from '@/utils/currency';

export interface OrderDetails {
  readonly items: readonly string[];
  readonly paymentMethod: string;
  readonly shippingMethod: string;
  readonly expectedSubtotal: number;
}

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

  async getAllItems(): Promise<CartItem[]> {
    return this.items.all();
  }

  async getSubtotal(): Promise<string> {
    return this.subtotalLabel.innerText();
  }

  async verifyOrderDetails(details: OrderDetails): Promise<void> {
    await this.verifyItems(details.items);
    await this.verifyInfoText(this.paymentInfoValue, details.paymentMethod, 'payment');
    await this.verifyInfoText(this.shippingInfoValue, details.shippingMethod, 'shipping');
    await this.verifySubtotal(details.expectedSubtotal);
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  async finish(): Promise<void> {
    await this.finishButton.click();
  }

  private async verifyItems(itemNames: readonly string[]): Promise<void> {
    for (const itemName of itemNames) {
      const count = await this.getItemByName(itemName).count();
      if (count !== 1) {
        throw new Error(`Expected exactly one "${itemName}" item in summary, got ${count}.`);
      }
    }
  }

  private async verifyInfoText(field: Locator, expected: string, fieldName: string): Promise<void> {
    const actual = await field.innerText();
    if (actual !== expected) {
      throw new Error(
        `Summary ${fieldName} info mismatch. Expected "${expected}", got "${actual}".`,
      );
    }
  }

  private async verifySubtotal(expectedSubtotal: number): Promise<void> {
    const actualSubtotal = parseCurrencyAmount(await this.getSubtotal(), 'Summary subtotal label');
    if (Math.abs(actualSubtotal - expectedSubtotal) > 0.01) {
      throw new Error(
        `Summary subtotal mismatch. Expected ${expectedSubtotal}, got ${actualSubtotal}.`,
      );
    }
  }
}
