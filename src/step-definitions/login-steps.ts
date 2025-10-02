import { Given, Then, When } from "@cucumber/cucumber";
import { ScenarioContext } from "./global-hooks";
import { expect } from "@playwright/test"
import { User } from "../../configuration/testrun-config";

Given('I\'m on the Login page',
  async function (this: ScenarioContext) {
    await this.pages.loginPage.goto();
  })

When("I login as a {user} user",
  async function (this: ScenarioContext, user: User) {
    await this.pages.loginPage.doLogin(user);
  });

When('I try to login as a {user} user',
  async function (this: ScenarioContext, user: User) {
    await this.pages.loginPage.doLogin(user);
  });

Then('I should see the login error message {string}',
  async function (this: ScenarioContext, expectedMessage: string) {
    expect(await this.pages.loginPage.getErrorMessage()).toEqual(expectedMessage)
  });
