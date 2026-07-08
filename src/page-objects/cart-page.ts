import { Locator, Page } from '@playwright/test';

import { CartItem } from '@/page-objects/element-containers/cart-item';

export class CartPage {
  readonly root: Locator;
  readonly items: CartItem;
  private readonly list: Locator;
  private readonly continueShoppingButton: Locator;
  private readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.root = page.getByTestId('cart-contents-container');
    this.list = this.root.getByTestId('cart-list');
    this.items = new CartItem(this.list.getByTestId('inventory-item'));
    this.continueShoppingButton = this.root.getByTestId('continue-shopping');
    this.checkoutButton = this.root.getByTestId('checkout');
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
