import { expect, Page } from "@playwright/test";
import { Product } from "../models/product";
import { Label } from "../uicontrols/label";
import { ClientHomePage } from "./client-home-page";
import { Button } from "../uicontrols/button";
// import { test } from "../tests/test-setup";

export class ProductPage extends ClientHomePage {
    override async shouldBeOpened(): Promise<void> {
        await this.addToCartButton.shouldBePresented();
    }

    override async goto(): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async addProductToCart(): Promise<void> {
        await this.addToCartButton.click();
    }

    async validateProduct(expected: Product): Promise<void> {
        expect(await this.getProductInfo()).toEqual(expect.objectContaining(expected));
    }

    private async getProductInfo(): Promise<Product> {
        return {
            itemTitle: await this.itemTitleLabel.getText() ?? '',
            description: await this.itemDescriptionLabel.getText() ?? '',
            price: await this.itemPriceLabel.getText() ?? ''
        }
    }

    private readonly itemTitleLabel: Label
    private readonly itemDescriptionLabel: Label
    private readonly itemPriceLabel: Label
    private readonly addToCartButton: Button

    constructor(currentPage: Page) {
        super(currentPage);
        this.itemTitleLabel = new Label('Item title', selectors.itemTitleLabel, this.pageDriver);
        this.itemDescriptionLabel = new Label('Item description', selectors.itemDescriptionLabel, this.pageDriver);
        this.itemPriceLabel = new Label('Item price', selectors.itemPriceLabel, this.pageDriver);
        this.addToCartButton = new Button('Add to Cart', selectors.addToCartButton, this.pageDriver);
    }
}

const selectors = {
    itemTitleLabel: '[data-test="inventory-item-name"]',
    itemDescriptionLabel: '[data-test="inventory-item-desc"]',
    itemPriceLabel: '[data-test="inventory-item-price"]',
    addToCartButton: '#add-to-cart'
}