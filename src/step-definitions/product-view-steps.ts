import { DataTable, Then, When } from "@cucumber/cucumber"
import { ScenarioContext } from "./global-hooks"
import { Product } from "../models/product"

When('I click add the product to cart', async function (this: ScenarioContext) {
    await this.pages.productPage.addProductToCart();
});

Then('I should see the following product info on the Product page', async function (this: ScenarioContext, productTable: DataTable) {
    await this.pages.productPage.validateProduct(productTable.rowsHash() as Product);
});
