import { Locator, Page } from '@playwright/test';
import config from '../../configuration/testrun-config';

export abstract class BasePage {
  constructor(protected pageDriver: Page) { }

  abstract goto(): void | Promise<void>;

  abstract shouldBeOpened(): void | Promise<void>;

  async navigateTo(url: string): Promise<void> {
    await this.pageDriver.goto(url);
  }

  async navigateByPath(path: string) {
    const url = config.testEnv.sutBaseUrl + path;
    await this.navigateTo(url);
  }

  async reload(): Promise<void> {
    await this.pageDriver.reload({ waitUntil: 'domcontentloaded' });
  }

  protected find(selector: string): Locator {
    return this.pageDriver.locator(selector);
  }

  protected async findAll(selector: string): Promise<Locator[]> {
    return await this.pageDriver.locator(selector).all();
  }
}