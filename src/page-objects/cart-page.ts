import { Locator, Page } from '@playwright/test';

import { CartItem } from '@/page-objects/element-containers/cart-item';

export class CartPage {
  readonly items: CartItem;
  private readonly list: Locator;
  private readonly continueShoppingButton: Locator;
  private readonly checkoutButton: Locator;

  constructor(page: Page) {
    const container = page.getByTestId('cart-contents-container');
    this.list = container.getByTestId('cart-list');
    this.items = new CartItem(this.list.getByTestId('inventory-item'));
    this.continueShoppingButton = container.getByTestId('continue-shopping');
    this.checkoutButton = container.getByTestId('checkout');
  }

  getItemByName(name: string): CartItem {
    return this.items.filter({
      hasText: name,
    });
  }

  async continueShopping(): Promise<void> {
    await this.continueShoppingButton.click();
  }

  async checkout(): Promise<void> {
    await this.checkoutButton.click();
  }
}
