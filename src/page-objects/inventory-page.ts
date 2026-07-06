import { Locator, Page } from '@playwright/test';

import { InventoryItem } from '@/page-objects/element-containers/inventory-item';

export class InventoryPage {
  private readonly container: Locator;
  private readonly list: Locator;

  constructor(page: Page) {
    this.container = page.getByTestId('inventory-container');
    this.list = this.container.getByTestId('inventory-list');
  }

  get items(): InventoryItem {
    return new InventoryItem(this.list.getByTestId('inventory-item'));
  }

  async getAllItems(): Promise<InventoryItem[]> {
    return this.items.all();
  }

  async getItemByName(name: string): Promise<InventoryItem> {
    return this.items.filter({
      has: this.list.getByTestId('inventory-item-name').getByText(name, { exact: true }),
    });
  }
}
