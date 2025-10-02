import { DataTable, Given, Then, When } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { ScenarioContext } from "./global-hooks";

Given('I have added the following products to cart',
    async function (this: ScenarioContext, productTitles: DataTable) {
        const givenItems = productTitles.raw().getFirstColumn();
        await this.pages.inventoryPage.goto();
        await this.pages.inventoryPage.addToCart(givenItems);
    });

When('I delete the following products from cart',
    async function (this: ScenarioContext, productTitles: DataTable) {
        const givenItems = productTitles.raw().getFirstColumn();
        await this.pages.cartPage.removeItems(givenItems);
    });

Then('I should see the following products on the Cart page',
    async function (this: ScenarioContext, productTitles: DataTable) {
        const givenItems = productTitles.raw().getFirstColumn();
        expect(await this.pages.cartPage.getCartItems()).toEqual(givenItems);
    });

When('I click Checkout',
    async function (this: ScenarioContext) {
        await this.pages.cartPage.doCheckout();
    });
