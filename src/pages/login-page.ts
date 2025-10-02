import { BasePage } from './base-page';
import { Input } from '../uicontrols/input';
import { Button } from '../uicontrols/button';
import { Page } from '@playwright/test';
import { Label } from '../uicontrols/label';
import config, { User } from '../../configuration/testrun-config';

export class LoginPage extends BasePage {
  override async goto(): Promise<void> {
    await this.pageDriver.goto(config.testEnv.sutBaseUrl ?? "");
  }

  async doLogin(user: User): Promise<void> {
    await this.usernameInput.enterText(user.name);
    await this.passwordInput.enterText(user.password);
    await this.loginButton.click();
  }

  async shouldBeOpened(): Promise<void> {
    await this.usernameInput.shouldBeVisible();
  }

  async getErrorMessage() {
    return await this.errorMessageLabel.getText();
  }

  private readonly usernameInput: Input;
  private readonly passwordInput: Input;
  private readonly loginButton: Button;
  private readonly errorMessageLabel: Label;

  constructor(currentPage: Page) {
    super(currentPage);
    this.usernameInput = new Input('User name', selectors.usernameInput, currentPage);
    this.passwordInput = new Input('Password', selectors.passwordInput, currentPage);
    this.loginButton = new Button('Log in', selectors.loginButton, currentPage);
    this.errorMessageLabel = new Label('Error message', selectors.errorMessageLabel, currentPage);
  }
}

const selectors = {
  usernameInput: 'input#user-name',
  passwordInput: 'input#password',
  loginButton: 'input#login-button',
  menuToggleButton: '#react-burger-menu-btn',
  errorMessageLabel: 'h3'
}