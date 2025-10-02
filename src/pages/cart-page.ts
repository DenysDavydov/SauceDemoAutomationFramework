import { Page } from "@playwright/test";
import { Button } from "../uicontrols/button";
import { ClientHomePage } from "./client-home-page";
import config from "../../configuration/testrun-config";

export class CartPage extends ClientHomePage {
    override async shouldBeOpened(): Promise<void> {
        await this.checkoutButton.shouldBePresented();
    }

    override async goto(): Promise<void> {
        await this.navigateByPath(config.pageUrls.cart)
    }

    async getCartItems(): Promise<(string | null)[]> {
        const elements = await this.findAll(selectors.cartItemTitle);
        return await Promise.all(elements.map(item => item.textContent()));
    }

    async removeItems(itemTitles: string[]): Promise<void> {
        for (const itemTitle of itemTitles)
            await this.removeButtons.click({ itemTitle });
    }

    async continueShopping(): Promise<void> {
        await this.continueShoppingButton.click();
    }

    async doCheckout(): Promise<void> {
        await this.checkoutButton.click();
    }

    private readonly removeButtons: Button;
    private readonly continueShoppingButton: Button;
    private readonly checkoutButton: Button;

    constructor(currentPage: Page) {
        super(currentPage);
        this.removeButtons = new Button('Remove', selectors.removeButtons, this.pageDriver);
        this.continueShoppingButton = new Button('Continue Shopping', selectors.continueShoppingButton, this.pageDriver);
        this.checkoutButton = new Button('Checkout', selectors.checkoutButton, this.pageDriver);
    }
}

const selectors = {
    cartItemTitle: '.inventory_item_name',
    removeButtons: '//div[@class="cart_item" and .//div[.="{itemTitle}"]]//button',
    continueShoppingButton: 'button#continue-shopping',
    checkoutButton: 'button#checkout'
}