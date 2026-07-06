import { Locator, Page } from '@playwright/test';

export class FooterPage {
  private readonly footer: Locator;
  readonly twitterLink: Locator;
  readonly facebookLink: Locator;
  readonly linkedInLink: Locator;
  readonly copyright: Locator;

  constructor(page: Page) {
    this.footer = page.getByTestId('footer');
    this.twitterLink = this.footer.getByTestId('social-twitter');
    this.facebookLink = this.footer.getByTestId('social-facebook');
    this.linkedInLink = this.footer.getByTestId('social-linkedin');
    this.copyright = this.footer.getByTestId('footer-copy');
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
