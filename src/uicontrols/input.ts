import test, { expect } from '@playwright/test';
import { SearchCriteria } from '../utils/search-criteria';
import { UiElement } from './uielement';

type FillOptions = { validateValue?: boolean } & SearchCriteria;

export class Input extends UiElement {

  async enterText(text: string, options: FillOptions = {}): Promise<void> {
    const { validateValue, ...searchCriteria } = options;

    // await test.step(`Entering "${text}" in the "${this.elementName}" ${this.typeName}`, async () => {
    await this.find(searchCriteria).fill(text);

    if (validateValue) await this.shouldHaveValue(text, searchCriteria);
    // });
  }

  async shouldHaveValue(value: string, searchCriteria: SearchCriteria = {}): Promise<void> {
    // await test.step(`Expected "${this.elementName}" ${this.typeName} to have "${value}"`, async () => {
    await expect(this.find(searchCriteria)).toHaveValue(value);
    // });
  }
}