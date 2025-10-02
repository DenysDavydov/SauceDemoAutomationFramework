import { Page } from '@playwright/test';
import { ListItem } from './list-item';
import { UiElement } from './uielement';

export class List extends UiElement {
    private readonly listItem: ListItem

    constructor(name: string, selector: string, currentPage: Page) {
        super(name, selector, currentPage)
        this.listItem = new ListItem('List item', '//*[.="{itemName}"]', currentPage)
    }

    async getItems(): Promise<(string | null)[]> {
        const elements = await this.findAllDescendants('li>a');
        return Promise.all(elements.map(locator => locator.textContent()));
    }

    async clickItem(itemName: string) {
        await this.listItem.click({ itemName });
    }
}