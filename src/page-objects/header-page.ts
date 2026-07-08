import { Locator, Page } from '@playwright/test';

import { ProductSort } from '@/config/product-sort';

export class HeaderPage {
  readonly root: Locator;
  private readonly headerContainer: Locator;
  private readonly hamburgerButton: Locator;
  readonly cartButton: Locator;
  readonly cartBadge: Locator;
  private readonly productSortContainer: Locator;

  constructor(page: Page) {
    this.root = page.locator('#page_wrapper');
    this.headerContainer = this.root.getByTestId('header-container');
    this.hamburgerButton = this.headerContainer.locator('#react-burger-menu-btn');
    this.cartButton = this.headerContainer.getByTestId('shopping-cart-link');
    this.cartBadge = this.headerContainer.getByTestId('shopping-cart-badge');
    this.productSortContainer = this.root.getByTestId('product-sort-container');
  }

  async openMenu(): Promise<void> {
    await this.hamburgerButton.click();
  }

  async sortProducts(sort: ProductSort): Promise<void> {
    await this.productSortContainer.selectOption(sort);
  }
}
