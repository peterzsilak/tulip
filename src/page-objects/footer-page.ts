import { Locator, Page } from '@playwright/test';

export class FooterPage {
  readonly root: Locator;
  readonly twitterLink: Locator;
  readonly facebookLink: Locator;
  readonly linkedInLink: Locator;
  readonly copyright: Locator;

  constructor(page: Page) {
    this.root = page.getByTestId('footer');
    this.twitterLink = this.root.getByTestId('social-twitter');
    this.facebookLink = this.root.getByTestId('social-facebook');
    this.linkedInLink = this.root.getByTestId('social-linkedin');
    this.copyright = this.root.getByTestId('footer-copy');
  }

  async getCopyrightText(): Promise<string> {
    return this.copyright.innerText();
  }

  async goToTwitter(): Promise<void> {
    await this.twitterLink.click();
  }

  async goToFacebook(): Promise<void> {
    await this.facebookLink.click();
  }

  async goToLinkedIn(): Promise<void> {
    await this.linkedInLink.click();
  }
}
