import { Locator } from '@playwright/test';

import { ElementContainer } from '@/page-objects/element-containers/element-container';

export class CartItem extends ElementContainer<CartItem> {
  readonly quantity: Locator;
  readonly name: Locator;
  readonly description: Locator;
  readonly price: Locator;
  readonly removeButton: Locator;

  constructor(root: Locator) {
    super(root);
    this.quantity = this.root.getByTestId('item-quantity');
    this.name = this.root.getByTestId('inventory-item-name');
    this.description = this.root.getByTestId('inventory-item-desc');
    this.price = this.root.getByTestId('inventory-item-price');
    this.removeButton = this.root.getByRole('button', { name: 'Remove' });
  }

  async remove(): Promise<void> {
    await this.removeButton.click();
  }

  async getQuantity(): Promise<number> {
    return parseInt(await this.quantity.innerText(), 10);
  }

  async getName(): Promise<string> {
    return this.name.innerText();
  }

  async getPrice(): Promise<string> {
    return this.price.innerText();
  }
}
