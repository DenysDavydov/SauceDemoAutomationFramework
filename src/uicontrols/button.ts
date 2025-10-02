import test from '@playwright/test';
import { SearchCriteria } from '../utils/search-criteria';
import { UiElement } from './uielement';

export class Button extends UiElement {
  async hover(searchCriteria: SearchCriteria = {}) {
    await test.step(`Hovering the ${this.typeName} with name "${this.elementName}"`, async () => {
      await this.find(searchCriteria).hover();
    });
  }

  async doubleClick(searchCriteria: SearchCriteria = {}) {
    await test.step(`Double clicking "${this.elementName}" ${this.typeName} with name`, async () => {
      await this.find(searchCriteria).dblclick();
    });
  }
}