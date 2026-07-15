import { Locator, Page } from '@playwright/test';

import { CheckoutInfo } from '@/config/checkout-info';

export class CheckoutInfoPage {
  readonly root: Locator;
  private readonly firstNameInput: Locator;
  private readonly lastNameInput: Locator;
  private readonly postalCodeInput: Locator;
  private readonly cancelButton: Locator;
  private readonly continueButton: Locator;

  constructor(page: Page) {
    this.root = page.getByTestId('checkout-info-container');
    this.firstNameInput = this.root.getByTestId('firstName');
    this.lastNameInput = this.root.getByTestId('lastName');
    this.postalCodeInput = this.root.getByTestId('postalCode');
    this.cancelButton = this.root.getByTestId('cancel');
    this.continueButton = this.root.getByTestId('continue');
  }

  async fillInfo(info: CheckoutInfo): Promise<void> {
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
