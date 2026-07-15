import { loadCredential } from '@/config/env-loader';
import { test as base, expect } from '@/fixture/page-init.fixture';

interface AuthenticatedFixture {
  authenticatedUser: undefined;
}

export const test = base.extend<AuthenticatedFixture>({
  authenticatedUser: [
    async ({ page, loginPage, headerPage, leftMenuPage }, use) => {
      await page.goto('/');
      await expect(
        loginPage.loginContainer,
        'Login form should be visible before authentication',
      ).toBeVisible();
      await loginPage.authenticate(loadCredential());

      await use(undefined);

      await headerPage.openMenu();
      await leftMenuPage.logout();
      await expect(
        loginPage.loginContainer,
        'Login form should be visible after logout',
      ).toBeVisible();
    },
    { auto: true },
  ],
});

export { expect };
