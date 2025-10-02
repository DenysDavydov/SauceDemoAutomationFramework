import { DataTable, Then, When } from "@cucumber/cucumber";
import { ScenarioContext } from "./global-hooks";

When('I click {string} product',
    async function (this: ScenarioContext, productTitle: string) {
        await this.pages.inventoryPage.openProduct(productTitle)
    });

When('I add the following products to cart',
    async function (this: ScenarioContext, productTitles: DataTable) {
        const givenItems = productTitles.raw().getFirstColumn();
        await this.pages.inventoryPage.addToCart(givenItems);
    });

When('I delete the following products from cart on the Inventory page',
    async function (this: ScenarioContext, productTitles: DataTable) {
        const givenItems = productTitles.raw().getFirstColumn();
        await this.pages.inventoryPage.removeFromCart(givenItems);
    });
