import { Page } from "@playwright/test";
import { Button } from "../uicontrols/button";
import { Label } from "../uicontrols/label";
import { ClientHomePage } from "./client-home-page";
import { Link } from "../uicontrols/link";
import config from "../../configuration/testrun-config";

export class InventoryPage extends ClientHomePage {
    async goto(): Promise<void> {
        await this.navigateByPath(config.pageUrls.inventory)
    }

    async openProduct(itemTitle: string): Promise<void> {
        await this.itemLinks.click({ itemTitle });
    }

    async addToCart(itemTitles: string[]): Promise<void> {
        for (const itemTitle of itemTitles)
            await this.addToCartButton.click({ itemTitle });
    }

    async removeFromCart(itemTitles: string[]): Promise<void> {
        for (const itemTitle of itemTitles)
            await this.removeFromCartButton.click({ itemTitle });
    }

    async getCartCount(): Promise<string> {
        return await this.cartBadgeIcon.getText() ?? '0';
    }

    async getPrice(itemTitle: string): Promise<string | null> {
        return await this.itemPriceLabels.getText({ itemTitle });
    }

    async openCart(): Promise<void> {
        await this.cartButton.click();
    }

    async shouldBeOpened(): Promise<void> {
        await this.header.shouldBePresented();
    }

    private readonly addToCartButton: Button
    private readonly removeFromCartButton: Button
    private readonly itemPriceLabels: Label
    private readonly cartButton: Button
    private readonly cartBadgeIcon: Label
    private readonly header: Label
    private readonly itemLinks: Link

    constructor(currentPage: Page) {
        super(currentPage);
        this.addToCartButton = new Button('Add to cart', selectors.addToCartButtons, currentPage);
        this.removeFromCartButton = new Button('Remove from cart', selectors.removeFromCartButtons, currentPage);
        this.itemPriceLabels = new Label('Price', selectors.itemPriceLabel, currentPage);
        this.cartButton = new Button('Cart', selectors.cartButton, currentPage);
        this.cartBadgeIcon = new Label('Cart Badge', selectors.cartBadgeIcon, currentPage);
        this.header = new Label('Header', selectors.header, currentPage);
        this.itemLinks = new Link('Item', selectors.itemLinks, currentPage);
    }
}

const selectors = {
    header: '//span[.="Products"]',
    addToCartButtons: '//div[@class="inventory_item" and .//div[.="{itemTitle}"]]//button[contains(@id, "add")]',
    removeFromCartButtons: '//div[@class="inventory_item" and .//div[.="{itemTitle}"]]//button[contains(@id, "remove")]',
    itemPriceLabel: '//div[@class="inventory_item" and .//div[.="{itemTitle}"]]//div[@class="inventory_item_price"]',
    cartBadgeIcon: 'span.shopping_cart_badge',
    cartButton: 'a.shopping_cart_link',
    itemLinks: '//a[./div[.="{itemTitle}"]]'
}