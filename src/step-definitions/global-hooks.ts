import { After, AfterAll, BeforeAll, Before, Status, World, ITestCaseHookParameter, setDefaultTimeout, defineParameterType, AfterStep } from '@cucumber/cucumber';
import { chromium, Browser, Page, BrowserContext } from 'playwright';
import { LoginPage } from '../pages/login-page';
import { InventoryPage } from '../pages/inventory-page';
import { CartPage } from '../pages/cart-page';
import { CheckoutPage } from '../pages/checkout-page';
import { ProductPage } from '../pages/product-page';
import { getCookiesFor, throwError } from '../utils/helpers';
import { BasePage } from '../pages/base-page';
import config, { User } from '../../configuration/testrun-config';
import '../utils/extensions'
import * as fs from "fs";

setDefaultTimeout(60000);

let browser: Browser;
let pageDriver: Page;
let browserContext: BrowserContext
let saucePages: PagesContainer
let screenshot: Buffer

BeforeAll(async function (): Promise<void> {
    browser = await chromium.launch(config.playwright.use?.launchOptions);
    browserContext = await browser.newContext({
        recordVideo: { dir: 'videos/' },
        viewport: null
    });
});

Before(async function (this: ScenarioContext, scenarioInfo) {
    process.stdout.write(`${scenarioInfo.pickle.name}`)
    await registerScenarioDependencies.call(this);
    if (hasTag(scenarioInfo, "@Login"))
        return;

    await silentLogin();
});

AfterStep(async function (this: ScenarioContext, scenarioInfo) {
    if (scenarioInfo.result?.status === Status.FAILED) {
        screenshot = await pageDriver.screenshot();
    }
});

After(async function (scenarioInfo) {
    const hasError = scenarioInfo.result?.status === Status.FAILED
    process.stdout.write(`${hasError ? ` - ${Status.FAILED}` : ` - ${Status.PASSED}`}\n`)
    await pageDriver.evaluate(() => localStorage.removeItem('cart-contents')).catch(() => console.log("Warn: Failed to reset app state."))
    await pageDriver.close();
    if (hasError) {
        this.attach(screenshot, "image/png");
        const videoPath = await pageDriver.video()?.path() ?? "";

        if (fs.existsSync(videoPath)) {
            const videoBuffer = fs.readFileSync(videoPath).subarray();
            this.attach(videoBuffer, 'video/webm');
        }
    }
});

AfterAll(async function (): Promise<void> {
    await browserContext.close();
    await browser.close();
});

function hasTag(scenarioInfo: ITestCaseHookParameter, tag: string): boolean {
    return scenarioInfo.gherkinDocument.feature?.tags.some(t => t.name == tag) ?? false;
}

async function silentLogin() {
    const user: User = config.userAccounts.standard ?? throwError("Can't find default user.");
    await browserContext.addCookies([getCookiesFor(user)]);
}

async function registerScenarioDependencies(this: ScenarioContext) {
    pageDriver = await browserContext.newPage();
    saucePages = {
        loginPage: new LoginPage(pageDriver),
        cartPage: new CartPage(pageDriver),
        checkoutPage: new CheckoutPage(pageDriver),
        inventoryPage: new InventoryPage(pageDriver),
        productPage: new ProductPage(pageDriver)
    };
    this.pages = saucePages;
    this.browserSession = {
        context: browserContext,
        pageDriver: pageDriver
    }
}

export function getPage(name: string): BasePage {
    let page: BasePage;
    switch (name) {
        case "Login": page = saucePages.loginPage;
            break;
        case "Inventory": page = saucePages.inventoryPage;
            break;
        case "Cart": page = saucePages.cartPage;
            break;
        case "Product": page = saucePages.productPage;
            break;
        case "Checkout": page = saucePages.checkoutPage;
            break;
        default:
            throw new Error(`Unknown page: ${name}`);
    }
    return page;
}

defineParameterType({
    name: 'page',
    regexp: /(Inventory|Login|Cart|Product|Checkout)/,
    transformer: (pageName) => getPage(pageName),
});

defineParameterType({
    name: 'user',
    regexp: /(.+)/,
    transformer: (userTypeString) => config.userAccounts[userTypeString],
});

export interface ScenarioContext extends World {
    browserSession: CurrentBrowserSession,
    pages: PagesContainer
};

type CurrentBrowserSession = {
    context: BrowserContext,
    pageDriver: Page,
}

type PagesContainer = {
    readonly loginPage: LoginPage
    readonly inventoryPage: InventoryPage
    readonly cartPage: CartPage
    readonly checkoutPage: CheckoutPage
    readonly productPage: ProductPage
}