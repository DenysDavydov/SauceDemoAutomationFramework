import { Then, When } from "@cucumber/cucumber";
import { ScenarioContext } from "./global-hooks";
import { expect } from "@playwright/test";

When('I click the cart icon',
    async function (this: ScenarioContext) {
        await this.pages.inventoryPage.openCart();
    })

Then('the added products counter should not be displayed',
    async function (this: ScenarioContext) {
        expect(await this.pages.inventoryPage.getCartCount()).toEqual('0');
    })

Then('the cart badge should display {word}',
    async function (expectedCount: string) {
        expect(await this.pages.inventoryPage.getCartCount()).toEqual(expectedCount);
    })
