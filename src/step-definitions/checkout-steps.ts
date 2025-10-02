import { DataTable, Then, When } from "@cucumber/cucumber";
import { ScenarioContext } from "./global-hooks";
import { CheckoutInfo } from "../models/checkoutInfo";
import { expect } from "@playwright/test";

When('I click Finish on the Checkout page',
    async function (this: ScenarioContext) {
        await this.pages.checkoutPage.finish();
    });

When('I submit my checkout info:',
    async function (this: ScenarioContext, checkoutInfoTable: DataTable) {
        await this.pages.checkoutPage.submitMyInfo(checkoutInfoTable.rowsHash() as CheckoutInfo);
    });

Then('I should see the following products on the Checkout Step 2 page',
    async function (this: ScenarioContext, productsTable: DataTable) {
        const givenItems = productsTable.raw().getFirstColumn();
        expect(await this.pages.checkoutPage.getCartItems()).toEqual(givenItems);
    });

Then('my checkout should get completed with the following message',
    async function (this: ScenarioContext, expectedMessage: string) {
        expect(await this.pages.checkoutPage.getOrderCompletedText()).toEqual(expectedMessage.replaceAll("\"", ""));
    });

When('I cancel checking out', async function (this: ScenarioContext) {
    await this.pages.checkoutPage.cancelCheckingOut()
})
