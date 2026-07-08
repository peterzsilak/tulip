import { Locator, Page } from '@playwright/test';

import { Credential } from '@/config/credential';

export class LoginPage {
  readonly root: Locator;
  readonly loginContainer: Locator;
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;

  constructor(page: Page) {
    this.root = page.getByTestId('login-container');
    this.loginContainer = this.root;
    this.usernameInput = this.root.getByTestId('username');
    this.passwordInput = this.root.getByTestId('password');
    this.loginButton = this.root.getByTestId('login-button');
  }

  async authenticate(credential: Credential): Promise<void> {
    await this.usernameInput.fill(credential.username);
    await this.passwordInput.fill(credential.password);
    await this.loginButton.click();
  }
}
