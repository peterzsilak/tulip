import { Locator, Page } from '@playwright/test';

import { Credential } from '@/config/credential';

export class LoginPage {
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;

  constructor(page: Page) {
    this.usernameInput = page.getByTestId('username');
    this.passwordInput = page.getByTestId('password');
    this.loginButton = page.getByTestId('login-button');
  }

  async authenticate(credential: Credential): Promise<void> {
    await this.usernameInput.fill(credential.username);
    await this.passwordInput.fill(credential.password);
    await this.loginButton.click();
  }
}
