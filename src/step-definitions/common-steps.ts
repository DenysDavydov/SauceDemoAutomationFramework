import { Given, Then } from "@cucumber/cucumber";
import { ScenarioContext } from "./global-hooks";
import { BasePage } from "../pages/base-page";
import { User } from "../../configuration/testrun-config";

Given('I decided to purchase some stuff',
  async function (this: ScenarioContext) {
    await this.pages.inventoryPage.goto();
  })

Given('I\'m on the {page} page as a {user} user',
  async function (this: ScenarioContext, page: BasePage, user: User) {
    await page.goto();
  });

Then('I should get back to the {page} page', async (page: BasePage) => await shouldBeOpened(page));
Then('I should stay at the {page} page', async (page: BasePage) => await shouldBeOpened(page));
Then('I should see the {page} page', async (page: BasePage) => await shouldBeOpened(page));

async function shouldBeOpened(page: BasePage) {
  await page.shouldBeOpened();
}
