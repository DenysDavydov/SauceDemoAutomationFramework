import { Page } from "@playwright/test";
import { Button } from "../uicontrols/button";
import { Input } from "../uicontrols/input";
import { Label } from "../uicontrols/label";
import { ClientHomePage } from "./client-home-page";
import { CheckoutInfo } from "../models/checkoutInfo";

export class CheckoutPage extends ClientHomePage {
    override async shouldBeOpened(): Promise<void> {
        await this.zipCodeInput.shouldBePresented();
    }

    goto(): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async submitMyInfo(checkoutInfo: CheckoutInfo): Promise<void> {
        await this.firstNameInput.enterText(checkoutInfo.firstName);
        await this.lastNameInput.enterText(checkoutInfo.lastName);
        await this.zipCodeInput.enterText(checkoutInfo.zipCode);
        await this.continueButton.click();
    }

    async getCartItems(): Promise<(string | null)[]> {
        const elements = await this.findAll(selectors.cartItemTitle);
        return Promise.all(elements.map(item => item.textContent()));
    }

    async finish(): Promise<void> {
        await this.finishButton.click();
    }

    async getOrderCompletedText(): Promise<string | null> {
        return this.orderCompletedLabel.getText();
    }

    async cancelCheckingOut() {
        await this.cancelButton.click();
    }

    private readonly firstNameInput: Input;
    private readonly lastNameInput: Input;
    private readonly zipCodeInput: Input;
    private readonly continueButton: Button;
    private readonly cancelButton: Button;
    public readonly finishButton: Button;
    private readonly orderCompletedLabel: Label;

    constructor(currentPage: Page) {
        super(currentPage);
        this.firstNameInput = new Input('First name', selectors.firstNameInput, currentPage);
        this.lastNameInput = new Input('Last name', selectors.lastNameInput, currentPage);
        this.zipCodeInput = new Input('Zip/Postal Code', selectors.zipCodeInput, currentPage);
        this.continueButton = new Button('Continue', selectors.continueButton, currentPage);
        this.cancelButton = new Button('Cancel', selectors.cancelButton, currentPage);
        this.finishButton = new Button('Finish', selectors.finishButton, currentPage);
        this.orderCompletedLabel = new Label('Order completed', selectors.orderCompletedLabel, currentPage);
    }
}

const selectors = {
    firstNameInput: '#first-name',
    lastNameInput: '#last-name',
    zipCodeInput: '#postal-code',
    continueButton: 'input#continue',
    cancelButton: 'button#cancel',
    cartItemTitle: '.inventory_item_name',
    finishButton: 'button#finish',
    orderCompletedLabel: '.complete-text'
}

