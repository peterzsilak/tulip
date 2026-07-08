import { expect } from '@playwright/test';

import { loadCredential } from '@/config/env-loader';
import { test as base } from '@/fixture/page-init.fixture';

interface AuthenticatedFixture {
  authenticatedUser: undefined;
}

export const test = base.extend<AuthenticatedFixture>({
  authenticatedUser: [
    async ({ page, loginPage, headerPage, leftMenuPage }, use) => {
      await page.goto('/');
      await expect(loginPage.loginContainer).toBeVisible();
      await loginPage.authenticate(loadCredential());

      await use(undefined);

      await headerPage.openMenu();
      await leftMenuPage.logout();
      await expect(loginPage.loginContainer).toBeVisible();
    },
    { auto: true },
  ],
});
