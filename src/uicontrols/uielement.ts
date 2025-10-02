import { expect, Locator, Page } from '@playwright/test';
import { SearchCriteria } from '../utils/search-criteria';
import { substitutePlaceholders } from '../utils/helpers';

export abstract class UiElement {
  private name: string | undefined;
  private selector: string;
  private currentPage: Page;
  private nativeElement: Locator | undefined;

  constructor(name: string, selector: string, currentPage: Page);
  constructor(name: string, selector: string, currentPage: Page, nativeElement: Locator)
  constructor(name: string, selector: string, currentPage: Page, nativeElement?: Locator) {
    this.currentPage = currentPage;
    this.selector = selector;
    this.nativeElement = nativeElement;
    this.name = name;
  }

  get typeName(): string {
    return this.constructor.name.toLowerCase();
  }

  get elementName(): string {
    if (!this.name) throw Error('Provide "name" property to use "elementName"');
    return this.name;
  }

  async getText(searchCriteria: SearchCriteria = {}): Promise<string | null> {
    const element = this.find(searchCriteria);

    if (!await element.isVisible())
      return null;

    await element.scrollIntoViewIfNeeded();

    return element.textContent();
  }

  async shouldBePresented(searchCriteria: SearchCriteria = {}): Promise<void> {
    await expect(this.find(searchCriteria), { message: this.getErrorMessage('is not on the page') }).toBeVisible();
  }

  async shouldBeVisible(searchCriteria: SearchCriteria = {}): Promise<void> {
    await expect(this.find(searchCriteria), {
      message: this.getErrorMessage('is offscreen or doesn\'t exist')
    }).toBeInViewport({ ratio: 1 });
  }

  async shouldHaveText(text: string, searchCriteria: SearchCriteria = {}): Promise<void> {
    await expect(this.find(searchCriteria), { message: this.getErrorMessage(`does not have text "${text}"`) })
      .toContainText(text);
  }

  async click(searchCriteria: SearchCriteria = {}): Promise<void> {
    await this.find(searchCriteria).scrollIntoViewIfNeeded();
    await this.find(searchCriteria).click();
  }

  protected find(criteria: SearchCriteria = {}): Locator {
    const { selector, ...searchBy } = criteria;
    const withTemplate = substitutePlaceholders(criteria.selector || this.selector, searchBy);
    return this.currentPage.locator(withTemplate);
  }

  protected async findAllDescendants(selector: string): Promise<Locator[]> {
    return await this.find().locator(selector).all();
  }

  private getErrorMessage(errorText: string): string {
    return `${this.typeName} \{name: "${this.elementName}", selector: ${this.selector}\} ${errorText}`;
  }
}