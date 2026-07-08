import { Locator, Page } from '@playwright/test';

export class LeftMenuPage {
  readonly root: Locator;
  private readonly allItemsLink: Locator;
  private readonly aboutLink: Locator;
  private readonly logoutLink: Locator;
  private readonly resetLink: Locator;
  private readonly closeButton: Locator;

  constructor(page: Page) {
    this.root = page.locator('#page_wrapper');
    this.allItemsLink = this.root.getByTestId('inventory-sidebar-link');
    this.aboutLink = this.root.getByTestId('about-sidebar-link');
    this.logoutLink = this.root.getByTestId('logout-sidebar-link');
    this.resetLink = this.root.getByTestId('reset-sidebar-link');
    this.closeButton = this.root.getByTestId('close-menu');
  }

  async goToAllItems(): Promise<void> {
    await this.allItemsLink.click();
  }

  async goToAbout(): Promise<void> {
    await this.aboutLink.click();
  }

  async logout(): Promise<void> {
    await this.logoutLink.click();
  }

  async resetAppState(): Promise<void> {
    await this.resetLink.click();
  }

  async close(): Promise<void> {
    await this.closeButton.click();
  }
}
