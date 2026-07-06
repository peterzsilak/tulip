import { Locator, Page } from '@playwright/test';

import { CartItem } from '@/page-objects/element-containers/cart-item';

export class CartPage {
  private readonly container: Locator;
  private readonly list: Locator;
  private readonly cartItem: CartItem;
  private readonly continueShoppingButton: Locator;
  private readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.container = page.getByTestId('cart-contents-container');
    this.list = this.container.getByTestId('cart-list');
	this.cartItem = new CartItem(this.list.getByTestId('inventory-item'));
    this.continueShoppingButton = this.container.getByTestId('continue-shopping');
    this.checkoutButton = this.container.getByTestId('checkout');
  }

  async getAllItems(): Promise<CartItem[]> {
    return this.cartItem.all();
  }

  async getItemByName(name: string): Promise<CartItem> {
    return this.cartItem.filter({
      has: this.list.getByTestId('inventory-item-name').getByText(name, { exact: true }),
    });
  }

  async continueShopping(): Promise<void> {
    await this.continueShoppingButton.click();
  }

  async checkout(): Promise<void> {
    await this.checkoutButton.click();
  }
}
