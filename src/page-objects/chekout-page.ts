import { Locator, Page } from '@playwright/test';

import { CheckoutInfoPage } from '@/page-objects/checkout-info-page';

export class CheckoutPage {
  private readonly container: Locator;
  private readonly firstNameInput: Locator;
  private readonly lastNameInput: Locator;
  private readonly postalCodeInput: Locator;
  private readonly cancelButton: Locator;
  private readonly continueButton: Locator;

  constructor(page: Page) {
    this.container = page.getByTestId('checkout-info-container');
    this.firstNameInput = this.container.getByTestId('firstName');
    this.lastNameInput = this.container.getByTestId('lastName');
    this.postalCodeInput = this.container.getByTestId('postalCode');
    this.cancelButton = this.container.getByTestId('cancel');
    this.continueButton = this.container.getByTestId('continue');
  }

  async fillInfo(info: CheckoutInfoPage): Promise<void> {
    await this.firstNameInput.fill(info.firstName);
    await this.lastNameInput.fill(info.lastName);
    await this.postalCodeInput.fill(info.postalCode);
  }

  async continue(): Promise<void> {
    await this.continueButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }
}
