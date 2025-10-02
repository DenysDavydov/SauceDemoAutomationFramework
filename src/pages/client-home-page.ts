import { BasePage } from './base-page';
import { Button } from '../uicontrols/button';
import { Page } from '@playwright/test';

export abstract class ClientHomePage extends BasePage {
  private readonly menuItems: Button
  private readonly menuToggleButton: Button

  constructor(currentPage: Page) {
    super(currentPage);
    this.menuItems = new Button('Menu item', selectors.menuItems, this.pageDriver);
    this.menuToggleButton = new Button('Menu toggle', selectors.menuToggleButton, this.pageDriver);
  }

  async clickMenuItem(itemName: string): Promise<void> {
    await this.menuToggleButton.click();
    await this.menuItems.click({ itemName });
  }
}

const selectors = {
  menuItems: '//a[.="{itemName}"]',
  menuToggleButton: 'button#react-burger-menu-btn'
}
