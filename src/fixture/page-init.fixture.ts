import { test as base } from "@playwright/test";
import { LoginPage } from "@/page-objects/login-page";
import { InventoryPage } from "@/page-objects/inventory-page";
import { LeftMenuPage } from "@/page-objects/left-menu-page";
import { HeaderPage } from "@/page-objects/header-page";


interface CustomFixtures {
	loginPage: LoginPage,
	headerPage: HeaderPage,
	leftMenuPage: LeftMenuPage,
	inventoryPage: InventoryPage,
}

export const test = base.extend<CustomFixtures>({

	loginPage: async ({ page }, use) => {
		await use(new LoginPage(page));
	},
	headerPage: async ({ page }, use) => {
		await use(new HeaderPage(page));
	},
	leftMenuPage: async ({ page }, use) => {
		await use(new LeftMenuPage(page));
	},
	inventoryPage: async ({ page }, use) => {
		await use(new InventoryPage(page));
	},

});